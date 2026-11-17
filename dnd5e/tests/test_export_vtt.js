/* Exportação VTT — Foundry (dnd5e 5.3.x) e Roll20 (D&D 5E by Roll20, OGL).
   Nenhum teste aqui roda em Foundry ou Roll20 reais: conferem a estrutura gerada contra as regras
   que o próprio código declara e contra as fontes registradas em docs/TRABALHO_DND5E_EXPORT.md.
   Rodar: node test_export_vtt.js */
const fs = require('fs');
const vm = require('vm');
const root = require('path').join(__dirname, '..');
const join = require('path').join;

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
let code = '';
for (const f of ['rules.js', 'rules-racas.js', 'state.js', 'validator.js', 'rules-engine.js', 'storage.js', 'export.js', 'export-pdf.js', 'export-roll20.js', 'ui.js']) {
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
const guerreiro2 = () => novoPersonagem('2014', { classe:'guerreiro', raca:'humano', origem:'soldado', nivel:2, atributos:{forca:15,destreza:14,constituicao:13,inteligencia:8,sabedoria:12,carisma:10} });
const itemPorNome = (items, nome) => items.filter(i => i.name === nome);

/* 1. Recarga: texto de descanso vira períodos do Foundry */
check('recargaPeriodos: curto ou longo vale para os dois descansos', () => JSON.stringify(recargaPeriodos('Descanso curto ou longo')) === '["sr","lr"]');
check('recargaPeriodos: só curto, só longo e texto sem descanso', () => JSON.stringify(recargaPeriodos('Descanso curto')) === '["sr"]' && JSON.stringify(recargaPeriodos('Descanso longo')) === '["lr"]' && recargaPeriodos('Por turno').length === 0 && recargaPeriodos(undefined).length === 0);

/* 2. Segundo Fôlego e Surto de Ação no item do Foundry */
check('Segundo Fôlego (curto ou longo) sai com recarga sr e lr e um único item', () => {
  guerreiro2();
  const items = montarFoundryItems(state.personagem);
  const sf = itemPorNome(items, 'Segundo Fôlego');
  return sf.length === 1 && sf[0].system.uses.max === '1'
    && JSON.stringify(sf[0].system.uses.recovery.map(r => r.period)) === '["sr","lr"]';
});
check('Surto de Ação (descanso curto) sai só com sr', () => {
  guerreiro2();
  const sa = itemPorNome(montarFoundryItems(state.personagem), 'Surto de Ação');
  return sa.length === 1 && JSON.stringify(sa[0].system.uses.recovery.map(r => r.period)) === '["sr"]';
});
check('Recursos do ator (primary/secondary) respeitam sr e lr', () => {
  guerreiro2();
  const res = montarFoundryActor().system.resources;
  return res.primary.label === 'Segundo Fôlego' && res.primary.sr === true && res.primary.lr === true
    && res.secondary.label === 'Surto de Ação' && res.secondary.sr === true && res.secondary.lr === false;
});
check('dedup mantém habilidades sem nome repetido (ex.: Estilo de Luta continua presente)', () => {
  guerreiro2();
  const items = montarFoundryItems(state.personagem);
  return itemPorNome(items, 'Estilo de Luta').length === 1;
});

/* 3. Estrutura de itens (Foundry dnd5e 5.x) */
check('Alvo do JSON: sistema dnd5e 5.3.3 nos metadados', () => {
  guerreiro2();
  const item = montarFoundryItems(state.personagem)[0];
  return FOUNDRY_SYSTEM_VERSION === '5.3.3' && item._stats.systemId === 'dnd5e' && item._stats.systemVersion === '5.3.3';
});
check('advancement é objeto (não array) em classe, subclasse, espécie, antecedente e talentos (5.3.0+)', () => {
  guerreiro2();
  state.personagem.subclasse = 'campeao';
  const items = montarFoundryItems(state.personagem);
  const porTipo = items.filter(i => ['class', 'subclass', 'race', 'background', 'feat'].includes(i.type));
  return porTipo.length > 0 && porTipo.every(i => i.system.advancement === undefined || (typeof i.system.advancement === 'object' && !Array.isArray(i.system.advancement)));
});
check('activities: objeto com chave igual ao _id da atividade (4.0+), em armas e magias', () => {
  novoPersonagem('2014', { classe:'mago', raca:'humano', origem:'sabio', nivel:3, atributos:{forca:8,destreza:14,constituicao:13,inteligencia:16,sabedoria:12,carisma:10} });
  state.personagem.magia.listaMagias = ['Mísseis Mágicos (1º círculo)'];
  const items = montarFoundryItems(state.personagem);
  const alvos = items.filter(i => i.type === 'weapon' || i.type === 'spell');
  return alvos.length > 0 && alvos.every(i => {
    const acts = Object.entries(i.system.activities || {});
    return acts.length === 1 && acts.every(([chave, a]) => chave === a._id && typeof a.type === 'string');
  });
});
check('PV do ator: hp.max e hp.value iguais ao PV calculado (B1)', () => {
  guerreiro2();
  const hp = montarFoundryActor().system.attributes.hp;
  return hp.max === Number(state.personagem.pvMax) && hp.value === hp.max;
});

/* 4. Personalidade: Foundry (import de ui.js lê de volta) e backup */
const personalidadeExemplo = () => ({
  tracos: ['Sou calmo sob pressão.', 'Gosto de contar histórias.'],
  ideais: ['Lealdade', 'Liberdade'],
  vinculos: ['Devo minha vida ao meu mestre.'],
  defeitos: ['Teimoso'],
  descricaoGeral: 'Um soldado aposentado que lê muito.\\nTem medo de cavalos.',
  aparencia: 'Alto, cabelo grisalho.',
  historia: 'Serviu doze anos na guarda da cidade.\\nDepois virou guia.'
});
check('Foundry: personalidade sobrevive a exportar e reimportar (JSON)', () => {
  guerreiro2();
  state.personagem.personalidade = personalidadeExemplo();
  const actor = clone(montarFoundryActor());
  aplicarActorFoundryNaFicha(actor);
  const lido = state.personagem.personalidade;
  const esperado = personalidadeExemplo();
  return ['tracos', 'ideais', 'vinculos', 'defeitos'].every(k => JSON.stringify(lido[k]) === JSON.stringify(esperado[k]))
    && lido.descricaoGeral === esperado.descricaoGeral
    && lido.aparencia === esperado.aparencia
    && lido.historia === esperado.historia;
});
check('Foundry: biografia não guarda HTML nem repete traços (sem <p>, sem "Traços:")', () => {
  guerreiro2();
  state.personagem.personalidade = personalidadeExemplo();
  const bio = montarFoundryActor().system.details.biography;
  return !/[<>]/.test(bio.value) && !/[<>]/.test(bio.public) && bio.value === personalidadeExemplo().descricaoGeral && !/Traços/.test(bio.value);
});
check('Backup: personalidade completa sobrevive a exportar e reimportar', () => {
  guerreiro2();
  state.personagem.personalidade = personalidadeExemplo();
  const payload = clone(montarPayloadExportacao());
  aplicarPayloadBackupNaFicha(payload);
  return JSON.stringify(state.personagem.personalidade) === JSON.stringify(personalidadeExemplo());
});

/* 5. Antecedentes em inglês (B6) */
check('Todo antecedente de 2014 e 2024 tem nome em inglês no mapa de exportação', () => {
  return ['2014', '2024'].every(ed => {
    aplicarCatalogoRegras(ed);
    const ok = Object.keys(BACKGROUNDS).every(k => /^[A-Za-z' ]+$/.test(FOUNDRY_BACKGROUND_EN_MAP[k] || ''));
    return ok;
  });
});
check('Antecedente de 2024 sai em inglês no item do Foundry (ex.: Artesão -> Artisan)', () => {
  novoPersonagem('2024', { classe:'guerreiro', origem:'artesao', nivel:1, atributos:{forca:15,destreza:14,constituicao:13,inteligencia:8,sabedoria:12,carisma:10}, bonusOrigem2024:{formato:'2_1', mais2:'forca', mais1:'constituicao', tres:[]} });
  const bg = montarFoundryItems(state.personagem).find(i => i.type === 'background');
  return bg && bg.name === 'Artisan';
});
check('2014 e 2024: rótulo do antecedente nunca sai com acento (sem fallback em português)', () => {
  return ['2014', '2024'].every(ed => {
    aplicarCatalogoRegras(ed);
    return Object.keys(BACKGROUNDS).every(k => {
      novoPersonagem(ed, { classe:'guerreiro', origem:k, nivel:1, atributos:{forca:15,destreza:14,constituicao:13,inteligencia:8,sabedoria:12,carisma:10}, bonusOrigem2024: ed === '2024' ? {formato:'2_1', mais2:'forca', mais1:'constituicao', tres:[]} : null });
      const bg = montarFoundryItems(state.personagem).find(i => i.type === 'background');
      return bg && /^[A-Za-z' ]+$/.test(bg.name);
    });
  });
});

/* 6. Roll20 (OGL) */
const campos = () => montarAtributosRoll20();
const nomes = () => campos().map(a => a.name);
check('Roll20: CA gravada em "ac"; custom_ac e custom_ac_flag não são mais gerados', () => {
  guerreiro2();
  const ns = nomes();
  const ac = campos().find(a => a.name === 'ac');
  return ac && ac.current === String(state.personagem.combate.classeArmadura || 10) && !ns.includes('custom_ac') && !ns.includes('custom_ac_flag');
});
check('Roll20: initiative_bonus não é gravado (zeraria a iniciativa)', () => { guerreiro2(); return !nomes().includes('initiative_bonus'); });
check('Roll20: hp com max igual ao PV e atributos base por nome (strength_base)', () => {
  guerreiro2();
  const hp = campos().find(a => a.name === 'hp');
  return hp && hp.max === String(state.personagem.pvMax) && nomes().includes('strength_base') && nomes().includes('dexterity_base');
});
check('Roll20: campos repetidos têm id do tipo -XXXX (19 caracteres) e o nome do campo', () => {
  novoPersonagem('2014', { classe:'guerreiro', nivel:3, atributos:{forca:15,destreza:14,constituicao:13,inteligencia:8,sabedoria:12,carisma:10} });
  const rep = nomes().filter(n => n.startsWith('repeating_'));
  return rep.length > 0 && rep.every(n => /^repeating_[a-z0-9-]+_-[A-Za-z0-9_-]{19}_[a-z_]+$/.test(n));
});
check('Roll20: espaços de magia usam lvlN_slots_total/expended (N de 1 a 9)', () => {
  novoPersonagem('2014', { classe:'mago', nivel:5, atributos:{forca:8,destreza:14,constituicao:13,inteligencia:16,sabedoria:12,carisma:10} });
  const slots = nomes().filter(n => /slots/.test(n));
  return slots.length > 0 && slots.every(n => /^lvl[1-9]_slots_(total|expended)$/.test(n));
});
check('Roll20: script de API gerado contém o JSON dos campos e não usa custom_ac', () => {
  guerreiro2();
  const script = gerarScriptRoll20();
  return /DADOS = \{/.test(script) && !/custom_ac/.test(script) && script.includes('"name": "ac"');
});

console.log(JSON.stringify(results, null, 2));
const falhas = results.filter(r => !r.ok);
console.log('Total: ' + results.length + ' | ok: ' + (results.length - falhas.length) + ' | falhas: ' + falhas.length);
if(falhas.length) process.exit(1);
`;
vm.runInContext(code, ctx);
