function obterNomeArquivo(base, ext){
  const nome = (state.personagem.nome || "personagem_dnd").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");
  return `${nome || base}.${ext}`;
}

const FOUNDRY_ABILITY_MAP = {
  forca: 'str',
  destreza: 'dex',
  constituicao: 'con',
  inteligencia: 'int',
  sabedoria: 'wis',
  carisma: 'cha'
};

const FOUNDRY_SKILL_MAP = {
  'Acrobacia': 'acr',
  'Adestrar Animais': 'ani',
  'Arcanismo': 'arc',
  'Atletismo': 'ath',
  'Atuação': 'prf',
  'Enganação': 'dec',
  'Furtividade': 'ste',
  'História': 'his',
  'Intimidação': 'itm',
  'Intuição': 'ins',
  'Investigação': 'inv',
  'Medicina': 'med',
  'Natureza': 'nat',
  'Percepção': 'prc',
  'Persuasão': 'per',
  'Prestidigitação': 'slt',
  'Religião': 'rel',
  'Sobrevivência': 'sur'
};

const FOUNDRY_CLASS_EN_MAP = {
  barbaro: 'Barbarian',
  bardo: 'Bard',
  clerigo: 'Cleric',
  druida: 'Druid',
  guerreiro: 'Fighter',
  ladino: 'Rogue',
  mago: 'Wizard',
  monge: 'Monk',
  paladino: 'Paladin',
  patrulheiro: 'Ranger',
  feiticeiro: 'Sorcerer',
  bruxo: 'Warlock'
};

const FOUNDRY_RACE_EN_MAP = {
  anao: 'Dwarf',
  elfo: 'Elf',
  halfling: 'Halfling',
  humano: 'Human',
  draconato: 'Dragonborn',
  gnomo: 'Gnome',
  meio_elfo: 'Half-Elf',
  meio_orc: 'Half-Orc',
  tiefling: 'Tiefling'
};

const FOUNDRY_BACKGROUND_EN_MAP = {
  acólito: 'Acolyte',
  acólito_alt: 'Acolyte',
  acolito: 'Acolyte',
  artista: 'Entertainer',
  criminoso: 'Criminal',
  eremita: 'Hermit',
  erudito: 'Sage',
  folk_hero: 'Folk Hero',
  heroi_do_povo: 'Folk Hero',
  marinheiro: 'Sailor',
  nobre: 'Noble',
  orfao: 'Urchin',
  soldado: 'Soldier',
  charlatao: 'Charlatan',
  artesao_guilda: 'Guild Artisan',
  guild_artisan: 'Guild Artisan',
  forasteiro: 'Outlander'
};

const FOUNDRY_WEAPON_EN_MAP = {
  adaga: 'Dagger',
  azagaia: 'Javelin',
  bordao: 'Quarterstaff',
  clava: 'Club',
  espada_curta: 'Shortsword',
  espada_longa: 'Longsword',
  florete: 'Rapier',
  foice_curta: 'Sickle',
  lanca: 'Spear',
  machado_de_batalha: 'Battleaxe',
  machado_grande: 'Greataxe',
  machadinha: 'Handaxe',
  malho: 'Maul',
  martelo_de_guerra: 'Warhammer',
  martelo_leve: 'Light Hammer',
  moca: 'Mace',
  alabarda: 'Halberd',
  glaive: 'Glaive',
  pique: 'Pike',
  alabarda_gancho: 'Halberd',
  arco_curto: 'Shortbow',
  arco_longo: 'Longbow',
  besta_leve: 'Light Crossbow',
  besta_pesada: 'Heavy Crossbow',
  besta_de_mao: 'Hand Crossbow',
  dardo: 'Dart',
  funda: 'Sling'
};

const FOUNDRY_ARMOR_EN_MAP = {
  acolchoada: 'Padded Armor',
  couro: 'Leather Armor',
  couro_batido: 'Studded Leather Armor',
  gibao_de_peles: 'Hide Armor',
  camisa_de_malha: 'Chain Shirt',
  brunea: 'Scale Mail',
  peitoral: 'Breastplate',
  meia_armadura: 'Half Plate Armor',
  cota_de_aneis: 'Ring Mail',
  cota_de_malha: 'Chain Mail',
  talas: 'Splint Armor',
  placas: 'Plate Armor',
  escudo: 'Shield'
};

const FOUNDRY_SPELL_EN_MAP = {
  'acid splash': 'Acid Splash',
  'amizade': 'Friends',
  'arma arcana': 'Magic Weapon',
  'arma espiritual': 'Spiritual Weapon',
  'ataque certeiro': 'True Strike',
  'bencao': 'Bless',
  'bola de fogo': 'Fireball',
  'cura pelas mãos': 'Cure Wounds',
  'curar ferimentos': 'Cure Wounds',
  'detect magic': 'Detect Magic',
  'detectar magia': 'Detect Magic',
  'escudo arcano': 'Shield',
  'estabilizar': 'Spare the Dying',
  'luz': 'Light',
  'maos flamejantes': 'Burning Hands',
  'misseis magicos': 'Magic Missile',
  'orientacao': 'Guidance',
  'prestidigitacao': 'Prestidigitation',
  'raio de fogo': 'Fire Bolt',
  'rajada mistica': 'Eldritch Blast',
  'resistencia': 'Resistance',
  'sagrado flamejante': 'Sacred Flame',
  'thaumaturgia': 'Thaumaturgy',
  'toque chocante': 'Shocking Grasp',
  'toque arrepiante': 'Chill Touch'
};

const FOUNDRY_COMPENDIUM_HINTS = {
  class: 'dnd5e.classes',
  subclass: 'dnd5e.subclasses',
  species: 'dnd5e.species',
  background: 'dnd5e.backgrounds',
  weapon: 'dnd5e.items',
  equipment: 'dnd5e.items',
  loot: 'dnd5e.items',
  spell: 'dnd5e.spells',
  feat: 'dnd5e.classfeatures'
};

