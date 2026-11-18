/* Equipamento Tormenta20 (rules-equipamento.js): contagens por lista, ids únicos, categorias válidas,
   fonte com página do livro, campos inteiros e alguns valores conferidos na página. */
const { carregar, criarTeste, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Equipamento Tormenta20: contagens, ids, fontes e valores conferidos");
const ctx = carregar(SCRIPTS);

const A = ctx.T20_ARMAS, R = ctx.T20_ARMADURAS, I = ctx.T20_ITENS, S = ctx.T20_EQUIPAMENTO_STATUS;
const TEXTO = v => typeof v === "string" && v.trim().length > 0;

t.igual("armas: 39 entradas (13 simples, 18 marciais, 6 exóticas, 2 de fogo)", A.length, 39);
t.igual("armaduras e escudos: 12 entradas (5 leves, 5 pesadas, 2 escudos)", R.length, 12);
t.igual("itens: 125 entradas", I.length, 125);

for (const [nome, lista] of [["T20_ARMAS", A], ["T20_ARMADURAS", R], ["T20_ITENS", I]]) {
  const ids = lista.map(x => x.id);
  t.igual(`${nome}: ids únicos`, ids.filter((x, i) => ids.indexOf(x) !== i), []);
}

t.igual("categorias de armas válidas", A.filter(a => !["simples", "marcial", "exotica", "fogo"].includes(a.categoria)).map(a => a.nome), []);
t.igual("categorias de armaduras válidas", R.filter(a => !["leve", "media", "pesada", "escudo"].includes(a.categoria)).map(a => a.nome), []);
t.igual("tipo de dano de arma válido", A.filter(a => !["corte", "perfuracao", "esmagamento"].includes(a.tipoDano)).map(a => a.nome), []);
t.igual("dano de arma em NdN", A.filter(a => !/^\d+d\d+$/.test(a.dano)).map(a => a.nome), []);
t.igual("espaços de arma e armadura são inteiros", [...A, ...R].filter(x => !Number.isInteger(x.espacos)).map(x => x.nome), []);
t.igual("preço de arma e armadura é inteiro", [...A, ...R].filter(x => !Number.isInteger(x.preco)).map(x => x.nome), []);
t.igual("todo item tem espaços e preço inteiros ou null", I.filter(i => !(i.espacos === null || Number.isInteger(i.espacos)) || !(i.preco === null || Number.isInteger(i.preco))).map(i => i.nome), []);
t.igual("todo item não verificado tem algum valor null (fração que não coube)", I.filter(i => !i.verificado && i.espacos !== null && i.preco !== null).map(i => i.nome), []);
t.igual("fonte cita página do livro do usuário", [...A, ...R, ...I].filter(x => !TEXTO(x.fonte) || !/Tormenta20 Jogo do Ano, p\d+/.test(x.fonte)).map(x => x.nome), []);
t.igual("verificado é booleano em todas as linhas", [...A, ...R, ...I].filter(x => typeof x.verificado !== "boolean").map(x => x.nome), []);

const porNome = (lista, nome) => lista.find(x => x.nome === nome);
const pistola = porNome(A, "Pistola");
t.check("pistola: 2d6, crítico 19-20/x3, alcance Curto, 250 T$", pistola && pistola.dano === "2d6" && pistola.critico === "19-20/x3" && pistola.alcance === "Curto" && pistola.preco === 250, pistola);
const machadinha = porNome(A, "Machadinha");
t.check("machadinha: categoria marcial, crítico 20/x3, alcance Curto", machadinha && machadinha.categoria === "marcial" && machadinha.critico === "20/x3" && machadinha.alcance === "Curto", machadinha);
const bordao = porNome(A, "Bordão");
t.check("bordão: não verificado (dano de arma dupla)", bordao && bordao.verificado === false && bordao.preco === 0, bordao);
const completa = porNome(R, "Armadura completa");
t.check("armadura completa: defesa 10, penalidade -5, limite de Destreza 0, 3000 T$", completa && completa.defesa === 10 && completa.penalidade === "-5" && completa.limiteDes === 0 && completa.preco === 3000, completa);
const acolchoada = porNome(R, "Armadura acolchoada");
t.check("armadura acolchoada: defesa 1, sem penalidade, sem limite de Destreza", acolchoada && acolchoada.defesa === 1 && acolchoada.penalidade === "0" && acolchoada.limiteDes === null, acolchoada);
const veleiro = porNome(I, "Veleiro");
t.check("veleiro: 10000 T$, espaço null", veleiro && veleiro.preco === 10000 && veleiro.espacos === null, veleiro);
t.check("status continua não verificado e declara as lacunas", S.verificado === false && /NÃO VERIFICADO/.test(S.armas) && /NÃO VERIFICADO/.test(S.armaduras) && /NÃO VERIFICADO/.test(S.itens));

t.fim();
