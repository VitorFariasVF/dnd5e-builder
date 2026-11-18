/* Magias de 3º a 5º círculo (rules-magias-3-5.js): carrega rules.js, rules-magias.js e o arquivo novo via vm
   (com `window` definido, como no navegador), valida campos obrigatórios, ids únicos, custo em PM por círculo,
   contagens por círculo e tipo, e a relação com os nomes pendentes de rules-magias.js. */
const vm = require("vm");
const fs = require("fs");
const path = require("path");
const { criarTeste, RAIZ } = require("./_ambiente");
const t = criarTeste("Magias de 3º a 5º círculo (Tormenta20)");

const ARQUIVOS = ["tormenta20/rules.js", "tormenta20/rules-magias.js", "tormenta20/rules-magias-3-5.js"];
const ctx = { console, Math, Date, JSON, Number, String, Object, Array, Set, Map, Symbol, Promise, setTimeout, clearTimeout };
ctx.window = ctx;
ctx.globalThis = ctx;
vm.createContext(ctx);

/* Carrega cada arquivo; o de 1º círculo e pendentes vêm antes do novo, como na página. */
const antes = [];
for (const f of ARQUIVOS) {
  const codigo = fs.readFileSync(path.join(RAIZ, f), "utf8");
  if (f.endsWith("rules-magias-3-5.js")) antes.push(vm.runInContext("T20_MAGIAS.length", ctx));
  vm.runInContext(codigo, ctx, { filename: f });
}
const todas = vm.runInContext("T20_MAGIAS", ctx);
const pendentes = vm.runInContext("T20_MAGIAS_PENDENTES", ctx);
const novas = todas.slice(antes[0]);

const TEXTO = v => typeof v === "string" && v.trim().length > 0;
const CUSTO_BASE = { 3: 6, 4: 10, 5: 15 };   /* Tabela 4-1 do livro (p176) */
const TIPOS = ["arcana", "divina", "universal"];

/* ---- Quantidade e carregamento ---- */
t.igual("o arquivo acrescenta 96 magias de 3º a 5º círculo", novas.length, 96);
t.igual("todas as novas estão entre 3º e 5º círculo", novas.filter(m => !(m.circulo >= 3 && m.circulo <= 5)).map(m => m.nome), []);

/* ---- Campos obrigatórios ---- */
const obrigatorios = ["id", "nome", "circulo", "escola", "tipo", "execucao", "alcance", "alvo", "efeito", "fonte", "verificado", "custoPM", "aprimoramentos"];
t.igual("cada magia nova tem os campos obrigatórios",
  novas.filter(m => obrigatorios.some(c => m[c] === undefined)).map(m => m.nome || m.id), []);
t.igual("nome, escola, execução, alcance e alvo são texto não vazio",
  novas.filter(m => !TEXTO(m.nome) || !TEXTO(m.escola) || !TEXTO(m.execucao) || !TEXTO(m.alcance) || !TEXTO(m.alvo)).map(m => m.nome), []);
t.igual("duração é texto ou null", novas.filter(m => !(m.duracao === null || TEXTO(m.duracao))).map(m => m.nome), []);
t.igual("resistência é texto ou null", novas.filter(m => !(m.resistencia === null || TEXTO(m.resistencia))).map(m => m.nome), []);
t.igual("tipo é arcana, divina ou universal", novas.filter(m => !TIPOS.includes(m.tipo)).map(m => m.nome), []);
t.igual("efeito é uma frase curta (até 160 caracteres, termina em pontuação)",
  novas.filter(m => !TEXTO(m.efeito) || m.efeito.length > 160 || !/[.!?]$/.test(m.efeito)).map(m => m.nome), []);
t.igual("fonte cita o livro e a página", novas.filter(m => !/^Tormenta20 Jogo do Ano, p\d+/.test(m.fonte)).map(m => m.nome), []);
t.igual("verificado é booleano", novas.filter(m => typeof m.verificado !== "boolean").map(m => m.nome), []);

/* ---- Custo em PM e aprimoramentos ---- */
t.igual("custo base em PM segue a Tabela 4-1 (3º = 6, 4º = 10, 5º = 15)",
  novas.filter(m => m.custoPM !== CUSTO_BASE[m.circulo]).map(m => ({ nome: m.nome, circulo: m.circulo, custoPM: m.custoPM })), []);
t.igual("aprimoramentos são lista de {custoPM número ≥ 0, resumo texto}",
  novas.filter(m => !Array.isArray(m.aprimoramentos) ||
    m.aprimoramentos.some(a => typeof a.custoPM !== "number" || a.custoPM < 0 || !TEXTO(a.resumo))).map(m => m.nome), []);

/* ---- Ids ---- */
const idsNovas = novas.map(m => m.id);
t.igual("ids das magias novas são únicos", new Set(idsNovas).size, idsNovas.length);
t.igual("ids são minúsculos, sem acento e sem espaço", idsNovas.filter(i => !/^[a-z0-9-]+$/.test(i)), []);
const idsTodas = todas.map(m => m.id);
t.igual("nenhum id novo repete id já existente em rules-magias.js",
  idsNovas.filter(i => idsTodas.indexOf(i) !== idsTodas.lastIndexOf(i)), []);

/* ---- Contagem por círculo e tipo ---- */
const contagem = (circ, tipo) => novas.filter(m => m.circulo === circ && m.tipo === tipo).length;
t.igual("3º círculo: 17 arcanas, 16 divinas, 7 universais", [contagem(3, "arcana"), contagem(3, "divina"), contagem(3, "universal")], [17, 16, 7]);
t.igual("4º círculo: 16 arcanas, 10 divinas, 4 universais", [contagem(4, "arcana"), contagem(4, "divina"), contagem(4, "universal")], [16, 10, 4]);
t.igual("5º círculo: 14 arcanas, 6 divinas, 6 universais", [contagem(5, "arcana"), contagem(5, "divina"), contagem(5, "universal")], [14, 6, 6]);

/* ---- Relação com os nomes pendentes de rules-magias.js (3º a 5º) ---- */
const pendentes35 = pendentes.filter(p => p.circulo >= 3 && p.circulo <= 5);
const semCobertura = [];
for (const p of pendentes35) {
  const achada = novas.find(m => m.nome.toLowerCase() === p.nome.toLowerCase());
  if (!achada) semCobertura.push(p.nome);
  else if (achada.circulo !== p.circulo) t.check(`${p.nome} tem o mesmo círculo do pendente`, false, { esperado: p.circulo, obtido: achada.circulo });
}
t.igual("todo pendente de 3º a 5º círculo com nome no livro foi coberto (só 'Sopro de Dragão' não aparece no livro)",
  semCobertura, ["Sopro de Dragão"]);

t.fim();
