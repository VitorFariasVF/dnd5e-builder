/*
  RULE ENGINE - SAFE LAYER
  ------------------------------------------------------------
  Camada paralela de regras para auditoria e futura integração.
  Regras desta etapa:
  - não altera state automaticamente;
  - não chama renderização/UI;
  - não toca na exportação;
  - preserva compatibilidade por meio de legacyPatch.
*/

const RULE_ENGINE_VERSION = "0.11.0-final-flow-audit";

const RULE_ABILITY_KEYS = ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"];

const RULE_ASI_LEVELS = {
  default: [4, 8, 12, 16, 19],
  guerreiro: [4, 6, 8, 12, 14, 16, 19],
  ladino: [4, 8, 10, 12, 16, 19]
};

const RULE_ASI_CHOICE_TYPES = {
  PLUS_TWO: "plus_two",
  PLUS_ONE_PLUS_ONE: "plus_one_plus_one",
  FEAT: "feat"
};

const RULE_PROFICIENCY_CATEGORIES = {
  ARMOR: "armor",
  WEAPON: "weapon",
  TOOL: "tool",
  SKILL: "skill",
  SAVING_THROW: "savingThrow",
  LANGUAGE: "language"
};

const RULE_PROFICIENCY_CATEGORY_MAP = {
  "Armaduras leves": { category: "armor", key: "light_armor" },
  "Armaduras médias": { category: "armor", key: "medium_armor" },
  "Armaduras pesadas": { category: "armor", key: "heavy_armor" },
  "Todas as armaduras": { category: "armor", key: "all_armor" },
  "Escudos": { category: "armor", key: "shields" },

  "Armas simples": { category: "weapon", key: "simple_weapons" },
  "Armas marciais": { category: "weapon", key: "martial_weapons" },
  "Bestas de mão": { category: "weapon", key: "hand_crossbow" },
  "Bestas leves": { category: "weapon", key: "light_crossbow" },
  "Espadas longas": { category: "weapon", key: "longsword" },
  "Rapieiras": { category: "weapon", key: "rapier" },
  "Espadas curtas": { category: "weapon", key: "shortsword" },
  "Cimitarras": { category: "weapon", key: "scimitar" },
  "Clavas": { category: "weapon", key: "club" },
  "Adagas": { category: "weapon", key: "dagger" },
  "Dardos": { category: "weapon", key: "dart" },
  "Azagaias": { category: "weapon", key: "javelin" },
  "Maças": { category: "weapon", key: "mace" },
  "Bordões": { category: "weapon", key: "quarterstaff" },
  "Foices": { category: "weapon", key: "sickle" },
  "Fundas": { category: "weapon", key: "sling" },

  "Ferramentas de ladrão": { category: "tool", key: "thieves_tools" },
  "Kit de herbalismo": { category: "tool", key: "herbalism_kit" },
  "Kit de disfarce": { category: "tool", key: "disguise_kit" },
  "Kit de falsificação": { category: "tool", key: "forgery_kit" },
  "Ferramentas de artesão": { category: "tool", key: "artisan_tools" },
  "Ferramentas de navegador": { category: "tool", key: "navigator_tools" },
  "Três instrumentos musicais": { category: "tool", key: "three_musical_instruments" },
  "Um instrumento musical": { category: "tool", key: "one_musical_instrument" },
  "Instrumento musical": { category: "tool", key: "musical_instrument" },
  "Jogo": { category: "tool", key: "gaming_set" },
  "Veículos terrestres": { category: "tool", key: "land_vehicles" },
  "Veículos aquáticos": { category: "tool", key: "water_vehicles" },
  "Suprimentos de cervejeiro": { category: "tool", key: "brewers_supplies" },
  "Suprimentos de caligrafia": { category: "tool", key: "calligraphers_supplies" }
};

