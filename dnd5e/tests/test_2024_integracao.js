/* Integração do D&D 2024 (SRD 5.2) na interface, com troca 2014 <-> 2024 e magias de subclasse.
   Carga na mesma ordem do index.html. Os valores esperados foram calculados à mão (conta indicada em cada caso),
   a partir das tabelas de classe em rules-2024-classes.js e das regras de conjuração/PV do motor.
   Também confere que a ida e a volta 2014 -> 2024 -> 2014 deixa os dados de 2014 idênticos.
   Sai com código != 0 se algo falhar. Rodar: cd dnd5e && node tests/test_2024_integracao.js */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const base = path.join(__dirname, '..');

const el = () => ({ value: '', checked: false, innerHTML: '', style: {}, classList: { add() {}, remove() {}, contains() { return false; } }, addEventListener() {}, appendChild() {}, remove() {}, click() {}, insertAdjacentHTML() {}, querySelectorAll() { return []; }, querySelector() { return null; } });
const store = {};
const ctx = {
  console, process, require, Blob: class {}, URL: { createObjectURL() { return ''; }, revokeObjectURL() {} },
  localStorage: { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
  document: { getElementById: () => el(), createElement: () => el(), body: el(), querySelectorAll: () => [], querySelector: () => null, addEventListener() {} },
  alert() {}, confirm: () => true, setTimeout, clearTimeout
};
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);

/* Mesma ordem de carga do index.html (sem vf/tool.js e main.js, que dependem do DOM real). */
const ORDEM = ['rules.js', 'rules-subclasses.js', 'rules-racas.js', 'rules-2024-classes.js', 'state.js', 'validator.js',
  'rules-engine.js', 'storage.js', 'export.js', 'export-pdf.js', 'export-roll20.js', 'ui.js'];
let code = '';
for (const f of ORDEM) code += '\n// FILE ' + f + '\n' + fs.readFileSync(path.join(base, f), 'utf8') + '\n';
vm.runInContext(code, ctx);

const G = expr => vm.runInContext(expr, ctx);             // lê const/let/globais
const S = () => G('state');
const clone = o => JSON.parse(JSON.stringify(o));

function novoPersonagem(edicao, extra) {
  ctx.resetStateToInitial();
  S().regras = edicao; ctx.aplicarCatalogoRegras(edicao); S().modo = 'A';
  Object.assign(S().personagem, extra || {});
  ctx.recalcularAtributosFinais(); ctx.recalcularTudo();
  return S().personagem;
}
function setEdicao(ed) { S().regras = ed; ctx.aplicarCatalogoRegras(ed); }
const ATR = (car, sab, int, con, dex, str) => ({ forca: str || 10, destreza: dex || 10, constituicao: con || 10, inteligencia: int || 10, sabedoria: sab || 10, carisma: car || 10 });

const results = [];
function check(name, fn) {
  try { const ok = !!fn(); results.push({ name, ok }); if (!ok) console.log('FAIL', name); }
  catch (e) { results.push({ name, ok: false, error: String(e && e.stack || e) }); console.log('ERROR', name, e && e.message); }
}

/* ---------- 1. Troca de dados por edição ---------- */

// Foto do 2014 tal como está antes de qualquer troca (depois da carga, que é o estado de referência).
const FOTO_2014 = clone({
  CLASSES: G('CLASSES'), CLASS_FEATURES: G('CLASS_FEATURES'), SUBCLASS_OPTIONS: G('SUBCLASS_OPTIONS'),
  SPELLCASTERS: G('SPELLCASTERS'), RULE_CLASS_SPELLCASTING: G('RULE_CLASS_SPELLCASTING'), RULE_ASI_LEVELS: G('RULE_ASI_LEVELS'),
  SPELL_SLOTS_HALF: G('SPELL_SLOTS.half'), RULE_SPELL_SLOTS_HALF: G('RULE_SPELL_SLOTS.half')
});

