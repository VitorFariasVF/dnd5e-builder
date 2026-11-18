/* Backup JSON do investigador: {sistema, versaoEsquema, exportadoEm, estado}.
   Importar valida o sistema e a versão antes de aceitar. Funções puras (sem DOM). */

function exportarBackupJson(estado){
  const pacote = {
    sistema: COC_SISTEMA,
    versaoEsquema: COC_VERSAO_ESQUEMA,
    exportadoEm: new Date().toISOString(),
    estado: garantirEstado(JSON.parse(JSON.stringify(estado)))
  };
  return JSON.stringify(pacote, null, 2);
}

function importarBackupJson(texto){
  let pacote;
  try { pacote = JSON.parse(texto); }
  catch(err){ return { ok: false, erro: "O arquivo não é um JSON válido." }; }
  if(!pacote || typeof pacote !== "object" || Array.isArray(pacote))
    return { ok: false, erro: "O arquivo não tem o formato de backup do investigador." };
  if(pacote.sistema !== COC_SISTEMA)
    return { ok: false, erro: `Este backup é de outro sistema ("${String(pacote.sistema || "sem sistema")}"), não de Call of Cthulhu 7ª ed.` };
  if(pacote.versaoEsquema !== COC_VERSAO_ESQUEMA)
    return { ok: false, erro: `Versão de backup não suportada (${String(pacote.versaoEsquema)}). Esta ferramenta lê a versão ${COC_VERSAO_ESQUEMA}.` };
  if(!pacote.estado || typeof pacote.estado !== "object")
    return { ok: false, erro: "O backup não traz os dados do investigador." };
  const imagem = pacote.estado.investigador && pacote.estado.investigador.imagem;
  if(imagem && !cocImagemValida(imagem))
    return { ok: false, erro: "Imagem do investigador inválida: use JPEG ou PNG em data URL, até 400 KB." };
  return { ok: true, estado: garantirEstado(pacote.estado) };
}
