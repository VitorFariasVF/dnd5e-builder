/* Inicialização: carrega o estado salvo, liga os eventos e desenha a tela. */
(function(){
  function iniciar(){
    carregarEstado();
    tdtLigarEventos();
    tdtRender();
    const y = document.getElementById("y");
    if(y) y.textContent = new Date().getFullYear();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
