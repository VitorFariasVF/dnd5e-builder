/* Fórmulas derivadas contra casos conferidos à mão (aritmética da fórmula d20 SRD 3.5, sem consultar o software). */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();

teste("modificador segue (valor - 10) / 2 arredondado para baixo", () => {
  const casos = [[1, -5], [3, -4], [8, -1], [9, -1], [10, 0], [11, 0], [12, 1], [13, 1], [14, 2], [15, 2], [18, 4], [20, 5], [30, 10]];
  casos.forEach(([valor, esperado]) => {
    assert.strictEqual(avaliar(ctx, `trpgModificador(${valor})`), esperado, "valor " + valor);
  });
});

teste("modificador de campo vazio ou ausente é null, não zero", () => {
  assert.strictEqual(avaliar(ctx, "trpgModificador(null)"), null);
  assert.strictEqual(avaliar(ctx, 'trpgModificador("")'), null);
  assert.strictEqual(avaliar(ctx, "trpgModificador(undefined)"), null);
});

/* Personagem 1: Destreza 14 (mod +2), armadura +5, escudo +2, tamanho 0. CA = 10+5+2+2+0 = 19. Iniciativa +2. */
/* Personagem 2: Destreza 8 (mod -1), sem armadura nem escudo, tamanho +1. CA = 10+0+0-1+1 = 10. Iniciativa -1. */
/* Personagem 3: Destreza 20 (mod +5), armadura +8, sem escudo, tamanho -1. CA = 10+8+0+5-1 = 22. Iniciativa +5. */
const personagens = [
  { nome: "Personagem 1", des: 14, arm: 5, esc: 2, tam: 0, ca: 19, ini: 2 },
  { nome: "Personagem 2", des: 8, arm: 0, esc: 0, tam: 1, ca: 10, ini: -1 },
  { nome: "Personagem 3", des: 20, arm: 8, esc: 0, tam: -1, ca: 22, ini: 5 }
];

personagens.forEach(c => {
  teste(c.nome + ": CA e iniciativa batem com a conta feita à mão", () => {
    const expr = `(() => { const p = estadoPadrao().personagem; p.atributos.destreza = ${c.des};
      p.derivados.armadura = ${c.arm}; p.derivados.escudo = ${c.esc}; p.derivados.tamanho = ${c.tam};
      return trpgDerivados(p); })()`;
    const d = avaliar(ctx, expr);
    assert.strictEqual(d.ca, c.ca, "CA");
    assert.strictEqual(d.iniciativa, c.ini, "iniciativa");
  });
});

teste("pontos de perícia por nível: base + Inteligência, mínimo 1", () => {
  assert.strictEqual(avaliar(ctx, "trpgPontosPorNivel({ base: 2, inteligencia: 12 })"), 3);
  assert.strictEqual(avaliar(ctx, "trpgPontosPorNivel({ base: 0, inteligencia: 8 })"), 1);
  assert.strictEqual(avaliar(ctx, "trpgPontosPorNivel({ base: 4, inteligencia: 18 })"), 8);
});

teste("pontos de perícia ficam null enquanto a base da classe não for verificada", () => {
  assert.strictEqual(avaliar(ctx, "trpgPontosPorNivel({ base: null, inteligencia: 14 })"), null);
  assert.strictEqual(avaliar(ctx, "trpgPontosPorNivel({ base: 2, inteligencia: null })"), null);
});

teste("BBA, testes de resistência e PV por classe ficam null (dados NÃO VERIFICADOS)", () => {
  const d = avaliar(ctx, "trpgDerivados(estadoPadrao().personagem)");
  assert.strictEqual(d.bba, null);
  assert.strictEqual(d.resistencias, null);
  assert.strictEqual(d.pontosPorNivel, null);
});

teste("tabelas de raça e classe começam vazias (nada preenchido de memória)", () => {
  assert.deepStrictEqual(avaliar(ctx, "Object.keys(TRPG_RACAS)"), []);
  assert.deepStrictEqual(avaliar(ctx, "Object.keys(TRPG_CLASSES)"), []);
});

teste("cada regra e cada atributo tem campo fonte preenchido", () => {
  const regras = avaliar(ctx, "TRPG_REGRAS");
  Object.keys(regras).forEach(k => assert.ok(regras[k].fonte && regras[k].fonte.length > 3, "sem fonte: " + k));
  const atrs = avaliar(ctx, "TRPG_ATRIBUTOS");
  atrs.forEach(a => assert.ok(a.fonte && a.fonte.length > 3, "sem fonte: " + a.id));
});

teste("a licença fica NÃO VERIFICADO até o livro ser conferido", () => {
  assert.strictEqual(avaliar(ctx, "TRPG_META.licenca"), "NÃO VERIFICADO");
});

sair("regras");
