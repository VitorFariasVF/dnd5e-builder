/* Interface da ficha Tormenta20: tela inicial (fichas salvas) e 12 etapas com stepper.
   Padrão do D&D: erro em faixa no topo da etapa (role="alert"), foco no campo citado, sem caixas bloqueantes.
   Campos com data-campo gravam direto no `state` por caminho ("personagem.nome", "personagem.origemBeneficios.0.valor"). */

let t20Tela = "inicio";              // "inicio" | "ficha"
let t20UltimoFoco = null;           // id do campo com foco antes de re-renderizar
let t20SairTimer = null;

const T20_ETAPAS = ["Modo", "Identidade", "Raça", "Origem", "Classe", "Atributos", "Perícias", "Poderes", "Magias", "Equipamento", "Derivados", "Resumo"];
const T20_TOTAL = T20_ETAPAS.length;

/* ---- utilidades ---- */
function t20Reduz(){ return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; }
function t20Id(campo){ return "c-" + String(campo).replace(/\./g, "-"); }
function t20SetPath(obj, caminho, valor){
  const partes = String(caminho).split(".");
  let alvo = obj;
  for(let i = 0; i < partes.length - 1; i++){
    if(alvo[partes[i]] === undefined || alvo[partes[i]] === null) alvo[partes[i]] = {};
    alvo = alvo[partes[i]];
  }
  alvo[partes[partes.length - 1]] = valor;
}
function t20Opcoes(lista, atual, vazio){
  return (vazio !== undefined ? `<option value="">${t20Esc(vazio)}</option>` : "") +
    lista.map(o => `<option value="${t20Esc(o.valor)}"${String(o.valor) === String(atual) ? " selected" : ""}>${t20Esc(o.rotulo)}</option>`).join("");
}
function t20Aviso(lista, tipo){
  if(!lista || !lista.length) return "";
  return `<div class="alert ${tipo === "erro" ? "error" : "warning"} aviso-etapa" role="${tipo === "erro" ? "alert" : "note"}"><ul class="clean">${lista.map(x => `<li>${t20Esc(x.msg)}</li>`).join("")}</ul></div>`;
}
function t20Salvar(){ salvarEstado(); }

/* ---- renderização principal ---- */
function render(){
  const app = document.getElementById("app");
  if(!app) return;
  const foco = document.activeElement && document.activeElement.id && app.contains(document.activeElement) ? document.activeElement.id : t20UltimoFoco;
  app.innerHTML = t20Tela === "inicio" ? t20HtmlInicio() : t20HtmlFicha();
  if(foco){
    const el = document.getElementById(foco);
    if(el && typeof el.focus === "function") el.focus({ preventScroll: true });
  }
  t20UltimoFoco = null;
}

function t20HtmlInicio(){
  const lista = getCharacterHistory();
  const temAtual = !!(state.personagem && (state.personagem.nome || state.personagem.classe || state.personagem.raca || state.modo));
  const itens = lista.length ? lista.map(e => `
    <div class="history-item">
      <div><b>${t20Esc(e.nome)}</b><br><span class="muted">${t20Esc((T20_CLASSES[e.classe] || {}).nome || "sem classe")} · nível ${t20Esc(e.nivel)} · ${t20Esc(new Date(e.updatedAt).toLocaleDateString("pt-BR"))}</span></div>
      <div class="history-actions"><button type="button" class="small" data-acao="historico-abrir" data-id="${t20Esc(e.id)}">Abrir</button><button type="button" class="small danger" data-acao="historico-excluir" data-id="${t20Esc(e.id)}">Excluir</button></div>
    </div>`).join("") : `<p class="muted">Nenhuma ficha salva ainda.</p>`;
  return `<section class="card" aria-labelledby="t20-inicio-titulo">
    <h2 id="t20-inicio-titulo">Fichas Tormenta20</h2>
    <p class="muted">Tudo fica neste navegador. Você pode exportar um backup JSON e importá-lo de volta.</p>
    <div class="actions">
      <button type="button" data-acao="tela-nova">Nova ficha</button>
      ${temAtual ? `<button type="button" class="secondary" data-acao="tela-continuar">Continuar a ficha atual</button>` : ""}
      <button type="button" class="secondary" data-acao="importar-abrir">Importar backup JSON</button>
      <input type="file" id="t20-importar" accept="application/json,.json" hidden>
    </div>
    <div class="t20-msg" id="t20-importar-msg" role="status" aria-live="polite"></div>
    <h3>Fichas salvas</h3>
    <div class="history-list">${itens}</div>
  </section>`;
}

function t20HtmlStepper(){
  const e = state.etapa;
  const dots = T20_ETAPAS.map((rotulo, i) => {
    const k = i + 1, cls = k === e ? "atual" : k < e ? "feito" : "";
    const acao = k < e ? ` data-acao="ir-etapa" data-etapa="${k}"` : " disabled";
    return `<li><button type="button" class="${cls}"${acao} aria-label="Etapa ${k}: ${rotulo}"${k === e ? ' aria-current="step"' : ""}>${k < e ? "✓" : k}</button></li>`;
  }).join("");
  return `<div class="stepper"><div class="stepper-top"><div class="stepper-label">Etapa ${e} de ${T20_TOTAL} · <b>${T20_ETAPAS[e - 1]}</b></div>
    <details class="menu-acoes"><summary>Menu</summary><div class="menu-lista">
      <button type="button" data-acao="tela-inicio">Tela inicial</button>
      <button type="button" data-acao="salvar-historico">Salvar no histórico</button>
      <button type="button" data-acao="importar-abrir">Importar backup JSON</button>
      <button type="button" data-acao="exp-backup">Baixar backup JSON</button>
    </div></details></div>
    <div class="stepper-track" role="progressbar" aria-valuemin="1" aria-valuemax="${T20_TOTAL}" aria-valuenow="${e}" aria-label="Progresso da ficha"><div class="stepper-fill" style="--p:${(e - 1) / (T20_TOTAL - 1)}"></div></div>
    <ol class="stepper-dots">${dots}</ol></div>`;
}

