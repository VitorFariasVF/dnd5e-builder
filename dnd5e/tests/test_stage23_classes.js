/* Auditoria nível a nível das 12 classes do PHB (D&D 5e 2014).
   Esperados conferidos na SRD 5.1 (tabelas de classe, espelhos 5e.d20srd.org e dnd-wiki.org).
   Ver docs/AUDITORIA_DND5E_CLASSES.md para o que foi conferido, o que ficou de fora e as lacunas.
   Sai com código != 0 se algo falhar. Rodar: cd dnd5e && node tests/test_stage23_classes.js */
const fs = require('fs');
const vm = require('vm');
const base = require('path').join(__dirname, '..');

let code = '';
for (const f of ['state.js', 'rules.js', 'rules-engine.js', 'validator.js']) {
  code += '\n// FILE ' + f + '\n' + fs.readFileSync(base + '/' + f, 'utf8') + '\n';
}
const ctx = { console, process, require };
vm.createContext(ctx);
vm.runInContext(code, ctx);

const get = expr => vm.runInContext(expr, ctx);
const CLASSES = JSON.parse(JSON.stringify(get('CLASSES')));
const CLASS_FEATURES = JSON.parse(JSON.stringify(get('CLASS_FEATURES')));
const RULE_ASI_LEVELS = JSON.parse(JSON.stringify(get('RULE_ASI_LEVELS')));
const RULE_CLASS_SPELLCASTING = JSON.parse(JSON.stringify(get('RULE_CLASS_SPELLCASTING')));
const RULE_SPELL_SLOTS = JSON.parse(JSON.stringify(get('RULE_SPELL_SLOTS')));
const SPELL_SLOTS = JSON.parse(JSON.stringify(get('SPELL_SLOTS')));
const SPELLCASTERS = JSON.parse(JSON.stringify(get('SPELLCASTERS')));
const SUBCLASS_UNLOCK_LEVEL = JSON.parse(JSON.stringify(get('SUBCLASS_UNLOCK_LEVEL')));
const SAVE_TO_KEY = JSON.parse(JSON.stringify(get('SAVE_TO_KEY')));
const fGetClassResources = get('getClassResources');
const fGetAttacks = get('getAttacksPerAction');
const fRageBonus = get('getRageDamageBonus');
const fBardicDie = get('getBardicInspirationDie');

