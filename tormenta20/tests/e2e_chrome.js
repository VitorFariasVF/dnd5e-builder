/* Teste ponta a ponta no Chrome headless (Playwright + /usr/bin/google-chrome).
   Percorre a criação de um Clérigo nível 1 em 1100 px e 360 px, procura erro de console, rolagem lateral
   e recusa no modo estrito; depois confere o PDF (2 páginas A4, sem estouro de conteúdo).
   Não entra em run_all.js (precisa de navegador). Uso: node tormenta20/tests/e2e_chrome.js
   Capturas em /tmp/t20-capturas (fora do repositório). */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
const { PDFDocument } = require(path.join("/opt/npm-tools/node_modules/pdf-lib"));

const URL = "file://" + path.join(__dirname, "..", "index.html");
const SAIDA = "/tmp/t20-capturas";
fs.mkdirSync(SAIDA, { recursive: true });

const falhas = [];
const ok = (nome, cond, detalhe) => { if(!cond) falhas.push(nome + (detalhe ? " -> " + JSON.stringify(detalhe) : "")); console.log((cond ? "ok   " : "FALHA ") + nome); };

async function semRolagemLateral(page, rotulo){
  const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  ok(`${rotulo}: sem rolagem lateral (${r.sw} <= ${r.cw})`, r.sw <= r.cw + 1, r);
}

/* Avança uma etapa e confere rolagem lateral em cada uma delas. */
async function avancar(page){
  await page.click('[data-acao="avancar"]');
  await page.waitForTimeout(120);
  const etapa = await page.evaluate(() => (document.querySelector(".stepper-label") || { textContent: "" }).textContent.trim());
  const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  if(!(r.sw <= r.cw + 1)) falhas.push(`rolagem lateral em "${etapa}" (${r.sw} > ${r.cw})`);
  console.log(`      ${etapa}: largura ${r.sw} de ${r.cw}`);
}

