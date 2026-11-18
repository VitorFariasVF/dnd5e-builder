/* Cálculos da ficha 3DeT Victory. Funções puras (sem DOM), testadas em tests/engine.test.js.
   Todo número vem de TDT_RULES (rules.js). Quando falta dado (atributo vazio, custo de arquétipo NÃO VERIFICADO),
   a função devolve null, e a tela mostra "a definir", nunca um palpite. */

function tdtInteiro(v){ return typeof v === "number" && Number.isInteger(v); }

/* Arquétipo como id único. Lista (dado antigo ou inválido) cai no primeiro item; o validador acusa mais de um. */
function tdtArquetipoId(p){
  const a = p && p.arquetipo;
  if(Array.isArray(a)) return a[0] || "";
  return a || "";
}

function tdtAchar(lista, id){ return (lista || []).find(x => x.id === id) || null; }
function tdtVantagemRegra(id){ return tdtAchar(TDT_RULES.vantagens, id); }
function tdtDesvantagemRegra(id){ return tdtAchar(TDT_RULES.desvantagens, id); }
function tdtPericiaRegra(id){ return tdtAchar(TDT_RULES.pericias, id); }
function tdtArquetipoRegra(id){ return tdtAchar(TDT_RULES.arquetipos, id); }

/* PA = P×1, PM = H×5, PV = R×5. Atributo 0 vale o mínimo (1 ponto do recurso). Atributo vazio: null. */
function tdtRecursos(p){
  const at = p.atributos || {};
  const minimo = TDT_RULES.recursos.minimoComAtributoZero;
  const calc = rec => {
    const v = at[rec.atributo];
    if(!tdtInteiro(v)) return null;
    return v === 0 ? minimo : v * rec.mult;
  };
  return { PA: calc(TDT_RULES.recursos.PA), PM: calc(TDT_RULES.recursos.PM), PV: calc(TDT_RULES.recursos.PV) };
}

/* Cada ponto de atributo custa 1 (criacao.atributoCusto). Algum atributo vazio: null. */
function tdtCustoAtributos(p){
  let total = 0;
  for(const a of TDT_RULES.atributos){
    const v = (p.atributos || {})[a.id];
    if(!tdtInteiro(v)) return null;
    total += v * TDT_RULES.criacao.atributoCusto;
  }
  return total;
}

function tdtCustoPericias(p){
  return (p.pericias || []).length * TDT_RULES.periciaCusto;
}

/* Custo de uma vantagem comprada: custo fixo da regra, ou o custo escolhido (faixa ou opções),
   multiplicado pela quantidade quando a vantagem é "multiplo". Null se a escolha não existe. */
/* Custo em XP de uma qualidade de Artefato (PDF p139-141). Faixa escolhida (opcoes) ou xp fixo.
   Null se a qualidade não existe, não é calculada (aplicavel: false) ou falta a escolha da faixa. */
function tdtCustoQualidadeXP(q){
  const r = tdtAchar(TDT_RULES.qualidadesArtefato, q.id);
  if(!r || r.aplicavel === false) return null;
  if(Array.isArray(r.opcoes)){
    const o = r.opcoes.find(x => x.v === q.escolha);
    return o ? o.xp : null;
  }
  return tdtInteiro(r.xp) ? r.xp : null;
}

/* Custo de um Artefato em pontos: custo base (1 ponto = 10 XP) mais as qualidades em XP.
   O mínimo é 10 XP, mesmo com desvantagens (p139). Qualidades são múltiplos de 10 XP, então o resultado é inteiro.
   Null se o custo base ou alguma qualidade estiver pendente. */
function tdtCustoArtefato(v){
  if(!tdtInteiro(v.custo)) return null;
  let xp = v.custo * 10;
  for(const q of (v.qualidades || [])){
    const c = tdtCustoQualidadeXP(q);
    if(c === null) return null;
    xp += c;
  }
  return Math.max(10, xp) / 10;
}