function t20HtmlFicha(){
  const e = state.etapa;
  const p = state.personagem;
  const modoEf = state.modo || "estrito";
  let erros = [], avisos = [];
  if(!state.modo && e === 1) erros = [{ msg: "Escolha o modo de criação para continuar.", campo: "modo-estrito" }];
  const v = t20ValidarEtapa(e, p, modoEf);
  if(e !== 1 || state.modo){
    erros = erros.concat(v.erros);
  }
  avisos = v.avisos.filter(a => !erros.some(x => x.msg === a.msg));
  const corpo = [t20PassoModo, t20PassoIdentidade, t20PassoRaca, t20PassoOrigem, t20PassoClasse, t20PassoAtributos, t20PassoPericias, t20PassoPoderes, t20PassoMagias, t20PassoEquipamento, t20PassoDerivados, t20PassoResumo][e - 1]();
  const botoes = e === T20_TOTAL
    ? `<div class="actions"><button type="button" class="secondary" data-acao="voltar">Voltar</button></div>`
    : `<div class="actions"><button type="button" class="secondary" data-acao="voltar"${e === 1 ? " disabled" : ""}>Voltar</button><button type="button" data-acao="avancar">Avançar</button></div>`;
  const cor = t20CorClasse(p.classe);
  return `${t20HtmlStepper()}
    <section class="card passo-avanca" style="--t20-cor:${cor}" aria-labelledby="t20-passo-titulo">
      <h2 id="t20-passo-titulo">${t20Esc(T20_ETAPAS[e - 1])}</h2>
      ${t20Aviso(erros, "erro")}${t20Aviso(avisos, "aviso")}
      ${corpo}
      ${botoes}
    </section>`;
}
function t20CorClasse(id){ return (T20_CLASSES[id] || {}).cor || "#f0b254"; }

/* ---- etapa 1: modo ---- */
function t20PassoModo(){
  const m = state.modo;
  return `<fieldset class="rules-pick">
    <legend>Modo de criação</legend>
    <label class="checkbox-row"><input type="radio" id="modo-estrito" name="t20-modo" value="estrito" data-acao="modo" ${m === "estrito" ? "checked" : ""}> <span><b>Estrito</b>: a etapa só avança se estiver correta. Ideal para seguir as regras.</span></label>
    <label class="checkbox-row"><input type="radio" name="t20-modo" value="livre" data-acao="modo" ${m === "livre" ? "checked" : ""}> <span><b>Livre</b>: os problemas viram avisos e você pode avançar mesmo assim.</span></label>
  </fieldset>
  <p class="hint">Você pode trocar de modo a qualquer momento. Os avisos sobre dados não verificados aparecem nos dois modos.</p>`;
}

/* ---- etapa 2: identidade ---- */
function t20PassoIdentidade(){
  const p = state.personagem;
  return `<div class="grid-2">
    <div class="field"><label for="nome">Nome do personagem</label>
      <input id="nome" data-campo="personagem.nome" value="${t20Esc(p.nome)}" autocomplete="off" maxlength="80"></div>
    <div class="field"><label for="jogador">Jogador (opcional)</label>
      <input id="jogador" data-campo="personagem.jogador" value="${t20Esc(p.jogador)}" autocomplete="off" maxlength="80"></div>
  </div>
  <div class="field"><label for="nivel">Nível</label>
  <select id="nivel" data-campo="personagem.nivel" data-tipo="int" data-recarregar="1">
    ${t20Opcoes(Array.from({ length: T20_NIVEL_MAX }, (_, i) => ({ valor: i + 1, rotulo: `Nível ${i + 1}` })), p.nivel)}
  </select></div>
  <p class="hint">Esta versão cria fichas do nível 1 ao 5. Níveis mais altos ficam para uma próxima entrega.</p>`;
}

