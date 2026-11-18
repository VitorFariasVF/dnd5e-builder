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

teste("dados: as dez raças têm tamanho, deslocamento e traços preenchidos (sem NÃO VERIFICADO no campo)", () => {
  ["humano", "anao", "elfo", "qareen", "goblin", "halfling", "minotauro", "lefou", "gnomo", "meio-elfo"].forEach(k => {
    const r = avaliar(ctx, `TRPG_RACAS[${JSON.stringify(k)}]`);
    assert.ok(!/NÃO VERIFICADO/.test(r.tamanho), k + " tamanho");
    assert.ok(!/NÃO VERIFICADO/.test(r.deslocamento), k + " deslocamento");
    assert.ok(Array.isArray(r.tracos) && r.tracos.length > 0, k + " tracos");
  });
});

teste("dados: ajustes do anão e do goblin batem com a tabela do livro (PDF p.31)", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.anao.ajustes"), { constituicao: 4, sabedoria: 2, destreza: -2 });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.goblin.ajustes"), { destreza: 4, constituicao: 2, carisma: -2 });
});

/* ---- Escolha racial (humano e lefou), atributos finais e derivados ---- */
const ficha = (raca, atributos, escolhas) => ({ raca, atributos: Object.assign({ forca: 10, destreza: 10, constituicao: 10, inteligencia: 10, sabedoria: 10, carisma: 10 }, atributos), nivel: 1, escolhasRaciais: { ajustesEscolha: escolhas } });
const escolhaDe = p => avaliar(ctx, "trpgEscolhaRacial(" + JSON.stringify(p) + ")");
const finais = p => avaliar(ctx, "trpgAtributosFinais(" + JSON.stringify(p) + ")").valores;
const derivadosDe = p => avaliar(ctx, "trpgDerivados(Object.assign(estadoPadrao().personagem, " + JSON.stringify(p) + "))");

teste("humano sem escolha: nada é aplicado e o aviso diz que falta escolher", () => {
  const p = ficha("Humano", { destreza: 12 }, []);
  const e = escolhaDe(p);
  assert.strictEqual(e.ok, false);
  assert.deepStrictEqual(e.ajustes, {});
  assert.ok(/Nada foi aplicado/.test(e.motivo), e.motivo);
  assert.strictEqual(finais(p).destreza, 12);
});

teste("humano com duas habilidades distintas (Des e Sab): +2 em cada, sem mexer nas outras", () => {
  const p = ficha("Humano", { destreza: 12, sabedoria: 14 }, ["destreza", "sabedoria"]);
  assert.strictEqual(escolhaDe(p).ok, true);
  const f = finais(p);
  assert.strictEqual(f.destreza, 14);
  assert.strictEqual(f.sabedoria, 16);
  assert.strictEqual(f.forca, 10);
  assert.strictEqual(f.carisma, 10);
});

teste("humano com a mesma habilidade duas vezes: não aplica nada", () => {
  const p = ficha("Humano", { forca: 12 }, ["forca", "forca"]);
  const e = escolhaDe(p);
  assert.strictEqual(e.ok, false);
  assert.ok(/diferentes/.test(e.motivo), e.motivo);
  assert.strictEqual(finais(p).forca, 12);
});

teste("humano com só uma habilidade escolhida: não aplica nada", () => {
  const p = ficha("Humano", { forca: 12 }, ["forca", null]);
  assert.strictEqual(escolhaDe(p).ok, false);
  assert.strictEqual(finais(p).forca, 12);
});

teste("lefou não pode escolher Carisma: a escolha inválida não aplica nada, nem o –4", () => {
  const p = ficha("Lefou", { carisma: 14, forca: 10 }, ["carisma", "forca"]);
  const e = escolhaDe(p);
  assert.strictEqual(e.ok, false);
  assert.ok(/inválida/.test(e.motivo), e.motivo);
  const f = finais(p);
  assert.strictEqual(f.carisma, 14);
  assert.strictEqual(f.forca, 10);
});

teste("lefou com Destreza e Força escolhidas: +2 em cada e Carisma –4 (Car 14 vira 10)", () => {
  const p = ficha("Lefou", { carisma: 14 }, ["destreza", "forca"]);
  assert.strictEqual(escolhaDe(p).ok, true);
  assert.deepStrictEqual(escolhaDe(p).ajustes, { carisma: -4, destreza: 2, forca: 2 });
  const f = finais(p);
  assert.strictEqual(f.carisma, 10);
  assert.strictEqual(f.destreza, 12);
  assert.strictEqual(f.forca, 12);
});

