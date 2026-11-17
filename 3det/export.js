/* Backup JSON da ficha: {sistema:"3DeT Victory", versaoEsquema:1, exportadoEm, estado:{modo, personagem}}.
   Importar o backup devolve a mesma ficha (testado em tests/backup.test.js).
   Não há exportação para VTT: lacuna declarada em rules.js (lacunas) e em docs/AUDITORIA_3DET.md. */

const TDT_SISTEMA = "3DeT Victory";
const TDT_VERSAO_ESQUEMA = 1;

function montarBackup(){
  ensureStateShape();
  return {
    sistema: TDT_SISTEMA,
    versaoEsquema: TDT_VERSAO_ESQUEMA,
    exportadoEm: new Date().toISOString(),
    estado: {
      modo: state.modo,
      personagem: JSON.parse(JSON.stringify(state.personagem))
    }
  };
}

/* Lê o texto de um backup. Devolve { ok:true, estado } ou { ok:false, erro }. Não altera `state`. */
function lerBackup(texto){
  let dados;
  try { dados = JSON.parse(texto); }
  catch(err){ return { ok: false, erro: "O arquivo não é um JSON válido." }; }
  if(!dados || typeof dados !== "object" || Array.isArray(dados)) return { ok: false, erro: "O arquivo não tem o formato de ficha." };
  if(dados.sistema !== TDT_SISTEMA) return { ok: false, erro: "Este backup é de outro sistema (" + (dados.sistema || "sem sistema") + ")." };
  if(!Number.isInteger(dados.versaoEsquema) || dados.versaoEsquema < 1) return { ok: false, erro: "Versão do esquema ausente ou inválida." };
  if(dados.versaoEsquema > TDT_VERSAO_ESQUEMA) return { ok: false, erro: "Este backup usa uma versão mais nova do esquema (" + dados.versaoEsquema + ")." };
  if(!dados.estado || typeof dados.estado !== "object" || !dados.estado.personagem || typeof dados.estado.personagem !== "object"){
    return { ok: false, erro: "O backup não contém personagem." };
  }

  const base = estadoPadrao();
  const pessoa = dados.estado.personagem;
  base.personagem = Object.assign(base.personagem, pessoa);
  base.personagem.atributos = Object.assign({}, base.personagem.atributos, pessoa.atributos || {});
  base.modo = dados.estado.modo === "estrito" ? "estrito" : "livre";
  base.tela = "ficha";

  const erros = [];
  TDT_RULES.atributos.forEach(a => {
    const v = base.personagem.atributos[a.id];
    const ok = v === null || (Number.isInteger(v) && v >= TDT_RULES.criacao.atributoMin && v <= TDT_RULES.criacao.atributoMax);
    if(!ok) erros.push(a.nome);
  });
  if(!TDT_RULES.niveisDePoder.some(x => x.id === base.personagem.nivelPoder) && base.personagem.nivelPoder !== "livre") erros.push("nível de poder");
  if(!Number.isInteger(base.personagem.pontosTotal) && base.personagem.pontosTotal !== null) erros.push("pontos totais");
  if(erros.length) return { ok: false, erro: "Valores inválidos no backup: " + erros.join(", ") + "." };
  return { ok: true, estado: base };
}

function nomeArquivoBackup(){
  const nome = (state.personagem.nome || "ficha").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "ficha";
  return "3det-victory-" + nome + ".json";
}
