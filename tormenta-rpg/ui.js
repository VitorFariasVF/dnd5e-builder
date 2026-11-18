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
      <div class="imagem-personagem"><label for="imagem-arquivo">Imagem do personagem (PNG ou JPEG, até 5 MB)</label>
        <input id="imagem-arquivo" type="file" accept="image/png,image/jpeg" data-campo="imagem">
        <p id="imagem-aviso" class="muted" role="status"></p>
        ${p.imagem ? `<div class="actions"><img src="${v(p.imagem)}" alt="Prévia da imagem do personagem" width="96" height="96" style="object-fit:cover;border-radius:6px"><button type="button" class="secondary small" data-acao="remover-imagem">Remover imagem</button></div>` : `<p class="muted">Sem imagem.</p>`}</div>
      <label for="nivel">Nível (1 a ${TRPG_META.nivelMaximoEscopo})</label><input id="nivel" type="number" inputmode="numeric" min="1" max="${TRPG_META.nivelMaximoEscopo}" step="1" data-campo="nivel" value="${v(p.nivel)}">
      <label for="modo">Modo de criação</label><select id="modo" data-campo="modo">
        <option value="livre"${state.modo === "livre" ? " selected" : ""}>Livre: texto livre em raça e classe</option>
        <option value="estrito"${state.modo === "estrito" ? " selected" : ""}>Estrito: raça e classe da lista</option></select>
      <label for="aparencia">Aparência</label><textarea id="aparencia" data-campo="aparencia">${v(p.aparencia)}</textarea>
      <label for="historia">História</label><textarea id="historia" data-campo="historia">${v(p.historia)}</textarea>`;
    case 2: return trpgCampoOpcoes("raca", "Raça", TRPG_RACAS, p.raca, TRPG_PENDENTES.racas,
      `<p class="muted trpg-detalhe" data-saida="detalhe:raca"></p><div data-saida="escolha-racial"></div><p class="muted" role="status" data-saida="aviso-escolha"></p>`);
    case 3: return trpgCampoOpcoes("classe", "Classe", TRPG_CLASSES, p.classe, TRPG_PENDENTES.classes,
      `<p class="muted trpg-detalhe" data-saida="detalhe:classe"></p>`);
    case 4: return `${trpgNaoVerificado(TRPG_PENDENTES.atributos)}
      <p class="muted">Digite os valores de cada atributo (inteiro de 1 a 30). Os modificadores seguem a tabela do livro (PDF p.27), igual a (valor - 10) / 2 arredondado para baixo.</p>
      <ul class="trpg-lista-simples">${TRPG_METODOS_ATRIBUTOS.map(m => `<li><b>${trpgEsc(m.nome)}</b>: ${trpgEsc(m.regra)}. <small>${trpgEsc(m.fonte)}</small></li>`).join("")}</ul>
      <label for="metodo-atributos">Método de geração</label>
      <select id="metodo-atributos" data-campo="metodoAtributos">
        <option value="manual"${p.metodoAtributos === "manual" || !p.metodoAtributos ? " selected" : ""}>Sem método (digitar à mão)</option>
        ${TRPG_METODOS_ATRIBUTOS.map(m => `<option value="${trpgEsc(m.id)}"${p.metodoAtributos === m.id ? " selected" : ""}>${trpgEsc(m.nome)}</option>`).join("")}
      </select>
      <p><button type="button" class="secondary" data-acao="sugerir-atributos">Sugerir atributos</button></p>
      <p class="muted" role="status" data-saida="nota-metodo"></p>
      <p class="muted trpg-detalhe" data-saida="detalhe:raca-ajuste"></p>
      <div class="trpg-atributos">${TRPG_ATRIBUTOS.map(a => `<div class="trpg-atr">
        <label for="atr-${a.id}">${a.nome} (${a.abrev})</label>
        <input id="atr-${a.id}" type="number" inputmode="numeric" min="1" max="30" step="1" data-campo="atr:${a.id}" value="${v(p.atributos[a.id])}">
        <output data-saida="mod:${a.id}">Modificador</output></div>`).join("")}</div>`;
    case 5: return `${trpgNaoVerificado(TRPG_PENDENTES.pericias)}
      <p>Perícias treinadas no 1º nível (método padrão, PDF p.79): <output data-saida="pontos">a definir</output></p>
      <p class="muted">Cresce com +1 de Inteligência e com o talento Treino em Perícia. Método alternativo (PDF p.80): <output data-saida="alternativo">a definir</output></p>
      <p class="muted">Graduações (livro, PDF p.79): ${trpgEsc(TRPG_REGRAS.graduacoes.formula)}. No método de pontos (PDF p.80): máximo de nível + 3 em perícias de classe e metade disso nas outras; 1 ponto por graduação em perícia de classe, 2 nas outras.</p>
      <p class="muted">Perícias do livro básico (fonte de comunidade): ${TRPG_PERICIAS.map(x => `${trpgEsc(x.nome)} (${trpgEsc(trpgAbrevAtr(x.atributo))})`).join(", ")}.</p>
      <label for="disponiveis">Pontos de perícia disponíveis (só no método alternativo, PDF p.80; deixe vazio se não usar)</label>
      <input id="disponiveis" type="number" inputmode="numeric" min="0" step="1" data-campo="disponiveis" value="${v(p.pericias.pontosDisponiveis)}">
      <label for="gastas">Graduações gastas</label>
      <input id="gastas" type="number" inputmode="numeric" min="0" step="1" data-campo="gastas" value="${v(p.pericias.graduacoesGastas)}">`;
    case 6: return `${trpgNaoVerificado(TRPG_PENDENTES.talentos)}
      <p class="muted">Talentos principais verificados (fonte de comunidade):</p>
      <ul class="trpg-lista-simples">${Object.values(TRPG_TALENTOS).map(t => `<li><b>${trpgEsc(t.nome)}</b>${t.pre.length ? " (pré-requisito: " + trpgEsc(t.pre.join("; ")) + ")" : ""}: ${trpgEsc(t.beneficio)}</li>`).join("")}</ul>
      <p class="muted trpg-detalhe" data-saida="detalhe:talentos-classe"></p>
      <label for="talentos">Talentos (um por linha)</label><textarea id="talentos" data-campo="talentos">${v(p.talentos)}</textarea>`;
    case 7: return `${trpgNaoVerificado(TRPG_PENDENTES.magias)}
      <p class="muted trpg-detalhe" data-saida="detalhe:magias"></p>
      <label for="magias">Magias (uma por linha)</label><textarea id="magias" data-campo="magias">${v(p.magias)}</textarea>`;
    case 8: return `${trpgNaoVerificado(TRPG_PENDENTES.equipamento)}
      <label for="equipamento">Equipamento (um item por linha)</label><textarea id="equipamento" data-campo="equipamento">${v(p.equipamento)}</textarea>
      <p class="muted">Dinheiro inicial de 1º nível: ${trpgEsc(TRPG_DINHEIRO_INICIAL.valor)} ${trpgEsc(TRPG_DINHEIRO_INICIAL.moeda)}. Fonte: ${trpgEsc(TRPG_DINHEIRO_INICIAL.fonte)}.</p>
      <label for="dinheiro">Dinheiro (${trpgEsc(TRPG_DINHEIRO_INICIAL.moeda)})</label>
      <input id="dinheiro" type="number" inputmode="numeric" min="0" step="1" data-campo="dinheiro" value="${v(p.dinheiro)}">`;
    case 9: return `${trpgNaoVerificado("Base de Fortitude, Reflexos e Vontade por classe não foi verificada. PV sugerido e BBA vêm da classe (fonte de comunidade). O PV máximo continua manual.")}
      <p>Classe de Armadura: <output data-saida="ca">—</output> · Iniciativa: <output data-saida="ini">—</output></p>
      <p>PV sugerido pela classe: <output data-saida="pvsug">—</output> · BBA no nível: <output data-saida="bba">—</output></p>
      <p>Testes de resistência (Fort, Ref, Von): <output data-saida="resist">—</output></p>
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

