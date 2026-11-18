/* Aumento de Atributo (poder de classe, livro p044 e p047-p088; patamares p041) e escolha de três atributos
   da raça (Humano, Sereia/Tritão, Lefou, Osteon; p025, p030, p035, p036).
   Confere: nível mínimo 2, uma vez por patamar para cada atributo (máximo 4 por atributo), soma no valor final,
   efeito retroativo na Constituição (PV), validação no modo estrito e livre, e escolha racial distinta e permitida. */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Tormenta20 aumentos de atributo e escolha racial");
const ctx = carregar(SCRIPTS);

const ZERO = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 };
const comAtr = (v) => Object.assign({}, ZERO, v);
const erros = (etapa, modo, p) => ctx.t20ValidarEtapa(etapa, p, modo).erros;
const avisos = (etapa, modo, p) => ctx.t20ValidarEtapa(etapa, p, modo).avisos;
const aumento = (nivel, atributo) => ({ id: "aumento-atributo", nome: "Aumento de Atributo", tipo: "classe", nivel, nota: "", livre: false, atributo });
const finais = (p) => ctx.t20AtributosFinais(p);

/* ---- Catálogo ---- */
const cat = ctx.T20_PODERES["aumento-atributo"];
t.check("catálogo: Aumento de Atributo é poder de classe das 14 classes, a partir do 2º nível",
  !!cat && cat.tipo === "classe" && cat.nivel === 2 && cat.classes.length === 14 && cat.verificado === true, cat);
t.igual("patamares: 4 faixas do livro (1-4, 5-10, 11-16, 17-20)",
  ctx.T20_PATAMARES.map(pt => [pt.min, pt.max]), [[1, 4], [5, 10], [11, 16], [17, 20]]);

/* ---- Soma no valor final ---- */
montarPersonagem(ctx, { nome: "A", nivel: 2, raca: "humano", classe: "guerreiro", atributosBase: comAtr({ forca: 2 }),
  poderes: [aumento(2, "forca")] });
t.igual("Aumento no 2º nível em Força: final = 2 + 1 = 3", finais(ctx.state.personagem).forca, 3);
t.igual("Aumento: modificador acompanha o valor final", ctx.t20Derivados(ctx.state.personagem).modificadores.forca, 3);
t.igual("Aumento: perícia baseada em Força soma o aumento (Luta não treinada: Força final 3 + metade do nível 2 = 1)",
  ctx.t20Derivados(ctx.state.personagem).pericias.find(x => x.nome === "Luta").bonus, 4);

/* ---- Uma vez por patamar ---- */
montarPersonagem(ctx, { nome: "B", nivel: 3, raca: null, classe: "guerreiro", atributosBase: ZERO,
  poderes: [aumento(2, "destreza"), aumento(3, "destreza")] });
t.igual("mesmo atributo no mesmo patamar (2º e 3º): conta só uma vez", finais(ctx.state.personagem).destreza, 1);
t.check("mesmo atributo no mesmo patamar: validador recusa a segunda (estrito)",
  erros(8, "estrito", ctx.state.personagem).some(e => /patamar Iniciante/.test(e.msg)), erros(8, "estrito", ctx.state.personagem));
t.check("mesmo atributo no mesmo patamar: no livre vira só erro de regra sem bloquear a soma",
  erros(8, "livre", ctx.state.personagem).length === 0 && avisos(8, "livre", ctx.state.personagem).some(a => /patamar/.test(a.msg)));

/* ---- Patamares diferentes: cada um vale ---- */
montarPersonagem(ctx, { nome: "C", nivel: 6, raca: null, classe: "guerreiro", atributosBase: ZERO,
  poderes: [aumento(2, "sabedoria"), aumento(5, "sabedoria")] });
t.igual("mesmo atributo em patamares diferentes (2º e 5º): soma +2", finais(ctx.state.personagem).sabedoria, 2);
t.igual("mesmos patamares: sem erro de patamar", erros(8, "estrito", ctx.state.personagem).filter(e => /patamar/.test(e.msg)).length, 0);

