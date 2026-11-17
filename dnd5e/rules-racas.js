/* dnd5e/rules-racas.js: sub-raças, escolhas raciais e tamanho (D&D 5e 2014).
   Carregado depois de rules.js. Amplia RACES_2014 (a cópia que aplicarCatalogoRegras usa) e não toca RACES_2024:
   na edição 2024 a espécie continua sem bônus de atributo e sem sub-raças (resolverRaca devolve só o básico).
   Cada item traz `fonte`. Quando não há duas fontes conferidas, a fonte diz NÃO VERIFICADO e verificado=false.
   Só mecânica: nomes, números e condições. Descrições são frases curtas em palavras próprias. */

/* ---------- Tamanho (2014) ---------- */
const RACAS_2014_TAMANHO = {
  anao:"Médio", elfo:"Médio", halfling:"Pequeno", humano:"Médio", draconato:"Médio",
  gnomo:"Pequeno", meio_elfo:"Médio", meio_orc:"Médio", tiefling:"Médio"
};
/* Bônus, deslocamento e traços básicos das espécies de 2014 já conferidos em docs/VERIFICACAO_DND5E.md. */
const FONTE_BASE_2014 = "SRD 5.1 (espécie base), conferido em docs/VERIFICACAO_DND5E.md";

/* ---------- Ancestral dracônico (2014): dano da resistência, forma e salvaguarda da arma de sopro ---------- */
const RACAS_2014_ANCESTRAIS = {
  preto:    {nome:"Preto",    dano:"Ácido",     area:"linha de 5 x 30 pés", salvaguarda:"Destreza"},
  azul:     {nome:"Azul",     dano:"Elétrico",  area:"linha de 5 x 30 pés", salvaguarda:"Destreza"},
  latao:    {nome:"Latão",    dano:"Fogo",      area:"linha de 5 x 30 pés", salvaguarda:"Destreza"},
  bronze:   {nome:"Bronze",   dano:"Elétrico",  area:"linha de 5 x 30 pés", salvaguarda:"Destreza"},
  cobre:    {nome:"Cobre",    dano:"Ácido",     area:"linha de 5 x 30 pés", salvaguarda:"Destreza"},
  ouro:     {nome:"Ouro",     dano:"Fogo",      area:"cone de 15 pés",      salvaguarda:"Destreza"},
  verde:    {nome:"Verde",    dano:"Venenoso",  area:"cone de 15 pés",      salvaguarda:"Constituição"},
  vermelho: {nome:"Vermelho", dano:"Fogo",      area:"cone de 15 pés",      salvaguarda:"Destreza"},
  prata:    {nome:"Prata",    dano:"Frio",      area:"cone de 15 pés",      salvaguarda:"Constituição"},
  branco:   {nome:"Branco",   dano:"Frio",      area:"cone de 15 pés",      salvaguarda:"Constituição"}
};
const FONTE_ANCESTRAL_2014 = "dnd5e.wikidot.com lineage:dragonborn e roll20 Dragonborn Draconic Ancestry (tabela de dano, forma e salvaguarda: duas fontes). A progressão do dano da arma de sopro (2d6, 3d6 em 6, 4d6 em 11, 5d6 em 16) e a CD só vieram de uma fonte: NÃO VERIFICADO";

/* ---------- Sub-raças e variantes (2014) ----------
   obrigatoria: a espécie só existe com uma das sub-raças (Anão, Elfo, Halfling, Gnomo).
   substituiBonusBase: a variante troca o bônus básico da espécie (Humano +1 em todos) pelo próprio. */
