/* Escolhas de subclasse do Guia de Xanathar que faltavam no app:
   Samurai (Bônus de Proficiência: perícia ou idioma, PDF p40) e Mentor (Mestre da Intriga:
   dois idiomas, PDF p43). Também confere a concessão de Silvestre do Teleporte das Fadas (PDF p74).
   Sai com código != 0 se algo falhar. Rodar: cd dnd5e && node tests/test_xanathar_escolhas.js */
const fs = require('fs');
const vm = require('vm');
const base = require('path').join(__dirname, '..');

/* Mesma ordem de carga do index.html (rules.js antes de rules-engine.js e validator.js). */
let code = '';
for (const f of ['rules.js', 'rules-subclasses.js', 'rules-racas.js', 'rules-2024-classes.js', 'state.js', 'validator.js', 'rules-engine.js']) {
  code += '\n// FILE ' + f + '\n' + fs.readFileSync(base + '/' + f, 'utf8') + '\n';
}
const ctx = { console, process, require };
vm.createContext(ctx);
vm.runInContext(code, ctx);

const run = expr => vm.runInContext(expr, ctx);
const clone = v => JSON.parse(JSON.stringify(v));
const personagem = over => clone(run(`(function(){ const p = createInitialState().personagem; Object.assign(p, ${JSON.stringify(over)}); return p; })()`));
const resolver = p => clone(run(`resolveCharacterRules(${JSON.stringify(p)})`));
const grupos = (classe, nivel, sub, opcoes) => clone(run(`getClassOptionGroups(${JSON.stringify(classe)}, ${nivel}, ${JSON.stringify(sub)}, ${JSON.stringify(opcoes || {})}).map(g => g.id)`));
const sanitizar = p => clone(run(`sanitizeClassOptionState(${JSON.stringify(p)})`));
/* Preenche as outras escolhas obrigatórias do nível (estilo de luta, especialização etc.) para o teste isolar o grupo analisado. */
const validar = (p, deixar = []) => {
  const completo = clone(run(`(function(p, deixar){ const gs = getClassOptionGroups(p.classe, p.nivel, p.subclasse, p.opcoesClasse);
    gs.forEach(g => { if (deixar.includes(g.id)) return; const v = (p.opcoesClasse || {})[g.id]; const vazio = Array.isArray(v) ? v.length < g.count : !v;
      if (vazio) p.opcoesClasse[g.id] = g.multiple ? g.options.slice(0, g.count).map(getNormalizedOptionValue) : getNormalizedOptionValue(g.options[0]); });
    return p; })(${JSON.stringify(p)}, ${JSON.stringify(deixar)})`));
  run(`state.personagem = ${JSON.stringify(completo)}; state.modo = 'A';`);
  return run('validarOpcoesClasse()');
};
const beneficiosLegados = p => clone(run(`getSubclassGrantedBenefits(${JSON.stringify(p)})`));

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

const IDIOMAS = clone(run('IDIOMAS_ESCOLHA'));
const samurai = (opcoes, nivel = 3) => personagem({ classe: 'guerreiro', subclasse: 'samurai', nivel, opcoesClasse: opcoes });
const mentor = (opcoes, nivel = 3) => personagem({ classe: 'ladino', subclasse: 'mastermind', nivel, opcoesClasse: opcoes });

/* 1. Listas e dados */
check('lista de idiomas tem 15 entradas e é a mesma usada pelos talentos', () =>
  IDIOMAS.length === 15 && JSON.stringify(clone(run('RULE_STAGE15_LANGUAGES'))) === JSON.stringify(IDIOMAS));
check('Samurai: Bônus de Proficiência oferece perícia e a opção de idioma', () => {
  const g = clone(run("SUBCLASS_OPTION_RULES['guerreiro:samurai'].find(x => x.id === 'samurai_bonus_skill')"));
  return g.options.length === 5 && g.options.some(o => o.value === 'idioma');
});
check('Mentor: Mestre da Intriga tem grupo de 2 idiomas a partir do nível 3', () => {
  const g = clone(run("SUBCLASS_OPTION_RULES['ladino:mastermind'].find(x => x.id === 'mastermind_languages')"));
  return g.count === 2 && g.multiple === true && g.minLevel === 3;
});

/* 2. Samurai: visibilidade do grupo de idioma */
check('Samurai nível 3 sem escolha de idioma não mostra o grupo de idioma', () =>
  !grupos('guerreiro', 3, 'samurai', { samurai_bonus_skill: 'História' }).includes('samurai_bonus_language'));
check('Samurai com "idioma" mostra o grupo de idioma', () =>
  grupos('guerreiro', 3, 'samurai', { samurai_bonus_skill: 'idioma' }).includes('samurai_bonus_language'));
