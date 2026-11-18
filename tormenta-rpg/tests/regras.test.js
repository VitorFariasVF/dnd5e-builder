/* Fórmulas derivadas contra casos conferidos à mão (aritmética das fórmulas, sem consultar o software).
   Dados de classe vêm de fonte de comunidade (compêndio do VTT fvtt-trpg); as contas abaixo seguem o texto dessas classes. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();

teste("modificador segue (valor - 10) / 2 arredondado para baixo", () => {
  const casos = [[1, -5], [3, -4], [8, -1], [9, -1], [10, 0], [11, 0], [12, 1], [13, 1], [14, 2], [15, 2], [18, 4], [20, 5], [30, 10]];
  casos.forEach(([valor, esperado]) => {
    assert.strictEqual(avaliar(ctx, `trpgModificador(${valor})`), esperado, "valor " + valor);
  });
});

teste("modificador de campo vazio ou ausente é null, não zero", () => {
  assert.strictEqual(avaliar(ctx, "trpgModificador(null)"), null);
  assert.strictEqual(avaliar(ctx, 'trpgModificador("")'), null);
  assert.strictEqual(avaliar(ctx, "trpgModificador(undefined)"), null);
});

/* Nível 5 (metade = 2). CA = 10 + 2 + mod Des + armadura + escudo; tamanho não entra. Iniciativa = mod Des.
   Personagem 1: Des 14 (+2), armadura 5, escudo 2 -> CA 21. Personagem 2: Des 8 (-1) -> CA 11. Personagem 3: Des 20 (+5), armadura 8 -> CA 25. */
const personagens = [
  { nome: "Personagem 1", des: 14, arm: 5, esc: 2, ca: 21, ini: 2 },
  { nome: "Personagem 2", des: 8, arm: 0, esc: 0, ca: 11, ini: -1 },
  { nome: "Personagem 3", des: 20, arm: 8, esc: 0, ca: 25, ini: 5 }
];

personagens.forEach(c => {
  teste(c.nome + ": CA e iniciativa batem com a conta feita à mão", () => {
    const expr = `(() => { const p = estadoPadrao().personagem; p.nivel = 5; p.atributos.destreza = ${c.des};
      p.derivados.armadura = ${c.arm}; p.derivados.escudo = ${c.esc};
      return trpgDerivados(p); })()`;
    const d = avaliar(ctx, expr);
    assert.strictEqual(d.ca, c.ca, "CA");
    assert.strictEqual(d.iniciativa, c.ini, "iniciativa");
  });
});

teste("perícias treinadas no 1º nível (PDF p.79): base + Inteligência, mínimo de 1 no total", () => {
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: 2, inteligencia: 12 })"), 3);
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: 2, inteligencia: 8 })"), 1);
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: 0, inteligencia: 8 })"), 1);
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: 4, inteligencia: 18 })"), 8);
});

teste("perícias treinadas: exemplos do livro (PDF p.79) - Francis (ladino humano, Int 13) = 11; minotauro guerreiro (Int 8) = 1; goblin ladino (Int 18) = 12", () => {
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: 8, inteligencia: 13, bonusRacial: 2 })"), 11);
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: 2, inteligencia: 8, bonusRacial: 0 })"), 1);
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: 8, inteligencia: 18, bonusRacial: 0 })"), 12);
});

teste("perícias treinadas ficam null sem base da classe, sem Inteligência ou sem raça escolhida", () => {
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: null, inteligencia: 14, bonusRacial: 0 })"), null);
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: 2, inteligencia: null, bonusRacial: 0 })"), null);
  assert.strictEqual(avaliar(ctx, "trpgPericiasTreinadas({ base: 2, inteligencia: 14, bonusRacial: null })"), null);
});

teste("bônus racial de perícias: humano +2 (PDF p.79); outra raça 0 sem dado; raça vazia null", () => {
  assert.strictEqual(avaliar(ctx, 'trpgBonusRacialPericias("humano")'), 2);
  assert.strictEqual(avaliar(ctx, 'trpgBonusRacialPericias("Humano")'), 2);
  assert.strictEqual(avaliar(ctx, 'trpgBonusRacialPericias("Anão")'), 0);
  assert.strictEqual(avaliar(ctx, 'trpgBonusRacialPericias("")'), null);
  assert.strictEqual(avaliar(ctx, "trpgBonusRacialPericias(null)"), null);
});

