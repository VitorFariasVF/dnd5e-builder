/* tormenta20/rules-niveis.js: progressão por nível, níveis 6 a 20, das 14 classes do livro básico.
   Carregado depois de rules.js (usa T20_CLASSES) e antes de rules-poderes.js.

   Formato de T20_NIVEIS:
     { versao, nivelMin: 6, nivelMax: 20, treino: {regra, fonte, verificado},
       classes: { <id da classe>: { nome, fonte, verificado: {pv, pm, circulo, magia},
                                    notas, niveis: [ <linha por nível 6..20> ] } } }
   Linha de nível:
     nivel       número do nível (6 a 20)
     pv, pm      PV e PM ganhos NESTE nível (+ CON no caso de PV)
     treino      metade do nível, arredondada para baixo (bônus de perícia em todas, p041 e p120)
     circulo     maior círculo de magia disponível neste nível (null = classe sem magia de classe)
     magiaNova   true se o nível dá uma magia nova (null não aplicável; false = não conjurador)
     poderDeClasse  true se o nível dá uma escolha de poder de classe
     habilidades [{nome, frase}] habilidades de classe do nível; frase null = efeito não lido no livro
     poderes     ids (em T20_PODERES) cujo pré-requisito de nível aparece no livro neste nível
     verificado  {pv, pm, circulo, magia}: true quando o livro confirma o dado

   Fonte primária desta revisão (2026-11-17): livro-base do usuário, Tormenta20 Jogo do Ano. Cita-se a página do PDF (pNNN).
   Tabelas de progressão: p043 (Arcanista), p047 (Bárbaro), p050 (Bardo), p053 (Bucaneiro), p056 (Caçador),
   p059 (Cavaleiro), p063 (Clérigo), p067 (Druida), p071 (Guerreiro), p074 (Inventor), p079 (Ladino), p082 (Lutador),
   p085 (Nobre), p088 (Paladino). Pré-requisitos de poder: texto de cada classe (ex.: "Pré-requisitos: ... 6º nível").
   Poderes que o livro não traz com nível foram removidos das listas: continuam no catálogo de rules-poderes.js,
   para o dono desse arquivo decidir. Mecânica somente: frases curtas em palavras próprias, sem texto de livro. */

const T20_NIVEIS_FONTE = "Tormenta20 Jogo do Ano, livro do usuário (página da classe e tabela de progressão)";

