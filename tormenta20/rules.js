/* Tormenta20 (Jambô, Edição Jogo do Ano) — dados de regra.
   Cada item leva `fonte`. "NÃO VERIFICADO" = não confirmado em fonte pública: o sistema mostra o aviso
   e a lacuna está listada em docs/AUDITORIA_TORMENTA20.md. Guarda só mecânica e descrições curtas próprias.
   Fontes consultadas (fãs e blogs, o livro não foi consultado diretamente):
     [R] Rotina de Mestre — guias de classe, "Como criar sua ficha" (cita a Edição Jogo do Ano)
     [E] exegetadearton.com.br — guia de fãs com uma página por classe, perícias e lista de origens
     [T] tsrd.fandom.com — páginas de construção de personagem (trechos)
     [I] issue #57 do repositório DMBerlin/t20-community-patches — cita páginas do livro básico (p. 20, 22, 25, 28)
   Tudo que aparece em só uma fonte fica com `verificado: false` quando é numérico. */

const T20_SISTEMA = "tormenta20";
const T20_VERSAO_ESQUEMA = 1;
const T20_EDICAO = "Edição Jogo do Ano (Jambô)";

/* ---- Atributos ---- */
const T20_ATRIBUTOS = [
  { id: "forca", nome: "Força", sigla: "FOR" },
  { id: "destreza", nome: "Destreza", sigla: "DES" },
  { id: "constituicao", nome: "Constituição", sigla: "CON" },
  { id: "inteligencia", nome: "Inteligência", sigla: "INT" },
  { id: "sabedoria", nome: "Sabedoria", sigla: "SAB" },
  { id: "carisma", nome: "Carisma", sigla: "CAR" }
];
const T20_ATRIBUTO_IDS = T20_ATRIBUTOS.map(a => a.id);
const T20_ATRIBUTO_NOME = Object.fromEntries(T20_ATRIBUTOS.map(a => [a.id, a.nome]));

/* Compra de atributos: 10 pontos, todos começam em 0. Custo por valor final (antes de raça).
   fonte: [R] "Como criar sua ficha" (tabela de custo). Só uma fonte: verificado: false. */
const T20_PONTOS_COMPRA = { total: 10, minimo: -1, maximo: 4, verificado: false,
  fonte: "[R] Como criar sua ficha em Tormenta 20 (tabela de custo de atributos); 1 fonte",
  custos: { "-1": -1, "0": 0, "1": 1, "2": 2, "3": 4, "4": 7 } };

/* Modificador de atributo = valor do atributo (T20). fonte: [R] e [T] ("o valor é usado como modificador"). */
const T20_MODIFICADOR_FONTE = "[R] e [T] (modificador igual ao valor do atributo); 2 fontes, sem o livro";

/* ---- Perícias (31) ----
   attr: atributo-chave da perícia. soTreinado: só pode ser usada treinada.
   penalidadeArmadura: penalidade de armadura. fonte: [E] lista de perícias por atributo. */
