/* Verificação de navegador da 3DeT Victory: fluxo completo em 1100px e 360px (sete etapas, backup, reimportação,
   PDF com duas páginas), erros de console, rolagem lateral e alvos de toque de 40px.
   Não entra em run-all.js (precisa de Chrome e Playwright). Uso:
     node 3det/tests/e2e.js
   Chrome em /usr/bin/google-chrome (args --no-sandbox). Playwright via require normal ou npm global. Saídas em os.tmpdir(). */
let chromium;
try { ({ chromium } = require("playwright")); }
catch(err){ ({ chromium } = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright")); }
const os = require("os");
const fs = require("fs");
const path = require("path");

const URL_APP = "file://" + path.resolve(__dirname, "..", "index.html");
const SAIDA = fs.mkdtempSync(path.join(os.tmpdir(), "3det-e2e-"));

let falhasDePasso = 0;
async function passo(nome, fn){
  try { return await fn(); }
  catch(err){ falhasDePasso++; console.log("  ERRO em " + nome + ": " + err.message.split("\n")[0]); return null; }
}

async function semRolagemLateral(page){
  return page.evaluate(() => ({
    largura: document.documentElement.clientWidth,
    rolagem: document.documentElement.scrollWidth,
    corpo: document.body.scrollWidth
  }));
}

/* Alvos de toque menores que 40px dentro de #app. Checkbox fica de fora: o rótulo inteiro tem 44px de altura. */
async function alvosPequenos(page){
  return page.evaluate(() => {
    const els = [...document.querySelectorAll("#app button:not([disabled]), #app input:not([type=file]):not([type=checkbox]), #app select, #app textarea")];
    const area = e => { const r = e.getBoundingClientRect(); const extra = e.closest(".stepper-dots") ? 20 : 0; return { w: r.width + extra, h: r.height + extra }; };
    return els.filter(e => { const a = area(e); return a.w > 0 && (a.h < 40 || a.w < 40); })
      .map(e => (e.id || e.dataset.acao || e.tagName) + " " + Math.round(area(e).w) + "x" + Math.round(area(e).h));
  });
}

async function rodar(browser, largura, altura){
  const ctx = await browser.newContext({ viewport: { width: largura, height: altura }, acceptDownloads: true });
  const page = await ctx.newPage();
  const erros = [];
  page.on("console", m => { if(m.type() === "error" || m.type() === "warning") erros.push("console " + m.type() + ": " + m.text()); });
  page.on("pageerror", e => erros.push("pageerror: " + e.message));
  await page.goto(URL_APP);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  const tag = largura + "px";
  console.log("\n== " + tag + " ==");

  const rel = {};
  const medir = async (etapa) => {
    rel[etapa] = await semRolagemLateral(page);
    const alvos = await alvosPequenos(page);
    if(alvos.length) console.log("  alvos menores que 40px na etapa " + etapa + ": " + alvos.join(", "));
  };

  await passo("tela inicial", () => page.click("[data-acao=novo]"));

  /* Etapa 1: conceito. Nível Herói fixa 20 pontos. */
  await passo("etapa 1", async () => {
    await page.fill("#nome", "Teste E2E");
    await page.fill("#jogador", "Jogador X");
    await page.fill("#conceito", "Médico de campo");
    await page.selectOption("#nivel-poder", "heroi");
    const pts = await page.inputValue("#pontos-total");
    if(pts !== "20") throw new Error("pontos do Herói deveriam ser 20, vieram " + pts);
    await page.click("[data-acao=avancar]");
  });
  await passo("medir 1", () => medir(1));

  /* Etapa 2: arquétipo. Elfo custa 1; o detalhe mostra a fonte. */
  await passo("etapa 2", async () => {
    await page.selectOption("#arquetipo", "elfo");
    const det = await page.textContent("[data-saida='detalhe:arquetipo']");
    if(!/Elfo/.test(det) || !/Custo: 1/.test(det)) throw new Error("detalhe do Elfo: " + det.slice(0, 120));
    await page.click("[data-acao=avancar]");
  });
  await passo("medir 2", () => medir(2));

  /* Etapa 3: atributos. Recursos aparecem ao vivo. P3 H3 R3 = PA 3, PM 15, PV 15. */
  await passo("etapa 3", async () => {
    await page.fill("#atr-P", "3");
    await page.fill("#atr-H", "3");
    await page.fill("#atr-R", "3");
    const recursos = await page.textContent(".tdt-recursos");
    if(!/PA 3/.test(recursos) || !/PM 15/.test(recursos) || !/PV 15/.test(recursos)) throw new Error("recursos ao vivo: " + recursos);
    await page.click("[data-acao=avancar]");
  });
  await passo("medir 3", () => medir(3));

  /* Etapa 4: perícias. */
  await passo("etapa 4", async () => {
    await page.check("#pericia-medicina");
    await page.click("[data-acao=avancar]");
  });
  await passo("medir 4", () => medir(4));

  /* Etapa 5: vantagens. Maestria precisa de perícia escolhida. */
  await passo("etapa 5", async () => {
    await page.click("[data-acao=vant-add][data-id=agil]");
    await page.click("[data-acao=vant-add][data-id=forte]");
    await page.click("[data-acao=vant-add][data-id=maestria]");
    await page.selectOption("#vant-nota-2", "medicina");
    await page.fill("#busca-vantagem", "rique");
    const visiveis = await page.evaluate(() => [...document.querySelectorAll("#catalogo-vantagens > li")].filter(li => !li.hidden).map(li => li.dataset.nome));
    if(visiveis.length !== 1 || visiveis[0] !== "riqueza") throw new Error("busca de vantagem: " + visiveis.join(", "));
    await page.fill("#busca-vantagem", "");
    await page.click("[data-acao=avancar]");
  });
  await passo("medir 5", () => medir(5));

  /* Etapa 6: desvantagens. Tapado dá +1 ponto. */
  await passo("etapa 6", async () => {
    await page.click("[data-acao=desv-add][data-id=tapado]");
    const resumo = await page.textContent("[data-saida='desv-resumo']");
    if(!/^-1/.test(resumo.trim())) throw new Error("resumo das desvantagens: " + resumo);
    await page.click("[data-acao=avancar]");
  });
  await passo("medir 6", () => medir(6));

  /* Etapa 7: revisão. Gastos 14 (atributos 9, perícia 1, Elfo 1, Ágil 1, Forte 1, Maestria 1) de 21 disponíveis: saldo +7. */
  await passo("etapa 7", async () => {
    const saldo = await page.textContent("#contador-pontos [data-saida='saldo']");
    if(saldo.trim() !== "+7") throw new Error("saldo esperado +7, veio " + saldo);
    const pendencias = await page.textContent(".tdt-pendencias");
    if(!/Nenhuma pendência/.test(pendencias)) throw new Error("pendências inesperadas: " + pendencias.slice(0, 160));
  });
  await passo("medir 7", () => medir(7));

  /* Backup: baixa, nome de arquivo e conteúdo. */
  const arquivo = await passo("backup", async () => {
    const [download] = await Promise.all([page.waitForEvent("download"), page.click("[data-acao=backup]")]);
    const caminho = path.join(SAIDA, download.suggestedFilename());
    await download.saveAs(caminho);
    const dados = JSON.parse(fs.readFileSync(caminho, "utf8"));
    if(dados.sistema !== "3DeT Victory" || dados.versaoEsquema !== 1) throw new Error("backup com sistema/versão errados");
    if(!/^3det-victory-teste-e2e\.json$/.test(download.suggestedFilename())) throw new Error("nome do arquivo: " + download.suggestedFilename());
    return caminho;
  });

  /* PDF: a janela tem exatamente duas páginas. */
  await passo("pdf", async () => {
    const [popup] = await Promise.all([page.waitForEvent("popup"), page.click("[data-acao=pdf]")]);
    await popup.waitForLoadState("domcontentloaded");
    const n = await popup.locator(".pagina").count();
    if(n !== 2) throw new Error("PDF com " + n + " páginas, esperado 2");
    const texto = await popup.textContent("body");
    if(!/Playtest/.test(texto) || !/não do livro final/.test(texto)) throw new Error("PDF sem aviso de fonte");
    await popup.close();
  });

  /* Histórico: salva pela revisão e confere na tela inicial. */
  await passo("histórico", async () => {
    await page.click("[data-acao=salvar]");
    await page.click("[data-acao=inicio]");
    const lista = await page.textContent("#app .tdt-lista");
    if(!/Teste E2E/.test(lista)) throw new Error("ficha não apareceu no histórico");
  });

  /* Reimportação: na tela inicial, importa o backup e confere o nome e o arquétipo. */
  await passo("reimportar", async () => {
    await page.setInputFiles("input[data-campo=importar]", arquivo);
    await page.waitForFunction(() => { const n = document.querySelector("#nome"); return n && n.value === "Teste E2E"; });
    const naEtapa1 = await page.evaluate(() => document.querySelector("#arquetipo") === null);
    if(!naEtapa1) throw new Error("após importar a ficha deve abrir na etapa 1");
    await page.click("[data-acao=avancar]");
    const arq2 = await page.inputValue("#arquetipo");
    if(arq2 !== "elfo") throw new Error("arquétipo após importar: " + arq2);
  });

  await page.screenshot({ path: `${SAIDA}/inicio-${largura}.png`, fullPage: false });
  const comRolagem = Object.keys(rel).filter(k => rel[k].rolagem > rel[k].largura);
  console.log(comRolagem.length ? "  ROLAGEM LATERAL nas etapas " + comRolagem.join(", ") : "  sem rolagem lateral em nenhuma etapa medida");
  console.log(erros.length ? "  ERROS DE CONSOLE:\n    " + erros.join("\n    ") : "  sem erro de console");
  await ctx.close();
  return { comRolagem: comRolagem.length, erros: erros.length };
}

(async () => {
  const browser = await chromium.launch({ executablePath: fs.existsSync("/usr/bin/google-chrome") ? "/usr/bin/google-chrome" : undefined, headless: true, args: ["--no-sandbox"] });
  const a = await rodar(browser, 1100, 900);
  const b = await rodar(browser, 360, 740);
  await browser.close();
  const falhou = a.comRolagem + b.comRolagem + a.erros + b.erros + falhasDePasso;
  console.log("\nresultado: " + (falhou ? "FALHAS " + falhou : "fluxo completo, sem erro de console e sem rolagem lateral em 1100px e 360px"));
  process.exitCode = falhou ? 1 : 0;
})().catch(err => { console.error(err); process.exitCode = 1; });
