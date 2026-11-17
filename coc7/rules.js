/* Call of Cthulhu 7ª edição (Chaosium): dados de regra.
   Só mecânica e nomes em palavras próprias. Nenhum texto de livro, tabela copiada ou arte.
   Cada dado leva `fonte`. "NÃO VERIFICADO" = não confirmado em duas fontes independentes
   (ou com fontes em conflito): o app usa o valor, mostra o aviso, e o item está listado em
   docs/VERIFICACAO_COC7.md (conferência de 2026-11-17) e em docs/AUDITORIA_COC7.md. */

const COC_NV = "NÃO VERIFICADO";
const COC_FONTE_QS = "Chaosium, Quick-Start 7ª ed. (wiki oficial, Investigadores, passos 1 a 5)";
const COC_FONTE_R20 = "Roll20 Compendium, regras de criação da 7ª ed.";
const COC_FONTE_AUTOCALC = "Chaosium, ficha AutoCalc (instruções oficiais)";
const COC_FONTE_DERIVADOS = "Chaosium, wiki Investigadores (passo 2), e Roll20 Compendium, Part Two (PV, Sanidade inicial, PM e Sorte, em 2 fontes cada); Sanidade máxima 99 − Mitos: " + "NÃO VERIFICADO (1 fonte, fórum)";

/* ---- Características (3d6×5 ou (2d6+6)×5) ---- */
const COC_CARACTERISTICAS = [
  { id: "for", nome: "Força", sigla: "FOR", dados: "3d6", fonte: `${COC_FONTE_QS}; ${COC_FONTE_R20}` },
  { id: "con", nome: "Constituição", sigla: "CON", dados: "3d6", fonte: `${COC_FONTE_QS}; ${COC_FONTE_R20}` },
  { id: "tam", nome: "Tamanho", sigla: "TAM", dados: "2d6+6", fonte: `${COC_FONTE_QS}; ${COC_FONTE_R20}` },
  { id: "des", nome: "Destreza", sigla: "DES", dados: "3d6", fonte: `${COC_FONTE_QS}; ${COC_FONTE_R20}` },
  { id: "apa", nome: "Aparência", sigla: "APA", dados: "3d6", fonte: `${COC_FONTE_QS}; ${COC_FONTE_R20}` },
  { id: "int", nome: "Inteligência", sigla: "INT", dados: "2d6+6", fonte: `${COC_FONTE_QS}; ${COC_FONTE_R20}` },
  { id: "pod", nome: "Poder", sigla: "POD", dados: "3d6", fonte: `${COC_FONTE_QS}; ${COC_FONTE_R20}` },
  { id: "edu", nome: "Educação", sigla: "EDU", dados: "2d6+6", fonte: `${COC_FONTE_QS}; ${COC_FONTE_R20}` }
];
const COC_MULTIPLICADOR_CARAC = 5;
const COC_DADOS = {
  "3d6": { qtd: 3, lados: 6, soma: 0 },
  "2d6+6": { qtd: 2, lados: 6, soma: 6 }
};

/* Método "distribuir valores": os oito valores abaixo são alocados livremente entre as características. */
const COC_DISTRIBUICAO = [40, 50, 50, 50, 60, 60, 70, 80];
const COC_DISTRIBUICAO_FONTE = `${COC_FONTE_QS}, passo 1 (valores para distribuir)`;

/* ---- Idade ---- */
const COC_IDADE = { min: 15, max: 90, fonte: `${COC_FONTE_AUTOCALC}; ${COC_FONTE_R20}` };
/* Faixas de idade. Conferência de 2026-11-17 (docs/VERIFICACAO_COC7.md). Cada faixa diz no campo `fonte` o que está
   confirmado em duas fontes e o que é NÃO VERIFICADO.
   tipo "fixo": reduz o alvo pelo valor. tipo "escolha": o jogador escolhe um alvo da lista.
   Faixas de 40 anos em diante acumulam (uma por faixa atingida). Faixas 15-19 valem só para quem tem essa idade. */
