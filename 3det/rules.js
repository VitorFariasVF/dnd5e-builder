/* 3DeT Victory — dados de regra para a criação de personagem.
 *
 * FONTES (oficiais e gratuitas, da Jambô Editora):
 *   [PT]  Manual 3DeT Victory (Playtest), 2023 — jamboeditora.com.br/wp-content/uploads/2023/08/Manual-3DeT-Victory-Playtest.pdf
 *   [KI]  3DeT Victory, Kit Introdutório (demo) — blog.jamboeditora.com.br/wp-content/uploads/2023/08/3DeT-DEMO-Kit-Introdutorio.pdf
 * Atributos, PA/PM/PV e o orçamento de pontos aparecem nas duas (confirmados).
 * O Playtest NÃO é o livro final: valores podem ter mudado na edição publicada.
 * Só mecânica e descrições curtas próprias; nada de texto do livro.
 * `fonte: "NÃO VERIFICADO"` = lacuna declarada, nunca preenchida por palpite.
 */
window.TDT_RULES = {
  sistema: "3DeT Victory",
  edicaoBase: "Playtest 2023 + Kit Introdutório (Jambô)",
  aviso: "Regras do Playtest e do Kit Introdutório gratuitos da Jambô, não do livro final. Confira no manual oficial.",

  criacao: {
    pontosIniciais: 10,            // [PT][KI]
    desvantagensMax: 2,            // até −2 em desvantagens, que rendem +2 pontos [PT][KI]
    atributoMin: 0, atributoMax: 5, // [PT] 0 a 5, 1 ponto cada; recomenda-se ao menos 1 em cada
    atributoCusto: 1,              // [PT][KI]
    atributoRecomendadoMin: 1,
    umArquetipo: true,             // [PT] não se pode ter mais de um arquétipo
    desvantagemDeArquetipoNaoConta: true, // [PT] as do arquétipo não entram no limite de −2
    fonte: "PT cap. criação; KI regras de criação"
  },

  niveisDePoder: [ // [PT] fim do capítulo de criação e progressão
    { id: "iniciante", nome: "Iniciante", pontos: 10, fonte: "PT" },
    { id: "heroi",     nome: "Herói",     pontos: 20, fonte: "PT" },
    { id: "veterano",  nome: "Veterano",  pontos: 35, fonte: "PT" }
  ],

  progressao: { xpPorPonto: 10, xpAtributoAcimaDe5: 20, fonte: "PT; KI (10 XP = 1 ponto)" },

  atributos: [
    { id: "P", nome: "Poder",       desc: "Força física e presença; define o dano e dá os Pontos de Ação.", fonte: "KI" },
    { id: "H", nome: "Habilidade",  desc: "Agilidade, raciocínio e técnica; define a iniciativa e dá os Pontos de Mana.", fonte: "KI" },
    { id: "R", nome: "Resistência", desc: "Vigor físico e mental; dá os Pontos de Vida.", fonte: "KI" }
  ],

  recursos: { // [PT][KI] atributo 0 vale 1 ponto do recurso [PT]
    PA: { nome: "Pontos de Ação", atributo: "P", mult: 1, fonte: "PT; KI" },
    PM: { nome: "Pontos de Mana", atributo: "H", mult: 5, fonte: "PT; KI" },
    PV: { nome: "Pontos de Vida", atributo: "R", mult: 5, fonte: "PT; KI" },
    minimoComAtributoZero: 1, fonteMinimo: "PT (somente o Playtest)"
  },

  // Perícias: 1 ponto cada. O Victory final usa "Saber" (PDF p43); "Conhecimento" é o nome do Kit/Playtest, mantido como alias.
  pericias: [
    { id: "animais",    nome: "Animais",    fonte: "PT; KI" },
    { id: "arte",       nome: "Arte",       fonte: "PT; KI" },
    { id: "esporte",    nome: "Esporte",    fonte: "PT; KI" },
    { id: "influencia", nome: "Influência", fonte: "PT; KI" },
    { id: "luta",       nome: "Luta",       fonte: "PT; KI" },
    { id: "manha",      nome: "Manha",      fonte: "PT; KI" },
    { id: "maquinas",   nome: "Máquinas",   fonte: "PT; KI" },
    { id: "medicina",   nome: "Medicina",   fonte: "PT; KI" },
    { id: "mistica",    nome: "Mística",    fonte: "PT; KI" },
    { id: "percepcao",  nome: "Percepção",  fonte: "PT; KI" },
    { id: "saber",      nome: "Saber",      alias: "Conhecimento", fonte: "3DeT Victory, PDF p43 (livro do usuário): perícia Saber; o Victory não usa o nome Conhecimento" },
    { id: "sustento",   nome: "Sustento",   fonte: "PT; KI" }
  ],
  periciaCusto: 1,

  // Vantagens: custo em pontos [PT]. `desc` só quando o KI traz o efeito (resumo próprio); senão null.
  // `custoMin`/`custoMax` quando o custo varia. `multiplo` = pode ser comprada mais de uma vez ("cada").
  vantagens: [
    { id: "aceleracao", nome: "Aceleração", custo: 1, desc: null, fonte: "3DeT Victory, PDF p45 (livro do usuário)" },
    { id: "mais_acao", nome: "+Ação", custo: 1, multiplo: true, desc: null, fonte: "3DeT Victory, PDF p45 (livro do usuário)" },
    { id: "acumulador", nome: "Acumulador", custo: 1, desc: null, fonte: "3DeT Victory, PDF p45 (livro do usuário)" },
    { id: "agil", nome: "Ágil", custo: 1, desc: "+2 em testes de Habilidade de agilidade, coordenação ou equilíbrio; 2 PM para crítico com 5 ou 6.", incompativel: ["atrapalhado"], fonte: "3DeT Victory, PDF p46 (livro do usuário)" },
    { id: "ajudante", nome: "Ajudante", custo: 1, multiplo: true, desc: null, fonte: "3DeT Victory, PDF p46 (livro do usuário)" },
    { id: "anulacao", nome: "Anulação", custo: 2, desc: "Impede o alvo de usar uma vantagem (3 PM).", fonte: "3DeT Victory, PDF p48 (livro do usuário)" },
    { id: "arena", nome: "Arena", custo: 1, multiplo: true, desc: null, fonte: "3DeT Victory, PDF p48 (livro do usuário)" },
    { id: "ataque_especial", nome: "Ataque Especial", custo: 1, multiplo: true,
      desc: "Variações combináveis, cada uma com custo em PM: Área 3, Choque 1, Distante 1, Espiritual 1, Investida 1, Múltiplo 1 por alvo extra, Penetrante 2, Perigoso 1, Poderoso 2, Potente 1 por +2 de Poder, Preciso 1, Titânico 3.", fonte: "3DeT Victory, PDF p49 (livro do usuário)" },
    { id: "base", nome: "Base", custo: 1, desc: null, fonte: "3DeT Victory, PDF p49 (livro do usuário)" },
    { id: "carismatico", nome: "Carismático", custo: 1, desc: "+2 em Poder para testes sociais; 2 PM para crítico.", incompativel: ["antipatico"], fonte: "3DeT Victory, PDF p50 (livro do usuário)" },
    { id: "confusao", nome: "Confusão", custo: 1, desc: null, fonte: "3DeT Victory, PDF p51 (livro do usuário)" },
    { id: "clone", nome: "Clone", custo: 1, desc: null, fonte: "3DeT Victory, PDF p51 (livro do usuário); fichas de NPC usam o nome Cópia (p220)" },
    { id: "cura", nome: "Cura", custo: 1, desc: null, fonte: "3DeT Victory, PDF p51 (livro do usuário)" },
    { id: "defesa_especial", nome: "Defesa Especial", custo: 1, multiplo: true,
      desc: "Variações combináveis, cada uma com custo em PM: Blindada 1, Bloqueio 1, Esquiva 1 (defende com Habilidade), Proteção 1 por aliado, Provocação 1, Reflexão 1, Robusta 2, Tenaz 1 por +2 na defesa, Titânica 3.", fonte: "3DeT Victory, PDF p51-52 (livro do usuário)" },
    { id: "desgaste", nome: "Desgaste", custo: 1, desc: null, fonte: "3DeT Victory, PDF p52 (livro do usuário)" },
    { id: "devoto", nome: "Devoto", custo: 1, desc: null, fonte: "3DeT Victory, PDF p53 (livro do usuário)" },
    { id: "elo_mental", nome: "Elo Mental", custo: 1, desc: null, fonte: "3DeT Victory, PDF p53 (livro do usuário)" },
    { id: "estender", nome: "Estender", custo: 1, desc: null, fonte: "3DeT Victory, PDF p53 (livro do usuário)" },
    { id: "famoso", nome: "Famoso", custo: 1, desc: null, incompativel: ["infame"], fonte: "3DeT Victory, PDF p53 (livro do usuário)" },
    { id: "foco", nome: "Foco", custo: 1, desc: null, fonte: "3DeT Victory, PDF p54 (livro do usuário)" },
    { id: "forte", nome: "Forte", custo: 1, desc: "+2 em Poder para esforço físico; 2 PM para crítico.", incompativel: ["fracote"], fonte: "3DeT Victory, PDF p54 (livro do usuário)" },
    { id: "genio", nome: "Gênio", custo: 1, desc: "+2 em Habilidade para problemas intelectuais; 2 PM para crítico.", incompativel: ["tapado"], fonte: "3DeT Victory, PDF p54 (livro do usuário)" },
    { id: "golpe_final", nome: "Golpe Final", custo: 1, desc: null, fonte: "3DeT Victory, PDF p54 (livro do usuário)" },
    { id: "imitar", nome: "Imitar", custo: 1, desc: null, fonte: "3DeT Victory, PDF p55 (livro do usuário)" },
    { id: "imortal", nome: "Imortal", custo: 1, desc: null, fonte: "3DeT Victory, PDF p56 (livro do usuário)" },
    { id: "imune", nome: "Imune", custo: 1, multiplo: true, desc: null, fonte: "3DeT Victory, PDF p56 (livro do usuário)" },
    { id: "inimigo", nome: "Inimigo", custoMin: 1, custoMax: 2, multiplo: true, desc: "Custo 2 se o grupo ou criatura for muito abundante na campanha.", fonte: "3DeT Victory, PDF p57 (livro do usuário)" },
    { id: "inofensivo", nome: "Inofensivo", custo: 1, desc: null, incompativel: ["monstruoso"], fonte: "3DeT Victory, PDF p57 (livro do usuário)" },
    { id: "instrutor", nome: "Instrutor", custo: 1, desc: null, fonte: "3DeT Victory, PDF p58 (livro do usuário)" },
    { id: "invisivel", nome: "Invisível", custoMin: 1, custoMax: 2, desc: "Custo 1: a invisibilidade cai ao atacar ou ao sofrer dano. Custo 2: cai só ao sofrer dano.", fonte: "3DeT Victory, PDF p59 (livro do usuário)" },
    { id: "irresistivel", nome: "Irresistível", custo: 1, desc: null, fonte: "3DeT Victory, PDF p59 (livro do usuário)" },
    { id: "maestria", nome: "Maestria", custo: 1, multiplo: true, desc: "Escolhe uma perícia; 1 PM para crítico com 5 ou 6 nela.", fonte: "3DeT Victory, PDF p60 (livro do usuário)" },
    { id: "mais_mana", nome: "+Mana", custo: 1, multiplo: true, desc: null, fonte: "3DeT Victory, PDF p60 (livro do usuário)" },
    { id: "mentor", nome: "Mentor", custo: 1, multiplo: true, desc: null, fonte: "3DeT Victory, PDF p61 (livro do usuário)" },
    { id: "paralisia", nome: "Paralisia", custo: 1, desc: null, fonte: "3DeT Victory, PDF p61 (livro do usuário)" },
    { id: "patrono", nome: "Patrono", custo: 1, desc: null, fonte: "3DeT Victory, PDF p61 (livro do usuário)" },
    { id: "resoluto", nome: "Resoluto", custo: 1, desc: "+2 em Resistência de força de vontade, inclusive testes de morte; 2 PM para crítico.", incompativel: ["indeciso"], fonte: "3DeT Victory, PDF p62 (livro do usuário)" },
    { id: "sentido", nome: "Sentido", custo: 1, multiplo: true, desc: null, fonte: "3DeT Victory, PDF p62 (livro do usuário)" },
    { id: "telepata", nome: "Telepata", custo: 1, desc: null, fonte: "3DeT Victory, PDF p63 (livro do usuário)" },
    { id: "teleporte", nome: "Teleporte", custo: 1, desc: null, fonte: "3DeT Victory, PDF p64 (livro do usuário)" },
    { id: "torcida", nome: "Torcida", custo: 1, desc: null, fonte: "3DeT Victory, PDF p64 (livro do usuário)" },
    { id: "mais_vida", nome: "+Vida", custo: 1, multiplo: true, desc: null, fonte: "3DeT Victory, PDF p65 (livro do usuário)" },
    { id: "vigoroso", nome: "Vigoroso", custo: 1, desc: "+2 em Resistência de saúde física, inclusive testes de morte; 2 PM para crítico.", incompativel: ["fragil"], fonte: "3DeT Victory, PDF p65 (livro do usuário)" },
    { id: "voo", nome: "Voo", custo: 1, desc: null, fonte: "3DeT Victory, PDF p65 (livro do usuário)" },
    { id: "artefato", nome: "Artefato", custoMin: 1, custoAberto: true, itens: true, desc: "Um item especial e único, do tipo arma, armadura ou acessório (cada entrada é um item). Cada ponto vale 10 XP para adquiri-lo (não veículo). Limite por personagem: 1 arma, 1 armadura e 2 acessórios.", fonte: "3DeT Victory, PDF p48 (livro do usuário); limite de tipo em PDF p139" },
    { id: "grimorio", nome: "Grimório", custoMin: 1, custoAberto: true, desc: "Cada ponto vale 10 XP para truques ou técnicas comuns (não lendárias).", fonte: "3DeT Victory, PDF p54-55 (livro do usuário): 1 pt ou mais, sem máximo e sem limite de itens no livro" },
    { id: "alcance", nome: "Alcance", custoMin: 1, custoMax: 2, desc: "Ataques atingem alvos mais distantes sem penalidade.", fonte: "3DeT Victory, PDF p47 (livro do usuário)" },
    { id: "punicao", nome: "Punição", custoMin: 1, custoMax: 2, desc: null, fonte: "3DeT Victory, PDF p61 (livro do usuário)" },
    { id: "transformacao", nome: "Transformação", custoMin: 1, custoMax: 2, multiplo: true, desc: null, fonte: "3DeT Victory, PDF p64 (livro do usuário)" },
    { id: "inventario", nome: "Inventário", custoMin: 0, custoMax: 3, desc: "0 Seminventário: dois itens comuns. 1 Pequeno: 3 comuns e 1 incomum. 2 Grande: 5 comuns e 2 incomuns. 3 Supremo: 5 comuns, 4 incomuns e 1 raro.", fonte: "3DeT Victory, PDF p58 (livro do usuário)" },
    { id: "ilusao", nome: "Ilusão", custo: 2, desc: null, fonte: "3DeT Victory, PDF p55 (livro do usuário)" },
    { id: "improviso", nome: "Improviso", custo: 2, desc: null, fonte: "3DeT Victory, PDF p56 (livro do usuário)" },
    { id: "incorporeo", nome: "Incorpóreo", custo: 2, desc: null, fonte: "3DeT Victory, PDF p57 (livro do usuário)" },
    { id: "magia", nome: "Magia", custo: 2, desc: null, fonte: "3DeT Victory, PDF p60 (livro do usuário)" },
    { id: "mais_membros", nome: "+Membros", custo: 2, desc: null, fonte: "3DeT Victory, PDF p60 (livro do usuário)" },
    { id: "obstinado", nome: "Obstinado", custo: 1, desc: null, fonte: "3DeT Victory, PDF p61 (livro do usuário)" },
    { id: "regeneracao", nome: "Regeneração", custoMin: 1, custoMax: 2, desc: "Custo 1: recupera 1 PV no início do turno. Custo 2: recupera 3 PV.", fonte: "3DeT Victory, PDF p62 (livro do usuário)" },
    { id: "riqueza", nome: "Riqueza", custoOpcoes: [2, 4, 6], desc: null, incompativel: ["pobreza"], fonte: "3DeT Victory, PDF p62 (livro do usuário)" }
  ],

  // Desvantagens: valor em pontos (negativo). [PT]; efeitos curtos só onde o KI os traz.
  desvantagens: [
    { id: "ambiente", nome: "Ambiente", valor: -1, fonte: "3DeT Victory, PDF p65 (livro do usuário)" },
    { id: "antipatico", nome: "Antipático", valor: -1, desc: "Perda em interações sociais de Poder e nunca consegue críticos.", incompativel: ["carismatico"], fonte: "3DeT Victory, PDF p67 (livro do usuário)" },
    { id: "atrapalhado", nome: "Atrapalhado", valor: -1, desc: "Perda em testes de Habilidade de coordenação e agilidade.", incompativel: ["agil"], fonte: "3DeT Victory, PDF p67 (livro do usuário)" },
    { id: "bateria", nome: "Bateria", valor: -1, fonte: "3DeT Victory, PDF p67 (livro do usuário)" },
    { id: "codigo", nome: "Código", valor: -1, multiplo: true, desc: "O livro traz nove códigos: 1ª e 2ª Lei de Asimov, Caçador, Combate, Derrota, Gratidão, Heróis, Honestidade e Redenção. Violar o código causa Perda em todos os testes até se redimir. Pode ter mais de um.", fonte: "3DeT Victory, PDF p68 (livro do usuário): lista com nove itens" },
    { id: "diferente", nome: "Diferente", valor: -1, fonte: "3DeT Victory, PDF p69 (livro do usuário)" },
    { id: "elo_vital", nome: "Elo Vital", valor: -1, fonte: "3DeT Victory, PDF p69 (livro do usuário)" },
    { id: "fracote", nome: "Fracote", valor: -1, desc: "Perda em esforço físico.", incompativel: ["forte"], fonte: "3DeT Victory, PDF p69 (livro do usuário)" },
    { id: "fragil", nome: "Frágil", valor: -1, desc: "Perda em Resistência de saúde física.", incompativel: ["vigoroso"], fonte: "3DeT Victory, PDF p69 (livro do usuário)" },
    { id: "inapto", nome: "Inapto", valor: -1, fonte: "3DeT Victory, PDF p70 (livro do usuário)" },
    { id: "inculto", nome: "Inculto", valor: -1, fonte: "3DeT Victory, PDF p71 (livro do usuário)" },
    { id: "indeciso", nome: "Indeciso", valor: -1, desc: "Perda em Resistência de força de vontade.", incompativel: ["resoluto"], fonte: "3DeT Victory, PDF p71 (livro do usuário)" },
    { id: "infame", nome: "Infame", valor: -1, desc: "Perda em testes sociais com quem reconhece o personagem.", incompativel: ["famoso"], fonte: "3DeT Victory, PDF p71 (livro do usuário)" },
    { id: "transtorno", nome: "Transtorno", valor: -1, multiplo: true, desc: "Transtorno mental: escolha um dos oito do livro (cleptomania, compulsão, distração, fantasia, fobia, megalomania, mitomania ou paranoia; efeito de cada um na p74-75). Pode ter mais de um.", fonte: "3DeT Victory, PDF p74-75 (livro do usuário): Transtorno –1 pt cada" },
    { id: "lento", nome: "Lento", valor: -1, desc: "Em testes de iniciativa, sempre em Perda; gasta um movimento a mais para cruzar cada distância.", incompativel: ["aceleracao"], fonte: "3DeT Victory, PDF p71 (livro do usuário): –1 pt, efeito e incompatibilidade só com Aceleração" },
    { id: "monstruoso", nome: "Monstruoso", valor: -1, incompativel: ["inofensivo"], fonte: "3DeT Victory, PDF p71 (livro do usuário)" },
    { id: "municao", nome: "Munição", valor: -1, fonte: "3DeT Victory, PDF p72 (livro do usuário)" },
    { id: "pobreza", nome: "Pobreza", valor: -1, incompativel: ["riqueza"], fonte: "3DeT Victory, PDF p73 (livro do usuário)" },
    { id: "ponto_fraco", nome: "Ponto Fraco", valor: -1, fonte: "3DeT Victory, PDF p73 (livro do usuário)" },
    { id: "protegido", nome: "Protegido", valor: -1, fonte: "3DeT Victory, PDF p73 (livro do usuário)" },
    { id: "tapado", nome: "Tapado", valor: -1, desc: "Perda em testes de Habilidade de inteligência.", incompativel: ["genio"], fonte: "3DeT Victory, PDF p74 (livro do usuário)" },
    { id: "utensilio", nome: "Utensílio", valorMin: -2, valorMax: -1, desc: "–1: precisa do item para ter acertos críticos com uma perícia escolhida. –2: sem o item, não usa vantagens com PM nem PA (exceto para recuperá-lo ou improvisá-lo).", fonte: "3DeT Victory, PDF p75 (livro do usuário)" },
    { id: "assombrado", nome: "Assombrado", valorMin: -2, valorMax: -1, fonte: "3DeT Victory, PDF p67 (livro do usuário)" },
    { id: "aura", nome: "Aura", valorMin: -2, valorMax: -1, fonte: "3DeT Victory, PDF p67 (livro do usuário)" },
    { id: "fraqueza", nome: "Fraqueza", valorMin: -2, valorMax: -1, fonte: "3DeT Victory, PDF p69 (livro do usuário)" },
    { id: "maldicao", nome: "Maldição", valorMin: -2, valorMax: -1, fonte: "3DeT Victory, PDF p71 (livro do usuário)" },
    { id: "pacifista", nome: "Pacifista", valorMin: -2, valorMax: -1, fonte: "3DeT Victory, PDF p73 (livro do usuário)" },
    { id: "restricao", nome: "Restrição", valorMin: -2, valorMax: -1, fonte: "3DeT Victory, PDF p73 (livro do usuário)" },
    { id: "amnesia", nome: "Amnésia", valor: -2, fonte: "3DeT Victory, PDF p66 (livro do usuário)" },
    { id: "dependencia", nome: "Dependência", valor: -2, fonte: "3DeT Victory, PDF p68-69 (livro do usuário)", obs: "Só para NPCs vilões (PDF p69 e p102)." },
    { id: "furia", nome: "Fúria", valor: -2, fonte: "3DeT Victory, PDF p70 (livro do usuário)" },
    { id: "sem_vida", nome: "Sem Vida", valor: -2, fonte: "3DeT Victory, PDF p74 (livro do usuário)" }
  ],

  // Opções do Transtorno (PDF p74-75): escolha uma para cada Transtorno. Efeitos em rules-efeitos-desvantagens.js.
  transtornosOpcoes: [
    { id: "cleptomania", nome: "Cleptomania" }, { id: "compulsao", nome: "Compulsão" },
    { id: "distracao", nome: "Distração" }, { id: "fantasia", nome: "Fantasia" },
    { id: "fobia", nome: "Fobia" }, { id: "megalomania", nome: "Megalomania" },
    { id: "mitomania", nome: "Mitomania" }, { id: "paranoia", nome: "Paranoia" }
  ],

  // Tipos de Artefato e limite por personagem (PDF p139: "no máximo uma arma, uma armadura e dois acessórios").
  artefatoTipos: [
    { id: "arma", nome: "Arma", max: 1 },
    { id: "armadura", nome: "Armadura", max: 1 },
    { id: "acessorio", nome: "Acessório", max: 2 }
  ],

  // Arquétipos (raças): custo em pontos [PT]. As desvantagens do arquétipo não contam no limite de −2.
  arquetipos: [
    { id: "humano", nome: "Humano", custo: 0, poderes: [], fonte: "PT" },
    { id: "aberrante", nome: "Aberrante", custo: 1, poderes: ["Deformidade (escolhe uma perícia; ao testá-la, +1 no atributo dela)", "Teratismo (uma Técnica Comum à escolha, com os requisitos dela)"], desvantagens: ["Monstruoso"], fonte: "3DeT Victory, PDF p79 (livro do usuário): custo 1 pt; poderes Deformidade e Teratismo; desvantagem Monstruoso. Poderes sem vantagem equivalente no app (ver decisões)" },
    { id: "abissal", nome: "Abissal", custo: 1, poderes: ["Ágil", "Desfavor (ação e 3 PM; alvo Perto faz teste de R contra seu Poder ou sofre Perda até o próximo turno)"], desvantagens: ["Infame"], fonte: "3DeT Victory, PDF p80 (livro do usuário): custo 1 pt; poderes Ágil e Desfavor; desvantagem Infame" },
    { id: "alien", nome: "Alien", custo: 1, poderes: ["Talento (escolhe uma entre Ágil, Carismático, Forte, Gênio, Resoluto ou Vigoroso)", "Xenobiologia (usa uma vantagem que possui pagando metade do custo em PM)"], desvantagens: ["Inculto"], fonte: "3DeT Victory, PDF p81 (livro do usuário): custo 1 pt; poderes Talento e Xenobiologia; desvantagem Inculto" },
    { id: "anao", nome: "Anão", custo: 1, poderes: ["+1 em Máquinas (mesmo sem a perícia)", "Sentido (Infravisão)", "Abascanto (Ganho em R contra efeitos nocivos, exceto dano)"], desvantagens: ["Lento"], fonte: "3DeT Victory, PDF p82 (livro do usuário): custo 1 pt; poderes Abascanto, +1 em Máquinas e Infravisão; desvantagem Lento" },
    { id: "anfibio", nome: "Anfíbio", custo: 1, poderes: ["Imune (Anfíbio)", "Vigoroso"], desvantagens: ["Ambiente"], fonte: "PT" },
    { id: "celestial", nome: "Celestial", custo: 1, poderes: ["Carismático", "Inspirar (3 PM dá Ganho a um aliado)"], desvantagens: ["Código"], fonte: "PT" },
    { id: "centauro", nome: "Centauro", custo: 2, poderes: ["Corpo Táurico (3 PM para crítico em testes físicos)", "Vigoroso"], desvantagens: ["Diferente"], fonte: "PT" },
    { id: "ciborgue", nome: "Ciborgue", custo: 2, poderes: ["Construto Vivo", "Imune (Abiótico, Doenças, Resiliente)"], desvantagens: ["Código ou Transtorno"], fonte: "3DeT Victory, PDF p86 (livro do usuário)" },
    { id: "construto", nome: "Construto", custo: 1, poderes: ["Imune (Abiótico, Doenças, Resiliente, Sem Mente)"], desvantagens: ["Bateria", "Sem Vida"], fonte: "PT" },
    { id: "dahllan", nome: "Dahllan", custo: 2, poderes: ["Benção da Natureza (2 PM, Ganho em Defesas)", "+1 em Animais"], desvantagens: ["Código"], fonte: "PT" },
    { id: "elfo", nome: "Elfo", custo: 1, poderes: ["Carismático", "+1 em Mística"], desvantagens: ["Frágil"], fonte: "PT" },
    { id: "fada", nome: "Fada", custo: 1, poderes: ["Magia ou Ilusão com custo de PM reduzido em 2 (mínimo 1)"], desvantagens: ["Infame", "Diferente ou Frágil"], fonte: "PT" },
    { id: "fantasma", nome: "Fantasma", custo: 2, poderes: ["Espírito (imaterial; PM para ficar sólido)", "Imune"], desvantagens: ["Sem Vida", "Paralisia", "Devoto"], fonte: "PT" },
    { id: "goblin", nome: "Goblin", custo: 1, poderes: ["+1 em Manha", "Infravisão e Ganho em R contra doenças e venenos"], desvantagens: ["Diferente"], fonte: "PT" },
    { id: "hynne", nome: "Hynne", custo: 1, poderes: ["Atirador (2 PM, Ganho em ataque à distância)", "+1 em Influência"], desvantagens: ["Diferente"], fonte: "PT" },
    { id: "kallyanach", nome: "Kallyanach", custo: 2, poderes: ["Baforada (Ataque Especial sem custo em PM, limitado por cena ao Poder)", "Forte ou Carismático"], desvantagens: ["Código dos Dragões"], fonte: "PT" },
    { id: "kemono", nome: "Kemono", custo: 1, poderes: ["Talento (uma entre Ágil, Carismático, Forte, Gênio, Resoluto, Vigoroso)", "Percepção Apurada (+1 no atributo ao testar Percepção)"], desvantagens: ["Cacoete (escolha uma: Antipático, Atrapalhado, Fracote, Frágil, Indeciso ou Tapado)"], fonte: "3DeT Victory, PDF p95 (livro do usuário)" },
    { id: "medusa", nome: "Medusa", custo: 1, poderes: ["Carismático", "Olhar Atordoante (3 PM, paralisa um alvo por uma rodada)"], desvantagens: ["Fracote"], fonte: "PT" },
    { id: "minotauro", nome: "Minotauro", custo: 1, poderes: ["+1 em Esporte", "Sentido Labiríntico"], desvantagens: ["Transtorno (Fobia)"], fonte: "3DeT Victory, PDF p97 (livro do usuário)" },
    { id: "ogro", nome: "Ogro", custo: 1, poderes: ["Destruidor (2 PM, soma Poder de novo em crítico contra alvo Perto)", "Ganho em Influência para intimidar"], desvantagens: ["Diferente"], fonte: "PT" },
    { id: "osteon", nome: "Osteon", custo: 2, poderes: ["Imune (Abiótico, Doenças, Resiliente)", "+1 em uma perícia escolhida"], desvantagens: ["Sem Vida"], fonte: "PT" },
    { id: "qareen", nome: "Qareen", custo: 3, poderes: ["Carismático", "Desejos (Magia; custo −2 PM se pedida por outro)"], desvantagens: ["Código da Gratidão"], fonte: "PT" },
    { id: "sauroide", nome: "Sauroide", custo: 2, poderes: ["Resoluto e Vigoroso", "Ganho em Esconder-se"], desvantagens: ["Fraqueza (Frio)"], fonte: "PT" },
    { id: "vampiro", nome: "Vampiro", custo: 1, poderes: ["Talento (mesmas seis do Kemono)", "Imortal"], desvantagens: ["Fraqueza (luz do dia)"], fonte: "3DeT Victory, PDF p102 (livro do usuário)" }
  ],

  lacunas: [
    "Efeitos das vantagens e desvantagens: o app tem um resumo curto de cada uma (em rules-efeitos-*.js), com a página do livro em fonte. O resumo não substitui o texto completo do livro (PDF p45-75).",
    "Poderes de arquétipo (Deformidade, Teratismo, Desfavor, Xenobiologia, Talento e Abascanto): o texto confere com o livro (PDF p79-82), mas o app não aplica o efeito nas contas; não há vantagem equivalente.",
    "Artefatos: o limite por tipo (1 arma, 1 armadura, 2 acessórios) está aplicado (PDF p139). Faltam as Qualidades de Artefatos (Abençoado, Acurado, Amaldiçoado etc., PDF p139), que mudam o custo em XP. Veículos (PDF p140-141) têm ficha própria e não são criados aqui. O Victory não traz kits.",
    "Fora do escopo: 3D&T Alpha (5 características) é outro sistema e não é implementado. Este app cria fichas só do 3D&T Victory (3 atributos)."
  ]
};
