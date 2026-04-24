const fs = require('fs');
const vm = require('vm');

let lastHtml = '';
const elements = new Map();
const makeEl = (id)=>({
  id,
  value:'',
  checked:false,
  innerHTML:'',
  classList:{add(){},remove(){},contains(){return false;}},
  addEventListener(){},
  querySelector(){return null;},
  querySelectorAll(){return [];},
  insertAdjacentHTML(pos, html){ this.innerHTML += html; },
});
const app = makeEl('app');
Object.defineProperty(app,'innerHTML',{get(){return lastHtml;}, set(v){lastHtml=String(v);}});

const context = {
  console,
  window: { addEventListener(){}, alert(msg){ console.log('[alert]', msg); }, confirm(){ return true; } },
  document: {
    getElementById(id){ if(id==='app') return app; if(!elements.has(id)) elements.set(id, makeEl(id)); return elements.get(id); },
    querySelector(){return null;},
    querySelectorAll(){return [];},
    createElement(){return makeEl('created');},
    body: makeEl('body')
  },
  localStorage: { store:{}, getItem(k){return this.store[k]||null;}, setItem(k,v){this.store[k]=String(v);}, removeItem(k){delete this.store[k];} },
  crypto: { randomUUID(){return 'uuid-test';} },
  Blob: function(){},
  URL: { createObjectURL(){return 'blob:test';}, revokeObjectURL(){} },
};
context.window.document = context.document;
context.window.localStorage = context.localStorage;
context.globalThis = context;
context.app = app;
vm.createContext(context);
for (const f of ['rules.js','state.js','validator.js','rules-engine.js','storage.js','export.js','ui.js']) {
  vm.runInContext(fs.readFileSync(f,'utf8'), context, {filename:f});
}
// Avoid main; call key render flows manually.
const tests = [];
function snap(label, fn, checks){
  lastHtml=''; elements.clear();
  try { fn(); } catch(e) { tests.push({label, ok:false, error:e.stack}); return; }
  const html = lastHtml;
  const missing = (checks||[]).filter(c=>!html.includes(c));
  tests.push({label, ok:missing.length===0, missing, len:html.length, sample:html.slice(0,100)});
}
const state = vm.runInContext('state', context);
context.resetStateToInitial();
state.modo='A';
snap('etapa 1/inicio', ()=>context.renderEscolhaModo(), ['Início','Histórico']);
snap('atributos standard', ()=>context.renderAtributos(), ['Atributos','Standard Array']);
state.personagem.classe='clerigo'; state.personagem.nivel=1; state.personagem.atributos={...state.personagem.atributosBase, sabedoria:16};
context.configurarMagiaDaClasse(); context.recalcularTudo();
snap('magia clerigo', ()=>context.renderMagia(), ['Magia','Truques','Magias']);
state.personagem.classe='mago'; state.personagem.nivel=1; state.personagem.atributos={...state.personagem.atributosBase, inteligencia:16}; state.personagem.magia.grimorio=[];
context.configurarMagiaDaClasse(); context.recalcularTudo();
snap('magia mago grimorio', ()=>context.renderMagia(), ['Grimório do mago','Adicionar ao grimório']);
state.etapa=11; context.recalcularTudo();
snap('resumo', ()=>context.renderResumo(), ['Resumo da Ficha','Validação']);

let failed = tests.filter(t=>!t.ok);
console.log(JSON.stringify({total:tests.length, failed, tests}, null, 2));
if (failed.length) process.exit(1);
