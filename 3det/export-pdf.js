/* Ficha em PDF (A4, duas páginas) pelo window.print do navegador. Sem recursos externos.
   Paleta própria, anime/arcade: tinta escura sobre papel claro, acento vermelho-laranja.
   Texto de efeito só aparece quando rules.js traz `desc`; senão, a nota de efeito não incluído. */

const TDT_PDF_CORES = {
  papel: "#fbf8f3",
  superficie: "#ffffff",
  tinta: "#15131a",
  suave: "#58525f",
  linha: "#d9d3dc",
  acento: "#e8502a",
  acentoEscuro: "#b8351a"
};

const TDT_NOTA_EFEITO = "Efeito não incluído; consulte o manual.";

function tdtEsc(v){
  return String(v === null || v === undefined ? "" : v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function tdtFmtSinal(n){
  if(n === null || n === undefined) return "a definir";
  return (n > 0 ? "+" : "") + n;
}

function tdtNomeNivel(id){
  if(id === "livre") return "Pontos livres";
  const n = TDT_RULES.niveisDePoder.find(x => x.id === id);
  return n ? n.nome : "Nível a definir";
}

function tdtNomeArquetipo(id){
  const r = tdtArquetipoRegra(id);
  return r ? r.nome : (id ? id : "a definir");
}

function tdtPdfLinhas(lista, vazio){
  return lista.length ? "<ul>" + lista.map(x => "<li>" + x + "</li>").join("") + "</ul>" : `<p class="suave">${tdtEsc(vazio)}</p>`;
}

function tdtPdfPericias(p){
  return tdtPdfLinhas((p.pericias || []).map(id => {
    const r = tdtPericiaRegra(id);
    return tdtEsc(r ? r.nome + (r.alias ? " (no Kit: " + r.alias + ")" : "") : id);
  }), "Nenhuma perícia escolhida.");
}

/* Uma qualidade de Artefato na ficha impressa: nome, escolha (se houver) e custo em XP. Ex.: "Aprimorado +2 (20 XP)". */
function tdtPdfQualidade(q){
  const r = tdtAchar(TDT_RULES.qualidadesArtefato, q.id);
  if(!r) return q.id + " (fora da lista)";
  const xp = tdtCustoQualidadeXP(q);
  const xpTxt = xp === null ? "custo a definir" : (xp > 0 ? "+" : "–") + Math.abs(xp) + " XP";
  let escolha = "";
  if(Array.isArray(r.opcoes)){
    const o = r.opcoes.find(x => x.v === q.escolha);
    escolha = " " + (o ? o.rotulo.replace(/ \(.*\)$/, "") : "faixa a definir");
  } else if(r.escolha === "pericia") escolha = " (" + ((tdtPericiaRegra(q.escolha) || {}).nome || "perícia a definir") + ")";
  else if(r.escolha === "texto") escolha = " (" + (q.escolha ? String(q.escolha).trim() : "alvo a definir") + ")";
  return tdtEsc(r.nome + escolha + " (" + xpTxt + ")");
}

function tdtPdfVantagens(p){
  return tdtPdfLinhas((p.vantagens || []).map(v => {
    const r = tdtVantagemRegra(v.id);
    if(!r) return tdtEsc(v.id + " (fora da lista)");
    const custo = tdtCustoVantagem(v);
    const qtd = r.multiplo && v.qtd > 1 ? " × " + v.qtd : "";
    const nota = r.id === "maestria" ? " · Maestria em " + ((tdtPericiaRegra(v.nota) || {}).nome || "perícia a definir") : (v.nota ? " · " + v.nota : "");
    const tipoItem = r.itens && v.tipo ? " · " + (((TDT_RULES.artefatoTipos || []).find(t => t.id === v.tipo) || {}).nome || v.tipo) : "";
    const efeito = r.desc ? r.desc : TDT_NOTA_EFEITO;
    const quals = r.itens && Array.isArray(v.qualidades) && v.qualidades.length
      ? ". Qualidades: " + v.qualidades.map(tdtPdfQualidade).join("; ") : "";
    return `<strong>${tdtEsc(r.nome)}</strong> (${tdtEsc(custo === null ? "custo a definir" : custo + " pt")}${tdtEsc(qtd)})${tdtEsc(tipoItem)}${tdtEsc(nota)}${quals}. <span class="suave">${tdtEsc(efeito)}</span>`;
  }), "Nenhuma vantagem escolhida.");
}

function tdtPdfDesvantagens(p){
  return tdtPdfLinhas((p.desvantagens || []).map(d => {
    const r = tdtDesvantagemRegra(d.id);
    if(!r) return tdtEsc(d.id + " (fora da lista)");
    const subtipo = d.id === "transtorno" && d.subtipo ? " (" + (((TDT_RULES.transtornosOpcoes || []).find(t => t.id === d.subtipo) || {}).nome || d.subtipo) + ")" : "";
    const nota = d.nota ? " · " + d.nota : "";
    const efeito = r.desc ? r.desc : TDT_NOTA_EFEITO;
    return `<strong>${tdtEsc(r.nome)}${tdtEsc(subtipo)}</strong> (${tdtEsc(d.valor)})${tdtEsc(nota)}. <span class="suave">${tdtEsc(efeito)}</span>`;
  }), "Nenhuma desvantagem escolhida.");
}

function tdtFichaHtml(){
  ensureStateShape();
  const p = state.personagem;
  const rec = tdtRecursos(p);
  const res = tdtResumoPontos(p);
  const nRec = v => v === null ? "a definir" : String(v);
  const atr = TDT_RULES.atributos.map(a => `<div class="atr"><span>${tdtEsc(a.nome)} (${tdtEsc(a.id)})</span><strong>${tdtEsc(p.atributos[a.id] === null ? "—" : p.atributos[a.id])}</strong></div>`).join("");
  const arq = tdtArquetipoRegra(tdtArquetipoId(p));
  const arqTexto = arq
    ? `${tdtEsc(arq.nome)} · custo ${tdtEsc(arq.custo === null ? "NÃO VERIFICADO" : arq.custo)}. Poderes: ${tdtEsc(arq.poderes.length ? arq.poderes.join("; ") : "sem poderes listados")}. Desvantagens do arquétipo: ${tdtEsc((arq.desvantagens || []).join("; ") || "nenhuma")} (não contam no limite de −2). Fonte: ${tdtEsc(arq.fonte)}.`
    : "a definir";
  const temRetrato = tdtImagemValida(p.imagem);
  const pagina1 = `<div class="pagina"><div class="moldura" aria-hidden="true"></div><div class="conteudo">
    <header class="topo${temRetrato ? " comRetrato" : ""}"><div><h1>${tdtEsc(p.nome || "Personagem sem nome")}</h1>
      <p class="linha">${tdtEsc(p.conceito || "Conceito a definir")}</p>
      <p class="meta">Jogador: ${tdtEsc(p.jogador || "—")} · ${tdtEsc(tdtNomeNivel(p.nivelPoder))} · ${tdtEsc(p.pontosTotal === null ? "—" : p.pontosTotal)} pontos</p></div>
      <div class="selo">3DeT Victory<strong>Ficha de criação</strong></div>${temRetrato ? `<img class="retrato" src="${p.imagem}" alt="Imagem do personagem">` : ""}</header>
    <div class="atributos">${atr}</div>
    <div class="recursos">
      <div class="rec"><span>PA · Pontos de Ação</span><strong>${tdtEsc(nRec(rec.PA))}</strong></div>
      <div class="rec"><span>PM · Pontos de Mana</span><strong>${tdtEsc(nRec(rec.PM))}</strong></div>
      <div class="rec"><span>PV · Pontos de Vida</span><strong>${tdtEsc(nRec(rec.PV))}</strong></div>
    </div>
    <section class="secao"><h2>Pontos</h2><p>Disponíveis: <strong>${tdtEsc(nRec(res.disponiveis))}</strong> · Gastos: <strong>${tdtEsc(nRec(res.gastos))}</strong> · Saldo: <strong>${tdtEsc(tdtFmtSinal(res.saldo))}</strong></p>
      <p class="suave">Desvantagens: ${tdtEsc(res.valorDesvantagens === null ? "a definir" : res.valorDesvantagens)} (ganho de ${tdtEsc(nRec(res.pontosDeDesvantagens))} pontos, limite −${TDT_RULES.criacao.desvantagensMax}).</p></section>
    <section class="secao"><h2>Arquétipo</h2><p>${arqTexto}</p></section>
    <p class="rodape">${tdtEsc(TDT_RULES.aviso)} Página 1 de 2.</p>
  </div></div>`;
  const pagina2 = `<div class="pagina"><div class="moldura" aria-hidden="true"></div><div class="conteudo">
    <header class="topo"><div><h1>${tdtEsc(p.nome || "Personagem sem nome")}</h1><p class="meta">Continuação da ficha</p></div><div class="selo">3DeT Victory<strong>Página 2 de 2</strong></div></header>
    <section class="secao"><h2>Perícias</h2>${tdtPdfPericias(p)}</section>
    <section class="secao"><h2>Vantagens</h2>${tdtPdfVantagens(p)}</section>
    <section class="secao"><h2>Desvantagens</h2>${tdtPdfDesvantagens(p)}</section>
    <section class="secao"><h2>História</h2><p>${tdtEsc(p.historia || "—")}</p></section>
    <section class="secao"><h2>Anotações</h2><p>${tdtEsc(p.anotacoes || "—")}</p></section>
    <section class="secao"><h2>Lacunas</h2>${tdtPdfLinhas(TDT_RULES.lacunas.map(tdtEsc), "Nenhuma.")}</section>
    <p class="rodape">${tdtEsc(TDT_RULES.aviso)} Confira no manual oficial. Sem exportação para VTT (lacuna declarada).</p>
  </div></div>`;
  return pagina1 + pagina2;
}

const TDT_PDF_CSS = `
  :root{--papel:${TDT_PDF_CORES.papel};--sup:${TDT_PDF_CORES.superficie};--tinta:${TDT_PDF_CORES.tinta};--suave:${TDT_PDF_CORES.suave};--linha:${TDT_PDF_CORES.linha};--acento:${TDT_PDF_CORES.acento}}
  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4;margin:0}
  html{background:#e9e4ec}
  body{margin:0;font:9.5pt/1.35 Inter,ui-sans-serif,system-ui,Arial,sans-serif;color:var(--tinta)}
  .barra{position:sticky;top:0;z-index:5;display:flex;justify-content:center;gap:12px;padding:10px;background:var(--tinta);color:var(--papel);font-size:13px}
  .barra button{font:inherit;font-weight:700;min-height:40px;padding:0 20px;border-radius:999px;border:0;background:var(--acento);color:#fff;cursor:pointer}
  .pagina{position:relative;width:210mm;min-height:297mm;margin:12px auto;padding:14mm 13mm;background:var(--papel);color:var(--tinta);box-shadow:0 2px 14px rgba(0,0,0,.25);page-break-after:always;break-after:page}
  .pagina:last-of-type{page-break-after:auto;break-after:auto}
  .moldura{position:absolute;inset:6mm;border:1.6pt solid var(--tinta);pointer-events:none}
  .moldura::after{content:"";position:absolute;left:-1.6pt;top:-1.6pt;width:18mm;height:2.4mm;background:var(--acento)}
  .conteudo{position:relative}
  .topo{display:grid;grid-template-columns:1fr auto;gap:5mm;align-items:start;padding:0 3mm;margin-bottom:4mm}
  h1{font:800 22pt/1.02 Impact,"Arial Narrow",Arial,sans-serif;text-transform:uppercase;letter-spacing:.02em;margin:0 0 1mm}
  .linha{font:italic 10.5pt Arial,sans-serif;color:var(--acento);margin:0 0 1mm}
  .meta{font-size:8pt;color:var(--suave);margin:0}
  .topo.comRetrato{grid-template-columns:1fr auto 22mm}
  .retrato{display:block;width:22mm;height:28mm;object-fit:cover;border:1.2pt solid var(--tinta);justify-self:end;background:var(--sup)}
  .selo{text-align:center;font-size:7pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:var(--tinta);padding:2mm 3mm;border-radius:1mm;max-width:40mm}
  .selo strong{display:block;font:700 9pt Arial,sans-serif;letter-spacing:0;text-transform:none;color:#ffd6c7;margin-top:.6mm}
  .atributos{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;margin:0 0 3mm}
  .atr{border:1.2pt solid var(--tinta);background:var(--sup);text-align:center;padding:3mm 2mm}
  .atr span{display:block;font-size:7.5pt;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--suave)}
  .atr strong{display:block;font:800 26pt/1.1 Impact,"Arial Narrow",Arial,sans-serif}
  .recursos{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;margin-bottom:3mm}
  .rec{background:var(--tinta);color:var(--papel);text-align:center;padding:2.5mm 1.5mm;border-left:2mm solid var(--acento)}
  .rec span{display:block;font-size:6.8pt;letter-spacing:.05em;text-transform:uppercase;color:#e7dfd5}
  .rec strong{display:block;font:800 16pt/1.1 Impact,"Arial Narrow",Arial,sans-serif}
  .secao{border:.8pt solid var(--linha);background:var(--sup);padding:2.5mm 3.5mm;margin-bottom:3mm;break-inside:avoid}
  .secao h2{margin:0 0 1.5mm;padding-bottom:1mm;border-bottom:1.2pt solid var(--acento);font:800 10pt Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em}
  .secao p{margin:0 0 1.2mm}
  .secao ul{margin:0;padding-left:5mm}
  .secao li{margin-bottom:1mm}
  .suave{color:var(--suave);font-size:8pt}
  .rodape{font-size:7pt;color:var(--suave);margin-top:4mm;text-align:center}
  @media print{html,body{background:var(--papel)}.barra{display:none}.pagina{margin:0;box-shadow:none}}
`;

function tdtPaginaPdfCompleta(){
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Ficha 3DeT Victory</title><style>${TDT_PDF_CSS}</style></head><body>
    <div class="barra"><span>Ficha 3DeT Victory (Playtest / Kit Introdutório)</span><button type="button" onclick="window.print()">Imprimir ou salvar em PDF</button></div>
    ${tdtFichaHtml()}
  </body></html>`;
}