function tdtCustoVantagem(v){
  const r = tdtVantagemRegra(v.id);
  if(!r) return null;
  if(r.itens) return tdtCustoArtefato(v);
  const qtd = r.multiplo ? (tdtInteiro(v.qtd) ? v.qtd : 1) : 1;
  const unitario = r.custo !== undefined ? r.custo : v.custo;
  if(!tdtInteiro(unitario)) return null;
  return unitario * qtd;
}

/* Veículo (PDF p140-142). Custo em XP = pontuação × 2 × 2^(escala−1); em pontos, divide-se por 10.
   Escala 1 com 10 pontos = 20 XP (2 pontos); escala 2 = 40 XP; escala 3 = 80 XP (p142). Gratuito (campanha de veículos, p142): 0.
   Pontuação abaixo de 10 ou fora de múltiplos de 5 não tem custo verificado: null. */
function tdtCustoVeiculo(v){
  if(v.gratuito === true) return 0;
  const r = TDT_RULES.veiculos;
  if(!tdtInteiro(v.escala) || v.escala < r.escalaMin || !tdtInteiro(v.pontos)) return null;
  if(v.pontos < r.pontosMin || v.pontos % r.pontosPasso !== 0) return null;
  const xp = v.pontos * r.xpPorPontoEscala1 * Math.pow(2, v.escala - 1);
  return xp / 10;
}

/* Soma do custo de todos os veículos da ficha (em pontos). Null se algum estiver pendente. */
function tdtCustoVeiculos(p){
  let total = 0;
  for(const v of (p.veiculos || [])){
    const c = tdtCustoVeiculo(v);
    if(c === null) return null;
    total += c;
  }
  return total;
}

/* Quanto a ficha do próprio veículo gasta: atributos + vantagens − desvantagens (limite de −2, como no personagem).
   Não entra no custo ao personagem; só confere com a pontuação do veículo. Null se algo estiver pendente. */
function tdtCustoFichaVeiculo(v){
  const at = tdtCustoAtributos(v), vt = tdtCustoVantagens(v), dv = tdtPontosDeDesvantagens(v);
  if(at === null || vt === null || dv === null) return null;
  return at + vt - dv;
}

function tdtCustoVantagens(p){
  let total = 0;
  for(const v of (p.vantagens || [])){
    const c = tdtCustoVantagem(v);
    if(c === null) return null;
    total += c;
  }
  return total;
}

/* Soma dos valores das desvantagens do jogador (negativa). Desvantagens do arquétipo NÃO entram aqui. */
function tdtValorDesvantagens(p){
  let soma = 0;
  for(const d of (p.desvantagens || [])){
    if(!tdtInteiro(d.valor)) return null;
    soma += d.valor;
  }
  return soma;
}

/* Pontos ganhos com desvantagens: o total negativo, limitado a criacao.desvantagensMax (2). */
function tdtPontosDeDesvantagens(p){
  const soma = tdtValorDesvantagens(p);
  if(soma === null) return null;
  return Math.max(0, Math.min(TDT_RULES.criacao.desvantagensMax, -soma));
}

/* Custo do arquétipo: 0 sem arquétipo (ou Humano), null se o id não existe ou se o custo não foi verificado. */
function tdtCustoArquetipo(p){
  const id = tdtArquetipoId(p);
  if(!id) return 0;
  const r = tdtArquetipoRegra(id);
  if(!r) return null;
  return r.custo;
}

/* Soma de tudo o que foi gasto. Null se algum custo estiver pendente. */
function tdtPontosGastos(p){
  const partes = [tdtCustoAtributos(p), tdtCustoPericias(p), tdtCustoVantagens(p), tdtCustoArquetipo(p), tdtCustoVeiculos(p)];
  if(partes.some(x => x === null)) return null;
  return partes.reduce((a, b) => a + b, 0);
}

/* Orçamento: pontos totais do nível + pontos ganhos com desvantagens. */
function tdtPontosDisponiveis(p){
  if(!tdtInteiro(p.pontosTotal)) return null;
  const d = tdtPontosDeDesvantagens(p);
  if(d === null) return null;
  return p.pontosTotal + d;
}