/* Campo de raça ou classe. Modo livre: texto livre com as opções verificadas como sugestão (datalist).
   Modo estrito: lista (só o que está na tabela). O detalhe da opção escolhida aparece embaixo (trpgAtualizarSaidas). */
function trpgCampoOpcoes(campo, rotulo, tabela, valor, pendencia, extra){
  const chaves = Object.keys(tabela);
  const aviso = trpgNaoVerificado(pendencia);
  if(!chaves.length || state.modo === "livre"){
    const lista = campo + "-sugestoes";
    const ops = chaves.map(k => `<option value="${trpgEsc(tabela[k].nome)}"></option>`).join("");
    return `${aviso}
      <label for="${campo}">${rotulo} (texto livre; as opções verificadas aparecem como sugestão)</label>
      <input id="${campo}" data-campo="${campo}" list="${lista}" value="${trpgEsc(valor)}" autocomplete="off">
      <datalist id="${lista}">${ops}</datalist>${extra || ""}`;
  }
  const ops = chaves.map(k => `<option value="${trpgEsc(k)}"${k === valor ? " selected" : ""}>${trpgEsc(tabela[k].nome || k)}</option>`).join("");
  return `${aviso}<label for="${campo}">${rotulo}</label><select id="${campo}" data-campo="${campo}"><option value="">Escolha</option>${ops}</select>${extra || ""}`;
}

