/* Validações da 3DeT Victory: caso aceito e caso recusado para cada regra de criação.
   Regras de jogo (limite de pontos, −2, incompatibilidade, Maestria) bloqueiam no modo estrito e viram aviso no livre.
   Erros de formato bloqueiam nos dois modos. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const valida = (n, p, modo = "estrito") => avaliar(ctx, `tdtValidarEtapa(${n}, ${JSON.stringify(p)}, ${JSON.stringify(modo)})`);
const tudo = (p, modo = "estrito") => avaliar(ctx, `tdtValidarTudo(${JSON.stringify(p)}, ${JSON.stringify(modo)})`);
const erros = itens => itens.filter(x => x.nivel === "erro");
const avisos = itens => itens.filter(x => x.nivel === "aviso");
const temMsg = (itens, trecho) => itens.some(x => x.msg.includes(trecho));

/* Base válida: personagem D do engine.test.js (Herói, 20 pontos, saldo 0). Cada teste altera uma coisa. */
const base = () => ({
  nome: "Teste", jogador: "", conceito: "", nivelPoder: "heroi", pontosTotal: 20,
  atributos: { P: 3, H: 3, R: 3 }, arquetipo: "elfo", pericias: ["medicina"],
  vantagens: [
    { id: "agil", qtd: 1, custo: 1, nota: "" },
    { id: "forte", qtd: 1, custo: 1, nota: "" },
    { id: "maestria", qtd: 2, custo: 1, nota: "medicina" },
    { id: "riqueza", qtd: 1, custo: 4, nota: "" },
    { id: "inventario", qtd: 1, custo: 2, nota: "" }
  ],
  desvantagens: [{ id: "tapado", valor: -1, nota: "" }],
  historia: "", anotacoes: ""
});

teste("aceito: personagem válido não tem erro em nenhuma etapa (modo estrito)", () => {
  assert.deepStrictEqual(erros(tudo(base())), []);
  [1, 2, 3, 4, 5, 6].forEach(n => assert.deepStrictEqual(erros(valida(n, base())), [], "etapa " + n));
});

teste("atributo acima de 5 é recusado (etapa 3)", () => {
  const p = base(); p.atributos.P = 6;
  assert.ok(temMsg(erros(valida(3, p)), "Poder deve ser um inteiro de 0 a 5"));
});

teste("atributo vazio é recusado (etapa 3), mesmo no modo livre", () => {
  const p = base(); p.atributos.H = null;
  assert.ok(temMsg(erros(valida(3, p, "livre")), "Habilidade deve ser um inteiro"));
});

teste("atributo 0 é aceito, com aviso de recomendação de pelo menos 1", () => {
  const p = base(); p.atributos.P = 0; p.pontosTotal = 20;
  assert.deepStrictEqual(erros(valida(3, p)), []);
  assert.ok(temMsg(avisos(valida(3, p)), "Recomenda-se pelo menos 1 em Poder"));
});

teste("saldo negativo bloqueia no modo estrito", () => {
  const p = base(); p.atributos = { P: 5, H: 5, R: 5 };
  assert.ok(temMsg(erros(valida(3, p, "estrito")), "faltam"));
});

teste("saldo negativo vira aviso no modo livre (não bloqueia)", () => {
  const p = base(); p.atributos = { P: 5, H: 5, R: 5 };
  assert.strictEqual(erros(valida(3, p, "livre")).length, 0);
  assert.ok(temMsg(avisos(valida(3, p, "livre")), "faltam"));
});

teste("desvantagens somando −3 são recusadas no modo estrito (limite −2)", () => {
  const p = base(); p.desvantagens = [{ id: "tapado", valor: -1 }, { id: "ambiente", valor: -1 }, { id: "inapto", valor: -1 }];
  assert.ok(temMsg(erros(valida(6, p)), "o limite é −2"));
});

teste("desvantagens somando −2 são aceitas", () => {
  const p = base(); p.desvantagens = [{ id: "tapado", valor: -1 }, { id: "ambiente", valor: -1 }];
  assert.ok(!temMsg(valida(6, p), "o limite é −2"));
});

