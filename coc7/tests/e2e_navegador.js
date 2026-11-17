'use strict';
/* Verificação no navegador (Chrome headless + Playwright). Não roda no run_all: precisa de Chrome instalado.
   Uso: node coc7/tests/e2e_navegador.js
   Confere, em 1100px e 360px: sem erro de console, sem rolagem lateral, percurso das 10 etapas sem erro para o
   investigador de exemplo, bloqueio com foco no campo quando falta o nome, PDF do dossiê com 2 páginas A4 e
   backup JSON com sistema "coc7". */
const fs = require('fs');
const path = require('path');

function localizarPlaywright(){
  const candidatos = [process.env.PLAYWRIGHT_PATH, '/opt/npm-tools/node_modules/playwright', 'playwright'].filter(Boolean);
  for(const c of candidatos){
    try { return require(c); } catch(_) { /* tenta o próximo */ }
  }
  throw new Error('Playwright não encontrado. Defina PLAYWRIGHT_PATH.');
}
const { chromium } = localizarPlaywright();
const { estadoExemplo } = require('./ambiente');

const ARQUIVO = 'file://' + path.resolve(__dirname, '..', 'index.html');
const CHROME = fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined;
const CHAVE = 'vf-tools:coc7-builder:v1';
const falhas = [];
const verifica = (cond, msg) => { if(!cond) falhas.push(msg); else console.log('  ok:', msg); };

