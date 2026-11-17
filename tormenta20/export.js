/* Exportações: backup JSON (importável de volta) e JSON de ator para Foundry VTT.
   O backup leva { sistema, versaoEsquema }. Esquema 2 (atual): inclui PV, PM e treino digitados à mão, poderes e
   magias do catálogo. Esquema 1 (anterior) ainda é importado: ensureStateShape completa os campos novos.
   A importação recusa arquivo de outro sistema ou versão desconhecida.
   O JSON de Foundry é um rascunho: nomes de campo não foram conferidos com o sistema Tormenta20 do Foundry
   e não foi testado em VTT real (ver docs/AUDITORIA_TORMENTA20.md). */

function t20BackupObjeto(){
  ensureStateShape();
  return {
    sistema: T20_SISTEMA,
    versaoEsquema: T20_VERSAO_ESQUEMA,
    edicao: T20_EDICAO,
    exportadoEm: new Date().toISOString(),
    modo: state.modo,
    etapa: state.etapa,
    personagem: JSON.parse(JSON.stringify(state.personagem))
  };
}

/* Lê um texto JSON de backup. Retorna { ok, erro, dados }. Não altera o estado. */
function t20LerBackup(texto){
  let obj;
  try { obj = JSON.parse(texto); }
  catch(err){ return { ok: false, erro: "O arquivo não é um JSON válido." }; }
  if(!obj || typeof obj !== "object") return { ok: false, erro: "O arquivo não tem os dados da ficha." };
  if(obj.sistema !== T20_SISTEMA) return { ok: false, erro: "Este arquivo não é de Tormenta20." };
  const aceitas = [T20_VERSAO_ESQUEMA_ANTERIOR, T20_VERSAO_ESQUEMA];
  if(!aceitas.includes(obj.versaoEsquema)) return { ok: false, erro: `Versão de backup ${obj.versaoEsquema} não suportada (aceitas: ${aceitas.join(" e ")}).` };
  if(!obj.personagem || typeof obj.personagem !== "object") return { ok: false, erro: "Backup sem os dados do personagem." };
  return { ok: true, dados: obj };
}

function t20ImportarBackup(texto){
  const r = t20LerBackup(texto);
  if(!r.ok) return r;
  state.modo = (r.dados.modo === "estrito" || r.dados.modo === "livre") ? r.dados.modo : null;
  state.etapa = Number(r.dados.etapa) || 1;
  state.personagem = r.dados.personagem;
  state.currentHistoryId = null;
  ensureStateShape();
  salvarEstado();
  return { ok: true };
}

/* Rascunho de ator para Foundry VTT (documento de ator genérico, tipo "character").
   Campos de `system` são nomes deste app: não conferidos com o sistema do Foundry. */
function t20FoundryAtor(p, d){
  const d2 = d || t20Derivados(p);
  const c = T20_CLASSES[p.classe] || {};
  const itens = [];
  (p.poderes || []).forEach(pd => itens.push({ name: pd.nome, type: "poder", system: { tipo: pd.tipo, nivel: pd.nivel, nota: pd.nota || "" } }));
  (p.magias || []).forEach(m => itens.push({ name: m.nome, type: "magia", system: { circulo: m.circulo } }));
  (p.equipamento || []).forEach(e => itens.push({ name: e.nome, type: "equipamento", system: { quantidade: e.quantidade, peso: e.peso || 0 } }));
  return {
    name: p.nome || "Personagem sem nome",
    type: "character",
    img: "icons/svg/mystery-man.svg",
    system: {
      nivel: p.nivel,
      raca: (T20_RACAS_COMPLETAS[p.raca] || {}).nome || "",
      classe: c.nome || "",
      origem: p.origem || "",
      atributos: Object.fromEntries(T20_ATRIBUTO_IDS.map(id => [id, { valor: d2.atributos[id], modificador: d2.modificadores[id] }])),
      pv: { valor: d2.pv, max: d2.pv },
      pm: { valor: d2.pm, max: d2.pm },
      defesa: { valor: d2.defesa },
      deslocamento: { valor: d2.deslocamento },
      bonusTreino: d2.bonusTreino,
      pericias: Object.fromEntries(d2.pericias.filter(x => x.treinada).map(x => [x.nome, { atributo: x.attr, treinada: true, bonus: x.bonus }])),
      dinheiro: p.dinheiro || 0
    },
    items: itens,
    flags: {
      "tormenta20-builder": {
        sistema: T20_SISTEMA,
        versaoEsquema: T20_VERSAO_ESQUEMA,
        aviso: "Rascunho NÃO TESTADO em VTT real. Nomes de campo não conferidos com o sistema Tormenta20 do Foundry."
      }
    }
  };
}

function t20BaixarArquivo(conteudo, nomeArquivo, tipo){
  try {
    const blob = new Blob([conteudo], { type: tipo || "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = nomeArquivo;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch(err){ console.warn("Falha ao baixar arquivo:", err); }
}
function t20NomeBase(){
  const n = (state.personagem.nome || "personagem").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return n || "personagem";
}
function t20ExportarBackup(){
  t20BaixarArquivo(JSON.stringify(t20BackupObjeto(), null, 2), `tormenta20-${t20NomeBase()}.json`);
}
function t20ExportarFoundry(){
  const d = t20Derivados(state.personagem);
  t20BaixarArquivo(JSON.stringify(t20FoundryAtor(state.personagem, d), null, 2), `foundry-tormenta20-${t20NomeBase()}.json`);
}
