/* Validações por etapa. Cada item é { nivel, msg, campo }; campo é o id do elemento, para rolar e focar.
   nivel "erro": bloqueia o avanço. nivel "aviso": só informa.
   Regra de jogo (limite de pontos, −2 em desvantagens, incompatibilidade, Maestria): "erro" no modo estrito,
   "aviso" no modo livre. Erro de formato (valor fora da faixa, id desconhecido) bloqueia nos dois modos.
   Mensagens em português. Depende de engine.js (carregado antes da chamada, não na leitura). */

function tdtNivelRegra(modo){ return modo === "estrito" ? "erro" : "aviso"; }

function tdtChecarConceito(p, modo, add){
  if(!String(p.nome || "").trim()) add(tdtNivelRegra(modo), "Informe o nome do personagem.", "nome");
  const ids = TDT_RULES.niveisDePoder.map(x => x.id);
  if(p.nivelPoder !== "livre" && !ids.includes(p.nivelPoder)) add("erro", "Escolha um nível de poder da lista ou Pontos livres.", "nivel-poder");
  if(!tdtInteiro(p.pontosTotal) || p.pontosTotal < 0) add("erro", "Pontos totais devem ser um inteiro igual ou maior que zero.", "pontos-total");
  const preset = TDT_RULES.niveisDePoder.find(x => x.id === p.nivelPoder);
  if(preset && p.pontosTotal !== preset.pontos) add("erro", "No nível " + preset.nome + " os pontos totais são " + preset.pontos + ".", "nivel-poder");
}

function tdtChecarArquetipo(p, add){
  if(Array.isArray(p.arquetipo) && p.arquetipo.length > 1){ add("erro", "No máximo 1 arquétipo.", "arquetipo"); return; }
  const id = tdtArquetipoId(p);
  if(!id){ add("aviso", "Escolha um arquétipo. Sem arquétipo, o custo considerado é 0.", "arquetipo"); return; }
  const r = tdtArquetipoRegra(id);
  if(!r){ add("erro", "Arquétipo fora da lista de rules.js.", "arquetipo"); return; }
  if(r.custo === null) add("aviso", "Custo do arquétipo " + r.nome + " não verificado (NÃO VERIFICADO): os pontos ficam a definir.", "arquetipo");
}

function tdtChecarAtributos(p, add){
  const min = TDT_RULES.criacao.atributoMin, max = TDT_RULES.criacao.atributoMax, rec = TDT_RULES.criacao.atributoRecomendadoMin;
  TDT_RULES.atributos.forEach(a => {
    const v = (p.atributos || {})[a.id], campo = "atr-" + a.id;
    if(!tdtInteiro(v) || v < min || v > max) add("erro", a.nome + " deve ser um inteiro de " + min + " a " + max + ".", campo);
    else if(v < rec) add("aviso", "Recomenda-se pelo menos " + rec + " em " + a.nome + ".", campo);
  });
}

function tdtChecarPericias(p, add){
  const vistos = new Set();
  (p.pericias || []).forEach(id => {
    const r = tdtPericiaRegra(id), campo = "pericia-" + id;
    if(!r) add("erro", "Perícia fora da lista de rules.js: " + id + ".", campo);
    else if(vistos.has(id)) add("erro", "Perícia repetida: " + r.nome + ".", campo);
    vistos.add(id);
  });
}

function tdtChecarVantagens(p, reg, add){
  const vistos = new Set();
  (p.vantagens || []).forEach((v, i) => {
    const campo = "vant-item-" + i, r = tdtVantagemRegra(v.id);
    if(!r){ add("erro", "Vantagem fora da lista de rules.js: " + v.id + ".", campo); return; }
    if(!r.multiplo && vistos.has(v.id)) add("erro", r.nome + " só pode ser escolhida uma vez.", campo);
    vistos.add(v.id);
    if(r.multiplo){
      if(!tdtInteiro(v.qtd) || v.qtd < 1) add("erro", "Quantidade de " + r.nome + " deve ser um inteiro de 1 ou mais.", campo);
    } else if(v.qtd !== undefined && v.qtd !== null && v.qtd !== 1){
      add("erro", r.nome + " não pode ser comprada mais de uma vez.", campo);
    }
    if(r.custo === undefined){
      if(Array.isArray(r.custoOpcoes)){
        if(!r.custoOpcoes.includes(v.custo)) add("erro", "Custo de " + r.nome + " deve ser " + r.custoOpcoes.join(", ") + ".", campo);
      } else if(!tdtInteiro(v.custo) || v.custo < r.custoMin || v.custo > r.custoMax){
        add("erro", "Custo de " + r.nome + " deve ser de " + r.custoMin + " a " + r.custoMax + ".", campo);
      }
    }
    if(r.id === "maestria" && !(p.pericias || []).includes(v.nota)){
      add(reg, "Maestria exige uma perícia escolhida que o personagem tenha.", "vant-nota-" + i);
    }
  });
}

