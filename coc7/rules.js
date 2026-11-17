/* Call of Cthulhu 7ª edição (Chaosium): dados de regra.
   Só mecânica e nomes em palavras próprias. Nenhum texto de livro, tabela copiada ou arte.
   Processo: REGRA COMPLETA (Keeper Rulebook) como base. O Quick-Start oficial só é fonte onde coincide.
   Cada dado leva `fonte`. "NÃO VERIFICADO" = não confirmado em duas fontes independentes
   (ou com fontes em conflito): o app usa o valor, mostra o aviso, e o item está listado em
   docs/VERIFICACAO_COC7.md (conferência de 2026-11-17), docs/AUDITORIA_COC7.md e docs/TRABALHO_COC7_REGRAS.md. */

const COC_NV = "NÃO VERIFICADO";
const COC_FONTE_QS = "Chaosium, Quick-Start 7ª ed. (wiki oficial, Investigadores, passos 1 a 5)";
const COC_FONTE_R20 = "Roll20 Compendium, regras de criação da 7ª ed.";
const COC_FONTE_AUTOCALC = "Chaosium, ficha AutoCalc (instruções oficiais)";
const COC_FONTE_DERIVADOS = "Chaosium, wiki Investigadores (passo 2), e Roll20 Compendium, Part Two (PV, Sanidade inicial, PM e Sorte, em 2 fontes cada); Sanidade máxima 99 − Mitos: " + COC_NV + " (só posts de fórum: um cita a p. 155 do livro, edição não identificada; nenhum guia ou wiki confirmou)";

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
const COC_DISTRIBUICAO_FONTE = `${COC_FONTE_QS}, passo 1; Roll20 Compendium, Part One (mesmos oito valores)`;

/* ---- Idade ---- */
const COC_IDADE = { min: 15, max: 90, fonte: `${COC_FONTE_AUTOCALC}; ${COC_FONTE_R20}` };
/* Faixas de idade (regra completa). Conferência de 2026-11-17 e pesquisa complementar (docs/TRABALHO_COC7_REGRAS.md).
   tipo "fixo": reduz o alvo pelo valor. tipo "escolha": o jogador escolhe um alvo da lista (valor = total da faixa).
   tipo "divisao": o jogador divide o total entre dois alvos (escolhe quanto vai para o primeiro; o resto vai para o segundo).
   Faixas de 40 anos em diante acumulam (uma por faixa atingida). Faixas 15-19 valem só para quem tem essa idade. */
