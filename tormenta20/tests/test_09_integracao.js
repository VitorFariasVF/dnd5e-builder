/* Integração: níveis 6 a 20 na ficha, digitação à mão, catálogo de poderes e magias, raças completas,
   backup (esquema 2 e leitura do esquema 1) e PDF de nível alto.
   Casos conferidos à mão usam só dados com DUAS fontes (Ladino: PV, PM, Ataque Furtivo; Bardo: PM, círculos).
   Os demais testam a lógica (pré-requisitos, precedência, selos) com os dados como estão e não afirmam valores de 1 fonte. */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Integração Tormenta20: níveis 6 a 20, catálogos, backup e PDF");
const ctx = carregar(SCRIPTS);

const ZERO = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 };
const comAtr = (v) => Object.assign({}, ZERO, v);
const erros = (etapa, modo, p) => ctx.t20ValidarEtapa(etapa, p, modo).erros;
const avisos = (etapa, modo, p) => ctx.t20ValidarEtapa(etapa, p, modo).avisos;

/* ---- 1. Níveis 6 a 20: conferidos à mão com dados de duas fontes ---- */
/* Ladino nível 20, CON 1: PV = 12 (inicial) + 1×20 (CON) + 3 por nível de 2 a 20 (19 níveis × 3 = 57) = 89. */
montarPersonagem(ctx, { nome: "L20", nivel: 20, raca: "humano", classe: "ladino", atributosBase: comAtr({ constituicao: 1 }) });
let d = ctx.t20Derivados(ctx.state.personagem);
t.igual("Ladino nível 20, CON 1: PV = 12 + 20 + 57 = 89", d.pv, 89);
t.igual("Ladino nível 20: PM = 4 × 20 = 80", d.pm, 80);
t.igual("Ladino nível 20: bônus de treino = 10", d.bonusTreino, 10);
t.igual("Ladino nível 20: PV e PM com selo de 2 fontes", [d.pvVerificado, d.pmVerificado], [true, true]);
t.igual("Ladino nível 20: sem círculo (não conjurador)", d.circuloMaximo, 0);

/* Ladino nível 10, CON 0: PV = 12 + 3 × 9 (níveis 2 a 10) = 39; PM = 4 × 10 = 40. */
montarPersonagem(ctx, { nome: "L10", nivel: 10, raca: "humano", classe: "ladino", atributosBase: ZERO });
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("Ladino nível 10, CON 0: PV = 39", d.pv, 39);
t.igual("Ladino nível 10: PM = 40", d.pm, 40);
t.igual("Ladino nível 10: Ataque Furtivo não aparece no 10º (só nos ímpares)", d.niveis.find(l => l.nivel === 10).habilidades.some(h => h.nome === "Ataque Furtivo"), false);
t.igual("Ladino nível 10: habilidades do 6º ao 10º (Oportunismo não é habilidade; Olhos nas Costas e Evasão são)", d.habilidades.map(h => h.nome).filter(n => n !== "Ataque Furtivo"), ["Olhos nas Costas", "Evasão Aprimorada"]);

/* Ladino nível 9 e 15: Ataque Furtivo 5d6 e 8d6 (duas fontes). */
montarPersonagem(ctx, { nome: "L9", nivel: 9, raca: "humano", classe: "ladino", atributosBase: ZERO });
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("Ladino nível 9: Ataque Furtivo 5d6", d.habilidades.find(h => h.nivel === 9 && h.nome === "Ataque Furtivo").frase, "5d6 de dano extra.");
montarPersonagem(ctx, { nome: "L15", nivel: 15, raca: "humano", classe: "ladino", atributosBase: ZERO });
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("Ladino nível 15: Ataque Furtivo 8d6", d.habilidades.find(h => h.nivel === 15 && h.nome === "Ataque Furtivo").frase, "8d6 de dano extra.");

/* Bardo (p050): PM +4 por nível; círculos 2º, 3º e 4º em 6, 10 e 14 (p050); PV 12 + CON e 3 + CON por nível (p050).
   Revisão 2026-11-17: o PV agora é calculado (antes era null, por conflito com a fonte [E]). */