/* ---- etapa 3: raça ---- */
function t20PassoRaca(){
  const p = state.personagem;
  const r = T20_RACAS[p.raca];
  const opcoes = Object.keys(T20_RACAS).map(id => ({ valor: id, rotulo: T20_RACAS[id].nome }));
  let info = `<p class="muted">Escolha uma raça para ver os detalhes.</p>`;
  if(r){
    const aj = r.ajustes ? Object.entries(r.ajustes).map(([k, v]) => `${T20_ATRIBUTO_NOME[k]} ${t20FormatarBonus(v)}`).join(", ") : "NÃO VERIFICADO";
    info = `<div class="info-box"><p><b>Tamanho:</b> ${t20Esc(r.tamanho || "NÃO VERIFICADO (o app usa Médio, 9 m)")} · <b>Deslocamento:</b> ${t20Esc(r.deslocamento)} m</p>
      <p><b>Ajustes de atributo:</b> ${t20Esc(aj)}</p>
      <p><b>Habilidades:</b></p><ul class="clean">${r.habilidades.length ? r.habilidades.map(h => `<li><b>${t20Esc(h.nome)}</b>: ${t20Esc(h.efeito)}</li>`).join("") : "<li>NÃO VERIFICADO</li>"}</ul>
      <p class="hint">Fonte: ${t20Esc(r.fonte)}.</p></div>`;
  }
  return `<div class="field"><label for="raca">Raça</label>
    <select id="raca" data-campo="personagem.raca" data-recarregar="1">${t20Opcoes(opcoes, p.raca, "Escolha uma raça")}</select></div>
    ${info}`;
}

/* ---- etapa 4: origem ---- */
function t20PassoOrigem(){
  const p = state.personagem;
  const opcOrigem = T20_ORIGENS.map(o => ({ valor: o, rotulo: o }));
  const linhas = p.origemBeneficios.map((b, i) => {
    const idTipo = `beneficio-tipo-${i}`;
    const campoValor = t20Id(`personagem.origemBeneficios.${i}.valor`);
    const campoValorEl = b.tipo === "pericia"
      ? `<select id="beneficio-${i}" data-campo="personagem.origemBeneficios.${i}.valor" data-recarregar="1">${t20Opcoes(T20_PERICIA_NOMES.map(n => ({ valor: n, rotulo: n })), b.valor, "Escolha a perícia")}</select>`
      : `<input id="beneficio-${i}" data-campo="personagem.origemBeneficios.${i}.valor" value="${t20Esc(b.valor)}" placeholder="Nome do poder" maxlength="80">`;
    return `<div class="info-box"><div class="inline-row">
      <div class="field" style="flex:1 1 9rem"><label for="${idTipo}">Benefício ${i + 1}</label>
        <select id="${idTipo}" data-acao="benef-tipo" data-i="${i}"><option value="pericia"${b.tipo === "pericia" ? " selected" : ""}>Perícia</option><option value="poder"${b.tipo === "poder" ? " selected" : ""}>Poder</option></select></div>
      <div class="field" style="flex:2 1 14rem"><label for="beneficio-${i}">${b.tipo === "pericia" ? "Perícia" : "Poder"}</label>${campoValorEl}</div>
    </div></div>`;
  }).join("");
  return `<div class="field"><label for="origem">Origem</label>
    <select id="origem" data-campo="personagem.origem">${t20Opcoes(opcOrigem, p.origem, "Escolha uma origem")}</select></div>
    <p class="hint">${t20Esc(T20_ORIGEM_FONTE)}.</p>
    <h3>Dois benefícios à sua escolha</h3>
    ${linhas}`;
}

/* ---- etapa 5: classe ---- */
function t20PassoClasse(){
  const p = state.personagem;
  const c = T20_CLASSES[p.classe];
  const opcoes = T20_CLASSE_IDS.map(id => ({ valor: id, rotulo: T20_CLASSES[id].nome }));
  let extra = "";
  if(c && c.conjurador && c.atributoMagiaOpcoes.length > 1){
    extra = `<div class="field"><label for="atributo-magia">Atributo de magia</label>
      <select id="atributo-magia" data-campo="personagem.atributoMagia" data-recarregar="1">${t20Opcoes(c.atributoMagiaOpcoes.map(a => ({ valor: a, rotulo: T20_ATRIBUTO_NOME[a] })), p.atributoMagia || c.atributoMagiaPadrao, undefined)}</select></div>`;
  }
  let resumo = `<p class="muted">Escolha uma classe para ver os dados.</p>`;
  if(c){
    const pv = c.pvInicial === null ? "NÃO CALCULADO (fontes divergem)" : `${c.pvInicial} + CON no 1º nível; +${c.pvNivel} + CON por nível`;
    const pvSt = c.verificadoPv ? "" : `<span class="badge wip">não confirmado em 2 fontes</span>`;
    resumo = `<div class="info-box" style="border-left:4px solid ${t20Esc(c.cor)}">
      <p><b>PV:</b> ${t20Esc(pv)} ${pvSt}</p>
      <p><b>PM por nível:</b> ${t20Esc(c.pmNivel)}${c.conjurador ? " (conjurador: soma o atributo de magia)" : ""}</p>
      <p><b>Perícias fixas:</b> ${t20Esc([...c.fixas, ...(c.grupoFixo ? [c.grupoFixo.opcoes.join(" ou ") + " (uma)"] : [])].join(", ") || "NÃO VERIFICADO")}</p>
      <p><b>Perícias livres por nível:</b> ${t20Esc(c.periciasPorNivel)}</p>
      <p><b>Conjuração:</b> ${c.conjurador ? `sim, ${t20Esc(c.magiasNivel1)} magias de 1º círculo no início` : "não neste app"}</p>
      <p><b>Resistência forte:</b> ${t20Esc(c.forte || "NÃO VERIFICADO")}</p>
      <p class="hint">PV: ${t20Esc(c.fontePv)}. Perícias: ${t20Esc(c.fontePericias)}.</p></div>`;
  }
  return `<div class="field"><label for="classe">Classe</label>
    <select id="classe" data-campo="personagem.classe" data-recarregar="1">${t20Opcoes(opcoes, p.classe, "Escolha uma classe")}</select></div>
    ${extra}${resumo}
    <p class="hint">A lista é das 14 classes do livro básico (Edição Jogo do Ano). Cada uma tem a sua cor na ficha.</p>`;
}

