/* Tormenta20 (Jambô, Edição Jogo do Ano) — dados de regra.
   Cada item leva `fonte`. "NÃO VERIFICADO" = não confirmado em duas fontes públicas: o sistema mostra o aviso
   e a lacuna está listada em docs/AUDITORIA_TORMENTA20.md e docs/VERIFICACAO_TORMENTA20.md. Guarda só mecânica e
   descrições curtas próprias.
   Fontes consultadas (fãs e blogs; o livro e a ficha oficial da Jambô não puderam ser abertos):
     [R] Rotina de Mestre — guias "Como criar sua ficha em Tormenta 20", guias de Ladino e Bardo, "Livro de Tormenta 20 vale a pena"
     [E] exegetadearton.com.br — uma página por classe, lista de perícias, origens e raças (declara vir da Tormenta Collab Wiki)
     [T] timEU (guia básico de Tormenta20) — exemplos de personagem nível 1 e compra de atributos
     [I] issue #57 do repositório DMBerlin/t20-community-patches (GitHub) — cita páginas do livro básico (p. 20, 22, 25, 28)
   Revisão independente de 2026-11-17 (docs/VERIFICACAO_TORMENTA20.md): tsrd.fandom e tormenta-collab não abriram;
   o que dependia só deles ficou NÃO VERIFICADO. */

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
   Revisão 2026-11-17: total 10 e início em 0 confirmados em [R] e [T]. A tabela de custos aparece só em [R]
   (1 fonte): verificado: false. */
const T20_PONTOS_COMPRA = { total: 10, minimo: -1, maximo: 4, verificado: false,
  fonte: "Total 10 e início em 0: [R] Rotina de Mestre e [T] timEU (2 fontes). Tabela de custos (valor -1 dá +1 ponto; 0 a 4 custam 0, 1, 2, 4, 7): só [R] (1 fonte): NÃO VERIFICADO",
  custos: { "-1": -1, "0": 0, "1": 1, "2": 2, "3": 4, "4": 7 } };

/* Modificador de atributo = valor do atributo (T20). fonte: [R] e [T] ("o valor é usado como modificador"). */
const T20_MODIFICADOR_FONTE = "[R] e [T] (modificador igual ao valor do atributo); 2 fontes, sem o livro";

/* ---- Perícias (31) ----
   attr: atributo-chave da perícia. soTreinado: só pode ser usada treinada.
   penalidadeArmadura: penalidade de armadura. fonte: [E] lista de perícias por atributo.
   Revisão 2026-11-17: a lista (31 perícias, atributos, 6 só-treinadas e 3 com penalidade) confere com a
   página de perícias da [E]. Só uma fonte: a lista é o dado mais estável, mas segue com 1 fonte. */
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
const T20_PERICIA_FONTE = "[E] lista das 31 perícias, atributo-chave, 6 só treinadas e 3 com penalidade de armadura (1 fonte, confere em duas consultas). Bônus de treino: [R] metade do nível (1 fonte)";

/* Regra do teste de perícia e valor de não treinada.
   Revisão 2026-11-17: CONFLITO. [E] diz que o teste soma metade do nível e "o bônus de treinamento quando houver";
   [R] diz que a treinada usa o bônus cheio e a não treinada um "valor reduzido". O app soma metade do nível só
   na treinada e não soma nada na não treinada. Nenhuma fonte deu o valor exato da não treinada: NÃO VERIFICADO. */
const T20_TREINO_FONTE = "CONFLITO: [E] e [R] sugerem que a não treinada também usa parte do nível; o app não soma nada. Valor exato de não treinada: NÃO VERIFICADO";

/* ---- Raças ----
   ajustes: null = NÃO VERIFICADO (o usuário lança manualmente no passo de atributos).
   deslocamento em metros. tamanho: "Médio" | "Pequeno" | null (NÃO VERIFICADO).
   Revisão 2026-11-17: o livro básico tem 17 raças jogáveis [R]; o app cobre 6. Minotauro, Hynne, Anão e Elfo
   só têm uma fonte ([I]), que bate com os valores aqui. Humano: sem fonte para os ajustes. */