montarPersonagem(ctx, { nome: "B20", nivel: 20, raca: "humano", classe: "bardo", atributosBase: ZERO });
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("Bardo nível 20, CAR 0: PM = 4 × 20 = 80", d.pm, 80);
t.igual("Bardo nível 20, CON 0: PV = 12 + 3 × 19 = 69 (p050)", d.pv, 69);
t.igual("Bardo nível 20: círculo máximo 4º (livro, p050)", [d.circuloMaximo, d.circuloVerificado], [4, true]);
const circulos = [5, 6, 10, 13, 14].map(n => { montarPersonagem(ctx, { nome: "B", nivel: n, raca: "humano", classe: "bardo", atributosBase: ZERO }); return ctx.t20Derivados(ctx.state.personagem).circuloMaximo; });
t.igual("Bardo: círculo máximo nos níveis 5, 6, 10, 13 e 14", circulos, [1, 2, 3, 3, 4]);
t.igual("Bardo nível 5: círculo 1º confirmado no livro (p050)", (() => { montarPersonagem(ctx, { nome: "B", nivel: 5, raca: "humano", classe: "bardo", atributosBase: ZERO }); return ctx.t20Derivados(ctx.state.personagem).circuloVerificado; })(), true);

/* Arcanista (p043): 2º no 5º, 3º no 9º, 4º no 13º, 5º no 17º. Antes: sem valor acima do 5º (conflito). */
montarPersonagem(ctx, { nome: "Arc14", nivel: 14, raca: "humano", classe: "arcanista", atributoMagia: "inteligencia", atributosBase: ZERO });
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("Arcanista nível 14: círculo 4º confirmado no livro (p043)", [d.circuloMaximo, d.circuloVerificado], [4, true]);
t.igual("Arcanista nível 14: magia de 4º círculo não bloqueia nem avisa (círculo confirmado)", (() => {
  montarPersonagem(ctx, { nome: "Arc14", nivel: 14, raca: "humano", classe: "arcanista", atributoMagia: "inteligencia", atributosBase: ZERO,
    magias: [{ nome: "Campo Antimagia", circulo: 4 }] });
  const p = ctx.state.personagem;
  return [erros(9, "estrito", p).some(e => /acima do disponível/.test(e.msg)), avisos(9, "estrito", p).some(a => /círculo máximo/i.test(a.msg))];
})(), [false, false]);
montarPersonagem(ctx, { nome: "Dru14", nivel: 14, raca: "humano", classe: "druida", atributosBase: ZERO });
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("Druida nível 14: círculo 4º da linha, confirmado no livro (p067)", [d.circuloMaximo, d.circuloVerificado], [4, true]);
montarPersonagem(ctx, { nome: "Bar14", nivel: 14, raca: "humano", classe: "bardo", atributosBase: ZERO });
t.igual("Bardo nível 14: círculo 4º com 2 fontes", [ctx.t20Derivados(ctx.state.personagem).circuloMaximo, ctx.t20Derivados(ctx.state.personagem).circuloVerificado], [4, true]);

/* PV que a fonte não traz: o jogador digita; em branco volta a ser calculado. */
montarPersonagem(ctx, { nome: "B20m", nivel: 20, raca: "humano", classe: "bardo", atributosBase: ZERO, pvManual: 150 });
d = ctx.t20Derivados(ctx.state.personagem);
t.igual("PV digitado à mão substitui o PV não calculado", [d.pv, d.pvOrigem], [150, "manual"]);
t.igual("PV digitado à mão: avisos de etapa 11 não pedem PV", avisos(11, "estrito", ctx.state.personagem).some(a => /PV de Bardo/.test(a.msg)), false);
montarPersonagem(ctx, { nome: "B20v", nivel: 20, raca: "humano", classe: "bardo", atributosBase: ZERO, pvManual: null });
/* Revisão 2026-11-17: PV do Bardo é calculado pelo livro; em branco volta ao cálculo (69) e a etapa 11 não pede PV. */
t.igual("PV em branco: volta ao cálculo do livro (69) e a etapa 11 não pede o valor", [ctx.t20Derivados(ctx.state.personagem).pv, avisos(11, "estrito", ctx.state.personagem).some(a => /PV de Bardo/.test(a.msg))], [69, false]);

