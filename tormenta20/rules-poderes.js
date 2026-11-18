/* tormenta20/rules-poderes.js: catálogo de poderes, carregado depois de rules-niveis.js.

   Formato de T20_PODERES (objeto por id):
     id, nome
     tipo      "classe" | "geral" | "concedido" | null (null = tipo NÃO VERIFICADO)
     subtipo   "combate" | "destino" | "magia" | "tormenta" | null (não verificado)
     classes   ids de T20_CLASSES (poder de classe); [] para os demais
     nivel     nível mínimo (número) ou null (não informado na fonte)
     pre       pré-requisitos mecânicos, só as chaves que existem:
               atributos {id: valor mínimo}, poderes [ids], pericias [nomes de T20_PERICIAS], nivel,
               texto (condição que não cabe nas chaves acima)
     frase     descrição curta em palavras próprias, ou null (efeito não lido na fonte)
     fonte     origem; "NÃO VERIFICADO" quando só aparece como pré-requisito
     verificado true só quando duas fontes independentes confirmam nome, nível e pré-requisito
     nota      observação curta ou null

   Fontes: [E] exegetadearton.com.br (páginas de classe, lista de poderes); [R] Rotina de Mestre (guia do Bardo, guia do Ladino).
   Poderes gerais (combate, destino, magia, tormenta) e concedidos: livro do usuário, Tormenta20 Jogo do Ano, p130-p143.
   Gerais e concedidos usam nivel 1 (o livro não dá nível mínimo; o pré-requisito de nível vai em pre.nivel).
   Concedidos: pre.texto "Devoto de ..." (atributo-chave Sabedoria, p138).
   Poderes da Tormenta: ao escolher, perde 1 de Carisma; mais 1 a cada dois outros poderes da Tormenta (p134, p142).
   Poderes de classe não foram alterados nesta revisão. Ver docs/TRABALHO_T20_RACAS_PODERES.md. */

const T20_PF_CLASSE = "[E] exegetadearton.com.br, página da classe (nome e nível de acesso; 1 fonte)";
const T20_PF_REF = "NÃO VERIFICADO: citado como pré-requisito em [E]; página própria não lida";
const T20_PF_GERAL = "[E] exegetadearton.com.br/poderes (só o nome; 1 fonte)";
const T20_PF_BARDO_R = "[R] Rotina de Mestre, guia do Bardo (1 fonte)";

const t20PoderDe = (id, nome, o = {}) => ({
  id,
  nome,
  tipo: o.tipo !== undefined ? o.tipo : (o.fonte === T20_PF_REF ? null : "classe"),
  subtipo: o.subtipo ?? null,
  classes: o.classes ?? [],
  nivel: o.nivel ?? null,
  pre: o.pre ?? {},
  frase: o.frase ?? null,
  fonte: o.fonte ?? T20_PF_CLASSE,
  verificado: o.verificado ?? false,
  nota: o.nota ?? null
});

/* Poderes gerais e concedidos (livro do usuário). Fontes por grupo: tabelas e efeitos em páginas do PDF. */
const T20_LIVRO = pags => `Tormenta20 Jogo do Ano, ${pags} (livro do usuário)`;
const T20_FONTE_COMBATE = T20_LIVRO("p130-p131 e p134-p135 (efeitos), p132 (tabela)");
const T20_FONTE_DESTINO = T20_LIVRO("p135-p137 (efeitos), p132 (tabela)");
const T20_FONTE_MAGIA = T20_LIVRO("p137 (efeitos), p132 (tabela)");
const T20_FONTE_CONCEDIDO = T20_LIVRO("p133 (tabela), p138-p142 (efeitos)");
const T20_FONTE_TORMENTA = T20_LIVRO("p134 (tabela), p142-p143 (efeitos)");
const t20PoderGeral = (id, nome, subtipo, o = {}) => t20PoderDe(id, nome, Object.assign({ tipo: "geral", subtipo, nivel: 1 }, o));
const t20PoderConcedido = (id, nome, devoto, frase, o = {}) => t20PoderDe(id, nome, Object.assign({
  tipo: "concedido", nivel: 1, pre: { texto: devoto }, frase, fonte: T20_FONTE_CONCEDIDO, verificado: true
}, o));