const T20_RACAS = {
  humano: {
    nome: "Humano", tamanho: "Médio", deslocamento: 9, ajustes: null, extraPericiasTreinadas: 2,
    habilidades: [{ nome: "Versátil", efeito: "Treinado em duas perícias à sua escolha (pode trocar uma delas por um poder geral)." }],
    fonte: "[E] página Humano (habilidade Versátil); ajustes e tamanho: NÃO VERIFICADO", verificado: false
  },
  anao: {
    nome: "Anão", tamanho: null, deslocamento: 9, ajustes: null, extraPericiasTreinadas: 0,
    habilidades: [{ nome: "Conhecimento das Rochas", efeito: "Visão no escuro." }],
    fonte: "[I] livro básico p. 20 (visão no escuro; a issue também cita +2 em Percepção e Sobrevivência no subterrâneo, não modelado); 1 fonte. Ajustes, tamanho e deslocamento: NÃO VERIFICADO", verificado: false
  },
  elfo: {
    nome: "Elfo", tamanho: null, deslocamento: 9, ajustes: null, extraPericiasTreinadas: 0,
    habilidades: [{ nome: "Sentidos Élficos", efeito: "Visão na penumbra." }],
    fonte: "[I] livro básico p. 22 (visão na penumbra; a issue também cita +2 em Misticismo e Percepção, não modelado); 1 fonte. Ajustes, tamanho e deslocamento: NÃO VERIFICADO", verificado: false
  },
  minotauro: {
    nome: "Minotauro", tamanho: null, deslocamento: 9, ajustes: { forca: 2, constituicao: 1, sabedoria: -1 }, extraPericiasTreinadas: 0,
    habilidades: [],
    fonte: "[I] livro básico p. 25 (Força +2, Constituição +1, Sabedoria -1); 1 fonte. Habilidades raciais: NÃO VERIFICADO", verificado: false
  },
  hynne: {
    nome: "Hynne", tamanho: "Pequeno", deslocamento: 6, ajustes: null, extraPericiasTreinadas: 0,
    habilidades: [{ nome: "Pequeno e Rechonchudo", efeito: "Você é Pequeno e tem deslocamento de 6 m." }],
    fonte: "[I] livro básico p. 28 e p. 106 (Pequeno, 6 m; a issue também cita +2 em Enganação, não modelado); 1 fonte. Ajustes: NÃO VERIFICADO", verificado: false
  }
};

/* ---- Origens (35) ----
   Cada origem dá benefícios (perícias ou poderes). Lista de nomes: [E] (confere com a lista da página de origens).
   Revisão 2026-11-17: CONFLITO no formato dos benefícios. [E] diz que a origem dá duas perícias e um poder de
   origem OU um conjunto de itens iniciais; [R] fala em dois benefícios à escolha. O app deixa o jogador escolher.
   Benefícios específicos de cada origem: NÃO VERIFICADO. */
const T20_ORIGENS = [
  "Acólito", "Amigo dos animais", "Amnésico", "Aristocrata", "Artesão", "Artista", "Assistente de laboratório",
  "Batedor", "Capanga", "Charlatão", "Circense", "Criminoso", "Curandeiro", "Eremita", "Escravo", "Estudioso",
  "Fazendeiro", "Forasteiro", "Gladiador", "Guarda", "Herdeiro", "Herói camponês", "Marujo", "Mateiro",
  "Membro de guilda", "Mercador", "Minerador", "Nômade", "Pivete", "Refugiado", "Seguidor", "Selvagem",
  "Soldado", "Taverneiro", "Trabalhador"
];
const T20_ORIGEM_FONTE = "[E] lista das 35 origens de Tormenta20 (nomes; 1 fonte). CONFLITO no formato dos benefícios: [E] duas perícias + poder de origem ou itens; [R] dois benefícios à escolha. Benefícios específicos de cada origem: NÃO VERIFICADO";

