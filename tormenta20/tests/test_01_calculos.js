/* Fórmulas de PV, PM, Defesa, perícias e compra de atributos contra personagens conferidos à mão.
   Cada conta está escrita ao lado para ser refeita sem o app. */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Cálculos Tormenta20");
const ctx = carregar(SCRIPTS);

/* Personagem A: Guerreiro nível 1, Humano.
   Compra: FOR 3 (custo 4) + CON 2 (custo 2) + DES 1 (custo 1) = 7 pontos.
   PV = 20 + 5×0 + CON 2×1 = 22. PM = 3×1 = 3. Defesa = 10 + DES 1 + armadura 5 + escudo 2 = 18.
   Treino no nível 1 = 0. Luta (FOR 3, treinada) = 3. Fortitude (CON 2, treinada) = 2. Percepção (SAB 0, não treinada) = 0. */
montarPersonagem(ctx, {
  nome: "Teste A", nivel: 1, raca: "humano", classe: "guerreiro", origem: "Soldado",
  atributosBase: { forca: 3, destreza: 1, constituicao: 2, inteligencia: 0, sabedoria: 0, carisma: 0 },
  grupoFixoEscolha: "Luta", periciasEscolhidas: ["Atletismo", "Cavalgar"],
  origemBeneficios: [{ tipo: "pericia", valor: "Percepção" }, { tipo: "poder", valor: "Ataque Poderoso" }],
  defesa: { armadura: 5, escudo: 2, outros: 0, nomeArmadura: "", nomeEscudo: "" }
});
let d = ctx.t20Derivados(ctx.state.personagem);
t.igual("A: custo de compra = 7", ctx.t20PontosGastos({ forca: 3, destreza: 1, constituicao: 2, inteligencia: 0, sabedoria: 0, carisma: 0 }), 7);
t.igual("A: PV = 22", d.pv, 22);
t.igual("A: PM = 3", d.pm, 3);
t.igual("A: Defesa = 18", d.defesa, 18);
t.igual("A: bônus de treino = 0", d.bonusTreino, 0);
t.igual("A: Luta treinada = 3", d.pericias.find(x => x.nome === "Luta").bonus, 3);
t.igual("A: Fortitude treinada = 2", d.pericias.find(x => x.nome === "Fortitude").bonus, 2);
t.igual("A: Percepção (origem) treinada = 0", d.pericias.find(x => x.nome === "Percepção").bonus, 0);
t.igual("A: deslocamento Humano = 9 m", d.deslocamento, 9);

/* Personagem B: Clérigo nível 3, Anão.
   Compra: SAB 3 (custo 4) + INT 2 (custo 2) + DES 2 (custo 2) + CON 1 (custo 1) = 9 pontos.
   PV = 16 + 4×(3−1) + CON 1×3 = 16 + 8 + 3 = 27. PM = 5×3 + SAB 3 = 18.
   Treino = ⌊3/2⌋ = 1. Religião (SAB 3, treinada) = 3 + 1 = 4. Defesa = 10 + DES 2 = 12.
   INT 2 dá 2 perícias livres extras: 2 por nível × 3 + INT 2 = 8 livres. */
montarPersonagem(ctx, {
  nome: "Teste B", nivel: 3, raca: "anao", classe: "clerigo", origem: "Acólito", atributoMagia: "sabedoria",
  atributosBase: { forca: 0, destreza: 2, constituicao: 1, inteligencia: 2, sabedoria: 3, carisma: 0 },
  origemBeneficios: [{ tipo: "pericia", valor: "Cura" }, { tipo: "pericia", valor: "Intuição" }],
  grupoFixoEscolha: "", periciasEscolhidas: []
});
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("B: custo de compra = 9", ctx.t20PontosGastos({ forca: 0, destreza: 2, constituicao: 1, inteligencia: 2, sabedoria: 3, carisma: 0 }), 9);
t.igual("B: PV no nível 3 = 27", d.pv, 27);
t.igual("B: PM no nível 3 = 18", d.pm, 18);
t.igual("B: bônus de treino nível 3 = +1", d.bonusTreino, 1);
t.igual("B: Religião treinada = 4", d.pericias.find(x => x.nome === "Religião").bonus, 4);
t.igual("B: Defesa = 12", d.defesa, 12);
t.igual("B: perícias livres = 8", ctx.t20PericiasDisponiveis(ctx.state.personagem, d.atributos).livres, 8);
t.igual("B: círculo máximo nível 3 = 1º", d.circuloMaximo, 1);