/* ---- etapa 6: atributos (compra de pontos) ---- */
function t20PassoAtributos(){
  const p = state.personagem;
  const gastos = t20PontosGastos(p.atributosBase);
  const racial = t20AjusteRacial(p.raca);
  const finais = t20AtributosFinais(p);
  const linhas = T20_ATRIBUTOS.map(a => {
    const v = Number(p.atributosBase[a.id]) || 0;
    const custo = t20CustoAtributo(v);
    return `<tr>
      <th scope="row">${t20Esc(a.nome)}</th>
      <td data-rotulo="Compra"><div class="point-buy-row">
        <button type="button" class="small" data-acao="atributo" data-attr="${a.id}" data-delta="-1" aria-label="Diminuir ${t20Esc(a.nome)}"${v <= T20_PONTOS_COMPRA.minimo ? " disabled" : ""}>−</button>
        <span class="score" aria-live="polite">${t20Esc(v)}</span>
        <button type="button" class="small" id="atr-${a.id}" data-acao="atributo" data-attr="${a.id}" data-delta="1" aria-label="Aumentar ${t20Esc(a.nome)}"${v >= T20_PONTOS_COMPRA.maximo ? " disabled" : ""}>+</button>
      </div></td>
      <td class="num" data-rotulo="Custo">${custo === null ? "—" : t20Esc(custo)}</td>
      <td class="num" data-rotulo="Raça">${t20FormatarBonus(racial[a.id])}</td>
      <td data-rotulo="Ajuste manual"><input type="number" step="1" min="-5" max="5" id="ajuste-${a.id}" data-campo="personagem.ajusteManual.${a.id}" data-tipo="int" value="${t20Esc(p.ajusteManual[a.id] || 0)}" aria-label="Ajuste manual de ${t20Esc(a.nome)}"></td>
      <td class="num" data-rotulo="Final"><b>${t20Esc(finais[a.id])}</b> <span class="muted">(${t20FormatarBonus(finais[a.id])})</span></td>
    </tr>`;
  }).join("");
  const restante = T20_PONTOS_COMPRA.total - (gastos === null ? 0 : gastos);
  return `<p id="pontos" tabindex="-1"><b>Pontos gastos:</b> ${gastos === null ? "valor inválido" : `${gastos} de ${T20_PONTOS_COMPRA.total}`} · <span class="muted">${restante >= 0 ? `restam ${restante}` : `passou ${-restante}`}</span></p>
  <p class="hint">Todos os atributos começam em 0. Valores entre ${T20_PONTOS_COMPRA.minimo} e ${T20_PONTOS_COMPRA.maximo} antes da raça. O modificador é o próprio valor. ${t20Esc(T20_PONTOS_COMPRA.fonte)}.</p>
  <div class="table-wrap"><table class="table-like t20-atributos" aria-describedby="pontos"><thead><tr><th scope="col">Atributo</th><th scope="col">Compra</th><th scope="col">Custo</th><th scope="col">Raça</th><th scope="col">Ajuste manual</th><th scope="col">Final</th></tr></thead><tbody>${linhas}</tbody></table></div>
  <p class="hint">Ajuste manual: use se a raça não tiver o ajuste verificado ou se a sua mesa usa outra regra. Fica em 0 por padrão.</p>`;
}

/* ---- etapa 7: perícias ---- */
function t20PassoPericias(){
  const p = state.personagem;
  const c = T20_CLASSES[p.classe];
  if(!c) return `<p class="muted">Escolha a classe na etapa anterior.</p>`;
  const atr = t20AtributosFinais(p);
  const disp = t20PericiasDisponiveis(p, atr);
  const escolhidas = p.periciasEscolhidas || [];
  const travadas = new Set([...disp.fixas, ...(p.origemBeneficios || []).filter(b => b.tipo === "pericia").map(b => b.valor)]);
  if(c.grupoFixo) travadas.add(p.grupoFixoEscolha);
  const cheio = state.modo === "estrito" && escolhidas.length >= disp.livres;
  const grupo = c.grupoFixo ? `<fieldset class="rules-pick"><legend>${t20Esc(c.grupoFixo.opcoes.join(" ou "))} (uma)</legend>
    ${c.grupoFixo.opcoes.map((o, i) => `<label class="checkbox-row"><input type="radio" name="t20-grupo" id="${i === 0 ? "grupo-fixo" : "grupo-fixo-" + i}" value="${t20Esc(o)}" data-campo="personagem.grupoFixoEscolha" data-recarregar="1"${p.grupoFixoEscolha === o ? " checked" : ""}> ${t20Esc(o)}</label>`).join("")}
  </fieldset>` : "";
  let primeiroPericia = true;
  const listaPericias = T20_PERICIAS.map(per => {
    const marcada = escolhidas.includes(per.nome) || travadas.has(per.nome);
    const travada = travadas.has(per.nome);
    const bloqueada = travada || (cheio && !escolhidas.includes(per.nome));
    const idPer = primeiroPericia ? ' id="pericias"' : "";
    primeiroPericia = false;
    return `<label class="checkbox-row t20-pericia${bloqueada && !marcada ? " off" : ""}"><input type="checkbox"${idPer} data-acao="pericia" data-nome="${t20Esc(per.nome)}" ${marcada ? "checked" : ""}${travada || bloqueada ? " disabled" : ""}> <span>${t20Esc(per.nome)} <span class="muted">(${t20Esc(T20_ATRIBUTOS.find(a => a.id === per.attr).sigla)}${per.soTreinado ? ", só treinado" : ""}${per.penalidadeArmadura ? ", penalidade de armadura" : ""})</span>${travada ? ` <span class="badge">automática</span>` : ""}</span></label>`;
  }).join("");
  const lacunaExtra = disp.extraRacial ? ` + ${disp.extraRacial} da raça` : "";
  return `<div class="info-box"><p><b>Automáticas:</b> ${disp.fixas.length ? t20Esc(disp.fixas.join(", ")) : "nenhuma das fixas"}${c.grupoFixo ? " + uma do grupo" : ""}.</p>
    <p><b>Livres:</b> ${t20Esc(c.periciasPorNivel)} por nível × ${t20Esc(p.nivel)} + Inteligência positiva (${t20Esc(disp.intPos)})${t20Esc(lacunaExtra)} = <b>${t20Esc(disp.livres)}</b>. Escolheu <b>${escolhidas.length}</b>.</p>
    <p class="hint">Fonte: ${t20Esc(c.fontePericias)}. ${c.verificadoPericias ? "" : "Não confirmado em 2 fontes."}</p></div>
    ${grupo}
    <fieldset class="rules-pick"><legend>Perícias livres</legend><div class="grid-3">${listaPericias}</div></fieldset>`;
}