check('2024 troca CLASSES: Clérigo d8 com salvaguardas Sabedoria e Carisma (SRD 5.2)', () => {
  setEdicao('2024');
  const c = G('CLASSES.clerigo');
  return c.dadoVida === 8 && c.saves.join() === 'Sabedoria,Carisma' && c.escolhaPericias.quantidade === 2 && c.equipamento.length === 0;
});
check('2024: cada classe tem uma só subclasse, desbloqueada no nível 3', () => {
  setEdicao('2024');
  const classes = Object.keys(G('CLASSES'));
  return classes.length === 12 && classes.every(c => G(`SUBCLASS_OPTIONS.${c}`).length === 1) && classes.every(c => ctx.getSubclassUnlockLevel(c) === 3);
});
check('2024: subclasse do Clérigo é Domínio da Vida; subclasses do 2014 (Xanathar) somem', () => {
  setEdicao('2024');
  return ctx.getSubclassOptions('clerigo').map(s => s.key).join() === 'dominio_vida' && ctx.getSubclassOptions('clerigo').every(s => s.source !== 'XGtE');
});
check('2024: características por nível vêm de CLASS_FEATURES_2024 (Ordem Divina no 1º, sem Domínio Divino)', () => {
  setEdicao('2024');
  const f1 = ctx.getClassFeaturesForLevel('clerigo', 1).map(f => f.nome);
  return f1.includes('Ordem Divina') && !G('CLASS_FEATURES.clerigo').some(f => f.nome === 'Domínio Divino');
});
check('2024: ASI por classe (Guerreiro 4,6,8,12,14,16,19; Ladino 4,8,10,12,16,19; Bárbaro 4,8,12,16,19)', () => {
  setEdicao('2024');
  const a = G('RULE_ASI_LEVELS');
  return a.guerreiro.join() === '4,6,8,12,14,16,19' && a.ladino.join() === '4,8,10,12,16,19' && a.barbaro.join() === '4,8,12,16,19';
});
check('2014 volta igual à foto de referência depois de 2014 -> 2024 -> 2014 (dados de 2014 não mudam)', () => {
  setEdicao('2024');
  setEdicao('2014');
  const agora = clone({
    CLASSES: G('CLASSES'), CLASS_FEATURES: G('CLASS_FEATURES'), SUBCLASS_OPTIONS: G('SUBCLASS_OPTIONS'),
    SPELLCASTERS: G('SPELLCASTERS'), RULE_CLASS_SPELLCASTING: G('RULE_CLASS_SPELLCASTING'), RULE_ASI_LEVELS: G('RULE_ASI_LEVELS'),
    SPELL_SLOTS_HALF: G('SPELL_SLOTS.half'), RULE_SPELL_SLOTS_HALF: G('RULE_SPELL_SLOTS.half')
  });
  return JSON.stringify(agora) === JSON.stringify(FOTO_2014);
});
check('Troca idempotente: aplicar 2024 duas vezes dá o mesmo resultado', () => {
  setEdicao('2024'); const a = JSON.stringify(G('CLASSES'));
  setEdicao('2024'); return JSON.stringify(G('CLASSES')) === a;
});
check('2014 continua com 12 classes e a subclasse de Xanathar disponível', () => {
  setEdicao('2014');
  return Object.keys(G('CLASSES')).length === 12 && ctx.getSubclassOptions('clerigo').some(s => s.source === 'XGtE') && ctx.getSubclassUnlockLevel('mago') === 2;
});

/* ---------- 2. Conjuração 2024 (contas à mão) ---------- */