function montarPayloadExportacao(){
  const p = state.personagem;
  const atributos = Object.fromEntries(ATTRIBUTE_LIST.map(attr => [attr, p.atributos[attr]]));
  const modificadores = Object.fromEntries(ATTRIBUTE_LIST.map(attr => [attr, calcularMod(p.atributos[attr])]));
  const pericias = Object.fromEntries(Object.keys(SKILLS).map(skill => [skill, p.bonusPericias[skill] ?? 0]));
  const saves = Object.fromEntries(Object.entries(p.savesCalculados || {}).map(([k,v]) => [k, v]));

  return {
    schema: 'mini-foundry-offline-1',
    nome: p.nome || '',
    jogador: p.jogador || '',
    modo: state.modo,
    origem: nomeCatalogo(BACKGROUNDS, p.origem),
    raca: nomeCatalogo(RACES, p.raca),
    classe: nomeCatalogo(CLASSES, p.classe),
    subclasse: nomeCatalogo(Object.fromEntries(getSubclassOptions(p.classe).map(s=>[s.key,{nome:s.nome}])), p.subclasse),
    nivel: p.nivel || 1,
    xp: p.xp || 0,
    atributos,
    modificadores,
    pericias,
    saves,
    combate: {
      pvMax: p.pvMax,
      ca: p.combate.classeArmadura,
      iniciativa: p.combate.iniciativa,
      deslocamento: p.deslocamento,
      armadura: ARMORS[p.combate.armadura]?.nome || '',
      escudo: !!p.combate.escudo,
      armaPrincipal: WEAPONS[p.combate.armaPrincipal]?.nome || '',
      armaSecundaria: WEAPONS[p.combate.armaSecundaria]?.nome || '',
      ataques: p.combate.ataques || [],
      ataquesPorAcao: p.combate.ataquesPorAcao || p.progressao?.ataquesPorAcao || 1
    },
    magias: {
      ehConjurador: p.magia.ehConjurador,
      habilidade: p.magia.habilidade,
      cd: p.magia.cdMagia,
      ataque: p.magia.ataqueMagia,
      espacos: p.magia.espacos,
      espacosAtuais: p.magia.espacosAtuais,
      truques: p.magia.listaTruques,
      selecionadas: p.magia.listaMagias,
      concentracaoAtiva: p.magia.concentracaoAtiva,
      rituaisDisponiveis: p.magia.rituaisDisponiveis
    },
    inventario: {
      itens: p.inventario.itens,
      moedas: p.inventario.moedas,
      pesoTotal: p.inventario.pesoTotal,
      capacidadeCarga: p.inventario.capacidadeCarga
    },
    personalidade: {
      tracos: p.personalidade.tracos,
      ideais: p.personalidade.ideais,
      vinculos: p.personalidade.vinculos,
      defeitos: p.personalidade.defeitos,
      descricaoGeral: p.personalidade.descricaoGeral,
      aparencia: p.personalidade.aparencia,
      historia: p.personalidade.historia
    },
    progressao: p.progressao,
    habilidadesClasse: p.habilidadesClasseAtivas || [],
    habilidadesSubclasse: p.habilidadesSubclasseAtivas || [],
    recursosClasse: p.recursosClasse || {},
    efeitosDerivados: (typeof getDerivedEffects === 'function' ? getDerivedEffects(p) : []),
    opcoesClasse: p.opcoesClasse || {},
    opcoesClasseDetalhadas: (typeof describeSelectedClassOptions === 'function' ? describeSelectedClassOptions(p) : []),
    validacao: p.validacaoResumo
  };
}

