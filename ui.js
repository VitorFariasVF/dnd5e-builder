const app = document.getElementById("app");
function nomeCatalogo(catalogo,chave){return chave&&catalogo[chave]?catalogo[chave].nome:"Não definido";}
function valorFormatadoBonus(n){return n>=0?`+${n}`:`${n}`;}
function getSugestoesOrigem(){ return PERSONALITY_SUGGESTIONS[state.personagem.origem] || {tracos:[],ideais:[],vinculos:[],defeitos:[]}; }
function getClassFeaturesForLevel(classeKey,nivel){ return (CLASS_FEATURES[classeKey]||[]).filter(f=>f.level <= (nivel||1)); }
function renderClassFeaturesHtml(){ const lista=state.personagem.habilidadesClasseAtivas||[]; return lista.length ? `<ul class="clean">${lista.map(f=>`<li><strong>${f.nome}</strong> <span class="muted">(nível ${f.level})</span><br><small>${f.resumo}</small></li>`).join("")}</ul>` : '<p class="muted">Nenhuma habilidade de classe disponível.</p>'; }
function renderSubclassFeaturesHtml(){ const sub=getSubclassByKey(state.personagem.classe, state.personagem.subclasse); const lista=state.personagem.habilidadesSubclasseAtivas||[]; if(!sub) return '<p class="muted">Nenhuma subclasse escolhida.</p>'; return `<p><strong>${sub.nome}</strong> — ${sub.resumo}</p>${lista.length ? `<ul class="clean">${lista.map(f=>`<li><strong>${f.nome}</strong> <span class="muted">(nível ${f.level})</span><br><small>${f.resumo}</small></li>`).join('')}</ul>` : '<p class="muted">Sem traços ativos nesse nível.</p>'}`; }
function renderRecursosClasseHtml(){ const recursos=Object.values(state.personagem.recursosClasse||{}); if(!recursos.length) return '<p class="muted">Sem recursos com usos rastreáveis para a combinação atual.</p>'; return recursos.map(r=>`<div class="card-nested resource-card"><div><strong>${r.nome}</strong><br><small class="muted">Recarga: ${r.recarga}</small>${r.detalhe?`<br><small class="muted">${r.detalhe}</small>`:''}</div><div class="resource-controls"><button class="small secondary" onclick="alterarRecursoClasse(\'${r.id}\',-1)" ${r.atual<=0?'disabled':''}>-1</button><span class="resource-value">${r.atual}/${r.max}</span><button class="small" onclick="alterarRecursoClasse(\'${r.id}\',1)" ${r.atual>=r.max?'disabled':''}>+1</button></div></div>`).join('') + `<div class="actions"><button class="small secondary" onclick="restaurarRecursosClasse(\'curto\')">Descanso curto</button><button class="small secondary" onclick="restaurarRecursosClasse(\'longo\')">Descanso longo</button></div>`; }
function renderDerivedEffectsHtml(){ const efeitos=(typeof getDerivedEffects==='function')?getDerivedEffects(state.personagem):[]; if(!efeitos.length) return '<p class="muted">Nenhum efeito derivado adicional para a combinação atual.</p>'; return `<ul class="clean">${efeitos.map(e=>`<li><strong>${e.titulo}</strong>: ${e.valor}${e.detalhe?`<br><small class="muted">${e.detalhe}</small>`:''}</li>`).join('')}</ul>`; }
function renderPassoBase(titulo,conteudo){app.innerHTML=`<div class="card"><div class="toolbar-inline"><div class="step-indicator">Etapa ${state.etapa} de 11 — ${STEP_LABELS[state.etapa]}</div><button class="danger small" onclick="confirmarLimpezaLocalStorage()">Limpar dados salvos</button></div><h2>${titulo}</h2>${conteudo}</div>`;}
function avancarPara(etapa){state.etapa=etapa; salvarEstado(); render();}
function voltarPara(etapa){state.etapa=etapa; salvarEstado(); render();}

function render(){
  ensureStateShape();
  const mapa={1:renderEscolhaModo,2:renderOrigem,3:renderRaca,4:renderClasse,5:renderPericias,6:renderAtributos,7:renderCombate,8:renderInventario,9:renderMagia,10:renderPersonalidade,11:renderResumo};
  return (mapa[state.etapa] || renderResumo)();
}

function selecionarModo(modo){state.modo=modo; avancarPara(2);}
function renderEscolhaModo(){renderPassoBase("Escolha o modo de criação",`<p>No modo A, as validações são rígidas. No modo B, você pode customizar livremente.</p><div class="actions"><button onclick="selecionarModo('A')">Modo A — Criação Oficial</button><button onclick="selecionarModo('B')">Modo B — Criação Livre</button></div>`);}

function renderOrigem(){
  const options=Object.entries(BACKGROUNDS).map(([k,i])=>`<option value="${k}" ${state.personagem.origem===k?"selected":""}>${i.nome}</option>`).join("");
  renderPassoBase("Origem (Background)",`<label for="origem">Selecione uma origem</label><select id="origem" onchange="mostrarPreviewOrigem()"><option value="">Selecione</option>${options}</select><div id="preview"></div><div class="actions"><button class="secondary" onclick="voltarPara(1)">Voltar</button><button onclick="confirmarOrigem()">Avançar</button></div>`);
  mostrarPreviewOrigem();
}
function mostrarPreviewOrigem(){const key=document.getElementById("origem").value; const p=document.getElementById("preview"); if(!key||!BACKGROUNDS[key]) return p.innerHTML=""; const o=BACKGROUNDS[key]; const sug=PERSONALITY_SUGGESTIONS[key]||{tracos:[],ideais:[],vinculos:[],defeitos:[]}; p.innerHTML=`<div class="info-box"><p><strong>Perícias:</strong> ${o.pericias.join(", ")}</p><p><strong>Idiomas extras:</strong> ${o.idiomas}</p><p><strong>Ferramentas:</strong> ${o.ferramentas.length?o.ferramentas.join(", "):"Nenhuma"}</p><p><strong>Característica:</strong> ${o.caracteristica}</p><p><strong>Sugestões narrativas:</strong> ${(sug.tracos||[]).slice(0,1).concat((sug.ideais||[]).slice(0,1)).join(" • ") || "Padrão livre"}</p></div>`;}
function confirmarOrigem(){const key=document.getElementById("origem").value; state.personagem.origem=key; const erro=validarOrigem(); if(erro&&state.modo==="A") return alert(erro); if(erro&&state.modo==="B") state.personagem.customizado=true; if(key&&BACKGROUNDS[key]){const o=BACKGROUNDS[key]; state.personagem.periciasOrigem=[...o.pericias]; state.personagem.ferramentas=[...o.ferramentas]; state.personagem.idiomas=o.idiomas; state.personagem.caracteristicaOrigem=o.caracteristica; atualizarPericiasFinais(); } avancarPara(3);}

function renderRaca(){const options=Object.entries(RACES).map(([k,i])=>`<option value="${k}" ${state.personagem.raca===k?"selected":""}>${i.nome}</option>`).join(""); renderPassoBase("Raça",`<label for="raca">Selecione uma raça</label><select id="raca" onchange="mostrarPreviewRaca()"><option value="">Selecione</option>${options}</select><div id="preview"></div><div class="actions"><button class="secondary" onclick="voltarPara(2)">Voltar</button><button onclick="confirmarRaca()">Avançar</button></div>`); mostrarPreviewRaca();}
function mostrarPreviewRaca(){const key=document.getElementById("raca").value; const p=document.getElementById("preview"); if(!key||!RACES[key]) return p.innerHTML=""; const r=RACES[key]; const bonus=Object.entries(r.bonusAtributos).map(([k,v])=>`${ATTRIBUTE_LABELS[k]} +${v}`).join(", "); p.innerHTML=`<div class="info-box"><p><strong>Bônus raciais:</strong> ${bonus||"Nenhum"}</p><p><strong>Idiomas:</strong> ${r.idiomas.join(", ")}</p><p><strong>Traços:</strong> ${r.traits.join(", ")}</p><p><strong>Deslocamento:</strong> ${r.deslocamento} pés</p></div>`;}
function confirmarRaca(){const key=document.getElementById("raca").value; state.personagem.raca=key; const erro=validarRaca(); if(erro&&state.modo==="A") return alert(erro); if(erro&&state.modo==="B") state.personagem.customizado=true; if(key&&RACES[key]){const r=RACES[key]; state.personagem.bonusRaciais={...r.bonusAtributos}; state.personagem.traitsRaciais=[...r.traits]; state.personagem.idiomasRaciais=[...r.idiomas]; state.personagem.deslocamento=r.deslocamento; recalcularAtributosFinais();} avancarPara(4);}

function buildClassPreviewHtml(key, nivel, selectedOverride){
  try {
    if(!key || !CLASSES[key]) return "";
    const c = CLASSES[key];
    const selected = selectedOverride !== undefined ? selectedOverride : (state.personagem.subclasse || "");
    const features = getClassFeaturesForLevel(key, nivel);
    const attacksPerAction = getAttacksPerAction(key, nivel);
    const slots = SPELLCASTERS[key]
      ? (key === "bruxo"
        ? `${SPELL_SLOTS.warlock[nivel][0]||0} espaço(s) de pacto de ${SPELL_SLOTS.warlockCircle[nivel]}º círculo`
        : (SPELLCASTERS[key].meioConjurador ? SPELL_SLOTS.half[nivel] : SPELL_SLOTS.full[nivel]).map((v,i)=>v?`${i+1}º:${v}`:"").filter(Boolean).join(" • ") || "Sem espaços")
      : "Não";
    const unlock = getSubclassUnlockLevel(key);
    const subclasses = getSubclassOptions(key);
    const validSelected = subclasses.some(s => s.key === selected) ? selected : "";
    const shouldShowSub = nivel >= unlock && subclasses.length;
    const subSelect = shouldShowSub
      ? `<label for="subclasse">Subclasse</label><select id="subclasse" onchange="mostrarPreviewClasse()"><option value="">Selecione</option>${subclasses.map(s=>`<option value="${s.key}" ${validSelected===s.key?"selected":""}>${s.nome}</option>`).join("")}</select>`
      : `<p class="muted">Subclasse desbloqueia no nível ${unlock}.</p>`;
    const previewState = {...state.personagem, classe:key, nivel, subclasse:validSelected || null};
    if(typeof sanitizeClassOptionState === 'function') previewState.opcoesClasse = sanitizeClassOptionState(previewState);
    const sub = getSubclassByKey(key, validSelected);
    const recursos = getClassResources(key, nivel, previewState);
    const opcoesHtml = typeof renderClassOptionsEditor === 'function' ? renderClassOptionsEditor(key, nivel, validSelected) : '';
    return `<div class="info-box"><p><strong>Dado de vida:</strong> d${c.dadoVida}</p><p><strong>Resistências:</strong> ${c.saves.join(", ")}</p><p><strong>Proficiências:</strong> ${c.proficiencias.join(", ")}</p><p><strong>Perícias da classe:</strong> escolha ${c.escolhaPericias.quantidade}</p><p><strong>Conjuração:</strong> ${SPELLCASTERS[key] ? "Sim" : "Não"}</p><p><strong>Espaços no nível ${nivel}:</strong> ${slots}</p><p><strong>Ataques por ação:</strong> ${attacksPerAction}</p><p><strong>Equipamento inteligente:</strong> ${(EQUIPMENT_LOADOUTS[key]||[]).length} grupo(s) de escolha</p>${subSelect}<p><strong>Habilidades de classe no nível ${nivel}:</strong></p>${(features.map(f=>`<div><strong>${f.nome}</strong> <small class="muted">(nível ${f.level})</small></div>`).join("") || `<div class="muted">Nenhuma listada.</div>`)}${sub?`<div class="card-nested"><p><strong>${sub.nome}</strong></p><p class="muted">${sub.resumo}</p>${(getSubclassFeaturesForLevel(key, validSelected, nivel).map(f=>`<div><strong>${f.nome}</strong> <small class="muted">(nível ${f.level})</small></div>`).join("") || `<div class="muted">Sem traços ativos.</div>`)}</div>`:""}${recursos.length?`<div class="card-nested"><p><strong>Recursos rastreáveis</strong></p>${recursos.map(r=>`<div>${r.nome}: ${r.max}/${r.max} • ${r.recarga}</div>`).join("")}</div>`:""}<div class="card-nested"><p><strong>Escolhas e recursos configuráveis</strong></p>${opcoesHtml}</div></div>`;
  } catch (err) {
    console.error('Erro ao montar preview da classe:', err);
    return `<div class="alert error">Não foi possível carregar os detalhes da classe agora. Tente selecionar a classe novamente.</div>`;
  }
}
function renderClasse(){
  const classeAtual = state.personagem.classe || "";
  const options = Object.entries(CLASSES).map(([k,i])=>`<option value="${k}" ${classeAtual===k?"selected":""}>${i.nome}</option>`).join("");
  const nivelAtual = state.personagem.nivel || 1;
  const nivelOptions = Array.from({length:20},(_,i)=>i+1).map(n=>`<option value="${n}" ${nivelAtual===n?"selected":""}>Nível ${n}</option>`).join("");
  const previewHtml = buildClassPreviewHtml(classeAtual, nivelAtual, state.personagem.subclasse || "");
  renderPassoBase("Classe",`<label for="classe">Selecione uma classe</label><select id="classe" onchange="mostrarPreviewClasse()"><option value="">Selecione</option>${options}</select><label for="nivel">Nível inicial / atual</label><select id="nivel" onchange="mostrarPreviewClasse()">${nivelOptions}</select><div id="preview">${previewHtml}</div><div class="actions"><button class="secondary" onclick="voltarPara(3)">Voltar</button><button onclick="confirmarClasse()">Avançar</button></div>`);
}
function mostrarPreviewClasse(){const key=document.getElementById("classe").value; const nivel=Number(document.getElementById("nivel")?.value || state.personagem.nivel || 1); const p=document.getElementById("preview"); if(!key||!CLASSES[key]) return p.innerHTML=""; const c=CLASSES[key]; const features=getClassFeaturesForLevel(key,nivel); const attacksPerAction=getAttacksPerAction(key,nivel); const slots=SPELLCASTERS[key] ? (key==="bruxo" ? `${SPELL_SLOTS.warlock[nivel][0]||0} espaço(s) de pacto de ${SPELL_SLOTS.warlockCircle[nivel]}º círculo` : (SPELLCASTERS[key].meioConjurador?SPELL_SLOTS.half[nivel]:SPELL_SLOTS.full[nivel]).map((v,i)=>v?`${i+1}º:${v}`:"").filter(Boolean).join(" • ") || "Sem espaços") : "Não"; const unlock=getSubclassUnlockLevel(key); const subclasses=getSubclassOptions(key); const selected=document.getElementById("subclasse")?.value || state.personagem.subclasse || ""; const shouldShowSub=nivel>=unlock && subclasses.length; const subSelect=shouldShowSub ? `<label for="subclasse">Subclasse</label><select id="subclasse" onchange="mostrarPreviewClasse()"><option value="">Selecione</option>${subclasses.map(s=>`<option value="${s.key}" ${selected===s.key?"selected":""}>${s.nome}</option>`).join("")}</select>` : `<p class="muted">Subclasse desbloqueia no nível ${unlock}.</p>`; const sub=getSubclassByKey(key, selected); const recursos=getClassResources(key, nivel, state.personagem); p.innerHTML=`<div class="info-box"><p><strong>Dado de vida:</strong> d${c.dadoVida}</p><p><strong>Resistências:</strong> ${c.saves.join(", ")}</p><p><strong>Proficiências:</strong> ${c.proficiencias.join(", ")}</p><p><strong>Perícias da classe:</strong> escolha ${c.escolhaPericias.quantidade}</p><p><strong>Conjuração:</strong> ${SPELLCASTERS[key] ? "Sim" : "Não"}</p><p><strong>Espaços no nível ${nivel}:</strong> ${slots}</p><p><strong>Ataques por ação:</strong> ${attacksPerAction}</p><p><strong>Equipamento inteligente:</strong> ${(EQUIPMENT_LOADOUTS[key]||[]).length} grupo(s) de escolha</p>${subSelect}<p><strong>Habilidades de classe no nível ${nivel}:</strong></p>${(features.map(f=>`<div><strong>${f.nome}</strong> <small class="muted">(nível ${f.level})</small></div>`).join("") || `<div class="muted">Nenhuma listada.</div>`)}${sub?`<div class="card-nested"><p><strong>${sub.nome}</strong></p><p class="muted">${sub.resumo}</p>${(getSubclassFeaturesForLevel(key, selected, nivel).map(f=>`<div><strong>${f.nome}</strong> <small class="muted">(nível ${f.level})</small></div>`).join("") || `<div class="muted">Sem traços ativos.</div>`)}</div>`:""}${recursos.length?`<div class="card-nested"><p><strong>Recursos rastreáveis</strong></p>${recursos.map(r=>`<div>${r.nome}: ${r.max}/${r.max} • ${r.recarga}</div>`).join("")}</div>`:""}</div>`;}
function confirmarClasse(){const key=document.getElementById("classe").value; state.personagem.classe=key; state.personagem.nivel=Math.max(1, Math.min(20, Number(document.getElementById("nivel")?.value || 1))); state.personagem.subclasse=document.getElementById("subclasse")?.value || null; const erro=validarClasse(); if(erro&&state.modo==="A") return alert(erro); if(erro&&state.modo==="B") state.personagem.customizado=true; if(key&&CLASSES[key]){const c=CLASSES[key]; state.personagem.dadoVida=c.dadoVida; state.personagem.savesClasse=[...c.saves]; state.personagem.proficienciasClasse=[...c.proficiencias]; state.personagem.equipamentoClasse=[...c.equipamento]; state.personagem.periciasClasseSelecionadas=[]; state.personagem.equipamentoInicialEscolhas={}; state.personagem.equipamentoInicialValores={}; configurarMagiaDaClasse(); recalcularTudo();} avancarPara(5);} 
function renderPericias(){const classe=CLASSES[state.personagem.classe]; if(!classe) return avancarPara(4); const regra=classe.escolhaPericias; const checks=regra.opcoes.map(skill=>{const checked=state.personagem.periciasClasseSelecionadas.includes(skill)?"checked":""; const disabled=state.personagem.periciasOrigem.includes(skill)?"disabled":""; return `<label style="font-weight:normal;"><input type="checkbox" value="${skill}" ${checked} ${disabled} onchange="atualizarSelecaoPericias(this)" /> ${skill} ${disabled?'<small class="muted">(já recebida pela origem)</small>':""}</label>`;}).join(""); renderPassoBase("Perícias",`<p>Escolha <strong>${regra.quantidade}</strong> perícias da classe. A origem já concedeu: ${state.personagem.periciasOrigem.join(", ")||"nenhuma"}.</p><div class="grid grid-2">${checks}</div><div class="actions"><button class="secondary" onclick="voltarPara(4)">Voltar</button><button onclick="confirmarPericias()">Avançar</button></div>`);}
function atualizarSelecaoPericias(input){let arr=[...state.personagem.periciasClasseSelecionadas]; if(input.checked) arr.push(input.value); else arr=arr.filter(v=>v!==input.value); state.personagem.periciasClasseSelecionadas=[...new Set(arr)];}
function confirmarPericias(){const erro=validarPericias(); if(erro&&state.modo==="A") return alert(erro); if(erro&&state.modo==="B") state.personagem.customizado=true; atualizarPericiasFinais(); recalcularTudo(); avancarPara(6);} 
function atualizarPericiasFinais(){state.personagem.periciasFinais=[...new Set([...state.personagem.periciasOrigem,...state.personagem.periciasClasseSelecionadas])];}

