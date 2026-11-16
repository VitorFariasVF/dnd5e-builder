/* Camada de tema e movimento: stepper, menu, escudos de atributo, brasão de classe, toasts.
   Carrega depois de ui.js e envolve render(); não altera regras nem estado. */
(function(){
  const reduz = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const D20 = '<svg class="d20-mini" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 21 7v10l-9 5-9-5V7z"/><path d="M12 2 3 17h18zM3 7l9 5 9-5M12 12v10"/></svg>';
  const ORN = '<div class="orn" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M8 0 10 6 16 8 10 10 8 16 6 10 0 8 6 6z"/></svg></div>';
  let ultima = 0, maxEtapa = 1;

  /* ---- toasts no lugar de alert() ---- */
  function toast(msg, erro){
    let box = document.querySelector(".toasts");
    if(!box){ box = document.createElement("div"); box.className = "toasts"; box.setAttribute("role","status"); box.setAttribute("aria-live","polite"); document.body.appendChild(box); }
    const t = document.createElement("div");
    t.className = "toast" + (erro ? " erro" : "");
    if(erro) t.setAttribute("role","alert");
    t.textContent = String(msg);
    box.appendChild(t);
    const fim = () => { t.classList.add("sai"); setTimeout(() => t.remove(), reduz() ? 0 : 260); };
    setTimeout(fim, Math.min(9000, 3500 + String(msg).length * 45));
    t.addEventListener("click", fim);
  }
  window.mostrarToast = toast;
  window.alert = function(msg){ toast(msg, true); };

  /* ---- stepper ---- */
  function stepperHtml(){
    const n = 11, e = state.etapa || 1;
    maxEtapa = Math.max(maxEtapa, e);
    const dots = Array.from({length:n}, (_, i) => {
      const k = i + 1, cls = k === e ? "atual" : k < e ? "feito" : "";
      const acao = k < e ? ` onclick="voltarPara(${k})"` : " disabled";
      return `<li><button type="button" class="${cls}"${acao} aria-label="Etapa ${k}: ${STEP_LABELS[k]}"${k === e ? ' aria-current="step"' : ""}>${k < e ? "✓" : k}</button></li>`;
    }).join("");
    return `<div class="stepper"><div class="stepper-top"><div class="stepper-label">Etapa ${e} de ${n} · <b>${STEP_LABELS[e]}</b></div>
      <details class="menu-acoes"><summary>Menu</summary><div class="menu-lista">
        <button type="button" onclick="irParaTelaInicial()">Tela inicial</button>
        <button type="button" onclick="salvarFichaNoHistorico(false)">Salvar no histórico</button>
        <button type="button" onclick="abrirImportadorJsonFicha()">Importar JSON</button><hr>
        <button type="button" class="perigo" onclick="limparBancoCompleto()">Limpar banco</button></div></details></div>
      <div class="stepper-track" role="progressbar" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${e}" aria-label="Progresso da ficha"><div class="stepper-fill" style="--p:${(Math.max(0, ultima - 1)) / (n - 1)}"></div></div>
      <ol class="stepper-dots">${dots}</ol></div>`;
  }

  /* ---- escudos e brasão ---- */
  const modTxt = v => (v >= 0 ? "+" : "") + v;
  function escudos(){
    const at = state.personagem.atributos || {};
    return `<div class="escudos" role="list">` + ATTRIBUTE_LIST.map((a, i) => {
      const v = Number(at[a]) || 10, m = Math.floor((v - 10) / 2);
      return `<div class="escudo-w" role="listitem" style="--i:${i}"><svg viewBox="0 0 90 108" role="img" aria-label="${ATTRIBUTE_LABELS[a]} ${v}, modificador ${modTxt(m)}">
        <path class="e-borda" d="M45 3 84 13v43Q84 88 45 105 6 88 6 56V13z"/><path class="e-int" d="M45 9 78 17.500V56Q78 83 45 98 12 83 12 56V17.500z"/>
        <text class="e-rot" x="45" y="30">${ATTRIBUTE_LABELS[a].slice(0,3).toUpperCase()}</text>
        <text class="e-mod" x="45" y="64" data-alvo="${m}">${modTxt(m)}</text><text class="e-val" x="45" y="84">${v}</text></svg></div>`;
    }).join("") + `</div>`;
  }
  function brasao(){
    const k = state.personagem.classe; if(!k) return "";
    const g = typeof PDF_GLIFOS !== "undefined" && PDF_GLIFOS[k];
    const mi = g ? `<g transform="translate(23.6 23.6) scale(2.2)" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${g}</g>` : "";
    const nome = (typeof CLASSES !== "undefined" && CLASSES[k] && CLASSES[k].nome) || k;
    const P = state.personagem, r = (typeof RACES !== "undefined" && RACES[P.raca] && RACES[P.raca].nome) || "", o = (typeof BACKGROUNDS !== "undefined" && BACKGROUNDS[P.origem] && BACKGROUNDS[P.origem].nome) || "";
    const sub = [r, o].filter(Boolean).join(" · ") || "Nível " + (P.nivel || 1);
    return `<div class="brasao-classe"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="1.5 3"/>${mi}</svg><div><b>${nome}${state.personagem.nivel ? " " + state.personagem.nivel : ""}</b><span>${sub}</span></div></div>`;
  }
  function contar(el){
    if(reduz()) return;
    const alvo = Number(el.dataset.alvo), t0 = performance.now(), dur = 600;
    (function f(t){ const p = Math.min(1, (t - t0) / dur), v = Math.round(alvo * (1 - Math.pow(1 - p, 3))); el.textContent = modTxt(v); if(p < 1) requestAnimationFrame(f); })(t0);
  }

  function decorar(){
    const card = app.querySelector(".card"); if(!card) return;
    const e = state.etapa;
    const barra = card.querySelector(".toolbar-inline");
    if(barra && barra.querySelector(".step-indicator")){
      const antes = ultima; ultima = e;
      barra.outerHTML = stepperHtml();
      const fill = card.querySelector(".stepper-fill");
      if(fill){ fill.style.setProperty("--p", (Math.max(0, antes - 1)) / 10); requestAnimationFrame(() => requestAnimationFrame(() => fill.style.setProperty("--p", (e - 1) / 10))); }
    }
    const h2 = card.querySelector("h2");
    if(h2 && !h2.querySelector(".d20-mini")) h2.insertAdjacentHTML("afterbegin", D20);
    if(h2){
      if(e === 6) h2.insertAdjacentHTML("afterend", escudos() + ORN);
      else if(e === 11) h2.insertAdjacentHTML("afterend", brasao() + escudos() + ORN);
      else if(e === 4 && state.personagem.classe) h2.insertAdjacentHTML("afterend", brasao());
    }
    card.querySelectorAll(".e-mod[data-alvo]").forEach(contar);
    card.setAttribute("data-step-pane", "");
  }

  /* ---- envolve render(): direção da transição + decoração ---- */
  const _render = render;
  render = function(){
    const ant = ultima, r = _render.apply(this, arguments);
    decorar();
    const card = app.querySelector(".card");
    if(card && ant && ant !== state.etapa) card.classList.add(state.etapa < ant ? "passo-voltar" : "passo-avanca");
    if(card && ant) window.scrollTo({ top: Math.min(window.scrollY, 120), behavior: reduz() ? "auto" : "smooth" });
    return r;
  };
  /* ---- d20 no título (gira uma vez) ---- */
  const h1 = document.querySelector("h1.title");
  if(h1 && !h1.querySelector(".d20-t")) h1.insertAdjacentHTML("afterbegin", D20.replace("d20-mini","d20-t"));
  /* fecha o menu ao clicar fora */
  document.addEventListener("click", ev => document.querySelectorAll(".menu-acoes[open]").forEach(d => { if(!d.contains(ev.target)) d.open = false; }));
  document.addEventListener("keydown", ev => { if(ev.key === "Escape") document.querySelectorAll(".menu-acoes[open]").forEach(d => d.open = false); });
})();