function baixarTexto(texto, nomeArquivo, mime){
  const blob = new Blob([texto], {type: mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
}

function gerarIdFoundry(prefix='id'){
  if(globalThis.crypto?.randomUUID) return `${prefix}.${crypto.randomUUID()}`;
  return `${prefix}.${Date.now().toString(36)}.${Math.random().toString(36).slice(2,10)}`;
}

function slugFoundry(texto, fallback='entry'){
  return String(texto || fallback)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || fallback;
}

function abilityPtToFoundry(attr){
  return FOUNDRY_ABILITY_MAP[attr] || 'str';
}


function normalizeLookupText(value){
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getCompendiumHint(type){
  return FOUNDRY_COMPENDIUM_HINTS[type] || '';
}

function getEnglishClassName(classKey){
  return FOUNDRY_CLASS_EN_MAP[classKey] || CLASSES[classKey]?.nome || '';
}

function getEnglishRaceName(raceKey){
  return FOUNDRY_RACE_EN_MAP[raceKey] || RACES[raceKey]?.nome || '';
}

function getEnglishBackgroundName(bgKey){
  return FOUNDRY_BACKGROUND_EN_MAP[bgKey] || BACKGROUNDS[bgKey]?.nome || '';
}

function getEnglishWeaponName(weaponKey, weapon){
  return FOUNDRY_WEAPON_EN_MAP[weaponKey] || weapon?.nome || '';
}

function getEnglishArmorName(armorKey, armor){
  return FOUNDRY_ARMOR_EN_MAP[armorKey] || armor?.nome || '';
}

function getEnglishSpellName(name){
  const normalized = normalizeLookupText(name);
  return FOUNDRY_SPELL_EN_MAP[normalized] || name;
}

function createCompendiumMatch(type, ptName, enName, extra={}){
  const names = [ptName, enName].filter(Boolean);
  const slugBase = enName || ptName || type;
  return {
    type,
    pack: getCompendiumHint(type),
    names,
    slugs: [...new Set(names.map(name => slugFoundry(name, slugBase)))],
    ...extra
  };
}

function buildSourceDescriptor(label, page='PHB'){
  return {
    custom: label || 'Construtor offline D&D 5e',
    book: page,
    page: ''
  };
}

function createCompendiumFlags(match, extra={}){
  return {
    dnd5eSheetBuilder: {
      compendiumMatch: match,
      ...extra
    }
  };
}


function getFoundryClassIdentifier(personagem){
  return slugFoundry((getEnglishClassName(personagem.classe) || CLASSES[personagem.classe]?.nome || personagem.classe || 'class'), 'class');
}

function getWeaponTypeValue(weapon){
  const categoria = String(weapon?.categoria || '').toLowerCase();
  const ranged = !!weapon?.ranged;
  if(categoria.includes('marcial')) return ranged ? 'martialR' : 'martialM';
  return ranged ? 'simpleR' : 'simpleM';
}

function getArmorSubtypeValue(armor){
  if(!armor) return 'light';
  if(armor.tipo === 'leve') return 'light';
  if(armor.tipo === 'media') return 'medium';
  if(armor.tipo === 'pesada') return 'heavy';
  return 'natural';
}

function getWeaponAbilityCode(weapon){
  if(!weapon) return '';
  if(weapon.ranged) return 'dex';
  if(weapon.finesse) return 'dex';
  return 'str';
}

function isWeaponProficient(personagem, weapon){
  const profs = (personagem.proficienciasClasse || []).join(' | ').toLowerCase();
  const categoria = String(weapon?.categoria || '').toLowerCase();
  if(categoria.includes('simples') && profs.includes('armas simples')) return true;
  if(categoria.includes('marcial') && profs.includes('armas marciais')) return true;
  return false;
}

function isArmorProficient(personagem, armor){
  const profs = (personagem.proficienciasClasse || []).join(' | ').toLowerCase();
  if(!armor) return true;
  if(armor.tipo === 'leve') return profs.includes('armaduras leves') || profs.includes('todas as armaduras');
  if(armor.tipo === 'media') return profs.includes('armaduras médias') || profs.includes('armaduras medias') || profs.includes('todas as armaduras');
  if(armor.tipo === 'pesada') return profs.includes('armaduras pesadas') || profs.includes('todas as armaduras');
  return true;
}

function getInventoryQuantityByName(personagem, itemName){
  const found = (personagem.inventario?.itens || []).find(i => i.nome === itemName);
  return Number(found?.quantidade || 1);
}

function fillActorResources(personagem){
  const resources = Object.values(personagem.recursosClasse || {}).slice(0, 3);
  const entries = ['primary', 'secondary', 'tertiary'];
  const out = {};
  entries.forEach((slot, index) => {
    const res = resources[index];
    out[slot] = res ? {
      label: res.nome || '',
      value: Number(res.atual || 0),
      max: Number(res.max || 0),
      sr: /curto/i.test(res.recarga || ''),
      lr: /longo/i.test(res.recarga || '') || !/curto/i.test(res.recarga || '')
    } : { label: '', value: 0, max: 0, sr: false, lr: false };
  });
  return out;
}

function inferSpellPreparationMode(personagem, level){
  if(level === 0) return { mode: 'always', prepared: true };
  if(personagem.classe === 'bruxo') return { mode: 'pact', prepared: true };
  const tipo = personagem.magia?.tipo;
  if(tipo === 'preparadas') return { mode: 'prepared', prepared: true };
  if(tipo === 'conhecidas') return { mode: 'known', prepared: true };
  return { mode: 'prepared', prepared: true };
}

function deriveSpellLevelFromName(name){
  const match = String(name).match(/\((\d)º? círculo\)/i);
  return match ? Number(match[1]) : 1;
}

function getSpellNameWithoutLevelTag(name){
  return String(name).replace(/\s*\((\d)º? círculo\)/i, '');
}

function getActorAcCalc(personagem){
  if(personagem.combate?.armadura && personagem.combate.armadura !== 'sem_armadura') return 'flat';
  if(personagem.classe === 'barbaro' || personagem.classe === 'monge') return 'unarmored';
  return 'flat';
}

function getSpellcastingAbilityCode(personagem){
  return personagem.magia?.habilidade ? abilityPtToFoundry(personagem.magia.habilidade) : '';
}

function getFoundrySkillEntry(personagem, skillName){
  const code = FOUNDRY_SKILL_MAP[skillName];
  if(!code) return null;
  return [code, {
    value: (personagem.periciasFinais || []).includes(skillName) ? 1 : 0,
    ability: abilityPtToFoundry(SKILLS[skillName]),
    bonuses: { check: '', passive: '' }
  }];
}

function getFoundrySkillMap(personagem){
  const entries = Object.keys(SKILLS)
    .map(skill => getFoundrySkillEntry(personagem, skill))
    .filter(Boolean);
  return Object.fromEntries(entries);
}

function getFoundryAbilities(personagem){
  const abilities = {};
  for(const attr of ATTRIBUTE_LIST){
    const code = abilityPtToFoundry(attr);
    abilities[code] = {
      value: Number(personagem.atributos[attr] || 10),
      proficient: (personagem.savesClasse || []).includes(ATTRIBUTE_LABELS[attr]) ? 1 : 0,
      bonuses: { check: '', save: '' }
    };
  }
  return abilities;
}

function getFoundrySpells(personagem){
  const spells = {};
  for(let i = 1; i <= 9; i++){
    const isPactOnly = personagem.classe === 'bruxo';
    spells[`spell${i}`] = {
      value: isPactOnly ? 0 : Number(personagem.magia.espacosAtuais?.[i - 1] || 0),
      max: isPactOnly ? 0 : Number(personagem.magia.espacos?.[i - 1] || 0),
      override: null
    };
  }
  spells.pact = {
    value: personagem.classe === 'bruxo' ? Number(personagem.magia.espacosAtuais?.[0] || 0) : 0,
    max: personagem.classe === 'bruxo' ? Number(personagem.magia.espacos?.[0] || 0) : 0,
    level: Number(personagem.magia.nivelEspacosBruxo || 0),
    override: null
  };
  return spells;
}

function mapArmorProfValue(profList){
  const text = (profList || []).join(' | ');
  const values = [];
  if(/todas as armaduras/i.test(text) || /armaduras leves/i.test(text)) values.push('lgt');
  if(/todas as armaduras/i.test(text) || /armaduras médias/i.test(text)) values.push('med');
  if(/todas as armaduras/i.test(text) || /armaduras pesadas/i.test(text)) values.push('hvy');
  if(/escudos/i.test(text)) values.push('shl');
  return values;
}

function mapWeaponProfValue(profList){
  const text = (profList || []).join(' | ');
  const values = [];
  if(/armas simples/i.test(text)) values.push('sim');
  if(/armas marciais/i.test(text)) values.push('mar');
  return values;
}

function getFoundryTraits(personagem){
  return {
    size: 'med',
    languages: {
      value: [],
      custom: (personagem.idiomasRaciais || []).join('; ')
    },
    weaponProf: {
      value: mapWeaponProfValue(personagem.proficienciasClasse),
      custom: (personagem.proficienciasClasse || []).join('; ')
    },
    armorProf: {
      value: mapArmorProfValue(personagem.proficienciasClasse),
      custom: (personagem.proficienciasClasse || []).join('; ')
    },
    toolProf: {
      value: [],
      custom: [
        ...(personagem.ferramentas || []),
        ...((personagem.proficienciasClasse || []).filter(p => /ferramentas|instrumento|kit|veículos/i.test(p)))
      ].join('; ')
    },
    di: { value: [], custom: '' },
    dr: { value: [], custom: '' },
    dv: { value: [], custom: '' },
    ci: { value: [], custom: '' }
  };
}

function buildFoundryWeaponItem(personagem, weaponKey, equipped=false){
  const weapon = WEAPONS[weaponKey];
  if(!weapon) return null;
  const actionType = weapon.ranged ? 'rwak' : 'mwak';
  const englishName = getEnglishWeaponName(weaponKey, weapon);
  const compendiumMatch = createCompendiumMatch('weapon', weapon.nome, englishName, {
    category: getWeaponTypeValue(weapon),
    sourceKey: weaponKey
  });
  return {
    _id: gerarIdFoundry('weapon'),
    name: englishName || weapon.nome,
    type: 'weapon',
    img: 'icons/svg/sword.svg',
    system: {
      description: { value: `<p>Arma exportada pelo construtor offline para importação no Foundry VTT.</p><p><strong>Nome original:</strong> ${escaparHtml(weapon.nome)}</p>`, chat: '', unidentified: '' },
      quantity: getInventoryQuantityByName(personagem, weapon.nome),
      weight: Number(weapon.peso || 0),
      price: { value: Number(weapon.precoGp || 0), denomination: 'gp' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0],
      equipped: !!equipped,
      proficient: isWeaponProficient(personagem, weapon),
      activation: { type: 'action', cost: 1, condition: '' },
      target: { value: null, width: null, units: '', type: '' },
      range: { value: null, long: null, units: '' },
      uses: { spent: 0, max: '', recovery: [] },
      consume: { type: '', target: '', amount: null },
      ability: getWeaponAbilityCode(weapon),
      actionType,
      attack: { bonus: '' },
      type: { value: getWeaponTypeValue(weapon), baseItem: '', subtype: '' },
      damage: {
        base: {
          number: Number(String(weapon.dano || '1d6').split('d')[0] || 1),
          denomination: String(weapon.dano || '1d6').includes('d') ? `d${String(weapon.dano).split('d')[1]}` : 'd6',
          bonus: ''
        },
        versatile: weapon.versatile ? {
          number: Number(String(weapon.versatile).split('d')[0] || 1),
          denomination: `d${String(weapon.versatile).split('d')[1]}`,
          bonus: ''
        } : null,
        types: []
      },
      properties: {
        fin: !!weapon.finesse,
        lgt: weapon.propriedades?.some(p => /leve/i.test(p)) || false,
        hvy: weapon.propriedades?.some(p => /pesada/i.test(p)) || false,
        thr: weapon.propriedades?.some(p => /arremesso/i.test(p)) || false,
        two: weapon.propriedades?.some(p => /duas mãos/i.test(p)) || false,
        ver: !!weapon.versatile,
        amm: weapon.propriedades?.some(p => /munição/i.test(p)) || false
      }
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      sourceKey: weaponKey,
      translatedFrom: weapon.nome,
      categoria: weapon.categoria,
      tipo: weapon.tipo,
      critico: weapon.critico,
      propriedadesOriginais: weapon.propriedades || []
    })
  };
}

function buildFoundryArmorItem(personagem, armorKey, equipped=false){
  const armor = ARMORS[armorKey];
  if(!armor || armorKey === 'sem_armadura') return null;
  const englishName = getEnglishArmorName(armorKey, armor);
  const compendiumMatch = createCompendiumMatch('equipment', armor.nome, englishName, {
    equipmentType: 'armor',
    armorType: getArmorSubtypeValue(armor),
    sourceKey: armorKey
  });
  return {
    _id: gerarIdFoundry('armor'),
    name: englishName || armor.nome,
    type: 'equipment',
    img: 'icons/svg/chestplate.svg',
    system: {
      description: { value: `<p>Armadura exportada pelo construtor offline.</p><p><strong>Nome original:</strong> ${escaparHtml(armor.nome)}</p>`, chat: '', unidentified: '' },
      quantity: getInventoryQuantityByName(personagem, armor.nome),
      weight: Number(armor.peso || 0),
      price: { value: Number(armor.precoGp || 0), denomination: 'gp' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0],
      equipped: !!equipped,
      proficient: isArmorProficient(personagem, armor),
      armor: {
        value: Number(armor.baseCA || 10),
        type: getArmorSubtypeValue(armor),
        dex: armor.dex === 'max2' ? 2 : armor.dex === 'none' ? 0 : null
      },
      type: {
        value: 'armor',
        subtype: getArmorSubtypeValue(armor)
      }
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      sourceKey: armorKey,
      translatedFrom: armor.nome,
      tags: armor.tags || []
    })
  };
}



function buildFoundryShieldItem(personagem, equipped=false){
  if(!personagem.combate?.escudo) return null;
  const shieldName = 'Escudo';
  const englishName = getEnglishArmorName('escudo', { nome: shieldName });
  const compendiumMatch = createCompendiumMatch('equipment', shieldName, englishName, {
    equipmentType: 'shield',
    armorType: 'shield',
    sourceKey: 'escudo'
  });
  return {
    _id: gerarIdFoundry('shield'),
    name: englishName || shieldName,
    type: 'equipment',
    img: 'icons/svg/shield.svg',
    system: {
      description: { value: `<p>Escudo exportado pelo construtor offline.</p><p><strong>Nome original:</strong> ${escaparHtml(shieldName)}</p>`, chat: '', unidentified: '' },
      quantity: 1,
      weight: 6,
      price: { value: 10, denomination: 'gp' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0],
      equipped: !!equipped,
      proficient: (personagem.proficienciasClasse || []).some(p => /escudos/i.test(p)),
      armor: { value: 2, type: 'shield', dex: null },
      type: { value: 'equipment', subtype: 'shield' },
      container: ''
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      generated: true,
      role: 'shield',
      translatedFrom: shieldName
    })
  };
}
function buildFoundryGenericItem(item, index){
  const compendiumMatch = createCompendiumMatch('loot', item.nome, item.nome, {
    sourceKey: `loot-${index}`
  });
  return {
    _id: gerarIdFoundry(`loot${index}`),
    name: item.nome,
    type: 'loot',
    img: 'icons/svg/item-bag.svg',
    system: {
      description: { value: '<p>Item exportado pelo construtor offline.</p>', chat: '', unidentified: '' },
      quantity: Number(item.quantidade || 1),
      weight: Number(item.peso || 0),
      price: { value: Number(item.precoGp || 0), denomination: 'gp' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0],
      equipped: false,
      container: ''
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      original: item
    })
  };
}