/* Textos de detalhe (sempre com fonte ou NÃO VERIFICADO). Recebem o valor do campo: chave ou nome. */
function trpgAbrevAtr(id){
  const a = TRPG_ATRIBUTOS.find(x => x.id === id);
  return a ? a.abrev : id;
}

function trpgNomeAtr(id){
  const a = TRPG_ATRIBUTOS.find(x => x.id === id);
  return a ? a.nome : id;
}

function trpgRacaDados(valor){
  if(!valor) return null;
  if(TRPG_RACAS[valor]) return TRPG_RACAS[valor];
  const alvo = String(valor).trim().toLowerCase();
  const chave = Object.keys(TRPG_RACAS).find(k => TRPG_RACAS[k].nome.toLowerCase() === alvo);
  return chave ? TRPG_RACAS[chave] : null;
}

function trpgTextoAjustes(r){
  if(!r) return "NÃO VERIFICADO";
  const partes = r.ajustes ? Object.keys(r.ajustes).map(k => `${trpgAbrevAtr(k)} ${r.ajustes[k] > 0 ? "+" : ""}${r.ajustes[k]}`) : [];
  if(r.escolha) partes.push("+" + r.escolha.valor + " em " + r.escolha.quantidade + " habilidades à escolha" + (r.escolha.excluir.length ? " (exceto " + r.escolha.excluir.map(trpgAbrevAtr).join(", ") + ")" : ""));
  return partes.length ? partes.join(", ") : "escolha de atributo (não modelada no app)";
}

