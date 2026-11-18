/* Interface: tela de fichas salvas e as sete etapas. Eventos por delegação em #app (tdtLigarEventos).
   Erro de validação: faixa role="alert" no topo da etapa, rola e foca o campo (padrão do D&D). Nunca caixa bloqueante do navegador.
   Avisos da etapa (modo livre, custo não verificado, recomendações) aparecem como faixa de aviso e se atualizam
   ao digitar, sem repintar a tela (para não perder o foco). Confirmações curtas usam VFTool.toast. */

function tdtApp(){ return document.getElementById("app"); }

function tdtAviso(msg){
  if(typeof VFTool !== "undefined" && VFTool.toast) VFTool.toast(msg);
}

function tdtNormalizar(s){
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/* Repinta a tela. `foco` é o id do elemento que deve receber o foco depois (senão, o título). */
function tdtRender(foco){
  ensureStateShape();
  const app = tdtApp();
  if(!app) return;
  app.innerHTML = state.tela === "ficha" ? tdtHtmlEtapa(state.etapa) : tdtHtmlInicio();
  tdtAtualizarSaidas();
  const alvo = foco && document.getElementById(foco);
  if(alvo) alvo.focus({ preventScroll: true });
  else { const h2 = app.querySelector(".card h2"); if(h2) h2.focus({ preventScroll: true }); }
}

/* ---- tela inicial: fichas salvas ---- */
function tdtHtmlInicio(){
  const lista = getHistorico();
  const itens = lista.length
    ? lista.map(x => `<li class="card-nested"><div><strong>${tdtEsc(x.nome)}</strong><br><small class="muted">${tdtEsc(tdtNomeArquetipo(x.arquetipo))} · ${tdtEsc(tdtNomeNivel(x.nivelPoder))} · ${tdtEsc(x.pontosTotal === null || x.pontosTotal === undefined ? "pontos a definir" : x.pontosTotal + " pontos")}</small></div>
        <div class="actions"><button class="small" data-acao="abrir" data-id="${tdtEsc(x.id)}">Abrir</button><button class="small secondary" data-acao="duplicar" data-id="${tdtEsc(x.id)}">Duplicar</button><button class="small danger" data-acao="excluir" data-id="${tdtEsc(x.id)}">Excluir</button></div></li>`).join("")
    : `<p class="muted">Nenhuma ficha salva neste navegador ainda.</p>`;
  return `<div class="card"><h2 tabindex="-1">Fichas salvas</h2>
    <p>Crie uma ficha de Iniciante, Herói, Veterano ou com pontos livres, ou importe um backup JSON deste sistema.</p>
    <div class="actions"><button type="button" data-acao="novo">Nova ficha</button>
      <label class="botao-arquivo">Importar backup JSON<input type="file" accept="application/json,.json" data-campo="importar" class="sr-only"></label></div>
    <ul class="tdt-lista">${itens}</ul></div>`;
}

/* ---- etapas ---- */
function tdtHtmlEtapa(n){
  const e = TDT_ETAPAS[n - 1];
  const total = TDT_ETAPAS.length;
  const dots = TDT_ETAPAS.map(x => {
    const cls = x.n === n ? "atual" : x.n < n ? "feito" : "";
    const acao = x.n < n ? ` data-acao="ir" data-etapa="${x.n}"` : " disabled";
    return `<li><button type="button" class="${cls}"${acao} aria-label="Etapa ${x.n}: ${x.nome}"${x.n === n ? ' aria-current="step"' : ""}>${x.n < n ? "✓" : x.n}</button></li>`;
  }).join("");
  const botoes = `<div class="actions">${n > 1 ? '<button type="button" class="secondary" data-acao="voltar">Voltar</button>' : ""}${n < total ? '<button type="button" data-acao="avancar">Avançar</button>' : '<button type="button" class="secondary" data-acao="inicio">Fichas salvas</button>'}</div>`;
  return `<div class="stepper"><div class="stepper-top"><div class="stepper-label">Etapa ${n} de ${total} · <b>${e.nome}</b></div></div>
    <div class="stepper-track" role="progressbar" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${n}" aria-label="Progresso da ficha"><div class="stepper-fill" style="--p:${(n - 1) / (total - 1)}"></div></div>
    <ol class="stepper-dots">${dots}</ol></div>
    ${tdtHtmlContador()}
    <div class="card"><div class="toolbar-inline"><div class="step-indicator">Etapa ${n} de ${total} — ${e.nome}</div><button class="danger small" type="button" data-acao="limpar">Limpar dados salvos</button></div>
    <h2 tabindex="-1">${e.nome}</h2><div id="avisos-etapa">${tdtAvisosHtml(n)}</div>${tdtCorpoEtapa(n)}${botoes}</div>`;
}

/* Contador fixo: pontos gastos, disponíveis e saldo. Fica visível em todas as etapas. */
function tdtHtmlContador(){
  return `<div class="tdt-contador" id="contador-pontos" tabindex="-1"><span>Gastos <output data-saida="gastos">a definir</output> de <output data-saida="disp">a definir</output> disponíveis</span><span>Saldo <output data-saida="saldo">a definir</output></span></div>`;
}

function tdtAvisosHtml(n){
  if(n === 7) return ""; // na Revisão os avisos já aparecem na lista de pendências
  return tdtValidarEtapa(n, state.personagem, state.modo)
    .filter(x => x.nivel === "aviso")
    .map(x => `<div class="alert warning" role="note">${tdtEsc(x.msg)}</div>`).join("");
}

/* Opções do seletor de arquétipo e do nível de poder. */
function tdtOpcoesNivel(atual){
  const pre = TDT_RULES.niveisDePoder.map(x => `<option value="${x.id}"${atual === x.id ? " selected" : ""}>${tdtEsc(x.nome)} · ${x.pontos} pontos</option>`).join("");
  return pre + `<option value="livre"${atual === "livre" ? " selected" : ""}>Pontos livres</option>`;
}

function tdtCorpoEtapa(n){
  const p = state.personagem;
  const v = x => tdtEsc(x === null || x === undefined ? "" : x);
  switch(n){
    case 1: {
      const preset = TDT_RULES.niveisDePoder.find(x => x.id === p.nivelPoder);
      return `
      <label for="nome">Nome do personagem</label><input id="nome" data-campo="nome" value="${v(p.nome)}" autocomplete="off">
      <label for="jogador">Jogador</label><input id="jogador" data-campo="jogador" value="${v(p.jogador)}" autocomplete="off">
      <label for="imagem-personagem">Imagem do personagem (PNG ou JPEG, até 5 MB)</label>
      <div class="tdt-imagem" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">${tdtImagemPrevia(p.imagem)}<input id="imagem-personagem" type="file" accept="image/png,image/jpeg" data-acao="imagem-arquivo">${tdtImagemValida(p.imagem) ? `<button type="button" class="small secondary" data-acao="imagem-remover">Remover imagem</button>` : ""}</div>${tdtAvisoImagemAtual() ? `<p class="alert warning">${v(tdtAvisoImagemAtual())}</p>` : ""}
      <label for="conceito">Conceito (uma frase)</label><input id="conceito" data-campo="conceito" value="${v(p.conceito)}" autocomplete="off">
      <label for="nivel-poder">Nível de poder</label><select id="nivel-poder" data-campo="nivelPoder">${tdtOpcoesNivel(p.nivelPoder)}</select>
      <label for="pontos-total">Pontos totais${preset ? " (fixos pelo nível de poder)" : " (pontos livres)"}</label>
      <input id="pontos-total" type="number" inputmode="numeric" min="0" step="1" data-campo="pontosTotal" value="${v(p.pontosTotal)}"${preset ? " readonly" : ""}>
      <label for="modo">Modo de validação</label><select id="modo" data-campo="modo">
        <option value="livre"${state.modo === "livre" ? " selected" : ""}>Livre: limites de jogo viram aviso</option>
        <option value="estrito"${state.modo === "estrito" ? " selected" : ""}>Estrito: limites de jogo bloqueiam a etapa</option></select>
      <p class="muted">Os pontos iniciais dos níveis vêm do Playtest: ${TDT_RULES.niveisDePoder.map(x => x.nome + " " + x.pontos).join(", ")}. Pontos livres aceitam outro valor.</p>`;
    }
    case 2: {
      const id = tdtArquetipoId(p);
      return `<label for="arquetipo">Arquétipo (raça no 3DeT)</label>
      <select id="arquetipo" data-campo="arquetipo"><option value="">Escolha</option>${TDT_RULES.arquetipos.map(a => `<option value="${a.id}"${a.id === id ? " selected" : ""}>${tdtEsc(a.nome)} · ${a.custo === null ? "custo NÃO VERIFICADO" : "custo " + a.custo}</option>`).join("")}</select>
      <div id="detalhe-arquetipo" class="tdt-detalhe muted" data-saida="detalhe:arquetipo"></div>
      <p class="muted">Só um arquétipo por personagem. Desvantagens do arquétipo não contam no limite de −2.</p>`;
    }
    case 3: return `
      <div class="tdt-atributos">${TDT_RULES.atributos.map(a => `<div class="tdt-atr">
        <label for="atr-${a.id}">${tdtEsc(a.nome)} (${a.id})</label>
        <input id="atr-${a.id}" type="number" inputmode="numeric" min="${TDT_RULES.criacao.atributoMin}" max="${TDT_RULES.criacao.atributoMax}" step="1" data-campo="atr:${a.id}" value="${v(p.atributos[a.id])}">
        <small class="muted">${tdtEsc(a.desc)}</small></div>`).join("")}</div>
      <ul class="tdt-recursos" aria-label="Recursos calculados">
        <li>PA <output data-saida="pa">a definir</output> <small class="muted">Pontos de Ação</small></li>
        <li>PM <output data-saida="pm">a definir</output> <small class="muted">Pontos de Mana</small></li>
        <li>PV <output data-saida="pv">a definir</output> <small class="muted">Pontos de Vida</small></li>
      </ul>
      <p class="muted">Cada ponto em atributo custa ${TDT_RULES.criacao.atributoCusto}. Valores de ${TDT_RULES.criacao.atributoMin} a ${TDT_RULES.criacao.atributoMax}.</p>
      <div class="actions"><button type="button" class="secondary" data-acao="sugerir-atributos">Sugerir atributos</button></div>
      <p class="muted" id="sugestao-atributos" role="status" aria-live="polite"></p>`;
    case 4: return `
      <fieldset class="tdt-fieldset"><legend>Perícias (${TDT_RULES.periciaCusto} ponto cada)</legend>
        <div class="tdt-checks">${TDT_RULES.pericias.map(x => `<label class="tdt-check"><input type="checkbox" id="pericia-${x.id}" data-campo="pericia" data-id="${x.id}"${(p.pericias || []).includes(x.id) ? " checked" : ""}><span>${tdtEsc(x.nome)}${x.alias ? " (no Kit: " + tdtEsc(x.alias) + ")" : ""}</span></label>`).join("")}</div>
      </fieldset>
      <p class="muted">Perícias escolhidas: <output data-saida="qtd-pericias">0</output>. Maestrias pedem uma destas perícias.</p>`;
    case 5: return `
      <h3 class="tdt-sub">Escolhidas</h3>
      <ul class="tdt-lista" id="lista-vantagens">${(p.vantagens || []).map((x, i) => tdtItemVantagem(x, i)).join("") || '<li class="muted">Nenhuma vantagem escolhida.</li>'}</ul>
      <h3 class="tdt-sub">Disponíveis</h3>
      <label for="busca-vantagem">Buscar vantagem</label>
      <input id="busca-vantagem" type="search" data-busca="vantagem" autocomplete="off">
      <ul class="tdt-lista" id="catalogo-vantagens">${TDT_RULES.vantagens.map(r => tdtCatalogoVantagem(r)).join("")}</ul>
      <p class="muted">Custos em pontos. Vantagens sem descrição mostram só o nome e o custo.</p>
      ${tdtBlocoVeiculos()}`;
    case 6: return `
      <p>Pontos ganhos com desvantagens: <output data-saida="desv-resumo">0</output></p>
      <h3 class="tdt-sub">Escolhidas</h3>
      <ul class="tdt-lista" id="lista-desvantagens">${(p.desvantagens || []).map((x, i) => tdtItemDesvantagem(x, i)).join("") || '<li class="muted">Nenhuma desvantagem escolhida.</li>'}</ul>
      <h3 class="tdt-sub">Disponíveis</h3>
      <label for="busca-desvantagem">Buscar desvantagem</label>
      <input id="busca-desvantagem" type="search" data-busca="desvantagem" autocomplete="off">
      <ul class="tdt-lista" id="catalogo-desvantagens">${TDT_RULES.desvantagens.filter(r => !(r.obs && /NPC/i.test(r.obs))).map(r => tdtCatalogoDesvantagem(r)).join("")}</ul>
      <p class="muted">Dependência é só para NPCs vilões e não aparece aqui.</p>`;
    case 7: return tdtHtmlRevisao();
    default: return "";
  }
}

function tdtTextoCusto(r){
  if(r.custo !== undefined) return "custo " + r.custo + (r.multiplo ? " (cada)" : "");
  if(Array.isArray(r.custoOpcoes)) return "custo " + r.custoOpcoes.join(", ");
  if(r.custoAberto) return "custo " + r.custoMin + " ou mais";
  return "custo " + r.custoMin + " a " + r.custoMax;
}

function tdtTextoValor(r){
  if(r.valor !== undefined) return "valor " + r.valor;
  return "valor " + r.valorMin + " a " + r.valorMax;
}

function tdtNotaEfeito(r){
  return r.desc ? tdtEsc(r.desc) : "Efeito não incluído; consulte o manual.";
}

function tdtCatalogoVantagem(r){
  const jaTem = !r.multiplo && !r.itens && (state.personagem.vantagens || []).some(x => x.id === r.id);
  return `<li class="card-nested tdt-item" data-nome="${tdtEsc(tdtNormalizar(r.nome))}">
    <div><strong>${tdtEsc(r.nome)}</strong> <small class="muted">${tdtEsc(tdtTextoCusto(r))}</small><br><small class="muted">${tdtNotaEfeito(r)}</small></div>
    <div class="actions"><button type="button" class="small" data-acao="vant-add" data-id="${r.id}"${jaTem ? " disabled" : ""}>Adicionar</button></div></li>`;
}

function tdtCatalogoDesvantagem(r){
  const jaTem = !r.multiplo && (state.personagem.desvantagens || []).some(x => x.id === r.id);
  return `<li class="card-nested tdt-item" data-nome="${tdtEsc(tdtNormalizar(r.nome))}">
    <div><strong>${tdtEsc(r.nome)}</strong> <small class="muted">${tdtEsc(tdtTextoValor(r))} ${r.multiplo ? "(pode repetir)" : ""}</small><br><small class="muted">${tdtNotaEfeito(r)}</small></div>
    <div class="actions"><button type="button" class="small" data-acao="desv-add" data-id="${r.id}"${jaTem ? " disabled" : ""}>Adicionar</button></div></li>`;
}

function tdtItemVantagem(v, i){
  const r = tdtVantagemRegra(v.id);
  if(!r) return `<li class="card-nested" id="vant-item-${i}" tabindex="-1">${tdtEsc(v.id)} (fora da lista)</li>`;
  const custo = tdtCustoVantagem(v);
  const controles = [];
  if(r.multiplo) controles.push(`<label for="vant-qtd-${i}">Quantidade</label><input id="vant-qtd-${i}" type="number" inputmode="numeric" min="1" step="1" data-campo="vant-qtd" data-i="${i}" value="${tdtEsc(v.qtd === undefined || v.qtd === null ? "" : v.qtd)}">`);
  if(r.custo === undefined){
    const opcoes = Array.isArray(r.custoOpcoes) ? r.custoOpcoes : Array.from({ length: r.custoMax - r.custoMin + 1 }, (_, k) => r.custoMin + k);
    if(r.custoAberto) controles.push(`<label for="vant-custo-${i}">Custo escolhido (1 ou mais)</label><input id="vant-custo-${i}" type="number" inputmode="numeric" min="1" step="1" data-campo="vant-custo" data-i="${i}" value="${tdtEsc(v.custo === undefined || v.custo === null ? "" : v.custo)}">`);
    else controles.push(`<label for="vant-custo-${i}">Custo escolhido</label><select id="vant-custo-${i}" data-campo="vant-custo" data-i="${i}">${opcoes.map(o => `<option value="${o}"${o === v.custo ? " selected" : ""}>${o}</option>`).join("")}</select>`);
  }
  if(r.itens){
    const ops = (TDT_RULES.artefatoTipos || []).map(t => `<option value="${t.id}"${t.id === v.tipo ? " selected" : ""}>${tdtEsc(t.nome)}</option>`).join("");
    controles.push(`<label for="vant-tipo-${i}">Tipo do item</label><select id="vant-tipo-${i}" data-campo="vant-tipo" data-i="${i}"><option value="">Escolha um tipo</option>${ops}</select>`);
  }
  if(r.id === "maestria"){
    const ops = (state.personagem.pericias || []).map(id => { const pr = tdtPericiaRegra(id); return pr ? `<option value="${pr.id}"${pr.id === v.nota ? " selected" : ""}>${tdtEsc(pr.nome)}</option>` : ""; }).join("");
    controles.push(`<label for="vant-nota-${i}">Perícia da Maestria</label><select id="vant-nota-${i}" data-campo="vant-nota" data-i="${i}"><option value="">Escolha uma perícia</option>${ops}</select>`);
  } else {
    controles.push(`<label for="vant-nota-${i}">Nota (opcional)</label><input id="vant-nota-${i}" data-campo="vant-nota" data-i="${i}" value="${tdtEsc(v.nota || "")}" autocomplete="off">`);
  }
  return `<li class="card-nested" id="vant-item-${i}" tabindex="-1">
    <div><strong>${tdtEsc(r.nome)}</strong> <small class="muted">${tdtEsc(custo === null ? "custo a definir" : "custo " + custo + " pt")}</small><br><small class="muted">${tdtNotaEfeito(r)}</small></div>
    <div class="tdt-controles">${controles.join("")}</div>
    ${r.itens ? tdtBlocoQualidades(v, i) : ""}
    <div class="actions"><button type="button" class="small danger" data-acao="vant-remover" data-i="${i}">Remover</button></div></li>`;
}

/* Qualidades de um Artefato (PDF p139-141): lista com custo em XP, escolha quando o livro pede, e um seletor para adicionar. */
function tdtTextoXP(xp){
  if(xp === null) return "custo a definir";
  return (xp > 0 ? "+" : "–") + Math.abs(xp) + " XP";
}

function tdtControleEscolhaQualidade(qr, q, i, k){
  if(Array.isArray(qr.opcoes)){
    const ops = qr.opcoes.map(o => `<option value="${o.v}"${o.v === q.escolha ? " selected" : ""}>${tdtEsc(o.rotulo)}</option>`).join("");
    return `<label for="arte-qual-escolha-${i}-${k}">Faixa de ${tdtEsc(qr.nome)}</label><select id="arte-qual-escolha-${i}-${k}" data-campo="arte-qual-escolha" data-i="${i}" data-k="${k}"><option value="">Escolha</option>${ops}</select>`;
  }
  if(qr.escolha === "pericia"){
    const ops = TDT_RULES.pericias.map(x => `<option value="${x.id}"${x.id === q.escolha ? " selected" : ""}>${tdtEsc(x.nome)}</option>`).join("");
    return `<label for="arte-qual-escolha-${i}-${k}">Perícia de ${tdtEsc(qr.nome)}</label><select id="arte-qual-escolha-${i}-${k}" data-campo="arte-qual-escolha" data-i="${i}" data-k="${k}"><option value="">Escolha uma perícia</option>${ops}</select>`;
  }
  if(qr.escolha === "texto"){
    return `<label for="arte-qual-escolha-${i}-${k}">Tipo de alvo</label><input id="arte-qual-escolha-${i}-${k}" data-campo="arte-qual-escolha" data-i="${i}" data-k="${k}" value="${tdtEsc(q.escolha || "")}" autocomplete="off">`;
  }
  return "";
}

function tdtBlocoQualidades(v, i){
  const qs = Array.isArray(v.qualidades) ? v.qualidades : [];
  const lista = qs.map((q, k) => {
    const qr = tdtAchar(TDT_RULES.qualidadesArtefato, q.id);
    if(!qr) return `<li>${tdtEsc(q.id)} (fora da lista)</li>`;
    const xp = tdtCustoQualidadeXP(q);
    const sem = qr.aplicavel === false ? " (não calculada)" : "";
    return `<li class="tdt-qualidade"><div><strong>${tdtEsc(qr.nome)}</strong> <small class="muted">${tdtEsc(tdtTextoXP(xp))}${tdtEsc(sem)}</small><br><small class="muted">${tdtEsc(qr.desc)} · ${tdtEsc(qr.fonte)}</small></div>
      <div class="tdt-controles">${tdtControleEscolhaQualidade(qr, q, i, k)}</div>
      <div class="actions"><button type="button" class="small danger" data-acao="arte-qual-remover" data-i="${i}" data-k="${k}">Remover qualidade</button></div></li>`;
  }).join("");
  const disponiveis = TDT_RULES.qualidadesArtefato.filter(q => q.aplicavel !== false && !qs.some(x => x.id === q.id) && (!q.tipos || !v.tipo || q.tipos.includes(v.tipo)));
  const ops = disponiveis.map(q => `<option value="${q.id}">${tdtEsc(q.nome)} (${Array.isArray(q.opcoes) ? "escolhe a faixa" : tdtEsc(tdtTextoXP(q.xp))})</option>`).join("");
  return `<div class="tdt-qualidades"><p class="muted">Qualidades de Artefato (livro, p.139-141). Cada uma muda o custo em XP; o mínimo do Artefato é 10 XP.</p>
    <ul class="tdt-lista" id="qualidades-${i}">${lista || '<li class="muted">Nenhuma qualidade.</li>'}</ul>
    <div class="tdt-controles"><label for="arte-qual-add-${i}">Adicionar qualidade</label><select id="arte-qual-add-${i}"><option value="">Escolha uma qualidade</option>${ops}</select>
    <button type="button" class="small" data-acao="arte-qual-add" data-i="${i}">Adicionar</button></div></div>`;
}

/* Veículos (PDF p140-142). Cada veículo tem ficha própria. Vantagens e desvantagens dele vêm do mesmo catálogo,
   sem Artefato (item com tipo), Maestria (o veículo não tem perícia) e Transtorno (escolha à parte). */
function tdtVantagensDoVeiculo(){ return TDT_RULES.vantagens.filter(r => !r.itens && r.id !== "maestria"); }
function tdtDesvantagensDoVeiculo(){ return TDT_RULES.desvantagens.filter(r => !(r.obs && /NPC/i.test(r.obs)) && r.id !== "transtorno"); }

function tdtTextoCustoVeiculo(v){
  const c = tdtCustoVeiculo(v);
  if(v.gratuito === true) return "gratuito (campanha de veículos, p.142)";
  return c === null ? "custo a definir" : c + " pt (" + (c * 10) + " XP)";
}

function tdtBlocoVeiculos(){
  const lista = (state.personagem.veiculos || []).map((v, k) => tdtItemVeiculo(v, k)).join("");
  return `<h3 class="tdt-sub" id="veiculos">Veículos (livro, p.140-142)</h3>
    <p class="muted">Veículo tem ficha própria: atributos, vantagens e desvantagens. Custa em XP pela pontuação e pela escala acima do piloto. Ajudante (montaria, skate) não é veículo.</p>
    <ul class="tdt-lista" id="lista-veiculos">${lista || '<li class="muted">Nenhum veículo.</li>'}</ul>
    <div class="actions"><button type="button" class="secondary" data-acao="veic-add">Adicionar veículo</button></div>`;
}

function tdtItemVeiculo(v, k){
  const e = x => tdtEsc(x === null || x === undefined ? "" : x);
  const at = v.atributos || {};
  const escalas = [1, 2, 3].map(n => `<option value="${n}"${v.escala === n ? " selected" : ""}>${n} ${n === 1 ? "escala" : "escalas"} acima do piloto</option>`).join("");
  const atr = TDT_RULES.atributos.map(a => `<div class="tdt-atr"><label for="veic-${k}-atr-${a.id}">${tdtEsc(a.nome)} (${a.id})</label>
    <input id="veic-${k}-atr-${a.id}" type="number" inputmode="numeric" min="${TDT_RULES.criacao.atributoMin}" max="${TDT_RULES.criacao.atributoMax}" step="1" data-campo="veic-atr:${a.id}" data-k="${k}" value="${e(at[a.id])}"></div>`).join("");
  const opsV = tdtVantagensDoVeiculo().map(r => `<option value="${r.id}">${tdtEsc(r.nome)} (${tdtEsc(tdtTextoCusto(r))})</option>`).join("");
  const opsD = tdtDesvantagensDoVeiculo().map(r => `<option value="${r.id}">${tdtEsc(r.nome)} (${tdtEsc(tdtTextoValor(r))})</option>`).join("");
  const vants = (v.vantagens || []).map((x, i) => tdtItemVeicVantagem(x, i, k)).join("") || '<li class="muted">Nenhuma vantagem.</li>';
  const desvs = (v.desvantagens || []).map((x, i) => tdtItemVeicDesvantagem(x, i, k)).join("") || '<li class="muted">Nenhuma desvantagem.</li>';
  return `<li class="card-nested tdt-veiculo" id="veic-${k}" tabindex="-1">
    <div class="tdt-controles">
      <label for="veic-${k}-nome">Nome do veículo</label><input id="veic-${k}-nome" data-campo="veic-nome" data-k="${k}" value="${e(v.nome)}" autocomplete="off">
      <label for="veic-${k}-tipo">Tipo (livre, ex.: mecha, avião, tanque)</label><input id="veic-${k}-tipo" data-campo="veic-tipo" data-k="${k}" value="${e(v.tipo)}" autocomplete="off">
      <label for="veic-${k}-escala">Escala acima do piloto</label><select id="veic-${k}-escala" data-campo="veic-escala" data-k="${k}"><option value="">Escolha</option>${escalas}</select>
      <label for="veic-${k}-pontos">Pontuação do veículo (10 ou mais, de 5 em 5)</label><input id="veic-${k}-pontos" type="number" inputmode="numeric" min="${TDT_RULES.veiculos.pontosMin}" step="${TDT_RULES.veiculos.pontosPasso}" data-campo="veic-pontos" data-k="${k}" value="${e(v.pontos)}">
      <label class="tdt-check"><input type="checkbox" id="veic-${k}-gratis" data-campo="veic-gratis" data-k="${k}"${v.gratuito ? " checked" : ""}><span>Veículo gratuito (campanha de veículos, p.142)</span></label>
    </div>
    <p><small class="muted">Custo ao personagem: </small><output data-saida="veic:${k}">${tdtEsc(tdtTextoCustoVeiculo(v))}</output></p>
    <fieldset class="tdt-fieldset"><legend>Atributos do veículo (Habilidade nula é o normal, p.142)</legend><div class="tdt-atributos">${atr}</div></fieldset>
    <h4 class="tdt-sub">Vantagens do veículo</h4>
    <ul class="tdt-lista" id="veic-${k}-vantagens">${vants}</ul>
    <div class="tdt-controles"><label for="veic-${k}-vant-sel">Adicionar vantagem</label><select id="veic-${k}-vant-sel"><option value="">Escolha uma vantagem</option>${opsV}</select>
      <button type="button" class="small" data-acao="veic-vant-add" data-k="${k}">Adicionar</button></div>
    <h4 class="tdt-sub">Desvantagens do veículo</h4>
    <ul class="tdt-lista" id="veic-${k}-desvantagens">${desvs}</ul>
    <div class="tdt-controles"><label for="veic-${k}-desv-sel">Adicionar desvantagem</label><select id="veic-${k}-desv-sel"><option value="">Escolha uma desvantagem</option>${opsD}</select>
      <button type="button" class="small" data-acao="veic-desv-add" data-k="${k}">Adicionar</button></div>
    <div class="actions"><button type="button" class="small danger" data-acao="veic-remover" data-k="${k}">Remover veículo</button></div></li>`;
}

function tdtItemVeicVantagem(x, i, k){
  const r = tdtVantagemRegra(x.id);
  if(!r) return `<li class="card-nested" id="veic-${k}-vant-item-${i}" tabindex="-1">${tdtEsc(x.id)} (fora da lista)</li>`;
  const custo = tdtCustoVantagem(x);
  const controles = [];
  if(r.multiplo) controles.push(`<label for="veic-${k}-vant-qtd-${i}">Quantidade</label><input id="veic-${k}-vant-qtd-${i}" type="number" inputmode="numeric" min="1" step="1" data-campo="veic-vant-qtd" data-k="${k}" data-i="${i}" value="${tdtEsc(x.qtd === undefined || x.qtd === null ? "" : x.qtd)}">`);
  if(r.custo === undefined){
    const opcoes = Array.isArray(r.custoOpcoes) ? r.custoOpcoes : Array.from({ length: r.custoMax - r.custoMin + 1 }, (_, n) => r.custoMin + n);
    if(r.custoAberto) controles.push(`<label for="veic-${k}-vant-custo-${i}">Custo escolhido (1 ou mais)</label><input id="veic-${k}-vant-custo-${i}" type="number" inputmode="numeric" min="1" step="1" data-campo="veic-vant-custo" data-k="${k}" data-i="${i}" value="${tdtEsc(x.custo === undefined || x.custo === null ? "" : x.custo)}">`);
    else controles.push(`<label for="veic-${k}-vant-custo-${i}">Custo escolhido</label><select id="veic-${k}-vant-custo-${i}" data-campo="veic-vant-custo" data-k="${k}" data-i="${i}">${opcoes.map(o => `<option value="${o}"${o === x.custo ? " selected" : ""}>${o}</option>`).join("")}</select>`);
  }
  controles.push(`<label for="veic-${k}-vant-nota-${i}">Nota (opcional)</label><input id="veic-${k}-vant-nota-${i}" data-campo="veic-vant-nota" data-k="${k}" data-i="${i}" value="${tdtEsc(x.nota || "")}" autocomplete="off">`);
  return `<li class="card-nested" id="veic-${k}-vant-item-${i}" tabindex="-1">
    <div><strong>${tdtEsc(r.nome)}</strong> <small class="muted">${tdtEsc(custo === null ? "custo a definir" : "custo " + custo + " pt")}</small><br><small class="muted">${tdtNotaEfeito(r)}</small></div>
    <div class="tdt-controles">${controles.join("")}</div>
    <div class="actions"><button type="button" class="small danger" data-acao="veic-vant-remover" data-k="${k}" data-i="${i}">Remover</button></div></li>`;
}

function tdtItemVeicDesvantagem(x, i, k){
  const r = tdtDesvantagemRegra(x.id);
  if(!r) return `<li class="card-nested" id="veic-${k}-desv-item-${i}" tabindex="-1">${tdtEsc(x.id)} (fora da lista)</li>`;
  const controles = [];
  if(r.valor === undefined){
    const ops = Array.from({ length: r.valorMax - r.valorMin + 1 }, (_, n) => r.valorMin + n);
    controles.push(`<label for="veic-${k}-desv-valor-${i}">Valor</label><select id="veic-${k}-desv-valor-${i}" data-campo="veic-desv-valor" data-k="${k}" data-i="${i}">${ops.map(o => `<option value="${o}"${o === x.valor ? " selected" : ""}>${o}</option>`).join("")}</select>`);
  }
  controles.push(`<label for="veic-${k}-desv-nota-${i}">Nota (opcional)</label><input id="veic-${k}-desv-nota-${i}" data-campo="veic-desv-nota" data-k="${k}" data-i="${i}" value="${tdtEsc(x.nota || "")}" autocomplete="off">`);
  return `<li class="card-nested" id="veic-${k}-desv-item-${i}" tabindex="-1">
    <div><strong>${tdtEsc(r.nome)}</strong> <small class="muted">${tdtEsc("valor " + (x.valor === undefined || x.valor === null ? "a definir" : x.valor))}</small><br><small class="muted">${tdtNotaEfeito(r)}</small></div>
    <div class="tdt-controles">${controles.join("")}</div>
    <div class="actions"><button type="button" class="small danger" data-acao="veic-desv-remover" data-k="${k}" data-i="${i}">Remover</button></div></li>`;
}

function tdtItemDesvantagem(d, i){
  const r = tdtDesvantagemRegra(d.id);
  if(!r) return `<li class="card-nested" id="desv-item-${i}" tabindex="-1">${tdtEsc(d.id)} (fora da lista)</li>`;
  const controles = [];
  if(r.valor === undefined){
    const ops = Array.from({ length: r.valorMax - r.valorMin + 1 }, (_, k) => r.valorMin + k);
    controles.push(`<label for="desv-valor-${i}">Valor</label><select id="desv-valor-${i}" data-campo="desv-valor" data-i="${i}">${ops.map(o => `<option value="${o}"${o === d.valor ? " selected" : ""}>${o}</option>`).join("")}</select>`);
  }
  let efeitoEscolhido = "";
  if(d.id === "transtorno"){
    const ops = (TDT_RULES.transtornosOpcoes || []).map(t => `<option value="${t.id}"${t.id === d.subtipo ? " selected" : ""}>${tdtEsc(t.nome)}</option>`).join("");
    controles.push(`<label for="desv-subtipo-${i}">Transtorno</label><select id="desv-subtipo-${i}" data-campo="desv-subtipo" data-i="${i}"><option value="">Escolha um</option>${ops}</select>`);
    const ef = typeof TDT_EFEITOS_DESVANTAGENS !== "undefined" && TDT_EFEITOS_DESVANTAGENS.transtorno && TDT_EFEITOS_DESVANTAGENS.transtorno.opcoes;
    const op = ef && d.subtipo && ef[d.subtipo];
    if(op) efeitoEscolhido = `<br><small class="muted">${tdtEsc(op.desc)} (PDF p.74-75)</small>`;
  }
  controles.push(`<label for="desv-nota-${i}">Nota (opcional)</label><input id="desv-nota-${i}" data-campo="desv-nota" data-i="${i}" value="${tdtEsc(d.nota || "")}" autocomplete="off">`);
  return `<li class="card-nested" id="desv-item-${i}" tabindex="-1">
    <div><strong>${tdtEsc(r.nome)}</strong> <small class="muted">${tdtEsc("valor " + (d.valor === undefined || d.valor === null ? "a definir" : d.valor))}</small><br><small class="muted">${tdtNotaEfeito(r)}</small>${efeitoEscolhido}</div>
    <div class="tdt-controles">${controles.join("")}</div>
    <div class="actions"><button type="button" class="small danger" data-acao="desv-remover" data-i="${i}">Remover</button></div></li>`;
}

/* Revisão: resumo, pendências de todas as etapas, lacunas e aviso de fonte. Nada aqui bloqueia o backup. */
function tdtHtmlRevisao(){
  const p = state.personagem, rec = tdtRecursos(p);
  const pend = tdtValidarTudo(p, state.modo);
  const nRec = x => x === null ? "a definir" : String(x);
  const linhas = [
    ["Personagem", `${p.nome || "sem nome"}${p.jogador ? " · jogador " + p.jogador : ""}`],
    ["Conceito", p.conceito || "—"],
    ["Nível de poder", `${tdtNomeNivel(p.nivelPoder)} · ${nRec(p.pontosTotal)} pontos`],
    ["Arquétipo", tdtNomeArquetipo(tdtArquetipoId(p))],
    ["Atributos", TDT_RULES.atributos.map(a => `${a.id} ${p.atributos[a.id] === null ? "—" : p.atributos[a.id]}`).join(" · ")],
    ["Recursos", `PA ${nRec(rec.PA)} · PM ${nRec(rec.PM)} · PV ${nRec(rec.PV)}`],
    ["Perícias", String((p.pericias || []).length)],
    ["Vantagens", String((p.vantagens || []).length)],
    ["Desvantagens", String((p.desvantagens || []).length)],
    ["Veículos", String((p.veiculos || []).length)]
  ];
  const itens = pend.length
    ? pend.map(x => `<li class="alert ${x.nivel === "erro" ? "error" : "warning"}">${x.nivel === "erro" ? "Erro: " : "Aviso: "}${tdtEsc(x.msg)}</li>`).join("")
    : `<li class="muted">Nenhuma pendência nas regras de criação.</li>`;
  return `<dl class="tdt-resumo">${linhas.map(([k, val]) => `<dt>${tdtEsc(k)}</dt><dd>${tdtEsc(val)}</dd>`).join("")}</dl>
    <p>Pontos: <output data-saida="disp">a definir</output> disponíveis, <output data-saida="gastos">a definir</output> gastos, saldo <output data-saida="saldo">a definir</output>.</p>
    <h3 class="tdt-sub">Pendências</h3>
    <ul class="tdt-lista tdt-pendencias">${itens}</ul>
    <h3 class="tdt-sub">Lacunas conhecidas</h3>
    <ul class="tdt-lista-simples">${TDT_RULES.lacunas.map(x => `<li>${tdtEsc(x)}</li>`).join("")}<li>Sem exportação para VTT: este criador não tem exportação verificada para nenhum VTT.</li></ul>
    <aside class="alert warning" role="note"><strong>Fonte:</strong> ${tdtEsc(TDT_RULES.aviso)} Edição de base: ${tdtEsc(TDT_RULES.edicaoBase)}.</aside>
    <label for="historia">História</label><textarea id="historia" data-campo="historia">${tdtEsc(p.historia)}</textarea>
    <label for="anotacoes">Anotações</label><textarea id="anotacoes" data-campo="anotacoes">${tdtEsc(p.anotacoes)}</textarea>
    <div class="actions"><button type="button" data-acao="salvar">Salvar no histórico</button>
      <button type="button" class="secondary" data-acao="backup">Baixar backup JSON</button>
      <button type="button" class="secondary" data-acao="pdf">Gerar PDF (2 páginas)</button></div>`;
}

/* Texto de apoio que depende do que está escolhido (arquétipo, perícias, pontos). */
function tdtDetalheArquetipo(id){
  if(!id) return "Escolha um arquétipo para ver custo, poderes e fonte.";
  const r = tdtArquetipoRegra(id);
  if(!r) return "Arquétipo fora da lista de rules.js.";
  const custo = r.custo === null ? "NÃO VERIFICADO (os pontos ficam a definir)" : String(r.custo);
  const poderes = r.poderes.length ? r.poderes.join("; ") : "sem poderes listados";
  const pendente = /não lidos|NÃO VERIFICADO/i.test(r.fonte) ? " Efeitos não lidos ou não verificados: confira no manual." : "";
  const desv = (r.desvantagens || []).length ? r.desvantagens.join("; ") : "nenhuma";
  return `${r.nome}. Custo: ${custo}. Poderes: ${poderes}. Desvantagens do arquétipo: ${desv} (não contam no limite de −2).${pendente} Fonte: ${r.fonte}.`;
}

/* Criação orientada (etapa 3): preenche P, H e R com a sugestão equilibrada do nível e do arquétipo.
   Pede confirmação antes de trocar atributos que já têm valor. Atualiza a tela sem repintar. */
function tdtSugerirAtributosNaTela(){
  const p = state.personagem, saida = document.getElementById("sugestao-atributos");
  const mostrar = t => { if(saida) saida.textContent = t; };
  const nivelOk = TDT_RULES.niveisDePoder.some(x => x.id === p.nivelPoder);
  if(!nivelOk){ mostrar("Escolha um nível de poder (Iniciante, Herói ou Veterano) na etapa 1 para sugerir atributos."); return; }
  const arq = tdtArquetipoId(p);
  if(!arq){ mostrar("Escolha um arquétipo na etapa 2 para sugerir atributos."); return; }
  const s = tdtSugerirAtributos(p.nivelPoder, arq);
  if(!s){ mostrar("Não há sugestão: o custo deste arquétipo ainda não foi verificado. Confira no manual."); return; }
  const ja = TDT_RULES.atributos.some(a => p.atributos[a.id] !== null && p.atributos[a.id] !== undefined);
  const resumo = TDT_RULES.atributos.map(a => a.id + s[a.id]).join(", ");
  if(ja && !window.confirm("Os atributos já têm valores. Trocar pela sugestão (" + resumo + ")?")){
    mostrar("Sugestão cancelada. Os atributos atuais foram mantidos.");
    return;
  }
  TDT_RULES.atributos.forEach(a => {
    p.atributos[a.id] = s[a.id];
    const el = document.getElementById("atr-" + a.id);
    if(el) el.value = s[a.id];
  });
  salvarEstado(); tdtAtualizarSaidas();
  mostrar("Sugestão equilibrada, sem prioridade do livro (o manual não traz distribuição por arquétipo): " + resumo + ". "
    + "Atributos gastam " + s.gastoAtributos + " de " + (s.pontosNivel - s.custoArquetipo) + " pontos disponíveis; sobram " + s.restante + " para perícias e vantagens.");
}

/* Atualiza os campos calculados (recursos, pontos, detalhes) sem recriar a tela. */
function tdtAtualizarSaidas(){
  const app = tdtApp();
  if(!app) return;
  const p = state.personagem;
  const rec = tdtRecursos(p), res = tdtResumoPontos(p);
  const fmt = n => n === null || n === undefined ? "a definir" : String(n);
  const pericias = (p.pericias || []).length;
  app.querySelectorAll("[data-saida]").forEach(el => {
    const k = el.dataset.saida;
    if(k === "pa") el.textContent = fmt(rec.PA);
    else if(k === "pm") el.textContent = fmt(rec.PM);
    else if(k === "pv") el.textContent = fmt(rec.PV);
    else if(k === "gastos") el.textContent = fmt(res.gastos);
    else if(k === "disp") el.textContent = fmt(res.disponiveis);
    else if(k === "saldo") el.textContent = res.saldo === null ? "a definir" : tdtFmtSinal(res.saldo);
    else if(k === "qtd-pericias") el.textContent = String(pericias);
    else if(k === "desv-resumo") el.textContent = (res.valorDesvantagens === null ? "a definir" : res.valorDesvantagens) + " (ganho de " + fmt(res.pontosDeDesvantagens) + " pontos, limite −" + TDT_RULES.criacao.desvantagensMax + ")";
    else if(k === "detalhe:arquetipo") el.textContent = tdtDetalheArquetipo(tdtArquetipoId(p));
    else if(k.startsWith("veic:")){ const v = (p.veiculos || [])[Number(k.slice(5))]; if(v) el.textContent = tdtTextoCustoVeiculo(v); }
  });
  tdtAtualizarAvisos();
}

/* Avisos da etapa atual, sem repintar a tela. */
function tdtAtualizarAvisos(){
  const box = document.getElementById("avisos-etapa");
  if(box) box.innerHTML = tdtAvisosHtml(state.etapa);
}

/* Campo de texto/número/seleção -> estado. Vazio vira null (o validador decide). */
function tdtAplicarCampoVeiculo(campo, el){
  const v = (state.personagem.veiculos || [])[Number(el.dataset.k)];
  if(!v) return;
  const texto = el.value, i = Number(el.dataset.i);
  const numero = () => texto.trim() === "" ? null : Number(texto);
  if(campo.startsWith("veic-atr:")){ v.atributos[campo.slice(9)] = numero(); return; }
  switch(campo){
    case "veic-nome": v.nome = texto; break;
    case "veic-tipo": v.tipo = texto; break;
    case "veic-escala": v.escala = texto === "" ? null : Number(texto); break;
    case "veic-pontos": v.pontos = numero(); break;
    case "veic-gratis": v.gratuito = el.checked === true; break;
    case "veic-vant-qtd": if(v.vantagens[i]) v.vantagens[i].qtd = numero(); break;
    case "veic-vant-custo": if(v.vantagens[i]) v.vantagens[i].custo = numero(); break;
    case "veic-vant-nota": if(v.vantagens[i]) v.vantagens[i].nota = texto; break;
    case "veic-desv-valor": if(v.desvantagens[i]) v.desvantagens[i].valor = numero(); break;
    case "veic-desv-nota": if(v.desvantagens[i]) v.desvantagens[i].nota = texto; break;
    default: return;
  }
}

function tdtAplicarCampo(campo, el){
  if(campo.startsWith("veic-")){ tdtAplicarCampoVeiculo(campo, el); return; }
  const p = state.personagem, texto = el.value;
  const numero = () => texto.trim() === "" ? null : Number(texto);
  const i = Number(el.dataset.i);
  if(campo.startsWith("atr:")){ p.atributos[campo.slice(4)] = numero(); return; }
  switch(campo){
    case "nome": p.nome = texto; break;
    case "jogador": p.jogador = texto; break;
    case "conceito": p.conceito = texto; break;
    case "nivelPoder": {
      p.nivelPoder = texto;
      const pre = TDT_RULES.niveisDePoder.find(x => x.id === texto);
      if(pre) p.pontosTotal = pre.pontos;
      break;
    }
    case "pontosTotal": p.pontosTotal = numero(); break;
    case "modo": state.modo = texto === "estrito" ? "estrito" : "livre"; break;
    case "arquetipo": p.arquetipo = texto; break;
    case "pericia": {
      const id = el.dataset.id;
      const lista = p.pericias.filter(x => x !== id);
      if(el.checked) lista.push(id);
      p.pericias = lista;
      break;
    }
    case "vant-qtd": if(p.vantagens[i]) p.vantagens[i].qtd = numero(); break;
    case "vant-custo": if(p.vantagens[i]) p.vantagens[i].custo = numero(); break;
    case "vant-tipo": if(p.vantagens[i]) p.vantagens[i].tipo = texto || null; break;
    case "vant-nota": if(p.vantagens[i]) p.vantagens[i].nota = texto; break;
    case "arte-qual-escolha": {
      const q = p.vantagens[i] && p.vantagens[i].qualidades && p.vantagens[i].qualidades[Number(el.dataset.k)];
      const qr = q && tdtAchar(TDT_RULES.qualidadesArtefato, q.id);
      if(qr) q.escolha = Array.isArray(qr.opcoes) ? (texto === "" ? null : Number(texto)) : (texto || null);
      break;
    }
    case "desv-valor": if(p.desvantagens[i]) p.desvantagens[i].valor = numero(); break;
    case "desv-nota": if(p.desvantagens[i]) p.desvantagens[i].nota = texto; break;
    case "desv-subtipo": if(p.desvantagens[i]) p.desvantagens[i].subtipo = texto || null; break;
    case "historia": p.historia = texto; break;
    case "anotacoes": p.anotacoes = texto; break;
    default: return;
  }
}

/* ---- navegação e validação ---- */
function tdtMostrarErro(erro, total){
  const app = tdtApp(), card = app && app.querySelector(".card");
  if(!card) return;
  card.querySelectorAll(".aviso-etapa").forEach(n => n.remove());
  const a = document.createElement("div");
  a.className = "alert error aviso-etapa"; a.setAttribute("role", "alert");
  a.textContent = erro.msg + (total > 1 ? " (mais " + (total - 1) + " pendência(s) nesta etapa)" : "");
  const h2 = card.querySelector("h2");
  (h2 || card.firstChild).insertAdjacentElement("afterend", a);
  const el = erro.campo && document.getElementById(erro.campo);
  if(el){
    el.classList.add("campo-erro");
    el.addEventListener("input", () => el.classList.remove("campo-erro"), { once: true });
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "center" });
  } else a.scrollIntoView({ block: "center" });
}

