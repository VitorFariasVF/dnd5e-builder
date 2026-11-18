/* Rodada 2026-11-18 (Livro Básico):
   - magias conhecidas por classe e caminho do Arcanista (p043, p050, p063, p067), com validação na etapa 9;
   - pré-requisitos de poderes conferidos contra o livro (p044-p090, p132-p133);
   - poderes fora do Livro Básico: avisam e não são tratados como regra (foraDoLivro). */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Tormenta20 livro: magias conhecidas e pré-requisitos de poderes");
const ctx = carregar(SCRIPTS);

const ZERO = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 };
const erros = (etapa, modo, p) => ctx.t20ValidarEtapa(etapa, p, modo).erros.map(e => e.msg);
const avisos = (etapa, modo, p) => ctx.t20ValidarEtapa(etapa, p, modo).avisos.map(a => a.msg);
const lim = (classe, nivel, caminho) => ctx.t20MagiasConhecidasLimite(classe, nivel, caminho);

/* ---- Magias conhecidas: fórmula do livro ---- */
t.igual("Bardo nível 1 = 2 (p050)", lim("bardo", 1), 2);
t.igual("Bardo nível 2 = 3 (+1 no nível par)", lim("bardo", 2), 3);
t.igual("Bardo nível 3 = 3 (nível ímpar não ganha)", lim("bardo", 3), 3);
t.igual("Bardo nível 20 = 12", lim("bardo", 20), 12);
t.igual("Druida nível 4 = 4 (p067)", lim("druida", 4), 4);
t.igual("Clérigo nível 1 = 3 (p063)", lim("clerigo", 1), 3);
t.igual("Clérigo nível 5 = 7 (+1 por nível)", lim("clerigo", 5), 7);
t.igual("Arcanista Bruxo nível 1 = 3 (p043)", lim("arcanista", 1, "bruxo"), 3);
t.igual("Arcanista Bruxo nível 5 = 7", lim("arcanista", 5, "bruxo"), 7);
t.igual("Arcanista sem caminho conta como Bruxo", lim("arcanista", 5, null), 7);
t.igual("Feiticeiro nível 1 = 3", lim("arcanista", 1, "feiticeiro"), 3);
t.igual("Feiticeiro nível 2 = 3 (aprende só em nível ímpar)", lim("arcanista", 2, "feiticeiro"), 3);
t.igual("Feiticeiro nível 3 = 4", lim("arcanista", 3, "feiticeiro"), 4);
t.igual("Feiticeiro nível 4 = 4", lim("arcanista", 4, "feiticeiro"), 4);
t.igual("Feiticeiro nível 5 = 5", lim("arcanista", 5, "feiticeiro"), 5);
t.igual("Mago nível 1 = 4 (p043)", lim("arcanista", 1, "mago"), 4);
t.igual("Mago nível 4 = 7 (4 + 3 por nível)", lim("arcanista", 4, "mago"), 7);
t.igual("Mago nível 5 = 9 (+1 por nível e +1 pelo 2º círculo)", lim("arcanista", 5, "mago"), 9);
t.igual("Mago nível 9 = 14 (4 + 8 por nível + 2 novos círculos: 2º no 5º e 3º no 9º)", lim("arcanista", 9, "mago"), 14);
t.igual("Guerreiro não conjura = 0", lim("guerreiro", 5), 0);

/* ---- Atributo de magia pelo caminho (p043) ---- */
montarPersonagem(ctx, { nome: "A", nivel: 3, raca: "humano", classe: "arcanista", caminho: "feiticeiro", atributoMagia: "inteligencia", atributosBase: ZERO });
t.igual("Feiticeiro usa Carisma, mesmo com Inteligência marcada", ctx.t20AtributoMagiaEfetivo(ctx.state.personagem), "carisma");
t.igual("Feiticeiro: validador acusa o atributo errado", erros(5, "estrito", ctx.state.personagem).some(m => /atributo de magia é Carisma/.test(m)), true);
t.igual("Mago usa Inteligência", ctx.t20AtributoMagiaEfetivo({ classe: "arcanista", caminho: "mago" }), "inteligencia");

/* ---- Validação de magias (etapa 9) ---- */
const magias = (n) => Array.from({ length: n }, (_, i) => ({ circulo: 1, nome: "Mísseis Mágicos " + i, livre: true }));
const etapa9 = (classe, nivel, caminho, n) => {
  montarPersonagem(ctx, { nome: "M", nivel, raca: "humano", classe, caminho: caminho || null, atributosBase: ZERO, magias: magias(n) });
  return ctx.state.personagem;
};
t.igual("Mago nível 1 com 4 magias: sem erro de contagem", erros(9, "estrito", etapa9("arcanista", 1, "mago", 4)).some(m => /magias conhecidas/.test(m)), false);
t.igual("Mago nível 1 com 3 magias: erro de contagem (exige 4)", erros(9, "estrito", etapa9("arcanista", 1, "mago", 3)).some(m => /exige|Escolha 4/.test(m)), true);
t.igual("Bardo nível 4 com 4 magias: sem erro", erros(9, "estrito", etapa9("bardo", 4, null, 4)).some(m => /magias conhecidas/.test(m)), false);
t.igual("Bardo nível 3 com 4 magias: erro (exige 3)", erros(9, "estrito", etapa9("bardo", 3, null, 4)).some(m => /magias conhecidas/.test(m)), true);
t.igual("Arcanista sem caminho: erro na etapa 5", erros(5, "estrito", { classe: "arcanista", atributosBase: ZERO }).some(m => /caminho do Arcanista/.test(m)), true);

