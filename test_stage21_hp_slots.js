const fs = require('fs');
const vm = require('vm');
const path = __dirname;
let code = '';
for (const f of ['state.js','rules.js','rules-engine.js','validator.js']) {
  code += '\n// FILE '+f+'\n' + fs.readFileSync(path+'/'+f,'utf8') + '\n';
}
code += `
function clone(obj){ return JSON.parse(JSON.stringify(obj)); }
function makeChar(base){
  const p = clone(createInitialState().personagem);
  return Object.assign(p, base, {
    magia: Object.assign(p.magia, base.magia || {}),
    atributosBase: Object.assign(p.atributosBase, base.atributosBase || {}),
    bonusRaciais: Object.assign(p.bonusRaciais, base.bonusRaciais || {}),
    atributos: Object.assign(p.atributos, base.atributos || {}),
    opcoesClasse: Object.assign(p.opcoesClasse, base.opcoesClasse || {})
  });
}
const results = [];
function check(name, fn){
  try { const ok = fn(); results.push({name, ok: !!ok}); if(!ok) console.log('FAIL', name); }
  catch(e){ results.push({name, ok:false, error:e.stack}); console.log('ERROR', name, e.stack); }
}
check('PV nível 1 usa dado cheio + CON mesmo sem dadoVida no estado', ()=>{
  const r = resolveCharacterRules(makeChar({classe:'bruxo', nivel:1, dadoVida:null, atributos:{constituicao:14}}));
  return r.legacyPatch.pvMax === 10 && r.resolved.hitPoints.firstLevel === 10;
});
check('PV nível 2 usa média fixa por nível depois do primeiro', ()=>{
  const r = resolveCharacterRules(makeChar({classe:'paladino', nivel:2, atributos:{constituicao:14}}));
  return r.legacyPatch.pvMax === 20;
});
check('PV nunca fica menor que 1 por nível com CON muito baixa', ()=>{
  const r = resolveCharacterRules(makeChar({classe:'mago', nivel:2, atributos:{constituicao:1}}));
  return r.legacyPatch.pvMax === 2;
});
check('Resumo de slots Paladino nível 2 usa engine half corrigida', ()=>{
  return getRuleEngineSpellSlotSummary(makeChar({classe:'paladino', nivel:2})) === '1º:2';
});
check('Resumo de slots Patrulheiro nível 2 usa engine half corrigida', ()=>{
  return getRuleEngineSpellSlotSummary(makeChar({classe:'patrulheiro', nivel:2})) === '1º:2';
});
check('Resumo de slots Bruxo usa pacto', ()=>{
  return getRuleEngineSpellSlotSummary(makeChar({classe:'bruxo', nivel:1})).includes('pacto de 1º círculo');
});
check('Classe sem conjuração retorna Não', ()=>{
  return getRuleEngineSpellSlotSummary(makeChar({classe:'guerreiro', nivel:1})) === 'Não';
});
console.log(JSON.stringify(results,null,2));
if(results.some(r=>!r.ok)) process.exit(1);
`;
vm.runInNewContext(code, {console, process, require});