function tdtAvancar(){
  const erros = tdtValidarEtapa(state.etapa, state.personagem, state.modo).filter(x => x.nivel === "erro");
  if(erros.length){ tdtMostrarErro(erros[0], erros.length); return; }
  if(state.etapa < TDT_ETAPAS.length) state.etapa++;
  salvarEstado();
  tdtRender();
}

function tdtVoltar(){
  if(state.etapa > 1) state.etapa--;
  salvarEstado();
  tdtRender();
}

function tdtIrPara(n){
  if(n >= 1 && n < state.etapa){ state.etapa = n; salvarEstado(); tdtRender(); }
}

function tdtNovaFicha(){
  substituirEstado(estadoPadrao());
  state.tela = "ficha"; state.etapa = 1;
  salvarEstado(); tdtRender();
}

function tdtIrInicio(){
  state.tela = "inicio";
  salvarEstado(); tdtRender();
}

function tdtAbrir(id){
  if(carregarDoHistorico(id)){ state.tela = "ficha"; state.etapa = 1; salvarEstado(); tdtRender(); }
}

function tdtAdicionarVantagem(id){
  const r = tdtVantagemRegra(id);
  if(!r) return;
  const custo = r.custo !== undefined ? r.custo : Array.isArray(r.custoOpcoes) ? r.custoOpcoes[0] : r.custoMin;
  state.personagem.vantagens.push(r.itens ? { id, qtd: 1, custo, nota: "", tipo: null, qualidades: [] } : { id, qtd: 1, custo, nota: "" });
}

