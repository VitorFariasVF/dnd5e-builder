/* Cálculos da 3DeT Victory conferidos à mão. Cada personagem tem a conta no comentário.
   Valores vêm de rules.js (Playtest 2023 e Kit Introdutório). */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const calc = (expr, personagem) => avaliar(ctx, `(() => { const p = ${JSON.stringify(personagem)}; return ${expr}; })()`);

/* Personagem A: P2 H4 R2, sem nada além dos atributos.
   PA = 2×1 = 2; PM = 4×5 = 20; PV = 2×5 = 10. (Exemplo do contrato.) */
const A = { nome: "A", nivelPoder: "iniciante", pontosTotal: 10, atributos: { P: 2, H: 4, R: 2 }, arquetipo: "", pericias: [], vantagens: [], desvantagens: [] };

/* Personagem B: P0 H3 R5. Atributo 0 vale o mínimo de 1 ponto de recurso.
   PA = 1 (mínimo, no lugar de 0); PM = 3×5 = 15; PV = 5×5 = 25. */
const B = { nome: "B", nivelPoder: "iniciante", pontosTotal: 10, atributos: { P: 0, H: 3, R: 5 }, arquetipo: "", pericias: [], vantagens: [], desvantagens: [] };

/* Personagem C (Herói, 20 pts): P5 H5 R5, perícias Animais, Arte e Luta, desvantagens Ambiente (−1) e Bateria (−1).
   Atributos: 15 pontos. Perícias: 3 × 1 = 3. Gastos = 18.
   Disponíveis = 20 + min(2, 2) = 22. Saldo = 22 − 18 = 4. */
const C = { nome: "C", nivelPoder: "heroi", pontosTotal: 20, atributos: { P: 5, H: 5, R: 5 }, arquetipo: "",
  pericias: ["animais", "arte", "luta"], vantagens: [],
  desvantagens: [{ id: "ambiente", valor: -1, nota: "" }, { id: "bateria", valor: -1, nota: "" }] };

/* Personagem D (Herói, 20 pts): P3 H3 R3, Medicina, arquétipo Elfo (custo 1).
   Vantagens: Ágil (1), Forte (1), Maestria em Medicina ×2 (1 cada = 2), Riqueza (custo escolhido 4), Inventário (2).
   Desvantagem: Tapado (−1) → +1 ponto.
   Atributos 9 + perícias 1 + Elfo 1 + Ágil 1 + Forte 1 + Maestria 2 + Riqueza 4 + Inventário 2 = 21 gastos.
   Disponíveis = 20 + 1 = 21. Saldo = 0. PA 3, PM 15, PV 15. */
const D = { nome: "D", nivelPoder: "heroi", pontosTotal: 20, atributos: { P: 3, H: 3, R: 3 }, arquetipo: "elfo",
  pericias: ["medicina"],
  vantagens: [
    { id: "agil", qtd: 1, custo: 1, nota: "" },
    { id: "forte", qtd: 1, custo: 1, nota: "" },
    { id: "maestria", qtd: 2, custo: 1, nota: "medicina" },
    { id: "riqueza", qtd: 1, custo: 4, nota: "" },
    { id: "inventario", qtd: 1, custo: 2, nota: "" }
  ],
  desvantagens: [{ id: "tapado", valor: -1, nota: "" }] };

/* Personagem E (Iniciante, 10 pts): P1 H1 R1, arquétipo Anão (custo 1 pt, 3DeT Victory PDF p67). */
const E = { nome: "E", nivelPoder: "iniciante", pontosTotal: 10, atributos: { P: 1, H: 1, R: 1 }, arquetipo: "anao",
  pericias: [], vantagens: [], desvantagens: [] };

teste("recursos do personagem A (P2 H4 R2): PA 2, PM 20, PV 10", () => {
  assert.deepStrictEqual(calc("tdtRecursos(p)", A), { PA: 2, PM: 20, PV: 10 });
});

teste("atributo 0 vale o mínimo de 1 no recurso (personagem B: PA 1, PM 15, PV 25)", () => {
  assert.deepStrictEqual(calc("tdtRecursos(p)", B), { PA: 1, PM: 15, PV: 25 });
});

teste("recurso fica null se o atributo ainda não foi digitado", () => {
  const r = calc("tdtRecursos(p)", { atributos: { P: null, H: 2, R: 2 } });
  assert.strictEqual(r.PA, null);
  assert.strictEqual(r.PM, 10);
});

