/* Interface: tela de fichas salvas e as dez etapas. Eventos por delegação em #app (trpgLigarEventos).
   Erros de validação: faixa no topo da etapa com role="alert", rola e foca o campo (padrão do D&D).
   Sem caixa de aviso bloqueante do navegador. */

function trpgApp(){ return document.getElementById("app"); }

function trpgNaoVerificado(texto){
  return `<div class="card-pending" role="note"><b>NÃO VERIFICADO.</b> ${trpgEsc(texto)}</div>`;
}

function trpgAviso(msg){
  if(typeof VFTool !== "undefined" && VFTool.toast) VFTool.toast(msg);
}

function trpgRender(){
  ensureStateShape();
  const app = trpgApp();
  if(!app) return;
  app.innerHTML = state.tela === "ficha" ? trpgHtmlEtapa(state.etapa) : trpgHtmlInicio();
  trpgAtualizarSaidas();
  const h2 = app.querySelector(".card h2");
  if(h2) h2.focus({ preventScroll: true });
}

/* ---- tela inicial: fichas salvas ---- */
function trpgHtmlInicio(){
  const lista = getHistorico();
  const itens = lista.length
    ? lista.map(x => `<li class="card-nested"><div><strong>${trpgEsc(x.nome)}</strong><br><small class="muted">${trpgEsc(x.classe || "classe a definir")} · ${trpgEsc(x.raca || "raça a definir")} · nível ${trpgEsc(x.nivel)}</small></div>
        <div class="actions"><button class="small" data-acao="abrir" data-id="${trpgEsc(x.id)}">Abrir</button><button class="small secondary" data-acao="duplicar" data-id="${trpgEsc(x.id)}">Duplicar</button><button class="small danger" data-acao="excluir" data-id="${trpgEsc(x.id)}">Excluir</button></div></li>`).join("")
    : `<p class="muted">Nenhuma ficha salva neste navegador ainda.</p>`;
  return `<div class="card"><h2 tabindex="-1">Fichas salvas</h2>
    <p>Crie uma ficha do nível 1 ao 5 ou importe um backup JSON deste sistema.</p>
    <div class="actions"><button type="button" data-acao="novo">Nova ficha</button>
      <label class="botao-arquivo">Importar backup JSON<input type="file" accept="application/json,.json" data-campo="importar" class="sr-only"></label></div>
    ${trpgNaoVerificado(TRPG_PENDENTES.racas + " " + TRPG_PENDENTES.classes)}
    <ul class="trpg-lista">${itens}</ul></div>`;
}

/* ---- etapas ---- */
function trpgHtmlEtapa(n){
  const e = TRPG_ETAPAS[n - 1];
  const total = TRPG_ETAPAS.length;
  const dots = TRPG_ETAPAS.map(x => {
    const cls = x.n === n ? "atual" : x.n < n ? "feito" : "";
    const acao = x.n < n ? ` data-acao="ir" data-etapa="${x.n}"` : " disabled";
    return `<li><button type="button" class="${cls}"${acao} aria-label="Etapa ${x.n}: ${x.nome}"${x.n === n ? ' aria-current="step"' : ""}>${x.n < n ? "✓" : x.n}</button></li>`;
  }).join("");
  const botoes = `<div class="actions">${n > 1 ? '<button type="button" class="secondary" data-acao="voltar">Voltar</button>' : ""}${n < total ? '<button type="button" data-acao="avancar">Avançar</button>' : '<button type="button" class="secondary" data-acao="inicio">Fichas salvas</button>'}</div>`;
  return `<div class="stepper"><div class="stepper-top"><div class="stepper-label">Etapa ${n} de ${total} · <b>${e.nome}</b></div></div>
    <div class="stepper-track" role="progressbar" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${n}" aria-label="Progresso da ficha"><div class="stepper-fill" style="--p:${(n - 1) / (total - 1)}"></div></div>
    <ol class="stepper-dots">${dots}</ol></div>
    <div class="card"><div class="toolbar-inline"><div class="step-indicator">Etapa ${n} de ${total} — ${e.nome}</div><button class="danger small" type="button" data-acao="limpar">Limpar dados salvos</button></div>
    <h2 tabindex="-1">${e.nome}</h2>${trpgCorpoEtapa(n)}${botoes}</div>`;
}