function renderAtributos(){
  const metodo=state.personagem.metodoAtributos||"standard";
  let corpo=`<label for="nome">Nome do personagem</label><input id="nome" value="${state.personagem.nome||""}" placeholder="Ex.: Tharion" /><label for="jogador">Jogador</label><input id="jogador" value="${state.personagem.jogador||""}" placeholder="Seu nome" /><label for="metodo">Método de atributos</label><select id="metodo" onchange="trocarMetodoAtributos()"><option value="standard" ${metodo==="standard"?"selected":""}>Standard Array</option><option value="pointbuy" ${metodo==="pointbuy"?"selected":""}>Point Buy</option></select>`;
  if(metodo==="standard"){
    corpo += ATTRIBUTE_LIST.map(attr=>`<label>${ATTRIBUTE_LABELS[attr]}<select id="attr_${attr}">${ATTRIBUTE_METHODS.standard.valores.map(v=>`<option value="${v}" ${state.personagem.atributosBase[attr]===v?"selected":""}>${v}</option>`).join("")}</select></label>`).join("");
  } else {
    const usados=calcularPontosUsadosPointBuy(state.personagem.atributosBase); const restantes=ATTRIBUTE_METHODS.pointbuy.pontos-usados;
    corpo += `<div class="alert ${restantes<0?'error':'success'}">Pontos gastos: ${usados} / ${ATTRIBUTE_METHODS.pointbuy.pontos} — Restantes: ${restantes}</div>`;
    corpo += ATTRIBUTE_LIST.map(attr=>`<div class="point-buy-row"><strong style="min-width:140px">${ATTRIBUTE_LABELS[attr]}</strong><button type="button" onclick="ajustarPointBuy('${attr}',-1)">-</button><span class="score">${state.personagem.atributosBase[attr]}</span><button type="button" onclick="ajustarPointBuy('${attr}',1)">+</button></div>`).join("");
  }
  corpo += `<div class="info-box"><strong>Resultado final com bônus raciais:</strong> ${ATTRIBUTE_LIST.map(attr=>`${ATTRIBUTE_LABELS[attr]} ${state.personagem.atributos[attr]} (${valorFormatadoBonus(calcularMod(state.personagem.atributos[attr]))})`).join(" • ")}</div><div class="actions"><button class="secondary" onclick="voltarPara(5)">Voltar</button><button onclick="confirmarAtributos()">Avançar</button></div>`;
  renderPassoBase("Atributos",corpo);
}
function trocarMetodoAtributos(){state.personagem.metodoAtributos=document.getElementById("metodo").value; renderAtributos();}
function ajustarPointBuy(attr,delta){const atual=state.personagem.atributosBase[attr]; const novo=Math.max(8,Math.min(15,atual+delta)); const copia={...state.personagem.atributosBase,[attr]:novo}; if(calcularPontosUsadosPointBuy(copia) <= ATTRIBUTE_METHODS.pointbuy.pontos){state.personagem.atributosBase=copia; recalcularAtributosFinais(); salvarEstado();} renderAtributos();}
function recalcularAtributosFinais(){const base=state.personagem.atributosBase; state.personagem.atributos=Object.fromEntries(ATTRIBUTE_LIST.map(attr=>[attr,(base[attr]||0)+(state.personagem.bonusRaciais[attr]||0)]));}
function confirmarAtributos(){state.personagem.nome=document.getElementById("nome").value.trim(); state.personagem.jogador=document.getElementById("jogador").value.trim(); if(state.personagem.metodoAtributos==="standard"){ATTRIBUTE_LIST.forEach(attr=>state.personagem.atributosBase[attr]=parseInt(document.getElementById(`attr_${attr}`).value,10)); if(state.modo==="A" && !validarStandardArray(state.personagem.atributosBase)) return alert("Os valores precisam corresponder exatamente ao Standard Array.");} else if(state.modo==="A" && !validarPointBuy(state.personagem.atributosBase)){return alert("O Point Buy excedeu 27 pontos.");} recalcularAtributosFinais(); recalcularTudo(); avancarPara(7);}

function renderCombate(){
  recalcularTudo();
  const armorOpts=Object.entries(ARMORS).map(([k,v])=>`<option value="${k}" ${state.personagem.combate.armadura===k?"selected":""}>${v.nome} • ${capitalizarTipoArmadura(v.tipo)} • CA ${montarBaseCaLabel(v)} • ${formatarMoedaGp(v.precoGp||0)}</option>`).join("");
  const weaponOpts=Object.entries(WEAPONS).map(([k,v])=>`<option value="${k}" ${state.personagem.combate.armaPrincipal===k?"selected":""}>${v.nome} • ${v.categoria} • ${v.dano} • ${v.critico} • ${formatarMoedaGp(v.precoGp||0)}</option>`).join("");
  const weaponOpts2=Object.entries(WEAPONS).map(([k,v])=>`<option value="${k}" ${state.personagem.combate.armaSecundaria===k?"selected":""}>${v.nome} • ${v.categoria} • ${v.dano} • ${v.critico} • ${formatarMoedaGp(v.precoGp||0)}</option>`).join("");
  const loadout = renderEquipamentoInicial();
  renderPassoBase("Combate e Equipamento Inicial",`<div class="grid grid-2"><label>Armadura<select id="armadura" onchange="atualizarPreviewCombate()">${armorOpts}</select></label><label>Arma principal<select id="armaPrincipal" onchange="atualizarPreviewCombate()">${weaponOpts}</select></label><label>Arma secundária<select id="armaSecundaria" onchange="atualizarPreviewCombate()">${weaponOpts2}</select></label><label><input type="checkbox" id="escudo" ${state.personagem.combate.escudo?"checked":""} onchange="atualizarPreviewCombate()" /> Usar escudo</label></div><div id="combatePreviewBox"></div>${loadout}<div class="actions"><button class="secondary" onclick="voltarPara(6)">Voltar</button><button onclick="confirmarCombate()">Avançar</button></div>`);
  atualizarPreviewCombate();
}
function renderEquipamentoInicial(){ const loadout=EQUIPMENT_LOADOUTS[state.personagem.classe]||[]; if(!loadout.length) return ""; return `<h3>Equipamento inicial inteligente</h3><p class="muted">Você pode escolher o item normalmente ou marcar para receber o valor em moedas.</p><div class="grid">${loadout.map(group=>{ const selectedIndex=String(state.personagem.equipamentoInicialEscolhas[group.id]??""); const selectedChoice=group.choices[Number(selectedIndex)]; const valor=selectedChoice?getChoiceValueGp(selectedChoice):0; return `<div class="card-nested"><label>${group.label}<select id="equip_${group.id}" onchange="atualizarPreviewEquipamentoInicial()"><option value="">Selecione</option>${group.choices.map((choice,idx)=>`<option value="${idx}" ${selectedIndex===String(idx)?"selected":""}>${choice.label} • ${formatarMoedaGp(getChoiceValueGp(choice))}</option>`).join("")}</select></label><label class="checkbox-row"><input type="checkbox" id="equip_valor_${group.id}" ${(state.personagem.equipamentoInicialValores?.[group.id])?"checked":""} onchange="atualizarPreviewEquipamentoInicial()" /> Receber valor em vez dos itens ${selectedChoice?`(${formatarMoedaGp(valor)})`:''}</label><div id="equip_preview_${group.id}" class="muted">${selectedChoice?renderChoiceItemsPreview(selectedChoice):"Selecione uma opção para ver os detalhes."}</div></div>`; }).join("")}</div>`; }
function confirmarCombate(){ state.personagem.combate.armadura=document.getElementById("armadura").value; state.personagem.combate.armaPrincipal=document.getElementById("armaPrincipal").value; state.personagem.combate.armaSecundaria=document.getElementById("armaSecundaria").value; state.personagem.combate.escudo=document.getElementById("escudo").checked; capturarEscolhasEquipamentoInicial(); aplicarEquipamentoInicial(); recalcularTudo(); const erro=validarCombate()||validarEquipamentoInicial(); if(erro&&state.modo==="A") return alert(erro); if(erro&&state.modo==="B") state.personagem.customizado=true; avancarPara(8);} 
function capturarEscolhasEquipamentoInicial(){ const loadout=EQUIPMENT_LOADOUTS[state.personagem.classe]||[]; state.personagem.equipamentoInicialValores = state.personagem.equipamentoInicialValores || {}; loadout.forEach(group=>{ const el=document.getElementById(`equip_${group.id}`); const valor=document.getElementById(`equip_valor_${group.id}`); if(el) state.personagem.equipamentoInicialEscolhas[group.id]=el.value; if(valor) state.personagem.equipamentoInicialValores[group.id]=valor.checked; }); }
function adicionarOuSomarItem(item){ const idx=state.personagem.inventario.itens.findIndex(i=>i.nome===item.nome); if(idx>=0){ state.personagem.inventario.itens[idx].quantidade += item.quantidade; state.personagem.inventario.itens[idx].pesoTotal = Number((state.personagem.inventario.itens[idx].quantidade * state.personagem.inventario.itens[idx].pesoUnitario).toFixed(2)); } else { state.personagem.inventario.itens.push(item); } }
function aplicarEquipamentoInicial(){ state.personagem.inventario.itens=[]; state.personagem.inventario.moedas = Object.assign({pp:0,gp:0,ep:0,sp:0,cp:0}, state.personagem.inventario.moedas || {}); const loadout=EQUIPMENT_LOADOUTS[state.personagem.classe]||[]; for(const group of loadout){ const choiceIndex=state.personagem.equipamentoInicialEscolhas[group.id]; if(choiceIndex===""||choiceIndex==null) continue; const choice=group.choices[Number(choiceIndex)]; if(state.personagem.equipamentoInicialValores?.[group.id]){ state.personagem.inventario.moedas.gp = Number(((state.personagem.inventario.moedas.gp||0) + getChoiceValueGp(choice)).toFixed(2)); continue; } (choice.items||[]).forEach(entry=>{ if(entry.type==="armor"){ state.personagem.combate.armadura=entry.key; const armor=ARMORS[entry.key]; adicionarOuSomarItem({key:entry.key,nome:armor.nome,quantidade:entry.qty,pesoUnitario:armor.peso,pesoTotal:armor.peso*entry.qty,origem:"equipamento"}); } else if(entry.type==="weapon"){ const weapon=WEAPONS[entry.key]; adicionarOuSomarItem({key:entry.key,nome:weapon.nome,quantidade:entry.qty,pesoUnitario:weapon.peso,pesoTotal:weapon.peso*entry.qty,origem:"equipamento"}); } else if(entry.type==="shield"){ state.personagem.combate.escudo=true; adicionarOuSomarItem({key:"escudo",nome:"Escudo",quantidade:entry.qty,pesoUnitario:6,pesoTotal:6*entry.qty,origem:"equipamento"}); } else if(entry.type==="item"){ const item=ITEM_CATALOG[entry.key]; adicionarOuSomarItem({key:entry.key,nome:item.nome,quantidade:entry.qty,pesoUnitario:item.peso,pesoTotal:Number((item.peso*entry.qty).toFixed(2)),origem:"equipamento"}); } }); } }

