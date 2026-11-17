/* Regressão da revisão independente de 2026-11-17 (docs/VERIFICACAO_TORMENTA20.md).
   Trava os valores que duas fontes públicas confirmaram, os conflitos conhecidos e os rótulos
   NÃO VERIFICADO que foram rebaixados. Se um desses dados mudar, o teste avisa: confira a fonte antes de ajustar. */
const { carregar, criarTeste, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Fontes cruzadas Tormenta20 (revisão 2026-11-17)");
const ctx = carregar(SCRIPTS);

const CLASSES_ESPERADAS = ["arcanista", "barbaro", "bardo", "bucaneiro", "cacador", "cavaleiro", "clerigo",
  "druida", "guerreiro", "inventor", "ladino", "lutador", "nobre", "paladino"];
t.igual("14 classes do livro básico", ctx.T20_CLASSE_IDS.slice().sort(), CLASSES_ESPERADAS.slice().sort());

/* Compra de atributos: tabela só em uma fonte, por isso continua NÃO VERIFICADO. Total e início, em duas. */
t.igual("compra: custos -1..4 = -1,0,1,2,4,7", ctx.T20_PONTOS_COMPRA.custos, { "-1": -1, "0": 0, "1": 1, "2": 2, "3": 4, "4": 7 });
t.igual("compra: total 10, mínimo -1, máximo 4", [ctx.T20_PONTOS_COMPRA.total, ctx.T20_PONTOS_COMPRA.minimo, ctx.T20_PONTOS_COMPRA.maximo], [10, -1, 4]);
t.igual("compra: tabela segue não verificada (1 fonte)", ctx.T20_PONTOS_COMPRA.verificado, false);
t.igual("compra: todos em 0 custam 0", ctx.t20PontosGastos({ forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }), 0);
t.igual("compra: FOR 4 (7) + DES 3 (4) + CON 2 (2) + INT -1 (-1) = 12", ctx.t20PontosGastos({ forca: 4, destreza: 3, constituicao: 2, inteligencia: -1, sabedoria: 0, carisma: 0 }), 12);

/* Perícias: 31 nomes, só-treinadas e penalidade de armadura conferidas com a lista da fonte [E]. */
t.igual("31 perícias", ctx.T20_PERICIAS.length, 31);
t.igual("só treinadas: Conhecimento, Guerra, Ladinagem, Medicina, Nobreza, Religião",
  ctx.T20_PERICIAS.filter(p => p.soTreinado).map(p => p.nome).sort(),
  ["Conhecimento", "Guerra", "Ladinagem", "Medicina", "Nobreza", "Religião"]);
t.igual("penalidade de armadura: Acrobacia, Atletismo, Furtividade",
  ctx.T20_PERICIAS.filter(p => p.penalidadeArmadura).map(p => p.nome).sort(), ["Acrobacia", "Atletismo", "Furtividade"]);
t.igual("Ladinagem usa Destreza", ctx.t20Pericia("Ladinagem").attr, "destreza");

/* Origens: 35 nomes, sem repetição. Benefícios específicos seguem NÃO VERIFICADO. */
t.igual("35 origens sem repetição", new Set(ctx.T20_ORIGENS).size === ctx.T20_ORIGENS.length && ctx.T20_ORIGENS.length, 35);
t.check("origem do fundo: Acólito é a primeira", ctx.T20_ORIGENS[0] === "Acólito");
t.check("fonte das origens declara o conflito de benefícios", /CONFLITO/.test(ctx.T20_ORIGEM_FONTE));

/* Ladino: PV 12 + CON, +3 + CON por nível, PM +4 por nível (duas fontes). */
t.igual("Ladino nível 1, CON 0: PV 12", ctx.t20PVTotal("ladino", 1, 0), 12);
t.igual("Ladino nível 3, CON 1: PV 12 + 3×2 + 1×3 = 21", ctx.t20PVTotal("ladino", 3, 1), 21);
t.igual("Ladino nível 2: PM 8", ctx.t20PMTotal("ladino", 2, 0), 8);
t.igual("Ladino: PV e PM confirmados em duas fontes", ctx.T20_CLASSES.ladino.verificadoPv, true);
t.check("Ladino: conflito de perícias (fixas e +8 por nível) segue registrado", /CONFLITO/.test(ctx.T20_CLASSES.ladino.fontePericias));

/* Clérigo: PV 16 + CON no nível 1 e PM = 5 + SAB no nível 1 (exemplo da Rotina de Mestre: SAB +4 dá 9 PM). */
t.igual("Clérigo nível 1, CON 0: PV 16", ctx.t20PVTotal("clerigo", 1, 0), 16);
t.igual("Clérigo nível 1, SAB +4: PM 9", ctx.t20PMTotal("clerigo", 1, 4), 9);
t.igual("Clérigo: três magias de 1º círculo (duas fontes)", ctx.t20MagiasConhecidasLimite("clerigo", 1), 3);

/* Bardo: PV continua não calculado (conflito 12+CON x 16+CON). PM 4 por nível confere nas duas fontes. */
t.igual("Bardo: PV não calculado (conflito)", ctx.t20PVTotal("bardo", 1, 2), null);
t.igual("Bardo nível 1, CAR +2: PM 4 + 2 = 6", ctx.t20PMTotal("bardo", 1, 2), 6);
t.igual("Bardo: duas magias de 1º círculo (duas fontes)", ctx.t20MagiasConhecidasLimite("bardo", 1), 2);
t.check("Bardo: conflito de PV registrado", /CONFLITO/.test(ctx.T20_CLASSES.bardo.fontePv));

/* Magias de 1º círculo: fonte única para Arcanista e Druida, por isso sem o rótulo verificado. */
t.igual("Arcanista: três magias (1 fonte, não verificado)", [ctx.t20MagiasConhecidasLimite("arcanista", 1), ctx.T20_CLASSES.arcanista.verificadoMagias], [3, false]);
t.igual("Druida: duas magias (1 fonte, não verificado)", [ctx.t20MagiasConhecidasLimite("druida", 1), ctx.T20_CLASSES.druida.verificadoMagias], [2, false]);

/* Guerreiro: exemplo do timEU (16 PV, 2 PM) não bate com PV 20 + CON ou PM 3. Fica como conflito. */
t.igual("Guerreiro: PV rebaixado a não verificado", ctx.T20_CLASSES.guerreiro.verificadoPv, false);
t.check("Guerreiro: conflito de PV registrado", /CONFLITO/.test(ctx.T20_CLASSES.guerreiro.fontePv));

/* Rótulos: PV confirmado só em Arcanista, Clérigo e Ladino; magias só em Bardo e Clérigo; perícias em nenhuma classe. */
const pvConfirmado = ctx.T20_CLASSE_IDS.filter(id => ctx.T20_CLASSES[id].verificadoPv).sort();
t.igual("PV e PM confirmados em duas fontes: arcanista, clerigo, ladino", pvConfirmado, ["arcanista", "clerigo", "ladino"]);
const magiasConfirmadas = ctx.T20_CLASSE_IDS.filter(id => ctx.T20_CLASSES[id].verificadoMagias).sort();
t.igual("magias confirmadas em duas fontes: bardo, clerigo", magiasConfirmadas, ["bardo", "clerigo"]);
t.igual("nenhuma classe com perícias confirmadas em duas fontes", ctx.T20_CLASSE_IDS.filter(id => ctx.T20_CLASSES[id].verificadoPericias), []);

/* Defesa: fórmula da Rotina de Mestre (1 fonte com a fórmula). */
t.igual("Defesa: DES 2 + armadura 5 + escudo 2 = 19", ctx.t20Defesa(2, { armadura: 5, escudo: 2 }), 19);

/* Círculos: progressão da Rotina (Bardo e Druida), ainda NÃO VERIFICADO. Trava o comportamento atual. */
t.igual("círculo máximo: nível 5 = 1º, 6 = 2º, 10 = 3º, 14 = 4º", [5, 6, 10, 14].map(n => ctx.t20CirculoMaximo(n)), [1, 2, 3, 4]);
t.check("círculos seguem marcados NÃO VERIFICADO", /NÃO VERIFICADO/.test(ctx.T20_CIRCULOS_FONTE));

/* Raças: Minotauro, Hynne (issue #57, 1 fonte). Anão, Elfo e Humano sem ajustes verificados. */
t.igual("Minotauro: FOR +2, CON +1, SAB -1 (1 fonte)", ctx.T20_RACAS.minotauro.ajustes, { forca: 2, constituicao: 1, sabedoria: -1 });
t.igual("Hynne: Pequeno, 6 m (1 fonte)", [ctx.T20_RACAS.hynne.tamanho, ctx.T20_RACAS.hynne.deslocamento], ["Pequeno", 6]);
t.igual("Anão, Elfo e Humano: ajustes NÃO VERIFICADOS", [ctx.T20_RACAS.anao.ajustes, ctx.T20_RACAS.elfo.ajustes, ctx.T20_RACAS.humano.ajustes], [null, null, null]);

/* Regra de não treinada: conflito registrado, valor do app mantido e marcado. */
t.check("regra de treino: conflito registrado", /CONFLITO/.test(ctx.T20_TREINO_FONTE));

t.fim();