/* Valores digitados à mão: inteiros dentro da faixa; zero de PV é recusado no estrito. */
montarPersonagem(ctx, { nome: "Dig", nivel: 20, raca: "humano", classe: "bardo", atributosBase: ZERO, pvManual: 0 });
t.igual("PV à mão = 0 é recusado no estrito e vira aviso no livre", [erros(11, "estrito", ctx.state.personagem).some(e => e.campo === "pv-manual"), erros(11, "livre", ctx.state.personagem).length], [true, 0]);
montarPersonagem(ctx, { nome: "Dig", nivel: 20, raca: "humano", classe: "bardo", atributosBase: ZERO, pvManual: 120, pmManual: 0, treinoManual: 8 });
t.igual("PV 120, PM 0 e treino 8 à mão: aceitos no estrito", erros(11, "estrito", ctx.state.personagem).length, 0);

/* Treino digitado à mão vale nas perícias treinadas. */
montarPersonagem(ctx, { nome: "Tm", nivel: 3, raca: "humano", classe: "ladino", atributosBase: ZERO, treinoManual: 7, periciasEscolhidas: ["Atuação"] });
d = ctx.t20Derivados(ctx.state.personagem);
/* Revisão 2026-11-17: o treino à mão substitui a metade do nível; a treinada soma também +2 de treinamento (p120). */
t.igual("treino à mão = 7 e perícia treinada usa 7 + 2 de treinamento (p120)", [d.bonusTreino, d.treinoOrigem, d.pericias.find(x => x.nome === "Atuação").bonus], [7, "manual", 9]);

/* Habilidades: Guerreiro nível 20 tem Ataque Extra (6º) e Campeão (20º) com efeito do livro (p072). Antes: sem efeito lido. */
montarPersonagem(ctx, { nome: "G20", nivel: 20, raca: "humano", classe: "guerreiro", atributosBase: ZERO });
t.igual("Guerreiro nível 20: nenhuma habilidade sem efeito lido (livro, p072)", ctx.t20Derivados(ctx.state.personagem).habilidadesSemEfeito, 0);

/* ---- 2. Raças completas: só o que a fonte informou ---- */
const R = ctx.T20_RACAS_COMPLETAS;
t.igual("17 raças na lista única (18 entradas: Suraggel tem aggelus e sulfure)", Object.keys(R).length, 18);
montarPersonagem(ctx, { nome: "Min", nivel: 1, raca: "minotauro", classe: "guerreiro", atributosBase: comAtr({ forca: 1 }) });
t.igual("Minotauro: FOR 1 + 2 (ajuste informado) = 3", ctx.t20AtributosFinais(ctx.state.personagem).forca, 3);
t.igual("Minotauro: deslocamento padrão = 9 (p112)", ctx.t20Derivados(ctx.state.personagem).deslocamento, 9);
montarPersonagem(ctx, { nome: "Ane", nivel: 1, raca: "anao", classe: "guerreiro", atributosBase: ZERO });
t.igual("Anão: deslocamento 6 m do livro (p026)", [ctx.t20Derivados(ctx.state.personagem).deslocamento, /p026/.test(R.anao.fonte)], [6, true]);
montarPersonagem(ctx, { nome: "Sir", nivel: 1, raca: "silfide", classe: "guerreiro", atributosBase: ZERO });
t.igual("Sílfide: 9 m e Força –2 do livro aplicada", [ctx.t20Derivados(ctx.state.personagem).deslocamento, ctx.t20AtributosFinais(ctx.state.personagem).forca], [9, -2]);
montarPersonagem(ctx, { nome: "Ser", nivel: 1, raca: "sereia_triton", classe: "guerreiro", atributosBase: ZERO });
t.igual("Sereia/Tritão: deslocamento 9 m e 3 habilidades do livro; ajuste à escolha no passo Atributos", [ctx.t20Derivados(ctx.state.personagem).deslocamento, ctx.t20RacaInfo("sereia_triton").habilidades.length], [9, 3]);
montarPersonagem(ctx, { nome: "Hum", nivel: 1, raca: "humano", classe: "guerreiro", atributosBase: ZERO });
t.igual("Humano: 2 perícias extras (Versátil) e deslocamento padrão 9 m", [ctx.t20PericiasDisponiveis(ctx.state.personagem, ctx.t20AtributosFinais(ctx.state.personagem)).extraRacial, ctx.t20Derivados(ctx.state.personagem).deslocamento], [2, 9]);
const avHum = avisos(3, "estrito", ctx.state.personagem);
t.check("etapa raça: Humano não gera aviso do ajuste à escolha (o app aplica no passo Atributos)", !avHum.some(a => /ajustes/.test(a.msg)) && !avHum.some(a => /deslocamento/.test(a.msg)) && erros(3, "estrito", ctx.state.personagem).length === 0);