function renderInventario(){const options=Object.entries(ITEM_CATALOG).map(([k,i])=>`<option value="${k}">${i.nome}</option>`).join(""); const linhas=state.personagem.inventario.itens.map((item,idx)=>`<tr><td>${item.nome}</td><td>${item.quantidade}</td><td>${item.pesoTotal}</td><td><button class="small secondary" onclick="removerItemInventario(${idx})">Remover</button></td></tr>`).join("")||"<tr><td colspan='4'>Nenhum item.</td></tr>"; renderPassoBase("Inventário",`<div class="inline-row"><div style="flex:1"><label>Novo item<select id="novoItem">${options}</select></label></div><div><label>Qtd<input id="qtdItem" type="number" min="1" value="1"></label></div><div><button onclick="adicionarItemInventario()">Adicionar</button></div></div><table class="table-like"><thead><tr><th>Item</th><th>Qtd</th><th>Peso</th><th></th></tr></thead><tbody>${linhas}</tbody></table><div class="grid grid-3"><label>PP<input id="pp" type="number" value="${state.personagem.inventario.moedas.pp}"></label><label>GP<input id="gp" type="number" value="${state.personagem.inventario.moedas.gp}"></label><label>EP<input id="ep" type="number" value="${state.personagem.inventario.moedas.ep}"></label><label>SP<input id="sp" type="number" value="${state.personagem.inventario.moedas.sp}"></label><label>CP<input id="cp" type="number" value="${state.personagem.inventario.moedas.cp}"></label></div><div class="info-box"><p><strong>Peso total:</strong> ${state.personagem.inventario.pesoTotal}</p><p><strong>Capacidade de carga:</strong> ${state.personagem.inventario.capacidadeCarga}</p></div><div class="actions"><button class="secondary" onclick="voltarPara(7)">Voltar</button><button onclick="confirmarInventario()">Avançar</button></div>`);} 
function adicionarItemInventario(){const key=document.getElementById("novoItem").value; const qtd=parseInt(document.getElementById("qtdItem").value,10)||1; const item=ITEM_CATALOG[key]; adicionarOuSomarItem({key,nome:item.nome,quantidade:qtd,pesoUnitario:item.peso,pesoTotal:Number((item.peso*qtd).toFixed(2))}); recalcularTudo(); salvarEstado(); renderInventario();}
function removerItemInventario(index){state.personagem.inventario.itens.splice(index,1); recalcularTudo(); salvarEstado(); renderInventario();}
function confirmarInventario(){state.personagem.inventario.moedas={pp:parseInt(document.getElementById("pp").value,10)||0,gp:parseInt(document.getElementById("gp").value,10)||0,ep:parseInt(document.getElementById("ep").value,10)||0,sp:parseInt(document.getElementById("sp").value,10)||0,cp:parseInt(document.getElementById("cp").value,10)||0}; recalcularTudo(); const erro=validarInventarioPeso(); if(erro&&state.modo==="A") return alert(erro); if(erro&&state.modo==="B") state.personagem.customizado=true; avancarPara(9);}

function configurarMagiaDaClasse(){const cfg=SPELLCASTERS[state.personagem.classe]; const magia=state.personagem.magia; if(!cfg){state.personagem.magia={ehConjurador:false,habilidade:null,tipo:null,cdMagia:null,ataqueMagia:null,espacos:[],espacosAtuais:[],nivelEspacosBruxo:null,cantripsConhecidos:0,magiasConhecidas:0,magiasPreparadas:0,listaTruques:[],listaMagias:[],grimorio:[],concentracaoAtiva:"",rituaisDisponiveis:[]}; return;} magia.ehConjurador=true; magia.habilidade=cfg.habilidade; magia.tipo=cfg.tipo; magia.listaTruques = magia.listaTruques || []; magia.listaMagias = magia.listaMagias || []; }
function listarMagiasDisponiveisPorCirculo(){ return (typeof getCharacterSpellLists==='function' ? getCharacterSpellLists(state.personagem.classe, state.personagem.subclasse, state.personagem.nivel||1) : (SPELL_LISTS[state.personagem.classe] || {truques:[]})); }
function recalcularMagia(){const classe=state.personagem.classe; const nivel=state.personagem.nivel||1; const cfg=SPELLCASTERS[classe]; const magia=state.personagem.magia; if(!cfg){configurarMagiaDaClasse(); return;} magia.ehConjurador=true; magia.habilidade=cfg.habilidade; magia.tipo=cfg.tipo; const modHab=calcularMod(state.personagem.atributos[cfg.habilidade]||10); magia.cdMagia=8+state.personagem.bonusProficiencia+modHab; magia.ataqueMagia=state.personagem.bonusProficiencia+modHab; if(classe==="bruxo"){ magia.espacos=[SPELL_SLOTS.warlock[nivel][0]||0]; magia.nivelEspacosBruxo=SPELL_SLOTS.warlockCircle[nivel]; } else { magia.espacos=(cfg.meioConjurador?SPELL_SLOTS.half[nivel]:SPELL_SLOTS.full[nivel]).slice(); magia.nivelEspacosBruxo=null; } if(!Array.isArray(magia.espacosAtuais) || magia.espacosAtuais.length!==magia.espacos.length){magia.espacosAtuais = magia.espacos.slice();} else {magia.espacosAtuais = magia.espacosAtuais.map((v,i)=>Math.min(v, magia.espacos[i]||0));} magia.cantripsConhecidos=(cfg.cantrips&&cfg.cantrips[nivel-1])||0; magia.magiasConhecidas=(cfg.magias&&cfg.magias[nivel-1])||0; magia.magiasPreparadas=cfg.tipo==="preparadas" ? Math.max(1,modHab+nivel) : 0; magia.rituaisDisponiveis=(magia.listaMagias||[]).filter(nome=>{const clean=nome.replace(/ \(.+\)$/,''); return Object.values(SPELL_DETAILS[classe]||{}).some(bucket=>bucket[clean]?.ritual);}); }
function renderMagia(){ const magia=state.personagem.magia; if(!magia.ehConjurador){ return renderPassoBase("Magia",`<div class="info-box"><p>Classe sem magia.</p></div><div class="actions"><button class="secondary" onclick="voltarPara(8)">Voltar</button><button onclick="confirmarMagia()">Avançar</button></div>`);} const listas=listarMagiasDisponiveisPorCirculo(); const bonusSpells=(typeof getCharacterBonusSpellSummary==='function'?getCharacterBonusSpellSummary(state.personagem):[]); const circulosDisponiveis=Object.keys(listas).filter(k=>k!=="truques" && Number(k)<=obterMaiorCirculoDisponivel()); const truquesRestantes=Math.max(0,(magia.cantripsConhecidos||0)-(magia.listaTruques||[]).length); const limiteMagias=magia.tipo==="conhecidas" ? (magia.magiasConhecidas||0) : (magia.magiasPreparadas||0); const magiasRestantes=Math.max(0, limiteMagias-(magia.listaMagias||[]).length); const truqueOptions=(listas.truques||[]).filter(nome=>!(magia.listaTruques||[]).includes(nome)).map(nome=>`<option value="${nome}">${nome}</option>`).join(""); const circleOptions=circulosDisponiveis.map(k=>`<option value="${k}">${k}º círculo</option>`).join(""); const primeiroCirculo=circulosDisponiveis[0] || "1"; const magiaOptions=((listas[primeiroCirculo]||[]).filter(nome=>!(magia.listaMagias||[]).includes(`${nome} (${primeiroCirculo}º)`))).map(nome=>`<option value="${nome}">${nome}</option>`).join(""); const truques=(magia.listaTruques||[]).map((nome,idx)=>`<tr><td>${nome}</td><td></td><td><button class="small secondary" onclick="removerMagia('truque',${idx})">Remover</button></td></tr>`).join(""); const magias=(magia.listaMagias||[]).map((nome,idx)=>`<tr><td>${nome}</td><td></td><td><button class="small secondary" onclick="removerMagia('magia',${idx})">Remover</button></td></tr>`).join(""); renderPassoBase("Magia",`<div class="grid grid-2"><div class="spell-card"><p><strong>Habilidade:</strong> ${ATTRIBUTE_LABELS[magia.habilidade]}</p><p><strong>CD:</strong> ${magia.cdMagia}</p><p><strong>Ataque mágico:</strong> ${valorFormatadoBonus(magia.ataqueMagia)}</p><p><strong>Espaços:</strong> ${magia.espacos.map((v,i)=>v?`${i+1}º ${magia.espacosAtuais[i]}/${v}`:"").filter(Boolean).join(" • ") || "Nenhum"}</p>${magia.nivelEspacosBruxo?`<p><strong>Círculo dos espaços:</strong> ${magia.nivelEspacosBruxo}º</p>`:""}</div><div class="spell-card"><p><strong>Truques:</strong> ${(magia.listaTruques||[]).length}/${magia.cantripsConhecidos}</p><p><strong>${magia.tipo==="conhecidas"?"Magias conhecidas":"Magias preparadas"}:</strong> ${(magia.listaMagias||[]).length}/${limiteMagias}</p><p><strong>Truques restantes:</strong> ${truquesRestantes}</p><p><strong>Magias restantes:</strong> ${magiasRestantes}</p></div></div>${bonusSpells.length?`<div class="info-box"><p><strong>Magias bônus da subclasse:</strong></p><p>${bonusSpells.join(' • ')}</p><p class="muted">Essas magias ficam destacadas para subclasses de Xanathar e ajudam na importação/referência do Foundry.</p></div>`:''}<div class="grid grid-2"><div><h3>Truques</h3><div class="inline-row"><div style="flex:1"><select id="novoTruque"><option value="">Selecione</option>${truqueOptions}</select></div><div><button onclick="adicionarMagia('truque')" ${(truquesRestantes<=0)?'disabled':''}>Adicionar</button></div></div><table class="table-like"><tbody>${truques||'<tr><td>Nenhum truque adicionado.</td><td></td><td></td></tr>'}</tbody></table></div><div><h3>Magias</h3><div class="inline-row"><div><select id="circuloMagia" onchange="atualizarOpcoesMagia()">${circleOptions}</select></div><div style="flex:1"><select id="novaMagia"><option value="">Selecione</option>${magiaOptions}</select></div><div><button onclick="adicionarMagia('magia')" ${(magiasRestantes<=0)?'disabled':''}>Adicionar</button></div></div><p class="muted">Mostrando apenas círculos disponíveis no nível atual.</p><table class="table-like"><tbody>${magias||'<tr><td>Nenhuma magia adicionada.</td><td></td><td></td></tr>'}</tbody></table></div></div><div class="actions"><button class="secondary" onclick="voltarPara(8)">Voltar</button><button onclick="confirmarMagia()">Avançar</button></div>`); }
function atualizarOpcoesMagia(){ const selectCirculo=document.getElementById("circuloMagia"); const selectMagia=document.getElementById("novaMagia"); if(!selectCirculo||!selectMagia) return; const lista=(listarMagiasDisponiveisPorCirculo()[selectCirculo.value]||[]).filter(nome=>!(state.personagem.magia.listaMagias||[]).includes(`${nome} (${selectCirculo.value}º)`)); selectMagia.innerHTML=`<option value="">Selecione</option>` + lista.map(nome=>`<option value="${nome}">${nome}</option>`).join(""); }
function adicionarMagia(tipo){ const magia=state.personagem.magia; if(tipo==="truque"){const nome=document.getElementById("novoTruque").value; if(!nome||magia.listaTruques.includes(nome)) return; if((magia.listaTruques||[]).length >= (magia.cantripsConhecidos||0)) return alert("Você já atingiu o limite de truques desta classe/nível."); magia.listaTruques.push(nome);} else {const nome=document.getElementById("novaMagia").value; const circulo=document.getElementById("circuloMagia").value; if(!nome) return; const limite = magia.tipo==="conhecidas" ? (magia.magiasConhecidas||0) : (magia.magiasPreparadas||0); if((magia.listaMagias||[]).length >= limite) return alert("Você já atingiu o limite de magias desta classe/nível."); const registrado=`${nome} (${circulo}º)`; if(magia.listaMagias.includes(registrado)) return; magia.listaMagias.push(registrado); const detalhe=(SPELL_DETAILS[state.personagem.classe]?.[circulo]||{})[nome]; if(detalhe?.concentracao && !magia.concentracaoAtiva) magia.concentracaoAtiva=nome; if(state.personagem.classe==="mago" && !magia.grimorio.includes(nome)) magia.grimorio.push(nome);} recalcularMagia(); salvarEstado(); renderMagia(); }
function removerMagia(tipo,index){ if(tipo==="truque") state.personagem.magia.listaTruques.splice(index,1); else state.personagem.magia.listaMagias.splice(index,1); recalcularMagia(); salvarEstado(); renderMagia(); }
function gastarEspaco(circulo){ const erro=validarUsoEspaco(circulo); if(erro&&state.modo==="A") return alert(erro); const idx=Number(circulo)-1; if((state.personagem.magia.espacosAtuais[idx]||0)>0) state.personagem.magia.espacosAtuais[idx]-=1; salvarEstado(); renderMagia(); }
function descansoCurto(){ if(state.personagem.classe==="bruxo") state.personagem.magia.espacosAtuais=state.personagem.magia.espacos.slice(); state.personagem.magia.concentracaoAtiva=""; salvarEstado(); renderMagia(); }
function descansoLongo(){ state.personagem.magia.espacosAtuais=state.personagem.magia.espacos.slice(); state.personagem.magia.concentracaoAtiva=""; salvarEstado(); renderMagia(); }
function confirmarMagia(){ const erroEstrutural=validarMagia(); const erroSelecao=validarMagiasSelecionadas(); if((erroEstrutural||erroSelecao)&&state.modo==="A") return alert(erroEstrutural||erroSelecao); if((erroEstrutural||erroSelecao)&&state.modo==="B") state.personagem.customizado=true; avancarPara(10); }