function trpgCorpoEtapa(n){
  const p = state.personagem;
  const v = x => trpgEsc(x === null || x === undefined ? "" : x);
  switch(n){
    case 1: return `
      <label for="nome">Nome do personagem</label><input id="nome" data-campo="nome" value="${v(p.nome)}" autocomplete="off">
      <label for="jogador">Jogador</label><input id="jogador" data-campo="jogador" value="${v(p.jogador)}" autocomplete="off">
      <label for="nivel">Nível (1 a ${TRPG_META.nivelMaximoEscopo})</label><input id="nivel" type="number" inputmode="numeric" min="1" max="${TRPG_META.nivelMaximoEscopo}" step="1" data-campo="nivel" value="${v(p.nivel)}">
      <label for="modo">Modo de criação</label><select id="modo" data-campo="modo">
        <option value="livre"${state.modo === "livre" ? " selected" : ""}>Livre: texto livre em raça e classe</option>
        <option value="estrito"${state.modo === "estrito" ? " selected" : ""}>Estrito: raça e classe da lista</option></select>
      <label for="aparencia">Aparência</label><textarea id="aparencia" data-campo="aparencia">${v(p.aparencia)}</textarea>
      <label for="historia">História</label><textarea id="historia" data-campo="historia">${v(p.historia)}</textarea>`;
    case 2: return trpgCampoOpcoes("raca", "Raça", TRPG_RACAS, p.raca, TRPG_PENDENTES.racas);
    case 3: return trpgCampoOpcoes("classe", "Classe", TRPG_CLASSES, p.classe, TRPG_PENDENTES.classes);
    case 4: return `${trpgNaoVerificado(TRPG_PENDENTES.atributos)}
      <p class="muted">Digite os valores de cada atributo (inteiro de 1 a 30). Os modificadores são calculados pela fórmula do d20 SRD 3.5.</p>
      <div class="trpg-atributos">${TRPG_ATRIBUTOS.map(a => `<div class="trpg-atr">
        <label for="atr-${a.id}">${a.nome} (${a.abrev})</label>
        <input id="atr-${a.id}" type="number" inputmode="numeric" min="1" max="30" step="1" data-campo="atr:${a.id}" value="${v(p.atributos[a.id])}">
        <output data-saida="mod:${a.id}">Modificador</output></div>`).join("")}</div>`;
    case 5: return `${trpgNaoVerificado(TRPG_PENDENTES.pericias)}
      <p>Pontos por nível: <output data-saida="pontos">a definir</output></p>
      <label for="disponiveis">Pontos de perícia disponíveis (deixe vazio se não souber)</label>
      <input id="disponiveis" type="number" inputmode="numeric" min="0" step="1" data-campo="disponiveis" value="${v(p.pericias.pontosDisponiveis)}">
      <label for="gastas">Graduações gastas</label>
      <input id="gastas" type="number" inputmode="numeric" min="0" step="1" data-campo="gastas" value="${v(p.pericias.graduacoesGastas)}">`;
    case 6: return `${trpgNaoVerificado(TRPG_PENDENTES.talentos)}
      <label for="talentos">Talentos (um por linha)</label><textarea id="talentos" data-campo="talentos">${v(p.talentos)}</textarea>`;
    case 7: return `${trpgNaoVerificado(TRPG_PENDENTES.magias)}
      <label for="magias">Magias (uma por linha)</label><textarea id="magias" data-campo="magias">${v(p.magias)}</textarea>`;
    case 8: return `${trpgNaoVerificado(TRPG_PENDENTES.equipamento)}
      <label for="equipamento">Equipamento (um item por linha)</label><textarea id="equipamento" data-campo="equipamento">${v(p.equipamento)}</textarea>
      <label for="dinheiro">Dinheiro (unidade a confirmar)</label>
      <input id="dinheiro" type="number" inputmode="numeric" min="0" step="1" data-campo="dinheiro" value="${v(p.dinheiro)}">`;
    case 9: return `${trpgNaoVerificado("Bônus base de ataque e testes de resistência dependem da classe e não são calculados. PV e deslocamento são digitados à mão até a regra ser verificada.")}
      <p>Classe de Armadura: <output data-saida="ca">—</output> · Iniciativa: <output data-saida="ini">—</output></p>
      <label for="armadura">Bônus de armadura</label><input id="armadura" type="number" inputmode="numeric" step="1" data-campo="armadura" value="${v(p.derivados.armadura)}">
      <label for="escudo">Bônus de escudo</label><input id="escudo" type="number" inputmode="numeric" step="1" data-campo="escudo" value="${v(p.derivados.escudo)}">
      <label for="tamanho">Modificador de tamanho</label><input id="tamanho" type="number" inputmode="numeric" step="1" data-campo="tamanho" value="${v(p.derivados.tamanho)}">
      <label for="pv-max">PV máximo (manual)</label><input id="pv-max" type="number" inputmode="numeric" min="1" step="1" data-campo="pvMaximo" value="${v(p.derivados.pvMaximo)}">
      <label for="pv-atual">PV atuais (manual)</label><input id="pv-atual" type="number" inputmode="numeric" step="1" data-campo="pvAtuais" value="${v(p.derivados.pvAtuais)}">
      <label for="deslocamento">Deslocamento (texto)</label><input id="deslocamento" data-campo="deslocamento" value="${v(p.derivados.deslocamento)}">`;
    case 10: return trpgHtmlResumo();
    default: return "";
  }
}

