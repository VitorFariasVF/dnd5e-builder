/* Cálculos da ficha. Funções puras (sem DOM), testadas em tests/regras.test.js.
   Devolvem `null` quando o valor depende de dado ainda NÃO VERIFICADO: a interface mostra "a definir", nunca um palpite. */

/* Modificador de atributo: (valor - 10) / 2 arredondado para baixo (d20 SRD 3.5). */
function trpgModificador(valor){
  if(valor === null || valor === undefined || valor === "") return null;
  const v = Number(valor);
  if(!Number.isFinite(v)) return null;
  return Math.floor((v - 10) / 2);
}

function trpgFormatarBonus(n){
  if(n === null || n === undefined || !Number.isFinite(Number(n))) return "—";
  const v = Number(n);
  return (v >= 0 ? "+" : "") + v;
}

/* CA = 10 + metade do nível (arredondada para baixo) + modificador de Destreza + armadura + escudo.
   Confirmado no manual Tormenta RPG, PDF p224 (exemplo: nível 5, Des 14 = CA 13 sem armadura). Tamanho não entra na CA. */
function trpgClasseArmadura({ armadura = 0, escudo = 0, destreza = 10, nivel }){
  const md = trpgModificador(destreza);
  if(md === null || !trpgNivelValido(nivel)) return null;
  return 10 + Math.floor(Number(nivel) / 2) + md + Number(armadura || 0) + Number(escudo || 0);
}

/* Iniciativa exibida = só o modificador de Destreza. O livro (PDF p.82) lista Iniciativa na tabela de perícias, com
   Destreza como atributo-chave, e o total do teste soma a graduação da perícia (PDF p.80, exemplo "Iniciativa +7").
   A graduação não é calculada aqui: o app não guarda quais perícias são treinadas. Pendência registrada. */
function trpgIniciativa(destreza){
  return trpgModificador(destreza);
}

/* Perícias treinadas no 1º nível, método padrão do livro (PDF p.79): base da classe + modificador de Inteligência
   + bônus racial (humanos: +2, PDF p.79). Mínimo de 1 perícia treinada no total (PDF p.79).
   `base` null ou `bonusRacial` null (raça ainda não escolhida) devolve null. Não cresce sozinho com o nível: ganha
   +1 por aumento de +1 de Inteligência e com o talento Treino em Perícia (PDF p.80). */
function trpgPericiasTreinadas({ base, inteligencia, bonusRacial = 0 }){
  const mi = trpgModificador(inteligencia);
  if(base === null || base === undefined || mi === null || bonusRacial === null) return null;
  return Math.max(1, Number(base) + mi + Number(bonusRacial || 0));
}

/* Bônus racial de perícias treinadas: humanos ganham +2 (PDF p.79). Outras raças: nenhum bônus lido no livro
   (traços raciais de perícia NÃO VERIFICADOS). Raça vazia devolve null (ainda não escolhida). */
function trpgBonusRacialPericias(raca){
  if(raca === null || raca === undefined || String(raca).trim() === "") return null;
  const s = String(raca).trim().toLowerCase();
  return s === "humano" || s === "humana" ? 2 : 0;
}

/* Método alternativo de pontos de perícia (PDF p.80): 4 vezes o número de perícias treinadas no 1º nível e, depois,
   esse mesmo valor a cada nível seguinte. Devolve null sem o número de perícias treinadas. */
function trpgPontosPericiaAlternativo(treinadas){
  if(treinadas === null || treinadas === undefined || !Number.isFinite(Number(treinadas))) return null;
  return { nivel1: 4 * Number(treinadas), porNivelSeguinte: Number(treinadas) };
}

/* Distribuição de 20 pontos (compra por pontos, PDF p.28) com a menor amplitude e a menor variância entre os seis
   valores. Enumera sequências em ordem crescente (valores de 7 a 18, custos de TRPG_CUSTO_PONTOS). Com 20 pontos
   a escolha é única: 14, 14, 13, 13, 13, 13. Devolve os valores em ordem crescente. */
