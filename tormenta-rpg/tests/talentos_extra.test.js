/* Talentos extras (rules-talentos-extra.js): existência, fonte, merge sem sobrescrever os principais.
   Valores esperados digitados à mão a partir do livro (PDF p97 a p113). node tormenta-rpg/tests/talentos_extra.test.js */
const vm = require("vm");
const fs = require("fs");
const path = require("path");
const { criarAmbiente, avaliar, RAIZ } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ARQUIVO_EXTRA = path.join(RAIZ, "rules-talentos-extra.js");
const codigoExtra = fs.readFileSync(ARQUIVO_EXTRA, "utf8");

/* Espelho de rules-geral.js já carregado (TRPG_TALENTOS com os 13 principais) e, em seguida, o arquivo extra. */
const ctx = criarAmbiente();
const principaisAntes = avaliar(ctx, "TRPG_TALENTOS");
const idsPrincipais = Object.keys(principaisAntes);
vm.runInContext(codigoExtra, ctx, { filename: "rules-talentos-extra.js" });

const extras = avaliar(ctx, "TRPG_TALENTOS_EXTRA");
const idsExtras = Object.keys(extras);
const todos = avaliar(ctx, "TRPG_TALENTOS");

teste("o arquivo expõe TRPG_TALENTOS_EXTRA com pelo menos 10 talentos novos", () => {
  assert.ok(idsExtras.length >= 10, "esperado >= 10, obtido " + idsExtras.length);
});

teste("cada talento novo tem nome, lista de pré-requisitos (array), benefício e página PDF na fonte", () => {
  const faltas = [];
  idsExtras.forEach(id => {
    const t = extras[id];
    if (typeof t.nome !== "string" || !t.nome) faltas.push(id + ": sem nome");
    if (!Array.isArray(t.pre)) faltas.push(id + ": pre não é array");
    if (typeof t.beneficio !== "string" || !t.beneficio) faltas.push(id + ": sem benefício");
    if (!/Tormenta RPG, PDF p\d+ \(livro do usuário\)/.test(t.fonte || "")) faltas.push(id + ": fonte sem página PDF");
  });
  assert.deepStrictEqual(faltas, []);
});

teste("páginas dos talentos novos ficam na faixa de combate, perícia, destino e domínios (PDF p97 a p113)", () => {
  const fora = idsExtras.filter(id => {
    const p = Number((extras[id].fonte.match(/PDF p(\d+)/) || [])[1]);
    return !(p >= 97 && p <= 113);
  });
  assert.deepStrictEqual(fora, []);
});

teste("benefício de cada talento novo tem no máximo 20 palavras", () => {
  const longos = idsExtras.filter(id => extras[id].beneficio.split(/\s+/).length > 20);
  assert.deepStrictEqual(longos, []);
});

teste("nenhum id novo repete um id dos talentos principais", () => {
  const repetidos = idsExtras.filter(id => idsPrincipais.includes(id));
  assert.deepStrictEqual(repetidos, []);
});

teste("nomes dos talentos novos são únicos e não repetem os principais", () => {
  const nomesPrincipais = Object.values(principaisAntes).map(t => t.nome);
  const nomes = idsExtras.map(id => extras[id].nome);
  assert.strictEqual(new Set(nomes).size, nomes.length, "nome duplicado entre os extras");
  assert.deepStrictEqual(nomes.filter(n => nomesPrincipais.includes(n)), []);
});

teste("merge: os 13 talentos principais não foram sobrescritos (mesmo conteúdo)", () => {
  idsPrincipais.forEach(id => {
    assert.deepStrictEqual(todos[id], principaisAntes[id], "principal alterado: " + id);
  });
});

teste("merge: todo id novo entrou em TRPG_TALENTOS e o total é principais + extras", () => {
  idsExtras.forEach(id => assert.deepStrictEqual(todos[id], extras[id], "não copiado: " + id));
  assert.strictEqual(Object.keys(todos).length, idsPrincipais.length + idsExtras.length);
});

teste("merge: uma segunda carga não duplica nem altera nada", () => {
  vm.runInContext(codigoExtra, ctx, { filename: "rules-talentos-extra.js" });
  assert.strictEqual(Object.keys(avaliar(ctx, "TRPG_TALENTOS")).length, idsPrincipais.length + idsExtras.length);
});

teste("arquivo sem rules-geral.js carregado: não lança erro e não toca em TRPG_TALENTOS", () => {
  const sozinho = vm.createContext({ console });
  vm.runInContext(codigoExtra, sozinho, { filename: "rules-talentos-extra.js" });
  assert.strictEqual(vm.runInContext("typeof TRPG_TALENTOS", sozinho), "undefined");
  assert.strictEqual(Object.keys(vm.runInContext("TRPG_TALENTOS_EXTRA", sozinho)).length, idsExtras.length);
});

teste("pré-requisitos de exemplo conferidos no livro: Mira Mortal (PDF p101), Golpe com Duas Mãos (PDF p100), Domínio da Guerra (PDF p113)", () => {
  assert.deepStrictEqual(extras["mira-mortal"].pre, ["Destreza 17", "Sabedoria 13", "Mira Apurada", "Tiro Certeiro", "Tiro Longo", "Bônus base de ataque +11"]);
  assert.deepStrictEqual(extras["golpe-com-duas-maos"].pre, ["Força 15", "Ataque Poderoso"]);
  assert.ok(extras["dominio-guerra"].pre[0].includes("Keenn, Khalmyr, Lin-Wu, Ragnar, Tauron ou Valkaria"));
  assert.ok(extras["dominio-guerra"].fonte.includes("PDF p113 "));
});

teste("domínios trazem o texto do devoto e não criam o talento Devoto", () => {
  const dominios = idsExtras.filter(id => id.startsWith("dominio-"));
  assert.ok(dominios.length >= 10, "domínios: " + dominios.length);
  dominios.forEach(id => assert.ok(extras[id].pre.some(p => /^Devoto de /.test(p)), "pré sem devoto: " + id));
  assert.strictEqual(todos["devoto"], undefined);
});

teste("talentos com efeito complexo trazem nota de efeito não implementado", () => {
  ["ataque-em-movimento", "ataque-giratorio", "ao-sabor-do-destino"].forEach(id => {
    assert.ok(/não implementado/.test(extras[id].nota || ""), "sem nota: " + id);
  });
});

sair();
