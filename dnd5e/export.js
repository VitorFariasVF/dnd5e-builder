function obterNomeArquivo(base, ext){
  const nome = (state.personagem.nome || "personagem_dnd").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");
  return `${nome || base}.${ext}`;
}

/* Alvo do JSON Foundry: sistema dnd5e 5.3.x (5.3.3 é a mais nova nas notas consultadas em 2026-11-17)
   com Foundry v13. Estrutura de itens: `system.activities` por id (desde 4.0), `system.advancement` como objeto
   (desde 5.3.0). Não testado em Foundry real. Ver docs/TRABALHO_DND5E_EXPORT.md. */
const FOUNDRY_SYSTEM_VERSION = '5.3.3';

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
  forasteiro: 'Outlander',
  sabio: 'Sage',
  heroi_povo: 'Folk Hero',
  /* Antecedentes de 2024 (chaves do rules.js). Nomes conferidos no reveal do Livro do Jogador 2024 (EN World). */
  artesao: 'Artisan',
  fazendeiro: 'Farmer',
  guarda: 'Guard',
  guia: 'Guide',
  mercador: 'Merchant',
  escriba: 'Scribe',
  viajante: 'Wayfarer'
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
  funda: 'Sling',
  tacape: 'Greatclub',
  mangual: 'Flail',
  espada_grande: 'Greatsword',
  lanca_montaria: 'Lance',
  maca_estrela: 'Morningstar',
  cimitarra: 'Scimitar',
  tridente: 'Trident',
  picareta_guerra: 'War Pick',
  chicote: 'Whip',
  zarabatana: 'Blowgun',
  rapieira: 'Rapier',
  maca: 'Mace',
  machado_batalha: 'Battleaxe',
  martelo_guerra: 'Warhammer',
  besta_mao: 'Hand Crossbow'
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
  escudo: 'Shield',
  acolchoada: 'Padded Armor',
  gibao_peles: 'Hide Armor',
  camisa_malha: 'Chain Shirt',
  cota_escamas: 'Scale Mail',
  cota_aneis: 'Ring Mail',
  cota_malha: 'Chain Mail',
  meia_armadura: 'Half Plate Armor'
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
  'absorver elementos': 'Absorb Elements',
  'catapulta': 'Catapult',
  'causar medo': 'Cause Fear',
  'cerimonia': 'Ceremony',
  'chamuscar de aganazzar': "Aganazzar's Scorcher",
  'controlar chamas': 'Control Flames',
  'criar fogueira': 'Create Bonfire',
  'dispersao': 'Scatter',
  'dobre dos mortos': 'Toll the Dead',
  'enemies em todo lugar': 'Enemies Abound',
  'enimigos em todo lugar': 'Enemies Abound',
  'esfera aquosa': 'Watery Sphere',
  'esfera tempestuosa': 'Storm Sphere',
  'esfera vitriolica': 'Vitriolic Sphere',
  'espinho mental': 'Mind Spike',
  'espirito curativo': 'Healing Spirit',
  'estatica sinaptica': 'Synaptic Static',
  'faca de gelo': 'Ice Knife',
  'flecha relampejante': 'Lightning Arrow',
  'forma gasosa': 'Gaseous Form',
  'golpe do vento cortante': 'Steel Wind Strike',
  'infestacao': 'Infestation',
  'inseto gigante': 'Giant Insect',
  'lamina sombria': 'Shadow Blade',
  'liberdade de movimento': 'Freedom of Movement',
  'luz enfermica': 'Sickening Radiance',
  'moldar terra': 'Mold Earth',
  'mordida gelida': 'Frostbite',
  'montaria fantasmagorica': 'Phantom Steed',
  'muralha de agua': 'Wall of Water',
  'muralha de areia': 'Wall of Sand',
  'nevasca de snilloc': "Snilloc's Snowball Swarm",
  'onda de mare': 'Tidal Wave',
  'passo arboreo': 'Tree Stride',
  'passo trovejante': 'Thunder Step',
  'pedra magica': 'Magic Stone',
  'pirotecnia': 'Pyrotechnics',
  'prender a terra': 'Earthbind',
  'rajada de po': 'Dust Devil',
  'rajada trovejante': 'Thunderclap',
  'raio do caos': 'Chaos Bolt',
  'raio enlouquecedor': 'Maddening Darkness',
  'selvageria primal': 'Primal Savagery',
  'soneca': 'Catnap',
  'sopro do dragao': "Dragon's Breath",
  'transmutar rocha': 'Transmute Rock',
  'tremor de terra': 'Earth Tremor',
  'vento trovejante': 'Thunderwave',
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
  'toque arrepiante': 'Chill Touch',
  'absorver elementos': 'Absorb Elements',
  'armadilha': 'Snare',
  'ataque zefiro': 'Zephyr Strike',
  'banimento': 'Banishment',
  'catapulta': 'Catapult',
  'causar medo': 'Cause Fear',
  'controlar chamas': 'Control Flames',
  'criar fogueira': 'Create Bonfire',
  'dobre dos mortos': 'Toll the Dead',
  'espinho mental': 'Mind Spike',
  'espirito curativo': 'Healing Spirit',
  'estatica sinaptica': 'Synaptic Static',
  'faca de gelo': 'Ice Knife',
  'flecha relampejante': 'Lightning Arrow',
  'golpe do vento cortante': 'Steel Wind Strike',
  'guardiaes espirituais': 'Spirit Guardians',
  'infestacao': 'Infestation',
  'inimigos em todo lugar': 'Enemies Abound',
  'lamina sombria': 'Shadow Blade',
  'montaria fantasmagorica': 'Phantom Steed',
  'mordida gelida': 'Frostbite',
  'muralha de agua': 'Wall of Water',
  'muralha de areia': 'Wall of Sand',
  'onda de mare': 'Tidal Wave',
  'palavra de radiancia': 'Word of Radiance',
  'passo trovejante': 'Thunder Step',
  'pedra magica': 'Magic Stone',
  'prender a terra': 'Earthbind',
  'raio do caos': 'Chaos Bolt',
  'selvageria primal': 'Primal Savagery',
  'sopro do dragao': "Dragon's Breath",
  'tremor de terra': 'Earth Tremor',
  'vinculo protetor': 'Warding Bond'
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
    regras: getRulesEdition(),
    talentoOrigem: p.talentoOrigem || '',
    bonusOrigem2024: p.bonusOrigem2024 || null,
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
  try {
    const blob = new Blob([texto], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(url);
    }, 1000);
    return true;
  } catch (erro) {
    console.error('Falha ao baixar arquivo:', erro);
    alert('Não foi possível gerar o arquivo JSON. Verifique o console do navegador.');
    return false;
  }
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

