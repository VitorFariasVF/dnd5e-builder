/* Tormenta20 (Jambô, Edição Jogo do Ano) — dados de regra.
   Cada item leva `fonte`. Fonte primária desta revisão (2026-11-17): o livro-base do usuário, lido página a página
   (texto limpo em /tmp/t20/pNNN.txt; cita-se "Tormenta20 Jogo do Ano, pNNN (livro do usuário)"; pNNN é a página do PDF,
   não a página impressa). Os dados que o livro confirma ficam com verificado: true. "NÃO VERIFICADO" = o livro não traz o dado.
   Fontes antigas (fãs, [E] exegetadearton, [R] Rotina de Mestre, [T] timEU, [I] issue #57) saem como referência secundária
   e só aparecem onde o livro não diz nada. Guarda só mecânica e descrições curtas próprias.
   Relatório da revisão: docs/TRABALHO_T20_CLASSES.md. */

const T20_SISTEMA = "tormenta20";
const T20_VERSAO_ESQUEMA = 2;
const T20_VERSAO_ESQUEMA_ANTERIOR = 1;   // backups do esquema 1 ainda são importados (state.js completa os campos novos)
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

/* Compra de atributos (p023, "Definindo seus atributos" e Tabela 1-1): 10 pontos, todos começam em 0.
   Valor -1 dá 1 ponto extra; custos por valor final: 0 = 0, 1 = 1, 2 = 2, 3 = 4, 4 = 7. Confirmado no livro. */
const T20_PONTOS_COMPRA = { total: 10, minimo: -1, maximo: 4, verificado: true,
  fonte: "Tormenta20 Jogo do Ano, p023 (livro do usuário): 10 pontos, início em 0, -1 dá 1 ponto; Tabela 1-1 com custos 0, 1, 2, 4, 7",
  custos: { "-1": -1, "0": 0, "1": 1, "2": 2, "3": 4, "4": 7 } };

/* Modificador de atributo = valor do atributo. Confirmado no livro: p023 (Força/Carisma "aplicados em" testes) e
   p120 (exemplo: Força 4 soma +4 à perícia). */
const T20_MODIFICADOR_FONTE = "Tormenta20 Jogo do Ano, p023 e p120 (livro do usuário): o valor do atributo é somado diretamente";

/* ---- Perícias (29) ----
   Lista e atributo-chave: índice de perícias, Tormenta20 Jogo do Ano, p121 (livro do usuário).
   soTreinado: marcada "Treinada" no índice da p121 e nas descrições (p122-p128).
   penalidadeArmadura: marcada "Armadura" no índice (p121) e nas descrições (p125, p126).
   Medicina NÃO é perícia no livro: é poder geral (p132, p136). Artes não existe no livro. */
const T20_PERICIAS = [
  { nome: "Acrobacia", attr: "destreza", penalidadeArmadura: true },
  { nome: "Adestramento", attr: "carisma", soTreinado: true },
  { nome: "Atletismo", attr: "forca" },
  { nome: "Atuação", attr: "carisma", soTreinado: true },
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
  { nome: "Jogatina", attr: "carisma", soTreinado: true },
  { nome: "Ladinagem", attr: "destreza", soTreinado: true, penalidadeArmadura: true },
  { nome: "Luta", attr: "forca" },
  { nome: "Misticismo", attr: "inteligencia", soTreinado: true },
  { nome: "Nobreza", attr: "inteligencia", soTreinado: true },
  { nome: "Ofício", attr: "inteligencia", soTreinado: true },
  { nome: "Percepção", attr: "sabedoria" },
  { nome: "Pilotagem", attr: "destreza", soTreinado: true },
  { nome: "Pontaria", attr: "destreza" },
  { nome: "Reflexos", attr: "destreza" },
  { nome: "Religião", attr: "sabedoria", soTreinado: true },
  { nome: "Sobrevivência", attr: "sabedoria" },
  { nome: "Vontade", attr: "sabedoria" }
];
const T20_PERICIA_NOMES = T20_PERICIAS.map(p => p.nome);
const T20_PERICIA_FONTE = "Tormenta20 Jogo do Ano, p121 (índice: atributo, Treinada e Armadura) e p120-p129 (descrições). 29 perícias (livro do usuário)";

