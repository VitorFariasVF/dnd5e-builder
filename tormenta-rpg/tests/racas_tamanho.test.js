/* Bônus de tamanho das raças Pequenas (PDF p.32: +1 na CA, +1 nas jogadas de ataque) e CA com e sem esse bônus.
   Contas feitas à mão: CA = 10 + metade do nível (arredonda para baixo) + mod. Des + armadura + escudo + bônus de tamanho. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { criarAmbiente, avaliar, RAIZ } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
/* Talentos extras (rules-talentos-extra.js) para os efeitos e pré-requisitos de talento. */
vm.runInContext(fs.readFileSync(path.join(RAIZ, "rules-talentos-extra.js"), "utf8"), ctx, { filename: "rules-talentos-extra.js" });

/* CA da ficha com a raça dada, nível, Destreza, armadura e escudo. */
function caCom(raca, { nivel = 5, destreza = 14, armadura = 0, escudo = 0 } = {}){
  return avaliar(ctx,
    `trpgDerivados(Object.assign(estadoPadrao().personagem, {
      raca: ${JSON.stringify(raca)}, nivel: ${nivel},
      atributos: Object.assign(estadoPadrao().personagem.atributos, { destreza: ${destreza} }),
      derivados: Object.assign(estadoPadrao().personagem.derivados, { armadura: ${armadura}, escudo: ${escudo} })
    })).ca`);
}

/* Nível 5 (metade = 2), Des 14 (+2), armadura 3, escudo 1: base 10 + 2 + 2 + 3 + 1 = 18.
   Desde o ajuste fixo de todas as raças (PDF p.31), goblin e halfling têm Des +4: Des 14 vira 18 (+4), e a CA sobe 2. */
teste("CA com goblin = 10 + 2 (metade do nível 5) + 4 (Des 14 com +4 racial = 18) + 3 (armadura) + 1 (escudo) + 1 (bônus de Pequeno) = 21", () => {
  assert.strictEqual(caCom("Goblin", { armadura: 3, escudo: 1 }), 21);
});

teste("CA com halfling também ganha +1 de tamanho e Des +4 racial: 21", () => {
  assert.strictEqual(caCom("Halfling", { armadura: 3, escudo: 1 }), 21);
});

teste("CA com goblin sem armadura nem escudo, nível 1 e Des 10 (vira 14, mod +2): 10 + 0 + 2 + 1 = 13", () => {
  assert.strictEqual(caCom("Goblin", { nivel: 1, destreza: 10 }), 13);
});

teste("CA com humano não recebe bônus de tamanho: 18 (10 + 2 + 2 + 3 + 1)", () => {
  assert.strictEqual(caCom("Humano", { armadura: 3, escudo: 1 }), 18);
});

teste("CA com anão: Des 14 vira 12 (–2 racial, mod +1), então 10 + 2 + 1 + 3 + 1 = 17 (antes 18)", () => {
  assert.strictEqual(caCom("Anão", { armadura: 3, escudo: 1 }), 17);
});

teste("CA sem raça escolhida não recebe bônus: 18", () => {
  assert.strictEqual(caCom("", { armadura: 3, escudo: 1 }), 18);
});