/* ---- etapa 8: poderes ---- */
function t20PassoPoderes(){
  const p = state.personagem;
  const linhas = p.poderes.map((pd, i) => `<div class="info-box"><div class="inline-row">
    <div class="field" style="flex:2 1 12rem"><label for="poder-${i}">Nome do poder</label><input id="poder-${i}" data-campo="personagem.poderes.${i}.nome" value="${t20Esc(pd.nome)}" maxlength="80"></div>
    <div class="field" style="flex:1 1 8rem"><label for="poder-tipo-${i}">Tipo</label><select id="poder-tipo-${i}" data-campo="personagem.poderes.${i}.tipo">${t20Opcoes([{ valor: "classe", rotulo: "Classe" }, { valor: "geral", rotulo: "Geral" }, { valor: "origem", rotulo: "Origem" }], pd.tipo)}</select></div>
    <div class="field" style="flex:1 1 7rem"><label for="poder-nivel-${i}">Nível</label><select id="poder-nivel-${i}" data-campo="personagem.poderes.${i}.nivel" data-tipo="int">${t20Opcoes(Array.from({ length: p.nivel }, (_, k) => ({ valor: k + 1, rotulo: String(k + 1) })), pd.nivel)}</select></div>
  </div>
  <div class="field"><label for="poder-nota-${i}">Anotação (opcional)</label><input id="poder-nota-${i}" data-campo="personagem.poderes.${i}.nota" value="${t20Esc(pd.nota || "")}" maxlength="160"></div>
  <button type="button" class="small danger" data-acao="poder-del" data-i="${i}">Remover poder</button></div>`).join("");
  return `<p class="hint">Escreva os poderes que o personagem tem. Nesta versão o app não conta a quantidade de poderes por nível: ${t20Esc("NÃO VERIFICADO")}.</p>
    ${linhas || `<p class="muted">Nenhum poder registrado.</p>`}
    <button type="button" class="secondary" data-acao="poder-add">Adicionar poder</button>`;
}

/* ---- etapa 9: magias ---- */
function t20PassoMagias(){
  const p = state.personagem;
  const c = T20_CLASSES[p.classe];
  if(!c) return `<p class="muted">Escolha a classe na etapa 5.</p>`;
  if(!c.conjurador) return `<p class="muted">${t20Esc(c.nome)} não conjura neste app. Pule esta etapa.</p>`;
  const max = t20CirculoMaximo(p.nivel);
  const limite = t20MagiasConhecidasLimite(p.classe, p.nivel);
  const linhas = p.magias.map((m, i) => `<div class="inline-row">
    <div class="field" style="flex:2 1 12rem"><label for="magia-${i}">Magia ${i + 1}</label><input id="magia-${i}" data-campo="personagem.magias.${i}.nome" value="${t20Esc(m.nome)}" maxlength="80"></div>
    <div class="field" style="flex:1 1 8rem"><label for="magia-circ-${i}">Círculo</label><select id="magia-circ-${i}" data-campo="personagem.magias.${i}.circulo" data-tipo="int">${t20Opcoes(Array.from({ length: Math.max(1, max) }, (_, k) => ({ valor: k + 1, rotulo: `${k + 1}º` })), m.circulo)}</select></div>
    <button type="button" class="small danger" data-acao="magia-del" data-i="${i}">Remover</button></div>`).join("");
  return `<p><b>Círculo máximo no nível ${t20Esc(p.nivel)}:</b> ${t20Esc(max)}. ${limite === null ? "Magias conhecidas acima do 1º nível: NÃO VERIFICADO." : `Magias conhecidas no 1º nível: <b>${t20Esc(limite)}</b>.`}</p>
    <p class="hint">Escreva os nomes das magias. Lista de magias do livro não foi incluída nesta versão.</p>
    ${linhas || `<p class="muted">Nenhuma magia registrada.</p>`}
    <button type="button" class="secondary" data-acao="magia-add">Adicionar magia</button>`;
}

