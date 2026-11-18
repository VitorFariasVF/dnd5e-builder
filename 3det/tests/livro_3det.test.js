/* Itens do livro 3DeT Victory: Artefato por tipo e limite (PDF p139), Transtorno com opção (PDF p74-75) e fontes com página.
   Regra de jogo (limite por tipo): erro no estrito, aviso no livre. Formato (tipo inválido) bloqueia nos dois modos. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const valida = (n, p, modo = "estrito") => avaliar(ctx, `tdtValidarEtapa(${n}, ${JSON.stringify(p)}, ${JSON.stringify(modo)})`);
const erros = itens => itens.filter(x => x.nivel === "erro");
const avisos = itens => itens.filter(x => x.nivel === "aviso");
const temMsg = (itens, trecho) => itens.some(x => x.msg.includes(trecho));

const base = () => ({
  nome: "Teste", jogador: "", conceito: "", nivelPoder: "livre", pontosTotal: 99,
  atributos: { P: 3, H: 3, R: 3 }, arquetipo: "humano", pericias: [],
  vantagens: [], desvantagens: [], historia: "", anotacoes: ""
});
const art = (tipo, custo = 1) => ({ id: "artefato", qtd: 1, custo, nota: "", tipo });

teste("Artefato: cada entrada é um item, pode repetir e não exige quantidade", () => {
  assert.strictEqual(avaliar(ctx, `tdtVantagemRegra("artefato").itens`), true);
  const p = base(); p.vantagens = [art("arma"), art("armadura"), art("acessorio"), art("acessorio")];
  assert.ok(!temMsg(valida(5, p), "só pode ser escolhida uma vez"));
  assert.deepStrictEqual(erros(valida(5, p)), []);
});

teste("Artefato: 1 arma, 1 armadura e 2 acessórios são aceitos no estrito e no livre", () => {
  const p = base(); p.vantagens = [art("arma"), art("armadura"), art("acessorio"), art("acessorio")];
  assert.deepStrictEqual(erros(valida(5, p, "estrito")), []);
  assert.ok(!temMsg(avisos(valida(5, p, "livre")), "No máximo"));
});

teste("Artefato: 2 armas recusadas no estrito, aviso no livre (p139)", () => {
  const p = base(); p.vantagens = [art("arma"), art("arma")];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "No máximo 1 arma de Artefato"));
  assert.ok(temMsg(avisos(valida(5, p, "livre")), "No máximo 1 arma de Artefato"));
  assert.strictEqual(erros(valida(5, p, "livre")).length, 0);
});

teste("Artefato: 2 armaduras recusadas no estrito", () => {
  const p = base(); p.vantagens = [art("armadura"), art("armadura")];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "No máximo 1 armadura de Artefato"));
});

teste("Artefato: 3 acessórios recusados no estrito (limite é 2)", () => {
  const p = base(); p.vantagens = [art("acessorio"), art("acessorio"), art("acessorio")];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "No máximo 2 acessórios de Artefato"));
  const q = base(); q.vantagens = [art("acessorio"), art("acessorio")];
  assert.deepStrictEqual(erros(valida(5, q, "estrito")), []);
});

teste("Artefato sem tipo: pede o tipo (regra de jogo: erro no estrito, aviso no livre)", () => {
  const p = base(); p.vantagens = [art(null)];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "Escolha o tipo do Artefato"));
  assert.ok(temMsg(avisos(valida(5, p, "livre")), "Escolha o tipo do Artefato"));
});

teste("Artefato com tipo fora da lista: erro de formato nos dois modos", () => {
  const p = base(); p.vantagens = [art("veiculo")];
  assert.ok(temMsg(erros(valida(5, p, "livre")), "Tipo de Artefato inválido"));
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "Tipo de Artefato inválido"));
});

teste("Artefato: custo 1 ou mais, sem teto (12 aceito, 0 recusado)", () => {
  const ok = base(); ok.vantagens = [art("arma", 12)];
  assert.ok(!temMsg(erros(valida(5, ok)), "Custo de Artefato"));
  const ruim = base(); ruim.vantagens = [art("arma", 0)];
  assert.ok(temMsg(erros(valida(5, ruim)), "Custo de Artefato deve ser de 1 ou mais"));
  assert.strictEqual(avaliar(ctx, `tdtTextoCusto(tdtVantagemRegra("artefato"))`), "custo 1 ou mais");
  assert.strictEqual(avaliar(ctx, `tdtTextoCusto(tdtVantagemRegra("grimorio"))`), "custo 1 ou mais");
});

teste("Grimório não tem limite por tipo (p54-55): vários grimórios em nada são limitados", () => {
  assert.strictEqual(avaliar(ctx, `!!tdtVantagemRegra("grimorio").itens`), false);
  assert.strictEqual(avaliar(ctx, `tdtVantagemRegra("grimorio").custoMax === undefined`), true);
});

teste("Transtorno sem uma das oito opções: erro nos dois modos (p74-75)", () => {
  const p = base(); p.desvantagens = [{ id: "transtorno", valor: -1, nota: "" }];
  assert.ok(temMsg(erros(valida(6, p, "livre")), "Escolha um dos oito transtornos"));
  assert.ok(temMsg(erros(valida(6, p, "estrito")), "Escolha um dos oito transtornos"));
});

teste("Transtorno com opção válida: sem erro; opção fora da lista é recusada", () => {
  const ok = base(); ok.desvantagens = [{ id: "transtorno", valor: -1, subtipo: "fobia", nota: "" }];
  assert.ok(!temMsg(erros(valida(6, ok)), "transtornos do livro"));
  const ruim = base(); ruim.desvantagens = [{ id: "transtorno", valor: -1, subtipo: "tristeza", nota: "" }];
  assert.ok(temMsg(erros(valida(6, ruim)), "transtornos do livro"));
});

teste("Transtorno: as oito opções têm nome, efeito e página do livro", () => {
  assert.strictEqual(avaliar(ctx, `TDT_RULES.transtornosOpcoes.length`), 8);
  const ids = avaliar(ctx, `TDT_RULES.transtornosOpcoes.map(x => x.id)`);
  ids.forEach(id => {
    assert.ok(avaliar(ctx, `!!TDT_EFEITOS_DESVANTAGENS.transtorno.opcoes[${JSON.stringify(id)}].desc`), "efeito de " + id);
  });
});

teste("Transtorno: a tela mostra o efeito da opção escolhida, com a página", () => {
  const html = avaliar(ctx, `tdtItemDesvantagem({ id: "transtorno", valor: -1, subtipo: "fobia", nota: "" }, 0)`);
  assert.ok(html.includes("Diante do objeto do medo"), "texto da fobia");
  assert.ok(html.includes("PDF p.74-75"), "página");
});

teste("ensureStateShape: subtipo salvo com acento vira o id sem acento", () => {
  const sub = avaliar(ctx, `(() => { substituirEstado({ etapa: 6, tela: "ficha", modo: "livre", personagem: { nome: "x", desvantagens: [{ id: "transtorno", valor: -1, subtipo: "compulsão" }, { id: "transtorno", valor: -1, subtipo: "distração" }] } }); return state.personagem.desvantagens.map(d => d.subtipo); })()`);
  assert.deepStrictEqual(sub, ["compulsao", "distracao"]);
});

teste("Fontes: toda vantagem e desvantagem cita página do Victory (sem PT ou KI)", () => {
  const fontes = avaliar(ctx, `TDT_RULES.vantagens.concat(TDT_RULES.desvantagens).map(x => [x.id, x.fonte])`);
  fontes.forEach(([id, f]) => {
    assert.ok(/3DeT Victory, PDF p\d+/.test(f), id + ": " + f);
    assert.ok(!/\bPT\b|\bKI\b/.test(f), id + " ainda cita PT ou KI: " + f);
  });
});

teste("Fontes: Ataque Especial e Defesa Especial trazem as variações completas do livro", () => {
  assert.strictEqual(avaliar(ctx, `/Investida 1, Múltiplo/.test(tdtVantagemRegra("ataque_especial").desc)`), true);
  assert.strictEqual(avaliar(ctx, `/Titânica 3/.test(tdtVantagemRegra("defesa_especial").desc)`), true);
});

sair("livro 3DeT Victory");
