/* Verificação independente (2026-11-17): perícias e proficiências por classe, truques do Mago,
   fórmula de magias preparadas, Cavaleiro Místico e Trapaceiro Arcano, ladrão, raças, antecedentes
   e Restauração Feiticeira. Fontes e resultados em docs/VERIFICACAO_DND5E.md.
   Sai com código != 0 se algo falhar. Rodar: cd dnd5e && node tests/test_verificacao_dnd5e.js */
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
const clone = v => JSON.parse(JSON.stringify(v));
const CLASSES = clone(get('CLASSES'));
const SKILLS = clone(get('SKILLS'));
const RACES = clone(get('RACES'));
const BACKGROUNDS = clone(get('BACKGROUNDS'));
const SUBCLASS_OPTIONS = clone(get('SUBCLASS_OPTIONS'));
const RULE_CLASS_SPELLCASTING = clone(get('RULE_CLASS_SPELLCASTING'));
const RULE_SUBCLASS_SPELLCASTING = clone(get('RULE_SUBCLASS_SPELLCASTING'));
const RULE_SPELL_SLOTS = clone(get('RULE_SPELL_SLOTS'));
const SPELL_SLOTS = clone(get('SPELL_SLOTS'));
const fPreparedLimit = get('resolvePreparedSpellLimit');
const fSorceryRecovery = get('getSorceryPointsShortRestRecovery');
const fGetClassResources = get('getClassResources');

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
const sortedSame = (a, b) => same([...a].sort(), [...b].sort());

/* 1. Perícias de classe (quantidade e lista). Fontes: SRD 5.1 (5e.d20srd.org e dnd-wiki) e Roll20/Wikidot
      para Mago e Patrulheiro. */
const SRD_PERICIAS = {
  barbaro: [2, ['Adestrar Animais', 'Atletismo', 'Intimidação', 'Natureza', 'Percepção', 'Sobrevivência']],
  bardo: [3, Object.keys(SKILLS)],
  bruxo: [2, ['Arcanismo', 'Enganação', 'História', 'Intimidação', 'Investigação', 'Natureza', 'Religião']],
  clerigo: [2, ['História', 'Intuição', 'Medicina', 'Persuasão', 'Religião']],
  druida: [2, ['Arcanismo', 'Adestrar Animais', 'Intuição', 'Medicina', 'Natureza', 'Percepção', 'Religião', 'Sobrevivência']],
  feiticeiro: [2, ['Arcanismo', 'Enganação', 'Intuição', 'Intimidação', 'Persuasão', 'Religião']],
  guerreiro: [2, ['Acrobacia', 'Adestrar Animais', 'Atletismo', 'História', 'Intuição', 'Intimidação', 'Percepção', 'Sobrevivência']],
  ladino: [4, ['Acrobacia', 'Atletismo', 'Atuação', 'Enganação', 'Furtividade', 'Intimidação', 'Investigação', 'Intuição', 'Percepção', 'Persuasão', 'Prestidigitação']],
  mago: [2, ['Arcanismo', 'História', 'Intuição', 'Investigação', 'Medicina', 'Religião']],
  monge: [2, ['Acrobacia', 'Atletismo', 'História', 'Intuição', 'Religião', 'Furtividade']],
  paladino: [2, ['Atletismo', 'Intuição', 'Intimidação', 'Medicina', 'Persuasão', 'Religião']],
  patrulheiro: [3, ['Adestrar Animais', 'Atletismo', 'Intuição', 'Investigação', 'Natureza', 'Percepção', 'Furtividade', 'Sobrevivência']]
};
for (const c of Object.keys(SRD_PERICIAS)) {
  const [qtd, lista] = SRD_PERICIAS[c];
  check('Perícias de ' + c + ': escolhe ' + qtd, () => CLASSES[c].escolhaPericias.quantidade === qtd);
  check('Perícias de ' + c + ': lista exata', () => sortedSame(CLASSES[c].escolhaPericias.opcoes, lista));
}
check('Bardo: 18 perícias possíveis (qualquer perícia)', () => Object.keys(SKILLS).length === 18);

/* 2. Armaduras, armas e ferramentas (trechos literais que o app já usa) */
const profTem = (c, termos) => termos.every(t => CLASSES[c].proficiencias.includes(t));
check('Bardo: armadura leve, três instrumentos, rapieira e espada curta', () =>
  profTem('bardo', ['Armaduras leves', 'Três instrumentos musicais', 'Rapieiras', 'Espadas curtas']));
