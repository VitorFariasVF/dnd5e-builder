'use strict';
/* Pontos de perícia por ocupação e de interesse pessoal, e perícias de ocupação.
   Conta feita à mão, com EDU 70, DES 50, APA 60, FOR 40, INT 65 (sem ajuste de idade):
   Professor, Arqueólogo, Autor, Jornalista e Enfermeiro: EDU × 4 = 280.
   Ladrão: EDU × 2 + DES × 2 = 140 + 100 = 240.
   Diletante: EDU × 2 + APA × 2 = 140 + 120 = 260.
   Explorador: EDU × 2 + (APA × 2 = 260 | DES × 2 = 240 | FOR × 2 = 220).
   Detetive particular e Soldado: EDU × 2 + (DES × 2 = 240 | FOR × 2 = 220).
   Interesse pessoal: INT × 2 = 130 (confirmado em 2 fontes: Roll20 Step Five e TRG). */
const { criarAmbiente, estadoExemplo, criarRunner } = require('./ambiente');
const { ctx, val, chamar } = criarAmbiente();
const { teste, fim } = criarRunner('test_pericias.js');

const car = { for: 40, con: 60, tam: 60, des: 50, apa: 60, int: 65, pod: 55, edu: 70 };
const inv = (ocupacaoId, extra) => Object.assign({ nome: "x", idade: null, caracteristicas: car, escolhasIdade: [], melhoriasEdu: [], sorte: null,
  pontosOcupacao: {}, pontosInteresse: {}, ocupacaoId, ocupacaoAlt: null, escolhasGrupo: [], livresOcupacao: [], especializacoes: {} }, extra || {});

const pool = (id, alt) => chamar('poolOcupacao', inv(id, { ocupacaoAlt: alt === undefined ? null : alt }), chamar('caracteristicasFinais', inv(id)));

teste('Professor, Arqueólogo, Autor, Jornalista e Enfermeiro: EDU × 4 = 280', () => {
  ["professor", "arqueologo", "autor", "jornalista", "enfermeiro"].forEach(id => {
    if(pool(id) !== 280) throw new Error(id + " " + pool(id));
  });
});
teste('Ladrão: EDU × 2 + DES × 2 = 240', () => {
  if(pool("ladrao") !== 240) throw new Error(String(pool("ladrao")));
});
teste('Diletante: EDU × 2 + APA × 2 = 260', () => {
  if(pool("diletante") !== 260) throw new Error(String(pool("diletante")));
});
teste('Explorador: alternativas APA 260, DES 240, FOR 220', () => {
  if(pool("explorador", 0) !== 260 || pool("explorador", 1) !== 240 || pool("explorador", 2) !== 220)
    throw new Error(`${pool("explorador", 0)}, ${pool("explorador", 1)}, ${pool("explorador", 2)}`);
});
teste('Detetive e Soldado: DES 240 ou FOR 220', () => {
  ["detetive", "soldado"].forEach(id => {
    if(pool(id, 0) !== 240 || pool(id, 1) !== 220) throw new Error(id);
  });
});
teste('Sem alternativa escolhida, Explorador só soma a base (EDU × 2 = 140)', () => {
  if(pool("explorador", null) !== 140) throw new Error(String(pool("explorador", null)));
});
teste('Interesse pessoal: INT × 2 = 130', () => {
  const c = chamar('caracteristicasFinais', inv("professor"));
  if(chamar('poolInteresse', c) !== 130) throw new Error(String(chamar('poolInteresse', c)));
});
teste('Interesse pessoal: a fórmula não aparece mais como NÃO VERIFICADO (2 fontes)', () => {
  if(String(val('COC_INTERESSE.fonte')).includes("NÃO VERIFICADO")) throw new Error(val('COC_INTERESSE.fonte'));
});
teste('Bases de perícia: as de 1 fonte só (Arte, Arqueologia, Psicanálise, Idioma outro) têm nv, as demais não', () => {
  const nv = val('COC_PERICIAS.filter(p => p.nv).map(p => p.id)');
  const esperado = ["arqueologia", "arte", "idioma_outro", "psicanalise"];
  if(JSON.stringify([...nv].sort()) !== JSON.stringify(esperado)) throw new Error(JSON.stringify(nv));
});
teste('Jornalista: fórmula EDU × 4 com crédito 9 a 30 (confirmado em 2 fontes)', () => {
  const o = val('cocOcupacao("jornalista")');
  if(JSON.stringify(o.formula.base) !== JSON.stringify([{ c: "edu", m: 4 }]) || o.credito[0] !== 9 || o.credito[1] !== 30) throw new Error(JSON.stringify(o));
});