check('Samurai nível 2 não tem o bônus de proficiência', () =>
  !grupos('guerreiro', 2, 'samurai', { samurai_bonus_skill: 'idioma' }).includes('samurai_bonus_language'));

/* 3. Samurai: engine */
check('Samurai com idioma concede o idioma escolhido, sem virar perícia', () => {
  const r = resolver(samurai({ samurai_bonus_skill: 'idioma', samurai_bonus_language: 'Élfico' }));
  return r.resolved.proficiencies.languages.includes('Élfico') && !r.resolved.proficiencies.skills.includes('idioma');
});
check('Samurai com perícia concede a perícia e nenhum idioma extra', () => {
  const r = resolver(samurai({ samurai_bonus_skill: 'História' }));
  return r.resolved.proficiencies.skills.includes('História') && !r.resolved.proficiencies.languages.includes('Élfico');
});
check('Samurai: idioma escolhido sem a opção "idioma" é descartado', () => {
  const s = sanitizar(samurai({ samurai_bonus_skill: 'História', samurai_bonus_language: 'Élfico' }));
  return !('samurai_bonus_language' in s) && s.samurai_bonus_skill === 'História';
});
check('Samurai: legado de benefícios não põe "idioma" em perícias', () => {
  const b = beneficiosLegados(samurai({ samurai_bonus_skill: 'idioma', samurai_bonus_language: 'Élfico' }));
  return !b.pericias.includes('idioma') && b.pericias.length === 0;
});
check('Samurai: validação exige o idioma quando a opção "idioma" é escolhida', () => {
  const erro = validar(samurai({ samurai_bonus_skill: 'idioma', samurai_bonus_language: '' }), ['samurai_bonus_language']);
  return typeof erro === 'string' && /Bônus de Proficiência: idioma/.test(erro);
});
check('Samurai: validação passa com perícia escolhida', () =>
  validar(samurai({ samurai_bonus_skill: 'Persuasão' })) === null);

/* 4. Mentor */
check('Mentor nível 3 sem idiomas não passa na validação', () =>
  typeof validar(mentor({ mastermind_languages: [] }), ['mastermind_languages']) === 'string');
check('Mentor nível 3 com dois idiomas passa na validação', () =>
  validar(mentor({ mastermind_languages: ['Élfico', 'Gigante'] })) === null);
check('Mentor: três idiomas são cortados para dois', () =>
  sanitizar(mentor({ mastermind_languages: ['Élfico', 'Gigante', 'Goblin'] })).mastermind_languages.length === 2);
check('Mentor: idioma fora da lista é descartado', () =>
  sanitizar(mentor({ mastermind_languages: ['Klingon', 'Gigante'] })).mastermind_languages.join() === 'Gigante');
check('Mentor concede os dois idiomas escolhidos', () => {
  const r = resolver(mentor({ mastermind_languages: ['Élfico', 'Gigante'] }));
  return r.resolved.proficiencies.languages.includes('Élfico') && r.resolved.proficiencies.languages.includes('Gigante');
});
check('Mentor concede kit de disfarce, kit de falsificação e jogo', () => {
  const r = resolver(mentor({ mastermind_languages: ['Élfico', 'Gigante'] }));
  const t = r.resolved.proficiencies.tools;
  return ['Kit de disfarce', 'Kit de falsificação', 'Jogo'].every(x => t.includes(x));
});
check('Mentor nível 2 não tem grupo de idiomas nem concessão', () => {
  const r = resolver(mentor({ mastermind_languages: ['Élfico', 'Gigante'] }, 2));
  return !grupos('ladino', 2, 'mastermind', {}).includes('mastermind_languages') && !r.resolved.proficiencies.languages.includes('Élfico');
});

/* 5. Teleporte das Fadas (talento racial, PDF p74): concessão de Silvestre */
check('Teleporte das Fadas declara o idioma Silvestre', () => {
  const f = clone(run("RULE_XANATHAR_RACIAL_FEATS.teleporte_das_fadas"));
  return JSON.stringify(f.grants.proficiencies.languages) === '["Silvestre"]';
});

/* 6. Texto da descrição */
check('describeSelectedClassOptions mostra o idioma escolhido do Samurai', () => {
  const linhas = clone(run(`describeSelectedClassOptions(${JSON.stringify(samurai({ samurai_bonus_skill: 'idioma', samurai_bonus_language: 'Élfico' }))})`));
  return linhas.some(l => /Um idioma à escolha/.test(l)) && linhas.some(l => /Élfico/.test(l));
});

const falhas = results.filter(r => !r.ok);
console.log(`test_xanathar_escolhas: ${results.length - falhas.length}/${results.length} OK`);
if (falhas.length) {
  falhas.forEach(f => console.log(' -', f.name, f.error || ''));
  process.exit(1);
}