function renderPersonalidade(){ const p=state.personagem.personalidade; const sug=PERSONALITY_SUGGESTIONS[state.personagem.origem] || {tracos:[],ideais:[],vinculos:[],defeitos:[]}; const bloco=(tipo,label)=>`<div class="card-nested"><label>${label}</label><div class="grid">${(sug[tipo]||[]).map(valor=>`<label style="font-weight:normal"><input type="checkbox" value="${valor.replace(/"/g,'&quot;')}" ${p[tipo].includes(valor)?'checked':''} onchange="alternarSugestaoPersonalidade('${tipo}', this.value, this.checked)" /> ${valor}</label>`).join('') || '<p class="muted">Sem sugestões específicas para esta origem.</p>'}<textarea id="manual_${tipo}" placeholder="Adicione mais entradas manualmente, uma por linha."></textarea></div><div class="chips">${(p[tipo]||[]).map(valor=>`<span class="chip">${valor}</span>`).join('') || '<span class="muted">Nenhum selecionado</span>'}</div></div>`; renderPassoBase("Personalidade e Interpretação",`<p>No Modo A, é preciso preencher pelo menos um item em cada grupo. No Modo B, tudo é livre.</p>${bloco('tracos','Traços de personalidade')}${bloco('ideais','Ideais')}${bloco('vinculos','Vínculos')}${bloco('defeitos','Defeitos')}<label>Descrição geral</label><textarea id="descricaoGeral">${p.descricaoGeral||''}</textarea><label>Aparência</label><textarea id="aparencia">${p.aparencia||''}</textarea><label>História</label><textarea id="historia">${p.historia||''}</textarea><div class="actions"><button class="secondary" onclick="voltarPara(9)">Voltar</button><button onclick="confirmarPersonalidade()">Avançar</button></div>`); }
function alternarSugestaoPersonalidade(tipo,valor,checked){ let arr=[...(state.personagem.personalidade[tipo]||[])]; if(checked) arr.push(valor); else arr=arr.filter(v=>v!==valor); state.personagem.personalidade[tipo]=[...new Set(arr)]; salvarEstado(); renderPersonalidade(); }
function adicionarEntradasManuaisPersonalidade(tipo){ const el=document.getElementById(`manual_${tipo}`); const linhas=(el?.value||"").split('\n').map(v=>v.trim()).filter(Boolean); state.personagem.personalidade[tipo]=[...new Set([...(state.personagem.personalidade[tipo]||[]), ...linhas])]; }
function confirmarPersonalidade(){ ['tracos','ideais','vinculos','defeitos'].forEach(adicionarEntradasManuaisPersonalidade); state.personagem.personalidade.descricaoGeral=document.getElementById('descricaoGeral').value.trim(); state.personagem.personalidade.aparencia=document.getElementById('aparencia').value.trim(); state.personagem.personalidade.historia=document.getElementById('historia').value.trim(); const erro=validarPersonalidade(); if(erro&&state.modo==="A") return alert(erro); if(erro&&state.modo==="B") state.personagem.customizado=true; avancarPara(11); }

function recalcularPv(){const dado=state.personagem.dadoVida||0; const nivel=Math.max(1,state.personagem.nivel||1); const modCon=calcularMod(state.personagem.atributos.constituicao||10); const mediaPorNivel=Math.floor(dado/2)+1; state.personagem.pvMax=Math.max(1,(dado+modCon)+((nivel-1)*(mediaPorNivel+modCon)));}
function recalcularPericias(){const bonus={}; for(const skill of Object.keys(SKILLS)){const attr=SKILLS[skill]; let valor=calcularMod(state.personagem.atributos[attr]||10); if(state.personagem.periciasFinais.includes(skill)) valor+=state.personagem.bonusProficiencia; bonus[skill]=valor;} state.personagem.bonusPericias=bonus;}
function recalcularSaves(){const saves={}; for(const [label,key] of Object.entries(SAVE_TO_KEY)){let valor=calcularMod(state.personagem.atributos[key]||10); if(state.personagem.savesClasse.includes(label)) valor+=state.personagem.bonusProficiencia; saves[label]=valor;} state.personagem.savesCalculados=saves;}
function calcularClasseArmadura(chaveArmadura,escudo){ const armor=ARMORS[chaveArmadura]||ARMORS.sem_armadura; const modDex=calcularMod(state.personagem.atributos.destreza||10); let ca=armor.baseCA; if(armor.dex==="full") ca+=modDex; else if(armor.dex==="max2") ca+=Math.min(2,modDex); if(state.personagem.classe==="barbaro" && chaveArmadura==="sem_armadura") ca = 10 + modDex + calcularMod(state.personagem.atributos.constituicao||10); if(state.personagem.classe==="monge" && chaveArmadura==="sem_armadura" && !escudo) ca = 10 + modDex + calcularMod(state.personagem.atributos.sabedoria||10); if(escudo) ca+=2; return ca; }
function calcularAtaque(chaveArma){ const weapon=WEAPONS[chaveArma]; if(!weapon) return {nome:"Sem arma",bonusAtaque:0,dano:"-",danoVersatil:null,alcance:"-",propriedades:[],atributo:"-",proficiente:false,critico:"-",valorGp:0,modificadorUsado:0}; const modFor=calcularMod(state.personagem.atributos.forca||10); const modDex=calcularMod(state.personagem.atributos.destreza||10); const modAttr = weapon.ranged ? modDex : (weapon.finesse ? Math.max(modDex, modFor) : modFor); const atributo = weapon.ranged ? "Destreza" : (weapon.finesse ? (modDex >= modFor ? "Destreza" : "Força") : "Força"); const proficiente=personagemEhProficienteComArma(weapon); return {nome:weapon.nome, bonusAtaque: modAttr + (proficiente?state.personagem.bonusProficiencia:0), dano:`${weapon.dano} ${valorFormatadoBonus(modAttr)}`, danoVersatil:weapon.versatile?`${weapon.versatile} ${valorFormatadoBonus(modAttr)}`:null, alcance:weapon.alcance, propriedades:weapon.propriedades, atributo, proficiente, critico:(typeof getWeaponCritDisplay==='function'?getWeaponCritDisplay(state.personagem, weapon):(weapon.critico||"20/x2")), valorGp:weapon.precoGp||0, modificadorUsado:modAttr}; }
function formatarMoedaGp(valor){ return `${Number(valor||0).toFixed(2).replace(/\.00$/,"")} gp`; }
function capitalizarTipoArmadura(tipo){ return ({nenhuma:"Sem armadura",leve:"Leve",media:"Média",pesada:"Pesada"}[tipo]||tipo); }
function montarBaseCaLabel(armor){ if(armor.tipo==="nenhuma") return "10 + DES"; const sufixo = armor.dex==="full" ? "+ DES" : armor.dex==="max2" ? "+ DES (máx 2)" : ""; return `${armor.baseCA}${sufixo?` ${sufixo}`:""}`; }
function getChoiceValueGp(choice){ return Number(((choice?.items||[]).reduce((acc,entry)=>{ if(entry.type==="armor") return acc + ((ARMORS[entry.key]?.precoGp||0) * (entry.qty||1)); if(entry.type==="weapon") return acc + ((WEAPONS[entry.key]?.precoGp||0) * (entry.qty||1)); if(entry.type==="shield") return acc + (10 * (entry.qty||1)); if(entry.type==="item") return acc + ((ITEM_CATALOG[entry.key]?.precoGp||0) * (entry.qty||1)); return acc; },0)).toFixed(2)); }
function renderChoiceItemsPreview(choice){ return `<div class="chips">${(choice.items||[]).map(entry=>{ if(entry.type==="armor"){ const item=ARMORS[entry.key]; return `<span class="chip">${item.nome} x${entry.qty} • ${formatarMoedaGp((item.precoGp||0)*(entry.qty||1))}</span>`; } if(entry.type==="weapon"){ const item=WEAPONS[entry.key]; return `<span class="chip">${item.nome} x${entry.qty} • ${formatarMoedaGp((item.precoGp||0)*(entry.qty||1))}</span>`; } if(entry.type==="shield"){ return `<span class="chip">Escudo x${entry.qty} • ${formatarMoedaGp(10*(entry.qty||1))}</span>`; } const item=ITEM_CATALOG[entry.key]; return `<span class="chip">${item.nome} x${entry.qty} • ${formatarMoedaGp((item.precoGp||0)*(entry.qty||1))}</span>`; }).join("")}</div>`; }
function renderWeaponSummary(key,title){ const weapon=WEAPONS[key]; const ataque=calcularAtaque(key); if(!weapon) return ""; const tags=[weapon.categoria, weapon.tipo, ...(weapon.tags||[])].filter((v,i,a)=>a.indexOf(v)===i); return `<div class="card-nested"><h4>${title}: ${weapon.nome}</h4><div class="chips">${tags.map(tag=>`<span class="chip ${ataque.proficiente?"chip-ok":"chip-no"}">${tag}</span>`).join("")}</div><p><strong>Valor:</strong> ${formatarMoedaGp(weapon.precoGp||0)} • <strong>Crítico:</strong> ${weapon.critico||"20/x2"}</p><p><strong>Dano:</strong> ${weapon.dano} ${valorFormatadoBonus(ataque.modificadorUsado)}${weapon.versatile?` • versátil ${weapon.versatile} ${valorFormatadoBonus(ataque.modificadorUsado)}`:""}</p><p><strong>Modificador:</strong> ${ataque.atributo} (${valorFormatadoBonus(ataque.modificadorUsado)}) • <strong>Bônus de ataque:</strong> ${valorFormatadoBonus(ataque.bonusAtaque)}</p></div>`; }
function renderArmorSummary(key,escudo){ const armor=ARMORS[key]||ARMORS.sem_armadura; const prof=personagemEhProficienteComArmadura(armor); const tags=[capitalizarTipoArmadura(armor.tipo), ...(armor.tags||[])].filter((v,i,a)=>a.indexOf(v)===i); const modDex=calcularMod(state.personagem.atributos.destreza||10); const dexInfo=armor.dex==="full" ? valorFormatadoBonus(modDex) : armor.dex==="max2" ? valorFormatadoBonus(Math.min(2,modDex)) : "+0"; return `<div class="card-nested"><h4>Armadura: ${armor.nome}</h4><div class="chips">${tags.map(tag=>`<span class="chip ${prof?"chip-ok":"chip-no"}">${tag}</span>`).join("")}${escudo?'<span class="chip chip-ok">escudo</span>':''}</div><p><strong>Valor:</strong> ${formatarMoedaGp(armor.precoGp||0)} • <strong>Peso:</strong> ${armor.peso} lb</p><p><strong>CA base:</strong> ${montarBaseCaLabel(armor)} • <strong>DES aplicada:</strong> ${dexInfo}</p></div>`; }
function atualizarPreviewEquipamentoInicial(){ const loadout=EQUIPMENT_LOADOUTS[state.personagem.classe]||[]; loadout.forEach(group=>{ const el=document.getElementById(`equip_${group.id}`); const preview=document.getElementById(`equip_preview_${group.id}`); const check=document.getElementById(`equip_valor_${group.id}`); if(!el||!preview) return; const choice=group.choices[Number(el.value)]; preview.innerHTML = choice ? `${renderChoiceItemsPreview(choice)}<p class="muted">Valor total: ${formatarMoedaGp(getChoiceValueGp(choice))}${check?.checked?" • marcado para virar moedas":""}</p>` : "Selecione uma opção para ver os detalhes."; }); capturarEscolhasEquipamentoInicial(); }
function atualizarPreviewCombate(){ const armadura=document.getElementById("armadura")?.value || state.personagem.combate.armadura; const armaPrincipal=document.getElementById("armaPrincipal")?.value || state.personagem.combate.armaPrincipal; const armaSecundaria=document.getElementById("armaSecundaria")?.value || state.personagem.combate.armaSecundaria; const escudo=document.getElementById("escudo")?.checked ?? state.personagem.combate.escudo; const ca=calcularClasseArmadura(armadura,escudo); const box=document.getElementById("combatePreviewBox"); if(!box) return; box.innerHTML = `<div class="info-box"><p><strong>CA atualizada:</strong> ${ca}</p><p><strong>Iniciativa:</strong> ${valorFormatadoBonus(calcularMod(state.personagem.atributos.destreza||10))}</p><p><strong>Ataques por ação:</strong> ${state.personagem.progressao.ataquesPorAcao||1}</p></div><div class="grid grid-3">${renderArmorSummary(armadura,escudo)}${renderWeaponSummary(armaPrincipal,"Arma principal")}${renderWeaponSummary(armaSecundaria,"Arma secundária")}</div>`; atualizarPreviewEquipamentoInicial(); }
function obterMaiorCirculoDisponivel(){ const espacos=state.personagem.magia?.espacos||[]; for(let i=espacos.length-1;i>=0;i--){ if((espacos[i]||0)>0) return i+1; } return 0; }
function recalcularCombate(){state.personagem.combate.classeArmadura=calcularClasseArmadura(state.personagem.combate.armadura,state.personagem.combate.escudo); state.personagem.combate.iniciativa=calcularMod(state.personagem.atributos.destreza||10); state.personagem.combate.ataques=[calcularAtaque(state.personagem.combate.armaPrincipal),calcularAtaque(state.personagem.combate.armaSecundaria)]; state.personagem.combate.ataquesPorAcao=getAttacksPerAction(state.personagem.classe, state.personagem.nivel||1);}
function recalcularInventario(){const pesoItens=state.personagem.inventario.itens.reduce((a,item)=>a+item.pesoTotal,0); const pesoEquipado=(ARMORS[state.personagem.combate.armadura]?.peso||0)+(WEAPONS[state.personagem.combate.armaPrincipal]?.peso||0)+(WEAPONS[state.personagem.combate.armaSecundaria]?.peso||0)+(state.personagem.combate.escudo?6:0); state.personagem.inventario.pesoTotal=Number((pesoItens+pesoEquipado).toFixed(2)); state.personagem.inventario.capacidadeCarga=(state.personagem.atributos.forca||10)*15;}
function atualizarProgressao(){ const nivel=Math.max(1, Math.min(20, state.personagem.nivel||1)); state.personagem.nivel=nivel; state.personagem.progressao.nivelAtual=nivel; state.personagem.bonusProficiencia=2 + Math.floor((nivel-1)/4); state.personagem.progressao.proximoNivel=Math.min(20,nivel+1); state.personagem.progressao.melhoriasPendentes=[]; state.personagem.habilidadesClasseAtivas=getClassFeaturesForLevel(state.personagem.classe,nivel); const unlock=getSubclassUnlockLevel(state.personagem.classe); if(nivel < unlock) state.personagem.subclasse=null; state.personagem.habilidadesSubclasseAtivas=getSubclassFeaturesForLevel(state.personagem.classe,state.personagem.subclasse,nivel); const recursosAtuais=state.personagem.recursosClasse||{}; state.personagem.recursosClasse=Object.fromEntries(getClassResources(state.personagem.classe,nivel,state.personagem).map(r=>{ const prev=recursosAtuais[r.id]; return [r.id, {...r, detalhe: r.detalhe || prev?.detalhe || '', atual: Math.max(0, Math.min(prev?.atual ?? r.max, r.max))}]; })); state.personagem.progressao.historico=[...(state.personagem.habilidadesClasseAtivas||[]), ...(state.personagem.habilidadesSubclasseAtivas||[])].map(f=>`Nível ${f.level}: ${f.nome}`); if([4,8,12,16,19].includes(nivel)) state.personagem.progressao.melhoriasPendentes.push("Aumento de Valor de Habilidade / talento"); if([3,6,10,14,18].includes(nivel)) state.personagem.progressao.melhoriasPendentes.push("Verificar recursos de subclasse do nível atual"); if(SPELLCASTERS[state.personagem.classe]) state.personagem.progressao.melhoriasPendentes.push("Revisar lista de magias, truques e espaços do nível atual"); state.personagem.progressao.ataquesPorAcao=getAttacksPerAction(state.personagem.classe,nivel); }
function recalcularTudo(){ atualizarProgressao(); recalcularPv(); recalcularPericias(); recalcularSaves(); recalcularCombate(); recalcularInventario(); recalcularMagia(); }

