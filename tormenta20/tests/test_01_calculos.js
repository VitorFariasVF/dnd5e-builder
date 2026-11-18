/* Fórmulas de PV, PM, Defesa, perícias e compra de atributos contra personagens conferidos à mão.
   Cada conta está escrita ao lado para ser refeita sem o app. */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Cálculos Tormenta20");
const ctx = carregar(SCRIPTS);

/* Personagem A: Guerreiro nível 1, Humano.
   Compra: FOR 3 (custo 4) + CON 2 (custo 2) + DES 1 (custo 1) = 7 pontos.
   PV = 20 + 5×0 + CON 2×1 = 22. PM = 3×1 = 3. Defesa = 10 + DES 1 + armadura 5 + escudo 2 = 18.
   Treino no nível 1 = 0. Luta (FOR 3, treinada, +2 de treinamento do 1º ao 6º nível, p120) = 5.
   Fortitude (CON 2, treinada) = 4. Percepção (SAB 0, treinada pela origem) = 2.
   Revisão 2026-11-17 (livro, p120): perícia treinada soma +2 de treinamento; antes o teste esperava 3, 2 e 0. */
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
t.igual("A: Luta treinada = 3 + 0 + 2 = 5 (p120)", d.pericias.find(x => x.nome === "Luta").bonus, 5);
t.igual("A: Fortitude treinada = 2 + 0 + 2 = 4 (p120)", d.pericias.find(x => x.nome === "Fortitude").bonus, 4);
t.igual("A: Percepção (origem) treinada = 0 + 0 + 2 = 2 (p120)", d.pericias.find(x => x.nome === "Percepção").bonus, 2);
/* Humano: sem deslocamento próprio, vale o padrão de 9 m (p112 do livro do usuário). */
t.igual("A: deslocamento Humano = 9 (padrão, p112)", d.deslocamento, 9);

/* Personagem B: Clérigo nível 3, Anão.
   Compra: SAB 3 (custo 4) + INT 2 (custo 2) + DES 2 (custo 2) + CON 1 (custo 1) = 9 pontos.
   PV = 16 + 4×(3−1) + CON 3×3 = 16 + 8 + 9 = 33 (Anão: CON +2, p024). PM = 5×3 + SAB 4 = 19 (Anão: SAB +1).
   Treino = ⌊3/2⌋ = 1. Religião (SAB final, treinada) = SAB + 1 + 2 (treinamento do 1º ao 6º, p120). Defesa = 10 + DES 1 = 11 (Anão: DES −1).
   Perícias livres: as da Tabela 1-3 do Clérigo (2, só no 1º nível, p038) + INT 2 = 4 livres (revisão: antes 8, por nível × 3). */
montarPersonagem(ctx, {
  nome: "Teste B", nivel: 3, raca: "anao", classe: "clerigo", origem: "Acólito", atributoMagia: "sabedoria",
  atributosBase: { forca: 0, destreza: 2, constituicao: 1, inteligencia: 2, sabedoria: 3, carisma: 0 },
  origemBeneficios: [{ tipo: "pericia", valor: "Cura" }, { tipo: "pericia", valor: "Intuição" }],
  grupoFixoEscolha: "", periciasEscolhidas: []
});
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("B: custo de compra = 9", ctx.t20PontosGastos({ forca: 0, destreza: 2, constituicao: 1, inteligencia: 2, sabedoria: 3, carisma: 0 }), 9);
t.igual("B: PV no nível 3 = 33 (CON 3 com ajuste do Anão)", d.pv, 33);
t.igual("B: PM no nível 3 = 19 (SAB 4 com ajuste do Anão)", d.pm, 19);
t.igual("B: bônus de treino nível 3 = +1", d.bonusTreino, 1);
t.igual("B: Religião treinada = SAB final + 1 + 2", d.pericias.find(x => x.nome === "Religião").bonus, d.atributos.sabedoria + 1 + 2);
t.igual("B: Defesa = 11 (DES 1 com ajuste do Anão)", d.defesa, 11);
t.igual("B: perícias livres = 2 (Tabela 1-3) + INT 2 = 4", ctx.t20PericiasDisponiveis(ctx.state.personagem, d.atributos).livres, 4);
t.igual("B: círculo máximo nível 3 = 1º", d.circuloMaximo, 1);

/* Personagem C: Druida nível 5, Minotauro (FOR +2, CON +1, SAB −1).
   Compra: SAB 2 (2) + CON 2 (2) + DES 2 (2) + FOR 1 (1) + INT 2 (2) + CAR 1 (1) = 10 pontos.
   Final: FOR 3, CON 3, SAB 1, DES 2, INT 2, CAR 1.
   PV = 16 + 4×4 + 3×5 = 47. PM = 4×5 + SAB 1 = 21. Treino = ⌊5/2⌋ = 2.
   Sobrevivência (SAB 1, treinada) = 1 + metade 2 + treinamento 2 = 5 (p120). Círculo máximo no nível 5 = 1º. Defesa = 10 + DES 2 = 12. */
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
t.igual("C: Sobrevivência treinada = 1 + 2 + 2 = 5 (p120)", d.pericias.find(x => x.nome === "Sobrevivência").bonus, 5);
t.igual("C: Defesa = 12", d.defesa, 12);
t.igual("C: deslocamento Minotauro = 9 (padrão, p112)", d.deslocamento, 9);
t.igual("C: círculo máximo nível 5 = 1º", d.circuloMaximo, 1);

/* Casos de borda */
t.igual("compra: valor fora da tabela (5) = null", ctx.t20PontosGastos({ forca: 5, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }), null);
t.igual("compra: 4 em todos = 42", ctx.t20PontosGastos({ forca: 4, destreza: 4, constituicao: 4, inteligencia: 4, sabedoria: 4, carisma: 4 }), 42);
t.igual("compra: −1 devolve 1 ponto (−1 + 4 = 6)", ctx.t20PontosGastos({ forca: -1, destreza: 4, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 }), 6);
/* Círculos por classe (livro): Bardo 2º no 6º e 3º no 10º (p050). Clérigo 2º no 5º e 3º no 9º (p063). */
t.igual("círculo: Bardo nível 6 libera 2º", ctx.t20CirculoMaximo(6, "bardo"), 2);
t.igual("círculo: Bardo nível 10 libera 3º", ctx.t20CirculoMaximo(10, "bardo"), 3);
t.igual("círculo: Clérigo nível 5 libera 2º (p063)", ctx.t20CirculoMaximo(5, "clerigo"), 2);
t.igual("magias do 1º nível do Clérigo = 3", ctx.t20MagiasConhecidasLimite("clerigo", 1), 3);
t.igual("magias do Clérigo no 2º nível = 4 (3 + 1 por nível, p063)", ctx.t20MagiasConhecidasLimite("clerigo", 2), 4);
/* PV do Bardo: 12 + CON no 1º nível (p050). Antes o app não calculava (fontes divergiam). */
t.igual("PV do Bardo nível 1 com CON 2 = 14 (p050)", ctx.t20PVTotal("bardo", 1, 2), 14);
t.igual("PV do Guerreiro nível 2 com CON 0 = 25", ctx.t20PVTotal("guerreiro", 2, 0), 25);
t.igual("Defesa sem armadura nem escudo, DES 0 = 10", ctx.t20Defesa(0, {}), 10);

t.fim();
