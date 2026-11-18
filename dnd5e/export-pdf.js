/* Ficha em PDF (A4) com arte estilizada.
   Abre uma janela com a ficha pronta para imprimir / salvar como PDF pelo navegador.
   Toda a arte é SVG/CSS próprio (molduras, cantos, escudos de atributo, símbolos de classe, d20): nenhum recurso externo,
   então funciona offline. As cores seguem o tema claro do VF Tools (pergaminho + âmbar). */

const PDF_CORES = { papel:'#f7f1e7', superficie:'#fffaf1', tinta:'#201a14', suave:'#5e5446', linha:'#ddd2c0', ouro:'#8a5200', ouroClaro:'#c98a1f' };
const PDF_CORES_BASE = Object.assign({}, PDF_CORES);
/* Cor de destaque por classe (tons escuros: contraste ≥ 4,5:1 sobre o pergaminho). */
const PDF_ACENTOS = { barbaro:'#9a2a14', bardo:'#8c2f6b', bruxo:'#5b3a9a', clerigo:'#7a5a00', druida:'#2f6b2a', feiticeiro:'#a0420f', guerreiro:'#475569', ladino:'#334155', mago:'#2f45a8', monge:'#0f6a78', paladino:'#8a5200', patrulheiro:'#1f6b4f' };
function pdfAplicarAcento(classeKey){
  Object.assign(PDF_CORES, PDF_CORES_BASE);
  const c = PDF_ACENTOS[classeKey]; if(!c) return;
  const n = parseInt(c.slice(1), 16), mix = v => Math.round(v + (255 - v) * .28).toString(16).padStart(2, '0');
  PDF_CORES.ouro = c; PDF_CORES.ouroClaro = '#' + mix(n >> 16) + mix((n >> 8) & 255) + mix(n & 255);
}
/* Ícones (24×24, traço) para vitais e seções. */
const PDF_ICONES = {
  'PV máximo':'<path d="M12 21s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 6-8 11-8 11z"/>',
  'Armadura':'<path d="M12 3 20 6v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z"/>',
  'Iniciativa':'<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>',
  'Deslocamento':'<path d="M4 17h9l3-4 4 1v3H4zM8 17v-5h4"/>',
  'Proficiência':'<path d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/>',
  'Perícias':'<circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/>',
  'Resistências':'<path d="M12 3 20 6v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  'Ataques':'<path d="M5 19 19 5M14 4h6v6M5 19l-2 2M7 13l4 4"/>',
  'Habilidades de classe':'<path d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/>',
  'Subclasse':'<path d="M12 3v8M12 11 6 17M12 11l6 6M6 17v4M18 17v4"/>',
  'Recursos':'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
  'Magias':'<path d="M12 2 14 9l7 3-7 3-2 7-2-7-7-3 7-3z"/>',
  'Traços e talentos':'<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15M5 19l8-8"/>',
  'Inventário':'<path d="M6 8h12l2 12H4zM9 8V6a3 3 0 0 1 6 0v2"/>',
  'Personalidade':'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.500 2.500 4 2.500S16 14 16 14M9 9.500h.01M15 9.500h.01"/>',
  'Aparência':'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7"/>',
  'História':'<path d="M6 3h11a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2zM6 17a2 2 0 0 1 2-2h11M10 8h6"/>'
};
function pdfIcone(nome, cls){
  const g = PDF_ICONES[nome];
  return g ? `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round">${g}</svg>` : '';
}
const PDF_ABREV = { forca:'FOR', destreza:'DES', constituicao:'CON', inteligencia:'INT', sabedoria:'SAB', carisma:'CAR' };

