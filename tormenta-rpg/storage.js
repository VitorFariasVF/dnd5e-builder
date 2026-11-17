/* Armazenamento pelo VFTool (data-tool "tormenta-rpg-builder"): chaves "estado" e "historico".
   Sem VFTool (testes em Node), cai para localStorage com chaves próprias. Sempre com try/catch. */
const TRPG_CHAVE_ESTADO = "estado";
const TRPG_CHAVE_HISTORICO = "historico";
const TRPG_LEGADO_ESTADO = "tormenta-rpg:estado:v1";
const TRPG_LEGADO_HISTORICO = "tormenta-rpg:historico:v1";

function trpgLer(chave, legado){
  try {
    if(typeof VFTool !== "undefined"){
      const v = VFTool.get(chave, null);
      return v === undefined ? null : v;
    }
    const raw = localStorage.getItem(legado);
    return raw ? JSON.parse(raw) : null;
  } catch(err){ return null; }
}

function trpgGravar(chave, valor, legado){
  try {
    if(typeof VFTool !== "undefined") VFTool.set(chave, valor);
    else localStorage.setItem(legado, JSON.stringify(valor));
  } catch(err){ /* quota ou modo privado: a ficha segue em memória */ }
}

function salvarEstado(){
  ensureStateShape();
  trpgGravar(TRPG_CHAVE_ESTADO, JSON.parse(JSON.stringify(state)), TRPG_LEGADO_ESTADO);
}

function carregarEstado(){
  const salvo = trpgLer(TRPG_CHAVE_ESTADO, TRPG_LEGADO_ESTADO);
  if(salvo && typeof salvo === "object") substituirEstado(salvo);
}

function getHistorico(){
  const lista = trpgLer(TRPG_CHAVE_HISTORICO, TRPG_LEGADO_HISTORICO);
  return Array.isArray(lista) ? lista : [];
}

function gravarHistorico(lista){
  trpgGravar(TRPG_CHAVE_HISTORICO, lista, TRPG_LEGADO_HISTORICO);
}

function novoIdHistorico(){
  if(globalThis.crypto && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

/* Grava a ficha atual no histórico. Com asCopy, cria uma nova entrada. */
function salvarNoHistorico(asCopy){
  ensureStateShape();
  const lista = getHistorico();
  const id = asCopy || !state.currentHistoryId ? novoIdHistorico() : state.currentHistoryId;
  const p = state.personagem;
  const entrada = {
    id,
    nome: p.nome || "Personagem sem nome",
    raca: p.raca || "",
    classe: p.classe || "",
    nivel: p.nivel || 1,
    atualizadoEm: new Date().toISOString(),
    snapshot: JSON.parse(JSON.stringify(state))
  };
  const i = lista.findIndex(x => x.id === id);
  if(i >= 0) lista[i] = entrada; else lista.unshift(entrada);
  gravarHistorico(lista);
  state.currentHistoryId = id;
  salvarEstado();
  return entrada;
}

function carregarDoHistorico(id){
  const entrada = getHistorico().find(x => x.id === id);
  if(!entrada || !entrada.snapshot) return false;
  substituirEstado(entrada.snapshot);
  state.currentHistoryId = id;
  salvarEstado();
  return true;
}

/* Cria uma cópia de uma entrada do histórico, com novo id e nome "(cópia)". */
function duplicarNoHistorico(id){
  const lista = getHistorico();
  const entrada = lista.find(x => x.id === id);
  if(!entrada) return null;
  const copia = JSON.parse(JSON.stringify(entrada));
  copia.id = novoIdHistorico();
  copia.nome = (copia.nome || "Personagem") + " (cópia)";
  copia.atualizadoEm = new Date().toISOString();
  lista.unshift(copia);
  gravarHistorico(lista);
  return copia;
}

function excluirDoHistorico(id){
  gravarHistorico(getHistorico().filter(x => x.id !== id));
  if(state.currentHistoryId === id){ state.currentHistoryId = null; salvarEstado(); }
}

function limparDadosSalvos(){
  try {
    if(typeof VFTool !== "undefined"){ VFTool.set(TRPG_CHAVE_ESTADO, null); VFTool.set(TRPG_CHAVE_HISTORICO, null); }
    localStorage.removeItem(TRPG_LEGADO_ESTADO); localStorage.removeItem(TRPG_LEGADO_HISTORICO);
  } catch(err){ /* sem efeito */ }
}