/* ---- 3. Catálogo de poderes: pré-requisitos mecânicos (estrito = erro, livre = aviso) ---- */
function poderes(classe, nivel, lista, extra){
  montarPersonagem(ctx, Object.assign({ nome: "P", nivel, raca: "humano", classe, atributosBase: ZERO, poderes: lista }, extra || {}));
  return ctx.state.personagem;
}
let pp = poderes("ladino", 5, [{ id: "oportunismo", nivel: 5 }]);
t.igual("poder de nível 6 escolhido no 5º: erro no estrito", erros(8, "estrito", pp).length >= 1, true);
t.igual("poder de nível 6 escolhido no 5º: aviso no livre, sem erro", [erros(8, "livre", pp).length, avisos(8, "livre", pp).some(a => /nível 6/.test(a.msg))], [0, true]);
pp = poderes("ladino", 6, [{ id: "oportunismo", nivel: 6 }]);
t.igual("Oportunismo no 6º (duas fontes): aceito no estrito", erros(8, "estrito", pp).length, 0);
pp = poderes("ladino", 10, [{ id: "manipular-em-massa", nivel: 10 }]);
t.igual("poder de bardo num ladino: erro no estrito", erros(8, "estrito", pp).some(e => /poder de Bardo/.test(e.msg)), true);
pp = poderes("bardo", 9, [{ id: "manipular-em-massa", nivel: 9 }]);
t.igual("Manipular em Massa no 9º (exige 10º): erro no estrito", erros(8, "estrito", pp).some(e => /exige nível 10/.test(e.msg)), true);

pp = poderes("barbaro", 6, [{ id: "espiritualista", nivel: 6 }], { atributosBase: comAtr({ sabedoria: 0 }) });
const esp = erros(8, "estrito", pp).map(e => e.msg);
t.igual("Espiritualista (fora do Livro Básico): não é conferido, sem erro mecânico", esp.length, 0);
pp = poderes("barbaro", 6, [{ id: "totem-espiritual", nivel: 4 }, { id: "espiritualista", nivel: 6 }], { atributosBase: comAtr({ sabedoria: 2 }) });
t.igual("Espiritualista com SAB 2 e Totem tomado antes: sem erro", erros(8, "estrito", pp).length, 0);

pp = poderes("bardo", 4, [{ id: "balada-fascinante", nivel: 5 }, { id: "manipular", nivel: 4 }]);
t.igual("pré-requisito de poder precisa ser tomado no mesmo nível ou antes", erros(8, "estrito", pp).some(e => /exige Balada Fascinante/.test(e.msg)), true);

pp = poderes("guerreiro", 10, [{ id: "planejamento-marcial", nivel: 10 }]);
t.igual("Planejamento Marcial sem Guerra treinada: erro", erros(8, "estrito", pp).some(e => /treinar em Guerra/.test(e.msg)), true);
pp = poderes("guerreiro", 10, [{ id: "planejamento-marcial", nivel: 10 }], { periciasEscolhidas: ["Guerra"] });
t.igual("Planejamento Marcial com Guerra treinada: sem erro mecânico", erros(8, "estrito", pp).some(e => /treinar em Guerra/.test(e.msg)), false);

pp = poderes("nobre", 10, [{ id: "autoridade-feudal", nivel: 6 }, { id: "titulo", nivel: 10 }]);
t.igual("Título com Autoridade Feudal tomada: sem erro; o texto do pré-requisito vira aviso", [erros(8, "estrito", pp).length, avisos(8, "estrito", pp).some(a => /conquistado terras/.test(a.msg))], [0, true]);

