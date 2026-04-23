function salvarEstado(){
  ensureStateShape();
  localStorage.setItem("criacao_dnd_5e", JSON.stringify(state));
}
function carregarEstado(){
  const raw = localStorage.getItem("criacao_dnd_5e");
  if(!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if(parsed && typeof parsed === "object"){
      Object.assign(state, parsed);
      ensureStateShape();
    }
  } catch(err){
    console.warn("Falha ao carregar estado salvo:", err);
  }
}
function limparEstado(){ localStorage.removeItem("criacao_dnd_5e"); }

const CHARACTER_HISTORY_KEY = 'criacao_dnd_5e_history_v1';

function makeSerializableStateSnapshot(){
  ensureStateShape();
  return JSON.parse(JSON.stringify(state));
}

function getCharacterHistory(){
  try {
    const raw = localStorage.getItem(CHARACTER_HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Falha ao ler histórico de personagens:', err);
    return [];
  }
}

function saveCharacterHistory(history){
  localStorage.setItem(CHARACTER_HISTORY_KEY, JSON.stringify(history || []));
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
  localStorage.removeItem(CHARACTER_HISTORY_KEY);
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
