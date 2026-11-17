/* Armazenamento no padrão VF Tools: tudo fica em VFTool (chave "vf-tools:coc7-builder:v1"), com try/catch.
   Chaves usadas: "estado" (investigador em edição) e "historico" (lista de investigadores salvos). */

function cocLer(chave, padrao){
  try {
    if(typeof VFTool !== "undefined") return VFTool.get(chave, padrao);
    const raw = localStorage.getItem("coc7:" + chave);
    return raw ? JSON.parse(raw) : padrao;
  } catch(err){ console.warn("Falha ao ler dados salvos:", err); return padrao; }
}
function cocGravar(chave, valor){
  try {
    if(typeof VFTool !== "undefined") VFTool.set(chave, valor);
    else localStorage.setItem("coc7:" + chave, JSON.stringify(valor));
  } catch(err){ console.warn("Falha ao salvar dados:", err); }
}

function salvarEstado(estado){ cocGravar("estado", garantirEstado(estado)); }
function carregarEstado(){
  const salvo = cocLer("estado", null);
  return salvo && typeof salvo === "object" ? garantirEstado(salvo) : criarEstadoInicial();
}
function limparEstado(){ cocGravar("estado", null); }

function getHistorico(){
  const lista = cocLer("historico", []);
  return Array.isArray(lista) ? lista : [];
}
function gerarIdHistorico(){
  if(globalThis.crypto && crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
/* Salva o investigador atual no histórico. `novaCopia` cria outro registro em vez de atualizar. */
function salvarNoHistorico(estado, novaCopia){
  const lista = getHistorico();
  const snapshot = JSON.parse(JSON.stringify(garantirEstado(estado)));
  const id = novaCopia || !estado.currentHistoryId ? gerarIdHistorico() : estado.currentHistoryId;
  const entrada = {
    id,
    nome: snapshot.investigador.nome || "Investigador sem nome",
    ocupacao: (cocOcupacao(snapshot.investigador.ocupacaoId) || {}).nome || "",
    epoca: snapshot.epoca,
    updatedAt: new Date().toISOString(),
    snapshot
  };
  const pos = lista.findIndex(item => item.id === id);
  if(pos >= 0) lista[pos] = entrada; else lista.unshift(entrada);
  cocGravar("historico", lista);
  estado.currentHistoryId = id;
  salvarEstado(estado);
  return entrada;
}
function removerDoHistorico(id){
  cocGravar("historico", getHistorico().filter(item => item.id !== id));
}