/* Campos da escolha racial (etapa 2). Recria os campos só quando a raça muda, para não perder o foco ao escolher. */
function trpgAtualizarEscolhaRacial(el){
  const r = trpgRacaDados(state.personagem.raca);
  const chave = r && r.escolha ? r.nome : "";
  if(el.dataset.raca === chave) return;
  el.dataset.raca = chave;
  if(!r || !r.escolha){ el.innerHTML = ""; return; }
  const e = r.escolha, escolhas = trpgEscolhasRaciais(state.personagem);
  const excl = e.excluir.length ? " (exceto " + e.excluir.map(trpgNomeAtr).join(", ") + ")" : "";
  let html = `<fieldset class="trpg-escolha"><legend>Escolha de habilidades de ${trpgEsc(r.nome)}: +${e.valor} em ${e.quantidade} habilidades diferentes${excl}</legend>`;
  for(let i = 0; i < e.quantidade; i++){
    const ops = TRPG_ATRIBUTOS.filter(a => !e.excluir.includes(a.id))
      .map(a => `<option value="${a.id}"${escolhas[i] === a.id ? " selected" : ""}>${trpgEsc(a.nome)}</option>`).join("");
    html += `<label for="escolha-racial-${i}">Habilidade ${i + 1}</label><select id="escolha-racial-${i}" data-campo="escolhaRacial:${i}"><option value="">Escolha</option>${ops}</select>`;
  }
  el.innerHTML = html + "</fieldset>";
}

/* Texto do aviso da escolha racial: o que foi aplicado, ou o motivo de nada ter sido aplicado. */
function trpgTextoAvisoEscolha(p){
  const esc = trpgEscolhaRacial(p);
  if(!esc.aplicavel) return "";
  if(!esc.ok) return "Aviso: " + esc.motivo;
  return "Ajuste aplicado nos atributos finais: " + Object.keys(esc.ajustes).map(k => `${trpgAbrevAtr(k)} ${esc.ajustes[k] > 0 ? "+" : ""}${esc.ajustes[k]}`).join(", ") + ".";
}

function trpgDetalheRaca(valor){
  if(!valor) return "Escolha uma raça para ver os ajustes e a fonte.";
  const r = trpgRacaDados(valor);
  if(!r) return "Raça fora da lista verificada: ajustes, tamanho e traços NÃO VERIFICADOS.";
  return `${r.nome}. Ajustes: ${trpgTextoAjustes(r)} (${r.ajustesFonte}). Tamanho: ${r.tamanho}. Deslocamento: ${r.deslocamento}. Fonte: ${r.fonte}.`;
}

function trpgDetalheClasse(valor){
  if(!valor) return "Escolha uma classe para ver a regra do livro básico e a fonte.";
  const c = trpgClasseDados(valor);
  if(!c) return "Classe fora da lista verificada: PV, BBA e perícias NÃO VERIFICADOS.";
  const d = c.dadoDeVida;
  return `${c.nome}. PV: ${d.inicial} no 1º nível e +${d.porNivel} por nível seguinte, mais o modificador de Constituição. Perícias treinadas no 1º nível: ${c.pericias.treinadasBase} + Inteligência (+2 se humano), PDF p.79. BBA: +${c.bba[0]} no 1º nível e +${c.bba[19]} no 20º. Resistências base: NÃO VERIFICADO. Fonte: ${c.fonte}.`;
}

function trpgDetalheMagias(valor){
  if(!valor) return "Escolha uma classe na etapa 3 para ver os círculos de magia.";
  const c = trpgClasseDados(valor);
  if(!c) return "Classe fora da lista verificada: círculos NÃO VERIFICADOS.";
  if(!c.conjuracao) return `${c.nome} não conjura magias na regra do compêndio do VTT.`;
  const lista = Object.keys(c.conjuracao.circulos).map(Number).sort((a, b) => a - b)
    .map(k => `círculo ${k} a partir do nível ${c.conjuracao.circulos[k]}`).join("; ");
  const nivel = state.personagem.nivel;
  const agora = trpgCirculosDisponiveis(c, nivel) || [];
  return `Atributo de conjuração: ${trpgNomeAtr(c.conjuracao.atributo)}. Círculos: ${lista}. No nível ${nivel}: círculos ${agora.join(", ") || "nenhum"}. Magias por dia: NÃO VERIFICADO. Fonte: ${c.fonte}.`;
}

