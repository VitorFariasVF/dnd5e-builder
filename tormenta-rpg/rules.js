/* Tormenta RPG (edição d20, Jambô, anterior ao Tormenta20): dados de regra.
   Regra do projeto: todo item de regra leva `fonte`. Se a fonte não foi confirmada, a fonte é "NÃO VERIFICADO"
   e o item aparece na auditoria (docs/AUDITORIA_TORMENTA_RPG.md). Mecânica em palavras próprias, sem texto do livro. */

const TRPG_META = {
  sistema: "tormenta-rpg",
  versaoEsquema: 1,
  nomeSistema: "Tormenta RPG",
  edicao: "Edição d20 (Jambô), anterior ao Tormenta20",
  fonteEdicao: "Verbete 'Tormenta' (en.wikipedia.org): infobox 'Tormenta d20' com ano 2003; texto 'publicada pela Jambô, baseada em D&D 3.5 em 2005'. Conflito de ano não resolvido. Wiki de fãs 'Tormenta para iniciantes' (tsrd.fandom.com) descreve a edição d20 com base nas regras de D&D 3.ª edição. Confirmação no livro: NÃO VERIFICADO. Ver docs/VERIFICACAO_TORMENTA_RPG.md.",
  licenca: "NÃO VERIFICADO",
  licencaComunidade: "A wiki de fãs 'Tormenta para iniciantes' diz que a Tormenta RPG segue a Licença Aberta (OGL). O texto da licença não foi lido.",
  nivelMaximoEscopo: 5
};

/* Os seis atributos. Nomes e abreviações são os do d20 System; confirmação no livro: NÃO VERIFICADO. */
const TRPG_ATRIBUTOS = [
  { id: "forca", nome: "Força", abrev: "FOR", fonte: "NÃO VERIFICADO" },
  { id: "destreza", nome: "Destreza", abrev: "DES", fonte: "NÃO VERIFICADO" },
  { id: "constituicao", nome: "Constituição", abrev: "CON", fonte: "NÃO VERIFICADO" },
  { id: "inteligencia", nome: "Inteligência", abrev: "INT", fonte: "NÃO VERIFICADO" },
  { id: "sabedoria", nome: "Sabedoria", abrev: "SAB", fonte: "NÃO VERIFICADO" },
  { id: "carisma", nome: "Carisma", abrev: "CAR", fonte: "NÃO VERIFICADO" }
];

/* Fórmulas confirmadas no d20 System Reference Document v3.5 (texto consultado em cayzle.com/3Esrd).
   Onde o livro da Tormenta pode diferir, a fórmula está marcada como "a confirmar". */
const TRPG_REGRAS = {
  modificador: {
    nome: "Modificador de atributo",
    formula: "(valor - 10) / 2, arredondado para baixo",
    fonte: "d20 SRD 3.5, Habilidades (tabela de exemplos em cayzle.com/3Esrd/basics.html); aplicação à Tormenta: a confirmar no livro"
  },
  classeDeArmadura: {
    nome: "Classe de Armadura",
    formula: "10 + metade do nível + modificador de Destreza + bônus de armadura + bônus de escudo",
    fonte: "d20 SRD 3.5, Combate (cayzle.com/3Esrd/combat.html); aplicação à Tormenta: a confirmar no livro"
  },
  iniciativa: {
    nome: "Iniciativa",
    formula: "exibida: modificador de Destreza. Total do teste no livro: modificador de Destreza + graduação da perícia Iniciativa (não calculada: falta marcar se é treinada)",
    fonte: "Livro Tormenta RPG: PDF p.82 (tabela de perícias: Iniciativa, Destreza, sem exigência de treino); p.80 (exemplo: Iniciativa +7 = Destreza +3 + 4 graduações); p.87 (entrada da perícia); p.28 (Destreza aplicada a Iniciativa); p.225 (teste de Iniciativa no combate). Decisão: mantém só o modificador de Destreza até haver marcação de perícia treinada"
  },
  pontosPericia: {
    nome: "Perícias treinadas no 1º nível (método padrão)",
    formula: "base da classe + modificador de Inteligência + 2 se humano; mínimo de 1 perícia treinada no total. Aumenta com +1 de Inteligência (cada +1 no modificador) e com o talento Treino em Perícia",
    fonte: "Livro Tormenta RPG, PDF p.79 (número por classe, humanos +2, mínimo de 1 treinada; exemplos de Francis, minotauro e goblin conferidos: 11, 1 e 12). Método alternativo (4 vezes no 1º nível, depois o mesmo valor a cada nível): PDF p.80. Bônus racial de outras raças: NÃO VERIFICADO"
  },
  graduacoes: {
    nome: "Graduações de perícia",
    formula: "perícia treinada: nível + 3; outras perícias: nível / 2, arredondado para baixo",
    fonte: "Livro Tormenta RPG, PDF p.79 (\"Perícia treinada: nível + 3 graduações\"; \"Outras perícias: nível/2 graduações\"). Máximo por nível do método de pontos: PDF p.80"
  }
};

/* TRPG_CLASSES fica em rules-classes.js; TRPG_RACAS em rules-racas.js; perícias, talentos, métodos e dinheiro em rules-geral.js.
   Todos vêm de fontes de comunidade (compêndio do VTT fvtt-trpg e wiki de fãs), com `fonte` em cada item. */

/* Lista do que ainda não foi verificado. A interface e o PDF mostram isto nas etapas correspondentes. */
const TRPG_PENDENTES = {
  racas: "Fonte de comunidade (wiki de fãs). Os oito nomes de raça saem da wiki; Ajustes de humano e lefou (escolha de atributo) não modelados; traços das raças conferidos no livro (PDF p.31 a p.41), com uso só de texto, exceto o bônus de tamanho.",
  classes: "PV, perícias treinadas e listas de perícia de classe das 13 classes conferidos no livro (PDF p.48 a p.76). BBA, talentos adicionais, círculos de magia e base de Fortitude, Reflexos e Vontade por classe: fonte de comunidade (compêndio do VTT) ou NÃO VERIFICADO.",
  atributos: "Métodos Padrão, Clássica, Heroica, Audaciosa e Elite, e a compra por pontos (custos de cada valor), conferidos no livro (PDF p.27 e p.28). Sugestão de Elite e Pontos usa ordem neutra: a prioridade de atributos por classe não consta no livro. Regra de fracasso (PDF p.28) não é aplicada automaticamente.",
  pericias: "Perícias treinadas no 1º nível: base da classe + Inteligência (+2 humanos), conferido no livro (PDF p.79). Método alternativo de pontos (PDF p.80) só mostra o cálculo, não controla as graduações. Perícias não marcadas como treinadas e a graduação de Iniciativa: NÃO VERIFICADO no app. Subtipos de Conhecimento e Ofício e perícias fora do livro básico: NÃO VERIFICADO.",
  talentos: "Talentos principais (13), com pré-requisitos, vêm do compêndio do VTT. Demais talentos, talentos de poder e talentos de classe por nível: NÃO VERIFICADO.",
  magias: "Círculos liberados em cada nível vêm do compêndio do VTT. Quantidade de magias por dia, listas de magias e magias conhecidas: NÃO VERIFICADO.",
  equipamento: "Catálogo de armas, armaduras, preços e equipamento inicial: NÃO VERIFICADO. Dinheiro inicial: 100 TO (fonte única, wiki de fãs).",
  vtt: "Exportação para VTT: não existe VTT verificado para este sistema. Nenhum formato foi criado."
};
