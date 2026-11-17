/* Inicialização da ficha Tormenta20. Carrega o estado salvo, liga os eventos e mostra a tela inicial. */
carregarEstado();
ensureStateShape();
t20Inicializar();
t20Tela = "inicio";
render();
window.addEventListener("beforeunload", salvarEstado);

/* Botão do rodapé: "Limpar meus dados" pede um segundo clique para não apagar sem querer. */
(function(){
  const botao = document.getElementById("reset");
  if(!botao) return;
  botao.addEventListener("click", () => {
    if(botao.dataset.confirmado === "1"){
      t20LimparTudo();
      t20Tela = "inicio";
      render();
      if(typeof VFTool !== "undefined" && VFTool.toast) VFTool.toast("Dados apagados deste navegador.");
      botao.dataset.confirmado = "";
      botao.textContent = "Limpar meus dados";
      return;
    }
    botao.dataset.confirmado = "1";
    botao.textContent = "Clique de novo para apagar tudo";
    setTimeout(() => { botao.dataset.confirmado = ""; botao.textContent = "Limpar meus dados"; }, 4000);
  });
})();