const T20_PODERES_LISTA = [
  /* ---- Comum a todas as classes (livro do usuário): Aumento de Atributo ----
     É uma opção do Poder de cada classe (p044 no Arcanista; demais classes em p047-p088), a partir do 2º nível.
     Não há aumento automático em níveis fixos: o jogador escolhe o poder no nível em que quiser o aumento.
     Regra: +1 em um atributo; pode ser escolhido várias vezes, mas só uma vez por patamar para o mesmo atributo
     (patamares de p041: 1º-4º, 5º-10º, 11º-16º e 17º-20º). Limite de 4 aumentos por atributo, somando os quatro patamares. */
  t20PoderDe("aumento-atributo", "Aumento de Atributo", {
    classes: T20_CLASSE_IDS, nivel: 2, tipo: "classe", verificado: true,
    frase: "Você recebe +1 em um atributo à sua escolha. Pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo.",
    fonte: T20_LIVRO("p044 (Arcanista) e p047-p088 (demais classes), item Aumento de Atributo; patamares em p041"),
    nota: "Atributo escolhido no próprio poder. Soma no valor final do atributo (também muda PV se for Constituição)."
  }),
  /* ---- Arcanista ---- */
  t20PoderDe("agrilhoar-os-mortos", "Agrilhoar os Mortos", { classes: ["arcanista"], nivel: 3 }),
  t20PoderDe("fortalecimento-arcano", "Fortalecimento Arcano", { classes: ["arcanista"], nivel: 5 }),
  t20PoderDe("familiar-aprimorado", "Familiar Aprimorado", { classes: ["arcanista"], nivel: 5 }),
  t20PoderDe("ingrediente-especial", "Ingrediente Especial", { classes: ["arcanista"], nivel: 5 }),
  t20PoderDe("raio-dividido", "Raio Dividido", { classes: ["arcanista"], nivel: 5 }),
  t20PoderDe("familiar-elemental", "Familiar Elemental", { classes: ["arcanista"], nivel: 5 }),
  t20PoderDe("heranca-aprimorada", "Herança Aprimorada", { classes: ["arcanista"], nivel: 6 }),
  t20PoderDe("mestre-em-escola", "Mestre em Escola", { classes: ["arcanista"], nivel: 8 }),
  t20PoderDe("contramagica-superior", "Contramágica Superior", { classes: ["arcanista"], nivel: 9 }),
  t20PoderDe("trama-celere", "Trama Célere", { classes: ["arcanista"], nivel: 9 }),
  t20PoderDe("fluxo-de-mana", "Fluxo de Mana", { classes: ["arcanista"], nivel: 10 }),
  t20PoderDe("heranca-superior", "Herança Superior", { classes: ["arcanista"], nivel: 11 }),
  t20PoderDe("apoteose", "Apoteose", { classes: ["arcanista"], nivel: 17, nota: "Variantes Celestial, Dracônica, Feérica e Rubra, citadas em [E]." }),
  t20PoderDe("sifao-de-mana", "Sifão de Mana", { classes: ["arcanista"], nivel: 17 }),
  t20PoderDe("raio-arcano", "Raio Arcano", { tipo: null, fonte: T20_PF_REF }),
  t20PoderDe("raio-poderoso", "Raio Poderoso", { classes: ["arcanista"], pre: { poderes: ["raio-arcano"] } }),
  t20PoderDe("escriba-arcano", "Escriba Arcano", { classes: ["arcanista"], pre: { texto: "Escola do Mago (citado em [E])" } }),
  t20PoderDe("magia-suspensa", "Magia Suspensa", { classes: ["arcanista"], fonte: T20_PF_GERAL }),

  /* ---- Bárbaro ---- */
  t20PoderDe("totem-espiritual", "Totem Espiritual", { classes: ["barbaro"], nivel: 4 }),
  t20PoderDe("critico-brutal", "Crítico Brutal", { classes: ["barbaro"], nivel: 6 }),
  t20PoderDe("espiritualista", "Espiritualista", { classes: ["barbaro"], nivel: 6, pre: { atributos: { sabedoria: 2 }, poderes: ["totem-espiritual"] } }),
  t20PoderDe("manifestar-totem", "Manifestar Totem", { classes: ["barbaro"], nivel: 7, pre: { poderes: ["totem-espiritual"] } }),
  t20PoderDe("pele-de-ferro", "Pele de Ferro", { classes: ["barbaro"], fonte: T20_PF_REF }),
  t20PoderDe("pele-de-aco", "Pele de Aço", { classes: ["barbaro"], nivel: 8, pre: { poderes: ["pele-de-ferro"] } }),
  t20PoderDe("forca-indomavel", "Força Indomável", { classes: ["barbaro"], fonte: T20_PF_REF }),
  t20PoderDe("instinto-indomavel", "Instinto Indomável", { classes: ["barbaro"], nivel: 10, pre: { poderes: ["forca-indomavel"] } }),
  t20PoderDe("furia-elemental", "Fúria Elemental", { classes: ["barbaro"], nivel: 11, pre: { poderes: ["totem-espiritual"] } }),
  t20PoderDe("invocar-os-ancestrais", "Invocar os Ancestrais", { classes: ["barbaro"], nivel: 11, pre: { poderes: ["totem-espiritual"] } }),
  t20PoderDe("frenesi", "Frenesi", { classes: ["barbaro"], fonte: T20_PF_REF }),
  t20PoderDe("revide", "Revide", { classes: ["barbaro"], nivel: 11, pre: { poderes: ["frenesi"] } }),
  t20PoderDe("instinto-furioso", "Instinto Furioso", { classes: ["barbaro"], nivel: 15, pre: { texto: "Instinto Selvagem (habilidade de classe do 3º nível)" } }),
  t20PoderDe("enigma-do-aco", "Enigma do Aço", { classes: ["barbaro"], nivel: 17 }),
  t20PoderDe("regeneracao-sobrenatural", "Regeneração Sobrenatural", { classes: ["barbaro"], nivel: 5 }),
  t20PoderDe("sede-sanguinaria", "Sede Sanguinária", { classes: ["barbaro"], nivel: 5 }),
  t20PoderDe("cicatrizes-ritualisticas", "Cicatrizes Ritualísticas", { classes: ["barbaro"], nivel: 5 }),

  /* ---- Bardo ---- */
  t20PoderDe("golpe-magico", "Golpe Mágico", { classes: ["bardo"], nivel: 3, fonte: T20_PF_BARDO_R, frase: "Sob Inspiração, acertos corpo a corpo geram PM temporários." }),
  t20PoderDe("balada-fascinante", "Balada Fascinante", { classes: ["bardo"], nivel: 5, fonte: T20_PF_BARDO_R, frase: "Teste de Atuação contra Vontade para fascinar criaturas." }),
  t20PoderDe("musica-marcha-vitoriosa", "Música: Marcha Vitoriosa", { classes: ["bardo"], nivel: 5 }),
  t20PoderDe("manipular", "Manipular", { classes: ["bardo"], pre: { poderes: ["balada-fascinante"] }, fonte: T20_PF_BARDO_R, frase: "Transforma criatura fascinada em enfeitiçada por 1 PM." }),
  t20PoderDe("golpe-elemental", "Golpe Elemental", { classes: ["bardo"], pre: { poderes: ["golpe-magico"] }, fonte: T20_PF_BARDO_R, frase: "Gasta 1 PM para causar 1d6 de dano elemental extra." }),
  t20PoderDe("lendas-e-historias", "Lendas e Histórias", { classes: ["bardo"], fonte: T20_PF_BARDO_R, frase: "Gasta 1 PM para repetir testes de identificação de Conhecimento, Misticismo, Nobreza ou Religião." }),
  t20PoderDe("inspiracao-marcial", "Inspiração Marcial", { classes: ["bardo"], fonte: T20_PF_BARDO_R, frase: "Estende o bônus da Inspiração às rolagens de dano." }),
  t20PoderDe("aumentar-repertorio", "Aumentar Repertório", { classes: ["bardo"], fonte: T20_PF_BARDO_R, frase: "Concede duas magias adicionais de qualquer círculo acessível." }),
  t20PoderDe("estrelato", "Estrelato", { classes: ["bardo"], nivel: 6 }),
  t20PoderDe("prestidigitacao", "Prestidigitação", { classes: ["bardo"], nivel: 6 }),
  t20PoderDe("performance-crescendo", "Performance: Crescendo", { classes: ["bardo"], nivel: 6, pre: { poderes: ["inspiracao-marcial"] } }),
  t20PoderDe("artista-versatil", "Artista Versátil", { classes: ["bardo"], nivel: 6, pre: { atributos: { inteligencia: 2 } } }),
  t20PoderDe("danca-das-laminas", "Dança das Lâminas", { classes: ["bardo"], nivel: 10 }),
  t20PoderDe("manipular-em-massa", "Manipular em Massa", { classes: ["bardo"], nivel: 10, verificado: true,
    fonte: "[E] página do Bardo + [R] guia do Bardo (tabela do 10º nível)", frase: "Afeta todas as criaturas fascinadas em alcance curto." }),
  t20PoderDe("inspiracao-espirituosa", "Inspiração Espirituosa", { classes: ["bardo"], nivel: 11 }),
  t20PoderDe("celebridade-artoniana", "Celebridade Artoniana", { classes: ["bardo"], nivel: 17 }),
  t20PoderDe("ressoar", "Ressoar", { classes: ["bardo"], nivel: 17 }),
  t20PoderDe("parodia", "Paródia", { classes: ["bardo"], nota: "Nível de acesso não informado em [E]." }),

  /* ---- Bucaneiro ---- */
  t20PoderDe("amigos-no-porto", "Amigos no Porto", { classes: ["bucaneiro"], nivel: 6, pre: { atributos: { carisma: 1 } } }),
  t20PoderDe("pegou-no-chapeu", "Pegou no Chapéu", { classes: ["bucaneiro"], nivel: 6, pre: { atributos: { carisma: 2 } } }),
  t20PoderDe("en-garde", "En Garde", { tipo: null, fonte: T20_PF_REF }),
  t20PoderDe("remise", "Remise", { classes: ["bucaneiro"], nivel: 7, pre: { poderes: ["en-garde"] } }),
  t20PoderDe("esgrimista", "Esgrimista", { tipo: null, fonte: T20_PF_REF }),
  t20PoderDe("touche", "Touché", { classes: ["bucaneiro"], nivel: 10, pre: { poderes: ["esgrimista"] } }),
  t20PoderDe("lorotas-da-terra-e-do-mar", "Lorotas da Terra e do Mar", { classes: ["bucaneiro"], nivel: 11, pre: { pericias: ["Enganação"] } }),
  t20PoderDe("amigo-do-passado", "Amigo do Passado", { classes: ["bucaneiro"], nivel: 11, pre: { texto: "Ser osteon (citado em [E])" } }),
  t20PoderDe("aparar", "Aparar", { tipo: null, fonte: T20_PF_REF }),
  t20PoderDe("ripostar", "Ripostar", { classes: ["bucaneiro"], nivel: 12, pre: { poderes: ["aparar"] } }),
  t20PoderDe("lobo-do-mar", "Lobo do Mar", { classes: ["bucaneiro"], nivel: 17 }),

  /* ---- Caçador ---- */
  t20PoderDe("bote", "Bote", { classes: ["cacador"], nivel: 6 }),
  t20PoderDe("camuflagem", "Camuflagem", { classes: ["cacador"], nivel: 6 }),
  t20PoderDe("escaramuca", "Escaramuça", { classes: ["cacador"], nivel: 6 }),
  t20PoderDe("sequencia-do-predador", "Sequência do Predador", { classes: ["cacador"], nivel: 8 }),
  t20PoderDe("impeto", "Ímpeto", { tipo: null, fonte: T20_PF_REF }),
  t20PoderDe("avanco-do-predador", "Avanço do Predador", { classes: ["cacador"], nivel: 11, pre: { poderes: ["impeto"] } }),
  t20PoderDe("sequencia-dilaceradora", "Sequência Dilaceradora", { classes: ["cacador"], nivel: 11 }),
  t20PoderDe("sede-de-sangue", "Sede de Sangue", { classes: ["cacador"], nivel: 11 }),
  t20PoderDe("ambidestria", "Ambidestria", { tipo: null, fonte: T20_PF_REF }),
  t20PoderDe("chuva-de-laminas", "Chuva de Lâminas", { classes: ["cacador"], nivel: 12, pre: { atributos: { destreza: 4 }, poderes: ["ambidestria"] } }),
  t20PoderDe("escaramuca-superior", "Escaramuça Superior", { classes: ["cacador"], nivel: 12 }),
  t20PoderDe("tempestade-de-laminas", "Tempestade de Lâminas", { classes: ["cacador"], nivel: 17, pre: { poderes: ["chuva-de-laminas"] } }),
  t20PoderDe("armadilheiro", "Armadilheiro", { classes: ["cacador"], fonte: T20_PF_REF }),
  t20PoderDe("mestre-armadilheiro", "Mestre Armadilheiro", { classes: ["cacador"], nivel: 20, pre: { poderes: ["armadilheiro"], texto: "Dois poderes de armadilha" } }),

  /* ---- Cavaleiro e Nobre (compartilham) ---- */
  t20PoderDe("autoridade-feudal", "Autoridade Feudal", { classes: ["cavaleiro", "nobre"], nivel: 6 }),
  t20PoderDe("titulo", "Título", { classes: ["cavaleiro", "nobre"], nivel: 10, pre: { poderes: ["autoridade-feudal"], texto: "Terras conquistadas ou serviço prestado a um suserano" } }),
  t20PoderDe("mestre-das-posturas", "Mestre das Posturas", { classes: ["cavaleiro"], nivel: 11, pre: { texto: "Dois poderes de postura" }, nota: "Marcado DH em [E]." }),
  t20PoderDe("especializacao-em-armadura", "Especialização em Armadura", { tipo: null, classes: ["guerreiro", "cavaleiro"], nivel: 12,
    nota: "Listado como poder de classe em [E] (Guerreiro e Cavaleiro, mesma fonte); tipo NÃO VERIFICADO." }),
  t20PoderDe("estandarte", "Estandarte", { classes: ["cavaleiro"], nivel: 14, pre: { poderes: ["titulo"] } }),
  t20PoderDe("grao-mestre", "Grão-Mestre", { classes: ["cavaleiro"], nivel: 17, nota: "Marcado DH em [E]." }),

  /* ---- Guerreiro ---- */
  t20PoderDe("resiliencia-marcial", "Resiliência Marcial", { classes: ["guerreiro"], nivel: 4 }),
  t20PoderDe("golpe-pessoal", "Golpe Pessoal", { classes: ["guerreiro"], nivel: 5 }),
  t20PoderDe("inercia-do-aco", "Inércia do Aço", { classes: ["guerreiro"], nivel: 5 }),
  t20PoderDe("investida-ricochete", "Investida Ricochete", { classes: ["guerreiro"], nivel: 5, pre: { poderes: ["bater-e-correr"] } }),
  t20PoderDe("bater-e-correr", "Bater e Correr", { tipo: null, fonte: T20_PF_REF }),
  t20PoderDe("tornado-de-dor", "Tornado de Dor", { classes: ["guerreiro"], nivel: 6 }),
  t20PoderDe("mente-disciplinada", "Mente Disciplinada", { classes: ["guerreiro"], nivel: 6 }),
  t20PoderDe("planejamento-marcial", "Planejamento Marcial", { classes: ["guerreiro"], nivel: 10, pre: { pericias: ["Guerra"] } }),
  t20PoderDe("determinacao-inabalavel", "Determinação Inabalável", { classes: ["guerreiro"], nivel: 11 }),
  t20PoderDe("ordens-de-engajamento", "Ordens de Engajamento", { classes: ["guerreiro"], nivel: 11 }),
  t20PoderDe("mestre-em-arma", "Mestre em Arma", { classes: ["guerreiro"], nivel: 12 }),
  t20PoderDe("operacoes-combinadas", "Operações Combinadas", { classes: ["guerreiro"], nivel: 14 }),
  t20PoderDe("velho-de-guerra", "Velho de Guerra", { classes: ["guerreiro"], nivel: 17 }),

  /* ---- Clérigo ---- */
  t20PoderDe("missa-escudo-divino", "Missa: Escudo Divino", { classes: ["clerigo"], fonte: T20_PF_GERAL }),
  t20PoderDe("forca-da-devocao", "Força da Devoção", { classes: ["clerigo"], nivel: 6, frase: "Aumenta a CD de magias de poderes concedidos." }),
  t20PoderDe("abencoar-arma", "Abençoar Arma", { classes: ["clerigo"], fonte: T20_PF_REF }),
  t20PoderDe("arma-divina", "Arma Divina", { classes: ["clerigo"], nivel: 7, pre: { poderes: ["abencoar-arma"] } }),
  t20PoderDe("canalizar-amplo", "Canalizar Amplo", { classes: ["clerigo"], fonte: T20_PF_REF }),
  t20PoderDe("canalizar-poderoso", "Canalizar Poderoso", { classes: ["clerigo"], nivel: 9, pre: { poderes: ["canalizar-amplo"] }, frase: "Os dados de canalizar viram d10." }),
  t20PoderDe("presente-dos-deuses", "Presente dos Deuses", { classes: ["clerigo"], nivel: 9, frase: "Dá uma arma superior e mágica." }),
  t20PoderDe("canalizar-abencoado", "Canalizar Abençoado", { classes: ["clerigo"], nivel: 11 }),
  t20PoderDe("canalizar-concentrado", "Canalizar Concentrado", { classes: ["clerigo"], nivel: 11 }),
  t20PoderDe("canalizar-profanado", "Canalizar Profanado", { classes: ["clerigo"], nivel: 11 }),
  t20PoderDe("mestre-celebrante", "Mestre Celebrante", { classes: ["clerigo"], nivel: 12, pre: { texto: "Um poder de Missa" } }),
  t20PoderDe("missa-compartilhar-milagre", "Missa: Compartilhar Milagre", { classes: ["clerigo"], nivel: 17 }),
  t20PoderDe("representante-divino", "Representante Divino", { classes: ["clerigo"], nivel: 17 }),

  /* ---- Druida ---- */
  t20PoderDe("poder-tumular", "Poder Tumular", { classes: ["druida"], nivel: 2 }),
  t20PoderDe("forca-dos-penhascos", "Força dos Penhascos", { classes: ["druida"], nivel: 4 }),
  t20PoderDe("arma-tradicional", "Arma Tradicional", { classes: ["druida"], nivel: 5 }),
  t20PoderDe("forma-selvagem-aprimorada", "Forma Selvagem Aprimorada", { classes: ["druida"], nivel: 6 }),
  t20PoderDe("companheiro-animal-aprimorado", "Companheiro Animal Aprimorado", { classes: ["druida"], nivel: 6 }),
  t20PoderDe("companheiro-aberrante", "Companheiro Aberrante", { classes: ["druida"], nivel: 6, nota: "Versão do druida de Aharadak, segundo [E]." }),
  t20PoderDe("companheiro-animal-magico", "Companheiro Animal Mágico", { classes: ["druida"], nivel: 8 }),
  t20PoderDe("espirito-dos-equinocios", "Espírito dos Equinócios", { classes: ["druida"], nivel: 10 }),
  t20PoderDe("espirito-dos-solsticios", "Espírito dos Solstícios", { classes: ["druida"], nivel: 10 }),
  t20PoderDe("confluencia-elemental", "Confluência Elemental", { classes: ["druida"], nivel: 10 }),
  t20PoderDe("metamorfose-instantanea", "Metamorfose Instantânea", { classes: ["druida"], nivel: 11 }),
  t20PoderDe("oraculo-da-natureza", "Oráculo da Natureza", { classes: ["druida"], nivel: 11 }),
  t20PoderDe("forma-selvagem-superior", "Forma Selvagem Superior", { classes: ["druida"], nivel: 12, nota: "Nível 12 inferido de 'pré-requisito atendido' em [E]." }),
  t20PoderDe("forca-da-natureza-db", "Força da Natureza (poder de DB)", { classes: ["druida"], nivel: 17, pre: { poderes: ["forma-selvagem-superior"] },
    nota: "Nível 17 inferido de [E]. Homônimo da habilidade de classe do 20º nível (ver rules-niveis.js)." }),
  t20PoderDe("companheiro-animal-lendario", "Companheiro Animal Lendário", { classes: ["druida"], nivel: 18 }),
  t20PoderDe("forma-primal", "Forma Primal", { classes: ["druida"], nivel: 18 }),

  /* ---- Inventor ---- */
  t20PoderDe("alquimista-iniciado", "Alquimista Iniciado", { classes: ["inventor"], nivel: 6, nota: "Libera fórmulas de 2º círculo, segundo [E]." }),
  t20PoderDe("mestre-alquimista", "Mestre Alquimista", { classes: ["inventor"], nivel: 10 }),
  t20PoderDe("golpe-de-genio", "Golpe de Gênio", { classes: ["inventor"], nivel: 11 }),
  t20PoderDe("traje-de-batalha", "Traje de Batalha", { classes: ["inventor"], nivel: 12 }),
  t20PoderDe("genio-inovador", "Gênio Inovador", { classes: ["inventor"], nivel: 17 }),

  /* ---- Ladino ---- */
  t20PoderDe("oportunismo", "Oportunismo", { classes: ["ladino"], nivel: 6, verificado: true,
    fonte: "[E] página do Ladino + [R] guia do Ladino (ambas dão o 6º nível)", frase: "Ataque corpo a corpo extra fora do seu turno por 2 PM." }),
  t20PoderDe("truque-magico", "Truque Mágico", { classes: ["ladino"], fonte: "[R] Rotina de Mestre, guia do Ladino (nome; nível não informado)" }),
  t20PoderDe("roubo-de-mana", "Roubo de Mana", { classes: ["ladino"], nivel: 7, pre: { poderes: ["truque-magico"] } }),
  t20PoderDe("veneno-potente", "Veneno Potente", { classes: ["ladino"], fonte: T20_PF_REF }),
  t20PoderDe("veneno-persistente", "Veneno Persistente", { classes: ["ladino"], nivel: 8, pre: { poderes: ["veneno-potente"] } }),
  t20PoderDe("camaleao", "Camaleão", { classes: ["ladino"], fonte: T20_PF_REF }),
  t20PoderDe("mestre-impostor", "Mestre Impostor", { classes: ["ladino"], nivel: 11, pre: { poderes: ["camaleao"] } }),
  t20PoderDe("mestre-assassino", "Mestre Assassino", { classes: ["ladino"], nivel: 11, pre: { texto: "Outros requisitos não lidos na fonte" } }),
  t20PoderDe("mestre-envenenador", "Mestre Envenenador", { classes: ["ladino"], nivel: 11, pre: { texto: "Outros requisitos não lidos na fonte" } }),
  t20PoderDe("truque-de-palco", "Truque de Palco", { classes: ["ladino"], fonte: T20_PF_REF }),
  t20PoderDe("truque-magico-aprimorado", "Truque Mágico Aprimorado", { classes: ["ladino"], nivel: 11, pre: { atributos: { inteligencia: 3 }, poderes: ["truque-de-palco"] } }),
  t20PoderDe("assassino-em-serie", "Assassino em Série", { classes: ["ladino"], nivel: 11, nota: "A fonte também o cita no nível 20; o uso no 20º fica como nota." }),
  t20PoderDe("ladrao-arcano", "Ladrão Arcano", { classes: ["ladino"], nivel: 13, pre: { poderes: ["roubo-de-mana"] } }),
  t20PoderDe("chefe-de-gangue", "Chefe de Gangue", { classes: ["ladino"], fonte: T20_PF_REF }),
  t20PoderDe("contatos-no-submundo", "Contatos no Submundo", { classes: ["ladino"], fonte: T20_PF_REF }),
  t20PoderDe("mente-criminosa", "Mente Criminosa", { classes: ["ladino"], fonte: T20_PF_REF }),
  t20PoderDe("rei-do-crime", "Rei do Crime", { classes: ["ladino"], nivel: 17, pre: { poderes: ["chefe-de-gangue", "contatos-no-submundo", "mente-criminosa"] } }),
  t20PoderDe("senhor-do-submundo", "Senhor do Submundo", { classes: ["ladino"], nivel: 17, pre: { pericias: ["Intimidação"] } }),
  t20PoderDe("ameaca-brutal", "Ameaça Brutal", { classes: ["ladino"], nivel: 20 }),

  /* ---- Lutador ---- */
  t20PoderDe("trocacao", "Trocação", { classes: ["lutador"], nivel: 6 }),
  t20PoderDe("onda-de-choque", "Onda de Choque", { classes: ["lutador"], nivel: 6, pre: { atributos: { forca: 4 } } }),
  t20PoderDe("danca-marcial", "Dança Marcial", { classes: ["lutador"], fonte: T20_PF_REF }),
  t20PoderDe("gingado-elusivo", "Gingado Elusivo", { classes: ["lutador"], nivel: 7, pre: { poderes: ["danca-marcial"] } }),
  t20PoderDe("trocacao-tumultuosa", "Trocação Tumultuosa", { classes: ["lutador"], nivel: 8 }),
  t20PoderDe("punhos-de-adamante", "Punhos de Adamante", { classes: ["lutador"], nivel: 8 }),
  t20PoderDe("confianca-dos-ringues", "Confiança dos Ringues", { classes: ["lutador"], nivel: 8 }),
  t20PoderDe("chave", "Chave", { classes: ["lutador"], fonte: T20_PF_REF }),
  t20PoderDe("imobilizacao", "Imobilização", { classes: ["lutador"], nivel: 8, pre: { poderes: ["chave"] } }),
  t20PoderDe("sarado", "Sarado", { classes: ["lutador"], fonte: T20_PF_REF }),
  t20PoderDe("trincado", "Trincado", { classes: ["lutador"], nivel: 10, pre: { atributos: { constituicao: 3 }, poderes: ["sarado"] } }),
  t20PoderDe("nome-na-arena", "Nome na Arena", { classes: ["lutador"], nivel: 11 }),
  t20PoderDe("sequencia-destruidora", "Sequência Destruidora", { classes: ["lutador"], nivel: 12, pre: { poderes: ["trocacao"] } }),
  t20PoderDe("invencivel", "Invencível", { classes: ["lutador"], nivel: 17, pre: { poderes: ["nome-na-arena"] } }),

  /* ---- Nobre ---- */
  t20PoderDe("estrategista", "Estrategista", { classes: ["nobre"], nivel: 6, pre: { atributos: { inteligencia: 1 }, pericias: ["Guerra"] } }),
  t20PoderDe("liderar-pelo-exemplo", "Liderar pelo Exemplo", { classes: ["nobre"], nivel: 6 }),
  t20PoderDe("inspirar-confianca", "Inspirar Confiança", { classes: ["nobre"], fonte: T20_PF_REF }),
  t20PoderDe("inspirar-gloria", "Inspirar Glória", { classes: ["nobre"], nivel: 8, pre: { poderes: ["inspirar-confianca"] } }),
  t20PoderDe("lingua-de-prata", "Língua de Prata", { classes: ["nobre"], fonte: T20_PF_REF }),
  t20PoderDe("lingua-de-ouro", "Língua de Ouro", { classes: ["nobre"], nivel: 8, pre: { poderes: ["lingua-de-prata"] } }),
  t20PoderDe("armadura-brilhante", "Armadura Brilhante", { classes: ["nobre"], nivel: 8 }),
  t20PoderDe("grito-tiranico", "Grito Tirânico", { classes: ["nobre"], nivel: 8 }),
  t20PoderDe("general", "General", { classes: ["nobre"], nivel: 12, pre: { poderes: ["estrategista"] } }),
  t20PoderDe("presenca-majestosa", "Presença Majestosa", { classes: ["nobre"], nivel: 16 }),

  /* ---- Paladino ---- */
  t20PoderDe("orar", "Orar", { classes: ["paladino"], nivel: 2, frase: "Dá magia de 1º círculo a partir do 2º nível." }),
  t20PoderDe("manto-de-batalha", "Manto de Batalha", { classes: ["paladino"], nivel: 5 }),
  t20PoderDe("aura-de-cura", "Aura de Cura", { classes: ["paladino"], nivel: 6 }),
  t20PoderDe("aura-poderosa", "Aura Poderosa", { classes: ["paladino"], nivel: 6 }),
  t20PoderDe("aura-de-arrependimento", "Aura de Arrependimento", { classes: ["paladino"], nivel: 6, nota: "Versão de DB; exige golem (requisito não lido)." }),
  t20PoderDe("escudo-sagrado", "Escudo Sagrado", { classes: ["paladino"], nivel: 7, nota: "Marcado DH em [E]." }),
  t20PoderDe("aura-vingadora", "Aura Vingadora", { classes: ["paladino"], nivel: 8, nota: "Marcado DH em [E]." }),
  t20PoderDe("aura-ardente", "Aura Ardente", { classes: ["paladino"], nivel: 10 }),
  t20PoderDe("investida-sagrada", "Investida Sagrada", { classes: ["paladino"], nivel: 10, pre: { poderes: ["montaria-sagrada"] } }),
  t20PoderDe("montaria-sagrada", "Montaria Sagrada", { classes: ["paladino"], fonte: T20_PF_REF }),
  t20PoderDe("conviccao-heroica", "Convicção Heroica", { classes: ["paladino"], nivel: 11 }),
  t20PoderDe("arma-sacramentada", "Arma Sacramentada", { classes: ["paladino"], nivel: 11 }),
  t20PoderDe("aura-antimagia", "Aura Antimagia", { classes: ["paladino"], nivel: 14 }),
  t20PoderDe("hoste-celestial", "Hoste Celestial", { classes: ["paladino"], nivel: 17 }),
  t20PoderDe("aura-de-invencibilidade", "Aura de Invencibilidade", { classes: ["paladino"], nivel: 18 }),

  /* ---- Poderes gerais de combate (livro, p132 e efeitos p130-p135) ---- */
  t20PoderGeral("acuidade-com-arma", "Acuidade com Arma", "combate", { pre: { atributos: { destreza: 1 } }, frase: "Usa Destreza no lugar de Força em ataques e dano com arma leve corpo a corpo ou de arremesso.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("ataque-poderoso", "Ataque Poderoso", "combate", { pre: { atributos: { forca: 1 } }, frase: "Sofre –2 no ataque corpo a corpo para ganhar +5 no dano.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("quebrar-aprimorado", "Quebrar Aprimorado", "combate", { pre: { poderes: ["ataque-poderoso"] }, frase: "+2 para quebrar; ao reduzir uma arma a 0 PV, gasta 1 PM para atacar o dono dela.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("trespassar", "Trespassar", "combate", { pre: { poderes: ["ataque-poderoso"] }, frase: "Ao derrubar um alvo com corpo a corpo, gasta 1 PM para atacar outra criatura ao alcance.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("combate-defensivo", "Combate Defensivo", "combate", { pre: { atributos: { inteligencia: 1 } }, frase: "Ao agredir, sofre –2 em ataques até o próximo turno e ganha +5 na Defesa.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("derrubar-aprimorado", "Derrubar Aprimorado", "combate", { pre: { poderes: ["combate-defensivo"] }, frase: "+2 para derrubar; ao derrubar, gasta 1 PM para um ataque extra no alvo.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("desarmar-aprimorado", "Desarmar Aprimorado", "combate", { pre: { poderes: ["combate-defensivo"] }, frase: "+2 para desarmar; gasta 1 PM para arremessar a arma do alvo para longe.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("empunhadura-poderosa", "Empunhadura Poderosa", "combate", { pre: { atributos: { forca: 3 } }, frase: "Arma de categoria maior sofre penalidade de –2 no ataque, e não de –5.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("encouracado", "Encouraçado", "combate", { pre: { texto: "Proficiência com armaduras pesadas" }, frase: "Com armadura pesada, +2 na Defesa; +2 a mais para cada outro Encouraçado que você tenha.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("fanatico", "Fanático", "combate", { pre: { nivel: 12, poderes: ["encouracado"] }, frase: "Seu deslocamento não é reduzido por armadura pesada.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("inexpugnavel", "Inexpugnável", "combate", { pre: { nivel: 6, poderes: ["encouracado"] }, frase: "Com armadura pesada, +2 em todos os testes de resistência.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("esquiva", "Esquiva", "combate", { pre: { atributos: { destreza: 1 } }, frase: "+2 na Defesa e em Reflexos.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("estilo-desarmado", "Estilo Desarmado", "combate", { pre: { pericias: ["Luta"] }, frase: "Ataques desarmados causam 1d6 e podem ser letais ou não letais.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("estilo-de-arma-e-escudo", "Estilo de Arma e Escudo", "combate", { pre: { pericias: ["Luta"], texto: "Proficiência com escudos" }, frase: "Com escudo, o bônus de Defesa dele aumenta em +2.", fonte: T20_FONTE_COMBATE, verificado: false, nota: "Tabela (p132) diz só 'Escudos'; texto (p131) diz treinado em Luta e proficiência com escudos. Usei o texto." }),
  t20PoderGeral("ataque-com-escudo", "Ataque com Escudo", "combate", { pre: { poderes: ["estilo-de-arma-e-escudo"] }, frase: "Com escudo e ação agredir, gasta 1 PM para um ataque extra com ele, sem perder o bônus de Defesa (uma vez por rodada).", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("bloqueio-com-escudo", "Bloqueio com Escudo", "combate", { pre: { poderes: ["estilo-de-arma-e-escudo"] }, frase: "Ao sofrer dano, gasta 1 PM para reduzir o dano pelo bônus de Defesa do escudo.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("estilo-de-arma-longa", "Estilo de Arma Longa", "combate", { pre: { atributos: { forca: 1 }, pericias: ["Luta"] }, frase: "+2 em ataques com armas alongadas, que também atingem alvos adjacentes.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("piqueiro", "Piqueiro", "combate", { pre: { poderes: ["estilo-de-arma-longa"] }, frase: "Com arma alongada, gasta 1 PM para atacar inimigo que entra no seu alcance; se ele investiu, +2 dados de dano.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("estilo-de-uma-arma", "Estilo de Uma Arma", "combate", { pre: { pericias: ["Luta"] }, frase: "Com arma corpo a corpo em uma mão e nada na outra: +2 na Defesa e nos ataques.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("ataque-preciso", "Ataque Preciso", "combate", { pre: { poderes: ["estilo-de-uma-arma"] }, frase: "Com arma em uma mão e nada na outra: +2 na margem de ameaça e +1 no multiplicador de crítico.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("estilo-de-duas-armas", "Estilo de Duas Armas", "combate", { pre: { atributos: { destreza: 2 }, pericias: ["Luta"] }, frase: "Ao agredir com duas armas (uma leve), faz dois ataques, com –2 em todos os testes até o próximo turno.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("arma-secundaria-grande", "Arma Secundária Grande", "combate", { pre: { poderes: ["estilo-de-duas-armas"] }, frase: "Permite empunhar duas armas de uma mão junto do Estilo de Duas Armas (texto curto e ambíguo).", fonte: T20_FONTE_COMBATE, verificado: false, nota: "Texto de uma frase, de leitura ambígua (p131). Conferir antes de usar." }),
  t20PoderGeral("estilo-de-duas-maos", "Estilo de Duas Mãos", "combate", { pre: { atributos: { forca: 2 }, pericias: ["Luta"] }, frase: "Com arma corpo a corpo de duas mãos, +5 no dano (não vale com armas leves).", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("ataque-pesado", "Ataque Pesado", "combate", { pre: { poderes: ["estilo-de-duas-maos"] }, frase: "Com arma de duas mãos, gasta 1 PM: se acertar, derruba ou empurra o alvo como ação livre.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("estilo-de-arremesso", "Estilo de Arremesso", "combate", { pre: { pericias: ["Pontaria"] }, frase: "Saca armas de arremesso como ação livre e tem +2 no dano com elas.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("arremesso-multiplo", "Arremesso Múltiplo", "combate", { pre: { atributos: { destreza: 1 }, poderes: ["estilo-de-arremesso"] }, frase: "Uma vez por rodada, gasta 1 PM para um ataque extra com outra arma de arremesso no mesmo alvo.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("arremesso-potente", "Arremesso Potente", "combate", { pre: { atributos: { forca: 1 }, poderes: ["estilo-de-arremesso"] }, frase: "Usa Força no lugar de Destreza com armas de arremesso.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("estilo-de-disparo", "Estilo de Disparo", "combate", { pre: { pericias: ["Pontaria"] }, frase: "Soma Destreza no dano com armas de disparo.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("disparo-preciso", "Disparo Preciso", "combate", { pre: { texto: "Estilo de Disparo ou Estilo de Arremesso" }, frase: "Ataques à distância contra alvos em combate corpo a corpo sem a penalidade de –5.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("mira-apurada", "Mira Apurada", "combate", { pre: { atributos: { sabedoria: 1 }, poderes: ["disparo-preciso"] }, frase: "Ao mirar, +2 em ataques à distância e na margem de ameaça até o fim do turno.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("disparo-rapido", "Disparo Rápido", "combate", { pre: { atributos: { destreza: 1 }, poderes: ["estilo-de-disparo"] }, frase: "Recarrega como ação livre; ação completa de agredir dá um ataque extra, com –2 até o próximo turno.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("finta-aprimorada", "Finta Aprimorada", "combate", { pre: { pericias: ["Enganação"] }, frase: "+2 em Enganação para fintar; fintar vira ação de movimento.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("foco-em-arma", "Foco em Arma", "combate", { pre: { texto: "Proficiência com a arma escolhida" }, frase: "Escolhe uma arma: +2 em ataques com ela; pode ser escolhido de novo para outras armas.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("ginete", "Ginete", "combate", { pre: { pericias: ["Cavalgar"] }, frase: "Passa em Cavalgar para não cair ao sofrer dano; sem penalidade para atacar à distância ou lançar magia montado.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("carga-de-cavalaria", "Carga de Cavalaria", "combate", { pre: { poderes: ["ginete"] }, frase: "Investida montada causa +2d8 de dano e permite continuar se movendo depois do ataque.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("presenca-aterradora", "Presença Aterradora", "combate", { pre: { pericias: ["Intimidação"] }, frase: "Gasta ação padrão e 1 PM para assustar criaturas escolhidas em alcance curto.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("proficiencia", "Proficiência", "combate", { pre: {}, frase: "Ganha uma proficiência (armas marciais, de fogo, armaduras pesadas ou escudos); pode ser escolhido de novo para outra.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("reflexos-de-combate", "Reflexos de Combate", "combate", { pre: { atributos: { destreza: 1 } }, frase: "Ganha uma ação de movimento extra no primeiro turno de cada combate.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("saque-rapido", "Saque Rápido", "combate", { pre: { pericias: ["Iniciativa"] }, frase: "+2 em Iniciativa; saca e guarda itens como ação livre; recarregar gasta uma categoria de ação a menos.", fonte: T20_FONTE_COMBATE, verificado: true }),
  t20PoderGeral("vitalidade", "Vitalidade", "combate", { pre: { atributos: { constituicao: 1 } }, frase: "+1 PV por nível e +2 em Fortitude.", fonte: T20_FONTE_COMBATE, verificado: true }),

  /* ---- Poderes de destino (livro, p132 e efeitos p135-p137) ---- */
  t20PoderGeral("acrobatico", "Acrobático", "destino", { pre: { atributos: { destreza: 2 } }, frase: "Usa Destreza em Atletismo; terreno difícil não reduz seu deslocamento nem impede investidas.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("ao-sabor-do-destino", "Ao Sabor do Destino", "destino", { pre: { nivel: 6 }, frase: "Sem usar itens mágicos (exceto poções), ganha bônus crescentes por nível.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("aparencia-inofensiva", "Aparência Inofensiva", "destino", { pre: { atributos: { carisma: 1 } }, frase: "A primeira criatura inteligente que atacar você na cena faz Vontade (CD Car) ou perde a ação.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("atletico", "Atlético", "destino", { pre: { atributos: { forca: 2 } }, frase: "+2 em Atletismo e +3 m de deslocamento.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("atraente", "Atraente", "destino", { pre: { atributos: { carisma: 1 } }, frase: "+2 em perícias de Carisma contra criaturas que se sintam atraídas por você.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("comandar", "Comandar", "destino", { pre: { atributos: { carisma: 1 } }, frase: "Ação de movimento e 1 PM: aliados em alcance médio ganham +1 em perícias até o fim da cena.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("costas-largas", "Costas Largas", "destino", { pre: { atributos: { constituicao: 1, forca: 1 } }, frase: "Limite de carga +5 espaços e um item vestido a mais.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("foco-em-pericia", "Foco em Perícia", "destino", { pre: { texto: "Treinado na perícia escolhida" }, frase: "Gasta 1 PM para rolar dois dados e usar o melhor em uma perícia (não Luta nem Pontaria).", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("inventario-organizado", "Inventário Organizado", "destino", { pre: { atributos: { inteligencia: 1 } }, frase: "Soma Inteligência ao limite de espaços; itens muito leves ou pequenos, de meio espaço, passam a ocupar 1/4.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("investigador", "Investigador", "destino", { pre: { atributos: { inteligencia: 1 } }, frase: "+2 em Investigação e soma Inteligência em Intuição.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("lobo-solitario", "Lobo Solitário", "destino", { pre: {}, frase: "+1 em perícias e Defesa sem aliado em alcance curto; sem penalidade para usar Cura em si mesmo.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("medicina", "Medicina", "destino", { pre: { atributos: { sabedoria: 1 }, pericias: ["Cura"] }, frase: "Ação completa e Cura (CD 15) para curar 1d6 PV, mais por margem; uma vez por dia em cada criatura.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("parceiro", "Parceiro", "destino", { pre: { nivel: 5, texto: "Treinado em Adestramento (parceiro animal) ou Diplomacia (parceiro humanoide)" }, frase: "Ganha um parceiro iniciante de tipo à escolha; se perdê-lo, recebe outro na próxima aventura.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("sentidos-agucados", "Sentidos Aguçados", "destino", { pre: { atributos: { sabedoria: 1 }, pericias: ["Percepção"] }, frase: "+2 em Percepção; não fica desprevenido contra inimigos que não vê; rola de novo o dado de camuflagem.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("sortudo", "Sortudo", "destino", { pre: {}, frase: "Gasta 3 PM para rolar de novo um teste recém-realizado (uma vez por teste).", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("surto-heroico", "Surto Heroico", "destino", { pre: {}, frase: "Uma vez por rodada, gasta 5 PM para uma ação padrão ou de movimento extra.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("torcida", "Torcida", "destino", { pre: { atributos: { carisma: 1 } }, frase: "+2 em perícias e na Defesa quando tem a torcida a seu favor.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("treinamento-em-pericia", "Treinamento em Perícia", "destino", { pre: {}, frase: "Treinado em uma perícia à escolha; pode ser escolhido de novo para outras perícias.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("venefico", "Venefício", "destino", { pre: { texto: "Treinado em Ofício (alquimista)" }, frase: "Usa veneno sem se envenenar e tem +2 na CD para resistir aos seus venenos.", fonte: T20_FONTE_DESTINO, verificado: true }),
  t20PoderGeral("vontade-de-ferro", "Vontade de Ferro", "destino", { pre: { atributos: { sabedoria: 1 } }, frase: "+1 PM a cada dois níveis e +2 em Vontade.", fonte: T20_FONTE_DESTINO, verificado: true }),

  /* ---- Poderes de magia (livro, p132 e efeitos p137) ---- */
  t20PoderGeral("celebrar-ritual", "Celebrar Ritual", "magia", { pre: { nivel: 8, texto: "Habilidade de classe Magias; treinado em Misticismo ou Religião" }, frase: "Lança magias como rituais: dobra o limite de PM, mas leva 1 h e custa T$ 10 por PM gasto.", fonte: T20_FONTE_MAGIA, verificado: true }),
  t20PoderGeral("escrever-pergaminho", "Escrever Pergaminho", "magia", { pre: { texto: "Habilidade de classe Magias; treinado em Ofício (escriba)" }, frase: "Usa Ofício (escriba) para fazer pergaminhos com as magias que conhece.", fonte: T20_FONTE_MAGIA, verificado: true }),
  t20PoderGeral("foco-em-magia", "Foco em Magia", "magia", { pre: { texto: "Lançar magias" }, frase: "Escolhe uma magia: custo –1 PM; pode ser escolhido de novo para outras magias.", fonte: T20_FONTE_MAGIA, verificado: true }),
  t20PoderGeral("magia-acelerada", "Magia Acelerada", "magia", { pre: { texto: "Lançar magias de 2º círculo" }, frase: "Aprimoramento: muda a execução para ação livre por +4 PM; uma vez por rodada.", fonte: T20_FONTE_MAGIA, verificado: true }),
  t20PoderGeral("magia-ampliada", "Magia Ampliada", "magia", { pre: { texto: "Lançar magias" }, frase: "Aprimoramento: aumenta o alcance em um passo ou dobra a área, por +2 PM.", fonte: T20_FONTE_MAGIA, verificado: true }),
  t20PoderGeral("magia-discreta", "Magia Discreta", "magia", { pre: { texto: "Lançar magias" }, frase: "Aprimoramento: lança sem gestos nem fala, por +2 PM; outros só notam com Misticismo (CD 20).", fonte: T20_FONTE_MAGIA, verificado: true }),
  t20PoderGeral("magia-ilimitada", "Magia Ilimitada", "magia", { pre: { texto: "Lançar magias" }, frase: "Soma o atributo-chave ao limite de PM que pode gastar em uma magia.", fonte: T20_FONTE_MAGIA, verificado: true }),
  t20PoderGeral("preparar-pocao", "Preparar Poção", "magia", { pre: { texto: "Habilidade de classe Magias; treinado em Ofício (alquimista)" }, frase: "Usa Ofício (alquimista) para fazer poções das magias de 1º e 2º círculos que conhece.", fonte: T20_FONTE_MAGIA, verificado: true }),

  /* ---- Poderes da Tormenta (livro, p134 e efeitos p142-p143) ---- */
  t20PoderGeral("anatomia-insana", "Anatomia Insana", "tormenta", { pre: {}, frase: "25% de ignorar o dano extra de crítico ou ataque furtivo; +25% a cada dois outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("legiao-aberrante", "Legião Aberrante", "tormenta", { pre: { poderes: ["anatomia-insana"], texto: "Três outros poderes da Tormenta" }, frase: "Passa por qualquer espaço onde cabe uma moeda; +1 em manobras e em resistências a efeitos que o têm como alvo; +1 a cada dois outros.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("antenas", "Antenas", "tormenta", { pre: {}, frase: "+1 em Iniciativa, Percepção e Vontade; +1 a cada dois outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("armamento-aberrante", "Armamento Aberrante", "tormenta", { pre: { texto: "Outro poder da Tormenta" }, frase: "1 PM: cria uma arma orgânica corpo a corpo ou de arremesso proficiente, que dura a cena; dano +1 passo a cada dois outros poderes.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("articulacoes-flexiveis", "Articulações Flexíveis", "tormenta", { pre: {}, frase: "+1 em Acrobacia, Furtividade e Reflexos; +1 a cada dois outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("asas-insetoides", "Asas Insetoides", "tormenta", { pre: { texto: "Quatro outros poderes da Tormenta" }, frase: "1 PM: voo de 9 m até o fim do turno; +1,5 m a cada outro poder da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("carapaca", "Carapaça", "tormenta", { pre: {}, frase: "+1 na Defesa; +1 a cada dois outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("corpo-aberrante", "Corpo Aberrante", "tormenta", { pre: { texto: "Outro poder da Tormenta" }, frase: "Dano desarmado +1 passo, e mais um passo a cada quatro outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("cuspir-enxame", "Cuspir Enxame", "tormenta", { pre: {}, frase: "Ação completa e 2 PM: enxame que causa 2d6 de ácido por turno; +1 PM para +1d6 a cada dois outros poderes.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("dentes-afiados", "Dentes Afiados", "tormenta", { pre: {}, frase: "Mordida natural (1d4, crítico x2, corte); uma vez por rodada, gasta 1 PM para um ataque extra com ela ao agredir.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("larva-explosiva", "Larva Explosiva", "tormenta", { pre: { poderes: ["dentes-afiados"] }, frase: "Criatura que sua mordida deixou a 0 PV explode em ácido (4d4) nos adjacentes; +2d4 a cada dois outros poderes; você é imune.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("desprezar-a-realidade", "Desprezar a Realidade", "tormenta", { pre: { texto: "Quatro outros poderes da Tormenta" }, frase: "2 PM: até o próximo turno ignora terreno difícil e tem 20% de chance de falha em efeitos contra você (+5% a cada dois outros, máximo 50%).", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("empunhadura-rubra", "Empunhadura Rubra", "tormenta", { pre: {}, frase: "1 PM: +1 em Luta até o fim da cena; +1 a cada dois outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("fome-de-mana", "Fome de Mana", "tormenta", { pre: {}, frase: "Ao passar em teste contra habilidade mágica, ganha 1 PM temporário (máximo por cena = número de poderes da Tormenta).", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("maos-membranosas", "Mãos Membranosas", "tormenta", { pre: {}, frase: "+1 em Atletismo, Fortitude e testes de agarrar; +1 a cada dois outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("membros-estendidos", "Membros Estendidos", "tormenta", { pre: {}, frase: "Alcance corpo a corpo +1,5 m; +1,5 m a cada quatro outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("membros-extras", "Membros Extras", "tormenta", { pre: { texto: "Quatro outros poderes da Tormenta" }, frase: "Duas armas naturais de patas (1d4, crítico x2, corte); ao agredir, 2 PM para um ataque extra com cada uma.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("mente-aberrante", "Mente Aberrante", "tormenta", { pre: {}, frase: "+1 em resistência a efeitos mentais; quem usa habilidade contra você sofre 1d6 de dano psíquico no seu teste de Vontade; +1 e +1d6 a cada dois outros.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("olhos-vermelhos", "Olhos Vermelhos", "tormenta", { pre: {}, frase: "Visão no escuro e +1 em Intimidação; +1 a cada dois outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("pele-corrompida", "Pele Corrompida", "tormenta", { pre: {}, frase: "Redução 2 de ácido, eletricidade, fogo, frio, luz e trevas; +2 a cada dois outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("sangue-acido", "Sangue Ácido", "tormenta", { pre: {}, frase: "Quem o ataca corpo a corpo sofre 1 de dano de ácido por poder da Tormenta que você tem.", fonte: T20_FONTE_TORMENTA, verificado: true }),
  t20PoderGeral("visco-rubro", "Visco Rubro", "tormenta", { pre: {}, frase: "1 PM: +1 em dano corpo a corpo até o fim da cena; +1 a cada dois outros poderes da Tormenta.", fonte: T20_FONTE_TORMENTA, verificado: true }),

  /* ---- Poderes concedidos (livro, p133 tabela e efeitos p138-p142; atributo-chave Sabedoria) ---- */
  t20PoderConcedido("afinidade-com-a-tormenta", "Afinidade com a Tormenta", "Devoto de Aharadak", "+10 em testes de resistência contra efeitos da Tormenta, de suas criaturas e de devotos de Aharadak; seu primeiro poder da Tormenta não reduz Carisma."),
  t20PoderConcedido("almejar-o-impossivel", "Almejar o Impossível", "Devoto de Valkaria ou Thwor", "Resultado 19 ou mais em perícia é sempre sucesso, qualquer que seja o alvo."),
  t20PoderConcedido("anfibio", "Anfíbio", "Devoto do Oceano", "Respira debaixo d'água e tem natação igual ao seu deslocamento terrestre."),
  t20PoderConcedido("apostar-com-o-trapaceiro", "Apostar com o Trapaceiro", "Devoto de Hyninn", "Gasta 1 PM em teste de perícia para apostar com Hyninn: você escolhe entre seu resultado e o oculto do mestre."),
  t20PoderConcedido("armas-da-ambicao", "Armas da Ambição", "Devoto de Valkaria", "+1 em ataques e na margem de ameaça com armas em que é proficiente."),
  t20PoderConcedido("arsenal-das-profundezas", "Arsenal das Profundezas", "Devoto do Oceano", "+2 em dano e +1 no multiplicador de crítico com azagaias, lanças e tridentes."),
  t20PoderConcedido("astucia-da-serpente", "Astúcia da Serpente", "Devoto de Sszzaas", "+2 em Enganação, Furtividade e Intuição."),
  t20PoderConcedido("ataque-piedoso", "Ataque Piedoso", "Devoto de Lena ou Thyatis", "Causa dano não letal com arma corpo a corpo sem a penalidade de –5."),
  t20PoderConcedido("aura-de-medo", "Aura de Medo", "Devoto de Kallyadranoch", "Gasta 2 PM: aura de medo de 9 m até o fim da cena; quem entra faz Vontade (CD Car) ou fica abalado."),
  t20PoderConcedido("aura-de-paz", "Aura de Paz", "Devoto de Marah", "Gasta 2 PM: aura de paz de alcance curto por uma cena; inimigo que age contra você faz Vontade (CD Car) ou perde a ação."),
  t20PoderConcedido("aura-restauradora", "Aura Restauradora", "Devoto de Lena", "Curas usadas por você e aliados em alcance curto recuperam +1 PV por dado."),
  t20PoderConcedido("bencao-do-mana", "Bênção do Mana", "Devoto de Wynna", "+1 PM a cada nível ímpar."),
  t20PoderConcedido("caricia-sombria", "Carícia Sombria", "Devoto de Tenebra", "Gasta 1 PM e ação padrão: toque de trevas (2d6, Fortitude CD Sab reduz à metade) que cura você pela metade do dano; pode aprender Toque Vampírico com –1 PM."),
  t20PoderConcedido("centelha-magica", "Centelha Mágica", "Devoto de Wynna", "Aprende e pode lançar uma magia arcana ou divina de 1º círculo à escolha."),
  t20PoderConcedido("compreender-os-ermos", "Compreender os Ermos", "Devoto de Allihanna", "+2 em Sobrevivência; usa Sabedoria em Adestramento."),
  t20PoderConcedido("conhecimento-enciclopedico", "Conhecimento Enciclopédico", "Devoto de Tanna-Toh", "Treinado em duas perícias baseadas em Inteligência à escolha."),
  t20PoderConcedido("conjurar-arma", "Conjurar Arma", "Devoto de Arsenal", "Gasta 1 PM: invoca arma corpo a corpo ou de arremesso proficiente (+1 em ataque e dano, mágica, dura a cena); cria 20 munições de disparo."),
  t20PoderConcedido("coragem-total", "Coragem Total", "Devoto de Arsenal, Khalmyr, Lin-Wu ou Valkaria", "Imune a efeitos de medo, mágicos ou não; não elimina fobias raciais."),
  t20PoderConcedido("cura-gentil", "Cura Gentil", "Devoto de Lena", "Soma Carisma aos PV restaurados por seus efeitos mágicos de cura."),
  t20PoderConcedido("curandeira-perfeita", "Curandeira Perfeita", "Devoto de Lena", "Pode escolher 10 em Cura; sem penalidade sem maleta, e +2 com ela (+5 se aprimorada)."),
  t20PoderConcedido("dedo-verde", "Dedo Verde", "Devoto de Allihanna", "Aprende Controlar Plantas; se aprender de novo, o custo cai 1 PM."),
  t20PoderConcedido("descanso-natural", "Descanso Natural", "Devoto de Allihanna", "Dormir ao relento conta como descanso confortável."),
  t20PoderConcedido("dom-da-esperanca", "Dom da Esperança", "Devoto de Marah", "Soma Sabedoria aos PV no lugar de Constituição; imune a alquebrado, esmorecido e frustrado."),
  t20PoderConcedido("dom-da-imortalidade", "Dom da Imortalidade", "Devoto de Thyatis, paladino", "Volta à vida 3d6 dias depois de morrer; só paladinos; não combina com Dom da Ressurreição."),
  t20PoderConcedido("dom-da-profecia", "Dom da Profecia", "Devoto de Thyatis", "Aprende Augúrio (–1 PM se aprender de novo); gasta 2 PM para +2 em um teste."),
  t20PoderConcedido("dom-da-ressurreicao", "Dom da Ressurreição", "Devoto de Thyatis, clérigo", "Ação completa e todos os PM: ressuscita criatura morta há menos de um ano com 1 PV e 0 PM, perdendo 1 de Constituição; uma vez por criatura; não combina com Dom da Imortalidade."),
  t20PoderConcedido("dom-da-verdade", "Dom da Verdade", "Devoto de Khalmyr", "Gasta 2 PM: +5 em Intuição e em Percepção contra Enganação e Furtividade até o fim da cena."),
  t20PoderConcedido("escamas-draconicas", "Escamas Dracônicas", "Devoto de Kallyadranoch", "+2 na Defesa e em Fortitude."),
  t20PoderConcedido("escudo-magico", "Escudo Mágico", "Devoto de Wynna", "Ao lançar magia, ganha bônus na Defesa igual ao círculo da magia até seu próximo turno."),
  t20PoderConcedido("espada-justiceira", "Espada Justiceira", "Devoto de Khalmyr", "Gasta 1 PM: a arma de corte empunhada tem dano +1 passo até o fim da cena."),
  t20PoderConcedido("espada-solar", "Espada Solar", "Devoto de Azgher", "Gasta 1 PM: arma corpo a corpo de corte causa +1d6 de fogo até o fim da cena."),
  t20PoderConcedido("extase-da-loucura", "Êxtase da Loucura", "Devoto de Aharadak ou Nimb", "Ganha 1 PM temporário sempre que criaturas falham em Vontade contra suas habilidades mágicas; limite por cena igual à Sabedoria.", { nota: "Tabela (p133) grafa 'Êstase'; o texto (p139) diz 'Êxtase', adotado aqui." }),
  t20PoderConcedido("familiar-ofidico", "Familiar Ofídico", "Devoto de Sszzaas", "Recebe um familiar cobra que não conta no limite de parceiros."),
  t20PoderConcedido("farsa-do-fingidor", "Farsa do Fingidor", "Devoto de Hyninn", "Aprende Criar Ilusão (–1 PM se aprender de novo)."),
  t20PoderConcedido("fe-guerreira", "Fé Guerreira", "Devoto de Arsenal", "Usa Sabedoria em Guerra; em combate, gasta 2 PM para trocar um teste de perícia (não de ataque) por um de Guerra."),
  t20PoderConcedido("forma-de-macaco", "Forma de Macaco", "Devoto de Hyninn", "Ação completa e 2 PM: vira macaco Minúsculo com escalada de 9 m; termina ao atacar, lançar magia ou sofrer dano."),
  t20PoderConcedido("fulgor-solar", "Fulgor Solar", "Devoto de Azgher", "Redução 5 de frio e trevas; ao ser atacado, gasta 1 PM para ofuscar o atacante por uma rodada."),
  t20PoderConcedido("furia-divina", "Fúria Divina", "Devoto de Thwor", "Gasta 2 PM: até o fim da cena, +2 em ataques e dano corpo a corpo, mas sem ações que exijam paciência ou concentração."),
  t20PoderConcedido("golpista-divino", "Golpista Divino", "Devoto de Hyninn", "+2 em Enganação, Jogatina e Ladinagem."),
  t20PoderConcedido("habitante-do-deserto", "Habitante do Deserto", "Devoto de Azgher", "Redução 10 de fogo; gasta 1 PM para criar água potável suficiente para um odre."),
  t20PoderConcedido("inimigo-de-tenebra", "Inimigo de Tenebra", "Devoto de Azgher", "+1d6 de dano contra mortos-vivos; efeitos de luz que cria dobram o alcance da iluminação."),
  t20PoderConcedido("kiai-divino", "Kiai Divino", "Devoto de Lin-Wu", "Uma vez por rodada, ao atacar corpo a corpo, gasta 3 PM: se acertar, causa dano máximo sem rolar."),
  t20PoderConcedido("liberdade-divina", "Liberdade Divina", "Devoto de Valkaria", "Gasta 2 PM: imunidade a efeitos de movimento por uma rodada."),
  t20PoderConcedido("manto-da-penumbra", "Manto da Penumbra", "Devoto de Tenebra", "Aprende Escuridão (–1 PM se aprender de novo)."),
  t20PoderConcedido("mente-analitica", "Mente Analítica", "Devoto de Tanna-Toh", "+2 em Intuição, Investigação e Vontade."),
  t20PoderConcedido("mente-vazia", "Mente Vazia", "Devoto de Lin-Wu", "+2 em Iniciativa, Percepção e Vontade."),
  t20PoderConcedido("mestre-dos-mares", "Mestre dos Mares", "Devoto do Oceano", "Fala com animais aquáticos; aprende Acalmar Animal só contra criaturas aquáticas (–1 PM se aprender de novo)."),
  t20PoderConcedido("olhar-amedrontador", "Olhar Amedrontador", "Devoto de Megalokk ou Thwor", "Aprende Amedrontar (–1 PM se aprender de novo)."),
  t20PoderConcedido("palavras-de-bondade", "Palavras de Bondade", "Devoto de Marah", "Aprende Enfeitiçar (–1 PM se aprender de novo)."),
  t20PoderConcedido("percepcao-temporal", "Percepção Temporal", "Devoto de Aharadak", "Gasta 3 PM: soma Sabedoria (limitada pelo nível) a ataques, Defesa e Reflexos até o fim da cena."),
  t20PoderConcedido("pesquisa-abencoada", "Pesquisa Abençoada", "Devoto de Tanna-Toh", "Após 1 h de pesquisa, rola de novo um teste de perícia de Inteligência ou Sabedoria da cena; com livros, +2 ou +5."),
  t20PoderConcedido("poder-oculto", "Poder Oculto", "Devoto de Nimb", "Ação de movimento e 2 PM: 1d6 dá +2 em Força, Destreza ou Constituição até o fim da cena."),
  t20PoderConcedido("presas-primordiais", "Presas Primordiais", "Devoto de Kallyadranoch ou Megalokk", "Gasta 1 PM: dentes viram presas (mordida 1d6, crítico x2, perfuração) até o fim da cena, com ataque extra ao agredir."),
  t20PoderConcedido("presas-venenosas", "Presas Venenosas", "Devoto de Sszzaas", "Ação de movimento e 1 PM: envenena arma corpo a corpo empunhada; o acerto causa perda de 1d12 PV."),
  t20PoderConcedido("rejeicao-divina", "Rejeição Divina", "Devoto de Aharadak", "Resistência a magia divina +5."),
  t20PoderConcedido("reparar-injustica", "Reparar Injustiça", "Devoto de Khalmyr", "Uma vez por rodada, gasta 2 PM: oponente em alcance curto que acerta você ou aliado repete o ataque, valendo o pior resultado."),
  t20PoderConcedido("sangue-de-ferro", "Sangue de Ferro", "Devoto de Arsenal", "Gasta 3 PM: +2 em dano e redução de dano 5 até o fim da cena."),
  t20PoderConcedido("sangue-ofidico", "Sangue Ofídico", "Devoto de Sszzaas", "Resistência a veneno +5; CD para resistir aos seus venenos +2."),
  t20PoderConcedido("servos-do-dragao", "Servos do Dragão", "Devoto de Kallyadranoch", "Ação completa e 2 PM: invoca 2d4+1 kobolds capangas, com 1 PV, que somem ao morrer ou no fim da cena."),
  t20PoderConcedido("sopro-do-mar", "Sopro do Mar", "Devoto do Oceano", "Ação padrão e 1 PM: cone de 6 m de frio (2d6, Reflexos CD Sab reduz à metade); aprende Sopro das Uivantes (–1 PM)."),
  t20PoderConcedido("sorte-dos-loucos", "Sorte dos Loucos", "Devoto de Nimb", "Gasta 1 PM: rola de novo um teste recém-realizado; se falhar de novo, perde 1d6 PM."),
  t20PoderConcedido("talento-artistico", "Talento Artístico", "Devoto de Marah", "+2 em Acrobacia, Atuação e Diplomacia."),
  t20PoderConcedido("teurgista-mistico", "Teurgista Místico", "Devoto de Wynna; habilidade de classe Magias", "Uma magia de cada círculo aprendida pode ser de outra tradição: divina para arcano, arcana para divino."),
  t20PoderConcedido("tradicao-de-lin-wu", "Tradição de Lin-Wu", "Devoto de Lin-Wu", "Katana é arma simples; se for proficiente em armas marciais, +1 na margem de ameaça dela."),
  t20PoderConcedido("transmissao-da-loucura", "Transmissão da Loucura", "Devoto de Nimb", "Aprende Sussurros Insanos (CD Car); se aprender de novo, o custo cai 1 PM."),
  t20PoderConcedido("tropas-duyshidakk", "Tropas Duyshidakk", "Devoto de Thwor", "Ação completa e 2 PM: invoca 1d4+1 goblinoides capangas, com 1 PV, que somem ao morrer ou no fim da cena."),
  t20PoderConcedido("urro-divino", "Urro Divino", "Devoto de Megalokk", "Gasta 1 PM ao atacar ou lançar magia: soma Constituição (mínimo +1) ao dano."),
  t20PoderConcedido("visao-nas-trevas", "Visão nas Trevas", "Devoto de Tenebra", "Enxerga perfeitamente no escuro, inclusive em magias de escuridão."),
  t20PoderConcedido("voz-da-civilizacao", "Voz da Civilização", "Devoto de Tanna-Toh", "Está sempre sob efeito de Compreensão."),
  t20PoderConcedido("voz-da-natureza", "Voz da Natureza", "Devoto de Allihanna", "Fala com animais; aprende Acalmar Animal só contra animais (–1 PM se aprender de novo)."),
  t20PoderConcedido("voz-dos-monstros", "Voz dos Monstros", "Devoto de Megalokk", "Conhece os idiomas de monstros inteligentes e conversa com os não inteligentes (Int –4 ou menos), como com Voz Divina."),
  t20PoderConcedido("zumbificar", "Zumbificar", "Devoto de Tenebra", "Ação completa e 3 PM: reanima cadáver Pequeno ou Médio adjacente por um dia como parceiro; pode sacrificá-lo para sofrer metade do dano.")
];

const T20_PODERES = Object.fromEntries(T20_PODERES_LISTA.map(p => [p.id, p]));