function buildFoundrySpellItem(personagem, name, level=0){
  const englishName = getEnglishSpellName(name);
  const compendiumMatch = createCompendiumMatch('spell', name, englishName, {
    level,
    sourceKey: slugFoundry(name, `spell-${level}`)
  });
  return {
    _id: gerarIdFoundry(level === 0 ? 'cantrip' : `spell${level}`),
    name: englishName || name,
    type: 'spell',
    img: 'icons/svg/book.svg',
    system: {
      description: { value: `<p>Magia referenciada pelo construtor offline.</p><p><strong>Nome original:</strong> ${escaparHtml(name)}</p><p>Recomenda-se substituir por uma magia do compêndio SRD no Foundry para automação total.</p>`, chat: '', unidentified: '' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0],
      level,
      school: '',
      preparation: inferSpellPreparationMode(personagem, level),
      activation: { type: 'action', cost: 1, condition: '' },
      target: { value: null, width: null, units: '', type: '' },
      range: { value: null, long: null, units: '' },
      uses: { spent: 0, max: '', recovery: [] },
      consume: { type: '', target: '', amount: null },
      actionType: ''
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      importedBy: 'sheet-builder',
      translatedFrom: name,
      spellLevelGuess: level
    })
  };
}

function buildFoundryFeatureItem(feature, originType, personagem){
  const className = getEnglishClassName(personagem?.classe);
  const featureType = originType === 'subclass-feature' ? 'subclass' : 'feat';
  const englishName = feature.en || feature.nome;
  const compendiumMatch = createCompendiumMatch('feat', feature.nome, englishName, {
    featureType,
    className,
    level: feature.level || 0,
    sourceKey: slugFoundry(feature.nome, originType)
  });
  return {
    _id: gerarIdFoundry(originType),
    name: englishName || feature.nome,
    type: 'feat',
    img: 'icons/svg/upgrade.svg',
    system: {
      description: { value: `<p>${feature.resumo || ''}</p><p><strong>Nome original:</strong> ${escaparHtml(feature.nome)}</p>`, chat: '', unidentified: '' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0],
      type: { value: originType === 'subclass-feature' ? 'class' : 'feat' },
      requirements: feature.level ? `Nível ${feature.level}` : '',
      activities: {},
      uses: { spent: 0, max: '', recovery: [] }
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      originType,
      level: feature.level || null,
      translatedFrom: feature.nome
    })
  };
}

