/* Validações por etapa da ficha Tormenta20.
   Modo "estrito": problemas viram erros (a etapa não avança).
   Modo "livre": os mesmos problemas viram avisos (a etapa avança).
   Cada item: { msg, campo } — `campo` é o id do elemento a focar. */

function t20Checar(lista, cond, msg, campo){ if(!cond) lista.push({ msg, campo: campo || null }); }

function t20ValidarEtapa(etapa, p, modo){
  const erros = [], avisos = [];
  const estrito = modo === "estrito";
  const reportar = (cond, msg, campo) => {
    if(cond) return;
    (estrito ? erros : avisos).push({ msg, campo: campo || null });
  };
  const atr = (function(){ try { return t20AtributosFinais(p); } catch(e){ return null; } })();

  if(etapa === 1){
    reportar(modo === "estrito" || modo === "livre", "Escolha o modo de criação: estrito ou livre.", "modo-estrito");
  }

  if(etapa === 2){
    reportar(String(p.nome || "").trim().length > 0, "Informe o nome do personagem.", "nome");
    reportar(Number.isInteger(p.nivel) && p.nivel >= T20_NIVEL_MIN && p.nivel <= T20_NIVEL_MAX,
      `O nível deve ser de ${T20_NIVEL_MIN} a ${T20_NIVEL_MAX} nesta versão.`, "nivel");
  }

  if(etapa === 3){
    const r = T20_RACAS[p.raca];
    reportar(!!r, "Escolha uma raça.", "raca");
    if(r && !r.ajustes) avisos.push({ msg: `Ajustes de atributo de ${r.nome}: NÃO VERIFICADO. Lance o ajuste no passo Atributos, se quiser.`, campo: null });
    if(r && r.verificado === false && r.tamanho === null) avisos.push({ msg: `Tamanho de ${r.nome}: NÃO VERIFICADO (o app assume Médio, 9 m).`, campo: null });
  }

  if(etapa === 4){
    reportar(T20_ORIGENS.includes(p.origem), "Escolha uma origem.", "origem");
    const pericias = [];
    p.origemBeneficios.forEach((b, i) => {
      if(b.tipo === "pericia"){
        reportar(T20_PERICIA_NOMES.includes(b.valor), `Benefício ${i + 1}: escolha uma perícia.`, `beneficio-${i}`);
        if(b.valor) pericias.push(b.valor);
      } else {
        reportar(String(b.valor || "").trim().length > 0, `Benefício ${i + 1}: escreva o nome do poder.`, `beneficio-${i}`);
      }
    });
    reportar(new Set(pericias).size === pericias.length, "Os dois benefícios não podem ser a mesma perícia.", "beneficio-1");
    avisos.push({ msg: "Benefícios específicos de cada origem: NÃO VERIFICADO. A lista de benefícios é a sua escolha.", campo: null });
  }

  if(etapa === 5){
    const c = T20_CLASSES[p.classe];
    reportar(!!c, "Escolha uma classe.", "classe");
    if(c && c.conjurador && c.atributoMagiaOpcoes.length > 1){
      reportar(c.atributoMagiaOpcoes.includes(p.atributoMagia || c.atributoMagiaPadrao), "Escolha o atributo de magia da classe.", "atributo-magia");
    }
    if(c && !c.verificadoPv) avisos.push({ msg: `PV e PM de ${c.nome}: ${c.fontePv}.`, campo: null });
  }

  if(etapa === 6){
    const valoresValidos = Object.values(p.atributosBase).every(v => Number.isInteger(v) && v >= T20_PONTOS_COMPRA.minimo && v <= T20_PONTOS_COMPRA.maximo);
    reportar(valoresValidos, `Cada atributo deve ficar entre ${T20_PONTOS_COMPRA.minimo} e ${T20_PONTOS_COMPRA.maximo} antes da raça.`, "atr-forca");
    const gastos = valoresValidos ? t20PontosGastos(p.atributosBase) : null;
    if(gastos !== null){
      const total = T20_PONTOS_COMPRA.total;
      reportar(gastos <= total, `Você gastou ${gastos} de ${total} pontos: passou do limite.`, "pontos");
      if(gastos < total) reportar(false, `Faltam ${total - gastos} pontos para distribuir.`, "pontos");
    }
    const ajustesOk = Object.values(p.ajusteManual).every(v => Number.isInteger(v) && v >= -5 && v <= 5);
    reportar(ajustesOk, "Ajuste manual deve ser um número inteiro entre -5 e +5.", "ajuste-forca");
  }

  if(etapa === 7){
    const c = T20_CLASSES[p.classe];
    const disp = c ? t20PericiasDisponiveis(p, atr || {}) : null;
    const escolhidas = p.periciasEscolhidas || [];
    reportar(escolhidas.every(n => T20_PERICIA_NOMES.includes(n)), "Há uma perícia inválida na lista.", "pericias");
    reportar(new Set(escolhidas).size === escolhidas.length, "Uma perícia foi escolhida duas vezes.", "pericias");
    if(disp){
      const travadas = new Set([...disp.fixas, ...(p.origemBeneficios || []).filter(b => b.tipo === "pericia").map(b => b.valor)]);
      if(c.grupoFixo) travadas.add(p.grupoFixoEscolha);
      reportar(escolhidas.every(n => !travadas.has(n)), "Uma perícia escolhida já é treinada pela classe, raça ou origem.", "pericias");
      reportar(escolhidas.length === disp.livres, `Escolha ${disp.livres} perícias livres (escolheu ${escolhidas.length}).`, "pericias");
      if(c.grupoFixo) reportar(c.grupoFixo.opcoes.includes(p.grupoFixoEscolha), `Escolha ${c.grupoFixo.opcoes.join(" ou ")}.`, "grupo-fixo");
      if(!c.verificadoPericias) avisos.push({ msg: `Perícias de ${c.nome}: ${c.fontePericias}.`, campo: null });
    }
  }

  if(etapa === 8){
    p.poderes.forEach((pd, i) => {
      reportar(String(pd.nome || "").trim().length > 0, `Poder ${i + 1}: escreva o nome.`, `poder-${i}`);
      reportar(Number.isInteger(pd.nivel) && pd.nivel >= 1 && pd.nivel <= p.nivel, `Poder ${i + 1}: nível deve estar entre 1 e ${p.nivel}.`, `poder-${i}`);
    });
    avisos.push({ msg: "Quantidade de poderes por nível: NÃO VERIFICADO. O app não conta poderes nesta versão.", campo: null });
  }

  if(etapa === 9){
    const c = T20_CLASSES[p.classe];
    const max = c && c.conjurador ? t20CirculoMaximo(p.nivel) : 0;
    const conjura = !!(c && c.conjurador);
    p.magias.forEach((m, i) => {
      reportar(String(m.nome || "").trim().length > 0, `Magia ${i + 1}: escreva o nome.`, `magia-${i}`);
      if(conjura) reportar(Number.isInteger(m.circulo) && m.circulo >= 1 && m.circulo <= max, `Magia ${i + 1}: círculo acima do disponível (máximo ${max}).`, `magia-${i}`);
    });
    if(c && c.conjurador){
      const limite = t20MagiasConhecidasLimite(p.classe, p.nivel);
      if(limite !== null) reportar(p.magias.length === limite, `Escolha ${limite} magias de 1º círculo (escolheu ${p.magias.length}).`, "magias");
      else avisos.push({ msg: "Número de magias conhecidas acima do 1º nível: NÃO VERIFICADO. Confira no livro.", campo: null });
    } else if(p.magias.length){
      avisos.push({ msg: `${c ? c.nome : "Esta classe"} não tem magias listadas neste app: as magias ficam só como anotação.`, campo: null });
    }
  }

  if(etapa === 10){
    reportar(p.equipamento.every(e => Number.isInteger(e.quantidade) && e.quantidade >= 1), "Quantidade de equipamento deve ser um inteiro maior que zero.", "equip-0");
    reportar(Number.isFinite(p.dinheiro) && p.dinheiro >= 0, "Dinheiro não pode ser negativo.", "dinheiro");
    const d = p.defesa;
    reportar([d.armadura, d.escudo, d.outros].every(v => Number.isInteger(Number(v))), "Bônus de defesa deve ser um número inteiro.", "def-armadura");
    avisos.push({ msg: T20_DINHEIRO_FONTE, campo: null });
  }

  if(etapa === 11){
    const c = T20_CLASSES[p.classe];
    if(c && c.pvInicial === null) avisos.push({ msg: `PV de ${c.nome} não calculado: ${c.fontePv}.`, campo: null });
  }

  return { erros, avisos };
}

/* Valida a ficha inteira (etapas 1 a 10) e devolve o resumo para o passo Resumo. */
function t20ValidarTudo(state){
  const porEtapa = {};
  let totalErros = 0, totalAvisos = 0;
  for(let e = 1; e <= 10; e++){
    const r = t20ValidarEtapa(e, state.personagem, "estrito");
    const a = t20ValidarEtapa(e, state.personagem, "livre");
    const erros = r.erros;
    const avisos = [...a.avisos.filter(x => !erros.some(y => y.msg === x.msg))];
    porEtapa[e] = { erros, avisos };
    totalErros += erros.length;
    totalAvisos += avisos.length;
  }
  return { porEtapa, erros: totalErros, avisos: totalAvisos, valido: totalErros === 0 && !!state.modo };
}