function trpgHtmlResumo(){
  const p = state.personagem, d = trpgDerivados(p);
  const atr = TRPG_ATRIBUTOS.map(a => `${a.abrev} ${p.atributos[a.id] ?? "—"} (${trpgFormatarBonus(d.modificadores[a.id])})`).join(" · ");
  const linhas = [
    ["Personagem", `${p.nome || "sem nome"}${p.jogador ? " · jogador " + p.jogador : ""}`],
    ["Raça e classe", `${p.raca || "a definir"} · ${p.classe || "a definir"} · nível ${p.nivel}`],
    ["Atributos", atr],
    ["CA", d.ca === null ? "—" : String(d.ca)],
    ["Iniciativa (modificador de Destreza)", trpgFormatarBonus(d.iniciativa)],
    ["Perícias treinadas no 1º nível", d.periciasTreinadas === null ? "a definir (classe, Inteligência e raça)" : String(d.periciasTreinadas)],
    ["PV máximo (manual)", p.derivados.pvMaximo === null ? "—" : String(p.derivados.pvMaximo)],
    ["PV sugerido pela classe", d.pvSugerido === null ? "—" : String(d.pvSugerido)],
    ["BBA no nível", d.bba === null ? "—" : trpgFormatarBonus(d.bba)],
    ["Talentos", String(p.talentos || "").split(/\r?\n/).filter(x => x.trim()).length + " registrado(s)"],
    ["Magias", String(p.magias || "").split(/\r?\n/).filter(x => x.trim()).length + " registrada(s)"],
    ["Dinheiro", String(p.dinheiro) + " " + TRPG_DINHEIRO_INICIAL.moeda + " (inicial sugerido: " + TRPG_DINHEIRO_INICIAL.valor + ")"]
  ];
  return `<dl class="trpg-resumo">${linhas.map(([k, val]) => `<dt>${trpgEsc(k)}</dt><dd>${trpgEsc(val)}</dd>`).join("")}</dl>
    <p class="muted">Edição: ${trpgEsc(TRPG_META.edicao)}. Fontes: ${trpgEsc(TRPG_META.fonteEdicao)}</p>
    ${trpgNaoVerificado(TRPG_PENDENTES.vtt)}
    <div class="actions"><button type="button" data-acao="salvar">Salvar no histórico</button>
      <button type="button" class="secondary" data-acao="backup">Baixar backup JSON</button>
      <button type="button" class="secondary" data-acao="pdf">Gerar PDF (2 páginas)</button></div>`;
}

/* Nota fixa do método de atributos (passo 4). Métodos de rolagem não têm sugestão; Elite e Pontos usam ordem neutra. */
function trpgNotaMetodo(metodo){
  if(metodo === "elite" || metodo === "pontos") return "Método " + (metodo === "elite" ? "Elite" : "Pontos") + ": a sugestão usa ordem neutra (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma), sem prioridade do livro: o manual não define prioridade de atributos por classe.";
  if(["padrao", "classica", "heroica", "audaciosa"].includes(metodo)) return "Método por rolagem: sem sugestão. Role os dados e digite os valores. Fracasso (PDF p.28): total de modificadores 0 ou menos, ou maior valor 13 ou menos; nesse caso, role de novo.";
  return "Escolha um método para ver a sugestão. Sem método, digite os valores à mão.";
}