function buildFoundryResourceFeature(resourceKey, resourceValue, personagem){
  const compendiumMatch = createCompendiumMatch('feat', resourceValue.nome || resourceKey, resourceValue.nome || resourceKey, {
    featureType: 'resource',
    className: getEnglishClassName(personagem?.classe),
    sourceKey: resourceKey
  });
  return {
    _id: gerarIdFoundry('resource'),
    name: resourceValue.nome || resourceKey,
    type: 'feat',
    img: 'icons/svg/light.svg',
    system: {
      description: { value: `<p>${resourceValue.detalhe || ''}</p>`, chat: '', unidentified: '' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0],
      type: { value: 'class' },
      uses: {
        spent: Math.max(0, Number(resourceValue.max || 0) - Number(resourceValue.atual || 0)),
        max: String(resourceValue.max || ''),
        recovery: resourceValue.recarga ? [{ period: /curto/i.test(resourceValue.recarga) ? 'sr' : 'lr', type: 'recoverAll' }] : []
      },
      activities: {}
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      resourceKey,
      original: resourceValue
    })
  };
}

function buildFoundryClassItem(personagem){
  const classe = CLASSES[personagem.classe] || {};
  const englishName = getEnglishClassName(personagem.classe);
  const compendiumMatch = createCompendiumMatch('class', classe.nome || 'Classe', englishName, {
    sourceKey: personagem.classe,
    level: Number(personagem.nivel || 1)
  });
  return {
    _id: gerarIdFoundry('class'),
    name: englishName || classe.nome || 'Classe',
    type: 'class',
    img: 'icons/svg/book.svg',
    system: {
      description: { value: `<p>Classe principal exportada pelo construtor offline.</p><p><strong>Nome original:</strong> ${escaparHtml(classe.nome || personagem.classe || 'Classe')}</p>`, chat: '', unidentified: '' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0],
      levels: Number(personagem.nivel || 1),
      hitDice: `d${Number(classe.dadoVida || personagem.dadoVida || 8)}`,
      spellcasting: { progression: personagem.magia?.tipo === 'conhecidas' || personagem.magia?.tipo === 'preparadas' ? (SPELLCASTERS[personagem.classe]?.meioConjurador ? 'half' : personagem.classe === 'bruxo' ? 'pact' : 'full') : 'none', ability: getSpellcastingAbilityCode(personagem) },
      advancement: [],
      wealth: '',
      primaryAbility: []
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      sourceKey: personagem.classe,
      translatedFrom: classe.nome || personagem.classe,
      nivel: personagem.nivel
    })
  };
}

function buildFoundrySubclassItem(personagem){
  if(!personagem.subclasse) return null;
  const subclasses = getSubclassOptions(personagem.classe);
  const sub = subclasses.find(s => s.key === personagem.subclasse);
  if(!sub) return null;
  const englishName = sub.en || sub.nome;
  const compendiumMatch = createCompendiumMatch('subclass', sub.nome, englishName, {
    className: getEnglishClassName(personagem.classe),
    classIdentifier: getFoundryClassIdentifier(personagem),
    sourceKey: personagem.subclasse
  });
  return {
    _id: gerarIdFoundry('subclass'),
    name: englishName || sub.nome,
    type: 'subclass',
    img: 'icons/svg/upgrade.svg',
    system: {
      description: { value: `<p>Subclasse exportada pelo construtor offline.</p><p><strong>Nome original:</strong> ${escaparHtml(sub.nome)}</p>`, chat: '', unidentified: '' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0],
      classIdentifier: getFoundryClassIdentifier(personagem)
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      sourceKey: personagem.subclasse,
      translatedFrom: sub.nome,
      parentClass: personagem.classe
    })
  };
}

