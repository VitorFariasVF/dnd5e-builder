/* tormenta20/rules-racas.js: cadastro único de raças (substitui o antigo T20_RACAS de rules.js).

   T20_RACAS_COMPLETAS: objeto por id. São 17 raças do livro básico; Suraggel aparece em duas entradas
   (aggelus e sulfure), que o livro apresenta como alternativas ("ou"). Cada entrada:
     nome, tamanho (texto ou null), deslocamento (metros ou null), ajustes (objeto {atributo: valor} ou null),
     ajusteEscolha (opcional, texto): ajuste que o app não aplica sozinho, como "+1 em três atributos à escolha".
                    O jogador lança no passo Atributos (ajuste manual).
     habilidades: [{ nome, efeito }] (efeito em palavras próprias), periciasExtras (Humano: 2 perícias).
     verificado: { ajustes, tamanho, deslocamento (booleans), habilidades: [nomes conferidos no livro] }.
                 ajustes = false quando o ajuste é parcial ou depende de escolha (o app não aplica tudo).
     fonte, observacoes.

   Fonte única: Tormenta20 Jogo do Ano (livro do usuário). Ajustes: tabela 1-2, p024. Tamanho e deslocamento
   padrão (Médio e 9 m, salvo quando a raça diz outra coisa): p112. Exemplos de tamanho: tabela 1-21, p113.
   Os ajustes são somados ao valor do atributo (p024: "pode aumentá-los acima de 4 ou diminuí-los abaixo de –2"). */

const T20_RAC = pags => `Tormenta20 Jogo do Ano, ${pags} (livro do usuário)`;