/* Adiciona a qualidade escolhida no seletor do Artefato i. Faixa e perícia começam vazias: o validador pede. */
function tdtAdicionarQualidade(i){
  const sel = document.getElementById("arte-qual-add-" + i);
  const id = sel ? sel.value : "";
  const v = state.personagem.vantagens[i];
  if(!id || !v || v.id !== "artefato") return;
  if(!Array.isArray(v.qualidades)) v.qualidades = [];
  v.qualidades.push({ id, escolha: null });
}

function tdtAdicionarVeiculo(){
  state.personagem.veiculos.push({ nome: "", tipo: "", escala: 1, pontos: TDT_RULES.veiculos.pontosMin, gratuito: false, atributos: { P: null, H: 0, R: null }, vantagens: [], desvantagens: [] });
}

/* Vantagem e desvantagem do veículo k, com o mesmo padrão de custo e valor do personagem. */
function tdtAdicionarVeicVantagem(k){
  const v = state.personagem.veiculos[k], sel = document.getElementById("veic-" + k + "-vant-sel");
  const r = sel && tdtVantagemRegra(sel.value);
  if(!v || !r || r.itens || r.id === "maestria") return;
  const custo = r.custo !== undefined ? r.custo : Array.isArray(r.custoOpcoes) ? r.custoOpcoes[0] : r.custoMin;
  v.vantagens.push({ id: r.id, qtd: 1, custo, nota: "" });
}

