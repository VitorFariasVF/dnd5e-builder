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

/* CA = 10 + metade do nível (arredondada para baixo) + modificador de Destreza + armadura + escudo + bônus de tamanho.
   Confirmado no manual Tormenta RPG, PDF p224 (exemplo: nível 5, Des 14 = CA 13 sem armadura).
   O bônus de tamanho (default 0) vem só da raça Pequena: +1 de CA (goblin, halfling; PDF p.32). O campo derivados.tamanho
   (modificador digitado) não entra na conta. */
function trpgClasseArmadura({ armadura = 0, escudo = 0, destreza = 10, nivel, bonusTamanho = 0, bonusTalentos = 0 }){
  const md = trpgModificador(destreza);
  if(md === null || !trpgNivelValido(nivel)) return null;
  return 10 + Math.floor(Number(nivel) / 2) + md + Number(armadura || 0) + Number(escudo || 0) + Number(bonusTamanho || 0) + Number(bonusTalentos || 0);
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

/* Raça da lista (chave ou nome, sem diferenciar maiúsculas) a partir do valor do campo. Null se vazio ou fora da lista. */
function trpgRacaPorValor(valor){
  if(valor === null || valor === undefined || String(valor).trim() === "") return null;
  if(TRPG_RACAS[valor]) return TRPG_RACAS[valor];
  const alvo = String(valor).trim().toLowerCase();
  const chave = Object.keys(TRPG_RACAS).find(k => TRPG_RACAS[k].nome.toLowerCase() === alvo);
  return chave ? TRPG_RACAS[chave] : null;
}

/* Bônus de CA da raça por tamanho (PDF p.32: Pequeno, +1 na CA). Raça Média, vazia ou fora da lista: 0. */
function trpgBonusTamanhoCA(raca){
  const r = trpgRacaPorValor(raca);
  return r && r.bonusTamanho ? Number(r.bonusTamanho.ca || 0) : 0;
}

/* Escolhas raciais gravadas na ficha (personagem.escolhasRaciais.ajustesEscolha). Sempre devolve uma lista. */
function trpgEscolhasRaciais(personagem){
  const e = personagem && personagem.escolhasRaciais;
  return e && Array.isArray(e.ajustesEscolha) ? e.ajustesEscolha : [];
}

/* Escolha racial (PDF p.31, p.37, p.38 e p.42). Raças com `escolha` em rules-racas.js: humano (+2 em duas diferentes),
   lefou (+2 em duas, exceto Carisma) e meio-elfo (+2 em uma, exceto Constituição e Destreza).
   Devolve só a parte escolhida; o ajuste fixo da raça fica em trpgAjustesRaciais.
   Escolha incompleta, repetida ou proibida: a escolha não é aplicada (ajustes vazio) e `motivo` diz o que falta. */
function trpgEscolhaRacial(personagem){
  const r = trpgRacaPorValor(personagem && personagem.raca);
  if(!r || !r.escolha) return { aplicavel: false, ok: true, motivo: "", ajustes: {} };
  const e = r.escolha;
  const falha = motivo => ({ aplicavel: true, ok: false, motivo, ajustes: {} });
  const usadas = [];
  for(let i = 0; i < e.quantidade; i++) usadas.push(trpgEscolhasRaciais(personagem)[i] || null);
  const ids = TRPG_ATRIBUTOS.map(a => a.id);
  if(usadas.some(x => !x)) return falha("Escolha as " + e.quantidade + " habilidade(s) do ajuste racial de " + r.nome + " (+" + e.valor + " em cada). Nada da escolha foi aplicado.");
  if(usadas.some(x => !ids.includes(x) || e.excluir.includes(x))) return falha("Habilidade inválida para o ajuste racial de " + r.nome + ". Nada da escolha foi aplicado.");
  if(new Set(usadas).size !== usadas.length) return falha("As habilidades do ajuste racial de " + r.nome + " precisam ser diferentes. Nada da escolha foi aplicado.");
  const ajustes = {};
  usadas.forEach(x => { ajustes[x] = (ajustes[x] || 0) + e.valor; });
  return { aplicavel: true, ok: true, motivo: "", ajustes };
}

/* Ajustes raciais por habilidade (PDF p.31): o ajuste fixo de toda raça que o tem (anão, elfo, goblin, halfling, minotauro,
   qareen, gnomo, meio-elfo e lefou) é sempre aplicado; a escolha, só quando completa e válida (humano, lefou, meio-elfo).
   Devolve { fixos, escolha, total }. */
function trpgAjustesRaciais(personagem){
  const r = trpgRacaPorValor(personagem && personagem.raca);
  const fixos = r && r.ajustes ? Object.assign({}, r.ajustes) : {};
  const escolha = trpgEscolhaRacial(personagem);
  const total = Object.assign({}, fixos);
  Object.keys(escolha.ajustes).forEach(k => { total[k] = (total[k] || 0) + escolha.ajustes[k]; });
  return { fixos, escolha, total };
}

/* Atributos finais para os cálculos: os valores digitados mais os ajustes raciais (fixos e escolha).
   Valor vazio (null) continua vazio. Os valores digitados não mudam. */
function trpgAtributosFinais(personagem){
  const valores = Object.assign({}, personagem.atributos || {});
  const aj = trpgAjustesRaciais(personagem);
  Object.keys(aj.total).forEach(k => { if(typeof valores[k] === "number") valores[k] = valores[k] + aj.total[k]; });
  return { valores, escolha: aj.escolha, ajustes: aj.total };
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
function trpgResistencia({ base, talentos = 0, bonus = 0 }){
  if(base === null || base === undefined || !Number.isFinite(Number(base))) return null;
  return Number(base) + 2 * Number(talentos || 0) + Number(bonus || 0);
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
   Os talentos de resistência (Fortitude Maior etc.) não são somados aqui. `bonusTalentos` é o bônus de efeito de talento
   (ex.: Ao Sabor do Destino), somado a cada uma. */
function trpgResistenciasDerivadas(personagem, bonusTalentos = 0){
  const at = personagem.atributos || {};
  const meio = trpgNivelValido(personagem.nivel) ? Math.floor(Number(personagem.nivel) / 2) : null;
  const base = (attr) => { const m = trpgModificador(at[attr]); return meio === null || m === null ? null : meio + m; };
  return {
    fortitude: trpgResistencia({ base: base("constituicao"), bonus: bonusTalentos }),
    reflexos: trpgResistencia({ base: base("destreza"), bonus: bonusTalentos }),
    vontade: trpgResistencia({ base: base("sabedoria"), bonus: bonusTalentos })
  };
}

/* ---- Talentos: efeitos numéricos e pré-requisitos verificáveis ----
   Só entram aqui o que é número ou pré-requisito verificável. Efeitos de combate (ação, teste de ataque, dano extra,
   uso por dia) não são automatizados: ficam na `nota` de cada talento (rules-talentos-extra.js).
   Talento reconhecido: a linha do campo Talentos bate com o nome do talento (sem acento, sem maiúsculas, sem parênteses). */

/* Chave de comparação de nome de talento ou pré-requisito. */
function trpgChaveTalento(texto){
  return String(texto || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/\([^)]*\)|\[[^\]]*\]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}

function trpgTabelaTalentos(){
  return typeof TRPG_TALENTOS !== "undefined" && TRPG_TALENTOS ? TRPG_TALENTOS : {};
}

/* Talentos reconhecidos na ficha: [{ id, linha, dados }], na ordem em que foram digitados. */
function trpgTalentosDaFicha(personagem){
  const tabela = trpgTabelaTalentos();
  const porNome = {};
  Object.keys(tabela).forEach(id => { porNome[trpgChaveTalento(tabela[id].nome)] = id; });
  return String((personagem && personagem.talentos) || "").split(/\r?\n/)
    .map(x => x.trim()).filter(Boolean)
    .reduce((lista, linha) => {
      const id = porNome[trpgChaveTalento(linha)];
      if(id) lista.push({ id, linha, dados: tabela[id] });
      return lista;
    }, []);
}

/* Pré-requisitos de um talento (campo pre em texto). Verifica: habilidade mínima (valor final), nível mínimo,
   nível de classe mínimo, BBA mínimo e talento exigido (se estiver na tabela). O resto (devoto, treinado em perícia,
   "ou") fica em `naoVerificados`. Devolve { ok, faltando, naoVerificados }; ok = nada faltando. */
function trpgPreRequisitosTalento(personagem, dados){
  const faltando = [], naoVerificados = [];
  const finais = trpgAtributosFinais(personagem).valores;
  const atributos = { "Força": "forca", "Destreza": "destreza", "Constituição": "constituicao", "Inteligência": "inteligencia", "Sabedoria": "sabedoria", "Carisma": "carisma" };
  const tabela = trpgTabelaTalentos();
  const naFicha = new Set(trpgTalentosDaFicha(personagem).map(t => trpgChaveTalento(t.dados.nome)));
  const classe = trpgClasseDados(personagem && personagem.classe);
  const nivelValido = trpgNivelValido(personagem && personagem.nivel);
  const nivel = Number(personagem && personagem.nivel);
  ((dados && dados.pre) || []).forEach(pre => {
    let m;
    if((m = pre.match(/^(Força|Destreza|Constituição|Inteligência|Sabedoria|Carisma) (\d+)$/))){
      const v = finais[atributos[m[1]]];
      if(typeof v !== "number") naoVerificados.push(pre + " (valor vazio)");
      else if(v < Number(m[2])) faltando.push(pre);
    } else if((m = pre.match(/^Personagem de (\d+)º nível$/))){
      if(!nivelValido) naoVerificados.push(pre + " (nível vazio)");
      else if(nivel < Number(m[1])) faltando.push(pre);
    } else if((m = pre.match(/^Bônus base de ataque \+(\d+)$/))){
      const bba = trpgBBA(classe, personagem.nivel);
      if(bba === null) naoVerificados.push(pre + " (classe ou nível vazio)");
      else if(bba < Number(m[1])) faltando.push(pre);
    } else if((m = pre.match(/^([^\s\d(]+) (\d+)º nível$/))){
      if(!classe || !nivelValido) naoVerificados.push(pre + " (classe ou nível vazio)");
      else if(trpgChaveTalento(classe.nome) !== trpgChaveTalento(m[1]) || nivel < Number(m[2])) faltando.push(pre);
    } else {
      const chave = trpgChaveTalento(pre);
      const existe = Object.keys(tabela).some(id => trpgChaveTalento(tabela[id].nome) === chave);
      if(!existe || / ou |Devoto|Treinado/.test(pre)) naoVerificados.push(pre);
      else if(!naFicha.has(chave)) faltando.push(pre);
    }
  });
  return { ok: faltando.length === 0, faltando, naoVerificados };
}

/* Ao Sabor do Destino (PDF p.109): tabela por nível de personagem. Ataque e dano, CA e resistências: a faixa mais alta
   atingida vale (o livro marca só a habilidade como cumulativa, PDF p.109). Perícia e habilidade são escolhas: não aplicadas. */
const TRPG_AO_SABOR_FAIXAS = [
  { nivel: 5, ataqueDano: 1 }, { nivel: 7, ca: 1 }, { nivel: 9, resistencias: 1 }, { nivel: 10, ataqueDano: 2 },
  { nivel: 12, ca: 2 }, { nivel: 14, resistencias: 2 }, { nivel: 15, ataqueDano: 3 }, { nivel: 17, ca: 3 },
  { nivel: 19, resistencias: 3 }, { nivel: 20, ataqueDano: 4 }
];

/* Bônus numéricos vindos de talentos reconhecidos e com pré-requisitos atendidos. Zero quando não há talento.
   Liderança (PDF p.110): níveis de seguidores = nível × bônus de Carisma (mínimo 1); cada seguidor no máximo metade do nível. */
function trpgEfeitosTalentos(personagem){
  const efeitos = { ca: 0, ataqueDano: 0, resistencias: 0, liderancaSeguidores: null };
  const nivel = Number(personagem && personagem.nivel);
  if(!trpgNivelValido(nivel)) return efeitos;
  const ativos = id => trpgTalentosDaFicha(personagem).some(t => t.id === id) && trpgPreRequisitosTalento(personagem, trpgTabelaTalentos()[id]).ok;
  if(ativos("ao-sabor-do-destino")){
    ["ca", "ataqueDano", "resistencias"].forEach(cat => {
      efeitos[cat] = TRPG_AO_SABOR_FAIXAS.reduce((v, f) => (f[cat] !== undefined && nivel >= f.nivel ? f[cat] : v), 0);
    });
  }
  if(ativos("lideranca")){
    const mc = trpgModificador(trpgAtributosFinais(personagem).valores.carisma);
    if(mc !== null) efeitos.liderancaSeguidores = { niveisTotais: Math.max(1, nivel * mc), porSeguidorMaximo: Math.floor(nivel / 2) };
  }
  return efeitos;
}

/* Notas de talentos para a interface: cada talento reconhecido, com a nota do que não é aplicado e o estado dos pré-requisitos. */
function trpgNotasTalentos(personagem){
  return trpgTalentosDaFicha(personagem).map(t => ({
    id: t.id,
    nome: t.dados.nome,
    nota: t.dados.nota || "",
    pre: trpgPreRequisitosTalento(personagem, t.dados)
  }));
}

/* Derivados de uma ficha. Itens sem dado verificado voltam null. */
function trpgDerivados(personagem){
  const at = trpgAtributosFinais(personagem).valores;
  const pf = Object.assign({}, personagem, { atributos: at });
  const d = personagem.derivados || {};
  const mods = {};
  TRPG_ATRIBUTOS.forEach(a => { mods[a.id] = trpgModificador(at[a.id]); });
  const classe = trpgClasseDados(personagem.classe);
  const base = classe ? classe.pericias.treinadasBase : null;
  const treinadas = trpgPericiasTreinadas({ base, inteligencia: at.inteligencia, bonusRacial: trpgBonusRacialPericias(personagem.raca) });
  const efeitos = trpgEfeitosTalentos(personagem);
  return {
    modificadores: mods,
    atributosFinais: at,
    ca: trpgClasseArmadura({ armadura: d.armadura, escudo: d.escudo, destreza: at.destreza, nivel: personagem.nivel, bonusTamanho: trpgBonusTamanhoCA(personagem.raca), bonusTalentos: efeitos.ca }),
    iniciativa: trpgIniciativa(at.destreza),
    periciasTreinadas: treinadas,
    pontosPericiaAlternativo: trpgPontosPericiaAlternativo(treinadas),
    pvMaximo: d.pvMaximo === null || d.pvMaximo === undefined || d.pvMaximo === "" ? null : Number(d.pvMaximo),
    pvSugerido: trpgPVTotal({ classe, nivel: personagem.nivel, constituicao: at.constituicao }),
    bba: trpgBBA(classe, personagem.nivel),
    resistencias: trpgResistenciasDerivadas(pf, efeitos.resistencias),
    circulos: trpgCirculosDisponiveis(classe, personagem.nivel),
    efeitosTalentos: efeitos
  };
}