function trpgCampoOpcoes(campo, rotulo, tabela, valor, pendencia){
  const chaves = Object.keys(tabela);
  if(!chaves.length){
    return `${trpgNaoVerificado(pendencia)}
      <label for="${campo}">${rotulo} (texto livre, até a tabela ser verificada)</label>
      <input id="${campo}" data-campo="${campo}" value="${trpgEsc(valor)}" autocomplete="off">`;
  }
  const ops = chaves.map(k => `<option value="${trpgEsc(k)}"${k === valor ? " selected" : ""}>${trpgEsc(tabela[k].nome || k)}</option>`).join("");
  return `<label for="${campo}">${rotulo}</label><select id="${campo}" data-campo="${campo}"><option value="">Escolha</option>${ops}</select>`;
}

function trpgHtmlResumo(){
  const p = state.personagem, d = trpgDerivados(p);
  const atr = TRPG_ATRIBUTOS.map(a => `${a.abrev} ${p.atributos[a.id] ?? "—"} (${trpgFormatarBonus(d.modificadores[a.id])})`).join(" · ");
  const linhas = [
    ["Personagem", `${p.nome || "sem nome"}${p.jogador ? " · jogador " + p.jogador : ""}`],
    ["Raça e classe", `${p.raca || "a definir"} · ${p.classe || "a definir"} · nível ${p.nivel}`],
    ["Atributos", atr],
    ["CA", d.ca === null ? "—" : String(d.ca)],
    ["Iniciativa (hipótese)", trpgFormatarBonus(d.iniciativa)],
    ["PV máximo (manual)", p.derivados.pvMaximo === null ? "—" : String(p.derivados.pvMaximo)],
    ["Talentos", String(p.talentos || "").split(/\r?\n/).filter(x => x.trim()).length + " registrado(s)"],
    ["Magias", String(p.magias || "").split(/\r?\n/).filter(x => x.trim()).length + " registrada(s)"],
    ["Dinheiro", String(p.dinheiro)]
  ];
  return `<dl class="trpg-resumo">${linhas.map(([k, val]) => `<dt>${trpgEsc(k)}</dt><dd>${trpgEsc(val)}</dd>`).join("")}</dl>
    <p class="muted">Edição: ${trpgEsc(TRPG_META.edicao)}. Fontes: ${trpgEsc(TRPG_META.fonteEdicao)}</p>
    ${trpgNaoVerificado(TRPG_PENDENTES.vtt)}
    <div class="actions"><button type="button" data-acao="salvar">Salvar no histórico</button>
      <button type="button" class="secondary" data-acao="backup">Baixar backup JSON</button>
      <button type="button" class="secondary" data-acao="pdf">Gerar PDF (2 páginas)</button></div>`;
}