/* Conta as páginas de um PDF pelo número de objetos /Type /Page (sem /Pages). */
function contarPaginasPdf(buf){
  return (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
}

async function percorrer(browser, largura, altura){
  console.log(`\nViewport ${largura}x${altura}`);
  const pagina = await browser.newPage({ viewport: { width: largura, height: altura }, acceptDownloads: true });
  const erros = [];
  pagina.on('console', m => { if(m.type() === 'error') erros.push('console: ' + m.text()); });
  pagina.on('pageerror', e => erros.push('pageerror: ' + e.message));

  /* Semeia o investigador de exemplo antes do primeiro carregamento (uma vez por página), para que o
     "beforeunload" da interface não sobrescreva a semente com o estado vazio em memória. */
  const estado = estadoExemplo();
  await pagina.addInitScript(([chave, valor]) => {
    if(!sessionStorage.getItem('semeado')){
      localStorage.setItem(chave, JSON.stringify({ estado: valor }));
      sessionStorage.setItem('semeado', '1');
    }
  }, [CHAVE, estado]);
  await pagina.goto(ARQUIVO);

  /* A troca de etapa tem uma animação de 18 px (padrão VF Tools); a medida é feita depois dela, no estado final. */
  const semRolagemLateral = async () => {
    await pagina.waitForTimeout(500);
    return pagina.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  };
  const etapaAtual = () => pagina.locator('.stepper-label').innerText();
  const temErro = () => pagina.locator('.alert.error').count();

  verifica(await etapaAtual().then(t => t.includes('Etapa 10 de 10')), 'exemplo carrega na etapa 10');
  verifica(await semRolagemLateral(), 'sem rolagem lateral na etapa 10');
  verifica(await temErro() === 0, 'resumo do exemplo sem erro');

  /* Volta até a etapa 1 e avança de novo: cada avanço do exemplo tem de passar sem erro. */
  for(let i = 0; i < 12; i++){
    if((await etapaAtual()).includes('Etapa 1 de 10')) break;
    await pagina.locator('button[data-acao="voltar"]').click();
  }
  verifica((await etapaAtual()).includes('Etapa 1 de 10'), 'volta até a etapa 1');
  for(let n = 2; n <= 10; n++){
    await pagina.locator('button[data-acao="avancar"]').click();
    const t = await etapaAtual();
    const erro = await temErro();
    if(!t.includes(`Etapa ${n} de 10`) || erro) falhas.push(`avanço para etapa ${n} falhou em ${largura}px (${t}, erros ${erro})`);
    if(!(await semRolagemLateral())) falhas.push(`rolagem lateral na etapa ${n} em ${largura}px`);
  }
  verifica(true, `percurso das 10 etapas sem erro em ${largura}px`);

  /* Bloqueio: nome vazio no modo estrito impede o avanço e foca o campo. */
  await pagina.locator('button[data-acao="voltar"]').click();
  for(let i = 0; i < 12 && !(await etapaAtual()).includes('Etapa 1 de 10'); i++) await pagina.locator('button[data-acao="voltar"]').click();
  await pagina.fill('#nome', '');
  await pagina.locator('button[data-acao="avancar"]').click();
  verifica((await etapaAtual()).includes('Etapa 1 de 10'), 'nome vazio bloqueia o avanço (estrito)');
  verifica(await temErro() > 0, 'faixa de erro aparece com nome vazio');
  const foco = await pagina.evaluate(() => document.activeElement && document.activeElement.id);
  verifica(foco === 'nome', 'foco vai para o campo nome');

  /* Exportações: PDF com 2 páginas e backup JSON. */
  await pagina.fill('#nome', 'Ellen Vance');
  const html = await pagina.evaluate(() => gerarHtmlDossie(estado));
  const pdfPagina = await browser.newPage({ viewport: { width: 1100, height: 1400 } });
  await pdfPagina.setContent(html, { waitUntil: 'load' });
  const transbordo = await pdfPagina.evaluate(() => [...document.querySelectorAll('.pagina')].map(p => p.scrollHeight - p.clientHeight));
  verifica(transbordo.every(v => v <= 1), `conteúdo cabe nas duas páginas (transbordo ${JSON.stringify(transbordo)})`);
  const pdf = await pdfPagina.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
  const paginas = contarPaginasPdf(pdf);
  verifica(paginas === 2, `PDF do dossiê tem 2 páginas (encontradas ${paginas})`);
  await pdfPagina.close();

  const backup = await pagina.evaluate(() => JSON.parse(exportarBackupJson(estado)));
  verifica(backup.sistema === 'coc7' && backup.versaoEsquema === 1, 'backup JSON com sistema coc7 e versão 1');

  await pagina.screenshot({ path: path.join(process.env.TMPDIR || '/tmp', `coc7-${largura}.png`), fullPage: false });
  verifica(erros.length === 0, `sem erro de console em ${largura}px` + (erros.length ? ': ' + erros.join(' | ') : ''));
  await pagina.close();
}

/* Criação do zero, só com cliques e campos (sem semente). Math.random fixo em 0,5: d100 = 51 e 3d6 = 12,
   então a melhoria de EDU não passa da EDU 80 e a Sorte fica 60. */
async function criarDoZero(browser){
  console.log('\nCriação do zero (1100px)');
  const pagina = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  const erros = [];
  pagina.on('console', m => { if(m.type() === 'error') erros.push('console: ' + m.text()); });
  pagina.on('pageerror', e => erros.push('pageerror: ' + e.message));
  await pagina.addInitScript(() => { Math.random = () => 0.5; });
  await pagina.goto(ARQUIVO);
  const etapa = () => pagina.locator('.stepper-label').innerText();
  const avancar = async () => { await pagina.locator('button[data-acao="avancar"]').click(); await pagina.waitForTimeout(120); };
  const erro = () => pagina.locator('.alert.error').count();

  await pagina.fill('#nome', 'Teste Fluxo');
  await avancar();
  verifica((await etapa()).includes('Etapa 2 de 10'), 'nome preenchido avança para características');
  await avancar();
  verifica(await erro() > 0, 'sem método, características bloqueia');
  await pagina.check('#metodo-distribuir');
  const valores = { for: '40', con: '50', tam: '50', des: '50', apa: '60', int: '60', pod: '70', edu: '80' };
  for(const [k, v] of Object.entries(valores)) await pagina.selectOption('#car-' + k, v);
  await avancar();
  verifica((await etapa()).includes('Etapa 3 de 10'), 'distribuição 40, 50, 50, 50, 60, 60, 70, 80 avança');

  await pagina.fill('#idade', '30');
  await pagina.locator('#idade').press('Tab');
  await pagina.locator('#melhoria-0-d100').click();
  await pagina.waitForTimeout(120);
  verifica(await pagina.locator('#melhoria-0-d100').count() === 1, 'teste de EDU da idade 30 aparece');
  await avancar();
  verifica((await etapa()).includes('Etapa 4 de 10'), 'idade 30 com teste de EDU avança');

  await pagina.selectOption('#ocupacao', 'professor');
  await pagina.waitForTimeout(120);
  await avancar();
  verifica((await etapa()).includes('Etapa 5 de 10') && await erro() === 0, 'ocupação Professor avança (pontos ainda vêm na etapa 5)');
  for(const id of ['historia', 'ocultismo', 'natureza', 'arqueologia']){
    await pagina.locator(`input[data-livre="${id}"]`).check();
    await pagina.waitForTimeout(60);
  }
  const pontos = { credito: 50, biblioteca: 70, idioma_outro: 60, psicologia: 80, historia: 40, ocultismo: 10, natureza: 10 };
  for(const [id, v] of Object.entries(pontos)){
    await pagina.fill(`#occ-${id}`, String(v));
    await pagina.locator(`#occ-${id}`).press('Tab');
  }
  await pagina.waitForTimeout(120);
  verifica((await pagina.locator('[data-live="gasto-ocup"]').innerText()).trim() === '320', 'total de pontos de ocupação chega a 320');
  await avancar();
  verifica((await etapa()).includes('Etapa 6 de 10'), 'perícias de ocupação (320 de 320) avançam');

  for(const [id, v] of Object.entries({ escalar: 40, furtividade: 40, briga: 40 })){
    await pagina.fill(`#int-${id}`, String(v));
    await pagina.locator(`#int-${id}`).press('Tab');
  }
  await pagina.waitForTimeout(120);
  await avancar();
  verifica((await etapa()).includes('Etapa 7 de 10'), 'interesse pessoal (120 de 120) avança');
  await avancar();
  await avancar();
  verifica((await etapa()).includes('Etapa 9 de 10'), 'antecedentes e equipamento avançam');
  await pagina.locator('#btn-sorte').click();
  await pagina.waitForTimeout(120);
  await avancar();
  verifica((await etapa()).includes('Etapa 10 de 10') && await erro() === 0, 'Sorte rolada, resumo sem erro');
  const resumo = await pagina.locator('.card').innerText();
  verifica(resumo.includes('Teste Fluxo') && resumo.includes('Sorte 60'), 'resumo mostra o nome e a Sorte 60');

  await pagina.locator('button[data-acao="salvar-historico"]').click();
  await pagina.waitForTimeout(150);
  const hist = await pagina.evaluate(() => JSON.parse(localStorage.getItem('vf-tools:coc7-builder:v1') || '{}').historico || []);
  verifica(hist.length === 1 && hist[0].nome === 'Teste Fluxo', 'salvar no histórico grava o investigador');
  verifica(erros.length === 0, 'criação do zero sem erro de console' + (erros.length ? ': ' + erros.join(' | ') : ''));
  await pagina.close();
}

/* Controles de escolha: rolagem com "Rolar as oito", idade 17 (redução e Sorte em duas rolagens),
   Explorador com fórmula alternativa (radio), grupo de escolha (radio) e perícias livres (checkbox). */
async function controles(browser){
  console.log('\nControles de escolha (1100px)');
  const pagina = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  const erros = [];
  pagina.on('console', m => { if(m.type() === 'error') erros.push('console: ' + m.text()); });
  pagina.on('pageerror', e => erros.push('pageerror: ' + e.message));
  await pagina.addInitScript(() => { Math.random = () => 0.5; });
  await pagina.goto(ARQUIVO);
  const etapa = () => pagina.locator('.stepper-label').innerText();
  const avancar = async () => { await pagina.locator('button[data-acao="avancar"]').click(); await pagina.waitForTimeout(120); };
  await pagina.fill('#nome', 'Controles');
  await avancar();
  await pagina.check('#metodo-rolar');
  await pagina.locator('button[data-acao="rolar-todas"]').click();
  await pagina.waitForTimeout(100);
  const valorFor = await pagina.inputValue('#car-for');
  verifica(Number(valorFor) >= 15 && Number(valorFor) <= 90 && Number(valorFor) % 5 === 0, `rolagem gera FOR válida (${valorFor})`);
  await avancar();
  verifica((await etapa()).includes('Etapa 3 de 10'), 'rolagem das oito avança para a idade');

  /* Idade 17: faixa 15-19 (EDU -5 fixa e 5 pontos divididos entre FOR e TAM, sem teste de EDU). */
  await pagina.fill('#idade', '17');
  await pagina.locator('#idade').press('Tab');
  await pagina.waitForTimeout(120);
  verifica(await pagina.locator('#idade-esc-0').count() === 1, 'idade 17 mostra a divisão de FOR e TAM');
  await avancar();
  verifica((await etapa()).includes('Etapa 3 de 10') && await pagina.locator('.alert.error').count() > 0, 'idade 17 sem a divisão é recusada');
  await pagina.selectOption('#idade-esc-0', '2');
  await pagina.waitForTimeout(120);
  await avancar();
  verifica((await etapa()).includes('Etapa 4 de 10'), 'idade 17 com a escolha avança para ocupação');

  await pagina.selectOption('#ocupacao', 'explorador');
  await pagina.waitForTimeout(120);
  await pagina.check('#alt-1');
  await pagina.waitForTimeout(120);
  await avancar();
  verifica((await etapa()).includes('Etapa 5 de 10'), 'Explorador com fórmula alternativa avança');
  await pagina.check('input[data-grupo="0"][data-id="nadar"]');
  await pagina.waitForTimeout(120);
  verifica(await pagina.locator('input[data-grupo="0"][data-id="escalar"]').isChecked() === false, 'grupo de escolha única troca a seleção');
  await pagina.check('input[data-grupo="1"][data-id="arma_rifle"]');
  await pagina.waitForTimeout(120);
  verifica(await pagina.locator('input[data-livre]').count() === 0, 'Explorador não mostra perícias livres (ocupação sem livres)');
  verifica(erros.length === 0, 'controles sem erro de console' + (erros.length ? ': ' + erros.join(' | ') : ''));
  await pagina.close();
}

/* Importação pela interface: backup válido restaura o investigador; backup de outro sistema é recusado com erro na tela. */
async function importar(browser){
  console.log('\nImportação de backup (1100px)');
  const pasta = fs.mkdtempSync(path.join(process.env.TMPDIR || '/tmp', 'coc7-imp-'));
  const bom = path.join(pasta, 'bom.json'), ruim = path.join(pasta, 'outro-sistema.json');
  fs.writeFileSync(bom, chamarBackup(estadoExemplo()));
  fs.writeFileSync(ruim, JSON.stringify({ sistema: 'dnd5e', versaoEsquema: 1, estado: estadoExemplo() }));
  const pagina = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  const erros = [];
  pagina.on('console', m => { if(m.type() === 'error') erros.push('console: ' + m.text()); });
  pagina.on('pageerror', e => erros.push('pageerror: ' + e.message));
  await pagina.goto(ARQUIVO);
  await pagina.setInputFiles('#importar', bom);
  await pagina.waitForTimeout(400);
  await pagina.locator('button[aria-label^="Etapa 1:"]').click();
  await pagina.waitForTimeout(120);
  verifica(await pagina.inputValue('#nome') === 'Ellen Vance', 'backup válido restaura o nome');
  await pagina.setInputFiles('#importar', ruim);
  await pagina.waitForTimeout(400);
  const msg = await pagina.locator('.alert.error').first().innerText().catch(() => '');
  verifica(msg.includes('outro sistema'), 'backup de outro sistema é recusado na tela');
  verifica(erros.length === 0, 'importação sem erro de console' + (erros.length ? ': ' + erros.join(' | ') : ''));
  await pagina.close();
}
function chamarBackup(estado){
  const { criarAmbiente } = require('./ambiente');
  return criarAmbiente().chamar('exportarBackupJson', estado);
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: CHROME, args: ['--no-sandbox'] });
  try {
    await percorrer(browser, 1100, 900);
    await percorrer(browser, 360, 800);
    await criarDoZero(browser);
    await controles(browser);
    await importar(browser);
  } finally {
    await browser.close();
  }
  if(falhas.length){
    console.log('\nFALHAS:');
    falhas.forEach(f => console.log('  -', f));
    process.exitCode = 1;
  } else {
    console.log('\nNavegador: tudo ok.');
  }
})().catch(err => { console.error('Erro no teste de navegador:', err.message); process.exitCode = 1; });