function alterarRecursoClasse(id, delta){ const r=state.personagem.recursosClasse?.[id]; if(!r) return; r.atual=Math.max(0, Math.min(r.max, (r.atual||0)+delta)); salvarEstado(); if(state.etapa===11) renderResumo(); }
function restaurarRecursosClasse(tipo){ Object.values(state.personagem.recursosClasse||{}).forEach(r=>{ const rec=(r.recarga||'').toLowerCase(); if(tipo==='longo' || (tipo==='curto' && rec.includes('curto'))) r.atual=r.max; }); salvarEstado(); if(state.etapa===11) renderResumo(); }

function renderResumo(){ recalcularTudo(); state.personagem.validacaoResumo=validarPersonagemCompleto(); state.personagem.valido=state.personagem.validacaoResumo.status==="oficial"; const p=state.personagem; const status=p.validacaoResumo.status==="oficial"?`<div class="alert success">✔ personagem válido</div>`:p.validacaoResumo.status==="customizado"?`<div class="alert warning">⚠ personagem customizado</div>`:`<div class="alert error">⚠ personagem com pendências</div>`; const atributos=ATTRIBUTE_LIST.map(attr=>`<li>${ATTRIBUTE_LABELS[attr]}: ${p.atributos[attr]} (mod ${valorFormatadoBonus(calcularMod(p.atributos[attr]))})</li>`).join(""); const ataques=p.combate.ataques.map(a=>`<div class="attack-card"><h4>${a.nome}</h4><p><strong>Bônus:</strong> ${valorFormatadoBonus(a.bonusAtaque)}</p><p><strong>Dano:</strong> ${a.dano}</p>${a.danoVersatil?`<p><strong>Dano versátil:</strong> ${a.danoVersatil}</p>`:""}<p><strong>Crítico:</strong> ${a.critico||"-"}</p><p><strong>Valor:</strong> ${formatarMoedaGp(a.valorGp||0)}</p><p><strong>Atributo:</strong> ${a.atributo||"-"}</p><p><strong>Proficiência:</strong> ${a.proficiente?"Sim":"Não"}</p><p><strong>Alcance:</strong> ${a.alcance}</p><p><strong>Propriedades:</strong> ${a.propriedades.join(", ")||"Nenhuma"}</p></div>`).join(""); const inventario=p.inventario.itens.map(item=>`<li>${item.nome} x${item.quantidade} — peso ${item.pesoTotal}</li>`).join("")||"<li>Nenhum item.</li>"; const magia = !p.magia.ehConjurador ? "<p>Classe sem conjuração.</p>" : `<p><strong>Habilidade:</strong> ${ATTRIBUTE_LABELS[p.magia.habilidade]}</p><p><strong>CD:</strong> ${p.magia.cdMagia}</p><p><strong>Ataque mágico:</strong> ${valorFormatadoBonus(p.magia.ataqueMagia)}</p><p><strong>Espaços:</strong> ${p.magia.espacos.map((v,i)=>v?`${i+1}º:${p.magia.espacosAtuais[i]||0}/${v}`:"").filter(Boolean).join(" • ") || "Nenhum"}</p><p><strong>Truques:</strong> ${(p.magia.listaTruques||[]).join(", ") || "Nenhum"}</p><p><strong>Magias:</strong> ${(p.magia.listaMagias||[]).join(", ") || "Nenhuma"}</p>`; const pendencias = `<ul class="clean">${(p.validacaoResumo.erros||[]).map(e=>`<li>${e}</li>`).join("") || '<li>Nenhuma pendência crítica.</li>'}</ul>`; const avisos = `<ul class="clean">${(p.validacaoResumo.avisos||[]).map(e=>`<li>${e}</li>`).join("") || '<li>Nenhum aviso.</li>'}</ul>`; const subclasseNome=nomeCatalogo(Object.fromEntries(getSubclassOptions(p.classe).map(s=>[s.key,{nome:s.nome}])), p.subclasse); renderPassoBase("Resumo da Ficha",`${status}<div class="grid grid-2"><div><h3>Identidade</h3><p><strong>Nome:</strong> ${p.nome||'-'}</p><p><strong>Origem:</strong> ${nomeCatalogo(BACKGROUNDS,p.origem)}</p><p><strong>Raça:</strong> ${nomeCatalogo(RACES,p.raca)}</p><p><strong>Classe:</strong> ${nomeCatalogo(CLASSES,p.classe)} ${p.nivel}</p><p><strong>Subclasse:</strong> ${subclasseNome}</p><p><strong>Progressão:</strong> próximo nível ${p.progressao.proximoNivel} • bônus de proficiência ${valorFormatadoBonus(p.bonusProficiencia)} • ataques por ação ${p.progressao.ataquesPorAcao||1}</p><h4>Melhorias pendentes</h4><ul class="clean">${(p.progressao.melhoriasPendentes||[]).map(item=>`<li>${item}</li>`).join("") || "<li>Nenhuma no nível atual.</li>"}</ul><h3>Habilidades de Classe</h3>${renderClassFeaturesHtml()}<h3>Subclasse</h3>${renderSubclassFeaturesHtml()}<h3>Recursos</h3>${renderRecursosClasseHtml()}<h3>Efeitos derivados</h3>${renderDerivedEffectsHtml()}<h3>Atributos</h3><ul class="clean">${atributos}</ul><h3>Combate</h3><p><strong>PV:</strong> ${p.pvMax}</p><p><strong>CA:</strong> ${p.combate.classeArmadura}</p><p><strong>Iniciativa:</strong> ${valorFormatadoBonus(p.combate.iniciativa)}</p><p><strong>Deslocamento:</strong> ${p.deslocamento} pés</p><div class="grid grid-2">${ataques}</div><h3>Validação</h3>${pendencias}<h4>Avisos</h4>${avisos}</div><div><h3>Inventário</h3><ul class="clean">${inventario}</ul><p><strong>Peso:</strong> ${p.inventario.pesoTotal}/${p.inventario.capacidadeCarga}</p><p><strong>Moedas:</strong> PP ${p.inventario.moedas.pp}, GP ${p.inventario.moedas.gp}, EP ${p.inventario.moedas.ep}, SP ${p.inventario.moedas.sp}, CP ${p.inventario.moedas.cp}</p><h3>Magia</h3>${magia}<h3>Personalidade</h3><p><strong>Traços:</strong> ${(p.personalidade.tracos||[]).join(' | ')||'-'}</p><p><strong>Ideais:</strong> ${(p.personalidade.ideais||[]).join(' | ')||'-'}</p><p><strong>Vínculos:</strong> ${(p.personalidade.vinculos||[]).join(' | ')||'-'}</p><p><strong>Defeitos:</strong> ${(p.personalidade.defeitos||[]).join(' | ')||'-'}</p><p><strong>Descrição:</strong> ${p.personalidade.descricaoGeral||'-'}</p><p><strong>Aparência:</strong> ${p.personalidade.aparencia||'-'}</p><p><strong>História:</strong> ${p.personalidade.historia||'-'}</p></div></div><div class="actions"><button class="secondary" onclick="voltarPara(10)">Voltar</button><button onclick="exportarFoundryActorJSON()">Exportar JSON Foundry</button><button class="secondary" onclick="exportarBackupJSON()">Exportar JSON Backup</button><button onclick="exportarPDF()">Exportar PDF</button><button class="secondary" onclick="reiniciar()">Criar novo personagem</button></div>`); salvarEstado(); }
function reiniciar(){ resetarAplicacaoCompleta(); }
function resetarAplicacaoCompleta(){
  limparEstado();
  resetStateToInitial();
  render();
  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(err) { window.scrollTo(0, 0); }
}

function confirmarLimpezaLocalStorage(){
  const ok = window.confirm("Isso vai apagar os dados salvos desta ficha no navegador e reiniciar a aplicação na tela inicial. Deseja continuar?");
  if(!ok) return;
  resetarAplicacaoCompleta();
  window.alert("Dados salvos removidos com sucesso.");
}