/* Atualiza os campos calculados (modificadores, CA, iniciativa, pontos) sem recriar a tela. */
function trpgAtualizarSaidas(){
  const app = trpgApp(); if(!app) return;
  const p = state.personagem, d = trpgDerivados(p);
  app.querySelectorAll("[data-saida]").forEach(el => {
    const k = el.dataset.saida;
    if(k.startsWith("mod:")) el.textContent = "Modificador " + trpgFormatarBonus(d.modificadores[k.slice(4)]);
    else if(k === "ca") el.textContent = d.ca === null ? "—" : String(d.ca);
    else if(k === "ini") el.textContent = trpgFormatarBonus(d.iniciativa);
    else if(k === "pontos"){
      const pts = trpgPontosPorNivel({ base: null, inteligencia: p.atributos.inteligencia });
      el.textContent = pts === null ? "a definir (base da classe NÃO VERIFICADA)" : String(pts);
    }
  });
}

/* Grava o valor de um campo no estado. Vazio vira null (o validador decide). */
function trpgAplicarCampo(campo, el){
  const p = state.personagem, texto = el.value;
  const numero = () => texto.trim() === "" ? null : Number(texto);
  if(campo.startsWith("atr:")){ p.atributos[campo.slice(4)] = numero(); return; }
  switch(campo){
    case "nome": p.nome = texto; break;
    case "jogador": p.jogador = texto; break;
    case "nivel": p.nivel = numero(); break;
    case "modo": state.modo = texto === "estrito" ? "estrito" : "livre"; break;
    case "aparencia": p.aparencia = texto; break;
    case "historia": p.historia = texto; break;
    case "raca": p.raca = texto; break;
    case "classe": p.classe = texto; break;
    case "disponiveis": p.pericias.pontosDisponiveis = numero(); break;
    case "gastas": p.pericias.graduacoesGastas = numero(); break;
    case "talentos": p.talentos = texto; break;
    case "magias": p.magias = texto; break;
    case "equipamento": p.equipamento = texto; break;
    case "dinheiro": p.dinheiro = numero() ?? 0; break;
    case "armadura": p.derivados.armadura = numero(); break;
    case "escudo": p.derivados.escudo = numero(); break;
    case "tamanho": p.derivados.tamanho = numero(); break;
    case "pvMaximo": p.derivados.pvMaximo = numero(); break;
    case "pvAtuais": p.derivados.pvAtuais = numero(); break;
    case "deslocamento": p.derivados.deslocamento = texto; break;
    default: return;
  }
}

/* ---- navegação e validação ---- */
function trpgMostrarErro(erro, total){
  const app = trpgApp(); const card = app && app.querySelector(".card"); if(!card) return;
  card.querySelectorAll(".aviso-etapa").forEach(n => n.remove());
  const a = document.createElement("div");
  a.className = "alert error aviso-etapa"; a.setAttribute("role", "alert");
  a.textContent = erro.msg + (total > 1 ? " (mais " + (total - 1) + " pendência(s) abaixo)" : "");
  const h2 = card.querySelector("h2"); (h2 || card.firstChild).insertAdjacentElement("afterend", a);
  const el = erro.campo && document.getElementById(erro.campo);
  if(el){
    el.classList.add("campo-erro");
    el.addEventListener("input", () => el.classList.remove("campo-erro"), { once: true });
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "center" });
  } else a.scrollIntoView({ block: "center" });
}

function trpgAvancar(){
  const erros = trpgValidarEtapa(state.etapa, state.personagem, state.modo);
  if(erros.length){ trpgMostrarErro(erros[0], erros.length); return; }
  if(state.etapa < TRPG_ETAPAS.length) state.etapa++;
  salvarEstado();
  trpgRender();
}