/* Atualiza os campos calculados (modificadores, CA, iniciativa, pontos) sem recriar a tela. */
function trpgAtualizarSaidas(){
  const app = trpgApp(); if(!app) return;
  const p = state.personagem, d = trpgDerivados(p);
  const classe = trpgClasseDados(p.classe);
  app.querySelectorAll("[data-saida]").forEach(el => {
    const k = el.dataset.saida;
    if(k.startsWith("mod:")) el.textContent = "Modificador " + trpgFormatarBonus(d.modificadores[k.slice(4)]);
    else if(k === "ca") el.textContent = d.ca === null ? "—" : String(d.ca);
    else if(k === "ini") el.textContent = trpgFormatarBonus(d.iniciativa);
    else if(k === "pontos"){
      el.textContent = d.periciasTreinadas === null ? "a definir (escolha a classe, a raça e confira a Inteligência)" : String(d.periciasTreinadas);
    }
    else if(k === "alternativo"){
      const alt = d.pontosPericiaAlternativo;
      el.textContent = alt === null ? "a definir" : alt.nivel1 + " no 1º nível e " + alt.porNivelSeguinte + " a cada nível seguinte";
    }
    else if(k === "nota-metodo") el.textContent = trpgNotaMetodo(p.metodoAtributos);
    else if(k === "pvsug") el.textContent = d.pvSugerido === null ? "— (escolha a classe, o nível e a Constituição)" : String(d.pvSugerido);
    else if(k === "bba") el.textContent = d.bba === null ? "—" : trpgFormatarBonus(d.bba);
    else if(k === "resist") el.textContent = d.resistencias === null ? "—" : "a definir (base NÃO VERIFICADA)";
    else if(k === "detalhe:raca") el.textContent = trpgDetalheRaca(p.raca);
    else if(k === "detalhe:classe") el.textContent = trpgDetalheClasse(p.classe);
    else if(k === "detalhe:magias") el.textContent = trpgDetalheMagias(p.classe);
    else if(k === "detalhe:talentos-classe") el.textContent = classe ? "Talentos adicionais da classe (fonte de comunidade): " + classe.talentosAdicionais.join("; ") + "." : "Talentos adicionais: escolha uma classe verificada para vê-los.";
    else if(k === "escolha-racial") trpgAtualizarEscolhaRacial(el);
    else if(k === "aviso-escolha") el.textContent = trpgTextoAvisoEscolha(p);
    else if(k === "detalhe:raca-ajuste"){
      const r = trpgRacaDados(p.raca);
      if(!r) el.textContent = "Ajuste racial: escolha a raça na etapa 2.";
      else if(r.escolha) el.textContent = "Ajuste racial de " + r.nome + ": " + trpgTextoAjustes(r) + " (" + r.ajustesFonte + "). " + trpgTextoAvisoEscolha(p);
      else if(!r.ajustes) el.textContent = "Ajuste racial de " + r.nome + ": " + r.ajustesFonte + ".";
      else el.textContent = "Ajuste racial de " + r.nome + ": " + trpgTextoAjustes(r) + " (" + r.ajustesFonte + "). Não é aplicado automaticamente: some-o aos valores digitados.";
    }
  });
}