/* Valor de perícia (p120, "Valor de Perícia"): metade do nível (arredondada para baixo) + atributo-chave,
   e, se treinada, o bônus de treinamento. Confirmado no livro. */
const T20_TREINO_FONTE = "Tormenta20 Jogo do Ano, p120 e p041 (livro do usuário): valor de perícia = metade do nível (para baixo) + atributo-chave + bônus de treinamento (se treinado). Não treinada usa só a metade";

/* Bônus de treinamento por faixa de nível (p120, nota da fórmula): +2 do 1º ao 6º, +4 do 7º ao 14º, +6 do 15º em diante. */
const T20_BONUS_TREINAMENTO = [
  { nivel: 1, bonus: 2 }, { nivel: 7, bonus: 4 }, { nivel: 15, bonus: 6 }
];
const T20_BONUS_TREINAMENTO_FONTE = "Tormenta20 Jogo do Ano, p120 (livro do usuário): +2 do 1º ao 6º nível, +4 do 7º ao 14º, +6 do 15º em diante";

/* ---- Raças ----
   A lista de raças (17, do livro básico) está em rules-racas.js (T20_RACAS_COMPLETAS). Esta tabela
   foi substituída por ela: não há mais um T20_RACAS aqui, para não haver dois cadastros divergentes. */

/* ---- Origens (35) ----
   Nomes e benefícios: Tormenta20 Jogo do Ano, p091 (regras de benefícios) e Tabela 1-19, p093 (livro do usuário).
   Regra: escolha DOIS benefícios da lista (duas perícias, dois poderes, ou uma perícia e um poder). O poder único
   da origem é um dos benefícios. Os nomes abaixo usam a grafia do app (salvo fichas usam esta grafia): o livro
   escreve "Amigo dos Animais", "Assistente de Laboratório", "Herói Camponês" e "Membro de Guilda" com maiúsculas. */
const T20_ORIGENS = [
  "Acólito", "Amigo dos animais", "Amnésico", "Aristocrata", "Artesão", "Artista", "Assistente de laboratório",
  "Batedor", "Capanga", "Charlatão", "Circense", "Criminoso", "Curandeiro", "Eremita", "Escravo", "Estudioso",
  "Fazendeiro", "Forasteiro", "Gladiador", "Guarda", "Herdeiro", "Herói camponês", "Marujo", "Mateiro",
  "Membro de guilda", "Mercador", "Minerador", "Nômade", "Pivete", "Refugiado", "Seguidor", "Selvagem",
  "Soldado", "Taverneiro", "Trabalhador"
];
/* pericias: perícias concedidas. poderes: poderes concedidos (nome do livro). Os textos entre aspas do livro
   que dependem de escolha ("um poder de combate a sua escolha", "um poder da Tormenta") ficam como texto. */