function trpgVoltar(){
  if(state.etapa > 1) state.etapa--;
  salvarEstado();
  trpgRender();
}

function trpgIrPara(n){
  if(n >= 1 && n < state.etapa){ state.etapa = n; salvarEstado(); trpgRender(); }
}

function trpgNovaFicha(){
  substituirEstado(estadoPadrao());
  state.tela = "ficha"; state.etapa = 1;
  salvarEstado(); trpgRender();
}

function trpgIrInicio(){
  state.tela = "inicio";
  salvarEstado(); trpgRender();
}

function trpgAbrir(id){
  if(carregarDoHistorico(id)){ state.tela = "ficha"; state.etapa = 1; salvarEstado(); trpgRender(); }
}

function trpgBaixarBackup(){
  const blob = new Blob([JSON.stringify(montarBackup(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = nomeArquivoBackup();
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  trpgAviso("Backup baixado.");
}

function trpgGerarPdf(){
  const w = window.open("", "_blank");
  if(!w){ trpgAviso("O navegador bloqueou a janela do PDF. Permita pop-ups e tente de novo."); return; }
  w.document.open(); w.document.write(trpgPaginaPdfCompleta()); w.document.close();
}

function trpgImportar(arquivo){
  arquivo.text().then(texto => {
    const r = lerBackup(texto);
    if(!r.ok){ trpgAvisoNaTela(r.erro); return; }
    substituirEstado(r.estado);
    state.tela = "ficha"; state.etapa = 1; state.currentHistoryId = null;
    salvarEstado(); trpgRender();
    trpgAviso("Backup importado.");
  }).catch(() => trpgAvisoNaTela("Não foi possível ler o arquivo."));
}

function trpgAvisoNaTela(msg){
  const app = trpgApp(); const card = app && app.querySelector(".card"); if(!card) return;
  card.querySelectorAll(".aviso-etapa").forEach(n => n.remove());
  const a = document.createElement("div");
  a.className = "alert error aviso-etapa"; a.setAttribute("role", "alert"); a.textContent = msg;
  card.querySelector("h2").insertAdjacentElement("afterend", a);
  a.scrollIntoView({ block: "center" });
}

function trpgLigarEventos(){
  const app = trpgApp(); if(!app) return;
  app.addEventListener("click", ev => {
    const b = ev.target.closest("[data-acao]");
    if(!b || b.disabled) return;
    const acao = b.dataset.acao, id = b.dataset.id;
    if(acao === "novo") trpgNovaFicha();
    else if(acao === "avancar") trpgAvancar();
    else if(acao === "voltar") trpgVoltar();
    else if(acao === "ir") trpgIrPara(Number(b.dataset.etapa));
    else if(acao === "inicio") trpgIrInicio();
    else if(acao === "abrir") trpgAbrir(id);
    else if(acao === "duplicar"){ duplicarNoHistorico(id); trpgRender(); trpgAviso("Cópia criada."); }
    else if(acao === "excluir"){ if(window.confirm("Excluir esta ficha deste navegador?")){ excluirDoHistorico(id); trpgRender(); } }
    else if(acao === "salvar"){ salvarNoHistorico(false); trpgAviso("Ficha salva neste navegador."); }
    else if(acao === "backup") trpgBaixarBackup();
    else if(acao === "pdf") trpgGerarPdf();
    else if(acao === "limpar"){ if(window.confirm("Apagar a ficha atual e as fichas salvas deste navegador?")){ limparDadosSalvos(); substituirEstado(estadoPadrao()); trpgRender(); } }
  });
  const aoMudar = ev => {
    const el = ev.target, campo = el.dataset && el.dataset.campo;
    if(!campo) return;
    if(campo === "importar"){ if(el.files && el.files[0]) trpgImportar(el.files[0]); return; }
    trpgAplicarCampo(campo, el);
    salvarEstado();
    trpgAtualizarSaidas();
  };
  app.addEventListener("input", aoMudar);
  app.addEventListener("change", aoMudar);
}
