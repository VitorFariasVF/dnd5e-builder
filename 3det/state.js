/* Estado da ficha (3DeT Victory). Um único objeto `state`, garantido por ensureStateShape().
   Os nomes de etapa e os limites vêm de rules.js; aqui só há forma de dados. */
const TDT_ETAPAS = [
  { n: 1, nome: "Conceito" },
  { n: 2, nome: "Arquétipo" },
  { n: 3, nome: "Atributos" },
  { n: 4, nome: "Perícias" },
  { n: 5, nome: "Vantagens" },
  { n: 6, nome: "Desvantagens" },
  { n: 7, nome: "Revisão" }
];

function estadoPadrao(){
  return {
    etapa: 1,
    tela: "inicio",
    modo: "livre",
    currentHistoryId: null,
    personagem: {
      nome: "",
      jogador: "",
      conceito: "",
      nivelPoder: "iniciante",   // "iniciante" | "heroi" | "veterano" | "livre" (rules.niveisDePoder)
      pontosTotal: 10,           // preenchido pelo nível; editável só em "livre"
      atributos: { P: null, H: null, R: null },
      arquetipo: "",             // id de rules.arquetipos ou "" (vazio)
      pericias: [],              // ids de rules.pericias
      vantagens: [],             // [{ id, qtd, custo, nota }]
      desvantagens: [],          // [{ id, valor, nota }]
      historia: "",
      anotacoes: ""
    }
  };
}

const state = estadoPadrao();

/* Completa campos ausentes (dados de versões antigas ou importados) sem apagar o que já existe. */
function ensureStateShape(){
  const base = estadoPadrao();
  if(!state.personagem || typeof state.personagem !== "object") state.personagem = base.personagem;
  const p = state.personagem;
  Object.keys(base.personagem).forEach(k => { if(p[k] === undefined) p[k] = base.personagem[k]; });
  p.atributos = Object.assign({}, base.personagem.atributos, p.atributos || {});
  if(!Array.isArray(p.pericias)) p.pericias = [];
  if(!Array.isArray(p.vantagens)) p.vantagens = [];
  if(!Array.isArray(p.desvantagens)) p.desvantagens = [];
  if(!["livre", "estrito"].includes(state.modo)) state.modo = "livre";
  if(!TDT_ETAPAS.some(e => e.n === state.etapa)) state.etapa = 1;
  if(state.tela !== "ficha" && state.tela !== "inicio") state.tela = "inicio";
  if(state.currentHistoryId === undefined) state.currentHistoryId = null;
  return state;
}

/* Substitui o conteúdo de `state` por outro objeto (usado ao carregar do histórico ou do backup). */
function substituirEstado(novo){
  Object.keys(state).forEach(k => delete state[k]);
  Object.assign(state, JSON.parse(JSON.stringify(novo)));
  return ensureStateShape();
}