function tdtAdicionarVeicDesvantagem(k){
  const v = state.personagem.veiculos[k], sel = document.getElementById("veic-" + k + "-desv-sel");
  const r = sel && tdtDesvantagemRegra(sel.value);
  if(!v || !r || r.id === "transtorno") return;
  v.desvantagens.push({ id: r.id, valor: r.valor !== undefined ? r.valor : r.valorMax, nota: "" });
}

function tdtAdicionarDesvantagem(id){
  const r = tdtDesvantagemRegra(id);
  if(!r) return;
  const valor = r.valor !== undefined ? r.valor : r.valorMax;
  state.personagem.desvantagens.push({ id, valor, nota: "" });
}

function tdtBaixarBackup(){
  const blob = new Blob([JSON.stringify(montarBackup(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = nomeArquivoBackup();
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  tdtAviso("Backup baixado.");
}

function tdtGerarPdf(){
  const w = window.open("", "_blank");
  if(!w){ tdtAviso("O navegador bloqueou a janela do PDF. Permita pop-ups e tente de novo."); return; }
  w.document.open(); w.document.write(tdtPaginaPdfCompleta()); w.document.close();
}

/* Imagem do personagem: JPEG de até 300 px no maior lado (canvas), qualidade 0,8. Arquivo acima de 5 MB não é lido. */
const TDT_IMAGEM_MAX_ARQUIVO = 5 * 1024 * 1024;
const TDT_IMAGEM_LADO = 300;
function tdtImagemPrevia(src){
  return tdtImagemValida(src)
    ? `<img src="${src}" alt="Imagem do personagem" style="width:90px;height:110px;object-fit:cover;border-radius:6px;border:1px solid var(--linha,#ccc)">`
    : `<span class="muted">Sem imagem</span>`;
}
/* Aviso do último envio fica guardado aqui e some só quando a imagem é trocada ou removida (para = imagem a que o aviso se refere). */
let tdtAvisoImagem = { para: "", texto: "" };
function tdtAvisoImagemAtual(){
  return tdtAvisoImagem.para === state.personagem.imagem ? tdtAvisoImagem.texto : "";
}
/* PNG mantém a transparência (canal alfa) quando o resultado cabe no limite; senão cai para JPEG com fundo branco e avisa. */
const TDT_IMAGEM_AVISO_JPEG = "A imagem PNG era grande demais para guardar com transparência; foi guardada como JPEG com fundo branco.";
function tdtEscolherFormatoImagem(tipoOriginal, gerarPng, gerarJpeg){
  if(tipoOriginal === "image/png"){
    const dadosPng = gerarPng();
    if(tdtImagemValida(dadosPng)) return { dados: dadosPng, aviso: "" };
    return { dados: gerarJpeg(), aviso: TDT_IMAGEM_AVISO_JPEG };
  }
  return { dados: gerarJpeg(), aviso: "" };
}
function tdtRedimensionarImagem(img, fundoBranco){
  const escala = Math.min(1, TDT_IMAGEM_LADO / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * escala));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * escala));
  const ctx2d = canvas.getContext("2d");
  if(fundoBranco){ ctx2d.fillStyle = "#ffffff"; ctx2d.fillRect(0, 0, canvas.width, canvas.height); }
  ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}
function tdtCarregarImagem(input){
  const arquivo = input.files && input.files[0];
  input.value = "";
  if(!arquivo) return;
  if(!["image/png", "image/jpeg"].includes(arquivo.type)) return tdtAvisoNaTela("Use um arquivo PNG ou JPEG.");
  if(arquivo.size > TDT_IMAGEM_MAX_ARQUIVO) return tdtAvisoNaTela("Arquivo acima de 5 MB. A imagem não foi carregada.");
  const url = URL.createObjectURL(arquivo);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    if(!img.naturalWidth || !img.naturalHeight) return tdtAvisoNaTela("Não foi possível ler esta imagem.");
    const escolha = tdtEscolherFormatoImagem(
      arquivo.type,
      () => tdtRedimensionarImagem(img, false).toDataURL("image/png"),
      () => tdtRedimensionarImagem(img, true).toDataURL("image/jpeg", 0.8)
    );
    const dados = escolha.dados;
    if(!tdtImagemValida(dados)) return tdtAvisoNaTela("Não foi possível guardar esta imagem.");
    state.personagem.imagem = dados;
    tdtAvisoImagem = { para: dados, texto: escolha.aviso };
    salvarEstado();
    tdtRender();
  };
  img.onerror = () => { URL.revokeObjectURL(url); tdtAvisoNaTela("Não foi possível ler esta imagem."); };
  img.src = url;
}

