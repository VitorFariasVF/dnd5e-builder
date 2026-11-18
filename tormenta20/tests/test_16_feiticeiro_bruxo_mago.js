/* Rodada 2026-11-18 (tarefa 1-4): Arcanista pelos caminhos do livro (p043-p045).
   - linhagem sobrenatural do Feiticeiro: herança básica aplicada (PV, magia extra, Carisma) e validação da escolha;
   - foco do Bruxo: RD e PV derivados; grimório do Mago: magias memorizadas por dia;
   - magia extra do Mago ao ganhar novo círculo: soma à magia do nível (livro: "uma magia adicional");
   - custo em PM por círculo (Tabela 4-1, p176) e círculo máximo por nível. */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Tormenta20 livro: linhagem do Feiticeiro, foco do Bruxo, grimório do Mago e PM por círculo");
const ctx = carregar(SCRIPTS);

const ZERO = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 };
const erros = (etapa, modo, p) => ctx.t20ValidarEtapa(etapa, p, modo).erros.map(e => e.msg);
const avisos = (etapa, modo, p) => ctx.t20ValidarEtapa(etapa, p, modo).avisos.map(a => a.msg);
const lim = (classe, nivel, caminho) => ctx.t20MagiasConhecidasLimite(classe, nivel, caminho);
const ficha = (dados) => { montarPersonagem(ctx, Object.assign({ nome: "T", raca: "humano", classe: "arcanista", atributosBase: ZERO }, dados)); return ctx.state.personagem; };
const derivados = (p) => ctx.t20Derivados(p);

/* ---- Linhagem (p044-p045) ---- */
const car2con1 = { forca: 0, destreza: 0, constituicao: 1, inteligencia: 0, sabedoria: 0, carisma: 2 };
const dracBasica = ficha({ nivel: 1, caminho: "feiticeiro", linhagem: "draconica", linhagemDano: "fogo", atributosBase: car2con1 });
t.igual("Dracônica básica: PV = 8 + CON 1 + CAR 2 = 11 (p045)", derivados(dracBasica).pv, 11);
t.igual("Dracônica básica: origem do PV é calculada", derivados(dracBasica).pvOrigem, "calculado");
t.igual("Feiticeiro dracônico: magias = 3 no 1º nível (sem extra)", derivados(dracBasica).magiasLimite, 3);
t.igual("linhagem ativa aparece nos derivados", derivados(dracBasica).linhagem, "draconica");

const dracSup = ficha({ nivel: 11, caminho: "feiticeiro", linhagem: "draconica", linhagemDano: "frio", atributosBase: car2con1,
  poderes: [{ id: "heranca-aprimorada", nome: "Herança Aprimorada", nivel: 6 }, { id: "heranca-superior", nome: "Herança Superior", nivel: 11 }] });
const pvBaseSup = ctx.t20PVTotal("arcanista", 11, 1);
t.igual("Dracônica superior: PV soma 2 x CAR (não CAR), p045", derivados(dracSup).pv - pvBaseSup, 4);

const dracSemTipo = ficha({ nivel: 1, caminho: "feiticeiro", linhagem: "draconica", linhagemDano: null });
t.igual("Dracônica sem tipo de dano: erro na etapa 5", erros(5, "estrito", dracSemTipo).some(m => /tipo de dano/.test(m)), true);
t.igual("Dracônica com tipo: sem erro de tipo", erros(5, "estrito", dracBasica).some(m => /tipo de dano/.test(m)), false);

const feeSup = ficha({ nivel: 11, caminho: "feiticeiro", linhagem: "feerica", atributosBase: car2con1,
  poderes: [{ id: "heranca-aprimorada", nome: "Herança Aprimorada", nivel: 6 }, { id: "heranca-superior", nome: "Herança Superior", nivel: 11 }] });
t.igual("Feérica superior: +2 em Carisma no valor final (p045)", derivados(feeSup).atributos.carisma, 4);
t.igual("Feérica básica (sem poder): Carisma não muda", derivados(ficha({ nivel: 1, caminho: "feiticeiro", linhagem: "feerica", atributosBase: car2con1 })).atributos.carisma, 2);

const feeBasica = ficha({ nivel: 1, caminho: "feiticeiro", linhagem: "feerica" });
t.igual("Feérica básica: uma magia conhecida a mais (3 + 1 = 4, p045)", derivados(feeBasica).magiasLimite, 4);
t.igual("Feérica: 4 magias no 1º nível sem erro de contagem", erros(9, "estrito", ficha({ nivel: 1, caminho: "feiticeiro", linhagem: "feerica", magias: Array.from({ length: 4 }, (_, i) => ({ circulo: 1, nome: "Magia " + i, livre: true })) })).some(m => /magias conhecidas/.test(m)), false);
t.igual("Feérica: aviso sobre a escola da magia extra", avisos(5, "livre", feeBasica).some(m => /Linhagem Feérica/.test(m)), true);

