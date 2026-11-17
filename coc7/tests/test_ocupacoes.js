'use strict';
/* Ocupações da 7ª ed. (coc7/rules-ocupacoes.js), em ambiente vm como os outros testes.
   Confere: fórmula válida, crédito mínimo ≤ máximo, perícias existentes em COC_PERICIAS, `fonte` em todas,
   status confirmada/NÃO VERIFICADO, e que as dez originais de rules.js mantêm fórmula, crédito e perícias.
   Uso: node coc7/tests/test_ocupacoes.js (sai com código ≠ 0 se algo falhar). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const { criarAmbiente, criarRunner, DIR } = require('./ambiente');
const { ctx, val, chamar } = criarAmbiente();
const { teste, fim } = criarRunner('test_ocupacoes.js');

const ORIGINAIS_ANTES = val('COC_OCUPACOES');
vm.runInContext(fs.readFileSync(path.join(DIR, 'rules-ocupacoes.js'), 'utf8'), ctx, { filename: 'rules-ocupacoes.js' });
const OCUP = val('COC_OCUPACOES');

const CARAC = val('COC_CARACTERISTICAS').map(c => c.id);
const PERICIAS = val('COC_PERICIAS').map(p => p.id);
const ORIGINAIS = ORIGINAIS_ANTES.map(o => o.id);
const NOVAS = ['antiquario', 'medico', 'detetive_policial', 'espiao', 'agente_federal', 'chefe_gangue', 'fotografo', 'cacador', 'pesquisador'];
const CONFIRMADAS = ['antiquario', 'medico', 'autor', 'jornalista', 'professor', 'soldado'];

teste('São 10 originais mais 9 novas, sem id repetido', () => {
  const ids = OCUP.map(o => o.id);
  assert.strictEqual(new Set(ids).size, ids.length, 'id repetido');
  assert.strictEqual(OCUP.length, 19, 'total ' + OCUP.length);
  [...ORIGINAIS, ...NOVAS].forEach(id => assert.ok(ids.includes(id), 'falta ' + id));
});

teste('Toda fórmula é válida: termos com característica existente e multiplicador inteiro > 0', () => {
  const termoOk = t => CARAC.includes(t.c) && Number.isInteger(t.m) && t.m > 0;
  OCUP.forEach(o => {
    assert.ok(Array.isArray(o.formula.base) && o.formula.base.length > 0, o.id + ': base vazia');
    assert.ok(o.formula.base.every(termoOk), o.id + ': termo base inválido');
    if(o.formula.alternativas){
      assert.ok(o.formula.alternativas.length > 0, o.id + ': alternativas vazias');
      o.formula.alternativas.forEach((alt, k) => {
        assert.ok(Array.isArray(alt) && alt.length > 0 && alt.every(termoOk), o.id + ': alternativa ' + k + ' inválida');
      });
    }
  });
});

teste('Crédito: par de números com mínimo ≤ máximo, entre 0 e 99', () => {
  OCUP.forEach(o => {
    const [min, max] = o.credito;
    assert.ok(Number.isInteger(min) && Number.isInteger(max), o.id + ': não numérico');
    assert.ok(min >= 0 && max <= 99, o.id + ': fora de 0 a 99');
    assert.ok(min <= max, o.id + ': mínimo ' + min + ' > máximo ' + max);
  });
});

teste('Perícias fixas, de grupo e livres existem em COC_PERICIAS, sem repetir', () => {
  OCUP.forEach(o => {
    o.pericias.forEach(p => assert.ok(PERICIAS.includes(p), o.id + ': perícia inexistente ' + p));
    o.grupos.forEach(g => {
      g.opcoes.forEach(p => assert.ok(PERICIAS.includes(p), o.id + ': opção inexistente ' + p));
      assert.ok(g.n >= 1 && g.n <= g.opcoes.length, o.id + ': n do grupo ' + g.rotulo);
      assert.ok(g.opcoes.every(p => !o.pericias.includes(p)), o.id + ': grupo repete perícia fixa');
    });
    assert.ok(Number.isInteger(o.livres) && o.livres >= 0, o.id + ': livres');
  });
});

teste('Toda ocupação tem fonte; nv e o texto da fonte batem', () => {
  OCUP.forEach(o => {
    assert.ok(typeof o.fonte === 'string' && o.fonte.length > 10, o.id + ': sem fonte');
    assert.strictEqual(typeof o.nv, 'boolean', o.id + ': nv');
    if(o.nv) assert.ok(o.fonte.includes('NÃO VERIFICADO'), o.id + ': nv sem NÃO VERIFICADO na fonte');
    else assert.ok(o.fonte.includes('CONFIRMADO em 2 fontes'), o.id + ': confirmada sem texto de 2 fontes');
  });
});

teste('Status: só as seis ocupações com duas fontes que concordam estão confirmadas', () => {
  const confirmadas = OCUP.filter(o => !o.nv).map(o => o.id).sort();
  assert.deepStrictEqual(confirmadas, [...CONFIRMADAS].sort());
});

teste('As dez originais mantêm fórmula, crédito e perícias (só ganham fonte e nv)', () => {
  ORIGINAIS_ANTES.forEach(b => {
    const agora = OCUP.find(o => o.id === b.id);
    ['formula', 'credito', 'pericias', 'grupos', 'livres'].forEach(k =>
      assert.deepStrictEqual(agora[k], b[k], b.id + ' mudou ' + k));
  });
});

teste('Casos conferidos à mão: pontos de ocupação pela fórmula (motor, poolOcupacao)', () => {
  const casos = [
    { id: 'medico', alt: null, car: { edu: 65 }, esperado: 260 },
    { id: 'antiquario', alt: null, car: { edu: 75 }, esperado: 300 },
    { id: 'espiao', alt: 0, car: { edu: 60, apa: 50, des: 55 }, esperado: 220 },
    { id: 'espiao', alt: 1, car: { edu: 60, apa: 50, des: 55 }, esperado: 230 },
    { id: 'cacador', alt: 1, car: { edu: 60, for: 70, des: 50 }, esperado: 260 },
    { id: 'chefe_gangue', alt: null, car: { edu: 70, apa: 45 }, esperado: 230 }
  ];
  casos.forEach(c => {
    const total = chamar('poolOcupacao', { ocupacaoId: c.id, ocupacaoAlt: c.alt }, c.car);
    assert.strictEqual(total, c.esperado, c.id + ' alt ' + c.alt);
  });
});

fim();