const COC_FAIXAS_IDADE = [
  { min: 15, max: 19, rotulo: "15 a 19 anos", melhorias: 0, mov: 0, sorteDuasRolagens: true,
    efeitos: [{ tipo: "fixo", alvo: "edu", valor: -5 },
      { tipo: "divisao", alvos: ["for", "tam"], total: 5, rotulo: "FOR e TAM (5 pontos divididos)" }],
    fonte: "Confirmado em 2 fontes: EDU −5, e 5 pontos a dividir entre FOR e TAM (WorldAnvil, com a regra citada; The Role Players Guild, que lista FOR, TAM e EDU). " +
      "Sorte rolada duas vezes, fica a maior (TRG; Renegade). CONFLITO: Renegade dá −5 em cada (FOR, TAM e EDU); não aplicado. " +
      "Sem redução de MOV (trpgline e Renegade começam a redução de MOV aos 40)." },
  { min: 20, max: 39, rotulo: "20 a 39 anos", melhorias: 1, mov: 0, efeitos: [],
    fonte: "Confirmado em 4 fontes: 1 teste de melhoria de EDU nesta faixa (trpgline, WorldAnvil, Renegade, TRG). " +
      "NÃO VERIFICADO: +5 pontos entre FOR e TAM aos 20 (só trpgline; WorldAnvil não lista ajuste nesta faixa). Não aplicado." },
  { min: 40, max: 49, rotulo: "40 a 49 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: "Confirmado em 3 fontes (trpgline, WorldAnvil, Renegade): APA −5 e FOR, CON ou DES −5 (total 5). MOV −1: trpgline e Renegade. " +
      "Testes de EDU: 1 nesta faixa, 2 no total até 49 (trpgline, WorldAnvil). Simplificação do app: um alvo por faixa." },
  { min: 50, max: 59, rotulo: "50 a 59 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -5, rotulo: "FOR, CON ou DES" }],
    fonte: "Confirmado em 2 fontes (trpgline, WorldAnvil): FOR, CON ou DES com total 10 e APA com total 10. Testes de EDU: 1 nesta faixa (3 no total). " +
      "MOV −2 no total: trpgline e Renegade. Simplificação do app: um alvo por faixa." },
  { min: 60, max: 69, rotulo: "60 a 69 anos", melhorias: 1, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -10, rotulo: "FOR, CON ou DES" }],
    fonte: "Confirmado em 2 fontes (trpgline, WorldAnvil): FOR, CON ou DES −10 nesta faixa (total 20); APA com total 15. Testes de EDU: 1 nesta faixa (4 no total). " +
      "MOV −1 nesta faixa (trpgline; Renegade dá a regra por década). CONFLITO: Renegade dá total 15 de FOR, CON e DES; não aplicado. Simplificação do app: um alvo por faixa." },
  { min: 70, max: 79, rotulo: "70 a 79 anos", melhorias: 0, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -20, rotulo: "FOR, CON ou DES" }],
    fonte: "Confirmado em 2 fontes (trpgline, WorldAnvil): FOR, CON ou DES −20 nesta faixa (total 40); APA com total 20; nenhum teste de EDU. " +
      "MOV −1 nesta faixa (trpgline; Renegade). CONFLITO: Renegade dá um teste de EDU por década; não aplicado. Simplificação do app: um alvo por faixa." },
  { min: 80, max: 90, rotulo: "80 a 90 anos", melhorias: 0, mov: -1,
    efeitos: [{ tipo: "fixo", alvo: "apa", valor: -5 }, { tipo: "escolha", opcoes: ["for", "con", "des"], valor: -40, rotulo: "FOR, CON ou DES" }],
    fonte: "Confirmado em 2 fontes (trpgline, WorldAnvil): FOR, CON ou DES −40 nesta faixa (total 80); APA com total 25; nenhum teste de EDU. " +
      "MOV −1 nesta faixa (trpgline; Renegade). Simplificação do app: um alvo por faixa." }
];

/* Teste de melhoria de EDU: a EDU é um "improvement check" (trpgline, aos 20 e em cada faixa de teste). Se o d100 for acima da EDU atual,
   soma 1d10 à EDU (Renegade; o mecanismo é o de melhoria de perícia do Chaosium, rewards of success). Duas fontes: confirmado. */
const COC_MELHORIA_EDU = { dado: 100, ganho: "1d10", regra: "d100 acima da EDU atual soma 1d10",
  fonte: "trpgline (teste de melhoria de EDU, por faixa de idade); Renegade (d100 acima da EDU, +1D10); mecanismo: Chaosium, rewards of success" };

/* ---- Derivados ---- */
/* Movimento (regra completa): 7 se FOR e DES são ambas menores que TAM; 9 se ambas são maiores; 8 nos demais casos.
   Roll20 (Table 2) dá as três faixas; Renegade dá 7 e 9 e um 6 no meio (conflito, descartado). O 8 do caso geral também é o
   valor do Quick-Start (MOV 8 para humanos). Ordem não verificada: o app usa FOR, DES e TAM depois dos ajustes de idade. */
const COC_MOV = { fonte: "Roll20 Compendium, Step Two, tabela de movimento (7, 8 ou 9 conforme FOR e DES em relação a TAM), e Renegade (7 e 9). " +
  "Caso geral 8, também no Quick-Start. Redução por idade: −1 por faixa a partir de 40 (trpgline e Renegade). " +
  "NÃO VERIFICADO: se a comparação usa os valores antes ou depois dos ajustes de idade (o app usa os valores depois)." };

/* Dano e Corpo pela soma FOR+TAM. Faixas acima de 204 não confirmadas: o app não calcula. */
const COC_DANO = [
  { min: 2, max: 64, dano: "-2", corpo: -2 },
  { min: 65, max: 84, dano: "-1", corpo: -1 },
  { min: 85, max: 124, dano: "0", corpo: 0 },
  { min: 125, max: 164, dano: "+1D4", corpo: 1 },
  { min: 165, max: 204, dano: "+1D6", corpo: 2 }
];
const COC_DANO_FONTE = `${COC_FONTE_QS}, passo 2 (Dano e Corpo); ${COC_FONTE_R20}, Part Two`;
const COC_DANO_ACIMA_NV = "Faixas de FOR+TAM acima de 204: " + COC_NV + " (as fontes conferidas param em 204; nenhuma tabela estendida encontrada)";