const RACAS_2014_SUBRACAS = {
  anao: { obrigatoria:true, opcoes: {
    colina: { nome:"Anão da Colina", bonusAtributos:{sabedoria:1}, traits:["Tenacidade Anã"], pvPorNivel:1,
      fonte:"5e.d20srd.org (races) e dnd-wiki SRD5:Dwarf e roll20 Races:Dwarf: duas fontes para Sabedoria +1 e PV +1 por nível", verificado:true },
    montanha: { nome:"Anão da Montanha", bonusAtributos:{forca:2}, traits:["Treinamento de Armadura Anã (só texto)"],
      fonte:"dnd-wiki SRD5:Dwarf (uma fonte; a proficiência de armadura não foi confirmada em segunda fonte): NÃO VERIFICADO", verificado:false }
  }},
  elfo: { obrigatoria:true, opcoes: {
    alto: { nome:"Elfo Alto", bonusAtributos:{inteligencia:1}, idiomas:["Extra"],
      traits:["Treino com Armas Élficas (só texto)","Truque de mago à escolha (só texto; magia não aplicada)"],
      fonte:"5e.d20srd.org (races): uma fonte: NÃO VERIFICADO", verificado:false },
    floresta: { nome:"Elfo da Floresta", bonusAtributos:{sabedoria:1}, deslocamento:35, traits:["Pés Ligeiros","Máscara da Natureza"],
      fonte:"dnd5e.wikidot.com lineage:elf (uma fonte): NÃO VERIFICADO", verificado:false },
    drow: { nome:"Drow", bonusAtributos:{carisma:1}, traits:["Visão no Escuro Superior (120 pés)","Sensibilidade ao Sol","Magia Drow (só texto)"],
      fonte:"dnd5e.wikidot.com lineage:elf (uma fonte para Carisma +1 e Magia Drow); visão 120 pés e Sensibilidade ao Sol também em roll20 Drow (bestiário): NÃO VERIFICADO", verificado:false }
  }},
  halfling: { obrigatoria:true, opcoes: {
    pes_leves: { nome:"Pés-Leves", bonusAtributos:{carisma:1}, traits:["Furtividade Natural"],
      fonte:"5e.d20srd.org (races) (uma fonte): NÃO VERIFICADO", verificado:false },
    robusto: { nome:"Robusto", bonusAtributos:{constituicao:1}, traits:["Resiliência Robusta"],
      fonte:"dnd5e.wikidot.com lineage:halfling (uma fonte): NÃO VERIFICADO", verificado:false }
  }},
  gnomo: { obrigatoria:true, opcoes: {
    floresta: { nome:"Gnomo da Floresta", bonusAtributos:{destreza:1}, traits:["Ilusionista Natural (Ilusão Menor)","Falar com Bestas Pequenas"],
      fonte:"dungeonmister.com guia Forest Gnome (uma fonte): NÃO VERIFICADO", verificado:false },
    rochas: { nome:"Gnomo das Rochas", bonusAtributos:{constituicao:1}, traits:["Saber do Artífice","Engenhoqueiro"],
      fonte:"5e.d20srd.org (races) (uma fonte): NÃO VERIFICADO", verificado:false }
  }},
  humano: { obrigatoria:false, opcoes: {
    variante: { nome:"Humano Variante", substituiBonusBase:true, bonusAtributos:{}, traits:[],
      escolhas:[
        {id:"atributos", tipo:"atributos", quantidade:2, valor:1, distintos:true, excluir:[], rotulo:"Dois atributos (+1 cada, diferentes)"},
        {id:"pericia", tipo:"pericia", quantidade:1, rotulo:"Uma perícia"},
        {id:"talento", tipo:"talento", quantidade:1, rotulo:"Um talento"}
      ],
      fonte:"dnd5e.wikidot.com lineage:human (uma fonte): regra opcional do Livro do Jogador cap. 5, depende do mestre: NÃO VERIFICADO", verificado:false }
  }}
};

/* ---------- Escolhas próprias de espécies (2014) ---------- */
const RACAS_2014_ESCOLHAS = {
  meio_elfo: [
    {id:"atributos", tipo:"atributos", quantidade:2, valor:1, distintos:true, excluir:["carisma"], rotulo:"Dois atributos (+1 cada, diferentes, sem Carisma)"}
  ],
  draconato: [
    {id:"ancestral", tipo:"ancestral", quantidade:1, rotulo:"Ancestral dracônico"}
  ]
};

/* Textos das características que dependem da escolha (Draconato). */
const RACAS_2014_TRAIT_DRACONATO = {
  "Ancestral Dracônico": (a) => `Ancestral Dracônico (${a.nome}, ${a.dano})`,
  "Arma de Sopro": (a) => `Arma de Sopro (${a.area}; salvaguarda de ${a.salvaguarda})`,
  "Resistência a Dano": (a) => `Resistência a Dano (${a.dano})`
};