/* ---- Classes (14, livro básico) ----
   Revisão 2026-11-17: as 14 classes conferem (páginas da [E] e a contagem de 14 classes da [R]).
   fixas: perícias treinadas automáticas. grupoFixo: uma entre as opções (ex.: Guerreiro).
   periciasPorNivel: perícias livres por nível (conforme [E]). magiasNivel1: magias conhecidas no 1º nível (conjuradores).
   verificadoPv / verificadoPericias / verificadoMagias: true só quando duas fontes confirmam o dado.
   pvInicial/pvNivel null = em conflito entre fontes: não calculado. */
const T20_CLASSES = {
  arcanista: {
    nome: "Arcanista", cor: "#2f45a8", conjurador: true, atributoMagiaOpcoes: ["inteligencia", "carisma"], atributoMagiaPadrao: "inteligencia",
    pvInicial: 8, pvNivel: 2, pmNivel: 6, magiasNivel1: 3, fixas: ["Misticismo", "Vontade"], grupoFixo: null, periciasPorNivel: 2, forte: "Vontade",
    verificadoPv: true, fontePv: "[E] PV 8 + CON, +2 por nível; PM +6 por nível. Exemplo de nível 1 do timEU (8 PV) confere. A segunda fonte da auditoria anterior (Rotina) não foi reconferida",
    verificadoPericias: false, fontePericias: "[E] +2 por nível (1 fonte). Fixas Misticismo e Vontade não aparecem na [E]: NÃO VERIFICADO em 2 fontes",
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
    verificadoPv: false, fontePv: "CONFLITO: [R] Rotina de Mestre (guia do Bardo) 12 + CON, +3 por nível; [E] exegetadearton 16, +4 por nível. PM +4 por nível confere nas duas. Não calculado.",
    verificadoPericias: false, fontePericias: "[R] fixas Atuação e Reflexos; [E] não lista fixas, e o +6 por nível só aparece na [E] (Rotina não informa). NÃO VERIFICADO em 2 fontes",
    fonteMagias: "[R] e [E]: duas magias de 1º círculo no início (2 fontes)", verificadoMagias: true
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
    verificadoPv: false, fontePv: "[E] PV 20 + CON, +5 por nível; PM +3 (1 fonte). A segunda fonte da auditoria anterior não foi reconferida: NÃO VERIFICADO em 2 fontes",
    verificadoPericias: false, fontePericias: "[E] +2 por nível (1 fonte). Fixas Fortitude e Luta não aparecem na [E]: NÃO VERIFICADO em 2 fontes",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  clerigo: {
    nome: "Clérigo", cor: "#7a5a00", conjurador: true, atributoMagiaOpcoes: ["sabedoria"], atributoMagiaPadrao: "sabedoria",
    pvInicial: 16, pvNivel: 4, pmNivel: 5, magiasNivel1: 3, fixas: ["Religião", "Vontade"], grupoFixo: null, periciasPorNivel: 2, forte: null,
    verificadoPv: true, fontePv: "[E] PV 16 + CON, +4 por nível; PM +5 por nível + SAB. [R] guia 'Como criar sua ficha': exemplo de clérigo nível 1 com 16 PV e 5 PM + SAB (9 PM com SAB +4); 2 fontes",
    verificadoPericias: false, fontePericias: "[E] +2 por nível (1 fonte). Fixas Religião e Vontade não aparecem na [E]: NÃO VERIFICADO em 2 fontes",
    fonteMagias: "[E] e [T] (timEU): três magias divinas de 1º círculo no início (2 fontes)", verificadoMagias: true,
    resistenciaForteNota: "NÃO VERIFICADO"
  },
  druida: {
    nome: "Druida", cor: "#2f6b2a", conjurador: true, atributoMagiaOpcoes: ["sabedoria"], atributoMagiaPadrao: "sabedoria",
    pvInicial: 16, pvNivel: 4, pmNivel: 4, magiasNivel1: 2, fixas: [], grupoFixo: null, periciasPorNivel: 4, forte: "Vontade",
    verificadoPv: false, fontePv: "[E] PV 16 + CON, +4 por nível; PM +4 por nível (1 fonte). A segunda fonte da auditoria anterior não foi reconferida: NÃO VERIFICADO em 2 fontes",
    verificadoPericias: false, fontePericias: "[E] +4 por nível (1 fonte); perícias fixas NÃO VERIFICADO",
    fonteMagias: "[E] duas magias de 1º círculo (1 fonte)", verificadoMagias: false
  },
  guerreiro: {
    nome: "Guerreiro", cor: "#475569", conjurador: false, pvInicial: 20, pvNivel: 5, pmNivel: 3, fixas: ["Fortitude"],
    grupoFixo: { opcoes: ["Luta", "Pontaria"], qtd: 1 }, periciasPorNivel: 2, forte: "Fortitude",
    verificadoPv: false, fontePv: "CONFLITO: [E] PV 20 + CON, +5 por nível, PM +3. O exemplo de nível 1 do timEU (16 PV e 2 PM) não bate com PV 20 + CON nem com PM 3. NÃO VERIFICADO em 2 fontes",
    verificadoPericias: false, fontePericias: "[E] +2 por nível (1 fonte). Fixas Fortitude e a escolha Luta ou Pontaria não aparecem na [E]: NÃO VERIFICADO em 2 fontes",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  inventor: {
    nome: "Inventor", cor: "#5b5b2e", conjurador: false, pvInicial: 12, pvNivel: 3, pmNivel: 4, fixas: [], grupoFixo: null, periciasPorNivel: 4, forte: "Vontade",
    verificadoPv: false, fontePv: "[E] PV 12, +3 por nível, PM +4 (1 fonte)",
    verificadoPericias: false, fontePericias: "[E] +4 por nível (1 fonte); perícias fixas NÃO VERIFICADO", magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  ladino: {
    nome: "Ladino", cor: "#334155", conjurador: false, pvInicial: 12, pvNivel: 3, pmNivel: 4, fixas: [], grupoFixo: null, periciasPorNivel: 8, forte: "Reflexos",
    verificadoPv: true, fontePv: "[E] PV 12 + CON, +3 por nível, PM +4 por nível; [R] guia do Ladino da Rotina de Mestre com os mesmos valores (2 fontes; a [E] declara vir da Tormenta Collab Wiki, então a independência é parcial)",
    verificadoPericias: false, fontePericias: "CONFLITO: [E] +8 por nível; [R] 8 à escolha, sem dizer que repete por nível. Fixas: [R] Ladinagem e Reflexos; [E] não lista fixas. Ladinagem está como só treinada. NÃO VERIFICADO",
    magiasNivel1: 0, fonteMagias: "não conjurador"
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
const T20_CIRCULOS_FONTE = "NÃO VERIFICADO nesta revisão: a progressão veio dos artigos da Rotina (Bardo e Druida), que não foram reabertos; o guia 'Como criar sua ficha' e o timEU não trazem a tabela. Generalização a todos os conjuradores: NÃO VERIFICADO";

/* Níveis do app: 1 a 5 (escopo desta entrega). */
const T20_NIVEL_MIN = 1;
const T20_NIVEL_MAX = 5;

/* Valores padrão e bônus de dinheiro: NÃO VERIFICADO (o livro define; não foi confirmado). */
const T20_DINHEIRO_FONTE = "Dinheiro inicial (T$): NÃO VERIFICADO. O app não sugere valor (um guia da [R] sugere cerca de 15 T$ como prática de mesa, não como regra).";
const T20_DEFESA_FONTE = "[R] Defesa = 10 + Destreza + bônus de armadura + bônus de escudo (1 fonte com a fórmula). [T] define Defesa e traz exemplos compatíveis, sem a fórmula. Segunda fonte: NÃO VERIFICADO";
const T20_PV_FONTE = "[R] PV = PV inicial + CON no 1º nível; a cada nível soma PV por nível + CON (CON conta em todos os níveis)";
const T20_PM_FONTE = "[R] PM = PM por nível × nível; conjuradores somam o atributo-chave ao total (exemplo de clérigo no 1º nível)";
