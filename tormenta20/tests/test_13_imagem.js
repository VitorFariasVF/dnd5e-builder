/* Imagem do personagem: validação, salvamento local, backup JSON (importação recusa imagem inválida) e PDF. */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Imagem do personagem Tormenta20");
const ctx = carregar(SCRIPTS);

/* localStorage de teste: o storage.js só grava com localStorage disponível (sem VFTool). */
const memoria = {};
ctx.localStorage = {
  getItem: k => (k in memoria ? memoria[k] : null),
  setItem: (k, v) => { memoria[k] = String(v); },
  removeItem: k => { delete memoria[k]; }
};

const JPEG_OK = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAEAAQDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAHCf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ADoDFU3/2Q==";
const PNG_OK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAEAQMAAACT";

montarPersonagem(ctx, {
  nome: "Imagem Teste", jogador: "Jogador", nivel: 2, raca: "humano", classe: "guerreiro", origem: "Soldado",
  origemBeneficios: [{ tipo: "pericia", valor: "Luta" }, { tipo: "pericia", valor: "Vontade" }],
  periciasEscolhidas: ["Atletismo", "Intimidação"],
  personalidade: { aparencia: "Alto", historia: "Veterano", tracos: "Calmo" }
});
ctx.state.modo = "livre";
ctx.state.etapa = 2;

/* Validação */
t.check("estado inicial sem imagem", ctx.state.personagem.imagem === "");
t.check("aceita data:image/jpeg em base64", ctx.t20ImagemValida(JPEG_OK));
t.check("aceita data:image/png em base64 (importação)", ctx.t20ImagemValida(PNG_OK));
t.check("rejeita svg, html, gif, javascript, aspas e vazio", [
  "data:image/svg+xml;base64,PHN2Zz4=", "data:text/html;base64,PGI+", "data:image/gif;base64,R0lGODlhAQABAAAA",
  "javascript:alert(1)", "data:image/jpeg;base64,", 'data:image/jpeg;base64,AAAA"onerror="x', "", null, 7
].every(v => !ctx.t20ImagemValida(v)));
t.check("rejeita imagem acima de 400 mil caracteres", !ctx.t20ImagemValida("data:image/jpeg;base64," + "A".repeat(400001)));

/* Persistência local */
ctx.state.personagem.imagem = JPEG_OK;
ctx.salvarEstado();
ctx.resetStateToInitial();
ctx.carregarEstado();
t.igual("salvar com imagem, recarregar: imagem preservada", ctx.state.personagem.imagem, JPEG_OK);
t.igual("recarregar mantém o nome da ficha", ctx.state.personagem.nome, "Imagem Teste");

ctx.state.personagem.imagem = "";
ctx.salvarEstado();
ctx.resetStateToInitial();
ctx.carregarEstado();
t.igual("ficha sem imagem salva e recarregada com imagem vazia", ctx.state.personagem.imagem, "");

delete ctx.state.personagem.imagem;
ctx.ensureStateShape();
t.igual("ficha antiga, sem o campo imagem, abre sem erro", ctx.state.personagem.imagem, "");

ctx.state.personagem.imagem = "data:text/html;base64,PGI+";
ctx.ensureStateShape();
t.igual("imagem inválida guardada no estado é descartada", ctx.state.personagem.imagem, "");

/* Backup JSON */
ctx.state.personagem.imagem = JPEG_OK;
const backup = JSON.parse(JSON.stringify(ctx.t20BackupObjeto()));
t.igual("backup leva a imagem", backup.personagem.imagem, JPEG_OK);
const ida = ctx.t20ImportarBackup(JSON.stringify(backup));
t.check("importa backup com imagem", ida.ok === true);
t.igual("backup com imagem: imagem restaurada", ctx.state.personagem.imagem, JPEG_OK);

const backupPng = JSON.parse(JSON.stringify(ctx.t20BackupObjeto()));
backupPng.personagem.imagem = PNG_OK;
t.check("importa backup com PNG válido", ctx.t20ImportarBackup(JSON.stringify(backupPng)).ok === true && ctx.state.personagem.imagem === PNG_OK);

const backupAntigo = JSON.parse(JSON.stringify(ctx.t20BackupObjeto()));
delete backupAntigo.personagem.imagem;
t.check("backup antigo, sem imagem, importa", ctx.t20ImportarBackup(JSON.stringify(backupAntigo)).ok === true);
t.igual("backup antigo: imagem vazia e nome preservado", [ctx.state.personagem.imagem, ctx.state.personagem.nome], ["", "Imagem Teste"]);

ctx.state.personagem.imagem = JPEG_OK;
ctx.state.personagem.nome = "Nome Atual";
const invalido = JSON.parse(JSON.stringify(ctx.t20BackupObjeto()));
invalido.personagem.imagem = "data:image/svg+xml;base64,PHN2Zz4=";
invalido.personagem.nome = "Outro Nome";
const r = ctx.t20ImportarBackup(JSON.stringify(invalido));
t.check("backup com imagem inválida é recusado", r.ok === false && /Imagem/.test(r.erro));
t.igual("backup recusado não altera a ficha atual", [ctx.state.personagem.nome, ctx.state.personagem.imagem], ["Nome Atual", JPEG_OK]);

/* PDF */
const comFoto = ctx.t20GerarHtmlFicha(ctx.state);
t.check("PDF com imagem: retrato no cabeçalho da primeira página", comFoto.includes('<img class="retrato" src="' + JPEG_OK + '"') && comFoto.includes('<header class="topo comRetrato"'));
ctx.state.personagem.imagem = "";
const semFoto = ctx.t20GerarHtmlFicha(ctx.state);
t.check("PDF sem imagem: sem retrato", !semFoto.includes('<img class="retrato"') && !semFoto.includes('<header class="topo comRetrato"'));

t.fim();