function tdtSaldo(p){
  const disp = tdtPontosDisponiveis(p);
  const gastos = tdtPontosGastos(p);
  if(disp === null || gastos === null) return null;
  return disp - gastos;
}

/* Resumo para a tela e o PDF. Tudo que depende de dado pendente vem null. */
function tdtResumoPontos(p){
  return {
    disponiveis: tdtPontosDisponiveis(p),
    gastos: tdtPontosGastos(p),
    saldo: tdtSaldo(p),
    valorDesvantagens: tdtValorDesvantagens(p),
    pontosDeDesvantagens: tdtPontosDeDesvantagens(p),
    custoArquetipo: tdtCustoArquetipo(p),
    custoVeiculos: tdtCustoVeiculos(p)
  };
}

/* Pares incompatíveis entre as escolhas: vantagem×desvantagem e vantagem×vantagem.
   A regra vale nos dois sentidos (campo `incompativel` de cada lado). Devolve { a, b } com tipo, índice, id e nome. */
function tdtIncompatibilidades(p){
  const itens = [];
  const todos = [];
  (p.vantagens || []).forEach((v, i) => { const r = tdtVantagemRegra(v.id); if(r) todos.push({ tipo: "vant", i, id: v.id, regra: r }); });
  (p.desvantagens || []).forEach((d, i) => { const r = tdtDesvantagemRegra(d.id); if(r) todos.push({ tipo: "desv", i, id: d.id, regra: r }); });
  for(let x = 0; x < todos.length; x++){
    for(let y = x + 1; y < todos.length; y++){
      const A = todos[x], B = todos[y];
      const conflito = (A.regra.incompativel || []).includes(B.id) || (B.regra.incompativel || []).includes(A.id);
      if(conflito) itens.push({ a: A, b: B });
    }
  }
  return itens;
}

/* Criação orientada: sugestão de P, H e R para um nível de poder e um arquétipo. Função pura.
   Orçamento dos atributos = pontos do nível − custo do arquétipo. Perícias, vantagens e desvantagens ficam fora.
   Regras do manual (PT p.33–39 e p.130): atributos de 0 a 5, 1 ponto cada, sem passar de 5 na criação;
   recomenda-se pelo menos 1 em cada. O livro NÃO traz distribuição sugerida por arquétipo: a sugestão é
   equilibrada (diferença máxima de 1 entre atributos), sem prioridade do livro.
   Devolve null se o nível ou o arquétipo não existem, ou se o custo do arquétipo não foi verificado.
   `restante` são os pontos que sobram para perícias e vantagens (com nível 20 ou 35 os atributos não consomem tudo). */
function tdtSugerirAtributos(nivelId, arquetipoId){
  const nivel = tdtAchar(TDT_RULES.niveisDePoder, nivelId);
  if(!nivel || !arquetipoId) return null;
  const arq = tdtArquetipoRegra(arquetipoId);
  if(!arq || !tdtInteiro(arq.custo)) return null;
  const orcamento = nivel.pontos - arq.custo;
  if(orcamento < 0) return null;

  const { atributoMin, atributoMax, atributoRecomendadoMin, atributoCusto } = TDT_RULES.criacao;
  const ids = TDT_RULES.atributos.map(a => a.id);
  const unidades = Math.min(Math.floor(orcamento / atributoCusto), ids.length * atributoMax);
  const minimo = unidades >= ids.length * atributoRecomendadoMin ? atributoRecomendadoMin : atributoMin;

  const valores = {};
  ids.forEach(id => { valores[id] = minimo; });
  let usado = minimo * ids.length;
  for(let k = 0; usado < unidades; k++){
    const id = ids[k % ids.length];
    if(valores[id] < atributoMax){ valores[id]++; usado++; }
  }

  const gastoAtributos = usado * atributoCusto;
  return Object.assign({}, valores, {
    pontosNivel: nivel.pontos,
    custoArquetipo: arq.custo,
    gastoAtributos,
    restante: nivel.pontos - arq.custo - gastoAtributos
  });
}
