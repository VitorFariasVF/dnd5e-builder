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

/* CA = 10 + armadura + escudo + modificador de Destreza + modificador de tamanho (d20 SRD 3.5). */
function trpgClasseArmadura({ armadura = 0, escudo = 0, destreza = 10, tamanho = 0 }){
  const md = trpgModificador(destreza);
  if(md === null) return null;
  return 10 + Number(armadura || 0) + Number(escudo || 0) + md + Number(tamanho || 0);
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

/* Derivados de uma ficha. Itens sem dado verificado voltam null. */
function trpgDerivados(personagem){
  const at = personagem.atributos || {};
  const d = personagem.derivados || {};
  const mods = {};
  TRPG_ATRIBUTOS.forEach(a => { mods[a.id] = trpgModificador(at[a.id]); });
  return {
    modificadores: mods,
    ca: trpgClasseArmadura({ armadura: d.armadura, escudo: d.escudo, destreza: at.destreza, tamanho: d.tamanho }),
    iniciativa: trpgIniciativa(at.destreza),
    pontosPorNivel: null,
    pvMaximo: d.pvMaximo === null || d.pvMaximo === undefined || d.pvMaximo === "" ? null : Number(d.pvMaximo),
    bba: null,
    resistencias: null
  };
}
