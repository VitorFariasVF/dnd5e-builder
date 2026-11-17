/* Cálculos da ficha Tormenta20 (funções puras: sem DOM, testáveis em Node).
   Regras e fontes estão em rules.js. Quando um dado não foi verificado, o cálculo devolve null
   em vez de chutar um número. */

/* Atributos ---------------------------------------------------------- */
function t20Modificador(valor){ return Number(valor) || 0; }   // T20: o modificador é o próprio valor
function t20FormatarBonus(n){ return (n >= 0 ? "+" : "") + n; }

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
function t20AjusteRacial(racaId){
  const r = T20_RACAS[racaId];
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

/* PV total no nível n: PV inicial + CON no 1º nível; a cada nível soma PV por nível + CON.
   Retorna null se os PV da classe não foram confirmados. */
function t20PVTotal(classe, nivel, con){
  const c = T20_CLASSES[classe];
  if(!c || c.pvInicial === null || c.pvNivel === null) return null;
  const n = Number(nivel) || 1;
  return c.pvInicial + c.pvNivel * (n - 1) + Number(con) * n;
}
/* PM total: PM por nível × nível. Conjuradores somam o modificador do atributo-chave (uma vez, no total). */
function t20PMTotal(classe, nivel, valorAtributoMagia){
  const c = T20_CLASSES[classe];
  if(!c) return null;
  const n = Number(nivel) || 1;
  const extra = c.conjurador ? Number(valorAtributoMagia) || 0 : 0;
  return c.pmNivel * n + extra;
}
function t20Defesa(destreza, def){
  const d = def || {};
  return 10 + Number(destreza || 0) + (Number(d.armadura) || 0) + (Number(d.escudo) || 0) + (Number(d.outros) || 0);
}
function t20Deslocamento(racaId){
  const r = T20_RACAS[racaId];
  return r ? r.deslocamento : null;
}
/* Circulo máximo disponível no nível do personagem (conjuradores). */
function t20CirculoMaximo(nivel){
  let c = 0;
  for(const linha of T20_CIRCULOS){ if((Number(nivel) || 1) >= linha.nivel) c = linha.circulo; }
  return c;
}

/* Perícias ---------------------------------------------------------- */
function t20Pericia(nome){ return T20_PERICIAS.find(p => p.nome === nome) || null; }

/* Quantas perícias o personagem treina, por fonte:
   - fixas da classe (automáticas);
   - grupo fixo (uma opção entre as da lista);
   - livres: perícias por nível × nível + Inteligência positiva (uma vez) + extras da raça. */
function t20PericiasDisponiveis(p, atributosFinais){
  const c = T20_CLASSES[p.classe];
  if(!c) return null;
  const grupo = c.grupoFixo ? c.grupoFixo.qtd : 0;
  const intPos = Math.max(0, Number(atributosFinais.inteligencia) || 0);
  const racial = (T20_RACAS[p.raca] || {}).extraPericiasTreinadas || 0;
  const livres = c.periciasPorNivel * (Number(p.nivel) || 1) + intPos + racial;
  return { fixas: c.fixas.slice(), grupoFixoQtd: grupo, livres, extraRacial: racial, intPos };
}

/* Conjuração ------------------------------------------------------- */
function t20MagiasConhecidasLimite(classeId, nivel){
  const c = T20_CLASSES[classeId];
  if(!c || !c.conjurador) return 0;
  return (Number(nivel) || 1) === 1 ? c.magiasNivel1 : null;   // nível > 1: NÃO VERIFICADO
}

/* Derivados completos ------------------------------------------------ */
function t20Derivados(p){
  const atr = t20AtributosFinais(p);
  const c = T20_CLASSES[p.classe] || null;
  const nivel = Number(p.nivel) || 1;
  const attrMagia = c && c.conjurador ? (p.atributoMagia || c.atributoMagiaPadrao) : null;
  const valorMagia = attrMagia ? atr[attrMagia] : 0;
  const treinadas = t20TreinadasLista(p);
  const pericias = T20_PERICIAS.map(per => {
    const treinada = treinadas.has(per.nome);
    const base = atr[per.attr] || 0;
    return {
      nome: per.nome, attr: per.attr, treinada,
      bonus: base + (treinada ? t20Metade(nivel) : 0),
      soTreinado: !!per.soTreinado,
      penalidadeArmadura: !!per.penalidadeArmadura
    };
  });
  const pvTotal = c ? t20PVTotal(p.classe, nivel, atr.constituicao) : null;
  const pmTotal = c ? t20PMTotal(p.classe, nivel, valorMagia) : null;
  return {
    atributos: atr,
    modificadores: Object.fromEntries(T20_ATRIBUTO_IDS.map(id => [id, t20Modificador(atr[id])])),
    pv: pvTotal,
    pm: pmTotal,
    defesa: t20Defesa(atr.destreza, p.defesa),
    deslocamento: t20Deslocamento(p.raca),
    bonusTreino: t20Metade(nivel),
    atributoMagia: attrMagia,
    circuloMaximo: c && c.conjurador ? t20CirculoMaximo(nivel) : 0,
    magiasLimite: t20MagiasConhecidasLimite(p.classe, nivel),
    pericias,
    treinadas: Array.from(treinadas)
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