/* Símbolos de classe (24×24, traço) — desenhos próprios, simples e genéricos. */
const PDF_GLIFOS = {
  barbaro:'<path d="M6 20 L16 6"/><path d="M12 4 Q18 2 20 8 Q16 9 13 8 Z"/>',
  bardo:'<ellipse cx="9" cy="16" rx="5" ry="4"/><path d="M13 13 L20 5"/><path d="M7 16 H11"/>',
  bruxo:'<path d="M2 12 Q12 3 22 12 Q12 21 2 12 Z"/><circle cx="12" cy="12" r="3"/>',
  clerigo:'<circle cx="12" cy="12" r="4"/><path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M5 5 L7 7 M17 17 L19 19 M19 5 L17 7 M7 17 L5 19"/>',
  druida:'<path d="M5 19 Q4 8 19 5 Q20 16 9 19 Z"/><path d="M5 19 L14 10"/>',
  feiticeiro:'<path d="M12 3 Q17 9 17 14 Q17 20 12 21 Q7 20 7 14 Q7 11 10 9 Q10 12 12 12 Q13 8 12 3 Z"/>',
  guerreiro:'<path d="M12 2 L14 14 H10 Z"/><path d="M7 14 H17 M12 14 V20"/><circle cx="12" cy="21" r="1"/>',
  ladino:'<path d="M19 4 L20 5 L11 16 L8 13 Z"/><path d="M7 14 L10 17 M5 19 L8 16"/>',
  mago:'<path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"/>',
  monge:'<path d="M12 4 A8 8 0 1 0 20 12"/><circle cx="12" cy="12" r="1.5"/>',
  paladino:'<path d="M12 3 L20 6 V12 Q20 18 12 21 Q4 18 4 12 V6 Z"/><path d="M12 8 V16 M9 11 H15"/>',
  patrulheiro:'<path d="M7 3 Q20 12 7 21"/><path d="M7 3 V21 M3 12 H19 M19 12 L16 10 M19 12 L16 14"/>'
};

function pdfDefs(){
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <symbol id="canto" viewBox="0 0 44 44"><path d="M2 42 V10 Q2 2 10 2 H42" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 42 V16 Q8 8 16 8 H42" fill="none" stroke="currentColor" stroke-width=".8"/><path d="M12 12 l4 4 -4 4 -4 -4 z" fill="currentColor"/><circle cx="24" cy="5" r="1.4" fill="currentColor"/><circle cx="5" cy="24" r="1.4" fill="currentColor"/></symbol>
    <symbol id="divisor" viewBox="0 0 240 12"><path d="M0 6 H100 M140 6 H240" stroke="currentColor" stroke-width=".8" fill="none"/><path d="M120 1 l5 5 -5 5 -5 -5 z" fill="currentColor"/><circle cx="106" cy="6" r="1.6" fill="currentColor"/><circle cx="134" cy="6" r="1.6" fill="currentColor"/></symbol>
    <symbol id="d20" viewBox="0 0 100 100"><path d="M50 4 L90 27 V73 L50 96 L10 73 V27 Z M50 22 L76 66 H24 Z M50 4 V22 M90 27 L76 66 M10 27 L24 66 M90 73 L76 66 M10 73 L24 66 M50 96 V66" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></symbol>
  </defs></svg>`;
}

function pdfBrasao(classeKey){
  const glifo = PDF_GLIFOS[classeKey];
  const miolo = glifo
    ? `<g transform="translate(23.600 23.600) scale(2.200)" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${glifo}</g>`
    : `<use href="#d20" x="22" y="22" width="56" height="56"/>`;
  return `<svg class="brasao" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" fill="${PDF_CORES.superficie}" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="1.5 3"/>${miolo}</svg>`;
}