teste("Ágil com Lento (incompatíveis) é recusado no modo estrito", () => {
  const p = base(); p.desvantagens = [{ id: "lento", valor: -1 }];
  assert.ok(temMsg(erros(valida(6, p)), "Ágil é incompatível com Lento"));
});

teste("Ágil com Tapado (compatíveis) é aceito", () => {
  assert.ok(!temMsg(valida(6, base()), "incompatível"));
});

teste("Forte com Fracote: erro no estrito, aviso no livre", () => {
  const p = base(); p.desvantagens = [{ id: "fracote", valor: -1 }];
  assert.ok(temMsg(erros(valida(6, p, "estrito")), "Forte é incompatível com Fracote"));
  assert.ok(temMsg(avisos(valida(6, p, "livre")), "Forte é incompatível com Fracote"));
  assert.strictEqual(erros(valida(6, p, "livre")).length, 0);
});

teste("Maestria sem perícia escolhida é recusada no estrito", () => {
  const p = base(); p.pericias = [];
  assert.ok(temMsg(erros(valida(5, p, "estrito")), "Maestria exige uma perícia escolhida"));
});

teste("Maestria com perícia que o personagem tem é aceita", () => {
  assert.ok(!temMsg(valida(5, base()), "Maestria exige"));
});

teste("vantagem que não é 'multiplo' com quantidade 2 é recusada (qualquer modo)", () => {
  const p = base(); p.vantagens[0].qtd = 2;
  assert.ok(temMsg(erros(valida(5, p, "livre")), "Ágil não pode ser comprada mais de uma vez"));
});

teste("vantagem 'multiplo' com quantidade 2 é aceita (Maestria)", () => {
  assert.ok(!temMsg(valida(5, base()), "Quantidade de Maestria"));
});

teste("vantagem repetida que não é 'multiplo' é recusada", () => {
  const p = base(); p.vantagens.push({ id: "agil", qtd: 1, custo: 1, nota: "" });
  assert.ok(temMsg(erros(valida(5, p)), "Ágil só pode ser escolhida uma vez"));
});

teste("Alcance com custo 3 é recusado (faixa 1 a 2); custo 2 é aceito", () => {
  const p = base(); p.vantagens.push({ id: "alcance", qtd: 1, custo: 3, nota: "" });
  assert.ok(temMsg(erros(valida(5, p)), "Custo de Alcance deve ser de 1 a 2"));
  const q = base(); q.vantagens.push({ id: "alcance", qtd: 1, custo: 2, nota: "" });
  assert.ok(!temMsg(valida(5, q), "Custo de Alcance"));
});

teste("Riqueza com custo 3 é recusada (opções 2, 4, 8); custo 8 é aceito", () => {
  const p = base(); p.vantagens[3].custo = 3;
  assert.ok(temMsg(erros(valida(5, p)), "Custo de Riqueza deve ser 2, 4, 8"));
  const q = base(); q.vantagens[3].custo = 8;
  assert.ok(!temMsg(valida(5, q), "Custo de Riqueza"));
});

teste("Inventário com custo 0 é aceito (faixa começa em 0)", () => {
  const p = base(); p.vantagens[4].custo = 0;
  assert.ok(!temMsg(valida(5, p), "Custo de Inventário"));
});

teste("vantagem fora da lista é recusada", () => {
  const p = base(); p.vantagens.push({ id: "inexistente", qtd: 1, custo: 1, nota: "" });
  assert.ok(temMsg(erros(valida(5, p)), "fora da lista"));
});

teste("vantagem e desvantagem incompatíveis entre si (regra criada à mão) são recusadas", () => {
  const ctx2 = criarAmbiente();
  avaliar(ctx2, "TDT_RULES.vantagens.find(x => x.id === 'forte').incompativel = ['agil']; 0");
  const itens = avaliar(ctx2, `tdtValidarEtapa(5, ${JSON.stringify(base())}, "estrito")`);
  assert.ok(temMsg(erros(itens), "Ágil é incompatível com Forte"));
});

