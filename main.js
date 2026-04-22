carregarEstado();
ensureStateShape();
if(!state.personagem.bonusProficiencia) state.personagem.bonusProficiencia=2;
recalcularAtributosFinais();
recalcularTudo();
render();
window.addEventListener("beforeunload", salvarEstado);
