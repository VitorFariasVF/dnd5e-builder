/* Dados de magias, raças completas e equipamento (rules-magias.js, rules-racas.js, rules-equipamento.js):
   estrutura, círculos, tipos, valores numéricos plausíveis, fonte presente e lacunas registradas. */
const fs = require("fs");
const path = require("path");
const { carregar, criarTeste, SCRIPTS, RAIZ } = require("./_ambiente");
const t = criarTeste("Magias, raças completas e equipamento Tormenta20");
const ctx = carregar(SCRIPTS);

const TEXTO = v => typeof v === "string" && v.trim().length > 0;
const ATRIBUTOS = ctx.T20_ATRIBUTO_IDS;

/* ---- Magias ---- */
const magias = ctx.T20_MAGIAS;
t.check("T20_MAGIAS é uma lista com pelo menos 7 magias", Array.isArray(magias) && magias.length >= 7, magias && magias.length);

const camposMagia = ["id", "nome", "circulo", "escola", "tipo", "execucao", "alcance", "alvo", "efeito", "fonte", "verificado"];
const incompletas = magias.filter(m => camposMagia.some(c => m[c] === undefined)).map(m => m.nome || m.id);
t.igual("cada magia tem os campos obrigatórios", incompletas, []);
t.igual("cada magia tem duracao (texto ou null) e resistencia (texto ou null)",
  magias.filter(m => !(m.duracao === null || TEXTO(m.duracao)) || !(m.resistencia === null || TEXTO(m.resistencia))).map(m => m.nome), []);

t.igual("ids das magias são únicos", new Set(magias.map(m => m.id)).size, magias.length);
t.igual("círculo é inteiro entre 1 e 5", magias.filter(m => !Number.isInteger(m.circulo) || m.circulo < 1 || m.circulo > 5).map(m => m.nome), []);
t.igual("tipo é arcana ou divina", magias.filter(m => m.tipo !== "arcana" && m.tipo !== "divina").map(m => m.nome), []);
t.igual("escola, execução e alcance preenchidos", magias.filter(m => !TEXTO(m.escola) || !TEXTO(m.execucao) || !TEXTO(m.alcance)).map(m => m.nome), []);
t.igual("efeito é frase curta (até 160 caracteres, termina em pontuação)",
  magias.filter(m => m.efeito.length > 160 || !/[.!?]$/.test(m.efeito)).map(m => m.nome), []);
t.igual("toda magia tem fonte", magias.filter(m => !TEXTO(m.fonte)).map(m => m.nome), []);
t.igual("nenhuma magia verificada sem duas fontes (verificado true exige '2 fontes' na fonte)",
  magias.filter(m => m.verificado === true && !/2 fontes/.test(m.fonte)).map(m => m.nome), []);
t.igual("nenhuma magia está verificada: só uma fonte foi acessível", magias.filter(m => m.verificado).map(m => m.nome), []);

const porNome = nome => magias.find(m => m.nome === nome);
const cura = porNome("Curar Ferimentos");
t.check("Curar Ferimentos: 1º círculo, divina, alcance Toque", cura && cura.circulo === 1 && cura.tipo === "divina" && cura.alcance === "Toque", cura);
const alarme = porNome("Alarme");
t.check("Alarme: 1º círculo, arcana, esfera de 9 m", alarme && alarme.circulo === 1 && alarme.tipo === "arcana" && /9 m/.test(alarme.alvo), alarme);
const armadura = porNome("Armadura Arcana");
t.check("Armadura Arcana: duração NÃO informada (null) e fonte cita a lacuna", armadura && armadura.duracao === null && /NÃO VERIFICADO/.test(armadura.fonte), armadura);
t.igual("catálogo completo cobre só o 1º círculo", [...new Set(magias.map(m => m.circulo))], [1]);

const pendentes = ctx.T20_MAGIAS_PENDENTES;
t.check("T20_MAGIAS_PENDENTES é uma lista", Array.isArray(pendentes) && pendentes.length > 0);
t.igual("pendentes têm círculo de 2 a 5, escola e fonte",
  pendentes.filter(p => !Number.isInteger(p.circulo) || p.circulo < 2 || p.circulo > 5 || !TEXTO(p.escola) || !TEXTO(p.fonte)).map(p => p.nome), []);
t.igual("pendentes não repetem magias do catálogo completo",
  pendentes.filter(p => porNome(p.nome)).map(p => p.nome), []);
const circulosPresentes = new Set([...magias, ...pendentes].map(m => m.circulo));
t.igual("catálogo e pendentes cobrem os círculos de 1 a 5", [...circulosPresentes].sort(), [1, 2, 3, 4, 5]);
t.igual("pendentes não têm execução nem alcance (não verificados)", pendentes.filter(p => "execucao" in p || "alcance" in p).map(p => p.nome), []);

const prog = ctx.T20_MAGIAS_PROGRESSAO;
t.check("progressão de magias marcada como NÃO VERIFICADO sem tabela",
  prog && prog.verificado === false && prog.tabela === null && /NÃO VERIFICADO/.test(prog.fonte), prog);

/* ---- Raças completas ---- */
const racas = ctx.T20_RACAS_COMPLETAS;
const nomesEsperados = ["Humano", "Anão", "Elfo", "Goblin", "Hynne", "Minotauro", "Osteon", "Qareen", "Sereia/Tritão",
  "Sílfide", "Suraggel (Aggelus)", "Suraggel (Sulfure)", "Trog", "Kliren", "Lefou", "Medusa", "Dahllan"];
t.igual("17 raças do livro básico (lista do Núcleo)", Object.values(racas).map(r => r.nome).sort(), nomesEsperados.slice().sort());

