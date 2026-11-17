/* tormenta20/rules-niveis.js: progressão por nível, níveis 6 a 20, das 14 classes do livro básico.
   Carregado depois de rules.js (usa T20_CLASSES) e antes de rules-poderes.js.

   Formato de T20_NIVEIS:
     { versao, nivelMin: 6, nivelMax: 20, treino: {regra, fonte, verificado},
       classes: { <id da classe>: { nome, fonte, verificado: {pv, pm, circulo, magia},
                                    notas, niveis: [ <linha por nível 6..20> ] } } }
   Linha de nível:
     nivel       número do nível (6 a 20)
     pv, pm      PV e PM ganhos NESTE nível (null em pv = conflito entre fontes, ver notas)
     treino      bônus de treinamento neste nível (metade do nível, arredondada para baixo)
     circulo     maior círculo de magia disponível neste nível (null = não informado na fonte)
     magiaNova   true se o nível dá uma magia nova (null não aplicável; false = não conjurador)
     poderDeClasse  true se o nível dá uma escolha de poder de classe
     habilidades [{nome, frase}] habilidades de classe do nível; frase null = efeito não lido na fonte
     poderes     ids (em T20_PODERES) cujo acesso começa neste nível
     verificado  {pv, pm, circulo, magia}: true só com duas fontes independentes

   Fontes (fãs e guias; o livro e a ficha oficial da Jambô não puderam ser abertos):
     [E] exegetadearton.com.br, página de cada classe (progressão e poderes com nível)
     [R] Rotina de Mestre, guia do Ladino e guia do Bardo (conferem partes de [E])
   Todo dado vem de [E] salvo quando indicado. PV/PM ganhos conferem com T20_CLASSES de rules.js (teste 07).
   Para o que não estava nas fontes, a linha fica sem habilidade e a lacuna vai em docs/TRABALHO_T20_NIVEIS_PODERES.md.
   Mecânica somente: frases curtas em palavras próprias, sem texto de livro. */

const T20_NIVEIS_FONTE_E = "[E] exegetadearton.com.br, página da classe (NÃO VERIFICADO em segunda fonte)";

