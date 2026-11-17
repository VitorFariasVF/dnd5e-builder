'use strict';
/* Derivados contra investigadores conferidos à mão.
   Conta feita à mão para cada caso antes de rodar o código:
   A: CON 60, TAM 70 -> PV (60+70)/10 = 13. POD 65 -> Sanidade 65, PM 65/5 = 13. FOR+TAM 60+70 = 130 -> +1D4, Corpo 1.
      DES 50 -> Esquivar 50/2 = 25. EDU 70 -> Idioma próprio 70. Idade 30 (sem ajuste): FOR 60 e DES 50 abaixo de TAM 70: MOV 7.
   B: CON 45, TAM 65 -> PV 110/10 = 11. POD 50 -> Sanidade 50, PM 10. FOR+TAM 80+65 = 145 -> +1D4, Corpo 1.
      DES 35 -> Esquivar 17 (35/2 = 17,5 arredondado para baixo). Idade 30: FOR 80 maior que TAM, DES menor: MOV 8.
   C: CON 85, TAM 50 -> PV 135/10 = 13 (13,5 arredondado para baixo). POD 40 -> PM 8. FOR+TAM 45+50 = 95 -> dano 0, Corpo 0.
      DES 70 -> Esquivar 35. Idade 30: FOR 45 menor que TAM, DES 70 maior: MOV 8.
   Faixas de Dano/Corpo: 64 -> -2; 65 -> -1; 84 -> -1; 85 -> 0; 124 -> 0; 125 -> +1D4; 164 -> +1D4; 165 -> +1D6; 204 -> +1D6; 205 -> sem valor. */
const { criarAmbiente, criarRunner } = require('./ambiente');
const { ctx, val, chamar } = criarAmbiente();
const { teste, fim } = criarRunner('test_derivados.js');

const base = (caracteristicas) => ({ nome: "Teste", idade: 30, caracteristicas, escolhasIdade: [], melhoriasEdu: [], sorte: 50, pontosOcupacao: {}, pontosInteresse: {}, ocupacaoId: "", escolhasGrupo: [], livresOcupacao: [], especializacoes: {} });
const A = base({ for: 60, con: 60, tam: 70, des: 50, apa: 50, int: 60, pod: 65, edu: 70 });
const B = base({ for: 80, con: 45, tam: 65, des: 35, apa: 50, int: 60, pod: 50, edu: 60 });
const C = base({ for: 45, con: 85, tam: 50, des: 70, apa: 50, int: 60, pod: 40, edu: 60 });

teste('A: PV 13, Sanidade 65, PM 13, Dano +1D4, Corpo 1, MOV 7', () => {
  const d = chamar('calcDerivados', A);
  if(d.pv !== 13 || d.sanInicial !== 65 || d.pm !== 13 || d.dano !== "+1D4" || d.corpo !== 1 || d.mov !== 7) throw new Error(JSON.stringify(d));
});
teste('B e C: MOV 8 (um dos dois casos mistos da regra de movimento)', () => {
  if(chamar('calcDerivados', B).mov !== 8 || chamar('calcDerivados', C).mov !== 8) throw new Error("mov");
});
teste('A: Esquivar 25 e Idioma próprio 70', () => {
  const p = chamar('calcPericias', A);
  const dge = p.find(x => x.id === "esquivar").total, idp = p.find(x => x.id === "idioma_proprio").total;
  if(dge !== 25 || idp !== 70) throw new Error(`esquivar ${dge}, idioma ${idp}`);
});
teste('B: PV 11, PM 10, Sanidade 50, Dano +1D4, Corpo 1', () => {
  const d = chamar('calcDerivados', B);
  if(d.pv !== 11 || d.pm !== 10 || d.sanInicial !== 50 || d.dano !== "+1D4" || d.corpo !== 1) throw new Error(JSON.stringify(d));
});
teste('B: Esquivar arredonda para baixo (17)', () => {
  const dge = chamar('calcPericias', B).find(x => x.id === "esquivar").total;
  if(dge !== 17) throw new Error("esquivar " + dge);
});
teste('C: PV 13 (arredonda para baixo), PM 8, Dano 0, Corpo 0, Esquivar 35', () => {
  const d = chamar('calcDerivados', C);
  if(d.pv !== 13 || d.pm !== 8 || d.dano !== "0" || d.corpo !== 0) throw new Error(JSON.stringify(d));
  const dge = chamar('calcPericias', C).find(x => x.id === "esquivar").total;
  if(dge !== 35) throw new Error("esquivar " + dge);
});
teste('Sanidade máxima é 99 menos Mitos (0 na criação)', () => {
  const d = chamar('calcDerivados', A);
  if(d.sanMax !== 99) throw new Error("sanMax " + d.sanMax);
});
teste('Metade e quinto arredondam para baixo (total 67: metade 33, quinto 13)', () => {
  const x = chamar('calcPericias', Object.assign({}, A, { pontosInteresse: { esquivar: 42 } })).find(p => p.id === "esquivar");
  if(x.total !== 67 || x.metade !== 33 || x.quinto !== 13) throw new Error(JSON.stringify(x));
});

