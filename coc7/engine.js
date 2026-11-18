/* Cálculos do investigador de Call of Cthulhu 7ª ed. Funções puras (sem DOM), usadas pela interface e pelos testes.
   Dados vêm de rules.js. Nada aqui guarda texto de livro. */

function rolarDado(lados, rng){
  const r = rng ? rng() : Math.random();
  return Math.floor(r * lados) + 1;
}
function rolarFormulaDados(formula, rng){
  const d = COC_DADOS[formula];
  if(!d) throw new Error("Fórmula de dados desconhecida: " + formula);
  let total = d.soma;
  for(let i = 0; i < d.qtd; i++) total += rolarDado(d.lados, rng);
  return total;
}
/* Característica já multiplicada por 5 (3d6×5 ou (2d6+6)×5). */
function rolarCaracteristica(id, rng){
  const c = cocCaracteristica(id);
  return rolarFormulaDados(c.dados, rng) * COC_MULTIPLICADOR_CARAC;
}
function limitesCaracteristica(id){
  const c = cocCaracteristica(id);
  const d = COC_DADOS[c.dados];
  return { min: (d.qtd + d.soma) * COC_MULTIPLICADOR_CARAC, max: (d.qtd * d.lados + d.soma) * COC_MULTIPLICADOR_CARAC };
}

/* ---- Idade ---- */
/* Faixas que valem para a idade: 15-19, 20-39 e 40+ acumulam (cada faixa atingida conta). */
function faixasAplicaveis(idade){
  return COC_FAIXAS_IDADE.filter(f => f.min >= 40 ? idade >= f.min : (idade >= f.min && idade <= f.max));
}
/* Efeitos que pedem escolha do jogador: "escolha" (um alvo) e "divisao" (repartir o total). */
function ehEscolha(e){ return e.tipo === "escolha" || e.tipo === "divisao"; }
/* Lista de efeitos na ordem de aplicação. Efeitos de escolha recebem um índice (escolhasIdade[índice]). */
function efeitosIdade(idade){
  const lista = [];
  let escolhas = 0;
  for(const f of faixasAplicaveis(idade)){
    for(const e of f.efeitos){
      if(ehEscolha(e)) lista.push(Object.assign({}, e, { faixa: f.rotulo, indiceEscolha: escolhas++ }));
      else lista.push(Object.assign({}, e, { faixa: f.rotulo }));
    }
  }
  return { lista, escolhas };
}
/* Quanto do total de uma divisão vai para o primeiro alvo. Inválido (vazio, fora de 0 a total) devolve null: nada é aplicado. */
function valorDivisao(escolhas, indice, total){
  const v = (escolhas || [])[indice];
  if(v === null || v === undefined || v === "") return null;
  const n = Number(v);
  if(!Number.isInteger(n) || n < 0 || n > total) return null;
  return n;
}
/* Testes de melhoria de EDU acumulam por todas as faixas já atingidas (20 a 39 também vale para 45 anos). */
function melhoriasEduEsperadas(idade){
  return COC_FAIXAS_IDADE.filter(f => idade >= f.min).reduce((soma, f) => soma + (f.melhorias || 0), 0);
}
function movPorIdade(idade){
  return faixasAplicaveis(idade).reduce((soma, f) => soma + (f.mov || 0), 0);
}
function sorteDuasRolagens(idade){
  return faixasAplicaveis(idade).some(f => f.sorteDuasRolagens);
}

/* Aplica idade sobre as características. `escolhas` = alvos (ou quantidades de divisão) na ordem dos efeitos de escolha.
   `melhorias` = [{d100, d10}] na ordem dos testes. Retorna os valores finais e o registro do que aconteceu. */
