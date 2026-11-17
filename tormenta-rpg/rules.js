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
    formula: "10 + bônus de armadura + bônus de escudo + modificador de Destreza + modificador de tamanho",
    fonte: "d20 SRD 3.5, Combate (cayzle.com/3Esrd/combat.html); aplicação à Tormenta: a confirmar no livro"
  },
  graduacoes: {
    nome: "Graduações de perícia",
    formula: "perícia treinada: nível + 3; outras perícias: nível / 2 (arredondamento não consta)",
    fonte: "Wiki de fãs tsrd.fandom.com, página 'Perícias Básico': 'Perícia treinada: nível + 3 graduações.' e 'Outras perícias: nível/2 graduações.' Fonte única. Máximo por nível: NÃO VERIFICADO"
  },
  iniciativa: {
    nome: "Iniciativa",
    formula: "modificador de Destreza (hipótese d20, sem bônus extras)",
    fonte: "NÃO VERIFICADO (texto de iniciativa não obtido)"
  },
  pontosPericia: {
    nome: "Pontos de perícia por nível",
    formula: "base da classe + modificador de Inteligência, com mínimo de 1 por nível",
    fonte: "Mínimo de 1 por nível: d20 SRD 3.5 (cayzle.com/3Esrd/basics.html). Base da classe e soma com Inteligência: texto de classe do compêndio do VTT fvtt-trpg (comunidade), não conferido no livro"
  }
};

/* TRPG_CLASSES fica em rules-classes.js; TRPG_RACAS em rules-racas.js; perícias, talentos, métodos e dinheiro em rules-geral.js.
   Todos vêm de fontes de comunidade (compêndio do VTT fvtt-trpg e wiki de fãs), com `fonte` em cada item. */

/* Lista do que ainda não foi verificado. A interface e o PDF mostram isto nas etapas correspondentes. */
const TRPG_PENDENTES = {
  racas: "Fonte de comunidade (wiki de fãs). Os oito nomes de raça saem da wiki; o ajuste de atributo só é lido para o anão (fonte única). Ajustes das demais raças, tamanho, deslocamento e traços: NÃO VERIFICADO.",
  classes: "Fonte de comunidade (compêndio do VTT). PV, BBA, perícias de classe, talentos adicionais e círculos de magia das 13 classes vêm dele, com a página citada. Base de Fortitude, Reflexos e Vontade por classe: NÃO VERIFICADO.",
  atributos: "Métodos (Padrão, Clássica, Heroica, Audaciosa, Elite e Pontos) vêm da wiki de fãs. Custo da compra de pontos e valores do Elite: NÃO VERIFICADO.",
  pericias: "Pontos por nível: base da classe (fonte de comunidade) + Inteligência, mínimo 1 (d20 SRD). Perícias de classe vêm do compêndio do VTT. Subtipos de Conhecimento e Ofício e perícias fora do livro básico: NÃO VERIFICADO.",
  talentos: "Talentos principais (13), com pré-requisitos, vêm do compêndio do VTT. Demais talentos, talentos de poder e talentos de classe por nível: NÃO VERIFICADO.",
  magias: "Círculos liberados em cada nível vêm do compêndio do VTT. Quantidade de magias por dia, listas de magias e magias conhecidas: NÃO VERIFICADO.",
  equipamento: "Catálogo de armas, armaduras, preços e equipamento inicial: NÃO VERIFICADO. Dinheiro inicial: 100 TO (fonte única, wiki de fãs).",
  vtt: "Exportação para VTT: não existe VTT verificado para este sistema. Nenhum formato foi criado."
};
