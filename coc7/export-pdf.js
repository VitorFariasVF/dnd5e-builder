/* Dossiê do investigador em PDF (A4, 2 páginas) por window.print: estilo pergaminho antigo, com cor própria.
   Toda a arte é SVG próprio (olho, moldura, rótulos). Nenhum recurso externo, então funciona offline.
   gerarHtmlDossie é pura (sem janela) para os testes e a verificação em Chrome. */

const COC_PDF_CORES = {
  papel: "#e6d3a8", superficie: "#f2e4c4", tinta: "#2a1c10", suave: "#5a4530", linha: "#a88b5c",
  sangue: "#7a2418", ouro: "#7d5a22"
};

function cocEscapar(v){
  return String(v == null ? "" : v).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
function cocNum(v){ return v == null ? "—" : String(v); }

/* Olho de Cthulhu estilizado, desenho próprio (traço simples). */
function cocEmblemaOlho(){
  return `<svg class="olho" viewBox="0 0 120 80" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 40 Q60 -6 114 40 Q60 86 6 40 Z"/><circle cx="60" cy="40" r="16"/><circle cx="60" cy="40" r="5" fill="currentColor"/>
    <path d="M60 4 V12 M60 68 V76 M24 40 H14 M96 40 H106" stroke-width="1.2"/></svg>`;
}

function cocCssDossie(){
  return `
  :root{--papel:${COC_PDF_CORES.papel};--sup:${COC_PDF_CORES.superficie};--tinta:${COC_PDF_CORES.tinta};--suave:${COC_PDF_CORES.suave};--linha:${COC_PDF_CORES.linha};--sangue:${COC_PDF_CORES.sangue};--ouro:${COC_PDF_CORES.ouro};--serifa:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;--sans:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Arial,sans-serif}
  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4;margin:0}
  html{background:#cbb88d}
  body{margin:0;font:8.6pt/1.32 var(--sans);color:var(--tinta)}
  .barra{position:sticky;top:0;z-index:5;display:flex;justify-content:center;gap:12px;padding:10px;background:var(--tinta);color:var(--papel);font-size:13px}
  .barra button{font:inherit;font-weight:600;min-height:40px;padding:0 20px;border-radius:999px;border:1px solid var(--ouro);background:#e6d3a8;color:#2a1c10;cursor:pointer}
  .pagina{position:relative;width:210mm;height:297mm;margin:12px auto;padding:11mm 12mm;overflow:hidden;background:var(--papel);background-image:radial-gradient(ellipse at 20% 10%,rgba(255,250,235,.7),transparent 60%),radial-gradient(ellipse at 90% 95%,rgba(122,36,24,.10),transparent 55%);box-shadow:0 6px 24px rgba(0,0,0,.35);page-break-after:always;break-after:page}
  .pagina:last-child{page-break-after:auto;break-after:auto}
  .moldura{position:absolute;inset:5mm;border:1.2px solid var(--ouro);pointer-events:none}
  .moldura::after{content:"";position:absolute;inset:1.6mm;border:.5px solid var(--linha)}
  .cab{display:grid;grid-template-columns:1fr 34mm;gap:4mm;align-items:center;border-bottom:1px solid var(--linha);padding-bottom:3mm;margin-bottom:3.5mm}
  .kicker{font:700 7pt var(--sans);letter-spacing:.22em;text-transform:uppercase;color:var(--sangue)}
  h1{font:700 22pt/1.05 var(--serifa);margin:1mm 0 1mm}
  .sub{color:var(--suave);font-size:8.6pt}
  .olho{width:34mm;height:auto;color:var(--sangue)}
  h2{font:700 9.5pt var(--serifa);text-transform:uppercase;letter-spacing:.08em;color:var(--sangue);margin:0 0 1.6mm;padding-bottom:.8mm;border-bottom:.6px solid var(--linha)}
  section{margin-bottom:3.5mm}
  .duas{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
  table{width:100%;border-collapse:collapse}
  th,td{padding:.5mm 1mm;text-align:left;border-bottom:.4px solid var(--linha);vertical-align:top}
  th{font:700 7pt var(--sans);text-transform:uppercase;letter-spacing:.06em;color:var(--suave)}
  td.n,th.n{text-align:right;font-variant-numeric:tabular-nums}
  td.v{font:700 11pt var(--serifa);text-align:center}
  .vitais{display:grid;grid-template-columns:repeat(4,1fr);gap:1.6mm}
  .vital{border:.8px solid var(--ouro);background:var(--sup);border-radius:1.5mm;padding:1.6mm 1.8mm;text-align:center}
  .vital b{display:block;font:700 15pt var(--serifa);color:var(--tinta)}
  .vital span{font:700 6.6pt var(--sans);text-transform:uppercase;letter-spacing:.07em;color:var(--suave)}
  .aviso{font-size:7.4pt;color:var(--suave);border-left:2px solid var(--sangue);padding:.6mm 2mm;margin:1.5mm 0}
  .txt{white-space:pre-wrap;margin:0 0 1.6mm}
  .rot{font:700 7pt var(--sans);text-transform:uppercase;letter-spacing:.06em;color:var(--suave)}
  .anotacoes .linhas{height:88mm;border:.6px solid var(--linha);border-radius:1.5mm;background-image:linear-gradient(var(--linha) .4px,transparent .4px);background-size:100% 7mm;background-position:0 6mm}
  .rodape{position:absolute;left:12mm;right:12mm;bottom:9mm;display:flex;justify-content:space-between;font-size:6.8pt;color:var(--suave)}
  @media print{html{background:var(--papel)}.barra{display:none}.pagina{margin:0;box-shadow:none}}`;
}

function cocBlocoCaracteristicas(inv, fin){
  const linhas = COC_CARACTERISTICAS.map(c => {
    const v = fin[c.id];
    return `<tr><td>${c.sigla}</td><td>${cocEscapar(c.nome)}</td><td class="v">${cocNum(v)}</td><td class="n">${Math.floor(v / 2)}</td><td class="n">${Math.floor(v / 5)}</td></tr>`;
  }).join("");
  return `<section><h2>Características</h2><table><thead><tr><th>Sigla</th><th>Nome</th><th class="n">Valor</th><th class="n">Metade</th><th class="n">Quinto</th></tr></thead><tbody>${linhas}</tbody></table></section>`;
}

function cocBlocoVitais(estado, der){
  const inv = estado.investigador;
  const dano = der.danoConhecido ? `${der.dano}` : "não calc.";
  const corpo = der.danoConhecido ? `${der.corpo >= 0 && der.corpo !== 0 ? "+" : ""}${der.corpo}` : "—";
  return `<div class="vitais">
    <div class="vital"><b>${der.pv}</b><span>Pontos de vida</span></div>
    <div class="vital"><b>${der.sanInicial}</b><span>Sanidade (máx. ${der.sanMax})</span></div>
    <div class="vital"><b>${cocNum(der.sorte)}</b><span>Sorte</span></div>
    <div class="vital"><b>${der.pm}</b><span>Pontos de magia</span></div>
    <div class="vital"><b>${der.mov}</b><span>Movimento</span></div>
    <div class="vital"><b>${cocEscapar(dano)}</b><span>Dano</span></div>
    <div class="vital"><b>${cocEscapar(corpo)}</b><span>Corpo</span></div>
    <div class="vital"><b>${cocEscapar(String(inv.idade ?? "—"))}</b><span>Idade</span></div>
  </div>`;
}

function cocBlocoPericias(inv){
  const lista = calcPericias(inv);
  const meio = Math.ceil(lista.length / 2);
  const linha = p => `<tr><td>${cocEscapar(p.nome)}${p.espec ? ` <i>(${cocEscapar(p.espec)})</i>` : ""}</td><td class="n">${p.total}</td><td class="n">${p.metade}</td><td class="n">${p.quinto}</td></tr>`;
  const tabela = parte => `<table><thead><tr><th>Perícia</th><th class="n">Total</th><th class="n">½</th><th class="n">⅕</th></tr></thead><tbody>${parte.map(linha).join("")}</tbody></table>`;
  return `<section><h2>Perícias</h2><div class="duas"><div>${tabela(lista.slice(0, meio))}</div><div>${tabela(lista.slice(meio))}</div></div></section>`;
}

function cocBlocoOcupacao(estado){
  const inv = estado.investigador;
  const o = cocOcupacao(inv.ocupacaoId);
  const r = resumoCriacao(inv);
  const credito = cocTotalPericia(inv, "credito", caracteristicasFinais(inv));
  return `<section><h2>Ocupação</h2>
    <p class="txt"><b>${cocEscapar(o ? o.nome : "Sem ocupação")}</b>${o ? ` · Crédito ${credito}% (faixa ${o.credito[0]} a ${o.credito[1]}%)` : ""}</p>
    <p class="txt">Pontos de ocupação: ${r.gastoOcupacao} de ${r.poolOcupacao}. Pontos de interesse pessoal: ${r.gastoInteresse} de ${r.poolInteresse}.</p>
  </section>`;
}

function cocBlocoAntecedentes(inv){
  const a = inv.antecedentes || {};
  const campo = (rot, v) => `<p class="txt"><span class="rot">${rot}</span><br>${cocEscapar(v || "—")}</p>`;
  return `<section><h2>Antecedentes</h2>
    ${campo("Descrição", a.descricao)}${campo("Aparência", a.aparencia)}${campo("Personalidade", a.personalidade)}
    ${campo("Ferimentos e cicatrizes", a.ferimentos)}${campo("Fobias e manias", a.fobias)}${campo("História", a.historia)}
  </section>`;
}

function cocBlocoEquipamento(inv){
  return `<section><h2>Equipamento</h2><p class="txt">${cocEscapar(inv.equipamento || "—")}</p></section>`;
}

function cocBlocoIdade(inv){
  const idade = Number(inv.idade);
  if(!Number.isInteger(idade)) return "";
  const reg = aplicarIdade(Object.fromEntries(COC_CARACTERISTICAS.map(c => [c.id, Number(inv.caracteristicas[c.id]) || 0])), idade, inv.escolhasIdade, inv.melhoriasEdu).registro;
  const texto = r => r.faixa === "Teste de EDU"
    ? (r.valor > 0 ? `Teste de EDU: passou e ganhou +${r.valor} de EDU` : "Teste de EDU: não passou, sem ganho")
    : `${r.faixa}: ${r.alvo.toUpperCase()} ${r.valor}`;
  const itens = reg.map(r => `<li>${cocEscapar(texto(r))}</li>`).join("");
  return `<section><h2>Ajustes de idade</h2><ul>${itens || "<li>Nenhum ajuste.</li>"}</ul>
    <p class="aviso">Regras de idade NÃO VERIFICADAS em parte: reduções de APA e de FOR/CON/DES a partir de 50 anos, testes de EDU a partir de 40 e valores de 15 a 19 anos. Confira no livro antes de usar.</p></section>`;
}

function gerarHtmlDossie(estado){
  const inv = garantirEstado(estado).investigador;
  const fin = caracteristicasFinais(inv) || Object.fromEntries(COC_CARACTERISTICAS.map(c => [c.id, 0]));
  const der = calcDerivados(inv) || { pv: 0, sanInicial: 0, sanMax: 99, pm: 0, sorte: null, mov: 8, danoConhecido: false, dano: null, corpo: null };
  const o = cocOcupacao(inv.ocupacaoId);
  const epoca = estado.epoca === "moderna" ? "Época moderna" : "Época clássica (1920)";
  const modo = estado.modo === "livre" ? "Modo livre" : "Modo estrito";
  const sub = [o ? o.nome : "Sem ocupação", epoca, modo].join(" · ");
  const nome = cocEscapar(inv.nome || "Investigador sem nome");
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Dossiê — ${nome}</title>
  <style>${cocCssDossie()}</style></head><body>
  <div class="barra"><span>Dossiê do investigador (A4, 2 páginas)</span><button type="button" onclick="window.print()">Imprimir / Salvar PDF</button></div>
  <article class="pagina"><div class="moldura" aria-hidden="true"></div>
    <header class="cab"><div><div class="kicker">Call of Cthulhu · 7ª edição · Dossiê do investigador</div>
      <h1>${nome}</h1><div class="sub">${cocEscapar(sub)}</div></div>${cocEmblemaOlho()}</header>
    <div class="duas"><div>${cocBlocoCaracteristicas(inv, fin)}</div>
      <div><section><h2>Vitais e derivados</h2>${cocBlocoVitais(estado, der)}
        <p class="aviso">Sanidade inicial = POD. Pontos de magia = POD ÷ 5. Movimento = 8 (Quick-Start), com −1 a cada faixa de 40 anos em diante. Movimento condicional da regra completa: conflito, não aplicado.</p></section></div></div>
    ${cocBlocoPericias(inv)}
    <div class="rodape"><span>Ficha de uso pessoal. Mecânica de Call of Cthulhu 7ª edição (Chaosium).</span><span>Página 1 de 2</span></div>
  </article>
  <article class="pagina"><div class="moldura" aria-hidden="true"></div>
    <header class="cab"><div><div class="kicker">Dossiê · continuação</div><h1>${nome}</h1><div class="sub">${cocEscapar(sub)}</div></div>${cocEmblemaOlho()}</header>
    <div class="duas"><div>${cocBlocoOcupacao(estado)}${cocBlocoIdade(inv)}${cocBlocoEquipamento(inv)}</div><div>${cocBlocoAntecedentes(inv)}</div></div>
    <section class="anotacoes"><h2>Anotações de jogo</h2><div class="linhas" aria-hidden="true"></div></section>
    <div class="rodape"><span>Gerado pelo criador de fichas VF Tools.</span><span>Página 2 de 2</span></div>
  </article>
  <script>window.addEventListener('load',function(){(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){setTimeout(function(){window.print()},350)})});</script>
  </body></html>`;
}

function exportarPDF(estado){
  const popup = window.open("", "_blank");
  if(!popup){
    if(typeof mostrarToast === "function") mostrarToast("Permita pop-ups para exportar o dossiê em PDF.", true);
    return false;
  }
  popup.document.open();
  popup.document.write(gerarHtmlDossie(estado));
  popup.document.close();
  return true;
}
