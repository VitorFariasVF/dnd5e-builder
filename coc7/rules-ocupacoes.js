/* coc7/rules-ocupacoes.js: ocupações adicionais da 7ª edição (Call of Cthulhu, Chaosium).
   Carregado depois de rules.js. Estende o próprio array COC_OCUPACOES (sem editar rules.js):
   - ocupações novas entram com push;
   - ocupações que já existem em rules.js recebem `fonte` e `nv` via Object.assign, sem mudar fórmula, crédito nem perícias.
   Só mecânica (fórmulas, faixas de crédito, nomes de perícias). Nenhum texto de livro.
   `nv: true` = NÃO VERIFICADO (1 fonte apenas ou fontes em conflito). `nv: false` = confirmada em 2 fontes que concordam.
   Conferência de 2026-11-17: ver docs/TRABALHO_COC7_OCUPACOES.md. */
(function(){
  const NV = "NÃO VERIFICADO";
  const R20 = "Roll20 Compendium, Step Four (Determine Occupation)";
  const R20_PAGINA = "Roll20 Compendium, página própria da ocupação";
  const GD = "GamersDecide (guia de fãs, citando Investigator's Handbook)";
  const INTERPESSOAL = { rotulo: "Perícia interpessoal", opcoes: ["charme", "labia", "intimidacao", "persuasao"], n: 1 };
  const ARMA = { rotulo: "Arma de fogo", opcoes: ["arma_pistola", "arma_rifle"], n: 1 };

  const NOVAS = [
    { id: "antiquario", nome: "Antiquário", credito: [30, 70],
      formula: { base: [{ c: "edu", m: 4 }] },
      pericias: ["avaliacao", "arte", "historia", "biblioteca", "idioma_outro", "procurar"],
      grupos: [INTERPESSOAL], livres: 1, nv: false,
      fonte: "CONFIRMADO em 2 fontes: " + R20_PAGINA + " (EDU × 4; crédito 30 a 70) e blog Zardoz, 2016 (EDU × 4; crédito 30 a 70). " +
        "Perícias: Roll20, página de amostras, e Zardoz (Arte e Ofício, Avaliação, História, Biblioteca, Idioma, Procurar, uma interpessoal e uma livre)." },

    { id: "medico", nome: "Médico", credito: [30, 80],
      formula: { base: [{ c: "edu", m: 4 }] },
      pericias: ["primeiros", "idioma_outro", "medicina", "psicologia", "ciencia"],
      grupos: [], livres: 2, nv: false,
      fonte: "CONFIRMADO em 2 fontes: " + R20_PAGINA + " (EDU × 4; crédito 30 a 80) e " + GD + ", p. 78 (EDU × 4; crédito 30 a 80). " +
        "Limite do app: a Ciência aparece uma vez (Biologia); a Farmácia, a 2ª especialização de Ciência, é registrada como especialização." },

    { id: "detetive_policial", nome: "Detetive policial", credito: [20, 50],
      formula: { base: [{ c: "edu", m: 2 }], alternativas: [[{ c: "des", m: 2 }], [{ c: "for", m: 2 }]] },
      pericias: ["direito", "escutar", "psicologia", "procurar"],
      grupos: [ARMA,
        { rotulo: "Arte (atuação) ou Disfarce", opcoes: ["arte", "disfarce"], n: 1 },
        INTERPESSOAL],
      livres: 1, nv: true,
      fonte: NV + " (1 fonte: " + R20_PAGINA + ", Police Detective, EDU × 2 + (DES ou FOR) × 2; crédito 20 a 50). Sem segunda fonte." },

    { id: "espiao", nome: "Espião", credito: [20, 60],
      formula: { base: [{ c: "edu", m: 2 }], alternativas: [[{ c: "apa", m: 2 }], [{ c: "des", m: 2 }]] },
      pericias: ["escutar", "idioma_outro", "psicologia", "prestidigitacao", "furtividade"],
      grupos: [ARMA,
        { rotulo: "Arte (atuação) ou Disfarce", opcoes: ["arte", "disfarce"], n: 1 },
        INTERPESSOAL],
      livres: 0, nv: true,
      fonte: NV + " (1 fonte: " + GD + ", p. 90; EDU × 2 + (APA ou DES) × 2; crédito 20 a 60). Sem segunda fonte." },

    { id: "agente_federal", nome: "Agente federal", credito: [20, 40],
      formula: { base: [{ c: "edu", m: 4 }] },
      pericias: ["dirigir", "briga", "direito", "persuasao", "furtividade", "procurar"],
      grupos: [ARMA], livres: 1, nv: true,
      fonte: NV + " (1 fonte: " + GD + ", p. 80; EDU × 4; crédito 20 a 40). Sem segunda fonte." },

    { id: "chefe_gangue", nome: "Chefe de gangue", credito: [60, 95],
      formula: { base: [{ c: "edu", m: 2 }, { c: "apa", m: 2 }] },
      pericias: ["briga", "direito", "escutar", "psicologia", "procurar"],
      grupos: [ARMA, { rotulo: "Duas perícias interpessoais", opcoes: ["charme", "labia", "intimidacao", "persuasao"], n: 2 }],
      livres: 0, nv: true,
      fonte: NV + " (1 fonte: " + GD + ", p. 81; EDU × 2 + APA × 2; crédito 60 a 95). Sem segunda fonte." },

    { id: "fotografo", nome: "Fotógrafo", credito: [9, 30],
      formula: { base: [{ c: "edu", m: 4 }] },
      pericias: ["arte", "psicologia", "ciencia", "furtividade", "procurar"],
      grupos: [INTERPESSOAL], livres: 0, nv: true,
      fonte: NV + " (1 fonte: " + GD + ", p. 86; EDU × 4; crédito 9 a 30). Arte é Fotografia e Ciência é Química, por especialização. Sem segunda fonte." },

    { id: "cacador", nome: "Caçador de grande porte", credito: [20, 50],
      formula: { base: [{ c: "edu", m: 2 }], alternativas: [[{ c: "des", m: 2 }], [{ c: "for", m: 2 }]] },
      pericias: ["natureza", "navegacao", "ciencia", "furtividade", "rastrear"],
      grupos: [ARMA,
        { rotulo: "Escutar ou Procurar", opcoes: ["escutar", "procurar"], n: 1 },
        { rotulo: "Outro idioma ou Sobrevivência", opcoes: ["idioma_outro", "sobrevivencia"], n: 1 }],
      livres: 0, nv: true,
      fonte: NV + " (1 fonte: " + GD + ", p. 73; EDU × 2 + (DES ou FOR) × 2; crédito 20 a 50). Sem segunda fonte." },

    { id: "pesquisador", nome: "Pesquisador", credito: [9, 30],
      formula: { base: [{ c: "edu", m: 4 }] },
      pericias: ["historia", "biblioteca", "idioma_outro", "procurar"],
      grupos: [INTERPESSOAL], livres: 3, nv: true,
      fonte: NV + " (1 fonte: WorldAnvil, página \"researcher profession\" de um autor de guias da 7ª ed.; EDU × 4; crédito 9 a 30). " +
        "As três perícias livres são campos de estudo. Sem segunda fonte." }
  ];

  /* Ocupações já em rules.js: só ganham fonte e nv (fórmula, crédito e perícias não mudam). */
  const EXISTENTES = {
    arqueologo: { nv: true, fonte: NV + " (1 fonte: " + R20 + ", EDU × 4; crédito 10 a 40). Sem segunda fonte." },
    autor: { nv: false, fonte: "CONFIRMADO em 2 fontes: " + R20 + " (EDU × 4; crédito 9 a 30) e " + GD + ", p. 72 (EDU × 4; crédito 9 a 30)." },
    ladrao: { nv: true, fonte: NV + " (1 fonte: " + R20 + " e a página Cat Burglar do mesmo site; EDU × 2 + DES × 2; crédito 5 a 40). Sem segunda fonte." },
    diletante: { nv: true, fonte: NV + " (1 fonte: " + R20 + "; EDU × 2 + APA × 2; crédito 50 a 99). Sem segunda fonte." },
    explorador: { nv: true, fonte: NV + " (1 fonte: " + R20 + " e a página Explorer do mesmo site; crédito 55 a 80). Sem segunda fonte." },
    jornalista: { nv: false, fonte: "CONFIRMADO em 2 fontes: " + R20 + " (EDU × 4; crédito 9 a 30) e The Role Players Guild, criação de investigador (EDU × 4; crédito 9 a 30). Perícias só do Roll20." },
    enfermeiro: { nv: true, fonte: NV + " (1 fonte: " + R20 + "; EDU × 4; crédito 9 a 30). Sem segunda fonte." },
    detetive: { nv: true, fonte: NV + " (1 fonte: " + R20 + ", Private Investigator; EDU × 2 + (DES ou FOR) × 2; crédito 9 a 30). Sem segunda fonte." },
    professor: { nv: false, fonte: "CONFIRMADO em 2 fontes: " + R20 + " (EDU × 4; crédito 20 a 70) e WorldAnvil, página \"professor profession\" (EDU × 4; crédito 20 a 70)." },
    soldado: { nv: false, fonte: "CONFIRMADO em 2 fontes: " + R20 + " (EDU × 2 + (DES ou FOR) × 2; crédito 9 a 30) e WorldAnvil, página \"soldier/marine profession\" (mesma fórmula e crédito). " +
      "Nas duas fontes, Firearms é perícia fixa; o app a trata como escolha entre pistola e rifle." }
  };

  NOVAS.forEach(o => COC_OCUPACOES.push(o));
  Object.keys(EXISTENTES).forEach(id => {
    const o = cocOcupacao(id);
    if(o) Object.assign(o, EXISTENTES[id]);
  });
})();