/* ---- etapa 10: equipamento e defesa ---- */
function t20PassoEquipamento(){
  const p = state.personagem;
  const linhas = p.equipamento.map((e, i) => `<div class="inline-row">
    <div class="field" style="flex:2 1 12rem"><label for="equip-${i}">Item ${i + 1}</label><input id="equip-${i}" data-campo="personagem.equipamento.${i}.nome" value="${t20Esc(e.nome)}" maxlength="80"></div>
    <div class="field" style="flex:1 1 6rem"><label for="equip-qtd-${i}">Quantidade</label><input id="equip-qtd-${i}" type="number" min="1" step="1" data-campo="personagem.equipamento.${i}.quantidade" data-tipo="int" value="${t20Esc(e.quantidade || 1)}"></div>
    <button type="button" class="small danger" data-acao="equip-del" data-i="${i}">Remover</button></div>`).join("");
  const d = p.defesa;
  return `<h3>Defesa</h3>
    <p class="hint">Nesta versão você informa os bônus. A tabela de armas e armaduras do livro não foi incluída. Defesa = 10 + Destreza + armadura + escudo + outros. ${t20Esc(T20_DEFESA_FONTE)}.</p>
    <div class="grid-3">
      <div class="field"><label for="def-nome-armadura">Nome da armadura</label><input id="def-nome-armadura" data-campo="personagem.defesa.nomeArmadura" value="${t20Esc(d.nomeArmadura)}" maxlength="60"></div>
      <div class="field"><label for="def-armadura">Bônus de armadura</label><input id="def-armadura" type="number" step="1" data-campo="personagem.defesa.armadura" data-tipo="int" value="${t20Esc(d.armadura)}"></div>
      <div class="field"><label for="def-escudo">Bônus de escudo</label><input id="def-escudo" type="number" step="1" data-campo="personagem.defesa.escudo" data-tipo="int" value="${t20Esc(d.escudo)}"></div>
      <div class="field"><label for="def-outros">Outros bônus de Defesa</label><input id="def-outros" type="number" step="1" data-campo="personagem.defesa.outros" data-tipo="int" value="${t20Esc(d.outros)}"></div>
    </div>
    <h3>Equipamento</h3>
    ${linhas || `<p class="muted">Nenhum item registrado.</p>`}
    <button type="button" class="secondary" data-acao="equip-add">Adicionar item</button>
    <h3>Dinheiro</h3>
    <div class="field"><label for="dinheiro">Tibares (T$)</label><input id="dinheiro" type="number" min="0" step="1" data-campo="personagem.dinheiro" data-tipo="int" value="${t20Esc(p.dinheiro)}"></div>
    <p class="hint">${t20Esc(T20_DINHEIRO_FONTE)}</p>`;
}

/* ---- etapa 11: derivados ---- */
function t20PassoDerivados(){
  const p = state.personagem;
  const d = t20Derivados(p);
  if(!T20_CLASSES[p.classe]) return `<p class="muted">Escolha a classe para ver os derivados.</p>`;
  const naoCalc = v => v === null ? `<span class="muted">não calculado</span>` : t20Esc(v);
  const linhas = d.pericias.map(x => `<tr><td>${t20Esc(x.nome)}${x.soTreinado ? ` <span class="muted">(só treinado)</span>` : ""}</td><td>${x.treinada ? "treinada" : "—"}</td><td class="num">${x.treinada ? t20FormatarBonus(x.bonus) : t20FormatarBonus(d.atributos[x.attr]) + ` <span class="muted">(sem treino: NÃO VERIFICADO)</span>`}</td></tr>`).join("");
  return `<div class="grid-3">
    <div class="info-box"><b>PV</b><div class="score">${naoCalc(d.pv)}</div><span class="hint">PV inicial + CON; +PV por nível + CON por nível</span></div>
    <div class="info-box"><b>PM</b><div class="score">${naoCalc(d.pm)}</div><span class="hint">PM por nível × nível${T20_CLASSES[p.classe].conjurador ? " + atributo de magia" : ""}</span></div>
    <div class="info-box"><b>Defesa</b><div class="score">${t20Esc(d.defesa)}</div><span class="hint">10 + DES + armadura + escudo + outros</span></div>
    <div class="info-box"><b>Deslocamento</b><div class="score">${naoCalc(d.deslocamento === null ? null : d.deslocamento + " m")}</div><span class="hint">pela raça</span></div>
    <div class="info-box"><b>Bônus de treino</b><div class="score">${t20Esc(t20FormatarBonus(d.bonusTreino))}</div><span class="hint">metade do nível</span></div>
  </div>
  <h3>Perícias</h3>
  <div class="table-wrap"><table class="table-like"><thead><tr><th scope="col">Perícia</th><th scope="col">Situação</th><th scope="col" class="num">Bônus</th></tr></thead><tbody>${linhas}</tbody></table></div>
  <p class="hint">Teste: 1d20 + bônus. ${t20Esc(T20_TREINO_FONTE)}.</p>`;
}