/* ---- Máximo de 4 por atributo (um por patamar) ---- */
montarPersonagem(ctx, { nome: "D", nivel: 20, raca: null, classe: "guerreiro", atributosBase: ZERO,
  poderes: [aumento(2, "carisma"), aumento(5, "carisma"), aumento(11, "carisma"), aumento(17, "carisma"), aumento(20, "carisma")] });
t.igual("quatro patamares com o mesmo atributo: +4, o quinto (17º e 20º) não conta", finais(ctx.state.personagem).carisma, 4);
t.check("quinto aumento no mesmo patamar é recusado no estrito", erros(8, "estrito", ctx.state.personagem).some(e => /Lenda/.test(e.msg)));

/* ---- Nível mínimo e atributo obrigatório ---- */
montarPersonagem(ctx, { nome: "E", nivel: 1, raca: null, classe: "guerreiro", atributosBase: ZERO,
  poderes: [aumento(1, "forca")] });
t.igual("Aumento no 1º nível não conta", finais(ctx.state.personagem).forca, 0);
t.check("Aumento no 1º nível: erro de nível no estrito", erros(8, "estrito", ctx.state.personagem).some(e => /nível 2/.test(e.msg)));

montarPersonagem(ctx, { nome: "F", nivel: 4, raca: null, classe: "guerreiro", atributosBase: ZERO,
  poderes: [aumento(3, null)] });
t.igual("Aumento sem atributo escolhido não soma", finais(ctx.state.personagem).forca, 0);
t.check("Aumento sem atributo: erro no estrito", erros(8, "estrito", ctx.state.personagem).some(e => /escolher o atributo/.test(e.msg)));
t.check("Aumento sem atributo: no livre é só aviso", erros(8, "livre", ctx.state.personagem).length === 0 && avisos(8, "livre", ctx.state.personagem).some(a => /escolher o atributo/.test(a.msg)));

/* ---- Constituição: efeito retroativo nos PV ---- */
montarPersonagem(ctx, { nome: "G", nivel: 5, raca: null, classe: "guerreiro", atributosBase: ZERO, poderes: [] });
const pvSem = ctx.t20Derivados(ctx.state.personagem).pv;
ctx.state.personagem.poderes = [aumento(2, "constituicao")];
t.igual("Constituição +1 por Aumento: PV sobe 1 em cada um dos 5 níveis (efeito retroativo)",
  ctx.t20Derivados(ctx.state.personagem).pv, pvSem + 1 * 5);

/* ---- Entradas sem o id do aumento não contam (ex.: texto livre com o mesmo nome) ---- */
montarPersonagem(ctx, { nome: "H", nivel: 4, raca: null, classe: "guerreiro", atributosBase: ZERO,
  poderes: [{ id: null, nome: "Aumento de Atributo", tipo: "classe", nivel: 2, nota: "", livre: true, atributo: "forca" }] });
t.igual("poder digitado com o nome do aumento não soma", finais(ctx.state.personagem).forca, 0);

/* ---- Estado: normalização mantém o atributo do poder ---- */
ctx.state.personagem.poderes = [];
ctx.state.personagem.poderes = [{ id: "aumento-atributo", nivel: 4, atributo: "inteligencia" }];
ctx.ensureStateShape();
t.igual("normalização mantém o atributo do Aumento", ctx.state.personagem.poderes[0].atributo, "inteligencia");
ctx.state.personagem.poderes = [{ id: "aumento-atributo", nivel: 4, atributo: "xyz" }];
ctx.ensureStateShape();
t.igual("normalização descarta atributo inválido", ctx.state.personagem.poderes[0].atributo, null);

/* ---- Escolha de três atributos da raça ---- */
montarPersonagem(ctx, { nome: "I", nivel: 1, raca: "humano", classe: "guerreiro", atributosBase: ZERO,
  escolhaRacial: ["forca", "destreza", "sabedoria"] });
