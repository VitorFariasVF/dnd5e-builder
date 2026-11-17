/* Cálculos da ficha Tormenta20 (funções puras: sem DOM, testáveis em Node).
   Regras e fontes estão em rules*.js. Quando um dado não foi verificado ou não existe na fonte, o cálculo devolve null
   em vez de chutar um número: a ficha mostra NÃO VERIFICADO e o jogador pode digitar PV, PM ou treino à mão
   (campos pvManual, pmManual e treinoManual; null = calculado). */

/* Atributos ---------------------------------------------------------- */
function t20Modificador(valor){ return Number(valor) || 0; }   // T20: o modificador é o próprio valor
function t20FormatarBonus(n){ return (n >= 0 ? "+" : "") + n; }
function t20NumeroOuNulo(v){
  if(v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

function t20CustoAtributo(valor){
  const c = T20_PONTOS_COMPRA.custos[String(valor)];
  return c === undefined ? null : c;
}
/* Pontos gastos na compra. Retorna null se algum valor estiver fora da tabela. */
function t20PontosGastos(base){
  let total = 0;
  for(const id of T20_ATRIBUTO_IDS){
    const c = t20CustoAtributo(Number(base[id]));
    if(c === null) return null;
    total += c;
  }
  return total;
}

/* Raça: cadastro único em rules-racas.js (T20_RACAS_COMPLETAS). */
function t20RacaInfo(racaId){ return (racaId && T20_RACAS_COMPLETAS[racaId]) || null; }
function t20AjusteRacial(racaId){
  const r = t20RacaInfo(racaId);
  const aj = r && r.ajustes ? r.ajustes : {};
  return Object.fromEntries(T20_ATRIBUTO_IDS.map(id => [id, Number(aj[id]) || 0]));
}
/* Valor final = compra + raça + ajuste manual (o usuário lança o ajuste quando a raça não foi verificada). */
function t20AtributosFinais(p){
  const racial = t20AjusteRacial(p.raca);
  return Object.fromEntries(T20_ATRIBUTO_IDS.map(id => [
    id, (Number(p.atributosBase[id]) || 0) + racial[id] + (Number(p.ajusteManual[id]) || 0)
  ]));
}

/* Níveis e progressão ----------------------------------------------- */
function t20Metade(nivel){ return Math.floor((Number(nivel) || 0) / 2); }

/* Linha de T20_NIVEIS para a classe e o nível (6 a 20). Null fora disso ou se a classe não existe. */
function t20LinhaNivel(classeId, nivel){
  const cls = classeId ? T20_NIVEIS.classes[classeId] : null;
  if(!cls) return null;
  return cls.niveis.find(l => l.nivel === Number(nivel)) || null;
}
/* PV e PM ganhos NO nível k. Até T20_NIVEL_BASE vêm de rules.js; depois, de T20_NIVEIS (null = não verificado). */
function t20PVNivel(classeId, k){
  const c = T20_CLASSES[classeId];
  if(!c) return null;
  if(k <= T20_NIVEL_BASE) return c.pvNivel;
  const l = t20LinhaNivel(classeId, k);
  return l ? l.pv : null;
}
function t20PMNivel(classeId, k){
  const c = T20_CLASSES[classeId];
  if(!c) return null;
  if(k <= T20_NIVEL_BASE) return c.pmNivel;
  const l = t20LinhaNivel(classeId, k);
  return l ? l.pm : null;
}

/* PV total no nível n: PV inicial + CON no 1º nível; cada nível soma o PV do nível + CON (CON conta em todos os níveis).
   Retorna null se a classe não tem PV confirmado para algum nível até n. */
function t20PVTotal(classe, nivel, con){
  const c = T20_CLASSES[classe];
  if(!c || c.pvInicial === null) return null;
  const n = Number(nivel) || 1;
  let total = c.pvInicial + (Number(con) || 0) * n;
  for(let k = 2; k <= n; k++){
    const pv = t20PVNivel(classe, k);
    if(pv === null) return null;
    total += pv;
  }
  return total;
}
/* PM total: soma o PM de cada nível até n. Conjuradores somam o modificador do atributo-chave (uma vez, no total).
   Retorna null se algum nível não tem PM informado. */
function t20PMTotal(classe, nivel, valorAtributoMagia){
  const c = T20_CLASSES[classe];
  if(!c) return null;
  const n = Number(nivel) || 1;
  let total = 0;
  for(let k = 1; k <= n; k++){
    const pm = t20PMNivel(classe, k);
    if(pm === null) return null;
    total += pm;
  }
  return total + (c.conjurador ? Number(valorAtributoMagia) || 0 : 0);
}
/* Selos. PV e PM até o nível base seguem a flag de rules.js (verificadoPv, que cobre PV e PM);
   do nível 6 em diante, cada linha de T20_NIVEIS precisa estar marcada como verificada. */
function t20PVVerificado(classe, nivel){
  const c = T20_CLASSES[classe];
  if(!c || !c.verificadoPv) return false;
  for(let k = T20_NIVEL_BASE + 1; k <= (Number(nivel) || 1); k++){
    const l = t20LinhaNivel(classe, k);
    if(!l || !l.verificado.pv) return false;
  }
  return true;
}
function t20PMVerificado(classe, nivel){
  const c = T20_CLASSES[classe];
  if(!c || !c.verificadoPv) return false;
  for(let k = T20_NIVEL_BASE + 1; k <= (Number(nivel) || 1); k++){
    const l = t20LinhaNivel(classe, k);
    if(!l || !l.verificado.pm) return false;
  }
  return true;
}

/* Bônus de treino: metade do nível (rules.js). Do 6º nível em diante vem da linha de T20_NIVEIS da classe. */
function t20TreinoNivel(classe, nivel){
  const n = Number(nivel) || 1;
  if(n > T20_NIVEL_BASE){
    const l = t20LinhaNivel(classe, n);
    if(l && l.treino !== null) return l.treino;
  }
  return t20Metade(n);
}
/* O campo treino de T20_NIVEIS é uma regra de 1 fonte ([R]); só fica verificado se o próprio dado disser isso. */
function t20TreinoVerificado(){ return T20_NIVEIS.treino.verificado === true; }

function t20Defesa(destreza, def){
  const d = def || {};
  return 10 + Number(destreza || 0) + (Number(d.armadura) || 0) + (Number(d.escudo) || 0) + (Number(d.outros) || 0);
}
function t20Deslocamento(racaId){
  const r = t20RacaInfo(racaId);
  return r ? r.deslocamento : null;
}
/* Círculo máximo até o 5º nível (tabela de rules.js; NÃO VERIFICADO). */
function t20CirculoMaximo(nivel){
  let c = 0;
  for(const linha of T20_CIRCULOS){ if((Number(nivel) || 1) >= linha.nivel) c = linha.circulo; }
  return c;
}
/* Círculo máximo da classe: até o nível base, a tabela de rules.js; depois, o círculo da linha da classe.
   Retorna null se a linha não traz o círculo. Não conjurador: 0. */
function t20CirculoMaximoClasse(classe, nivel){
  const n = Number(nivel) || 1;
  const c = T20_CLASSES[classe];
  if(!c || !c.conjurador) return 0;
  if(n <= T20_NIVEL_BASE) return t20CirculoMaximo(n);
  const l = t20LinhaNivel(classe, n);
  return l ? l.circulo : null;
}
function t20CirculoVerificado(classe, nivel){
  const n = Number(nivel) || 1;
  if(n <= T20_NIVEL_BASE) return false;   // tabela de rules.js: NÃO VERIFICADO
  const l = t20LinhaNivel(classe, n);
  return !!(l && l.verificado.circulo);
}

/* Linhas de nível do 6º ao nível do personagem, para a tabela da ficha e o PDF. */
function t20NiveisTabela(classe, nivel){
  const linhas = [];
  for(let k = T20_NIVEL_BASE + 1; k <= (Number(nivel) || 1); k++){
    const l = t20LinhaNivel(classe, k);
    if(!l) continue;
    linhas.push({ nivel: k, pv: l.pv, pm: l.pm, treino: l.treino, circulo: l.circulo, poderDeClasse: l.poderDeClasse,
      habilidades: l.habilidades, poderes: l.poderes, verificado: l.verificado });
  }
  return linhas;
}
/* Habilidades de classe do 6º ao nível do personagem: [{ nivel, nome, frase }] (frase null = efeito não lido). */
function t20HabilidadesClasse(classe, nivel){
  const out = [];
  t20NiveisTabela(classe, nivel).forEach(l => l.habilidades.forEach(h => out.push({ nivel: l.nivel, nome: h.nome, frase: h.frase })));
  return out;
}

/* Perícias ---------------------------------------------------------- */
function t20Pericia(nome){ return T20_PERICIAS.find(p => p.nome === nome) || null; }

/* Quantas perícias o personagem treina, por fonte:
   - fixas da classe (automáticas);
   - grupo fixo (uma opção entre as da lista);
   - livres: perícias por nível × nível + Inteligência positiva (uma vez) + extras da raça (Versátil). */
function t20PericiasDisponiveis(p, atributosFinais){
  const c = T20_CLASSES[p.classe];
  if(!c) return null;
  const grupo = c.grupoFixo ? c.grupoFixo.qtd : 0;
  const intPos = Math.max(0, Number(atributosFinais.inteligencia) || 0);
  const racial = (t20RacaInfo(p.raca) || {}).periciasExtras || 0;
  const livres = c.periciasPorNivel * (Number(p.nivel) || 1) + intPos + racial;
  return { fixas: c.fixas.slice(), grupoFixoQtd: grupo, livres, extraRacial: racial, intPos };
}

/* Conjuração ------------------------------------------------------- */
function t20MagiasConhecidasLimite(classeId, nivel){
  const c = T20_CLASSES[classeId];
  if(!c || !c.conjurador) return 0;
  return (Number(nivel) || 1) === 1 ? c.magiasNivel1 : null;   // nível > 1: NÃO VERIFICADO
}

/* Catálogo de magias (rules-magias.js). Retorna cópia com `pendente` (true = só o índice foi conferido). */
function t20MagiaCatalogo(nome){
  const n = String(nome == null ? "" : nome).trim();
  if(!n) return null;
  const m = T20_MAGIAS.find(x => x.nome === n);
  if(m) return Object.assign({}, m, { pendente: false });
  const q = T20_MAGIAS_PENDENTES.find(x => x.nome === n);
  return q ? Object.assign({}, q, { pendente: true }) : null;
}
function t20MagiasDoCirculo(circulo){
  const c = Number(circulo);
  return [
    ...T20_MAGIAS.filter(m => m.circulo === c).map(m => Object.assign({}, m, { pendente: false })),
    ...T20_MAGIAS_PENDENTES.filter(q => q.circulo === c).map(q => Object.assign({}, q, { pendente: true }))
  ];
}

/* Catálogo de poderes (rules-poderes.js). Disponíveis para a classe até o nível: de classe (da classe escolhida),
   gerais e concedidos (sem classe) e nível de acesso igual ou abaixo do nível do personagem (ou não informado). */
function t20PoderesDisponiveis(classe, nivel){
  const n = Number(nivel) || 1;
  return Object.values(T20_PODERES).filter(pd =>
    (pd.classes.length === 0 || (!!classe && pd.classes.includes(classe))) && (pd.nivel === null || pd.nivel <= n));
}
/* Checagem mecânica de um poder escolhido. `entrada` = { id, nivel } da ficha; `finais` = atributos finais;
   `treinadas` = Set de perícias treinadas. Devolve [{ msg, mecanico }]: mecanico true = pré-requisito que o app
   confere (erro no modo estrito, aviso no livre); false = aviso sem checagem (texto ou nível não informado). */
function t20ChecarPoder(p, entrada, finais, treinadas){
  const pd = entrada && entrada.id ? T20_PODERES[entrada.id] : null;
  const itens = [];
  if(!pd) return itens;
  const tomada = Number(entrada.nivel) || 0;
  const mec = msg => itens.push({ msg, mecanico: true });
  const aviso = msg => itens.push({ msg, mecanico: false });
  if(pd.classes.length && !pd.classes.includes(p.classe)){
    mec(`${pd.nome} é poder de ${pd.classes.map(id => (T20_CLASSES[id] || {}).nome || id).join(" ou ")}.`);
  }
  if(pd.nivel === null) aviso(`${pd.nome}: nível de acesso NÃO VERIFICADO.`);
  else if(tomada < pd.nivel) mec(`${pd.nome} exige nível ${pd.nivel} (escolhido no ${tomada}º).`);
  for(const [atr, min] of Object.entries(pd.pre.atributos || {})){
    const v = Number((finais || {})[atr]) || 0;
    if(v < min) mec(`${pd.nome} exige ${T20_ATRIBUTO_NOME[atr]} ${min} (você tem ${v}).`);
  }
  for(const nomePericia of (pd.pre.pericias || [])){
    if(!treinadas || !treinadas.has(nomePericia)) mec(`${pd.nome} exige treinar em ${nomePericia}.`);
  }
  for(const pid of (pd.pre.poderes || [])){
    const req = T20_PODERES[pid];
    const tem = (p.poderes || []).some(x => x && x.id === pid && (Number(x.nivel) || 0) <= tomada);
    if(!tem) mec(`${pd.nome} exige ${req ? req.nome : pid} antes, no mesmo nível ou em um anterior.`);
  }
  if(pd.pre.nivel && (Number(p.nivel) || 0) < pd.pre.nivel) mec(`${pd.nome} exige personagem de nível ${pd.pre.nivel}.`);
  if(pd.pre.texto) aviso(`${pd.nome}: pré-requisito "${pd.pre.texto}" não é conferido pelo app.`);
  return itens;
}
/* Rótulos de tipo e de pré-requisito (usados pela tela e pelo PDF). */
function t20TipoRotulo(tipo){
  return ({ classe: "Poder de classe", geral: "Poder geral", concedido: "Poder concedido", origem: "Poder de origem" })[tipo] || "";
}
function t20TextoPre(pre){
  const partes = [];
  Object.entries(pre.atributos || {}).forEach(([a, v]) => partes.push(`${T20_ATRIBUTO_NOME[a]} ${v}`));
  (pre.pericias || []).forEach(n => partes.push(`treinado em ${n}`));
  (pre.poderes || []).forEach(id => partes.push(T20_PODERES[id] ? T20_PODERES[id].nome : id));
  if(pre.nivel) partes.push(`personagem nível ${pre.nivel}`);
  if(pre.texto) partes.push(pre.texto);
  return partes.join("; ");
}

/* Derivados completos ------------------------------------------------ */
function t20Derivados(p){
  const atr = t20AtributosFinais(p);
  const c = T20_CLASSES[p.classe] || null;
  const nivel = Number(p.nivel) || 1;
  const attrMagia = c && c.conjurador ? (p.atributoMagia || c.atributoMagiaPadrao) : null;
  const valorMagia = attrMagia ? atr[attrMagia] : 0;
  const treinadas = t20TreinadasLista(p);

  const pvManual = t20NumeroOuNulo(p.pvManual);
  const pmManual = t20NumeroOuNulo(p.pmManual);
  const treinoManual = t20NumeroOuNulo(p.treinoManual);
  const pvCalc = c ? t20PVTotal(p.classe, nivel, atr.constituicao) : null;
  const pmCalc = c ? t20PMTotal(p.classe, nivel, valorMagia) : null;
  const treinoCalc = t20TreinoNivel(p.classe, nivel);
  const treino = treinoManual !== null ? treinoManual : treinoCalc;

  const pericias = T20_PERICIAS.map(per => {
    const treinada = treinadas.has(per.nome);
    const base = atr[per.attr] || 0;
    return {
      nome: per.nome, attr: per.attr, treinada,
      bonus: base + (treinada ? treino : 0),
      soTreinado: !!per.soTreinado,
      penalidadeArmadura: !!per.penalidadeArmadura
    };
  });
  const habilidades = c ? t20HabilidadesClasse(p.classe, nivel) : [];
  return {
    atributos: atr,
    modificadores: Object.fromEntries(T20_ATRIBUTO_IDS.map(id => [id, t20Modificador(atr[id])])),
    pv: pvManual !== null ? pvManual : pvCalc,
    pvOrigem: pvManual !== null ? "manual" : (pvCalc !== null ? "calculado" : null),
    pvVerificado: c ? t20PVVerificado(p.classe, nivel) : false,
    pm: pmManual !== null ? pmManual : pmCalc,
    pmOrigem: pmManual !== null ? "manual" : (pmCalc !== null ? "calculado" : null),
    pmVerificado: c ? t20PMVerificado(p.classe, nivel) : false,
    defesa: t20Defesa(atr.destreza, p.defesa),
    deslocamento: t20Deslocamento(p.raca),
    bonusTreino: treino,
    treinoOrigem: treinoManual !== null ? "manual" : "calculado",
    treinoVerificado: t20TreinoVerificado(),
    atributoMagia: attrMagia,
    circuloMaximo: c && c.conjurador ? t20CirculoMaximoClasse(p.classe, nivel) : 0,
    circuloVerificado: c && c.conjurador ? t20CirculoVerificado(p.classe, nivel) : false,
    magiasLimite: t20MagiasConhecidasLimite(p.classe, nivel),
    pericias,
    treinadas: Array.from(treinadas),
    niveis: c ? t20NiveisTabela(p.classe, nivel) : [],
    habilidades,
    habilidadesSemEfeito: habilidades.filter(h => h.frase === null).length
  };
}

/* Lista de perícias treinadas: fixas + grupo + escolhas livres + benefícios de origem (tipo pericia) + extras. */
function t20TreinadasLista(p){
  const set = new Set();
  const c = T20_CLASSES[p.classe];
  if(c){
    c.fixas.forEach(n => set.add(n));
    if(c.grupoFixo && p.grupoFixoEscolha) set.add(p.grupoFixoEscolha);
  }
  (p.periciasEscolhidas || []).forEach(n => set.add(n));
  (p.origemBeneficios || []).forEach(b => { if(b && b.tipo === "pericia" && b.valor) set.add(b.valor); });
  return set;
}
