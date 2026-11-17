/* Estado da ficha Tormenta20. Um objeto único `state`, salvo pelo storage.js.
   ensureStateShape() completa campos ausentes em dados antigos (sem perder o que já existe). */
function t20EstadoInicial(){
  const zerarAtributos = () => Object.fromEntries(T20_ATRIBUTO_IDS.map(id => [id, 0]));
  return {
    modo: null,            // "estrito" | "livre"
    etapa: 1,
    currentHistoryId: null,
    personagem: {
      nome: "",
      jogador: "",
      nivel: 1,
      raca: null,          // id em T20_RACAS
      origem: null,        // nome em T20_ORIGENS
      origemBeneficios: [  // dois benefícios à escolha
        { tipo: "pericia", valor: "" },
        { tipo: "pericia", valor: "" }
      ],
      classe: null,        // id em T20_CLASSES
      atributoMagia: null, // para Arcanista: "inteligencia" ou "carisma"
      atributosBase: zerarAtributos(),
      ajusteManual: zerarAtributos(),
      periciasEscolhidas: [],   // perícias livres (classe, raça e nível)
      grupoFixoEscolha: "",     // escolha da opção do grupo fixo (ex.: Guerreiro: Luta ou Pontaria)
      poderes: [],         // { nome, tipo: "classe"|"geral"|"origem", nivel, nota }
      magias: [],          // { nome, circulo }
      equipamento: [],     // { nome, quantidade, peso }
      dinheiro: 0,         // T$ (valor inicial NÃO VERIFICADO: é entrada livre)
      defesa: { armadura: 0, escudo: 0, outros: 0, nomeArmadura: "", nomeEscudo: "" },
      personalidade: { aparencia: "", historia: "", tracos: "" }
    }
  };
}

const state = t20EstadoInicial();

function ensureStateShape(){
  const fresh = t20EstadoInicial();
  state.modo = (state.modo === "estrito" || state.modo === "livre") ? state.modo : null;
  state.etapa = Math.min(12, Math.max(1, Number(state.etapa) || 1));
  state.currentHistoryId ??= null;
  const p = Object.assign({}, fresh.personagem, state.personagem || {});
  p.atributosBase = Object.assign(zerarTodos(fresh.personagem.atributosBase), p.atributosBase || {});
  p.ajusteManual = Object.assign(zerarTodos(fresh.personagem.ajusteManual), p.ajusteManual || {});
  p.defesa = Object.assign({}, fresh.personagem.defesa, p.defesa || {});
  p.personalidade = Object.assign({}, fresh.personagem.personalidade, p.personalidade || {});
  p.nivel = Math.min(T20_NIVEL_MAX, Math.max(T20_NIVEL_MIN, Math.trunc(Number(p.nivel) || 1)));
  if(!Array.isArray(p.origemBeneficios) || p.origemBeneficios.length !== 2)
    p.origemBeneficios = fresh.personagem.origemBeneficios.map((b, i) => Object.assign({}, b, (p.origemBeneficios || [])[i] || {}));
  if(!Array.isArray(p.periciasEscolhidas)) p.periciasEscolhidas = [];
  if(!Array.isArray(p.poderes)) p.poderes = [];
  if(!Array.isArray(p.magias)) p.magias = [];
  if(!Array.isArray(p.equipamento)) p.equipamento = [];
  p.dinheiro = Number(p.dinheiro) || 0;
  state.personagem = p;
  function zerarTodos(base){ return Object.fromEntries(Object.keys(base).map(k => [k, 0])); }
}

function resetStateToInitial(){
  const fresh = t20EstadoInicial();
  Object.keys(state).forEach(key => delete state[key]);
  Object.assign(state, fresh);
  ensureStateShape();
}