const COC_FAIXAS_IDADE = [
  { min: 15, max: 19, rotulo: "15 a 19 anos", melhorias: 0, mov: 0, sorteDuasRolagens: true,
    efeitos: [{ tipo: "fixo", alvo: "edu", valor: -5 }, { tipo: "escolha", opcoes: ["for", "tam"], valor: -5, rotulo: "FOR ou TAM" }],
    fonte: "Confirmado em 2 fontes: Sorte rolada duas vezes, fica a maior (TRG; Renegade Outplayed). " +
      "Confirmado em 2 fontes: a idade perde pontos de EDU e de FOR/SIZ. NÃO VERIFICADO: os valores (-5 cada?) e a escolha FOR ou TAM. " +
      "Sem redução de MOV: 2 fontes dizem que o MOV cai só a partir de 40 (trpgline; TRG). Corrigido nesta conferência (antes -1)." },
  { min: 20, max: 39, rotulo: "20 a 39 anos", melhorias: 1, mov: 0, efeitos: [],
    fonte: "Confirmado em 3 fontes: 1 teste de EDU na faixa de 20 a 39. NÃO VERIFICADO: +5 pontos entre FOR e SIZ aos 20 (1 fonte, não implementado)." },
  { min: 40, max: 49, rotulo: "40 a 49 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: "Confirmado em 2 fontes: APA -5, uma de FOR/CON/DES -5, MOV -1. NÃO VERIFICADO: testes de EDU (trpgline dá 1 aos 40; Renegade dá 2 nos 40)." },
  { min: 50, max: 59, rotulo: "50 a 59 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: "Confirmado em 2 fontes: MOV -1 por faixa, acumulado (MOV -2 aos 50). NÃO VERIFICADO: acumulação de APA e FOR/CON/DES (as fontes divergem: TRG diz que não acumula)." },
  { min: 60, max: 69, rotulo: "60 a 69 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: "MOV -1 por faixa (2 fontes). NÃO VERIFICADO: valores de APA e FOR/CON/DES e testes de EDU (as fontes divergem)." },
  { min: 70, max: 79, rotulo: "70 a 79 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: "MOV -1 por faixa (2 fontes). NÃO VERIFICADO: valores de APA e FOR/CON/DES e testes de EDU (as fontes divergem)." },
  { min: 80, max: 90, rotulo: "80 a 90 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: "MOV -1 por faixa (2 fontes). NÃO VERIFICADO: valores de APA e FOR/CON/DES e testes de EDU (as fontes divergem)." }
];

/* Teste de melhoria de EDU: d100 acima da EDU atual soma 1d10 à EDU. O mecanismo é o da melhoria de perícia
   (Chaosium, "rewards of success": d100 acima do valor soma 1d10), mas a aplicação à EDU vem de 1 fonte (Renegade). NÃO VERIFICADO. */
const COC_MELHORIA_EDU = { dado: 100, ganho: "1d10", regra: "d100 acima da EDU atual soma 1d10", fonte: COC_NV };

/* ---- Derivados ---- */
/* MOV 8 é o valor do processo simplificado do Quick-Start (wiki oficial e edição japonesa licenciada: 2 fontes).
   A regra completa tem MOV 7, 8 ou 9 conforme FOR e DES em relação ao TAM (Roll20 e Renegade). Os dois valores
   do meio divergem (8 no Roll20, 6 no Renegade): CONFLITO, não aplicado. */
const COC_MOV_BASE = { valor: 8, fonte: `${COC_FONTE_QS}, processo simplificado (MOV 8 para humanos). Regra completa com MOV condicional: CONFLITO, não aplicada` };

/* Dano e Corpo pela soma FOR+TAM. Faixas acima de 204 não confirmadas: o app não calcula. */
const COC_DANO = [
  { min: 2, max: 64, dano: "-2", corpo: -2 },
  { min: 65, max: 84, dano: "-1", corpo: -1 },
  { min: 85, max: 124, dano: "0", corpo: 0 },
  { min: 125, max: 164, dano: "+1D4", corpo: 1 },
  { min: 165, max: 204, dano: "+1D6", corpo: 2 }
];
const COC_DANO_FONTE = `${COC_FONTE_QS}, passo 2 (Dano e Corpo); ${COC_FONTE_R20}, Part Two`;
const COC_DANO_ACIMA_NV = "Faixas de FOR+TAM acima de 204: " + COC_NV;


/* Teto de perícia na criação: NÃO VERIFICADO. Nenhuma fonte confirma 90%: o Roll20 diz que não há teto,
   um fórum cita 75% como máximo opcional (edição não citada). Valor mantido (aviso e erro) até decisão. */
const COC_TETO_PERICIA = { valor: 90, fonte: COC_NV + " (nenhuma fonte confirma 90%: Roll20 diz que não há teto; fórum cita 75% opcional)" };

/* ---- Ocupações ----
   formula.base: soma de característica × multiplicador.
   formula.alternativas: uma das listas (o jogador escolhe a característica).
   grupos: o jogador escolhe `n` perícias dentro de `opcoes`.
   pericias: perícias de ocupação fixas. livres: nº de perícias de qualquer tipo à escolha. */
const COC_OCUPACOES = [
  { id: "arqueologo", nome: "Arqueólogo", credito: [10, 40],
    formula: { base: [{ c: "edu", m: 4 }] },
    pericias: ["avaliacao", "arqueologia", "historia", "idioma_outro", "biblioteca", "procurar", "mecanico"],
    grupos: [{ rotulo: "Navegação ou Ciência", opcoes: ["navegacao", "ciencia"], n: 1 }], livres: 0 },
  { id: "autor", nome: "Autor", credito: [9, 30],
    formula: { base: [{ c: "edu", m: 4 }] },
    pericias: ["arte", "historia", "biblioteca", "idioma_outro", "idioma_proprio", "psicologia"],
    grupos: [{ rotulo: "Natureza ou Ocultismo", opcoes: ["natureza", "ocultismo"], n: 1 }], livres: 1 },
  { id: "ladrao", nome: "Ladrão", credito: [5, 40],
    formula: { base: [{ c: "edu", m: 2 }, { c: "des", m: 2 }] },
    pericias: ["avaliacao", "escalar", "escutar", "chaveiro", "prestidigitacao", "furtividade", "procurar"],
    grupos: [{ rotulo: "Reparo Elétrico ou Mecânico", opcoes: ["eletrico", "mecanico"], n: 1 }], livres: 0 },
  { id: "diletante", nome: "Diletante", credito: [50, 99],
    formula: { base: [{ c: "edu", m: 2 }, { c: "apa", m: 2 }] },
    pericias: ["arte", "idioma_outro", "dirigir"],
    grupos: [
      { rotulo: "Arma de fogo", opcoes: ["arma_pistola", "arma_rifle"], n: 1 },
      { rotulo: "Perícia interpessoal", opcoes: ["charme", "labia", "intimidacao", "persuasao"], n: 1 }
    ], livres: 3 },
  { id: "explorador", nome: "Explorador", credito: [55, 80],
    formula: { base: [{ c: "edu", m: 2 }], alternativas: [[{ c: "apa", m: 2 }], [{ c: "des", m: 2 }], [{ c: "for", m: 2 }]] },
    pericias: ["historia", "saltar", "natureza", "navegacao", "idioma_outro", "sobrevivencia"],
    grupos: [
      { rotulo: "Escalar ou Nadar", opcoes: ["escalar", "nadar"], n: 1 },
      { rotulo: "Arma de fogo", opcoes: ["arma_pistola", "arma_rifle"], n: 1 }
    ], livres: 0 },
  { id: "jornalista", nome: "Jornalista investigativo", credito: [9, 30],
    formula: { base: [{ c: "edu", m: 4 }] },
    pericias: ["arte", "historia", "biblioteca", "idioma_proprio", "psicologia"],
    grupos: [{ rotulo: "Perícia interpessoal", opcoes: ["charme", "labia", "intimidacao", "persuasao"], n: 1 }], livres: 2 },
  { id: "enfermeiro", nome: "Enfermeiro", credito: [9, 30],
    formula: { base: [{ c: "edu", m: 4 }] },
    pericias: ["primeiros", "escutar", "medicina", "ciencia", "procurar", "psicologia"],
    grupos: [{ rotulo: "Perícia interpessoal", opcoes: ["charme", "labia", "intimidacao", "persuasao"], n: 1 }], livres: 0 },
  { id: "detetive", nome: "Detetive particular", credito: [9, 30],
    formula: { base: [{ c: "edu", m: 2 }], alternativas: [[{ c: "des", m: 2 }], [{ c: "for", m: 2 }]] },
    pericias: ["arte", "disfarce", "direito", "biblioteca", "psicologia", "procurar"],
    grupos: [{ rotulo: "Perícia interpessoal", opcoes: ["charme", "labia", "intimidacao", "persuasao"], n: 1 }], livres: 1 },
  { id: "professor", nome: "Professor", credito: [20, 70],
    formula: { base: [{ c: "edu", m: 4 }] },
    pericias: ["biblioteca", "idioma_outro", "idioma_proprio", "psicologia"],
    grupos: [], livres: 4 },
  { id: "soldado", nome: "Soldado", credito: [9, 30],
    formula: { base: [{ c: "edu", m: 2 }], alternativas: [[{ c: "des", m: 2 }], [{ c: "for", m: 2 }]] },
    pericias: ["briga", "esquivar", "furtividade", "sobrevivencia"],
    grupos: [
      { rotulo: "Arma de fogo", opcoes: ["arma_pistola", "arma_rifle"], n: 1 },
      { rotulo: "Escalar ou Nadar", opcoes: ["escalar", "nadar"], n: 1 },
      { rotulo: "Dois de: Primeiros Socorros, Reparo Mecânico ou Idioma (outro)", opcoes: ["primeiros", "mecanico", "idioma_outro"], n: 2 }
    ], livres: 0 }
];
const COC_OCUPACOES_FONTE = `${COC_FONTE_R20}, Step Four (Determine Occupation). Jornalista: fórmula EDU × 4 e crédito 9 a 30 confirmados em 2 fontes (Roll20; TRG). As outras nove ocupações: ${COC_NV} (1 fonte)`;

/* Pontos de interesse pessoal: INT × 2 (regra completa). Confirmado em 2 fontes: Roll20 Step Five e TRG.
   O Quick-Start oficial usa outro método (4 perícias com +20), que o app não usa. */
const COC_INTERESSE = { c: "int", m: 2, fonte: "Roll20 Compendium, Step Five; The Role Players Guild (INT × 2, confirmado em 2 fontes). Método do Quick-Start (4 perícias +20) não usado" };

/* ---- Perícias ----
   base: número, "des2" (metade da DES), "edu" (igual à EDU) ou "crédito" (0, definido pela ocupação).
   espec: aceita especialização em texto. nv: base em 1 fonte apenas (NÃO VERIFICADO); as demais têm 2 ou mais fontes. */
const COC_PERICIAS = [
  { id: "arma_pistola", nome: "Armas de Fogo (Pistola)", base: 20 },
  { id: "arma_rifle", nome: "Armas de Fogo (Rifle/Espingarda)", base: 25 },
  { id: "arqueologia", nome: "Arqueologia", base: 1, nv: true },
  { id: "arte", nome: "Arte e Ofício", base: 5, espec: true, nv: true },
  { id: "avaliacao", nome: "Avaliação", base: 5 },
  { id: "biblioteca", nome: "Usar Biblioteca", base: 20 },
  { id: "briga", nome: "Briga", base: 25 },
  { id: "charme", nome: "Charme", base: 15, interpessoal: true },
  { id: "chaveiro", nome: "Chaveiro", base: 1 },
  { id: "ciencia", nome: "Ciência", base: 1, espec: true },
  { id: "credito", nome: "Crédito", base: 0, ocupacao: true },
  { id: "dirigir", nome: "Condução", base: 20 },
  { id: "direito", nome: "Direito", base: 5 },
  { id: "disfarce", nome: "Disfarce", base: 5 },
  { id: "escalar", nome: "Escalar", base: 20 },
  { id: "escutar", nome: "Escutar", base: 20 },
  { id: "esquivar", nome: "Esquivar", base: "des2" },
  { id: "furtividade", nome: "Furtividade", base: 20 },
  { id: "historia", nome: "História", base: 5 },
  { id: "idioma_outro", nome: "Idioma (outro)", base: 1, espec: true, nv: true },
  { id: "idioma_proprio", nome: "Idioma (próprio)", base: "edu" },
  { id: "intimidacao", nome: "Intimidação", base: 15, interpessoal: true },
  { id: "labia", nome: "Lábia", base: 5, interpessoal: true },
  { id: "medicina", nome: "Medicina", base: 1 },
  { id: "mecanico", nome: "Reparo Mecânico", base: 10 },
  { id: "eletrico", nome: "Reparo Elétrico", base: 10 },
  { id: "mitos", nome: "Mitos de Cthulhu", base: 0, sem_pontos: true },
  { id: "nadar", nome: "Nadar", base: 20 },
  { id: "natureza", nome: "Natureza", base: 10 },
  { id: "navegacao", nome: "Navegação", base: 10 },
  { id: "ocultismo", nome: "Ocultismo", base: 5 },
  { id: "persuasao", nome: "Persuasão", base: 10, interpessoal: true },
  { id: "pilotar", nome: "Pilotar", base: 1, espec: true },
  { id: "prestidigitacao", nome: "Prestidigitação", base: 10 },
  { id: "primeiros", nome: "Primeiros Socorros", base: 30 },
  { id: "procurar", nome: "Procurar", base: 25 },
  { id: "psicanalise", nome: "Psicanálise", base: 1, nv: true },
  { id: "psicologia", nome: "Psicologia", base: 10 },
  { id: "rastrear", nome: "Rastrear", base: 10 },
  { id: "saltar", nome: "Saltar", base: 20 },
  { id: "sobrevivencia", nome: "Sobrevivência", base: 10, espec: true }
];
/* Bases conferidas em 2 ou mais fontes (Quick-Start oficial, Roll20 Step Five, Roll20 Step Two, artigo do Investigator's Handbook),
   exceto as com `nv: true`: 1 fonte apenas. */
const COC_PERICIAS_FONTE = `${COC_FONTE_QS}, passo 3 (Dodge = DEX/2; Idioma próprio = EDU; Mitos sem pontos iniciais). Bases confirmadas em 2 fontes, exceto ${COC_NV} (1 fonte): Arte e Ofício, Arqueologia, Psicanálise e Idioma (outro)`;

/* Helpers de consulta. */
function cocPericia(id){ return COC_PERICIAS.find(p => p.id === id) || null; }
function cocCaracteristica(id){ return COC_CARACTERISTICAS.find(c => c.id === id) || null; }
function cocOcupacao(id){ return COC_OCUPACOES.find(o => o.id === id) || null; }
function cocFaixaIdade(idade){ return COC_FAIXAS_IDADE.find(f => idade >= f.min && idade <= f.max) || null; }