const TAMANHOS = [null, "Minúsculo", "Pequeno", "Médio", "Grande"];
const racasEntradas = Object.entries(racas);
t.igual("toda raça tem fonte", racasEntradas.filter(([k, r]) => !TEXTO(r.fonte)).map(([k]) => k), []);
t.igual("tamanho é uma categoria conhecida ou null", racasEntradas.filter(([k, r]) => !TAMANHOS.includes(r.tamanho)).map(([k]) => k), []);
t.igual("deslocamento é null ou múltiplo de 3 entre 3 e 18 m",
  racasEntradas.filter(([k, r]) => r.deslocamento !== null && (!Number.isInteger(r.deslocamento) || r.deslocamento % 3 !== 0 || r.deslocamento < 3 || r.deslocamento > 18)).map(([k]) => k), []);
t.igual("ajustes são null ou atributos válidos com valores entre -2 e 2",
  racasEntradas.filter(([k, r]) => r.ajustes !== null &&
    (Object.keys(r.ajustes).some(a => !ATRIBUTOS.includes(a)) || Object.values(r.ajustes).some(v => !Number.isInteger(v) || Math.abs(v) > 2))).map(([k]) => k), []);
t.igual("habilidades: cada uma com nome e efeito",
  racasEntradas.filter(([k, r]) => !Array.isArray(r.habilidades) || r.habilidades.some(h => !TEXTO(h.nome) || !TEXTO(h.efeito))).map(([k]) => k), []);
t.igual("verificado.habilidades só cita habilidades existentes",
  racasEntradas.filter(([k, r]) => r.verificado.habilidades.some(n => !r.habilidades.some(h => h.nome === n))).map(([k]) => k), []);
t.igual("nenhum ajuste de atributo marcado como verificado (só uma fonte)",
  racasEntradas.filter(([k, r]) => r.verificado.ajustes === true).map(([k]) => k), []);

const hynne = racas.hynne;
t.check("Hynne: Pequeno, 6 m, confirmados em duas fontes", hynne.tamanho === "Pequeno" && hynne.deslocamento === 6 &&
  hynne.verificado.tamanho === true && hynne.verificado.deslocamento === true, hynne);
t.check("Sílfide: Minúsculo, 9 m", racas.silfide.tamanho === "Minúsculo" && racas.silfide.deslocamento === 9, racas.silfide);
t.check("Sereia/Tritão sem habilidades conferidas e com NÃO VERIFICADO",
  racas.sereia_triton.habilidades.length === 0 && /NÃO VERIFICADO/.test(racas.sereia_triton.fonte), racas.sereia_triton);
t.check("Anão: deslocamento 6 m aqui, conflito com 9 m de rules.js registrado (não verificado)",
  racas.anao.deslocamento === 6 && racas.anao.verificado.deslocamento === false && /CONFLITO/.test(racas.anao.observacoes), racas.anao);
t.check("Minotauro: ajustes FOR +2, CON +1, SAB -1 com verificado false (1 fonte)",
  racas.minotauro.ajustes.forca === 2 && racas.minotauro.ajustes.constituicao === 1 && racas.minotauro.ajustes.sabedoria === -1 &&
  racas.minotauro.verificado.ajustes === false, racas.minotauro.ajustes);

/* Cadastro único: a tabela antiga de 5 raças saiu de rules.js; a ficha lê só T20_RACAS_COMPLETAS. */
const regrasTexto = fs.readFileSync(path.join(RAIZ, "tormenta20/rules.js"), "utf8");
t.check("rules.js não define mais T20_RACAS (um só cadastro de raças)", !/const T20_RACAS\b/.test(regrasTexto));
t.igual("raças completas: 17 ids únicos", new Set(Object.keys(racas)).size, 17);

/* ---- Equipamento ---- */
const listas = { T20_ARMAS: ctx.T20_ARMAS, T20_ARMADURAS: ctx.T20_ARMADURAS, T20_ITENS: ctx.T20_ITENS };
for (const [nome, lista] of Object.entries(listas)) {
  t.check(`${nome} é uma lista`, Array.isArray(lista));
}
const armas = ctx.T20_ARMAS, armaduras = ctx.T20_ARMADURAS, itens = ctx.T20_ITENS;
t.igual("armas: dano em formato NdN, espaços e T$ plausíveis, fonte presente",
  armas.filter(a => !/^\d+d\d+$/.test(a.dano) || !Number.isInteger(a.espacos) || a.espacos < 0 || !Number.isInteger(a.preco) || a.preco < 0 || !TEXTO(a.fonte)).map(a => a.nome), []);
t.igual("armaduras: defesa entre 0 e 10 e fonte presente",
  armaduras.filter(a => !Number.isInteger(a.defesa) || a.defesa < 0 || a.defesa > 10 || !TEXTO(a.fonte)).map(a => a.nome), []);
t.igual("itens: fonte presente", itens.filter(i => !TEXTO(i.fonte)).map(i => i.nome), []);
const status = ctx.T20_EQUIPAMENTO_STATUS;
t.check("status do equipamento declara a lacuna quando as listas estão vazias",
  !(armas.length === 0 && armaduras.length === 0 && itens.length === 0) || (status.verificado === false && /NÃO VERIFICADO/.test(status.fonte)), status);
t.check("equipamento: nenhum item de T20 sem fonte e sem NÃO VERIFICADO no status",
  status.verificado === false && /NÃO VERIFICADO/.test(status.armas) && /NÃO VERIFICADO/.test(status.armaduras), status);

t.fim();