teste("método alternativo (PDF p.80): 4 vezes no 1º nível e o mesmo valor depois; Francis (11) = 44 e 11", () => {
  assert.deepStrictEqual(avaliar(ctx, "trpgPontosPericiaAlternativo(11)"), { nivel1: 44, porNivelSeguinte: 11 });
  assert.strictEqual(avaliar(ctx, "trpgPontosPericiaAlternativo(null)"), null);
});

teste("derivados: perícias treinadas do Ladino com Int 13 e raça humana = 11; sem raça = null", () => {
  const com = avaliar(ctx, 'trpgDerivados(Object.assign(estadoPadrao().personagem, { classe: "ladino", raca: "humano", atributos: Object.assign(estadoPadrao().personagem.atributos, { inteligencia: 13 }) }))');
  assert.strictEqual(com.periciasTreinadas, 11);
  assert.deepStrictEqual(com.pontosPericiaAlternativo, { nivel1: 44, porNivelSeguinte: 11 });
  const sem = avaliar(ctx, 'trpgDerivados(Object.assign(estadoPadrao().personagem, { classe: "ladino", raca: "", atributos: Object.assign(estadoPadrao().personagem.atributos, { inteligencia: 13 }) }))');
  assert.strictEqual(sem.periciasTreinadas, null);
});

teste("perícias treinadas de classes conferidas no livro (PDF p.49 a p.76): Bardo 6, Guerreiro 2, Monge 4, Ladino 8 (Int 10, sem bônus)", () => {
  const n = (classe) => avaliar(ctx, 'trpgDerivados(Object.assign(estadoPadrao().personagem, { classe: "' + classe + '", raca: "Anão" }))').periciasTreinadas;
  assert.strictEqual(n("bardo"), 6);
  assert.strictEqual(n("guerreiro"), 2);
  assert.strictEqual(n("monge"), 4);
  assert.strictEqual(n("ladino"), 8);
});

teste("iniciativa exibida segue só o modificador de Destreza (graduação da perícia não somada, PDF p.80 e p.82)", () => {
  const d = avaliar(ctx, 'trpgDerivados(Object.assign(estadoPadrao().personagem, { nivel: 5, classe: "ladino", atributos: Object.assign(estadoPadrao().personagem.atributos, { destreza: 16 }) }))');
  assert.strictEqual(d.iniciativa, 3);
});

teste("sem classe escolhida, BBA e PV sugerido ficam null; resistências não dependem da classe", () => {
  const d = avaliar(ctx, "trpgDerivados(estadoPadrao().personagem)");
  assert.strictEqual(d.bba, null);
  assert.notStrictEqual(d.resistencias.fortitude, null);
  assert.strictEqual(d.periciasTreinadas, null);
  assert.strictEqual(d.pvSugerido, null);
  assert.strictEqual(d.circulos, null);
});

teste("PV por nível (Guerreiro): 20 + Con no 1º nível; 5 + Con por nível seguinte", () => {
  // Con 14 (+2), nível 1: 20 + 2 = 22. Nível 3: 22 + 2 * (5 + 2) = 36.
  assert.strictEqual(avaliar(ctx, 'trpgPVTotal({ classe: TRPG_CLASSES.guerreiro, nivel: 1, constituicao: 14 })'), 22);
  assert.strictEqual(avaliar(ctx, 'trpgPVTotal({ classe: TRPG_CLASSES.guerreiro, nivel: 3, constituicao: 14 })'), 36);
  // Con 8 (-1), nível 5: (20 - 1) + 4 * (5 - 1) = 35.
  assert.strictEqual(avaliar(ctx, 'trpgPVTotal({ classe: TRPG_CLASSES.guerreiro, nivel: 5, constituicao: 8 })'), 35);
});