/* Especificação por classe. Os níveis são montados por t20NiveisMontar (abaixo). */
const T20_NIVEIS_ESPEC = {
  arcanista: {
    nome: "Arcanista", fonte: T20_NIVEIS_FONTE_E, pv: 2, pm: 6, poderDeClasseDe: 2, magia: "todos",
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: { 20: [{ nome: "Alta Arcana", frase: "Custo em PM das magias arcanas cai pela metade." }] },
    poderes: { 6: ["heranca-aprimorada"], 8: ["mestre-em-escola"], 9: ["contramagica-superior", "trama-celere"],
      10: ["fluxo-de-mana"], 11: ["heranca-superior"], 17: ["apoteose", "sifao-de-mana"] },
    notas: "Círculo não informado: [E] dá 2º no 5º e 3º no 9º, e o Bardo e o Druida em [E] dão 2º no 6º, 3º no 10º e 4º no 14º. As fontes conflitam, então a linha fica sem círculo (NÃO VERIFICADO). Níveis 13 e 17 não entram. Magia nova: uma por nível, conforme [E]."
  },
  barbaro: {
    nome: "Bárbaro", fonte: T20_NIVEIS_FONTE_E, pv: 6, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: {
      8: [{ nome: "Redução de Dano", frase: "Sobe para 4 (derivado da regra de +2 a cada três níveis a partir do 5º)." }],
      11: [{ nome: "Redução de Dano", frase: "Sobe para 6 (derivado da mesma regra)." }],
      14: [{ nome: "Redução de Dano", frase: "Sobe para 8 (derivado da mesma regra)." }],
      17: [{ nome: "Redução de Dano", frase: "Sobe para 10, o teto da classe." }],
      20: [{ nome: "Fúria Titânica", frase: "O bônus da Fúria dobra." }]
    },
    poderes: { 6: ["critico-brutal", "espiritualista"], 7: ["manifestar-totem"], 8: ["pele-de-aco"],
      10: ["instinto-indomavel"], 11: ["furia-elemental", "invocar-os-ancestrais", "revide"],
      15: ["instinto-furioso"], 17: ["enigma-do-aco"] },
    notas: "Incrementos de PV e PM vêm só de [E]. Os níveis da Redução de Dano são derivados da regra de [E], não de tabela."
  },
  bardo: {
    nome: "Bardo", fonte: "[E] exegetadearton.com.br (progressão) e [R] Rotina de Mestre, guia do Bardo (círculos e magias)",
    pv: null, pm: 4, poderDeClasseDe: 2, magia: "pares",
    circulos: [[6, 2], [10, 3], [14, 4]], verif: { pv: false, pm: true, circ: true, magia: true },
    habs: { 20: [{ nome: "Artista Completo", frase: "Inspiração vira ação livre e o custo em PM das habilidades de bardo cai pela metade." }] },
    poderes: { 6: ["estrelato", "prestidigitacao", "performance-crescendo", "artista-versatil"],
      10: ["danca-das-laminas", "manipular-em-massa"], 11: ["inspiracao-espirituosa"],
      17: ["celebridade-artoniana", "ressoar"] },
    notas: "CONFLITO de PV: [E] 16 inicial e +4 por nível; [R] 12 mais CON e +3 mais CON por nível. PV por nível fica null. PM +4 confere nas duas. CONFLITO de poderes: [E] dá poder de bardo em todo nível a partir do 2º; [R] só em níveis ímpares. Magias nos níveis pares: [E] e [R] concordam. Os níveis de aprimoramento da Inspiração não entram (as fontes divergem)."
  },
  bucaneiro: {
    nome: "Bucaneiro", fonte: T20_NIVEIS_FONTE_E, pv: 4, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: {
      10: [{ nome: "Evasão Aprimorada", frase: "Sem dano em sucesso e metade do dano em falha no teste de Reflexos." }],
      20: [{ nome: "Sorte de Nimb", frase: "Gasta 5 PM para rolar de novo um teste recém-feito." }]
    },
    poderes: { 6: ["amigos-no-porto", "pegou-no-chapeu"], 7: ["remise"], 10: ["touche"],
      11: ["lorotas-da-terra-e-do-mar", "amigo-do-passado"], 12: ["ripostar"], 17: ["lobo-do-mar"] },
    notas: "Esquiva Sagaz sobe +1 a cada quatro níveis, mas [E] não diz em quais níveis; fica de fora."
  },
  cacador: {
    nome: "Caçador", fonte: T20_NIVEIS_FONTE_E, pv: 4, pm: 4, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: { 20: [{ nome: "Mestre Caçador", frase: "Marca da Presa vira ação livre; gasta 5 PM para +2 na margem de ameaça." }] },
    poderes: { 6: ["bote", "camuflagem", "escaramuca"], 8: ["sequencia-do-predador"],
      11: ["avanco-do-predador", "sequencia-dilaceradora", "sede-de-sangue"],
      12: ["chuva-de-laminas", "escaramuca-superior"], 17: ["tempestade-de-laminas"], 20: ["mestre-armadilheiro"] },
    notas: "[E] traz 'escolha de poder' em todo nível de 6 a 20, sem dizer o início (2º ou outro); o início fica fora desta faixa. Marca da Presa e Explorador sobem a cada quatro e cinco níveis; os níveis exatos não foram informados e não entram."
  },
  cavaleiro: {
    nome: "Cavaleiro", fonte: T20_NIVEIS_FONTE_E, pv: 5, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: {
      11: [{ nome: "Resoluto", frase: "Refaz um teste para se livrar de condição." }],
      20: [{ nome: "Bravura Final", frase: "Continua de pé com 3 PM ao chegar a 0 PV ou menos." }]
    },
    poderes: { 6: ["autoridade-feudal"], 10: ["titulo"], 11: ["mestre-das-posturas"],
      12: ["especializacao-em-armadura"], 14: ["estandarte"], 17: ["grao-mestre"] },
    notas: "Baluarte (a cada quatro níveis) e Duelo (a cada cinco) sobem em níveis não informados; ficam de fora."
  },
  clerigo: {
    nome: "Clérigo", fonte: T20_NIVEIS_FONTE_E, pv: 4, pm: 5, poderDeClasseDe: 2, magia: "todos",
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: { 20: [{ nome: "Mão da Divindade", frase: "Lança três magias divinas sem custo de PM, mas fica atordoado depois." }] },
    poderes: { 6: ["forca-da-devocao"], 7: ["arma-divina"], 9: ["canalizar-poderoso", "presente-dos-deuses"],
      11: ["canalizar-abencoado", "canalizar-concentrado", "canalizar-profanado"], 12: ["mestre-celebrante"],
      17: ["missa-compartilhar-milagre", "representante-divino"] },
    notas: "Círculo não informado: conflita com Bardo e Druida (ver Arcanista), então a linha fica sem círculo (NÃO VERIFICADO). A página diz magia de qualquer círculo a cada nível. PM +5 confere com [R] só no 1º nível (exemplo), então fica sem verificação."
  },
  druida: {
    nome: "Druida", fonte: T20_NIVEIS_FONTE_E, pv: 4, pm: 4, poderDeClasseDe: 2, magia: "pares",
    circulos: [[6, 2], [10, 3], [14, 4]], verif: { pv: false, pm: false, circ: false, magia: false },
    habs: { 20: [{ nome: "Força da Natureza", frase: "Magias custam 2 PM a menos e CD +2; em terreno natural, 4 PM a menos e CD +4." }] },
    poderes: { 6: ["forma-selvagem-aprimorada", "companheiro-animal-aprimorado", "companheiro-aberrante"],
      8: ["companheiro-animal-magico"], 10: ["espirito-dos-equinocios", "espirito-dos-solsticios", "confluencia-elemental"],
      11: ["metamorfose-instantanea", "oraculo-da-natureza"], 12: ["forma-selvagem-superior"],
      17: ["forca-da-natureza-db"], 18: ["companheiro-animal-lendario", "forma-primal"] },
    notas: "PM = +4 por nível mais SAB no total (SAB não entra aqui). Círculos e magias pares vêm só de [E] (a [R] que cita o Druida não foi reaberta)."
  },
  guerreiro: {
    nome: "Guerreiro", fonte: T20_NIVEIS_FONTE_E, pv: 5, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: {
      6: [{ nome: "Ataque Extra", frase: null }],
      20: [{ nome: "Campeão", frase: null }]
    },
    poderes: { 6: ["tornado-de-dor", "mente-disciplinada"], 10: ["planejamento-marcial"],
      11: ["determinacao-inabalavel", "ordens-de-engajamento"], 12: ["especializacao-em-armadura", "mestre-em-arma"],
      14: ["operacoes-combinadas"], 17: ["velho-de-guerra"] },
    notas: "Ataque Extra e Campeão: a fonte não descreve o efeito, então a frase fica null. Ataque Especial (1º) e Durão (3º) ficam fora da faixa. Escalonamento do Ataque Especial não detalhado na fonte."
  },
  inventor: {
    nome: "Inventor", fonte: T20_NIVEIS_FONTE_E, pv: 3, pm: 4, poderDeClasseDe: 2, magia: null,
    circulos: [[6, 2]], verif: { pv: false, pm: false, circ: false, magia: false },
    habs: {
      7: [{ nome: "Encontrar Fraqueza", frase: "Analisa objetos para achar fraquezas; +2 em ataques contra armadura ou construtos." }],
      8: [{ nome: "Item Superior", frase: "Pode ter 3 melhorias." }],
      9: [{ nome: "Item Mágico Menor", frase: "Recebe um item mágico menor e pode fabricar itens desse tipo." }],
      10: [{ nome: "Olho do Dragão", frase: "Analisa um item com ação completa." }],
      11: [{ nome: "Item Superior", frase: "Pode ter 4 melhorias." }],
      13: [{ nome: "Item Mágico Médio", frase: "Recebe um item mágico médio e pode fabricar itens desse tipo." }],
      17: [{ nome: "Item Mágico Maior", frase: "Recebe um item mágico maior e pode fabricar itens desse tipo." }],
      20: [{ nome: "Obra-Prima", frase: "Cria um item autoral, a ser aprovado pelo mestre." }]
    },
    poderes: { 6: ["alquimista-iniciado"], 10: ["mestre-alquimista"], 11: ["golpe-de-genio"],
      12: ["traje-de-batalha"], 17: ["genio-inovador"] },
    notas: "Círculo 2 vale para engenhocas e fórmulas, só explícito no 6º nível; o intervalo 'a cada quatro níveis' não foi fechado. Autômato vira veterano no 7º e mestre no 15º (não entra)."
  },
  ladino: {
    nome: "Ladino", fonte: "[E] exegetadearton.com.br (progressão) e [R] Rotina de Mestre, guia do Ladino (PV, PM e dano)",
    pv: 3, pm: 4, poderDeClasseDe: 2, magia: null, ataqueFurtivo: true,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      8: [{ nome: "Olhos nas Costas", frase: "Não pode ser flanqueado." }],
      10: [{ nome: "Evasão Aprimorada", frase: "Sem dano em sucesso e metade do dano em falha no teste de Reflexos." }],
      20: [{ nome: "A Pessoa Certa para o Trabalho", frase: "Gasta 5 PM para +10 em ataque furtivo ou perícia de ladino." }]
    },
    poderes: { 6: ["oportunismo"], 7: ["roubo-de-mana"], 8: ["veneno-persistente"],
      11: ["mestre-impostor", "mestre-assassino", "mestre-envenenador", "truque-magico-aprimorado", "assassino-em-serie"],
      13: ["ladrao-arcano"], 17: ["rei-do-crime", "senhor-do-submundo"], 20: ["ameaca-brutal"] },
    notas: "PV +3 e PM +4 confirmados nas duas fontes. Ataque Furtivo: começa com 1d6 e ganha 1d6 a cada dois níveis (regra de [E] e [R]); o 9º (5d6) e o 15º (8d6) conferem nas duas. Os demais níveis seguem a regra, mas não foram listados na fonte."
  },
  lutador: {
    nome: "Lutador", fonte: T20_NIVEIS_FONTE_E, pv: 5, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: {
      7: [{ nome: "Casca Grossa", frase: "Aumenta a Defesa em 1." }],
      9: [{ nome: "Golpe Violento", frase: "Multiplicador de crítico desarmado sobe em 1." }],
      11: [{ nome: "Casca Grossa", frase: "Aumenta a Defesa em 1." }],
      15: [{ nome: "Casca Grossa", frase: "Aumenta a Defesa em 1." }],
      19: [{ nome: "Casca Grossa", frase: "Aumenta a Defesa em 1." }],
      20: [{ nome: "Dono da Rua", frase: "Dano desarmado de 2d10 contra criaturas Médias e dois ataques ao agredir." }]
    },
    poderes: { 6: ["trocacao", "onda-de-choque"], 7: ["gingado-elusivo"],
      8: ["trocacao-tumultuosa", "punhos-de-adamante", "confianca-dos-ringues", "imobilizacao"],
      10: ["trincado"], 11: ["nome-na-arena"], 12: ["sequencia-destruidora"], 17: ["invencivel"] },
    notas: "Degraus do dano desarmado (8, 12, 16, 20) são inferidos de 'a cada quatro níveis'; só o 20º está explícito. Não entram como habilidade."
  },
  nobre: {
    nome: "Nobre", fonte: T20_NIVEIS_FONTE_E, pv: 3, pm: 4, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: { 20: [{ nome: "Realeza", frase: "Aumenta a CD da Presença Aristocrática e converte inimigos derrotados por Palavras Afiadas." }] },
    poderes: { 6: ["autoridade-feudal", "estrategista", "liderar-pelo-exemplo"],
      8: ["armadura-brilhante", "grito-tiranico", "inspirar-gloria", "lingua-de-ouro"],
      10: ["titulo"], 12: ["general"], 16: ["presenca-majestosa"] },
    notas: "Palavras Afiadas sobe a cada quatro níveis, mas a tabela de dano não aparece na página; fica de fora."
  },
  paladino: {
    nome: "Paladino", fonte: T20_NIVEIS_FONTE_E, pv: 5, pm: 4, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: false, pm: false, circ: false, magia: false },
    habs: {
      6: [{ nome: "Cura pelas Mãos aprimorada", frase: "Gasta +1 PM para anular uma condição." }],
      20: [{ nome: "Vingador Sagrado", frase: "Forma com voo 18 m, redução de dano 20 e Golpe Divino mais barato." }]
    },
    poderes: { 6: ["aura-de-cura", "aura-poderosa", "aura-de-arrependimento"], 7: ["escudo-sagrado"],
      8: ["aura-vingadora"], 10: ["aura-ardente", "investida-sagrada"], 11: ["conviccao-heroica", "arma-sacramentada"],
      14: ["aura-antimagia"], 17: ["hoste-celestial"], 18: ["aura-de-invencibilidade"] },
    notas: "Magia só pelo poder Orar (nível 2, ver rules-poderes.js), não por círculo. Golpe Divino e Cura pelas Mãos sobem a cada quatro níveis, sem os níveis fixados na fonte."
  }
};