function aplicarIdade(base, idade, escolhas, melhorias){
  const valores = Object.assign({}, base);
  const registro = [];
  const { lista } = efeitosIdade(idade);
  for(const e of lista){
    if(e.tipo === "fixo"){
      valores[e.alvo] = Math.max(1, valores[e.alvo] + e.valor);
      registro.push({ faixa: e.faixa, alvo: e.alvo, valor: e.valor });
    } else if(e.tipo === "divisao"){
      const x = valorDivisao(escolhas, e.indiceEscolha, e.total);
      if(x == null) continue;
      const partes = [[e.alvos[0], x], [e.alvos[1], e.total - x]];
      for(const [alvo, qtd] of partes){
        valores[alvo] = Math.max(1, valores[alvo] - qtd);
        registro.push({ faixa: e.faixa, alvo, valor: -qtd });
      }
    } else {
      const alvo = (escolhas || [])[e.indiceEscolha];
      if(!e.opcoes.includes(alvo)) continue;
      valores[alvo] = Math.max(1, valores[alvo] + e.valor);
      registro.push({ faixa: e.faixa, alvo, valor: e.valor });
    }
  }
  for(const m of (melhorias || [])){
    if(!m || m.d100 == null) continue;
    if(m.d100 > valores.edu){
      const ganho = Number(m.d10) || 0;
      valores.edu = Math.min(99, valores.edu + ganho);
      registro.push({ faixa: "Teste de EDU", alvo: "edu", valor: ganho });
    } else {
      registro.push({ faixa: "Teste de EDU", alvo: "edu", valor: 0 });
    }
  }
  return { valores, registro };
}

/* ---- Derivados ---- */
/* Movimento base (regra completa): compara FOR e DES com TAM. Ambas menores: 7. Ambas maiores: 9. Nos demais casos: 8. */
function movBase(car){
  const f = car.for, d = car.des, t = car.tam;
  if(f < t && d < t) return 7;
  if(f > t && d > t) return 9;
  return 8;
}
function cocDano(somaForTam){
  return COC_DANO.find(d => somaForTam >= d.min && somaForTam <= d.max) || null;
}
function caracteristicasFinais(inv){
  const base = {};
  for(const c of COC_CARACTERISTICAS){
    const v = inv.caracteristicas ? inv.caracteristicas[c.id] : null;
    if(v == null) return null;
    base[c.id] = Number(v);
  }
  if(inv.idade == null) return base;
  return aplicarIdade(base, Number(inv.idade), inv.escolhasIdade, inv.melhoriasEdu).valores;
}
function sorteFinal(inv){
  if(inv.sorte != null) return Number(inv.sorte);
  return null;
}
function calcDerivados(inv){
  const car = caracteristicasFinais(inv);
  if(!car) return null;
  const idade = Number(inv.idade) || 0;
  const dano = cocDano(car.for + car.tam);
  const mitos = cocTotalPericia(inv, "mitos", car);
  return {
    pv: Math.floor((car.con + car.tam) / 10),
    sanInicial: car.pod,
    sanMax: 99 - mitos,
    pm: Math.floor(car.pod / 5),
    sorte: sorteFinal(inv),
    mov: Math.max(0, movBase(car) + movPorIdade(idade)),
    dano: dano ? dano.dano : null,
    corpo: dano ? dano.corpo : null,
    danoConhecido: !!dano,
    edu: car.edu
  };
}