const results = [];
function check(name, fn) {
  try {
    const ok = !!fn();
    results.push({ name, ok });
    if (!ok) console.log('FAIL', name);
  } catch (e) {
    results.push({ name, ok: false, error: String(e) });
    console.log('ERROR', name, e.message);
  }
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* Personagem mínimo: CAR 16 (+3), SAB 14 (+2), INT 12 (+1). */
function pers(nivel) {
  return { nivel, subclasse: '', atributos: { forca: 14, destreza: 12, constituicao: 14, inteligencia: 12, sabedoria: 14, carisma: 16 } };
}
function recursos(classe, nivel) { return fGetClassResources(classe, nivel, pers(nivel)); }
function maxRecurso(classe, nivel, id) { const r = recursos(classe, nivel).find(x => x.id === id); return r ? r.max : 0; }
function infoRecurso(classe, nivel, id) { return recursos(classe, nivel).find(x => x.id === id) || null; }
function temFeature(classe, nivel, nome) { return (CLASS_FEATURES[classe] || []).some(f => f.level === nivel && f.nome === nome); }

/* 1. Dado de vida e salvaguardas (SRD 5.1, todas as 12 classes) */
const SRD_VIDA = {
  barbaro: [12, ['forca', 'constituicao']], bardo: [8, ['destreza', 'carisma']],
  bruxo: [8, ['sabedoria', 'carisma']], clerigo: [8, ['sabedoria', 'carisma']],
  druida: [8, ['inteligencia', 'sabedoria']], feiticeiro: [6, ['constituicao', 'carisma']],
  guerreiro: [10, ['forca', 'constituicao']], ladino: [8, ['destreza', 'inteligencia']],
  mago: [6, ['inteligencia', 'sabedoria']], monge: [8, ['forca', 'destreza']],
  paladino: [10, ['sabedoria', 'carisma']], patrulheiro: [10, ['forca', 'destreza']]
};
for (const c of Object.keys(SRD_VIDA)) {
  check('Dado de vida ' + c, () => CLASSES[c].dadoVida === SRD_VIDA[c][0]);
  check('Salvaguardas ' + c, () => same(CLASSES[c].saves.map(s => SAVE_TO_KEY[s]), SRD_VIDA[c][1]));
}

/* 2. Aumento de Valor de Habilidade (SRD 5.1) e alinhamento entre lista e motor */
const SRD_ASI = {
  padrao: [4, 8, 12, 16, 19],
  guerreiro: [4, 6, 8, 12, 14, 16, 19],
  ladino: [4, 8, 10, 12, 16, 19]
};
for (const c of Object.keys(SRD_VIDA)) {
  const esperado = SRD_ASI[c] || SRD_ASI.padrao;
  check('ASI do motor ' + c, () => same(RULE_ASI_LEVELS[c] || RULE_ASI_LEVELS.default, esperado));
  check('ASI na lista de características ' + c, () =>
    same(CLASS_FEATURES[c].filter(f => f.nome === 'Aumento de Valor de Habilidade').map(f => f.level), esperado));
}

/* 3. Características por nível (SRD 5.1). Cada par é [nível, nome na lista]. */
const SRD_FEATURES = {
  barbaro: [[1, 'Fúria'], [1, 'Defesa sem Armadura'], [2, 'Ataque Descuidado'], [2, 'Sentido de Perigo'], [3, 'Caminho Primitivo'],
    [5, 'Ataque Extra'], [5, 'Movimento Rápido'], [7, 'Instinto Feral'], [9, 'Crítico Brutal'], [11, 'Fúria Implacável'],
    [13, 'Crítico Brutal (2 dados)'], [15, 'Fúria Persistente'], [17, 'Crítico Brutal (3 dados)'], [18, 'Força Indomável'], [20, 'Campeão Primitivo']],
  bardo: [[1, 'Inspiração de Bardo'], [1, 'Conjuração'], [2, 'Pau pra Toda Obra'], [2, 'Canção de Descanso'], [3, 'Colégio de Bardo'],
    [3, 'Especialização'], [5, 'Dado de Inspiração d8'], [5, 'Fonte de Inspiração'], [6, 'Contracanto'], [9, 'Canção de Descanso (d8)'],
    [10, 'Dado de Inspiração d10'], [10, 'Especialização Adicional'], [10, 'Segredos Mágicos'], [13, 'Canção de Descanso (d10)'],
    [14, 'Segredos Mágicos'], [15, 'Dado de Inspiração d12'], [17, 'Canção de Descanso (d12)'], [18, 'Segredos Mágicos'], [20, 'Inspiração Superior']],
  bruxo: [[1, 'Patrono Sobrenatural'], [1, 'Magia de Pacto'], [2, 'Invocações Místicas'], [3, 'Dádiva do Pacto'], [5, 'Mais Invocações'],
    [5, 'Magias de pacto de 3º círculo'], [11, 'Arcanum Místico (6º)'], [13, 'Arcanum Místico (7º)'], [15, 'Arcanum Místico (8º)'],
    [17, 'Arcanum Místico (9º)'], [20, 'Mestre Eldritch']],
  clerigo: [[1, 'Conjuração'], [1, 'Domínio Divino'], [2, 'Canalizar Divindade'], [2, 'Expulsar Mortos-Vivos'], [5, 'Destruir Mortos-Vivos'],
    [6, 'Canalizar Divindade adicional'], [8, 'Poder divino ampliado'], [10, 'Intervenção Divina'], [17, 'Traço supremo de domínio'],
    [18, 'Canalizar Divindade adicional (3º uso)'], [20, 'Intervenção Divina automática']],
  druida: [[1, 'Druidismo'], [1, 'Conjuração'], [2, 'Forma Selvagem'], [2, 'Círculo Druídico'], [4, 'Forma Selvagem Aprimorada'],
    [8, 'Forma Selvagem Aprimorada'], [10, 'Traço do círculo'], [18, 'Conjuração Bestial'], [18, 'Corpo Atemporal'], [20, 'Arquidruida']],
  feiticeiro: [[1, 'Conjuração'], [1, 'Origem Feiticeira'], [2, 'Fonte de Magia'], [3, 'Metamagia'], [10, 'Metamagia adicional'],
    [17, 'Metamagia adicional'], [18, 'Traço máximo da origem'], [20, 'Restauração Feiticeira']],
  guerreiro: [[1, 'Estilo de Luta'], [1, 'Segundo Fôlego'], [2, 'Surto de Ação'], [3, 'Arquétipo Marcial'], [5, 'Ataque Extra'],
    [9, 'Indomável'], [11, 'Ataque Extra (2)'], [13, 'Indomável (2 usos)'], [17, 'Indomável (3 usos)'], [17, 'Surto de Ação (2 usos)'],
    [20, 'Ataque Extra (3)']],
  ladino: [[1, 'Especialização'], [1, 'Ataque Furtivo'], [1, 'Gíria dos Ladrões'], [2, 'Ação Ardilosa'], [3, 'Arquétipo Ladino'],
    [5, 'Esquiva Sobrenatural'], [6, 'Especialização Adicional'], [7, 'Evasão'], [11, 'Talento Confiável'], [14, 'Sentido Cego'],
    [15, 'Mente Escorregadia'], [18, 'Elusivo'], [20, 'Golpe de Sorte']],
  mago: [[1, 'Conjuração'], [1, 'Recuperação Arcana'], [2, 'Tradição Arcana'], [6, 'Traço da tradição'], [10, 'Traço avançado da tradição'],
    [14, 'Traço da tradição (nível 14)'], [18, 'Maestria em Magia'], [20, 'Magias Assinatura']],
  monge: [[1, 'Defesa sem Armadura'], [1, 'Artes Marciais'], [2, 'Ki'], [2, 'Movimento sem Armadura'], [3, 'Tradição Monástica'],
    [3, 'Desviar Projéteis'], [4, 'Queda Lenta'], [5, 'Ataque Extra'], [5, 'Golpe Atordoante'], [6, 'Golpes Ki-Empoderados'],
    [7, 'Evasão'], [7, 'Mente Tranquila'], [9, 'Movimento sem Armadura aprimorado'], [10, 'Pureza Corporal'],
    [13, 'Língua do Sol e da Lua'], [14, 'Alma de Diamante'], [15, 'Corpo Atemporal'], [18, 'Corpo Vazio'], [20, 'Eu Perfeito']],
  paladino: [[1, 'Sentido Divino'], [1, 'Cura pelas Mãos'], [2, 'Estilo de Luta'], [2, 'Conjuração'], [2, 'Golpe Divino'],
    [3, 'Juramento Sagrado'], [3, 'Saúde Divina'], [5, 'Ataque Extra'], [6, 'Aura de Proteção'], [10, 'Aura de Coragem'],
    [11, 'Golpe Divino Aprimorado'], [14, 'Toque Purificador'], [18, 'Auras aprimoradas'], [20, 'Traço supremo do juramento']],
  patrulheiro: [[1, 'Inimigo Favorito'], [1, 'Explorador Nato'], [2, 'Estilo de Luta'], [2, 'Conjuração'], [3, 'Arquétipo de Patrulheiro'],
    [3, 'Sentido Primevo'], [5, 'Ataque Extra'], [6, 'Inimigo Favorito e Explorador Nato aprimorados'], [8, 'Passo pela Terra'],
    [10, 'Esconder-se à vista plena'], [10, 'Explorador Nato aprimorado'], [14, 'Desaparecer'], [14, 'Inimigo Favorito aprimorado'],
    [18, 'Sentidos Selvagens'], [20, 'Matador de Inimigos']]
};
for (const c of Object.keys(SRD_FEATURES)) {
  for (const [nivel, nome] of SRD_FEATURES[c]) {
    check('Característica ' + c + ' nível ' + nivel + ': ' + nome, () => temFeature(c, nivel, nome));
  }
}
for (const c of Object.keys(CLASSES)) {
  check('Lista de características ' + c + ' sem níveis fora de 1..20', () => (CLASS_FEATURES[c] || []).every(f => f.level >= 1 && f.level <= 20));
  check('Lista de características ' + c + ' sem repetição (nível + nome)', () => {
    const chaves = (CLASS_FEATURES[c] || []).map(f => f.level + '::' + f.nome);
    return new Set(chaves).size === chaves.length;
  });
}

/* 4. Recursos rastreáveis (ADVANCED_RESOURCE_RULES via getClassResources; SRD 5.1 nos usos e recargas) */
check('Fúria: 2 usos no nível 1', () => maxRecurso('barbaro', 1, 'furia') === 2);
check('Fúria: 3 usos no nível 3', () => maxRecurso('barbaro', 3, 'furia') === 3);
check('Fúria: 4 usos no nível 6', () => maxRecurso('barbaro', 6, 'furia') === 4);
check('Fúria: 5 usos no nível 12', () => maxRecurso('barbaro', 12, 'furia') === 5);
check('Fúria: 6 usos no nível 17', () => maxRecurso('barbaro', 17, 'furia') === 6);
check('Fúria recarrega em descanso longo', () => infoRecurso('barbaro', 1, 'furia').recarga === 'Descanso longo');
check('Inspiração de Bardo: usos = mod. Carisma (mín. 1)', () => maxRecurso('bardo', 1, 'inspiracao_bardo') === 3);
check('Inspiração de Bardo recarrega em descanso longo antes do nível 5', () => infoRecurso('bardo', 4, 'inspiracao_bardo').recarga === 'Descanso longo');
check('Inspiração de Bardo recarrega em descanso curto a partir do nível 5', () => infoRecurso('bardo', 5, 'inspiracao_bardo').recarga === 'Descanso curto');
check('Espaços de pacto do bruxo: 1 no nível 1, 2 no nível 2', () => maxRecurso('bruxo', 1, 'espacos_pacto') === 1 && maxRecurso('bruxo', 2, 'espacos_pacto') === 2);
check('Espaços de pacto do bruxo: 3 no nível 11, 4 no nível 17', () => maxRecurso('bruxo', 11, 'espacos_pacto') === 3 && maxRecurso('bruxo', 17, 'espacos_pacto') === 4);
check('Arcanum 6º: a partir do nível 11', () => maxRecurso('bruxo', 10, 'arcanum_6') === 0 && maxRecurso('bruxo', 11, 'arcanum_6') === 1);
check('Arcanum 7º: a partir do nível 13', () => maxRecurso('bruxo', 12, 'arcanum_7') === 0 && maxRecurso('bruxo', 13, 'arcanum_7') === 1);
check('Arcanum 8º: a partir do nível 15', () => maxRecurso('bruxo', 14, 'arcanum_8') === 0 && maxRecurso('bruxo', 15, 'arcanum_8') === 1);
check('Arcanum 9º: a partir do nível 17', () => maxRecurso('bruxo', 16, 'arcanum_9') === 0 && maxRecurso('bruxo', 17, 'arcanum_9') === 1);
check('Canalizar Divindade do clérigo: 1 no nível 2, 2 no 6, 3 no 18', () =>
  maxRecurso('clerigo', 2, 'canalizar_divindade') === 1 && maxRecurso('clerigo', 6, 'canalizar_divindade') === 2 && maxRecurso('clerigo', 18, 'canalizar_divindade') === 3);
check('Canalizar Divindade do clérigo recarrega em descanso curto', () => infoRecurso('clerigo', 2, 'canalizar_divindade').recarga === 'Descanso curto');
check('Forma Selvagem: 2 usos a partir do nível 2, ilimitada no 20', () => maxRecurso('druida', 1, 'forma_selvagem') === 0 && maxRecurso('druida', 2, 'forma_selvagem') === 2 && maxRecurso('druida', 20, 'forma_selvagem') >= 999);
check('Pontos de Feitiçaria: igual ao nível a partir do 2', () => maxRecurso('feiticeiro', 2, 'pontos_feiticaria') === 2 && maxRecurso('feiticeiro', 20, 'pontos_feiticaria') === 20);
check('Pontos de Feitiçaria recarregam em descanso longo', () => infoRecurso('feiticeiro', 2, 'pontos_feiticaria').recarga === 'Descanso longo');
check('Segundo Fôlego: 1 uso, descanso curto', () => maxRecurso('guerreiro', 1, 'segundo_folego') === 1 && infoRecurso('guerreiro', 1, 'segundo_folego').recarga === 'Descanso curto');
check('Surto de Ação: 1 uso no nível 2, 2 no nível 17', () => maxRecurso('guerreiro', 1, 'surto_acao') === 0 && maxRecurso('guerreiro', 2, 'surto_acao') === 1 && maxRecurso('guerreiro', 17, 'surto_acao') === 2);
check('Indomável: 1 uso no nível 9, 2 no 13, 3 no 17', () =>
  maxRecurso('guerreiro', 8, 'indomavel') === 0 && maxRecurso('guerreiro', 9, 'indomavel') === 1 && maxRecurso('guerreiro', 13, 'indomavel') === 2 && maxRecurso('guerreiro', 17, 'indomavel') === 3);
check('Recuperação Arcana: 1 uso no nível 1', () => maxRecurso('mago', 1, 'recuperacao_arcana') === 1);
check('Pontos de Ki: igual ao nível a partir do 2, recarregam em descanso curto', () =>
  maxRecurso('monge', 1, 'ki') === 0 && maxRecurso('monge', 2, 'ki') === 2 && maxRecurso('monge', 20, 'ki') === 20 && infoRecurso('monge', 2, 'ki').recarga === 'Descanso curto');
check('Sentido Divino: 1 + mod. Carisma (16 gives 4)', () => maxRecurso('paladino', 1, 'sentido_divino') === 4);
check('Cura pelas Mãos: 5 por nível (5 no nível 1, 100 no 20)', () => maxRecurso('paladino', 1, 'cura_pelas_maos') === 5 && maxRecurso('paladino', 20, 'cura_pelas_maos') === 100);
check('Canalizar Divindade do paladino: 1 uso a partir do nível 3', () => maxRecurso('paladino', 2, 'canalizar_divindade') === 0 && maxRecurso('paladino', 3, 'canalizar_divindade') === 1);
check('Sentido Primevo do patrulheiro a partir do nível 3', () => maxRecurso('patrulheiro', 2, 'sentido_primevo') === 0 && maxRecurso('patrulheiro', 3, 'sentido_primevo') === 1);

/* 5. Dados de características com degraus (motor) */
check('Dano de Fúria: +2 até o 8, +3 do 9, +4 do 16', () => fRageBonus(1) === 2 && fRageBonus(8) === 2 && fRageBonus(9) === 3 && fRageBonus(15) === 3 && fRageBonus(16) === 4);
check('Dado de Inspiração de Bardo: d6, d8 no 5, d10 no 10, d12 no 15', () =>
  fBardicDie(1) === 'd6' && fBardicDie(5) === 'd8' && fBardicDie(10) === 'd10' && fBardicDie(15) === 'd12');

/* 6. Ataques extras (SRD 5.1) */
check('Ataques por ação: bárbaro 2 no nível 5', () => fGetAttacks('barbaro', 4) === 1 && fGetAttacks('barbaro', 5) === 2);
check('Ataques por ação: guerreiro 2, 3 e 4 nos níveis 5, 11 e 20', () =>
  fGetAttacks('guerreiro', 4) === 1 && fGetAttacks('guerreiro', 5) === 2 && fGetAttacks('guerreiro', 11) === 3 && fGetAttacks('guerreiro', 20) === 4);
check('Ataques por ação: monge, paladino e patrulheiro 2 no nível 5', () =>
  fGetAttacks('monge', 5) === 2 && fGetAttacks('paladino', 5) === 2 && fGetAttacks('patrulheiro', 5) === 2);
check('Ataques por ação: ladino e mago continuam com 1', () => fGetAttacks('ladino', 20) === 1 && fGetAttacks('mago', 20) === 1);

/* 7. Espaços de magia (SRD 5.1) */
const SRD_FULL = {
  1: [2], 3: [4, 2], 5: [4, 3, 2], 9: [4, 3, 3, 3, 1], 11: [4, 3, 3, 3, 2, 1], 17: [4, 3, 3, 3, 2, 1, 1, 1, 1], 20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};
const SRD_HALF = {
  2: [2], 3: [3], 4: [3], 5: [4, 2], 9: [4, 3, 2], 13: [4, 3, 3, 1], 17: [4, 3, 3, 3, 1], 20: [4, 3, 3, 3, 2]
};
const linhaSlots = (tabela, n) => (tabela[n] || []).filter(v => v > 0);
for (const n of Object.keys(SRD_FULL)) {
  check('Espaços de conjurador completo no nível ' + n, () => same(linhaSlots(SPELL_SLOTS.full, Number(n)), SRD_FULL[n]));
}
for (const n of Object.keys(SRD_HALF)) {
  check('Espaços de meio-conjurador no nível ' + n, () => same(linhaSlots(SPELL_SLOTS.half, Number(n)), SRD_HALF[n]));
}
check('Tabela de meio-conjurador do motor e da tela batem em todos os níveis', () => {
  for (let n = 1; n <= 20; n++) if (!same(SPELL_SLOTS.half[n], RULE_SPELL_SLOTS.half[n])) return false;
  return true;
});
check('Pacto do bruxo: quantidade de espaços por nível (1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, ..., 4 no 17)', () => {
  const esperado = { 1: 1, 2: 2, 3: 2, 5: 2, 9: 2, 10: 2, 11: 3, 16: 3, 17: 4, 20: 4 };
  return Object.keys(esperado).every(n => SPELL_SLOTS.warlock[n][0] === esperado[n]);
});
check('Pacto do bruxo: círculo do espaço (1º no 1 e 2, 2º no 3 e 4, 3º no 5, 4º no 7, 5º no 9)', () => {
  const c = SPELL_SLOTS.warlockCircle;
  return c[1] === 1 && c[2] === 1 && c[3] === 2 && c[4] === 2 && c[5] === 3 && c[7] === 4 && c[9] === 5;
});

/* 8. Magias conhecidas e truques (SRD 5.1) */
const SRD_CONHECIDAS = {
  bardo: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
  bruxo: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15],
  feiticeiro: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
  patrulheiro: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
};
for (const c of Object.keys(SRD_CONHECIDAS)) {
  check('Magias conhecidas do motor ' + c, () => same(RULE_CLASS_SPELLCASTING[c].knownSpellProgression, SRD_CONHECIDAS[c]));
  check('Magias conhecidas da tela ' + c, () => same(SPELLCASTERS[c].magias, SRD_CONHECIDAS[c]));
}
const SRD_TRUQUES = {
  bardo: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  bruxo: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  clerigo: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  druida: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  feiticeiro: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
};
for (const c of Object.keys(SRD_TRUQUES)) {
  check('Truques do motor ' + c, () => same(RULE_CLASS_SPELLCASTING[c].cantripProgression, SRD_TRUQUES[c]));
}