function tdtImportar(arquivo){
  arquivo.text().then(texto => {
    const r = lerBackup(texto);
    if(!r.ok){ tdtAvisoNaTela(r.erro); return; }
    substituirEstado(r.estado);
    state.tela = "ficha"; state.etapa = 1; state.currentHistoryId = null;
    salvarEstado(); tdtRender();
    tdtAviso("Backup importado.");
  }).catch(() => tdtAvisoNaTela("Não foi possível ler o arquivo."));
}

function tdtAvisoNaTela(msg, tipo="erro"){
  const app = tdtApp(), card = app && app.querySelector(".card");
  if(!card) return;
  card.querySelectorAll(".aviso-etapa").forEach(n => n.remove());
  const a = document.createElement("div");
  a.className = `alert ${tipo === "aviso" ? "warning" : "error"} aviso-etapa`; a.setAttribute("role", tipo === "aviso" ? "note" : "alert"); a.textContent = msg;
  card.querySelector("h2").insertAdjacentElement("afterend", a);
  a.scrollIntoView({ block: "center" });
}

/* Filtra o catálogo pelo nome (sem repintar). */
function tdtFiltrarCatalogo(el){
  const alvo = el.dataset.busca === "vantagem" ? "catalogo-vantagens" : "catalogo-desvantagens";
  const termo = tdtNormalizar(el.value).trim();
  document.querySelectorAll("#" + alvo + " > li").forEach(li => { li.hidden = !!termo && !(li.dataset.nome || "").includes(termo); });
}

