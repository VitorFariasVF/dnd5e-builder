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
   Poderes gerais de combate, destino, magia e tormenta NÃO foram levantados: a lista geral da [E] veio sem pré-requisitos
   e as páginas individuais não abriram. Ver docs/TRABALHO_T20_NIVEIS_PODERES.md. */

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

const T20_PODERES_LISTA = [
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

  /* ---- Gerais e concedidos (só nomes levantados) ---- */
  t20PoderDe("acuidade-com-arma", "Acuidade com Arma", { tipo: "geral", fonte: T20_PF_GERAL, nota: "Pré-requisitos não lidos." }),
  t20PoderDe("esquiva", "Esquiva", { tipo: "geral", fonte: T20_PF_GERAL, nota: "Pré-requisitos não lidos." }),
  t20PoderDe("mobilidade", "Mobilidade", { tipo: "geral", fonte: T20_PF_GERAL, nota: "Pré-requisitos não lidos." }),
  t20PoderDe("dom-da-verdade", "Dom da Verdade", { tipo: "concedido", fonte: T20_PF_GERAL, nota: "Concedido por Khalmyr, segundo [E]." }),
  t20PoderDe("aura-belica", "Aura Bélica", { tipo: "concedido", fonte: T20_PF_GERAL, nota: "Concedido por Keenn, segundo [E]." })
];

const T20_PODERES = Object.fromEntries(T20_PODERES_LISTA.map(p => [p.id, p]));