function buildFoundrySpeciesItem(personagem){
  const race = RACES[personagem.raca];
  if(!race) return null;
  const englishName = getEnglishRaceName(personagem.raca);
  const compendiumMatch = createCompendiumMatch('species', race.nome, englishName, {
    sourceKey: personagem.raca
  });
  return {
    _id: gerarIdFoundry('species'),
    name: englishName || race.nome,
    type: 'species',
    img: 'icons/svg/mystery-man.svg',
    system: {
      description: { value: `<p>Traços: ${(race.traits || []).join(', ') || '—'}</p><p><strong>Nome original:</strong> ${escaparHtml(race.nome)}</p>`, chat: '', unidentified: '' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0]
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      sourceKey: personagem.raca,
      translatedFrom: race.nome,
      traits: race.traits || []
    })
  };
}

function buildFoundryBackgroundItem(personagem){
  const bg = BACKGROUNDS[personagem.origem];
  if(!bg) return null;
  const englishName = getEnglishBackgroundName(personagem.origem);
  const compendiumMatch = createCompendiumMatch('background', bg.nome, englishName, {
    sourceKey: personagem.origem
  });
  return {
    _id: gerarIdFoundry('background'),
    name: englishName || bg.nome,
    type: 'background',
    img: 'icons/svg/scroll.svg',
    system: {
      description: { value: `<p>Característica: ${bg.caracteristica || '—'}</p><p><strong>Nome original:</strong> ${escaparHtml(bg.nome)}</p>`, chat: '', unidentified: '' },
      source: buildSourceDescriptor('Construtor offline D&D 5e', 'PHB'),
      identifier: compendiumMatch.slugs[0]
    },
    effects: [],
    flags: createCompendiumFlags(compendiumMatch, {
      sourceKey: personagem.origem,
      translatedFrom: bg.nome,
      pericias: bg.pericias || [],
      ferramentas: bg.ferramentas || []
    })
  };
}

function montarFoundryItems(personagem){
  const items = [];
  const classItem = buildFoundryClassItem(personagem);
  if(classItem) items.push(classItem);
  const subclassItem = buildFoundrySubclassItem(personagem);
  if(subclassItem) items.push(subclassItem);
  const speciesItem = buildFoundrySpeciesItem(personagem);
  if(speciesItem) items.push(speciesItem);
  const backgroundItem = buildFoundryBackgroundItem(personagem);
  if(backgroundItem) items.push(backgroundItem);

  for(const feature of (personagem.habilidadesClasseAtivas || [])) items.push(buildFoundryFeatureItem(feature, 'class-feature', personagem));
  for(const feature of (personagem.habilidadesSubclasseAtivas || [])) items.push(buildFoundryFeatureItem(feature, 'subclass-feature', personagem));
  for(const [key, value] of Object.entries(personagem.recursosClasse || {})) items.push(buildFoundryResourceFeature(key, value, personagem));

  const primaryWeapon = buildFoundryWeaponItem(personagem, personagem.combate?.armaPrincipal, true);
  const secondaryWeapon = buildFoundryWeaponItem(personagem, personagem.combate?.armaSecundaria, true);
  if(primaryWeapon) items.push(primaryWeapon);
  if(secondaryWeapon && secondaryWeapon.name !== primaryWeapon?.name) items.push(secondaryWeapon);

  const armorItem = buildFoundryArmorItem(personagem, personagem.combate?.armadura, true);
  if(armorItem) items.push(armorItem);
  const shieldItem = buildFoundryShieldItem(personagem, true);
  if(shieldItem) items.push(shieldItem);

  const reservedNames = new Set([
    primaryWeapon?.name,
    primaryWeapon?.flags?.dnd5eSheetBuilder?.translatedFrom,
    secondaryWeapon?.name,
    secondaryWeapon?.flags?.dnd5eSheetBuilder?.translatedFrom,
    armorItem?.name,
    armorItem?.flags?.dnd5eSheetBuilder?.translatedFrom,
    shieldItem?.name,
    shieldItem?.flags?.dnd5eSheetBuilder?.translatedFrom
  ].filter(Boolean).map(v => normalizeLookupText(v)));

  (personagem.inventario?.itens || []).forEach((item, index) => {
    const normalized = slugFoundry(item.nome, `item-${index}`);
    if(reservedNames.has(normalizeLookupText(item.nome)) || /escudo/i.test(item.nome)) return;
    if(items.some(existing => existing.system?.identifier === normalized)) return;
    items.push(buildFoundryGenericItem(item, index));
  });

  (personagem.magia?.listaTruques || []).forEach(name => items.push(buildFoundrySpellItem(personagem, name, 0)));
  (personagem.magia?.listaMagias || []).forEach(name => {
    const level = deriveSpellLevelFromName(name);
    items.push(buildFoundrySpellItem(personagem, getSpellNameWithoutLevelTag(name), level));
  });

  return items;
}

