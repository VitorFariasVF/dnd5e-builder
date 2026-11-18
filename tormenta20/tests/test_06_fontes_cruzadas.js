/* Regressão de dados de classe, perícias, origens e atributos contra o livro-base (Tormenta20 Jogo do Ano, livro do usuário).
   Revisão 2026-11-17: a fonte primária passou a ser o livro (pNNN). Onde as fontes antigas ([E], [R], [T]) divergiam do livro,
   o teste foi atualizado e a mudança está comentada com a página. Ver docs/TRABALHO_T20_CLASSES.md.
   Raças (linhas do fim) continuam como estavam: pertencem à revisão de rules-racas.js, que tem outro dono. */
const { carregar, criarTeste, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Fontes cruzadas Tormenta20 (revisão 2026-11-17)");
const ctx = carregar(SCRIPTS);

const CLASSES_ESPERADAS = ["arcanista", "barbaro", "bardo", "bucaneiro", "cacador", "cavaleiro", "clerigo",
  "druida", "guerreiro", "inventor", "ladino", "lutador", "nobre", "paladino"];
t.igual("14 classes do livro básico", ctx.T20_CLASSE_IDS.slice().sort(), CLASSES_ESPERADAS.slice().sort());

/* Compra de atributos: tabela e total confirmados no livro (p023, Tabela 1-1). */
t.igual("compra: custos -1..4 = -1,0,1,2,4,7", ctx.T20_PONTOS_COMPRA.custos, { "-1": -1, "0": 0, "1": 1, "2": 2, "3": 4, "4": 7 });
t.igual("compra: total 10, mínimo -1, máximo 4", [ctx.T20_PONTOS_COMPRA.total, ctx.T20_PONTOS_COMPRA.minimo, ctx.T20_PONTOS_COMPRA.maximo], [10, -1, 4]);
/* Antes: verificado false (1 fonte). Agora o livro confirma a tabela (p023). */
t.igual("compra: tabela confirmada no livro (p023)", ctx.T20_PONTOS_COMPRA.verificado, true);
t.igual("compra: todos em 0 custam 0", ctx.t20PontosGastos({ forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }), 0);
t.igual("compra: FOR 4 (7) + DES 3 (4) + CON 2 (2) + INT -1 (-1) = 12", ctx.t20PontosGastos({ forca: 4, destreza: 3, constituicao: 2, inteligencia: -1, sabedoria: 0, carisma: 0 }), 12);

/* Perícias (p121): 29 nomes. Artes não existe no livro e Medicina é poder geral (p132), não perícia.
   Só-treinadas: as marcadas "Treinada" no índice da p121. Penalidade de armadura: as marcadas "Armadura" (Atletismo não tem). */
t.igual("29 perícias (p121)", ctx.T20_PERICIAS.length, 29);
t.igual("sem Artes nem Medicina (não são perícias do livro)", ctx.T20_PERICIA_NOMES.filter(n => n === "Artes" || n === "Medicina"), []);
t.igual("só treinadas (p121): Adestramento, Atuação, Conhecimento, Guerra, Jogatina, Ladinagem, Misticismo, Nobreza, Ofício, Pilotagem, Religião",
  ctx.T20_PERICIAS.filter(p => p.soTreinado).map(p => p.nome).sort(),
  ["Adestramento", "Atuação", "Conhecimento", "Guerra", "Jogatina", "Ladinagem", "Misticismo", "Nobreza", "Ofício", "Pilotagem", "Religião"]);
t.igual("penalidade de armadura (p121): Acrobacia, Furtividade, Ladinagem",
  ctx.T20_PERICIAS.filter(p => p.penalidadeArmadura).map(p => p.nome).sort(), ["Acrobacia", "Furtividade", "Ladinagem"]);
t.igual("Ladinagem usa Destreza", ctx.t20Pericia("Ladinagem").attr, "destreza");

/* Origens (p093): 35 nomes sem repetição, cada um com perícias e poderes do livro. */
t.igual("35 origens sem repetição", new Set(ctx.T20_ORIGENS).size === ctx.T20_ORIGENS.length && ctx.T20_ORIGENS.length, 35);
t.check("origem do fundo: Acólito é a primeira", ctx.T20_ORIGENS[0] === "Acólito");
t.igual("35 origens com benefícios (p093)", Object.keys(ctx.T20_ORIGENS_BENEFICIOS).length, 35);
t.check("fonte das origens cita p091 e p093", /p091/.test(ctx.T20_ORIGEM_FONTE) && /p093/.test(ctx.T20_ORIGEM_FONTE));
t.igual("Acólito (p093): Cura, Religião, Vontade; Medicina, Membro da Igreja, Vontade de Ferro",
  [ctx.T20_ORIGENS_BENEFICIOS["Acólito"].pericias, ctx.T20_ORIGENS_BENEFICIOS["Acólito"].poderes],
  [["Cura", "Religião", "Vontade"], ["Medicina", "Membro da Igreja", "Vontade de Ferro"]]);

/* Ladino (p079): PV 12 + CON, 3 + CON por nível, PM 4 por nível. Perícias fixas Ladinagem e Reflexos. */
t.igual("Ladino nível 1, CON 0: PV 12", ctx.t20PVTotal("ladino", 1, 0), 12);
t.igual("Ladino nível 3, CON 1: PV 12 + 1 + (3+1) + (3+1) = 21", ctx.t20PVTotal("ladino", 3, 1), 21);
t.igual("Ladino nível 2: PM 8", ctx.t20PMTotal("ladino", 2, 0), 8);
t.igual("Ladino: PV e PM confirmados no livro", ctx.T20_CLASSES.ladino.verificadoPv, true);
t.igual("Ladino: perícias fixas Ladinagem e Reflexos (p079)", ctx.T20_CLASSES.ladino.fixas, ["Ladinagem", "Reflexos"]);
t.igual("Ladino: 8 perícias livres (p038)", ctx.T20_CLASSES.ladino.periciasPorNivel, 8);

/* Clérigo (p063): PV 16 + CON no nível 1 e PM = 5 + SAB no nível 1. */
t.igual("Clérigo nível 1, CON 0: PV 16", ctx.t20PVTotal("clerigo", 1, 0), 16);
t.igual("Clérigo nível 1, SAB +4: PM 5 + 4 = 9", ctx.t20PMTotal("clerigo", 1, 4), 9);
t.igual("Clérigo: três magias de 1º círculo (p063)", ctx.t20MagiasConhecidasLimite("clerigo", 1), 3);

/* Bardo (p050): PV 12 + CON e 3 + CON por nível. Antes: conflito com a fonte [E] (16 + 4), agora resolvido pelo livro. */
t.igual("Bardo nível 1, CON 2: PV 12 + 2 = 14 (p050)", ctx.t20PVTotal("bardo", 1, 2), 14);
t.igual("Bardo nível 1, CAR +2: PM 4 + 2 = 6", ctx.t20PMTotal("bardo", 1, 2), 6);
t.igual("Bardo: duas magias de 1º círculo (p050)", ctx.t20MagiasConhecidasLimite("bardo", 1), 2);
t.check("Bardo: PV citado do livro (p050)", /p050/.test(ctx.T20_CLASSES.bardo.fontePv) && !/CONFLITO/.test(ctx.T20_CLASSES.bardo.fontePv));

/* Magias de 1º círculo: Arcanista tem 3 no Bruxo e Feiticeiro (p043), mas o Mago começa com 4: sem o selo. Druida: 2 (p067). */
t.igual("Arcanista: três magias, selo não verificado (caminho do Mago)", [ctx.t20MagiasConhecidasLimite("arcanista", 1), ctx.T20_CLASSES.arcanista.verificadoMagias], [3, false]);
t.igual("Druida: duas magias, confirmadas no livro (p067)", [ctx.t20MagiasConhecidasLimite("druida", 1), ctx.T20_CLASSES.druida.verificadoMagias], [2, true]);

/* Guerreiro (p071): PV 20 + CON, 5 + CON por nível, PM 3. Antes: rebaixado por conflito com o exemplo do timEU. */
t.igual("Guerreiro: PV confirmado no livro (p071)", ctx.T20_CLASSES.guerreiro.verificadoPv, true);
t.check("Guerreiro: PV citado do livro (p071)", /p071/.test(ctx.T20_CLASSES.guerreiro.fontePv));

/* Rótulos (livro): PV e PM confirmados nas 14 classes; magias em Bardo, Clérigo e Druida; perícias em todas, menos Caçador
   (p038 e p056 divergem sobre quantas perícias livres ele tem). */
const pvConfirmado = ctx.T20_CLASSE_IDS.filter(id => ctx.T20_CLASSES[id].verificadoPv).sort();
t.igual("PV e PM confirmados no livro: as 14 classes", pvConfirmado, CLASSES_ESPERADAS.slice().sort());
const magiasConfirmadas = ctx.T20_CLASSE_IDS.filter(id => ctx.T20_CLASSES[id].verificadoMagias).sort();
t.igual("magias confirmadas no livro: bardo, clerigo, druida (arcanista fica com selo por causa do Mago)", magiasConfirmadas, ["bardo", "clerigo", "druida"]);
t.igual("perícias sem confirmação: só Caçador (conflito interno do livro)", ctx.T20_CLASSE_IDS.filter(id => !ctx.T20_CLASSES[id].verificadoPericias), ["cacador"]);

/* Perícias fixas e grupos (p038, Tabela 1-3, e características de cada classe). */
t.igual("Bucaneiro: Reflexos fixa e Luta ou Pontaria (p053)", [ctx.T20_CLASSES.bucaneiro.fixas, ctx.T20_CLASSES.bucaneiro.grupoFixo.opcoes], [["Reflexos"], ["Luta", "Pontaria"]]);
t.igual("Druida: Sobrevivência e Vontade fixas (p067)", ctx.T20_CLASSES.druida.fixas, ["Sobrevivência", "Vontade"]);
t.igual("Nobre: Vontade fixa e Diplomacia ou Intimidação (p085)", [ctx.T20_CLASSES.nobre.fixas, ctx.T20_CLASSES.nobre.grupoFixo.opcoes], [["Vontade"], ["Diplomacia", "Intimidação"]]);
t.igual("Inventor: Ofício e Vontade fixas (p074)", ctx.T20_CLASSES.inventor.fixas, ["Ofício", "Vontade"]);

/* Proficiências (livro, p038-p088). */
t.igual("Clérigo: armaduras pesadas e escudos (p063)", ctx.T20_CLASSES.clerigo.proficiencias, ["Armaduras pesadas", "Escudos"]);
t.igual("Druida: só escudos (p067)", ctx.T20_CLASSES.druida.proficiencias, ["Escudos"]);
t.igual("Arcanista: nenhuma proficiência de arma ou armadura (p043)", ctx.T20_CLASSES.arcanista.proficiencias, ["Nenhuma"]);

/* Paladino (p088): PM 3 por nível; Carisma soma ao PM só no 1º nível (p082). Antes: 4 por nível. */
t.igual("Paladino: PM 3 por nível", ctx.T20_CLASSES.paladino.pmNivel, 3);
t.igual("Paladino nível 1, CAR +2: PM 3 + 2 = 5", ctx.t20PMTotal("paladino", 1, 0, 2), 5);
t.igual("Paladino nível 2, CAR +2: PM 3 × 2 = 6, mais CAR 2 só no 1º nível = 8", ctx.t20PMTotal("paladino", 2, 0, 2), 8);
/* Nobre (p085): PV 16 + CON e 4 + CON por nível; PM 4. Antes: 12 e 3. */
t.igual("Nobre: PV inicial 16 e PV por nível 4 (p085)", [ctx.T20_CLASSES.nobre.pvInicial, ctx.T20_CLASSES.nobre.pvNivel], [16, 4]);

/* Defesa (p112): fórmula confirmada no livro. */
t.igual("Defesa: DES 2 + armadura 5 + escudo 2 = 19", ctx.t20Defesa(2, { armadura: 5, escudo: 2 }), 19);

/* Círculos por classe (p043, p050, p063, p067). Arcanista: 2º no 5º. Bardo: 2º no 6º. */
t.igual("círculo máximo Bardo: nível 5 = 1º, 6 = 2º, 10 = 3º, 14 = 4º", [5, 6, 10, 14].map(n => ctx.t20CirculoMaximo(n, "bardo")), [1, 2, 3, 4]);
t.igual("círculo máximo Arcanista: nível 4 = 1º, 5 = 2º, 9 = 3º, 13 = 4º, 17 = 5º", [4, 5, 9, 13, 17].map(n => ctx.t20CirculoMaximo(n, "arcanista")), [1, 2, 3, 4, 5]);
t.check("círculos citam o livro (p043 e p050)", /p043/.test(ctx.T20_CIRCULOS_FONTE) && /p050/.test(ctx.T20_CIRCULOS_FONTE));

/* Raças: ajustes conferidos no livro do usuário (p024). Humano tem ajuste à escolha, sem valor fixo. */
t.igual("Minotauro: FOR +2, CON +1, SAB -1 (1 fonte)", ctx.T20_RACAS_COMPLETAS.minotauro.ajustes, { forca: 2, constituicao: 1, sabedoria: -1 });
t.igual("Hynne: Pequeno, 6 m (2 fontes)", [ctx.T20_RACAS_COMPLETAS.hynne.tamanho, ctx.T20_RACAS_COMPLETAS.hynne.deslocamento], ["Pequeno", 6]);
t.igual("Anão e Elfo: ajustes do livro; Humano: ajuste à escolha (sem valor fixo)", [ctx.T20_RACAS_COMPLETAS.anao.ajustes, ctx.T20_RACAS_COMPLETAS.elfo.ajustes, ctx.T20_RACAS_COMPLETAS.humano.ajustes], [{ constituicao: 2, sabedoria: 1, destreza: -1 }, { inteligencia: 2, destreza: 1, constituicao: -1 }, null]);

/* Regra de treino (p120): metade do nível em todas; +2, +4, +6 nas treinadas. Resolvido pelo livro. */
t.check("regra de treino: citada no livro (p120), sem conflito", /p120/.test(ctx.T20_TREINO_FONTE) && !/CONFLITO/.test(ctx.T20_TREINO_FONTE));
t.igual("bônus de treinamento: 2 no 1º, 4 no 7º, 6 no 15º (p120)", [1, 6, 7, 14, 15, 20].map(n => ctx.t20BonusTreinamento(n)), [2, 2, 4, 4, 6, 6]);

t.fim();
