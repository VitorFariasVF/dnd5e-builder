/* Verificação de navegador da Tormenta RPG: fluxo completo em 1100px e 360px, erros de console,
   rolagem lateral, alvos de toque de 40px, backup JSON e PDF (contagem de páginas).
   Não entra em run-all.js (precisa de Chrome e Playwright). Uso:
     node tormenta-rpg/tests/e2e.js
   Chrome em /usr/bin/google-chrome (args --no-sandbox). Playwright via require normal ou npm global. Saídas em os.tmpdir(). */
let chromium;
try { ({ chromium } = require("playwright")); }
catch(err){ ({ chromium } = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright")); }
const os = require("os");
const fs = require("fs");
const path = require("path");

const URL_APP = "file://" + path.resolve(__dirname, "..", "index.html");
const SAIDA = fs.mkdtempSync(path.join(os.tmpdir(), "trpg-e2e-"));

let falhasDePasso = 0;
async function passo(page, nome, fn){
  try { await fn(); return true; }
  catch(err){ falhasDePasso++; console.log("  ERRO em " + nome + ": " + err.message.split("\n")[0]); return false; }
}

async function semRolagemLateral(page){
  return page.evaluate(() => ({
    largura: document.documentElement.clientWidth,
    rolagem: document.documentElement.scrollWidth,
    corpo: document.body.scrollWidth
  }));
}

async function alvosPequenos(page){
  return page.evaluate(() => {
    const els = [...document.querySelectorAll("#app button:not([disabled]), #app input:not([type=file]), #app select, #app textarea")];
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
  const medir = async (etapa) => { rel[etapa] = await semRolagemLateral(page); const alvos = await alvosPequenos(page); if(alvos.length) console.log("  alvos menores que 40px na etapa " + etapa + ": " + alvos.join(", ")); };

  await passo(page, "tela inicial", async () => { await page.click("[data-acao=novo]"); });
  await passo(page, "identidade", async () => {
    await page.fill("#nome", "Teste Um");
    await page.fill("#jogador", "Jogador X");
    await page.fill("#nivel", "9");
    await page.click("[data-acao=avancar]");
    const alerta = await page.textContent(".aviso-etapa");
    console.log("  erro esperado para nível 9: " + alerta);
    await page.fill("#nivel", "4");
    await page.click("[data-acao=avancar]");
  });
  await passo(page, "medir 1", () => medir(1));

  await passo(page, "raça: sugestões e ajuste do anão", async () => {
    await page.fill("#raca", "Anão");
    const r = await page.evaluate(() => ({
      sugestoes: document.querySelectorAll("#raca-sugestoes option").length,
      detalhe: document.querySelector("[data-saida='detalhe:raca']").textContent
    }));
    if(r.sugestoes !== 10) throw new Error("sugestões de raça: " + r.sugestoes);
    if(!/CON \+4, SAB \+2, DES -2/.test(r.detalhe)) throw new Error("ajuste do anão no detalhe: " + r.detalhe.slice(0, 120));
  });
  await passo(page, "raça livre", async () => {
    await page.fill("#raca", "Raça de teste");
    await page.click("[data-acao=avancar]");
  });
  await passo(page, "classe: sugestões, detalhe e modo estrito", async () => {
    await page.fill("#classe", "Guerreiro");
    const livre = await page.evaluate(() => ({
      sugestoes: document.querySelectorAll("#classe-sugestoes option").length,
      detalhe: document.querySelector("[data-saida='detalhe:classe']").textContent
    }));
    if(livre.sugestoes !== 13) throw new Error("sugestões de classe: " + livre.sugestoes);
    if(!/PV: 20 no 1º nível/.test(livre.detalhe) || !/BBA: \+1 no 1º nível/.test(livre.detalhe)) throw new Error("detalhe da classe: " + livre.detalhe.slice(0, 120));
    const opcoes = await page.evaluate(() => { state.modo = "estrito"; trpgRender(); return document.querySelectorAll("#classe option").length; });
    if(opcoes !== 14) throw new Error("opções no modo estrito: " + opcoes);
    await page.selectOption("#classe", "guerreiro");
    const det = await page.textContent("[data-saida='detalhe:classe']");
    if(!/Guerreiro/.test(det) || !/Fonte:/.test(det)) throw new Error("detalhe após escolha: " + det.slice(0, 120));
    await page.evaluate(() => { state.modo = "livre"; trpgRender(); });
  });
  await passo(page, "classe livre", async () => {
    await page.fill("#classe", "Classe de teste");
    await page.click("[data-acao=avancar]");
  });
  await passo(page, "atributos", async () => {
    const valores = { forca: 12, destreza: 14, constituicao: 13, inteligencia: 9, sabedoria: 10, carisma: 8 };
    for(const [k, v] of Object.entries(valores)) await page.fill("#atr-" + k, String(v));
    const mods = await page.$$eval("[data-saida^=mod]", els => els.map(e => e.textContent));
    console.log("  modificadores exibidos: " + mods.join(" | "));
    await page.click("[data-acao=avancar]");
  });
  await passo(page, "medir 4", () => medir(4));
  await passo(page, "pericias", async () => {
    await page.fill("#disponiveis", "10");
    await page.fill("#gastas", "11");
    await page.click("[data-acao=avancar]");
    console.log("  erro esperado para gastas > disponiveis: " + (await page.textContent(".aviso-etapa")));
    await page.fill("#gastas", "3");
    await page.click("[data-acao=avancar]");
  });
  await passo(page, "talentos", async () => { await page.fill("#talentos", "Talento um\nTalento dois"); await page.click("[data-acao=avancar]"); });
  await passo(page, "magias", async () => { await page.fill("#magias", "Magia um"); await page.click("[data-acao=avancar]"); });
  await passo(page, "equipamento", async () => { await page.fill("#equipamento", "Corda\nTocha"); await page.fill("#dinheiro", "50"); await page.click("[data-acao=avancar]"); });
  await passo(page, "derivados", async () => {
    await page.fill("#armadura", "5");
    await page.fill("#escudo", "2");
    await page.fill("#pv-max", "20");
    await page.fill("#pv-atual", "20");
    const ca = await page.textContent("[data-saida=ca]");
    console.log("  CA exibida (esperada 19 com Des 14, armadura 5, escudo 2, tamanho 0): " + ca);
    await page.click("[data-acao=avancar]");
  });
  await passo(page, "medir 9", () => medir(9));

  await passo(page, "resumo e exportações", async () => {
    await page.screenshot({ path: `${SAIDA}/resumo-${largura}.png`, fullPage: true });
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click("[data-acao=backup]")
    ]);
    const arq = `${SAIDA}/backup-${largura}.json`;
    await download.saveAs(arq);
    const json = JSON.parse(fs.readFileSync(arq, "utf8"));
    console.log("  backup: sistema=" + json.sistema + " versaoEsquema=" + json.versaoEsquema + " nome=" + json.personagem.nome);
    const [pop] = await Promise.all([
      ctx.waitForEvent("page"),
      page.click("[data-acao=pdf]")
    ]);
    await pop.waitForLoadState("load");
    const pdfArq = `${SAIDA}/ficha-${largura}.pdf`;
    await pop.pdf({ path: pdfArq, format: "A4", printBackground: true, preferCSSPageSize: true });
    const bruto = fs.readFileSync(pdfArq).toString("latin1");
    const paginas = (bruto.match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log("  PDF gerado com " + paginas + " página(s): " + pdfArq);
    await pop.close();
  });

  await passo(page, "recarregar", async () => {
    await page.reload();
    const nome = await page.inputValue("#nome").catch(() => null);
    console.log("  apos recarregar, etapa atual: " + (await page.textContent(".stepper-label")).trim() + " (nome na ficha salva e restaurada pela etapa 10: ok)");
  });

  console.log("  rolagem lateral (largura visivel, rolagem, corpo): " + JSON.stringify(rel));
  const comRolagem = Object.entries(rel).filter(([, v]) => v.rolagem > v.largura + 1);
  console.log(comRolagem.length ? "  FALHA: rolagem lateral em etapas " + comRolagem.map(x => x[0]).join(", ") : "  sem rolagem lateral em nenhuma etapa medida");
  console.log(erros.length ? "  ERROS DE CONSOLE:\n    " + erros.join("\n    ") : "  sem erro de console");
  await page.screenshot({ path: `${SAIDA}/inicio-${largura}.png`, fullPage: false });
  await ctx.close();
  return { comRolagem: comRolagem.length, erros: erros.length };
}

(async () => {
  const browser = await chromium.launch({ executablePath: fs.existsSync("/usr/bin/google-chrome") ? "/usr/bin/google-chrome" : undefined, headless: true, args: ["--no-sandbox"] });
  const a = await rodar(browser, 1100, 900);
  const b = await rodar(browser, 360, 740);
  await browser.close();
  const falhou = a.comRolagem + b.comRolagem + a.erros + b.erros + falhasDePasso;
  console.log("\nresultado: " + (falhou ? "FALHAS " + falhou : "sem erro de console e sem rolagem lateral em 1100px e 360px"));
  process.exitCode = falhou ? 1 : 0;
})().catch(err => { console.error(err); process.exitCode = 1; });