const T20_PERICIAS = [
  { nome: "Acrobacia", attr: "destreza", penalidadeArmadura: true },
  { nome: "Adestramento", attr: "carisma" },
  { nome: "Artes", attr: "carisma" },
  { nome: "Atletismo", attr: "forca", penalidadeArmadura: true },
  { nome: "Atuação", attr: "carisma" },
  { nome: "Cavalgar", attr: "destreza" },
  { nome: "Conhecimento", attr: "inteligencia", soTreinado: true },
  { nome: "Cura", attr: "sabedoria" },
  { nome: "Diplomacia", attr: "carisma" },
  { nome: "Enganação", attr: "carisma" },
  { nome: "Fortitude", attr: "constituicao" },
  { nome: "Furtividade", attr: "destreza", penalidadeArmadura: true },
  { nome: "Guerra", attr: "inteligencia", soTreinado: true },
  { nome: "Iniciativa", attr: "destreza" },
  { nome: "Intimidação", attr: "carisma" },
  { nome: "Intuição", attr: "sabedoria" },
  { nome: "Investigação", attr: "inteligencia" },
  { nome: "Jogatina", attr: "carisma" },
  { nome: "Ladinagem", attr: "destreza", soTreinado: true },
  { nome: "Luta", attr: "forca" },
  { nome: "Medicina", attr: "sabedoria", soTreinado: true },
  { nome: "Misticismo", attr: "inteligencia" },
  { nome: "Nobreza", attr: "inteligencia", soTreinado: true },
  { nome: "Ofício", attr: "inteligencia" },
  { nome: "Percepção", attr: "sabedoria" },
  { nome: "Pilotagem", attr: "destreza" },
  { nome: "Pontaria", attr: "destreza" },
  { nome: "Reflexos", attr: "destreza" },
  { nome: "Religião", attr: "sabedoria", soTreinado: true },
  { nome: "Sobrevivência", attr: "sabedoria" },
  { nome: "Vontade", attr: "sabedoria" }
];
const T20_PERICIA_NOMES = T20_PERICIAS.map(p => p.nome);
const T20_PERICIA_FONTE = "[E] lista de perícias por atributo (31 perícias); 1 fonte. Bônus de treino: [E] e [T] (metade do nível)";

/* Regra do teste de perícia (fonte [E] e [T]): 1d20 + metade do nível + atributo + outros bônus.
   O bônus de treino é a metade do nível, só para perícia treinada. Perícia não treinada usa
   um valor reduzido que não foi confirmado: o app mostra só o atributo e marca o aviso. */
const T20_TREINO_FONTE = "[E] e [T]: 1d20 + metade do nível + atributo (treinada). Valor de não treinada: NÃO VERIFICADO";

/* ---- Raças ----
   ajustes: null = NÃO VERIFICADO (o usuário lança manualmente no passo de atributos).
   deslocamento em metros. tamanho: "Médio" | "Pequeno" | null (NÃO VERIFICADO). */
const T20_RACAS = {
  humano: {
    nome: "Humano", tamanho: "Médio", deslocamento: 9, ajustes: null, extraPericiasTreinadas: 2,
    habilidades: [{ nome: "Versátil", efeito: "Treinado em duas perícias à sua escolha (pode trocar uma delas por um poder geral)." }],
    fonte: "[E] página Humano (habilidade Versátil); ajustes e tamanho: NÃO VERIFICADO", verificado: false
  },
  anao: {
    nome: "Anão", tamanho: null, deslocamento: 9, ajustes: null, extraPericiasTreinadas: 0,
    habilidades: [{ nome: "Conhecimento das Rochas", efeito: "Visão no escuro." }],
    fonte: "[I] livro básico p. 20 (visão no escuro); ajustes, tamanho e deslocamento: NÃO VERIFICADO", verificado: false
  },
  elfo: {
    nome: "Elfo", tamanho: null, deslocamento: 9, ajustes: null, extraPericiasTreinadas: 0,
    habilidades: [{ nome: "Sentidos Élficos", efeito: "Visão na penumbra." }],
    fonte: "[I] livro básico p. 22 (visão na penumbra); ajustes, tamanho e deslocamento: NÃO VERIFICADO", verificado: false
  },
  minotauro: {
    nome: "Minotauro", tamanho: null, deslocamento: 9, ajustes: { forca: 2, constituicao: 1, sabedoria: -1 }, extraPericiasTreinadas: 0,
    habilidades: [],
    fonte: "[I] livro básico p. 25 (Força +2, Constituição +1, Sabedoria -1); 1 fonte. Habilidades raciais: NÃO VERIFICADO", verificado: false
  },
  hynne: {
    nome: "Hynne", tamanho: "Pequeno", deslocamento: 6, ajustes: null, extraPericiasTreinadas: 0,
    habilidades: [{ nome: "Pequeno e Rechonchudo", efeito: "Você é Pequeno e tem deslocamento de 6 m." }],
    fonte: "[I] livro básico p. 28 (Pequeno, 6 m); ajustes: NÃO VERIFICADO", verificado: false
  }
};

