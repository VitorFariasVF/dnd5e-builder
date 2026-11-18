/* Estado da ficha (Tormenta RPG). Um único objeto `state`, garantido por ensureStateShape(). */
const TRPG_ETAPAS = [
  { n: 1, nome: "Identidade" },
  { n: 2, nome: "Raça" },
  { n: 3, nome: "Classe" },
  { n: 4, nome: "Atributos" },
  { n: 5, nome: "Perícias" },
  { n: 6, nome: "Talentos" },
  { n: 7, nome: "Magias" },
  { n: 8, nome: "Equipamento" },
  { n: 9, nome: "Derivados" },
  { n: 10, nome: "Resumo" }
];

function estadoPadrao(){
  const atributos = {};
  TRPG_ATRIBUTOS.forEach(a => { atributos[a.id] = 10; });
  return {
    etapa: 1,
    tela: "inicio",
    modo: "livre",
    currentHistoryId: null,
    personagem: {
      nome: "",
      jogador: "",
      imagem: "",
      nivel: 1,
      raca: "",
      classe: "",
      aparencia: "",
      historia: "",
      atributos,
      metodoAtributos: "manual",
      pericias: { pontosDisponiveis: null, graduacoesGastas: 0, observacao: "" },
      talentos: "",
      magias: "",
      equipamento: "",
      dinheiro: 0,
      derivados: { armadura: 0, escudo: 0, tamanho: 0, pvAtuais: null, pvMaximo: null, deslocamento: "" }
    }
  };
}

const state = estadoPadrao();

/* Imagem do personagem: data URL JPEG (sempre gerada como JPEG pelo redimensionamento) ou PNG aceito na importação.
   Campo ausente ou "" = sem imagem. Limites: 5 MB no arquivo original; 300 px no maior lado; qualidade 0.8. */
const TRPG_IMAGEM = { maxBytesOriginal: 5 * 1024 * 1024, ladoMaximo: 300, qualidade: 0.8, maxCaracteres: 400000 };

function trpgImagemValida(v){
  if(v === "" || v === undefined || v === null) return true;
  return typeof v === "string" && v.length <= TRPG_IMAGEM.maxCaracteres &&
    /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/]+={0,2}$/.test(v);
}

/* Completa campos ausentes (dados de versões antigas ou importados) sem apagar o que já existe. */
function ensureStateShape(){
  const base = estadoPadrao();
  if(!state.personagem || typeof state.personagem !== "object") state.personagem = base.personagem;
  const p = state.personagem;
  Object.keys(base.personagem).forEach(k => { if(p[k] === undefined) p[k] = base.personagem[k]; });
  if(!trpgImagemValida(p.imagem)) p.imagem = "";
  p.atributos = Object.assign({}, base.personagem.atributos, p.atributos || {});
  p.pericias = Object.assign({}, base.personagem.pericias, p.pericias || {});
  p.derivados = Object.assign({}, base.personagem.derivados, p.derivados || {});
  if(!["livre", "estrito"].includes(state.modo)) state.modo = "livre";
  if(!TRPG_ETAPAS.some(e => e.n === state.etapa)) state.etapa = 1;
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