teste("PV por nível (Mago e Bárbaro) com contas feitas à mão", () => {
  // Mago, Con 12 (+1), nível 4: (8 + 1) + 3 * (2 + 1) = 18.
  assert.strictEqual(avaliar(ctx, 'trpgPVTotal({ classe: TRPG_CLASSES.mago, nivel: 4, constituicao: 12 })'), 18);
  // Bárbaro, Con 16 (+3), nível 2: (24 + 3) + 1 * (6 + 3) = 36.
  assert.strictEqual(avaliar(ctx, 'trpgPVTotal({ classe: TRPG_CLASSES.barbaro, nivel: 2, constituicao: 16 })'), 36);
});

teste("PV sugerido fica null sem classe, sem nível válido ou sem Constituição", () => {
  assert.strictEqual(avaliar(ctx, 'trpgPVTotal({ classe: null, nivel: 1, constituicao: 14 })'), null);
  assert.strictEqual(avaliar(ctx, 'trpgPVTotal({ classe: TRPG_CLASSES.guerreiro, nivel: 0, constituicao: 14 })'), null);
  assert.strictEqual(avaliar(ctx, 'trpgPVTotal({ classe: TRPG_CLASSES.guerreiro, nivel: 1, constituicao: null })'), null);
});

teste("BBA por nível conferido: Guerreiro 5 = +5; Mago 10 = +5; Bardo 4 = +3; Ladino 6 = +4; Mago 1 = +0; Mago 2 = +1", () => {
  const bba = (classe, nivel) => avaliar(ctx, `trpgBBA(TRPG_CLASSES.${classe}, ${nivel})`);
  assert.strictEqual(bba("guerreiro", 5), 5);
  assert.strictEqual(bba("mago", 10), 5);
  assert.strictEqual(bba("bardo", 4), 3);
  assert.strictEqual(bba("ladino", 6), 4);
  assert.strictEqual(bba("mago", 1), 0);
  assert.strictEqual(bba("mago", 2), 1);
  assert.strictEqual(bba("ranger", 20), 20);
});

teste("BBA é null sem classe ou fora do nível 1 a 20", () => {
  assert.strictEqual(avaliar(ctx, "trpgBBA(null, 3)"), null);
  assert.strictEqual(avaliar(ctx, "trpgBBA(TRPG_CLASSES.mago, 0)"), null);
  assert.strictEqual(avaliar(ctx, "trpgBBA(TRPG_CLASSES.mago, 21)"), null);
});

teste("resistência = base + 2 por talento de resistência (aritmética com base de teste, não é valor da regra)", () => {
  assert.strictEqual(avaliar(ctx, "trpgResistencia({ base: 2, talentos: 1 })"), 4);
  assert.strictEqual(avaliar(ctx, "trpgResistencia({ base: 0, talentos: 2 })"), 4);
  assert.strictEqual(avaliar(ctx, "trpgResistencia({ base: 3 })"), 3);
});

teste("resistências: metade do nível + mod. de Con/Des/Sab (PDF p225); sem habilidade ou nível ficam null", () => {
  assert.strictEqual(avaliar(ctx, "trpgResistencia({ base: null, talentos: 2 })"), null);
  const d = avaliar(ctx, 'trpgDerivados(Object.assign(estadoPadrao().personagem, { classe: "guerreiro", nivel: 5, atributos: { forca: 10, destreza: 14, constituicao: 14, inteligencia: 10, sabedoria: 10, carisma: 10 } }))');
  // nível 5 -> metade 2; Con 14 (+2) -> Fort 4; Des 14 (+2) -> Ref 4; Sab 10 (0) -> Von 2
  assert.deepStrictEqual(d.resistencias, { fortitude: 4, reflexos: 4, vontade: 2 });
  const semNivel = avaliar(ctx, 'trpgDerivados(Object.assign(estadoPadrao().personagem, { classe: "guerreiro", nivel: null, atributos: { forca: 10, destreza: 14, constituicao: 14, inteligencia: 10, sabedoria: 10, carisma: 10 } }))');
  assert.deepStrictEqual(semNivel.resistencias, { fortitude: null, reflexos: null, vontade: null });
});

