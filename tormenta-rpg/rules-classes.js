/* Classes do livro básico da Tormenta RPG (edição d20, Jambô). Arquivo gerado a partir do compêndio
   de classes do VTT "Tormenta RPG e Império de Jade" (github.com/mclemente/fvtt-trpg, commit ad33f72, GPL-3).
   Conferido no livro (PDF p.48 a p.76): PV inicial e por nível, perícias treinadas no 1º nível e listas de perícia de classe das 13 classes.
   Não conferido no livro: BBA, talentos adicionais, círculos de magia (vêm do compêndio do VTT).
   Mecânica só (números, listas, progressões). Não há texto de descrição aqui.
   NÃO VERIFICADO neste arquivo: base de Fortitude, Reflexos e Vontade por classe (campo resistencias.base = null).
   Os campos 'saves' e 'hitDice' do compêndio foram descartados: são valores genéricos (str/con e d12 em todas as classes),
   não batem com o texto de classe e não foram usados. */
const TRPG_CLASSES = {
  "guerreiro": {
    "nome": "Guerreiro",
    "fonte": "Livro Básico, pg. 59 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.60); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 20,
      "porNivel": 5,
      "atributo": "constituicao"
    },
    "bba": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Fortitude Maior"
      ]
    },
    "pericias": {
      "treinadasBase": 2,
      "classe": [
        {
          "nome": "Adestrar Animais",
          "atributo": "carisma"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Cavalgar",
          "atributo": "destreza"
        },
        {
          "nome": "Iniciativa",
          "atributo": "destreza"
        },
        {
          "nome": "Intimidação",
          "atributo": "carisma"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armaduras Médias",
      "Usar Armaduras Pesadas",
      "Usar Armas Simples",
      "Usar Armas Marciais",
      "Usar Escudos",
      "Fortitude Maior"
    ],
    "conjuracao": null
  },
  "bardo": {
    "nome": "Bardo",
    "fonte": "Livro Básico, pg. 48 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.49); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 12,
      "porNivel": 3,
      "atributo": "constituicao"
    },
    "bba": [
      0,
      1,
      2,
      3,
      3,
      4,
      5,
      6,
      6,
      7,
      8,
      9,
      9,
      10,
      11,
      12,
      12,
      13,
      14,
      15
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Reflexos Rápidos",
        "Vontade de Ferro"
      ]
    },
    "pericias": {
      "treinadasBase": 6,
      "classe": [
        {
          "nome": "Acrobacia",
          "atributo": "destreza"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Atuação",
          "atributo": "carisma"
        },
        {
          "nome": "Cavalgar",
          "atributo": "destreza"
        },
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Diplomacia",
          "atributo": "carisma"
        },
        {
          "nome": "Enganação",
          "atributo": "carisma"
        },
        {
          "nome": "Furtividade",
          "atributo": "destreza"
        },
        {
          "nome": "Identificar Magia",
          "atributo": "inteligencia"
        },
        {
          "nome": "Iniciativa",
          "atributo": "destreza"
        },
        {
          "nome": "Intuição",
          "atributo": "sabedoria"
        },
        {
          "nome": "Ladinagem",
          "atributo": "destreza"
        },
        {
          "nome": "Obter Informação",
          "atributo": "carisma"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armas Simples",
      "Usar Armas Marciais",
      "Usar Escudos",
      "Reflexos Rápidos",
      "Vontade de Ferro"
    ],
    "conjuracao": {
      "progressao": "completa",
      "atributo": "carisma",
      "circulos": {
        "0": 1,
        "1": 1,
        "2": 4,
        "3": 7,
        "4": 10,
        "5": 13,
        "6": 16
      }
    }
  },
  "druida": {
    "nome": "Druida",
    "fonte": "Livro Básico, pg. 53 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.54); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 16,
      "porNivel": 4,
      "atributo": "constituicao"
    },
    "bba": [
      0,
      1,
      2,
      3,
      3,
      4,
      5,
      6,
      6,
      7,
      8,
      9,
      9,
      10,
      11,
      12,
      12,
      13,
      14,
      15
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Fortitude Maior",
        "Vontade de Ferro"
      ]
    },
    "pericias": {
      "treinadasBase": 4,
      "classe": [
        {
          "nome": "Adestrar Animais",
          "atributo": "carisma"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Cavalgar",
          "atributo": "destreza"
        },
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Cura",
          "atributo": "sabedoria"
        },
        {
          "nome": "Diplomacia",
          "atributo": "carisma"
        },
        {
          "nome": "Identificar Magia",
          "atributo": "inteligencia"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        },
        {
          "nome": "Sobrevivência",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armaduras Médias",
      "Usar Armas Simples",
      "Usar Escudos",
      "Fortitude Maior",
      "Vontade de Ferro",
      "Senso da Natureza"
    ],
    "conjuracao": {
      "progressao": "completa",
      "atributo": "sabedoria",
      "circulos": {
        "0": 1,
        "1": 1,
        "2": 3,
        "3": 5,
        "4": 7,
        "5": 9,
        "6": 11,
        "7": 13,
        "8": 15,
        "9": 17
      }
    }
  },
  "clerigo": {
    "nome": "Clérigo",
    "fonte": "Livro Básico, pg. 51 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.52); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 16,
      "porNivel": 4,
      "atributo": "constituicao"
    },
    "bba": [
      0,
      1,
      2,
      3,
      3,
      4,
      5,
      6,
      6,
      7,
      8,
      9,
      9,
      10,
      11,
      12,
      12,
      13,
      14,
      15
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Fortitude Maior",
        "Vontade de Ferro"
      ]
    },
    "pericias": {
      "treinadasBase": 2,
      "classe": [
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Cura",
          "atributo": "sabedoria"
        },
        {
          "nome": "Diplomacia",
          "atributo": "carisma"
        },
        {
          "nome": "Identificar Magia",
          "atributo": "inteligencia"
        },
        {
          "nome": "Intuição",
          "atributo": "sabedoria"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armaduras Médias",
      "Usar Armaduras Pesadas",
      "Usar Armas Simples",
      "Usar Escudos",
      "Fortitude Maior",
      "Vontade de Ferro"
    ],
    "conjuracao": {
      "progressao": "completa",
      "atributo": "sabedoria",
      "circulos": {
        "0": 1,
        "1": 1,
        "2": 3,
        "3": 5,
        "4": 7,
        "5": 9,
        "6": 11,
        "7": 13,
        "8": 15,
        "9": 17
      }
    }
  },
  "swashbuckler": {
    "nome": "Swashbuckler",
    "fonte": "Livro Básico, pg. 75 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.76); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 16,
      "porNivel": 4,
      "atributo": "constituicao"
    },
    "bba": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Reflexos Rápidos"
      ]
    },
    "pericias": {
      "treinadasBase": 4,
      "classe": [
        {
          "nome": "Acrobacia",
          "atributo": "destreza"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Atuação",
          "atributo": "carisma"
        },
        {
          "nome": "Cavalgar",
          "atributo": "destreza"
        },
        {
          "nome": "Diplomacia",
          "atributo": "carisma"
        },
        {
          "nome": "Enganação",
          "atributo": "carisma"
        },
        {
          "nome": "Furtividade",
          "atributo": "destreza"
        },
        {
          "nome": "Iniciativa",
          "atributo": "destreza"
        },
        {
          "nome": "Intimidação",
          "atributo": "carisma"
        },
        {
          "nome": "Obter Informação",
          "atributo": "carisma"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armas Simples",
      "Usar Armas Marciais",
      "Reflexos Rápidos"
    ],
    "conjuracao": null
  },
  "samurai": {
    "nome": "Samurai",
    "fonte": "Livro Básico, pg. 73 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.74); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 20,
      "porNivel": 5,
      "atributo": "constituicao"
    },
    "bba": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Fortitude Maior",
        "Vontade de Ferro"
      ]
    },
    "pericias": {
      "treinadasBase": 4,
      "classe": [
        {
          "nome": "Acrobacia",
          "atributo": "destreza"
        },
        {
          "nome": "Adestrar Animais",
          "atributo": "carisma"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Atuação",
          "atributo": "carisma"
        },
        {
          "nome": "Cavalgar",
          "atributo": "destreza"
        },
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Diplomacia",
          "atributo": "carisma"
        },
        {
          "nome": "Iniciativa",
          "atributo": "destreza"
        },
        {
          "nome": "Intimidação",
          "atributo": "carisma"
        },
        {
          "nome": "Intuição",
          "atributo": "sabedoria"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armaduras Médias",
      "Usar Armaduras Pesadas",
      "Usar Armas Simples",
      "Usar Armas Marciais",
      "Fortitude Maior",
      "Vontade de Ferro"
    ],
    "conjuracao": null
  },
  "monge": {
    "nome": "Monge",
    "fonte": "Livro Básico, pg. 64 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.65); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 16,
      "porNivel": 4,
      "atributo": "constituicao"
    },
    "bba": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Fortitude Maior",
        "Reflexos Rápidos",
        "Vontade de Ferro"
      ]
    },
    "pericias": {
      "treinadasBase": 4,
      "classe": [
        {
          "nome": "Acrobacia",
          "atributo": "destreza"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Cura",
          "atributo": "sabedoria"
        },
        {
          "nome": "Diplomacia",
          "atributo": "carisma"
        },
        {
          "nome": "Furtividade",
          "atributo": "destreza"
        },
        {
          "nome": "Iniciativa",
          "atributo": "destreza"
        },
        {
          "nome": "Intuição",
          "atributo": "sabedoria"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armas Simples",
      "Usar Armas Exóticas",
      "Fortitude Maior",
      "Reflexos Rápidos",
      "Vontade de Ferro",
      "Ataque Desarmado Aprimorado"
    ],
    "conjuracao": null
  },
  "paladino": {
    "nome": "Paladino",
    "fonte": "Livro Básico, pg. 67 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.68); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 20,
      "porNivel": 5,
      "atributo": "constituicao"
    },
    "bba": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Fortitude Maior"
      ]
    },
    "pericias": {
      "treinadasBase": 2,
      "classe": [
        {
          "nome": "Adestrar Animais",
          "atributo": "carisma"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Cavalgar",
          "atributo": "destreza"
        },
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Cura",
          "atributo": "sabedoria"
        },
        {
          "nome": "Diplomacia",
          "atributo": "carisma"
        },
        {
          "nome": "Iniciativa",
          "atributo": "destreza"
        },
        {
          "nome": "Intuição",
          "atributo": "sabedoria"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armaduras Médias",
      "Usar Armaduras Pesadas",
      "Usar Armas Simples",
      "Usar Armas Marciais",
      "Usar Escudos",
      "Fortitude Maior"
    ],
    "conjuracao": {
      "progressao": "metade",
      "atributo": "sabedoria",
      "circulos": {
        "1": 5,
        "2": 9,
        "3": 13,
        "4": 17
      }
    }
  },
  "mago": {
    "nome": "Mago",
    "fonte": "Livro Básico, pg. 63 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.64); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 8,
      "porNivel": 2,
      "atributo": "constituicao"
    },
    "bba": [
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Vontade de Ferro"
      ]
    },
    "pericias": {
      "treinadasBase": 2,
      "classe": [
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Identificar Magia",
          "atributo": "inteligencia"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armas Simples",
      "Vontade de Ferro"
    ],
    "conjuracao": {
      "progressao": "completa",
      "atributo": "inteligencia",
      "circulos": {
        "0": 1,
        "1": 1,
        "2": 3,
        "3": 5,
        "4": 7,
        "5": 9,
        "6": 11,
        "7": 13,
        "8": 15,
        "9": 17
      }
    }
  },
  "ranger": {
    "nome": "Ranger",
    "fonte": "Livro Básico, pg. 70 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.71); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 16,
      "porNivel": 4,
      "atributo": "constituicao"
    },
    "bba": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Fortitude Maior",
        "Reflexos Rápidos"
      ]
    },
    "pericias": {
      "treinadasBase": 6,
      "classe": [
        {
          "nome": "Adestrar Animais",
          "atributo": "carisma"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Cavalgar",
          "atributo": "destreza"
        },
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Cura",
          "atributo": "sabedoria"
        },
        {
          "nome": "Furtividade",
          "atributo": "destreza"
        },
        {
          "nome": "Iniciativa",
          "atributo": "destreza"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        },
        {
          "nome": "Sobrevivência",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armaduras Médias",
      "Usar Armas Simples",
      "Usar Armas Marciais",
      "Usar Escudos",
      "Fortitude Maior",
      "Reflexos Rápidos",
      "Rastrear"
    ],
    "conjuracao": {
      "progressao": "metade",
      "atributo": "sabedoria",
      "circulos": {
        "1": 5,
        "2": 9,
        "3": 13,
        "4": 17
      }
    }
  },
  "feiticeiro": {
    "nome": "Feiticeiro",
    "fonte": "Livro Básico, pg. 56 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.57); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 8,
      "porNivel": 2,
      "atributo": "constituicao"
    },
    "bba": [
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Vontade de Ferro"
      ]
    },
    "pericias": {
      "treinadasBase": 2,
      "classe": [
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Enganação",
          "atributo": "carisma"
        },
        {
          "nome": "Identificar Magia",
          "atributo": "inteligencia"
        },
        {
          "nome": "Intimidação",
          "atributo": "carisma"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armas Simples",
      "Vontade de Ferro"
    ],
    "conjuracao": {
      "progressao": "completa",
      "atributo": "carisma",
      "circulos": {
        "0": 1,
        "1": 1,
        "2": 3,
        "3": 5,
        "4": 7,
        "5": 9,
        "6": 11,
        "7": 13,
        "8": 15,
        "9": 17
      }
    }
  },
  "barbaro": {
    "nome": "Bárbaro",
    "fonte": "Livro Básico, pg. 47 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.48); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 24,
      "porNivel": 6,
      "atributo": "constituicao"
    },
    "bba": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Fortitude Maior"
      ]
    },
    "pericias": {
      "treinadasBase": 4,
      "classe": [
        {
          "nome": "Adestrar Animais",
          "atributo": "carisma"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Cavalgar",
          "atributo": "destreza"
        },
        {
          "nome": "Iniciativa",
          "atributo": "destreza"
        },
        {
          "nome": "Intimidação",
          "atributo": "carisma"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        },
        {
          "nome": "Sobrevivência",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armaduras Médias",
      "Usar Armas Simples",
      "Usar Armas Marciais",
      "Usar Escudos",
      "Fortitude Maior"
    ],
    "conjuracao": null
  },
  "ladino": {
    "nome": "Ladino",
    "fonte": "Livro Básico, pg. 60 (conforme compêndio de classes do VTT fvtt-trpg, commit ad33f72; conferido no livro: PV, perícias treinadas e perícias de classe (PDF p.61); BBA e talentos: compêndio do VTT)",
    "dadoDeVida": {
      "inicial": 12,
      "porNivel": 3,
      "atributo": "constituicao"
    },
    "bba": [
      0,
      1,
      2,
      3,
      3,
      4,
      5,
      6,
      6,
      7,
      8,
      9,
      9,
      10,
      11,
      12,
      12,
      13,
      14,
      15
    ],
    "resistencias": {
      "base": null,
      "talentosDeResistencia": [
        "Reflexos Rápidos"
      ]
    },
    "pericias": {
      "treinadasBase": 8,
      "classe": [
        {
          "nome": "Acrobacia",
          "atributo": "destreza"
        },
        {
          "nome": "Atletismo",
          "atributo": "forca"
        },
        {
          "nome": "Atuação",
          "atributo": "carisma"
        },
        {
          "nome": "Cavalgar",
          "atributo": "destreza"
        },
        {
          "nome": "Conhecimento",
          "atributo": "inteligencia"
        },
        {
          "nome": "Diplomacia",
          "atributo": "carisma"
        },
        {
          "nome": "Enganação",
          "atributo": "carisma"
        },
        {
          "nome": "Furtividade",
          "atributo": "destreza"
        },
        {
          "nome": "Iniciativa",
          "atributo": "destreza"
        },
        {
          "nome": "Intimidação",
          "atributo": "carisma"
        },
        {
          "nome": "Intuição",
          "atributo": "sabedoria"
        },
        {
          "nome": "Ladinagem",
          "atributo": "destreza"
        },
        {
          "nome": "Obter Informação",
          "atributo": "carisma"
        },
        {
          "nome": "Ofício",
          "atributo": "inteligencia"
        },
        {
          "nome": "Percepção",
          "atributo": "sabedoria"
        }
      ]
    },
    "talentosAdicionais": [
      "Usar Armaduras Leves",
      "Usar Armas Simples",
      "Usar Armas Marciais",
      "Usar Escudos",
      "Reflexos Rápidos"
    ],
    "conjuracao": null
  }
};
