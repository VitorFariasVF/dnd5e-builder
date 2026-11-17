/* Dados gerais da Tormenta RPG (edição d20, Jambô): perícias, talentos principais, métodos de atributos e dinheiro inicial.
   Cada item leva `fonte`. Fonte de comunidade (compêndio do VTT fvtt-trpg, wiki de fãs), não o livro. Itens sem fonte: NÃO VERIFICADO. */

/* Perícias que aparecem nas listas de perícias de classe do livro básico (compêndio de classes do VTT, commit ad33f72).
   O atributo vem da lista de cada classe e não conflita entre elas. Os subtipos de Conhecimento e Ofício e as perícias
   que só aparecem em outros livros (ex.: Jogatina, Meditação) NÃO entram aqui: NÃO VERIFICADO. */
/* Fonte das perícias: compêndio de classes do VTT fvtt-trpg (github.com/mclemente/fvtt-trpg, commit ad33f72), listas "Perícias de Classe".
   Página do livro: NÃO VERIFICADO. */
const FONTE_PERICIAS = "Compêndio de classes do VTT fvtt-trpg (comunidade), listas de perícias de classe; mesmo atributo na wiki de fãs tsrd, página \"Perícias Básico\"; página do livro NÃO VERIFICADO";
const TRPG_PERICIAS = [
  { id: "acrobacia", nome: "Acrobacia", atributo: "destreza", fonte: FONTE_PERICIAS },
  { id: "adestrar-animais", nome: "Adestrar Animais", atributo: "carisma", fonte: FONTE_PERICIAS },
  { id: "atletismo", nome: "Atletismo", atributo: "forca", fonte: FONTE_PERICIAS },
  { id: "atuacao", nome: "Atuação", atributo: "carisma", fonte: FONTE_PERICIAS },
  { id: "cavalgar", nome: "Cavalgar", atributo: "destreza", fonte: FONTE_PERICIAS },
  { id: "conhecimento", nome: "Conhecimento", atributo: "inteligencia", fonte: FONTE_PERICIAS },
  { id: "cura", nome: "Cura", atributo: "sabedoria", fonte: FONTE_PERICIAS },
  { id: "diplomacia", nome: "Diplomacia", atributo: "carisma", fonte: FONTE_PERICIAS },
  { id: "enganacao", nome: "Enganação", atributo: "carisma", fonte: FONTE_PERICIAS },
  { id: "furtividade", nome: "Furtividade", atributo: "destreza", fonte: FONTE_PERICIAS },
  { id: "identificar-magia", nome: "Identificar Magia", atributo: "inteligencia", fonte: FONTE_PERICIAS },
  { id: "iniciativa", nome: "Iniciativa", atributo: "destreza", fonte: FONTE_PERICIAS },
  { id: "intimidacao", nome: "Intimidação", atributo: "carisma", fonte: FONTE_PERICIAS },
  { id: "intuicao", nome: "Intuição", atributo: "sabedoria", fonte: FONTE_PERICIAS },
  { id: "ladinagem", nome: "Ladinagem", atributo: "destreza", fonte: FONTE_PERICIAS },
  { id: "obter-informacao", nome: "Obter Informação", atributo: "carisma", fonte: FONTE_PERICIAS },
  { id: "oficio", nome: "Ofício", atributo: "inteligencia", fonte: FONTE_PERICIAS },
  { id: "percepcao", nome: "Percepção", atributo: "sabedoria", fonte: FONTE_PERICIAS },
  { id: "sobrevivencia", nome: "Sobrevivência", atributo: "sabedoria", fonte: FONTE_PERICIAS }
];

/* Talentos principais: os 13 que aparecem nas classes e no compêndio de talentos. Benefício em palavras próprias.
   Fonte: compêndio talentos.db do VTT fvtt-trpg (commit ad33f72); página do livro NÃO VERIFICADO. */
