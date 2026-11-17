'use strict';
/* Backup JSON: formato {sistema, versaoEsquema}, ida e volta, e recusa do que não é deste sistema ou versão. */
const assert = require('assert');
const { criarAmbiente, estadoExemplo, criarRunner } = require('./ambiente');
const { chamar } = criarAmbiente();
const { teste, fim } = criarRunner('test_backup.js');

teste('Exporta com sistema "coc7" e versaoEsquema 1', () => {
  const texto = chamar('exportarBackupJson', estadoExemplo());
  const p = JSON.parse(texto);
  assert.strictEqual(p.sistema, "coc7");
  assert.strictEqual(p.versaoEsquema, 1);
  assert.ok(p.estado && p.estado.investigador, "sem estado");
  assert.ok(p.exportadoEm, "sem data");
});
teste('Ida e volta: exporta, importa e o estado volta igual', () => {
  const original = estadoExemplo();
  const texto = chamar('exportarBackupJson', original);
  const r = chamar('importarBackupJson', texto);
  assert.strictEqual(r.ok, true, r.erro);
  const esperado = chamar('garantirEstado', original);
  assert.deepStrictEqual(r.estado, esperado);
});
teste('Ida e volta com a ficha inicial (vazia) também bate', () => {
  const inicial = chamar('criarEstadoInicial');
  const r = chamar('importarBackupJson', chamar('exportarBackupJson', inicial));
  assert.strictEqual(r.ok, true);
  assert.deepStrictEqual(r.estado, chamar('garantirEstado', inicial));
});
teste('Ida e volta preserva acentos e aspas nos textos', () => {
  const e = estadoExemplo();
  e.investigador.nome = 'Maria "Mimi" da Conceição';
  e.investigador.antecedentes.historia = "Linha 1\nLinha 2 — ação";
  const r = chamar('importarBackupJson', chamar('exportarBackupJson', e));
  assert.strictEqual(r.estado.investigador.nome, e.investigador.nome);
  assert.strictEqual(r.estado.investigador.antecedentes.historia, e.investigador.antecedentes.historia);
});
teste('Recusa backup de outro sistema', () => {
  const p = { sistema: "dnd5e", versaoEsquema: 1, estado: estadoExemplo() };
  const r = chamar('importarBackupJson', JSON.stringify(p));
  assert.strictEqual(r.ok, false);
  assert.ok(r.erro.includes("outro sistema"), r.erro);
});
teste('Recusa versão de esquema diferente de 1', () => {
  const p = { sistema: "coc7", versaoEsquema: 2, estado: estadoExemplo() };
  const r = chamar('importarBackupJson', JSON.stringify(p));
  assert.strictEqual(r.ok, false);
  assert.ok(r.erro.includes("Versão"), r.erro);
});
teste('Recusa backup sem versão', () => {
  assert.strictEqual(chamar('importarBackupJson', JSON.stringify({ sistema: "coc7", estado: estadoExemplo() })).ok, false);
});
teste('Recusa texto que não é JSON', () => {
  assert.strictEqual(chamar('importarBackupJson', "{ isto não é json").ok, false);
});
teste('Recusa lista e JSON sem estado', () => {
  assert.strictEqual(chamar('importarBackupJson', "[1,2,3]").ok, false);
  assert.strictEqual(chamar('importarBackupJson', JSON.stringify({ sistema: "coc7", versaoEsquema: 1 })).ok, false);
});
teste('Backup antigo parcial recebe os campos que faltam', () => {
  const p = { sistema: "coc7", versaoEsquema: 1, estado: { investigador: { nome: "Antigo" } } };
  const r = chamar('importarBackupJson', JSON.stringify(p));
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.estado.investigador.nome, "Antigo");
  assert.ok(r.estado.investigador.caracteristicas && "for" in r.estado.investigador.caracteristicas, "sem características");
  assert.strictEqual(r.estado.modo, "estrito");
  assert.strictEqual(r.estado.etapa >= 1, true);
});
fim();