/* ---- etapa 12: resumo e exportação ---- */
function t20PassoResumo(){
  const r = t20ValidarTudo(state);
  const p = state.personagem;
  const etapasComProblema = Object.keys(r.porEtapa).filter(k => r.porEtapa[k].erros.length || r.porEtapa[k].avisos.length);
  const lista = etapasComProblema.map(k => {
    const x = r.porEtapa[k];
    const itens = [...x.erros.map(e => `<li class="chip-no">${t20Esc(e.msg)}</li>`), ...x.avisos.map(a => `<li>${t20Esc(a.msg)}</li>`)].join("");
    return `<li><button type="button" class="small" data-acao="ir-etapa" data-etapa="${k}">Etapa ${k}: ${t20Esc(T20_ETAPAS[k - 1])}</button><ul class="clean">${itens}</ul></li>`;
  }).join("");
  const d = p.classe ? t20Derivados(p) : null;
  const status = r.valido ? `<span class="badge ok">Ficha válida</span>` : `<span class="badge">Revisão pendente: ${t20Esc(r.erros)} erro(s)</span>`;
  return `<p>${status} <span class="muted">${t20Esc(r.avisos)} aviso(s) · modo ${t20Esc(state.modo || "—")}</span></p>
    <div class="info-box"><p><b>${t20Esc(p.nome || "Personagem sem nome")}</b> · ${t20Esc((T20_CLASSES[p.classe] || {}).nome || "sem classe")} ${t20Esc(p.nivel)} · ${t20Esc((T20_RACAS[p.raca] || {}).nome || "sem raça")} · ${t20Esc(p.origem || "sem origem")}</p>
      ${d ? `<p>PV ${t20Esc(d.pv === null ? "não calculado" : d.pv)} · PM ${t20Esc(d.pm === null ? "não calculado" : d.pm)} · Defesa ${t20Esc(d.defesa)} · Deslocamento ${t20Esc(d.deslocamento === null ? "—" : d.deslocamento + " m")}</p>` : ""}</div>
    ${lista ? `<h3>Pendências e avisos</h3><ul class="clean">${lista}</ul>` : `<p class="muted">Nada pendente.</p>`}
    <h3>Exportar</h3>
    <div class="actions">
      <button type="button" data-acao="exp-backup">Baixar backup JSON</button>
      <button type="button" class="secondary" data-acao="exp-pdf">Exportar PDF (2 páginas A4)</button>
      <button type="button" class="secondary" data-acao="exp-foundry">JSON para Foundry (não testado)</button>
      <button type="button" class="secondary" data-acao="salvar-historico">Salvar no histórico</button>
    </div>
    <p class="hint">O backup importa de volta nesta página. O JSON de Foundry é um rascunho: não foi testado em VTT real (veja a auditoria).</p>`;
}

/* ---- avanço e voltar ---- */
function t20Avancar(){
  const modoEf = state.modo || "estrito";
  if(!state.modo){
    t20MostrarErro([{ msg: "Escolha o modo de criação para continuar.", campo: "modo-estrito" }]);
    return;
  }
  const v = t20ValidarEtapa(state.etapa, state.personagem, modoEf);
  if(v.erros.length){ t20MostrarErro(v.erros); return; }
  state.etapa = Math.min(T20_TOTAL, state.etapa + 1);
  t20Salvar();
  render();
  window.scrollTo({ top: Math.min(window.scrollY, 120), behavior: t20Reduz() ? "auto" : "smooth" });
}
function t20MostrarErro(erros){
  render();
  const card = document.querySelector("#app .card");
  if(!card) return;
  card.querySelectorAll(".aviso-etapa").forEach(n => n.remove());
  const a = document.createElement("div");
  a.className = "alert error aviso-etapa";
  a.setAttribute("role", "alert");
  a.innerHTML = `<ul class="clean">${erros.map(e => `<li>${t20Esc(e.msg)}</li>`).join("")}</ul>`;
  const h2 = card.querySelector("h2");
  (h2 || card.firstChild).insertAdjacentElement("afterend", a);
  a.scrollIntoView({ behavior: t20Reduz() ? "auto" : "smooth", block: "center" });
  const campo = erros.find(e => e.campo && document.getElementById(e.campo));
  if(campo){
    const el = document.getElementById(campo.campo);
    el.classList.add("campo-erro");
    setTimeout(() => el.focus({ preventScroll: true }), 350);
  }
}

/* ---- ações ---- */
function t20Mensagem(texto, erro){
  if(typeof VFTool !== "undefined" && VFTool.toast) VFTool.toast(texto);
  const box = document.getElementById("t20-importar-msg");
  if(box && erro) box.textContent = texto;
}

function t20SelecionarEtapa(n){
  state.etapa = Math.min(T20_TOTAL, Math.max(1, n));
  t20Salvar();
  render();
}