async function rodar(largura){
  console.log(`\n== ${largura}px ==`);
  const navegador = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"], headless: true });
  const contexto = await navegador.newContext({ viewport: { width: largura, height: 900 }, acceptDownloads: true });
  const page = await contexto.newPage();
  const erros = [];
  page.on("console", m => { if(m.type() === "error" || m.type() === "warning") erros.push(`${m.type()}: ${m.text()}`); });
  page.on("pageerror", e => erros.push("pageerror: " + e.message));
  await page.goto(URL);
  await page.evaluate(() => { try { localStorage.clear(); } catch(e){} });
  await page.reload();

  await page.click('[data-acao="tela-nova"]');
  await semRolagemLateral(page, "tela inicial da ficha");

  /* 1. Modo estrito e tentativa de avançar sem escolher (sem modo a etapa não avança) */
  await avancar(page);
  ok("sem modo, a etapa 1 mostra erro (alert)", (await page.locator('#app [role="alert"]').count()) > 0);
  await page.check('input[name="t20-modo"][value="estrito"]');
  await avancar(page);

  /* 2. Identidade: nome vazio recusado no estrito, depois preenchido */
  await avancar(page);
  ok("nome vazio recusado no estrito", (await page.locator('#app [role="alert"]').count()) > 0);
  await page.waitForTimeout(450);
  ok("foco vai para o campo nome", await page.evaluate(() => document.activeElement && document.activeElement.id === "nome"));
  await page.fill("#nome", "Clérigo de Teste");
  await avancar(page);

  /* 3. Raça e 4. Origem */
  await page.selectOption("#raca", "anao");
  await avancar(page);
  await page.selectOption("#origem", "Acólito");
  await page.selectOption("#beneficio-0", "Cura");
  await page.selectOption("#beneficio-1", "Intuição");
  await avancar(page);
  await semRolagemLateral(page, "etapa origem");

  /* 5. Classe */
  await page.selectOption("#classe", "clerigo");
  await avancar(page);

  /* 6. Atributos: SAB 3 (4 pts) + CON 2 (2) + CAR 2 (2) + DES 2 (2) = 10 pontos */
  for(let i = 0; i < 3; i++) await page.click("#atr-sabedoria");
  for(let i = 0; i < 2; i++) await page.click("#atr-constituicao");
  for(let i = 0; i < 2; i++) await page.click("#atr-carisma");
  for(let i = 0; i < 2; i++) await page.click("#atr-destreza");
  const pontos = await page.textContent("#pontos");
  ok("compra mostra 10 de 10 pontos", /10 de 10/.test(pontos), pontos);
  await semRolagemLateral(page, "etapa atributos");
  if(largura < 600) await page.screenshot({ path: path.join(SAIDA, `atributos-${largura}.png`), fullPage: true });
  await avancar(page);

  /* 7. Perícias: 2 livres (Clérigo; Anão não dá extras; INT 0) */
  await avancar(page);
  ok("perícias: recusa com 0 de 2 livres", (await page.locator('#app [role="alert"]').count()) > 0);
  await page.check('input[data-nome="Atuação"]');
  await page.check('input[data-nome="Diplomacia"]');
  await avancar(page);

  /* 8. Poderes (opcional) */
  await avancar(page);

  /* 9. Magias: 3 de 1º círculo */
  await avancar(page);
  ok("magias: recusa sem as 3 magias", (await page.locator('#app [role="alert"]').count()) > 0);
  for(let i = 0; i < 3; i++) await page.click('[data-acao="magia-add"]');
  await page.fill("#magia-0", "Curar Ferimentos");
  await page.fill("#magia-1", "Bênção");
  await page.fill("#magia-2", "Escudo da Fé");
  await avancar(page);

  /* 10. Equipamento e defesa */
  await page.click('[data-acao="equip-add"]');
  await page.fill("#equip-0", "Maça");
  await page.fill("#def-armadura", "2");
  await avancar(page);
  await semRolagemLateral(page, "etapa equipamento");

  /* 11. Derivados: Clérigo nível 1, SAB 3, CON 2, DES 2, Anão (deslocamento 9 m), armadura 2.
     PV = 16 + 2 = 18; PM = 5 + SAB 3 = 8; Defesa = 10 + DES 2 + armadura 2 = 14; treino +0. */
  const valores = await page.$$eval("#app .score", els => els.map(e => e.textContent.trim()));
  ok("derivados: PV 18, PM 8, Defesa 14, Deslocamento 9 m, treino +0", JSON.stringify(valores) === JSON.stringify(["18", "8", "14", "9 m", "+0"]), valores);
  await avancar(page);

  /* 12. Resumo: ficha válida e PDF */
  ok("resumo: ficha válida no estrito", (await page.textContent("#app")).includes("Ficha válida"));
  await semRolagemLateral(page, "resumo");
  if(largura < 600) await page.screenshot({ path: path.join(SAIDA, `resumo-${largura}.png`), fullPage: true });

  /* PDF: abre a janela de pré-visualização e confere as duas páginas */
  const popupPromessa = contexto.waitForEvent("page");
  await page.click('[data-acao="exp-pdf"]');
  const pop = await popupPromessa;
  await pop.waitForLoadState("load");
  await pop.setViewportSize({ width: largura, height: 900 });
  await pop.screenshot({ path: path.join(SAIDA, `pdf-preview-${largura}.png`), fullPage: true });
  /* A medição de estouro usa a largura de 1100 px: o zoom da prévia em telas estreitas distorce scrollHeight. */
  await pop.setViewportSize({ width: 1100, height: 900 });
  const info = await pop.evaluate(() => {
    const paginas = [...document.querySelectorAll("article.pagina")];
    return paginas.map(p => ({ altura: p.getBoundingClientRect().height, estoura: p.scrollHeight > p.clientHeight + 2 }));
  });
  ok("PDF: 2 páginas", info.length === 2, info);
  ok("PDF: nenhuma página estoura o conteúdo", info.every(p => !p.estoura), info);
  await pop.emulateMedia({ media: "print" });
  const bytes = await pop.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
  const pdf = await PDFDocument.load(bytes);
  ok("PDF gerado pelo Chrome tem 2 páginas", pdf.getPageCount() === 2, pdf.getPageCount());
  fs.writeFileSync(path.join(SAIDA, `ficha-${largura}.pdf`), bytes);
  await pop.close();

  /* Backup: baixa e reimporta em outra sessão (round trip pela interface) */
  const downloadPromessa = page.waitForEvent("download");
  await page.click('#app .actions [data-acao="exp-backup"]');
  const download = await downloadPromessa;
  const caminhoBackup = path.join(SAIDA, `backup-${largura}.json`);
  await download.saveAs(caminhoBackup);
  const backup = JSON.parse(fs.readFileSync(caminhoBackup, "utf8"));
  ok("backup do navegador: sistema e versão", backup.sistema === "tormenta20" && backup.versaoEsquema === 1, backup.sistema);

  await page.evaluate(() => { try { localStorage.clear(); } catch(e){} });
  await page.reload();
  await page.setInputFiles("#t20-importar", caminhoBackup);
  await page.waitForTimeout(400);
  const nomeImportado = await page.evaluate(() => (JSON.parse(localStorage.getItem("vf-tools:tormenta20-builder:v1") || "{}").estado || {}).personagem?.nome);
  ok("importação pela tela restaura o nome", nomeImportado === "Clérigo de Teste", nomeImportado);

  /* Captura da tela inicial e da etapa de perícias em 360 px */
  if(largura < 600){
    await page.evaluate(() => { try { localStorage.clear(); } catch(e){} });
  }
  await page.screenshot({ path: path.join(SAIDA, `inicio-${largura}.png`), fullPage: true });

  ok(`sem erro de console em ${largura}px (${erros.length})`, erros.length === 0, erros.slice(0, 5));
  await navegador.close();
}

(async () => {
  await rodar(1100);
  await rodar(360);
  console.log(falhas.length ? `\n${falhas.length} falha(s):\n- ${falhas.join("\n- ")}` : "\nTodas as checagens de navegador passaram.");
  process.exitCode = falhas.length ? 1 : 0;
})().catch(e => { console.error("Erro no teste de navegador:", e); process.exitCode = 1; });