/* Faixas de Dano e Corpo (tabela oficial conferida: 2-64, 65-84, 85-124, 125-164, 165-204). */
[[2, "-2", -2], [64, "-2", -2], [65, "-1", -1], [84, "-1", -1], [85, "0", 0], [124, "0", 0],
 [125, "+1D4", 1], [164, "+1D4", 1], [165, "+1D6", 2], [204, "+1D6", 2]].forEach(([soma, dano, corpo]) => {
  teste(`Dano/Corpo para FOR+TAM ${soma}`, () => {
    const r = chamar('cocDano', soma);
    if(!r || r.dano !== dano || r.corpo !== corpo) throw new Error(JSON.stringify(r));
  });
});
teste('FOR+TAM acima de 204 não tem valor (NÃO VERIFICADO, não inventado)', () => {
  if(chamar('cocDano', 205) !== null) throw new Error("deveria ser null");
  const d = chamar('calcDerivados', base({ for: 90, con: 60, tam: 120, des: 50, apa: 50, int: 60, pod: 60, edu: 60 }));
  if(d.danoConhecido !== false || d.dano !== null) throw new Error(JSON.stringify(d));
});

/* Dados de dados com gerador controlado: rng 0 dá o menor resultado; rng quase 1 dá o maior. */
teste('3d6 com rng mínimo dá 3 e 3d6 × 5 dá 15', () => {
  if(val('rolarFormulaDados("3d6", () => 0)') !== 3) throw new Error("3d6");
  if(val('rolarCaracteristica("for", () => 0)') !== 15) throw new Error("for");
});
teste('2d6+6 com rng máximo dá 18 e (2d6+6) × 5 dá 90', () => {
  if(val('rolarFormulaDados("2d6+6", () => 0.9999999)') !== 18) throw new Error("tam");
  if(val('rolarCaracteristica("tam", () => 0.9999999)') !== 90) throw new Error("tam x5");
});
teste('(2d6+6) × 5 mínimo é 40 (limite de TAM, INT e EDU)', () => {
  const lim = chamar('limitesCaracteristica', 'edu');
  if(lim.min !== 40 || lim.max !== 90) throw new Error(JSON.stringify(lim));
});
teste('3d6 × 5 vai de 15 a 90', () => {
  const lim = chamar('limitesCaracteristica', 'for');
  if(lim.min !== 15 || lim.max !== 90) throw new Error(JSON.stringify(lim));
});
teste('Sorte 3d6 × 5 com rng mínimo dá 15', () => {
  if(val('rolarFormulaDados("3d6", () => 0) * 5') !== 15) throw new Error("sorte");
});
fim();