const RULE_CLASS_SPELLCASTING = {
  bardo: {
    ability: "carisma",
    casterType: "full",
    model: "known",
    startsAtLevel: 1,
    cantripProgression: [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
    knownSpellProgression: [4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22]
  },
  bruxo: {
    ability: "carisma",
    casterType: "pact",
    model: "pactKnown",
    startsAtLevel: 1,
    cantripProgression: [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
    knownSpellProgression: [2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15]
  },
  clerigo: {
    ability: "sabedoria",
    casterType: "full",
    model: "prepared",
    startsAtLevel: 1,
    cantripProgression: [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
    preparedFormula: "level + abilityMod"
  },
  druida: {
    ability: "sabedoria",
    casterType: "full",
    model: "prepared",
    startsAtLevel: 1,
    cantripProgression: [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
    preparedFormula: "level + abilityMod"
  },
  feiticeiro: {
    ability: "carisma",
    casterType: "full",
    model: "known",
    startsAtLevel: 1,
    cantripProgression: [4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6],
    knownSpellProgression: [2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15]
  },
  mago: {
    ability: "inteligencia",
    casterType: "full",
    model: "spellbookPrepared",
    startsAtLevel: 1,
    cantripProgression: [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
    preparedFormula: "level + abilityMod",
    spellbook: { initialLevel1Spells: 6, learnedPerLevel: 2 }
  },
  paladino: {
    ability: "carisma",
    casterType: "half",
    model: "prepared",
    startsAtLevel: 2,
    preparedFormula: "floor(level / 2) + abilityMod"
  },
  patrulheiro: {
    ability: "sabedoria",
    casterType: "half",
    model: "known",
    startsAtLevel: 2,
    knownSpellProgression: [0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]
  }
};

const RULE_SUBCLASS_SPELLCASTING = {
  "guerreiro:eldritch_knight": {
    ability: "inteligencia",
    casterType: "third",
    model: "known",
    startsAtLevel: 3,
    cantripProgression: [0,0,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3],
    knownSpellProgression: [0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13],
    restrictions: { preferredSchools: ["abjuracao", "evocacao"] }
  },
  "ladino:arcane_trickster": {
    ability: "inteligencia",
    casterType: "third",
    model: "known",
    startsAtLevel: 3,
    cantripProgression: [0,0,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
    knownSpellProgression: [0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13],
    restrictions: { preferredSchools: ["encantamento", "ilusao"] }
  }
};

const RULE_SPELL_SLOTS = {
  full: typeof SPELL_SLOTS !== "undefined" ? SPELL_SLOTS.full : {},
  half: {
    1:[0,0,0,0,0,0,0,0,0], 2:[2,0,0,0,0,0,0,0,0], 3:[3,0,0,0,0,0,0,0,0], 4:[3,0,0,0,0,0,0,0,0],
    5:[4,2,0,0,0,0,0,0,0], 6:[4,2,0,0,0,0,0,0,0], 7:[4,3,0,0,0,0,0,0,0], 8:[4,3,0,0,0,0,0,0,0],
    9:[4,3,2,0,0,0,0,0,0], 10:[4,3,2,0,0,0,0,0,0], 11:[4,3,3,0,0,0,0,0,0], 12:[4,3,3,0,0,0,0,0,0],
    13:[4,3,3,1,0,0,0,0,0], 14:[4,3,3,1,0,0,0,0,0], 15:[4,3,3,2,0,0,0,0,0], 16:[4,3,3,2,0,0,0,0,0],
    17:[4,3,3,3,1,0,0,0,0], 18:[4,3,3,3,1,0,0,0,0], 19:[4,3,3,3,2,0,0,0,0], 20:[4,3,3,3,2,0,0,0,0]
  },
  third: {
    1:[0,0,0,0,0,0,0,0,0], 2:[0,0,0,0,0,0,0,0,0], 3:[2,0,0,0,0,0,0,0,0], 4:[3,0,0,0,0,0,0,0,0],
    5:[3,0,0,0,0,0,0,0,0], 6:[3,0,0,0,0,0,0,0,0], 7:[4,2,0,0,0,0,0,0,0], 8:[4,2,0,0,0,0,0,0,0],
    9:[4,2,0,0,0,0,0,0,0], 10:[4,3,0,0,0,0,0,0,0], 11:[4,3,0,0,0,0,0,0,0], 12:[4,3,0,0,0,0,0,0,0],
    13:[4,3,2,0,0,0,0,0,0], 14:[4,3,2,0,0,0,0,0,0], 15:[4,3,2,0,0,0,0,0,0], 16:[4,3,3,0,0,0,0,0,0],
    17:[4,3,3,0,0,0,0,0,0], 18:[4,3,3,0,0,0,0,0,0], 19:[4,3,3,1,0,0,0,0,0], 20:[4,3,3,1,0,0,0,0,0]
  },
  pact: typeof SPELL_SLOTS !== "undefined" ? SPELL_SLOTS.warlock : {},
  pactCircle: typeof SPELL_SLOTS !== "undefined" ? SPELL_SLOTS.warlockCircle : {}
};

const RULE_CANTRIP_SOURCES = {
  CLASS: "class",
  RACE: "race",
  SUBCLASS: "subclass",
  FEAT: "feat"
};

const RULE_SPELL_BENEFIT_TYPES = {
  SELECTED_KNOWN: "selectedKnown",
  SELECTED_PREPARED: "selectedPrepared",
  ALWAYS_PREPARED: "alwaysPrepared",
  EXPANDED_LIST: "expandedList",
  BONUS_KNOWN: "bonusKnown",
  RACE_SPELL: "raceSpell",
  FEAT_SPELL: "featSpell",
  SPELLBOOK: "spellbook"
};

const RULE_WIZARD_SPELLBOOK = {
  initialLevel1Spells: 6,
  learnedPerLevel: 2
};

const RULE_SUBCLASS_SPELL_RULE_TYPES = {
  ALWAYS_PREPARED: "alwaysPrepared",
  EXPANDED_LIST: "expandedList",
  BONUS_KNOWN: "bonusKnown",
  BONUS_CANTRIPS: "bonusCantrips"
};

function ruleCloneSubclassSpellBucket(key) {
  const source = (typeof XANATHAR_SUBCLASS_BONUS_SPELLS !== "undefined" && XANATHAR_SUBCLASS_BONUS_SPELLS[key]) ? XANATHAR_SUBCLASS_BONUS_SPELLS[key] : {};
  return JSON.parse(JSON.stringify(source || {}));
}

const RULE_SUBCLASS_SPELL_RULES = {
  // Domínios de clérigo: entram automaticamente e não contam no limite de preparadas.
  "clerigo:forge": { type: RULE_SUBCLASS_SPELL_RULE_TYPES.ALWAYS_PREPARED, unlockByClassLevel: ruleCloneSubclassSpellBucket("clerigo:forge") },
  "clerigo:grave": { type: RULE_SUBCLASS_SPELL_RULE_TYPES.ALWAYS_PREPARED, unlockByClassLevel: ruleCloneSubclassSpellBucket("clerigo:grave") },

  // Juramentos de paladino: entram automaticamente e não contam no limite de preparadas.
  "paladino:conquest": { type: RULE_SUBCLASS_SPELL_RULE_TYPES.ALWAYS_PREPARED, unlockByClassLevel: ruleCloneSubclassSpellBucket("paladino:conquest") },
  "paladino:redemption": { type: RULE_SUBCLASS_SPELL_RULE_TYPES.ALWAYS_PREPARED, unlockByClassLevel: ruleCloneSubclassSpellBucket("paladino:redemption") },

  // Arquétipos de patrulheiro de Xanathar: magias conhecidas extras, sem consumir limite normal.
  "patrulheiro:gloom_stalker": { type: RULE_SUBCLASS_SPELL_RULE_TYPES.BONUS_KNOWN, unlockByClassLevel: ruleCloneSubclassSpellBucket("patrulheiro:gloom_stalker") },
  "patrulheiro:horizon_walker": { type: RULE_SUBCLASS_SPELL_RULE_TYPES.BONUS_KNOWN, unlockByClassLevel: ruleCloneSubclassSpellBucket("patrulheiro:horizon_walker") },
  "patrulheiro:monster_slayer": { type: RULE_SUBCLASS_SPELL_RULE_TYPES.BONUS_KNOWN, unlockByClassLevel: ruleCloneSubclassSpellBucket("patrulheiro:monster_slayer") },

  // Patronos de bruxo: expandem a lista, mas não entram automaticamente.
  "bruxo:celestial": { type: RULE_SUBCLASS_SPELL_RULE_TYPES.EXPANDED_LIST, unlockByClassLevel: ruleCloneSubclassSpellBucket("bruxo:celestial") },
  "bruxo:hexblade": { type: RULE_SUBCLASS_SPELL_RULE_TYPES.EXPANDED_LIST, unlockByClassLevel: ruleCloneSubclassSpellBucket("bruxo:hexblade") }
};

const RULE_SUBCLASS_PROFICIENCY_GRANTS = {
  "bardo:swords": { level: 3, proficiencies: { armor: ["Armaduras médias"], weapons: ["Cimitarras"], tools: [], skills: [], savingThrows: [], languages: [] } },
  "clerigo:forge": { level: 1, proficiencies: { armor: ["Armaduras pesadas"], weapons: [], tools: [], skills: [], savingThrows: [], languages: [] } },
  "bruxo:hexblade": { level: 1, proficiencies: { armor: ["Armaduras médias", "Escudos"], weapons: ["Armas marciais"], tools: [], skills: [], savingThrows: [], languages: [] } },
  "ladino:scout": { level: 3, proficiencies: { armor: [], weapons: [], tools: [], skills: ["Natureza", "Sobrevivência"], savingThrows: [], languages: [] } },
  "monge:drunken_master": { level: 3, proficiencies: { armor: [], weapons: [], tools: ["Suprimentos de cervejeiro"], skills: ["Atuação"], savingThrows: [], languages: [] } },
  "monge:kensei": { level: 3, proficiencies: { armor: [], weapons: [], tools: ["Suprimentos de caligrafia"], skills: [], savingThrows: [], languages: [] } },
  "patrulheiro:gloom_stalker": { level: 7, proficiencies: { armor: [], weapons: [], tools: [], skills: [], savingThrows: ["Sabedoria"], languages: [] } }
};

const RULE_FEATS = {
  alerta: {
    name: "Alerta",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: {}, proficiencies: {}, cantrips: {}, spells: {}, features: ["initiative_bonus_5", "cannot_be_surprised"] }
  },
  atleta: {
    name: "Atleta",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: { chooseOne: ["forca", "destreza"], amount: 1 }, proficiencies: {}, features: ["athlete"] }
  },
  ator: {
    name: "Ator",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: { carisma: 1 }, proficiencies: {}, features: ["actor_advantage"] }
  },
  duravel: {
    name: "Durável",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: { constituicao: 1 }, proficiencies: {}, features: ["durable"] }
  },
  linguista: {
    name: "Linguista",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: { inteligencia: 1 }, proficiencies: { languages: { choose: 3 } }, features: ["ciphers"] }
  },
  mente_afiada: {
    name: "Mente Afiada",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: { inteligencia: 1 }, proficiencies: {}, features: ["keen_mind"] }
  },
  observador: {
    name: "Observador",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: { chooseOne: ["inteligencia", "sabedoria"], amount: 1 }, proficiencies: {}, features: ["passive_bonus_5", "read_lips"] }
  },
  resiliente: {
    name: "Resiliente",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: { chooseOne: ["forca", "destreza", "constituicao", "inteligencia", "sabedoria", "carisma"], amount: 1 }, proficiencies: { savingThrowsFromAttributeChoice: true }, features: ["resilient"] }
  },
  habilidoso: {
    name: "Habilidoso",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: {}, proficiencies: { skillsOrTools: { choose: 3 } }, features: ["skilled"] }
  },
  iniciado_em_magia: {
    name: "Iniciado em Magia",
    source: "PHB",
    prerequisites: [],
    choices: [
      { id: "spellcastingClass", type: "spellListClass", count: 1, options: ["bardo", "bruxo", "clerigo", "druida", "feiticeiro", "mago"] },
      { id: "cantrips", type: "cantrip", count: 2, fromChoice: "spellcastingClass" },
      { id: "level1Spell", type: "spell", count: 1, spellLevel: 1, fromChoice: "spellcastingClass" }
    ],
    grants: { attributes: {}, proficiencies: {}, cantrips: { source: "feat" }, spells: { source: "feat" }, features: [] }
  },
  armadura_leve: {
    name: "Armadura Leve",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: { chooseOne: ["forca", "destreza"], amount: 1 }, proficiencies: { armor: ["Armaduras leves"] }, features: [] }
  },
  moderadamente_armadurado: {
    name: "Moderadamente Armadurado",
    source: "PHB",
    prerequisites: [{ type: "proficiency", category: "armor", anyOf: ["Armaduras leves", "light_armor"] }],
    grants: { attributes: { chooseOne: ["forca", "destreza"], amount: 1 }, proficiencies: { armor: ["Armaduras médias", "Escudos"] }, features: [] }
  },
  fortemente_armadurado: {
    name: "Fortemente Armadurado",
    source: "PHB",
    prerequisites: [{ type: "proficiency", category: "armor", anyOf: ["Armaduras médias", "medium_armor"] }],
    grants: { attributes: { forca: 1 }, proficiencies: { armor: ["Armaduras pesadas"] }, features: [] }
  },
  mestre_armaduras_pesadas: {
    name: "Mestre de Armaduras Pesadas",
    source: "PHB",
    prerequisites: [{ type: "proficiency", category: "armor", anyOf: ["Armaduras pesadas", "heavy_armor"] }],
    grants: { attributes: { forca: 1 }, proficiencies: {}, features: ["heavy_armor_master"] }
  },
  mestre_de_armas: {
    name: "Mestre de Armas",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: { chooseOne: ["forca", "destreza"], amount: 1 }, proficiencies: { weapons: { choose: 4 } }, features: [] }
  },
  duelista_defensivo: {
    name: "Duelista Defensivo",
    source: "PHB",
    prerequisites: [{ type: "ability", ability: "destreza", min: 13 }],
    grants: { attributes: {}, proficiencies: {}, features: ["defensive_duelist"] }
  },
  agarrador: {
    name: "Agarrador",
    source: "PHB",
    prerequisites: [{ type: "ability", ability: "forca", min: 13 }],
    grants: { attributes: {}, proficiencies: {}, features: ["grappler"] }
  },
  conjurador_de_guerra: {
    name: "Conjurador de Guerra",
    source: "PHB",
    prerequisites: [{ type: "spellcasting" }],
    grants: { attributes: {}, proficiencies: {}, features: ["war_caster"] }
  },
  adepto_elemental: {
    name: "Adepto Elemental",
    source: "PHB",
    prerequisites: [{ type: "spellcasting" }],
    grants: { attributes: {}, proficiencies: {}, features: ["elemental_adept"] }
  },
  sortudo: {
    name: "Sortudo",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: {}, proficiencies: {}, features: ["lucky_points_3"] }
  },
  robusto: {
    name: "Robusto",
    source: "PHB",
    prerequisites: [],
    grants: { attributes: {}, proficiencies: {}, features: ["tough_hp_bonus"] }
  }
};

const RULE_XANATHAR_RACIAL_FEATS = {
  precisao_elfica: {
    name: "Precisão Élfica",
    source: "Xanathar",
    allowedRaces: ["elfo", "meio_elfo"],
    prerequisites: [{ type: "race", allowedRaces: ["elfo", "meio_elfo"] }],
    grants: { attributes: { chooseOne: ["destreza", "inteligencia", "sabedoria", "carisma"], amount: 1 }, proficiencies: {}, features: ["elven_accuracy"] }
  },
  prodigio: {
    name: "Prodígio",
    source: "Xanathar",
    allowedRaces: ["humano", "meio_elfo", "meio_orc"],
    prerequisites: [{ type: "race", allowedRaces: ["humano", "meio_elfo", "meio_orc"] }],
    grants: { attributes: {}, proficiencies: { skill: { choose: 1 }, tool: { choose: 1 }, language: { choose: 1 } }, features: ["expertise_choice"] }
  },
  segunda_chance: {
    name: "Segunda Chance",
    source: "Xanathar",
    allowedRaces: ["halfling"],
    prerequisites: [{ type: "race", allowedRaces: ["halfling"] }],
    grants: { attributes: { chooseOne: ["destreza", "constituicao", "carisma"], amount: 1 }, proficiencies: {}, features: ["second_chance"] }
  }
};

function ruleUnique(values) {
  return [...new Set([].concat(values || []).filter(v => v !== undefined && v !== null && String(v).trim() !== ""))];
}

function ruleSpellBaseName(entry) {
  return String(entry || "").replace(/\s*\(\d+º\)\s*$/, "").trim();
}

function ruleSpellCircleFromEntry(entry) {
  const match = String(entry || "").match(/\((\d+)º\)/);
  return match ? Number(match[1]) : null;
}