/* 9. Nível de subclasse (SRD 5.1: 1 para bruxo, clérigo, feiticeiro; 2 para druida e mago; 3 nas demais) */
const SRD_SUBCLASSE = { barbaro: 3, bardo: 3, bruxo: 1, clerigo: 1, druida: 2, feiticeiro: 1, guerreiro: 3, ladino: 3, mago: 2, monge: 3, paladino: 3, patrulheiro: 3 };
for (const c of Object.keys(SRD_SUBCLASSE)) {
  check('Subclasse de ' + c + ' no nível ' + SRD_SUBCLASSE[c], () => SUBCLASS_UNLOCK_LEVEL[c] === SRD_SUBCLASSE[c]);
}

/* 10. Proficiência em salvaguarda ganha por nível (caminho completo: resolveCharacterRules) */
const fResolve = get('resolveCharacterRules');
const fCriarEstado = get('createInitialState');
function personagemDe(classe, nivel) {
  const p = JSON.parse(JSON.stringify(fCriarEstado().personagem));
  p.classe = classe;
  p.nivel = nivel;
  return p;
}
const salvaguardas = (classe, nivel) => {
  const r = fResolve(personagemDe(classe, nivel));
  return (r.resolved.proficiencies && r.resolved.proficiencies.savingThrows) || [];
};
check('Ladino no nível 14 ainda não tem salvaguarda de Sabedoria', () => !salvaguardas('ladino', 14).includes('Sabedoria'));
check('Ladino no nível 15 ganha salvaguarda de Sabedoria (Mente Escorregadia)', () => salvaguardas('ladino', 15).includes('Sabedoria'));
check('Ladino no nível 15 mantém Destreza e Inteligência', () => salvaguardas('ladino', 15).includes('Destreza') && salvaguardas('ladino', 15).includes('Inteligência'));
check('Bárbaro no nível 15 não ganha Sabedoria', () => !salvaguardas('barbaro', 15).includes('Sabedoria'));

/* Relatório */
console.log(JSON.stringify(results.filter(r => !r.ok), null, 2));
console.log('Total: ' + results.length + ' | ok: ' + results.filter(r => r.ok).length + ' | falhas: ' + results.filter(r => !r.ok).length);
if (results.some(r => !r.ok)) process.exit(1);
