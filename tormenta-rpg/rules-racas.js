/* Raças da Tormenta RPG (Jambô). Oito raças, como no app.
   Fonte: livro Tormenta RPG, capítulo 2 (Raças), PDF p.31 a p.41. Páginas PDF citadas em cada campo.
   Tamanho, deslocamento e traços foram conferidos no livro e resumidos aqui (não é transcrição).
   Itens que o livro não fecha de forma inequívoca ficam NÃO VERIFICADO, com o motivo.
   Só o bônus de tamanho (campo bonusTamanho: CA e ataque) é aplicado pelo motor (engine.js). Não modelados, só texto:
   escolhas (humano, lefou), traços condicionais (CA do anão contra Grande), CA do minotauro e do lefou, ataques naturais
   do minotauro e resistências do qareen. */

const TRPG_RACAS = {
  humano: {
    nome: "Humano",
    fonte: "Livro Tormenta RPG, PDF p.31, p.32 e p.37",
    ajustes: null,
    ajustesFonte: "Tormenta RPG, PDF p.31 e p.37: +2 em duas habilidades à escolha do jogador. Escolha NÃO modelada no app (não é aplicada).",
    bonusTamanho: { ca: 0, ataque: 0 },
    tamanho: "Médio (PDF p.32: humanos estão na lista de criaturas Médias)",
    deslocamento: "9 m (PDF p.31 e p.32: deslocamento de criatura Média)",
    tracos: [
      "Recebe +2 em duas habilidades à escolha (PDF p.37).",
      "Recebe 2 perícias treinadas extras, que podem vir de outra classe (PDF p.37; regra em PDF p.79).",
      "Recebe 2 talentos adicionais à escolha (PDF p.37)."
    ]
  },
  anao: {
    nome: "Anão",
    fonte: "Livro Tormenta RPG, PDF p.31 a p.33",
    ajustes: { constituicao: 4, sabedoria: 2, destreza: -2 },
    ajustesFonte: "Tormenta RPG, PDF p.31 (tabela de ajustes) e p.33: +4 em Constituição, +2 em Sabedoria, –2 em Destreza.",
    bonusTamanho: { ca: 0, ataque: 0 },
    tamanho: "Médio (PDF p.32 e p.33: o anão é de tamanho Médio)",
    deslocamento: "6 m (PDF p.33: pernas curtas, mesmo deslocamento de criaturas Pequenas; armadura e carga não reduzem)",
    tracos: [
      "Deslocamento de 6 m, sem redução por armadura ou carga (PDF p.33).",
      "Visão no escuro de 18 m, só em preto e branco. Ignora camuflagem por escuridão, inclusive a total (PDF p.33).",
      "+4 em testes de resistência contra veneno e magia (PDF p.33).",
      "Todos os tipos de machado e martelo são armas simples para o anão (PDF p.33).",
      "CA +4 contra adversários de tamanho Grande ou maior (PDF p.33). Não modelado: condicional.",
      "+2 em perícias ligadas a pedra e metal, quando a habilidade-chave é Inteligência ou Sabedoria (PDF p.33). Não modelado: depende de contexto."
    ]
  },
  elfo: {
    nome: "Elfo",
    fonte: "Livro Tormenta RPG, PDF p.31, p.32 e p.34",
    ajustes: { destreza: 4, inteligencia: 2, constituicao: -2 },
    ajustesFonte: "Tormenta RPG, PDF p.31 (tabela de ajustes) e p.34: +4 em Destreza, +2 em Inteligência, –2 em Constituição.",
    bonusTamanho: { ca: 0, ataque: 0 },
    tamanho: "Médio (PDF p.32: elfos estão na lista de criaturas Médias)",
    deslocamento: "9 m (PDF p.31 e p.32: deslocamento de criatura Média)",
    tracos: [
      "Visão na penumbra: ignora camuflagem por escuridão, exceto a total, e enxerga o dobro de longe que humanos com pouca luz (PDF p.34).",
      "+4 em testes de Vontade contra encantamentos. Imune à magia sono (PDF p.34).",
      "+4 em testes de Identificar Magia e Percepção (PDF p.34).",
      "Contra magias arcanas lançadas por elfos, a CD do teste de resistência sobe em +2 (PDF p.34).",
      "Sabe usar algumas espadas e arcos listados no livro e recebe Foco em uma delas, à escolha (PDF p.34). Lista completa de armas NÃO VERIFICADA: a extração do PDF cortou o trecho."
    ]
  },
  qareen: {
    nome: "Qareen",
    fonte: "Livro Tormenta RPG, PDF p.31, p.32 e p.40",
    ajustes: { carisma: 4, inteligencia: 2, sabedoria: -2 },
    ajustesFonte: "Tormenta RPG, PDF p.31 (tabela de ajustes) e p.40: +4 em Carisma, +2 em Inteligência, –2 em Sabedoria.",
    bonusTamanho: { ca: 0, ataque: 0 },
    tamanho: "Médio (PDF p.32: qareen está na lista de criaturas Médias)",
    deslocamento: "9 m (PDF p.31 e p.32: deslocamento de criatura Média)",
    tracos: [
      "+4 em testes de Identificar Magia (PDF p.40).",
      "Desejos: uma vez por dia lança uma magia sem gastar PM e sem esquecê-la, mas só na mesma rodada em que alguém lhe pediu. Fazer o pedido é ação livre (PDF p.40).",
      "Pequenos desejos: sem classe conjuradora, pode lançar truques do livro, só quando alguém pede. Também pode lançar voo uma vez por dia (PDF p.40).",
      "Marca de Wynna: a tatuagem revela o elemento do qareen com teste de Conhecimento (arcano) contra CD 20 (PDF p.40).",
      "Resistências a energia de 5 (ácido, frio, eletricidade, sônico, fogo): NÃO VERIFICADO. A extração do PDF misturou esse trecho com outra coluna."
    ]
  },
  goblin: {
    nome: "Goblin",
    fonte: "Livro Tormenta RPG, PDF p.31, p.32 e p.35",
    ajustes: { destreza: 4, constituicao: 2, carisma: -2 },
    ajustesFonte: "Tormenta RPG, PDF p.31 (tabela de ajustes) e p.35: +4 em Destreza, +2 em Constituição, –2 em Carisma.",
    bonusTamanho: { ca: 1, ataque: 1 },
    tamanho: "Pequeno (PDF p.35; regra de Pequeno em PDF p.32)",
    deslocamento: "9 m (PDF p.35: exceção à regra de 6 m de criaturas Pequenas)",
    tracos: [
      "Tamanho Pequeno: +1 na CA e +1 nas jogadas de ataque, +4 em Furtividade, e usa armas menores (PDF p.35; regra em PDF p.32).",
      "Deslocamento de 9 m, igual ao de criaturas Médias (PDF p.35).",
      "Visão no escuro de 18 m, só em preto e branco. Ignora camuflagem por escuridão, inclusive a total (PDF p.35).",
      "+4 em testes de Fortitude contra doenças e venenos. Não precisa de teste de Fortitude por comida estragada (PDF p.35).",
      "+4 em Ladinagem e em um Ofício à escolha do jogador (PDF p.35)."
    ]
  },
  halfling: {
    nome: "Halfling",
    fonte: "Livro Tormenta RPG, PDF p.31, p.32 e p.36",
    ajustes: { destreza: 4, carisma: 2, forca: -2 },
    ajustesFonte: "Tormenta RPG, PDF p.31 (tabela de ajustes) e p.36: +4 em Destreza, +2 em Carisma, –2 em Força.",
    bonusTamanho: { ca: 1, ataque: 1 },
    tamanho: "Pequeno (PDF p.36; regra de Pequeno em PDF p.32)",
    deslocamento: "6 m (PDF p.32: regra de criaturas Pequenas; p.36 não repete o valor)",
    tracos: [
      "Tamanho Pequeno: +1 na CA e +1 nas jogadas de ataque, +4 em Furtividade, e usa armas menores (PDF p.36; regra em PDF p.32).",
      "+2 em todos os testes de resistência (PDF p.36).",
      "+1 em jogadas de ataque com armas de arremesso e fundas (PDF p.36).",
      "Atletismo usa Destreza como atributo-chave, e não Força (PDF p.36).",
      "+4 em testes de Enganação (PDF p.36)."
    ]
  },
  minotauro: {
    nome: "Minotauro",
    fonte: "Livro Tormenta RPG, PDF p.31, p.32 e p.39",
    ajustes: { forca: 4, constituicao: 2, carisma: -2 },
    ajustesFonte: "Tormenta RPG, PDF p.31 (tabela de ajustes) e p.39: +4 em Força, +2 em Constituição, –2 em Carisma.",
    bonusTamanho: { ca: 0, ataque: 0 },
    tamanho: "Médio (PDF p.32: minotauros estão na lista de criaturas Médias)",
    deslocamento: "9 m (PDF p.31 e p.32: deslocamento de criatura Média)",
    tracos: [
      "CA +1 por causa do couro rígido (PDF p.39). Não modelado: ver nota no topo do arquivo.",
      "Ataque natural de chifres: 1d6, crítico x2, dano perfurante. Pode fazer um ataque extra com os chifres por rodada, com –4 em todos os ataques da rodada, incluindo este (PDF p.39). Não modelado.",
      "Faro: +4 em Sobrevivência para rastrear pelo faro, e percebe criaturas a até 9 m automaticamente (PDF p.39).",
      "Lógica labiríntica: +8 em Sobrevivência para não se perder (PDF p.39)."
    ]
  },
  lefou: {
    nome: "Lefou",
    fonte: "Livro Tormenta RPG, PDF p.31, p.32 e p.38",
    ajustes: null,
    ajustesFonte: "Tormenta RPG, PDF p.31 e p.38: +2 em duas habilidades à escolha, exceto Carisma, e Carisma –4. Escolha NÃO modelada no app (não é aplicada).",
    bonusTamanho: { ca: 0, ataque: 0 },
    tamanho: "Médio (PDF p.32: lefou está na lista de criaturas Médias)",
    deslocamento: "9 m (PDF p.31 e p.32: deslocamento de criatura Média)",
    tracos: [
      "+2 em duas habilidades à escolha, exceto Carisma (PDF p.38). Carisma –4 (PDF p.31).",
      "Não é humano nem humanoide: imune a magias e efeitos que afetam só essas criaturas (PDF p.38).",
      "Visão no escuro: ignora camuflagem por escuridão, inclusive a total, e enxerga no escuro só em preto e branco (PDF p.38).",
      "Recebe 2 talentos da Tormenta adicionais. Não perde Carisma por eles, mas perde se adquirir outros talentos da Tormenta (PDF p.38).",
      "Deformidade: escolhe uma entre +4 em Acrobacia, escalada de 4,5 m, +4 em Intimidação, natação de 4,5 m, +4 em Percepção ou CA +1 (PDF p.38). Não modelado: escolha.",
      "Afinidade com a Tormenta: não recebe níveis negativos causados por efeitos da Tormenta, mas pode receber níveis negativos de outras fontes (PDF p.38)."
    ]
  }
};