function montarFoundryActor(){
  const p = state.personagem;
  const payload = montarPayloadExportacao();
  const biographyParts = [
    p.personalidade?.descricaoGeral ? `<p><strong>Descrição geral:</strong> ${escaparHtml(p.personalidade.descricaoGeral)}</p>` : '',
    p.personalidade?.aparencia ? `<p><strong>Aparência:</strong> ${escaparHtml(p.personalidade.aparencia)}</p>` : '',
    p.personalidade?.historia ? `<p><strong>História:</strong> ${escaparHtml(p.personalidade.historia)}</p>` : '',
    (p.personalidade?.tracos || []).length ? `<p><strong>Traços:</strong> ${p.personalidade.tracos.map(escaparHtml).join(' | ')}</p>` : '',
    (p.personalidade?.ideais || []).length ? `<p><strong>Ideais:</strong> ${p.personalidade.ideais.map(escaparHtml).join(' | ')}</p>` : '',
    (p.personalidade?.vinculos || []).length ? `<p><strong>Vínculos:</strong> ${p.personalidade.vinculos.map(escaparHtml).join(' | ')}</p>` : '',
    (p.personalidade?.defeitos || []).length ? `<p><strong>Defeitos:</strong> ${p.personalidade.defeitos.map(escaparHtml).join(' | ')}</p>` : ''
  ].filter(Boolean).join('');

  return {
    name: p.nome || 'Personagem sem nome',
    type: 'character',
    img: 'icons/svg/mystery-man.svg',
    prototypeToken: {
      name: p.nome || 'Personagem',
      actorLink: true,
      disposition: 1,
      displayName: 20,
      displayBars: 20,
      bar1: { attribute: 'attributes.hp' },
      bar2: { attribute: '' },
      randomImg: false,
      appendNumber: false,
      prependAdjective: false
    },
    system: {
      abilities: getFoundryAbilities(p),
      attributes: {
        ac: {
          flat: Number(p.combate?.classeArmadura || 10),
          calc: getActorAcCalc(p),
          formula: '',
          bonus: 0,
          cover: 0,
          min: null
        },
        hp: {
          value: Number(p.pvMax || 1),
          max: Number(p.pvMax || 1),
          temp: 0,
          tempmax: 0,
          bonuses: { level: '', overall: '' }
        },
        init: { ability: 'dex', bonus: '', roll: payload.combate.iniciativa || 0 },
        movement: { walk: Number(p.deslocamento || 30), burrow: 0, climb: 0, fly: 0, swim: 0, units: 'ft', hover: false },
        senses: { darkvision: 0, blindsight: 0, tremorsense: 0, truesight: 0, units: 'ft', special: '' },
        spellcasting: getSpellcastingAbilityCode(p),
        prof: Number(p.bonusProficiencia || 2),
        inspiration: false,
        exhaustion: 0,
        encumbrance: {
          value: Number(p.inventario?.pesoTotal || 0),
          max: Number(p.inventario?.capacidadeCarga || 0),
          pct: 0,
          encumbered: false
        }
      },
      details: {
        level: Number(p.nivel || 1),
        xp: { value: Number(p.xp || 0) },
        race: nomeCatalogo(RACES, p.raca),
        background: nomeCatalogo(BACKGROUNDS, p.origem),
        biography: { value: biographyParts, public: '' },
        alignment: '',
        appearance: p.personalidade?.aparencia || '',
        ideal: (p.personalidade?.ideais || []).join(' | '),
        bond: (p.personalidade?.vinculos || []).join(' | '),
        flaw: (p.personalidade?.defeitos || []).join(' | '),
        trait: (p.personalidade?.tracos || []).join(' | ')
      },
      skills: getFoundrySkillMap(p),
      currency: {
        pp: Number(p.inventario?.moedas?.pp || 0),
        gp: Number(p.inventario?.moedas?.gp || 0),
        ep: Number(p.inventario?.moedas?.ep || 0),
        sp: Number(p.inventario?.moedas?.sp || 0),
        cp: Number(p.inventario?.moedas?.cp || 0)
      },
      spells: getFoundrySpells(p),
      bonuses: {
        mwak: { attack: '', damage: '' },
        rwak: { attack: '', damage: '' },
        msak: { attack: '', damage: '' },
        rsak: { attack: '', damage: '' },
        abilities: { check: '', save: '', skill: '' },
        spell: { dc: '' }
      },
      traits: getFoundryTraits(p),
      resources: fillActorResources(p)
    },
    items: montarFoundryItems(p),
    effects: [],
    folder: null,
    sort: 0,
    ownership: { default: 0 },
    flags: {
      dnd5eSheetBuilder: {
        exportType: 'foundry-actor-v14-dnd5e-5.3x-stage3',
        exportedAt: new Date().toISOString(),
        sourceBackup: payload,
        targetFoundryVersion: '14',
        targetSystemVersion: 'dnd5e 5.3.x',
        notes: [
          'Etapa 3: exportação orientada a compêndio/SRD para Foundry V14 + D&D 5e 5.3.x.',
          'Itens exportados passam a usar nomes e identificadores mais próximos do ecossistema SRD em inglês, mantendo o nome original em flags e descrição.',
          'Cada item leva dicas de pack e slugs candidatos em flags.dnd5eSheetBuilder.compendiumMatch para facilitar substituição por compêndio dentro do Foundry.'
        ]
      }
    }
  };
}

function exportarFoundryActorJSON(){
  const actor = montarFoundryActor();
  baixarTexto(JSON.stringify(actor, null, 2), obterNomeArquivo('personagem_foundry_actor', 'json'), 'application/json;charset=utf-8');
}

function exportarBackupJSON(){
  const payload = montarPayloadExportacao();
  baixarTexto(JSON.stringify(payload, null, 2), obterNomeArquivo('personagem_backup_projeto', 'json'), 'application/json;charset=utf-8');
}

function exportarJSON(){
  exportarFoundryActorJSON();
}