/* ---- Ocupação e perícias ---- */
function periciasDeOcupacao(inv){
  const o = cocOcupacao(inv.ocupacaoId);
  if(!o) return [];
  const ids = ["credito", ...o.pericias];
  (o.grupos || []).forEach((g, i) => ((inv.escolhasGrupo || [])[i] || []).forEach(id => ids.push(id)));
  (inv.livresOcupacao || []).forEach(id => ids.push(id));
  return [...new Set(ids)];
}
function poolOcupacao(inv, car){
  const o = cocOcupacao(inv.ocupacaoId);
  if(!o || !car) return 0;
  let total = 0;
  for(const t of o.formula.base) total += car[t.c] * t.m;
  if(o.formula.alternativas){
    const alt = o.formula.alternativas[inv.ocupacaoAlt];
    if(alt) for(const t of alt) total += car[t.c] * t.m;
  }
  return total;
}
function poolInteresse(car){
  if(!car) return 0;
  return car[COC_INTERESSE.c] * COC_INTERESSE.m;
}
function baseDaPericia(p, car){
  if(p.base === "des2") return car ? Math.floor(car.des / 2) : 0;
  if(p.base === "edu") return car ? car.edu : 0;
  return p.base;
}
function cocTotalPericia(inv, id, car){
  const p = cocPericia(id);
  if(!p) return 0;
  const base = baseDaPericia(p, car || caracteristicasFinais(inv) || { des: 0, edu: 0 });
  const ocup = Number((inv.pontosOcupacao || {})[id]) || 0;
  const inter = Number((inv.pontosInteresse || {})[id]) || 0;
  return base + ocup + inter;
}
function somaPontos(mapa){
  return Object.values(mapa || {}).reduce((s, v) => s + (Number(v) || 0), 0);
}
/* Tabela de perícias com valor total, metade e quinto. */
function calcPericias(inv){
  const car = caracteristicasFinais(inv);
  return COC_PERICIAS.map(p => {
    const total = cocTotalPericia(inv, p.id, car);
    return { id: p.id, nome: p.nome, base: baseDaPericia(p, car), ocup: Number((inv.pontosOcupacao || {})[p.id]) || 0,
      inter: Number((inv.pontosInteresse || {})[p.id]) || 0, total, metade: Math.floor(total / 2), quinto: Math.floor(total / 5),
      espec: inv.especializacoes ? (inv.especializacoes[p.id] || "") : "" };
  });
}

/* Ficha de combate: armas básicas com o valor total da perícia do investigador. DB vem de calcDerivados. */
function cocFichaCombate(inv){
  const pericias = calcPericias(inv);
  const der = calcDerivados(inv);
  const dbTexto = der ? (der.danoConhecido ? der.dano : null) : null;
  const armas = COC_ARMAS.map(a => {
    const p = pericias.find(x => x.id === a.pericia) || { nome: a.pericia, total: 0 };
    return { id: a.id, nome: a.nome, pericia: p.nome, valorPericia: p.total, dano: a.dano, usaDb: !!a.db,
      alcance: a.alcance, tiros: a.tiros, fonte: a.fonte };
  });
  const combate = ["briga", "esquivar", "arma_pistola", "arma_rifle"].map(id => {
    const p = pericias.find(x => x.id === id);
    return { id, nome: p.nome, total: p.total };
  });
  return { db: dbTexto, dbConhecido: !!(der && der.danoConhecido), combate, armas };
}

/* ---- Criação orientada: sugestão de distribuição dos pontos de ocupação ----
   Função pura (sem estado nem DOM). Espalha `pontos` (o pool de poolOcupacao) entre as perícias que
   periciasDeOcupacao aceita: crédito, perícias fixas, escolhas de grupo e perícias livres.
   Regra usada (a mesma que validarPericiasOcupacao confere):
   - cada perícia recebe pontos de ocupação um a um, sempre para a que tem menos (empate: ordem da ocupação);
   - total da perícia (base + pontos de ocupação) não passa de COC_TETO_PERICIA.valor;
   - o crédito também fica dentro da faixa da ocupação (ocupacao.credito). Começa perto de pontos / nº de perícias.
   Escolhas: as que o jogador já fez (escolhas.grupos e escolhas.livres) são mantidas. O que falta vem das primeiras
   opções da lista do app e volta marcado em escolhaSugerida. Livres só saem de COC_PERICIAS, sem mitos e sem crédito.
   Retorna { ok, motivo?, pontos, distribuicao, escolhasGrupo, livresOcupacao, escolhaSugerida }. `car` pode ser null:
   então perícias com base variável (DES/2, EDU) contam como 0 no teto. */