function ruleNormalizeSpellName(entry) {
  return ruleSpellBaseName(entry).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function ruleNormalizeSpellList(entries) {
  return ruleUnique([].concat(entries || []).map(ruleSpellBaseName));
}

function ruleAbilityList() {
  return typeof ATTRIBUTE_LIST !== "undefined" ? ATTRIBUTE_LIST : RULE_ABILITY_KEYS;
}

function ruleAbilityLabels() {
  return typeof ATTRIBUTE_LABELS !== "undefined" ? ATTRIBUTE_LABELS : {
    forca: "Força", destreza: "Destreza", constituicao: "Constituição", inteligencia: "Inteligência", sabedoria: "Sabedoria", carisma: "Carisma"
  };
}

function ruleCalcMod(value) {
  if (typeof calcularMod === "function") return calcularMod(value);
  return Math.floor((Number(value || 10) - 10) / 2);
}

function normalizeAbilityMap(values) {
  const out = {};
  ruleAbilityList().forEach(attr => out[attr] = Number((values || {})[attr] || 0));
  return out;
}

function createEmptyRuleProficiencySet() {
  return { armor: [], weapons: [], tools: [], skills: [], savingThrows: [], languages: [], rawLegacy: [] };
}

function createEmptyRuleSpellcastingState() {
  return {
    ehConjurador: false,
    ability: null,
    model: null,
    casterType: null,
    spellSaveDC: null,
    spellAttackBonus: null,
    slots: [0,0,0,0,0,0,0,0,0],
    pactSlots: [],
    pactSlotLevel: null,
    cantrips: { classLimit: 0, selectedFromClass: [], fromRace: [], fromSubclass: [], fromFeats: [], final: [] },
    spells: { knownLimit: 0, preparedLimit: 0, selectedKnown: [], selectedPrepared: [], alwaysPrepared: [], expandedList: [], bonusKnown: [], fromRace: [], fromSubclass: [], fromFeats: [], finalKnown: [], finalPrepared: [] },
    wizard: { spellbook: [], expectedSpellbookCount: 0, preparedFromSpellbook: [] }
  };
}

function buildRuleContext(personagem) {
  const p = personagem || {};
  return {
    personagem: p,
    raceKey: p.raca || null,
    backgroundKey: p.origem || null,
    classKey: p.classe || null,
    subclassKey: p.subclasse || null,
    subclassCompositeKey: `${p.classe || ""}:${p.subclasse || ""}`,
    level: Math.max(1, Math.min(20, Number(p.nivel || 1))),
    abilityBase: p.atributosBase || {},
    racialBonus: p.bonusRaciais || {},
    selectedClassSkills: p.periciasClasseSelecionadas || [],
    selectedOptions: p.opcoesClasse || {},
    currentMagic: p.magia || {},
    currentFeats: ruleUnique([
      ...((p.opcoesClasse || {}).feats || []),
      ...((p.opcoesClasse || {}).talentos || []),
      ...([].concat(((p.opcoesClasse || {}).asi || [])).filter(c => c && c.type === RULE_ASI_CHOICE_TYPES.FEAT && c.feat).map(c => c.feat))
    ])
  };
}

function resolveRaceGrants(context) {
  const race = typeof RACES !== "undefined" ? RACES[context.raceKey] : null;
  if (!race) return { attributes: {}, proficiencies: createEmptyRuleProficiencySet(), features: [], cantrips: [], spells: [], movement: 30 };
  return {
    attributes: normalizeAbilityMap(race.bonusAtributos || {}),
    proficiencies: { ...createEmptyRuleProficiencySet(), languages: ruleUnique(race.idiomas || []) },
    features: ruleUnique(race.traits || []),
    cantrips: [],
    spells: [],
    movement: race.deslocamento || 30
  };
}

function resolveBackgroundGrants(context) {
  const bg = typeof BACKGROUNDS !== "undefined" ? BACKGROUNDS[context.backgroundKey] : null;
  if (!bg) return { skills: [], tools: [], languages: 0, features: [] };
  return { skills: ruleUnique(bg.pericias || []), tools: ruleUnique(bg.ferramentas || []), languages: Number(bg.idiomas || 0), features: ruleUnique([bg.caracteristica]) };
}

function resolveClassGrants(context) {
  const cls = typeof CLASSES !== "undefined" ? CLASSES[context.classKey] : null;
  if (!cls) return { proficiencies: [], savingThrows: [], skillChoices: null };
  return { proficiencies: ruleUnique(cls.proficiencias || []), savingThrows: ruleUnique(cls.saves || []), skillChoices: cls.escolhaPericias || null };
}

function resolveSubclassGrants(context) {
  const out = createEmptyRuleProficiencySet();
  const grant = RULE_SUBCLASS_PROFICIENCY_GRANTS[context.subclassCompositeKey];

  if (grant && context.level >= grant.level) {
    addCategorizedProficiencies(out, grant.proficiencies);
  }

  // Proficiências de subclasse que dependem de escolha do usuário.
  // Mantidas na engine para não depender de funções antigas de rules.js.
  if (context.subclassCompositeKey === "guerreiro:arcane_archer" && context.level >= 3) {
    const skill = (context.selectedOptions || {}).arcane_archer_scholar;
    if (skill) out.skills.push(skill);
  }

  if (context.subclassCompositeKey === "guerreiro:samurai" && context.level >= 3) {
    const skill = (context.selectedOptions || {}).samurai_bonus_skill;
    if (skill) out.skills.push(skill);
  }

  out.armor = ruleUnique(out.armor);
  out.weapons = ruleUnique(out.weapons);
  out.tools = ruleUnique(out.tools);
  out.skills = ruleUnique(out.skills);
  out.savingThrows = ruleUnique(out.savingThrows);
  out.languages = ruleUnique(out.languages);
  out.rawLegacy = ruleUnique(out.rawLegacy);

  return { proficiencies: out, features: [], spells: resolveSubclassSpellBenefits(context) };
}

function getRuleFeatById(id) {
  return (RULE_FEATS && RULE_FEATS[id]) || (RULE_XANATHAR_RACIAL_FEATS && RULE_XANATHAR_RACIAL_FEATS[id]) || null;
}

function getRuleFeatName(id) {
  const feat = getRuleFeatById(id);
  return feat ? (feat.name || id) : id;
}

function getRuleFeatAttributeOptions(featId) {
  const feat = getRuleFeatById(featId);
  const attrs = feat && feat.grants && feat.grants.attributes;
  if (!attrs || !attrs.chooseOne) return [];
  return [].concat(attrs.chooseOne || []);
}

function getRuleFeatChoiceConfig(featId) {
  const feat = getRuleFeatById(featId);
  const grants = (feat && feat.grants) || {};
  const attrs = grants.attributes || {};
  return {
    attributeOptions: attrs.chooseOne ? [].concat(attrs.chooseOne) : [],
    attributeAmount: Number(attrs.amount || 1),
    needsAttributeChoice: !!attrs.chooseOne,
    needsMagicInitiateChoices: featId === "iniciado_em_magia",
    needsOpenChoices: !!(grants.proficiencies && (grants.proficiencies.skillsOrTools || grants.proficiencies.weapons || grants.proficiencies.languages || grants.proficiencies.skill || grants.proficiencies.tool || grants.proficiencies.language))
  };
}



// ===============================
// ETAPA 15 - ESCOLHAS DETALHADAS DOS TALENTOS
// ===============================
// Mantém talentos dentro de opcoesClasse.asi[].featOptions e não altera exportação.
const RULE_STAGE15_LANGUAGES = ["Anão","Élfico","Gigante","Gnômico","Goblin","Halfling","Orc","Abissal","Celestial","Dracônico","Dialeto Subterrâneo","Infernal","Primordial","Silvestre","Subcomum"];
const RULE_STAGE15_TOOLS = ["Ferramentas de ladrão","Kit de herbalismo","Kit de disfarce","Kit de falsificação","Ferramentas de artesão","Instrumento musical","Jogo","Veículos terrestres","Veículos aquáticos","Ferramentas de navegador","Suprimentos de cervejeiro","Suprimentos de caligrafia"];
const RULE_STAGE15_MAGIC_INITIATE_CLASSES = ["bardo","bruxo","clerigo","druida","feiticeiro","mago"];

function ruleStage15WeaponOptions(){
  if (typeof getAllWeaponOptionLabels === "function") return getAllWeaponOptionLabels();
  if (typeof WEAPONS !== "undefined") return Object.values(WEAPONS || {}).map(w => w.nome).filter(Boolean).sort((a,b)=>a.localeCompare(b,'pt-BR'));
  return ["Adaga","Bordão","Maça","Espada curta","Rapieira","Espada longa","Arco curto","Arco longo","Besta leve"];
}

function ruleStage15SkillOptions(){ return typeof SKILLS !== "undefined" ? Object.keys(SKILLS) : ["Acrobacia","Arcanismo","Atletismo","Atuação","Enganação","Furtividade","História","Intimidação","Intuição","Investigação","Medicina","Natureza","Percepção","Persuasão","Prestidigitação","Religião","Sobrevivência"]; }
function ruleStage15ToolOptions(){ return RULE_STAGE15_TOOLS.slice(); }
function ruleStage15LanguageOptions(){ return RULE_STAGE15_LANGUAGES.slice(); }

function ruleStage15SpellListsForClass(classKey){
  const data = (typeof SPELL_LISTS !== "undefined" ? SPELL_LISTS[classKey] : null) || { truques: [], 1: [] };
  return { cantrips: ruleUnique(data.truques || []), level1: ruleUnique(data[1] || data["1"] || []) };
}

function getRuleFeatDetailedChoiceConfig(featId){
  const empty = { skills: 0, tools: 0, languages: 0, weapons: 0, expertise: 0, magicInitiate: false };
  if (featId === "habilidoso") return { ...empty, skillsOrTools: 3 };
  if (featId === "linguista") return { ...empty, languages: 3 };
  if (featId === "mestre_de_armas") return { ...empty, weapons: 4 };
  if (featId === "prodigio") return { ...empty, skills: 1, tools: 1, languages: 1, expertise: 1 };
  if (featId === "iniciado_em_magia") return { ...empty, magicInitiate: true };
  return empty;
}

function ruleStage15FeatOptions(choice){ return (choice && choice.featOptions) || {}; }
function ruleStage15CleanArray(values){ return ruleUnique([].concat(values || []).map(v => String(v || '').trim()).filter(Boolean)); }

function getRuleFeatDetailedChoiceValidation(choice){
  const errors = [];
  const featId = choice && choice.feat;
  const config = getRuleFeatDetailedChoiceConfig(featId);
  const opts = ruleStage15FeatOptions(choice);
  const name = getRuleFeatName(featId);
  const validateCount = (label, arr, count, allowed) => {
    if (!count) return;
    const selected = ruleStage15CleanArray(arr);
    if (selected.length !== count) errors.push(`${name} precisa escolher ${count} ${label}.`);
    const duplicates = selected.filter((v,i)=>selected.indexOf(v)!==i);
    if (duplicates.length) errors.push(`${name} possui escolha duplicada em ${label}: ${ruleUnique(duplicates).join(', ')}.`);
    const bad = selected.filter(v => allowed && !allowed.includes(v));
    if (bad.length) errors.push(`${name} possui ${label} inválido(s): ${bad.join(', ')}.`);
  };

  if (config.skillsOrTools) {
    const combined = [...ruleStage15CleanArray(opts.skills), ...ruleStage15CleanArray(opts.tools)];
    if (combined.length !== config.skillsOrTools) errors.push(`${name} precisa escolher ${config.skillsOrTools} perícias ou ferramentas.`);
  }
  validateCount('idioma(s)', opts.languages, config.languages, ruleStage15LanguageOptions());
  validateCount('arma(s)', opts.weapons, config.weapons, ruleStage15WeaponOptions());
  validateCount('perícia(s)', opts.skills, config.skills, ruleStage15SkillOptions());
  validateCount('ferramenta(s)', opts.tools, config.tools, ruleStage15ToolOptions());
  if (config.expertise) {
    const expertise = ruleStage15CleanArray(opts.expertise);
    if (expertise.length !== config.expertise) errors.push(`${name} precisa escolher ${config.expertise} perícia para especialização.`);
    const allowedExpertise = ruleUnique([...(opts.skills || []), ...(((typeof state !== 'undefined' && state.personagem && state.personagem.periciasFinaisEfetivas) || []))]);
    const bad = expertise.filter(v => allowedExpertise.length && !allowedExpertise.includes(v));
    if (bad.length) errors.push(`${name} recebeu especialização inválida: ${bad.join(', ')}.`);
  }
  if (config.magicInitiate) {
    const magicClass = opts.magicClass || "";
    if (!RULE_STAGE15_MAGIC_INITIATE_CLASSES.includes(magicClass)) errors.push(`${name} precisa escolher uma classe válida para a lista de magia.`);
    const lists = ruleStage15SpellListsForClass(magicClass);
    const cantrips = ruleStage15CleanArray(opts.cantrips);
    if (cantrips.length !== 2) errors.push(`${name} precisa escolher 2 truques.`);
    cantrips.filter(v => !lists.cantrips.includes(v)).forEach(v => errors.push(`${name} possui truque fora da classe escolhida: ${v}.`));
    if (!opts.spell) errors.push(`${name} precisa escolher 1 magia de 1º círculo.`);
    if (opts.spell && !lists.level1.includes(opts.spell)) errors.push(`${name} possui magia de 1º círculo fora da classe escolhida: ${opts.spell}.`);
  }
  return errors;
}

function getRuleFeatDetailedSelections(context){
  const choices = normalizeAsiChoices(((context || {}).selectedOptions || {}).asi || []).filter(c => c.type === RULE_ASI_CHOICE_TYPES.FEAT && c.feat);
  const out = { skills: [], tools: [], languages: [], weapons: [], expertise: [], cantrips: [], spells: [] };
  choices.forEach(choice => {
    const opts = ruleStage15FeatOptions(choice);
    out.skills.push(...ruleStage15CleanArray(opts.skills));
    out.tools.push(...ruleStage15CleanArray(opts.tools));
    out.languages.push(...ruleStage15CleanArray(opts.languages));
    out.weapons.push(...ruleStage15CleanArray(opts.weapons));
    out.expertise.push(...ruleStage15CleanArray(opts.expertise));
    if (choice.feat === "iniciado_em_magia") {
      out.cantrips.push(...ruleStage15CleanArray(opts.cantrips));
      if (opts.spell) out.spells.push(`${opts.spell} (1º)`);
    }
  });
  Object.keys(out).forEach(k => out[k] = ruleUnique(out[k]));
  return out;
}

function resolveFeatGrants(context) {
  const selected = ruleUnique(context.currentFeats);
  return { selected, grants: selected.map(id => getRuleFeatById(id)).filter(Boolean) };
}

function resolveAsiBonuses(context) {
  const out = normalizeAbilityMap({});
  const choices = [].concat((context.selectedOptions || {}).asi || []);
  choices.forEach(choice => {
    Object.entries(choice.attributes || {}).forEach(([attr, amount]) => {
      if (out[attr] !== undefined) out[attr] += Number(amount || 0);
    });
  });
  return out;
}

function resolveFeatAbilityBonuses(context) {
  const out = normalizeAbilityMap({});
  const featChoices = (context.selectedOptions || {}).featBonuses || {};
  Object.entries(featChoices).forEach(([attr, amount]) => {
    if (out[attr] !== undefined) out[attr] += Number(amount || 0);
  });

  normalizeAsiChoices((context.selectedOptions || {}).asi || [])
    .filter(choice => choice.type === RULE_ASI_CHOICE_TYPES.FEAT && choice.feat)
    .forEach(choice => {
      const feat = getRuleFeatById(choice.feat);
      const attrs = feat && feat.grants && feat.grants.attributes;
      if (!attrs) return;
      Object.entries(attrs).forEach(([attr, amount]) => {
        if (["chooseOne", "amount"].includes(attr)) return;
        if (out[attr] !== undefined) out[attr] += Number(amount || 0);
      });
      if (attrs.chooseOne) {
        const selectedAttr = (choice.featOptions || {}).attribute;
        if (selectedAttr && out[selectedAttr] !== undefined && attrs.chooseOne.includes(selectedAttr)) {
          out[selectedAttr] += Number(attrs.amount || 1);
        }
      }
    });
  return out;
}

function resolveAbilityScores(context) {
  const base = normalizeAbilityMap(context.abilityBase);
  const racial = normalizeAbilityMap(context.racialBonus);
  const asiBonuses = resolveAsiBonuses(context);
  const featBonuses = resolveFeatAbilityBonuses(context);
  const final = {};
  ruleAbilityList().forEach(attr => final[attr] = (base[attr] || 0) + (racial[attr] || 0) + (asiBonuses[attr] || 0) + (featBonuses[attr] || 0));
  return { base, racial, asiBonuses, featBonuses, final };
}

function resolveAbilityScoreImprovements(context) {
  const levels = RULE_ASI_LEVELS[context.classKey] || RULE_ASI_LEVELS.default;
  const unlocked = levels.filter(level => context.level >= level);
  const selected = normalizeAsiChoices((context.selectedOptions || {}).asi || []);
  return { availableLevels: unlocked, expectedCount: unlocked.length, selectedCount: selected.length, selected };
}

function normalizeAsiChoices(choices) {
  return [].concat(choices || []).filter(Boolean).map(choice => ({
    level: Number(choice.level || 0),
    type: choice.type || RULE_ASI_CHOICE_TYPES.PLUS_TWO,
    attributes: { ...(choice.attributes || {}) },
    feat: choice.feat || "",
    featOptions: { ...(choice.featOptions || {}) }
  }));
}

function getRuleAsiLevelsForCharacter(personagem) {
  const context = buildRuleContext(personagem || {});
  return (RULE_ASI_LEVELS[context.classKey] || RULE_ASI_LEVELS.default).filter(level => context.level >= level);
}

function getRuleAsiExpectedCount(personagem) {
  return getRuleAsiLevelsForCharacter(personagem).length;
}

function getRuleEmptyAsiChoice(level) {
  return { level: Number(level || 0), type: RULE_ASI_CHOICE_TYPES.PLUS_TWO, attributes: {}, feat: "" };
}

function ensureRuleAsiChoices(personagem) {
  if (!personagem) return [];
  personagem.opcoesClasse = personagem.opcoesClasse || {};
  const unlocked = getRuleAsiLevelsForCharacter(personagem);
  const current = normalizeAsiChoices(personagem.opcoesClasse.asi || []);
  personagem.opcoesClasse.asi = unlocked.map(level => current.find(choice => choice.level === level) || getRuleEmptyAsiChoice(level));
  return personagem.opcoesClasse.asi;
}

function applyRuleAsiInput(personagem, level, type, payload) {
  if (!personagem) return;
  const choices = ensureRuleAsiChoices(personagem);
  const choice = choices.find(item => item.level === Number(level));
  if (!choice) return;
  choice.type = type || choice.type || RULE_ASI_CHOICE_TYPES.PLUS_TWO;
  choice.attributes = {};
  choice.feat = "";
  if (choice.type === RULE_ASI_CHOICE_TYPES.PLUS_TWO) {
    const attr = payload && payload.attr ? payload.attr : null;
    if (attr && ruleAbilityList().includes(attr)) choice.attributes[attr] = 2;
  }
  if (choice.type === RULE_ASI_CHOICE_TYPES.PLUS_ONE_PLUS_ONE) {
    const attr1 = payload && payload.attr1 ? payload.attr1 : null;
    const attr2 = payload && payload.attr2 ? payload.attr2 : null;
    if (attr1 && ruleAbilityList().includes(attr1)) choice.attributes[attr1] = 1;
    if (attr2 && attr2 !== attr1 && ruleAbilityList().includes(attr2)) choice.attributes[attr2] = 1;
  }
  if (choice.type === RULE_ASI_CHOICE_TYPES.FEAT) {
    choice.feat = payload && payload.feat ? payload.feat : "";
    choice.featOptions = { ...((payload && payload.featOptions) || {}) };
  }
}

function auditAsiChoice(choice, availableLevels) {
  const errors = [];
  if (!availableLevels.includes(choice.level)) {
    errors.push(`ASI/talento selecionado para nível não liberado: ${choice.level}.`);
    return errors;
  }
  if (choice.type === RULE_ASI_CHOICE_TYPES.PLUS_TWO) {
    const entries = Object.entries(choice.attributes || {}).filter(([, amount]) => Number(amount) !== 0);
    if (entries.length !== 1 || Number(entries[0][1]) !== 2) errors.push(`ASI do nível ${choice.level} precisa aplicar +2 em um único atributo.`);
  } else if (choice.type === RULE_ASI_CHOICE_TYPES.PLUS_ONE_PLUS_ONE) {
    const entries = Object.entries(choice.attributes || {}).filter(([, amount]) => Number(amount) !== 0);
    if (entries.length !== 2 || entries.some(([, amount]) => Number(amount) !== 1)) errors.push(`ASI do nível ${choice.level} precisa aplicar +1 em dois atributos diferentes.`);
  } else if (choice.type === RULE_ASI_CHOICE_TYPES.FEAT) {
    if (!choice.feat) {
      errors.push(`Talento do nível ${choice.level} ainda não foi escolhido.`);
    } else if (!getRuleFeatById(choice.feat)) {
      errors.push(`Talento do nível ${choice.level} não está mapeado: ${choice.feat}.`);
    } else {
      const config = getRuleFeatChoiceConfig(choice.feat);
      if (config.needsAttributeChoice && !(choice.featOptions || {}).attribute) errors.push(`Talento ${getRuleFeatName(choice.feat)} precisa escolher o atributo do bônus.`);
      if (config.needsAttributeChoice && (choice.featOptions || {}).attribute && !config.attributeOptions.includes((choice.featOptions || {}).attribute)) errors.push(`Talento ${getRuleFeatName(choice.feat)} recebeu atributo inválido.`);
      if (typeof getRuleFeatDetailedChoiceValidation === "function") errors.push(...getRuleFeatDetailedChoiceValidation(choice));
    }
  } else {
    errors.push(`Tipo de ASI inválido no nível ${choice.level}.`);
  }
  return errors;
}

function addLegacyProficiencyText(target, text) {
  if (!text) return;
  const mapped = RULE_PROFICIENCY_CATEGORY_MAP[text];
  target.rawLegacy.push(text);
  if (!mapped) {
    target.tools.push(text);
    return;
  }
  if (mapped.category === "armor") target.armor.push(text);
  if (mapped.category === "weapon") target.weapons.push(text);
  if (mapped.category === "tool") target.tools.push(text);
}

function addCategorizedProficiencies(target, profs) {
  if (!profs) return;
  [].concat(profs.armor || []).forEach(v => { target.armor.push(v); target.rawLegacy.push(v); });
  [].concat(profs.weapons || []).forEach(v => { target.weapons.push(v); target.rawLegacy.push(v); });
  [].concat(profs.tools || []).forEach(v => { target.tools.push(v); target.rawLegacy.push(v); });
  [].concat(profs.skills || []).forEach(v => target.skills.push(v));
  [].concat(profs.savingThrows || []).forEach(v => target.savingThrows.push(v));
  [].concat(profs.languages || []).forEach(v => target.languages.push(v));
}

function addFeatProficiencyGrants(target, context) {
  normalizeAsiChoices((context.selectedOptions || {}).asi || [])
    .filter(choice => choice.type === RULE_ASI_CHOICE_TYPES.FEAT && choice.feat)
    .forEach(choice => {
      const feat = getRuleFeatById(choice.feat);
      const grants = (feat && feat.grants && feat.grants.proficiencies) || {};
      [].concat(grants.armor || []).forEach(v => addLegacyProficiencyText(target, v));
      [].concat(grants.weapons || []).filter(v => typeof v === "string").forEach(v => addLegacyProficiencyText(target, v));
      [].concat(grants.tools || []).forEach(v => target.tools.push(v));
      [].concat(grants.skills || []).forEach(v => target.skills.push(v));
      [].concat(grants.languages || []).forEach(v => target.languages.push(v));
      if (grants.savingThrowsFromAttributeChoice && (choice.featOptions || {}).attribute) {
        const labels = ruleAbilityLabels();
        target.savingThrows.push(labels[(choice.featOptions || {}).attribute] || (choice.featOptions || {}).attribute);
      }
      const opts = (choice.featOptions || {});
      ruleStage15CleanArray(opts.skills).forEach(v => target.skills.push(v));
      ruleStage15CleanArray(opts.tools).forEach(v => target.tools.push(v));
      ruleStage15CleanArray(opts.languages).forEach(v => target.languages.push(v));
      ruleStage15CleanArray(opts.weapons).forEach(v => { target.weapons.push(v); target.rawLegacy.push(v); });
    });
}

function resolveProficiencies(context) {
  const result = createEmptyRuleProficiencySet();
  const race = resolveRaceGrants(context);
  const bg = resolveBackgroundGrants(context);
  const cls = resolveClassGrants(context);
  const sub = resolveSubclassGrants(context);

  addCategorizedProficiencies(result, race.proficiencies);
  bg.skills.forEach(v => result.skills.push(v));
  bg.tools.forEach(v => result.tools.push(v));
  cls.proficiencies.forEach(v => addLegacyProficiencyText(result, v));
  cls.savingThrows.forEach(v => result.savingThrows.push(v));
  context.selectedClassSkills.forEach(v => result.skills.push(v));
  addCategorizedProficiencies(result, sub.proficiencies);
  addFeatProficiencyGrants(result, context);

  result.armor = ruleUnique(result.armor);
  result.weapons = ruleUnique(result.weapons);
  result.tools = ruleUnique(result.tools);
  result.skills = ruleUnique(result.skills);
  result.savingThrows = ruleUnique(result.savingThrows);
  result.languages = ruleUnique(result.languages);
  result.rawLegacy = ruleUnique(result.rawLegacy);
  return result;
}

function resolveSpellcastingProfile(context) {
  const subclassProfile = RULE_SUBCLASS_SPELLCASTING[context.subclassCompositeKey];
  if (subclassProfile && context.level >= subclassProfile.startsAtLevel) return subclassProfile;
  return RULE_CLASS_SPELLCASTING[context.classKey] || null;
}

function resolveSpellSlots(context, profile) {
  if (!profile || context.level < (profile.startsAtLevel || 1)) return { slots: [0,0,0,0,0,0,0,0,0], pactSlots: [], pactSlotLevel: null };
  if (profile.casterType === "pact") return { slots: [0,0,0,0,0,0,0,0,0], pactSlots: RULE_SPELL_SLOTS.pact[context.level] || [], pactSlotLevel: RULE_SPELL_SLOTS.pactCircle[context.level] || null };
  const table = RULE_SPELL_SLOTS[profile.casterType] || {};
  return { slots: table[context.level] || [0,0,0,0,0,0,0,0,0], pactSlots: [], pactSlotLevel: null };
}

function resolvePreparedSpellLimit(context, profile, abilityScores) {
  if (!profile || !["prepared", "spellbookPrepared"].includes(profile.model)) return 0;
  if (context.level < (profile.startsAtLevel || 1)) return 0;
  const abilityValue = abilityScores.final[profile.ability] || 10;
  const abilityMod = ruleCalcMod(abilityValue);
  let total = 0;
  if (profile.preparedFormula === "level + abilityMod") total = context.level + abilityMod;
  if (profile.preparedFormula === "floor(level / 2) + abilityMod") total = Math.floor(context.level / 2) + abilityMod;
  return Math.max(1, total);
}

function resolveKnownSpellLimit(context, profile) {
  if (!profile || !profile.knownSpellProgression) return 0;
  if (context.level < (profile.startsAtLevel || 1)) return 0;
  return profile.knownSpellProgression[context.level - 1] || 0;
}

function resolveCantrips(context, profile) {
  const current = context.currentMagic || {};
  const classLimit = profile && profile.cantripProgression && context.level >= (profile.startsAtLevel || 1) ? (profile.cantripProgression[context.level - 1] || 0) : 0;
  const selectedFromClass = ruleUnique(current.listaTruques || []);
  const featSelections = typeof getRuleFeatDetailedSelections === "function" ? getRuleFeatDetailedSelections(context) : { cantrips: [] };
  return { classLimit, selectedFromClass, fromRace: [], fromSubclass: [], fromFeats: featSelections.cantrips || [], final: ruleUnique([...selectedFromClass, ...(featSelections.cantrips || [])]) };
}

function collectUnlockedSubclassSpells(rule, level) {
  const out = [];
  Object.entries(rule.unlockByClassLevel || {}).forEach(([unlockLevel, spells]) => {
    if (level >= Number(unlockLevel)) out.push(...[].concat(spells || []));
  });
  return ruleUnique(out);
}

function resolveSubclassSpellBenefits(context) {
  const rule = RULE_SUBCLASS_SPELL_RULES[context.subclassCompositeKey];
  const empty = { alwaysPrepared: [], expandedList: [], bonusKnown: [], bonusCantrips: [] };
  if (!rule) return empty;
  const unlocked = collectUnlockedSubclassSpells(rule, context.level);
  if (rule.type === "alwaysPrepared") return { ...empty, alwaysPrepared: unlocked };
  if (rule.type === "expandedList") return { ...empty, expandedList: unlocked };
  if (rule.type === "bonusKnown") return { ...empty, bonusKnown: unlocked };
  if (rule.type === "bonusCantrips") return { ...empty, bonusCantrips: unlocked };
  return empty;
}

function getRuleEngineSubclassSpellBenefitsForCharacter(personagem) {
  try {
    const context = buildRuleContext(personagem || {});
    return resolveSubclassSpellBenefits(context);
  } catch (error) {
    return { alwaysPrepared: [], expandedList: [], bonusKnown: [], bonusCantrips: [] };
  }
}

function getRuleEngineAutomaticSubclassSpellNames(personagem) {
  const benefits = getRuleEngineSubclassSpellBenefitsForCharacter(personagem);
  return ruleUnique([
    ...(benefits.alwaysPrepared || []),
    ...(benefits.bonusKnown || [])
  ].map(ruleNormalizeSpellName).filter(Boolean));
}

function getRuleEngineCountableSelectedSpells(personagem) {
  const magia = (personagem || {}).magia || {};
  const automatic = new Set(getRuleEngineAutomaticSubclassSpellNames(personagem));
  return (magia.listaMagias || []).filter(nome => !automatic.has(ruleNormalizeSpellName(nome))).length;
}

function getRuleEngineSubclassSpellSummary(personagem) {
  const benefits = getRuleEngineSubclassSpellBenefitsForCharacter(personagem);
  return {
    alwaysPrepared: ruleUnique(benefits.alwaysPrepared || []),
    expandedList: ruleUnique(benefits.expandedList || []),
    bonusKnown: ruleUnique(benefits.bonusKnown || []),
    bonusCantrips: ruleUnique(benefits.bonusCantrips || [])
  };
}

function resolveWizardSpellbook(context, profile) {
  const current = context.currentMagic || {};
  if (!profile || profile.model !== "spellbookPrepared") return { spellbook: [], expectedSpellbookCount: 0, preparedFromSpellbook: [] };
  const expectedSpellbookCount = RULE_WIZARD_SPELLBOOK.initialLevel1Spells + Math.max(0, context.level - 1) * RULE_WIZARD_SPELLBOOK.learnedPerLevel;
  const spellbook = ruleNormalizeSpellList(current.grimorio || []);
  const preparedFromSpellbook = ruleNormalizeSpellList(current.listaMagias || []);
  return { spellbook, expectedSpellbookCount, preparedFromSpellbook };
}

function resolveSpellcasting(context, abilityScores) {
  const profile = resolveSpellcastingProfile(context);
  const spellcasting = createEmptyRuleSpellcastingState();
  const featSelectionsEarly = typeof getRuleFeatDetailedSelections === "function" ? getRuleFeatDetailedSelections(context) : { cantrips: [], spells: [] };
  if (!profile) {
    if ((featSelectionsEarly.cantrips || []).length || (featSelectionsEarly.spells || []).length) {
      const magicChoice = normalizeAsiChoices((context.selectedOptions || {}).asi || []).find(c => c.type === RULE_ASI_CHOICE_TYPES.FEAT && c.feat === "iniciado_em_magia");
      const magicClass = magicChoice && magicChoice.featOptions ? magicChoice.featOptions.magicClass : "";
      const featProfile = RULE_CLASS_SPELLCASTING[magicClass] || null;
      const ability = featProfile ? featProfile.ability : null;
      const abilityValue = ability ? (abilityScores.final[ability] || 10) : 10;
      const abilityMod = ruleCalcMod(abilityValue);
      const proficiencyBonus = Number(context.personagem.bonusProficiencia || 2);
      spellcasting.ehConjurador = true;
      spellcasting.ability = ability;
      spellcasting.model = "featKnown";
      spellcasting.casterType = "feat";
      spellcasting.spellSaveDC = ability ? 8 + proficiencyBonus + abilityMod : null;
      spellcasting.spellAttackBonus = ability ? proficiencyBonus + abilityMod : null;
      spellcasting.cantrips.fromFeats = featSelectionsEarly.cantrips || [];
      spellcasting.cantrips.final = ruleUnique(featSelectionsEarly.cantrips || []);
      spellcasting.spells.fromFeats = featSelectionsEarly.spells || [];
      spellcasting.spells.finalKnown = ruleUnique(featSelectionsEarly.spells || []);
    }
    return spellcasting;
  }

  const slots = resolveSpellSlots(context, profile);
  const cantrips = resolveCantrips(context, profile);
  const subclassSpells = resolveSubclassSpellBenefits(context);
  const wizard = resolveWizardSpellbook(context, profile);
  const abilityValue = abilityScores.final[profile.ability] || 10;
  const abilityMod = ruleCalcMod(abilityValue);
  const proficiencyBonus = Number(context.personagem.bonusProficiencia || 2);

  spellcasting.ehConjurador = context.level >= (profile.startsAtLevel || 1);
  spellcasting.ability = profile.ability;
  spellcasting.model = profile.model;
  spellcasting.casterType = profile.casterType;
  spellcasting.spellSaveDC = 8 + proficiencyBonus + abilityMod;
  spellcasting.spellAttackBonus = proficiencyBonus + abilityMod;
  spellcasting.slots = slots.slots;
  spellcasting.pactSlots = slots.pactSlots;
  spellcasting.pactSlotLevel = slots.pactSlotLevel;
  spellcasting.cantrips = { ...cantrips, fromSubclass: subclassSpells.bonusCantrips, final: ruleUnique([...cantrips.final, ...subclassSpells.bonusCantrips]) };
  spellcasting.spells.knownLimit = resolveKnownSpellLimit(context, profile);
  spellcasting.spells.preparedLimit = resolvePreparedSpellLimit(context, profile, abilityScores);
  spellcasting.spells.selectedKnown = profile.model.includes("known") || profile.model === "pactKnown" ? ruleUnique((context.currentMagic || {}).listaMagias || []) : [];
  spellcasting.spells.selectedPrepared = ["prepared", "spellbookPrepared"].includes(profile.model) ? ruleUnique((context.currentMagic || {}).listaMagias || []) : [];
  spellcasting.spells.alwaysPrepared = subclassSpells.alwaysPrepared;
  spellcasting.spells.expandedList = subclassSpells.expandedList;
  spellcasting.spells.bonusKnown = subclassSpells.bonusKnown;
  const featSelections = typeof getRuleFeatDetailedSelections === "function" ? getRuleFeatDetailedSelections(context) : { spells: [] };
  spellcasting.spells.fromFeats = featSelections.spells || [];
  spellcasting.spells.finalKnown = ruleUnique([...spellcasting.spells.selectedKnown, ...spellcasting.spells.bonusKnown, ...(spellcasting.spells.fromFeats || [])]);
  spellcasting.spells.finalPrepared = ruleUnique([...spellcasting.spells.selectedPrepared, ...spellcasting.spells.alwaysPrepared, ...(spellcasting.spells.fromFeats || [])]);
  spellcasting.wizard = wizard;

  return spellcasting;
}

function auditAbilityScores(context, abilityScores, asi) {
  const errors = [];
  const warnings = [];
  const labels = ruleAbilityLabels();
  const method = context.personagem.metodoAtributos;

  if (method === "pointbuy") {
    const used = typeof calcularPontosUsadosPointBuy === "function" ? calcularPontosUsadosPointBuy(abilityScores.base) : 0;
    if (used > 27) errors.push("Point Buy excede 27 pontos.");
    if (used < 27) warnings.push(`Point Buy ainda possui ${27 - used} ponto(s) disponível(is).`);
    ruleAbilityList().forEach(attr => {
      const value = abilityScores.base[attr];
      if (value < 8 || value > 15) errors.push(`${labels[attr]} precisa ficar entre 8 e 15 antes dos bônus.`);
    });
  }

  if (method === "standard" && typeof validarStandardArray === "function" && !validarStandardArray(abilityScores.base)) {
    errors.push("Atributos base não correspondem ao Standard Array.");
  }

  if (asi) {
    if (asi.selectedCount < asi.expectedCount) warnings.push(`Há ${asi.expectedCount - asi.selectedCount} aumento(s) de atributo/talento pendente(s).`);
    if (asi.selectedCount > asi.expectedCount) errors.push("Há mais aumentos de atributo/talentos escolhidos do que o nível permite.");
    (asi.selected || []).forEach(choice => errors.push(...auditAsiChoice(choice, asi.availableLevels || [])));
  }

  ruleAbilityList().forEach(attr => {
    if ((abilityScores.final[attr] || 0) > 20) errors.push(`${labels[attr]} passou de 20 sem exceção válida.`);
  });
  return { errors, warnings };
}

function auditProficiencies(context, proficiencies) {
  const errors = [];
  const warnings = [];
  const unknown = (proficiencies.rawLegacy || []).filter(text => !RULE_PROFICIENCY_CATEGORY_MAP[text]);
  if (unknown.length) warnings.push(`Proficiências sem categoria mapeada: ${ruleUnique(unknown).join(", ")}.`);
  return { errors, warnings };
}

function auditSpellcasting(context, spellcasting) {
  const errors = [];
  const warnings = [];
  if (!spellcasting.ehConjurador) return { errors, warnings };

  if (spellcasting.cantrips.selectedFromClass.length > spellcasting.cantrips.classLimit) {
    errors.push(`Truques selecionados excedem o limite da classe (${spellcasting.cantrips.classLimit}).`);
  }
  const automaticSubclassSpells = new Set([
    ...(spellcasting.spells.alwaysPrepared || []),
    ...(spellcasting.spells.bonusKnown || [])
  ].map(ruleNormalizeSpellName));
  const countableKnown = (spellcasting.spells.selectedKnown || []).filter(nome => !automaticSubclassSpells.has(ruleNormalizeSpellName(nome)));
  const countablePrepared = (spellcasting.spells.selectedPrepared || []).filter(nome => !automaticSubclassSpells.has(ruleNormalizeSpellName(nome)));

  if (spellcasting.model === "known" || spellcasting.model === "pactKnown") {
    if (countableKnown.length > spellcasting.spells.knownLimit) errors.push(`Magias conhecidas excedem o limite (${spellcasting.spells.knownLimit}).`);
  }
  if (spellcasting.model === "prepared") {
    if (countablePrepared.length > spellcasting.spells.preparedLimit) errors.push(`Magias preparadas excedem o limite (${spellcasting.spells.preparedLimit}).`);
  }
  if (spellcasting.model === "spellbookPrepared") {
    if (spellcasting.wizard.spellbook.length < spellcasting.wizard.expectedSpellbookCount) warnings.push(`Grimório do mago possui ${spellcasting.wizard.spellbook.length} magia(s), esperado mínimo de ${spellcasting.wizard.expectedSpellbookCount}.`);
    const preparedBaseNames = ruleNormalizeSpellList(spellcasting.spells.selectedPrepared || []);
    const missing = preparedBaseNames.filter(spell => !spellcasting.wizard.spellbook.includes(spell));
    if (missing.length) errors.push(`Mago preparou magia(s) fora do grimório: ${missing.join(", ")}.`);
  }
  return { errors, warnings };
}

function ruleHasProficiency(resolved, prerequisite) {
  const prof = (resolved && resolved.proficiencies) || createEmptyRuleProficiencySet();
  const category = prerequisite.category;
  const pools = {
    armor: prof.armor || [],
    weapon: prof.weapons || [],
    tool: prof.tools || [],
    skill: prof.skills || [],
    savingThrow: prof.savingThrows || [],
    language: prof.languages || []
  };
  const values = pools[category] || [];
  return [].concat(prerequisite.anyOf || []).some(item => values.includes(item) || values.map(v => (RULE_PROFICIENCY_CATEGORY_MAP[v] || {}).key).includes(item));
}

function auditFeatPrerequisite(context, featId, prerequisite, resolved) {
  const labels = ruleAbilityLabels();
  if (!prerequisite) return null;
  if (prerequisite.type === "ability") {
    const value = ((resolved && resolved.abilityScores && resolved.abilityScores.final) || {})[prerequisite.ability] || 0;
    if (value < prerequisite.min) return `${getRuleFeatName(featId)} exige ${labels[prerequisite.ability] || prerequisite.ability} ${prerequisite.min} ou maior.`;
  }
  if (prerequisite.type === "spellcasting") {
    const hasSpellcasting = !!(resolved && resolved.spellcasting && resolved.spellcasting.ehConjurador);
    if (!hasSpellcasting) return `${getRuleFeatName(featId)} exige a capacidade de conjurar ao menos uma magia.`;
  }
  if (prerequisite.type === "race") {
    if (![].concat(prerequisite.allowedRaces || []).includes(context.raceKey)) return `${getRuleFeatName(featId)} exige raça permitida: ${[].concat(prerequisite.allowedRaces || []).join(", ")}.`;
  }
  if (prerequisite.type === "proficiency") {
    if (!ruleHasProficiency(resolved, prerequisite)) return `${getRuleFeatName(featId)} exige proficiência prévia compatível.`;
  }
  return null;
}

function auditFeats(context, feats, resolved) {
  const errors = [];
  const warnings = [];
  const selected = feats.selected || [];
  const duplicate = selected.filter((id, index) => selected.indexOf(id) !== index);
  if (duplicate.length) errors.push(`Talento repetido: ${ruleUnique(duplicate).map(getRuleFeatName).join(", ")}.`);
  selected.forEach(id => {
    const feat = getRuleFeatById(id);
    if (!feat) {
      warnings.push(`Talento ainda não mapeado na engine: ${id}.`);
      return;
    }
    [].concat(feat.prerequisites || []).forEach(req => {
      const err = auditFeatPrerequisite(context, id, req, resolved);
      if (err) errors.push(err);
    });
  });
  return { errors, warnings };
}

function auditRuleEngineSpellSelectionsFromResolved(context, resolved) {
  const errors = [];
  const warnings = [];
  const spellcasting = resolved && resolved.spellcasting;
  if (!spellcasting || !spellcasting.ehConjurador) return { errors, warnings };

  const personagem = {
    ...(context.personagem || {}),
    classe: context.classKey,
    subclasse: context.subclassKey,
    nivel: context.level,
    magia: {
      ...((context.personagem || {}).magia || {}),
      ehConjurador: true,
      listaTruques: (spellcasting.cantrips && spellcasting.cantrips.selectedFromClass) || [],
      listaMagias: [
        ...((spellcasting.spells && spellcasting.spells.selectedKnown) || []),
        ...((spellcasting.spells && spellcasting.spells.selectedPrepared) || [])
      ]
    }
  };

  if (typeof getRuleEngineSpellSelectionValidation === "function") {
    const validation = getRuleEngineSpellSelectionValidation(personagem);
    errors.push(...(validation.errors || []));
    warnings.push(...(validation.warnings || []));
  }

  return { errors: ruleUnique(errors), warnings: ruleUnique(warnings) };
}

function auditCharacterRules(context, resolved) {
  const audits = [
    auditAbilityScores(context, resolved.abilityScores, resolved.asi),
    auditProficiencies(context, resolved.proficiencies),
    auditSpellcasting(context, resolved.spellcasting),
    auditRuleEngineSpellSelectionsFromResolved(context, resolved),
    auditFeats(context, resolved.feats, resolved)
  ];
  return {
    errors: ruleUnique(audits.flatMap(a => a.errors || [])),
    warnings: ruleUnique(audits.flatMap(a => a.warnings || []))
  };
}

function convertSpellModelToLegacyType(model) {
  if (model === "known" || model === "pactKnown") return "conhecidas";
  if (model === "prepared" || model === "spellbookPrepared") return "preparadas";
  return null;
}

function buildLegacyProficiencyList(proficiencies) {
  return ruleUnique([...(proficiencies.armor || []), ...(proficiencies.weapons || []), ...(proficiencies.tools || [])]);
}

function buildLegacySpellList(spellcasting) {
  if (!spellcasting) return [];
  return ruleUnique([
    ...(spellcasting.spells.selectedKnown || []),
    ...(spellcasting.spells.selectedPrepared || []),
    ...(spellcasting.spells.alwaysPrepared || []),
    ...(spellcasting.spells.bonusKnown || []),
    ...(spellcasting.spells.fromFeats || [])
  ]);
}

function buildLegacyPatch(resolved) {
  const spellcasting = resolved.spellcasting || createEmptyRuleSpellcastingState();
  return {
    atributos: resolved.abilityScores ? resolved.abilityScores.final : {},
    proficienciasClasseEfetivas: buildLegacyProficiencyList(resolved.proficiencies || createEmptyRuleProficiencySet()),
    savesClasseEfetivos: (resolved.proficiencies || {}).savingThrows || [],
    periciasFinaisEfetivas: (resolved.proficiencies || {}).skills || [],
    ferramentasEfetivas: (resolved.proficiencies || {}).tools || [],
    magia: {
      ehConjurador: !!spellcasting.ehConjurador,
      habilidade: spellcasting.ability,
      tipo: convertSpellModelToLegacyType(spellcasting.model),
      cdMagia: spellcasting.spellSaveDC,
      ataqueMagia: spellcasting.spellAttackBonus,
      espacos: spellcasting.casterType === "pact" ? spellcasting.pactSlots : spellcasting.slots,
      espacosAtuais: spellcasting.casterType === "pact" ? spellcasting.pactSlots : spellcasting.slots,
      nivelEspacosBruxo: spellcasting.pactSlotLevel,
      cantripsConhecidos: spellcasting.cantrips ? spellcasting.cantrips.classLimit : 0,
      magiasConhecidas: spellcasting.spells ? spellcasting.spells.knownLimit : 0,
      magiasPreparadas: spellcasting.spells ? spellcasting.spells.preparedLimit : 0,
      listaTruques: spellcasting.cantrips ? spellcasting.cantrips.final : [],
      listaMagias: buildLegacySpellList(spellcasting),
      grimorio: spellcasting.wizard ? spellcasting.wizard.spellbook : [],
      magiasSubclasseSemprePreparadas: spellcasting.spells ? spellcasting.spells.alwaysPrepared : [],
      magiasSubclasseListaExpandida: spellcasting.spells ? spellcasting.spells.expandedList : [],
      magiasSubclasseConhecidasBonus: spellcasting.spells ? spellcasting.spells.bonusKnown : [],
      truquesSubclasseBonus: spellcasting.cantrips ? spellcasting.cantrips.fromSubclass : [],
      concentracaoAtiva: "",
      rituaisDisponiveis: []
    }
  };
}

function resolveCharacterRules(personagem) {
  const context = buildRuleContext(personagem || {});
  const abilityScores = resolveAbilityScores(context);
  const asi = resolveAbilityScoreImprovements(context);
  const proficiencies = resolveProficiencies(context);
  const spellcasting = resolveSpellcasting(context, abilityScores);
  const feats = resolveFeatGrants(context);
  const race = resolveRaceGrants(context);
  const background = resolveBackgroundGrants(context);
  const classGrants = resolveClassGrants(context);
  const subclass = resolveSubclassGrants(context);
  const resolved = { abilityScores, asi, proficiencies, spellcasting, feats, race, background, classGrants, subclass };
  const audit = auditCharacterRules(context, resolved);
  return { ok: audit.errors.length === 0, version: RULE_ENGINE_VERSION, resolved: { ...resolved, warnings: audit.warnings, errors: audit.errors }, legacyPatch: buildLegacyPatch(resolved) };
}

function applyRuleEngineAbilityPatch(personagem, resultado) {
  if (!personagem || !resultado || !resultado.legacyPatch) return personagem;
  const patch = resultado.legacyPatch;
  if (patch.atributos) personagem.atributos = { ...(personagem.atributos || {}), ...patch.atributos };
  return personagem;
}

function applyRuleEngineCantripPatch(personagem, resultado) {
  const patch = resultado && resultado.legacyPatch && resultado.legacyPatch.magia;
  if (!personagem || !patch) return personagem;
  personagem.magia = personagem.magia || {};
  personagem.magia.cantripsConhecidos = patch.cantripsConhecidos || 0;
  personagem.magia.listaTruques = ruleUnique(patch.listaTruques || []);
  return personagem;
}

function resolveAndApplyRuleEngineCantrips(personagem) {
  if (typeof resolveCharacterRules !== "function") return personagem;
  const resultado = resolveCharacterRules(personagem);
  return applyRuleEngineCantripPatch(personagem, resultado);
}

function ruleSameNumberArray(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((value, index) => Number(value || 0) === Number(b[index] || 0));
}

function applyRuleEngineSlotPatch(personagem, resultado) {
  const patch = resultado && resultado.legacyPatch && resultado.legacyPatch.magia;
  if (!personagem || !patch) return personagem;
  personagem.magia = personagem.magia || {};

  const previousMax = Array.isArray(personagem.magia.espacos) ? personagem.magia.espacos.slice() : [];
  const previousCurrent = Array.isArray(personagem.magia.espacosAtuais) ? personagem.magia.espacosAtuais.slice() : [];
  const nextMax = Array.isArray(patch.espacos) ? patch.espacos.slice() : [];

  personagem.magia.espacos = nextMax;
  personagem.magia.nivelEspacosBruxo = patch.nivelEspacosBruxo || null;

  if (ruleSameNumberArray(previousMax, nextMax) && previousCurrent.length === nextMax.length) {
    personagem.magia.espacosAtuais = previousCurrent.map((value, index) => Math.min(Number(value || 0), Number(nextMax[index] || 0)));
  } else {
    personagem.magia.espacosAtuais = nextMax.slice();
  }

  return personagem;
}

function resolveAndApplyRuleEngineSlots(personagem) {
  if (!personagem || typeof resolveCharacterRules !== "function") return personagem;
  const resultado = resolveCharacterRules(personagem);
  return applyRuleEngineSlotPatch(personagem, resultado);
}

function applyRuleEngineProficiencyPatch(personagem, resultado) {
  if (!personagem || !resultado || !resultado.legacyPatch) return personagem;
  const patch = resultado.legacyPatch;

  if (patch.proficienciasClasseEfetivas) personagem.proficienciasClasseEfetivas = ruleUnique(patch.proficienciasClasseEfetivas);
  if (patch.savesClasseEfetivos) personagem.savesClasseEfetivos = ruleUnique(patch.savesClasseEfetivos);
  if (patch.periciasFinaisEfetivas) personagem.periciasFinaisEfetivas = ruleUnique(patch.periciasFinaisEfetivas);
  if (patch.ferramentasEfetivas) personagem.ferramentasEfetivas = ruleUnique(patch.ferramentasEfetivas);

  return personagem;
}

function resolveAndApplyRuleEngineProficiencies(personagem) {
  if (!personagem || typeof resolveCharacterRules !== "function") return personagem;
  const resultado = resolveCharacterRules(personagem);
  return applyRuleEngineProficiencyPatch(personagem, resultado);
}

function applyRuleEngineSpellLimitPatch(personagem, resultado) {
  const patch = resultado && resultado.legacyPatch && resultado.legacyPatch.magia;
  if (!personagem || !patch) return personagem;
  personagem.magia = personagem.magia || {};

  personagem.magia.magiasConhecidas = Number(patch.magiasConhecidas || 0);
  personagem.magia.magiasPreparadas = Number(patch.magiasPreparadas || 0);

  if (patch.tipo) personagem.magia.tipo = patch.tipo;
  if (patch.habilidade) personagem.magia.habilidade = patch.habilidade;
  if (Number.isFinite(Number(patch.cdMagia))) personagem.magia.cdMagia = Number(patch.cdMagia);
  if (Number.isFinite(Number(patch.ataqueMagia))) personagem.magia.ataqueMagia = Number(patch.ataqueMagia);

  return personagem;
}

function resolveAndApplyRuleEngineSpellLimits(personagem) {
  if (!personagem || typeof resolveCharacterRules !== "function") return personagem;
  const resultado = resolveCharacterRules(personagem);
  return applyRuleEngineSpellLimitPatch(personagem, resultado);
}

function applyRuleEngineWizardSpellbookPatch(personagem, resultado) {
  const spellcasting = resultado && resultado.resolved && resultado.resolved.spellcasting;
  if (!personagem || !spellcasting || spellcasting.model !== "spellbookPrepared") return personagem;
  personagem.magia = personagem.magia || {};
  personagem.magia.grimorio = ruleNormalizeSpellList(spellcasting.wizard.spellbook || personagem.magia.grimorio || []);
  return personagem;
}

function resolveAndApplyRuleEngineWizardSpellbook(personagem) {
  if (!personagem || typeof resolveCharacterRules !== "function") return personagem;
  const resultado = resolveCharacterRules(personagem);
  return applyRuleEngineWizardSpellbookPatch(personagem, resultado);
}

function applyRuleEngineSubclassSpellPatch(personagem, resultado) {
  const spellcasting = resultado && resultado.resolved && resultado.resolved.spellcasting;
  if (!personagem || !spellcasting) return personagem;
  personagem.magia = personagem.magia || {};
  personagem.magia.magiasSubclasseSemprePreparadas = ruleUnique(spellcasting.spells.alwaysPrepared || []);
  personagem.magia.magiasSubclasseListaExpandida = ruleUnique(spellcasting.spells.expandedList || []);
  personagem.magia.magiasSubclasseConhecidasBonus = ruleUnique(spellcasting.spells.bonusKnown || []);
  personagem.magia.truquesSubclasseBonus = ruleUnique(spellcasting.cantrips.fromSubclass || []);
  return personagem;
}

function resolveAndApplyRuleEngineSubclassSpells(personagem) {
  if (!personagem || typeof resolveCharacterRules !== "function") return personagem;
  const resultado = resolveCharacterRules(personagem);
  return applyRuleEngineSubclassSpellPatch(personagem, resultado);
}

function applyRuleEngineLegacyPatch(personagem, resultado) {
  if (!personagem || !resultado || !resultado.legacyPatch) return personagem;
  const patch = resultado.legacyPatch;
  if (patch.atributos) personagem.atributos = patch.atributos;
  if (patch.proficienciasClasseEfetivas) personagem.proficienciasClasseEfetivas = patch.proficienciasClasseEfetivas;
  if (patch.savesClasseEfetivos) personagem.savesClasseEfetivos = patch.savesClasseEfetivos;
  if (patch.periciasFinaisEfetivas) personagem.periciasFinaisEfetivas = patch.periciasFinaisEfetivas;
  if (patch.ferramentasEfetivas) personagem.ferramentasEfetivas = patch.ferramentasEfetivas;
  if (patch.magia) personagem.magia = { ...(personagem.magia || {}), ...patch.magia };
  return personagem;
}


// ===============================
// ETAPA 13 - VALIDAÇÃO DE MAGIAS POR CLASSE E CÍRCULO
// ===============================
// Esta camada impede que magias fora da lista/círculo/classe passem por estado antigo,
// backup/importação manual ou manipulação direta do state. Não altera exportação.
function ruleCloneSpellListsStage13(source) {
  const out = { truques: [] };
  Object.entries(source || {}).forEach(([circle, spells]) => {
    out[circle] = ruleUnique(spells || []);
  });
  return out;
}

function ruleAddSpellToListStage13(lists, circle, spellName) {
  const key = String(circle);
  if (!spellName || key === "NaN") return;
  lists[key] = ruleUnique([...(lists[key] || []), ruleSpellBaseName(spellName)]);
}

function ruleSubclassUnlockToSpellCircleStage13(classKey, unlockLevel) {
  const n = Number(unlockLevel);
  if (["paladino", "patrulheiro"].includes(classKey)) {
    return ({3:1, 5:2, 9:3, 13:4, 17:5})[n] || null;
  }
  return ({1:1, 3:2, 5:3, 7:4, 9:5})[n] || (n >= 1 && n <= 9 ? n : null);
}

function ruleGetSubclassSpellRuleStage13(personagem) {
  const classKey = (personagem || {}).classe;
  const subclassKey = (personagem || {}).subclasse;
  const composite = `${classKey}:${subclassKey}`;
  return RULE_SUBCLASS_SPELL_RULES[composite] || null;
}

function getRuleEngineSelectableSpellLists(personagem) {
  const classKey = (personagem || {}).classe;
  const level = Number((personagem || {}).nivel || 1);
  const base = typeof SPELL_LISTS !== "undefined" ? (SPELL_LISTS[classKey] || { truques: [] }) : { truques: [] };
  const lists = ruleCloneSpellListsStage13(base);
  const subclassRule = ruleGetSubclassSpellRuleStage13(personagem);

  // Somente lista expandida entra como opção de escolha. Magias sempre preparadas e conhecidas bônus são automáticas.
  if (subclassRule && subclassRule.type === RULE_SUBCLASS_SPELL_RULE_TYPES.EXPANDED_LIST) {
    Object.entries(subclassRule.unlockByClassLevel || {}).forEach(([unlockLevel, spells]) => {
      if (level < Number(unlockLevel)) return;
      const circle = ruleSubclassUnlockToSpellCircleStage13(classKey, unlockLevel);
      (spells || []).forEach(spell => ruleAddSpellToListStage13(lists, circle, spell));
    });
  }

  Object.keys(lists).forEach(key => { lists[key] = ruleUnique(lists[key] || []); });
  return lists;
}

function ruleGetMaxSpellCircleFromSlotsStage13(magia) {
  const slots = Array.isArray(magia?.espacos) ? magia.espacos : [];
  for (let i = slots.length - 1; i >= 0; i--) {
    if (Number(slots[i] || 0) > 0) return i + 1;
  }
  return 0;
}

function getRuleEngineMaxSelectableSpellCircle(personagem) {
  const context = buildRuleContext(personagem || {});
  const abilityScores = resolveAbilityScores(context);
  const profile = resolveSpellcastingProfile(context);
  if (!profile || context.level < (profile.startsAtLevel || 1)) return 0;
  const slots = resolveSpellSlots(context, profile);
  if (profile.casterType === "pact") return Number(slots.pactSlotLevel || 0);
  const maxByEngine = ruleGetMaxSpellCircleFromSlotsStage13({ espacos: slots.slots });
  const maxByState = ruleGetMaxSpellCircleFromSlotsStage13((personagem || {}).magia || {});
  return Math.max(maxByEngine, maxByState);
}

function ruleFindSpellCircleInListsStage13(lists, spellName) {
  const target = ruleNormalizeSpellName(spellName);
  const found = [];
  Object.entries(lists || {}).forEach(([circle, spells]) => {
    if (circle === "truques") return;
    if ((spells || []).some(s => ruleNormalizeSpellName(s) === target)) found.push(Number(circle));
  });
  return found.filter(n => Number.isFinite(n)).sort((a,b)=>a-b);
}

function ruleHasCantripInListStage13(lists, cantripName) {
  const target = ruleNormalizeSpellName(cantripName);
  return (lists.truques || []).some(nome => ruleNormalizeSpellName(nome) === target);
}

function ruleAutomaticSubclassSpellNamesStage13(personagem) {
  const benefits = getRuleEngineSubclassSpellBenefitsForCharacter(personagem);
  return {
    spells: new Set([...(benefits.alwaysPrepared || []), ...(benefits.bonusKnown || [])].map(ruleNormalizeSpellName)),
    cantrips: new Set([...(benefits.bonusCantrips || [])].map(ruleNormalizeSpellName))
  };
}

function validateRuleEngineCantripChoice(personagem, cantripName) {
  const lists = getRuleEngineSelectableSpellLists(personagem);
  const automatic = ruleAutomaticSubclassSpellNamesStage13(personagem).cantrips;
  const normalized = ruleNormalizeSpellName(cantripName);
  if (!normalized) return { ok: false, error: "Selecione um truque." };
  if (automatic.has(normalized)) return { ok: true };
  if (!ruleHasCantripInListStage13(lists, cantripName)) {
    const classLabel = (typeof nomeCatalogo === "function") ? nomeCatalogo(typeof CLASSES !== "undefined" ? CLASSES : {}, (personagem || {}).classe) : ((personagem || {}).classe || "classe");
    return { ok: false, error: `Truque fora da lista permitida para ${classLabel}.` };
  }
  return { ok: true };
}

function validateRuleEngineSpellChoice(personagem, spellName, circle) {
  const lists = getRuleEngineSelectableSpellLists(personagem);
  const automatic = ruleAutomaticSubclassSpellNamesStage13(personagem).spells;
  const normalized = ruleNormalizeSpellName(spellName);
  if (!normalized) return { ok: false, error: "Selecione uma magia." };
  if (automatic.has(normalized)) return { ok: true };

  const selectedCircle = Number(circle);
  if (!Number.isFinite(selectedCircle) || selectedCircle < 1) {
    return { ok: false, error: `A magia "${ruleSpellBaseName(spellName)}" está sem círculo válido.` };
  }

  const maxCircle = getRuleEngineMaxSelectableSpellCircle(personagem);
  if (selectedCircle > maxCircle) {
    return { ok: false, error: `A magia "${ruleSpellBaseName(spellName)}" é de ${selectedCircle}º círculo, mas o personagem só possui acesso até ${maxCircle || 0}º círculo.` };
  }

  const allowedCircles = ruleFindSpellCircleInListsStage13(lists, spellName);
  if (!allowedCircles.length) {
    return { ok: false, error: `A magia "${ruleSpellBaseName(spellName)}" não pertence à lista permitida da classe/subclasse.` };
  }
  if (!allowedCircles.includes(selectedCircle)) {
    return { ok: false, error: `A magia "${ruleSpellBaseName(spellName)}" está registrada no ${selectedCircle}º círculo, mas é permitida no(s) círculo(s): ${allowedCircles.map(c=>`${c}º`).join(", ")}.` };
  }
  return { ok: true };
}

function getRuleEngineSpellSelectionValidation(personagem) {
  const errors = [];
  const warnings = [];
  const magia = (personagem || {}).magia || {};
  if (!magia.ehConjurador) return { errors, warnings };

  const seenCantrips = new Set();
  (magia.listaTruques || []).forEach(nome => {
    const normalized = ruleNormalizeSpellName(nome);
    if (seenCantrips.has(normalized)) errors.push(`Truque duplicado: ${ruleSpellBaseName(nome)}.`);
    seenCantrips.add(normalized);
    const check = validateRuleEngineCantripChoice(personagem, nome);
    if (!check.ok) errors.push(check.error);
  });

  const seenSpells = new Set();
  (magia.listaMagias || []).forEach(entry => {
    const baseName = ruleSpellBaseName(entry);
    const circle = ruleSpellCircleFromEntry(entry);
    const key = `${ruleNormalizeSpellName(baseName)}:${circle || "sem-circulo"}`;
    if (seenSpells.has(key)) errors.push(`Magia duplicada: ${baseName}${circle ? ` (${circle}º)` : ""}.`);
    seenSpells.add(key);

    const automatic = ruleAutomaticSubclassSpellNamesStage13(personagem).spells;
    if (automatic.has(ruleNormalizeSpellName(baseName)) && !circle) return;
    const check = validateRuleEngineSpellChoice(personagem, baseName, circle);
    if (!check.ok) errors.push(check.error);
  });

  return { errors: ruleUnique(errors), warnings: ruleUnique(warnings) };
}

function filtrarRuleEngineOpcoesMagiaPorCirculo(personagem, lista, circulo) {
  return (lista || []).filter(nome => validateRuleEngineSpellChoice(personagem, nome, circulo).ok);
}