function pdfEscudoAtributo(attr, valor, mod){
  const rotulo = escaparHtml(ATTRIBUTE_LABELS[attr].toUpperCase());
  return `<svg class="escudo" viewBox="0 0 90 108" role="img" aria-label="${escaparHtml(ATTRIBUTE_LABELS[attr])} ${valor}, modificador ${valorFormatadoBonus(mod)}">
    <path d="M45 3 L84 13 V56 Q84 88 45 105 Q6 88 6 56 V13 Z" fill="${PDF_CORES.superficie}" stroke="${PDF_CORES.ouro}" stroke-width="2.4"/>
    <path d="M45 9 L78 17.500 V56 Q78 83 45 98 Q12 83 12 56 V17.500 Z" fill="none" stroke="${PDF_CORES.ouroClaro}" stroke-width=".8"/>
    <text x="45" y="27" text-anchor="middle" font-size="7" letter-spacing=".6" font-weight="700" fill="${PDF_CORES.ouro}">${rotulo}</text>
    <text x="45" y="62" text-anchor="middle" font-size="30" font-weight="700" style="font-family:var(--serifa)" fill="${PDF_CORES.tinta}">${valorFormatadoBonus(mod)}</text>
    <circle cx="45" cy="82" r="13" fill="${PDF_CORES.papel}" stroke="${PDF_CORES.ouro}" stroke-width="1.600"/>
    <text x="45" y="87" text-anchor="middle" font-size="14" font-weight="700" fill="${PDF_CORES.tinta}">${valor}</text>
  </svg>`;
}

function pdfSecao(titulo, corpo, extra=''){
  return `<section class="secao ${extra}"><h2>${pdfIcone(titulo, 'icone') || '<svg class="rombo" viewBox="0 0 10 10" aria-hidden="true"><path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor"/></svg>'}${escaparHtml(titulo)}</h2>${corpo}</section>`;
}
function pdfLista(itens, vazio){
  const l = (itens || []).filter(Boolean);
  return l.length ? `<ul>${l.join('')}</ul>` : `<p class="suave">${escaparHtml(vazio)}</p>`;
}
function pdfTextoLista(valores){ return (valores || []).length ? valores.map(escaparHtml).join(' • ') : '—'; }

function pdfDeslocamento(pes){
  const n = Number(pes) || 0;
  return { pes: n, metros: (Math.round(n * 0.3 * 2) / 2).toString().replace('.', ',') };
}

