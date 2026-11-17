/* Ficha em PDF (A4, 2 páginas) pelo window.print do navegador. Arte em SVG/CSS próprio, sem recursos externos.
   Tema de pergaminho (paleta do VF Tools para impressão). Cor de destaque por classe: TRPG_ACENTOS, vazio até
   as classes serem verificadas; enquanto isso, todas usam o destaque padrão. */

const TRPG_PDF_CORES = { papel: "#f7f1e7", superficie: "#fffaf1", tinta: "#201a14", suave: "#5e5446", linha: "#ddd2c0", ouro: "#8a5200", ouroClaro: "#c98a1f" };
const TRPG_ACENTOS = {};

function trpgEsc(v){
  return String(v === null || v === undefined ? "" : v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function trpgAcentoDaClasse(classeKey){
  return TRPG_ACENTOS[classeKey] || TRPG_PDF_CORES.ouro;
}

function trpgEscudoPdf(attr, valor, mod, cor){
  const rotulo = trpgEsc(attr.abrev);
  return `<svg class="escudo" viewBox="0 0 90 108" role="img" aria-label="${trpgEsc(attr.nome)} ${trpgEsc(valor)}, modificador ${trpgEsc(trpgFormatarBonus(mod))}">
    <path d="M45 3 L84 13 V56 Q84 88 45 105 Q6 88 6 56 V13 Z" fill="${TRPG_PDF_CORES.superficie}" stroke="${cor}" stroke-width="2.4"/>
    <path d="M45 9 L78 17.5 V56 Q78 83 45 98 Q12 83 12 56 V17.5 Z" fill="none" stroke="${TRPG_PDF_CORES.ouroClaro}" stroke-width=".8"/>
    <text x="45" y="27" text-anchor="middle" font-size="8" font-weight="700" fill="${cor}">${rotulo}</text>
    <text x="45" y="62" text-anchor="middle" font-size="26" font-weight="700" fill="${TRPG_PDF_CORES.tinta}">${trpgEsc(trpgFormatarBonus(mod))}</text>
    <circle cx="45" cy="82" r="13" fill="${TRPG_PDF_CORES.papel}" stroke="${cor}" stroke-width="1.6"/>
    <text x="45" y="87" text-anchor="middle" font-size="14" font-weight="700" fill="${TRPG_PDF_CORES.tinta}">${trpgEsc(valor)}</text>
  </svg>`;
}

function trpgSecaoPdf(titulo, corpo){
  return `<section class="secao"><h2>${trpgEsc(titulo)}</h2>${corpo}</section>`;
}

function trpgLinhasPdf(texto, vazio){
  const linhas = String(texto || "").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  return linhas.length ? "<ul>" + linhas.map(l => "<li>" + trpgEsc(l) + "</li>").join("") + "</ul>" : `<p class="suave">${trpgEsc(vazio)}</p>`;
}

function trpgFichaHtml(){
  ensureStateShape();
  const p = state.personagem;
  const d = trpgDerivados(p);
  const cor = trpgAcentoDaClasse(p.classe);
  const naoDefinido = "a definir (NÃO VERIFICADO)";
  const pvMax = d.pvMaximo === null ? "—" : d.pvMaximo;
  const pvAtual = p.derivados.pvAtuais === null ? "—" : p.derivados.pvAtuais;
  const escudos = TRPG_ATRIBUTOS.map(a => trpgEscudoPdf(a, p.atributos[a.id], d.modificadores[a.id], cor)).join("");
  const disp = p.pericias.pontosDisponiveis === null ? naoDefinido : p.pericias.pontosDisponiveis;
  const pagina1 = `<div class="pagina"><div class="moldura" aria-hidden="true"></div><div class="conteudo">
    <header class="topo" style="--cor:${cor}">
      <div class="marca" style="color:${cor}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2 21 7v10l-9 5-9-5V7z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></div>
      <div><h1>${trpgEsc(p.nome || "Personagem sem nome")}</h1>
        <p class="linha-classe">${trpgEsc(p.classe || "Classe a definir")} · ${trpgEsc(p.raca || "Raça a definir")} · Nível ${trpgEsc(p.nivel)}</p>
        <p class="meta">Jogador: ${trpgEsc(p.jogador || "—")} · ${trpgEsc(TRPG_META.edicao)}</p></div>
      <div class="selo">Tormenta RPG<strong>Ficha de nível ${trpgEsc(p.nivel)}</strong></div>
    </header>
    <div class="atributos">${escudos}</div>
    <div class="vitais">
      <div class="vital pv"><span>PV máximo</span><strong>${trpgEsc(pvMax)}</strong><small>atuais: ${trpgEsc(pvAtual)}</small></div>
      <div class="vital"><span>Armadura (CA)</span><strong>${trpgEsc(d.ca === null ? "—" : d.ca)}</strong><small>10 + bônus + Des + tamanho</small></div>
      <div class="vital"><span>Iniciativa</span><strong>${trpgEsc(trpgFormatarBonus(d.iniciativa))}</strong><small>hipótese, NÃO VERIFICADO</small></div>
      <div class="vital"><span>Deslocamento</span><strong>${trpgEsc(p.derivados.deslocamento || "—")}</strong><small>a confirmar</small></div>
      <div class="vital"><span>Ataque base</span><strong>—</strong><small>${naoDefinido}</small></div>
    </div>
    ${trpgSecaoPdf("Identidade", `<dl class="pares"><dt>Aparência</dt><dd>${trpgEsc(p.aparencia || "—")}</dd><dt>História</dt><dd>${trpgEsc(p.historia || "—")}</dd></dl>`)}
    ${trpgSecaoPdf("Raça e classe", `<p>${trpgEsc(TRPG_PENDENTES.racas)}</p><p>${trpgEsc(TRPG_PENDENTES.classes)}</p>`)}
    ${trpgSecaoPdf("Testes de resistência", `<p class="suave">${naoDefinido}</p>`)}
    <p class="rodape">Regras de guias de fãs, não conferidas com o livro oficial. Fórmulas: ${trpgEsc(TRPG_REGRAS.modificador.fonte)}. Página 1 de 2.</p>
  </div></div>`;
  const pagina2 = `<div class="pagina"><div class="moldura" aria-hidden="true"></div><div class="conteudo">
    <header class="topo" style="--cor:${cor}"><div></div><div><h1>${trpgEsc(p.nome || "Personagem sem nome")}</h1><p class="meta">Continuação da ficha</p></div><div class="selo">Tormenta RPG<strong>Página 2 de 2</strong></div></header>
    ${trpgSecaoPdf("Perícias", `<p>Pontos disponíveis: ${trpgEsc(disp)}. Graduações gastas: ${trpgEsc(p.pericias.graduacoesGastas)}.</p><p class="suave">${trpgEsc(TRPG_PENDENTES.pericias)}</p>`)}
    ${trpgSecaoPdf("Talentos", trpgLinhasPdf(p.talentos, "Nenhum talento registrado."))}
    ${trpgSecaoPdf("Magias", trpgLinhasPdf(p.magias, "Nenhuma magia registrada."))}
    ${trpgSecaoPdf("Equipamento", trpgLinhasPdf(p.equipamento, "Nenhum item registrado."))}
    ${trpgSecaoPdf("Dinheiro", `<p>${trpgEsc(p.dinheiro)} (unidade a confirmar: NÃO VERIFICADO)</p>`)}
    ${trpgSecaoPdf("Observações", `<p class="suave">${trpgEsc(TRPG_PENDENTES.vtt)}</p>`)}
    <p class="rodape">Regras de guias de fãs, não conferidas com o livro oficial. Gerado no VF Tools. Dados de regra com fonte registrada em docs/AUDITORIA_TORMENTA_RPG.md.</p>
  </div></div>`;
  return pagina1 + pagina2;
}

const TRPG_PDF_CSS = `
  :root{--papel:${TRPG_PDF_CORES.papel};--sup:${TRPG_PDF_CORES.superficie};--tinta:${TRPG_PDF_CORES.tinta};--suave:${TRPG_PDF_CORES.suave};--linha:${TRPG_PDF_CORES.linha};--ouro:${TRPG_PDF_CORES.ouro}}
  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4;margin:0}
  html{background:#e9e1d2}
  body{margin:0;font:10pt/1.35 Inter,ui-sans-serif,system-ui,Arial,sans-serif;color:var(--tinta)}
  .barra{position:sticky;top:0;z-index:5;display:flex;justify-content:center;gap:12px;padding:10px;background:var(--tinta);color:var(--papel);font-size:13px}
  .barra button{font:inherit;font-weight:600;min-height:40px;padding:0 20px;border-radius:999px;border:1px solid var(--ouro);background:#f0b254;color:#1a1206;cursor:pointer}
  .pagina{position:relative;width:210mm;height:297mm;margin:12px auto;padding:14mm 13mm;background:var(--papel);color:var(--tinta);box-shadow:0 2px 14px rgba(0,0,0,.25);page-break-after:always;break-after:page;overflow:hidden}
  .pagina:last-of-type{page-break-after:auto;break-after:auto}
  .moldura{position:absolute;inset:6mm;border:1.4pt solid var(--ouro);border-radius:2mm;pointer-events:none}
  .conteudo{position:relative;height:100%}
  .topo{display:grid;grid-template-columns:20mm 1fr auto;gap:5mm;align-items:center;padding:0 3mm;margin-bottom:3mm}
  .marca{width:18mm;height:18mm;border:1.2pt solid currentColor;border-radius:50%;display:grid;place-items:center}
  .marca svg{width:10mm;height:10mm}
  h1{font:600 22pt/1.05 Georgia,"Palatino Linotype",serif;margin:0 0 1mm}
  .linha-classe{font:italic 11pt Georgia,serif;color:var(--cor,var(--ouro));margin:0 0 1mm}
  .meta{font-size:8.5pt;color:var(--suave);margin:0}
  .selo{text-align:center;font-size:7.5pt;letter-spacing:.06em;text-transform:uppercase;color:var(--ouro);border:1pt solid var(--ouro);border-radius:2mm;padding:2mm 3mm;max-width:36mm}
  .selo strong{display:block;font:600 9pt Georgia,serif;letter-spacing:0;text-transform:none;color:var(--tinta);margin-top:.5mm}
  .atributos{display:grid;grid-template-columns:repeat(6,1fr);gap:2.5mm;margin:0 0 3mm}
  .escudo{width:100%;height:auto}
  .vitais{display:grid;grid-template-columns:repeat(5,1fr);gap:2.5mm;margin-bottom:3mm}
  .vital{border:1pt solid var(--ouro);border-radius:2.5mm;background:var(--sup);text-align:center;padding:2mm 1mm}
  .vital span{display:block;font-size:7pt;letter-spacing:.08em;text-transform:uppercase;color:var(--suave);font-weight:700}
  .vital strong{display:block;font:600 16pt/1.1 Georgia,serif}
  .vital small{display:block;font-size:6.5pt;color:var(--suave)}
  .vital.pv{background:var(--tinta);color:var(--papel)}.vital.pv span,.vital.pv small{color:#e0d3bd}
  .secao{border:.7pt solid var(--linha);border-radius:2.5mm;background:var(--sup);padding:2.5mm 3.5mm;margin-bottom:3mm;break-inside:avoid}
  .secao h2{margin:0 0 1.5mm;padding-bottom:1.2mm;border-bottom:.7pt solid var(--ouro);font:600 11pt Georgia,serif;color:var(--tinta)}
  .secao p{margin:0 0 1.2mm}
  .secao ul{margin:0;padding-left:5mm}
  .pares{display:grid;grid-template-columns:22mm 1fr;gap:1mm 3mm;margin:0}
  .pares dt{font-weight:700;color:var(--suave)}.pares dd{margin:0}
  .suave{color:var(--suave);font-size:8.5pt}
  .rodape{font-size:7.5pt;color:var(--suave);margin-top:4mm;text-align:center}
  @media print{html,body{background:var(--papel)}.barra{display:none}.pagina{margin:0;box-shadow:none}}
`;

function trpgPaginaPdfCompleta(){
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${trpgEsc(state.personagem.nome || "Ficha")} - Tormenta RPG</title><style>${TRPG_PDF_CSS}</style></head><body>
    <div class="barra"><button type="button" onclick="window.print()">Salvar como PDF</button></div>
    ${trpgFichaHtml()}</body></html>`;
}
