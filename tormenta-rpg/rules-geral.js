/* Dados gerais da Tormenta RPG (edição d20, Jambô): perícias, talentos principais, métodos de atributos e dinheiro inicial.
   Cada item leva `fonte`. Fonte de comunidade (compêndio do VTT fvtt-trpg, wiki de fãs), não o livro. Itens sem fonte: NÃO VERIFICADO. */

/* Perícias que aparecem nas listas de perícias de classe do livro básico (compêndio de classes do VTT, commit ad33f72).
   O atributo vem da lista de cada classe e não conflita entre elas. Os subtipos de Conhecimento e Ofício e as perícias
   que só aparecem em outros livros (ex.: Jogatina, Meditação) NÃO entram aqui: NÃO VERIFICADO. */
/* Fonte das perícias: compêndio de classes do VTT fvtt-trpg (github.com/mclemente/fvtt-trpg, commit ad33f72), listas "Perícias de Classe".
   Página do livro: NÃO VERIFICADO. */
const FONTE_PERICIAS = "Livro Tormenta RPG, PDF p.82 (atributo-chave) e p.48 a p.76 (listas de perícias de classe, conferidas). Atributos conferidos com o livro";
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
   Conferidos no livro (Jambô) em 18/11: nome, pré-requisito, benefício e repetibilidade, com página PDF em `fonte`.
   Divergências em aberto (não alteradas): "Usar Armas Exóticas" no app; o livro chama "Usar Arma Exótica" (PDF p104).
   Renomear exige ajustar talentosAdicionais em rules-classes.js, que está fora do escopo desta correção.
   Rastrear: o livro traz mais regras (+1 a cada 3 criaturas, penalidades por dia e visibilidade); o app cita só as CDs. */
const TRPG_TALENTOS = {
  "usar-armas-simples": { nome: "Usar Armas Simples", pre: [], beneficio: "Usa armas simples sem a penalidade de –4 nas jogadas de ataque.", fonte: "Tormenta RPG, PDF p104 (livro do usuário)" },
  "usar-armas-marciais": { nome: "Usar Armas Marciais", pre: ["Usar Armas Simples"], beneficio: "Usa armas marciais sem a penalidade de –4 nas jogadas de ataque.", fonte: "Tormenta RPG, PDF p104 (livro do usuário)" },
  "usar-armas-exoticas": { nome: "Usar Armas Exóticas", pre: ["Usar Armas Simples"], beneficio: "Usa uma arma exótica escolhida sem a penalidade de –4 nas jogadas de ataque.", fonte: "Tormenta RPG, PDF p104 (livro do usuário)" },
  "usar-armaduras-leves": { nome: "Usar Armaduras Leves", pre: [], beneficio: "Usa armaduras leves sem a penalidade de armadura.", fonte: "Tormenta RPG, PDF p104 (livro do usuário)" },
  "usar-armaduras-medias": { nome: "Usar Armaduras Médias", pre: ["Usar Armaduras Leves"], beneficio: "Usa armaduras médias sem a penalidade de armadura.", fonte: "Tormenta RPG, PDF p104 (livro do usuário)" },
  "usar-armaduras-pesadas": { nome: "Usar Armaduras Pesadas", pre: ["Usar Armaduras Leves", "Usar Armaduras Médias"], beneficio: "Usa armaduras pesadas sem a penalidade de armadura.", fonte: "Tormenta RPG, PDF p104 (livro do usuário)" },
  "usar-escudos": { nome: "Usar Escudos", pre: [], beneficio: "Usa escudos leves e pesados sem a penalidade de armadura.", fonte: "Tormenta RPG, PDF p104 (livro do usuário)" },
  "senso-da-natureza": { nome: "Senso da Natureza", pre: [], beneficio: "Pode repetir um teste de Sobrevivência já feito, mas deve aceitar a segunda rolagem.", fonte: "Tormenta RPG, PDF p106 (livro do usuário)" },
  "rastrear": { nome: "Rastrear", pre: ["Treinado em Sobrevivência"], beneficio: "Faz testes de Sobrevivência para seguir rastros. CD 10 em solo macio, 15 em solo comum e 20 em solo duro.", fonte: "Tormenta RPG, PDF p106 (livro do usuário)" },
  "ataque-desarmado-aprimorado": { nome: "Ataque Desarmado Aprimorado", pre: [], beneficio: "Ataques desarmados causam 1d4 de dano, letal ou não letal à escolha (criatura de tamanho Médio).", fonte: "Tormenta RPG, PDF p97 (livro do usuário)" },
  "fortitude-maior": { nome: "Fortitude Maior", pre: [], beneficio: "+2 no bônus base de Fortitude. Pode ser escolhido várias vezes, e os efeitos se acumulam.", fonte: "Tormenta RPG, PDF p110 (livro do usuário)", resistencia: "fortitude" },
  "reflexos-rapidos": { nome: "Reflexos Rápidos", pre: [], beneficio: "+2 no bônus base de Reflexos. Pode ser escolhido várias vezes, e os efeitos se acumulam.", fonte: "Tormenta RPG, PDF p111 (livro do usuário)", resistencia: "reflexos" },
  "vontade-de-ferro": { nome: "Vontade de Ferro", pre: [], beneficio: "+2 no bônus base de Vontade. Pode ser escolhido várias vezes, e os efeitos se acumulam.", fonte: "Tormenta RPG, PDF p111 (livro do usuário)", resistencia: "vontade" }
};