/* ---- Poderes: pré-requisitos do livro ---- */
const poderes = (classe, nivel, lista) => {
  montarPersonagem(ctx, { nome: "P", nivel, raca: "humano", classe, atributosBase: ZERO, poderes: lista });
  return ctx.state.personagem;
};
const T = ctx.T20_PODERES;
t.igual("catálogo: Esgrima Mágica existe (Bardo, p050)", !!T["esgrima-magica"] && T["esgrima-magica"].classes[0] === "bardo", true);
t.igual("Golpe Mágico (Bardo, p051) exige Esgrima Mágica", T["golpe-magico"].pre.poderes, ["esgrima-magica"]);
t.igual("Heranca Superior exige Herança Aprimorada e 11º nível (p044)", [T["heranca-superior"].nivel, T["heranca-superior"].pre.poderes], [11, ["heranca-aprimorada"]]);
t.igual("Totem Espiritual exige Sabedoria 1 e 4º nível (p048)", [T["totem-espiritual"].nivel, T["totem-espiritual"].pre.atributos], [4, { sabedoria: 1 }]);
t.igual("Bote exige Ambidestria e 6º nível (p056)", [T.bote.nivel, T.bote.pre.poderes], [6, ["ambidestria"]]);
t.igual("Escaramuça exige Destreza 2 e 6º nível (p057)", [T.escaramuca.nivel, T.escaramuca.pre.atributos], [6, { destreza: 2 }]);
t.igual("Chave exige Inteligência 1 e 4º nível (p082)", [T.chave.nivel, T.chave.pre.atributos], [4, { inteligencia: 1 }]);
t.igual("Forma Selvagem Superior exige Forma Selvagem Aprimorada e 12º nível (p068)", [T["forma-selvagem-superior"].nivel, T["forma-selvagem-superior"].pre.poderes], [12, ["forma-selvagem-aprimorada"]]);
t.igual("Mestre Alquimista: Int 3, Sab 3, Alquimista Iniciado, 10º (p075)", [T["mestre-alquimista"].nivel, T["mestre-alquimista"].pre.atributos, T["mestre-alquimista"].pre.poderes], [10, { inteligencia: 3, sabedoria: 3 }, ["alquimista-iniciado"]]);
t.igual("Mestre em Escola: 8º nível (p044)", T["mestre-em-escola"].nivel, 8);
t.igual("Fanático e Inexpugnável: 12º e 6º (p132)", [T.fanatico.pre.nivel, T.inexpugnavel.pre.nivel], [12, 6]);

/* Golpe Mágico sem Esgrima Mágica: erro mecânico; com ela: sem erro de pré-requisito */
const golpeSem = poderes("bardo", 3, [{ id: "golpe-magico", nivel: 3 }]);
t.igual("Golpe Mágico sem Esgrima Mágica: erro", erros(8, "estrito", golpeSem).some(m => /Esgrima Mágica/.test(m)), true);
const golpeCom = poderes("bardo", 3, [{ id: "esgrima-magica", nivel: 3 }, { id: "golpe-magico", nivel: 3 }]);
t.igual("Golpe Mágico com Esgrima Mágica antes: sem erro", erros(8, "estrito", golpeCom).some(m => /Esgrima Mágica/.test(m)), false);

/* ---- Poderes fora do Livro Básico ---- */
const fora = poderes("arcanista", 3, [{ id: "agrilhoar-os-mortos", nivel: 3 }]);
t.igual("fora do livro: catálogo marca foraDoLivro", T["agrilhoar-os-mortos"].foraDoLivro, true);
t.igual("fora do livro: não gera erro mecânico", erros(8, "estrito", fora).length, 0);
t.igual("fora do livro: aparece como aviso", avisos(8, "estrito", fora).some(m => /não consta do Livro Básico/.test(m)), true);
t.igual("poder do livro não é marcado fora", !!T["fortalecimento-arcano"].foraDoLivro, false);
t.igual("Balada Fascinante (livro p051) não é fora do livro", !!T["balada-fascinante"].foraDoLivro, false);


/* ---- Humano: troca de uma perícia treinada por um poder geral (p025, Versátil) ---- */
montarPersonagem(ctx, { nome: "H", nivel: 1, raca: "humano", classe: "guerreiro", atributosBase: ZERO, racaTrocaPericia: false });
const livresSem = ctx.t20PericiasDisponiveis(ctx.state.personagem, ctx.t20AtributosFinais(ctx.state.personagem)).livres;
montarPersonagem(ctx, { nome: "H", nivel: 1, raca: "humano", classe: "guerreiro", atributosBase: ZERO, racaTrocaPericia: true });
const livresCom = ctx.t20PericiasDisponiveis(ctx.state.personagem, ctx.t20AtributosFinais(ctx.state.personagem)).livres;
t.igual("Humano com troca: uma perícia livre a menos (p025)", livresSem - livresCom, 1);
const humanoSemGeral = poderes("guerreiro", 1, []);
humanoSemGeral.raca = "humano"; humanoSemGeral.racaTrocaPericia = true;
t.igual("Humano com troca sem poder geral: erro na etapa 8", erros(8, "estrito", humanoSemGeral).some(m => /poder geral/.test(m)), true);
const humanoComGeral = poderes("guerreiro", 1, [{ id: "proficiencia", nivel: 1 }]);
humanoComGeral.raca = "humano"; humanoComGeral.racaTrocaPericia = true;
t.igual("Humano com troca e poder geral: sem erro de troca", erros(8, "estrito", humanoComGeral).some(m => /poder geral/.test(m)), false);
const anaoTroca = poderes("guerreiro", 1, [{ id: "proficiencia", nivel: 1 }]);
anaoTroca.raca = "anao"; anaoTroca.racaTrocaPericia = true;
t.igual("troca de perícia só para Humano: erro na etapa 7", erros(7, "estrito", anaoTroca).some(m => /é do Humano/.test(m)), true);
t.fim && t.fim();
