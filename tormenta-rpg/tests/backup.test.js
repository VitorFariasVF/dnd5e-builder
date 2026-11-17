/* Round-trip do backup JSON e do histórico local, e rejeição de arquivos inválidos. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();

/* Ficha preenchida com valores variados (inclusive campos vazios e textos com acento e quebra de linha). */
const PREENCHIDA = `(() => {
  const s = estadoPadrao();
  s.modo = "livre"; s.tela = "ficha"; s.etapa = 10;
  Object.assign(s.personagem, { nome: "Aléxia Sá", jogador: "Vitor", nivel: 4, raca: "Texto livre", classe: "Outra",
    aparencia: "Alta\\ncapa verde", historia: "Veio do norte.", talentos: "Foco\\nAtaque poderoso", magias: "", equipamento: "Corda 15 m", dinheiro: 120 });
  s.personagem.atributos = { forca: 12, destreza: 16, constituicao: 14, inteligencia: 9, sabedoria: 11, carisma: 8 };
  s.personagem.pericias = { pontosDisponiveis: 10, graduacoesGastas: 7, observacao: "" };
  s.personagem.derivados = { armadura: 5, escudo: 2, tamanho: 0, pvAtuais: 18, pvMaximo: 24, deslocamento: "9 m" };
  return s;
})()`;

teste("backup traz sistema tormenta-rpg e versaoEsquema 1", () => {
  const b = avaliar(ctx, `(() => { substituirEstado(${PREENCHIDA}); return montarBackup(); })()`);
  assert.strictEqual(b.sistema, "tormenta-rpg");
  assert.strictEqual(b.versaoEsquema, 1);
  assert.ok(b.exportadoEm);
});

teste("round-trip: exporta, importa de volta e a ficha é igual", () => {
  const original = avaliar(ctx, `(() => { substituirEstado(${PREENCHIDA}); return state.personagem; })()`);
  const resultado = avaliar(ctx, `(() => {
    substituirEstado(${PREENCHIDA});
    const texto = JSON.stringify(montarBackup());
    const r = lerBackup(texto);
    return r.ok ? r.estado.personagem : { erro: r.erro };
  })()`);
  assert.deepStrictEqual(resultado, original);
});

teste("round-trip preserva o modo e a etapa de volta na ficha", () => {
  const r = avaliar(ctx, `(() => { substituirEstado(${PREENCHIDA}); const r = lerBackup(JSON.stringify(montarBackup())); return { modo: r.estado.modo, tela: r.estado.tela }; })()`);
  assert.strictEqual(r.modo, "livre");
  assert.strictEqual(r.tela, "ficha");
});

const recusa = (texto, trecho) => {
  const r = avaliar(ctx, `lerBackup(${JSON.stringify(texto)})`);
  assert.strictEqual(r.ok, false, "esperava recusar");
  assert.ok(r.erro.includes(trecho), "mensagem deveria citar '" + trecho + "', veio: " + r.erro);
};

teste("recusa texto que não é JSON", () => recusa("{isto nao e json", "não é um JSON válido"));

teste("recusa backup de outro sistema (dnd5e)", () => recusa(JSON.stringify({ sistema: "dnd5e-builder", versaoEsquema: 1, personagem: {} }), "outro sistema"));

teste("recusa backup sem versaoEsquema", () => recusa(JSON.stringify({ sistema: "tormenta-rpg", personagem: {} }), "Versão do esquema"));

teste("recusa esquema mais novo que o suportado", () => recusa(JSON.stringify({ sistema: "tormenta-rpg", versaoEsquema: 2, personagem: {} }), "mais nova"));

teste("recusa backup sem personagem", () => recusa(JSON.stringify({ sistema: "tormenta-rpg", versaoEsquema: 1 }), "não contém personagem"));

teste("recusa atributo fora da faixa dentro do backup", () => recusa(JSON.stringify({ sistema: "tormenta-rpg", versaoEsquema: 1, personagem: { atributos: { forca: 0 } } }), "Força"));

teste("recusa nível 9 dentro do backup", () => recusa(JSON.stringify({ sistema: "tormenta-rpg", versaoEsquema: 1, personagem: { nivel: 9 } }), "nível"));

teste("histórico local: salva, abre e preserva a ficha", () => {
  const r = avaliar(ctx, `(() => {
    limparDadosSalvos();
    substituirEstado(${PREENCHIDA});
    const entrada = salvarNoHistorico(false);
    const antes = JSON.stringify(state.personagem);
    substituirEstado(estadoPadrao());
    const abriu = carregarDoHistorico(entrada.id);
    return { abriu, total: getHistorico().length, igual: JSON.stringify(state.personagem) === antes };
  })()`);
  assert.strictEqual(r.abriu, true);
  assert.strictEqual(r.total, 1);
  assert.strictEqual(r.igual, true);
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