/* Grava o valor de um campo no estado. Vazio vira null (o validador decide). */
function trpgAplicarCampo(campo, el){
  const p = state.personagem, texto = el.value;
  const numero = () => texto.trim() === "" ? null : Number(texto);
  if(campo.startsWith("atr:")){ p.atributos[campo.slice(4)] = numero(); return; }
  if(campo.startsWith("escolhaRacial:")){
    if(!p.escolhasRaciais || typeof p.escolhasRaciais !== "object") p.escolhasRaciais = { ajustesEscolha: [] };
    if(!Array.isArray(p.escolhasRaciais.ajustesEscolha)) p.escolhasRaciais.ajustesEscolha = [];
    p.escolhasRaciais.ajustesEscolha[Number(campo.split(":")[1])] = texto || null;
    return;
  }
  switch(campo){
    case "nome": p.nome = texto; break;
    case "jogador": p.jogador = texto; break;
    case "nivel": p.nivel = numero(); break;
    case "modo": state.modo = texto === "estrito" ? "estrito" : "livre"; break;
    case "aparencia": p.aparencia = texto; break;
    case "historia": p.historia = texto; break;
    case "raca": p.raca = texto; break;
    case "metodoAtributos": p.metodoAtributos = texto || "manual"; break;
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

/* Botão "Sugerir atributos": aplica os valores de Elite ou Pontos; métodos de rolagem mostram o aviso na etapa. */
function trpgSugerirNaTela(){
  const p = state.personagem;
  const r = trpgSugerirAtributos(p.metodoAtributos);
  if(!r.ok){ trpgMostrarErro({ msg: r.motivo, campo: null }, 1); return; }
  TRPG_ATRIBUTOS.forEach(a => { p.atributos[a.id] = r.valores[a.id]; });
  salvarEstado();
  trpgRender();
  trpgAviso("Valores sugeridos aplicados.");
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

/* Imagem do personagem: confere tipo e tamanho, redimensiona com canvas (lado maior até 300 px) e grava como JPEG 0.8. */
function trpgCarregarImagem(arquivo){
  const aviso = document.getElementById("imagem-aviso");
  const dizer = msg => { if(aviso) aviso.textContent = msg; else trpgAviso(msg); };
  if(!["image/png", "image/jpeg"].includes(arquivo.type)){ dizer("Escolha um arquivo PNG ou JPEG."); return; }
  if(arquivo.size > TRPG_IMAGEM.maxBytesOriginal){ dizer("A imagem tem mais de 5 MB. Escolha um arquivo menor."); return; }
  const url = URL.createObjectURL(arquivo);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    const escala = Math.min(1, TRPG_IMAGEM.ladoMaximo / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.naturalWidth * escala));
    c.height = Math.max(1, Math.round(img.naturalHeight * escala));
    const g = c.getContext("2d");
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, c.width, c.height);
    g.drawImage(img, 0, 0, c.width, c.height);
    const data = c.toDataURL("image/jpeg", TRPG_IMAGEM.qualidade);
    if(!trpgImagemValida(data)){ dizer("Não foi possível preparar esta imagem."); return; }
    state.personagem.imagem = data;
    salvarEstado(); trpgRender(); trpgAviso("Imagem carregada.");
  };
  img.onerror = () => { URL.revokeObjectURL(url); dizer("Não foi possível ler esta imagem."); };
  img.src = url;
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
    else if(acao === "sugerir-atributos") trpgSugerirNaTela();
    else if(acao === "voltar") trpgVoltar();
    else if(acao === "ir") trpgIrPara(Number(b.dataset.etapa));
    else if(acao === "inicio") trpgIrInicio();
    else if(acao === "abrir") trpgAbrir(id);
    else if(acao === "duplicar"){ duplicarNoHistorico(id); trpgRender(); trpgAviso("Cópia criada."); }
    else if(acao === "excluir"){ if(window.confirm("Excluir esta ficha deste navegador?")){ excluirDoHistorico(id); trpgRender(); } }
    else if(acao === "salvar"){ salvarNoHistorico(false); trpgAviso("Ficha salva neste navegador."); }
    else if(acao === "remover-imagem"){ state.personagem.imagem = ""; salvarEstado(); trpgRender(); trpgAviso("Imagem removida."); }
    else if(acao === "backup") trpgBaixarBackup();
    else if(acao === "pdf") trpgGerarPdf();
    else if(acao === "limpar"){ if(window.confirm("Apagar a ficha atual e as fichas salvas deste navegador?")){ limparDadosSalvos(); substituirEstado(estadoPadrao()); trpgRender(); } }
  });
  const aoMudar = ev => {
    const el = ev.target, campo = el.dataset && el.dataset.campo;
    if(!campo) return;
    if(campo === "importar"){ if(el.files && el.files[0]) trpgImportar(el.files[0]); return; }
    if(campo === "imagem"){ if(ev.type === "change" && el.files && el.files[0]) trpgCarregarImagem(el.files[0], el); return; }
    trpgAplicarCampo(campo, el);
    salvarEstado();
    trpgAtualizarSaidas();
  };
  app.addEventListener("input", aoMudar);
  app.addEventListener("change", aoMudar);
}