function renderClassOptionsEditor(classe, nivel, subclasse){
  if(typeof getClassOptionGroups !== 'function') return '';
  const groups = getClassOptionGroups(classe, nivel, subclasse);
  if(!groups.length) return '<p class="muted">Sem escolhas adicionais de recursos para esta combinação.</p>';
  const atual = state.personagem.opcoesClasse || {};
  return groups.map(group=>{
    const current = atual[group.id] || (group.multiple ? [] : '');
    const inputs = (group.options||[]).map((opt, idx)=>{
      const value = getNormalizedOptionValue(opt);
      const label = getNormalizedOptionLabel(opt);
      const checked = group.multiple ? ([].concat(current).includes(value) ? 'checked' : '') : (current===value ? 'checked' : '');
      const inputType = group.multiple ? 'checkbox' : 'radio';
      return `<label style="font-weight:normal;"><input type="${inputType}" name="${group.id}" data-group-id="${group.id}" data-group-multiple="${group.multiple?'1':'0'}" value="${value}" ${checked}/> ${label}</label>`;
    }).join('');
    return `<div class="card-nested"><p><strong>${group.label}</strong> <small class="muted">(${group.count} escolha(s))</small></p><div class="grid grid-2">${inputs}</div></div>`;
  }).join('');
}
function coletarOpcoesClasseDaTela(){
  if(typeof getClassOptionGroups !== 'function') return {};
  const classe = document.getElementById('classe')?.value || state.personagem.classe;
  const nivel = Number(document.getElementById('nivel')?.value || state.personagem.nivel || 1);
  const subclasse = document.getElementById('subclasse')?.value || state.personagem.subclasse;
  const groups = getClassOptionGroups(classe, nivel, subclasse);
  const result = {};
  groups.forEach(group=>{
    const nodes = [...document.querySelectorAll(`[data-group-id="${group.id}"]`)];
    if(group.multiple){
      result[group.id] = nodes.filter(n=>n.checked).map(n=>n.value).slice(0, group.count);
    } else {
      result[group.id] = nodes.find(n=>n.checked)?.value || '';
    }
  });
  return result;
}
function renderClassOptionsResumoHtml(){
  const linhas = typeof describeSelectedClassOptions === 'function' ? describeSelectedClassOptions(state.personagem) : [];
  return linhas.length ? `<ul class="clean">${linhas.map(v=>`<li>${v}</li>`).join('')}</ul>` : '<p class="muted">Nenhuma escolha adicional registrada.</p>';
}
function mostrarPreviewClasse(){
  const key = document.getElementById("classe")?.value || "";
  const nivel = Math.max(1, Math.min(20, Number(document.getElementById("nivel")?.value || state.personagem.nivel || 1)));
  const preview = document.getElementById("preview");
  if(!preview) return;
  if(!key || !CLASSES[key]) {
    preview.innerHTML = "";
    return;
  }
  const selected = document.getElementById("subclasse")?.value || state.personagem.subclasse || "";
  state.personagem.classe = key;
  state.personagem.nivel = nivel;
  state.personagem.subclasse = selected || null;
  if(typeof sanitizeClassOptionState === 'function') state.personagem.opcoesClasse = sanitizeClassOptionState(state.personagem);
  preview.innerHTML = buildClassPreviewHtml(key, nivel, selected);
}
function confirmarClasse(){const key=document.getElementById("classe").value; state.personagem.classe=key; state.personagem.nivel=Math.max(1, Math.min(20, Number(document.getElementById("nivel")?.value || 1))); state.personagem.subclasse=document.getElementById("subclasse")?.value || null; state.personagem.opcoesClasse=coletarOpcoesClasseDaTela(); state.personagem.opcoesClasse=sanitizeClassOptionState(state.personagem); const erro=validarClasse(); const erroOpcoes=(typeof validarOpcoesClasse==='function')?validarOpcoesClasse():null; if((erro||erroOpcoes)&&state.modo==="A") return alert(erro||erroOpcoes); if((erro||erroOpcoes)&&state.modo==="B") state.personagem.customizado=true; if(key&&CLASSES[key]){const c=CLASSES[key]; state.personagem.dadoVida=c.dadoVida; state.personagem.savesClasse=[...c.saves]; state.personagem.proficienciasClasse=[...c.proficiencias]; state.personagem.equipamentoClasse=[...c.equipamento]; state.personagem.periciasClasseSelecionadas=[]; state.personagem.equipamentoInicialEscolhas={}; state.personagem.equipamentoInicialValores={}; configurarMagiaDaClasse(); recalcularTudo();} avancarPara(5);} 
function atualizarProgressao(){ const nivel=Math.max(1, Math.min(20, state.personagem.nivel||1)); state.personagem.nivel=nivel; state.personagem.progressao.nivelAtual=nivel; state.personagem.bonusProficiencia=2 + Math.floor((nivel-1)/4); state.personagem.progressao.proximoNivel=Math.min(20,nivel+1); state.personagem.progressao.melhoriasPendentes=[]; state.personagem.opcoesClasse = (typeof sanitizeClassOptionState === 'function') ? sanitizeClassOptionState(state.personagem) : (state.personagem.opcoesClasse||{}); state.personagem.habilidadesClasseAtivas=getClassFeaturesForLevel(state.personagem.classe,nivel); const unlock=getSubclassUnlockLevel(state.personagem.classe); if(nivel < unlock) state.personagem.subclasse=null; state.personagem.habilidadesSubclasseAtivas=getSubclassFeaturesForLevel(state.personagem.classe,state.personagem.subclasse,nivel); const recursosAtuais=state.personagem.recursosClasse||{}; state.personagem.recursosClasse=Object.fromEntries(getClassResources(state.personagem.classe,nivel,state.personagem).map(r=>{ const prev=recursosAtuais[r.id]; return [r.id, {...r, detalhe: r.detalhe || prev?.detalhe || '', atual: Math.max(0, Math.min(prev?.atual ?? r.max, r.max))}]; })); state.personagem.progressao.historico=[...(state.personagem.habilidadesClasseAtivas||[]), ...(state.personagem.habilidadesSubclasseAtivas||[])].map(f=>`Nível ${f.level}: ${f.nome}`); if([4,8,12,16,19].includes(nivel)) state.personagem.progressao.melhoriasPendentes.push("Aumento de Valor de Habilidade / talento"); if([3,6,10,14,18].includes(nivel)) state.personagem.progressao.melhoriasPendentes.push("Verificar recursos de subclasse do nível atual"); if(SPELLCASTERS[state.personagem.classe]) state.personagem.progressao.melhoriasPendentes.push("Revisar lista de magias, truques e espaços do nível atual"); state.personagem.progressao.ataquesPorAcao=getAttacksPerAction(state.personagem.classe,nivel); }
function renderResumo(){ recalcularTudo(); state.personagem.validacaoResumo=validarPersonagemCompleto(); state.personagem.valido=state.personagem.validacaoResumo.status==="oficial"; const p=state.personagem; const status=p.validacaoResumo.status==="oficial"?`<div class="alert success">✔ personagem válido</div>`:p.validacaoResumo.status==="customizado"?`<div class="alert warning">⚠ personagem customizado</div>`:`<div class="alert error">⚠ personagem com pendências</div>`; const atributos=ATTRIBUTE_LIST.map(attr=>`<li>${ATTRIBUTE_LABELS[attr]}: ${p.atributos[attr]} (mod ${valorFormatadoBonus(calcularMod(p.atributos[attr]))})</li>`).join(""); const ataques=p.combate.ataques.map(a=>`<div class="attack-card"><h4>${a.nome}</h4><p><strong>Bônus:</strong> ${valorFormatadoBonus(a.bonusAtaque)}</p><p><strong>Dano:</strong> ${a.dano}</p>${a.danoVersatil?`<p><strong>Dano versátil:</strong> ${a.danoVersatil}</p>`:""}<p><strong>Crítico:</strong> ${a.critico||"-"}</p><p><strong>Valor:</strong> ${formatarMoedaGp(a.valorGp||0)}</p><p><strong>Atributo:</strong> ${a.atributo||"-"}</p><p><strong>Proficiência:</strong> ${a.proficiente?"Sim":"Não"}</p><p><strong>Alcance:</strong> ${a.alcance}</p><p><strong>Propriedades:</strong> ${a.propriedades.join(", ")||"Nenhuma"}</p></div>`).join(""); const inventario=p.inventario.itens.map(item=>`<li>${item.nome} x${item.quantidade} — peso ${item.pesoTotal}</li>`).join("")||"<li>Nenhum item.</li>"; const magia = !p.magia.ehConjurador ? "<p>Classe sem conjuração.</p>" : `<p><strong>Habilidade:</strong> ${ATTRIBUTE_LABELS[p.magia.habilidade]}</p><p><strong>CD:</strong> ${p.magia.cdMagia}</p><p><strong>Ataque mágico:</strong> ${valorFormatadoBonus(p.magia.ataqueMagia)}</p><p><strong>Espaços:</strong> ${p.magia.espacos.map((v,i)=>v?`${i+1}º:${p.magia.espacosAtuais[i]||0}/${v}`:"").filter(Boolean).join(" • ") || "Nenhum"}</p><p><strong>Truques:</strong> ${(p.magia.listaTruques||[]).join(", ") || "Nenhum"}</p><p><strong>Magias:</strong> ${(p.magia.listaMagias||[]).join(", ") || "Nenhuma"}</p>`; const pendencias = `<ul class="clean">${(p.validacaoResumo.erros||[]).map(e=>`<li>${e}</li>`).join("") || '<li>Nenhuma pendência crítica.</li>'}</ul>`; const avisos = `<ul class="clean">${(p.validacaoResumo.avisos||[]).map(e=>`<li>${e}</li>`).join("") || '<li>Nenhum aviso.</li>'}</ul>`; const subclasseNome=nomeCatalogo(Object.fromEntries(getSubclassOptions(p.classe).map(s=>[s.key,{nome:s.nome}])), p.subclasse); renderPassoBase("Resumo da Ficha",`${status}<div class="grid grid-2"><div><h3>Identidade</h3><p><strong>Nome:</strong> ${p.nome||'-'}</p><p><strong>Origem:</strong> ${nomeCatalogo(BACKGROUNDS,p.origem)}</p><p><strong>Raça:</strong> ${nomeCatalogo(RACES,p.raca)}</p><p><strong>Classe:</strong> ${nomeCatalogo(CLASSES,p.classe)} ${p.nivel}</p><p><strong>Subclasse:</strong> ${subclasseNome}</p><p><strong>Progressão:</strong> próximo nível ${p.progressao.proximoNivel} • bônus de proficiência ${valorFormatadoBonus(p.bonusProficiencia)} • ataques por ação ${p.progressao.ataquesPorAcao||1}</p><h4>Melhorias pendentes</h4><ul class="clean">${(p.progressao.melhoriasPendentes||[]).map(item=>`<li>${item}</li>`).join("") || "<li>Nenhuma no nível atual.</li>"}</ul><h3>Habilidades de Classe</h3>${renderClassFeaturesHtml()}<h3>Subclasse</h3>${renderSubclassFeaturesHtml()}<h3>Recursos</h3>${renderRecursosClasseHtml()}<h3>Escolhas de classe</h3>${renderClassOptionsResumoHtml()}<h3>Atributos</h3><ul class="clean">${atributos}</ul><h3>Combate</h3><p><strong>PV:</strong> ${p.pvMax}</p><p><strong>CA:</strong> ${p.combate.classeArmadura}</p><p><strong>Iniciativa:</strong> ${valorFormatadoBonus(p.combate.iniciativa)}</p><p><strong>Deslocamento:</strong> ${p.deslocamento} pés</p><div class="grid grid-2">${ataques}</div><h3>Validação</h3>${pendencias}<h4>Avisos</h4>${avisos}</div><div><h3>Inventário</h3><ul class="clean">${inventario}</ul><p><strong>Peso:</strong> ${p.inventario.pesoTotal}/${p.inventario.capacidadeCarga}</p><p><strong>Moedas:</strong> PP ${p.inventario.moedas.pp}, GP ${p.inventario.moedas.gp}, EP ${p.inventario.moedas.ep}, SP ${p.inventario.moedas.sp}, CP ${p.inventario.moedas.cp}</p><h3>Magia</h3>${magia}<h3>Personalidade</h3><p><strong>Traços:</strong> ${(p.personalidade.tracos||[]).join(' | ')||'-'}</p><p><strong>Ideais:</strong> ${(p.personalidade.ideais||[]).join(' | ')||'-'}</p><p><strong>Vínculos:</strong> ${(p.personalidade.vinculos||[]).join(' | ')||'-'}</p><p><strong>Defeitos:</strong> ${(p.personalidade.defeitos||[]).join(' | ')||'-'}</p><p><strong>Descrição:</strong> ${p.personalidade.descricaoGeral||'-'}</p><p><strong>Aparência:</strong> ${p.personalidade.aparencia||'-'}</p><p><strong>História:</strong> ${p.personalidade.historia||'-'}</p></div></div><div class="actions"><button class="secondary" onclick="voltarPara(10)">Voltar</button><button onclick="exportarFoundryActorJSON()">Exportar JSON Foundry</button><button class="secondary" onclick="exportarBackupJSON()">Exportar JSON Backup</button><button onclick="exportarPDF()">Exportar PDF</button><button class="secondary" onclick="reiniciar()">Criar novo personagem</button></div>`); salvarEstado(); }


function obterDetalheMagiaUI(nome, circulo){
  if(typeof getSpellDetailForCharacter !== 'function') return null;
  const full = circulo ? `${nome} (${circulo}º)` : nome;
  return getSpellDetailForCharacter(state.personagem.classe, full, state.personagem.subclasse, state.personagem.nivel);
}

function renderLinhaMagiaDetalhada(nomeCompleto, idx, tipo){
  const match = String(nomeCompleto).match(/^(.*?)(?:\s*\((\d)º\))?$/);
  const nome = (match?.[1] || nomeCompleto).trim();
  const circulo = match?.[2] || (tipo === 'truque' ? 'Truque' : '');
  const detalhe = obterDetalheMagiaUI(nome, tipo === 'truque' ? 0 : Number(match?.[2] || 0));
  const meta = detalhe ? [detalhe.escola, detalhe.ritual ? 'Ritual' : '', detalhe.concentracao ? 'Concentração' : '', detalhe.fonte].filter(Boolean).join(' • ') : '';
  const resumo = detalhe?.resumo || '';
  return `<tr><td><strong>${nome}</strong>${circulo?` <span class="muted">(${circulo === 'Truque' ? circulo : `${circulo}º`})</span>`:''}<br><small class="muted">${meta}</small><br><small>${resumo}</small></td><td><button class="small secondary" onclick="removerMagia('${tipo}',${idx})">Remover</button></td></tr>`;
}

function renderPainelDetalheMagiaSelecionada(){
  const tipoSel = document.getElementById('novaMagia')?.value || document.getElementById('novoTruque')?.value || '';
  const circuloSel = Number(document.getElementById('circuloMagia')?.value || 0);
  if(!tipoSel) return '<div class="info-box"><p class="muted">Selecione uma magia ou truque para ver detalhes rápidos.</p></div>';
  const detalhe = obterDetalheMagiaUI(tipoSel, circuloSel);
  if(!detalhe) return '<div class="info-box"><p class="muted">Sem detalhes adicionais para a magia selecionada.</p></div>';
  return `<div class="info-box"><p><strong>${detalhe.nome}</strong> <span class="muted">• ${detalhe.fonte}</span></p><p>${detalhe.resumo}</p><p class="muted">${[detalhe.escola, detalhe.ritual ? 'Ritual' : '', detalhe.concentracao ? 'Concentração' : '', detalhe.duracao ? `Duração: ${detalhe.duracao}` : ''].filter(Boolean).join(' • ')}</p></div>`;
}

