'use strict';
/* Imagem do investigador: validação, salvamento local, backup JSON (importação recusa imagem inválida) e dossiê em PDF. */
const assert = require('assert');
const { criarAmbiente, estadoExemplo, criarRunner } = require('./ambiente');
const { ctx, chamar, val } = criarAmbiente();
const { teste, fim } = criarRunner('test_imagem.js');

/* localStorage de teste: o storage.js grava nele quando não há VFTool. */
const memoria = {};
ctx.localStorage = {
  getItem: k => (k in memoria ? memoria[k] : null),
  setItem: (k, v) => { memoria[k] = String(v); },
  removeItem: k => { delete memoria[k]; }
};

const JPEG_OK = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAEAAQDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAHCf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ADoDFU3/2Q==';
const PNG_OK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAEAQMAAACT';

function estadoComImagem(src){
  const e = estadoExemplo();
  e.investigador.imagem = src;
  return e;
}

teste('Validação: aceita JPEG e PNG em base64; rejeita svg, html, gif, javascript, aspas, vazio e não-texto', () => {
  assert.ok(val(`cocImagemValida(${JSON.stringify(JPEG_OK)})`));
  assert.ok(val(`cocImagemValida(${JSON.stringify(PNG_OK)})`));
  const ruins = ['data:image/svg+xml;base64,PHN2Zz4=', 'data:text/html;base64,PGI+', 'data:image/gif;base64,R0lGODlhAQABAAAA',
    'javascript:alert(1)', 'data:image/jpeg;base64,', 'data:image/jpeg;base64,AAAA"onerror="x', '', null, 7];
  ruins.forEach(r => assert.strictEqual(val(`cocImagemValida(${JSON.stringify(r)})`), false, String(r)));
  assert.strictEqual(val(`cocImagemValida(${JSON.stringify('data:image/jpeg;base64,' + 'A'.repeat(400001))})`), false);
});

teste('Investigador sem o campo imagem (ficha antiga) abre com imagem vazia', () => {
  const e = estadoExemplo(); delete e.investigador.imagem;
  const out = chamar('garantirEstado', e);
  assert.strictEqual(out.investigador.imagem, '');
});

teste('Imagem inválida guardada no estado é descartada ao abrir', () => {
  const out = chamar('garantirEstado', estadoComImagem('data:text/html;base64,PGI+'));
  assert.strictEqual(out.investigador.imagem, '');
});

teste('Salvar com imagem, recarregar: imagem preservada', () => {
  ctx.salvarEstado(chamar('garantirEstado', estadoComImagem(JPEG_OK)));
  const lido = chamar('carregarEstado');
  assert.strictEqual(lido.investigador.imagem, JPEG_OK);
  assert.strictEqual(lido.investigador.nome, estadoExemplo().investigador.nome);
});

teste('Salvar sem imagem e recarregar: imagem vazia', () => {
  ctx.salvarEstado(chamar('garantirEstado', estadoComImagem('')));
  assert.strictEqual(chamar('carregarEstado').investigador.imagem, '');
});

teste('Backup JSON leva a imagem e a importação a devolve', () => {
  const texto = chamar('exportarBackupJson', estadoComImagem(JPEG_OK));
  assert.strictEqual(JSON.parse(texto).estado.investigador.imagem, JPEG_OK);
  const r = val(`importarBackupJson(${JSON.stringify(texto)})`);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.estado.investigador.imagem, JPEG_OK);
});

teste('Backup PNG válido é aceito na importação', () => {
  const r = val(`importarBackupJson(${JSON.stringify(chamar('exportarBackupJson', estadoComImagem(PNG_OK)))})`);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.estado.investigador.imagem, PNG_OK);
});

teste('Backup antigo, sem imagem, importa com imagem vazia', () => {
  const p = JSON.parse(chamar('exportarBackupJson', estadoExemplo()));
  delete p.estado.investigador.imagem;
  const r = val(`importarBackupJson(${JSON.stringify(JSON.stringify(p))})`);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.estado.investigador.imagem, '');
});

teste('Backup com imagem inválida é recusado com mensagem', () => {
  const p = JSON.parse(chamar('exportarBackupJson', estadoExemplo()));
  p.estado.investigador.imagem = 'data:image/svg+xml;base64,PHN2Zz4=';
  const r = val(`importarBackupJson(${JSON.stringify(JSON.stringify(p))})`);
  assert.strictEqual(r.ok, false);
  assert.match(r.erro, /Imagem/);
});

teste('Dossiê em PDF com imagem: retrato na primeira página, no cabeçalho', () => {
  const html = chamar('gerarHtmlDossie', estadoComImagem(JPEG_OK));
  assert.ok(html.includes('<img class="retrato" src="' + JPEG_OK + '"'));
  assert.ok(html.includes('<header class="cab comRetrato">'));
  assert.strictEqual(html.split('class="retrato"').length - 1, 1, 'retrato só na primeira página');
});

teste('Dossiê em PDF sem imagem: sem retrato', () => {
  const html = chamar('gerarHtmlDossie', estadoExemplo());
  assert.ok(!html.includes('class="retrato"'));
  assert.ok(!html.includes('<header class="cab comRetrato">'));
});

fim();
