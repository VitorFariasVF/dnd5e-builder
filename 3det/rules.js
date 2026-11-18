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
    { id: "aceleracao", nome: "Aceleração", custo: 1, desc: null, fonte: "PT" },
    { id: "mais_acao", nome: "+Ação", custo: 1, multiplo: true, desc: null, fonte: "PT" },
    { id: "acumulador", nome: "Acumulador", custo: 1, desc: null, fonte: "PT" },
    { id: "agil", nome: "Ágil", custo: 1, desc: "+2 em testes de Habilidade de agilidade, coordenação ou equilíbrio; 2 PM para crítico com 5 ou 6.", incompativel: ["atrapalhado"], fonte: "PT; KI" },
    { id: "ajudante", nome: "Ajudante", custo: 1, multiplo: true, desc: null, fonte: "PT" },
    { id: "anulacao", nome: "Anulação", custo: 2, desc: "Impede o alvo de usar uma vantagem (3 PM).", fonte: "PT; KI; manual PDF p48 (custo 2)" },
    { id: "arena", nome: "Arena", custo: 1, multiplo: true, desc: null, fonte: "PT" },
    { id: "ataque_especial", nome: "Ataque Especial", custo: 1, multiplo: true,
      desc: "Variações combináveis: Espiritual (1 PM), Potente (1 PM por +2 de Poder), Penetrante (2 PM), Perigoso (1 PM), Preciso (1 PM).", fonte: "PT; KI; manual PDF p49 (custos de Penetrante e Preciso corrigidos)" },
    { id: "base", nome: "Base", custo: 1, desc: null, fonte: "PT" },
    { id: "carismatico", nome: "Carismático", custo: 1, desc: "+2 em Poder para testes sociais; 2 PM para crítico.", incompativel: ["antipatico"], fonte: "PT; KI" },
    { id: "confusao", nome: "Confusão", custo: 1, desc: null, fonte: "PT" },
    { id: "copia", nome: "Cópia", custo: 1, desc: null, fonte: "PT" },
    { id: "cura", nome: "Cura", custo: 1, desc: null, fonte: "PT" },
    { id: "defesa_especial", nome: "Defesa Especial", custo: 1, multiplo: true,
      desc: "Variações combináveis: Esquiva (1 PM, defende com Habilidade), Reflexão (1 PM), Robusta (2 PM), Tenaz (1 PM por +2 na defesa).", fonte: "PT; KI; manual PDF p50-52 (custo de Esquiva corrigido)" },
    { id: "desgaste", nome: "Desgaste", custo: 1, desc: null, fonte: "PT" },
    { id: "devoto", nome: "Devoto", custo: 1, desc: null, fonte: "PT" },
    { id: "elo_mental", nome: "Elo Mental", custo: 1, desc: null, fonte: "PT" },
    { id: "estender", nome: "Estender", custo: 1, desc: null, fonte: "PT" },
    { id: "famoso", nome: "Famoso", custo: 1, desc: null, incompativel: ["infame"], fonte: "PT; manual PDF p71 (incompatível com Infame)" },
    { id: "foco", nome: "Foco", custo: 1, desc: null, fonte: "PT" },
    { id: "forte", nome: "Forte", custo: 1, desc: "+2 em Poder para esforço físico; 2 PM para crítico.", incompativel: ["fracote"], fonte: "PT; KI" },
    { id: "genio", nome: "Gênio", custo: 1, desc: "+2 em Habilidade para problemas intelectuais; 2 PM para crítico.", incompativel: ["tapado"], fonte: "PT; KI" },
    { id: "golpe_final", nome: "Golpe Final", custo: 1, desc: null, fonte: "PT" },
    { id: "imitar", nome: "Imitar", custo: 1, desc: null, fonte: "PT" },
    { id: "imortal", nome: "Imortal", custo: 1, desc: null, fonte: "PT" },
    { id: "imune", nome: "Imune", custo: 1, multiplo: true, desc: null, fonte: "PT" },
    { id: "inimigo", nome: "Inimigo", custoMin: 1, custoMax: 2, multiplo: true, desc: "Custo 2 se o grupo ou criatura for muito abundante na campanha.", fonte: "PT; manual PDF p57 (1 ou 2 por grupo)" },
    { id: "inofensivo", nome: "Inofensivo", custo: 1, desc: null, incompativel: ["monstruoso"], fonte: "PT; manual PDF p72 (incompatível com Monstruoso)" },
    { id: "instrutor", nome: "Instrutor", custo: 1, desc: null, fonte: "PT" },
    { id: "invisivel", nome: "Invisível", custoMin: 1, custoMax: 2, desc: "Custo 1: a invisibilidade cai ao atacar ou ao sofrer dano. Custo 2: cai só ao sofrer dano.", fonte: "PT; manual PDF p59 (custo 1 ou 2)" },
    { id: "irresistivel", nome: "Irresistível", custo: 1, desc: null, fonte: "PT" },
    { id: "maestria", nome: "Maestria", custo: 1, multiplo: true, desc: "Escolhe uma perícia; 1 PM para crítico com 5 ou 6 nela.", fonte: "PT; KI" },
    { id: "mais_mana", nome: "+Mana", custo: 1, multiplo: true, desc: null, fonte: "PT" },
    { id: "mentor", nome: "Mentor", custo: 1, multiplo: true, desc: null, fonte: "PT" },
    { id: "paralisia", nome: "Paralisia", custo: 1, desc: null, fonte: "PT" },
    { id: "patrono", nome: "Patrono", custo: 1, desc: null, fonte: "PT" },
    { id: "resoluto", nome: "Resoluto", custo: 1, desc: "+2 em Resistência de força de vontade, inclusive testes de morte; 2 PM para crítico.", incompativel: ["indeciso"], fonte: "PT; KI" },
    { id: "sentido", nome: "Sentido", custo: 1, multiplo: true, desc: null, fonte: "PT" },
    { id: "telepata", nome: "Telepata", custo: 1, desc: null, fonte: "PT" },
    { id: "teleporte", nome: "Teleporte", custo: 1, desc: null, fonte: "PT" },
    { id: "torcida", nome: "Torcida", custo: 1, desc: null, fonte: "PT" },
    { id: "mais_vida", nome: "+Vida", custo: 1, multiplo: true, desc: null, fonte: "PT" },
    { id: "vigoroso", nome: "Vigoroso", custo: 1, desc: "+2 em Resistência de saúde física, inclusive testes de morte; 2 PM para crítico.", incompativel: ["fragil"], fonte: "PT; KI" },
    { id: "voo", nome: "Voo", custo: 1, desc: null, fonte: "PT" },
    { id: "artefato", nome: "Artefato", custoMin: 1, custoMax: 9, desc: "Cada ponto vale 10 XP em itens.", fonte: "PT" },
    { id: "grimorio", nome: "Grimório", custoMin: 1, custoMax: 9, desc: "Cada ponto vale 10 XP em técnicas.", fonte: "PT" },
    { id: "alcance", nome: "Alcance", custoMin: 1, custoMax: 2, desc: "Ataques atingem alvos mais distantes sem penalidade.", fonte: "PT; KI" },
    { id: "punicao", nome: "Punição", custoMin: 1, custoMax: 2, desc: null, fonte: "PT" },
    { id: "transformacao", nome: "Transformação", custoMin: 1, custoMax: 2, multiplo: true, desc: null, fonte: "PT" },
    { id: "inventario", nome: "Inventário", custoMin: 0, custoMax: 3, desc: "0 = seminventário, que ainda leva dois itens comuns; 1 a 3 conforme o tamanho.", fonte: "PT; manual PDF p58" },
    { id: "ilusao", nome: "Ilusão", custo: 2, desc: null, fonte: "PT" },
    { id: "improviso", nome: "Improviso", custo: 2, desc: null, fonte: "PT" },
    { id: "incorporeo", nome: "Incorpóreo", custo: 2, desc: null, fonte: "PT" },
    { id: "magia", nome: "Magia", custo: 2, desc: null, fonte: "PT" },
    { id: "mais_membros", nome: "+Membros", custo: 2, desc: null, fonte: "PT" },
    { id: "obstinado", nome: "Obstinado", custo: 1, desc: null, fonte: "PT; manual PDF p61 (custo 1)" },
    { id: "regeneracao", nome: "Regeneração", custoMin: 1, custoMax: 2, desc: "Custo 1: recupera 1 PV no início do turno. Custo 2: recupera 3 PV.", fonte: "PT; manual PDF p62 (custo 1 ou 2)" },
    { id: "riqueza", nome: "Riqueza", custoOpcoes: [2, 4, 6], desc: null, incompativel: ["pobreza"], fonte: "PT; manual PDF p62 (custos 2, 4 ou 6); incompatível com Pobreza (PDF p73)" }
  ],

  // Desvantagens: valor em pontos (negativo). [PT]; efeitos curtos só onde o KI os traz.
  desvantagens: [
    { id: "ambiente", nome: "Ambiente", valor: -1, fonte: "PT" },
    { id: "antipatico", nome: "Antipático", valor: -1, desc: "Perda em interações sociais de Poder e nunca consegue críticos.", incompativel: ["carismatico"], fonte: "PT; KI" },
    { id: "atrapalhado", nome: "Atrapalhado", valor: -1, desc: "Perda em testes de Habilidade de coordenação e agilidade.", incompativel: ["agil"], fonte: "PT; KI" },
    { id: "bateria", nome: "Bateria", valor: -1, fonte: "PT" },
    { id: "codigo", nome: "Código", valor: -1, multiplo: true, desc: "Códigos citados no manual: 1ª e 2ª Lei de Asimov, Caçador, Combate, Derrota, Gratidão, Heróis, Honestidade e Redenção. Violar o código causa Perda em todos os testes até se redimir. Pode ter mais de um.", fonte: "PT; KI; manual PDF p68 (lista de códigos; ver decisões: o manual tem nove itens, não oito)" },
    { id: "diferente", nome: "Diferente", valor: -1, fonte: "PT" },
    { id: "elo_vital", nome: "Elo Vital", valor: -1, fonte: "PT" },
    { id: "fracote", nome: "Fracote", valor: -1, desc: "Perda em esforço físico.", incompativel: ["forte"], fonte: "PT; KI" },
    { id: "fragil", nome: "Frágil", valor: -1, desc: "Perda em Resistência de saúde física.", incompativel: ["vigoroso"], fonte: "PT; KI" },
    { id: "inapto", nome: "Inapto", valor: -1, fonte: "PT" },
    { id: "inculto", nome: "Inculto", valor: -1, fonte: "PT" },
    { id: "indeciso", nome: "Indeciso", valor: -1, desc: "Perda em Resistência de força de vontade.", incompativel: ["resoluto"], fonte: "PT; KI" },
    { id: "infame", nome: "Infame", valor: -1, desc: "Perda em testes sociais com quem reconhece o personagem.", incompativel: ["famoso"], fonte: "PT; KI; manual PDF p71 (incompatível com Famoso)" },
    { id: "insano", nome: "Insano", valor: -1, multiplo: true, fonte: "PT" },
    { id: "lento", nome: "Lento", valor: -1, desc: "Em testes de iniciativa, sempre em Perda; gasta um movimento a mais para cruzar cada distância.", incompativel: ["aceleracao"], fonte: "3DeT Victory, PDF p71 (livro do usuário): –1 pt, efeito e incompatibilidade só com Aceleração" },
    { id: "monstruoso", nome: "Monstruoso", valor: -1, incompativel: ["inofensivo"], fonte: "PT; manual PDF p72 (incompatível com Inofensivo)" },
    { id: "municao", nome: "Munição", valor: -1, fonte: "PT" },
    { id: "pobreza", nome: "Pobreza", valor: -1, incompativel: ["riqueza"], fonte: "PT; manual PDF p73 (incompatível com Riqueza)" },
    { id: "ponto_fraco", nome: "Ponto Fraco", valor: -1, fonte: "PT" },
    { id: "protegido", nome: "Protegido", valor: -1, fonte: "PT" },
    { id: "tapado", nome: "Tapado", valor: -1, desc: "Perda em testes de Habilidade de inteligência.", incompativel: ["genio"], fonte: "PT; KI" },
    { id: "utensilio", nome: "Utensílio", valorMin: -2, valorMax: -1, desc: "–1: precisa do item para ter acertos críticos com uma perícia escolhida. –2: sem o item, não usa vantagens com PM nem PA (exceto para recuperá-lo ou improvisá-lo).", fonte: "PT; manual PDF p74-75 (valor –1 ou –2)" },
    { id: "assombrado", nome: "Assombrado", valorMin: -2, valorMax: -1, fonte: "PT" },
    { id: "aura", nome: "Aura", valorMin: -2, valorMax: -1, fonte: "PT" },
    { id: "fraqueza", nome: "Fraqueza", valorMin: -2, valorMax: -1, fonte: "PT" },
    { id: "maldicao", nome: "Maldição", valorMin: -2, valorMax: -1, fonte: "PT" },
    { id: "pacifista", nome: "Pacifista", valorMin: -2, valorMax: -1, fonte: "PT" },
    { id: "restricao", nome: "Restrição", valorMin: -2, valorMax: -1, fonte: "PT" },
    { id: "amnesia", nome: "Amnésia", valor: -2, fonte: "PT" },
    { id: "dependencia", nome: "Dependência", valor: -2, fonte: "PT", obs: "Só para NPCs vilões (Vampiro, PT)." },
    { id: "furia", nome: "Fúria", valor: -2, fonte: "PT" },
    { id: "sem_vida", nome: "Sem Vida", valor: -2, fonte: "PT" }
  ],

  // Arquétipos (raças): custo em pontos [PT]. As desvantagens do arquétipo não contam no limite de −2.
  arquetipos: [
    { id: "humano", nome: "Humano", custo: 0, poderes: [], fonte: "PT" },
    { id: "aberrante", nome: "Aberrante", custo: 1, poderes: ["Deformidade (escolhe uma perícia; ao testá-la, +1 no atributo dela)", "Teratismo (uma Técnica Comum à escolha, com os requisitos dela)"], desvantagens: ["Monstruoso"], fonte: "3DeT Victory, PDF p79 (livro do usuário): custo 1 pt; poderes Deformidade e Teratismo; desvantagem Monstruoso. Poderes sem vantagem equivalente no app (ver decisões)" },
    { id: "abissal", nome: "Abissal", custo: 1, poderes: ["Ágil", "Desfavor (ação e 3 PM; alvo Perto faz teste de R contra seu Poder ou sofre Perda até o próximo turno)"], desvantagens: ["Infame"], fonte: "3DeT Victory, PDF p80 (livro do usuário): custo 1 pt; poderes Ágil e Desfavor. Infame listado como desvantagem pelo padrão do manual; confirmar (ver decisões)" },
    { id: "alien", nome: "Alien", custo: 1, poderes: ["Talento (escolhe uma entre Ágil, Carismático, Forte, Gênio, Resoluto ou Vigoroso)", "Xenobiologia (usa uma vantagem que possui pagando metade do custo em PM)"], desvantagens: ["Inculto"], fonte: "3DeT Victory, PDF p81 (livro do usuário): custo 1 pt; poderes Talento e Xenobiologia. Inculto listado como desvantagem pelo padrão do manual; confirmar (ver decisões)" },
    { id: "anao", nome: "Anão", custo: 1, poderes: ["+1 em Máquinas (mesmo sem a perícia)", "Sentido (Infravisão)", "Abascanto (Ganho em R contra efeitos nocivos, exceto dano)"], desvantagens: ["Lento"], fonte: "3DeT Victory, PDF p82 (livro do usuário): custo 1 pt; poderes Abascanto, +1 em Máquinas e Infravisão; desvantagem Lento" },
    { id: "anfibio", nome: "Anfíbio", custo: 1, poderes: ["Imune (Anfíbio)", "Vigoroso"], desvantagens: ["Ambiente"], fonte: "PT" },
    { id: "celestial", nome: "Celestial", custo: 1, poderes: ["Carismático", "Inspirar (3 PM dá Ganho a um aliado)"], desvantagens: ["Código"], fonte: "PT" },
    { id: "centauro", nome: "Centauro", custo: 2, poderes: ["Corpo Táurico (3 PM para crítico em testes físicos)", "Vigoroso"], desvantagens: ["Diferente"], fonte: "PT" },
    { id: "ciborgue", nome: "Ciborgue", custo: 2, poderes: ["Construto Vivo", "Imune (Abiótico, Doenças, Resiliente)"], desvantagens: ["Código ou Insano (diretriz)"], fonte: "PT" },
    { id: "construto", nome: "Construto", custo: 1, poderes: ["Imune (Abiótico, Doenças, Resiliente, Sem Mente)"], desvantagens: ["Bateria", "Sem Vida"], fonte: "PT" },
    { id: "dahllan", nome: "Dahllan", custo: 2, poderes: ["Benção da Natureza (2 PM, Ganho em Defesas)", "+1 em Animais"], desvantagens: ["Código"], fonte: "PT" },
    { id: "elfo", nome: "Elfo", custo: 1, poderes: ["Carismático", "+1 em Mística"], desvantagens: ["Frágil"], fonte: "PT" },
    { id: "fada", nome: "Fada", custo: 1, poderes: ["Magia ou Ilusão com custo de PM reduzido em 2 (mínimo 1)"], desvantagens: ["Infame", "Diferente ou Frágil"], fonte: "PT" },
    { id: "fantasma", nome: "Fantasma", custo: 2, poderes: ["Espírito (imaterial; PM para ficar sólido)", "Imune"], desvantagens: ["Sem Vida", "Paralisia", "Devoto"], fonte: "PT" },
    { id: "goblin", nome: "Goblin", custo: 1, poderes: ["+1 em Manha", "Infravisão e Ganho em R contra doenças e venenos"], desvantagens: ["Diferente"], fonte: "PT" },
    { id: "hynne", nome: "Hynne", custo: 1, poderes: ["Atirador (2 PM, Ganho em ataque à distância)", "+1 em Influência"], desvantagens: ["Diferente"], fonte: "PT" },
    { id: "kallyanach", nome: "Kallyanach", custo: 2, poderes: ["Baforada (Ataque Especial sem custo em PM, limitado por cena ao Poder)", "Forte ou Carismático"], desvantagens: ["Código dos Dragões"], fonte: "PT" },
    { id: "kemono", nome: "Kemono", custo: 1, poderes: ["Talento (uma entre Ágil, Carismático, Forte, Gênio, Resoluto, Vigoroso)", "+1 em Percepção"], desvantagens: ["Cacoete (uma desvantagem da lista)"], fonte: "PT" },
    { id: "medusa", nome: "Medusa", custo: 1, poderes: ["Carismático", "Olhar Atordoante (3 PM, paralisa um alvo por uma rodada)"], desvantagens: ["Fracote"], fonte: "PT" },
    { id: "minotauro", nome: "Minotauro", custo: 1, poderes: ["+1 em Esporte", "Sentido Labiríntico"], desvantagens: ["Insano (fobia de altura)"], fonte: "PT" },
    { id: "ogro", nome: "Ogro", custo: 1, poderes: ["Destruidor (2 PM, soma Poder de novo em crítico contra alvo Perto)", "Ganho em Influência para intimidar"], desvantagens: ["Diferente"], fonte: "PT" },
    { id: "osteon", nome: "Osteon", custo: 2, poderes: ["Imune (Abiótico, Doenças, Resiliente)", "+1 em uma perícia escolhida"], desvantagens: ["Sem Vida"], fonte: "PT" },
    { id: "qareen", nome: "Qareen", custo: 3, poderes: ["Carismático", "Desejos (Magia; custo −2 PM se pedida por outro)"], desvantagens: ["Código da Gratidão"], fonte: "PT" },
    { id: "sauroide", nome: "Sauroide", custo: 2, poderes: ["Resoluto e Vigoroso", "Ganho em Esconder-se"], desvantagens: ["Fraqueza (Frio)"], fonte: "PT" },
    { id: "vampiro", nome: "Vampiro", custo: 1, poderes: ["Talento (mesmas seis do Kemono)", "Imortal"], desvantagens: ["Fraqueza (luz do dia)"], fonte: "PT" }
  ],

  lacunas: [
    "Efeito da maioria das vantagens e desvantagens (só as do Kit Introdutório estão descritas).",
    "Arquétipos Aberrante, Abissal e Alien: poderes Deformidade, Teratismo, Desfavor e Xenobiologia são só texto, sem vantagem equivalente no app (PDF p79-81).",
    "Veículos e artefatos: regras só parcialmente implementadas (o manual não tem kits; faltam regras de veículos e de artefatos).",
    "3D&T Alpha (5 características) não está implementado; só o Victory (3 atributos)."
  ]
};
