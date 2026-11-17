/* Validações por etapa. Devolve { erros, avisos }, cada item { msg, campo }.
   Modo estrito: erros bloqueiam o avanço. Modo livre: os erros viram avisos e nada bloqueia.
   `campo` é o id do campo que a interface foca. */

function vErro(lista, msg, campo){ lista.push({ msg, campo: campo || null }); }

function fecharModo(modo, erros, avisos){
  if(modo === "livre") return { erros: [], avisos: [...erros, ...avisos] };
  return { erros, avisos };
}

function validarModoIdentidade(estado){
  const erros = [], avisos = [];
  const inv = estado.investigador;
  if(!["estrito", "livre"].includes(estado.modo)) vErro(erros, "Escolha o modo de criação.", "modo");
  if(!["classica", "moderna"].includes(estado.epoca)) vErro(erros, "Escolha a época do investigador.", "epoca");
  const nome = String(inv.nome || "").trim();
  if(!nome) vErro(erros, "Dê um nome ao investigador.", "nome");
  else if(nome.length > 60) vErro(erros, "O nome passou de 60 caracteres.", "nome");
  return fecharModo(estado.modo, erros, avisos);
}

function validarCaracteristicas(estado){
  const erros = [], avisos = [];
  const inv = estado.investigador;
  if(!inv.metodo) vErro(erros, "Escolha como gerar as características: rolar ou distribuir.", "metodo");
  if(inv.metodo === "manual" && estado.modo === "estrito") vErro(erros, "No modo estrito, use rolagem ou distribuição.", "metodo");
  const faltam = COC_CARACTERISTICAS.filter(c => inv.caracteristicas[c.id] == null);
  if(faltam.length) vErro(erros, "Preencha as oito características. Faltam: " + faltam.map(c => c.sigla).join(", ") + ".", "car-" + faltam[0].id);
  if(faltam.length === 0){
    const valores = COC_CARACTERISTICAS.map(c => Number(inv.caracteristicas[c.id]));
    if(inv.metodo === "rolar"){
      for(const c of COC_CARACTERISTICAS){
        const v = Number(inv.caracteristicas[c.id]), lim = limitesCaracteristica(c.id);
        if(!Number.isInteger(v) || v % COC_MULTIPLICADOR_CARAC !== 0 || v < lim.min || v > lim.max)
          vErro(erros, `${c.sigla}: ${v} não corresponde à rolagem ${c.dados}×5 (${lim.min} a ${lim.max}).`, "car-" + c.id);
      }
    } else if(inv.metodo === "distribuir"){
      const a = [...valores].sort((x, y) => x - y), b = [...COC_DISTRIBUICAO].sort((x, y) => x - y);
      if(a.length !== b.length || a.some((v, i) => v !== b[i]))
        vErro(erros, "Distribua exatamente os valores 40, 50, 50, 50, 60, 60, 70 e 80, um para cada característica.", "car-" + COC_CARACTERISTICAS[0].id);
    } else if(inv.metodo === "manual"){
      for(const c of COC_CARACTERISTICAS){
        const v = Number(inv.caracteristicas[c.id]);
        if(!Number.isInteger(v) || v < 1 || v > 99) vErro(erros, `${c.sigla} deve ser um número inteiro de 1 a 99.`, "car-" + c.id);
      }
    }
  }
  return fecharModo(estado.modo, erros, avisos);
}