const TRPG_TALENTOS = {
  "usar-armas-simples": { nome: "Usar Armas Simples", pre: [], beneficio: "Usa armas simples sem a penalidade de –4 nas jogadas de ataque.", fonte: "talentos.db (VTT fvtt-trpg)" },
  "usar-armas-marciais": { nome: "Usar Armas Marciais", pre: ["Usar Armas Simples"], beneficio: "Usa armas marciais sem a penalidade de –4 nas jogadas de ataque.", fonte: "talentos.db (VTT fvtt-trpg)" },
  "usar-armas-exoticas": { nome: "Usar Armas Exóticas", pre: ["Usar Armas Simples"], beneficio: "Usa uma arma exótica escolhida sem a penalidade de –4 nas jogadas de ataque.", fonte: "talentos.db (VTT fvtt-trpg)" },
  "usar-armaduras-leves": { nome: "Usar Armaduras Leves", pre: [], beneficio: "Usa armaduras leves sem a penalidade de armadura.", fonte: "talentos.db (VTT fvtt-trpg)" },
  "usar-armaduras-medias": { nome: "Usar Armaduras Médias", pre: ["Usar Armaduras Leves"], beneficio: "Usa armaduras médias sem a penalidade de armadura.", fonte: "talentos.db (VTT fvtt-trpg)" },
  "usar-armaduras-pesadas": { nome: "Usar Armaduras Pesadas", pre: ["Usar Armaduras Leves", "Usar Armaduras Médias"], beneficio: "Usa armaduras pesadas sem a penalidade de armadura.", fonte: "talentos.db (VTT fvtt-trpg)" },
  "usar-escudos": { nome: "Usar Escudos", pre: [], beneficio: "Usa escudos leves e pesados sem a penalidade de armadura.", fonte: "talentos.db (VTT fvtt-trpg)" },
  "senso-da-natureza": { nome: "Senso da Natureza", pre: [], beneficio: "Pode repetir um teste de Sobrevivência já feito, mas deve aceitar a segunda rolagem.", fonte: "talentos.db (VTT fvtt-trpg)" },
  "rastrear": { nome: "Rastrear", pre: ["Treinado em Sobrevivência"], beneficio: "Faz testes de Sobrevivência para seguir rastros. CD 10 em solo macio, 15 em solo comum e 20 em solo duro.", fonte: "talentos.db (VTT fvtt-trpg)" },
  "ataque-desarmado-aprimorado": { nome: "Ataque Desarmado Aprimorado", pre: [], beneficio: "Ataques desarmados causam 1d4 de dano, letal ou não letal à escolha (criatura de tamanho Médio).", fonte: "talentos.db (VTT fvtt-trpg)" },
  "fortitude-maior": { nome: "Fortitude Maior", pre: [], beneficio: "+2 no bônus base de Fortitude. Pode ser escolhido várias vezes, e os efeitos se acumulam.", fonte: "talentos.db (VTT fvtt-trpg)", resistencia: "fortitude" },
  "reflexos-rapidos": { nome: "Reflexos Rápidos", pre: [], beneficio: "+2 no bônus base de Reflexos. Pode ser escolhido várias vezes, e os efeitos se acumulam.", fonte: "talentos.db (VTT fvtt-trpg)", resistencia: "reflexos" },
  "vontade-de-ferro": { nome: "Vontade de Ferro", pre: [], beneficio: "+2 no bônus base de Vontade. Pode ser escolhido várias vezes, e os efeitos se acumulam.", fonte: "talentos.db (VTT fvtt-trpg)", resistencia: "vontade" }
};

/* Métodos de geração de atributos. Nomes e valores: wiki de fãs "Tormenta para iniciantes" (tsrd.fandom.com).
   Fonte única. Os custos da compra de pontos e a regra exata do Elite não foram lidos: NÃO VERIFICADO. */
const TRPG_METODOS_ATRIBUTOS = [
  { id: "padrao", nome: "Padrão", regra: "4d6", fonte: "Tormenta para iniciantes (wiki de fãs)" },
  { id: "classica", nome: "Clássica", regra: "3d6", fonte: "Tormenta para iniciantes (wiki de fãs)" },
  { id: "heroica", nome: "Heroica", regra: "2d6+6", fonte: "Tormenta para iniciantes (wiki de fãs)" },
  { id: "audaciosa", nome: "Audaciosa", regra: "1d20", fonte: "Tormenta para iniciantes (wiki de fãs)" },
  { id: "elite", nome: "Elite", regra: "valores fixos (não consta quais)", fonte: "Tormenta para iniciantes (wiki de fãs); valores NÃO VERIFICADO" },
  { id: "pontos", nome: "Pontos", regra: "20 pontos para comprar os atributos", fonte: "Tormenta para iniciantes (wiki de fãs); custo por valor NÃO VERIFICADO" }
];

/* Dinheiro inicial do personagem de 1º nível. Fonte: Tormenta para iniciantes (wiki de fãs). Fonte única.
   O texto diz "100 TO" e cita o tibar (T$) como moeda padrão do Reinado. */
const TRPG_DINHEIRO_INICIAL = {
  valor: 100,
  moeda: "TO (tibar, T$)",
  fonte: "Tormenta para iniciantes (wiki de fãs): \"Um personagem de 1º nível começa o jogo com 100 TO.\" Fonte única"
};
