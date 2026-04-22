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
