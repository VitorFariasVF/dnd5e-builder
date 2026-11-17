/* Armazenamento Tormenta20 via VFTool (vf/tool.js), chave "vf-tools:tormenta20-builder:v1".
   Chaves usadas: "estado" (ficha atual) e "historico" (fichas salvas). Sem VFTool (testes em Node)
   cai para localStorage com prefixo próprio, sempre dentro de try/catch. */
function t20Ler(chave, padrao){
  try {
    if(typeof VFTool !== "undefined") { const v = VFTool.get(chave, padrao); return v === undefined || v === null ? padrao : v; }
    if(typeof localStorage === "undefined") return padrao;
    const raw = localStorage.getItem("tormenta20-builder:" + chave);
    return raw ? JSON.parse(raw) : padrao;
  } catch(err){ console.warn("Falha ao ler dados salvos:", err); return padrao; }
}
function t20Gravar(chave, valor){
  try {
    if(typeof VFTool !== "undefined") { VFTool.set(chave, valor); return; }
    if(typeof localStorage !== "undefined") localStorage.setItem("tormenta20-builder:" + chave, JSON.stringify(valor));
  } catch(err){ console.warn("Falha ao salvar dados:", err); }
}

function salvarEstado(){
  ensureStateShape();
  t20Gravar("estado", { modo: state.modo, etapa: state.etapa, currentHistoryId: state.currentHistoryId, personagem: state.personagem });
}
function carregarEstado(){
  const salvo = t20Ler("estado", null);
  if(salvo && typeof salvo === "object"){
    Object.assign(state, salvo);
    ensureStateShape();
  }
}
function t20LimparEstado(){ t20Gravar("estado", null); }

/* Histórico: lista de { id, nome, classe, raca, nivel, updatedAt, snapshot } */
function getCharacterHistory(){
  const lista = t20Ler("historico", []);
  return Array.isArray(lista) ? lista : [];
}
function t20SalvarHistorico(lista){ t20Gravar("historico", lista || []); }
function t20NovoId(){
  if(globalThis.crypto && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
function upsertCharacterInHistory(){
  ensureStateShape();
  const lista = getCharacterHistory();
  const id = state.currentHistoryId || t20NovoId();
  const p = state.personagem;
  const entrada = {
    id, nome: p.nome || "Personagem sem nome",
    classe: p.classe || "", raca: p.raca || "", nivel: p.nivel || 1,
    updatedAt: new Date().toISOString(),
    snapshot: { modo: state.modo, personagem: JSON.parse(JSON.stringify(p)) }
  };
  const i = lista.findIndex(x => x.id === id);
  if(i >= 0) lista[i] = entrada; else lista.unshift(entrada);
  t20SalvarHistorico(lista);
  state.currentHistoryId = id;
  salvarEstado();
  return entrada;
}
function loadCharacterFromHistory(id){
  const entrada = getCharacterHistory().find(x => x.id === id);
  if(!entrada || !entrada.snapshot) return false;
  t20AplicarSnapshot(entrada.snapshot);
  state.currentHistoryId = id;
  salvarEstado();
  return true;
}
function deleteCharacterFromHistory(id){
  t20SalvarHistorico(getCharacterHistory().filter(x => x.id !== id));
  if(state.currentHistoryId === id){ state.currentHistoryId = null; salvarEstado(); }
}
/* Aplica um snapshot {modo, personagem} ao estado, sem perder o formato atual. */
function t20AplicarSnapshot(snap){
  const copia = JSON.parse(JSON.stringify(snap));
  state.modo = copia.modo || null;
  state.personagem = copia.personagem || {};
  ensureStateShape();
}
function t20LimparTudo(){
  t20LimparEstado();
  t20SalvarHistorico([]);
  resetStateToInitial();
}