check('Ladino: ferramentas de ladrão e armadura leve', () => profTem('ladino', ['Armaduras leves', 'Ferramentas de ladrão']));
check('Monge: sem armadura; armas simples, espada curta e uma ferramenta de artesão ou instrumento', () =>
  profTem('monge', ['Armas simples', 'Espadas curtas', 'Uma ferramenta de artesão ou instrumento musical']) && !profTem('monge', ['Armaduras leves']));
check('Druida: kit de herbalismo e cimitarra', () => profTem('druida', ['Kit de herbalismo', 'Cimitarras']));
check('Mago: adaga, dardo, funda, bordão e besta leve (sem armadura)', () =>
  sortedSame(CLASSES.mago.proficiencias, ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Bestas leves']));
check('Feiticeiro: mesma lista de armas do mago, sem armadura', () =>
  sortedSame(CLASSES.feiticeiro.proficiencias, ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Bestas leves']));
check('Guerreiro: todas as armaduras, escudos e armas simples e marciais', () => profTem('guerreiro', ['Todas as armaduras', 'Escudos', 'Armas simples', 'Armas marciais']));
check('Paladino: todas as armaduras e escudos', () => profTem('paladino', ['Todas as armaduras', 'Escudos']));
check('Bruxo: armadura leve e armas simples, sem ferramenta', () => sortedSame(CLASSES.bruxo.proficiencias, ['Armaduras leves', 'Armas simples']));
check('Clérigo: leve, média, escudo e armas simples', () => profTem('clerigo', ['Armaduras leves', 'Armaduras médias', 'Escudos', 'Armas simples']));

/* 3. Fórmula de magias preparadas (SRD: Clérigo, Druida e Mago = nível + mod.; Paladino = metade do nível + mod.; mínimo 1) */
const prep = (classe, nivel, atributo, valor) => {
  const abil = {};
  abil[atributo] = valor;
  return fPreparedLimit({ level: nivel }, RULE_CLASS_SPELLCASTING[classe], { final: abil });
};
check('Clérigo nível 5, Sabedoria 16 (+3): 8 preparadas', () => prep('clerigo', 5, 'sabedoria', 16) === 8);
check('Clérigo nível 1, Sabedoria 8 (-1): mínimo de 1', () => prep('clerigo', 1, 'sabedoria', 8) === 1);
check('Druida nível 5, Sabedoria 16 (+3): 8 preparadas', () => prep('druida', 5, 'sabedoria', 16) === 8);
check('Mago nível 4, Inteligência 18 (+4): 8 preparadas', () => prep('mago', 4, 'inteligencia', 18) === 8);
check('Paladino nível 2, Carisma 16 (+3): metade do nível (1) + 3 = 4', () => prep('paladino', 2, 'carisma', 16) === 4);
check('Paladino nível 5, Carisma 14 (+2): metade do nível arredondada para baixo (2) + 2 = 4', () => prep('paladino', 5, 'carisma', 14) === 4);
check('Paladino nível 1: ainda sem conjuração (0)', () => prep('paladino', 1, 'carisma', 16) === 0);

/* 4. Truques do Mago por nível (SRD: 3 nos níveis 1 a 3, 4 nos níveis 4 a 9, 5 nos níveis 10 a 20) */
const TRUQUES_MAGO = [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
check('Truques do Mago por nível (motor)', () => same(RULE_CLASS_SPELLCASTING.mago.cantripProgression, TRUQUES_MAGO));

/* 5. Cavaleiro Místico (Guerreiro) e Trapaceiro Arcano (Ladino): tabelas de conjuração de 1/3 */
const CAV_TRUQUES = [0, 0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
const TRAP_TRUQUES = [0, 0, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
const CONHECIDAS_TERCO = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13];
check('Cavaleiro Místico: truques por nível (2 do 3 ao 9; 3 do 10)', () =>
  same(RULE_SUBCLASS_SPELLCASTING['guerreiro:eldritch_knight'].cantripProgression, CAV_TRUQUES));
check('Cavaleiro Místico: magias conhecidas por nível (3 no 3; 13 no 20)', () =>
  same(RULE_SUBCLASS_SPELLCASTING['guerreiro:eldritch_knight'].knownSpellProgression, CONHECIDAS_TERCO));
check('Trapaceiro Arcano: truques por nível (3 do 3 ao 9; 4 do 10)', () =>
  same(RULE_SUBCLASS_SPELLCASTING['ladino:arcane_trickster'].cantripProgression, TRAP_TRUQUES));
check('Trapaceiro Arcano: magias conhecidas por nível (3 no 3; 13 no 20)', () =>
  same(RULE_SUBCLASS_SPELLCASTING['ladino:arcane_trickster'].knownSpellProgression, CONHECIDAS_TERCO));
const linhaTerco = n => (RULE_SPELL_SLOTS.third[n] || []).filter(v => v > 0);
check('Espaços de 1/3 conjurador: nível 3 = [2]; nível 7 = [4,2]; nível 13 = [4,3,2]', () =>
  same(linhaTerco(3), [2]) && same(linhaTerco(7), [4, 2]) && same(linhaTerco(13), [4, 3, 2]));
check('Espaços de 1/3 conjurador: nível 19 = [4,3,3,1]; nível 20 igual', () =>
  same(linhaTerco(19), [4, 3, 3, 1]) && same(linhaTerco(20), [4, 3, 3, 1]));
check('Espaços de 1/3 conjurador: nível 2 ainda sem espaços', () => linhaTerco(2).length === 0);

/* 6. Amostra das tabelas de conjurador completo, meio e pacto (SRD) */
const linha = (t, n) => (t[n] || []).filter(v => v > 0);
check('Completo nível 15 = [4,3,3,3,2,1,1,1]', () => same(linha(SPELL_SLOTS.full, 15), [4, 3, 3, 3, 2, 1, 1, 1]));
check('Completo nível 13 = [4,3,3,3,2,1,1]', () => same(linha(SPELL_SLOTS.full, 13), [4, 3, 3, 3, 2, 1, 1]));
check('Meio nível 11 = [4,3,3]; nível 19 = [4,3,3,3,2]', () => same(linha(SPELL_SLOTS.half, 11), [4, 3, 3]) && same(linha(SPELL_SLOTS.half, 19), [4, 3, 3, 3, 2]));
check('Pacto nível 16 = três espaços de 5º círculo (círculo 5 do nível 9 ao 20)', () =>
  SPELL_SLOTS.warlock[16][0] === 3 && SPELL_SLOTS.warlockCircle[16] === 5 && SPELL_SLOTS.warlockCircle[9] === 5);

/* 7. Ladrão (Ladino): características por nível (SRD: Dicas de Ladrão, Furtividade Suprema, Uso de Dispositivos, Reflexos) */
const ladrao = (SUBCLASS_OPTIONS.ladino || []).find(s => s.key === 'ladrao');
const featLadrao = ladrao ? ladrao.features.map(f => f.level + ':' + f.nome) : [];
check('Ladrão: nível 3 Mãos Rápidas e Trabalho de Segundo Andar', () => featLadrao.includes('3:Mãos Rápidas') && featLadrao.includes('3:Trabalho de Segundo Andar'));
check('Ladrão: nível 9 Furtividade Suprema', () => featLadrao.includes('9:Furtividade Suprema'));
check('Ladrão: nível 13 Uso de Dispositivos Mágicos', () => featLadrao.includes('13:Uso de Dispositivos Mágicos'));
check('Ladrão: nível 17 Reflexos do Ladrão', () => featLadrao.includes('17:Reflexos do Ladrão'));
check('Ladrão: sem "Escalada Suprema" (não existe no Ladrão)', () => !featLadrao.some(f => f.includes('Escalada Suprema')));

/* 8. Restauração Feiticeira (nível 20): 4 pontos ao terminar descanso curto; recarga do recurso segue em descanso longo */
check('Restauração Feiticeira: nenhuma recuperação em descanso curto antes do nível 20', () => fSorceryRecovery(19) === 0);
check('Restauração Feiticeira: 4 pontos em descanso curto no nível 20', () => fSorceryRecovery(20) === 4);
check('Restauração Feiticeira: pontos de feitiçaria seguem recarregando em descanso longo no recurso', () => {
  const r = fGetClassResources('feiticeiro', 20, { atributos: { carisma: 16 } }).find(x => x.id === 'pontos_feiticaria');
  return !!r && r.recarga === 'Descanso longo' && r.max === 20;
});

/* 9. Raças (SRD 5.1): bônus fixos, deslocamento e idiomas. Meio-Elfo: os dois +1 de escolha ficam fora (pendência) */
const SRD_RACAS = {
  anao: [{ constituicao: 2 }, 25, ['Comum', 'Anão']],
  elfo: [{ destreza: 2 }, 30, ['Comum', 'Élfico']],
  halfling: [{ destreza: 2 }, 25, ['Comum', 'Halfling']],
  draconato: [{ forca: 2, carisma: 1 }, 30, ['Comum', 'Dracônico']],
  gnomo: [{ inteligencia: 2 }, 25, ['Comum', 'Gnômico']],
  meio_orc: [{ forca: 2, constituicao: 1 }, 30, ['Comum', 'Orc']],
  tiefling: [{ inteligencia: 1, carisma: 2 }, 30, ['Comum', 'Infernal']]
};
for (const r of Object.keys(SRD_RACAS)) {
  const [bonus, veloc, idiomas] = SRD_RACAS[r];
  check('Raça ' + r + ': bônus de atributo', () => same(RACES[r].bonusAtributos, bonus));
  check('Raça ' + r + ': deslocamento ' + veloc + ' pés', () => RACES[r].deslocamento === veloc);
  check('Raça ' + r + ': idiomas iniciais', () => idiomas.every(i => RACES[r].idiomas.includes(i)));
}
check('Humano: +1 em cada atributo, deslocamento 30', () =>
  Object.values(RACES.humano.bonusAtributos).every(v => v === 1) && Object.keys(RACES.humano.bonusAtributos).length === 6 && RACES.humano.deslocamento === 30);
check('Meio-Elfo: +2 em Carisma e deslocamento 30 (os +1 em dois atributos à escolha não estão modelados)', () =>
  same(RACES.meio_elfo.bonusAtributos, { carisma: 2 }) && RACES.meio_elfo.deslocamento === 30);

/* 10. Antecedentes (PHB 2014): perícias, ferramentas e idiomas. Fontes: arcaneeye.com e dungeonmister.com */
const ANT = {
  acolito: [['Intuição', 'Religião'], 2, []],
  artista: [['Acrobacia', 'Atuação'], 0, ['Kit de disfarce', 'Um instrumento musical']],
  charlatao: [['Enganação', 'Prestidigitação'], 0, ['Kit de disfarce', 'Kit de falsificação']],
  criminoso: [['Enganação', 'Furtividade'], 0, ['Ferramentas de ladrão', 'Jogo']],
  eremita: [['Medicina', 'Religião'], 1, ['Kit de herbalismo']],
  forasteiro: [['Atletismo', 'Sobrevivência'], 1, ['Um instrumento musical']],
  heroi_povo: [['Adestrar Animais', 'Sobrevivência'], 0, ['Ferramentas de artesão', 'Veículos terrestres']],
  artesao_guilda: [['Intuição', 'Persuasão'], 1, ['Ferramentas de artesão']],
  marinheiro: [['Atletismo', 'Percepção'], 0, ['Ferramentas de navegador', 'Veículos aquáticos']],
  nobre: [['História', 'Persuasão'], 1, ['Jogo']],
  orfao: [['Prestidigitação', 'Furtividade'], 0, ['Kit de disfarce', 'Ferramentas de ladrão']],
  sabio: [['Arcanismo', 'História'], 2, []],
  soldado: [['Atletismo', 'Intimidação'], 0, ['Jogo', 'Veículos terrestres']]
};
for (const a of Object.keys(ANT)) {
  const [pericias, idiomas, ferramentas] = ANT[a];
  check('Antecedente ' + a + ': perícias', () => sortedSame(BACKGROUNDS[a].pericias, pericias));
  check('Antecedente ' + a + ': idiomas extras (' + idiomas + ')', () => BACKGROUNDS[a].idiomas === idiomas);
  check('Antecedente ' + a + ': ferramentas', () => sortedSame(BACKGROUNDS[a].ferramentas, ferramentas));
}

/* Relatório */
console.log(JSON.stringify(results.filter(r => !r.ok), null, 2));
console.log('Total: ' + results.length + ' | ok: ' + results.filter(r => r.ok).length + ' | falhas: ' + results.filter(r => !r.ok).length);
if (results.some(r => !r.ok)) process.exit(1);