/* Monta as linhas de nível 6 a 20 de uma classe a partir da especificação. */
const t20NiveisMontar = (id, s) => {
  const niveis = [];
  for (let n = 6; n <= 20; n++) {
    const circulo = s.circulos ? s.circulos.filter(c => c[0] <= n).map(c => c[1]).pop() ?? null : null;
    const magiaNova = s.magia === "todos" ? true : s.magia === "pares" ? n % 2 === 0 : false;
    const habilidades = (s.habs[n] || []).map(h => ({ ...h }));
    if (s.ataqueFurtivo && n >= 7 && n % 2 === 1) {
      habilidades.push({ nome: "Ataque Furtivo", frase: `${Math.ceil(n / 2)}d6 de dano extra.` });
    }
    niveis.push({
      nivel: n,
      pv: s.pv,
      pm: s.pm,
      treino: Math.floor(n / 2),
      circulo,
      magiaNova,
      poderDeClasse: s.poderDeClasseDe === null ? null : n >= s.poderDeClasseDe,
      habilidades,
      poderes: [...(s.poderes[n] || [])],
      verificado: {
        pv: s.verif.pv,
        pm: s.verif.pm,
        circulo: circulo !== null && s.verif.circ,
        magia: magiaNova && s.verif.magia
      }
    });
  }
  return { nome: s.nome, fonte: s.fonte, verificado: { pv: s.verif.pv, pm: s.verif.pm, circulo: s.verif.circ, magia: s.verif.magia }, notas: s.notas, niveis };
};

const T20_NIVEIS = {
  versao: 1,
  nivelMin: 6,
  nivelMax: 20,
  treino: {
    regra: "metade do nível, arredondada para baixo",
    fonte: "[R] Rotina de Mestre (1 fonte). [E] fala em 'bônus de treinamento' sem a fórmula: CONFLITO registrado em rules.js (T20_TREINO_FONTE)",
    verificado: false
  },
  classes: Object.fromEntries(Object.entries(T20_NIVEIS_ESPEC).map(([id, s]) => [id, t20NiveisMontar(id, s)]))
};
