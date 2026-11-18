/* Validações por etapa da ficha Tormenta20.
   Modo "estrito": problemas viram erros (a etapa não avança).
   Modo "livre": os mesmos problemas viram avisos (a etapa avança).
   Avisos de dado NÃO VERIFICADO aparecem nos dois modos.
   Cada item: { msg, campo } — `campo` é o id do elemento a focar. */

function t20ValidarEtapa(etapa, p, modo){
  const erros = [], avisos = [];
  const estrito = modo === "estrito";
  const reportar = (cond, msg, campo) => {
    if(cond) return;
    (estrito ? erros : avisos).push({ msg, campo: campo || null });
  };
  const aviso = (msg, campo) => avisos.push({ msg, campo: campo || null });
  const atr = (function(){ try { return t20AtributosFinais(p); } catch(e){ return null; } })();

  if(etapa === 1){
    reportar(modo === "estrito" || modo === "livre", "Escolha o modo de criação: estrito ou livre.", "modo-estrito");
  }

  if(etapa === 2){
    reportar(String(p.nome || "").trim().length > 0, "Informe o nome do personagem.", "nome");
    reportar(Number.isInteger(p.nivel) && p.nivel >= T20_NIVEL_MIN && p.nivel <= T20_NIVEL_MAX,
      `O nível deve ser de ${T20_NIVEL_MIN} a ${T20_NIVEL_MAX}.`, "nivel");
  }

  if(etapa === 3){
    const r = t20RacaInfo(p.raca);
    reportar(!!r, "Escolha uma raça.", "raca");
    if(r){
      const falta = [];
      if(!r.verificado.ajustes) falta.push(r.ajustes ? "ajustes de atributo (1 fonte)" : "ajustes de atributo");
      if(!r.verificado.tamanho) falta.push(r.tamanho ? `tamanho ${r.tamanho} (1 fonte)` : "tamanho");
      if(!r.verificado.deslocamento) falta.push(r.deslocamento !== null ? `deslocamento ${r.deslocamento} m (1 fonte)` : "deslocamento");
      if(falta.length){
        aviso(`${r.nome}: NÃO VERIFICADO em ${falta.join(", ")}.` + (r.ajustes === null ? " Os ajustes podem ser lançados no passo Atributos." : ""));
      }
    }
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
    aviso("Benefícios específicos de cada origem: NÃO VERIFICADO. A lista de benefícios é a sua escolha.");
  }

  if(etapa === 5){
    const c = T20_CLASSES[p.classe];
    reportar(!!c, "Escolha uma classe.", "classe");
    if(c && c.conjurador && c.atributoMagiaOpcoes.length > 1){
      reportar(c.atributoMagiaOpcoes.includes(p.atributoMagia || c.atributoMagiaPadrao), "Escolha o atributo de magia da classe.", "atributo-magia");
    }
    if(p.classe === "arcanista"){
      reportar(["bruxo", "feiticeiro", "mago"].includes(p.caminho), "Escolha o caminho do Arcanista (Bruxo, Feiticeiro ou Mago).", "caminho");
      if(p.caminho){
        const esperado = t20AtributoMagiaEfetivo(p);
        reportar(!p.atributoMagia || p.atributoMagia === esperado, `Caminho ${p.caminho}: o atributo de magia é ${T20_ATRIBUTO_NOME[esperado]} (livro p043).`, "atributo-magia");
      }
      if(p.caminho === "feiticeiro"){
        reportar(!!T20_LINHAGENS[p.linhagem], "Escolha a linhagem sobrenatural do Feiticeiro (Dracônica, Feérica ou Rubra; livro p044-p045).", "linhagem");
        if(p.linhagem === "draconica"){
          reportar(!!T20_LINHAGEM_DANOS[p.linhagemDano], "Escolha o tipo de dano da linhagem Dracônica (ácido, eletricidade, fogo ou frio; livro p045).", "linhagem-dano");
        }
        if(p.linhagem === "rubra") aviso("Linhagem Rubra: o poder da Tormenta da herança básica e os seus efeitos não são escolhidos nem aplicados neste app.");
        if(p.linhagem === "feerica") aviso("Linhagem Feérica: a magia de 1º círculo de encantamento ou ilusão entra na contagem de magias conhecidas; a escola não é conferida pelo app.");
      } else if(p.linhagem || p.linhagemDano){
        aviso("Linhagem sobrenatural só existe no caminho de Feiticeiro (livro p044). O app não a aplica neste caminho.");
      }
    }
    if(c && !c.verificadoPv) aviso(`PV e PM de ${c.nome}: ${c.fontePv}.`);
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
    const escolhaInfo = t20EscolhaRacialInfo(p.raca);
    if(escolhaInfo){
      const escolhidos = (p.escolhaRacial || []).slice(0, escolhaInfo.qtd);
      const nomesAtr = escolhaInfo.permitidos.map(id => T20_ATRIBUTO_NOME[id]).join(", ");
      const campoEsc = "escolha-racial-0";
      reportar(escolhidos.length === escolhaInfo.qtd && escolhidos.every(a => escolhaInfo.permitidos.includes(a)),
        `Escolha ${escolhaInfo.qtd} atributos para +1 cada (${nomesAtr}).`, campoEsc);
      reportar(new Set(escolhidos).size === escolhidos.length, "Os atributos da escolha da raça devem ser diferentes.", campoEsc);
    }
  }

  if(etapa === 7){
    const c = T20_CLASSES[p.classe];
    if(p.racaTrocaPericia){
      reportar(p.raca === "humano", "A troca de perícia por poder geral é do Humano (p025).", "pericias");
    }
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
      if(!c.verificadoPericias) aviso(`Perícias de ${c.nome}: ${c.fontePericias}.`);
    }
  }

  if(etapa === 8){
    if(p.racaTrocaPericia){
      const temGeral = (p.poderes || []).some(pd => pd.id && T20_PODERES[pd.id] && T20_PODERES[pd.id].tipo === "geral");
      reportar(p.raca === "humano" && temGeral, "Troca de perícia (Humano, p025): escolha um poder geral para o lugar da perícia.", "poderes");
    }
    const treinadas = t20TreinadasLista(p);
    const ids = [];
    const aumentosContados = new Set(t20AumentosAplicados(p).map(a => a.i));
    (p.poderes || []).forEach((pd, i) => {
      const campo = `poder-${i}`;
      const cat = pd.id && T20_PODERES[pd.id] ? T20_PODERES[pd.id] : null;
      if(cat) ids.push(cat.id);
      else reportar(String(pd.nome || "").trim().length > 0, `Poder ${i + 1}: escolha um poder da lista ou escreva o nome.`, campo);
      reportar(Number.isInteger(pd.nivel) && pd.nivel >= 1 && pd.nivel <= p.nivel, `Poder ${i + 1}: nível deve estar entre 1 e ${p.nivel}.`, campo);
      if(cat){
        t20ChecarPoder(p, pd, atr || {}, treinadas).forEach(item => {
          if(item.mecanico) reportar(false, `Poder ${i + 1}: ${item.msg}`, campo);
          else aviso(`Poder ${i + 1}: ${item.msg}`, campo);
        });
      }
      if(cat && cat.id === T20_AUMENTO_ID){
        const campoAtr = `poder-atr-${i}`;
        const pat = t20PatamarDoNivel(pd.nivel);
        reportar(T20_ATRIBUTO_IDS.includes(pd.atributo), `Poder ${i + 1}: Aumento de Atributo exige escolher o atributo.`, campoAtr);
        if(T20_ATRIBUTO_IDS.includes(pd.atributo) && pat){
          reportar(aumentosContados.has(i) || (Number(pd.nivel) || 0) < 2,
            `Poder ${i + 1}: Aumento de Atributo em ${T20_ATRIBUTO_NOME[pd.atributo]} já foi usado no patamar ${pat.nome} (${pat.min}º a ${pat.max}º). Só uma vez por patamar para cada atributo.`, campoAtr);
        }
      }
    });
    const repetidos = [...new Set(ids.filter((id, k) => ids.indexOf(id) !== k && id !== T20_AUMENTO_ID))];
    repetidos.forEach(id => aviso(`${T20_PODERES[id].nome} aparece mais de uma vez: repetição NÃO VERIFICADA.`));
    const naoVerificados = [...new Set(ids)].filter(id => !T20_PODERES[id].verificado).length;
    if(naoVerificados) aviso(`${naoVerificados} poder(es) escolhido(s) com dado de uma só fonte: NÃO VERIFICADO.`);
    aviso("Quantidade de poderes por nível: NÃO VERIFICADO. O app não conta poderes por nível.");
  }

  if(etapa === 9){
    const c = T20_CLASSES[p.classe];
    const conjura = !!(c && c.conjurador);
    const max = conjura ? t20CirculoMaximoClasse(p.classe, p.nivel) : 0;
    if(conjura && max === null) aviso(`Círculo máximo no nível ${p.nivel}: NÃO VERIFICADO.`);
    (p.magias || []).forEach((m, i) => {
      const campo = `magia-${i}`;
      const nome = String(m.nome || "").trim();
      reportar(nome.length > 0, `Magia ${i + 1}: escolha uma magia da lista ou escreva o nome.`, campo);
      if(conjura && max !== null) reportar(Number.isInteger(m.circulo) && m.circulo >= 1 && m.circulo <= max, `Magia ${i + 1}: círculo acima do disponível (máximo ${max}).`, campo);
      const cat = nome ? t20MagiaCatalogo(nome) : null;
      if(cat){
        reportar(cat.circulo === m.circulo, `Magia ${i + 1}: ${cat.nome} é de ${cat.circulo}º círculo.`, campo);
        if(cat.pendente) aviso(`Magia ${i + 1} (${cat.nome}): execução, alcance e duração NÃO VERIFICADOS.`, campo);
      } else if(nome){
        aviso(`Magia ${i + 1} (${nome}): fora do catálogo deste app; não conferida.`, campo);
      }
    });
    const nomes = (p.magias || []).map(m => String(m.nome || "").trim()).filter(Boolean);
    [...new Set(nomes.filter((n, k) => nomes.indexOf(n) !== k))].forEach(n => aviso(`${n} aparece mais de uma vez: repetição NÃO VERIFICADA.`));
    if(c && c.conjurador){
      const limite = t20MagiasConhecidasTotal(p);
      reportar(p.magias.length === limite, `Escolha ${limite} magias conhecidas no nível ${p.nivel} (escolheu ${p.magias.length}).`, "magias");
    } else if(p.magias.length){
      aviso(`${c ? c.nome : "Esta classe"} não tem magias listadas neste app: as magias ficam só como anotação.`);
    }
  }

  if(etapa === 10){
    reportar(p.equipamento.every(e => Number.isInteger(e.quantidade) && e.quantidade >= 1), "Quantidade de equipamento deve ser um inteiro maior que zero.", "equip-0");
    reportar(Number.isFinite(p.dinheiro) && p.dinheiro >= 0, "Dinheiro não pode ser negativo.", "dinheiro");
    const d = p.defesa;
    reportar([d.armadura, d.escudo, d.outros].every(v => Number.isInteger(Number(v))), "Bônus de defesa deve ser um número inteiro.", "def-armadura");
    aviso(T20_DINHEIRO_FONTE);
    aviso(`Armas e armaduras: ${T20_EQUIPAMENTO_STATUS.armas}.`);
  }

  if(etapa === 11){
    const c = T20_CLASSES[p.classe];
    const manualOk = (v, min) => v === null || v === undefined || (Number.isInteger(v) && v >= min);
    reportar(manualOk(p.pvManual, 1), "PV digitado à mão deve ser um inteiro maior que zero (ou fique em branco para calcular).", "pv-manual");
    reportar(manualOk(p.pmManual, 0), "PM digitado à mão deve ser um inteiro de zero para cima (ou fique em branco para calcular).", "pm-manual");
    reportar(manualOk(p.treinoManual, 0), "Treino digitado à mão deve ser um inteiro de zero para cima (ou fique em branco para calcular).", "treino-manual");
    if(c){
      const d = t20Derivados(p);
      if(d.pv === null) aviso(`PV de ${c.nome} no nível ${p.nivel} não calculado: ${c.fontePv}. Digite o valor em PV manual.`, "pv-manual");
      if(d.pm === null) aviso(`PM de ${c.nome} no nível ${p.nivel} não calculado. Digite o valor em PM manual.`, "pm-manual");
      if(d.habilidadesSemEfeito) aviso(`${d.habilidadesSemEfeito} habilidade(s) de classe sem efeito lido na fonte: NÃO VERIFICADO.`);
      if(c.conjurador && d.circuloMaximo === null) aviso(`Círculo máximo no nível ${p.nivel}: NÃO VERIFICADO.`);
    }
  }

  return { erros, avisos };
}

/* Valida a ficha inteira (etapas 1 a 11) e devolve o resumo para o passo Resumo. */
function t20ValidarTudo(state){
  const porEtapa = {};
  let totalErros = 0, totalAvisos = 0;
  for(let e = 1; e <= 11; e++){
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
