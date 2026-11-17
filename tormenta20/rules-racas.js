/* tormenta20/rules-racas.js: cadastro único de raças (substitui o antigo T20_RACAS de rules.js).

   T20_RACAS_COMPLETAS: objeto por id com as 17 raças do livro básico (lista do Núcleo em [X]). Cada raça:
     nome, tamanho (texto ou null), deslocamento (metros ou null), ajustes (objeto {atributo: valor} ou null),
     habilidades: [{ nome, efeito }] (efeito em palavras próprias),
     periciasExtras (opcional): perícias treinadas extras por habilidade (Humano, Versátil: 2). Ausente = 0.
     verificado: { ajustes, tamanho, deslocamento (booleans), habilidades: [nomes conferidos em duas fontes] },
     fonte, observacoes (conflitos e lacunas).
   Campo null = a fonte não informou. O app aplica só o que está preenchido; o resto fica NÃO VERIFICADO
   e o jogador lança à mão (ajuste manual no passo Atributos). Nenhum valor foi preenchido de memória.

   Fontes:
     [X] exegetadearton.com.br, páginas de raça (1 fonte; o site declara vir da Tormenta Collab Wiki). Não traz ajustes de atributo.
     [I] issue #57 do DMBerlin/t20-community-patches (cita páginas do livro básico). Só cita Minotauro, Anão, Elfo e Hynne.
   Só entra em verificado: true quando [X] e [I] concordam (independência parcial, como nas classes de docs/VERIFICACAO_TORMENTA20.md).
   Não foi possível abrir as páginas de Sereia/Tritão nesta frente. */