const T20_ORIGENS_BENEFICIOS = {
  "Acólito": { pericias: ["Cura", "Religião", "Vontade"], poderes: ["Medicina", "Membro da Igreja", "Vontade de Ferro"] },
  "Amigo dos animais": { pericias: ["Adestramento", "Cavalgar"], poderes: ["Amigo Especial"] },
  "Amnésico": { pericias: [], poderes: ["Lembranças Graduais"], nota: "uma perícia e um poder escolhidos pelo mestre, além de Lembranças Graduais" },
  "Aristocrata": { pericias: ["Diplomacia", "Enganação", "Nobreza"], poderes: ["Comandar", "Sangue Azul"] },
  "Artesão": { pericias: ["Ofício", "Vontade"], poderes: ["Frutos do Trabalho", "Sortudo"] },
  "Artista": { pericias: ["Atuação", "Enganação"], poderes: ["Atraente", "Dom Artístico", "Sortudo", "Torcida"] },
  "Assistente de laboratório": { pericias: ["Ofício (alquimista)", "Misticismo"], poderes: ["Esse Cheiro...", "Venefício", "um poder da Tormenta à escolha"] },
  "Batedor": { pericias: ["Furtividade", "Percepção", "Sobrevivência"], poderes: ["À Prova de Tudo", "Estilo de Disparo", "Sentidos Aguçados"] },
  "Capanga": { pericias: ["Luta", "Intimidação"], poderes: ["Confissão", "um poder de combate à escolha"] },
  "Charlatão": { pericias: ["Enganação", "Jogatina"], poderes: ["Alpinista Social", "Aparência Inofensiva", "Sortudo"] },
  "Circense": { pericias: ["Acrobacia", "Atuação", "Reflexos"], poderes: ["Acrobático", "Torcida", "Truque de Mágica"] },
  "Criminoso": { pericias: ["Enganação", "Furtividade", "Ladinagem"], poderes: ["Punguista", "Venefício"] },
  "Curandeiro": { pericias: ["Cura", "Vontade"], poderes: ["Medicina", "Médico de Campo", "Venefício"] },
  "Eremita": { pericias: ["Misticismo", "Religião", "Sobrevivência"], poderes: ["Busca Interior", "Lobo Solitário"] },
  "Escravo": { pericias: ["Atletismo", "Fortitude", "Furtividade"], poderes: ["Desejo de Liberdade", "Vitalidade"] },
  "Estudioso": { pericias: ["Conhecimento", "Guerra", "Misticismo"], poderes: ["Aparência Inofensiva", "Palpite Fundamentado"] },
  "Fazendeiro": { pericias: ["Adestramento", "Cavalgar", "Ofício (fazendeiro)", "Sobrevivência"], poderes: ["Água no Feijão", "Ginete"] },
  "Forasteiro": { pericias: ["Cavalgar", "Pilotagem", "Sobrevivência"], poderes: ["Cultura Exótica", "Lobo Solitário"] },
  "Gladiador": { pericias: ["Atuação", "Luta"], poderes: ["Atraente", "Pão e Circo", "Torcida", "um poder de combate à escolha"] },
  "Guarda": { pericias: ["Investigação", "Luta", "Percepção"], poderes: ["Detetive", "Investigador", "um poder de combate à escolha"] },
  "Herdeiro": { pericias: ["Misticismo", "Nobreza", "Ofício"], poderes: ["Comandar", "Herança"] },
  "Herói camponês": { pericias: ["Adestramento", "Ofício"], poderes: ["Coração Heroico", "Sortudo", "Surto Heroico", "Torcida"] },
  "Marujo": { pericias: ["Atletismo", "Jogatina", "Pilotagem"], poderes: ["Acrobático", "Passagem de Navio"] },
  "Mateiro": { pericias: ["Atletismo", "Furtividade", "Sobrevivência"], poderes: ["Lobo Solitário", "Sentidos Aguçados", "Vendedor de Carcaças"] },
  "Membro de guilda": { pericias: ["Diplomacia", "Enganação", "Misticismo", "Ofício"], poderes: ["Foco em Perícia", "Rede de Contatos"] },
  "Mercador": { pericias: ["Diplomacia", "Intuição", "Ofício"], poderes: ["Negociação", "Proficiência", "Sortudo"] },
  "Minerador": { pericias: ["Atletismo", "Fortitude", "Ofício (minerador)"], poderes: ["Ataque Poderoso", "Escavador", "Sentidos Aguçados"] },
  "Nômade": { pericias: ["Cavalgar", "Pilotagem", "Sobrevivência"], poderes: ["Lobo Solitário", "Mochileiro", "Sentidos Aguçados"] },
  "Pivete": { pericias: ["Furtividade", "Iniciativa", "Ladinagem"], poderes: ["Acrobático", "Aparência Inofensiva", "Quebra-Galho"] },
  "Refugiado": { pericias: ["Fortitude", "Reflexos", "Vontade"], poderes: ["Estoico", "Vontade de Ferro"] },
  "Seguidor": { pericias: ["Adestramento", "Ofício"], poderes: ["Antigo Mestre", "Proficiência", "Surto Heroico"] },
  "Selvagem": { pericias: ["Percepção", "Reflexos", "Sobrevivência"], poderes: ["Lobo Solitário", "Vida Rústica", "Vitalidade"] },
  "Soldado": { pericias: ["Fortitude", "Guerra", "Luta", "Pontaria"], poderes: ["Influência Militar", "um poder de combate à escolha"] },
  "Taverneiro": { pericias: ["Diplomacia", "Jogatina", "Ofício (cozinheiro)"], poderes: ["Gororoba", "Proficiência", "Vitalidade"] },
  "Trabalhador": { pericias: ["Atletismo", "Fortitude"], poderes: ["Atlético", "Esforçado"] }
};
const T20_ORIGEM_FONTE = "Tormenta20 Jogo do Ano, p091 (escolha de dois benefícios) e p093 (Tabela 1-19: 35 origens com perícias e poderes) (livro do usuário). Efeitos completos dos poderes de origem: fora desta revisão";

