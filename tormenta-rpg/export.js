/* Backup JSON da ficha: {sistema:"tormenta-rpg", versaoEsquema:1, exportadoEm, personagem}.
   Importar o backup devolve a mesma ficha (testado em tests/backup.test.js).
   Não há exportação para VTT: não existe VTT verificado para este sistema (ver docs/AUDITORIA_TORMENTA_RPG.md). */

function montarBackup(){
  ensureStateShape();
  return {
    sistema: TRPG_META.sistema,
    versaoEsquema: TRPG_META.versaoEsquema,
    exportadoEm: new Date().toISOString(),
    personagem: JSON.parse(JSON.stringify(state.personagem)),
    modo: state.modo
  };
}

/* Lê o texto de um backup. Devolve { ok:true, estado } ou { ok:false, erro }. Não altera `state`. */
function lerBackup(texto){
  let dados;
  try { dados = JSON.parse(texto); }
  catch(err){ return { ok: false, erro: "O arquivo não é um JSON válido." }; }
  if(!dados || typeof dados !== "object" || Array.isArray(dados)) return { ok: false, erro: "O arquivo não tem o formato de ficha." };
  if(dados.sistema !== TRPG_META.sistema) return { ok: false, erro: "Este backup é de outro sistema (" + (dados.sistema || "sem sistema") + ")." };
  if(!Number.isInteger(dados.versaoEsquema) || dados.versaoEsquema < 1) return { ok: false, erro: "Versão do esquema ausente ou inválida." };
  if(dados.versaoEsquema > TRPG_META.versaoEsquema) return { ok: false, erro: "Este backup usa uma versão mais nova do esquema (" + dados.versaoEsquema + ")." };
  if(!dados.personagem || typeof dados.personagem !== "object") return { ok: false, erro: "O backup não contém personagem." };

  const estado = estadoPadrao();
  estado.personagem = Object.assign(estado.personagem, dados.personagem);
  estado.personagem.atributos = Object.assign({}, estado.personagem.atributos, dados.personagem.atributos || {});
  estado.personagem.pericias = Object.assign({}, estado.personagem.pericias, dados.personagem.pericias || {});
  estado.personagem.derivados = Object.assign({}, estado.personagem.derivados, dados.personagem.derivados || {});
  estado.modo = dados.modo === "estrito" ? "estrito" : "livre";
  estado.tela = "ficha";

  const erros = [];
  TRPG_ATRIBUTOS.forEach(a => {
    if(!trpgValidarAtributo(estado.personagem.atributos[a.id])) erros.push(a.nome);
  });
  if(!trpgValidarNivel(estado.personagem.nivel)) erros.push("nível");
  if(erros.length) return { ok: false, erro: "Valores inválidos no backup: " + erros.join(", ") + "." };
  if(!trpgImagemValida(estado.personagem.imagem)) return { ok: false, erro: "Imagem do personagem inválida no backup (use PNG ou JPEG em data URL)." };
  return { ok: true, estado };
}

function nomeArquivoBackup(){
  const nome = (state.personagem.nome || "ficha").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "ficha";
  return "tormenta-rpg-" + nome + ".json";
}