const T20_RACAS_COMPLETAS = {
  humano: {
    nome: "Humano", tamanho: null, deslocamento: null, ajustes: null, periciasExtras: 2,
    habilidades: [
      { nome: "Versátil", efeito: "Treinado em duas perícias à sua escolha; pode trocar uma delas por um poder geral." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Humano (1 fonte). Ajustes, tamanho e deslocamento: NÃO VERIFICADO",
    observacoes: "rules.js marca deslocamento 9 e tamanho Médio como NÃO VERIFICADO; esta frente não confirma nenhum dos dois."
  },
  anao: {
    nome: "Anão", tamanho: null, deslocamento: 6, ajustes: null,
    habilidades: [
      { nome: "Conhecimento das Rochas", efeito: "Visão no escuro e +2 em Percepção e Sobrevivência, só no subterrâneo." },
      { nome: "Devagar e Sempre", efeito: "Seu deslocamento não é reduzido por armadura ou excesso de carga." },
      { nome: "Duro como Pedra", efeito: "+3 PV no 1º nível e +1 PV em cada nível seguinte." },
      { nome: "Tradição de Heredrimm", efeito: "Machados, martelos, marretas e picaretas viram armas simples para você, com +2 em ataques com elas." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: ["Conhecimento das Rochas"] },
    fonte: "[X] exegetadearton, página Anão (1 fonte); visão no escuro e +2 em Percepção e Sobrevivência também em [I] p. 20 (2 fontes). Ajustes e tamanho: NÃO VERIFICADO",
    observacoes: "CONFLITO de deslocamento: [X] diz 6 m; rules.js diz 9 m (NÃO VERIFICADO). Esta frente não resolve. O resto das habilidades está em uma fonte só."
  },
  elfo: {
    nome: "Elfo", tamanho: null, deslocamento: 9, ajustes: null,
    habilidades: [
      { nome: "Sentidos Élficos", efeito: "Visão na penumbra e +2 em Misticismo e Percepção." },
      { nome: "Graça de Glórienn", efeito: "Seu deslocamento passa a ser 12 m." },
      { nome: "Sangue Mágico", efeito: "Ganha 1 PM extra em cada nível." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: ["Sentidos Élficos"] },
    fonte: "[X] exegetadearton, página Elfo (1 fonte; deslocamento padrão 9 m); Sentidos Élficos também em [I] p. 22 (2 fontes). Ajustes e tamanho: NÃO VERIFICADO",
    observacoes: "Deslocamento 9 m é o padrão indicado em [X] e coincide com rules.js (NÃO VERIFICADO); só [X] confirma. Graça de Glórienn e Sangue Mágico: 1 fonte."
  },
  goblin: {
    nome: "Goblin", tamanho: "Pequeno", deslocamento: 9, ajustes: null,
    habilidades: [
      { nome: "Engenhoso", efeito: "Não sofre penalidade por falta de ferramentas e ganha +2 com as ferramentas necessárias." },
      { nome: "Espelunqueiro", efeito: "Visão no escuro e deslocamento de escalada igual ao terrestre." },
      { nome: "Peste Esguia", efeito: "Mesmo sendo Pequeno, mantém deslocamento de 9 m." },
      { nome: "Rato das Ruas", efeito: "Ganha +2 em Fortitude e recupera PV e PM em quantidade mínima igual ao seu nível." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Goblin (1 fonte). Ajustes: NÃO VERIFICADO",
    observacoes: "Goblin não está em rules.js. Tudo vem de uma fonte."
  },
  hynne: {
    nome: "Hynne", tamanho: "Pequeno", deslocamento: 6, ajustes: null,
    habilidades: [
      { nome: "Arremessador", efeito: "Com funda ou arma de arremesso, o dano sobe um degrau." },
      { nome: "Pequeno e Rechonchudo", efeito: "+2 em Enganação e usa Destreza como atributo-chave de Atletismo, no lugar de Força." },
      { nome: "Sorte Salvadora", efeito: "Pode gastar 1 PM para rolar de novo um teste de resistência." }
    ],
    verificado: { ajustes: false, tamanho: true, deslocamento: true, habilidades: ["Pequeno e Rechonchudo"] },
    fonte: "[X] exegetadearton, página Hynne; [I] p. 28 e p. 106 (2 fontes para tamanho Pequeno, 6 m e +2 em Enganação). Ajustes: NÃO VERIFICADO",
    observacoes: "Ajustes de atributo não aparecem em [X]. [I] não cita ajustes de Hynne."
  },
  minotauro: {
    nome: "Minotauro", tamanho: null, deslocamento: null, ajustes: { forca: 2, constituicao: 1, sabedoria: -1 },
    habilidades: [
      { nome: "Chifres", efeito: "Arma natural de chifres (1d6, crítico x2, perfuração); com 1 PM, um ataque extra com os chifres ao agredir." },
      { nome: "Couro Rígido", efeito: "+1 de Defesa." },
      { nome: "Faro", efeito: "Contra inimigos que você não vê, não fica desprevenido; camuflagem total dá só 20% de chance de falha a alcance curto." },
      { nome: "Medo de Altura", efeito: "Fica abalado se estiver adjacente a uma queda de 3 m ou mais." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "Ajustes: [I] p. 25 (1 fonte; a mesma issue diz que a versão anterior tinha Destreza +1). Habilidades: [X] exegetadearton, página Minotauro (1 fonte). Tamanho e deslocamento: NÃO VERIFICADO",
    observacoes: "CONFLITO de ajuste: [I] cita dado anterior com Destreza +1, sem explicar. Os ajustes ficam como não verificados."
  },
  osteon: {
    nome: "Osteon", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [
      { nome: "Armadura Óssea", efeito: "Resistência 5 a corte, frio e perfuração." },
      { nome: "Memória Póstuma", efeito: "Ao ser criado, treina em uma perícia à escolha ou ganha um poder geral." },
      { nome: "Natureza Esquelética", efeito: "Morto-vivo com visão no escuro e imunidades metabólicas; cura causa dano e dano de trevas recupera PV." },
      { nome: "Preço da Não Vida", efeito: "Passa oito horas sob luz de estrelas ou no subterrâneo para recuperar PV e PM no descanso; senão, sofre os efeitos de fome." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Osteon (1 fonte). Ajustes, deslocamento e tamanho base: NÃO VERIFICADO",
    observacoes: "[X] diz que o osteon mantém a categoria de tamanho da raça de origem, se não for Médio."
  },
  qareen: {
    nome: "Qareen", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [
      { nome: "Desejos", efeito: "Magia pedida por alguém desde o seu último turno custa 1 PM a menos; fazer um desejo ao qareen é ação livre." },
      { nome: "Resistência Elemental", efeito: "Redução de dano 10 contra um tipo, conforme a ascendência (frio, eletricidade, fogo, ácido, luz ou trevas)." },
      { nome: "Tatuagem Mística", efeito: "Lança uma magia de 1º círculo à escolha, com Carisma como atributo-chave." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Qareen (1 fonte). Ajustes, deslocamento e tamanho: NÃO VERIFICADO",
    observacoes: ""
  },
  sereia_triton: {
    nome: "Sereia/Tritão", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "NÃO VERIFICADO: página não acessível nesta frente; a raça consta na lista do Núcleo de [X]",
    observacoes: "Nenhum dado desta raça foi conferido."
  },
  silfide: {
    nome: "Sílfide", tamanho: "Minúsculo", deslocamento: 9, ajustes: null,
    habilidades: [
      { nome: "Asas de Borboleta", efeito: "Flutua e ignora terreno difícil; imune a dano por queda, exceto inconsciente; voa com 1 PM por rodada." },
      { nome: "Espírito da Natureza", efeito: "Tipo espírito, visão na penumbra e conversa livremente com animais." },
      { nome: "Magia das Fadas", efeito: "Lança duas magias entre Criar Ilusão, Enfeitiçar, Luz e Sono, com Carisma como atributo-chave." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Sílfide (1 fonte). Ajustes: NÃO VERIFICADO",
    observacoes: "Deslocamento de 9 m, com voo de 12 m a 1 PM por rodada."
  },
  suraggel_aggelus: {
    nome: "Suraggel (Aggelus)", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [
      { nome: "Herança Divina", efeito: "Tipo espírito e visão no escuro." },
      { nome: "Luz Sagrada", efeito: "+2 em Diplomacia e Intuição; lança Luz como magia divina com Carisma." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Suraggel (1 fonte; a mesma página cobre Aggelus e Sulfure). Ajustes, deslocamento e tamanho: NÃO VERIFICADO",
    observacoes: "[X] não diz se Aggelus e Sulfure são alternativas ou se se acumulam."
  },
  suraggel_sulfure: {
    nome: "Suraggel (Sulfure)", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [
      { nome: "Herança Divina", efeito: "Tipo espírito e visão no escuro." },
      { nome: "Sombras Profanas", efeito: "+2 em Enganação e Furtividade; lança Escuridão como magia divina com Inteligência." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Suraggel (1 fonte; a mesma página cobre Aggelus e Sulfure). Ajustes, deslocamento e tamanho: NÃO VERIFICADO",
    observacoes: "[X] não diz se Aggelus e Sulfure são alternativas ou se se acumulam."
  },
  trog: {
    nome: "Trog", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [
      { nome: "Mau Cheiro", efeito: "Com 2 PM, solta gás fétido: criaturas próximas que falham em Fortitude ficam enjoadas por 1d6 rodadas." },
      { nome: "Mordida", efeito: "Arma natural de mordida (1d6, crítico x2, perfuração); com 1 PM, um ataque extra de mordida ao agredir." },
      { nome: "Reptiliano", efeito: "Tipo monstro, visão no escuro, +1 de Defesa e +5 em Furtividade sem armadura ou roupas pesadas." },
      { nome: "Sangue Frio", efeito: "Sofre 1 de dano extra por dado de dano de frio." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Trog (1 fonte). Ajustes, deslocamento e tamanho: NÃO VERIFICADO",
    observacoes: ""
  },
  kliren: {
    nome: "Kliren", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [
      { nome: "Híbrido", efeito: "Fica treinado em uma perícia à escolha, mesmo que não seja da sua classe." },
      { nome: "Engenhosidade", efeito: "Com 2 PM, soma Inteligência a um teste de perícia (não de ataque)." },
      { nome: "Ossos Frágeis", efeito: "Sofre 1 de dano extra por dado de dano de impacto." },
      { nome: "Vanguardista", efeito: "Proficiência com armas de fogo e +2 em um Ofício à escolha." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Kliren (1 fonte). Ajustes, deslocamento e tamanho: NÃO VERIFICADO",
    observacoes: ""
  },
  lefou: {
    nome: "Lefou", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [
      { nome: "Cria da Tormenta", efeito: "Tipo monstro e +5 em resistências contra efeitos de lefeu e da Tormenta." },
      { nome: "Deformidade", efeito: "+2 em duas perícias à escolha, que contam como poderes da Tormenta." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Lefou (1 fonte). Ajustes, deslocamento e tamanho: NÃO VERIFICADO",
    observacoes: ""
  },
  medusa: {
    nome: "Medusa", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [
      { nome: "Cria de Megalokk", efeito: "Tipo monstro e visão no escuro." },
      { nome: "Natureza Venenosa", efeito: "Resistência a veneno +5; com 1 PM envenena a arma em uso, que causa perda de 1d12 PV até você acertar um ataque ou acabar a cena." },
      { nome: "Olhar Atordoante", efeito: "Com 1 PM, força Fortitude (CD Carisma) a alcance curto; se falhar, fica atordoada por uma rodada, uma vez por cena." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Medusa (1 fonte). Ajustes, deslocamento e tamanho: NÃO VERIFICADO",
    observacoes: ""
  },
  dahllan: {
    nome: "Dahllan", tamanho: null, deslocamento: null, ajustes: null,
    habilidades: [
      { nome: "Amiga das Plantas", efeito: "Lança Controlar Plantas com Sabedoria como atributo-chave; a segunda aquisição reduz o custo em 1 PM." },
      { nome: "Armadura de Allihanna", efeito: "Com ação de movimento e 1 PM, a pele vira casca e dá +2 de Defesa até o fim da cena." },
      { nome: "Empatia Selvagem", efeito: "Comunica-se com animais e usa Adestramento para mudar a atitude deles." }
    ],
    verificado: { ajustes: false, tamanho: false, deslocamento: false, habilidades: [] },
    fonte: "[X] exegetadearton, página Dahllan (1 fonte). Ajustes, deslocamento e tamanho: NÃO VERIFICADO",
    observacoes: ""
  }
};