const rubra = ficha({ nivel: 1, caminho: "feiticeiro", linhagem: "rubra" });
t.igual("Rubra: sem erro de escolha", erros(5, "estrito", rubra).some(m => /linhagem/i.test(m)), false);
t.igual("Rubra: não altera PV nem magias", [derivados(rubra).pv, derivados(rubra).magiasLimite], [8, 3]);

const semFeiticeiro = ficha({ nivel: 1, caminho: "mago", linhagem: "draconica", linhagemDano: "fogo", atributosBase: car2con1 });
t.igual("linhagem fora do Feiticeiro não aplica PV (Mago)", [derivados(semFeiticeiro).linhagem, derivados(semFeiticeiro).pv], [null, 9]);
t.igual("linhagem fora do Feiticeiro gera aviso", avisos(5, "livre", semFeiticeiro).some(m => /só existe no caminho de Feiticeiro/.test(m)), true);

t.igual("Feiticeiro sem linhagem: erro na etapa 5", erros(5, "estrito", ficha({ nivel: 1, caminho: "feiticeiro" })).some(m => /linhagem/i.test(m)), true);

/* ---- Foco do Bruxo (p043): RD 10 e PV = metade dos PV ---- */
const bruxo = ficha({ nivel: 1, caminho: "bruxo", atributosBase: car2con1 });
t.igual("Bruxo: RD do foco = 10 (p043)", derivados(bruxo).foco.rd, 10);
t.igual("Bruxo: PV do foco = metade dos PV (9 PV -> 4, arredondado para baixo)", derivados(bruxo).foco.pv, 4);
t.igual("Mago não tem foco", derivados(ficha({ nivel: 1, caminho: "mago" })).foco, null);
t.igual("Bruxo com PV manual: foco segue o PV digitado", derivados(ficha({ nivel: 1, caminho: "bruxo", pvManual: 20 })).foco.pv, 10);

/* ---- Grimório do Mago (p043): metade das magias conhecidas ---- */
t.igual("exemplo do livro: 7 conhecidas, 3 memorizadas", ctx.t20MagiasMemorizadas({ classe: "arcanista", caminho: "mago" }, 7), 3);
t.igual("Mago nível 1: 4 conhecidas, 2 memorizadas", derivados(ficha({ nivel: 1, caminho: "mago" })).magiasMemorizadas, 2);
t.igual("Bruxo não tem grimório", derivados(bruxo).magiasMemorizadas, null);

/* ---- Magia extra do Mago ao ganhar novo círculo (p043): "uma magia adicional daquele círculo" ---- */
t.igual("Mago: ao ganhar o 2º círculo (5º nível) ganha 1 a mais, além da do nível", lim("arcanista", 5, "mago") - lim("arcanista", 4, "mago"), 2);
t.igual("Mago: no nível sem novo círculo, ganha só 1 (6º nível)", lim("arcanista", 6, "mago") - lim("arcanista", 5, "mago"), 1);
t.igual("Bruxo não ganha a extra de círculo (5º nível: +1 só)", lim("arcanista", 5, "bruxo") - lim("arcanista", 4, "bruxo"), 1);

/* ---- PM por círculo (Tabela 4-1, p176) ---- */
t.igual("custo em PM: 1º a 5º círculo = 1, 3, 6, 10, 15 (p176)", [1, 2, 3, 4, 5].map(c => ctx.t20CustoPMCirculo(c)), [1, 3, 6, 10, 15]);
t.igual("custo em PM de círculo inexistente = null", ctx.t20CustoPMCirculo(6), null);
t.igual("progressão marcada como verificada, com página", [ctx.T20_MAGIAS_PROGRESSAO.verificado, /p176/.test(ctx.T20_MAGIAS_PROGRESSAO.paginaCusto)], [true, true]);
const divergentes = ctx.T20_MAGIAS.filter(m => m.custoPM !== undefined && m.custoPM !== ctx.t20CustoPMCirculo(m.circulo)).map(m => m.nome);
t.igual("custo base de cada magia do catálogo bate com a Tabela 4-1", divergentes, []);

/* ---- Círculo máximo por nível (tabela de cada conjurador, p043 e p063) ---- */
const circ = (classe, nivel, caminho) => { montarPersonagem(ctx, { nome: "C", raca: "humano", classe, caminho: caminho || null, nivel, atributosBase: ZERO }); return ctx.t20CirculoMaximoClasse(classe, nivel); };
t.igual("Arcanista: círculo máximo 1 no 4º, 2 no 5º, 3 no 9º, 4 no 13º, 5 no 17º (p043)", [4, 5, 9, 13, 17].map(n => circ("arcanista", n, "mago")), [1, 2, 3, 4, 5]);
t.igual("Clérigo: círculo máximo 1 no 4º, 2 no 5º e 3 no 9º (p063)", [4, 5, 9].map(n => circ("clerigo", n)), [1, 2, 3]);

t.fim && t.fim();