function sugerirDistribuicaoOcupacao(ocupacao, pontos, car, escolhas){
  if(!ocupacao) return { ok: false, motivo: "sem_ocupacao" };
  const total = Number(pontos);
  if(!Number.isInteger(total) || total < 0) return { ok: false, motivo: "pontos_invalidos" };
  const esc = escolhas || {};
  const usadas = new Set(ocupacao.pericias);

  const escolhasGrupo = [], grupoSugerido = [];
  (ocupacao.grupos || []).forEach((g, i) => {
    const feitas = [...new Set(((esc.grupos || [])[i] || []).filter(id => g.opcoes.includes(id)))].slice(0, g.n);
    feitas.forEach(id => usadas.add(id));
    let sugerida = false;
    for(const id of g.opcoes){
      if(feitas.length >= g.n) break;
      if(usadas.has(id)) continue;
      feitas.push(id); usadas.add(id); sugerida = true;
    }
    escolhasGrupo.push(feitas);
    grupoSugerido.push(sugerida);
  });

  /* Perícias que a tela oferece como livres: as da lista do app, sem as fixas, as de grupo, mitos e crédito. */
  const fixasOuGrupo = new Set([...ocupacao.pericias, ...(ocupacao.grupos || []).flatMap(g => g.opcoes)]);
  const candidatasLivres = COC_PERICIAS.map(p => p.id).filter(id => !fixasOuGrupo.has(id) && id !== "mitos" && id !== "credito");
  const livresEscolhidas = [...new Set((esc.livres || []).filter(id => candidatasLivres.includes(id) && !usadas.has(id)))].slice(0, ocupacao.livres || 0);
  livresEscolhidas.forEach(id => usadas.add(id));
  let livreSugerida = false;
  for(const id of candidatasLivres){
    if(livresEscolhidas.length >= (ocupacao.livres || 0)) break;
    if(usadas.has(id)) continue;
    livresEscolhidas.push(id); usadas.add(id); livreSugerida = true;
  }

  const teto = COC_TETO_PERICIA.valor;
  const faixaCredito = ocupacao.credito || [0, teto];
  const ids = [...new Set(["credito", ...ocupacao.pericias, ...escolhasGrupo.flat(), ...livresEscolhidas])].filter(id => cocPericia(id));
  const cap = id => {
    if(id === "credito") return Math.min(faixaCredito[1], teto);
    return Math.max(0, teto - baseDaPericia(cocPericia(id), car));
  };
  const capacidade = ids.reduce((s, id) => s + cap(id), 0);
  if(faixaCredito[0] > total) return { ok: false, motivo: "pontos_insuficientes", pontos: total };
  if(total > capacidade) return { ok: false, motivo: "teto", pontos: total };

  const outras = ids.filter(id => id !== "credito");
  const valor = {};
  outras.forEach(id => { valor[id] = 0; });
  let credito = Math.min(cap("credito"), Math.max(faixaCredito[0], Math.floor(total / ids.length)));
  let restante = total - credito;
  while(restante > 0){
    const alvo = outras.filter(id => valor[id] < cap(id))
      .sort((a, b) => valor[a] - valor[b] || outras.indexOf(a) - outras.indexOf(b))[0];
    if(!alvo) break;
    valor[alvo]++; restante--;
  }
  if(restante > 0){
    const extra = Math.min(restante, cap("credito") - credito);
    credito += extra; restante -= extra;
  }
  valor.credito = credito;
  if(restante > 0) return { ok: false, motivo: "teto", pontos: total };

  const distribuicao = {};
  Object.entries(valor).forEach(([id, v]) => { if(v > 0) distribuicao[id] = v; });
  return { ok: true, pontos: total, distribuicao, escolhasGrupo, livresOcupacao: livresEscolhidas,
    escolhaSugerida: { grupos: grupoSugerido, livres: livreSugerida } };
}

/* Resumo de como as contas batem (usado na tela e no PDF). */
function resumoCriacao(inv){
  const car = caracteristicasFinais(inv);
  const o = cocOcupacao(inv.ocupacaoId);
  return {
    poolOcupacao: poolOcupacao(inv, car),
    gastoOcupacao: somaPontos(inv.pontosOcupacao),
    poolInteresse: poolInteresse(car),
    gastoInteresse: somaPontos(inv.pontosInteresse),
    creditoTotal: cocTotalPericia(inv, "credito", car),
    creditoFaixa: o ? o.credito : null,
    periciasOcupacao: periciasDeOcupacao(inv)
  };
}