/* Teto de perícia na criação: não confirmado. Nenhuma fonte confirma 90%: o Roll20 diz que não há teto;
   um fórum cita 75% como máximo opcional (edição não citada). Hoje é só AVISO (não bloqueia, em nenhum modo). */
const COC_TETO_PERICIA = { valor: 90, aviso: "regra não confirmada",
  fonte: COC_NV + " (nenhuma fonte confirma 90%: Roll20 diz que não há teto; fórum cita 75% opcional). Aviso, não bloqueia" };

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
   espec: aceita especialização em texto. Todas as bases têm 2 ou mais fontes (ver COC_PERICIAS_FONTE). */
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
/* Bases conferidas em 2 ou mais fontes. Arte e Ofício (5) e Arqueologia (1): Roll20 Step Five e página Cascadia (WorldAnvil).
   Psicanálise (1) e Idioma (outro) (1): Roll20 Step Five e Quick-Start japonês (K1, conferido em VERIFICACAO_COC7). Demais bases: 2 ou mais fontes. */
const COC_PERICIAS_FONTE = `${COC_FONTE_QS}, passo 3 (Dodge = DEX/2; Idioma próprio = EDU; Mitos sem pontos iniciais). ` +
  `Arte e Ofício 5 e Arqueologia 1: Roll20 Step Five e WorldAnvil (Cascadia). Psicanálise 1 e Idioma (outro) 1: Roll20 Step Five e Quick-Start japonês (K1)`;

/* ---- Armas básicas (mecânica: perícia, dano, alcance, tiros). Só entram itens com a mesma linha em 2 fontes. ---- */
const COC_ARMAS_FONTE = "Chaosium, wiki Equipment (Ammunition & Weapons), e Roll20 Compendium, Ammunition & Weapons: mesmas linhas de dano, alcance e tiros";
const COC_ARMAS = [
  { id: "soco_ingles", nome: "Soco-inglês", pericia: "briga", dano: "1D3+1", db: true, alcance: "Toque", tiros: null, fonte: COC_ARMAS_FONTE },
  { id: "faca_pequena", nome: "Faca pequena (ex.: canivete)", pericia: "briga", dano: "1D4", db: true, alcance: "Toque", tiros: null, fonte: COC_ARMAS_FONTE },
  { id: "faca_media", nome: "Faca média (ex.: faca de cozinha)", pericia: "briga", dano: "1D4+2", db: true, alcance: "Toque", tiros: null, fonte: COC_ARMAS_FONTE },
  { id: "faca_grande", nome: "Faca grande (ex.: facão)", pericia: "briga", dano: "1D8", db: true, alcance: "Toque", tiros: null, fonte: COC_ARMAS_FONTE },
  { id: "revolver_32", nome: "Revólver .32 ou 7,65 mm", pericia: "arma_pistola", dano: "1D8", db: false, alcance: "15 jardas", tiros: 6, fonte: COC_ARMAS_FONTE },
  { id: "automatica_32", nome: "Automática .32 ou 7,65 mm", pericia: "arma_pistola", dano: "1D8", db: false, alcance: "15 jardas", tiros: 8, fonte: COC_ARMAS_FONTE },
  { id: "espingarda_12", nome: "Espingarda calibre 12", pericia: "arma_rifle", dano: "4D6/2D6/1D6", db: false, alcance: "10 / 20 / 50 jardas", tiros: null, fonte: COC_ARMAS_FONTE }
];

/* Helpers de consulta. */
function cocPericia(id){ return COC_PERICIAS.find(p => p.id === id) || null; }
function cocCaracteristica(id){ return COC_CARACTERISTICAS.find(c => c.id === id) || null; }
function cocOcupacao(id){ return COC_OCUPACOES.find(o => o.id === id) || null; }
function cocFaixaIdade(idade){ return COC_FAIXAS_IDADE.find(f => idade >= f.min && idade <= f.max) || null; }
