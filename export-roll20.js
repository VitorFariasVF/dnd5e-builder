/* Exportação para Roll20 — ficha "D&D 5E by Roll20" (OGL).
   O Roll20 não importa um arquivo de ficha sozinho. Os dois caminhos reais são:
   1) Script de API (campanha com assinatura Pro): o app gera um script que cria o personagem pelo comando de chat.
   2) Lista de campos (.json): serve para copiar valores à mão ou alimentar um importador de terceiros.
   Os nomes dos campos seguem a ficha OGL. Eles NÃO foram testados em uma campanha real: ver AUDITORIA_FICHAS_VTT.md. */

const ROLL20_ATTR = {
  forca:'strength', destreza:'dexterity', constituicao:'constitution',
  inteligencia:'intelligence', sabedoria:'wisdom', carisma:'charisma'
};
const ROLL20_SKILL = {
  'Acrobacia':'acrobatics','Adestrar Animais':'animal_handling','Arcanismo':'arcana','Atletismo':'athletics',
  'Atuação':'performance','Enganação':'deception','Furtividade':'stealth','História':'history',
  'Intimidação':'intimidation','Intuição':'insight','Investigação':'investigation','Medicina':'medicine',
  'Natureza':'nature','Percepção':'perception','Persuasão':'persuasion','Prestidigitação':'sleight_of_hand',
  'Religião':'religion','Sobrevivência':'survival'
};

function roll20Id(){
  // ids de seção repetida do Roll20 começam com "-" e usam [A-Za-z0-9_-]
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  let id = '-';
  for(let i = 0; i < 19; i++) id += abc[Math.floor(Math.random() * abc.length)];
  return id;
}

function roll20AtributoPorLabel(label){
  return Object.keys(ATTRIBUTE_LABELS).find(k => ATTRIBUTE_LABELS[k] === label) || null;
}

/* Monta a lista [{name, current, max?}] com os campos da ficha OGL. */
function montarAtributosRoll20(){
  const p = state.personagem;
  const out = [];
  const add = (name, current, max) => {
    if(current === undefined || current === null || current === '') return;
    const item = { name, current: String(current) };
    if(max !== undefined && max !== null) item.max = String(max);
    out.push(item);
  };
  const repete = (secao, campos) => {
    const id = roll20Id();
    Object.entries(campos).forEach(([campo, valor]) => add(`repeating_${secao}_${id}_${campo}`, valor));
  };

  const classeNome = nomeCatalogo(CLASSES, p.classe);
  const subNome = p.subclasse ? nomeCatalogo(Object.fromEntries(getSubclassOptions(p.classe).map(s => [s.key, { nome: s.nome }])), p.subclasse) : '';
  add('class', classeNome);
  add('subclass', subNome);
  add('base_level', p.nivel || 1);
  add('race', nomeCatalogo(RACES, p.raca));
  add('background', nomeCatalogo(BACKGROUNDS, p.origem));
  add('player_name', p.jogador);
  add('experience', p.xp || 0);

  // Atributos (a ficha calcula os modificadores sozinha)
  ATTRIBUTE_LIST.forEach(attr => add(`${ROLL20_ATTR[attr]}_base`, p.atributos[attr]));

  // Proficiências: a ficha usa "(@{pb})" para marcar
  (p.periciasFinaisEfetivas || p.periciasFinais || []).forEach(nome => {
    if(ROLL20_SKILL[nome]) add(`${ROLL20_SKILL[nome]}_prof`, '(@{pb})');
  });
  (p.savesClasseEfetivos || p.savesClasse || []).forEach(label => {
    const attr = roll20AtributoPorLabel(label);
    if(attr) add(`${ROLL20_ATTR[attr]}_save_prof`, '(@{pb})');
  });

  // Combate
  add('hp', p.pvMax || 1, p.pvMax || 1);
  add('custom_ac_flag', 1);
  add('custom_ac', p.combate?.classeArmadura || 10);
  add('speed', `${p.deslocamento || 30} ft`);
  add('initiative_bonus', 0);

  // Moedas
  Object.entries(p.inventario?.moedas || {}).forEach(([moeda, v]) => add(moeda, Number(v) || 0));

  // Ataques: a ficha soma modificador e proficiência a partir de atkattr_base / atkprofflag
  (p.combate?.ataques || []).forEach(a => {
    const attr = roll20AtributoPorLabel(a.atributo);
    const dados = String(a.dano || '').match(/^\d+d\d+/);
    repete('attack', {
      atkname: a.nome,
      atkflag: '{{attack=1}}',
      atkattr_base: attr ? `@{${ROLL20_ATTR[attr]}_mod}` : '0',
      atkprofflag: a.proficiente ? '(@{pb})' : '0',
      dmgflag: '{{damage=1}} {{dmg1flag=1}}',
      dmgbase: dados ? dados[0] : a.dano,
      dmgattr: attr ? `@{${ROLL20_ATTR[attr]}_mod}` : '0',
      dmgtype: a.tipoDano || '',
      atkrange: a.alcance || ''
    });
  });

  // Magias
  const m = p.magia || {};
  if(m.ehConjurador){
    if(m.habilidade) add('spellcasting_ability', `@{${ROLL20_ATTR[m.habilidade]}_mod}+`);
    (m.espacos || []).forEach((total, i) => { if(total){ add(`lvl${i + 1}_slots_total`, total); add(`lvl${i + 1}_slots_expended`, (m.espacosAtuais || [])[i] ?? total); } });
    (m.listaTruques || []).forEach(nome => repete('spell-cantrip', { spellname: nome, spellschool: '', spellclass: classeNome }));
    (m.listaMagias || []).forEach(nome => {
      const nivel = deriveSpellLevelFromName(nome) || 1;
      repete(`spell-${nivel}`, { spellname: getSpellNameWithoutLevelTag(nome), spellclass: classeNome });
    });
  }

  // Inventário e características
  (p.inventario?.itens || []).forEach(i => repete('inventory', { itemname: i.nome, itemcount: i.quantidade || 1, itemweight: i.peso ?? '' }));
  const trait = (nome, descricao, fonte) => repete('traits', { name: nome, source: fonte, description: descricao || '', display_flag: 'on' });
  (p.habilidadesClasseAtivas || []).forEach(f => trait(f.nome, f.resumo, 'Class Feature'));
  (p.habilidadesSubclasseAtivas || []).forEach(f => trait(f.nome, f.resumo, 'Class Feature'));
  (p.traitsRaciais || []).forEach(t => trait(t, '', 'Racial Trait'));
  if(p.talentoOrigem) trait(p.talentoOrigem, 'Talento de origem do antecedente (D&D 2024).', 'Feat');

  // Personalidade
  const pers = p.personalidade || {};
  add('personality_traits', (pers.tracos || []).join('\n'));
  add('ideals', (pers.ideais || []).join('\n'));
  add('bonds', (pers.vinculos || []).join('\n'));
  add('flaws', (pers.defeitos || []).join('\n'));
  add('character_appearance', pers.aparencia);
  add('character_backstory', [pers.descricaoGeral, pers.historia].filter(Boolean).join('\n\n'));
  return out;
}