teste("arquétipo: dois arquétipos são recusados (no máximo 1)", () => {
  const p = base(); p.arquetipo = ["elfo", "humano"];
  assert.ok(temMsg(erros(valida(2, p)), "No máximo 1 arquétipo"));
});

teste("arquétipo fora da lista é recusado", () => {
  const p = base(); p.arquetipo = "dragao";
  assert.ok(temMsg(erros(valida(2, p)), "Arquétipo fora da lista"));
});

teste("arquétipo com custo NÃO VERIFICADO (Anão) gera aviso, sem erro", () => {
  const p = base(); p.arquetipo = "anao";
  assert.deepStrictEqual(erros(valida(2, p)), []);
  assert.ok(temMsg(avisos(valida(2, p)), "Custo do arquétipo Anão não verificado"));
});

teste("desvantagem só para NPC (Dependência) é recusada para o jogador", () => {
  const p = base(); p.desvantagens = [{ id: "dependencia", valor: -2 }];
  assert.ok(temMsg(erros(valida(6, p)), "só para NPCs vilões"));
});

teste("desvantagem com valor fora da faixa é recusada (Assombrado: −2 a −1)", () => {
  const p = base(); p.desvantagens = [{ id: "assombrado", valor: -3 }];
  assert.ok(temMsg(erros(valida(6, p)), "Valor de Assombrado deve ser de -2 a -1"));
  const q = base(); q.desvantagens = [{ id: "assombrado", valor: -2 }];
  assert.ok(!temMsg(valida(6, q), "Valor de Assombrado"));
});

teste("desvantagem repetida que não é 'multiplo' é recusada; Insano (multiplo) repete", () => {
  const p = base(); p.desvantagens = [{ id: "tapado", valor: -1 }, { id: "tapado", valor: -1 }];
  assert.ok(temMsg(erros(valida(6, p)), "Tapado só pode ser escolhida uma vez"));
  const q = base(); q.desvantagens = [{ id: "insano", valor: -1 }, { id: "insano", valor: -1 }];
  assert.ok(!temMsg(valida(6, q), "Insano só pode"));
});

teste("perícia fora da lista é recusada; perícia repetida também", () => {
  const p = base(); p.pericias = ["xadrez"];
  assert.ok(temMsg(erros(valida(4, p)), "Perícia fora da lista"));
  const q = base(); q.pericias = ["medicina", "medicina"];
  assert.ok(temMsg(erros(valida(4, q)), "Perícia repetida"));
});

teste("nível de poder Herói com 10 pontos é recusado (o nível fixa 20)", () => {
  const p = base(); p.pontosTotal = 10;
  assert.ok(temMsg(erros(valida(1, p)), "No nível Herói os pontos totais são 20"));
});

teste("Pontos livres aceitam outro valor (15)", () => {
  const p = base(); p.nivelPoder = "livre"; p.pontosTotal = 15;
  assert.deepStrictEqual(erros(valida(1, p)), []);
});

teste("nome vazio: erro no estrito, só aviso no livre", () => {
  const p = base(); p.nome = "  ";
  assert.ok(temMsg(erros(valida(1, p, "estrito")), "Informe o nome"));
  assert.strictEqual(erros(valida(1, p, "livre")).length, 0);
  assert.ok(temMsg(avisos(valida(1, p, "livre")), "Informe o nome"));
});

teste("Revisão (etapa 7) junta as pendências de todas as etapas", () => {
  const p = base(); p.nome = ""; p.desvantagens = [{ id: "tapado", valor: -1 }, { id: "lento", valor: -1 }];
  const itens = valida(7, p);
  assert.ok(temMsg(itens, "Informe o nome"));
  assert.ok(temMsg(itens, "Ágil é incompatível com Lento") || temMsg(itens, "Lento é incompatível com Ágil"));
});

sair("validacoes");