/* ---- Origens (35) ----
   Cada origem dá dois benefícios à escolha (perícias ou poderes) [R]. Os benefícios específicos de cada
   origem não foram verificados: o usuário escolhe. Lista de nomes: [E]. */
const T20_ORIGENS = [
  "Acólito", "Amigo dos animais", "Amnésico", "Aristocrata", "Artesão", "Artista", "Assistente de laboratório",
  "Batedor", "Capanga", "Charlatão", "Circense", "Criminoso", "Curandeiro", "Eremita", "Escravo", "Estudioso",
  "Fazendeiro", "Forasteiro", "Gladiador", "Guarda", "Herdeiro", "Herói camponês", "Marujo", "Mateiro",
  "Membro de guilda", "Mercador", "Minerador", "Nômade", "Pivete", "Refugiado", "Seguidor", "Selvagem",
  "Soldado", "Taverneiro", "Trabalhador"
];
const T20_ORIGEM_FONTE = "[E] lista das 35 origens (nomes); [R] dois benefícios à escolha. Benefícios específicos de cada origem: NÃO VERIFICADO";

/* ---- Classes (14, livro básico) ----
   fixas: perícias treinadas automáticas. grupoFixo: uma entre as opções (ex.: Guerreiro).
   periciasPorNivel: perícias livres por nível. magiasNivel1: magias conhecidas no 1º nível (conjuradores).
   verificado: PV e PM confirmados em duas fontes (true) ou só em uma / em conflito (false).
   pvInicial/pvNivel null = em conflito entre fontes: não calculado. */