teste("nome de raça em outra caixa ainda acha o bônus e o ajuste: GOBLIN = 21", () => {
  assert.strictEqual(caCom("GOBLIN", { armadura: 3, escudo: 1 }), 21);
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

teste("humano sem escolha: a escolha não é aplicada e o aviso diz que falta escolher", () => {
  const p = ficha("Humano", { destreza: 12 }, []);
  const e = escolhaDe(p);
  assert.strictEqual(e.ok, false);
  assert.deepStrictEqual(e.ajustes, {});
  assert.ok(/Nada da escolha foi aplicado/.test(e.motivo), e.motivo);
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

/* Mudança desta rodada: o –4 de Carisma do lefou é fixo (PDF p.31), então vale mesmo sem a escolha. Antes, a escolha
   inválida também zerava o –4. Agora só a escolha some; o –4 continua. */
teste("lefou não pode escolher Carisma: a escolha inválida não aplica a escolha, mas o –4 fixo continua (Car 14 vira 10)", () => {
  const p = ficha("Lefou", { carisma: 14, forca: 10 }, ["carisma", "forca"]);
  const e = escolhaDe(p);
  assert.strictEqual(e.ok, false);
  assert.ok(/inválida/.test(e.motivo), e.motivo);
  const f = finais(p);
  assert.strictEqual(f.carisma, 10, "o –4 fixo do lefou (antes: 14, sem o ajuste)");
  assert.strictEqual(f.forca, 10);
});

teste("lefou com Destreza e Força escolhidas: +2 em cada na escolha e Carisma –4 fixo (Car 14 vira 10)", () => {
  const p = ficha("Lefou", { carisma: 14 }, ["destreza", "forca"]);
  assert.strictEqual(escolhaDe(p).ok, true);
  assert.deepStrictEqual(escolhaDe(p).ajustes, { destreza: 2, forca: 2 });
  assert.deepStrictEqual(avaliar(ctx, "trpgAjustesRaciais(" + JSON.stringify(p) + ").total"), { carisma: -4, destreza: 2, forca: 2 });
  const f = finais(p);
  assert.strictEqual(f.carisma, 10);
  assert.strictEqual(f.destreza, 12);
  assert.strictEqual(f.forca, 12);
});

teste("lefou sem escolha: a escolha não entra, mas o Carisma –4 fixo entra (Car 14 vira 10)", () => {
  const p = ficha("Lefou", { carisma: 14 }, []);
  assert.strictEqual(escolhaDe(p).ok, false);
  assert.strictEqual(finais(p).carisma, 10);
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

/* Mudança desta rodada: o anão tem Des –2 fixo (PDF p.31). Des 14 vira 12: mod +1 (antes, sem o ajuste: +2). */
teste("anão (Des –2 fixo, PDF p.31): Des 14 digitada vira 12 nos finais e mod +1 (antes: 14 e mod +2)", () => {
  const p = ficha("Anão", { destreza: 14 }, []);
  assert.strictEqual(finais(p).destreza, 12);
  assert.strictEqual(derivadosDe(p).modificadores.destreza, 1);
});

teste("cada raça com ajuste fixo aplica o valor exato do livro (PDF p.31), sem escolha: anão, elfo, goblin, halfling, minotauro, qareen, gnomo", () => {
  const esperado = {
    "anao": { constituicao: 4, sabedoria: 2, destreza: -2 },
    "elfo": { destreza: 4, inteligencia: 2, constituicao: -2 },
    "goblin": { destreza: 4, constituicao: 2, carisma: -2 },
    "halfling": { destreza: 4, carisma: 2, forca: -2 },
    "minotauro": { forca: 4, constituicao: 2, carisma: -2 },
    "qareen": { carisma: 4, inteligencia: 2, sabedoria: -2 },
    "gnomo": { inteligencia: 4, constituicao: 2, forca: -2 }
  };
  Object.keys(esperado).forEach(raca => {
    const p = ficha(raca, {}, []);
    const f = finais(p);
    ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"].forEach(k => {
      const delta = esperado[raca][k] || 0;
      assert.strictEqual(f[k], 10 + delta, raca + " " + k);
    });
    assert.strictEqual(p.atributos.destreza, 10, raca + ": valor digitado não muda");
  });
});

teste("ajuste fixo sem valor digitado (null) continua vazio, mesmo para raça com ajuste", () => {
  const p = ficha("Elfo", { destreza: null }, []);
  assert.strictEqual(finais(p).destreza, null);
  assert.strictEqual(finais(p).inteligencia, 12);
});

teste("elfo: Des 18 digitada vira 22 com +4 racial, como no exemplo do livro (PDF p.31)", () => {
  assert.strictEqual(finais(ficha("Elfo", { destreza: 18 }, [])).destreza, 22);
});

teste("halfling: Força 4 digitada vira 2 com –2 racial, como no exemplo do livro (PDF p.31)", () => {
  assert.strictEqual(finais(ficha("Halfling", { forca: 4 }, [])).forca, 2);
});

teste("minotauro: sem trait de combate no cálculo: CA de Des 10 sem armadura = 10 (Medo de altura não entra)", () => {
  assert.strictEqual(caCom("Minotauro", { nivel: 1, destreza: 10 }), 10);
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

teste("meio-elfo: Destreza +2 fixa (PDF p.42), sem bônus de tamanho, Médio, 9 m; CA sem armadura e Des 14 vira 16 (mod +3): 19", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS['meio-elfo'].ajustes"), { destreza: 2 });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS['meio-elfo'].bonusTamanho"), { ca: 0, ataque: 0 });
  assert.ok(/Médio/.test(avaliar(ctx, "TRPG_RACAS['meio-elfo'].tamanho")));
  assert.ok(/^9 m/.test(avaliar(ctx, "TRPG_RACAS['meio-elfo'].deslocamento")));
  assert.strictEqual(caCom("Meio-Elfo", { armadura: 3, escudo: 1 }), 19, "antes 18: o +2 de Destreza fixo agora entra");
  assert.strictEqual(avaliar(ctx, "trpgRacaPorValor('Meio-Elfo').nome"), "Meio-Elfo");
});

/* ---- Meio-elfo (escolha de uma habilidade), minotauro e gnomo (PDF p.39, p.41, p.42) ---- */
teste("meio-elfo: escolha de uma habilidade (+2), exceto Constituição e Destreza, que já recebe o +2 fixo (PDF p.42)", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS['meio-elfo'].escolha"), { quantidade: 1, valor: 2, excluir: ["constituicao", "destreza"] });
});

teste("meio-elfo sem escolha: o Des +2 fixo entra, a escolha não; o aviso diz que falta escolher", () => {
  const p = ficha("Meio-Elfo", { destreza: 12, sabedoria: 14 }, []);
  const e = escolhaDe(p);
  assert.strictEqual(e.ok, false);
  assert.ok(/Escolha as 1 habilidade/.test(e.motivo), e.motivo);
  assert.strictEqual(finais(p).destreza, 14);
  assert.strictEqual(finais(p).sabedoria, 14);
});

teste("meio-elfo com Sabedoria escolhida: Des +2 fixo e Sab +2 à escolha (Des 12 vira 14, Sab 14 vira 16)", () => {
  const p = ficha("Meio-Elfo", { destreza: 12, sabedoria: 14 }, ["sabedoria"]);
  assert.strictEqual(escolhaDe(p).ok, true);
  assert.deepStrictEqual(escolhaDe(p).ajustes, { sabedoria: 2 });
  assert.strictEqual(finais(p).destreza, 14);
  assert.strictEqual(finais(p).sabedoria, 16);
});

teste("meio-elfo: escolher Destreza (já tem o fixo) ou Constituição é inválido; a escolha não entra, o Des fixo continua", () => {
  ["destreza", "constituicao"].forEach(k => {
    const p = ficha("Meio-Elfo", { destreza: 12, constituicao: 10 }, [k]);
    assert.strictEqual(escolhaDe(p).ok, false, k);
    assert.ok(/inválida/.test(escolhaDe(p).motivo), k);
    assert.strictEqual(finais(p).destreza, 14, k);
    assert.strictEqual(finais(p).constituicao, 10, k);
  });
});

teste("minotauro: traço Medo de altura com PDF p.39, a penalidade de –4 e a concentração (texto, sem número na CA)", () => {
  const t = avaliar(ctx, "TRPG_RACAS.minotauro.tracos").find(x => /Medo de altura/.test(x));
  assert.ok(t, "sem o traço Medo de altura");
  assert.ok(/PDF p\.39/.test(t) && /–4/.test(t) && /3 m/.test(t) && /concentração/.test(t), t);
});

teste("gnomo: a magia 'livremente' continua NÃO VERIFICADO no traço (custo e frequência não fixados no livro)", () => {
  const t = avaliar(ctx, "TRPG_RACAS.gnomo.tracos").find(x => /livremente/.test(x));
  assert.ok(/NÃO VERIFICADO/.test(t), t);
});

/* ---- Efeitos e pré-requisitos de talentos (carregados no início deste arquivo) ---- */
const fichaTal = over => Object.assign({
  raca: "", classe: "", nivel: 1,
  atributos: { forca: 10, destreza: 10, constituicao: 10, inteligencia: 10, sabedoria: 10, carisma: 10 },
  talentos: "", derivados: { armadura: 0, escudo: 0 }, escolhasRaciais: { ajustesEscolha: [] }
}, over);
const comAtributo = (nome, valor) => ({ [nome]: valor });
const efeitosDe = p => avaliar(ctx, "trpgEfeitosTalentos(" + JSON.stringify(p) + ")");
const notasDe = p => avaliar(ctx, "trpgNotasTalentos(" + JSON.stringify(p) + ")");
const notaDe = (p, id) => notasDe(p).find(n => n.id === id);

teste("Ao Sabor do Destino com Car 13, nível 12: CA +2, ataque e dano +2, resistências +1 (faixa mais alta atingida, PDF p.109)", () => {
  const e = efeitosDe(fichaTal({ nivel: 12, atributos: Object.assign({}, fichaTal().atributos, comAtributo("carisma", 13)), talentos: "Ao Sabor do Destino" }));
  assert.deepStrictEqual([e.ca, e.ataqueDano, e.resistencias], [2, 2, 1]);
});

teste("Ao Sabor do Destino no nível 20 (Car 13): CA +3, ataque e dano +4, resistências +3", () => {
  const e = efeitosDe(fichaTal({ nivel: 20, atributos: Object.assign({}, fichaTal().atributos, comAtributo("carisma", 13)), talentos: "Ao Sabor do Destino" }));
  assert.deepStrictEqual([e.ca, e.ataqueDano, e.resistencias], [3, 4, 3]);
});

teste("Ao Sabor do Destino sem Carisma 13: pré-requisito falta, nenhum efeito e a nota acusa Carisma 13", () => {
  const p = fichaTal({ nivel: 12, talentos: "Ao Sabor do Destino" });
  assert.deepStrictEqual([efeitosDe(p).ca, efeitosDe(p).ataqueDano, efeitosDe(p).resistencias], [0, 0, 0]);
  assert.deepStrictEqual(notaDe(p, "ao-sabor-do-destino").pre.faltando, ["Carisma 13"]);
});

teste("CA com Ao Sabor do Destino (nível 12, Des 14, Car 13): 10 + 6 + 2 + 2 (faixa do 12º) = 20", () => {
  const p = fichaTal({ nivel: 12, atributos: Object.assign({}, fichaTal().atributos, { destreza: 14, carisma: 13 }), talentos: "Ao Sabor do Destino" });
  assert.strictEqual(avaliar(ctx, "trpgDerivados(Object.assign(estadoPadrao().personagem, " + JSON.stringify(p) + "))").ca, 20);
});

teste("Liderança com nível 6 e Car 16 (+3): 18 níveis de seguidores no total, até 3 por seguidor (PDF p.110)", () => {
  const e = efeitosDe(fichaTal({ nivel: 6, atributos: Object.assign({}, fichaTal().atributos, comAtributo("carisma", 16)), talentos: "Liderança" }));
  assert.deepStrictEqual(e.liderancaSeguidores, { niveisTotais: 18, porSeguidorMaximo: 3 });
});

teste("Liderança com Car 8 (mod –1): mínimo de 1 nível de seguidores", () => {
  const e = efeitosDe(fichaTal({ nivel: 6, atributos: Object.assign({}, fichaTal().atributos, comAtributo("carisma", 8)), talentos: "Liderança" }));
  assert.strictEqual(e.liderancaSeguidores.niveisTotais, 1);
});

teste("Liderança no nível 5: pré-requisito de 6º nível falta e não há número de seguidores", () => {
  const p = fichaTal({ nivel: 5, talentos: "Liderança" });
  assert.strictEqual(efeitosDe(p).liderancaSeguidores, null);
  assert.deepStrictEqual(notaDe(p, "lideranca").pre.faltando, ["Personagem de 6º nível"]);
});

teste("pré-requisito por talento: Ataque em Movimento sem Esquiva e Mobilidade acusa as duas; com elas, nada falta", () => {
  const des13 = fichaTal({ nivel: 4, atributos: Object.assign({}, fichaTal().atributos, { destreza: 13 }) });
  const sem = notaDe(Object.assign({}, des13, { talentos: "Ataque em Movimento" }), "ataque-em-movimento");
  assert.deepStrictEqual(sem.pre.faltando, ["Esquiva", "Mobilidade"]);
  const com = notaDe(Object.assign({}, des13, { talentos: "Ataque em Movimento\nesquiva\nMobilidade" }), "ataque-em-movimento");
  assert.deepStrictEqual(com.pre.faltando, []);
});

teste("pré-requisito de atributo: Aparar pede Destreza 15; Des 12 falta e Des 15 atende", () => {
  const p = fichaTal({ nivel: 6, atributos: Object.assign({}, fichaTal().atributos, { destreza: 12 }), talentos: "Aparar" });
  assert.ok(notaDe(p, "aparar").pre.faltando.includes("Destreza 15"));
  const p15 = Object.assign({}, p, { atributos: Object.assign({}, p.atributos, { destreza: 15 }) });
  assert.ok(!notaDe(p15, "aparar").pre.faltando.includes("Destreza 15"));
});

teste("pré-requisito que o app não confere (devoto, treinado, 'ou') fica como não verificado, não como falta", () => {
  const p = fichaTal({ nivel: 6, atributos: Object.assign({}, fichaTal().atributos, { sabedoria: 14 }), talentos: "Dominio da Magia" });
  const n = notaDe(p, "dominio-magia");
  assert.ok(n, "talento não reconhecido");
  assert.deepStrictEqual(n.pre.faltando, []);
  assert.ok(n.pre.naoVerificados.some(x => /Devoto/.test(x)), JSON.stringify(n.pre));
});

teste("talento reconhecido com nota: a nota é devolvida, e o que não é aplicado está escrito nela", () => {
  const n = notaDe(fichaTal({ nivel: 6, talentos: "Investida Montada" }), "investida-montada");
  assert.ok(/Não aplicado/.test(n.nota), n.nota);
});

teste("talento fora da tabela não aparece nas notas; linha vazia é ignorada", () => {
  const lista = notasDe(fichaTal({ nivel: 6, talentos: "Talento inventado\n\n   " }));
  assert.deepStrictEqual(lista, []);
});

teste("talentos que não têm efeito numérico (ex.: Aparar, sem prereq) não mudam CA nem resistências", () => {
  const e = efeitosDe(fichaTal({ nivel: 6, atributos: Object.assign({}, fichaTal().atributos, { destreza: 16 }), talentos: "Aparar" }));
  assert.deepStrictEqual([e.ca, e.ataqueDano, e.resistencias, e.liderancaSeguidores], [0, 0, 0, null]);
});

/* ---- Limites de uso por dia (usosPorDia), contas feitas à mão a partir do livro ---- */
const usosDe = p => efeitosDe(p).usosPorDia;

teste("Ataque Atordoante, Sab 13 (mod +1), uma escolha: 1 + 1 = 2 usos por dia (PDF p.97)", () => {
  const p = fichaTal({ nivel: 4, atributos: Object.assign({}, fichaTal().atributos, comAtributo("sabedoria", 13)), talentos: "Ataque Atordoante\nAtaque Desarmado Aprimorado" });
  assert.strictEqual(usosDe(p)["ataque-atordoante"], 2);
});

teste("Ataque Atordoante escolhido duas vezes, Sab 13: (1 + 1) + 2 = 4 usos por dia (PDF p.97)", () => {
  const p = fichaTal({ nivel: 4, atributos: Object.assign({}, fichaTal().atributos, comAtributo("sabedoria", 13)), talentos: "Ataque Atordoante\nAtaque Atordoante\nAtaque Desarmado Aprimorado" });
  assert.strictEqual(usosDe(p)["ataque-atordoante"], 4);
});

teste("Ataque Atordoante, Sab 16 (mod +3), uma escolha: 1 + 3 = 4 usos por dia (PDF p.97)", () => {
  const p = fichaTal({ nivel: 4, atributos: Object.assign({}, fichaTal().atributos, comAtributo("sabedoria", 16)), talentos: "Ataque Atordoante\nAtaque Desarmado Aprimorado" });
  assert.strictEqual(usosDe(p)["ataque-atordoante"], 4);
});

teste("Ataque Atordoante sem Ataque Desarmado Aprimorado na ficha: pré-requisito falta, sem limite de uso", () => {
  const p = fichaTal({ nivel: 4, atributos: Object.assign({}, fichaTal().atributos, comAtributo("sabedoria", 13)), talentos: "Ataque Atordoante" });
  assert.strictEqual(usosDe(p)["ataque-atordoante"], undefined);
  assert.deepStrictEqual(notaDe(p, "ataque-atordoante").pre.faltando, ["Ataque Desarmado Aprimorado"]);
});

teste("Perito em Arma, Car 14 (mod +2): 2 usos por dia; Car 10 (mod 0): 0; Car 8 (mod -1): 0, mínimo zero (PDF p.102)", () => {
  const base = { nivel: 4, atributos: Object.assign({}, fichaTal().atributos, { destreza: 13, inteligencia: 13 }), talentos: "Acuidade com Arma\nFoco em Arma\nPerito em Arma" };
  const com = car => fichaTal(Object.assign({}, base, { atributos: Object.assign({}, base.atributos, comAtributo("carisma", car)) }));
  assert.strictEqual(usosDe(com(14))["perito-em-arma"], 2);
  assert.strictEqual(usosDe(com(10))["perito-em-arma"], 0);
  assert.strictEqual(usosDe(com(8))["perito-em-arma"], 0);
});

teste("Perito em Arma sem Inteligência 13: pré-requisito falta, sem limite de uso", () => {
  const p = fichaTal({ nivel: 4, atributos: Object.assign({}, fichaTal().atributos, { destreza: 13, carisma: 14 }), talentos: "Acuidade com Arma\nFoco em Arma\nPerito em Arma" });
  assert.strictEqual(usosDe(p)["perito-em-arma"], undefined);
  assert.deepStrictEqual(notaDe(p, "perito-em-arma").pre.faltando, ["Inteligência 13"]);
});

teste("Mestre em Arma com guerreiro de 16º nível e os quatro pré-requisitos de arma: 1 rolagem extra por dia (PDF p.101)", () => {
  const p = fichaTal({ classe: "guerreiro", nivel: 16, talentos: "Especialização em Arma\nEspecialização em Arma Aprimorada\nFoco em Arma\nFoco em Arma Aprimorado\nMestre em Arma" });
  assert.deepStrictEqual(notaDe(p, "mestre-em-arma").pre.faltando, []);
  assert.strictEqual(usosDe(p)["mestre-em-arma"], 1);
});

teste("Mestre em Arma com guerreiro de 15º nível: pré-requisito de 16º nível falta, sem limite de uso", () => {
  const p = fichaTal({ classe: "guerreiro", nivel: 15, talentos: "Especialização em Arma\nEspecialização em Arma Aprimorada\nFoco em Arma\nFoco em Arma Aprimorado\nMestre em Arma" });
  assert.deepStrictEqual(notaDe(p, "mestre-em-arma").pre.faltando, ["Guerreiro 16º nível"]);
  assert.strictEqual(usosDe(p)["mestre-em-arma"], undefined);
});

teste("Domínio da Morte: 1 uso por dia; o pré-requisito de devoto fica como não verificado, não como falta (PDF p.113)", () => {
  const p = fichaTal({ nivel: 5, talentos: "Domínio da Morte" });
  assert.strictEqual(usosDe(p)["dominio-morte"], 1);
  assert.deepStrictEqual(notaDe(p, "dominio-morte").pre.faltando, []);
});

teste("talento de combate sem limite de uso (Ataque em Movimento, Des 13, Esquiva, Mobilidade, guerreiro 4º): nenhum efeito numérico", () => {
  const p = fichaTal({ classe: "guerreiro", nivel: 4, atributos: Object.assign({}, fichaTal().atributos, { destreza: 13 }), talentos: "Ataque em Movimento\nEsquiva\nMobilidade" });
  assert.deepStrictEqual(notaDe(p, "ataque-em-movimento").pre.faltando, []);
  assert.deepStrictEqual(usosDe(p), {});
  assert.strictEqual(efeitosDe(p).ca, 0);
});

sair("bônus de tamanho, CA, escolha racial e raças novas");