teste("personagem C (Herói): gastos 18, disponíveis 22, saldo 4", () => {
  const r = calc("tdtResumoPontos(p)", C);
  assert.deepStrictEqual({ g: r.gastos, d: r.disponiveis, s: r.saldo }, { g: 18, d: 22, s: 4 });
});

teste("personagem D (Herói, com Maestria ×2 e Riqueza): gastos 21, saldo 0", () => {
  const r = calc("tdtResumoPontos(p)", D);
  assert.deepStrictEqual({ g: r.gastos, d: r.disponiveis, s: r.saldo }, { g: 21, d: 21, s: 0 });
});

teste("personagem D: custo de Maestria é 1 × quantidade 2 = 2", () => {
  assert.strictEqual(calc("tdtCustoVantagem(p.vantagens[2])", D), 2);
});

teste("custo de vantagem de faixa usa o valor escolhido (Alcance 2, Inventário 0)", () => {
  assert.strictEqual(calc("tdtCustoVantagem({ id: 'alcance', qtd: 1, custo: 2, nota: '' })", {}), 2);
  assert.strictEqual(calc("tdtCustoVantagem({ id: 'inventario', qtd: 1, custo: 0, nota: '' })", {}), 0);
});

teste("custo de vantagem de opções só aceita o valor escolhido (Riqueza 8)", () => {
  assert.strictEqual(calc("tdtCustoVantagem({ id: 'riqueza', qtd: 1, custo: 6, nota: '' })", {}), 6);
});

teste("desvantagens: o ganho é limitado a 2 (soma −3 vale 2 pontos, não 3)", () => {
  const P = { pontosTotal: 10, atributos: { P: 1, H: 1, R: 1 }, pericias: [], vantagens: [], arquetipo: "",
    desvantagens: [{ id: "ambiente", valor: -1 }, { id: "bateria", valor: -1 }, { id: "inapto", valor: -1 }] };
  assert.strictEqual(calc("tdtPontosDeDesvantagens(p)", P), 2);
  assert.strictEqual(calc("tdtValorDesvantagens(p)", P), -3);
});

teste("desvantagem do arquétipo NÃO dá pontos (Celestial traz Código, mas o jogador não escolheu nada)", () => {
  const P = { pontosTotal: 10, atributos: { P: 1, H: 1, R: 1 }, pericias: [], vantagens: [], arquetipo: "celestial", desvantagens: [] };
  assert.strictEqual(calc("tdtPontosDeDesvantagens(p)", P), 0);
  assert.strictEqual(calc("tdtPontosDisponiveis(p)", P), 10);
});

teste("arquétipo sem escolha custa 0; Elfo custa 1; Humano custa 0", () => {
  assert.strictEqual(calc("tdtCustoArquetipo({ arquetipo: '' })", {}), 0);
  assert.strictEqual(calc("tdtCustoArquetipo({ arquetipo: 'elfo' })", {}), 1);
  assert.strictEqual(calc("tdtCustoArquetipo({ arquetipo: 'humano' })", {}), 0);
});

teste("personagem E (Anão, custo 1 pt): gastos 4, saldo 6", () => {
  const r = calc("tdtResumoPontos(p)", E);
  assert.strictEqual(r.custoArquetipo, 1);
  assert.strictEqual(r.gastos, 4);
  assert.strictEqual(r.saldo, 6);
  assert.strictEqual(r.disponiveis, 10);
});

teste("pontos disponíveis ficam null com atributo vazio", () => {
  assert.strictEqual(calc("tdtSaldo({ pontosTotal: 10, atributos: { P: null, H: 1, R: 1 }, pericias: [], vantagens: [], desvantagens: [], arquetipo: '' })", {}), null);
});

teste("incompatibilidade vantagem×desvantagem: Aceleração e Lento (PDF p57)", () => {
  const P = { vantagens: [{ id: "aceleracao", qtd: 1, custo: 1, nota: "" }], desvantagens: [{ id: "lento", valor: -1, nota: "" }] };
  const pares = calc("tdtIncompatibilidades(p).map(x => [x.a.id, x.b.id])", P);
  assert.deepStrictEqual(pares, [["aceleracao", "lento"]]);
  const Q = { vantagens: [{ id: "agil", qtd: 1, custo: 1, nota: "" }], desvantagens: [{ id: "tapado", valor: -1, nota: "" }] };
  assert.deepStrictEqual(calc("tdtIncompatibilidades(p).length", Q), 0);
});

teste("personagem D não tem incompatibilidade (Ágil e Forte, Tapado sem Gênio)", () => {
  assert.deepStrictEqual(calc("tdtIncompatibilidades(p).length", D), 0);
});

sair("engine");
