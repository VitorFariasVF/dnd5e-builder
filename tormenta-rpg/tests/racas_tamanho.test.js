/* Bônus de tamanho das raças Pequenas (PDF p.32: +1 na CA, +1 nas jogadas de ataque) e CA com e sem esse bônus.
   Contas feitas à mão: CA = 10 + metade do nível (arredonda para baixo) + mod. Des + armadura + escudo + bônus de tamanho. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();

/* CA da ficha com a raça dada, nível, Destreza, armadura e escudo. */
function caCom(raca, { nivel = 5, destreza = 14, armadura = 0, escudo = 0 } = {}){
  return avaliar(ctx,
    `trpgDerivados(Object.assign(estadoPadrao().personagem, {
      raca: ${JSON.stringify(raca)}, nivel: ${nivel},
      atributos: Object.assign(estadoPadrao().personagem.atributos, { destreza: ${destreza} }),
      derivados: Object.assign(estadoPadrao().personagem.derivados, { armadura: ${armadura}, escudo: ${escudo} })
    })).ca`);
}

/* Nível 5 (metade = 2), Des 14 (+2), armadura 3, escudo 1: base 10 + 2 + 2 + 3 + 1 = 18. */
teste("CA com goblin = 10 + 2 (metade do nível 5) + 2 (Des 14) + 3 (armadura) + 1 (escudo) + 1 (bônus de Pequeno) = 19", () => {
  assert.strictEqual(caCom("Goblin", { armadura: 3, escudo: 1 }), 19);
});

teste("CA com halfling também ganha +1 de tamanho: 19", () => {
  assert.strictEqual(caCom("Halfling", { armadura: 3, escudo: 1 }), 19);
});

teste("CA com goblin sem armadura nem escudo, nível 1 e Des 10: 10 + 0 + 0 + 1 = 11", () => {
  assert.strictEqual(caCom("Goblin", { nivel: 1, destreza: 10 }), 11);
});

teste("CA com humano não recebe bônus de tamanho: 18 (10 + 2 + 2 + 3 + 1)", () => {
  assert.strictEqual(caCom("Humano", { armadura: 3, escudo: 1 }), 18);
});

teste("CA com raça Média (anão) não muda: 18", () => {
  assert.strictEqual(caCom("Anão", { armadura: 3, escudo: 1 }), 18);
});

teste("CA sem raça escolhida não recebe bônus: 18", () => {
  assert.strictEqual(caCom("", { armadura: 3, escudo: 1 }), 18);
});

teste("nome de raça em outra caixa ainda acha o bônus: GOBLIN = 19", () => {
  assert.strictEqual(caCom("GOBLIN", { armadura: 3, escudo: 1 }), 19);
});

teste("trpgClasseArmadura soma o bônus de tamanho recebido e aceita o padrão 0", () => {
  assert.strictEqual(avaliar(ctx, "trpgClasseArmadura({ destreza: 14, nivel: 5, armadura: 3, escudo: 1, bonusTamanho: 1 })"), 19);
  assert.strictEqual(avaliar(ctx, "trpgClasseArmadura({ destreza: 14, nivel: 5, armadura: 3, escudo: 1 })"), 18);
});

teste("raça fora da lista não recebe bônus de tamanho (0), como antes", () => {
  assert.strictEqual(avaliar(ctx, 'trpgBonusTamanhoCA("Raça inventada")'), 0);
});

teste("dados: goblin e halfling têm bonusTamanho de CA 1 e ataque 1, e as Médias têm 0 e 0", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.goblin.bonusTamanho"), { ca: 1, ataque: 1 });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.halfling.bonusTamanho"), { ca: 1, ataque: 1 });
  ["humano", "anao", "elfo", "qareen", "minotauro", "lefou"].forEach(k => {
    assert.deepStrictEqual(avaliar(ctx, `TRPG_RACAS.${k}.bonusTamanho`), { ca: 0, ataque: 0 }, k);
  });
});

teste("dados: goblin é Pequeno com deslocamento de 9 m (exceção, PDF p.35); halfling é Pequeno com 6 m (PDF p.32)", () => {
  assert.ok(/Pequeno/.test(avaliar(ctx, "TRPG_RACAS.goblin.tamanho")));
  assert.ok(/Pequeno/.test(avaliar(ctx, "TRPG_RACAS.halfling.tamanho")));
  assert.ok(/^9 m/.test(avaliar(ctx, "TRPG_RACAS.goblin.deslocamento")));
  assert.ok(/^6 m/.test(avaliar(ctx, "TRPG_RACAS.halfling.deslocamento")));
});

teste("dados: as oito raças têm tamanho, deslocamento e traços preenchidos (sem NÃO VERIFICADO no campo)", () => {
  ["humano", "anao", "elfo", "qareen", "goblin", "halfling", "minotauro", "lefou"].forEach(k => {
    const r = avaliar(ctx, `TRPG_RACAS.${k}`);
    assert.ok(!/NÃO VERIFICADO/.test(r.tamanho), k + " tamanho");
    assert.ok(!/NÃO VERIFICADO/.test(r.deslocamento), k + " deslocamento");
    assert.ok(Array.isArray(r.tracos) && r.tracos.length > 0, k + " tracos");
  });
});

teste("dados: ajustes do anão e do goblin batem com a tabela do livro (PDF p.31)", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.anao.ajustes"), { constituicao: 4, sabedoria: 2, destreza: -2 });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.goblin.ajustes"), { destreza: 4, constituicao: 2, carisma: -2 });
});

sair("bônus de tamanho e CA por raça");