function escaparHtml(valor){
  return String(valor ?? '').replace(/[&<>\"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
}

function gerarHtmlFicha(){
  const p = state.personagem;
  const payload = montarPayloadExportacao();
  const atributos = ATTRIBUTE_LIST.map(attr => `<div class="box"><strong>${ATTRIBUTE_LABELS[attr]}</strong><span>${payload.atributos[attr]}</span><small>Mod ${valorFormatadoBonus(payload.modificadores[attr])}</small></div>`).join('');
  const pericias = Object.entries(payload.pericias).map(([nome,bonus]) => `<tr><td>${escaparHtml(nome)}</td><td>${valorFormatadoBonus(bonus)}</td></tr>`).join('');
  const saves = Object.entries(payload.saves).map(([nome,bonus]) => `<tr><td>${escaparHtml(nome)}</td><td>${valorFormatadoBonus(bonus)}</td></tr>`).join('');
  const inventario = payload.inventario.itens.map(item => `<tr><td>${escaparHtml(item.nome)}</td><td>${item.quantidade}</td><td>${item.pesoTotal}</td></tr>`).join('') || `<tr><td colspan="3">Nenhum item</td></tr>`;
  const ataques = (payload.combate.ataques || []).map(a => `<tr><td>${escaparHtml(a.nome)}</td><td>${valorFormatadoBonus(a.bonusAtaque || 0)}</td><td>${escaparHtml(a.dano || '-')}${a.danoVersatil ? ` / ${escaparHtml(a.danoVersatil)}` : ''}</td><td>${escaparHtml(a.atributo || '-')}</td></tr>`).join('') || `<tr><td colspan="4">Nenhum ataque</td></tr>`;
  const habilidadesClasse = (payload.habilidadesClasse || []).map(f => `<li><strong>${escaparHtml(f.nome)}</strong> <span class="muted">(nível ${f.level})</span><br><small>${escaparHtml(f.resumo)}</small></li>`).join('') || `<li>Nenhuma habilidade listada.</li>`;
  const habilidadesSubclasse = (payload.habilidadesSubclasse || []).map(f => `<li><strong>${escaparHtml(f.nome)}</strong> <span class="muted">(nível ${f.level})</span><br><small>${escaparHtml(f.resumo)}</small></li>`).join('') || `<li>Nenhum traço de subclasse listado.</li>`;
  const recursosClasse = Object.values(payload.recursosClasse || {}).map(r => `<li><strong>${escaparHtml(r.nome)}</strong>: ${r.atual}/${r.max} <span class="muted">(${escaparHtml(r.recarga)})</span>${r.detalhe?`<br><small class="muted">${escaparHtml(r.detalhe)}</small>`:''}</li>`).join('') || `<li>Nenhum recurso rastreável.</li>`;
  const efeitosDerivados = (payload.efeitosDerivados || []).map(e => `<li><strong>${escaparHtml(e.titulo)}</strong>: ${escaparHtml(e.valor)}${e.detalhe?`<br><small class="muted">${escaparHtml(e.detalhe)}</small>`:''}</li>`).join('') || `<li>Nenhum efeito derivado adicional.</li>`;
  const magias = !payload.magias.ehConjurador ? `<p>Classe sem conjuração.</p>` : `<p><strong>CD:</strong> ${payload.magias.cd} | <strong>Ataque:</strong> ${valorFormatadoBonus(payload.magias.ataque || 0)}</p><p><strong>Espaços:</strong> ${(payload.magias.espacos || []).map((v,i)=>v?`${i+1}º ${payload.magias.espacosAtuais[i]||0}/${v}`:'').filter(Boolean).join(' • ') || 'Nenhum'}</p><p><strong>Truques:</strong> ${(payload.magias.truques || []).join(', ') || 'Nenhum'}</p><p><strong>Magias:</strong> ${(payload.magias.selecionadas || []).join(', ') || 'Nenhuma'}</p>`;
  const personalidade = `<p><strong>Traços:</strong> ${(p.personalidade.tracos || []).join(' | ') || '-'}</p><p><strong>Ideais:</strong> ${(p.personalidade.ideais || []).join(' | ') || '-'}</p><p><strong>Vínculos:</strong> ${(p.personalidade.vinculos || []).join(' | ') || '-'}</p><p><strong>Defeitos:</strong> ${(p.personalidade.defeitos || []).join(' | ') || '-'}</p><p><strong>Descrição:</strong> ${escaparHtml(p.personalidade.descricaoGeral || '-')}</p><p><strong>Aparência:</strong> ${escaparHtml(p.personalidade.aparencia || '-')}</p><p><strong>História:</strong> ${escaparHtml(p.personalidade.historia || '-')}</p>`;
  const status = p.validacaoResumo?.status === 'oficial' ? '✔ personagem válido' : (p.validacaoResumo?.status === 'customizado' ? '⚠ personagem customizado' : '⚠ revisão pendente');

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Ficha D&D 5e</title><style>
    body{font-family:Arial,Helvetica,sans-serif;margin:24px;color:#111} h1,h2{margin:0 0 10px} .header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:16px} .sheet{display:grid;grid-template-columns:1.15fr .85fr;gap:16px} .section{border:1px solid #222;border-radius:8px;padding:12px;margin-bottom:12px} .boxes{display:grid;grid-template-columns:repeat(3,1fr);gap:10px} .box{border:1px solid #444;border-radius:8px;padding:10px;text-align:center} table{width:100%;border-collapse:collapse} td,th{border-bottom:1px solid #ddd;padding:6px;text-align:left;vertical-align:top} .muted{color:#666} @media print {body{margin:10mm} button{display:none}}
  </style></head><body><div class="header"><div><h1>${escaparHtml(payload.nome || 'Personagem sem nome')}</h1><p><strong>Jogador:</strong> ${escaparHtml(payload.jogador || '-')} | <strong>Classe:</strong> ${escaparHtml(payload.classe)} | <strong>Subclasse:</strong> ${escaparHtml(payload.subclasse || '-')} | <strong>Raça:</strong> ${escaparHtml(payload.raca)} | <strong>Nível:</strong> ${payload.nivel}</p><p><strong>Origem:</strong> ${escaparHtml(payload.origem)} | <strong>Modo:</strong> ${escaparHtml(payload.modo || '-')}</p></div><div><strong>${status}</strong></div></div><div class="sheet"><div><section class="section"><h2>Atributos</h2><div class="boxes">${atributos}</div></section><section class="section"><h2>Combate</h2><p><strong>PV:</strong> ${payload.combate.pvMax} | <strong>CA:</strong> ${payload.combate.ca} | <strong>Iniciativa:</strong> ${valorFormatadoBonus(payload.combate.iniciativa)} | <strong>Ataques/ação:</strong> ${payload.combate.ataquesPorAcao}</p><p><strong>Armadura:</strong> ${escaparHtml(payload.combate.armadura)} | <strong>Escudo:</strong> ${payload.combate.escudo ? 'Sim' : 'Não'}</p><p><strong>Armas:</strong> ${escaparHtml(payload.combate.armaPrincipal)} / ${escaparHtml(payload.combate.armaSecundaria)}</p></section><section class="section"><h2>Ataques</h2><table><thead><tr><th>Arma</th><th>Bônus</th><th>Dano</th><th>Atributo</th></tr></thead><tbody>${ataques}</tbody></table></section><section class="section"><h2>Perícias</h2><table><tbody>${pericias}</tbody></table></section><section class="section"><h2>Resistências</h2><table><tbody>${saves}</tbody></table></section></div><div><section class="section"><h2>Habilidades de Classe</h2><ul>${habilidadesClasse}</ul></section><section class="section"><h2>Subclasse</h2><ul>${habilidadesSubclasse}</ul></section><section class="section"><h2>Recursos</h2><ul>${recursosClasse}</ul></section><section class="section"><h2>Efeitos Derivados</h2><ul>${efeitosDerivados}</ul></section><section class="section"><h2>Escolhas de Classe</h2><ul>${(payload.opcoesClasseDetalhadas||[]).map(v=>`<li>${escaparHtml(v)}</li>`).join('') || '<li>Nenhuma escolha adicional registrada.</li>'}</ul></section><section class="section"><h2>Magias</h2>${magias}</section><section class="section"><h2>Inventário</h2><table><thead><tr><th>Item</th><th>Qtd</th><th>Peso</th></tr></thead><tbody>${inventario}</tbody></table><p><strong>Peso:</strong> ${payload.inventario.pesoTotal}/${payload.inventario.capacidadeCarga}</p></section><section class="section"><h2>Personalidade</h2>${personalidade}</section></div></div><script>window.onload=()=>window.print();</script></body></html>`;
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
