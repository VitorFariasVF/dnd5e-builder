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

/* Qualidades de Artefatos (PDF p139-141): catálogo, custo em XP (1 pt = 10 XP, mínimo 10 XP) e validação. */
const artQ = (tipo, custo, quals) => ({ id: "artefato", qtd: 1, custo, nota: "", tipo, qualidades: quals });
const custoArt = v => avaliar(ctx, `tdtCustoVantagem(${JSON.stringify(v)})`);

teste("Qualidades de Artefato: as 18 do livro estão no catálogo, com página (PDF p139-141)", () => {
  const lista = avaliar(ctx, `TDT_RULES.qualidadesArtefato.map(q => [q.id, q.nome, q.fonte])`);
  assert.strictEqual(lista.length, 18);
  lista.forEach(([id, nome, fonte]) => {
    assert.ok(/3DeT Victory, PDF p1(39|40|41)/.test(fonte), id + ": " + fonte);
    assert.ok(nome && nome.length > 2, id + " sem nome");
  });
  const nomes = lista.map(x => x[1]);
  ["Abençoado", "Acurado", "Amaldiçoado", "Aprimorado", "Auspicioso", "Condutor", "Encantado", "Espiritual", "Flagelo", "Fortificada", "Honrado", "Inteligente", "Leve", "Maciço", "Obra-Prima", "Sagrado", "Venenoso", "Vorpal"].forEach(n => {
    assert.ok(nomes.includes(n), "falta " + n);
  });
});

teste("Qualidades de Artefato: custos fixos conferidos com o livro (+10, +20, +50; Honrado –10)", () => {
  assert.strictEqual(avaliar(ctx, `tdtCustoQualidadeXP({ id: "abencoado" })`), 10);
  assert.strictEqual(avaliar(ctx, `tdtCustoQualidadeXP({ id: "acurado" })`), 20);
  assert.strictEqual(avaliar(ctx, `tdtCustoQualidadeXP({ id: "vorpal" })`), 50);
  assert.strictEqual(avaliar(ctx, `tdtCustoQualidadeXP({ id: "honrado" })`), -10);
});

teste("Qualidades de Artefato: faixa escolhida muda o custo (Encantado +3 = 50 XP; Aprimorado +2 = 20 XP)", () => {
  assert.strictEqual(avaliar(ctx, `tdtCustoQualidadeXP({ id: "encantado", escolha: 3 })`), 50);
  assert.strictEqual(avaliar(ctx, `tdtCustoQualidadeXP({ id: "aprimorado", escolha: 2 })`), 20);
  assert.strictEqual(avaliar(ctx, `tdtCustoQualidadeXP({ id: "amaldicoado", escolha: 2 })`), -20);
  assert.strictEqual(avaliar(ctx, `tdtCustoQualidadeXP({ id: "encantado", escolha: null })`), null);
});

teste("Artefato com qualidades: o custo soma o base (1 pt = 10 XP) e as qualidades em XP", () => {
  assert.strictEqual(custoArt(artQ("arma", 1, [{ id: "acurado", escolha: null }])), 3);
  assert.strictEqual(custoArt(artQ("arma", 2, [{ id: "vorpal", escolha: null }, { id: "acurado", escolha: null }])), 9);
  assert.strictEqual(custoArt(artQ("armadura", 1, [{ id: "encantado", escolha: 3 }])), 6);
  assert.strictEqual(custoArt(artQ("acessorio", 1, [{ id: "aprimorado", escolha: 2 }])), 3);
});

teste("Artefato: desvantagens não baixam o custo abaixo de 10 XP (1 pt, p139)", () => {
  assert.strictEqual(custoArt(artQ("armadura", 1, [{ id: "honrado", escolha: null }])), 1);
  assert.strictEqual(custoArt(artQ("armadura", 1, [{ id: "amaldicoado", escolha: 2 }])), 1);
  assert.strictEqual(custoArt(artQ("arma", 2, [{ id: "amaldicoado", escolha: 2 }])), 1);
});

teste("Artefato sem qualidade mantém o custo de antes (regra antiga preservada)", () => {
  assert.strictEqual(custoArt(artQ("arma", 4, [])), 4);
  assert.strictEqual(custoArt({ id: "artefato", qtd: 1, custo: 4, nota: "", tipo: "arma" }), 4);
});

teste("Artefato: faixa sem escolha deixa o custo 'a definir' (não chuta); perícia sem escolha não muda o custo", () => {
  assert.strictEqual(custoArt(artQ("arma", 1, [{ id: "encantado", escolha: null }])), null);
  assert.strictEqual(custoArt(artQ("acessorio", 1, [{ id: "obra_prima", escolha: null }])), 2);
});