function trpgMelhorDistribuicaoPontos(total){
  const valores = Object.keys(TRPG_CUSTO_PONTOS).map(Number).sort((a, b) => a - b);
  let melhor = null;
  const percorrer = (inicio, custo, escolhidos) => {
    if(escolhidos.length === TRPG_ATRIBUTOS.length){
      if(custo !== total) return;
      const amplitude = Math.max(...escolhidos) - Math.min(...escolhidos);
      const media = escolhidos.reduce((s, x) => s + x, 0) / escolhidos.length;
      const variancia = escolhidos.reduce((s, x) => s + (x - media) * (x - media), 0);
      if(!melhor || amplitude < melhor.amplitude || (amplitude === melhor.amplitude && variancia < melhor.variancia - 1e-9)){
        melhor = { amplitude, variancia, valores: escolhidos.slice() };
      }
      return;
    }
    for(let k = inicio; k < valores.length; k++){
      const v = valores[k];
      percorrer(k, custo + TRPG_CUSTO_PONTOS[v], escolhidos.concat([v]));
    }
  };
  percorrer(0, 0, []);
  return melhor ? melhor.valores : null;
}

/* Sugestão de valores para o passo de atributos (criação orientada). Funções puras, sem rolagem.
   - Elite (PDF p.27): valores fixos 17, 15, 13, 12, 10 e 8.
   - Pontos (PDF p.28): 20 pontos pelo custo de cada valor, distribuição equilibrada (ver trpgMelhorDistribuicaoPontos).
   Atribuição: ordem neutra (TRPG_ORDEM_NEUTRA), sem prioridade do livro. Métodos de rolagem não têm sugestão.
   Devolve { ok: true, valores: { forca: n, ... }, nota } ou { ok: false, motivo }. */
function trpgSugerirAtributos(metodo){
  const ordem = TRPG_ORDEM_NEUTRA;
  const nota = "Ordem neutra (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma), sem prioridade do livro: o manual não define prioridade de atributos por classe.";
  let distribuicao = null, texto = "";
  if(metodo === "elite"){
    distribuicao = TRPG_ELITE_VALORES.slice().sort((a, b) => b - a);
    texto = "Elite: valores fixos do livro (PDF p.27).";
  } else if(metodo === "pontos"){
    distribuicao = trpgMelhorDistribuicaoPontos(TRPG_PONTOS_TOTAL);
    if(!distribuicao) return { ok: false, motivo: "Não foi possível distribuir os 20 pontos." };
    distribuicao = distribuicao.slice().sort((a, b) => b - a);
    const custo = distribuicao.reduce((s, v) => s + TRPG_CUSTO_PONTOS[v], 0);
    texto = `Pontos: ${custo} de ${TRPG_PONTOS_TOTAL} pontos gastos (custos do livro, PDF p.28).`;
  } else if(["padrao", "classica", "heroica", "audaciosa"].includes(metodo)){
    return { ok: false, motivo: "Sem sugestão para este método: ele usa rolagem. Role os dados e digite os valores." };
  } else {
    return { ok: false, motivo: "Escolha o método Elite ou Pontos para ver a sugestão." };
  }
  const valores = {};
  ordem.forEach((id, i) => { valores[id] = distribuicao[i]; });
  return { ok: true, valores, nota: texto + " " + nota };
}

/* Classe da tabela a partir do valor do campo: aceita a chave (modo estrito) ou o nome digitado (modo livre).
   Devolve null se a classe não está na tabela (texto livre que não bate com nenhuma classe verificada). */
function trpgClasseDados(valor){
  if(!valor || typeof valor !== "string") return null;
  if(TRPG_CLASSES[valor]) return TRPG_CLASSES[valor];
  const alvo = valor.trim().toLowerCase();
  const chave = Object.keys(TRPG_CLASSES).find(k => TRPG_CLASSES[k].nome.toLowerCase() === alvo);
  return chave ? TRPG_CLASSES[chave] : null;
}

function trpgNivelValido(nivel){
  return trpgInteiro(nivel) && nivel >= 1 && nivel <= 20;
}