function validarIdade(estado){
  const erros = [], avisos = [];
  const inv = estado.investigador;
  const idade = Number(inv.idade);
  if(inv.idade == null || inv.idade === "" || !Number.isInteger(idade) || idade < COC_IDADE.min || idade > COC_IDADE.max){
    vErro(erros, `Informe a idade, um número inteiro de ${COC_IDADE.min} a ${COC_IDADE.max}.`, "idade");
    return fecharModo(estado.modo, erros, avisos);
  }
  const { escolhas, lista } = efeitosIdade(idade);
  const efeitosEscolha = lista.filter(ehEscolha);
  for(let i = 0; i < escolhas; i++){
    const efeito = efeitosEscolha[i];
    if(efeito.tipo === "divisao"){
      if(valorDivisao(inv.escolhasIdade, i, efeito.total) == null)
        vErro(erros, `Divida os ${efeito.total} pontos de ${efeito.rotulo} (${efeito.faixa}): escolha quanto vai para ${cocCaracteristica(efeito.alvos[0]).sigla}.`, "idade-esc-" + i);
    } else if(!inv.escolhasIdade[i] || !efeito.opcoes.includes(inv.escolhasIdade[i]))
      vErro(erros, `Escolha a redução de ${efeito.rotulo} (${efeito.faixa}).`, "idade-esc-" + i);
  }
  if(inv.caracteristicas && COC_CARACTERISTICAS.every(c => inv.caracteristicas[c.id] != null)){
    const base = {};
    COC_CARACTERISTICAS.forEach(c => base[c.id] = Number(inv.caracteristicas[c.id]));
    let edu = aplicarIdade(base, idade, inv.escolhasIdade, []).valores.edu;
    const esperados = melhoriasEduEsperadas(idade);
    if((inv.melhoriasEdu || []).length !== esperados && esperados > 0)
      vErro(erros, `Faça os ${esperados} teste(s) de melhoria de EDU desta idade.`, "idade-melhoria-0");
    for(let i = 0; i < esperados; i++){
      const m = (inv.melhoriasEdu || [])[i];
      if(!m || m.d100 == null){ vErro(erros, `Role o teste de melhoria de EDU ${i + 1}.`, "idade-melhoria-" + i); break; }
      if(!Number.isInteger(m.d100) || m.d100 < 1 || m.d100 > 100) vErro(erros, `Teste de EDU ${i + 1}: o d100 vai de 1 a 100.`, "idade-melhoria-" + i);
      if(m.d100 > edu){
        if(m.d10 == null || !Number.isInteger(m.d10) || m.d10 < 1 || m.d10 > 10)
          vErro(erros, `Teste de EDU ${i + 1}: como o d100 passou da EDU, role o 1d10 do ganho.`, "idade-melhoria-" + i);
        else edu = Math.min(99, edu + m.d10);
      }
    }
    const fin = aplicarIdade(base, idade, inv.escolhasIdade, inv.melhoriasEdu).valores;
    COC_CARACTERISTICAS.forEach(c => { if(fin[c.id] < 1) vErro(erros, `${c.sigla} ficou abaixo de 1 após os ajustes de idade.`, "car-" + c.id); });
  }
  avisos.push({ msg: "Regras de idade NÃO VERIFICADAS em parte: +5 pontos entre FOR e TAM aos 20 anos (1 fonte, não aplicado). Os demais ajustes têm duas fontes. Confira no livro antes de usar.", campo: null });
  return fecharModo(estado.modo, erros, avisos);
}

function validarOcupacao(estado){
  const erros = [], avisos = [];
  const inv = estado.investigador;
  const o = cocOcupacao(inv.ocupacaoId);
  if(!o){ vErro(erros, "Escolha a ocupação.", "ocupacao"); return fecharModo(estado.modo, erros, avisos); }
  if(o.formula.alternativas){
    if(inv.ocupacaoAlt == null || !o.formula.alternativas[inv.ocupacaoAlt])
      vErro(erros, "Escolha a característica da fórmula de pontos desta ocupação.", "ocupacao-alt");
  }
  return fecharModo(estado.modo, erros, avisos);
}

function validarPericiasOcupacao(estado){
  const erros = [], avisos = [];
  const inv = estado.investigador;
  const o = cocOcupacao(inv.ocupacaoId);
  if(!o){ vErro(erros, "Escolha a ocupação antes das perícias.", "ocupacao"); return fecharModo(estado.modo, erros, avisos); }
  const car = caracteristicasFinais(inv);
  const permitidas = periciasDeOcupacao(inv);
  if(!car){ vErro(erros, "Preencha as características antes das perícias.", "metodo"); return fecharModo(estado.modo, erros, avisos); }
  const pool = poolOcupacao(inv, car);
  const gasto = somaPontos(inv.pontosOcupacao);
  Object.entries(inv.pontosOcupacao || {}).forEach(([id, v]) => {
    if(Number(v) > 0 && !permitidas.includes(id)) vErro(erros, `${(cocPericia(id) || {}).nome || id} não é perícia desta ocupação.`, "occ-" + id);
    if(!Number.isInteger(Number(v)) || Number(v) < 0) vErro(erros, "Os pontos de perícia devem ser inteiros e não negativos.", "occ-" + id);
  });
  if(gasto !== pool) vErro(erros, `Distribuiu ${gasto} de ${pool} pontos de ocupação. Faltam ${pool - gasto}.`, "occ-credito");
  (o.grupos || []).forEach((g, i) => {
    const escolhidas = (inv.escolhasGrupo || [])[i] || [];
    if(escolhidas.length !== g.n || escolhidas.some(id => !g.opcoes.includes(id)))
      vErro(erros, `Escolha ${g.n} perícia(s) em: ${g.rotulo}.`, "grupo-" + i);
  });
  const livres = inv.livresOcupacao || [];
  if(livres.length !== o.livres) vErro(erros, `Escolha ${o.livres} perícia(s) livres de ocupação.`, "livres");
  if(new Set(livres).size !== livres.length) vErro(erros, "Não repita perícia livre de ocupação.", "livres");
  livres.forEach(id => { if(o.pericias.includes(id)) avisos.push({ msg: `${(cocPericia(id) || {}).nome || id} já é perícia fixa desta ocupação.`, campo: "livres" }); });
  const cred = cocTotalPericia(inv, "credito", car);
  if(o.credito && (cred < o.credito[0] || cred > o.credito[1]))
    vErro(erros, `Crédito ${cred}% fora da faixa desta ocupação (${o.credito[0]} a ${o.credito[1]}).`, "occ-credito");
  COC_PERICIAS.forEach(p => {
    const total = cocTotalPericia(inv, p.id, car);
    if(total > COC_TETO_PERICIA.valor) avisos.push({ msg: `${p.nome} passou de ${COC_TETO_PERICIA.valor}% (${total}%): teto de ${COC_TETO_PERICIA.valor}%, ${COC_TETO_PERICIA.aviso}.`, campo: "occ-" + p.id });
  });
  if((Number((inv.pontosOcupacao || {}).mitos) || 0) > 0) vErro(erros, "Mitos de Cthulhu não recebe pontos na criação.", "occ-mitos");
  return fecharModo(estado.modo, erros, avisos);
}

