/* Teste de release: referências do index.html existem, padrão VF Tools presente, sem função duplicada,
   todo dado de regra tem fonte, sem alert() bloqueante e sem emoji. */
const fs = require("fs");
const path = require("path");
const { carregar, criarTeste, SCRIPTS, RAIZ, PASTA } = require("./_ambiente");
const t = criarTeste("Release Tormenta20");

const html = fs.readFileSync(path.join(PASTA, "index.html"), "utf8");
const ler = f => fs.readFileSync(path.join(PASTA, f), "utf8");

/* Referências de script e de link existem (relativas a tormenta20/) */
const refs = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m => m[1])
  .concat([...html.matchAll(/<link\s+rel="stylesheet"\s+href="([^"]+)"/g)].map(m => m[1]));
const faltando = refs.filter(r => !fs.existsSync(path.resolve(PASTA, r)));
t.igual("todas as referências de <script> e <link> existem", faltando, []);
t.check("index.html usa data-tool tormenta20-builder", /data-tool="tormenta20-builder"/.test(html));
t.check("index.html usa o padrão VF Tools (tokens, components, motion, tema)",
  /vf\/tokens\.css/.test(html) && /vf\/components\.css/.test(html) && /vf\/motion\.css/.test(html) && /id="theme"/.test(html) && /data-theme="dark"/.test(html));
t.check("index.html tem container #app e h1", /id="app"/.test(html) && /<h1/.test(html));
t.check("index.html tem o botão de limpar dados (#reset)", /id="reset"/.test(html));

/* Arquivos obrigatórios do contrato */
const obrigatorios = ["rules.js", "state.js", "validator.js", "engine.js", "storage.js", "export.js", "export-pdf.js", "ui.js", "main.js", "estilo.css"];
t.igual("arquivos obrigatórios presentes", obrigatorios.filter(f => !fs.existsSync(path.join(PASTA, f))), []);

/* Nenhuma função declarada duas vezes entre os arquivos do sistema */
const nomes = {};
const duplicadas = [];
for(const f of SCRIPTS){
  const codigo = fs.readFileSync(path.join(RAIZ, f), "utf8");
  for(const m of codigo.matchAll(/^function ([A-Za-z0-9_]+)\(/gm)){
    if(nomes[m[1]]) duplicadas.push(`${m[1]} (${nomes[m[1]]} e ${f})`);
    else nomes[m[1]] = f;
  }
}
const uiCodigo = ler("ui.js");
for(const m of uiCodigo.matchAll(/^function ([A-Za-z0-9_]+)\(/gm)){
  if(nomes[m[1]]) duplicadas.push(`${m[1]} (${nomes[m[1]]} e ui.js)`);
  nomes[m[1]] = "ui.js";
}
t.igual("nenhuma função duplicada entre os arquivos", duplicadas, []);

/* Sem alert() bloqueante e sem emoji (padrão VF Tools) */
const todos = fs.readdirSync(PASTA).filter(f => f.endsWith(".js") || f.endsWith(".html") || f.endsWith(".css"));
const comAlert = todos.filter(f => /(^|[^.\w])alert\(/.test(ler(f)));
t.igual("sem alert() bloqueante no sistema", comAlert, []);
const comEmoji = todos.filter(f => /\p{Emoji_Presentation}/u.test(ler(f)));
t.igual("sem emoji nos arquivos do sistema", comEmoji, []);

/* Todo dado de regra tem fonte (ou NÃO VERIFICADO explícito) */
const ctx = carregar(SCRIPTS);
const semFonteRaca = Object.entries(ctx.T20_RACAS).filter(([k, r]) => !r.fonte).map(([k]) => k);
t.igual("toda raça tem fonte", semFonteRaca, []);
const semFonteClasse = Object.entries(ctx.T20_CLASSES).filter(([k, c]) => !c.fontePv || !c.fontePericias || !c.fonteMagias).map(([k]) => k);
t.igual("toda classe tem fonte de PV, perícias e magias", semFonteClasse, []);
t.igual("14 classes do livro básico", ctx.T20_CLASSE_IDS.length, 14);
t.igual("31 perícias", ctx.T20_PERICIAS.length, 31);
t.igual("níveis: 14 classes com linha por nível 6 a 20", Object.keys(ctx.T20_NIVEIS.classes).length, 14);
t.check("catálogo de poderes carregado (objeto por id)", Object.keys(ctx.T20_PODERES).length > 100);
t.igual("35 origens", ctx.T20_ORIGENS.length, 35);
t.igual("6 atributos", ctx.T20_ATRIBUTOS.length, 6);
t.check("toda fonte de origem informa que benefícios específicos não foram verificados",
  /NÃO VERIFICADO/.test(ctx.T20_ORIGEM_FONTE));
t.igual("pontos de compra: total 10", ctx.T20_PONTOS_COMPRA.total, 10);
t.igual("níveis suportados: 1 a 5", [ctx.T20_NIVEL_MIN, ctx.T20_NIVEL_MAX], [1, 5]);
const cores = Object.values(ctx.T20_CLASSES).map(c => c.cor);
t.igual("cada classe tem cor própria", new Set(cores).size, cores.length);

t.fim();