const PDF_CSS = `
  :root{--papel:${PDF_CORES.papel};--sup:${PDF_CORES.superficie};--tinta:${PDF_CORES.tinta};--suave:${PDF_CORES.suave};--linha:${PDF_CORES.linha};--ouro:${PDF_CORES.ouro};--serifa:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;--sans:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Arial,sans-serif}
  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  @page{size:A4;margin:0}
  html{background:#e9e1d2}
  body{margin:0;font:10.500pt/1.4 var(--sans);color:var(--tinta)}
  .barra{position:sticky;top:0;z-index:5;display:flex;justify-content:center;gap:12px;padding:10px;background:var(--tinta);color:var(--papel);font-size:13px}
  .barra button{font:inherit;font-weight:600;min-height:40px;padding:0 20px;border-radius:999px;border:1px solid var(--ouroClaro,#c98a1f);background:#f0b254;color:#1a1206;cursor:pointer}
  .pagina{position:relative;width:210mm;min-height:297mm;margin:12px auto;padding:15mm 14mm 14mm;background:var(--papel);color:var(--tinta);box-shadow:0 2px 14px rgba(0,0,0,.25);page-break-after:always;break-after:page;overflow:hidden}
  .pagina:last-of-type{page-break-after:auto;break-after:auto}
  .moldura{position:absolute;inset:6mm;border:1.400pt solid var(--ouro);border-radius:2mm;pointer-events:none}
  .moldura::after{content:"";position:absolute;inset:1.600mm;border:.500pt solid var(--ouro);border-radius:1mm}
  .canto{position:absolute;width:15mm;height:15mm;color:var(--ouro)}
  .canto.se{left:3.500mm;top:3.500mm}.canto.sd{right:3.500mm;top:3.500mm;transform:scaleX(-1)}
  .canto.ie{left:3.500mm;bottom:3.500mm;transform:scaleY(-1)}.canto.id{right:3.500mm;bottom:3.500mm;transform:scale(-1,-1)}
  .marca{position:absolute;right:20mm;bottom:20mm;width:70mm;height:70mm;color:var(--ouro);opacity:.06;pointer-events:none}
  .conteudo{padding-bottom:12mm}
  .topo{display:grid;grid-template-columns:22mm 1fr auto;gap:5mm;align-items:center;padding:0 4mm}
  .brasao{width:22mm;height:22mm;color:var(--ouro)}
  h1{font:600 25pt/1.05 var(--serifa);letter-spacing:-.01em;margin:0 0 1.500mm}
  .linha-classe{font:italic 11.500pt var(--serifa);color:var(--ouro);margin:0 0 1mm}
  .meta{font-size:8.500pt;color:var(--suave);margin:0}
  .selo{justify-self:end;text-align:center;font-size:7.500pt;letter-spacing:.06em;text-transform:uppercase;color:var(--ouro);border:1pt solid var(--ouro);border-radius:2mm;padding:2mm 3mm;max-width:34mm}
  .selo strong{display:block;font:600 9pt var(--serifa);letter-spacing:0;text-transform:none;color:var(--tinta);margin-top:.500mm}
  .divisor{display:block;width:100%;height:4mm;color:var(--ouro);margin:2mm 0}
  .atributos{display:grid;grid-template-columns:repeat(6,1fr);gap:2.500mm;margin:0 0 3mm}
  .escudo{width:100%;height:auto;font-family:var(--sans)}
  .vitais{display:grid;grid-template-columns:repeat(5,1fr);gap:2.500mm;margin-bottom:3mm}
  .vital{border:1pt solid var(--ouro);border-radius:2.500mm;background:var(--sup);text-align:center;padding:2mm 1mm}
  .vital span{display:block;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;color:var(--suave);font-weight:700}
  .vital strong{display:block;font:600 19pt/1.1 var(--serifa)}
  .vital small{display:block;font-size:7pt;color:var(--suave)}
  .vital.pv{background:var(--tinta);color:var(--papel)}.vital.pv span,.vital.pv small{color:#e0d3bd}
  .fluxo{column-count:2;column-gap:4mm}
  .fluxo .secao{break-inside:avoid;display:block}
  .fluxo .secao.longa{break-inside:auto}
  .colunas{display:grid;grid-template-columns:1fr 1fr;gap:4mm;align-items:start}
  .secao.longa{break-inside:auto}
  .secao{border:.700pt solid var(--linha);border-radius:2.500mm;background:var(--sup);padding:3mm 3.500mm;margin-bottom:3mm;break-inside:avoid}
  .secao h2{display:flex;align-items:center;gap:1.800mm;margin:0 0 2mm;padding-bottom:1.500mm;border-bottom:.700pt solid var(--ouro);font:600 11pt var(--serifa);letter-spacing:.03em;color:var(--tinta)}
  .rombo{width:2.600mm;height:2.600mm;color:var(--ouro);flex:none}
  .secao p{margin:0 0 1.500mm}.secao ul{margin:0;padding:0;list-style:none}
  .secao li{padding:1mm 0;border-bottom:.500pt dotted var(--linha)}.secao li:last-child{border-bottom:0}
  .suave{color:var(--suave)}.pequeno{font-size:8.500pt;color:var(--suave)}
  table{width:100%;border-collapse:collapse;font-size:9pt}
  th{font-size:7pt;letter-spacing:.08em;text-transform:uppercase;color:var(--suave);text-align:left;padding:0 1mm 1mm}
  td{padding:.600mm 1mm;border-bottom:.500pt dotted var(--linha);vertical-align:top}
  tr:last-child td{border-bottom:0}
  td.num{text-align:right;font-weight:700;white-space:nowrap;font-variant-numeric:tabular-nums}
  .pericias td:first-child{width:5mm;color:var(--ouro);font-size:8pt}
  .pontos{letter-spacing:.2em;color:var(--ouro)}
  .rodape{position:absolute;left:0;right:0;bottom:9.500mm;text-align:center;font-size:7pt;color:var(--suave);letter-spacing:.04em}
  .historia{white-space:pre-wrap}
  /* tema: pergaminho, faixa de título, ícones, capitular */
  .pagina{background:radial-gradient(ellipse at 50% 45%,transparent 58%,color-mix(in srgb,var(--ouro) 9%,transparent) 100%),url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .4 0 0 0 0 .3 0 0 0 0 .1 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E"),var(--papel)}
  .topo{padding:3mm 4mm;border-radius:2mm;background:linear-gradient(90deg,color-mix(in srgb,var(--ouro) 14%,transparent),transparent 75%);border-left:1.800mm solid var(--ouro)}
  .linha-classe{display:inline-block;color:var(--papel)!important;background:var(--ouro);padding:.8mm 6mm;margin-bottom:1.500mm!important;font-style:normal!important;letter-spacing:.04em;clip-path:polygon(0 0,100% 0,calc(100% - 3mm) 50%,100% 100%,0 100%,3mm 50%)}
  .secao h2 .icone{width:4.200mm;height:4.200mm;color:var(--ouro);flex:none}
  .vital{position:relative}
  .vital .v-ico{position:absolute;left:2mm;top:2mm;width:4mm;height:4mm;color:var(--ouro);opacity:.85}
  .vital.pv .v-ico{color:#f0b254}
  .topo.comRetrato{grid-template-columns:22mm 1fr auto 21mm}
  .retrato{display:block;width:21mm;height:26mm;object-fit:cover;border:1pt solid var(--ouro);border-radius:1.500mm;justify-self:end;background:var(--sup)}
  .historia::first-letter{float:left;font:600 30pt/.85 var(--serifa);color:var(--ouro);padding:1mm 1.500mm 0 0}
  @media print{html{background:var(--papel)}.barra{display:none}.pagina{margin:0;box-shadow:none}}`;

