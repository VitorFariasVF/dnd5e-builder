/* Backup JSON: exporta, importa de volta e compara. Também recusa arquivo de outro sistema e versão desconhecida. */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Backup Tormenta20");
const ctx = carregar(SCRIPTS);

montarPersonagem(ctx, {
  nome: "Backup Teste", jogador: "Jogador", nivel: 4, raca: "elfo", classe: "bardo", origem: "Artista",
  atributoMagia: "carisma",
  atributosBase: { forca: 0, destreza: 2, constituicao: 1, inteligencia: 0, sabedoria: 1, carisma: 3 },
  ajusteManual: { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 1 },
  origemBeneficios: [{ tipo: "pericia", valor: "Jogatina" }, { tipo: "poder", valor: "Artista Performático" }],
  periciasEscolhidas: ["Artes", "Enganação", "Diplomacia", "Intimidação", "Luta", "Jogatina"],
  poderes: [{ nome: "Inspiração", tipo: "classe", nivel: 3, nota: "uma nota" }],
  magias: [{ nome: "Sono", circulo: 1 }, { nome: "Riso Histérico", circulo: 1 }],
  equipamento: [{ nome: "Alaúde", quantidade: 1, peso: 1 }],
  dinheiro: 40, defesa: { armadura: 2, escudo: 0, outros: 1, nomeArmadura: "Couro", nomeEscudo: "" },
  personalidade: { aparencia: "Alta", historia: "Viajante", tracos: "Curioso" }
});
ctx.state.modo = "livre";
ctx.state.etapa = 9;

const antes = JSON.stringify({ modo: ctx.state.modo, personagem: ctx.state.personagem });
const backup = ctx.t20BackupObjeto();
t.igual("backup leva sistema tormenta20", backup.sistema, "tormenta20");
t.igual("backup leva versaoEsquema 2", backup.versaoEsquema, 2);
const texto = JSON.stringify(backup, null, 2);

/* Round trip: zera o estado e importa o texto */
ctx.resetStateToInitial();
const r = ctx.t20ImportarBackup(texto);
t.igual("importação do backup retorna ok", r.ok, true);
const depois = JSON.stringify({ modo: ctx.state.modo, personagem: ctx.state.personagem });
t.check("round trip: personagem e modo iguais após importar", antes === depois, { antes: antes.length, depois: depois.length });
t.igual("round trip: etapa restaurada", ctx.state.etapa, 9);

/* Recusas */
t.igual("recusa JSON inválido", ctx.t20LerBackup("{nao é json").ok, false);
t.igual("recusa outro sistema (dnd5e)", ctx.t20LerBackup(JSON.stringify({ sistema: "dnd5e", versaoEsquema: 1, personagem: {} })).ok, false);
t.igual("recusa versão de esquema desconhecida (3)", ctx.t20LerBackup(JSON.stringify({ sistema: "tormenta20", versaoEsquema: 3, personagem: {} })).ok, false);
t.igual("aceita esquema 2 (atual)", ctx.t20LerBackup(JSON.stringify({ sistema: "tormenta20", versaoEsquema: 2, personagem: {} })).ok, true);
t.igual("recusa backup sem personagem", ctx.t20LerBackup(JSON.stringify({ sistema: "tormenta20", versaoEsquema: 1 })).ok, false);
t.igual("aceita backup mínimo válido", ctx.t20LerBackup(JSON.stringify({ sistema: "tormenta20", versaoEsquema: 1, personagem: {} })).ok, true);
t.igual("mensagem de erro para sistema errado", ctx.t20LerBackup(JSON.stringify({ sistema: "coc7", versaoEsquema: 1, personagem: {} })).erro, "Este arquivo não é de Tormenta20.");

/* Backup antigo com campos faltando: ensureStateShape completa sem perder o que existe */
const antigo = JSON.stringify({ sistema: "tormenta20", versaoEsquema: 1, modo: "estrito", personagem: { nome: "Antigo", classe: "cavaleiro" } });
ctx.t20ImportarBackup(antigo);
t.igual("backup parcial mantém o nome", ctx.state.personagem.nome, "Antigo");
t.igual("backup parcial recebe a lista de benefícios", ctx.state.personagem.origemBeneficios.length, 2);
t.igual("backup parcial recebe a lista de atributos", Object.keys(ctx.state.personagem.atributosBase).length, 6);

t.fim();
