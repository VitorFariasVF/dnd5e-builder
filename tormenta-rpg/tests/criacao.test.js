/* Criação orientada (sugestão de atributos): Elite e Pontos, com os valores e custos do livro (PDF p.27 e p.28).
   Métodos de rolagem não têm sugestão. Ordem neutra: a prioridade por classe não consta no livro. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const sugerir = (metodo) => avaliar(ctx, `trpgSugerirAtributos(${JSON.stringify(metodo)})`);

teste("custos de compra por pontos conferem com o livro (PDF p.28)", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_CUSTO_PONTOS"), {
    7: -4, 8: -2, 9: -1, 10: 0, 11: 1, 12: 2, 13: 3, 14: 4, 15: 6, 16: 8, 17: 11, 18: 14
  });
  assert.strictEqual(avaliar(ctx, "TRPG_PONTOS_TOTAL"), 20);
});

teste("valores do método Elite conferem com o livro (PDF p.27): 17, 15, 13, 12, 10 e 8", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_ELITE_VALORES"), [17, 15, 13, 12, 10, 8]);
});

teste("Elite: sugestão aplica os seis valores fixos na ordem neutra e diz que não há prioridade do livro", () => {
  const r = sugerir("elite");
  assert.strictEqual(r.ok, true);
  assert.deepStrictEqual(r.valores, { forca: 17, destreza: 15, constituicao: 13, inteligencia: 12, sabedoria: 10, carisma: 8 });
  assert.ok(r.nota.includes("Ordem neutra"), "nota diz ordem neutra");
  assert.ok(r.nota.includes("sem prioridade do livro"), "nota diz sem prioridade do livro");
});

teste("Pontos: a distribuição gasta exatamente 20 pontos e fica entre 7 e 18", () => {
  const dist = avaliar(ctx, "trpgMelhorDistribuicaoPontos(TRPG_PONTOS_TOTAL)");
  const custo = dist.reduce((s, v) => s + avaliar(ctx, `TRPG_CUSTO_PONTOS[${v}]`), 0);
  assert.strictEqual(dist.length, 6);
  assert.strictEqual(custo, 20);
  dist.forEach(v => assert.ok(v >= 7 && v <= 18, "valor fora de 7 a 18: " + v));
});

teste("Pontos: a distribuição mais equilibrada com 20 pontos é 14, 14, 13, 13, 13, 13 (menor amplitude e variância)", () => {
  assert.deepStrictEqual(avaliar(ctx, "trpgMelhorDistribuicaoPontos(TRPG_PONTOS_TOTAL)"), [13, 13, 13, 13, 14, 14]);
  const r = sugerir("pontos");
  assert.strictEqual(r.ok, true);
  assert.deepStrictEqual(r.valores, { forca: 14, destreza: 14, constituicao: 13, inteligencia: 13, sabedoria: 13, carisma: 13 });
  assert.ok(r.nota.includes("20 de 20"), "nota mostra o total gasto");
  assert.ok(r.nota.includes("sem prioridade do livro"), "nota diz sem prioridade do livro");
});

teste("métodos de rolagem (Padrão, Clássica, Heroica, Audaciosa) não têm sugestão e avisam que é preciso rolar", () => {
  ["padrao", "classica", "heroica", "audaciosa"].forEach(m => {
    const r = sugerir(m);
    assert.strictEqual(r.ok, false, m);
    assert.ok(r.motivo.includes("rolagem"), "aviso de rolagem em " + m);
    assert.strictEqual(r.valores, undefined, m);
  });
});

teste("sem método escolhido, a sugestão pede para escolher Elite ou Pontos", () => {
  const r = sugerir("manual");
  assert.strictEqual(r.ok, false);
  assert.ok(r.motivo.includes("Elite ou Pontos"));
});

teste("nota do método na tela: Elite e Pontos dizem ordem neutra; rolagem diz sem sugestão e cita a regra de fracasso (PDF p.28)", () => {
  const nota = (m) => avaliar(ctx, `trpgNotaMetodo(${JSON.stringify(m)})`);
  assert.ok(nota("elite").includes("sem prioridade do livro"));
  assert.ok(nota("pontos").includes("sem prioridade do livro"));
  assert.ok(nota("padrao").includes("Sem sugestão") || nota("padrao").includes("sem sugestão"));
  assert.ok(nota("padrao").includes("PDF p.28"));
});

teste("sugestão não altera o estado da ficha (função pura)", () => {
  const antes = avaliar(ctx, "estadoPadrao().personagem.atributos");
  sugerir("pontos");
  sugerir("elite");
  assert.deepStrictEqual(avaliar(ctx, "estadoPadrao().personagem.atributos"), antes);
});

teste("a sugestão de Pontos calcula a mesma iniciativa e modificadores que o app (Des 14 = +2)", () => {
  const r = sugerir("pontos");
  const d = avaliar(ctx, `trpgDerivados(Object.assign(estadoPadrao().personagem, { atributos: ${JSON.stringify(r.valores)} }))`);
  assert.deepStrictEqual(d.modificadores, { forca: 2, destreza: 2, constituicao: 1, inteligencia: 1, sabedoria: 1, carisma: 1 });
  assert.strictEqual(d.iniciativa, 2);
});

sair("criação orientada");