function tdtChecarDesvantagens(p, reg, add){
  const vistos = new Set();
  (p.desvantagens || []).forEach((d, i) => {
    const campo = "desv-item-" + i, r = tdtDesvantagemRegra(d.id);
    if(!r){ add("erro", "Desvantagem fora da lista de rules.js: " + d.id + ".", campo); return; }
    if(r.obs && /NPC/i.test(r.obs)) add("erro", r.nome + " é só para NPCs vilões e não pode ser escolhida pelo jogador.", campo);
    if(!r.multiplo && vistos.has(d.id)) add("erro", r.nome + " só pode ser escolhida uma vez.", campo);
    vistos.add(d.id);
    const min = r.valor !== undefined ? r.valor : r.valorMin;
    const max = r.valor !== undefined ? r.valor : r.valorMax;
    if(!tdtInteiro(d.valor) || d.valor < min || d.valor > max) add("erro", "Valor de " + r.nome + " deve ser de " + min + " a " + max + ".", campo);
  });
}

/* Regras que valem a partir da etapa 3: saldo, limite de −2 em desvantagens e incompatibilidades. */
function tdtChecarGlobal(p, reg, add){
  const soma = tdtValorDesvantagens(p), limite = TDT_RULES.criacao.desvantagensMax;
  if(soma !== null && soma < -limite) add(reg, "As desvantagens somam " + soma + "; o limite é −" + limite + ".", "contador-pontos");
  const r = tdtResumoPontos(p);
  if(r.saldo !== null && r.saldo < 0) add(reg, "Gastos: " + r.gastos + " de " + r.disponiveis + " disponíveis; faltam " + (-r.saldo) + " pontos.", "contador-pontos");
  tdtIncompatibilidades(p).forEach(par => {
    const campo = par.a.tipo === "vant" ? "vant-item-" + par.a.i : "desv-item-" + par.a.i;
    add(reg, par.a.regra.nome + " é incompatível com " + par.b.regra.nome + ".", campo);
  });
}

/* Itens de uma etapa. Na etapa 7 (Revisão) devolve tudo, sem repetir as regras globais. */
function tdtValidarEtapa(n, p, modo){
  const itens = [];
  const add = (nivel, msg, campo) => itens.push({ nivel, msg, campo });
  const reg = tdtNivelRegra(modo);
  if(n === 1) tdtChecarConceito(p, modo, add);
  else if(n === 2) tdtChecarArquetipo(p, add);
  else if(n === 3){ tdtChecarAtributos(p, add); tdtChecarGlobal(p, reg, add); }
  else if(n === 4){ tdtChecarPericias(p, add); tdtChecarGlobal(p, reg, add); }
  else if(n === 5){ tdtChecarVantagens(p, reg, add); tdtChecarGlobal(p, reg, add); }
  else if(n === 6){ tdtChecarDesvantagens(p, reg, add); tdtChecarGlobal(p, reg, add); }
  else if(n === 7) return tdtValidarTudo(p, modo);
  return itens;
}

function tdtValidarTudo(p, modo){
  const itens = [];
  const add = (nivel, msg, campo) => itens.push({ nivel, msg, campo });
  const reg = tdtNivelRegra(modo);
  tdtChecarConceito(p, modo, add);
  tdtChecarArquetipo(p, add);
  tdtChecarAtributos(p, add);
  tdtChecarPericias(p, add);
  tdtChecarVantagens(p, reg, add);
  tdtChecarDesvantagens(p, reg, add);
  tdtChecarGlobal(p, reg, add);
  return itens;
}