pp = poderes("ladino", 6, [{ nome: "Golpe de Sorte", tipo: "origem", nivel: 2, livre: true }]);
t.igual("poder digitado (fora do catálogo): sem checagem mecânica, aceito", erros(8, "estrito", pp).length, 0);
pp = poderes("ladino", 6, [{ id: "oportunismo", nivel: 6 }, { id: "oportunismo", nivel: 6 }]);
t.igual("poder repetido: aviso (repetição não verificada), não erro", [erros(8, "estrito", pp).length, avisos(8, "estrito", pp).some(a => /mais de uma vez/.test(a.msg))], [0, true]);

/* Lista de poderes disponíveis respeita classe e nível */
t.igual("disponíveis para Ladino no 6º incluem Oportunismo e não incluem Manipular em Massa",
  [ctx.t20PoderesDisponiveis("ladino", 6).some(x => x.id === "oportunismo"), ctx.t20PoderesDisponiveis("ladino", 6).some(x => x.id === "manipular-em-massa")], [true, false]);
t.igual("gerais (Esquiva) aparecem para qualquer classe", ctx.t20PoderesDisponiveis("guerreiro", 1).some(x => x.id === "esquiva"), true);

/* ---- 4. Catálogo de magias por círculo ---- */
t.igual("círculo 1 tem Curar Ferimentos e não tem Bola de Fogo", [ctx.t20MagiasDoCirculo(1).some(m => m.nome === "Curar Ferimentos"), ctx.t20MagiasDoCirculo(1).some(m => m.nome === "Bola de Fogo")], [true, false]);
t.igual("círculo 2 traz Bola de Fogo do catálogo do livro (não pendente)", ctx.t20MagiasDoCirculo(2).find(m => m.nome === "Bola de Fogo").pendente, false);
t.igual("círculo 4 ainda traz Sopro de Dragão como pendente (só o índice)", ctx.t20MagiasDoCirculo(4).find(m => m.nome === "Sopro de Dragão").pendente, true);
let mg = montarPersonagem(ctx, { nome: "M", nivel: 1, raca: "anao", classe: "clerigo", atributosBase: comAtr({ sabedoria: 3, destreza: 2, constituicao: 2, carisma: 2, inteligencia: 1 }),
  magias: [{ nome: "Curar Ferimentos", circulo: 1 }, { nome: "Bola de Fogo", circulo: 1 }, { nome: "Bênção", circulo: 1 }] });
t.igual("magia de 2º círculo posta no 1º: erro de círculo no estrito", erros(9, "estrito", mg.personagem).some(e => /Bola de Fogo é de 2º/.test(e.msg)), true);
const mgPend = montarPersonagem(ctx, { nome: "M", nivel: 1, raca: "anao", classe: "clerigo", atributosBase: comAtr({ sabedoria: 3, destreza: 2, constituicao: 2, carisma: 2, inteligencia: 1 }),
  magias: [{ nome: "Curar Ferimentos", circulo: 1 }, { nome: "Sopro de Dragão", circulo: 4 }, { nome: "Bênção", circulo: 1 }] });
t.igual("magia do catálogo pendente: aviso de execução/alcance NÃO VERIFICADOS", avisos(9, "estrito", mgPend.personagem).some(a => /NÃO VERIFICADOS/.test(a.msg)), true);
mg = montarPersonagem(ctx, { nome: "M", nivel: 1, raca: "anao", classe: "clerigo", atributosBase: comAtr({ sabedoria: 3 }),
  magias: [{ nome: "Curar Ferimentos", circulo: 1 }, { nome: "Sopro Solar Inventado", circulo: 1, livre: true }, { nome: "Bênção", circulo: 1 }] });
t.igual("magia digitada fora do catálogo: aviso, não erro", [erros(9, "estrito", mg.personagem).length, avisos(9, "estrito", mg.personagem).some(a => /fora do catálogo/.test(a.msg))], [0, true]);
mg = montarPersonagem(ctx, { nome: "M", nivel: 1, raca: "anao", classe: "clerigo", atributosBase: comAtr({ sabedoria: 3 }),
  magias: [{ nome: "Curar Ferimentos", circulo: 1 }, { nome: "Bola de Fogo", circulo: 2 }, { nome: "Bênção", circulo: 1 }] });
t.igual("magia de 2º círculo no nível 1 (círculo acima do máximo): erro", erros(9, "estrito", mg.personagem).some(e => /acima do disponível/.test(e.msg)), true);