/* Métodos de geração de atributos. Confirmados no livro: Padrão, Clássica, Heroica, Audaciosa e Elite (PDF p.27);
   Pontos e custos por valor (PDF p.28). A prioridade de atributos por classe não consta no livro. */
const TRPG_METODOS_ATRIBUTOS = [
  { id: "padrao", nome: "Padrão", regra: "4d6, descarta o menor dado e soma os outros três", fonte: "Livro Tormenta RPG, PDF p.27" },
  { id: "classica", nome: "Clássica", regra: "3d6", fonte: "Livro Tormenta RPG, PDF p.27" },
  { id: "heroica", nome: "Heroica", regra: "2d6 + 6", fonte: "Livro Tormenta RPG, PDF p.27" },
  { id: "audaciosa", nome: "Audaciosa", regra: "1d20", fonte: "Livro Tormenta RPG, PDF p.27" },
  { id: "elite", nome: "Elite", regra: "valores fixos 17, 15, 13, 12, 10 e 8, sem rolar", fonte: "Livro Tormenta RPG, PDF p.27" },
  { id: "pontos", nome: "Pontos", regra: "20 pontos para comprar os valores (custos na tabela abaixo)", fonte: "Livro Tormenta RPG, PDF p.28" }
];

/* Valores fixos do método Elite. Livro, PDF p.27: "use estes números, sem rolar nada: 17, 15, 13, 12, 10 e 8". */
const TRPG_ELITE_VALORES = [17, 15, 13, 12, 10, 8];

/* Compra por pontos: custo em pontos de cada valor de habilidade. Livro, PDF p.28 (tabela "Custo de Valores de Habilidade").
   Total de pontos disponíveis: 20 (PDF p.28). */
const TRPG_PONTOS_TOTAL = 20;
const TRPG_CUSTO_PONTOS = { 7: -4, 8: -2, 9: -1, 10: 0, 11: 1, 12: 2, 13: 3, 14: 4, 15: 6, 16: 8, 17: 11, 18: 14 };

/* Ordem neutra para atribuir valores sugeridos (Elite e Pontos). NÃO é prioridade do livro: o manual não define
   prioridade de atributos por classe (PDF p.28: o jogador escolhe qual valor associar a cada habilidade). */
const TRPG_ORDEM_NEUTRA = ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"];

/* Dinheiro inicial do personagem de 1º nível. Fonte: Tormenta para iniciantes (wiki de fãs). Fonte única.
   O texto diz "100 TO" e cita o tibar (T$) como moeda padrão do Reinado. */
const TRPG_DINHEIRO_INICIAL = {
  valor: 100,
  moeda: "TO (tibar, T$)",
  fonte: "Tormenta para iniciantes (wiki de fãs): \"Um personagem de 1º nível começa o jogo com 100 TO.\" Fonte única"
};