function validarInteresse(estado){
  const erros = [], avisos = [];
  const inv = estado.investigador;
  const car = caracteristicasFinais(inv);
  if(!car){ vErro(erros, "Preencha as características antes do interesse pessoal.", "metodo"); return fecharModo(estado.modo, erros, avisos); }
  const ocup = periciasDeOcupacao(inv);
  const pool = poolInteresse(car);
  const gasto = somaPontos(inv.pontosInteresse);
  Object.entries(inv.pontosInteresse || {}).forEach(([id, v]) => {
    const n = Number(v);
    if(n === 0) return;
    if(!Number.isInteger(n) || n < 0) vErro(erros, "Os pontos de interesse devem ser inteiros e não negativos.", "int-" + id);
    if(ocup.includes(id)) vErro(erros, `${(cocPericia(id) || {}).nome || id} já é perícia de ocupação: use os pontos de ocupação.`, "int-" + id);
    if(id === "mitos") vErro(erros, "Mitos de Cthulhu não recebe pontos na criação.", "int-mitos");
  });
  if(gasto !== pool) vErro(erros, `Distribuiu ${gasto} de ${pool} pontos de interesse pessoal. Faltam ${pool - gasto}.`, null);
  COC_PERICIAS.forEach(p => {
    const total = cocTotalPericia(inv, p.id, car);
    if(total > COC_TETO_PERICIA.valor) avisos.push({ msg: `${p.nome} passou de ${COC_TETO_PERICIA.valor}% (${total}%): teto de ${COC_TETO_PERICIA.valor}%, ${COC_TETO_PERICIA.aviso}.`, campo: "int-" + p.id });
  });
  return fecharModo(estado.modo, erros, avisos);
}

function validarDerivados(estado){
  const erros = [], avisos = [];
  const inv = estado.investigador;
  const idade = Number(inv.idade);
  if(inv.sorte == null){ vErro(erros, "Role a Sorte (3d6 × 5).", "sorte"); return fecharModo(estado.modo, erros, avisos); }
  const sorte = Number(inv.sorte);
  if(!Number.isInteger(sorte) || sorte < 15 || sorte > 90 || sorte % 5 !== 0)
    vErro(erros, "A Sorte precisa ser um múltiplo de 5 entre 15 e 90.", "sorte");
  if(Number.isInteger(idade) && sorteDuasRolagens(idade)){
    const r = inv.sorteRolagens || [];
    if(r.length !== 2) vErro(erros, "Entre 15 e 19 anos a Sorte é rolada duas vezes e fica a maior.", "sorte");
    else if(Math.max(...r) !== sorte) vErro(erros, "Sorte deve ser a maior das duas rolagens.", "sorte");
  }
  return fecharModo(estado.modo, erros, avisos);
}

function validarEtapa(estado, etapa){
  switch(Number(etapa)){
    case 1: return validarModoIdentidade(estado);
    case 2: return validarCaracteristicas(estado);
    case 3: return validarIdade(estado);
    case 4: return validarOcupacao(estado);
    case 5: return validarPericiasOcupacao(estado);
    case 6: return validarInteresse(estado);
    case 7: case 8: return { erros: [], avisos: [] };
    case 9: return validarDerivados(estado);
    case 10: {
      const erros = [], avisos = [];
      for(let n = 1; n <= 9; n++){
        const r = validarEtapa(estado, n);
        erros.push(...r.erros);
        avisos.push(...r.avisos);
      }
      return { erros, avisos };
    }
    default: throw new Error("Etapa inexistente: " + etapa);
  }
}
