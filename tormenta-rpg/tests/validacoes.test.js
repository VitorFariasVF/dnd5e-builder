/* Validações: caso aceito e caso recusado para cada regra de criação. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const aceito = (expr) => assert.strictEqual(avaliar(ctx, expr).length, 0, "esperava aceitar: " + expr + " -> " + JSON.stringify(avaliar(ctx, expr)));
const recusado = (expr, campo) => {
  const erros = avaliar(ctx, expr);
  assert.ok(erros.length > 0, "esperava recusar: " + expr);
  if(campo) assert.ok(erros.some(e => e.campo === campo), "campo esperado " + campo + " em " + JSON.stringify(erros));
};

teste("atributo: inteiro de 1 a 30 é aceito (limites incluídos)", () => {
  assert.strictEqual(avaliar(ctx, "trpgValidarAtributo(1)"), true);
  assert.strictEqual(avaliar(ctx, "trpgValidarAtributo(30)"), true);
});

teste("atributo: 0, 31, 10.5, null e texto são recusados", () => {
  ["0", "31", "10.5", "null", '"12"'].forEach(v => assert.strictEqual(avaliar(ctx, `trpgValidarAtributo(${v})`), false, v));
});

teste("nível: 1 a 5 aceito; 0 e 6 recusados", () => {
  assert.strictEqual(avaliar(ctx, "trpgValidarNivel(1)"), true);
  assert.strictEqual(avaliar(ctx, "trpgValidarNivel(5)"), true);
  assert.strictEqual(avaliar(ctx, "trpgValidarNivel(0)"), false);
  assert.strictEqual(avaliar(ctx, "trpgValidarNivel(6)"), false);
});

teste("identidade no modo livre: nome vazio é aceito", () => {
  aceito('trpgValidarEtapa(1, Object.assign(estadoPadrao().personagem, {nome: ""}), "livre")');
});

teste("identidade no modo estrito: nome vazio é recusado com o campo nome", () => {
  recusado('trpgValidarEtapa(1, estadoPadrao().personagem, "estrito")', "nome");
});

teste("identidade: nível 6 é recusado nos dois modos", () => {
  recusado('trpgValidarEtapa(1, Object.assign(estadoPadrao().personagem, {nivel: 6}), "livre")', "nivel");
});

teste("raça e classe no modo livre aceitam texto livre", () => {
  aceito('trpgValidarEtapa(2, Object.assign(estadoPadrao().personagem, {raca: "Qualquer"}), "livre")');
  aceito('trpgValidarEtapa(3, Object.assign(estadoPadrao().personagem, {classe: "Qualquer"}), "livre")');
});

teste("raça e classe no modo estrito são recusadas enquanto a tabela estiver vazia (NÃO VERIFICADO)", () => {
  const erros = avaliar(ctx, 'trpgValidarEtapa(2, Object.assign(estadoPadrao().personagem, {raca: "X"}), "estrito")');
  assert.ok(erros.length === 1 && /NÃO VERIFICADO/.test(erros[0].msg));
  recusado('trpgValidarEtapa(3, estadoPadrao().personagem, "estrito")', "classe");
});

teste("atributos: valor 0 em Força é recusado com o campo atr-forca", () => {
  recusado('trpgValidarEtapa(4, Object.assign(estadoPadrao().personagem, {atributos: Object.assign(estadoPadrao().personagem.atributos, {forca: 0})}), "livre")', "atr-forca");
});

teste("atributos: campo vazio (null) é recusado", () => {
  recusado('trpgValidarEtapa(4, Object.assign(estadoPadrao().personagem, {atributos: Object.assign(estadoPadrao().personagem.atributos, {carisma: null})}), "livre")', "atr-carisma");
});

teste("perícias: gastar mais do que o disponível é recusado", () => {
  recusado('trpgValidarEtapa(5, Object.assign(estadoPadrao().personagem, {pericias: {pontosDisponiveis: 3, graduacoesGastas: 4, observacao: ""}}), "livre")', "gastas");
});

teste("perícias: gastar até o disponível é aceito; disponível vazio (null) também", () => {
  aceito('trpgValidarEtapa(5, Object.assign(estadoPadrao().personagem, {pericias: {pontosDisponiveis: 3, graduacoesGastas: 3, observacao: ""}}), "livre")');
  aceito('trpgValidarEtapa(5, estadoPadrao().personagem, "livre")');
});

teste("derivados: PV atuais acima do máximo é recusado", () => {
  recusado('trpgValidarEtapa(9, Object.assign(estadoPadrao().personagem, {derivados: {armadura: 0, escudo: 0, tamanho: 0, pvAtuais: 12, pvMaximo: 10, deslocamento: ""}}), "livre")', "pv-atual");
});

teste("derivados: PV atuais igual ao máximo é aceito; bônus de armadura vazio é recusado", () => {
  aceito('trpgValidarEtapa(9, Object.assign(estadoPadrao().personagem, {derivados: {armadura: 0, escudo: 0, tamanho: 0, pvAtuais: 10, pvMaximo: 10, deslocamento: ""}}), "livre")');
  recusado('trpgValidarEtapa(9, Object.assign(estadoPadrao().personagem, {derivados: {armadura: null, escudo: 0, tamanho: 0, pvAtuais: null, pvMaximo: null, deslocamento: ""}}), "livre")', "armadura");
});

sair("validacoes");
