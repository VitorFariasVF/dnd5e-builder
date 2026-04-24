const fs = require('fs');
const vm = require('vm');
const path = '/mnt/data/work16';
let code = '';
for (const f of ['state.js','rules.js','rules-engine.js','validator.js']) {
  code += '\n// FILE '+f+'\n' + fs.readFileSync(path+'/'+f,'utf8') + '\n';
}
code += `
function clone(obj){ return JSON.parse(JSON.stringify(obj)); }
function makeChar(base){ const p = clone(createInitialState().personagem); return Object.assign(p, base, { magia: Object.assign(p.magia, base.magia || {}), atributosBase: Object.assign(p.atributosBase, base.atributosBase || {}), bonusRaciais: Object.assign(p.bonusRaciais, base.bonusRaciais || {}), atributos: Object.assign(p.atributos, base.atributos || {}), opcoesClasse: Object.assign(p.opcoesClasse, base.opcoesClasse || {})}); }
const results = [];
function check(name, fn){ try { const ok = fn(); results.push({name, ok: !!ok}); if(!ok) console.log('FAIL', name); } catch(e){ results.push({name, ok:false, error:e.stack}); console.log('ERROR', name, e.stack); } }
check('clerigo nivel 1 tem 3 truques e 2 slots', ()=>{ const r=resolveCharacterRules(makeChar({classe:'clerigo',nivel:1,atributos:{sabedoria:16}})); return r.legacyPatch.magia.cantripsConhecidos===3 && r.legacyPatch.magia.espacos[0]===2; });
check('druida nivel 1 tem 2 truques', ()=> resolveCharacterRules(makeChar({classe:'druida',nivel:1})).legacyPatch.magia.cantripsConhecidos===2);
check('mago nivel 1 tem 3 truques e espera grimorio 6', ()=>{ const r=resolveCharacterRules(makeChar({classe:'mago',nivel:1})); return r.legacyPatch.magia.cantripsConhecidos===3 && r.resolved.spellcasting.wizard.expectedSpellbookCount===6; });
check('paladino nivel 2 tem 2 slots e limite preparado 4 com carisma 16', ()=>{ const r=resolveCharacterRules(makeChar({classe:'paladino',nivel:2,atributosBase:{forca:13,destreza:10,constituicao:12,inteligencia:8,sabedoria:10,carisma:16}})); return r.legacyPatch.magia.espacos[0]===2 && r.legacyPatch.magia.magiasPreparadas===4; });
check('patrulheiro nivel 2 tem 2 slots e 2 conhecidas', ()=>{ const r=resolveCharacterRules(makeChar({classe:'patrulheiro',nivel:2})); return r.legacyPatch.magia.espacos[0]===2 && r.legacyPatch.magia.magiasConhecidas===2; });
check('bruxo hexblade recebe proficiencias', ()=>{ const r=resolveCharacterRules(makeChar({classe:'bruxo',subclasse:'hexblade',nivel:1})); const raw=r.legacyPatch.proficienciasClasseEfetivas.join('|'); return raw.includes('Armaduras médias') && raw.includes('Escudos') && raw.includes('Armas marciais'); });
check('bardo swords recebe armadura média e cimitarra no nivel 3', ()=>{ const r=resolveCharacterRules(makeChar({classe:'bardo',subclasse:'swords',nivel:3})); const raw=r.legacyPatch.proficienciasClasseEfetivas.join('|'); return raw.includes('Armaduras médias') && raw.includes('Cimitarras'); });
check('guerreiro nivel 6 possui duas ASI esperadas', ()=>{ const r=resolveCharacterRules(makeChar({classe:'guerreiro',nivel:6})); return r.resolved.asi.expectedCount===2; });
check('ladino nivel 10 possui tres ASI esperadas', ()=>{ const r=resolveCharacterRules(makeChar({classe:'ladino',nivel:10})); return r.resolved.asi.expectedCount===3; });
check('feat precisao elfica invalido para anao', ()=>{ const p=makeChar({raca:'anao',nivel:4,opcoesClasse:{asi:[{level:4,type:'feat',feat:'precisao_elfica'}]}}); const r=resolveCharacterRules(p); return r.resolved.errors.some(e=>String(e).includes('Precisão Élfica') || String(e).includes('raça')); });
check('iniciado em magia rejeita truque fora da classe escolhida', ()=>{ const p=makeChar({nivel:4,opcoesClasse:{asi:[{level:4,type:'feat',feat:'iniciado_em_magia',details:{spellcastingClass:'clerigo',cantrips:['Rajada Mística','Luz'],level1Spell:'Bênção'}}]}}); const r=resolveCharacterRules(p); return r.resolved.errors.some(e=>String(e).includes('Rajada') || String(e).includes('truque')); });
check('validacao rejeita bola de fogo clerigo nivel 1', ()=>{ const p=makeChar({classe:'clerigo',nivel:1,magia:{listaMagias:['Bola de Fogo (3º)']}}); const r=resolveCharacterRules(p); return r.resolved.errors.some(e=>String(e).includes('Bola de Fogo')); });
console.log(JSON.stringify(results,null,2));
if(results.some(r=>!r.ok)) process.exit(1);
`;
vm.runInNewContext(code, {console, process, require});
