/* Etapa 22 — tipo de ficha (2014/2024), regras de dados, exportação Foundry/Roll20 e PDF.
   Rodar: node test_stage22_regras_export.js */
const fs = require('fs');
const vm = require('vm');
const root = __dirname;
const join = require('path').join;

const el = () => ({ value:'', checked:false, innerHTML:'', style:{}, classList:{ add(){}, remove(){}, contains(){ return false; } }, addEventListener(){}, appendChild(){}, remove(){}, click(){}, insertAdjacentHTML(){}, querySelectorAll(){ return []; }, querySelector(){ return null; } });
const store = {};
const ctx = {
  console, process, require, Blob: class {}, URL: { createObjectURL(){ return ''; }, revokeObjectURL(){} },
  localStorage: { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
  document: { getElementById: () => el(), createElement: () => el(), body: el(), querySelectorAll: () => [], querySelector: () => null, addEventListener(){} },
  alert(){}, confirm: () => true, setTimeout, clearTimeout
};
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
let code = '';
for (const f of ['rules.js','state.js','validator.js','rules-engine.js','storage.js','export.js','export-pdf.js','export-roll20.js','ui.js']) {
  code += `\n//FILE ${f}\n` + fs.readFileSync(join(root, f), 'utf8') + '\n';
}
code += `
const results = [];
function check(name, fn){ try { const ok = fn(); results.push({name, ok: !!ok}); if(!ok) console.log('FAIL', name); } catch(e){ results.push({name, ok:false, error:e.stack}); console.log('ERROR', name, e.stack); } }
function novoPersonagem(edicao, base){
  resetStateToInitial();
  state.regras = edicao; aplicarCatalogoRegras(edicao); state.modo = 'A';
  Object.assign(state.personagem, base || {});
  recalcularAtributosFinais(); recalcularTudo();
  return state.personagem;
}
const clone = o => JSON.parse(JSON.stringify(o));

check('2014: 9 raças e 13 antecedentes, com bônus raciais', () => { aplicarCatalogoRegras('2014'); return Object.keys(RACES).length === 9 && Object.keys(BACKGROUNDS).length === 13 && RACES.anao.bonusAtributos.constituicao === 2; });
check('2024: 10 espécies sem bônus de atributo e 16 antecedentes com talento de origem', () => {
  aplicarCatalogoRegras('2024');
  const ok = Object.keys(RACES).length === 10 && Object.keys(BACKGROUNDS).length === 16
    && Object.values(RACES).every(r => Object.keys(r.bonusAtributos).length === 0)
    && Object.values(BACKGROUNDS).every(b => b.atributosOpcoes.length === 3 && b.talentoOrigem && b.pericias.length === 2 && b.ferramentas.length === 1);
  aplicarCatalogoRegras('2014'); return ok;
});
check('2024: bônus do antecedente aceita +2/+1 e +1/+1/+1 e recusa combinações inválidas', () => {
  const b = 'acolito';
  const bom1 = calcularBonusOrigem2024(b, {formato:'2_1', mais2:'sabedoria', mais1:'carisma', tres:[]});
  const bom2 = calcularBonusOrigem2024(b, {formato:'1_1_1', mais2:'', mais1:'', tres:['inteligencia','sabedoria','carisma']});
  const ruim1 = calcularBonusOrigem2024(b, {formato:'2_1', mais2:'forca', mais1:'carisma', tres:[]});
  const ruim2 = calcularBonusOrigem2024(b, {formato:'2_1', mais2:'sabedoria', mais1:'sabedoria', tres:[]});
  const ruim3 = calcularBonusOrigem2024(b, {formato:'1_1_1', mais2:'', mais1:'', tres:['sabedoria','sabedoria','carisma']});
  return bom1.sabedoria === 2 && bom1.carisma === 1 && Object.keys(bom2).length === 3 && !ruim1 && !ruim2 && !ruim3;
});
check('2024: atributos finais recebem o bônus do antecedente e nada da espécie', () => {
  const p = novoPersonagem('2024', {classe:'clerigo', raca:'anao', origem:'acolito', nivel:1, bonusOrigem2024:{formato:'2_1', mais2:'sabedoria', mais1:'carisma', tres:[]}});
  return p.atributos.sabedoria === p.atributosBase.sabedoria + 2 && p.atributos.carisma === p.atributosBase.carisma + 1 && p.atributos.constituicao === p.atributosBase.constituicao;
});
check('2024: validação (modo A) pede a distribuição dos bônus do antecedente', () => {
  novoPersonagem('2024', {origem:'acolito'});
  return /bônus de atributo do antecedente/.test(validarOrigem() || '');
});
check('2024: subclasse no nível 3 para todas as classes e sem subclasses de Xanathar', () => {
  aplicarCatalogoRegras('2024'); state.regras = '2024';
  const ok = Object.keys(CLASSES).every(c => getSubclassUnlockLevel(c) === 3) && Object.keys(CLASSES).every(c => getSubclassOptions(c).every(s => s.source !== 'XGtE'));
  state.regras = '2014'; return ok;
});
check('2014: subclasse de Xanathar disponível e nível de subclasse por classe (Clérigo 1, Mago 2, Bruxo 1)', () => {
  state.regras = '2014';
  return getSubclassOptions('clerigo').some(s => s.source === 'XGtE') && getSubclassUnlockLevel('clerigo') === 1 && getSubclassUnlockLevel('mago') === 2 && getSubclassUnlockLevel('bruxo') === 1;
});
check('Aviso de Xanathar na ficha 2014 e de catálogo na ficha 2024', () => {
  const p = novoPersonagem('2014', {classe:'clerigo', nivel:1, subclasse:'forge'});
  const a14 = validarPersonagemCompleto().avisos.some(a => /Xanathar/.test(a));
  novoPersonagem('2024', {classe:'clerigo', nivel:3});
  const a24 = validarPersonagemCompleto().avisos.some(a => /2024 \\(5\\.5\\)/.test(a));
  return a14 && a24;
});

/* Regras de dados */
check('Proficiência com arma: Mago usa Besta Leve e Bordão; Druida usa Bordão', () => {
  novoPersonagem('2014', {classe:'mago'});
  const mago = personagemEhProficienteComArma(WEAPONS.besta_leve) && personagemEhProficienteComArma(WEAPONS.bordao);
  novoPersonagem('2014', {classe:'druida'});
  return mago && personagemEhProficienteComArma(WEAPONS.bordao) && !personagemEhProficienteComArma(WEAPONS.espada_longa);
});
check('Catálogo de armas do PHB completo (37) e todas com crítico 20/x2', () => Object.keys(WEAPONS).length >= 37 && Object.values(WEAPONS).every(w => w.critico === '20/x2'));
check('Armaduras do PHB completas (12 + sem armadura)', () => Object.keys(ARMORS).length >= 13);
check('Habilidades de classe: sem nome repetido no mesmo nível e Guerreiro correto', () => {
  const dup = [];
  Object.entries(CLASS_FEATURES).forEach(([c, l]) => { const v = new Set(); l.forEach(f => { const k = f.level + '|' + f.nome; if (v.has(k)) dup.push(c + ':' + k); v.add(k); }); });
  const g = CLASS_FEATURES.guerreiro;
  return dup.length === 0 && g.find(f => f.nome === 'Surto de Ação').level === 2 && g.find(f => f.nome === 'Segundo Fôlego').level === 1 && g.filter(f => f.nome === 'Segundo Fôlego').length === 1;
});
check('Habilidades de classe: sem sinônimos duplicados (Conjuração, Cura pelas Mãos, Fonte de Magia)', () => {
  const nomes = c => CLASS_FEATURES[c].map(f => f.nome);
  return !nomes('clerigo').includes('Conjuração Divina') && !nomes('paladino').includes('Mãos Curativas') && !nomes('feiticeiro').includes('Fonte da Magia') && !nomes('bardo').includes('Jack of All Trades');
});

/* Foundry */
function itensDuplicados(actor){ const v = new Set(); const d = []; actor.items.forEach(i => { const k = i.type + '|' + i.name; if (v.has(k)) d.push(k); v.add(k); }); return d; }
check('Foundry 2014: um único source.rules (2014), hp.max = PV calculado e sem itens duplicados', () => {
  const p = novoPersonagem('2014', {nome:'Teste', classe:'mago', raca:'elfo', origem:'sabio', nivel:3});
  const a = montarFoundryActor();
  const regras = new Set(a.items.map(i => i.system && i.system.source && i.system.source.rules));
  return regras.size === 1 && regras.has('2014') && a.system.attributes.hp.max === p.pvMax && a.system.attributes.hp.value === p.pvMax && itensDuplicados(a).length === 0;
});
check('Foundry 2024: um único source.rules (2024) e talento de origem exportado', () => {
  novoPersonagem('2024', {nome:'Teste', classe:'clerigo', raca:'elfo', origem:'acolito', nivel:3, talentoOrigem:'Iniciado em Magia (Clérigo)', bonusOrigem2024:{formato:'2_1', mais2:'sabedoria', mais1:'carisma', tres:[]}});
  const a = montarFoundryActor();
  const regras = new Set(a.items.map(i => i.system && i.system.source && i.system.source.rules));
  return regras.size === 1 && regras.has('2024') && a.items.some(i => i.name === 'Iniciado em Magia (Clérigo)') && montarPayloadExportacao().regras === '2024';
});

/* Roll20 */
function roll20Simulado(script){
  const criados = []; let handler; const chat = [];
  const sandbox = { on:(ev, fn) => { if(ev === 'ready') fn(); else handler = fn; }, findObjs:() => [], createObj:(t, o) => { const x = Object.assign({id:'id' + criados.length}, o); criados.push([t, o]); return x; }, sendChat:(w, m) => chat.push(m) };
  new Function(...Object.keys(sandbox), script)(...Object.values(sandbox));
  handler({type:'api', content:script.match(/!vf-importar-[a-z0-9-]+/)[0], who:'Vitor (GM)', playerid:'P1'});
  return {criados, chat};
}
check('Roll20: script de API cria o personagem com atributos, ataques e magias', () => {
  novoPersonagem('2014', {nome:'Aria Vento', classe:'mago', raca:'elfo', origem:'sabio', nivel:3});
  state.personagem.magia.listaTruques = ['Raio de Fogo'];
  const r = roll20Simulado(gerarScriptRoll20());
  const nomes = r.criados.filter(c => c[0] === 'attribute').map(c => c[1].name);
  return r.criados[0][0] === 'character' && r.criados[0][1].name === 'Aria Vento' && nomes.includes('intelligence_base') && nomes.includes('class') && nomes.some(n => /^repeating_attack_-.+_atkname$/.test(n)) && nomes.some(n => /^repeating_spell-cantrip_-.+_spellname$/.test(n)) && /criado com/.test(r.chat[0]);
});
check('Roll20: nome do personagem com aspas e barras não quebra o script', () => {
  novoPersonagem('2014', {nome:'Ro"b\\'s </script>', classe:'guerreiro'});
  const r = roll20Simulado(gerarScriptRoll20());
  return r.criados[0][1].name === 'Ro"b\\'s </script>';
});

/* PDF */
check('PDF: escapa HTML de listas, mostra deslocamento em pés e metros e usa serifa de título', () => {
  const p = novoPersonagem('2014', {nome:'Borin', classe:'guerreiro', raca:'anao', origem:'soldado', nivel:5, deslocamento:30});
  p.personalidade.tracos = ['<img src=x onerror=alert(1)>']; p.personalidade.ideais = ['<b>honra</b>'];
  const h = gerarHtmlFicha();
  return !h.includes('<img src=x') && !h.includes('<b>honra</b>') && h.includes('&lt;img src=x') && h.includes('30 pés') && h.includes('9 m') && !/30m\\b/.test(h) && h.includes('Palatino');
});
check('PDF: duas páginas A4 com moldura, escudos de atributo, brasão e rodapé do VF Tools', () => {
  novoPersonagem('2024', {nome:'Aria', classe:'mago', nivel:1});
  const h = gerarHtmlFicha();
  return (h.match(/class="pagina"/g) || []).length === 2 && (h.match(/class="escudo"/g) || []).length === 6 && h.includes('class="brasao"') && h.includes('size:A4') && h.includes('VF Tools') && h.includes('2024 (5.5)');
});

/* Armazenamento */
check('Armazenamento migra a chave antiga para o formato novo e não perde a ficha', () => {
  localStorage.setItem('criacao_dnd_5e', JSON.stringify({modo:'A', regras:'2024', personagem:{nome:'Migrada'}}));
  const lido = vfLer('estado', 'criacao_dnd_5e');
  return lido && lido.personagem.nome === 'Migrada' && lido.regras === '2024';
});
check('Estado salvo sem o campo regras volta como 2014', () => { resetStateToInitial(); delete state.regras; ensureStateShape(); return state.regras === '2014' && Object.keys(RACES).length === 9; });

console.log(JSON.stringify(results, null, 2));
if(results.some(r => !r.ok)) process.exit(1);
`;
vm.runInContext(code, ctx);