function t20Acao(el){
  const acao = el.dataset.acao;
  switch(acao){
    case "tela-nova": resetStateToInitial(); t20Tela = "ficha"; state.etapa = 1; t20Salvar(); render(); break;
    case "tela-continuar": t20Tela = "ficha"; render(); break;
    case "tela-inicio": t20Salvar(); t20Tela = "inicio"; render(); break;
    case "historico-abrir": if(loadCharacterFromHistory(el.dataset.id)){ t20Tela = "ficha"; render(); t20Mensagem("Ficha aberta."); } break;
    case "historico-excluir": deleteCharacterFromHistory(el.dataset.id); render(); break;
    case "salvar-historico": upsertCharacterInHistory(); t20Mensagem("Ficha salva no histórico."); render(); break;
    case "avancar": t20Avancar(); break;
    case "voltar": t20SelecionarEtapa(state.etapa - 1); break;
    case "ir-etapa": t20SelecionarEtapa(Number(el.dataset.etapa)); break;
    case "atributo": {
      const id = el.dataset.attr, delta = Number(el.dataset.delta);
      const v = (Number(state.personagem.atributosBase[id]) || 0) + delta;
      if(v >= T20_PONTOS_COMPRA.minimo && v <= T20_PONTOS_COMPRA.maximo){
        state.personagem.atributosBase[id] = v;
        t20Salvar(); render();
        const btn = document.getElementById("atr-" + id); if(btn) btn.focus({ preventScroll: true });
      }
      break;
    }
    case "pericia": break;   // tratado em change
    case "modo": break;      // tratado em change
    case "poder-add": state.personagem.poderes.push({ nome: "", tipo: "classe", nivel: 1, nota: "" }); t20Salvar(); render(); break;
    case "poder-del": state.personagem.poderes.splice(Number(el.dataset.i), 1); t20Salvar(); render(); break;
    case "magia-add": state.personagem.magias.push({ nome: "", circulo: 1 }); t20Salvar(); render(); break;
    case "magia-del": state.personagem.magias.splice(Number(el.dataset.i), 1); t20Salvar(); render(); break;
    case "equip-add": state.personagem.equipamento.push({ nome: "", quantidade: 1, peso: 0 }); t20Salvar(); render(); break;
    case "equip-del": state.personagem.equipamento.splice(Number(el.dataset.i), 1); t20Salvar(); render(); break;
    case "benef-tipo": {
      const i = Number(el.dataset.i);
      state.personagem.origemBeneficios[i] = { tipo: el.value, valor: "" };
      t20Salvar(); render(); break;
    }
    case "importar-abrir": { const f = document.getElementById("t20-importar"); if(f) f.click(); break; }
    case "exp-backup": t20ExportarBackup(); break;
    case "exp-pdf": t20ExportarPDF(); break;
    case "exp-foundry": t20ExportarFoundry(); break;
    case "limpar-dados": {
      if(el.dataset.confirmado === "1"){ t20LimparTudo(); t20Tela = "inicio"; render(); t20Mensagem("Dados apagados deste navegador."); }
      else {
        el.dataset.confirmado = "1"; el.textContent = "Clique de novo para apagar tudo";
        setTimeout(() => { el.dataset.confirmado = ""; el.textContent = "Limpar meus dados"; }, 4000);
      }
      break;
    }
  }
}

function t20AoMudarCampo(el){
  if(el.dataset.acao === "modo"){
    state.modo = el.value; t20Salvar(); render(); return;
  }
  if(el.dataset.acao === "pericia"){
    const nome = el.dataset.nome;
    const lista = state.personagem.periciasEscolhidas;
    const i = lista.indexOf(nome);
    if(el.checked && i < 0) lista.push(nome);
    if(!el.checked && i >= 0) lista.splice(i, 1);
    t20Salvar(); render(); return;
  }
  if(el.dataset.campo){
    let v = el.value;
    if(el.dataset.tipo === "int"){ v = v === "" ? 0 : Math.trunc(Number(v)); if(!Number.isFinite(v)) v = 0; }
    if(el.type === "radio" && !el.checked) return;
    t20SetPath(state, el.dataset.campo, v);
    t20Salvar();
    if(el.dataset.recarregar) render();
  }
}

function t20Inicializar(){
  const app = document.getElementById("app");
  if(!app) return;
  app.addEventListener("click", ev => {
    const el = ev.target.closest("[data-acao]");
    if(!el || el.disabled || el.tagName === "SELECT" || el.tagName === "INPUT") return;
    t20Acao(el);
  });
  app.addEventListener("change", ev => {
    const el = ev.target;
    if(el.tagName === "INPUT" && el.type === "file") return;
    if(el.dataset && (el.dataset.acao || el.dataset.campo)) {
      if(el.dataset.acao === "benef-tipo") { t20Acao(el); return; }
      t20AoMudarCampo(el);
    }
  });
  app.addEventListener("input", ev => {
    const el = ev.target;
    if(el.dataset && el.dataset.campo && el.type !== "radio" && el.type !== "checkbox" && el.tagName !== "SELECT"){
      let v = el.value;
      if(el.dataset.tipo === "int"){ v = v === "" ? 0 : Math.trunc(Number(v)); if(!Number.isFinite(v)) v = 0; }
      t20SetPath(state, el.dataset.campo, v);
      t20Salvar();
    }
  });
  app.addEventListener("change", ev => {
    const el = ev.target;
    if(el.id === "t20-importar" && el.files && el.files[0]){
      const leitor = new FileReader();
      leitor.onload = () => {
        const r = t20ImportarBackup(String(leitor.result));
        if(!r.ok){ t20Mensagem(r.erro, true); return; }
        t20Tela = "ficha"; render();
        t20Mensagem("Backup importado.");
      };
      leitor.readAsText(el.files[0]);
    }
  });
}