/* Especificação por classe. Os níveis são montados por t20NiveisMontar (abaixo). */
const T20_NIVEIS_ESPEC = {
  arcanista: {
    nome: "Arcanista", fonte: `${T20_NIVEIS_FONTE}: p043`, pv: 2, pm: 6, poderDeClasseDe: 2, magia: "todos",
    circulos: [[5, 2], [9, 3], [13, 4], [17, 5]], verif: { pv: true, pm: true, circ: true, magia: true },
    habs: {
      9: [{ nome: "Magias (3º círculo)", frase: "Pode lançar magias de 3º círculo." }],
      13: [{ nome: "Magias (4º círculo)", frase: "Pode lançar magias de 4º círculo." }],
      17: [{ nome: "Magias (5º círculo)", frase: "Pode lançar magias de 5º círculo." }],
      20: [{ nome: "Alta Arcana", frase: "Custo em PM das magias arcanas cai pela metade." }]
    },
    poderes: { 6: ["heranca-aprimorada"], 8: ["mestre-em-escola"], 10: ["fluxo-de-mana"], 11: ["heranca-superior"] },
    notas: "PV e PM confirmados (p043). Círculos: 2º no 5º, 3º no 9º, 4º no 13º, 5º no 17º (p043). Magia nova a cada nível, de qualquer círculo (p043). Mago começa com 4 magias (p043): caminho escolhido na etapa 5 e contado em engine.js (t20MagiasConhecidasLimite). Poderes sem nível no livro (ex.: Contramágica Aprimorada, Dissipar Magia) não entram."
  },
  barbaro: {
    nome: "Bárbaro", fonte: `${T20_NIVEIS_FONTE}: p047`, pv: 6, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      6: [{ nome: "Fúria +3", frase: "Bônus de ataque e dano da Fúria sobe para +3." }],
      8: [{ nome: "Redução de Dano", frase: "Redução de dano sobe para 4." }],
      9: [{ nome: "Instinto Selvagem +2", frase: "Bônus de dano, Percepção e Reflexos sobe para +2." }],
      11: [{ nome: "Fúria +4", frase: "Bônus de ataque e dano da Fúria sobe para +4." }, { nome: "Redução de Dano", frase: "Redução de dano sobe para 6." }],
      14: [{ nome: "Redução de Dano", frase: "Redução de dano sobe para 8." }],
      15: [{ nome: "Instinto Selvagem +3", frase: "Bônus de dano, Percepção e Reflexos sobe para +3." }],
      16: [{ nome: "Fúria +5", frase: "Bônus de ataque e dano da Fúria sobe para +5." }],
      17: [{ nome: "Redução de Dano", frase: "Redução de dano sobe para 10, o máximo da classe." }],
      20: [{ nome: "Fúria Titânica", frase: "O bônus da Fúria dobra." }]
    },
    poderes: { 6: ["critico-brutal"], 8: ["pele-de-aco"] },
    notas: "PV e PM confirmados (p047). Fúria sobe +1 a cada cinco níveis (p047), na tabela em 6, 11 e 16. Redução de dano 2 no 5º e +2 a cada três níveis até 10 no 17º (p047 e p048). Totem Espiritual (poder, pré-requisito 4º nível) não entra na lista por ser poder de classe sem nível de acesso na tabela."
  },
  bardo: {
    nome: "Bardo", fonte: `${T20_NIVEIS_FONTE}: p050`, pv: 3, pm: 4, poderDeClasseDe: 2, magia: "pares",
    circulos: [[6, 2], [10, 3], [14, 4]], verif: { pv: true, pm: true, circ: true, magia: true },
    habs: {
      6: [{ nome: "Magias (2º círculo)", frase: "Pode lançar magias de 2º círculo." }],
      9: [{ nome: "Inspiração +3", frase: "Bônus da Inspiração sobe para +3." }],
      10: [{ nome: "Magias (3º círculo)", frase: "Pode lançar magias de 3º círculo." }],
      13: [{ nome: "Inspiração +4", frase: "Bônus da Inspiração sobe para +4." }],
      14: [{ nome: "Magias (4º círculo)", frase: "Pode lançar magias de 4º círculo." }],
      17: [{ nome: "Inspiração +5", frase: "Bônus da Inspiração sobe para +5." }],
      20: [{ nome: "Artista Completo", frase: "Inspiração vira ação livre e o custo em PM das habilidades de bardo cai pela metade." }]
    },
    poderes: { 6: ["estrelato", "prestidigitacao"], 10: ["danca-das-laminas", "manipular-em-massa"] },
    notas: "PV confirmado: 12 + CON e 3 + CON por nível (p050). PM confirmado: 4 por nível (p050). Círculos 2º, 3º e 4º no 6º, 10º e 14º (p050). Magia nova em cada nível par (p050). Poder de bardo a partir do 2º nível (p050). Fonte [E] (16 e +4) não confere com o livro."
  },
  bucaneiro: {
    nome: "Bucaneiro", fonte: `${T20_NIVEIS_FONTE}: p053`, pv: 4, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      7: [{ nome: "Esquiva Sagaz +2", frase: "Bônus de Defesa e Reflexos da Esquiva Sagaz sobe para +2." }],
      10: [{ nome: "Evasão Aprimorada", frase: "Sem dano em sucesso e metade do dano em falha no teste de Reflexos." }],
      11: [{ nome: "Esquiva Sagaz +3", frase: "Bônus de Defesa e Reflexos da Esquiva Sagaz sobe para +3." }],
      15: [{ nome: "Esquiva Sagaz +4", frase: "Bônus de Defesa e Reflexos da Esquiva Sagaz sobe para +4." }],
      19: [{ nome: "Esquiva Sagaz +5", frase: "Bônus de Defesa e Reflexos da Esquiva Sagaz sobe para +5." }],
      20: [{ nome: "Sorte de Nimb", frase: "Gasta 5 PM para rolar de novo um teste recém-feito." }]
    },
    poderes: { 6: ["amigos-no-porto"], 10: ["touche"], 12: ["ripostar"] },
    notas: "PV e PM confirmados (p053). Esquiva Sagaz +1 no 3º e +1 a cada quatro níveis: 7º, 11º, 15º e 19º (p053 e tabela). Evasão no 2º (p053) fica fora da faixa."
  },
  cacador: {
    nome: "Caçador", fonte: `${T20_NIVEIS_FONTE}: p056`, pv: 4, pm: 4, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      7: [{ nome: "Explorador", frase: "Escolhe outro terreno ou soma +2 a um terreno já escolhido." }],
      9: [{ nome: "Marca da Presa", frase: "Dano extra da Marca da Presa sobe para +1d12." }],
      11: [{ nome: "Explorador", frase: "Escolhe outro terreno ou soma +2 a um terreno já escolhido." }],
      13: [{ nome: "Marca da Presa", frase: "Dano extra da Marca da Presa sobe para +2d8." }],
      15: [{ nome: "Explorador", frase: "Escolhe outro terreno ou soma +2 a um terreno já escolhido." }],
      17: [{ nome: "Marca da Presa", frase: "Dano extra da Marca da Presa sobe para +2d10." }],
      19: [{ nome: "Explorador", frase: "Escolhe outro terreno ou soma +2 a um terreno já escolhido." }],
      20: [{ nome: "Mestre Caçador", frase: "Marca da Presa vira ação livre; gasta 5 PM para +2 na margem de ameaça." }]
    },
    poderes: { 6: ["bote", "camuflagem", "escaramuca"], 12: ["chuva-de-laminas", "escaramuca-superior"] },
    notas: "PV e PM confirmados (p056). Marca da Presa: 1d4, 1d8, 1d12, 2d8 e 2d10 nos níveis 1, 5, 9, 13 e 17 (p056). Explorador no 3º e a cada quatro níveis (p057): 7º, 11º, 15º e 19º. Poder de caçador a partir do 2º (p056). Perícias: conflito interno do livro (p038 x p056), ver T20_CLASSES."
  },
  cavaleiro: {
    nome: "Cavaleiro", fonte: `${T20_NIVEIS_FONTE}: p059`, pv: 5, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      7: [{ nome: "Baluarte (aliados adjacentes)", frase: "Pode dar o mesmo bônus a aliados adjacentes com +2 PM." }, { nome: "Duelo +3", frase: "Bônus do Duelo sobe para +3." }],
      9: [{ nome: "Baluarte +6", frase: "Bônus do Baluarte sobe para +6." }],
      11: [{ nome: "Resoluto", frase: "Refaz um teste para se livrar de condição." }],
      12: [{ nome: "Duelo +4", frase: "Bônus do Duelo sobe para +4." }],
      13: [{ nome: "Baluarte +8", frase: "Bônus do Baluarte sobe para +8." }],
      15: [{ nome: "Baluarte (aliados em alcance curto)", frase: "Pode dar o mesmo bônus a aliados em alcance curto com +5 PM." }],
      17: [{ nome: "Baluarte +10", frase: "Bônus do Baluarte sobe para +10." }, { nome: "Duelo +5", frase: "Bônus do Duelo sobe para +5." }],
      20: [{ nome: "Bravura Final", frase: "Continua de pé com 3 PM ao chegar a 0 PV ou menos." }]
    },
    poderes: { 6: ["autoridade-feudal"], 10: ["titulo"], 12: ["especializacao-em-armadura"], 14: ["estandarte"] },
    notas: "PV e PM confirmados (p059). Baluarte +2 no 1º, +4 no 5º, +6 no 9º, +8 no 13º, +10 no 17º (tabela p059). Duelo +2 no 2º, +3 no 7º, +4 no 12º, +5 no 17º (tabela p059). Resoluto no 11º e Bravura Final no 20º (p061)."
  },
  clerigo: {
    nome: "Clérigo", fonte: `${T20_NIVEIS_FONTE}: p063`, pv: 4, pm: 5, poderDeClasseDe: 2, magia: "todos",
    circulos: [[5, 2], [9, 3], [13, 4], [17, 5]], verif: { pv: true, pm: true, circ: true, magia: true },
    habs: {
      9: [{ nome: "Magias (3º círculo)", frase: "Pode lançar magias de 3º círculo." }],
      13: [{ nome: "Magias (4º círculo)", frase: "Pode lançar magias de 4º círculo." }],
      17: [{ nome: "Magias (5º círculo)", frase: "Pode lançar magias de 5º círculo." }],
      20: [{ nome: "Mão da Divindade", frase: "Lança três magias divinas sem custo de PM, mas fica atordoado depois." }]
    },
    poderes: { 12: ["mestre-celebrante"] },
    notas: "PV e PM confirmados (p063). Círculos: 2º no 5º, 3º no 9º, 4º no 13º, 5º no 17º (p063). Magia nova a cada nível, de qualquer círculo (p063). Poder de clérigo a partir do 2º (p063). Mestre Celebrante é pré-requisito de 12º nível (p065)."
  },
  druida: {
    nome: "Druida", fonte: `${T20_NIVEIS_FONTE}: p067`, pv: 4, pm: 4, poderDeClasseDe: 2, magia: "pares",
    circulos: [[6, 2], [10, 3], [14, 4]], verif: { pv: true, pm: true, circ: true, magia: true },
    habs: {
      6: [{ nome: "Magias (2º círculo)", frase: "Pode lançar magias de 2º círculo." }],
      10: [{ nome: "Magias (3º círculo)", frase: "Pode lançar magias de 3º círculo." }],
      14: [{ nome: "Magias (4º círculo)", frase: "Pode lançar magias de 4º círculo." }],
      20: [{ nome: "Força da Natureza", frase: "Magias custam 2 PM a menos e CD +2; em terreno natural, 4 PM a menos e CD +4." }]
    },
    poderes: { 6: ["forma-selvagem-aprimorada", "companheiro-animal-aprimorado"], 8: ["companheiro-animal-magico"],
      10: ["espirito-dos-equinocios", "espirito-dos-solsticios"], 12: ["forma-selvagem-superior"],
      18: ["companheiro-animal-lendario", "forma-primal"] },
    notas: "PV e PM confirmados (p067). Círculos 2º, 3º e 4º no 6º, 10º e 14º (p067). Magia nova em cada nível par (p067). Força da Natureza no 20º (p069). Sabedoria soma uma vez ao PM (p067)."
  },
  guerreiro: {
    nome: "Guerreiro", fonte: `${T20_NIVEIS_FONTE}: p071`, pv: 5, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      6: [{ nome: "Ataque Extra", frase: "Pode gastar 2 PM para um ataque adicional, uma vez por rodada, ao usar agredir." }],
      9: [{ nome: "Ataque Especial +12", frase: "Bônus máximo do Ataque Especial sobe para +12." }],
      13: [{ nome: "Ataque Especial +16", frase: "Bônus máximo do Ataque Especial sobe para +16." }],
      17: [{ nome: "Ataque Especial +20", frase: "Bônus máximo do Ataque Especial sobe para +20." }],
      20: [{ nome: "Campeão", frase: "Dano dos ataques sobe um passo; ao acertar Ataque Especial ou Golpe Pessoal, recupera metade dos PM gastos." }]
    },
    poderes: { 6: ["tornado-de-dor"], 10: ["planejamento-marcial"], 12: ["especializacao-em-armadura", "mestre-em-arma"] },
    notas: "PV e PM confirmados (p071). Ataque Especial +4 no 1º, +8 no 5º, +12 no 9º, +16 no 13º e +20 no 17º (tabela p071). Ataque Extra no 6º e Campeão no 20º (p072). Durão no 3º fica fora da faixa."
  },
  inventor: {
    nome: "Inventor", fonte: `${T20_NIVEIS_FONTE}: p074`, pv: 3, pm: 4, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      7: [{ nome: "Encontrar Fraqueza", frase: "Analisa objetos para achar fraquezas; +2 em testes de ataque contra armadura ou construtos." }],
      8: [{ nome: "Fabricar Item Superior", frase: "Pode ter 3 melhorias." }],
      9: [{ nome: "Fabricar Item Mágico (menor)", frase: "Recebe um item mágico menor e pode fabricar itens desse tipo." }],
      10: [{ nome: "Olho do Dragão", frase: "Analisa um item com ação completa." }],
      11: [{ nome: "Fabricar Item Superior", frase: "Pode ter 4 melhorias." }],
      13: [{ nome: "Fabricar Item Mágico (médio)", frase: "Recebe um item mágico médio e pode fabricar itens desse tipo." }],
      17: [{ nome: "Fabricar Item Mágico (maior)", frase: "Recebe um item mágico maior e pode fabricar itens desse tipo." }],
      20: [{ nome: "Obra-Prima", frase: "Cria um item autoral, a ser aprovado pelo mestre." }]
    },
    poderes: { 10: ["mestre-alquimista"] },
    notas: "PV e PM confirmados (p074). Fabricar Item Superior: 1 melhoria no 2º; 2, 3 e 4 melhorias no 5º, 8º e 11º (p068 e tabela). Itens mágicos: menor no 9º, médio no 13º, maior no 17º (p076). Fórmulas e engenhocas: 2º círculo a partir do 6º (p076): não é círculo de magia de classe, por isso circulo fica null. Alquimista Iniciado sem nível no livro: fora da lista."
  },
  ladino: {
    nome: "Ladino", fonte: `${T20_NIVEIS_FONTE}: p079`, pv: 3, pm: 4, poderDeClasseDe: 2, magia: null, ataqueFurtivo: true,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      8: [{ nome: "Olhos nas Costas", frase: "Não pode ser flanqueado." }],
      10: [{ nome: "Evasão Aprimorada", frase: "Sem dano em sucesso e metade do dano em falha no teste de Reflexos." }],
      20: [{ nome: "A Pessoa Certa para o Trabalho", frase: "Gasta 5 PM para +10 em ataque furtivo ou perícia de ladino." }]
    },
    poderes: { 6: ["oportunismo"], 7: ["roubo-de-mana"], 8: ["veneno-persistente"], 13: ["ladrao-arcano"] },
    notas: "PV e PM confirmados (p079). Ataque Furtivo: 1d6 no 1º e +1d6 a cada dois níveis, em níveis ímpares a partir do 3º (tabela p079). Evasão no 2º (p079) fica fora da faixa. Esquiva Sobrenatural no 4º fica fora da faixa."
  },
  lutador: {
    nome: "Lutador", fonte: `${T20_NIVEIS_FONTE}: p082`, pv: 5, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      7: [{ nome: "Casca Grossa", frase: "Bônus de Defesa da Casca Grossa sobe em +1." }],
      9: [{ nome: "Briga", frase: "Dano desarmado sobe para 1d10 (criaturas Médias)." }, { nome: "Golpe Violento", frase: "Multiplicador de crítico desarmado sobe em 1." }],
      11: [{ nome: "Casca Grossa", frase: "Bônus de Defesa da Casca Grossa sobe em +2." }],
      13: [{ nome: "Briga", frase: "Dano desarmado sobe para 2d6 (criaturas Médias)." }],
      15: [{ nome: "Casca Grossa", frase: "Bônus de Defesa da Casca Grossa sobe em +3." }],
      17: [{ nome: "Briga", frase: "Dano desarmado sobe para 2d8 (criaturas Médias)." }],
      19: [{ nome: "Casca Grossa", frase: "Bônus de Defesa da Casca Grossa sobe em +4." }],
      20: [{ nome: "Briga", frase: "Dano desarmado sobe para 2d10 (criaturas Médias)." }, { nome: "Dono da Rua", frase: "Ao usar agredir, faz dois ataques (e um terceiro com Golpe Relâmpago)." }]
    },
    poderes: { 6: ["trocacao"], 8: ["trocacao-tumultuosa", "punhos-de-adamante", "confianca-dos-ringues", "imobilizacao"],
      10: ["trincado"], 11: ["nome-na-arena"], 12: ["sequencia-destruidora"] },
    notas: "PV e PM confirmados (p082). Briga: 1d6 no 1º, 1d8 no 5º, 1d10 no 9º, 2d6 no 13º, 2d8 no 17º e 2d10 no 20º (tabela p082). Casca Grossa: soma CON na Defesa a partir do 3º (p083), +1 no 7º e a cada quatro níveis (p083). Golpe Cruel (5º) fica fora da faixa."
  },
  nobre: {
    nome: "Nobre", fonte: `${T20_NIVEIS_FONTE}: p085`, pv: 4, pm: 4, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      6: [{ nome: "Palavras Afiadas (4d6)", frase: "Dano de Palavras Afiadas sobe para 4d6." }],
      10: [{ nome: "Palavras Afiadas (6d6)", frase: "Dano de Palavras Afiadas sobe para 6d6." }],
      14: [{ nome: "Palavras Afiadas (8d6)", frase: "Dano de Palavras Afiadas sobe para 8d6." }],
      18: [{ nome: "Palavras Afiadas (10d6)", frase: "Dano de Palavras Afiadas sobe para 10d6." }],
      20: [{ nome: "Realeza", frase: "Aumenta a CD da Presença Aristocrática e converte inimigos derrotados por Palavras Afiadas." }]
    },
    poderes: { 6: ["autoridade-feudal", "estrategista", "liderar-pelo-exemplo"],
      8: ["armadura-brilhante", "grito-tiranico", "inspirar-gloria", "lingua-de-ouro"],
      10: ["titulo"], 12: ["general"], 16: ["presenca-majestosa"] },
    notas: "PV e PM confirmados (p085). Palavras Afiadas: 2d6 no 2º, 4d6 no 6º, 6d6 no 10º, 8d6 no 14º e 10d6 no 18º (tabela p085). Gritar Ordens no 4º e Presença Aristocrática no 5º ficam fora da faixa."
  },
  paladino: {
    nome: "Paladino", fonte: `${T20_NIVEIS_FONTE}: p088`, pv: 5, pm: 3, poderDeClasseDe: 2, magia: null,
    circulos: null, verif: { pv: true, pm: true, circ: false, magia: false },
    habs: {
      6: [{ nome: "Cura pelas Mãos", frase: "Cura 2d8+2 PV. Gasta +1 PM para anular uma condição." }],
      9: [{ nome: "Golpe Divino +3d8", frase: "Dano extra do Golpe Divino sobe para +3d8." }],
      10: [{ nome: "Cura pelas Mãos", frase: "Cura 3d8+3 PV." }],
      13: [{ nome: "Golpe Divino +4d8", frase: "Dano extra do Golpe Divino sobe para +4d8." }],
      14: [{ nome: "Cura pelas Mãos", frase: "Cura 4d8+4 PV." }],
      17: [{ nome: "Golpe Divino +5d8", frase: "Dano extra do Golpe Divino sobe para +5d8." }],
      18: [{ nome: "Cura pelas Mãos", frase: "Cura 5d8+5 PV." }],
      20: [{ nome: "Vingador Sagrado", frase: "Com 10 PM, forma com voo 18 m e redução de dano 20 até o fim da cena." }]
    },
    poderes: { 6: ["aura-de-cura", "aura-poderosa"], 10: ["aura-ardente"], 14: ["aura-antimagia"], 18: ["aura-de-invencibilidade"] },
    notas: "PV e PM confirmados (p088). Carisma soma ao PM só no 1º nível (p082). Golpe Divino +1d8 no 1º, +2d8 no 5º, +3d8 no 9º, +4d8 no 13º e +5d8 no 17º (tabela p088). Cura pelas Mãos: 1d8+1 no 2º, 2d8+2 no 6º, 3d8+3 no 10º, 4d8+4 no 14º e 5d8+5 no 18º (tabela p088). Magia só pelo poder Orar (p090), não modelada."
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
  versao: 2,
  nivelMin: 6,
  nivelMax: 20,
  treino: {
    regra: "metade do nível, arredondada para baixo (bônus em todas as perícias); mais o bônus de treinamento nas treinadas (+2, +4, +6; ver rules.js)",
    fonte: "Tormenta20 Jogo do Ano, p041 (Bônus em Perícias) e p120 (Valor de Perícia) (livro do usuário)",
    verificado: true
  },
  classes: Object.fromEntries(Object.entries(T20_NIVEIS_ESPEC).map(([id, s]) => [id, t20NiveisMontar(id, s)]))
};