check('2024 Mago nível 5, INT 16: magias preparadas = 9 (tabela 2024: 4,5,6,7,9 -> 5º = 9)', () => {
  novoPersonagem('2024', { classe: 'mago', nivel: 5, bonusProficiencia: 3, atributosBase: ATR(10, 10, 16) });
  ctx.recalcularMagia();
  return S().personagem.magia.magiasPreparadas === 9;  // 2014 daria 5 + 3 = 8
});
check('2014 Mago nível 5, INT 16: magias preparadas = 8 (fórmula 5 + 3)', () => {
  novoPersonagem('2014', { classe: 'mago', nivel: 5, bonusProficiencia: 3, atributosBase: ATR(10, 10, 16) });
  ctx.recalcularMagia();
  return S().personagem.magia.magiasPreparadas === 8;
});
check('2024 Clérigo nível 3, SAB 14 (+2): magias preparadas = 6 (tabela: 4,5,6); 2014 daria 3 + 2 = 5', () => {
  novoPersonagem('2024', { classe: 'clerigo', nivel: 3, bonusProficiencia: 2, atributosBase: ATR(10, 14, 10) });
  ctx.recalcularMagia();
  return S().personagem.magia.magiasPreparadas === 6 && S().personagem.magia.espacos.filter(Boolean).join() === '4,2';
});
check('2024 Paladino nível 1, CAR 16: sem espaço no 2014 e 2 espaços de 1º círculo no 2024', () => {
  novoPersonagem('2024', { classe: 'paladino', nivel: 1, bonusProficiencia: 2, atributosBase: ATR(16, 10, 10) });
  ctx.recalcularMagia();
  const m = S().personagem.magia;
  const resumo = ctx.getRuleEngineSpellSlotSummary(S().personagem);
  return m.espacos.filter(Boolean).join() === '2' && m.magiasPreparadas === 2 && m.cdMagia === 13 && resumo === '1º:2';  // CD = 8 + 2 + 3
});
check('2014 Paladino nível 1: sem espaços (conjuração começa no 2º nível)', () => {
  novoPersonagem('2014', { classe: 'paladino', nivel: 1, bonusProficiencia: 2, atributosBase: ATR(16, 10, 10) });
  return ctx.getRuleEngineSpellSlotSummary(S().personagem) === 'Sem espaços';
});
check('2024 Paladino nível 5, CAR 16: espaços 4 de 1º e 2 de 2º; preparadas = 6', () => {
  novoPersonagem('2024', { classe: 'paladino', nivel: 5, bonusProficiencia: 3, atributosBase: ATR(16, 10, 10) });
  ctx.recalcularMagia();
  return S().personagem.magia.espacos.filter(Boolean).join() === '4,2' && S().personagem.magia.magiasPreparadas === 6;
});
check('2024 Bardo nível 5, CAR 16: 3 truques e 9 magias preparadas (tabela)', () => {
  novoPersonagem('2024', { classe: 'bardo', nivel: 5, bonusProficiencia: 3, atributosBase: ATR(16, 10, 10) });
  ctx.recalcularMagia();
  return S().personagem.magia.cantripsConhecidos === 3 && S().personagem.magia.magiasPreparadas === 9;
});
check('2024 Bruxo nível 5: 2 espaços de pacto de 3º círculo; preparadas = 6', () => {
  novoPersonagem('2024', { classe: 'bruxo', nivel: 5, bonusProficiencia: 3, atributosBase: ATR(16, 10, 10) });
  ctx.recalcularMagia();
  const m = S().personagem.magia;
  return m.espacos.filter(Boolean).join() === '2' && m.nivelEspacosBruxo === 3 && m.magiasPreparadas === 6;
});
check('2024 Patrulheiro nível 2, SAB 14: 2 espaços de 1º e 3 magias preparadas (2014 conhecia 2)', () => {
  novoPersonagem('2024', { classe: 'patrulheiro', nivel: 2, bonusProficiencia: 2, atributosBase: ATR(10, 14, 10) });
  ctx.recalcularMagia();
  const m = S().personagem.magia;
  return m.espacos.filter(Boolean).join() === '2' && m.magiasPreparadas === 3;
});
check('2024 Guerreiro segue sem conjuração (conjuracao null no SRD 5.2)', () => {
  novoPersonagem('2024', { classe: 'guerreiro', nivel: 5 });
  return S().personagem.magia.ehConjurador === false;
});

/* ---------- 3. PV e recursos 2024 ---------- */

