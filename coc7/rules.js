/* Call of Cthulhu 7ª edição (Chaosium): dados de regra.
   Só mecânica e nomes em palavras próprias. Nenhum texto de livro, tabela copiada ou arte.
   Cada dado leva `fonte`. "NÃO VERIFICADO" = não confirmado em mais de uma fonte pública:
   o app usa o valor, mas mostra o aviso, e o item está listado em docs/AUDITORIA_COC7.md. */

const COC_NV = "NÃO VERIFICADO";
const COC_FONTE_QS = "Chaosium, Quick-Start 7ª ed. (wiki oficial, Investigadores, passos 1 a 5)";
const COC_FONTE_R20 = "Roll20 Compendium, regras de criação da 7ª ed.";
const COC_FONTE_AUTOCALC = "Chaosium, ficha AutoCalc (instruções oficiais)";

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
/* Faixas de idade. Os efeitos abaixo NÃO foram confirmados em duas fontes públicas (ver auditoria).
   tipo "fixo": reduz o alvo pelo valor. tipo "escolha": o jogador escolhe um alvo da lista.
   Faixas de 40 anos em diante acumulam (uma por faixa atingida). Faixas 15-19 valem só para quem tem essa idade. */
const COC_FAIXAS_IDADE = [
  { min: 15, max: 19, rotulo: "15 a 19 anos", melhorias: 0, mov: -1, sorteDuasRolagens: true,
    efeitos: [{ tipo: "fixo", alvo: "edu", valor: -5 }, { tipo: "escolha", opcoes: ["for", "tam"], valor: -5, rotulo: "FOR ou TAM" }],
    fonte: COC_NV },
  { min: 20, max: 39, rotulo: "20 a 39 anos", melhorias: 1, mov: 0, efeitos: [], fonte: COC_NV },
  { min: 40, max: 49, rotulo: "40 a 49 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: COC_NV },
  { min: 50, max: 59, rotulo: "50 a 59 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: COC_NV },
  { min: 60, max: 69, rotulo: "60 a 69 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: COC_NV },
  { min: 70, max: 79, rotulo: "70 a 79 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: COC_NV },
  { min: 80, max: 90, rotulo: "80 a 90 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: COC_NV }
];

/* Teste de melhoria de EDU: d100 acima da EDU atual soma 1d10 à EDU. NÃO VERIFICADO em duas fontes. */
const COC_MELHORIA_EDU = { dado: 100, ganho: "1d10", regra: "d100 acima da EDU atual soma 1d10", fonte: COC_NV };

/* ---- Derivados ---- */
const COC_MOV_BASE = { valor: 8, fonte: `${COC_FONTE_QS}, passo 2 (todo humano tem MOV 8)` };
/* Regra condicional de MOV (7 ou 9 conforme FOR/DES em relação ao TAM) aparece só numa fonte
   (Roll20) e conflita com a da Chaosium: não aplicada. Ver auditoria. */

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


/* Teto de perícia na criação: NÃO VERIFICADO. Valor usado só para o aviso. */
const COC_TETO_PERICIA = { valor: 90, fonte: COC_NV };

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
const COC_OCUPACOES_FONTE = `${COC_FONTE_R20}, Step Four (Determine Occupation): fórmula, crédito e perícias de cada ocupação`;

/* Pontos de interesse pessoal: INT × 2. NÃO VERIFICADO (a fonte consultada não traz a fórmula). */
const COC_INTERESSE = { c: "int", m: 2, fonte: COC_NV };

/* ---- Perícias ----
   base: número, "des2" (metade da DES), "edu" (igual à EDU) ou "crédito" (0, definido pela ocupação).
   espec: aceita especialização em texto. base NÃO VERIFICADO, exceto os casos marcados. */
const COC_PERICIAS = [
  { id: "arma_pistola", nome: "Armas de Fogo (Pistola)", base: 20 },
  { id: "arma_rifle", nome: "Armas de Fogo (Rifle/Espingarda)", base: 25 },
  { id: "arqueologia", nome: "Arqueologia", base: 1 },
  { id: "arte", nome: "Arte e Ofício", base: 5, espec: true },
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
  { id: "idioma_outro", nome: "Idioma (outro)", base: 1, espec: true },
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
  { id: "psicanalise", nome: "Psicanálise", base: 1 },
  { id: "psicologia", nome: "Psicologia", base: 10 },
  { id: "rastrear", nome: "Rastrear", base: 10 },
  { id: "saltar", nome: "Saltar", base: 20 },
  { id: "sobrevivencia", nome: "Sobrevivência", base: 10, espec: true }
];
const COC_PERICIAS_FONTE = `${COC_FONTE_QS}, passo 3 (Dodge = DEX/2; Idioma próprio = EDU; Mitos sem pontos iniciais). Demais bases: ${COC_NV}`;

/* Helpers de consulta. */
function cocPericia(id){ return COC_PERICIAS.find(p => p.id === id) || null; }
function cocCaracteristica(id){ return COC_CARACTERISTICAS.find(c => c.id === id) || null; }
function cocOcupacao(id){ return COC_OCUPACOES.find(o => o.id === id) || null; }
function cocFaixaIdade(idade){ return COC_FAIXAS_IDADE.find(f => idade >= f.min && idade <= f.max) || null; }