function gerarScriptRoll20(){
  const p = state.personagem;
  const slug = (obterNomeArquivo('personagem', 'x').replace(/\.x$/, '').replace(/_/g, '-')) || 'personagem';
  const dados = { nome: p.nome || 'Personagem sem nome', atributos: montarAtributosRoll20() };
  return `/* Importador de ficha — D&D 5e Builder (VF Tools)
   Requer campanha Roll20 com assinatura Pro (Scripts de API) e a ficha "D&D 5E by Roll20".
   1. Configurações da campanha > Scripts de API > Novo script > cole este arquivo > Salvar.
   2. No chat da campanha, digite:  !vf-importar-${slug}
   3. Abra o personagem criado e confira os campos (veja AUDITORIA_FICHAS_VTT.md: nomes de campo não testados). */
on('ready', function(){
  var DADOS = ${JSON.stringify(dados, null, 2)};
  on('chat:message', function(msg){
    if(msg.type !== 'api' || msg.content.trim() !== '!vf-importar-${slug}') return;
    var existente = findObjs({ _type: 'character', name: DADOS.nome })[0];
    if(existente){ sendChat('VF Tools', '/w "' + msg.who.replace(/ \\(GM\\)$/, '') + '" Já existe um personagem chamado ' + DADOS.nome + '. Renomeie ou apague antes de importar.'); return; }
    var ficha = createObj('character', { name: DADOS.nome, archived: false, inplayerjournals: msg.playerid, controlledby: msg.playerid });
    DADOS.atributos.forEach(function(a){
      var campos = { name: a.name, current: a.current, characterid: ficha.id };
      if(a.max !== undefined) campos.max = a.max;
      createObj('attribute', campos);
    });
    sendChat('VF Tools', '/w "' + msg.who.replace(/ \\(GM\\)$/, '') + '" Personagem ' + DADOS.nome + ' criado com ' + DADOS.atributos.length + ' campos.');
  });
});
`;
}

function exportarRoll20Script(){
  baixarTexto(gerarScriptRoll20(), obterNomeArquivo('personagem_roll20_script', 'js').replace(/\.js$/, '_roll20_api.js'), 'text/javascript;charset=utf-8');
}

function exportarRoll20Campos(){
  const dados = { schema: 'vf-dnd5e-roll20-1', ficha: 'D&D 5E by Roll20 (OGL)', nome: state.personagem.nome || '', regras: getRulesEdition(), atributos: montarAtributosRoll20() };
  baixarTexto(JSON.stringify(dados, null, 2), obterNomeArquivo('personagem_roll20_campos', 'json').replace(/\.json$/, '_roll20_campos.json'), 'application/json;charset=utf-8');
}

window.montarAtributosRoll20 = montarAtributosRoll20;
window.gerarScriptRoll20 = gerarScriptRoll20;
window.exportarRoll20Script = exportarRoll20Script;
window.exportarRoll20Campos = exportarRoll20Campos;