check('2024 PV do Mago nível 5, CON 14 (+2): 8 no 1º nível e 32 no 5º (d6: 8 + 4 x (4 + 2))', () => {
  setEdicao('2024');
  return ctx.resolveHitPoints({ classKey: 'mago', level: 5, personagem: { atributos: { constituicao: 14 } } }, null).max === 32;
});
check('2024 Bárbaro nível 1, CON 16 (+3): 15 PV no 1º nível (d12 + 3)', () => {
  setEdicao('2024');
  return ctx.resolveHitPoints({ classKey: 'barbaro', level: 1, personagem: { atributos: { constituicao: 16 } } }, null).max === 15;
});
check('2024 recursos Bárbaro nível 5: Fúria 3 usos (tabela [2,2,3,3,3,...], 5º = 3)', () => {
  setEdicao('2024');
  const r = ctx.getClassResources('barbaro', 5, {});
  return r.length === 1 && r[0].id === 'furia' && r[0].max === 3;
});
check('2024 recursos Guerreiro nível 5: Recuperação de Fôlego 2 e Surto de Ação 1; Indomável ainda não existe (0)', () => {
  setEdicao('2024');
  const r = ctx.getClassResources('guerreiro', 5, {});
  const get = id => (r.find(x => x.id === id) || {}).max;
  return get('segundo_folego') === 3 && get('surto_acao') === 1 && get('indomavel') === undefined;
});
check('2024 recursos Guerreiro nível 9: Indomável 1 uso', () => {
  setEdicao('2024');
  return (ctx.getClassResources('guerreiro', 9, {}).find(x => x.id === 'indomavel') || {}).max === 1;
});
check('2024 Monge nível 2: 2 Pontos de Foco, recarga marcada como NÃO VERIFICADO', () => {
  setEdicao('2024');
  const r = ctx.getClassResources('monge', 2, {}).find(x => x.id === 'ki');
  return !!r && r.max === 2 && /NÃO VERIFICADO/.test(r.recarga);
});
check('2024 Mago não tem recursos rastreáveis', () => {
  setEdicao('2024');
  return ctx.getClassResources('mago', 10, {}).length === 0;
});

/* ---------- 4. Subclasse 2024 e NÃO VERIFICADO na tela ---------- */

check('2024 Clérigo nível 3: Domínio da Vida traz 3 características (Discípulo, Magias do Domínio, Preservar a Vida)', () => {
  setEdicao('2024');
  const f3 = ctx.getSubclassFeaturesForLevel('clerigo', 'dominio_vida', 3).map(f => f.nome);
  return f3.length === 3 && f3.includes('Preservar a Vida') && ctx.getSubclassFeaturesForLevel('clerigo', 'dominio_vida', 2).length === 0;
});
check('2024 Guerreiro/Campeão nível 7: Atleta Notável sai marcado NÃO VERIFICADO; Crítico Aprimorado não', () => {
  setEdicao('2024');
  const f = ctx.getSubclassFeaturesForLevel('guerreiro', 'campeao', 7);
  const atleta = f.find(x => x.nome === 'Atleta Notável');
  const critico = f.find(x => x.nome === 'Crítico Aprimorado');
  return f.length === 2 && ctx.htmlNaoVerificado2024(atleta).includes('NÃO VERIFICADO') && ctx.htmlNaoVerificado2024(critico) === '';
});
check('2024 Paladino/Juramento da Devoção: magia do juramento marcada NÃO VERIFICADO (lista completa não conferida)', () => {
  setEdicao('2024');
  const magias = ctx.getSubclassFeaturesForLevel('paladino', 'juramento_devocao', 3).find(x => /Magias do Juramento/.test(x.nome));
  return !!magias && ctx.htmlNaoVerificado2024(magias).includes('NÃO VERIFICADO');
});
check('Aviso 2024 na tela: diz que só o SRD 5.2 está ligado e some no 2014', () => {
  setEdicao('2024');
  const h24 = ctx.htmlAvisoClasses2024();
  setEdicao('2014');
  return h24.includes('SRD 5.2') && h24.includes('uma subclasse por classe') && h24.includes('sem talentos 2024') && ctx.htmlAvisoClasses2024() === '';
});
check('Tela da classe 2024 (Clérigo nível 3) mostra o aviso e a subclasse única', () => {
  novoPersonagem('2024', { classe: 'clerigo', nivel: 3 });
  const h = ctx.buildClassPreviewHtml('clerigo', 3, '');
  return h.includes('uma subclasse por classe') && h.includes('Domínio da Vida') && !h.includes('Não foi possível');
});
check('Validação 2024 traz o aviso do SRD 5.2; 2014 não traz', () => {
  novoPersonagem('2024', { classe: 'clerigo', nivel: 3 });
  const a24 = ctx.validarPersonagemCompleto().avisos.some(a => /SRD 5\.2/.test(a));
  novoPersonagem('2014', { classe: 'clerigo', nivel: 3 });
  const a14 = ctx.validarPersonagemCompleto().avisos.some(a => /SRD 5\.2/.test(a));
  return a24 && !a14;
});