/* Campos que mudam a lista de opções (Maestria depende das perícias) pedem repintura ao mudar. */
const TDT_CAMPOS_REPINTAM = ["nivelPoder", "pericia"];

function tdtLigarEventos(){
  const app = tdtApp();
  if(!app) return;
  app.addEventListener("click", ev => {
    const b = ev.target.closest("[data-acao]");
    if(!b || b.disabled) return;
    const acao = b.dataset.acao, id = b.dataset.id, i = Number(b.dataset.i), k = Number(b.dataset.k);
    if(acao === "novo") tdtNovaFicha();
    else if(acao === "avancar") tdtAvancar();
    else if(acao === "voltar") tdtVoltar();
    else if(acao === "ir") tdtIrPara(Number(b.dataset.etapa));
    else if(acao === "inicio") tdtIrInicio();
    else if(acao === "abrir") tdtAbrir(id);
    else if(acao === "duplicar"){ duplicarNoHistorico(id); tdtRender(); tdtAviso("Cópia criada."); }
    else if(acao === "excluir"){ if(window.confirm("Excluir esta ficha deste navegador?")){ excluirDoHistorico(id); tdtRender(); } }
    else if(acao === "salvar"){ salvarNoHistorico(false); tdtAviso("Ficha salva neste navegador."); }
    else if(acao === "backup") tdtBaixarBackup();
    else if(acao === "pdf") tdtGerarPdf();
    else if(acao === "vant-add"){ tdtAdicionarVantagem(id); salvarEstado(); tdtRender(); }
    else if(acao === "vant-remover"){ state.personagem.vantagens.splice(i, 1); salvarEstado(); tdtRender(); }
    else if(acao === "arte-qual-add"){ tdtAdicionarQualidade(i); salvarEstado(); tdtRender(); }
    else if(acao === "arte-qual-remover"){ const q = state.personagem.vantagens[i]; if(q && q.qualidades) q.qualidades.splice(Number(b.dataset.k), 1); salvarEstado(); tdtRender(); }
    else if(acao === "desv-add"){ tdtAdicionarDesvantagem(id); salvarEstado(); tdtRender(); }
    else if(acao === "veic-add"){ tdtAdicionarVeiculo(); salvarEstado(); tdtRender(); }
    else if(acao === "veic-remover"){ state.personagem.veiculos.splice(k, 1); salvarEstado(); tdtRender(); }
    else if(acao === "veic-vant-add"){ tdtAdicionarVeicVantagem(k); salvarEstado(); tdtRender(); }
    else if(acao === "veic-vant-remover"){ const v = state.personagem.veiculos[k]; if(v) v.vantagens.splice(i, 1); salvarEstado(); tdtRender(); }
    else if(acao === "veic-desv-add"){ tdtAdicionarVeicDesvantagem(k); salvarEstado(); tdtRender(); }
    else if(acao === "veic-desv-remover"){ const v = state.personagem.veiculos[k]; if(v) v.desvantagens.splice(i, 1); salvarEstado(); tdtRender(); }
    else if(acao === "desv-remover"){ state.personagem.desvantagens.splice(i, 1); salvarEstado(); tdtRender(); }
    else if(acao === "limpar"){ if(window.confirm("Apagar a ficha atual e as fichas salvas deste navegador?")){ limparDadosSalvos(); substituirEstado(estadoPadrao()); tdtRender(); } }
    else if(acao === "imagem-remover"){ state.personagem.imagem = ""; tdtAvisoImagem = { para: "", texto: "" }; salvarEstado(); tdtRender(); }
    else if(acao === "sugerir-atributos") tdtSugerirAtributosNaTela();
  });
  const aoMudar = ev => {
    const el = ev.target;
    if(el.dataset && el.dataset.busca){ tdtFiltrarCatalogo(el); return; }
    if(el.dataset && el.dataset.acao === "imagem-arquivo"){ if(ev.type === "change" && el.files && el.files[0]) tdtCarregarImagem(el); return; }
    const campo = el.dataset && el.dataset.campo;
    if(!campo) return;
    if(campo === "importar"){ if(el.files && el.files[0]) tdtImportar(el.files[0]); return; }
    tdtAplicarCampo(campo, el);
    salvarEstado();
    if(ev.type === "change" && TDT_CAMPOS_REPINTAM.includes(campo)) tdtRender(el.id);
    else tdtAtualizarSaidas();
  };
  app.addEventListener("input", aoMudar);
  app.addEventListener("change", aoMudar);
}