/* Faixas de crédito conferidas com a tabela de ocupações (Roll20 Compendium, regras de 7ª ed.). */
const faixas = { arqueologo: [10, 40], autor: [9, 30], ladrao: [5, 40], diletante: [50, 99], explorador: [55, 80],
  jornalista: [9, 30], enfermeiro: [9, 30], detetive: [9, 30], professor: [20, 70], soldado: [9, 30] };
teste('Faixas de crédito das dez ocupações', () => {
  Object.entries(faixas).forEach(([id, f]) => {
    const o = val(`cocOcupacao("${id}")`);
    if(!o || o.credito[0] !== f[0] || o.credito[1] !== f[1]) throw new Error(id + " " + JSON.stringify(o && o.credito));
  });
});
teste('São dez ocupações', () => {
  if(val('COC_OCUPACOES.length') !== 10) throw new Error(String(val('COC_OCUPACOES.length')));
});

/* Perícias de ocupação: a lista é fixa + escolhas de grupo + livres + crédito. */
teste('Explorador: lista = crédito + 6 fixas + escolha de grupo + livres', () => {
  const i = inv("explorador", { escolhasGrupo: [["nadar"], ["arma_rifle"]] });
  const ids = chamar('periciasDeOcupacao', i);
  ["credito", "historia", "saltar", "natureza", "navegacao", "idioma_outro", "sobrevivencia", "nadar", "arma_rifle"].forEach(id => {
    if(!ids.includes(id)) throw new Error("falta " + id);
  });
  if(ids.length !== 9) throw new Error("tamanho " + ids.length);
});
teste('Soldado: fixas + dois de três em grupo (n = 2)', () => {
  const grupos = [["arma_pistola"], ["escalar"], ["primeiros", "mecanico"]];
  const ids = chamar('periciasDeOcupacao', inv("soldado", { escolhasGrupo: grupos }));
  ["briga", "esquivar", "furtividade", "sobrevivencia", "arma_pistola", "escalar", "primeiros", "mecanico"].forEach(id => {
    if(!ids.includes(id)) throw new Error("falta " + id);
  });
});
teste('Número de grupos e livres por ocupação confere com a tabela', () => {
  const esperado = { arqueologo: [1, 0], autor: [1, 1], ladrao: [1, 0], diletante: [2, 3], explorador: [2, 0],
    jornalista: [1, 2], enfermeiro: [1, 0], detetive: [1, 1], professor: [0, 4], soldado: [3, 0] };
  Object.entries(esperado).forEach(([id, [g, l]]) => {
    const o = val(`cocOcupacao("${id}")`);
    if(o.grupos.length !== g || o.livres !== l) throw new Error(`${id}: grupos ${o.grupos.length}, livres ${o.livres}`);
  });
});

/* Totais com o exemplo: Professor com pontos distribuídos. */
teste('Exemplo: totais de perícia (Biblioteca 80, Psicologia 50, Crédito 45, Idioma próprio = EDU 65)', () => {
  const e = estadoExemplo().investigador;
  const lista = chamar('calcPericias', e);
  const t = id => lista.find(p => p.id === id).total;
  if(t("biblioteca") !== 80 || t("psicologia") !== 50 || t("credito") !== 45 || t("idioma_proprio") !== 65 || t("esquivar") !== 27 + 40)
    throw new Error(`bib ${t("biblioteca")} psi ${t("psicologia")} cred ${t("credito")} idp ${t("idioma_proprio")} esq ${t("esquivar")}`);
});
teste('Resumo: pools e gastos do exemplo batem (260 de 260, 150 de 150)', () => {
  const r = chamar('resumoCriacao', estadoExemplo().investigador);
  if(r.poolOcupacao !== 260 || r.gastoOcupacao !== 260 || r.poolInteresse !== 150 || r.gastoInteresse !== 150)
    throw new Error(JSON.stringify(r));
});
fim();