/* ---- Classes (14, livro básico) ----
   Fonte primária: Tormenta20 Jogo do Ano, Capítulo 1 (livro do usuário). Página de cada classe: Tabela 1-3 (p038),
   características de classe (p043, p047, p050, p053, p056, p059, p063, p067, p071, p074, p079, p082, p085, p088) e
   tabela de progressão (p043, p047, p050, p053, p056, p059, p063, p067, p071, p074, p079, p082, p085, p088).
   Campos:
     fixas: perícias treinadas automáticas. grupoFixo: uma entre as opções (ex.: Guerreiro: Luta ou Pontaria).
     periciasPorNivel: NOME MANTIDO POR COMPATIBILIDADE COM ui.js. Valor = perícias livres ("mais N" da Tabela 1-3)
       e são ganhas SÓ NO 1º NÍVEL (p038; p120). Subir de nível não dá perícia treinada (p041).
       Pela regra de Inteligência (p023, p120), somam-se Inteligência positiva perícias treinadas, uma vez.
     magiasNivel1: magias conhecidas no 1º nível (conjuradores). Mago (caminho do Arcanista) começa com 4 (p043).
     pvInicial / pvNivel: PV inicial e PV por nível, ambos + CON (p041, p043 etc.).
     pmNivel: PM por nível. Conjurador soma o atributo-chave uma vez no total (p043, p063, p067 etc.).
     pmAtributoNivel1: atributo somado ao PM só no 1º nível (Paladino, p082).
     proficiencias: armas, armaduras e escudos. Todos os personagens têm armas simples e armaduras leves (p038).
     circulos: ver T20_CIRCULOS (abaixo).
     forte: resistência forte. O livro não define por classe nas características de classe: null (NÃO VERIFICADO).
     verificadoPv / verificadoPericias / verificadoMagias: true quando o livro confirma o dado. */