t.igual("Humano: três atributos escolhidos somam +1 cada", finais(ctx.state.personagem), comAtr({ forca: 1, destreza: 1, sabedoria: 1 }));
t.igual("Humano com três escolhas: sem erro de escolha no passo Atributos", erros(6, "estrito", ctx.state.personagem).filter(e => e.campo !== "pontos"), []);

montarPersonagem(ctx, { nome: "J", nivel: 1, raca: "humano", classe: "guerreiro", atributosBase: ZERO,
  escolhaRacial: ["forca", "forca", "destreza"] });
t.igual("Humano: escolha repetida não soma em dobro", finais(ctx.state.personagem).forca, 1);
t.check("Humano: escolha repetida é recusada no estrito", erros(6, "estrito", ctx.state.personagem).some(e => /diferentes/.test(e.msg)));

montarPersonagem(ctx, { nome: "K", nivel: 1, raca: "humano", classe: "guerreiro", atributosBase: ZERO,
  escolhaRacial: ["forca", "", ""] });
t.check("Humano: falta escolher dois atributos: erro no estrito", erros(6, "estrito", ctx.state.personagem).some(e => /Escolha 3/.test(e.msg)));
t.check("Humano: falta escolher: no livre é só aviso", erros(6, "livre", ctx.state.personagem).length === 0 && avisos(6, "livre", ctx.state.personagem).some(a => /Escolha 3/.test(a.msg)));

montarPersonagem(ctx, { nome: "L", nivel: 1, raca: "lefou", classe: "guerreiro", atributosBase: ZERO,
  escolhaRacial: ["carisma", "forca", "destreza"] });
t.igual("Lefou: Carisma não pode ser escolhido (exceto): só FOR e DES somam; Car fica com o ajuste -1",
  finais(ctx.state.personagem), comAtr({ forca: 1, destreza: 1, carisma: -1 }));
t.check("Lefou com Carisma na escolha: erro no estrito", erros(6, "estrito", ctx.state.personagem).some(e => /Escolha 3/.test(e.msg)));

montarPersonagem(ctx, { nome: "M", nivel: 1, raca: "osteon", classe: "guerreiro", atributosBase: ZERO,
  escolhaRacial: ["forca", "destreza", "constituicao"] });
t.check("Osteon: Constituição não pode ser escolhida (recusada no estrito)", erros(6, "estrito", ctx.state.personagem).length > 0);

montarPersonagem(ctx, { nome: "N", nivel: 1, raca: "anao", classe: "guerreiro", atributosBase: ZERO,
  escolhaRacial: ["forca", "destreza", "sabedoria"] });
t.igual("raça sem escolha (Anão): a escolha guardada não soma", finais(ctx.state.personagem), comAtr({ constituicao: 2, sabedoria: 1, destreza: -1 }));
t.igual("raça sem escolha: passo Atributos sem erro de escolha", erros(6, "estrito", ctx.state.personagem).filter(e => e.campo !== "pontos"), []);

/* ---- Escolha racial e Aumento somam juntos ---- */
montarPersonagem(ctx, { nome: "O", nivel: 2, raca: "sereia_triton", classe: "guerreiro", atributosBase: ZERO,
  escolhaRacial: ["forca", "destreza", "inteligencia"], poderes: [aumento(2, "forca")] });
t.igual("escolha racial e Aumento somam no mesmo atributo", finais(ctx.state.personagem).forca, 2);

/* ---- Backup: o campo escolhaRacial sobrevive ao round trip do estado ---- */
montarPersonagem(ctx, { nome: "P", nivel: 1, raca: "humano", classe: "guerreiro", atributosBase: ZERO,
  escolhaRacial: ["carisma", "sabedoria", ""] });
const copia = JSON.parse(JSON.stringify(ctx.state.personagem));
ctx.resetStateToInitial();
Object.assign(ctx.state.personagem, copia);
ctx.ensureStateShape();
t.igual("escolha racial sobrevive ao round trip (posições preservadas)", ctx.state.personagem.escolhaRacial, ["carisma", "sabedoria", ""]);

process.exitCode = t.fim() ? 0 : 1;
