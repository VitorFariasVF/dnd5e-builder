/* Tormenta RPG (edição d20, Jambô, anterior ao Tormenta20): dados de regra.
   Regra do projeto: todo item de regra leva `fonte`. Se a fonte não foi confirmada, a fonte é "NÃO VERIFICADO"
   e o item aparece na auditoria (docs/AUDITORIA_TORMENTA_RPG.md). Mecânica em palavras próprias, sem texto do livro. */

const TRPG_META = {
  sistema: "tormenta-rpg",
  versaoEsquema: 1,
  nomeSistema: "Tormenta RPG",
  edicao: "Edição d20 (Jambô), anterior ao Tormenta20",
  fonteEdicao: "Verbete 'Tormenta' (en.wikipedia.org, lido em 2026-11-17): infobox 'Tormenta d20' com ano 2003; texto 'nova versão de Tormenta D20, publicada pela Jambô, baseada em D&D 3.5 em 2005'. Conflito de ano não resolvido; confirmação no livro: NÃO VERIFICADO. Ver docs/VERIFICACAO_TORMENTA_RPG.md.",
  licenca: "NÃO VERIFICADO",
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
  iniciativa: {
    nome: "Iniciativa",
    formula: "modificador de Destreza (hipótese d20, sem bônus extras)",
    fonte: "NÃO VERIFICADO (texto de iniciativa não obtido)"
  },
  pontosPericia: {
    nome: "Pontos de perícia por nível",
    formula: "base da classe + modificador de Inteligência, com mínimo de 1 por nível",
    fonte: "d20 SRD 3.5 (cayzle.com/3Esrd/basics.html): mínimo de 1 ponto por nível confirmado; a soma com Inteligência não aparece na página lida; base da classe: NÃO VERIFICADO"
  }
};

/* Dados que dependem do livro. Vazios de propósito: nada aqui foi preenchido de memória.
   Quando a fonte for confirmada, cada item entra aqui com `fonte` e os testes passam a conferi-lo. */
const TRPG_CLASSES = {};
const TRPG_RACAS = {};

/* Lista do que ainda não foi verificado. A interface mostra isto nas etapas correspondentes. */
const TRPG_PENDENTES = {
  racas: "Raças, ajustes de atributo e traços: NÃO VERIFICADO.",
  classes: "Classes do livro básico, PV por nível, bônus base de ataque, testes de resistência e perícia de classe: NÃO VERIFICADO.",
  atributos: "Método de geração dos atributos (rolagem, compra de pontos ou matriz) e ajustes raciais: NÃO VERIFICADO.",
  pericias: "Lista de perícias, graduações máximas e pontos por nível de cada classe: NÃO VERIFICADO.",
  talentos: "Lista de talentos, pré-requisitos e talentos de classe: NÃO VERIFICADO.",
  magias: "Magias por dia e lista de magias por classe conjuradora: NÃO VERIFICADO.",
  equipamento: "Catálogo de armas, armaduras e preços, e a unidade monetária: NÃO VERIFICADO.",
  vtt: "Exportação para VTT: não existe VTT verificado para este sistema. Nenhum formato foi criado."
};