/* Personagem C: Druida nível 5, Minotauro (FOR +2, CON +1, SAB −1).
   Compra: SAB 2 (2) + CON 2 (2) + DES 2 (2) + FOR 1 (1) + INT 2 (2) + CAR 1 (1) = 10 pontos.
   Final: FOR 3, CON 3, SAB 1, DES 2, INT 2, CAR 1.
   PV = 16 + 4×4 + 3×5 = 47. PM = 4×5 + SAB 1 = 21. Treino = ⌊5/2⌋ = 2.
   Sobrevivência (SAB 1, treinada) = 1 + 2 = 3. Círculo máximo no nível 5 = 1º. Defesa = 10 + DES 2 = 12. */
montarPersonagem(ctx, {
  nome: "Teste C", nivel: 5, raca: "minotauro", classe: "druida", origem: "Mateiro",
  atributosBase: { forca: 1, destreza: 2, constituicao: 2, inteligencia: 2, sabedoria: 2, carisma: 1 },
  origemBeneficios: [{ tipo: "pericia", valor: "Sobrevivência" }, { tipo: "pericia", valor: "Percepção" }],
  periciasEscolhidas: ["Cura", "Atletismo"], magias: [{ nome: "Curar Ferimentos", circulo: 1 }, { nome: "Pele de Pedra", circulo: 1 }]
});
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("C: custo de compra = 10", ctx.t20PontosGastos({ forca: 1, destreza: 2, constituicao: 2, inteligencia: 2, sabedoria: 2, carisma: 1 }), 10);
t.igual("C: atributos finais (FOR 3, CON 3, SAB 1)", [d.atributos.forca, d.atributos.constituicao, d.atributos.sabedoria], [3, 3, 1]);
t.igual("C: PV no nível 5 = 47", d.pv, 47);
t.igual("C: PM no nível 5 = 21", d.pm, 21);
t.igual("C: treino nível 5 = +2", d.bonusTreino, 2);
t.igual("C: Sobrevivência treinada = 3", d.pericias.find(x => x.nome === "Sobrevivência").bonus, 3);
t.igual("C: Defesa = 12", d.defesa, 12);
t.igual("C: deslocamento Minotauro = 9 m", d.deslocamento, 9);
t.igual("C: círculo máximo nível 5 = 1º", d.circuloMaximo, 1);

/* Casos de borda */
t.igual("compra: valor fora da tabela (5) = null", ctx.t20PontosGastos({ forca: 5, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }), null);
t.igual("compra: 4 em todos = 42", ctx.t20PontosGastos({ forca: 4, destreza: 4, constituicao: 4, inteligencia: 4, sabedoria: 4, carisma: 4 }), 42);
t.igual("compra: −1 devolve 1 ponto (−1 + 4 = 6)", ctx.t20PontosGastos({ forca: -1, destreza: 4, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }), 6);
t.igual("círculo: nível 6 libera 2º", ctx.t20CirculoMaximo(6), 2);
t.igual("círculo: nível 10 libera 3º", ctx.t20CirculoMaximo(10), 3);
t.igual("magias do 1º nível do Clérigo = 3", ctx.t20MagiasConhecidasLimite("clerigo", 1), 3);
t.igual("magias acima do 1º nível = null (NÃO VERIFICADO)", ctx.t20MagiasConhecidasLimite("clerigo", 2), null);
t.igual("PV do Bardo não calculado (fontes divergem)", ctx.t20PVTotal("bardo", 1, 2), null);
t.igual("PV do Guerreiro nível 2 com CON 0 = 25", ctx.t20PVTotal("guerreiro", 2, 0), 25);
t.igual("Defesa sem armadura nem escudo, DES 0 = 10", ctx.t20Defesa(0, {}), 10);

t.fim();
