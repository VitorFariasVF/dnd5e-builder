/* Veículos (PDF p140-142): custo em XP pela pontuação e pela escala, ficha própria validada contra a pontuação,
   formato (escala, pontuação em passos de 5, atributos), campos da tela, estado antigo e PDF.
   Exemplos de custo: livro p142 (Sugoi 10 pts = 20 XP; Kiodai = 40 XP; Kami = 80 XP; 10 XP extras = 5 pontos). */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const valida = (n, p, modo = "estrito") => avaliar(ctx, `tdtValidarEtapa(${n}, ${JSON.stringify(p)}, ${JSON.stringify(modo)})`);
const erros = itens => itens.filter(x => x.nivel === "erro");
const avisos = itens => itens.filter(x => x.nivel === "aviso");
const temMsg = (itens, trecho) => itens.some(x => x.msg.includes(trecho));
const custo = v => avaliar(ctx, `tdtCustoVeiculo(${JSON.stringify(v)})`);

const base = () => ({
  nome: "Teste", jogador: "", conceito: "", nivelPoder: "livre", pontosTotal: 20,
  atributos: { P: 3, H: 3, R: 3 }, arquetipo: "", pericias: [],
  vantagens: [], desvantagens: [], historia: "", anotacoes: ""
});
/* Veículo padrão: 10 pontos, atributos P3 H0 R3 (6 pontos de ficha). */
const veic = (extra = {}) => Object.assign({ nome: "Robô", tipo: "mecha", escala: 1, pontos: 10, gratuito: false, atributos: { P: 3, H: 0, R: 3 }, vantagens: [], desvantagens: [] }, extra);

teste("Veículo: custo em XP pela pontuação e pela escala (livro p142)", () => {
  assert.strictEqual(custo({ pontos: 10, escala: 1 }), 2);   // Sugoi: 20 XP
  assert.strictEqual(custo({ pontos: 10, escala: 2 }), 4);   // Kiodai: 40 XP
  assert.strictEqual(custo({ pontos: 10, escala: 3 }), 8);   // Kami: 80 XP
  assert.strictEqual(custo({ pontos: 15, escala: 1 }), 3);   // 10 XP extras = 5 pontos: 30 XP
  assert.strictEqual(custo({ pontos: 20, escala: 1 }), 4);
});

teste("Veículo: pontuação abaixo de 10 ou fora de passos de 5, escala 0 ou ausente: custo a definir", () => {
  assert.strictEqual(custo({ pontos: 12, escala: 1 }), null);
  assert.strictEqual(custo({ pontos: 5, escala: 1 }), null);
  assert.strictEqual(custo({ pontos: 10, escala: 0 }), null);
  assert.strictEqual(custo({ pontos: 10, escala: null }), null);
});

teste("Veículo gratuito (campanha de veículos, p142) custa 0", () => {
  assert.strictEqual(custo({ pontos: 10, escala: 1, gratuito: true }), 0);
});

teste("Veículo entra nos pontos gastos do personagem (atributos 9 + veículo 2 = 11)", () => {
  const p = base(); p.veiculos = [veic()];
  assert.strictEqual(avaliar(ctx, `tdtPontosGastos(${JSON.stringify(p)})`), 11);
  assert.strictEqual(avaliar(ctx, `tdtResumoPontos(${JSON.stringify(p)}).custoVeiculos`), 2);
});

teste("Veículo gratuito não gasta pontos do personagem", () => {
  const p = base(); p.veiculos = [veic({ gratuito: true })];
  assert.strictEqual(avaliar(ctx, `tdtPontosGastos(${JSON.stringify(p)})`), 9);
});

teste("Ficha do veículo acima da pontuação: erro no estrito, aviso no livre", () => {
  const p = base(); p.veiculos = [veic({ atributos: { P: 5, H: 5, R: 5 } })];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "A ficha do veículo gasta 15 pontos, acima da pontuação 10"));
  assert.ok(temMsg(avisos(valida(5, p, "livre")), "acima da pontuação 10"));
  assert.ok(!temMsg(erros(valida(5, p, "livre")), "acima da pontuação"));
});