function renderMagia(){ const magia=state.personagem.magia; if(!magia.ehConjurador){ return renderPassoBase("Magia",`<div class="info-box"><p>Classe sem magia.</p></div><div class="actions"><button class="secondary" onclick="voltarPara(8)">Voltar</button><button onclick="confirmarMagia()">Avançar</button></div>`);} const listas=listarMagiasDisponiveisPorCirculo(); const bonusSpells=(typeof getCharacterBonusSpellSummary==='function'?getCharacterBonusSpellSummary(state.personagem):[]); const circulosDisponiveis=Object.keys(listas).filter(k=>k!=="truques" && Number(k)<=obterMaiorCirculoDisponivel()); const truquesRestantes=Math.max(0,(magia.cantripsConhecidos||0)-(magia.listaTruques||[]).length); const limiteMagias=magia.tipo==="conhecidas" ? (magia.magiasConhecidas||0) : (magia.magiasPreparadas||0); const magiasRestantes=Math.max(0, limiteMagias-(magia.listaMagias||[]).length); const truqueOptions=(listas.truques||[]).filter(nome=>!(magia.listaTruques||[]).includes(nome)).map(nome=>`<option value="${nome}">${nome}</option>`).join(""); const circleOptions=circulosDisponiveis.map(k=>`<option value="${k}">${k}º círculo</option>`).join(""); const primeiroCirculo=circulosDisponiveis[0] || "1"; const magiaOptions=((listas[primeiroCirculo]||[]).filter(nome=>!(magia.listaMagias||[]).includes(`${nome} (${primeiroCirculo}º)`))).map(nome=>`<option value="${nome}">${nome}</option>`).join(""); const truques=(magia.listaTruques||[]).map((nome,idx)=>renderLinhaMagiaDetalhada(nome, idx, 'truque')).join(""); const magias=(magia.listaMagias||[]).map((nome,idx)=>renderLinhaMagiaDetalhada(nome, idx, 'magia')).join(""); renderPassoBase("Magia",`<div class="grid grid-2"><div class="spell-card"><p><strong>Habilidade:</strong> ${ATTRIBUTE_LABELS[magia.habilidade]}</p><p><strong>CD:</strong> ${magia.cdMagia}</p><p><strong>Ataque mágico:</strong> ${valorFormatadoBonus(magia.ataqueMagia)}</p><p><strong>Espaços:</strong> ${magia.espacos.map((v,i)=>v?`${i+1}º ${magia.espacosAtuais[i]||0}/${v}`:"").filter(Boolean).join(" • ") || "Nenhum"}</p>${magia.nivelEspacosBruxo?`<p><strong>Círculo dos espaços:</strong> ${magia.nivelEspacosBruxo}º</p>`:""}</div><div class="spell-card"><p><strong>Truques:</strong> ${(magia.listaTruques||[]).length}/${magia.cantripsConhecidos}</p><p><strong>${magia.tipo==="conhecidas"?"Magias conhecidas":"Magias preparadas"}:</strong> ${(magia.listaMagias||[]).length}/${limiteMagias}</p><p><strong>Truques restantes:</strong> ${truquesRestantes}</p><p><strong>Magias restantes:</strong> ${magiasRestantes}</p></div></div>${bonusSpells.length?`<div class="info-box"><p><strong>Magias bônus da subclasse:</strong></p><p>${bonusSpells.join(' • ')}</p><p class="muted">Essas magias ficam destacadas para subclasses de Xanathar e ajudam na importação/referência do Foundry.</p></div>`:''}${renderPainelDetalheMagiaSelecionada()}<div class="grid grid-2"><div><h3>Truques</h3><div class="inline-row"><div style="flex:1"><select id="novoTruque" onchange="renderMagia()"><option value="">Selecione</option>${truqueOptions}</select></div><div><button onclick="adicionarMagia('truque')" ${(truquesRestantes<=0)?'disabled':''}>Adicionar</button></div></div><table class="table-like"><tbody>${truques||'<tr><td>Nenhum truque adicionado.</td><td></td></tr>'}</tbody></table></div><div><h3>Magias</h3><div class="inline-row"><div><select id="circuloMagia" onchange="atualizarOpcoesMagia(); renderMagia()">${circleOptions}</select></div><div style="flex:1"><select id="novaMagia" onchange="renderMagia()"><option value="">Selecione</option>${magiaOptions}</select></div><div><button onclick="adicionarMagia('magia')" ${(magiasRestantes<=0)?'disabled':''}>Adicionar</button></div></div><p class="muted">Mostrando apenas círculos disponíveis no nível atual.</p><table class="table-like"><tbody>${magias||'<tr><td>Nenhuma magia adicionada.</td><td></td></tr>'}</tbody></table></div></div><div class="actions"><button class="secondary" onclick="voltarPara(8)">Voltar</button><button onclick="confirmarMagia()">Avançar</button></div>`); }


window.__spellPreview = window.__spellPreview || { tipo: '', nome: '', circulo: 0 };
function selecionarPreviewTruque(){
  window.__spellPreview = { tipo: 'truque', nome: document.getElementById('novoTruque')?.value || '', circulo: 0 };
  const host = document.getElementById('spellDetailPreview');
  if(host) host.innerHTML = renderPainelDetalheMagiaSelecionadaAtual();
}
function selecionarPreviewMagia(){
  window.__spellPreview = { tipo: 'magia', nome: document.getElementById('novaMagia')?.value || '', circulo: Number(document.getElementById('circuloMagia')?.value || 0) };
  const host = document.getElementById('spellDetailPreview');
  if(host) host.innerHTML = renderPainelDetalheMagiaSelecionadaAtual();
}
function renderPainelDetalheMagiaSelecionadaAtual(){
  const sel = window.__spellPreview || { nome: '', circulo: 0 };
  if(!sel.nome) return '<div class="info-box"><p class="muted">Selecione uma magia ou truque para ver detalhes rápidos.</p></div>';
  const detalhe = obterDetalheMagiaUI(sel.nome, sel.circulo);
  if(!detalhe) return '<div class="info-box"><p class="muted">Sem detalhes adicionais para a magia selecionada.</p></div>';
  return `<div class="info-box"><p><strong>${detalhe.nome}</strong> <span class="muted">• ${detalhe.fonte}</span></p><p>${detalhe.resumo}</p><p class="muted">${[detalhe.escola, detalhe.ritual ? 'Ritual' : '', detalhe.concentracao ? 'Concentração' : '', detalhe.duracao ? `Duração: ${detalhe.duracao}` : ''].filter(Boolean).join(' • ')}</p></div>`;
}
function renderMagia(){ const magia=state.personagem.magia; if(!magia.ehConjurador){ return renderPassoBase("Magia",`<div class="info-box"><p>Classe sem magia.</p></div><div class="actions"><button class="secondary" onclick="voltarPara(8)">Voltar</button><button onclick="confirmarMagia()">Avançar</button></div>`);} const listas=listarMagiasDisponiveisPorCirculo(); const bonusSpells=(typeof getCharacterBonusSpellSummary==='function'?getCharacterBonusSpellSummary(state.personagem):[]); const circulosDisponiveis=Object.keys(listas).filter(k=>k!=="truques" && Number(k)<=obterMaiorCirculoDisponivel()); const truquesRestantes=Math.max(0,(magia.cantripsConhecidos||0)-(magia.listaTruques||[]).length); const limiteMagias=magia.tipo==="conhecidas" ? (magia.magiasConhecidas||0) : (magia.magiasPreparadas||0); const magiasRestantes=Math.max(0, limiteMagias-(magia.listaMagias||[]).length); const truqueSelecionado=(window.__spellPreview?.tipo==='truque' ? window.__spellPreview.nome : ''); const circuloSelecionado=String(window.__spellPreview?.tipo==='magia' && window.__spellPreview.circulo ? window.__spellPreview.circulo : (circulosDisponiveis[0] || '1')); const truqueOptions=(listas.truques||[]).filter(nome=>!(magia.listaTruques||[]).includes(nome)).map(nome=>`<option value="${nome}" ${truqueSelecionado===nome?'selected':''}>${nome}</option>`).join(""); const circleOptions=circulosDisponiveis.map(k=>`<option value="${k}" ${circuloSelecionado===String(k)?'selected':''}>${k}º círculo</option>`).join(""); const magiaSelecionada=(window.__spellPreview?.tipo==='magia' ? window.__spellPreview.nome : ''); const magiaOptions=((listas[circuloSelecionado]||[]).filter(nome=>!(magia.listaMagias||[]).includes(`${nome} (${circuloSelecionado}º)`))).map(nome=>`<option value="${nome}" ${magiaSelecionada===nome?'selected':''}>${nome}</option>`).join(""); const truques=(magia.listaTruques||[]).map((nome,idx)=>renderLinhaMagiaDetalhada(nome, idx, 'truque')).join(""); const magias=(magia.listaMagias||[]).map((nome,idx)=>renderLinhaMagiaDetalhada(nome, idx, 'magia')).join(""); renderPassoBase("Magia",`<div class="grid grid-2"><div class="spell-card"><p><strong>Habilidade:</strong> ${ATTRIBUTE_LABELS[magia.habilidade]}</p><p><strong>CD:</strong> ${magia.cdMagia}</p><p><strong>Ataque mágico:</strong> ${valorFormatadoBonus(magia.ataqueMagia)}</p><p><strong>Espaços:</strong> ${magia.espacos.map((v,i)=>v?`${i+1}º ${magia.espacosAtuais[i]||0}/${v}`:"").filter(Boolean).join(" • ") || "Nenhum"}</p>${magia.nivelEspacosBruxo?`<p><strong>Círculo dos espaços:</strong> ${magia.nivelEspacosBruxo}º</p>`:""}</div><div class="spell-card"><p><strong>Truques:</strong> ${(magia.listaTruques||[]).length}/${magia.cantripsConhecidos}</p><p><strong>${magia.tipo==="conhecidas"?"Magias conhecidas":"Magias preparadas"}:</strong> ${(magia.listaMagias||[]).length}/${limiteMagias}</p><p><strong>Truques restantes:</strong> ${truquesRestantes}</p><p><strong>Magias restantes:</strong> ${magiasRestantes}</p></div></div>${bonusSpells.length?`<div class="info-box"><p><strong>Magias bônus da subclasse:</strong></p><p>${bonusSpells.join(' • ')}</p><p class="muted">Essas magias ficam destacadas para subclasses de Xanathar e ajudam na importação/referência do Foundry.</p></div>`:''}<div id="spellDetailPreview">${renderPainelDetalheMagiaSelecionadaAtual()}</div><div class="grid grid-2"><div><h3>Truques</h3><div class="inline-row"><div style="flex:1"><select id="novoTruque" onchange="selecionarPreviewTruque()"><option value="">Selecione</option>${truqueOptions}</select></div><div><button onclick="adicionarMagia('truque')" ${(truquesRestantes<=0)?'disabled':''}>Adicionar</button></div></div><table class="table-like"><tbody>${truques||'<tr><td>Nenhum truque adicionado.</td><td></td></tr>'}</tbody></table></div><div><h3>Magias</h3><div class="inline-row"><div><select id="circuloMagia" onchange="atualizarOpcoesMagia(); selecionarPreviewMagia()">${circleOptions}</select></div><div style="flex:1"><select id="novaMagia" onchange="selecionarPreviewMagia()"><option value="">Selecione</option>${magiaOptions}</select></div><div><button onclick="adicionarMagia('magia')" ${(magiasRestantes<=0)?'disabled':''}>Adicionar</button></div></div><p class="muted">Mostrando apenas círculos disponíveis no nível atual.</p><table class="table-like"><tbody>${magias||'<tr><td>Nenhuma magia adicionada.</td><td></td></tr>'}</tbody></table></div></div><div class="actions"><button class="secondary" onclick="voltarPara(8)">Voltar</button><button onclick="confirmarMagia()">Avançar</button></div>`); }

