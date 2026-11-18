/* Round-trip do backup JSON e do histórico local, e recusa de arquivos inválidos. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();

/* Ficha preenchida com valores variados (acento, quebra de linha, perícias, vantagens com faixa e opções). */
const PREENCHIDA = `(() => {
  const s = estadoPadrao();
  s.modo = "livre"; s.tela = "ficha"; s.etapa = 7;
  Object.assign(s.personagem, { nome: "Aléxia Sá", jogador: "Vitor", conceito: "Pilota\\nde robôs",
    nivelPoder: "veterano", pontosTotal: 35, arquetipo: "vampiro", historia: "Veio do norte.", anotacoes: "Dinheiro: 2 notas" });
  s.personagem.atributos = { P: 4, H: 5, R: 3 };
  s.personagem.pericias = ["arte", "maquinas", "saber"];
  s.personagem.vantagens = [
    { id: "maestria", qtd: 2, custo: 1, nota: "arte" },
    { id: "riqueza", qtd: 1, custo: 6, nota: "" },
    { id: "alcance", qtd: 1, custo: 2, nota: "" }
  ];
  s.personagem.desvantagens = [{ id: "assombrado", valor: -2, nota: "" }, { id: "tapado", valor: -1, nota: "" }];
  return s;
})()`;

teste("backup traz sistema '3DeT Victory', versaoEsquema 1 e o estado", () => {
  const b = avaliar(ctx, `(() => { substituirEstado(${PREENCHIDA}); return montarBackup(); })()`);
  assert.strictEqual(b.sistema, "3DeT Victory");
  assert.strictEqual(b.versaoEsquema, 1);
  assert.ok(b.exportadoEm);
  assert.strictEqual(b.estado.modo, "livre");
  assert.strictEqual(b.estado.personagem.nome, "Aléxia Sá");
});

teste("round-trip: exporta, importa de volta e o personagem é igual", () => {
  const original = avaliar(ctx, `(() => { substituirEstado(${PREENCHIDA}); return state.personagem; })()`);
  const resultado = avaliar(ctx, `(() => {
    substituirEstado(${PREENCHIDA});
    const r = lerBackup(JSON.stringify(montarBackup()));
    return r.ok ? r.estado.personagem : { erro: r.erro };
  })()`);
  assert.deepStrictEqual(resultado, original);
});

teste("round-trip preserva o modo e leva a ficha de volta à tela de etapas", () => {
  const r = avaliar(ctx, `(() => { substituirEstado(${PREENCHIDA}); const r = lerBackup(JSON.stringify(montarBackup())); return { modo: r.estado.modo, tela: r.estado.tela }; })()`);
  assert.strictEqual(r.modo, "livre");
  assert.strictEqual(r.tela, "ficha");
});

teste("round-trip aceita ficha com atributos ainda vazios (null)", () => {
  const r = avaliar(ctx, `(() => { substituirEstado(estadoPadrao()); const r = lerBackup(JSON.stringify(montarBackup())); return r.ok; })()`);
  assert.strictEqual(r, true);
});

const recusa = (texto, trecho) => {
  const r = avaliar(ctx, `lerBackup(${JSON.stringify(texto)})`);
  assert.strictEqual(r.ok, false, "esperava recusar");
  assert.ok(r.erro.includes(trecho), "mensagem deveria citar '" + trecho + "', veio: " + r.erro);
};

teste("recusa texto que não é JSON", () => recusa("{isto nao e json", "não é um JSON válido"));

teste("recusa backup de outro sistema (tormenta-rpg)", () => recusa(JSON.stringify({ sistema: "tormenta-rpg", versaoEsquema: 1, estado: {} }), "outro sistema"));

teste("recusa backup sem versaoEsquema", () => recusa(JSON.stringify({ sistema: "3DeT Victory", estado: {} }), "Versão do esquema"));

teste("recusa esquema mais novo que o suportado", () => recusa(JSON.stringify({ sistema: "3DeT Victory", versaoEsquema: 2, estado: {} }), "mais nova"));

teste("recusa backup sem personagem", () => recusa(JSON.stringify({ sistema: "3DeT Victory", versaoEsquema: 1 }), "não contém personagem"));

teste("recusa atributo fora da faixa 0 a 5 dentro do backup", () => recusa(JSON.stringify({ sistema: "3DeT Victory", versaoEsquema: 1, estado: { personagem: { atributos: { P: 6, H: 1, R: 1 } } } }), "Poder"));

teste("recusa nível de poder desconhecido dentro do backup", () => recusa(JSON.stringify({ sistema: "3DeT Victory", versaoEsquema: 1, estado: { personagem: { nivelPoder: "lendario" } } }), "nível de poder"));

teste("histórico local: salva, abre e preserva a ficha", () => {
  const r = avaliar(ctx, `(() => {
    limparDadosSalvos();
    substituirEstado(${PREENCHIDA});
    const entrada = salvarNoHistorico(false);
    const antes = JSON.stringify(state.personagem);
    substituirEstado(estadoPadrao());
    const abriu = carregarDoHistorico(entrada.id);
    return { abriu, total: getHistorico().length, igual: JSON.stringify(state.personagem) === antes, arquetipo: entrada.arquetipo };
  })()`);
  assert.strictEqual(r.abriu, true);
  assert.strictEqual(r.total, 1);
  assert.strictEqual(r.igual, true);
  assert.strictEqual(r.arquetipo, "vampiro");
});

teste("histórico local: duplicar cria uma cópia com nome '(cópia)' e excluir remove", () => {
  const r = avaliar(ctx, `(() => {
    limparDadosSalvos();
    substituirEstado(${PREENCHIDA});
    const entrada = salvarNoHistorico(false);
    const copia = duplicarNoHistorico(entrada.id);
    const depois = getHistorico().length;
    excluirDoHistorico(copia.id);
    return { nomeCopia: copia.nome, depois, final: getHistorico().length, idsDiferentes: copia.id !== entrada.id };
  })()`);
  assert.ok(r.nomeCopia.endsWith("(cópia)"));
  assert.strictEqual(r.depois, 2);
  assert.strictEqual(r.final, 1);
  assert.strictEqual(r.idsDiferentes, true);
});

sair("backup");
