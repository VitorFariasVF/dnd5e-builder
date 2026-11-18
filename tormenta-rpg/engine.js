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

/* Iniciativa: hipótese d20 (modificador de Destreza). NÃO VERIFICADO na Tormenta. */
function trpgIniciativa(destreza){
  return trpgModificador(destreza);
}

/* Pontos de perícia por nível = base da classe + modificador de Inteligência, mínimo 1 (d20 SRD 3.5).
   `base` null significa que a classe ainda não foi verificada. */
function trpgPontosPorNivel({ base, inteligencia }){
  const mi = trpgModificador(inteligencia);
  if(base === null || base === undefined || mi === null) return null;
  return Math.max(1, Number(base) + mi);
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
  return {
    modificadores: mods,
    ca: trpgClasseArmadura({ armadura: d.armadura, escudo: d.escudo, destreza: at.destreza, nivel: personagem.nivel }),
    iniciativa: trpgIniciativa(at.destreza),
    pontosPorNivel: trpgPontosPorNivel({ base, inteligencia: at.inteligencia }),
    pvMaximo: d.pvMaximo === null || d.pvMaximo === undefined || d.pvMaximo === "" ? null : Number(d.pvMaximo),
    pvSugerido: trpgPVTotal({ classe, nivel: personagem.nivel, constituicao: at.constituicao }),
    bba: trpgBBA(classe, personagem.nivel),
    resistencias: trpgResistenciasDerivadas(personagem),
    circulos: trpgCirculosDisponiveis(classe, personagem.nivel)
  };
}