/* ---- 5. Backup: esquema 2 (atual) e leitura do esquema 1 ---- */
montarPersonagem(ctx, { nome: "Bk", nivel: 20, raca: "humano", classe: "ladino", atributosBase: comAtr({ constituicao: 1 }), pvManual: 95,
  poderes: [{ id: "oportunismo", nivel: 6 }, { nome: "Golpe Livre", tipo: "origem", nivel: 2, livre: true }],
  magias: [] });
const antes = JSON.stringify(ctx.state.personagem);
const backup = ctx.t20BackupObjeto();
t.igual("backup atual leva versaoEsquema 2", backup.versaoEsquema, 2);
ctx.resetStateToInitial();
t.igual("importa o backup esquema 2", ctx.t20ImportarBackup(JSON.stringify(backup)).ok, true);
t.igual("esquema 2: PV à mão, poderes do catálogo e digitado sobrevivem à ida e volta", JSON.stringify(ctx.state.personagem), antes);

const antigo = JSON.stringify({ sistema: "tormenta20", versaoEsquema: 1, modo: "estrito", etapa: 8,
  personagem: { nome: "Velho", nivel: 3, raca: "elfo", classe: "ladino", poderes: [{ nome: "Devoto Fiel", tipo: "classe", nivel: 1, nota: "" }],
    magias: [{ nome: "Curar Ferimentos", circulo: 1 }, { nome: "Sopro Solar Inventado", circulo: 1 }] } });
const r1 = ctx.t20ImportarBackup(antigo);
t.igual("esquema 1 ainda importa", r1.ok, true);
t.igual("esquema 1: poder digitado vira livre, sem id", [ctx.state.personagem.poderes[0].livre, ctx.state.personagem.poderes[0].id], [true, null]);
t.igual("esquema 1: magia do catálogo fica do catálogo; a digitada fica livre", [ctx.state.personagem.magias[0].livre, ctx.state.personagem.magias[1].livre], [false, true]);
t.igual("esquema 1: campos novos completados (PV, PM e treino à mão em branco)", [ctx.state.personagem.pvManual, ctx.state.personagem.pmManual, ctx.state.personagem.treinoManual], [null, null, null]);
t.igual("esquema 1 com versão desconhecida continua recusado", ctx.t20LerBackup(JSON.stringify({ sistema: "tormenta20", versaoEsquema: 9, personagem: {} })).ok, false);

/* ---- 6. PDF de nível alto ---- */
montarPersonagem(ctx, { nome: "PDF20", nivel: 20, raca: "humano", classe: "ladino", atributosBase: comAtr({ constituicao: 1 }), periciasEscolhidas: ["Furtividade"],
  poderes: [{ id: "oportunismo", nivel: 6 }, { id: "roubo-de-mana", nivel: 7 }], magias: [] });
let html = ctx.t20GerarHtmlFicha(ctx.state);
t.igual("PDF nível 20: 2 páginas", (html.match(/<article class="pagina"/g) || []).length, 2);
t.check("PDF nível 20: PV 89 no quadro de vitais", html.includes("<strong>89</strong>"));
t.check("PDF nível 20: seção de progressão do 6º ao 20º", html.includes("Progressão de classe (6º ao 20º)"));
t.check("PDF nível 20: habilidade do 20º nível com efeito", html.includes("A Pessoa Certa para o Trabalho"));
t.check("PDF nível 20: poder do catálogo com tipo", html.includes("Oportunismo") && html.includes("Poder de classe"));
t.check("PDF nível 20: sem undefined nem NaN", !/undefined|NaN/.test(html));
t.check("PDF nível 20: aviso de dados em conferência preservado", html.includes("Dados do Livro Básico, ainda em conferência"));

montarPersonagem(ctx, { nome: "PDFb", nivel: 20, raca: "humano", classe: "bardo", atributosBase: ZERO });
html = ctx.t20GerarHtmlFicha(ctx.state);
/* Revisão 2026-11-17: PV do Bardo vem do livro (p050): 69 com CON 0. Antes o quadro mostrava "não verificado". */
t.check("PDF Bardo nível 20 sem PV à mão: vital mostra 69 (livro, p050)", html.includes("<strong>69</strong>"));
ctx.state.personagem.pvManual = 150;
html = ctx.t20GerarHtmlFicha(ctx.state);
t.check("PDF Bardo nível 20 com PV à mão: mostra 150 e 'digitado à mão'", html.includes("<strong>150</strong>") && html.includes("digitado à mão"));
t.check("PDF Bardo nível 20: sem 'undefined' nem 'NaN'", !/undefined|NaN/.test(html));