teste("Auspicioso não é calculada (custo depende da vantagem concedida): custo a definir e erro na validação", () => {
  assert.strictEqual(custoArt(artQ("acessorio", 1, [{ id: "auspicioso", escolha: null }])), null);
  const p = base(); p.vantagens = [artQ("acessorio", 1, [{ id: "auspicioso", escolha: null }])];
  assert.ok(temMsg(erros(valida(5, p, "livre")), "ainda não é calculada"));
});

teste("Qualidade fora da lista: erro nos dois modos", () => {
  const p = base(); p.vantagens = [artQ("arma", 1, [{ id: "flamejante", escolha: null }])];
  assert.ok(temMsg(erros(valida(5, p, "livre")), "fora da lista"));
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "fora da lista"));
});

teste("Qualidade que o livro não dá ao tipo: Fortificada em arma pede regra (estrito erro, livre aviso)", () => {
  const p = base(); p.vantagens = [artQ("arma", 1, [{ id: "fortificada", escolha: null }])];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "não se aplica a arma"));
  assert.ok(temMsg(avisos(valida(5, p, "livre")), "não se aplica a arma"));
  const ok = base(); ok.vantagens = [artQ("armadura", 1, [{ id: "fortificada", escolha: null }])];
  assert.ok(!temMsg(valida(5, ok, "estrito"), "não se aplica"));
});

teste("Qualidades incompatíveis: Acurado com Maciço, Fortificada com Leve (regra de jogo)", () => {
  const p = base(); p.vantagens = [artQ("arma", 1, [{ id: "acurado", escolha: null }, { id: "macico", escolha: null }])];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "não podem estar no mesmo Artefato"));
  assert.ok(temMsg(avisos(valida(5, p, "livre")), "não podem estar no mesmo Artefato"));
  const q = base(); q.vantagens = [artQ("armadura", 1, [{ id: "leve", escolha: null }, { id: "fortificada", escolha: null }])];
  assert.ok(temMsg(erros(valida(5, q, "estrito")), "não podem estar no mesmo Artefato"));
});

teste("Qualidades: faixa e perícia pedidas, e a mesma qualidade não se repete no item", () => {
  const sem = base(); sem.vantagens = [artQ("acessorio", 1, [{ id: "aprimorado", escolha: null }])];
  assert.ok(temMsg(erros(valida(5, sem, "estrito")), "Escolha a faixa de Aprimorado"));
  const pericia = base(); pericia.vantagens = [artQ("acessorio", 1, [{ id: "obra_prima", escolha: null }])];
  assert.ok(temMsg(erros(valida(5, pericia, "estrito")), "Escolha uma perícia para Obra-Prima"));
  const dup = base(); dup.vantagens = [artQ("arma", 1, [{ id: "acurado", escolha: null }, { id: "acurado", escolha: null }])];
  assert.ok(temMsg(erros(valida(5, dup, "livre")), "só pode aparecer uma vez"));
});

teste("Qualidades: o limite por tipo continua valendo com qualidades (2 armas com Acurado: erro)", () => {
  const p = base(); p.vantagens = [artQ("arma", 1, [{ id: "acurado", escolha: null }]), artQ("arma", 1, [{ id: "venenoso", escolha: null }])];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "No máximo 1 arma de Artefato"));
});

teste("Qualidades: a ficha mostra nome, XP e a fonte; o PDF lista as qualidades com escolha", () => {
  const html = avaliar(ctx, `tdtItemVantagem(${JSON.stringify(artQ("acessorio", 1, [{ id: "aprimorado", escolha: 2 }, { id: "acurado", escolha: null }]))}, 0)`);
  assert.ok(html.includes("Aprimorado"), "nome na ficha");
  assert.ok(html.includes("+20 XP"), "custo em XP na ficha");
  assert.ok(html.includes("PDF p140"), "página na ficha");
  assert.ok(html.includes('data-acao="arte-qual-add"'), "seletor para adicionar");
  const pdf = avaliar(ctx, `tdtPdfVantagens({ vantagens: ${JSON.stringify([artQ("acessorio", 2, [{ id: "aprimorado", escolha: 2 }, { id: "acurado", escolha: null }])])} })`);
  assert.ok(pdf.includes("Aprimorado +2 (+20 XP)"), "PDF: " + pdf);
  assert.ok(pdf.includes("Acurado (+20 XP)"), "PDF: " + pdf);
  assert.ok(pdf.includes("(6 pt)"), "PDF: " + pdf);
});

teste("Qualidades: dado antigo (Artefato sem o campo) ganha lista vazia ao carregar", () => {
  const q = avaliar(ctx, `(() => { substituirEstado({ etapa: 5, tela: "ficha", modo: "livre", personagem: { nome: "x", vantagens: [{ id: "artefato", qtd: 1, custo: 2, nota: "", tipo: "arma" }] } }); return state.personagem.vantagens[0].qualidades; })()`);
  assert.deepStrictEqual(q, []);
});

sair("livro 3DeT Victory");
