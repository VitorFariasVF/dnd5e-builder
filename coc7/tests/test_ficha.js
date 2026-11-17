'use strict';
/* Ficha de combate: armas básicas e perícias de combate. Cada linha de dano, alcance e tiros tem a mesma informação
   em duas fontes (Chaosium, wiki Equipment; Roll20 Compendium, Ammunition & Weapons), conferida em 2026-11-17.
   Conta à mão com o estadoExemplo (docs no ambiente.js): Briga base 25 + 40 de interesse = 65; Esquivar DES 55 / 2 = 27 + 40 = 67;
   Armas de Fogo (Pistola) base 20; Armas de Fogo (Rifle/Espingarda) base 25. FOR 60 + TAM 70 = 130: DB +1D4. */
const { criarAmbiente, estadoExemplo, criarRunner } = require('./ambiente');
const { chamar, val } = criarAmbiente();
const { teste, fim } = criarRunner('test_ficha.js');

const armaPor = (id) => val(`COC_ARMAS.find(a => a.id === "${id}")`);

teste('Toda arma da ficha tem fonte citando Chaosium e Roll20', () => {
  val('COC_ARMAS').forEach(a => {
    if(!a.fonte || !a.fonte.includes("Chaosium") || !a.fonte.includes("Roll20")) throw new Error(a.id + ": " + a.fonte);
  });
});
teste('Revólver e automática .32: dano 1D8, alcance 15 jardas, 6 e 8 tiros, sem DB', () => {
  const r = armaPor("revolver_32"), a = armaPor("automatica_32");
  if(r.dano !== "1D8" || r.alcance !== "15 jardas" || r.tiros !== 6 || r.db) throw new Error(JSON.stringify(r));
  if(a.dano !== "1D8" || a.alcance !== "15 jardas" || a.tiros !== 8 || a.db) throw new Error(JSON.stringify(a));
});
teste('Facas: pequena 1D4+DB, média 1D4+2+DB, grande 1D8+DB; todas de Briga e a toque', () => {
  const esp = { faca_pequena: "1D4", faca_media: "1D4+2", faca_grande: "1D8" };
  Object.entries(esp).forEach(([id, dano]) => {
    const a = armaPor(id);
    if(a.dano !== dano || !a.db || a.pericia !== "briga" || a.alcance !== "Toque") throw new Error(id + " " + JSON.stringify(a));
  });
});
teste('Espingarda calibre 12: 4D6/2D6/1D6 a 10, 20 e 50 jardas, sem tiros fixos (fontes divergem)', () => {
  const e = armaPor("espingarda_12");
  if(e.dano !== "4D6/2D6/1D6" || e.alcance !== "10 / 20 / 50 jardas" || e.tiros !== null || e.pericia !== "arma_rifle") throw new Error(JSON.stringify(e));
});

teste('Exemplo: Briga 65, Esquivar 67, Pistola 20, Rifle/Espingarda 25 (base mais interesse)', () => {
  const f = chamar('cocFichaCombate', estadoExemplo().investigador);
  const t = id => f.combate.find(c => c.id === id).total;
  if(t("briga") !== 65 || t("esquivar") !== 67 || t("arma_pistola") !== 20 || t("arma_rifle") !== 25)
    throw new Error(JSON.stringify(f.combate));
});
teste('Exemplo: DB +1D4 e faca média com valor de Briga 65', () => {
  const f = chamar('cocFichaCombate', estadoExemplo().investigador);
  if(!f.dbConhecido || f.db !== "+1D4") throw new Error(JSON.stringify(f));
  const faca = f.armas.find(a => a.id === "faca_media");
  if(faca.valorPericia !== 65 || faca.pericia !== "Briga" || !faca.usaDb) throw new Error(JSON.stringify(faca));
});
teste('FOR + TAM acima de 204: a ficha marca o DB como não calculado', () => {
  const e = estadoExemplo().investigador;
  e.caracteristicas.for = 90; e.caracteristicas.tam = 120;
  const f = chamar('cocFichaCombate', e);
  if(f.dbConhecido || f.db !== null) throw new Error(JSON.stringify(f));
});
fim();