teste("PV por nível: ganha pelo menos 1 PV ao subir de nível, mesmo com Constituição negativa (PDF p28)", () => {
  // mago: ganho por nível = PV/nível + mod. Con (-5 com Con 1) é negativo, então sobe 1 por nível.
  const esperado = "TRPG_CLASSES.mago.dadoDeVida.inicial - 5 + 2 * 1";
  assert.strictEqual(avaliar(ctx, "trpgPVTotal({ classe: TRPG_CLASSES.mago, nivel: 3, constituicao: 1 })"), avaliar(ctx, esperado));
});

teste("classes conferidas: talentos de resistência do Guerreiro (Fortitude Maior) e do Ladino (Reflexos Rápidos)", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_CLASSES.guerreiro.resistencias.talentosDeResistencia"), ["Fortitude Maior"]);
  assert.deepStrictEqual(avaliar(ctx, "TRPG_CLASSES.ladino.resistencias.talentosDeResistencia"), ["Reflexos Rápidos"]);
});

teste("círculos de magia por nível conferidos: Mago 1 = [0, 1]; Mago 3 = [0, 1, 2]; Mago 17 = [0 a 9]; Ranger 4 = []", () => {
  assert.deepStrictEqual(avaliar(ctx, "trpgCirculosDisponiveis(TRPG_CLASSES.mago, 1)"), [0, 1]);
  assert.deepStrictEqual(avaliar(ctx, "trpgCirculosDisponiveis(TRPG_CLASSES.mago, 3)"), [0, 1, 2]);
  assert.deepStrictEqual(avaliar(ctx, "trpgCirculosDisponiveis(TRPG_CLASSES.mago, 17)"), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.deepStrictEqual(avaliar(ctx, "trpgCirculosDisponiveis(TRPG_CLASSES.ranger, 4)"), []);
  assert.deepStrictEqual(avaliar(ctx, "trpgCirculosDisponiveis(TRPG_CLASSES.ranger, 5)"), [1]);
});

teste("classe que não conjura devolve null em círculos", () => {
  assert.strictEqual(avaliar(ctx, "trpgCirculosDisponiveis(TRPG_CLASSES.guerreiro, 5)"), null);
});

teste("classe digitada em texto livre é reconhecida pelo nome (Guerreiro = guerreiro)", () => {
  const d = avaliar(ctx, 'trpgDerivados(Object.assign(estadoPadrao().personagem, { classe: "Guerreiro", nivel: 5 }))');
  assert.strictEqual(d.bba, 5);
});

/* Ajustes fixos batem com a tabela do livro (PDF p.31). Humano e lefou têm escolha de habilidade: ajustes null (não modelada). */
teste("raças: ajustes fixos batem com o livro (PDF p.31); humano e lefou ficam null (escolha não modelada)", () => {
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.anao.ajustes"), { constituicao: 4, sabedoria: 2, destreza: -2 });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.elfo.ajustes"), { destreza: 4, inteligencia: 2, constituicao: -2 });
  assert.deepStrictEqual(avaliar(ctx, "TRPG_RACAS.halfling.ajustes"), { destreza: 4, carisma: 2, forca: -2 });
  assert.strictEqual(avaliar(ctx, "TRPG_RACAS.humano.ajustes"), null);
  assert.strictEqual(avaliar(ctx, "TRPG_RACAS.lefou.ajustes"), null);
});

teste("tabelas: 8 raças, 13 classes, 19 perícias, 13 talentos principais, 6 métodos de atributos", () => {
  assert.strictEqual(avaliar(ctx, "Object.keys(TRPG_RACAS).length"), 8);
  assert.strictEqual(avaliar(ctx, "Object.keys(TRPG_CLASSES).length"), 13);
  assert.strictEqual(avaliar(ctx, "TRPG_PERICIAS.length"), 19);
  assert.strictEqual(avaliar(ctx, "Object.keys(TRPG_TALENTOS).length"), 13);
  assert.strictEqual(avaliar(ctx, "TRPG_METODOS_ATRIBUTOS.length"), 6);
});