function normalizarBuscaFicha(valor){
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function encontrarChavePorNome(catalogo, nome, extraMap){
  const alvo = normalizarBuscaFicha(nome);
  if (!alvo) return null;
  for (const [chave, item] of Object.entries(catalogo || {})) {
    if (normalizarBuscaFicha(item?.nome) === alvo) return chave;
  }
  if (extraMap && typeof extraMap === 'object') {
    for (const [chave, traduzido] of Object.entries(extraMap)) {
      if (normalizarBuscaFicha(traduzido) === alvo || normalizarBuscaFicha(chave) === alvo) return chave;
    }
  }
  return null;
}

function encontrarSubclassePorNome(classeKey, nome){
  const alvo = normalizarBuscaFicha(nome);
  if (!alvo || !classeKey) return null;
  for (const sub of getSubclassOptions(classeKey)) {
    if (normalizarBuscaFicha(sub.nome) === alvo || normalizarBuscaFicha(sub.key) === alvo) return sub.key;
  }
  return null;
}

function inferirPericiasClasse(finalSkills, origemKey, classeKey){
  const origem = BACKGROUNDS[origemKey];
  const classe = CLASSES[classeKey];
  const origemSkills = new Set(origem?.pericias || []);
  const opcoes = new Set(classe?.escolhaPericias?.opcoes || []);
  const escolhidas = [];
  for (const skill of finalSkills || []) {
    if (!origemSkills.has(skill) && opcoes.has(skill)) escolhidas.push(skill);
  }
  return escolhidas.slice(0, classe?.escolhaPericias?.quantidade || escolhidas.length);
}

function prepararFichaImportada(){
  const p = state.personagem;
  if (p.origem && BACKGROUNDS[p.origem]) {
    const o = BACKGROUNDS[p.origem];
    p.periciasOrigem = [...o.pericias];
    p.ferramentas = [...o.ferramentas];
    p.idiomas = o.idiomas;
    p.caracteristicaOrigem = o.caracteristica;
  }
  if (p.raca && RACES[p.raca]) {
    const r = RACES[p.raca];
    p.bonusRaciais = { ...r.bonusAtributos };
    p.traitsRaciais = [...r.traits];
    p.idiomasRaciais = [...r.idiomas];
    p.deslocamento = r.deslocamento;
  }
  if (p.classe && CLASSES[p.classe]) {
    const c = CLASSES[p.classe];
    p.dadoVida = c.dadoVida;
    p.savesClasse = [...c.saves];
    p.proficienciasClasse = [...c.proficiencias];
    p.equipamentoClasse = [...c.equipamento];
    configurarMagiaDaClasse();
  }
  const attrsFinais = { ...(p.atributos || {}) };
  ATTRIBUTE_LIST.forEach(attr => {
    const racial = p.bonusRaciais?.[attr] || 0;
    p.atributosBase[attr] = (attrsFinais[attr] || 10) - racial;
  });
  recalcularAtributosFinais();
  if ((!p.periciasClasseSelecionadas || !p.periciasClasseSelecionadas.length) && Array.isArray(p.periciasFinais)) {
    p.periciasClasseSelecionadas = inferirPericiasClasse(p.periciasFinais, p.origem, p.classe);
  }
  atualizarPericiasFinais();
  recalcularTudo();
}

function aplicarPayloadBackupNaFicha(payload){
  resetStateToInitial();
  ensureStateShape();
  state.modo = payload.modo || 'B';
  state.etapa = 11;
  state.currentHistoryId = null;
  const p = state.personagem;
  p.nome = payload.nome || '';
  p.jogador = payload.jogador || '';
  p.origem = encontrarChavePorNome(BACKGROUNDS, payload.origem, typeof FOUNDRY_BACKGROUND_EN_MAP !== 'undefined' ? FOUNDRY_BACKGROUND_EN_MAP : null);
  p.raca = encontrarChavePorNome(RACES, payload.raca, typeof FOUNDRY_RACE_EN_MAP !== 'undefined' ? FOUNDRY_RACE_EN_MAP : null);
  p.classe = encontrarChavePorNome(CLASSES, payload.classe, typeof FOUNDRY_CLASS_EN_MAP !== 'undefined' ? FOUNDRY_CLASS_EN_MAP : null);
  p.subclasse = encontrarSubclassePorNome(p.classe, payload.subclasse);
  p.nivel = Number(payload.nivel || 1);
  p.xp = Number(payload.xp || 0);
  p.atributos = { ...p.atributos, ...(payload.atributos || {}) };
  p.periciasFinais = Object.entries(payload.pericias || {}).filter(([,v]) => Number(v) > 0).map(([k]) => k);
  p.personalidade = Object.assign({}, p.personalidade, payload.personalidade || {});
  p.progressao = Object.assign({}, p.progressao, payload.progressao || {});
  p.recursosClasse = payload.recursosClasse || {};
  p.opcoesClasse = payload.opcoesClasse || {};
  prepararFichaImportada();
  const combate = payload.combate || {};
  p.combate.armadura = encontrarChavePorNome(ARMORS, combate.armadura, typeof FOUNDRY_ARMOR_EN_MAP !== 'undefined' ? FOUNDRY_ARMOR_EN_MAP : null) || p.combate.armadura;
  p.combate.armaPrincipal = encontrarChavePorNome(WEAPONS, combate.armaPrincipal, typeof FOUNDRY_WEAPON_EN_MAP !== 'undefined' ? FOUNDRY_WEAPON_EN_MAP : null) || p.combate.armaPrincipal;
  p.combate.armaSecundaria = encontrarChavePorNome(WEAPONS, combate.armaSecundaria, typeof FOUNDRY_WEAPON_EN_MAP !== 'undefined' ? FOUNDRY_WEAPON_EN_MAP : null) || p.combate.armaSecundaria;
  p.combate.escudo = !!combate.escudo;
  p.inventario.itens = Array.isArray(payload.inventario?.itens) ? payload.inventario.itens : [];
  p.inventario.moedas = Object.assign({}, p.inventario.moedas, payload.inventario?.moedas || {});
  p.magia.listaTruques = [...(payload.magias?.truques || [])];
  p.magia.listaMagias = [...(payload.magias?.selecionadas || [])];
  if (Array.isArray(payload.magias?.espacosAtuais)) p.magia.espacosAtuais = [...payload.magias.espacosAtuais];
  p.magia.concentracaoAtiva = payload.magias?.concentracaoAtiva || '';
  p.magia.rituaisDisponiveis = [...(payload.magias?.rituaisDisponiveis || [])];
  recalcularTudo();
  salvarEstado();
}

function aplicarActorFoundryNaFicha(actor){
  resetStateToInitial();
  ensureStateShape();
  state.modo = 'B';
  state.etapa = 11;
  state.currentHistoryId = null;
  const p = state.personagem;
  const items = Array.isArray(actor.items) ? actor.items : [];
  const classItem = items.find(item => item.type === 'class');
  const subclassItem = items.find(item => item.type === 'subclass');
  const raceItem = items.find(item => item.type === 'race');
  const backgroundItem = items.find(item => item.type === 'background');
  const translated = item => item?.flags?.dnd5eSheetBuilder?.translatedFrom || item?.name || '';
  const sourceKey = item => item?.flags?.dnd5eSheetBuilder?.sourceKey || null;

  p.nome = actor.name || '';
  p.classe = sourceKey(classItem) || encontrarChavePorNome(CLASSES, translated(classItem), typeof FOUNDRY_CLASS_EN_MAP !== 'undefined' ? FOUNDRY_CLASS_EN_MAP : null);
  p.subclasse = sourceKey(subclassItem) || encontrarSubclassePorNome(p.classe, translated(subclassItem));
  p.raca = sourceKey(raceItem) || encontrarChavePorNome(RACES, translated(raceItem), typeof FOUNDRY_RACE_EN_MAP !== 'undefined' ? FOUNDRY_RACE_EN_MAP : null);
  p.origem = sourceKey(backgroundItem) || encontrarChavePorNome(BACKGROUNDS, translated(backgroundItem), typeof FOUNDRY_BACKGROUND_EN_MAP !== 'undefined' ? FOUNDRY_BACKGROUND_EN_MAP : null);
  p.nivel = Number(classItem?.system?.levels || 1);
  p.xp = Number(actor.system?.details?.xp?.value || 0);

  ATTRIBUTE_LIST.forEach(attr => {
    const code = FOUNDRY_ABILITY_MAP[attr];
    p.atributos[attr] = Number(actor.system?.abilities?.[code]?.value || p.atributos[attr] || 10);
  });

  p.periciasFinais = Object.entries(FOUNDRY_SKILL_MAP)
    .filter(([,code]) => Number(actor.system?.skills?.[code]?.value || 0) > 0)
    .map(([pt]) => pt);

  p.personalidade.tracos = String(actor.system?.details?.trait || '').split('\n').map(v => v.trim()).filter(Boolean);
  p.personalidade.ideais = String(actor.system?.details?.ideal || '').split('|').map(v => v.trim()).filter(Boolean);
  p.personalidade.vinculos = String(actor.system?.details?.bond || '').split('|').map(v => v.trim()).filter(Boolean);
  p.personalidade.defeitos = String(actor.system?.details?.flaw || '').split('|').map(v => v.trim()).filter(Boolean);
  p.personalidade.descricaoGeral = actor.system?.details?.biography?.value || '';
  p.personalidade.aparencia = actor.system?.details?.appearance || '';
  p.personalidade.historia = actor.system?.details?.biography?.public || '';

  prepararFichaImportada();

  const equippedArmor = items.find(item => item.type === 'equipment' && item.system?.type?.value && ['light','medium','heavy'].includes(item.system.type.value) && item.system?.equipped);
  const equippedShield = items.find(item => item.type === 'equipment' && item.system?.type?.baseItem === 'shield' && item.system?.equipped);
  const equippedWeapons = items.filter(item => item.type === 'weapon' && item.system?.equipped);
  p.combate.armadura = sourceKey(equippedArmor) || encontrarChavePorNome(ARMORS, translated(equippedArmor), typeof FOUNDRY_ARMOR_EN_MAP !== 'undefined' ? FOUNDRY_ARMOR_EN_MAP : null) || p.combate.armadura;
  p.combate.escudo = !!equippedShield;
  p.combate.armaPrincipal = sourceKey(equippedWeapons[0]) || encontrarChavePorNome(WEAPONS, translated(equippedWeapons[0]), typeof FOUNDRY_WEAPON_EN_MAP !== 'undefined' ? FOUNDRY_WEAPON_EN_MAP : null) || p.combate.armaPrincipal;
  p.combate.armaSecundaria = sourceKey(equippedWeapons[1]) || encontrarChavePorNome(WEAPONS, translated(equippedWeapons[1]), typeof FOUNDRY_WEAPON_EN_MAP !== 'undefined' ? FOUNDRY_WEAPON_EN_MAP : null) || p.combate.armaSecundaria;

  p.inventario.moedas = Object.assign({}, p.inventario.moedas, actor.system?.currency || {});
  p.magia.listaTruques = items.filter(item => item.type === 'spell' && Number(item.system?.level || 0) === 0).map(item => translated(item));
  p.magia.listaMagias = items.filter(item => item.type === 'spell' && Number(item.system?.level || 0) > 0).map(item => `${translated(item)} (${Number(item.system?.level || 0)}º)`);
  if (Array.isArray(p.magia.espacosAtuais) && actor.system?.spells) {
    const slots = p.magia.espacos.map((_, index) => Number(actor.system.spells?.[`spell${index+1}`]?.value ?? p.magia.espacos[index] ?? 0));
    if (slots.length) p.magia.espacosAtuais = slots;
  }

  p.inventario.itens = items
    .filter(item => ['loot','equipment'].includes(item.type) && !(item.system?.type?.value && ['light','medium','heavy'].includes(item.system.type.value)) && item.system?.type?.baseItem !== 'shield')
    .map((item, index) => ({
      key: item.flags?.dnd5eSheetBuilder?.sourceKey || `importado_${index}`,
      nome: translated(item),
      quantidade: Number(item.system?.quantity || 1),
      pesoUnitario: Number(item.system?.weight?.value || 0),
      pesoTotal: Number((Number(item.system?.weight?.value || 0) * Number(item.system?.quantity || 1)).toFixed(2))
    }));

  recalcularTudo();
  salvarEstado();
}

function importarJsonParaEditar(obj){
  if (obj?.schema === 'mini-foundry-offline-1') {
    aplicarPayloadBackupNaFicha(obj);
    return 'backup';
  }
  if (obj?.modo && obj?.personagem) {
    Object.keys(state).forEach(key => delete state[key]);
    Object.assign(state, obj);
    state.currentHistoryId = null;
    ensureStateShape();
    recalcularTudo();
    salvarEstado();
    return 'estado';
  }
  if (obj?.type === 'character' && obj?.system && Array.isArray(obj?.items)) {
    aplicarActorFoundryNaFicha(obj);
    return 'foundry';
  }
  throw new Error('Formato de JSON não reconhecido para edição da ficha.');
}

function garantirInputImportacao(){
  let input = document.getElementById('importarFichaJsonInput');
  if (input) return input;
  input = document.createElement('input');
  input.type = 'file';
  input.id = 'importarFichaJsonInput';
  input.accept = '.json,application/json';
  input.style.display = 'none';
  input.addEventListener('change', async (event) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;
    try {
      const texto = await arquivo.text();
      const json = JSON.parse(texto);
      importarJsonParaEditar(json);
      window.alert('JSON importado. A ficha foi carregada para edição.');
      render();
    } catch (err) {
      console.error('Falha ao importar JSON para edição:', err);
      window.alert('Não foi possível importar este JSON para edição.');
    } finally {
      event.target.value = '';
    }
  });
  document.body.appendChild(input);
  return input;
}

function abrirImportadorJsonFicha(){
  garantirInputImportacao().click();
}

function irParaTelaInicial(){
  state.etapa = 1;
  salvarEstado();
  render();
  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(err) { window.scrollTo(0,0); }
}

function salvarFichaNoHistorico(asCopy=false){
  const entry = upsertCharacterInHistory({ asCopy });
  window.alert(asCopy ? 'Ficha salva como cópia no histórico.' : 'Ficha salva no histórico.');
  return entry;
}

function abrirFichaDoHistorico(id){
  if (!loadCharacterFromHistory(id)) {
    window.alert('Não foi possível carregar esta ficha do histórico.');
    return;
  }
  render();
}

function duplicarFichaDoHistorico(id){
  const entry = duplicateCharacterInHistory(id);
  if (!entry) return window.alert('Não foi possível duplicar a ficha.');
  render();
}

function excluirFichaDoHistorico(id){
  const ok = window.confirm('Deseja excluir esta ficha do histórico?');
  if (!ok) return;
  deleteCharacterFromHistory(id);
  render();
}

function limparBancoCompleto(){
  const ok = window.confirm('Isso vai apagar a ficha atual e todo o histórico salvo no navegador. Deseja continuar?');
  if (!ok) return;
  clearCharacterHistory();
  limparEstado();
  resetStateToInitial();
  salvarEstado();
  render();
  window.alert('Banco local limpo com sucesso.');
}

function renderListaHistorico(){
  const history = getCharacterHistory().sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  if (!history.length) return '<div class="info-box"><p class="muted">Nenhum personagem salvo no histórico ainda.</p></div>';
  return `<div class="history-list">${history.map(entry => {
    const classeNome = entry.classe && CLASSES[entry.classe] ? CLASSES[entry.classe].nome : (entry.snapshot?.personagem?.classe ? nomeCatalogo(CLASSES, entry.snapshot.personagem.classe) : '-');
    const racaNome = entry.raca && RACES[entry.raca] ? RACES[entry.raca].nome : (entry.snapshot?.personagem?.raca ? nomeCatalogo(RACES, entry.snapshot.personagem.raca) : '-');
    const nivel = entry.nivel || entry.snapshot?.personagem?.nivel || 1;
    return `<div class="history-item"><div><strong>${entry.nome || 'Personagem sem nome'}</strong><br><small class="muted">${classeNome} • ${racaNome} • nível ${nivel}</small><br><small class="muted">Atualizado em ${new Date(entry.updatedAt).toLocaleString('pt-BR')}</small></div><div class="history-actions"><button class="small" onclick="abrirFichaDoHistorico('${entry.id}')">Editar ficha</button><button class="small secondary" onclick="duplicarFichaDoHistorico('${entry.id}')">Duplicar</button><button class="small danger" onclick="excluirFichaDoHistorico('${entry.id}')">Excluir</button></div></div>`;
  }).join('')}</div>`;
}

function buildTopToolbar(){
  return `<div class="toolbar-inline toolbar-wrap"><div class="step-indicator">Etapa ${state.etapa} de 11 — ${STEP_LABELS[state.etapa]}</div><div class="toolbar-actions"><button class="small secondary" onclick="irParaTelaInicial()">Tela inicial</button><button class="small secondary" onclick="salvarFichaNoHistorico(false)">Salvar no histórico</button><button class="small secondary" onclick="abrirImportadorJsonFicha()">Importar JSON</button><button class="small danger" onclick="limparBancoCompleto()">Limpar banco</button></div></div>`;
}

renderPassoBase = function(titulo, conteudo){
  garantirInputImportacao();
  app.innerHTML = `<div class="card">${buildTopToolbar()}<h2>${titulo}</h2>${conteudo}</div>`;
};

renderEscolhaModo = function(){
  renderPassoBase('Início', `<p>Escolha um modo para começar uma nova ficha, volte ao histórico ou importe um JSON para continuar editando.</p><div class="actions"><button onclick="selecionarModo('A')">Modo A — Criação Oficial</button><button onclick="selecionarModo('B')">Modo B — Criação Livre</button><button class="secondary" onclick="abrirImportadorJsonFicha()">Importar JSON para editar</button></div><h3>Histórico de personagens</h3>${renderListaHistorico()}`);
};

reiniciar = function(){
  resetStateToInitial();
  state.currentHistoryId = null;
  salvarEstado();
  irParaTelaInicial();
};

confirmarLimpezaLocalStorage = function(){
  limparBancoCompleto();
};

const _renderResumoOriginal = renderResumo;
renderResumo = function(){
  _renderResumoOriginal();
  const actions = app.querySelector('.actions');
  if (actions && !actions.querySelector('.history-save-button')) {
    actions.insertAdjacentHTML('afterbegin', `<button class="secondary history-save-button" onclick="salvarFichaNoHistorico(false)">Salvar no histórico</button><button class="secondary history-save-button" onclick="salvarFichaNoHistorico(true)">Salvar como cópia</button><button class="secondary history-save-button" onclick="irParaTelaInicial()">Tela inicial</button>`);
  }
};

window.abrirImportadorJsonFicha = abrirImportadorJsonFicha;
window.irParaTelaInicial = irParaTelaInicial;
window.salvarFichaNoHistorico = salvarFichaNoHistorico;
window.abrirFichaDoHistorico = abrirFichaDoHistorico;
window.duplicarFichaDoHistorico = duplicarFichaDoHistorico;
window.excluirFichaDoHistorico = excluirFichaDoHistorico;
window.limparBancoCompleto = limparBancoCompleto;