const T20_CLASSES = {
  arcanista: {
    nome: "Arcanista", cor: "#2f45a8", conjurador: true, atributoMagiaOpcoes: ["inteligencia", "carisma"], atributoMagiaPadrao: "inteligencia",
    pvInicial: 8, pvNivel: 2, pmNivel: 6, magiasNivel1: 3, fixas: ["Misticismo", "Vontade"], grupoFixo: null, periciasPorNivel: 2, forte: null,
    proficiencias: ["Nenhuma"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p043 (livro do usuário): 8 PV + CON, 2 PV + CON por nível; 6 PM por nível",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p038 e p043: Misticismo e Vontade, mais 2 a escolher; Inteligência positiva também treina",
    fonteMagias: "Tormenta20 Jogo do Ano, p043: três magias de 1º círculo (Bruxo e Feiticeiro). Mago começa com 4: caminho não modelado",
    verificadoMagias: false
  },
  barbaro: {
    nome: "Bárbaro", cor: "#9a2a14", conjurador: false, pvInicial: 24, pvNivel: 6, pmNivel: 3, fixas: ["Fortitude", "Luta"], grupoFixo: null, periciasPorNivel: 4, forte: null,
    proficiencias: ["Armas marciais", "Escudos"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p047 (livro do usuário): 24 PV + CON, 6 PV + CON por nível; 3 PM por nível",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p047 e p038: Fortitude e Luta, mais 4 a escolher",
    magiasNivel1: 0, fonteMagias: "não conjurador (Totem Espiritual, poder, dá uma magia: não modelado)"
  },
  bardo: {
    nome: "Bardo", cor: "#8c2f6b", conjurador: true, atributoMagiaOpcoes: ["carisma"], atributoMagiaPadrao: "carisma",
    pvInicial: 12, pvNivel: 3, pmNivel: 4, magiasNivel1: 2, fixas: ["Atuação", "Reflexos"], grupoFixo: null, periciasPorNivel: 6, forte: null,
    proficiencias: ["Armas marciais"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p050 (livro do usuário): 12 PV + CON, 3 PV + CON por nível; 4 PM por nível. Resolve o conflito com a fonte [E] (16 e +4), que não confere com o livro",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p050 e p038: Atuação e Reflexos, mais 6 a escolher",
    fonteMagias: "Tormenta20 Jogo do Ano, p050: duas magias de 1º círculo; uma nova em cada nível par (p050)",
    verificadoMagias: true
  },
  bucaneiro: {
    nome: "Bucaneiro", cor: "#7a4a1a", conjurador: false, pvInicial: 16, pvNivel: 4, pmNivel: 3, fixas: ["Reflexos"], grupoFixo: { opcoes: ["Luta", "Pontaria"], qtd: 1 }, periciasPorNivel: 4, forte: null,
    proficiencias: ["Armas marciais"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p053 (livro do usuário): 16 PV + CON, 4 PV + CON por nível; 3 PM por nível",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p053 e p038: Luta ou Pontaria, Reflexos, mais 4 a escolher",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  cacador: {
    nome: "Caçador", cor: "#1f5a6b", conjurador: false, pvInicial: 16, pvNivel: 4, pmNivel: 4, fixas: ["Sobrevivência"], grupoFixo: { opcoes: ["Luta", "Pontaria"], qtd: 1 }, periciasPorNivel: 6, forte: null,
    proficiencias: ["Armas marciais", "Escudos"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p056 (livro do usuário): 16 PV + CON, 4 PV + CON por nível; 4 PM por nível",
    verificadoPericias: false, fontePericias: "CONFLITO NO PRÓPRIO LIVRO: p038 (Tabela 1-3) diz 'mais 4'; p056 (características) diz 'mais 6'. O app usa 6 (texto da classe). Revisar com a errata",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  cavaleiro: {
    nome: "Cavaleiro", cor: "#6b4f1d", conjurador: false, pvInicial: 20, pvNivel: 5, pmNivel: 3, fixas: ["Fortitude", "Luta"], grupoFixo: null, periciasPorNivel: 2, forte: null,
    proficiencias: ["Armas marciais", "Armaduras pesadas", "Escudos"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p059 (livro do usuário): 20 PV + CON, 5 PV + CON por nível; 3 PM por nível",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p059 e p038: Fortitude e Luta, mais 2 a escolher",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  clerigo: {
    nome: "Clérigo", cor: "#7a5a00", conjurador: true, atributoMagiaOpcoes: ["sabedoria"], atributoMagiaPadrao: "sabedoria",
    pvInicial: 16, pvNivel: 4, pmNivel: 5, magiasNivel1: 3, fixas: ["Religião", "Vontade"], grupoFixo: null, periciasPorNivel: 2, forte: null,
    proficiencias: ["Armaduras pesadas", "Escudos"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p063 (livro do usuário): 16 PV + CON, 4 PV + CON por nível; 5 PM por nível + SAB",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p063 e p038: Religião e Vontade, mais 2 a escolher",
    fonteMagias: "Tormenta20 Jogo do Ano, p063: três magias divinas de 1º círculo; uma nova em cada nível (qualquer círculo)",
    verificadoMagias: true
  },
  druida: {
    nome: "Druida", cor: "#2f6b2a", conjurador: true, atributoMagiaOpcoes: ["sabedoria"], atributoMagiaPadrao: "sabedoria",
    pvInicial: 16, pvNivel: 4, pmNivel: 4, magiasNivel1: 2, fixas: ["Sobrevivência", "Vontade"], grupoFixo: null, periciasPorNivel: 4, forte: null,
    proficiencias: ["Escudos"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p067 (livro do usuário): 16 PV + CON, 4 PV + CON por nível; 4 PM por nível + SAB",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p067 e p038: Sobrevivência e Vontade, mais 4 a escolher",
    fonteMagias: "Tormenta20 Jogo do Ano, p067: duas magias de 1º círculo; uma nova em cada nível par",
    verificadoMagias: true
  },
  guerreiro: {
    nome: "Guerreiro", cor: "#475569", conjurador: false, pvInicial: 20, pvNivel: 5, pmNivel: 3, fixas: ["Fortitude"],
    grupoFixo: { opcoes: ["Luta", "Pontaria"], qtd: 1 }, periciasPorNivel: 2, forte: null,
    proficiencias: ["Armas marciais", "Armaduras pesadas", "Escudos"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p071 (livro do usuário): 20 PV + CON, 5 PV + CON por nível; 3 PM por nível. O exemplo do timEU (16 PV) não confere e não é regra",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p071 e p038: Luta ou Pontaria, Fortitude, mais 2 a escolher",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  inventor: {
    nome: "Inventor", cor: "#5b5b2e", conjurador: false, pvInicial: 12, pvNivel: 3, pmNivel: 4, fixas: ["Ofício", "Vontade"], grupoFixo: null, periciasPorNivel: 4, forte: null,
    proficiencias: ["Nenhuma"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p074 (livro do usuário): 12 PV + CON, 3 PV + CON por nível; 4 PM por nível",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p074 e p038: Ofício e Vontade, mais 4 a escolher",
    magiasNivel1: 0, fonteMagias: "não conjurador: fórmulas e engenhocas, não magias (p076)"
  },
  ladino: {
    nome: "Ladino", cor: "#334155", conjurador: false, pvInicial: 12, pvNivel: 3, pmNivel: 4, fixas: ["Ladinagem", "Reflexos"], grupoFixo: null, periciasPorNivel: 8, forte: null,
    proficiencias: ["Nenhuma"], ataqueFurtivo: true,
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p079 (livro do usuário): 12 PV + CON, 3 PV + CON por nível; 4 PM por nível",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p079 e p038: Ladinagem e Reflexos, mais 8 a escolher",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  lutador: {
    nome: "Lutador", cor: "#8a3b12", conjurador: false, pvInicial: 20, pvNivel: 5, pmNivel: 3, fixas: ["Fortitude", "Luta"], grupoFixo: null, periciasPorNivel: 4, forte: null,
    proficiencias: ["Nenhuma"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p082 (livro do usuário): 20 PV + CON, 5 PV + CON por nível; 3 PM por nível",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p082 e p038: Fortitude e Luta, mais 4 a escolher",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  nobre: {
    nome: "Nobre", cor: "#7a2e4f", conjurador: false, pvInicial: 16, pvNivel: 4, pmNivel: 4, fixas: ["Vontade"], grupoFixo: { opcoes: ["Diplomacia", "Intimidação"], qtd: 1 }, periciasPorNivel: 4, forte: null,
    proficiencias: ["Armas marciais", "Armaduras pesadas", "Escudos"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p085 (livro do usuário): 16 PV + CON, 4 PV + CON por nível; 4 PM por nível",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p085 e p038: Diplomacia ou Intimidação, Vontade, mais 4 a escolher",
    magiasNivel1: 0, fonteMagias: "não conjurador"
  },
  paladino: {
    nome: "Paladino", cor: "#8a5200", conjurador: false, pvInicial: 20, pvNivel: 5, pmNivel: 3, pmAtributoNivel1: "carisma",
    fixas: ["Luta", "Vontade"], grupoFixo: null, periciasPorNivel: 2, forte: null,
    proficiencias: ["Armas marciais", "Armaduras pesadas", "Escudos"],
    verificadoPv: true, fontePv: "Tormenta20 Jogo do Ano, p088 (livro do usuário): 20 PV + CON, 5 PV + CON por nível; 3 PM por nível; CAR soma ao PM só no 1º nível (Abençoado)",
    verificadoPericias: true, fontePericias: "Tormenta20 Jogo do Ano, p088 e p038: Luta e Vontade, mais 2 a escolher",
    magiasNivel1: 0, fonteMagias: "não conjurador de classe: magia só pelo poder Orar (p090), não modelado"
  }
};
const T20_CLASSE_IDS = Object.keys(T20_CLASSES);

/* Círculos de magia por nível de personagem, por classe (Tormenta20 Jogo do Ano, livro do usuário).
   Arcanista e Clérigo: 2º no 5º, 3º no 9º, 4º no 13º, 5º no 17º (p043 e p063, "a cada quatro níveis").
   Bardo e Druida: 2º no 6º, 3º no 10º, 4º no 14º (p050 e p067). Classes sem magia de classe: sem círculo. */
const T20_CIRCULOS = {
  arcanista: [[1, 1], [5, 2], [9, 3], [13, 4], [17, 5]],
  clerigo: [[1, 1], [5, 2], [9, 3], [13, 4], [17, 5]],
  bardo: [[1, 1], [6, 2], [10, 3], [14, 4]],
  druida: [[1, 1], [6, 2], [10, 3], [14, 4]]
};
const T20_CIRCULOS_FONTE = "Tormenta20 Jogo do Ano, p043 e p063 (Arcanista e Clérigo: 5º, 9º, 13º, 17º) e p050 e p067 (Bardo e Druida: 6º, 10º, 14º) (livro do usuário). Verificado por classe";

/* Níveis do app: 1 a 20. Até T20_NIVEL_BASE (5) valem as tabelas deste arquivo. Do 6º em diante, PV, PM,
   bônus de treino, círculo e habilidades vêm de T20_NIVEIS (rules-niveis.js). */
const T20_NIVEL_MIN = 1;
const T20_NIVEL_MAX = 20;
const T20_NIVEL_BASE = 5;

/* Valores padrão e bônus de dinheiro: NÃO VERIFICADO (o livro define; não foi confirmado). */
const T20_DINHEIRO_FONTE = "Dinheiro inicial (T$): NÃO VERIFICADO nesta revisão (não foi conferido no capítulo de origens e equipamento). O app não sugere valor.";
const T20_DEFESA_FONTE = "Tormenta20 Jogo do Ano, p112 (livro do usuário): Defesa = 10 + Destreza + bônus de armadura e escudo";
const T20_PV_FONTE = "Tormenta20 Jogo do Ano, p041 e p112 (livro do usuário): PV do 1º nível = PV inicial + CON; cada nível soma PV por nível + CON, com mínimo de 1 PV por nível";
const T20_PM_FONTE = "Tormenta20 Jogo do Ano, p038 e p112 (livro do usuário): PM = PM por nível × nível; conjuradores somam o atributo-chave uma vez; Paladino soma CAR no 1º nível";
