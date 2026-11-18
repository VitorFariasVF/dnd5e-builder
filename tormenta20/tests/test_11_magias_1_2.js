/* Magias de 1º e 2º círculo do livro (tormenta20/rules-magias-1-2.js): campos obrigatórios, ids únicos no arquivo,
   custo base por círculo (Tabela 4-1, p176), tipos, páginas de fonte e coerência de verificado.
   O arquivo é carregado por vm depois de rules.js e rules-magias.js (mesma ordem que a página deve usar). */
const fs = require("fs");
const vm = require("vm");
const path = require("path");
const { criarTeste, RAIZ } = require("./_ambiente");
const t = criarTeste("Magias de 1º e 2º círculo (livro, Tormenta20)");

const ARQ = "tormenta20/rules-magias-1-2.js";
const codigo = fs.readFileSync(path.join(RAIZ, ARQ), "utf8");

/* 1) ids únicos dentro do próprio arquivo (lidos do texto, antes da deduplicação) */
const idsNoTexto = [...codigo.matchAll(/^\s*id: "([^"]+)"/gm)].map(m => m[1]);
const repetidos = idsNoTexto.filter((id, i) => idsNoTexto.indexOf(id) !== i);
t.igual("ids são únicos dentro do arquivo", repetidos, []);

/* 2) carrega na mesma ordem: rules.js, rules-magias.js e o arquivo novo */
const ctx = { console, Math, Date, JSON, Number, String, Object, Array, Set, Map, Symbol, Promise };
ctx.globalThis = ctx;
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["tormenta20/rules.js", "tormenta20/rules-magias.js", ARQ]) {
  vm.runInContext(fs.readFileSync(path.join(RAIZ, f), "utf8"), ctx, { filename: f });
}
const magias = vm.runInContext("T20_MAGIAS", ctx);
const novas = idsNoTexto.map(id => magias.find(m => m.id === id));

t.check("T20_MAGIAS tem as magias deste arquivo", novas.every(Boolean), idsNoTexto.filter(id => !magias.find(m => m.id === id)));
t.igual("cada id aparece uma vez no array final", new Set(magias.map(m => m.id)).size, magias.length);

const TEXTO = v => typeof v === "string" && v.trim().length > 0;
const CUSTO_BASE = { 1: 1, 2: 3 };       // Tabela 4-1, p176: 1º círculo = 1 PM; 2º círculo = 3 PM
const TIPOS = ["arcana", "divina", "universal"];

t.igual("círculo é 1 ou 2", novas.filter(m => m.circulo !== 1 && m.circulo !== 2).map(m => m.nome), []);
t.igual("tipo é arcana, divina ou universal", novas.filter(m => !TIPOS.includes(m.tipo)).map(m => m.nome), []);
t.igual("custoPM base segue a tabela por círculo", novas.filter(m => m.custoPM !== CUSTO_BASE[m.circulo]).map(m => [m.nome, m.custoPM]), []);
t.igual("campos de texto obrigatórios preenchidos (escola, fonte, nome, efeito)",
  novas.filter(m => !TEXTO(m.nome) || !TEXTO(m.escola) || !TEXTO(m.fonte) || !TEXTO(m.efeito)).map(m => m.id), []);

/* execução, alcance, alvo e duração podem ser null só quando verificado é false (texto do livro incompleto) */
t.igual("execução, alcance e alvo são texto ou null (null só se não verificado)",
  novas.filter(m => !((TEXTO(m.execucao) && TEXTO(m.alcance) && TEXTO(m.alvo)) || m.verificado === false)).map(m => m.id), []);
t.igual("duração e resistência são texto ou null",
  novas.filter(m => !((m.duracao === null || TEXTO(m.duracao)) && (m.resistencia === null || TEXTO(m.resistencia)))).map(m => m.id), []);
t.igual("efeito é frase curta (até 160 caracteres, termina em pontuação)",
  novas.filter(m => m.efeito.length > 160 || !/[.!?]$/.test(m.efeito)).map(m => m.nome), []);
t.igual("verificado é booleano", novas.filter(m => typeof m.verificado !== "boolean").map(m => m.id), []);
t.igual("verificado true só com todos os campos do livro preenchidos",
  novas.filter(m => m.verificado === true && !(TEXTO(m.execucao) && TEXTO(m.alcance) && TEXTO(m.alvo) && m.duracao !== undefined)).map(m => m.id), []);
t.igual("fonte cita o livro e uma página p184 a p217",
  novas.filter(m => !/Tormenta20 Jogo do Ano, p(18[4-9]|19\d|20\d|21[0-7])\b/.test(m.fonte)).map(m => m.id), []);
t.igual("aprimoramentos, quando existem, têm custo inteiro não negativo e resumo",
  novas.filter(m => m.aprimoramentos !== undefined && !(Array.isArray(m.aprimoramentos) &&
    m.aprimoramentos.every(a => Number.isInteger(a.custoPM) && a.custoPM >= 0 && TEXTO(a.resumo)))).map(m => m.id), []);

/* contagens conferidas com os índices (p180 a p183): cada magia aparece uma vez aqui, mesmo quando o índice
   a lista em duas colunas. 1º círculo: 24 arcanas + 22 divinas + 8 universais = 54.
   2º círculo: 24 arcanas + 20 divinas + 4 universais = 48. Total 102. */
const porCirculo = c => novas.filter(m => m.circulo === c).length;
const porTipo = tp => novas.filter(m => m.tipo === tp).length;
t.igual("contagem de magias de 1º círculo", porCirculo(1), 54);
t.igual("contagem de magias de 2º círculo", porCirculo(2), 48);
t.igual("contagem de arcanas (1º + 2º)", porTipo("arcana"), 48);
t.igual("contagem de divinas (1º + 2º)", porTipo("divina"), 42);
t.igual("contagem de universais (1º + 2º)", porTipo("universal"), 12);

/* substituições e pendentes que este arquivo deve cobrir */
const pendentesCobertos = ["bola-de-fogo", "invisibilidade", "relampago"];
t.igual("cobre as 2º círculo pendentes (Bola de Fogo, Invisibilidade, Relâmpago)",
  pendentesCobertos.filter(id => !novas.find(m => m.id === id)), []);

/* Sem verificado sem página: magias que o livro não traz completas ficam marcadas */
t.igual("magias não verificadas são só as de texto incompleto (Oração: corpo da magia não extraído)",
  novas.filter(m => m.verificado === false).map(m => m.id).sort(), ["oracao"]);

t.fim();