function gerarHtmlFicha(){
  const p = state.personagem;
  pdfAplicarAcento(p.classe);
  const d = montarPayloadExportacao();
  const ed = RULESETS[getRulesEdition()];
  const proficientes = new Set(p.periciasFinaisEfetivas || p.periciasFinais || []);
  const savesProf = new Set(p.savesClasseEfetivos || p.savesClasse || []);
  const desloc = pdfDeslocamento(d.combate.deslocamento);
  const pb = p.bonusProficiencia || 2;
  const percepcaoPassiva = 10 + (d.pericias['Percepção'] ?? 0);

  const status = p.validacaoResumo?.status === 'oficial' ? 'Ficha válida' : (p.validacaoResumo?.status === 'customizado' ? 'Ficha customizada' : 'Revisão pendente');
  const temRetrato = imagemPersonagemValida(p.imagem);
  const subtitulo = [d.classe + ' ' + d.nivel, d.subclasse && d.subclasse !== 'Não definido' ? d.subclasse : '', d.raca, d.origem].filter(Boolean).map(escaparHtml).join(' · ');

  const atributos = ATTRIBUTE_LIST.map(a => pdfEscudoAtributo(a, d.atributos[a] ?? 10, d.modificadores[a] ?? 0)).join('');
  const vitais = [
    ['PV máximo', d.combate.pvMax || 1, 'pontos de vida', 'pv'],
    ['Armadura', d.combate.ca || 10, d.combate.armadura ? escaparHtml(d.combate.armadura) + (d.combate.escudo ? ' + escudo' : '') : 'sem armadura', ''],
    ['Iniciativa', valorFormatadoBonus(d.combate.iniciativa || 0), 'Destreza', ''],
    ['Deslocamento', `${desloc.pes} pés`, `${desloc.metros} m`, ''],
    ['Proficiência', valorFormatadoBonus(pb), `Perc. passiva ${percepcaoPassiva}`, '']
  ].map(([r, v, s, c]) => `<div class="vital ${c}">${pdfIcone(r, 'v-ico')}<span>${r}</span><strong>${v}</strong><small>${s}</small></div>`).join('');

  const saves = Object.entries(d.saves).map(([nome, bonus]) => `<tr><td>${savesProf.has(nome) ? '●' : '○'}</td><td>${escaparHtml(nome)}</td><td class="num">${valorFormatadoBonus(bonus)}</td></tr>`).join('');
  const pericias = Object.entries(d.pericias).map(([nome, bonus]) => `<tr><td>${proficientes.has(nome) ? '●' : '○'}</td><td>${escaparHtml(nome)} <span class="pequeno">(${PDF_ABREV[SKILLS[nome]] || ''})</span></td><td class="num">${valorFormatadoBonus(bonus)}</td></tr>`).join('');
  const ataques = (d.combate.ataques || []).map(a => `<tr><td>${escaparHtml(a.nome)}${a.propriedades?.length ? `<br><span class="pequeno">${escaparHtml(a.propriedades.join(', '))}</span>` : ''}</td><td class="num">${valorFormatadoBonus(a.bonusAtaque || 0)}</td><td>${escaparHtml(a.dano || '-')}${a.danoVersatil ? `<br><span class="pequeno">versátil ${escaparHtml(a.danoVersatil)}</span>` : ''}</td></tr>`).join('') || `<tr><td colspan="3" class="suave">Nenhum ataque.</td></tr>`;

  const feitos = f => `<li><strong>${escaparHtml(f.nome)}</strong> <span class="pequeno">(nível ${escaparHtml(f.level)})</span>${f.resumo ? `<br><span class="pequeno">${escaparHtml(f.resumo)}</span>` : ''}</li>`;
  const recursos = Object.values(d.recursosClasse || {}).map(r => `<li><strong>${escaparHtml(r.nome)}</strong>: ${escaparHtml(r.atual)}/${escaparHtml(r.max)} <span class="pequeno">(${escaparHtml(r.recarga)})</span></li>`);
  const tracosRaciais = (p.traitsRaciais || []).map(t => `<li>${escaparHtml(t)}</li>`);
  const origem = p.talentoOrigem ? [`<li><strong>${escaparHtml(p.talentoOrigem)}</strong> <span class="pequeno">(talento de origem)</span></li>`] : [];

  const m = d.magias;
  const espacos = (m.espacos || []).map((v, i) => v ? `<tr><td>${i + 1}º círculo</td><td class="pontos">${'●'.repeat(m.espacosAtuais?.[i] ?? v)}${'○'.repeat(Math.max(0, v - (m.espacosAtuais?.[i] ?? v)))}</td></tr>` : '').join('');
  const magias = !m.ehConjurador ? `<p class="suave">Classe sem conjuração.</p>` :
    `<p><strong>CD</strong> ${escaparHtml(m.cd)} &nbsp; <strong>Ataque</strong> ${valorFormatadoBonus(m.ataque || 0)}${m.habilidade ? ` &nbsp; <strong>Habilidade</strong> ${escaparHtml(ATTRIBUTE_LABELS[m.habilidade] || m.habilidade)}` : ''}</p>${espacos ? `<table><tbody>${espacos}</tbody></table>` : ''}<p><strong>Truques:</strong> ${pdfTextoLista(m.truques)}</p><p><strong>Magias:</strong> ${pdfTextoLista(m.selecionadas)}</p>`;

  const moedas = Object.entries(d.inventario.moedas || {}).map(([k, v]) => `${escaparHtml(k.toUpperCase())} ${escaparHtml(v)}`).join(' · ');
  const inventario = (d.inventario.itens || []).map(i => `<tr><td>${escaparHtml(i.nome)}</td><td class="num">${escaparHtml(i.quantidade)}</td><td class="num">${escaparHtml(i.pesoTotal)}</td></tr>`).join('') || `<tr><td colspan="3" class="suave">Nenhum item.</td></tr>`;
  const pers = d.personalidade;
  const personalidade = `<p><strong>Traços:</strong> ${pdfTextoLista(pers.tracos)}</p><p><strong>Ideais:</strong> ${pdfTextoLista(pers.ideais)}</p><p><strong>Vínculos:</strong> ${pdfTextoLista(pers.vinculos)}</p><p><strong>Defeitos:</strong> ${pdfTextoLista(pers.defeitos)}</p>`;

  const moldura = `<div class="moldura"></div>${['se', 'sd', 'ie', 'id'].map(c => `<svg class="canto ${c}" aria-hidden="true"><use href="#canto"/></svg>`).join('')}<svg class="marca" aria-hidden="true"><use href="#d20"/></svg>`;
  const rodape = n => `<div class="rodape">D&amp;D 5e Builder · VF Tools · ${escaparHtml(ed.curto)} · página ${n}</div>`;

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escaparHtml(d.nome || 'Ficha')} — Ficha D&amp;D 5e</title><style>${PDF_CSS}:root{--ouro:${PDF_CORES.ouro}}</style></head><body>
  ${pdfDefs()}
  <div class="barra"><span>Pré-visualização da ficha (A4)</span><button type="button" onclick="window.print()">Imprimir / Salvar PDF</button></div>
  <article class="pagina">${moldura}<div class="conteudo">
    <header class="topo${temRetrato ? ' comRetrato' : ''}">${pdfBrasao(p.classe)}<div><h1>${escaparHtml(d.nome || 'Personagem sem nome')}</h1><p class="linha-classe">${subtitulo}</p><p class="meta">Jogador: ${escaparHtml(d.jogador || '—')} · XP ${escaparHtml(d.xp)} · ${escaparHtml(ed.label)}</p></div><div class="selo">${escaparHtml(ed.curto)}<strong>${escaparHtml(status)}</strong></div>${temRetrato ? `<img class="retrato" src="${p.imagem}" alt="Imagem do personagem">` : ''}</header>
    <svg class="divisor" aria-hidden="true" preserveAspectRatio="none"><use href="#divisor"/></svg>
    <div class="atributos">${atributos}</div>
    <div class="vitais">${vitais}</div>
    <div class="colunas">
      <div>${pdfSecao('Perícias', `<table class="pericias"><tbody>${pericias}</tbody></table>`)}</div>
      <div>${pdfSecao('Resistências', `<table class="pericias"><tbody>${saves}</tbody></table>`)}${pdfSecao('Ataques', `<table><thead><tr><th>Arma</th><th>Bônus</th><th>Dano</th></tr></thead><tbody>${ataques}</tbody></table>`)}</div>
    </div>
    ${rodape(1)}
  </div></article>
  <article class="pagina">${moldura}<div class="conteudo">
    <div class="fluxo">
      ${pdfSecao('Habilidades de classe', pdfLista((d.habilidadesClasse || []).map(feitos), 'Nenhuma habilidade listada.'), 'longa')}
      ${pdfSecao('Subclasse', pdfLista((d.habilidadesSubclasse || []).map(feitos), 'Nenhum traço de subclasse.'))}
      ${pdfSecao('Recursos', pdfLista(recursos, 'Nenhum recurso rastreável.'))}
      ${pdfSecao('Magias', magias, 'longa')}
      ${pdfSecao('Traços e talentos', pdfLista(origem.concat(tracosRaciais), 'Nenhum traço registrado.'))}
      ${pdfSecao('Inventário', `<table><thead><tr><th>Item</th><th>Qtd</th><th>Peso</th></tr></thead><tbody>${inventario}</tbody></table><p class="pequeno">Peso ${escaparHtml(d.inventario.pesoTotal)}/${escaparHtml(d.inventario.capacidadeCarga)} · ${moedas}</p>`, 'longa')}
      ${pdfSecao('Personalidade', personalidade)}
      ${pdfSecao('Aparência', `<p>${escaparHtml(pers.aparencia || '—')}</p>`)}
      ${pdfSecao('História', `<p class="historia">${escaparHtml([pers.descricaoGeral, pers.historia].filter(Boolean).join('\n\n') || '—')}</p>`, 'longa')}
    </div>
    ${rodape(2)}
  </div></article>
  <script>window.addEventListener('load',function(){(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){setTimeout(function(){window.print()},350)})});</script>
  </body></html>`;
}

function exportarPDF(){
  const popup = window.open('', '_blank');
  if(!popup){
    alert('Permita pop-ups para exportar a ficha em PDF pelo diálogo de impressão do navegador.');
    return;
  }
  popup.document.open();
  popup.document.write(gerarHtmlFicha());
  popup.document.close();
}
window.gerarHtmlFicha = gerarHtmlFicha;
window.exportarPDF = exportarPDF;
