/* Armazenamento no padrão VF Tools: tudo fica em localStorage na chave "vf-tools:dnd5e-builder:v1"
   (via VFTool, vf/tool.js), sempre com try/catch. Dados antigos (chaves "criacao_dnd_5e*") são migrados
   na primeira leitura e a chave antiga é removida. Sem VFTool (testes em Node), cai para as chaves antigas. */
const LEGACY_STATE_KEY = "criacao_dnd_5e";
const LEGACY_HISTORY_KEY = "criacao_dnd_5e_history_v1";

function vfLer(chave, legado){
  try {
    if(typeof VFTool !== "undefined"){
      const atual = VFTool.get(chave, null);
      if(atual !== null && atual !== undefined) return atual;
      const raw = localStorage.getItem(legado);
      if(raw){ const migrado = JSON.parse(raw); VFTool.set(chave, migrado); localStorage.removeItem(legado); return migrado; }
      return null;
    }
    const raw = localStorage.getItem(legado);
    return raw ? JSON.parse(raw) : null;
  } catch(err){ console.warn("Falha ao ler dados salvos:", err); return null; }
}
function vfGravar(chave, valor, legado){
  try {
    if(typeof VFTool !== "undefined") VFTool.set(chave, valor);
    else localStorage.setItem(legado, JSON.stringify(valor));
  } catch(err){ console.warn("Falha ao salvar dados:", err); }
}
function vfRemover(chave, legado){
  try {
    localStorage.removeItem(legado);
    if(typeof VFTool !== "undefined") VFTool.set(chave, null);
  } catch(err){ console.warn("Falha ao limpar dados:", err); }
}

function salvarEstado(){
  ensureStateShape();
  vfGravar("estado", state, LEGACY_STATE_KEY);
}
function carregarEstado(){
  const parsed = vfLer("estado", LEGACY_STATE_KEY);
  if(parsed && typeof parsed === "object"){
    Object.assign(state, parsed);
    ensureStateShape();
  }
}
function limparEstado(){ vfRemover("estado", LEGACY_STATE_KEY); }


function makeSerializableStateSnapshot(){
  ensureStateShape();
  return JSON.parse(JSON.stringify(state));
}

function getCharacterHistory(){
  const lista = vfLer("historico", LEGACY_HISTORY_KEY);
  return Array.isArray(lista) ? lista : [];
}

function saveCharacterHistory(history){
  vfGravar("historico", history || [], LEGACY_HISTORY_KEY);
}

function generateHistoryId(){
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function upsertCharacterInHistory(options={}){
  const { asCopy=false, forcedName='' } = options;
  ensureStateShape();
  const history = getCharacterHistory();
  const snapshot = makeSerializableStateSnapshot();
  const now = new Date().toISOString();
  const id = asCopy || !state.currentHistoryId ? generateHistoryId() : state.currentHistoryId;
  const entry = {
    id,
    nome: forcedName || state.personagem.nome || 'Personagem sem nome',
    classe: state.personagem.classe || '',
    raca: state.personagem.raca || '',
    nivel: state.personagem.nivel || 1,
    updatedAt: now,
    snapshot
  };
  const index = history.findIndex(item => item.id === id);
  if (index >= 0) history[index] = entry;
  else history.unshift(entry);
  saveCharacterHistory(history);
  state.currentHistoryId = id;
  salvarEstado();
  return entry;
}

function loadCharacterFromHistory(historyId){
  const entry = getCharacterHistory().find(item => item.id === historyId);
  if (!entry?.snapshot) return false;
  const snapshot = JSON.parse(JSON.stringify(entry.snapshot));
  Object.keys(state).forEach(key => delete state[key]);
  Object.assign(state, snapshot);
  state.currentHistoryId = historyId;
  ensureStateShape();
  salvarEstado();
  return true;
}

function deleteCharacterFromHistory(historyId){
  const history = getCharacterHistory().filter(item => item.id !== historyId);
  saveCharacterHistory(history);
  if (state.currentHistoryId === historyId) {
    state.currentHistoryId = null;
    salvarEstado();
  }
}

function clearCharacterHistory(){
  vfRemover("historico", LEGACY_HISTORY_KEY);
  state.currentHistoryId = null;
}

window.getCharacterHistory = getCharacterHistory;
window.upsertCharacterInHistory = upsertCharacterInHistory;
window.loadCharacterFromHistory = loadCharacterFromHistory;
window.deleteCharacterFromHistory = deleteCharacterFromHistory;
window.clearCharacterHistory = clearCharacterHistory;

function duplicateCharacterInHistory(historyId){
  const history = getCharacterHistory();
  const entry = history.find(item => item.id === historyId);
  if (!entry) return null;
  const clone = JSON.parse(JSON.stringify(entry));
  clone.id = generateHistoryId();
  clone.nome = `${clone.nome || 'Personagem'} (cópia)`;
  clone.updatedAt = new Date().toISOString();
  history.unshift(clone);
  saveCharacterHistory(history);
  return clone;
}

window.duplicateCharacterInHistory = duplicateCharacterInHistory;