teste("cada classe tem 20 valores de BBA, PV positivo, perícias e talentos adicionais", () => {
  const classes = avaliar(ctx, "Object.values(TRPG_CLASSES)");
  classes.forEach(c => {
    assert.strictEqual(c.bba.length, 20, "BBA de " + c.nome);
    assert.ok(c.dadoDeVida.inicial > 0 && c.dadoDeVida.porNivel > 0, "PV de " + c.nome);
    assert.ok(c.pericias.treinadasBase >= 1 && c.pericias.classe.length > 0, "perícias de " + c.nome);
    assert.ok(c.talentosAdicionais.length > 0, "talentos de " + c.nome);
  });
});

teste("cada classe preenchida traz dado de vida, BBA, resistências e fonte", () => {
  const classes = avaliar(ctx, "Object.values(TRPG_CLASSES)");
  classes.forEach(c => {
    ["nome", "dadoDeVida", "bba", "resistencias", "fonte"].forEach(campo => {
      assert.ok(c[campo] !== undefined && c[campo] !== null, "classe sem " + campo + ": " + c.nome);
    });
  });
});

teste("todo item de regra, raça, classe, perícia, talento e método traz fonte", () => {
  const sem = [];
  const checa = (nome, lista) => lista.forEach(([id, item]) => { if(!item.fonte || item.fonte.length < 4) sem.push(nome + ":" + id); });
  checa("classe", Object.entries(avaliar(ctx, "TRPG_CLASSES")));
  checa("raça", Object.entries(avaliar(ctx, "TRPG_RACAS")));
  checa("talento", Object.entries(avaliar(ctx, "TRPG_TALENTOS")));
  checa("método", avaliar(ctx, "TRPG_METODOS_ATRIBUTOS").map(m => [m.id, m]));
  checa("perícia", avaliar(ctx, "TRPG_PERICIAS").map(p => [p.id, p]));
  assert.deepStrictEqual(sem, []);
});

teste("talentos de classe e perícias de classe existem nas tabelas principais", () => {
  const nomesTalentos = avaliar(ctx, "Object.values(TRPG_TALENTOS).map(t => t.nome)");
  const nomesPericias = avaliar(ctx, "TRPG_PERICIAS.map(p => p.nome)");
  const faltaT = [], faltaP = [];
  avaliar(ctx, "Object.values(TRPG_CLASSES)").forEach(c => {
    c.talentosAdicionais.forEach(t => { if(!nomesTalentos.includes(t)) faltaT.push(c.nome + ": " + t); });
    c.pericias.classe.forEach(p => { if(!nomesPericias.includes(p.nome)) faltaP.push(c.nome + ": " + p.nome); });
  });
  assert.deepStrictEqual(faltaT, []);
  assert.deepStrictEqual(faltaP, []);
});

teste("dinheiro inicial sugerido é 100 (fonte única) e a moeda aparece com o nome da fonte", () => {
  assert.strictEqual(avaliar(ctx, "TRPG_DINHEIRO_INICIAL.valor"), 100);
  assert.ok(/100 TO/.test(avaliar(ctx, "TRPG_DINHEIRO_INICIAL.fonte")));
});

teste("cada regra e cada atributo tem campo fonte preenchido", () => {
  const regras = avaliar(ctx, "TRPG_REGRAS");
  Object.keys(regras).forEach(k => assert.ok(regras[k].fonte && regras[k].fonte.length > 3, "sem fonte: " + k));
  const atrs = avaliar(ctx, "TRPG_ATRIBUTOS");
  atrs.forEach(a => assert.ok(a.fonte && a.fonte.length > 3, "sem fonte: " + a.id));
});

teste("a licença oficial fica NÃO VERIFICADO; a nota de comunidade não vira licença", () => {
  assert.strictEqual(avaliar(ctx, "TRPG_META.licenca"), "NÃO VERIFICADO");
  assert.ok(/Licença Aberta/.test(avaliar(ctx, "TRPG_META.licencaComunidade")));
});

sair("regras");