function spellIsFromXanathar(name, classe){
  const normalized = normalizeLookupText(name);
  const classesToCheck = classe ? [classe] : Object.keys(globalThis.XANATHAR_SPELLS || {});
  return classesToCheck.some(key => Object.values((globalThis.XANATHAR_SPELLS || {})[key] || {}).some(list => (list || []).some(spell => normalizeLookupText(spell) === normalized)));
}

function getSubclassSourceBook(personagem){
  const sub = (typeof getSubclassOptions === 'function' ? getSubclassOptions(personagem?.classe || '') : []).find(s => s.key === personagem?.subclasse);
  return sub?.source || 'PHB';
}

function getFeatureSourceBook(feature, originType, personagem){
  if(feature?.source) return feature.source;
  if(originType === 'subclass-feature') return getSubclassSourceBook(personagem);
  return 'PHB';
}

function getResourceSourceBook(personagem){
  return getSubclassSourceBook(personagem);
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


/* A edição vem do tipo de ficha escolhido (state.regras); o argumento `rules` é ignorado de propósito
   para que o ator nunca misture 2014 e 2024. */
function buildFoundrySource(book='PHB', rules){
  const edicao = getRulesEdition();
  const livro = book === 'PHB 2024' ? 'PHB' : book;
  const normalizedBook = livro === 'XGtE' ? "Xanathar's Guide to Everything" : (edicao === '2024' && livro === 'PHB' ? "Player's Handbook (2024)" : livro);
  rules = edicao;

  return {
    book: normalizedBook,
    page: '',
    license: '',
    custom: 'Construtor offline D&D 5e',
    rules,
    revision: 1
  };
}

function buildFoundryRoll(){
  return { min: null, max: null, mode: 0 };
}


function buildFoundryDescription(value=''){
  return { value, chat: '' };
}

function buildFoundryStats(){
  const now = Date.now();
  return {
    compendiumSource: null,
    duplicateSource: null,
    exportSource: null,
    coreVersion: '13.351',
    systemId: 'dnd5e',
    systemVersion: FOUNDRY_SYSTEM_VERSION,
    createdTime: now,
    modifiedTime: now,
    lastModifiedBy: null
  };
}

function finalizeFoundryDocument(doc){
  return {
    _id: doc._id,
    name: doc.name,
    type: doc.type,
    system: doc.system || {},
    flags: doc.flags || {},
    img: doc.img || '',
    effects: doc.effects || [],
    folder: doc.folder ?? null,
    sort: doc.sort ?? 0,
    _stats: doc._stats || buildFoundryStats(),
    ownership: doc.ownership || { default: 0 }
  };
}

function getFoundryWeaponBaseItem(weaponKey){
  const map = {
    adaga:'dagger', azagaia:'javelin', bordao:'quarterstaff', clava:'club',
    espada_curta:'shortsword', espada_longa:'longsword', florete:'rapier', foice_curta:'sickle',
    lanca:'spear', machado_de_batalha:'battleaxe', machado_grande:'greataxe', machadinha:'handaxe',
    malho:'maul', martelo_de_guerra:'warhammer', martelo_leve:'lighthammer', moca:'mace',
    alabarda:'halberd', glaive:'glaive', pique:'pike', arco_curto:'shortbow', arco_longo:'longbow',
    besta_leve:'lightcrossbow', besta_pesada:'heavycrossbow', besta_de_mao:'handcrossbow',
    dardo:'dart', funda:'sling', tacape:'greatclub', mangual:'flail', espada_grande:'greatsword',
    lanca_montaria:'lance', maca_estrela:'morningstar', cimitarra:'scimitar', tridente:'trident',
    picareta_guerra:'warpick', chicote:'whip', zarabatana:'blowgun', rapieira:'rapier', maca:'mace',
    machado_batalha:'battleaxe', martelo_guerra:'warhammer', besta_mao:'handcrossbow'
  };
  return map[weaponKey] || '';
}

function getFoundryArmorBaseItem(armorKey){
  const map = {
    acolchoada:'paddedarmor', couro:'leatherarmor', couro_batido:'studdedleatherarmor',
    gibao_de_peles:'hidearmor', camisa_de_malha:'chainshirt', brunea:'scalemail',
    peitoral:'breastplate', meia_armadura:'halfplatearmor', cota_de_aneis:'ringmail',
    cota_de_malha:'chainmail', talas:'splintarmor', placas:'platearmor', escudo:'shield',
    acolchoada:'paddedarmor', gibao_peles:'hidearmor', camisa_malha:'chainshirt', cota_escamas:'scalemail',
    cota_aneis:'ringmail', cota_malha:'chainmail', meia_armadura:'halfplatearmor'
  };
  return map[armorKey] || '';
}

function getFoundryItemImage(type){
  const map = {
    class:'icons/svg/book.svg',
    subclass:'icons/svg/upgrade.svg',
    race:'icons/svg/mystery-man.svg',
    background:'icons/svg/scroll.svg',
    feat:'icons/svg/upgrade.svg',
    spell:'icons/svg/book.svg',
    weapon:'icons/svg/sword.svg',
    equipment:'icons/svg/chestplate.svg',
    loot:'icons/svg/item-bag.svg'
  };
  return map[type] || 'icons/svg/item-bag.svg';
}

function buildFoundryToken(personagem, senses={ darkvision: 0, blindsight: 0, tremorsense: 0, truesight: 0 }){
  const visionRange = Number(senses.darkvision || senses.blindsight || senses.tremorsense || senses.truesight || 0);
  return {
    name: personagem.nome || 'Personagem',
    displayName: 0,
    actorLink: true,
    width: 1,
    height: 1,
    texture: {
      src: 'icons/svg/mystery-man.svg',
      anchorX: 0.5,
      anchorY: 0.5,
      offsetX: 0,
      offsetY: 0,
      fit: 'contain',
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      tint: '#ffffff',
      alphaThreshold: 0.75
    },
    lockRotation: false,
    rotation: 0,
    alpha: 1,
    disposition: 1,
    displayBars: 0,
    bar1: { attribute: 'attributes.hp' },
    bar2: { attribute: null },
    light: {
      negative: false,
      priority: 0,
      alpha: 0.5,
      angle: 360,
      bright: 0,
      color: null,
      coloration: 1,
      dim: 0,
      attenuation: 0.5,
      luminosity: 0.5,
      saturation: 0,
      contrast: 0,
      shadows: 0,
      animation: { type: null, speed: 5, intensity: 5, reverse: false },
      darkness: { min: 0, max: 1 }
    },
    sight: {
      enabled: true,
      range: visionRange,
      angle: 360,
      visionMode: visionRange ? 'darkvision' : 'basic',
      color: null,
      attenuation: 0,
      brightness: 0,
      saturation: -1,
      contrast: 0
    },
    detectionModes: [],
    occludable: { radius: 0 },
    ring: {
      enabled: false,
      colors: { ring: null, background: null },
      effects: 1,
      subject: { scale: 1, texture: null }
    },
    turnMarker: { mode: 1, animation: null, src: null, disposition: false },
    movementAction: null,
    flags: {},
    randomImg: false,
    appendNumber: false,
    prependAdjective: false
  };
}

function getFoundrySenses(personagem){
  const racial = RACES[personagem.raca] || {};
  const traitList = (racial.traits || []).join(' | ').toLowerCase();
  const darkvision = /vis[aã]o no escuro|darkvision/.test(traitList) ? 60 : 0;
  return {
    blindsight: 0,
    darkvision,
    tremorsense: 0,
    truesight: 0
  };
}

function getFoundryToolMap(personagem){
  const tools = {};
  (personagem.ferramentas || []).forEach((tool, index) => {
    tools[slugFoundry(tool, `tool-${index}`)] = {
      value: 1,
      ability: 'int',
      bonuses: { check: '' },
      roll: buildFoundryRoll()
    };
  });
  return tools;
}

function getFoundrySpellProgression(personagem){
  if(!personagem.magia?.ehConjurador) return 'none';
  if(personagem.classe === 'bruxo') return 'pact';
  if(SPELLCASTERS[personagem.classe]?.meioConjurador) return 'half';
  return 'full';
}

function getFoundrySpellPreparationFormula(personagem){
  const ability = getSpellcastingAbilityCode(personagem);
  const classId = getFoundryClassIdentifier(personagem);
  if(!ability || !personagem.magia?.ehConjurador) return '';
  if(personagem.magia?.tipo === 'preparadas') return `max(@abilities.${ability}.mod + @classes.${classId}.levels, 1)`;
  return '';
}

function getFoundryItemIdByType(items, type){
  return items.find(item => item.type === type)?._id || '';
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
  return personagemEhProficienteComArma(weapon, personagem);
}

function isArmorProficient(personagem, armor){
  const profs = ((personagem.proficienciasClasseEfetivas || (typeof getEffectiveClassProficiencies==='function' ? getEffectiveClassProficiencies(personagem) : personagem.proficienciasClasse)) || []).join(' | ').toLowerCase();
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

/* Períodos de descanso que recuperam um recurso, lidos do texto de recarga do app.
   "Descanso curto ou longo" (Segundo Fôlego) vale para os dois. Texto sem descanso ("Por turno",
   "Especial", "Usa espaço de magia") não gera período: o Foundry não recupera sozinho nesses casos. */
function recargaPeriodos(recarga){
  const texto = String(recarga || '');
  const periodos = [];
  if(/curto/i.test(texto)) periodos.push('sr');
  if(/longo/i.test(texto)) periodos.push('lr');
  return periodos;
}

function fillActorResources(personagem){
  const resources = Object.values(personagem.recursosClasse || {}).slice(0, 3);
  const entries = ['primary', 'secondary', 'tertiary'];
  const out = {};
  entries.forEach((slot, index) => {
    const res = resources[index];
    const periodos = recargaPeriodos(res?.recarga);
    out[slot] = res ? {
      label: res.nome || '',
      value: Number(res.atual || 0),
      max: Number(res.max || 0),
      sr: periodos.includes('sr'),
      lr: periodos.includes('lr')
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
    ability: abilityPtToFoundry(SKILLS[skillName]),
    roll: buildFoundryRoll(),
    value: (personagem.periciasFinais || []).includes(skillName) ? 1 : 0,
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
      proficient: ((personagem.savesClasseEfetivos || (typeof getEffectiveSaveProficiencies==='function' ? getEffectiveSaveProficiencies(personagem) : personagem.savesClasse)) || []).includes(ATTRIBUTE_LABELS[attr]) ? 1 : 0,
      max: 20,
      bonuses: { check: '', save: '' },
      check: { roll: buildFoundryRoll() },
      save: { roll: buildFoundryRoll() }
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

function normalizeLanguageList(value){
  if(Array.isArray(value)) return value.filter(Boolean).map(String);
  if(typeof value === 'string') return value ? [value] : [];
  return [];
}

function getFoundryTraits(personagem){
  const idiomasCustom = [
    ...normalizeLanguageList(personagem.idiomasRaciais),
    ...normalizeLanguageList(personagem.idiomas)
  ].join('; ');
  return {
    size: 'med',
    di: { value: [], custom: '', bypasses: [] },
    dr: { value: [], custom: '', bypasses: [] },
    dv: { value: [], custom: '', bypasses: [] },
    dm: { amount: {}, bypasses: [] },
    ci: { value: [], custom: '' },
    languages: { value: [], custom: idiomasCustom, communication: {} },
    weaponProf: { value: mapWeaponProfValue(personagem.proficienciasClasse), custom: ((personagem.proficienciasClasseEfetivas || (typeof getEffectiveClassProficiencies==='function' ? getEffectiveClassProficiencies(personagem) : personagem.proficienciasClasse)) || []).join('; '), mastery: { value: [], bonus: [] } },
    armorProf: { value: mapArmorProfValue(personagem.proficienciasClasse), custom: ((personagem.proficienciasClasseEfetivas || (typeof getEffectiveClassProficiencies==='function' ? getEffectiveClassProficiencies(personagem) : personagem.proficienciasClasse)) || []).join('; ') }
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


window.exportarFoundryActorJSON = exportarFoundryActorJSON;
window.exportarBackupJSON = exportarBackupJSON;
window.exportarJSON = exportarJSON;

function escaparHtml(valor){
  return String(valor ?? '').replace(/[&<>\"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
}

function getSpellExportDetail(personagem, name, level){
  if(typeof getSpellDetailForCharacter === 'function') return getSpellDetailForCharacter(personagem?.classe, `${name}${level ? ` (${level}º)` : ''}`, personagem?.subclasse, personagem?.nivel || 1);
  return { nome: name, escola: 'Variada', ritual: false, concentracao: false, duracao: 'Conforme magia', fonte: spellIsFromXanathar(name, personagem?.classe) ? 'XGtE' : 'PHB', resumo: 'Magia exportada pelo construtor offline.' };
}

function mapSpellSchoolValue(detail){
  const school = String(detail?.escola || '').toLowerCase();
  const map = { evocação:'evo', evocacao:'evo', abjuração:'abj', abjuracao:'abj', conjuração:'con', conjuracao:'con', adivinhação:'div', adivinhacao:'div', encantamento:'enc', ilusão:'ill', ilusao:'ill', necromancia:'nec', transmutação:'trs', transmutacao:'trs' };
  return map[school] || '';
}


/* === Foundry clone-first overrides === */
const FOUNDRY_ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function gerarIdFoundry(){
  if(globalThis.crypto?.getRandomValues){
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    let out = '';
    for(const b of bytes) out += FOUNDRY_ID_CHARS[b % FOUNDRY_ID_CHARS.length];
    return out;
  }
  let out = '';
  for(let i = 0; i < 16; i++) out += FOUNDRY_ID_CHARS[Math.floor(Math.random() * FOUNDRY_ID_CHARS.length)];
  return out;
}

function mapDamageTypeFoundry(tipo){
  const map = {
    'cortante': 'slashing',
    'perfurante': 'piercing',
    'esmagamento': 'bludgeoning',
    'concussao': 'bludgeoning',
    'contusao': 'bludgeoning',
    'fogo': 'fire',
    'frio': 'cold',
    'veneno': 'poison',
    'raio': 'lightning',
    'trovao': 'thunder',
    'ácido': 'acid',
    'acido': 'acid',
    'psiquico': 'psychic',
    'psíquico': 'psychic',
    'necrotico': 'necrotic',
    'necrótico': 'necrotic',
    'radiante': 'radiant',
    'força': 'force',
    'forca': 'force'
  };
  return map[String(tipo || '').toLowerCase()] || 'bludgeoning';
}

function createFoundryEffect(changes = [], opts = {}){
  return {
    name: opts.name || '',
    statuses: opts.statuses || [],
    changes: changes,
    duration: {
      seconds: opts.seconds ?? null,
      startTime: opts.startTime ?? null,
      rounds: opts.rounds ?? null,
      turns: opts.turns ?? null,
      startRound: opts.startRound ?? null,
      startTurn: opts.startTurn ?? null,
      combat: opts.combat ?? null
    },
    tint: '#ffffff',
    transfer: !!opts.transfer,
    disabled: false,
    flags: opts.flags || { core: {} },
    description: opts.description || '',
    _id: gerarIdFoundry(),
    img: opts.img || getFoundryItemImage('feat'),
    type: 'base',
    system: {},
    origin: null,
    sort: 0,
    _stats: {
      compendiumSource: null,
      duplicateSource: null,
      exportSource: null,
      coreVersion: '13.351',
      systemId: 'dnd5e',
      systemVersion: FOUNDRY_SYSTEM_VERSION,
      lastModifiedBy: null
    }
  };
}

function buildBaseActivity(type, overrides = {}){
  const base = {
    type,
    _id: gerarIdFoundry(),
    img: null,
    sort: 0,
    activation: { type: 'action', value: 1, condition: '', override: false },
    consumption: { targets: [], scaling: { allowed: false, max: '' }, spellSlot: true },
    description: {},
    duration: { units: 'inst', special: '', override: false, concentration: false },
    effects: [],
    flags: {},
    range: { units: 'self', override: false },
    target: {
      template: { contiguous: false, stationary: false, units: 'ft' },
      affects: { choice: false },
      override: false,
      prompt: true
    },
    uses: { spent: type === 'attack' ? null : 0, recovery: [] },
    visibility: { level: {}, requireAttunement: false, requireIdentification: false, requireMagic: false }
  };
  return mergeDeepFoundry(base, overrides);
}

function mergeDeepFoundry(target, source){
  if(!source) return target;
  const output = Array.isArray(target) ? target.slice() : { ...target };
  for(const [key, value] of Object.entries(source)){
    if(value && typeof value === 'object' && !Array.isArray(value) && target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])){
      output[key] = mergeDeepFoundry(target[key], value);
    } else {
      output[key] = value;
    }
  }
  return output;
}

function buildWeaponActivity(weapon){
  return buildBaseActivity('attack', {
    activation: { type: 'action', value: 1, condition: '', override: true },
    duration: { units: 'inst', special: '', override: true, concentration: false },
    uses: { spent: null, recovery: [] },
    attack: {
      ability: '',
      bonus: '',
      critical: {},
      flat: false,
      type: {
        value: weapon?.ranged ? 'ranged' : 'melee',
        classification: 'weapon'
      }
    },
    damage: {
      parts: [],
      includeBase: true,
      critical: { bonus: '' }
    }
  });
}

function buildSpellActivity(detail){
  const activationType = String(detail?.ativacao || '').toLowerCase();
  const mappedActivation = /bonus/.test(activationType) ? 'bonus' : (/reac/.test(activationType) ? 'reaction' : 'action');
  return buildBaseActivity('utility', {
    activation: { type: mappedActivation, override: false },
    uses: { spent: 0, recovery: [] },
    roll: { prompt: false, visible: false },
    duration: {
      units: detail?.concentracao ? 'inst' : (/minuto/i.test(detail?.duracao || '') ? 'minute' : (/hora/i.test(detail?.duracao || '') ? 'hour' : 'inst')),
      concentration: !!detail?.concentracao,
      override: false
    }
  });
}

function buildFeatTemplateSystem(feature, originType, personagem){
  return {
    activities: {},
    uses: { spent: 0, recovery: [] },
    advancement: {},
    description: buildFoundryDescription(`<div class="ddb"><p>${feature.resumo || ''}</p><p><strong>Nome original:</strong> ${escaparHtml(feature.nome)}</p></div>`),
    identifier: slugFoundry(feature.en || feature.nome, 'feature'),
    source: buildFoundrySource(getFeatureSourceBook(feature, originType, personagem), getFeatureSourceBook(feature, originType, personagem) === 'PHB 2024' ? '2024' : '2014'),
    crewed: false,
    enchant: {},
    prerequisites: { items: [], level: feature.level || null, repeatable: false },
    properties: [],
    requirements: feature.level ? `Level ${feature.level}` : '',
    type: { value: originType === 'race-feature' ? 'race' : 'class', subtype: '' }
  };
}

function buildFoundryWeaponItem(personagem, weaponKey, equipped = false){
  const weapon = WEAPONS[weaponKey];
  if(!weapon) return null;
  const englishName = getEnglishWeaponName(weaponKey, weapon);
  const dmg = String(weapon.dano || '1d6');
  const dmgFixo = !dmg.includes('d');
  const [dmgNum, dmgDie] = dmgFixo ? ['1', '0'] : dmg.split('d');
  const vers = weapon.versatile ? String(weapon.versatile) : '';
  const versatile = vers && vers.includes('d')
    ? (() => {
        const [n, d] = vers.split('d');
        return {
          number: Number(n || 1),
          denomination: Number(d || 8),
          bonus: '',
          types: [],
          custom: { enabled: false, formula: '' },
          scaling: { mode: '', number: null, formula: '' }
        };
      })()
    : { types: [], custom: { enabled: false }, scaling: { number: 1 } };
  const props = [];
  if(weapon.finesse) props.push('fin');
  if(weapon.propriedades?.some(p => /leve/i.test(p))) props.push('lgt');
  if(weapon.propriedades?.some(p => /pesada/i.test(p))) props.push('hvy');
  if(weapon.propriedades?.some(p => /arremesso/i.test(p))) props.push('thr');
  if(weapon.propriedades?.some(p => /duas mãos/i.test(p))) props.push('two');
  if(weapon.versatile) props.push('ver');
  if(weapon.propriedades?.some(p => /munição/i.test(p))) props.push('amm');
  if(weapon.propriedades?.some(p => /carga/i.test(p))) props.push('lod');
  if(weapon.propriedades?.some(p => /alcance estendido/i.test(p))) props.push('rch');
  if(weapon.propriedades?.some(p => /especial/i.test(p))) props.push('spc');
  const activityId = gerarIdFoundry();
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: englishName || weapon.nome,
    type: 'weapon',
    system: {
      activities: {
        [activityId]: mergeDeepFoundry(buildWeaponActivity(weapon), { _id: activityId })
      },
      uses: { spent: null, recovery: [] },
      description: buildFoundryDescription(`<div class="ddb"><p><strong>Nome original:</strong> ${escaparHtml(weapon.nome)}</p><p>Item exportado pelo construtor offline.</p></div>`),
      identifier: slugFoundry(englishName || weapon.nome, 'weapon'),
      source: buildFoundrySource(weapon.source || 'PHB', '2024'),
      identified: true,
      unidentified: { description: '' },
      container: null,
      quantity: getInventoryQuantityByName(personagem, weapon.nome),
      weight: { value: Number(weapon.peso || 0), units: 'lb' },
      price: { value: Number(weapon.precoGp || 0), denomination: 'gp' },
      rarity: '',
      attunement: '',
      attuned: false,
      equipped: !!equipped,
      crew: { value: [] },
      ammunition: weapon.propriedades?.some(p => /munição/i.test(p)) ? { type: /besta/.test(weaponKey) ? 'crossbowBolt' : (/arco/.test(weaponKey) ? 'arrow' : (weaponKey === 'zarabatana' ? 'blowgunNeedle' : (weaponKey === 'funda' ? 'slingBullet' : ''))) } : {},
      armor: {},
      damage: {
        base: {
          number: Number(dmgNum || 1),
          denomination: Number(dmgDie || 6),
          bonus: '',
          types: [mapDamageTypeFoundry(weapon.tipoDano)],
          custom: { enabled: dmgFixo, formula: dmgFixo ? dmg : '' },
          scaling: { mode: '', number: null, formula: '' }
        },
        versatile
      },
      mastery: '',
      properties: props,
      proficient: isWeaponProficient(personagem, weapon) ? 1 : 0,
      range: {
        value: Number(weapon.alcancePes || 5),
        long: weapon.alcanceLongoPes ? Number(weapon.alcanceLongoPes) : null,
        units: 'ft',
        reach: weapon.propriedades?.some(p => /alcance estendido/i.test(p)) ? 10 : null
      },
      type: { value: getWeaponTypeValue(weapon), baseItem: getFoundryWeaponBaseItem(weaponKey) }
    },
    flags: createCompendiumFlags(createCompendiumMatch('weapon', weapon.nome, englishName, {
      category: getWeaponTypeValue(weapon),
      sourceKey: weaponKey
    }), { sourceKey: weaponKey, translatedFrom: weapon.nome }),
    img: getFoundryItemImage('weapon'),
    effects: [],
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
}

function buildFoundryArmorItem(personagem, armorKey, equipped = false){
  const armor = ARMORS[armorKey];
  if(!armor || armorKey === 'sem_armadura') return null;
  const englishName = getEnglishArmorName(armorKey, armor);
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: englishName || armor.nome,
    type: 'equipment',
    effects: [],
    system: {
      activities: {},
      uses: { spent: null, recovery: [] },
      description: buildFoundryDescription(`<div class="ddb"><p><strong>Nome original:</strong> ${escaparHtml(armor.nome)}</p><p>Armadura exportada pelo construtor offline.</p></div>`),
      identifier: slugFoundry(englishName || armor.nome, 'armor'),
      source: buildFoundrySource(armor.source || 'PHB', '2024'),
      identified: true,
      unidentified: { description: '' },
      container: null,
      quantity: getInventoryQuantityByName(personagem, armor.nome),
      weight: { value: Number(armor.peso || 0), units: 'lb' },
      price: { value: Number(armor.precoGp || 0), denomination: 'gp' },
      rarity: '',
      attunement: '',
      attuned: false,
      equipped: !!equipped,
      crew: { value: [] },
      armor: { value: Number(armor.baseCA || 10), dex: armor.dex === 'max2' ? 2 : armor.dex === 'none' ? 0 : null },
      proficient: isArmorProficient(personagem, armor) ? 1 : 0,
      properties: armor.desvantagemFurtividade ? ['stealthDisadvantage'] : [],
      strength: Number(armor.forcaMin || 0) || 0,
      type: { value: getArmorSubtypeValue(armor), baseItem: getFoundryArmorBaseItem(armorKey) }
    },
    flags: createCompendiumFlags(createCompendiumMatch('equipment', armor.nome, englishName, {
      equipmentType: 'armor',
      armorType: getArmorSubtypeValue(armor),
      sourceKey: armorKey
    }), { sourceKey: armorKey, translatedFrom: armor.nome }),
    img: getFoundryItemImage('equipment'),
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
}

function buildFoundryShieldItem(personagem, equipped = false){
  if(!personagem.combate?.escudo) return null;
  const shieldName = 'Escudo';
  const englishName = getEnglishArmorName('escudo', { nome: shieldName });
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: englishName || shieldName,
    type: 'equipment',
    effects: [],
    system: {
      activities: {},
      uses: { spent: null, recovery: [] },
      description: buildFoundryDescription(`<div class="ddb"><p><strong>Nome original:</strong> ${escaparHtml(shieldName)}</p><p>Escudo exportado pelo construtor offline.</p></div>`),
      identifier: slugFoundry(englishName || shieldName, 'shield'),
      source: buildFoundrySource('PHB', '2024'),
      identified: true,
      unidentified: { description: '' },
      container: null,
      quantity: 1,
      weight: { value: 6, units: 'lb' },
      price: { value: 10, denomination: 'gp' },
      rarity: '', attunement: '', attuned: false, equipped: !!equipped, crew: { value: [] },
      armor: { value: 2, dex: null },
      proficient: ((personagem.proficienciasClasseEfetivas || (typeof getEffectiveClassProficiencies==='function' ? getEffectiveClassProficiencies(personagem) : personagem.proficienciasClasse)) || []).some(p => /escudos/i.test(p)) ? 1 : 0,
      properties: [], strength: 0,
      type: { value: 'shield', baseItem: 'shield' }
    },
    flags: createCompendiumFlags(createCompendiumMatch('equipment', shieldName, englishName, {
      equipmentType: 'shield',
      armorType: 'shield',
      sourceKey: 'escudo'
    }), { generated: true, role: 'shield', translatedFrom: shieldName }),
    img: getFoundryItemImage('equipment'),
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
}

function buildFoundryGenericItem(item, index){
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: item.nome,
    type: 'loot',
    effects: [],
    system: {
      description: buildFoundryDescription('<div class="ddb"><p>Item exportado pelo construtor offline.</p></div>'),
      identifier: slugFoundry(item.nome, `loot-${index}`),
      source: buildFoundrySource('PHB', '2014'),
      identified: true,
      unidentified: { description: '' },
      container: null,
      quantity: Number(item.quantidade || 1),
      weight: { value: Number(item.peso || 0), units: 'lb' },
      price: { value: Number(item.precoGp || 0), denomination: 'gp' },
      rarity: '',
      properties: [],
      type: { value: 'gear', subtype: '' }
    },
    flags: createCompendiumFlags(createCompendiumMatch('loot', item.nome, item.nome, { sourceKey: `loot-${index}` }), { original: item }),
    img: getFoundryItemImage('loot'),
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
}

function buildFoundrySpellItem(personagem, name, level = 0){
  const englishName = getEnglishSpellName(name);
  const detail = getSpellExportDetail(personagem, name, level);
  const sourceBook = detail?.fonte || (spellIsFromXanathar(name, personagem?.classe) ? 'XGtE' : 'PHB');
  const activityId = gerarIdFoundry();
  return {
    _id: gerarIdFoundry(),
    type: 'spell',
    system: {
      activities: {
        [activityId]: mergeDeepFoundry(buildSpellActivity(detail), { _id: activityId })
      },
      uses: { spent: null, max: '', recovery: [] },
      description: buildFoundryDescription(`<div class="ddb"><p><strong>Nome original:</strong> ${escaparHtml(name)}</p><p>${escaparHtml(detail?.resumo || 'Magia exportada pelo construtor offline.')}</p><p><strong>Escola:</strong> ${escaparHtml(detail?.escola || 'Variada')} • <strong>Fonte:</strong> ${escaparHtml(sourceBook)}</p><p><strong>Ritual:</strong> ${detail?.ritual ? 'Sim' : 'Não'} • <strong>Concentração:</strong> ${detail?.concentracao ? 'Sim' : 'Não'} • <strong>Duração:</strong> ${escaparHtml(detail?.duracao || 'Conforme magia')}</p></div>`),
      identifier: slugFoundry(englishName || name, 'spell'),
      source: buildFoundrySource(sourceBook, sourceBook === 'PHB 2024' ? '2024' : '2014'),
      activation: { type: 'action', value: 1, condition: '' },
      duration: { value: '', units: /inst/i.test(detail?.duracao || '') ? 'inst' : '' },
      level: Number(level || 0),
      materials: { value: '', consumed: false, cost: 0, supply: 0 },
      method: 'spell',
      prepared: 2,
      properties: [detail?.ritual ? 'ritual' : '', detail?.concentracao ? 'concentration' : '', 'vocal'].filter(Boolean),
      range: { value: '', units: 'ft' },
      school: mapSpellSchoolValue(detail),
      target: {
        affects: { count: '', type: '', choice: false, special: '' },
        template: { count: '', contiguous: false, type: '', size: '', width: '', height: '', units: 'ft', stationary: false }
      },
      sourceItem: `class:${getFoundryClassIdentifier(personagem)}`
    },
    effects: [],
    name: englishName || name,
    flags: createCompendiumFlags(createCompendiumMatch('spell', name, englishName, { level, sourceKey: slugFoundry(name, `spell-${level}`) }), { importedBy: 'sheet-builder', translatedFrom: name, spellLevelGuess: level, sourceBook, resumo: detail?.resumo || '' }),
    img: getFoundryItemImage('spell'),
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  };
}

function buildFoundryFeatureItem(feature, originType, personagem){
  const featFlags = createCompendiumFlags(createCompendiumMatch('feat', feature.nome, feature.en || feature.nome, {
    featureType: originType === 'subclass-feature' ? 'subclass' : 'feat',
    className: getEnglishClassName(personagem?.classe),
    level: feature.level || 0,
    sourceKey: slugFoundry(feature.nome, originType)
  }), { originType, level: feature.level || null, translatedFrom: feature.nome });
  const effectChanges = [];
  const resumo = String(feature.resumo || '').toLowerCase();
  if(/resist/.test(resumo) && /veneno|poison/.test(resumo)) effectChanges.push({ key: 'system.traits.dr.value', mode: 2, value: 'poison', priority: 1 });
  const effects = effectChanges.length ? [createFoundryEffect(effectChanges, { name: feature.en || feature.nome, transfer: true, img: getFoundryItemImage('feat'), flags: { dae: { showIcon: false, transfer: true, stackable: 'noneNameOnly' }, core: {} } })] : [];
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: feature.en || feature.nome,
    type: 'feat',
    effects,
    system: buildFeatTemplateSystem(feature, originType, personagem),
    flags: featFlags,
    img: getFoundryItemImage('feat'),
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
}

function buildFoundryResourceFeature(resourceKey, resourceValue, personagem){
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: resourceValue.nome || resourceKey,
    type: 'feat',
    effects: [],
    system: {
      activities: {},
      uses: {
        spent: Math.max(0, Number(resourceValue.max || 0) - Number(resourceValue.atual || 0)),
        max: String(resourceValue.max || ''),
        recovery: recargaPeriodos(resourceValue.recarga).map(period => ({ period, type: 'recoverAll' }))
      },
      advancement: {},
      description: buildFoundryDescription(`<div class="ddb"><p>${escaparHtml(resourceValue.detalhe || '')}</p></div>`),
      identifier: slugFoundry(resourceValue.nome || resourceKey, 'resource'),
      source: buildFoundrySource(getResourceSourceBook(personagem), getResourceSourceBook(personagem) === 'PHB 2024' ? '2024' : '2014'),
      crewed: false,
      enchant: {},
      prerequisites: { items: [], repeatable: false },
      properties: [],
      requirements: '',
      type: { value: 'class', subtype: '' }
    },
    flags: createCompendiumFlags(createCompendiumMatch('feat', resourceValue.nome || resourceKey, resourceValue.nome || resourceKey, {
      featureType: 'resource', className: getEnglishClassName(personagem?.classe), sourceKey: resourceKey
    }), { resourceKey, original: resourceValue }),
    img: getFoundryItemImage('feat'),
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
}

function buildFoundryClassItem(personagem){
  const classe = CLASSES[personagem.classe] || {};
  const englishName = getEnglishClassName(personagem.classe) || classe.nome || 'Class';
  const classIdentifier = slugFoundry(englishName, 'class');
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: englishName,
    type: 'class',
    system: {
      advancement: {},
      description: buildFoundryDescription(`<div class="ddb"><p><strong>Nome original:</strong> ${escaparHtml(classe.nome || personagem.classe || 'Classe')}</p><p>Classe exportada pelo construtor offline.</p></div>`),
      identifier: classIdentifier,
      source: buildFoundrySource(classe.source || 'PHB', classe.source === 'PHB 2024' ? '2024' : '2014'),
      startingEquipment: [],
      wealth: '',
      hd: { denomination: `d${Number(classe.dadoVida || personagem.dadoVida || 8)}`, spent: 0, additional: '' },
      levels: Number(personagem.nivel || 1),
      primaryAbility: { value: getSpellcastingAbilityCode(personagem) ? [getSpellcastingAbilityCode(personagem)] : [], all: false },
      properties: [],
      spellcasting: { progression: getFoundrySpellProgression(personagem), ability: getSpellcastingAbilityCode(personagem), preparation: { formula: getFoundrySpellPreparationFormula(personagem) } }
    },
    flags: createCompendiumFlags(createCompendiumMatch('class', classe.nome || personagem.classe, englishName, { sourceKey: personagem.classe, level: Number(personagem.nivel || 1) }), { sourceKey: personagem.classe, translatedFrom: classe.nome || personagem.classe, nivel: personagem.nivel }),
    img: getFoundryItemImage('class'),
    effects: [],
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
}

function buildFoundrySubclassItem(personagem){
  if(!personagem.subclasse) return null;
  const sub = getSubclassOptions(personagem.classe).find(s => s.key === personagem.subclasse);
  if(!sub) return null;
  const englishName = sub.en || sub.nome;
  const sourceBook = sub.source || 'PHB';
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: englishName || sub.nome,
    type: 'subclass',
    system: {
      advancement: {},
      description: buildFoundryDescription(`<div class="ddb"><p><strong>Nome original:</strong> ${escaparHtml(sub.nome)}</p><p>Subclasse exportada pelo construtor offline.</p></div>`),
      identifier: slugFoundry(englishName || sub.nome, 'subclass'),
      source: buildFoundrySource(sourceBook, sourceBook === 'PHB 2024' ? '2024' : '2014'),
      classIdentifier: getFoundryClassIdentifier(personagem),
      spellcasting: { progression: 'none', preparation: {} }
    },
    flags: createCompendiumFlags(createCompendiumMatch('subclass', sub.nome, englishName, { className: getEnglishClassName(personagem.classe), classIdentifier: getFoundryClassIdentifier(personagem), sourceKey: personagem.subclasse }), { sourceKey: personagem.subclasse, translatedFrom: sub.nome, parentClass: personagem.classe }),
    img: getFoundryItemImage('subclass'),
    effects: [],
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
}

function buildFoundrySpeciesItem(personagem){
  const race = RACES[personagem.raca];
  if(!race) return null;
  const englishName = getEnglishRaceName(personagem.raca) || race.nome;
  const senses = getFoundrySenses(personagem);
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: englishName,
    type: 'race',
    effects: [],
    system: {
      advancement: {},
      description: buildFoundryDescription(`<div class="ddb"><p><strong>Nome original:</strong> ${escaparHtml(race.nome)}</p><p>Traços: ${(race.traits || []).join(', ') || '—'}</p></div>`),
      identifier: slugFoundry(englishName, 'race'),
      source: buildFoundrySource(race.source || 'PHB', race.source === 'PHB 2024' ? '2024' : '2014'),
      movement: { burrow: '0', climb: '0', fly: '0', swim: '0', walk: String(personagem.deslocamento || 30), units: 'ft', hover: false, ignoredDifficultTerrain: [] },
      senses: { ranges: { blindsight: senses.blindsight || null, darkvision: senses.darkvision || null, tremorsense: senses.tremorsense || null, truesight: senses.truesight || null }, units: 'ft', special: '' },
      type: { value: 'humanoid' }
    },
    flags: createCompendiumFlags(createCompendiumMatch('species', race.nome, englishName, { sourceKey: personagem.raca }), { sourceKey: personagem.raca, translatedFrom: race.nome, traits: race.traits || [] }),
    img: getFoundryItemImage('race'),
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
}

function buildFoundryBackgroundItem(personagem){
  const bg = BACKGROUNDS[personagem.origem];
  if(!bg) return null;
  const englishName = getEnglishBackgroundName(personagem.origem) || bg.nome;
  return finalizeFoundryDocument({
    _id: gerarIdFoundry(),
    name: englishName,
    type: 'background',
    effects: [],
    system: {
      advancement: {},
      description: buildFoundryDescription(`<div class="ddb"><p><strong>Nome original:</strong> ${escaparHtml(bg.nome)}</p><p>Característica: ${escaparHtml(bg.caracteristica || '—')}</p></div>`),
      identifier: slugFoundry(englishName, 'background'),
      source: buildFoundrySource(bg.source || 'PHB', bg.source === 'PHB 2024' ? '2024' : '2014'),
      startingEquipment: []
    },
    flags: createCompendiumFlags(createCompendiumMatch('background', bg.nome, englishName, { sourceKey: personagem.origem }), { sourceKey: personagem.origem, translatedFrom: bg.nome, pericias: bg.pericias || [], ferramentas: bg.ferramentas || [] }),
    img: getFoundryItemImage('background'),
    folder: null,
    sort: 0,
    _stats: buildFoundryStats(),
    ownership: { default: 0 }
  });
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
  if(personagem.talentoOrigem) items.push(buildFoundryFeatureItem({ nome: personagem.talentoOrigem, en: personagem.talentoOrigem, resumo: 'Talento de origem concedido pelo antecedente (D&D 2024).', level: 0 }, 'origin-feat', personagem));
  for(const feature of (personagem.habilidadesClasseAtivas || [])) items.push(buildFoundryFeatureItem(feature, 'class-feature', personagem));
  for(const feature of (personagem.habilidadesSubclasseAtivas || [])) items.push(buildFoundryFeatureItem(feature, 'subclass-feature', personagem));
  const raceObj = RACES[personagem.raca];
  (raceObj?.traits || []).forEach((traitName) => {
    items.push(buildFoundryFeatureItem({ nome: traitName, en: traitName, resumo: '', level: 0 }, 'race-feature', personagem));
  });
  for(const [key, value] of Object.entries(personagem.recursosClasse || {})) items.push(buildFoundryResourceFeature(key, value, personagem));
  const primaryWeapon = buildFoundryWeaponItem(personagem, personagem.combate?.armaPrincipal, true);
  const secondaryWeapon = buildFoundryWeaponItem(personagem, personagem.combate?.armaSecundaria, true);
  if(primaryWeapon) items.push(primaryWeapon);
  if(secondaryWeapon && secondaryWeapon.name !== primaryWeapon?.name) items.push(secondaryWeapon);
  const armorItem = buildFoundryArmorItem(personagem, personagem.combate?.armadura, true);
  if(armorItem) items.push(armorItem);
  const shieldItem = buildFoundryShieldItem(personagem, true);
  if(shieldItem) items.push(shieldItem);
  const reservedNames = new Set([primaryWeapon?.name, secondaryWeapon?.name, armorItem?.name, shieldItem?.name, ...(raceObj?.traits || [])].filter(Boolean).map(v => normalizeLookupText(v)));
  (personagem.inventario?.itens || []).forEach((item, index) => {
    if(reservedNames.has(normalizeLookupText(item.nome)) || /escudo/i.test(item.nome)) return;
    items.push(buildFoundryGenericItem(item, index));
  });
  (personagem.magia?.listaTruques || []).forEach(name => items.push(buildFoundrySpellItem(personagem, name, 0)));
  (personagem.magia?.listaMagias || []).forEach(name => {
    const level = deriveSpellLevelFromName(name);
    items.push(buildFoundrySpellItem(personagem, getSpellNameWithoutLevelTag(name), level));
  });
  return dedupFoundryItems(items.filter(Boolean));
}

/* Remove itens repetidos (mesmo tipo e nome) e o item "Aumento de Valor de Habilidade", que não é um recurso jogável.
   Habilidade de classe e recurso rastreável costumam ter o mesmo nome (ex.: Segundo Fôlego). Fica um item só, com a
   descrição da habilidade e os usos (máximo e recarga) do recurso. A habilidade vem antes do recurso na montagem. */
function dedupFoundryItems(items){
  const porChave = new Map();
  const saida = [];
  for(const item of items){
    if(item.type === 'feat' && /^aumento de valor de habilidade$/i.test(String(item.name || '').trim())) continue;
    if(['class', 'subclass', 'race', 'background'].includes(item.type)){ saida.push(item); continue; }
    const chave = `${item.type}|${normalizeLookupText(item.name)}`;
    const existente = porChave.get(chave);
    if(!existente){
      porChave.set(chave, item);
      saida.push(item);
      continue;
    }
    const usosNovos = item.system?.uses;
    const novoTemUsos = !!usosNovos?.max || (usosNovos?.recovery || []).length > 0;
    const existenteSemUsos = !existente.system?.uses?.max && !(existente.system?.uses?.recovery || []).length;
    if(novoTemUsos && existenteSemUsos) existente.system.uses = usosNovos;
  }
  return saida;
}

function montarFoundryActor(){
  const p = state.personagem;
  const items = montarFoundryItems(p);
  const raceId = getFoundryItemIdByType(items, 'race');
  const backgroundId = getFoundryItemIdByType(items, 'background');
  const classId = getFoundryItemIdByType(items, 'class');
  const senses = getFoundrySenses(p);
  /* A biografia recebe só o texto livre: descrição geral em value e história em public, sem HTML.
     Traços, ideais, vínculos, defeitos e aparência já têm campo próprio em details (trait, ideal, bond, flaw,
     appearance). Antes, a biografia repetia tudo em HTML e o import devolvia esse HTML para a descrição. */
  const descricaoBiografia = String(p.personalidade?.descricaoGeral || '');
  const historiaBiografia = String(p.personalidade?.historia || '');
  return {
    folder: null,
    name: p.nome || 'Personagem sem nome',
    type: 'character',
    img: 'icons/svg/mystery-man.svg',
    system: {
      currency: {
        pp: Number(p.inventario?.moedas?.pp || 0),
        gp: Number(p.inventario?.moedas?.gp || 0),
        ep: Number(p.inventario?.moedas?.ep || 0),
        sp: Number(p.inventario?.moedas?.sp || 0),
        cp: Number(p.inventario?.moedas?.cp || 0)
      },
      abilities: getFoundryAbilities(p),
      bonuses: {
        mwak: { attack: '', damage: '' },
        rwak: { attack: '', damage: '' },
        msak: { attack: '', damage: '' },
        rsak: { attack: '', damage: '' },
        abilities: { check: '', save: '', skill: '' },
        spell: { dc: '' }
      },
      skills: getFoundrySkillMap(p),
      tools: getFoundryToolMap(p),
      spells: getFoundrySpells(p),
      attributes: {
        ac: { calc: 'default', flat: null, formula: '' },
        init: { ability: 'dex', roll: buildFoundryRoll(), bonus: '' },
        movement: { units: 'ft', hover: false, ignoredDifficultTerrain: [], walk: String(p.deslocamento || 30), burrow: '0', climb: '0', fly: '0', swim: '0' },
        attunement: { max: 3 },
        senses: { ranges: { blindsight: Number(senses.blindsight || 0), darkvision: Number(senses.darkvision || 0), tremorsense: Number(senses.tremorsense || 0), truesight: Number(senses.truesight || 0) }, units: 'ft', special: '' },
        spellcasting: getSpellcastingAbilityCode(p),
        exhaustion: 0,
        concentration: { ability: '', roll: buildFoundryRoll(), bonuses: { save: '' }, limit: 1 },
        loyalty: {},
        hp: { max: Number(p.pvMax || 1), temp: 0, tempmax: 0, value: Number(p.pvMax || 1), bonuses: { level: '', overall: '' } },
        death: { roll: buildFoundryRoll(), success: 0, failure: 0, bonuses: { save: '' } },
        inspiration: false
      },
      bastion: { name: '', description: '' },
      details: {
        biography: { value: descricaoBiografia, public: historiaBiografia },
        alignment: '',
        ideal: (p.personalidade?.ideais || []).join(' | '),
        bond: (p.personalidade?.vinculos || []).join(' | '),
        flaw: (p.personalidade?.defeitos || []).join(' | '),
        race: raceId,
        background: backgroundId,
        originalClass: classId,
        xp: { value: Number(p.xp || 0) },
        appearance: p.personalidade?.aparencia || '',
        trait: (p.personalidade?.tracos || []).join('\n'),
        gender: '',
        eyes: '',
        height: '',
        faith: '',
        hair: '',
        skin: '',
        age: '',
        weight: ''
      },
      traits: getFoundryTraits(p),
      resources: fillActorResources(p),
      favorites: []
    },
    prototypeToken: buildFoundryToken(p, senses),
    items
  };
}