const T20_RACAS_COMPLETAS = {
  humano: {
    nome: "Humano", tamanho: "Médio", deslocamento: 9, ajustes: null,
    ajusteEscolha: "+1 em três atributos diferentes à escolha",
    periciasExtras: 2,
    habilidades: [
      { nome: "Versátil", efeito: "Treinado em duas perícias à sua escolha, mesmo fora da sua classe; pode trocar uma delas por um poder geral." }
    ],
    verificado: { ajustes: false, tamanho: true, deslocamento: true, habilidades: ["Versátil"] },
    fonte: T20_RAC("p025 (habilidades); ajuste à escolha em p025; tabela 1-2 p024; padrão p112"),
    observacoes: "Ajuste +1 em três atributos à escolha: o app não aplica; lançar no passo Atributos. Versátil dá duas perícias treinadas (periciasExtras)."
  },
  anao: {
    nome: "Anão", tamanho: "Médio", deslocamento: 6, ajustes: { constituicao: 2, sabedoria: 1, destreza: -1 },
    habilidades: [
      { nome: "Conhecimento das Rochas", efeito: "Visão no escuro e +2 em Percepção e Sobrevivência, só no subterrâneo." },
      { nome: "Devagar e Sempre", efeito: "Deslocamento não é reduzido por armadura nem por excesso de carga." },
      { nome: "Duro como Pedra", efeito: "+3 PV no 1º nível e +1 PV em cada nível seguinte." },
      { nome: "Tradição de Heredrimm", efeito: "Machados, martelos, marretas e picaretas viram armas simples para você, com +2 em ataques com elas." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Conhecimento das Rochas", "Devagar e Sempre", "Duro como Pedra", "Tradição de Heredrimm"] },
    fonte: T20_RAC("p026 (habilidades e deslocamento 6 m); ajustes p024; tamanho p113"),
    observacoes: "Deslocamento 6 m (em vez de 9 m), conforme p026."
  },
  elfo: {
    nome: "Elfo", tamanho: "Médio", deslocamento: 9, ajustes: { inteligencia: 2, destreza: 1, constituicao: -1 },
    habilidades: [
      { nome: "Sentidos Élficos", efeito: "Visão na penumbra e +2 em Misticismo e Percepção." },
      { nome: "Graça de Glórienn", efeito: "Seu deslocamento passa a ser 12 m." },
      { nome: "Sangue Mágico", efeito: "Ganha 1 PM extra em cada nível." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Sentidos Élficos", "Graça de Glórienn", "Sangue Mágico"] },
    fonte: T20_RAC("p028 (habilidades); ajustes p024; tamanho p113; deslocamento padrão p112"),
    observacoes: "Deslocamento base 9 m; Graça de Glórienn sobe para 12 m."
  },
  goblin: {
    nome: "Goblin", tamanho: "Pequeno", deslocamento: 9, ajustes: { destreza: 2, inteligencia: 1, carisma: -1 },
    habilidades: [
      { nome: "Engenhoso", efeito: "Sem penalidade em perícia por falta de ferramenta; com a ferramenta necessária, +2 no teste." },
      { nome: "Espelunqueiro", efeito: "Visão no escuro e deslocamento de escalada igual ao terrestre." },
      { nome: "Peste Esguia", efeito: "Tamanho Pequeno, mas mantém deslocamento de 9 m." },
      { nome: "Rato das Ruas", efeito: "+2 em Fortitude; recuperação de PV e PM nunca é inferior ao seu nível." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Engenhoso", "Espelunqueiro", "Peste Esguia", "Rato das Ruas"] },
    fonte: T20_RAC("p029 (habilidades, tamanho Pequeno); ajustes p024; tabela 1-21 p113"),
    observacoes: ""
  },
  golem: {
    nome: "Golem", tamanho: "Médio", deslocamento: 6, ajustes: { forca: 2, constituicao: 1, carisma: -1 },
    habilidades: [
      { nome: "Chassi", efeito: "Deslocamento 6 m sem redução por armadura ou carga; +2 na Defesa com penalidade de armadura –2; vestir ou tirar armadura leva 1 dia, e ela não conta no limite de itens." },
      { nome: "Criatura Artificial", efeito: "Construto com visão no escuro; imune a cansaço, efeitos metabólicos e veneno; não respira, come nem dorme; precisa ficar inerte 8 h por dia para recuperar PV e PM no descanso; Ofício (artesão) substitui Cura." },
      { nome: "Fonte Elemental", efeito: "Escolhe água (frio), ar (eletricidade), fogo (fogo) ou terra (ácido): imune a esse dano e cura metade do dano mágico desse tipo." },
      { nome: "Propósito de Criação", efeito: "Não escolhe origem, mas ganha um poder geral à sua escolha." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Chassi", "Criatura Artificial", "Fonte Elemental", "Propósito de Criação"] },
    fonte: T20_RAC("p033 (habilidades, deslocamento 6 m, ajustes); tamanho padrão p112"),
    observacoes: "Raça das Raças Extras. Sem tamanho próprio no livro: Médio pelo padrão."
  },
  hynne: {
    nome: "Hynne", tamanho: "Pequeno", deslocamento: 6, ajustes: { destreza: 2, carisma: 1, forca: -1 },
    habilidades: [
      { nome: "Arremessador", efeito: "Com funda ou arma de arremesso, o dano sobe um passo." },
      { nome: "Pequeno e Rechonchudo", efeito: "Tamanho Pequeno, deslocamento 6 m, +2 em Enganação e Destreza como atributo-chave de Atletismo." },
      { nome: "Sorte Salvadora", efeito: "Gasta 1 PM para rolar de novo um teste de resistência." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Arremessador", "Pequeno e Rechonchudo", "Sorte Salvadora"] },
    fonte: T20_RAC("p034 (habilidades, tamanho, deslocamento 6 m, ajustes); tabela 1-21 p113"),
    observacoes: "Raças Extras (p033-p034)."
  },
  kliren: {
    nome: "Kliren", tamanho: "Médio", deslocamento: 9, ajustes: { inteligencia: 2, carisma: 1, forca: -1 },
    habilidades: [
      { nome: "Híbrido", efeito: "Treinado em uma perícia à sua escolha, mesmo fora da sua classe." },
      { nome: "Engenhosidade", efeito: "Gasta 2 PM para somar Inteligência em um teste de perícia (não de ataque); se receber de novo, o custo cai 1 PM." },
      { nome: "Ossos Frágeis", efeito: "Sofre 1 de dano extra por dado de dano de impacto." },
      { nome: "Vanguardista", efeito: "Proficiência com armas de fogo e +2 em um Ofício à sua escolha." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Híbrido", "Engenhosidade", "Ossos Frágeis", "Vanguardista"] },
    fonte: T20_RAC("p034 (habilidades e ajustes); padrão p112"),
    observacoes: ""
  },
  lefou: {
    nome: "Lefou", tamanho: "Médio", deslocamento: 9, ajustes: { carisma: -1 },
    ajusteEscolha: "+1 em três atributos diferentes, exceto Carisma",
    habilidades: [
      { nome: "Cria da Tormenta", efeito: "Tipo monstro e +5 em resistências contra efeitos de lefeu e da Tormenta." },
      { nome: "Deformidade", efeito: "+2 em duas perícias à sua escolha; cada bônus conta como poder da Tormenta (não para perda de Carisma); pode trocar um desses bônus por um poder da Tormenta." }
    ],
    verificado: { ajustes: false, tamanho: true, deslocamento: true, habilidades: ["Cria da Tormenta", "Deformidade"] },
    fonte: T20_RAC("p030 (habilidades; Carisma –1 e ajuste à escolha em p030); padrão p112"),
    observacoes: "Ajuste +1 em três atributos (exceto Carisma): o app não aplica; lançar no passo Atributos. Carisma –1 aplicado."
  },
  medusa: {
    nome: "Medusa", tamanho: "Médio", deslocamento: 9, ajustes: { destreza: 2, carisma: 1 },
    habilidades: [
      { nome: "Cria de Megalokk", efeito: "Tipo monstro e visão no escuro." },
      { nome: "Natureza Venenosa", efeito: "Resistência a veneno +5; com ação de movimento e 1 PM, envenena a arma em uso, que causa perda de 1d12 PV até você acertar um ataque ou acabar a cena." },
      { nome: "Olhar Atordoante", efeito: "Com ação de movimento e 1 PM, força Fortitude (CD Carisma) a alcance curto; se falhar, a criatura fica atordoada por uma rodada, uma vez por cena." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Cria de Megalokk", "Natureza Venenosa", "Olhar Atordoante"] },
    fonte: T20_RAC("p034-p035 (habilidades e ajustes); padrão p112"),
    observacoes: ""
  },
  minotauro: {
    nome: "Minotauro", tamanho: "Médio", deslocamento: 9, ajustes: { forca: 2, constituicao: 1, sabedoria: -1 },
    habilidades: [
      { nome: "Chifres", efeito: "Arma natural de chifres (1d6, crítico x2, perfuração). Uma vez por rodada, ao agredir com outra arma, gasta 1 PM para um ataque extra com os chifres." },
      { nome: "Couro Rígido", efeito: "+1 de Defesa." },
      { nome: "Faro", efeito: "Contra inimigos em alcance curto que você não vê, não fica desprevenido; camuflagem total dá só 20% de chance de falha." },
      { nome: "Medo de Altura", efeito: "Fica abalado se estiver adjacente a uma queda de 3 m ou mais." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Chifres", "Couro Rígido", "Faro", "Medo de Altura"] },
    fonte: T20_RAC("p031 (habilidades e ajustes); padrão p112"),
    observacoes: "Ajustes e habilidades conferidos no livro. A versão antiga com Destreza +1 não está no livro."
  },
  osteon: {
    nome: "Osteon", tamanho: "Médio", deslocamento: 9, ajustes: { constituicao: -1 },
    ajusteEscolha: "+1 em três atributos diferentes, exceto Constituição",
    habilidades: [
      { nome: "Armadura Óssea", efeito: "Redução 5 a corte, frio e perfuração." },
      { nome: "Memória Póstuma", efeito: "Treinado em uma perícia à escolha ou ganha um poder geral. Pode ser osteon de outra raça humanoide que não humano: ganha uma habilidade dessa raça e, se ela não for Média, o tamanho dela." },
      { nome: "Natureza Esquelética", efeito: "Morto-vivo com visão no escuro; imune a cansaço, efeitos metabólicos, trevas e veneno; não respira, come nem dorme; cura de luz causa dano a você; dano de trevas recupera seus PV." },
      { nome: "Preço da Não Vida", efeito: "Passa 8 h sob a luz das estrelas ou no subterrâneo para recuperar PV e PM no descanso; senão, sofre os efeitos de fome." }
    ],
    verificado: { ajustes: false, tamanho: true, deslocamento: true, habilidades: ["Armadura Óssea", "Memória Póstuma", "Natureza Esquelética", "Preço da Não Vida"] },
    fonte: T20_RAC("p035 (habilidades); ajuste Constituição –1 em p024; ajuste à escolha em p035"),
    observacoes: "Ajuste +1 em três atributos (exceto Constituição): o app não aplica; lançar no passo Atributos. Constituição –1 aplicado."
  },
  qareen: {
    nome: "Qareen", tamanho: "Médio", deslocamento: 9, ajustes: { carisma: 2, inteligencia: 1, sabedoria: -1 },
    habilidades: [
      { nome: "Desejos", efeito: "Magia que alguém pediu desde o seu último turno custa 1 PM a menos; fazer um desejo ao qareen é ação livre." },
      { nome: "Resistência Elemental", efeito: "Redução 10 contra um tipo de dano, conforme a ascendência: frio, eletricidade, fogo, ácido, luz ou trevas." },
      { nome: "Tatuagem Mística", efeito: "Lança uma magia de 1º círculo à sua escolha, com Carisma; se aprender a mesma de novo, o custo cai 1 PM." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Desejos", "Resistência Elemental", "Tatuagem Mística"] },
    fonte: T20_RAC("p032 (habilidades e ajustes); padrão p112"),
    observacoes: ""
  },
  dahllan: {
    nome: "Dahllan", tamanho: "Médio", deslocamento: 9, ajustes: { sabedoria: 2, destreza: 1, inteligencia: -1 },
    habilidades: [
      { nome: "Amiga das Plantas", efeito: "Lança Controlar Plantas com Sabedoria; se aprender de novo, o custo cai 1 PM." },
      { nome: "Armadura de Allihanna", efeito: "Com ação de movimento e 1 PM, a pele vira casca e dá +2 na Defesa até o fim da cena." },
      { nome: "Empatia Selvagem", efeito: "Comunica-se com animais; usa Adestramento para mudar atitude e persuasão deles; se receber de novo, +2 em Adestramento." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Amiga das Plantas", "Armadura de Allihanna", "Empatia Selvagem"] },
    fonte: T20_RAC("p027 (habilidades e ajustes); padrão p112"),
    observacoes: ""
  },
  sereia_triton: {
    nome: "Sereia/Tritão", tamanho: "Médio", deslocamento: 9, ajustes: null,
    ajusteEscolha: "+1 em três atributos diferentes à escolha",
    habilidades: [
      { nome: "Canção dos Mares", efeito: "Lança duas magias entre Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo e Sono (Carisma); se aprender de novo uma delas, o custo cai 1 PM." },
      { nome: "Mestre do Tridente", efeito: "Tridente é arma simples para você; +2 em dano com azagaias, lanças e tridentes." },
      { nome: "Transformação Anfíbia", efeito: "Respira na água e tem natação de 12 m com a cauda; fora d'água, tem pernas com deslocamento de 9 m; sem água por mais de um dia, não recupera PM no descanso até voltar à água." }
    ],
    verificado: { ajustes: false, tamanho: true, deslocamento: true, habilidades: ["Canção dos Mares", "Mestre do Tridente", "Transformação Anfíbia"] },
    fonte: T20_RAC("p035-p036 (habilidades; ajuste à escolha em p036); padrão p112"),
    observacoes: "Ajuste +1 em três atributos à escolha: o app não aplica; lançar no passo Atributos. Deslocamento 9 m em terra (natação 12 m)."
  },
  silfide: {
    nome: "Sílfide", tamanho: "Minúsculo", deslocamento: 9, ajustes: { carisma: 2, destreza: 1, forca: -2 },
    habilidades: [
      { nome: "Asas de Borboleta", efeito: "Paira a 1,5 m do chão com deslocamento de 9 m; ignora terreno difícil; imune a dano por queda, exceto inconsciente; gasta 1 PM por rodada para voar a 12 m." },
      { nome: "Espírito da Natureza", efeito: "Tipo espírito, visão na penumbra e fala livremente com animais." },
      { nome: "Magia das Fadas", efeito: "Lança duas magias entre Criar Ilusão, Enfeitiçar, Luz e Sono (Carisma); se aprender de novo uma delas, o custo cai 1 PM." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Asas de Borboleta", "Espírito da Natureza", "Magia das Fadas"] },
    fonte: T20_RAC("p036 (habilidades, tamanho Minúsculo, ajustes); tabela 1-21 p113"),
    observacoes: "Voo de 12 m a 1 PM por rodada, conforme p036."
  },
  suraggel_aggelus: {
    nome: "Suraggel (Aggelus)", tamanho: "Médio", deslocamento: 9, ajustes: { sabedoria: 2, carisma: 1 },
    habilidades: [
      { nome: "Herança Divina", efeito: "Tipo espírito e visão no escuro." },
      { nome: "Luz Sagrada", efeito: "+2 em Diplomacia e Intuição; lança Luz como magia divina com Carisma; se aprender de novo, o custo cai 1 PM." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Herança Divina", "Luz Sagrada"] },
    fonte: T20_RAC("p036-p037 (ajustes aggelus; habilidades); padrão p112"),
    observacoes: "Aggelus e Sulfure são alternativas: o livro diz 'ou' entre os dois lados."
  },
  suraggel_sulfure: {
    nome: "Suraggel (Sulfure)", tamanho: "Médio", deslocamento: 9, ajustes: { destreza: 2, inteligencia: 1 },
    habilidades: [
      { nome: "Herança Divina", efeito: "Tipo espírito e visão no escuro." },
      { nome: "Sombras Profanas", efeito: "+2 em Enganação e Furtividade; lança Escuridão como magia divina com Inteligência; se aprender de novo, o custo cai 1 PM." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Herança Divina", "Sombras Profanas"] },
    fonte: T20_RAC("p036-p037 (ajustes sulfure; habilidades); padrão p112"),
    observacoes: "Aggelus e Sulfure são alternativas: o livro diz 'ou' entre os dois lados."
  },
  trog: {
    nome: "Trog", tamanho: "Médio", deslocamento: 9, ajustes: { constituicao: 2, forca: 1, inteligencia: -1 },
    habilidades: [
      { nome: "Mau Cheiro", efeito: "Com ação padrão e 2 PM, solta gás fétido: criaturas (exceto trogs) em alcance curto que falham em Fortitude (CD Constituição) ficam enjoadas por 1d6 rodadas; quem passa fica imune por um dia." },
      { nome: "Mordida", efeito: "Arma natural de mordida (1d6, crítico x2, perfuração). Uma vez por rodada, ao agredir com outra arma, gasta 1 PM para um ataque extra com a mordida." },
      { nome: "Reptiliano", efeito: "Tipo monstro, visão no escuro, +1 na Defesa e +5 em Furtividade sem armadura ou roupas pesadas." },
      { nome: "Sangue Frio", efeito: "Sofre 1 de dano extra por dado de dano de frio." }
    ],
    verificado: { ajustes: true, tamanho: true, deslocamento: true, habilidades: ["Mau Cheiro", "Mordida", "Reptiliano", "Sangue Frio"] },
    fonte: T20_RAC("p037 (habilidades e ajustes); padrão p112"),
    observacoes: ""
  }
};