/* Foundry continua gerando o rascunho em nível alto */
montarPersonagem(ctx, { nome: "F20", nivel: 20, raca: "humano", classe: "ladino", atributosBase: comAtr({ constituicao: 1 }) });
const ator = ctx.t20FoundryAtor(ctx.state.personagem, ctx.t20Derivados(ctx.state.personagem));
t.igual("Foundry nível 20: PV 89 no rascunho", ator.system.pv.max, 89);

/* ---- 7. Telas: cada etapa gera HTML sem exceção, sem 'undefined' e sem 'NaN' (ui.js carregado no mesmo ambiente) ---- */
const ctxUi = carregar([...SCRIPTS, "tormenta20/ui.js"]);
const cenarios = [
  { nome: "Ladino 20", nivel: 20, raca: "humano", classe: "ladino", atributosBase: comAtr({ constituicao: 1 }), poderes: [{ id: "oportunismo", nivel: 6 }, { nome: "Livre", tipo: "origem", nivel: 2, livre: true }] },
  { nome: "Bardo 20", nivel: 20, raca: "minotauro", classe: "bardo", atributoMagia: "carisma", atributosBase: comAtr({ carisma: 2 }), magias: [{ nome: "Sono", circulo: 1, livre: true }, { nome: "Bola de Fogo", circulo: 2 }] },
  { nome: "Clérigo 1", nivel: 1, raca: "sereia_triton", classe: "clerigo", atributoMagia: "sabedoria", atributosBase: comAtr({ sabedoria: 3 }), magias: [{ nome: "Curar Ferimentos", circulo: 1 }, { nome: "Bênção", circulo: 1 }, { nome: "Escudo da Fé", circulo: 1 }] },
  { nome: "Guerreiro 5", nivel: 5, raca: "anao", classe: "guerreiro", grupoFixoEscolha: "Luta", atributosBase: comAtr({ forca: 2 }), poderes: [{ id: "espiritualista", nivel: 6 }] },
  { nome: "Sem classe", nivel: 3, raca: null, classe: null }
];
let quebrou = [];
for(const cen of cenarios){
  for(const modo of ["estrito", "livre"]){
    for(let etapa = 1; etapa <= 12; etapa++){
      try {
        montarPersonagem(ctxUi, cen);
        ctxUi.state.modo = modo;
        ctxUi.state.etapa = etapa;
        const html = ctxUi.t20HtmlFicha();
        if(/undefined|NaN|\[object Object\]/.test(html)) quebrou.push(`${cen.nome}/${modo}/etapa ${etapa}: texto indevido`);
      } catch(e){ quebrou.push(`${cen.nome}/${modo}/etapa ${etapa}: ${e.message}`); }
    }
  }
}
t.igual("telas: 5 personagens x 2 modos x 12 etapas geram HTML sem erro", quebrou, []);
montarPersonagem(ctxUi, cenarios[1]);
ctxUi.state.modo = "estrito";
ctxUi.state.etapa = 11;
const telaBardo = ctxUi.t20HtmlFicha();
t.check("tela de derivados do Bardo 20: PV calculado pelo livro (p050) aparece, e tabela do 6º ao 20º",
  telaBardo.includes("Níveis 6 a 20") && telaBardo.includes(String(ctx.t20Derivados(ctx.state.personagem).pv)) && ctx.t20Derivados(ctx.state.personagem).pv === 89);
t.check("tela de magias: magia do 2º círculo do livro aparece completa (sem o aviso de só o nome conferido)", (() => { ctxUi.state.etapa = 9; const h = ctxUi.t20HtmlFicha(); return h.includes("Bola de Fogo") && !h.includes("Bola de Fogo (só o nome conferido"); })());
ctxUi.state.etapa = 8;
t.check("tela de poderes: poder livre mostra o campo de nome", (() => { montarPersonagem(ctxUi, cenarios[0]); ctxUi.state.etapa = 8; return ctxUi.t20HtmlFicha().includes('id="poder-nome-1"'); })());

t.fim();
