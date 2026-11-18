/* Migração de ids renomeados: copia -> clone (vantagem) e insano -> transtorno (desvantagem). Livro 3DeT Victory p51 e p74-75. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const ids = avaliar(ctx, "[TDT_RULES.vantagens.map(v => v.id), TDT_RULES.desvantagens.map(d => d.id)]");

teste("catálogo: clone existe e copia não; transtorno existe e insano não", () => {
  assert.ok(ids[0].includes("clone") && !ids[0].includes("copia"));
  assert.ok(ids[1].includes("transtorno") && !ids[1].includes("insano"));
});

teste("ensureStateShape converte copia e insano salvos nos ids novos", () => {
  avaliar(ctx, 'state.personagem = Object.assign(estadoPadrao().personagem, { vantagens: [{ id: "copia", nota: "" }], desvantagens: [{ id: "insano", valor: -1 }] }); ensureStateShape(); 0');
  assert.strictEqual(avaliar(ctx, "state.personagem.vantagens[0].id"), "clone");
  assert.strictEqual(avaliar(ctx, "state.personagem.desvantagens[0].id"), "transtorno");
});

teste("ficha sem ids antigos continua igual", () => {
  avaliar(ctx, 'state.personagem = Object.assign(estadoPadrao().personagem, { vantagens: [{ id: "clone" }], desvantagens: [] }); ensureStateShape(); 0');
  assert.strictEqual(avaliar(ctx, "state.personagem.vantagens[0].id"), "clone");
});

sair();
