'use strict';
/* Teste de release: referências do index, sintaxe de cada arquivo, funções duplicadas, alert() proibido,
   dossiê com 2 páginas e escape de HTML no PDF. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { criarAmbiente, estadoExemplo, criarRunner, DIR } = require('./ambiente');
const assert = require('assert');
const { chamar, val } = criarAmbiente();
const { teste, fim } = criarRunner('test_release.js');

const ARQUIVOS_JS = ['rules.js', 'rules-ocupacoes.js', 'engine.js', 'state.js', 'validator.js', 'storage.js', 'export.js', 'export-pdf.js', 'ui.js', 'main.js'];
const index = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');

teste('index.html usa o data-tool próprio e o padrão VF Tools', () => {
  assert.ok(/data-tool="coc7-builder"/.test(index), "data-tool");
  assert.ok(/<meta\s+name="viewport"/.test(index), "viewport");
  ['vf/tokens.css', 'vf/components.css', 'vf/motion.css'].forEach(f => assert.ok(index.includes(f.replace('vf/', '../vf/')), f));
  assert.ok(/id="theme"/.test(index) && /id="app"/.test(index), "tema ou app");
  assert.ok(/data-theme="dark"/.test(index), "tema escuro padrão");
});
teste('Todo <script src> e <link href> do index existe', () => {
  const refs = [...index.matchAll(/<(?:script|link)[^>]*?(?:src|href)="([^"]+)"/g)].map(m => m[1]).filter(r => !/^https?:/.test(r) && !r.startsWith('#'));
  const faltam = refs.filter(r => !fs.existsSync(path.resolve(DIR, r)));
  assert.deepStrictEqual(faltam, []);
});
teste('Os scripts do index estão todos na lista de arquivos do sistema', () => {
  const scripts = [...index.matchAll(/<script\s+src="([^"]+)"/g)].map(m => m[1]).filter(s => !s.startsWith('../'));
  assert.deepStrictEqual(scripts.filter(s => !ARQUIVOS_JS.includes(s)), []);
  assert.deepStrictEqual(ARQUIVOS_JS.filter(f => !scripts.includes(f)), []);
});
teste('Cada arquivo JS tem sintaxe válida', () => {
  ARQUIVOS_JS.forEach(f => new vm.Script(fs.readFileSync(path.join(DIR, f), 'utf8'), { filename: f }));
});
teste('Nenhuma função de topo é definida duas vezes no sistema', () => {
  const vistos = new Map(), duplicadas = [];
  ARQUIVOS_JS.forEach(f => {
    for(const m of fs.readFileSync(path.join(DIR, f), 'utf8').matchAll(/^function ([A-Za-z0-9_]+)\(/gm)){
      if(vistos.has(m[1])) duplicadas.push(`${m[1]} em ${vistos.get(m[1])} e ${f}`);
      else vistos.set(m[1], f);
    }
  });
  assert.deepStrictEqual(duplicadas, []);
});
teste('Nenhum alert() bloqueante no sistema', () => {
  const achados = ARQUIVOS_JS.filter(f => /(^|[^A-Za-z_.])alert\(/m.test(fs.readFileSync(path.join(DIR, f), 'utf8')));
  assert.deepStrictEqual(achados, []);
});
teste('Armazenamento só por VFTool ou fallback localStorage com prefixo coc7', () => {
  const st = fs.readFileSync(path.join(DIR, 'storage.js'), 'utf8');
  assert.ok(st.includes('VFTool.get') && st.includes('VFTool.set'), "VFTool");
  assert.ok(st.includes('"coc7:"'), "prefixo");
});
teste('Todo backup e exportação usa sistema "coc7" e versaoEsquema', () => {
  assert.ok(val('COC_SISTEMA') === "coc7" && val('COC_VERSAO_ESQUEMA') === 1);
});
teste('Dados de regra têm fonte ou NÃO VERIFICADO (características, faixas de idade, dano)', () => {
  val('COC_CARACTERISTICAS').forEach(c => assert.ok(c.fonte && c.fonte.length > 5, c.id));
  val('COC_FAIXAS_IDADE').forEach(f => assert.ok(f.fonte, f.rotulo));
  assert.ok(val('COC_DANO_FONTE').length > 5);
  assert.ok(val('COC_PERICIAS_FONTE').length > 5, "fonte das perícias");
  assert.ok(val('COC_FONTE_DERIVADOS').includes("NÃO VERIFICADO"), "Sanidade máxima segue NÃO VERIFICADO");
  assert.ok(val('COC_TETO_PERICIA.aviso') === "regra não confirmada", "teto é aviso");
});
teste('Dossiê em PDF tem exatamente 2 páginas A4 no HTML', () => {
  const html = chamar('gerarHtmlDossie', estadoExemplo());
  const paginas = (html.match(/<article class="pagina">/g) || []).length;
  assert.strictEqual(paginas, 2);
  assert.ok(html.includes("@page{size:A4;margin:0}"), "A4");
});
teste('Dossiê escapa o nome (sem HTML injetado)', () => {
  const e = estadoExemplo();
  e.investigador.nome = '<img src=x onerror="alert(1)">';
  const html = chamar('gerarHtmlDossie', e);
  assert.ok(!html.includes('<img src=x'), "injeção");
  assert.ok(html.includes('&lt;img'), "escape");
});
fim();