teste("Ficha do veículo abaixo da pontuação: só aviso com a sobra", () => {
  const p = base(); p.veiculos = [veic({ atributos: { P: 1, H: 0, R: 1 } })];
  assert.ok(temMsg(avisos(valida(5, p, "estrito")), "Sobram 8 pontos na ficha do veículo"));
  assert.deepStrictEqual(erros(valida(5, p, "estrito")).filter(x => x.msg.includes("veículo")), []);
});

teste("Formato do veículo: escala e pontuação inválidas bloqueiam nos dois modos", () => {
  const sem = base(); sem.veiculos = [veic({ escala: null })];
  assert.ok(temMsg(erros(valida(5, sem, "livre")), "Escolha quantas escalas"));
  const doze = base(); doze.veiculos = [veic({ pontos: 12 })];
  assert.ok(temMsg(erros(valida(5, doze, "livre")), "Pontuação do veículo: 10 ou mais, em passos de 5"));
  assert.ok(temMsg(erros(valida(5, doze, "estrito")), "Pontuação do veículo"));
});

teste("Atributo do veículo vazio ou fora de 0 a 5: erro de formato na tela do atributo", () => {
  const p = base(); p.veiculos = [veic({ atributos: { P: null, H: 0, R: 9 } })];
  const itens = erros(valida(5, p));
  assert.ok(itens.some(x => x.campo === "veic-0-atr-P" && x.msg.includes("Poder")));
  assert.ok(itens.some(x => x.campo === "veic-0-atr-R"));
});

teste("Nome do veículo: erro no estrito, aviso no livre", () => {
  const p = base(); p.veiculos = [veic({ nome: "  " })];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "Informe o nome do veículo"));
  assert.ok(temMsg(avisos(valida(5, p, "livre")), "Informe o nome do veículo"));
});

teste("Vantagem do veículo: usa o catálogo e o campo da tela (veic-K-vant-item-I)", () => {
  const p = base(); p.veiculos = [veic({ vantagens: [{ id: "nao_existe", qtd: 1, custo: 1, nota: "" }] })];
  const e = erros(valida(5, p));
  assert.ok(e.some(x => x.campo === "veic-0-vant-item-0" && x.msg.includes("fora da lista")));
});

teste("Desvantagem do veículo além de −2: só aviso (livro p65), conferida na etapa 5", () => {
  const p = base(); p.veiculos = [veic({ desvantagens: [{ id: "fraqueza", valor: -2, nota: "" }, { id: "pacifista", valor: -2, nota: "" }] })];
  assert.ok(temMsg(avisos(valida(5, p, "estrito")), "As desvantagens do veículo somam -4"));
  assert.deepStrictEqual(erros(valida(5, p, "estrito")).filter(x => x.campo && x.campo.startsWith("veic-")), []);
});

teste("Dado antigo sem veículos: ficha ganha lista vazia; veículo sem atributos ganha H 0", () => {
  assert.deepStrictEqual(avaliar(ctx, `(() => { substituirEstado({ personagem: { nome: "x" } }); return state.personagem.veiculos; })()`), []);
  assert.deepStrictEqual(avaliar(ctx, `(() => { substituirEstado({ personagem: { nome: "x", veiculos: [{ nome: "v", escala: 1, pontos: 10 }] } }); return state.personagem.veiculos[0].atributos; })()`), { P: null, H: 0, R: null });
});

teste("PDF: seção Veículos com nome, escala, pontos e custo em XP", () => {
  avaliar(ctx, `(() => { substituirEstado({ personagem: Object.assign(${JSON.stringify(base())}, { veiculos: [${JSON.stringify(veic())}] }) }); return true; })()`);
  const html = avaliar(ctx, "tdtFichaHtml()");
  assert.ok(html.includes("<h2>Veículos</h2>"));
  assert.ok(html.includes("Robô"));
  assert.ok(html.includes("1 escala acima do piloto"));
  assert.ok(html.includes("2 pt (20 XP)"));
});

teste("Regras: pontuação mínima 10, passo 5 e escala mínima 1 vêm de rules.js", () => {
  assert.deepStrictEqual(avaliar(ctx, "TDT_RULES.veiculos"), { pontosMin: 10, pontosPasso: 5, escalaMin: 1, xpPorPontoEscala1: 2 });
});

sair("veículos");