/* ---------- Aplicação do que é dado pela tabela acima ---------- */
(function aplicarDadosRacas2014(){
  if(typeof RACES_2014 === "undefined") return;
  Object.keys(RACAS_2014_TAMANHO).forEach(k => {
    if(RACES_2014[k]){
      RACES_2014[k].tamanho = RACAS_2014_TAMANHO[k];
      RACES_2014[k].fonte = RACES_2014[k].fonte || FONTE_BASE_2014;
    }
  });
  if(RACES_2014.meio_elfo){
    RACES_2014.meio_elfo.fonte = "Carisma +2 e dois +1 à escolha: conferido em docs/VERIFICACAO_DND5E.md (SRD 5.1) e roll20 Races:Half-Elf";
  }
  if(RACES_2014.draconato){
    RACES_2014.draconato.fonte = FONTE_ANCESTRAL_2014;
  }
  /* Aplica a sincronização só se o catálogo ativo ainda for o 2014 (ou nenhum tiver sido aplicado). */
  if(typeof _trocarCatalogo === "function" && typeof aplicarCatalogoRegras === "function" && aplicarCatalogoRegras._atual !== "2024"){
    _trocarCatalogo(RACES, RACES_2014);
  }
})();

/* ---------- Funções puras ---------- */
function racasEdicao2014(){
  return !(typeof getRulesEdition === "function" && getRulesEdition() === "2024");
}
function racaSubracoes(raceKey){
  if(!racasEdicao2014() || !RACAS_2014_SUBRACAS[raceKey]) return null;
  return RACAS_2014_SUBRACAS[raceKey];
}
function racaOpcaoSubraca(raceKey, subKey){
  const s = racaSubracoes(raceKey);
  return (s && subKey && s.opcoes[subKey]) || null;
}
function racaEscolhasAtivas(raceKey, subKey){
  if(!racasEdicao2014()) return [];
  const opt = racaOpcaoSubraca(raceKey, subKey);
  if(opt && opt.escolhas) return opt.escolhas;
  const base = RACAS_2014_ESCOLHAS[raceKey];
  return base ? base : [];
}
/* Talento que a Versatilidade Humana pode dar: sem escolha de atributo (chooseOne), que esta etapa não pergunta. */
function talentoEscolhivelPorRaca(id){
  const f = (typeof RULE_FEATS !== "undefined") && RULE_FEATS[id];
  if(!f) return false;
  const attrs = f.grants && f.grants.attributes;
  return !(attrs && attrs.chooseOne);
}
function _somarBonus(alvo, extra){
  Object.entries(extra || {}).forEach(([a, v]) => { alvo[a] = (alvo[a] || 0) + Number(v || 0); });
  return alvo;
}

/* Resolve a espécie efetiva de um personagem: bônus, traços, deslocamento, tamanho, idiomas e escolhas.
   Escolhas inválidas não entram no bônus; viram `erros` (escolhas incompletas viram `pendencias`). */