/* PV de uma classe no nível n: PV inicial + mod. Con no 1º nível; cada nível seguinte soma PV por nível + mod. Con
   (compêndio do VTT, texto de classe). Devolve null sem classe, sem nível válido ou sem Constituição. */
function trpgPVTotal({ classe, nivel, constituicao }){
  if(!classe || !classe.dadoDeVida || !trpgNivelValido(nivel)) return null;
  const mc = trpgModificador(constituicao);
  if(mc === null) return null;
  const { inicial, porNivel } = classe.dadoDeVida;
  // Manual Tormenta RPG, PDF p28: mesmo com modificador negativo, ganha pelo menos 1 PV ao subir de nível.
  return inicial + mc + (nivel - 1) * Math.max(1, porNivel + mc);
}

/* BBA da classe no nível n (valor da tabela da classe). Null sem classe ou nível fora de 1 a 20. */
function trpgBBA(classe, nivel){
  if(!classe || !Array.isArray(classe.bba) || !trpgNivelValido(nivel)) return null;
  return classe.bba[nivel - 1];
}

/* Teste de resistência = metade do nível (arredondada para baixo) + modificador de habilidade + 2 por talento de resistência.
   Confirmado no manual Tormenta RPG, PDF p225. Sem base (nível ou habilidade vazios) devolve null. */
function trpgResistencia({ base, talentos = 0 }){
  if(base === null || base === undefined || !Number.isFinite(Number(base))) return null;
  return Number(base) + 2 * Number(talentos || 0);
}

/* Círculos de magia liberados no nível n (ex.: [0, 1, 2] para o nível 3 do mago). Null se a classe não conjura. */
function trpgCirculosDisponiveis(classe, nivel){
  if(!classe || !classe.conjuracao || !trpgNivelValido(nivel)) return null;
  return Object.keys(classe.conjuracao.circulos)
    .map(Number)
    .filter(c => classe.conjuracao.circulos[c] <= nivel)
    .sort((a, b) => a - b);
}

/* Resistências: Fortitude = Constituição, Reflexos = Destreza, Vontade = Sabedoria, cada uma com metade do nível.
   Os talentos de resistência ainda não são somados aqui (bônus de talento: 0). */
function trpgResistenciasDerivadas(personagem){
  const at = personagem.atributos || {};
  const meio = trpgNivelValido(personagem.nivel) ? Math.floor(Number(personagem.nivel) / 2) : null;
  const base = (attr) => { const m = trpgModificador(at[attr]); return meio === null || m === null ? null : meio + m; };
  return {
    fortitude: trpgResistencia({ base: base("constituicao") }),
    reflexos: trpgResistencia({ base: base("destreza") }),
    vontade: trpgResistencia({ base: base("sabedoria") })
  };
}

/* Derivados de uma ficha. Itens sem dado verificado voltam null. */
function trpgDerivados(personagem){
  const at = personagem.atributos || {};
  const d = personagem.derivados || {};
  const mods = {};
  TRPG_ATRIBUTOS.forEach(a => { mods[a.id] = trpgModificador(at[a.id]); });
  const classe = trpgClasseDados(personagem.classe);
  const base = classe ? classe.pericias.treinadasBase : null;
  const treinadas = trpgPericiasTreinadas({ base, inteligencia: at.inteligencia, bonusRacial: trpgBonusRacialPericias(personagem.raca) });
  return {
    modificadores: mods,
    ca: trpgClasseArmadura({ armadura: d.armadura, escudo: d.escudo, destreza: at.destreza, nivel: personagem.nivel }),
    iniciativa: trpgIniciativa(at.destreza),
    periciasTreinadas: treinadas,
    pontosPericiaAlternativo: trpgPontosPericiaAlternativo(treinadas),
    pvMaximo: d.pvMaximo === null || d.pvMaximo === undefined || d.pvMaximo === "" ? null : Number(d.pvMaximo),
    pvSugerido: trpgPVTotal({ classe, nivel: personagem.nivel, constituicao: at.constituicao }),
    bba: trpgBBA(classe, personagem.nivel),
    resistencias: trpgResistenciasDerivadas(personagem),
    circulos: trpgCirculosDisponiveis(classe, personagem.nivel)
  };
}