/* ---------- 5. Magias de subclasse (motor) ---------- */

check('Clérigo de Conhecimento (2014) nível 3: 4 magias sempre preparadas (Comando, Identificar, Augúrio, Sugestão)', () => {
  novoPersonagem('2014', { classe: 'clerigo', nivel: 3, subclasse: 'knowledge' });
  const b = ctx.getRuleEngineSubclassSpellBenefitsForCharacter(S().personagem);
  return JSON.stringify(b.alwaysPrepared) === JSON.stringify(['Comando', 'Identificar', 'Augúrio', 'Sugestão']) && b.expandedList.length === 0;
});
check('Clérigo de Conhecimento nível 2: só as 2 de 1º círculo (Augúrio e Sugestão ainda não)', () => {
  novoPersonagem('2014', { classe: 'clerigo', nivel: 2, subclasse: 'knowledge' });
  const b = ctx.getRuleEngineSubclassSpellBenefitsForCharacter(S().personagem);
  return JSON.stringify(b.alwaysPrepared) === JSON.stringify(['Comando', 'Identificar']);
});
check('Domínio sempre preparado não conta no limite: 3 magias na lista, 2 são do domínio, conta 1', () => {
  novoPersonagem('2014', { classe: 'clerigo', nivel: 3, subclasse: 'knowledge' });
  S().personagem.magia.listaMagias = ['Comando', 'Augúrio', 'Bola de Fogo'];
  return ctx.getRuleEngineCountableSelectedSpells(S().personagem) === 1;
});
check('Domínio da Luz (2014) nível 1: Mãos Flamejantes e Fogo das Fadas entram como sempre preparadas', () => {
  novoPersonagem('2014', { classe: 'clerigo', nivel: 1, subclasse: 'light' });
  const b = ctx.getRuleEngineSubclassSpellBenefitsForCharacter(S().personagem);
  return b.alwaysPrepared.includes('Mãos Flamejantes') && b.alwaysPrepared.includes('Fogo das Fadas') && b.alwaysPrepared.length === 2;
});
check('Clérigo do domínio da Natureza, Tempestade e Trapaça também têm regra no motor (nível 1: 2 magias cada)', () => {
  return ['nature', 'tempest', 'trickery'].every(sub => {
    novoPersonagem('2014', { classe: 'clerigo', nivel: 1, subclasse: sub });
    return ctx.getRuleEngineSubclassSpellBenefitsForCharacter(S().personagem).alwaysPrepared.length === 2;
  });
});
check('Paladino do Juramento dos Anciões nível 5: Golpe Enredante, Falar com Animais, Raio de Luar e Passo Nebuloso sempre preparadas', () => {
  novoPersonagem('2014', { classe: 'paladino', nivel: 5, subclasse: 'ancients' });
  const b = ctx.getRuleEngineSubclassSpellBenefitsForCharacter(S().personagem);
  return JSON.stringify(b.alwaysPrepared) === JSON.stringify(['Golpe Enredante', 'Falar com Animais', 'Raio de Luar', 'Passo Nebuloso']);
});
check('Paladino do Juramento dos Anciões nível 2: ainda sem magias do juramento (começa no 3º)', () => {
  novoPersonagem('2014', { classe: 'paladino', nivel: 2, subclasse: 'ancients' });
  return ctx.getRuleEngineSubclassSpellBenefitsForCharacter(S().personagem).alwaysPrepared.length === 0;
});
check('Bruxo Grande Antigo nível 1: Palavras Dissonantes e Risada Hedionda de Tasha são escolhíveis em 1º círculo (não automáticas)', () => {
  novoPersonagem('2014', { classe: 'bruxo', nivel: 1, subclasse: 'great_old_one' });
  const p = S().personagem;
  const b = ctx.getRuleEngineSubclassSpellBenefitsForCharacter(p);
  const okEscolha = ctx.validateRuleEngineSpellChoice(p, 'Palavras Dissonantes', 1).ok;
  return b.alwaysPrepared.length === 0 && b.expandedList.join() === 'Palavras Dissonantes,Risada Hedionda de Tasha' && okEscolha;
});
check('Bruxo Grande Antigo nível 1: Palavras Dissonantes em 2º círculo recusada (pacto dá só 1º)', () => {
  novoPersonagem('2014', { classe: 'bruxo', nivel: 1, subclasse: 'great_old_one' });
  const r = ctx.validateRuleEngineSpellChoice(S().personagem, 'Palavras Dissonantes', 2);
  return r.ok === false && /1º círculo/.test(r.error);
});
check('Bruxo Grande Antigo nível 1: Detectar Pensamentos (nível 3 de bruxo) ainda não está na lista de 1º círculo', () => {
  novoPersonagem('2014', { classe: 'bruxo', nivel: 1, subclasse: 'great_old_one' });
  const r = ctx.validateRuleEngineSpellChoice(S().personagem, 'Detectar Pensamentos', 1);
  return r.ok === false && /não pertence/.test(r.error);
});
check('Bruxo Grande Antigo nível 3: Detectar Pensamentos aceita em 2º círculo e recusa em 1º', () => {
  novoPersonagem('2014', { classe: 'bruxo', nivel: 3, subclasse: 'great_old_one' });
  const p = S().personagem;
  return ctx.validateRuleEngineSpellChoice(p, 'Detectar Pensamentos', 2).ok === true && ctx.validateRuleEngineSpellChoice(p, 'Detectar Pensamentos', 1).ok === false;
});
check('Bruxo Grande Antigo nível 5 (pacto de 3º): Clarividência aceita em 3º círculo e recusa em 4º', () => {
  novoPersonagem('2014', { classe: 'bruxo', nivel: 5, subclasse: 'great_old_one' });
  const p = S().personagem;
  return ctx.validateRuleEngineSpellChoice(p, 'Clarividência', 3).ok === true && ctx.validateRuleEngineSpellChoice(p, 'Clarividência', 4).ok === false;
});
check('Bruxo Grande Antigo: magias expandidas não contam como automáticas nem somam ao limite de preparadas', () => {
  novoPersonagem('2014', { classe: 'bruxo', nivel: 3, subclasse: 'great_old_one' });
  S().personagem.magia.listaMagias = ['Detectar Pensamentos', 'Hex'];
  return ctx.getRuleEngineCountableSelectedSpells(S().personagem) === 2;
});
check('Estado grava as magias sempre preparadas do Clérigo de Conhecimento (magiasSubclasseSemprePreparadas)', () => {
  novoPersonagem('2014', { classe: 'clerigo', nivel: 3, subclasse: 'knowledge' });
  const p = ctx.resolveAndApplyRuleEngineSubclassSpells(S().personagem);
  return p.magia.magiasSubclasseSemprePreparadas.includes('Augúrio') && p.magia.magiasSubclasseListaExpandida.length === 0;
});

/* ---------- 6. Duplicatas de ui.js ---------- */

check('ui.js: renderResumo e confirmarClasse têm uma definição cada', () => {
  const src = fs.readFileSync(path.join(base, 'ui.js'), 'utf8');
  const conta = nome => (src.match(new RegExp('^function ' + nome + '\\(', 'gm')) || []).length;
  return conta('renderResumo') === 1 && conta('confirmarClasse') === 1;
});

const falhas = results.filter(r => !r.ok);
console.log(`test_2024_integracao: ${results.length - falhas.length}/${results.length} OK`);
if (falhas.length) { console.log(JSON.stringify(falhas, null, 2)); process.exit(1); }