function resolverRaca(raceKey, pers){
  const base = (typeof RACES !== "undefined" && raceKey && RACES[raceKey]) || null;
  const out = { key: base ? raceKey : null, nome: base ? base.nome : "", subraca: null, subracaNome: "",
    bonusAtributos: {}, traits: [], idiomas: [], deslocamento: base ? base.deslocamento : 30,
    tamanho: base ? (base.tamanho || null) : null, pvPorNivel: 0, pericias: [], talentos: [],
    ancestral: null, erros: [], pendencias: [], fonte: base ? (base.fonte || null) : null, verificado: true };
  if(!base) return out;
  const p = pers || {};
  const subKey = p.subraca || null;
  const opt = racaOpcaoSubraca(raceKey, subKey);
  const usaBase = !(opt && opt.substituiBonusBase);

  if(usaBase) _somarBonus(out.bonusAtributos, base.bonusAtributos);
  if(opt) _somarBonus(out.bonusAtributos, opt.bonusAtributos);
  out.traits = [...(usaBase ? base.traits : []), ...((opt && opt.traits) || [])];
  out.idiomas = [...(base.idiomas || []), ...((opt && opt.idiomas) || [])];
  out.deslocamento = (opt && opt.deslocamento) || base.deslocamento;
  out.pvPorNivel = Number((opt && opt.pvPorNivel) || 0);
  out.subraca = opt ? subKey : null;
  out.subracaNome = opt ? opt.nome : "";
  if(opt) out.fonte = opt.fonte;
  out.verificado = !(opt && opt.verificado === false) && !/NÃO VERIFICADO/.test(out.fonte || "");
  if(racasEdicao2014() && racaSubracoes(raceKey) && racaSubracoes(raceKey).obrigatoria && !opt){
    out.pendencias.push(`Escolha a sub-raça de ${base.nome}.`);
  }

  const escolhas = racaEscolhasAtivas(raceKey, subKey);
  const esc = p.escolhasRaciais || {};
  escolhas.forEach(e => {
    if(e.tipo === "atributos"){
      const sel = [].concat(esc.atributos || []).filter(Boolean);
      if(sel.length < e.quantidade){ out.pendencias.push(`${e.rotulo}: escolha ${e.quantidade}.`); return; }
      const proibidos = sel.filter(a => (e.excluir || []).includes(a));
      const repetidos = e.distintos && new Set(sel).size !== sel.length;
      const invalidos = sel.filter(a => !ATTRIBUTE_LIST.includes(a));
      if(proibidos.length){ out.erros.push(`${e.rotulo}: não pode escolher ${proibidos.map(a => ATTRIBUTE_LABELS[a]).join(", ")}.`); return; }
      if(repetidos){ out.erros.push(`${e.rotulo}: os atributos precisam ser diferentes.`); return; }
      if(invalidos.length){ out.erros.push(`${e.rotulo}: atributo inválido.`); return; }
      _somarBonus(out.bonusAtributos, Object.fromEntries(sel.slice(0, e.quantidade).map(a => [a, e.valor])));
    }
    if(e.tipo === "pericia"){
      const sel = esc.pericia || "";
      if(!sel){ out.pendencias.push(`${e.rotulo}: escolha uma perícia.`); return; }
      if(typeof SKILLS === "undefined" || !SKILLS[sel]){ out.erros.push(`${e.rotulo}: perícia inválida.`); return; }
      out.pericias.push(sel);
    }
    if(e.tipo === "talento"){
      const sel = esc.talento || "";
      if(!sel){ out.pendencias.push(`${e.rotulo}: escolha um talento.`); return; }
      if(typeof talentoEscolhivelPorRaca !== "function" || !talentoEscolhivelPorRaca(sel)){ out.erros.push(`${e.rotulo}: talento não disponível para escolha racial.`); return; }
      out.talentos.push(sel);
    }
    if(e.tipo === "ancestral"){
      const sel = esc.ancestral || "";
      if(!sel){ out.pendencias.push(`${e.rotulo}: escolha o ancestral.`); return; }
      const a = RACAS_2014_ANCESTRAIS[sel];
      if(!a){ out.erros.push(`${e.rotulo}: ancestral inválido.`); return; }
      out.ancestral = sel;
      out.traits = out.traits.map(t => RACAS_2014_TRAIT_DRACONATO[t] ? RACAS_2014_TRAIT_DRACONATO[t](a) : t);
    }
  });
  return out;
}

/* Mensagem da primeira pendência ou erro racial, ou null se a raça está completa. Usada pelo validador. */
function validarEscolhasRaciais(pers){
  const r = resolverRaca(pers.raca, pers);
  if(!pers.raca) return "Selecione uma raça.";
  if(r.erros[0] || r.pendencias[0]) return r.erros[0] || r.pendencias[0];
  const origem = (typeof BACKGROUNDS !== "undefined" && pers.origem && BACKGROUNDS[pers.origem]) || null;
  const repetida = origem && r.pericias.find(s => (origem.pericias || []).includes(s));
  if(repetida) return "Não repita perícias já recebidas pela origem.";
  return null;
}

/* Copia o resultado da raça para o personagem (campos que a ficha e as regras já leem). */
function aplicarRacaNoPersonagem(pers){
  const r = resolverRaca(pers.raca, pers);
  pers.bonusRaciais = {...r.bonusAtributos};
  pers.traitsRaciais = [...r.traits];
  pers.idiomasRaciais = [...r.idiomas];
  pers.deslocamento = r.deslocamento;
  pers.tamanho = r.tamanho;
  pers.subracaNome = r.subracaNome;
  pers.periciasRaciais = [...r.pericias];
  pers.talentosRaciais = [...r.talentos];
  return r;
}