teste("lefou sem escolha: nada é aplicado, nem o Carisma –4", () => {
  const p = ficha("Lefou", { carisma: 14 }, []);
  assert.strictEqual(escolhaDe(p).ok, false);
  assert.strictEqual(finais(p).carisma, 14);
});

teste("valor de atributo vazio (null) continua vazio mesmo com a escolha", () => {
  const p = ficha("Humano", { forca: null }, ["forca", "destreza"]);
  assert.strictEqual(finais(p).forca, null);
  assert.strictEqual(finais(p).destreza, 12);
});

teste("derivados usam os atributos finais: humano Força 10 + escolha Força e Des = mod de Força +1", () => {
  const d = derivadosDe(ficha("Humano", { forca: 10 }, ["forca", "destreza"]));
  assert.strictEqual(d.modificadores.forca, 1);
  assert.strictEqual(d.modificadores.destreza, 1);
});

teste("derivados do lefou: Carisma 14 com –4 vira 10, mod 0 (e não +2)", () => {
  const d = derivadosDe(ficha("Lefou", { carisma: 14 }, ["destreza", "forca"]));
  assert.strictEqual(d.modificadores.carisma, 0);
});

teste("raça sem escolha (anão) não altera os atributos finais nem os derivados: Des 14 = mod +2", () => {
  const p = ficha("Anão", { destreza: 14 }, []);
  assert.strictEqual(finais(p).destreza, 14);
  assert.strictEqual(derivadosDe(p).modificadores.destreza, 2);
});

teste("aviso da escolha: 'Aviso' sem escolha completa; 'Ajuste aplicado' com escolha válida", () => {
  assert.ok(/^Aviso:/.test(avaliar(ctx, "trpgTextoAvisoEscolha(" + JSON.stringify(ficha("Humano", {}, [])) + ")")));
  assert.ok(/^Ajuste aplicado/.test(avaliar(ctx, "trpgTextoAvisoEscolha(" + JSON.stringify(ficha("Humano", {}, ["forca", "destreza"])) + ")")));
  assert.strictEqual(avaliar(ctx, "trpgTextoAvisoEscolha(" + JSON.stringify(ficha("Anão", {}, [])) + ")"), "");
});

teste("dados das escolhas: humano +2 em 2 sem exclusão; lefou +2 em 2 exceto Carisma, com Carisma –4 fixo", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.humano.escolha"), { quantidade: 2, valor: 2, excluir: [] });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.lefou.escolha"), { quantidade: 2, valor: 2, excluir: ["carisma"] });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.lefou.ajustes"), { carisma: -4 });
});

/* ---- Gnomo e meio-elfo (PDF p.41 e p.42) ---- */
teste("gnomo: ajustes +4 Int, +2 Con, –2 For (PDF p.41); tamanho Pequeno com bônus de CA 1 e ataque 1", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.gnomo.ajustes"), { inteligencia: 4, constituicao: 2, forca: -2 });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.gnomo.bonusTamanho"), { ca: 1, ataque: 1 });
  assert.ok(/Pequeno/.test(avaliar(ctx, "TRPG_RACAS.gnomo.tamanho")));
  assert.ok(/^6 m/.test(avaliar(ctx, "TRPG_RACAS.gnomo.deslocamento")));
  assert.strictEqual(caCom("Gnomo", { armadura: 3, escudo: 1 }), 19);
});

teste("meio-elfo: Destreza +2 fixa (PDF p.42), sem bônus de tamanho, Médio, 9 m; CA sem bônus = 18", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS['meio-elfo'].ajustes"), { destreza: 2 });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS['meio-elfo'].bonusTamanho"), { ca: 0, ataque: 0 });
  assert.ok(/Médio/.test(avaliar(ctx, "TRPG_RACAS['meio-elfo'].tamanho")));
  assert.ok(/^9 m/.test(avaliar(ctx, "TRPG_RACAS['meio-elfo'].deslocamento")));
  assert.strictEqual(caCom("Meio-Elfo", { armadura: 3, escudo: 1 }), 18);
  assert.strictEqual(avaliar(ctx, "trpgRacaPorValor('Meio-Elfo').nome"), "Meio-Elfo");
});

sair("bônus de tamanho, CA, escolha racial e raças novas");
