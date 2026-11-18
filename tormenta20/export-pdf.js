/* Ficha em PDF (A4, 2 páginas) para imprimir / salvar pelo navegador.
   Tema pergaminho com a cor da classe no cabeçalho e nas seções. Toda a arte é CSS e SVG próprio
   (funciona offline). Gera uma string HTML: testável em Node.
   Valores sem fonte de 2 aparecem com "não verificado" (PV, PM, treino, círculo, habilidades, tipo de poder). */

const T20_PDF_PALETA = { papel: "#f4ead2", superficie: "#fbf5e4", tinta: "#2a2118", suave: "#6b5a44", linha: "#d8c7a3" };
const T20_PDF_COR_PADRAO = "#8a5200";

function t20Esc(s){
  return String(s == null ? "" : s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
function t20PdfCor(classeId){ return (T20_CLASSES[classeId] || {}).cor || T20_PDF_COR_PADRAO; }

function t20PdfEscudo(sigla, valor, mod){
  return `<div class="escudo"><svg viewBox="0 0 90 108" role="img" aria-label="${t20Esc(sigla)} ${valor}"><path d="M45 3 L84 13 V56 Q84 88 45 105 Q6 88 6 56 V13 Z" style="fill:${T20_PDF_PALETA.superficie};stroke:var(--cor)" stroke-width="2.4"/><text x="45" y="26" text-anchor="middle" font-size="9" font-weight="700" letter-spacing=".6" style="fill:var(--cor)">${t20Esc(sigla)}</text><text x="45" y="63" text-anchor="middle" font-size="30" font-weight="700" style="fill:${T20_PDF_PALETA.tinta}">${t20Esc(t20FormatarBonus(mod))}</text><circle cx="45" cy="84" r="12" style="fill:${T20_PDF_PALETA.papel};stroke:var(--cor)" stroke-width="1.6"/><text x="45" y="88.5" text-anchor="middle" font-size="12" font-weight="700" style="fill:${T20_PDF_PALETA.tinta}">${t20Esc(valor)}</text></svg></div>`;
}
function t20PdfVital(rotulo, valor, sub, destaque){
  return `<div class="vital${destaque ? " pv" : ""}"><span>${t20Esc(rotulo)}</span><strong>${t20Esc(valor)}</strong><small>${t20Esc(sub || "")}</small></div>`;
}
function t20PdfSecao(titulo, corpo, extra){
  return `<section class="secao ${extra || ""}"><h2>${t20Esc(titulo)}</h2>${corpo}</section>`;
}
function t20PdfLista(itens, vazio){
  const l = (itens || []).filter(Boolean);
  return l.length ? `<ul>${l.join("")}</ul>` : `<p class="suave">${t20Esc(vazio)}</p>`;
}
function t20PdfMoedas(dinheiro){ return `${t20Esc(dinheiro)} T$ <span class="pequeno">(valor digitado; inicial 4d6 T$, p146)</span>`; }

/* Texto do PV, PM e treino: origem (calculado, à mão ou não verificado) e se os dados têm 2 fontes. */
function t20PdfSubPV(d){
  if(d.pv === null) return "não verificado";
  if(d.pvOrigem === "manual") return "digitado à mão";
  return d.pvVerificado ? "pontos de vida" : "pontos de vida (1 fonte)";
}
function t20PdfSubPM(d){
  if(d.pm === null) return "não verificado";
  if(d.pmOrigem === "manual") return "digitado à mão";
  return d.pmVerificado ? "pontos de mana" : "pontos de mana (1 fonte)";
}

function t20PdfProgressao(d, nivel){
  if(nivel <= T20_NIVEL_BASE) return `<p class="pequeno">Níveis 1 a ${T20_NIVEL_BASE}: habilidades de classe não cadastradas neste app (NÃO VERIFICADO).</p>`;
  const linhas = d.niveis.map(r => {
    const habs = r.habilidades.map(h => `${t20Esc(h.nome)}${h.frase ? `: ${t20Esc(h.frase)}` : ` <span class="nv">(efeito NÃO VERIFICADO)</span>`}`).join("; ");
    return `<tr><td class="num">${r.nivel}</td><td class="num">${r.pv === null ? "<span class=\"nv\">—</span>" : t20Esc(t20FormatarBonus(r.pv))}</td><td class="num">${r.pm === null ? "<span class=\"nv\">—</span>" : t20Esc(t20FormatarBonus(r.pm))}</td><td class="num">${r.treino === null ? "<span class=\"nv\">—</span>" : t20Esc(t20FormatarBonus(r.treino))}</td><td class="num">${r.circulo === null ? "<span class=\"nv\">—</span>" : t20Esc(r.circulo)}</td><td>${habs || "<span class=\"suave\">—</span>"}</td></tr>`;
  }).join("");
  return `<table class="niveis"><thead><tr><th>Nível</th><th class="num">PV +</th><th class="num">PM +</th><th class="num">Treino</th><th class="num">Círculo</th><th>Habilidades de classe</th></tr></thead><tbody>${linhas}</tbody></table>
    <p class="pequeno">Valores do Livro Básico (Jogo do Ano), em conferência. O que não foi lido com segurança é NÃO VERIFICADO.</p>`;
}

function t20GerarHtmlFicha(st){
  const s = st || state;
  const p = s.personagem;
  const d = t20Derivados(p);
  const cls = T20_CLASSES[p.classe] || {};
  const cor = t20PdfCor(p.classe);
  const raca = t20RacaInfo(p.raca);
  const subtitulo = [cls.nome ? `${cls.nome} ${p.nivel}` : "Classe não escolhida", raca ? raca.nome : "", p.origem].filter(Boolean).map(t20Esc).join(" · ");
  const nomes = t20PericiaNomesTreinadosOrdem(d);
  const notas = [];
  if(cls.nome && d.pv === null) notas.push(`PV de ${cls.nome}: não calculado (fontes divergem); preencher à mão.`);
  else if(cls.nome && d.pvOrigem !== "manual" && !d.pvVerificado) notas.push(`PV de ${cls.nome}: 1 fonte (NÃO VERIFICADO).`);
  if(cls.nome && d.pm === null) notas.push(`PM de ${cls.nome}: não calculado; preencher à mão.`);
  if(p.nivel > T20_NIVEL_BASE) notas.push(`Níveis 6 a ${p.nivel}: dados do Livro Básico, em conferência; confira no seu exemplar.`);
  if(raca) notas.push(`Raça ${raca.nome}: dados de 1 fonte, exceto os marcados como confirmados.`);
  notas.push("Resistências fortes por classe: NÃO VERIFICADO. Perícia não treinada = metade do nível + atributo (p120).");
  notas.push("Dinheiro inicial: 4d6 T$ (p146), não rolado pelo app; poderes gerais por nível e armas e armaduras: NÃO VERIFICADO.");

  const atributos = T20_ATRIBUTOS.map(a => t20PdfEscudo(a.sigla, d.atributos[a.id], d.modificadores[a.id])).join("");
  const deslSub = d.deslocamento === null ? "não verificado" : (raca && raca.verificado.deslocamento ? "pela raça" : "pela raça (1 fonte)");
  const vitais = [
    t20PdfVital("PV", d.pv === null ? "—" : d.pv, t20PdfSubPV(d), true),
    t20PdfVital("PM", d.pm === null ? "—" : d.pm, t20PdfSubPM(d), false),
    t20PdfVital("Defesa", d.defesa, "10 + DES + armaduras", false),
    t20PdfVital("Deslocamento", d.deslocamento === null ? "—" : `${d.deslocamento} m`, deslSub, false),
    t20PdfVital("Treino", t20FormatarBonus(d.bonusTreino), d.treinoOrigem === "manual" ? "digitado à mão" : "metade do nível (1 fonte)", false)
  ].join("");

  const linhasPericias = d.pericias.map(x => `<tr class="${x.treinada ? "" : "nao"}"><td>${x.treinada ? "●" : "○"}</td><td>${t20Esc(x.nome)} <span class="pequeno">(${t20Esc(T20_ATRIBUTOS.find(a => a.id === x.attr).sigla)})</span></td><td class="num">${x.treinada ? t20FormatarBonus(x.bonus) : t20FormatarBonus(d.atributos[x.attr])}</td></tr>`).join("");

  const beneficios = (p.origemBeneficios || []).filter(b => b.valor).map(b => `<li>${b.tipo === "pericia" ? "Perícia" : "Poder"}: ${t20Esc(b.valor)}</li>`);
  const fixas = [...(cls.fixas || []).map(n => `<li>${t20Esc(n)} <span class="pequeno">(fixa)</span></li>`)];
  const magiaAtr = d.atributoMagia ? T20_ATRIBUTO_NOME[d.atributoMagia] : "";
  const resumoClasse = [
    cls.conjurador ? `Conjurador: ${t20Esc(magiaAtr)}; círculo máximo ${d.circuloMaximo === null ? "NÃO VERIFICADO" : t20Esc(d.circuloMaximo)}` : "Sem conjuração neste app",
    cls.forte ? `Resistência forte: ${t20Esc(cls.forte)}` : "Resistência forte: NÃO VERIFICADO"
  ];

  const poderes = (p.poderes || []).length
    ? `<table><thead><tr><th>Poder</th><th>Tipo</th><th>Nível</th></tr></thead><tbody>${p.poderes.map(pd => {
        const cat = pd.id ? T20_PODERES[pd.id] || null : null;
        const tipo = cat ? (cat.tipo ? t20TipoRotulo(cat.tipo) : "não verificado") : (t20TipoRotulo(pd.tipo) || (pd.tipo ? pd.tipo : "—"));
        const marca = cat && !cat.verificado ? `<br><span class="pequeno">1 fonte (NÃO VERIFICADO)</span>` : "";
        const nota = pd.nota ? `<br><span class="pequeno">${t20Esc(pd.nota)}</span>` : "";
        const atr = cat && cat.id === T20_AUMENTO_ID && pd.atributo ? ` <span class="pequeno">(+1 em ${t20Esc(T20_ATRIBUTO_NOME[pd.atributo])})</span>` : "";
        return `<tr><td>${t20Esc(pd.nome)}${atr}${marca}${nota}</td><td>${t20Esc(tipo)}</td><td class="num">${t20Esc(pd.nivel)}</td></tr>`;
      }).join("")}</tbody></table>`
    : `<p class="suave">Nenhum poder registrado.</p>`;

  let magias = `<p class="suave">Classe sem conjuração neste app.</p>`;
  if(cls.conjurador){
    const porCirculo = {};
    let algumPendente = false;
    (p.magias || []).forEach(m => {
      const cat = t20MagiaCatalogo(m.nome);
      if(cat && cat.pendente) algumPendente = true;
      (porCirculo[m.circulo] = porCirculo[m.circulo] || []).push(`${m.nome}${cat && cat.pendente ? "*" : ""}`);
    });
    const linhas = Object.keys(porCirculo).sort().map(c => `<li><strong>${t20Esc(c)}º círculo:</strong> ${porCirculo[c].map(t20Esc).join(", ")}</li>`);
    const nota = algumPendente ? `<p class="pequeno">* Execução, alcance e duração NÃO VERIFICADOS (só o índice de uma fonte).</p>` : "";
    magias = `<p class="pequeno">Círculo máximo no nível ${p.nivel}: ${d.circuloMaximo === null ? "NÃO VERIFICADO" : t20Esc(d.circuloMaximo)}. Magias conhecidas neste nível: ${d.magiasLimite}.</p>${t20PdfLista(linhas, "Nenhuma magia registrada.")}${nota}`;
  }

  const equip = (p.equipamento || []).length
    ? `<table><thead><tr><th>Item</th><th>Qtd</th></tr></thead><tbody>${p.equipamento.map(e => `<tr><td>${t20Esc(e.nome)}</td><td class="num">${t20Esc(e.quantidade)}</td></tr>`).join("")}</tbody></table>`
    : `<p class="suave">Nenhum item registrado.</p>`;

  const racaTxt = raca ? [
    `<li><strong>Tamanho</strong>: ${raca.tamanho ? t20Esc(raca.tamanho) + (raca.verificado.tamanho ? "" : " <span class=\"nv\">(1 fonte)</span>") : "<span class=\"nv\">NÃO VERIFICADO</span>"}</li>`,
    `<li><strong>Deslocamento</strong>: ${raca.deslocamento !== null ? t20Esc(raca.deslocamento) + " m" : "<span class=\"nv\">NÃO VERIFICADO</span>"}</li>`,
    `<li><strong>Ajustes</strong>: ${raca.ajustes ? Object.entries(raca.ajustes).map(([k, v]) => `${t20Esc(T20_ATRIBUTO_NOME[k])} ${t20Esc(t20FormatarBonus(v))}`).join(", ") + (raca.verificado.ajustes ? "" : " <span class=\"nv\">(1 fonte)</span>") : "<span class=\"nv\">NÃO VERIFICADO</span>"}</li>`
  ] : [];
  const tracos = raca ? raca.habilidades.map(h => `<li><strong>${t20Esc(h.nome)}</strong>: ${t20Esc(h.efeito)}</li>`) : [];

  const pers = p.personalidade || {};
  const temRetrato = t20ImagemValida(p.imagem);
  const cabecalho = `<header class="topo${temRetrato ? " comRetrato" : ""}"><div class="brasao" style="--cor:${cor}"><span>${t20Esc((cls.nome || "T").charAt(0))}</span></div><div class="titulo"><h1>${t20Esc(p.nome || "Personagem sem nome")}</h1><p class="linha-classe" style="--cor:${cor}">${subtitulo}</p><p class="meta">Jogador: ${t20Esc(p.jogador || "—")} · Modo: ${t20Esc(s.modo || "—")} · ${t20Esc(T20_EDICAO)}</p></div><div class="selo" style="--cor:${cor}">Tormenta20<strong>${s.modo === "estrito" ? "Ficha em modo estrito" : "Ficha em modo livre"}</strong></div>${temRetrato ? `<img class="retrato" src="${p.imagem}" alt="Imagem do personagem">` : ""}</header>`;
  const rodape = n => `<div class="rodape">Dados do Livro Básico, ainda em conferência · Criador de fichas RPG · VF Tools · Tormenta20 · página ${n} de 2</div>`;

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${t20Esc(p.nome || "Ficha")} — Ficha Tormenta20</title><style>${T20_PDF_CSS}</style></head><body>
  <div class="barra"><span>Pré-visualização da ficha (A4, 2 páginas)</span><button type="button" onclick="window.print()">Imprimir / Salvar PDF</button></div>
  <article class="pagina" style="--cor:${cor}"><div class="moldura"></div><div class="conteudo">
    ${cabecalho}
    <div class="atributos">${atributos}</div>
    <div class="vitais">${vitais}</div>
    <div class="colunas">
      <div>${t20PdfSecao("Perícias", `<table class="pericias"><tbody>${linhasPericias}</tbody></table><p class="pequeno">● treinada · ○ não treinada (bônus não verificado)</p>`)}</div>
      <div>
        ${t20PdfSecao("Classe", `${t20PdfLista(fixas, "Sem perícias fixas registradas.")}<p class="pequeno">${resumoClasse.join(" · ")}</p>`)}
        ${t20PdfSecao("Origem", t20PdfLista(beneficios, "Escolha dois benefícios."))}
        ${t20PdfSecao("Defesa", `<p>10 + DES ${t20FormatarBonus(d.atributos.destreza)} + armadura ${t20Esc(p.defesa.armadura || 0)}${p.defesa.nomeArmadura ? ` (${t20Esc(p.defesa.nomeArmadura)})` : ""} + escudo ${t20Esc(p.defesa.escudo || 0)} + outros ${t20Esc(p.defesa.outros || 0)} = <strong>${d.defesa}</strong></p>`)}
        ${t20PdfSecao("Notas de verificação", t20PdfLista(notas.map(n => `<li>${t20Esc(n)}</li>`), ""), "")}
      </div>
    </div>
    ${rodape(1)}
  </div></article>
  <article class="pagina" style="--cor:${cor}"><div class="moldura"></div><div class="conteudo">
    <div class="fluxo">
      ${t20PdfSecao("Poderes", poderes, "longa")}
      ${t20PdfSecao("Magias", magias, "longa")}
      ${p.nivel > T20_NIVEL_BASE ? t20PdfSecao("Progressão de classe (6º ao " + t20Esc(p.nivel) + "º)", t20PdfProgressao(d, p.nivel), "longa") : ""}
      ${t20PdfSecao("Equipamento", `${equip}<p class="pequeno">${t20PdfMoedas(p.dinheiro || 0)}</p>`)}
      ${t20PdfSecao("Raça", t20PdfLista([...racaTxt, ...tracos], "Sem raça escolhida."))}
      ${t20PdfSecao("Aparência", `<p class="texto">${t20Esc(pers.aparencia || "—")}</p>`)}
      ${t20PdfSecao("Personalidade", `<p class="texto">${t20Esc(pers.tracos || "—")}</p>`)}
      ${t20PdfSecao("História", `<p class="texto">${t20Esc(pers.historia || "—")}</p>`, "longa")}
    </div>
    ${rodape(2)}
  </div></article>
  </body></html>`;
}

function t20PericiaNomesTreinadosOrdem(d){ return d.pericias.filter(x => x.treinada).map(x => x.nome); }

const T20_PDF_CSS = `
  :root{--papel:${T20_PDF_PALETA.papel};--sup:${T20_PDF_PALETA.superficie};--tinta:${T20_PDF_PALETA.tinta};--suave:${T20_PDF_PALETA.suave};--linha:${T20_PDF_PALETA.linha};--serifa:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;--sans:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Arial,sans-serif}
  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4;margin:0}
  html{background:#e4d8bd}
  body{margin:0;font:9.5pt/1.35 var(--sans);color:var(--tinta)}
  .barra{position:sticky;top:0;z-index:5;display:flex;justify-content:center;gap:12px;padding:10px;background:var(--tinta);color:var(--papel);font-size:13px}
  .barra button{font:inherit;font-weight:600;min-height:40px;padding:0 20px;border-radius:999px;border:1px solid #c98a1f;background:#f0b254;color:#1a1206;cursor:pointer}
  .pagina{position:relative;width:210mm;height:297mm;margin:12px auto;padding:14mm 13mm 13mm;background:var(--papel);color:var(--tinta);box-shadow:0 2px 14px rgba(0,0,0,.25);page-break-after:always;break-after:page;overflow:hidden}
  .pagina:last-of-type{page-break-after:auto;break-after:auto}
  .pagina{background:radial-gradient(ellipse at 50% 45%,transparent 60%,rgba(120,80,20,.10) 100%),var(--papel)}
  .moldura{position:absolute;inset:5mm;border:1.2pt solid var(--cor);border-radius:2mm;pointer-events:none}
  .moldura::after{content:"";position:absolute;inset:1.4mm;border:.5pt solid var(--cor);border-radius:1mm}
  .conteudo{position:relative;padding-bottom:10mm}
  .topo{display:grid;grid-template-columns:20mm 1fr auto;gap:4mm;align-items:center;padding:3mm 4mm;border-radius:2mm;background:linear-gradient(90deg,color-mix(in srgb,var(--cor) 16%,transparent),transparent 78%);border-left:1.8mm solid var(--cor);margin-bottom:3mm}
  .topo.comRetrato{grid-template-columns:20mm 1fr auto 21mm}
  .retrato{display:block;width:21mm;height:26mm;object-fit:cover;border:1pt solid var(--cor);border-radius:1.5mm;justify-self:end;background:var(--sup)}
  .brasao{width:19mm;height:19mm;border-radius:50%;border:1.6pt solid var(--cor);display:grid;place-items:center;background:var(--sup);color:var(--cor)}
  .brasao span{font:700 22pt var(--serifa)}
  h1{font:600 22pt/1.05 var(--serifa);margin:0 0 1mm}
  .linha-classe{display:inline-block;margin:0 0 1mm;padding:.8mm 5mm;color:var(--papel);background:var(--cor);font:italic 10pt var(--serifa);clip-path:polygon(0 0,100% 0,calc(100% - 3mm) 50%,100% 100%,0 100%,3mm 50%)}
  .meta{margin:0;font-size:8pt;color:var(--suave)}
  .selo{text-align:center;font-size:7pt;letter-spacing:.06em;text-transform:uppercase;color:var(--cor);border:1pt solid var(--cor);border-radius:2mm;padding:2mm 3mm;max-width:32mm}
  .selo strong{display:block;font:600 8.5pt var(--serifa);letter-spacing:0;text-transform:none;color:var(--tinta);margin-top:.5mm}
  .atributos{display:grid;grid-template-columns:repeat(6,1fr);gap:2mm;margin:0 0 3mm}
  .escudo svg{width:100%;height:auto;display:block}
  .vitais{display:grid;grid-template-columns:repeat(5,1fr);gap:2mm;margin-bottom:3mm}
  .vital{border:1pt solid var(--cor);border-radius:2.5mm;background:var(--sup);text-align:center;padding:1.8mm 1mm}
  .vital span{display:block;font-size:6.5pt;letter-spacing:.1em;text-transform:uppercase;color:var(--suave);font-weight:700}
  .vital strong{display:block;font:600 16pt/1.1 var(--serifa)}
  .vital small{display:block;font-size:6.5pt;color:var(--suave)}
  .vital.pv{background:var(--tinta);color:var(--papel)}.vital.pv span,.vital.pv small{color:#e0d3bd}
  .colunas{display:grid;grid-template-columns:1.1fr .9fr;gap:3mm;align-items:start}
  .fluxo{column-count:2;column-gap:3mm}
  .secao{border:.7pt solid var(--linha);border-radius:2.5mm;background:var(--sup);padding:2.5mm 3mm;margin-bottom:2.5mm;break-inside:avoid}
  .secao.longa{break-inside:auto}
  .secao h2{margin:0 0 1.5mm;padding-bottom:1mm;border-bottom:.7pt solid var(--cor);font:600 10pt var(--serifa);color:var(--tinta)}
  .secao p{margin:0 0 1.2mm}.secao ul{margin:0;padding:0 0 0 3mm}
  .secao li{padding:.6mm 0}
  table{width:100%;border-collapse:collapse;font-size:8pt}
  th{font-size:6.5pt;letter-spacing:.06em;text-transform:uppercase;color:var(--suave);text-align:left;padding:0 1mm 1mm}
  td{padding:.4mm 1mm;border-bottom:.4pt dotted var(--linha);vertical-align:top}
  td.num{text-align:right;font-weight:700;white-space:nowrap}
  table.niveis{font-size:6.8pt}
  table.niveis td{padding:.3mm .8mm}
  .pericias td:first-child{width:4mm;color:var(--cor)}
  .pericias tr.nao td{color:var(--suave)}
  .suave{color:var(--suave)}.pequeno{font-size:7pt;color:var(--suave)}
  .nv{font-weight:700;color:var(--cor)}
  .texto{white-space:pre-wrap}
  .rodape{position:absolute;left:0;right:0;bottom:6mm;text-align:center;font-size:6.5pt;color:var(--suave);letter-spacing:.04em}
  @media screen and (max-width:820px){.pagina{zoom:.44;margin:6px auto}.barra{position:relative}}
  @media print{html{background:var(--papel)}.barra{display:none}.pagina{margin:0;box-shadow:none;zoom:1}}
`;

function t20ExportarPDF(){
  const popup = window.open("", "_blank");
  if(!popup){
    if(typeof window !== "undefined" && typeof window.mostrarToast === "function") window.mostrarToast("Permita pop-ups para exportar o PDF.", true);
    return;
  }
  popup.document.open();
  popup.document.write(t20GerarHtmlFicha(state));
  popup.document.close();
}