const T20_CLASSES = {
  arcanista: {
    nome: "Arcanista", cor: "#2f45a8", conjurador: true, atributoMagiaOpcoes: ["inteligencia", "carisma"], atributoMagiaPadrao: "inteligencia",
    pvInicial: 8, pvNivel: 2, pmNivel: 6, magiasNivel1: 3, fixas: ["Misticismo", "Vontade"], grupoFixo: null, periciasPorNivel: 2, forte: "Vontade",
    verificadoPv: true, fontePv: "[R] e [E] (PV 8 + CON, +2 por nível; PM +6 por nível); 2 fontes concordam",
    verificadoPericias: true, fontePericias: "[R] fixas Misticismo e Vontade, mais 2 à escolha; [E] +2 por nível",
    fonteMagias: "[E] três magias de 1º círculo no início (1 fonte); [R] não informa", verificadoMagias: false
  },
  barbaro: {
    nome: "Bárbaro", cor: "#9a2a14", conjurador: false, pvInicial: 24, pvNivel: 6, pmNivel: 3, fixas: [], grupoFixo: null, periciasPorNivel: 4, forte: "Fortitude",
    verificadoPv: false, fontePv: "[E] PV 24, +6 por nível, PM +3 (1 fonte)",
    verificadoPericias: false, fontePericias: "[E] +4 por nível (1 fonte); perícias fixas NÃO VERIFICADO", magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  bardo: {
    nome: "Bardo", cor: "#8c2f6b", conjurador: true, atributoMagiaOpcoes: ["carisma"], atributoMagiaPadrao: "carisma",
    pvInicial: null, pvNivel: null, pmNivel: 4, magiasNivel1: 2, fixas: ["Atuação", "Reflexos"], grupoFixo: null, periciasPorNivel: 6, forte: "Reflexos",
    verificadoPv: false, fontePv: "CONFLITO: [R] PV 12 + CON, +3 por nível; [E] PV 16, +4 por nível. Não calculado.",
    verificadoPericias: true, fontePericias: "[R] Atuação e Reflexos fixas, mais 6 à escolha; [E] +6 por nível",
    fonteMagias: "[R] duas magias de 1º círculo (1 fonte)", verificadoMagias: false
  },
  bucaneiro: {
    nome: "Bucaneiro", cor: "#7a4a1a", conjurador: false, pvInicial: 16, pvNivel: 4, pmNivel: 3, fixas: [], grupoFixo: null, periciasPorNivel: 4, forte: "Reflexos",
    verificadoPv: false, fontePv: "[E] PV 16, +4 por nível, PM +3 (1 fonte)",
    verificadoPericias: false, fontePericias: "[E] +4 por nível (1 fonte); perícias fixas NÃO VERIFICADO", magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  cacador: {
    nome: "Caçador", cor: "#1f5a6b", conjurador: false, pvInicial: 16, pvNivel: 4, pmNivel: 4, fixas: [], grupoFixo: null, periciasPorNivel: 6, forte: "Reflexos",
    verificadoPv: false, fontePv: "[E] PV 16, +4 por nível, PM +4 (1 fonte)",
    verificadoPericias: false, fontePericias: "[E] +6 por nível (1 fonte); perícias fixas NÃO VERIFICADO", magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  cavaleiro: {
    nome: "Cavaleiro", cor: "#6b4f1d", conjurador: false, pvInicial: 20, pvNivel: 5, pmNivel: 3, fixas: ["Fortitude", "Luta"], grupoFixo: null, periciasPorNivel: 2, forte: "Fortitude",
    verificadoPv: true, fontePv: "[R] e [E] (PV 20 + CON, +5 por nível; PM +3); 2 fontes concordam",
    verificadoPericias: true, fontePericias: "[R] fixas Fortitude e Luta; [E] +2 por nível",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  clerigo: {
    nome: "Clérigo", cor: "#7a5a00", conjurador: true, atributoMagiaOpcoes: ["sabedoria"], atributoMagiaPadrao: "sabedoria",
    pvInicial: 16, pvNivel: 4, pmNivel: 5, magiasNivel1: 3, fixas: ["Religião", "Vontade"], grupoFixo: null, periciasPorNivel: 2, forte: null,
    verificadoPv: true, fontePv: "[R] e [E] (PV 16 + CON, +4 por nível; PM +5 por nível + SAB); 2 fontes concordam",
    verificadoPericias: true, fontePericias: "[R] fixas Religião e Vontade, mais 2 à escolha; [E] +2 por nível",
    fonteMagias: "[T] três magias divinas de 1º círculo no início; [E] confirma três (2 fontes)", verificadoMagias: true,
    resistenciaForteNota: "NÃO VERIFICADO"
  },
  druida: {
    nome: "Druida", cor: "#2f6b2a", conjurador: true, atributoMagiaOpcoes: ["sabedoria"], atributoMagiaPadrao: "sabedoria",
    pvInicial: 16, pvNivel: 4, pmNivel: 4, magiasNivel1: 2, fixas: [], grupoFixo: null, periciasPorNivel: 4, forte: "Vontade",
    verificadoPv: true, fontePv: "[R] e [E] (PV 16 + CON, +4 por nível; PM +4 por nível); 2 fontes concordam",
    verificadoPericias: false, fontePericias: "[E] +4 por nível (1 fonte); perícias fixas NÃO VERIFICADO",
    fonteMagias: "[R] duas magias de 1º círculo (1 fonte)", verificadoMagias: false
  },
  guerreiro: {
    nome: "Guerreiro", cor: "#475569", conjurador: false, pvInicial: 20, pvNivel: 5, pmNivel: 3, fixas: ["Fortitude"],
    grupoFixo: { opcoes: ["Luta", "Pontaria"], qtd: 1 }, periciasPorNivel: 2, forte: "Fortitude",
    verificadoPv: true, fontePv: "[R] e [E] (PV 20 + CON, +5 por nível; PM +3); 2 fontes concordam",
    verificadoPericias: true, fontePericias: "[R] Fortitude, Luta ou Pontaria, mais 2 à escolha; [E] +2 por nível",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  inventor: {
    nome: "Inventor", cor: "#5b5b2e", conjurador: false, pvInicial: 12, pvNivel: 3, pmNivel: 4, fixas: [], grupoFixo: null, periciasPorNivel: 4, forte: "Vontade",
    verificadoPv: false, fontePv: "[E] PV 12, +3 por nível, PM +4 (1 fonte)",
    verificadoPericias: false, fontePericias: "[E] +4 por nível (1 fonte); perícias fixas NÃO VERIFICADO", magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  ladino: {
    nome: "Ladino", cor: "#334155", conjurador: false, pvInicial: 12, pvNivel: 3, pmNivel: 4, fixas: [], grupoFixo: null, periciasPorNivel: 8, forte: "Reflexos",
    verificadoPv: false, fontePv: "[E] PV 12, +3 por nível, PM +4 (1 fonte)",
    verificadoPericias: false, fontePericias: "[E] +8 por nível (1 fonte); perícias fixas NÃO VERIFICADO", magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  lutador: {
    nome: "Lutador", cor: "#8a3b12", conjurador: false, pvInicial: 20, pvNivel: 5, pmNivel: 3, fixas: [], grupoFixo: null, periciasPorNivel: 4, forte: "Fortitude",
    verificadoPv: false, fontePv: "[E] PV 20, +5 por nível, PM +3 (1 fonte)",
    verificadoPericias: false, fontePericias: "[E] +4 por nível (1 fonte); perícias fixas NÃO VERIFICADO", magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  nobre: {
    nome: "Nobre", cor: "#7a2e4f", conjurador: false, pvInicial: 12, pvNivel: 3, pmNivel: 4, fixas: [], grupoFixo: null, periciasPorNivel: 4, forte: "Vontade",
    verificadoPv: false, fontePv: "[E] PV 12, +3 por nível, PM +4 (1 fonte)",
    verificadoPericias: false, fontePericias: "[E] +4 por nível (1 fonte); perícias fixas NÃO VERIFICADO", magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  paladino: {
    nome: "Paladino", cor: "#8a5200", conjurador: false, pvInicial: 20, pvNivel: 5, pmNivel: 4, fixas: [], grupoFixo: null, periciasPorNivel: 2, forte: null,
    verificadoPv: false, fontePv: "[E] PV 20, +5 por nível, PM +4 (1 fonte)",
    verificadoPericias: false, fontePericias: "[E] +2 por nível (1 fonte); perícias fixas NÃO VERIFICADO", magiasNivel1: 0, fonteMagias: "não conjurador no 1º nível (magia pelo poder Orar, nível 2; 1 fonte)"
  }
};
const T20_CLASSE_IDS = Object.keys(T20_CLASSES);

/* Círculos de magia por nível de personagem. fonte: [R] Bardo e Druida (dois artigos, mesmo site).
   Generalizado para todos os conjuradores: a generalização não foi confirmada para Arcanista e Clérigo. */
const T20_CIRCULOS = [
  { nivel: 1, circulo: 1 }, { nivel: 6, circulo: 2 }, { nivel: 10, circulo: 3 }, { nivel: 14, circulo: 4 }
];
const T20_CIRCULOS_FONTE = "[R] artigos de Bardo e Druida: 2º no 6º nível, 3º no 10º, 4º no 14º. Generalização a todos os conjuradores: NÃO VERIFICADO";

/* Níveis do app: 1 a 5 (escopo desta entrega). */
const T20_NIVEL_MIN = 1;
const T20_NIVEL_MAX = 5;

/* Valores padrão e bônus de dinheiro: NÃO VERIFICADO (o livro define; não foi confirmado). */
const T20_DINHEIRO_FONTE = "Dinheiro inicial (T$): NÃO VERIFICADO. O app não sugere valor.";
const T20_DEFESA_FONTE = "[T] Defesa = 10 + Destreza + bônus de armadura + bônus de escudo + outros; 1 fonte";
const T20_PV_FONTE = "[R] PV = PV inicial + CON no 1º nível; a cada nível soma PV por nível + CON (CON conta em todos os níveis)";
const T20_PM_FONTE = "[R] PM = PM por nível × nível; conjuradores somam o atributo-chave ao total (verificado no 1º nível)";
