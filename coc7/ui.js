/* Interface do investigador de Call of Cthulhu 7ª ed.: etapas, stepper, avisos e exportações.
   Entrada de dados por delegação de eventos em #app. Texto sempre escapado. Sem aviso bloqueante do navegador. */

let estado = null;
let errosAtuais = [];
let focoPendente = null;
let confirmarNova = false;
const reduzMovimento = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const appEl = () => document.getElementById("app");
const esc = cocEscapar;

function salvar(){ salvarEstado(estado); }

/* ---- caminhos dentro do estado (ex.: "investigador.nome") ---- */
function setPath(obj, caminho, valor){
  const partes = caminho.split(".");
  let o = obj;
  for(let i = 0; i < partes.length - 1; i++){
    if(o[partes[i]] == null || typeof o[partes[i]] !== "object") o[partes[i]] = {};
    o = o[partes[i]];
  }
  o[partes[partes.length - 1]] = valor;
}
function getPath(obj, caminho){
  return caminho.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/* ---- rótulos e textos ---- */
function textoFormula(o){
  const sigla = c => (cocCaracteristica(c) || { sigla: c }).sigla;
  const base = o.formula.base.map(t => `${sigla(t.c)} × ${t.m}`).join(" + ");
  return base;
}
function textoAlternativa(alt){
  return alt.map(t => `${(cocCaracteristica(t.c) || { sigla: t.c }).sigla} × ${t.m}`).join(" + ");
}
function nomePericia(id){ return (cocPericia(id) || { nome: id }).nome; }

/* ---- testes de melhoria de EDU, com a EDU que vale em cada teste ---- */
function testesEdu(inv){
  if(inv.idade == null || !inv.caracteristicas) return [];
  const idade = Number(inv.idade);
  const base = {};
  COC_CARACTERISTICAS.forEach(c => base[c.id] = Number(inv.caracteristicas[c.id]) || 0);
  let edu = aplicarIdade(base, idade, inv.escolhasIdade, []).valores.edu;
  const esperados = melhoriasEduEsperadas(idade);
  const lista = [];
  for(let i = 0; i < esperados; i++){
    const m = (inv.melhoriasEdu || [])[i] || {};
    const passou = m.d100 != null && m.d100 > edu;
    lista.push({ i, eduAntes: edu, d100: m.d100, d10: m.d10, passou });
    if(passou && m.d10 != null) edu = Math.min(99, edu + Number(m.d10));
  }
  return lista;
}

/* ---- valores que mudam ao digitar (atualizados sem redesenhar a tela) ---- */
function valoresVivos(){
  const inv = estado.investigador;
  const r = resumoCriacao(inv);
  const m = {
    "pool-ocup": r.poolOcupacao, "gasto-ocup": r.gastoOcupacao, "pool-int": r.poolInteresse, "gasto-int": r.gastoInteresse,
    "cred": r.creditoTotal
  };
  calcPericias(inv).forEach(p => { m["tot-" + p.id] = p.total; });
  const d = calcDerivados(inv);
  if(d){
    Object.assign(m, { pv: d.pv, san: d.sanInicial, sanmax: d.sanMax, pm: d.pm, mov: d.mov,
      dano: d.danoConhecido ? d.dano : "não calc.", corpo: d.danoConhecido ? d.corpo : "—" });
  }
  return m;
}
function atualizarVivos(){
  const m = valoresVivos();
  appEl().querySelectorAll("[data-live]").forEach(el => {
    const k = el.dataset.live;
    if(k in m) el.textContent = String(m[k]);
  });
}

/* ---- faixas e stepper ---- */
function faixaAviso(lista, tipo){
  if(!lista.length) return "";
  const cls = tipo === "erro" ? "alert error" : "alert warning";
  const papel = tipo === "erro" ? "alert" : "status";
  const titulo = tipo === "erro" ? "Corrija antes de avançar:" : "Atenção:";
  return `<div class="${cls} aviso-etapa" role="${papel}"><b>${titulo}</b><ul>${lista.map(i => `<li>${esc(i.msg)}</li>`).join("")}</ul></div>`;
}
function stepper(){
  const n = COC_ETAPAS.length, e = estado.etapa;
  const pontos = COC_ETAPAS.map((rot, i) => {
    const k = i + 1, cls = k === e ? "atual" : k < e ? "feito" : "";
    const acao = k < e ? ` data-acao="ir" data-etapa="${k}"` : "";
    const dis = k > e ? " disabled" : "";
    return `<li><button type="button" class="${cls}"${acao}${dis} aria-label="Etapa ${k}: ${esc(rot)}"${k === e ? ' aria-current="step"' : ""}>${k < e ? "✓" : k}</button></li>`;
  }).join("");
  return `<div class="stepper"><div class="stepper-top"><div class="stepper-label">Etapa ${e} de ${n} · <b>${esc(COC_ETAPAS[e - 1])}</b></div></div>
    <div class="stepper-track" role="progressbar" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${e}" aria-label="Progresso da ficha"><div class="stepper-fill" style="--p:${(e - 1) / (n - 1)}"></div></div>
    <ol class="stepper-dots">${pontos}</ol></div>`;
}

/* ---- etapas ---- */
function campoTexto(id, rotulo, caminho, valor, extra){
  return `<label for="${id}">${esc(rotulo)}</label><input id="${id}" type="text" data-set="${caminho}" data-tipo="texto" value="${esc(valor || "")}"${extra || ""}>`;
}
function campoNumero(id, rotulo, caminho, valor, min, max, tipo, extra){
  const v = valor == null ? "" : valor;
  return `<label for="${id}">${esc(rotulo)}</label><input id="${id}" type="number" inputmode="numeric" min="${min}" max="${max}" step="1" data-set="${caminho}" data-tipo="${tipo || "num"}" value="${esc(v)}"${extra || ""}>`;
}
function radioOpcao(nome, valor, rotulo, atual, caminho, tipo, id){
  const marcado = String(atual) === String(valor) ? " checked" : "";
  return `<label class="checkbox-row"><input type="radio" id="${id}" name="${nome}" value="${esc(valor)}" data-set="${caminho}" data-tipo="${tipo || "texto"}" data-rerender="1"${marcado}> ${esc(rotulo)}</label>`;
}

function etapaModo(){
  const inv = estado.investigador;
  const historico = getHistorico();
  const lista = historico.length ? `<h3>Investigadores salvos neste navegador</h3><ul class="history-list">${historico.map(h => `<li class="history-item"><b>${esc(h.nome)}</b> · ${esc(h.ocupacao || "sem ocupação")} · ${esc(h.epoca === "moderna" ? "moderna" : "clássica")}
    <div class="history-actions"><button type="button" class="small" data-acao="hist-abrir" data-id="${esc(h.id)}">Abrir</button><button type="button" class="small secondary" data-acao="hist-copia" data-id="${esc(h.id)}">Duplicar</button><button type="button" class="small danger" data-acao="hist-excluir" data-id="${esc(h.id)}">Excluir</button></div></li>`).join("")}</ul>` : "";
  return `<h2>Modo e identidade</h2>
    <p class="lead small">Comece pelo modo. O estrito valida cada etapa antes de seguir. O livre mostra os problemas como avisos e deixa avançar.</p>
    <div class="alert warning" role="note"><b>Processo de criação: regra completa.</b> Interesse pessoal = INT × 2, fórmulas de ocupação, ajustes de idade e movimento condicional seguem a regra completa (Keeper Rulebook). O Quick-Start oficial só é fonte onde coincide. Os dois modos usam a mesma regra; o modo muda só se os erros bloqueiam ou viram aviso. O teto de 90% por perícia é aviso nos dois modos (regra não confirmada).</div>
    <fieldset class="rules-pick"><legend>Modo de criação</legend>
      ${radioOpcao("modo", "estrito", "Estrito: bloqueia o avanço enquanto houver erro", estado.modo, "modo", "texto", "modo-estrito")}
      ${radioOpcao("modo", "livre", "Livre: avisa e deixa avançar (aceita valores manuais)", estado.modo, "modo", "texto", "modo-livre")}
    </fieldset>
    <fieldset class="rules-pick"><legend>Época</legend>
      ${radioOpcao("epoca", "classica", "Clássica (1920)", estado.epoca, "epoca", "texto", "epoca-classica")}
      ${radioOpcao("epoca", "moderna", "Moderna", estado.epoca, "epoca", "texto", "epoca-moderna")}
    </fieldset>
    ${campoTexto("nome", "Nome do investigador", "investigador.nome", inv.nome, ' maxlength="60" autocomplete="off"')}
    ${campoTexto("jogador", "Jogador (opcional)", "investigador.jogador", inv.jogador, ' maxlength="60"')}
    <div class="actions"><label class="small" for="importar">Importar backup JSON</label>
      <input id="importar" type="file" accept="application/json,.json" data-acao="importar-arquivo"></div>
    ${lista}`;
}

function etapaCaracteristicas(){
  const inv = estado.investigador;
  const metodo = inv.metodo;
  const partes = [`<h2>Características</h2>
    <p class="hint">Escolha como gerar as oito características. Os valores aqui valem antes dos ajustes de idade.</p>
    <fieldset class="rules-pick"><legend>Método</legend>
      ${radioOpcao("metodo", "rolar", "Rolar (3d6 × 5 ou (2d6+6) × 5)", metodo, "investigador.metodo", "texto", "metodo-rolar")}
      ${radioOpcao("metodo", "distribuir", "Distribuir 40, 50, 50, 50, 60, 60, 70 e 80", metodo, "investigador.metodo", "texto", "metodo-distribuir")}
      ${estado.modo === "livre" ? radioOpcao("metodo", "manual", "Digitar valores (só modo livre)", metodo, "investigador.metodo", "texto", "metodo-manual") : ""}
    </fieldset>`];
  if(metodo === "rolar") partes.push(`<div class="actions"><button type="button" data-acao="rolar-todas" class="secondary">Rolar as oito</button></div>`);
  partes.push(`<div class="grid-3">`);
  COC_CARACTERISTICAS.forEach(c => {
    const v = inv.caracteristicas[c.id];
    const lim = limitesCaracteristica(c.id);
    if(metodo === "distribuir"){
      const opts = `<option value="">—</option>` + COC_DISTRIBUICAO.map(x => `<option value="${x}"${Number(v) === x ? " selected" : ""}>${x}</option>`).join("");
      partes.push(`<div><label for="car-${c.id}">${esc(c.nome)} (${esc(c.sigla)})</label><select id="car-${c.id}" data-set="investigador.caracteristicas.${c.id}" data-tipo="num" data-rerender="1">${opts}</select></div>`);
    } else {
      const extra = metodo === "rolar" ? ` data-rerender="1"` : "";
      const botao = metodo === "rolar" ? `<button type="button" class="small secondary" data-acao="rolar-car" data-id="${c.id}" aria-label="Rolar ${esc(c.nome)}">Rolar</button>` : "";
      partes.push(`<div>${campoNumero("car-" + c.id, `${c.nome} (${c.sigla})`, "investigador.caracteristicas." + c.id, v, 1, 99, "num", extra)}
        <p class="hint">${metodo === "rolar" ? `${esc(c.dados)} × 5: ${lim.min} a ${lim.max}` : "1 a 99"}</p>${botao}</div>`);
    }
  });
  partes.push(`</div>`);
  if(!metodo) partes.push(`<p class="hint">Escolha um método para liberar as características.</p>`);
  return partes.join("");
}

function etapaIdade(){
  const inv = estado.investigador;
  const idade = inv.idade;
  let corpo = `<label for="idade">Idade (${COC_IDADE.min} a ${COC_IDADE.max})</label>
    <input id="idade" type="number" inputmode="numeric" min="${COC_IDADE.min}" max="${COC_IDADE.max}" step="1" data-set="investigador.idade" data-tipo="int" data-rerender="1" value="${idade == null ? "" : esc(idade)}">`;
  const i = Number(idade);
  if(!Number.isInteger(i) || i < COC_IDADE.min || i > COC_IDADE.max){
    return `<h2>Idade</h2>${corpo}<p class="hint">Digite a idade para ver as faixas e os ajustes.</p>`;
  }
  const faixa = cocFaixaIdade(i);
  const { lista } = efeitosIdade(i);
  const escolhas = lista.filter(ehEscolha);
  corpo += `<h3>${esc(faixa.rotulo)}</h3>
    <div class="alert warning" role="status">Fontes desta faixa: ${esc(faixa.fonte)} Confira no livro antes de usar.</div>`;
  if(escolhas.length){
    corpo += `<h4>Reduções escolhidas</h4><div class="grid-2">` + escolhas.map((e, k) => {
      if(e.tipo === "divisao"){
        const [a, b] = e.alvos.map(id => cocCaracteristica(id));
        const opts = `<option value="">Escolha…</option>` + Array.from({ length: e.total + 1 }, (_, x) =>
          `<option value="${x}"${String(inv.escolhasIdade[k]) === String(x) ? " selected" : ""}>${esc(a.sigla)} −${x} · ${esc(b.sigla)} −${e.total - x}</option>`).join("");
        return `<div><label for="idade-esc-${k}">${esc(e.faixa)}: dividir ${e.total} pontos entre ${esc(a.nome)} e ${esc(b.nome)}</label><select id="idade-esc-${k}" data-set="investigador.escolhasIdade.${k}" data-tipo="int" data-rerender="1">${opts}</select></div>`;
      }
      const opts = `<option value="">Escolha…</option>` + e.opcoes.map(o => `<option value="${o}"${inv.escolhasIdade[k] === o ? " selected" : ""}>${esc((cocCaracteristica(o) || { nome: o }).nome)}</option>`).join("");
      return `<div><label for="idade-esc-${k}">${esc(e.faixa)}: reduzir ${esc(e.rotulo)} em ${Math.abs(e.valor)}</label><select id="idade-esc-${k}" data-set="investigador.escolhasIdade.${k}" data-tipo="texto" data-rerender="1">${opts}</select></div>`;
    }).join("") + `</div>`;
  }
  const testes = testesEdu(inv);
  if(testes.length){
    corpo += `<h4>Testes de melhoria de EDU</h4><p class="hint">${esc(COC_MELHORIA_EDU.regra)}. Fonte: ${esc(COC_MELHORIA_EDU.fonte)}.</p>`;
    corpo += testes.map(t => {
      const res = t.d100 == null ? "não rolado" : `${t.d100} ${t.passou ? "(passou da EDU " + t.eduAntes + ")" : "(não passou da EDU " + t.eduAntes + ")"}`;
      const d10 = t.passou ? `<button type="button" class="small secondary" data-acao="rolar-d10" data-i="${t.i}" id="melhoria-${t.i}-d10">Rolar 1d10${t.d10 != null ? " (" + t.d10 + ")" : ""}</button>` : "";
      return `<div class="inline-row"><span>Teste ${t.i + 1}: ${esc(res)}</span><button type="button" class="small" data-acao="rolar-d100" data-i="${t.i}" id="melhoria-${t.i}-d100">Rolar d100</button>${d10}</div>`;
    }).join("");
  }
  const fin = caracteristicasFinais(inv);
  if(fin){
    corpo += `<h4>Características depois dos ajustes</h4><div class="grid-3">` + COC_CARACTERISTICAS.map(c => `<div><b>${esc(c.sigla)}</b> ${fin[c.id]}</div>`).join("") + `</div>`;
  }
  return `<h2>Idade</h2>${corpo}`;
}

function etapaOcupacao(){
  const inv = estado.investigador;
  const o = cocOcupacao(inv.ocupacaoId);
  const opts = `<option value="">Escolha…</option>` + COC_OCUPACOES.map(x => `<option value="${x.id}"${inv.ocupacaoId === x.id ? " selected" : ""}>${esc(x.nome)}</option>`).join("");
  let corpo = `<label for="ocupacao">Ocupação</label><select id="ocupacao" data-set="investigador.ocupacaoId" data-tipo="texto" data-rerender="1">${opts}</select>`;
  if(o){
    corpo += `<p class="hint">Crédito: ${o.credito[0]} a ${o.credito[1]}%. Fórmula de pontos: ${esc(textoFormula(o))}${o.formula.alternativas ? " (escolha abaixo)" : ""}.</p>`;
    if(o.formula.alternativas){
      corpo += `<fieldset class="rules-pick"><legend>Característica da fórmula</legend>` +
        o.formula.alternativas.map((alt, k) => radioOpcao("ocupacao-alt", k, textoAlternativa(alt), inv.ocupacaoAlt, "investigador.ocupacaoAlt", "int", "alt-" + k)).join("") + `</fieldset>`;
    }
    corpo += `<p>Pontos de ocupação calculados: <b data-live="pool-ocup">${resumoCriacao(inv).poolOcupacao}</b></p>`;
    corpo += `<p class="hint">Próxima etapa: escolha as perícias de ocupação e distribua os pontos.</p>`;
  } else {
    corpo += `<p class="hint">Escolha a ocupação para ver o crédito e a fórmula de pontos.</p>`;
  }
  return `<h2>Ocupação</h2>${corpo}`;
}

function etapaPericiasOcupacao(){
  const inv = estado.investigador;
  const o = cocOcupacao(inv.ocupacaoId);
  if(!o) return `<h2>Perícias de ocupação</h2><p class="hint">Escolha a ocupação primeiro.</p>`;
  const car = caracteristicasFinais(inv);
  const r = resumoCriacao(inv);
  const fixas = [...o.pericias, ...o.grupos.flatMap(g => g.opcoes)];
  let html = `<h2>Perícias de ocupação</h2>
    <p>Pontos de ocupação: <b data-live="gasto-ocup">${r.gastoOcupacao}</b> de <b data-live="pool-ocup">${r.poolOcupacao}</b> distribuídos. Crédito: <b data-live="tot-credito">${cocTotalPericia(inv, "credito", car)}</b>% (faixa ${o.credito[0]} a ${o.credito[1]}%).</p>`;
  if(o.grupos.length){
    html += o.grupos.map((g, gi) => {
      const sel = (inv.escolhasGrupo[gi] || []);
      const tipo = g.n === 1 ? "radio" : "checkbox";
      const itens = g.opcoes.map((id, k) => `<label class="checkbox-row"><input type="${tipo}" id="grupo-${gi}-${k}" name="grupo-${gi}" data-grupo="${gi}" data-id="${id}" data-n="${g.n}" data-rerender="1"${sel.includes(id) ? " checked" : ""}> ${esc(nomePericia(id))}</label>`).join("");
      return `<fieldset class="rules-pick"><legend>${esc(g.rotulo)} (escolha ${g.n})</legend>${itens}</fieldset>`;
    }).join("");
  }
  if(o.livres){
    const escolhidas = inv.livresOcupacao || [];
    const disponiveis = COC_PERICIAS.filter(p => !fixas.includes(p.id) && p.id !== "mitos" && p.id !== "credito");
    html += `<fieldset class="rules-pick"><legend>Perícias livres (escolha ${o.livres})</legend><div class="grid-3">` + disponiveis.map((p, k) =>
      `<label class="checkbox-row"><input type="checkbox" id="livre-${k}" data-livre="${p.id}" data-n="${o.livres}" data-rerender="1"${escolhidas.includes(p.id) ? " checked" : ""}> ${esc(p.nome)}</label>`).join("") + `</div></fieldset>`;
  }
  const ids = periciasDeOcupacao(inv).filter(id => id !== "credito");
  const credito = cocTotalPericia(inv, "credito", car);
  html += `<h3>Pontos por perícia</h3><table><thead><tr><th>Perícia</th><th class="n">Pontos</th><th class="n">Total</th></tr></thead><tbody>` +
    [["credito", "Crédito"], ...ids.map(id => [id, nomePericia(id)])].map(([id, nome]) => {
      const pts = (inv.pontosOcupacao || {})[id] || "";
      const total = id === "credito" ? credito : cocTotalPericia(inv, id, car);
      return `<tr><td><label for="occ-${id}">${esc(nome)}</label></td><td class="n"><input id="occ-${id}" type="number" min="0" step="1" data-set="investigador.pontosOcupacao.${id}" data-tipo="int0" value="${pts}" style="max-width:8rem;min-height:40px"></td><td class="n" data-live="tot-${id}">${total}</td></tr>`;
    }).join("") + `</tbody></table>`;
  return html;
}

function etapaInteresse(){
  const inv = estado.investigador;
  const r = resumoCriacao(inv);
  const ocup = periciasDeOcupacao(inv);
  const car = caracteristicasFinais(inv);
  const linhas = COC_PERICIAS.filter(p => !ocup.includes(p.id) && p.id !== "mitos" && p.id !== "credito").map(p => {
    const pts = (inv.pontosInteresse || {})[p.id] || "";
    return `<tr><td><label for="int-${p.id}">${esc(p.nome)}</label></td><td class="n">${cocTotalPericia(inv, p.id, car)}</td><td class="n"><input id="int-${p.id}" type="number" min="0" step="1" data-set="investigador.pontosInteresse.${p.id}" data-tipo="int0" value="${pts}" style="max-width:8rem;min-height:40px"></td><td class="n" data-live="tot-${p.id}">${cocTotalPericia(inv, p.id, car)}</td></tr>`;
  }).join("");
  return `<h2>Interesse pessoal</h2>
    <p>Pontos de interesse: <b data-live="gasto-int">${r.gastoInteresse}</b> de <b data-live="pool-int">${r.poolInteresse}</b> distribuídos.</p>
    <p class="hint">Use para perícias que não são de ocupação. Regra completa: INT × 2 (confirmado em 2 fontes). O Quick-Start usa outro método (4 perícias +20), que o app não usa.</p>
    <table><thead><tr><th>Perícia</th><th class="n">Base</th><th class="n">Pontos</th><th class="n">Total</th></tr></thead><tbody>${linhas}</tbody></table>`;
}

function etapaAntecedentes(){
  const a = estado.investigador.antecedentes;
  const campo = (k, rot) => `<label for="ant-${k}">${esc(rot)}</label><textarea id="ant-${k}" data-set="investigador.antecedentes.${k}" data-tipo="texto">${esc(a[k] || "")}</textarea>`;
  return `<h2>Antecedentes</h2>
    <p class="hint">Campos livres. Não alteram os números da ficha.</p>
    ${campo("descricao", "Descrição")}${campo("aparencia", "Aparência")}${campo("personalidade", "Personalidade")}
    ${campo("ferimentos", "Ferimentos e cicatrizes")}${campo("fobias", "Fobias e manias")}${campo("historia", "História pessoal")}`;
}

function etapaEquipamento(){
  const inv = estado.investigador;
  const credito = cocTotalPericia(inv, "credito", caracteristicasFinais(inv));
  return `<h2>Equipamento</h2>
    <p class="hint">Liste o equipamento, uma linha por item. Crédito atual: ${credito}%.</p>
    <label for="equipamento">Equipamento</label><textarea id="equipamento" data-set="investigador.equipamento" data-tipo="texto">${esc(inv.equipamento || "")}</textarea>`;
}

function etapaDerivados(){
  const inv = estado.investigador;
  const d = calcDerivados(inv);
  const idade = Number(inv.idade);
  const duas = Number.isInteger(idade) && sorteDuasRolagens(idade);
  if(!d) return `<h2>Derivados</h2><p class="hint">Preencha as características primeiro.</p>`;
  const sorteBotao = duas
    ? `<button type="button" data-acao="rolar-sorte2" id="btn-sorte">Rolar Sorte duas vezes (15 a 19 anos)</button>`
    : `<button type="button" data-acao="rolar-sorte" id="btn-sorte">Rolar Sorte (3d6 × 5)</button>`;
  const sorte = inv.sorte == null ? "não rolada" : inv.sorte;
  const duasRol = duas && (inv.sorteRolagens || []).length ? `<p class="hint">Rolagens: ${inv.sorteRolagens.join(" e ")}. Fica a maior.</p>` : "";
  return `<h2>Derivados</h2>
    <div class="grid-3">
      <div><b>Pontos de vida</b> <span data-live="pv">${d.pv}</span><p class="hint">(CON + TAM) ÷ 10, arredondado para baixo</p></div>
      <div><b>Sanidade inicial</b> <span data-live="san">${d.sanInicial}</span><p class="hint">Igual ao POD. Máximo <span data-live="sanmax">${d.sanMax}</span></p></div>
      <div><b>Pontos de magia</b> <span data-live="pm">${d.pm}</span><p class="hint">POD ÷ 5</p></div>
      <div><b>Movimento</b> <span data-live="mov">${d.mov}</span><p class="hint">Regra completa: 7, 8 ou 9 conforme FOR e DES em relação a TAM, depois −1 por faixa de 40 anos (acumulado). Ordem antes ou depois da idade: não verificada</p></div>
      <div><b>Dano</b> <span data-live="dano">${esc(d.danoConhecido ? d.dano : "não calc.")}</span></div>
      <div><b>Corpo</b> <span data-live="corpo">${esc(d.danoConhecido ? d.corpo : "—")}</span></div>
    </div>
    <h3>Sorte</h3>
    <p>Sorte: <b id="sorte-valor">${sorte}</b></p>
    ${duasRol}
    <div class="actions">${sorteBotao}</div>
    ${estado.modo === "livre" ? campoNumero("sorte", "Sorte manual (múltiplo de 5, 15 a 90)", "investigador.sorte", inv.sorte, 15, 90, "int", ' data-rerender="1"') : ""}
    ${d.danoConhecido ? "" : `<div class="alert warning" role="status">${esc("Dano e Corpo acima de FOR+TAM 204 não confirmados: " + COC_NV + ".")}</div>`}`;
}

function etapaResumo(){
  const inv = estado.investigador;
  const d = calcDerivados(inv);
  const o = cocOcupacao(inv.ocupacaoId);
  const pericias = calcPericias(inv).filter(p => p.total > 0);
  const r = validarEtapa(estado, 10);
  const ficha = cocFichaCombate(inv);
  const fichaHtml = `<h3>Ficha de jogo: combate</h3>
    <p class="hint">${ficha.dbConhecido ? `DB deste investigador: ${esc(ficha.db)}.` : `DB não calculado: FOR+TAM acima de 204 (${esc(COC_NV)}).`} Os valores já incluem os pontos da perícia.</p>
    <table><thead><tr><th>Perícia</th><th class="n">Total</th></tr></thead><tbody>${ficha.combate.map(c => `<tr><td>${esc(c.nome)}</td><td class="n">${c.total}%</td></tr>`).join("")}</tbody></table>
    <div style="overflow-x:auto"><table><thead><tr><th>Arma</th><th>Perícia</th><th class="n">Valor</th><th>Dano</th><th>Alcance</th><th class="n">Tiros</th></tr></thead><tbody>${ficha.armas.map(a => `<tr><td>${esc(a.nome)}</td><td>${esc(a.pericia)}</td><td class="n">${a.valorPericia}%</td><td>${esc(a.dano)}${a.usaDb ? " + DB" : ""}</td><td>${esc(a.alcance)}</td><td class="n">${a.tiros == null ? "—" : a.tiros}</td></tr>`).join("")}</tbody></table></div>
    <p class="hint">Mecânica apenas. Fonte das armas: ${esc(COC_ARMAS_FONTE)}.</p>`;
  const linhas = COC_CARACTERISTICAS.map(c => {
    const fin = caracteristicasFinais(inv);
    return `<span>${c.sigla} ${fin ? fin[c.id] : "—"}</span>`;
  }).join(" · ");
  const fontes = [
    `Características: ${COC_CARACTERISTICAS[0].fonte}`,
    `Distribuição: ${COC_DISTRIBUICAO_FONTE}`,
    `Idade de ${COC_IDADE.min} a ${COC_IDADE.max}: ${COC_IDADE.fonte}`,
    `Ocupações: ${COC_OCUPACOES_FONTE}`,
    `Perícias: ${COC_PERICIAS_FONTE}`,
    `Dano e Corpo: ${COC_DANO_FONTE}`,
    `Pontos de vida, Sanidade, Pontos de magia, Sorte e Movimento: ${COC_FONTE_DERIVADOS}`,
    `Movimento: ${COC_MOV.fonte}`,
    `Pontos de interesse pessoal: ${COC_INTERESSE.fonte}`,
    `Armas e ficha de combate: ${COC_ARMAS_FONTE}`
  ];
  const naoVerificados = [
    `Idade: +5 pontos entre FOR e TAM aos 20 anos (1 fonte, não aplicado).`,
    `Idade: se o MOV compara FOR, DES e TAM antes ou depois dos ajustes de idade (ordem não verificada; o app usa depois).`,
    `Sanidade máxima 99 − Mitos: ${COC_NV} (só posts de fórum).`,
    COC_DANO_ACIMA_NV + ".",
    `Teto de ${COC_TETO_PERICIA.valor}% por perícia na criação: ${COC_TETO_PERICIA.fonte}.`,
    `Ocupações, exceto Jornalista: fórmula, crédito e perícias de 1 fonte. ${COC_NV}.`
  ];
  const simplificacoes = [
    `Idade de 40 anos em diante: um alvo por faixa para FOR, CON ou DES (o livro pode permitir dividir; não confirmado).`,
    `Idade de 15 a 19 anos: os 5 pontos são divididos entre FOR e TAM, com a escolha feita no passo da idade.`
  ];
  return `<h2>Resumo</h2>
    ${faixaAviso(r.erros, "erro")}${faixaAviso(r.avisos, "aviso")}
    <p><b>${esc(inv.nome || "Investigador sem nome")}</b> ${inv.jogador ? "· jogador: " + esc(inv.jogador) : ""}</p>
    <p class="hint">${esc(o ? o.nome : "Sem ocupação")} · idade ${esc(inv.idade ?? "—")} · ${esc(estado.epoca === "moderna" ? "época moderna" : "época clássica")} · ${esc(estado.modo === "livre" ? "modo livre" : "modo estrito")}</p>
    <p>${linhas}</p>
    ${d ? `<p>PV ${d.pv} · Sanidade ${d.sanInicial} (máx. ${d.sanMax}) · Sorte ${inv.sorte ?? "—"} · PM ${d.pm} · MOV ${d.mov} · Dano ${esc(d.danoConhecido ? d.dano : "não calc.")} · Corpo ${esc(d.danoConhecido ? d.corpo : "—")}</p>` : ""}
    <h3>Perícias com valor</h3>
    <table><thead><tr><th>Perícia</th><th class="n">Total</th><th class="n">½</th><th class="n">⅕</th></tr></thead><tbody>${pericias.map(p => `<tr><td>${esc(p.nome)}${p.espec ? " (" + esc(p.espec) + ")" : ""}</td><td class="n">${p.total}</td><td class="n">${p.metade}</td><td class="n">${p.quinto}</td></tr>`).join("")}</tbody></table>
    ${fichaHtml}
    <details class="fontes"><summary>Fontes e pontos não verificados</summary>
      <h4>Fontes</h4><ul>${fontes.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
      <h4>Simplificações do app</h4><ul>${simplificacoes.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
      <h4>Não verificado</h4><ul>${naoVerificados.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
    </details>
    <div class="actions">
      <button type="button" data-acao="salvar-historico">Salvar no histórico</button>
      <button type="button" class="secondary" data-acao="exportar-json">Exportar backup JSON</button>
      <button type="button" class="secondary" data-acao="exportar-pdf">Exportar dossiê em PDF</button>
      <button type="button" class="secondary" data-acao="importar-botao">Importar backup JSON</button>
      <button type="button" class="danger" data-acao="nova" id="btn-nova">${confirmarNova ? "Confirmar: apagar ficha atual" : "Nova ficha"}</button>
    </div>`;
}

function conteudoEtapa(n){
  switch(n){
    case 1: return etapaModo();
    case 2: return etapaCaracteristicas();
    case 3: return etapaIdade();
    case 4: return etapaOcupacao();
    case 5: return etapaPericiasOcupacao();
    case 6: return etapaInteresse();
    case 7: return etapaAntecedentes();
    case 8: return etapaEquipamento();
    case 9: return etapaDerivados();
    case 10: return etapaResumo();
    default: return "";
  }
}

function render(){
  const e = estado.etapa;
  const avisosEtapa = validarEtapa(estado, e).avisos;
  const corpo = conteudoEtapa(e);
  const navegacao = `<div class="actions">${e > 1 ? `<button type="button" class="secondary" data-acao="voltar">Voltar</button>` : ""}
    ${e < COC_ETAPAS.length ? `<button type="button" data-acao="avancar">Avançar</button>` : ""}</div>`;
  appEl().innerHTML = `${stepper()}<div class="card passo-avanca" data-step-pane>
    ${faixaAviso(errosAtuais, "erro")}${e === 10 ? "" : faixaAviso(avisosEtapa, "aviso")}
    ${corpo}${navegacao}</div>`;
  if(focoPendente){
    const el = document.getElementById(focoPendente);
    if(el){ el.focus({ preventScroll: true }); el.scrollIntoView({ block: "center", behavior: reduzMovimento() ? "auto" : "smooth" }); }
    focoPendente = null;
  }
}

/* Mapa de campo de validação -> id do elemento a focar. */
function idDoCampo(campo){
  if(!campo) return null;
  if(campo === "modo") return "modo-estrito";
  if(campo === "epoca") return "epoca-classica";
  if(campo === "metodo") return "metodo-rolar";
  if(campo === "nome") return "nome";
  if(campo === "idade") return "idade";
  if(campo === "ocupacao") return "ocupacao";
  if(campo === "ocupacao-alt") return "alt-0";
  if(campo === "livres") return "livre-0";
  if(campo === "sorte") return "btn-sorte";
  if(campo.startsWith("car-") || campo.startsWith("occ-") || campo.startsWith("int-") || campo.startsWith("idade-esc-")) return campo;
  if(campo.startsWith("idade-melhoria-")) return "melhoria-" + campo.split("-").pop() + "-d100";
  if(campo.startsWith("grupo-")) return campo + "-0";
  return campo;
}

/* ---- ações ---- */
function irPara(n){
  errosAtuais = [];
  estado.etapa = Math.min(Math.max(1, n), COC_ETAPAS.length);
  salvar();
  render();
  window.scrollTo({ top: 0, behavior: reduzMovimento() ? "auto" : "smooth" });
}
function avancar(){
  const r = validarEtapa(estado, estado.etapa);
  if(r.erros.length){
    errosAtuais = r.erros;
    focoPendente = idDoCampo(r.erros[0].campo);
    render();
    return;
  }
  irPara(estado.etapa + 1);
}
function voltar(){ irPara(estado.etapa - 1); }

function rolarCaracteristica1(id){
  estado.investigador.caracteristicas[id] = rolarCaracteristica(id);
}
function sortear(lados){ return rolarDado(lados); }

function acao(nome, el){
  const inv = estado.investigador;
  switch(nome){
    case "avancar": return avancar();
    case "voltar": return voltar();
    case "ir": return irPara(Number(el.dataset.etapa));
    case "rolar-car": rolarCaracteristica1(el.dataset.id); salvar(); return render();
    case "rolar-todas": COC_CARACTERISTICAS.forEach(c => rolarCaracteristica1(c.id)); salvar(); return render();
    case "rolar-d100": {
      const i = Number(el.dataset.i);
      inv.melhoriasEdu = inv.melhoriasEdu || [];
      const anterior = inv.melhoriasEdu[i] || {};
      inv.melhoriasEdu[i] = { d100: sortear(100), d10: anterior.d10 ?? null };
      salvar();
      return render();
    }
    case "rolar-d10": {
      const i = Number(el.dataset.i);
      inv.melhoriasEdu = inv.melhoriasEdu || [];
      inv.melhoriasEdu[i] = Object.assign({ d100: null }, inv.melhoriasEdu[i] || {}, { d10: sortear(10) });
      salvar();
      return render();
    }
    case "rolar-sorte": {
      inv.sorteRolagens = [];
      inv.sorte = rolarFormulaDados("3d6") * 5;
      salvar();
      return render();
    }
    case "rolar-sorte2": {
      const a = rolarFormulaDados("3d6") * 5, b = rolarFormulaDados("3d6") * 5;
      inv.sorteRolagens = [a, b];
      inv.sorte = Math.max(a, b);
      salvar();
      return render();
    }
    case "salvar-historico": {
      const e = salvarNoHistorico(estado, false);
      if(typeof VFTool !== "undefined") VFTool.toast("Salvo no histórico: " + e.nome);
      return render();
    }
    case "exportar-json": return baixarJson();
    case "exportar-pdf": {
      if(!exportarPDF(estado) && typeof VFTool !== "undefined") VFTool.toast("Não foi possível abrir o dossiê.");
      return;
    }
    case "importar-botao": {
      /* O seletor de arquivo fica na etapa 1: leva para lá e abre o diálogo. */
      irPara(1);
      const campo = document.getElementById("importar");
      if(campo) campo.click();
      return;
    }
    case "nova": {
      if(!confirmarNova){ confirmarNova = true; return render(); }
      confirmarNova = false;
      estado = criarEstadoInicial();
      salvar();
      if(typeof VFTool !== "undefined") VFTool.toast("Ficha nova criada.");
      return render();
    }
    case "hist-abrir": {
      const entrada = getHistorico().find(h => h.id === el.dataset.id);
      if(entrada){ estado = garantirEstado(entrada.snapshot); estado.currentHistoryId = entrada.id; salvar(); }
      return render();
    }
    case "hist-copia": {
      const entrada = getHistorico().find(h => h.id === el.dataset.id);
      if(entrada){
        const copia = garantirEstado(entrada.snapshot);
        copia.investigador.nome = (copia.investigador.nome || "Investigador") + " (cópia)";
        copia.currentHistoryId = null;
        estado = copia;
        salvar();
        salvarNoHistorico(estado, true);
      }
      return render();
    }
    case "hist-excluir": {
      removerDoHistorico(el.dataset.id);
      if(estado.currentHistoryId === el.dataset.id){ estado.currentHistoryId = null; salvar(); }
      return render();
    }
    default: return;
  }
}

function baixarJson(){
  const texto = exportarBackupJson(estado);
  const nome = (estado.investigador.nome || "investigador").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "investigador";
  const blob = new Blob([texto], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `coc7-${nome}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
  if(typeof VFTool !== "undefined") VFTool.toast("Backup JSON exportado.");
}

function importarArquivo(input){
  const arquivo = input.files && input.files[0];
  if(!arquivo) return;
  const leitor = new FileReader();
  leitor.onload = () => {
    const r = importarBackupJson(String(leitor.result || ""));
    if(!r.ok){
      errosAtuais = [{ msg: r.erro, campo: null }];
      return render();
    }
    estado = r.estado;
    errosAtuais = [];
    salvar();
    if(typeof VFTool !== "undefined") VFTool.toast("Backup importado.");
    render();
  };
  leitor.onerror = () => { errosAtuais = [{ msg: "Não foi possível ler o arquivo.", campo: null }]; render(); };
  leitor.readAsText(arquivo);
}

/* ---- entradas de formulário ---- */
function lerValor(el){
  const tipo = el.dataset.tipo || "texto";
  const v = el.type === "radio" ? el.value : el.value;
  if(tipo === "texto") return v;
  if(tipo === "int0") return v === "" ? 0 : Math.floor(Number(v));
  if(tipo === "num" || tipo === "int"){ if(v === "") return null; return Number(v); }
  return v;
}

function mudou(el){
  const caminho = el.dataset.set;
  if(caminho){
    let valor = lerValor(el);
    if(el.type === "radio" && !el.checked) return;
    if(caminho === "investigador.ocupacaoId"){
      estado.investigador.ocupacaoId = valor;
      estado.investigador.ocupacaoAlt = null;
      estado.investigador.pontosOcupacao = {};
      estado.investigador.escolhasGrupo = [];
      estado.investigador.livresOcupacao = [];
    } else if(caminho === "investigador.metodo"){
      estado.investigador.metodo = valor;
      COC_CARACTERISTICAS.forEach(c => estado.investigador.caracteristicas[c.id] = null);
    } else if(caminho === "investigador.idade"){
      estado.investigador.idade = valor;
      estado.investigador.escolhasIdade = [];
      estado.investigador.melhoriasEdu = [];
      estado.investigador.sorte = null;
      estado.investigador.sorteRolagens = [];
    } else {
      setPath(estado, caminho, valor);
    }
    salvar();
    errosAtuais = [];
    if(el.dataset.rerender === "1"){
      if(el.id) focoPendente = el.id;
      render();
    } else {
      atualizarVivos();
    }
    return;
  }
  if(el.dataset.grupo !== undefined){
    const gi = Number(el.dataset.grupo), id = el.dataset.id, n = Number(el.dataset.n);
    estado.investigador.escolhasGrupo = estado.investigador.escolhasGrupo || [];
    let lista = [...(estado.investigador.escolhasGrupo[gi] || [])];
    if(el.type === "radio") lista = [id];
    else if(el.checked){
      if(!lista.includes(id)) lista.push(id);
      if(lista.length > n){ lista.shift(); el.checked = false; if(typeof VFTool !== "undefined") VFTool.toast(`Escolha no máximo ${n} perícia(s) aqui.`); }
    } else lista = lista.filter(x => x !== id);
    estado.investigador.escolhasGrupo[gi] = lista;
    salvar(); errosAtuais = []; focoPendente = el.id; render();
    return;
  }
  if(el.dataset.livre !== undefined){
    const id = el.dataset.livre, n = Number(el.dataset.n);
    let lista = [...(estado.investigador.livresOcupacao || [])];
    if(el.checked){
      if(!lista.includes(id)) lista.push(id);
      if(lista.length > n){ lista.shift(); el.checked = false; if(typeof VFTool !== "undefined") VFTool.toast(`Escolha no máximo ${n} perícia(s) livres.`); }
    } else lista = lista.filter(x => x !== id);
    estado.investigador.livresOcupacao = lista;
    salvar(); errosAtuais = []; focoPendente = el.id; render();
  }
}

function montarEventos(){
  const raiz = appEl();
  raiz.addEventListener("click", ev => {
    const b = ev.target.closest("[data-acao]");
    if(!b || b.disabled) return;
    acao(b.dataset.acao, b);
  });
  raiz.addEventListener("change", ev => {
    const t = ev.target;
    if(t.dataset.acao === "importar-arquivo") return importarArquivo(t);
    if(t.dataset.set || t.dataset.grupo !== undefined || t.dataset.livre !== undefined) mudou(t);
  });
  raiz.addEventListener("input", ev => {
    const t = ev.target;
    if(t.dataset.set && (t.dataset.tipo === "texto" && (t.tagName === "TEXTAREA" || t.type === "text"))){
      setPath(estado, t.dataset.set, t.value.slice(0, t.maxLength > 0 ? t.maxLength : 2000));
      salvar();
    } else if(t.dataset.set && (t.dataset.tipo === "int0" || t.dataset.tipo === "num" || t.dataset.tipo === "int") && t.type === "number"){
      /* digitar pontos ou características atualiza só os totais; a gravação completa é no change */
      if(t.dataset.set.startsWith("investigador.pontos")){
        setPath(estado, t.dataset.set, lerValor(t));
        salvar();
        atualizarVivos();
      }
    }
  });
}

function iniciarInterface(){
  estado = carregarEstado();
  montarEventos();
  render();
}
