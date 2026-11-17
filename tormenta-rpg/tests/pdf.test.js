/* PDF: duas páginas A4, escape de texto do usuário e cor de destaque padrão enquanto não há classes verificadas. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();

teste("o HTML da ficha tem exatamente duas páginas A4", () => {
  const n = avaliar(ctx, `(() => { substituirEstado(estadoPadrao()); return (trpgFichaHtml().match(/class="pagina"/g) || []).length; })()`);
  assert.strictEqual(n, 2);
});

teste("texto do usuário é escapado (nome com marcação não vira HTML)", () => {
  const html = avaliar(ctx, `(() => { const s = estadoPadrao(); s.personagem.nome = '<img src=x onerror="z()">'; substituirEstado(s); return trpgFichaHtml(); })()`);
  assert.ok(!html.includes("<img src=x"), "marcação do nome foi inserida sem escape");
  assert.ok(html.includes("&lt;img"));
});

teste("sem classe verificada, o destaque é o padrão (nenhuma cor de classe inventada)", () => {
  assert.deepStrictEqual(avaliar(ctx, "Object.keys(TRPG_ACENTOS)"), []);
  assert.strictEqual(avaliar(ctx, 'trpgAcentoDaClasse("qualquer")'), "#8a5200");
});

teste("aviso de VTT está presente na ficha, dizendo que não há exportação", () => {
  const html = avaliar(ctx, "trpgFichaHtml()");
  assert.ok(/VTT/.test(html) && /não existe VTT verificado/.test(html));
});

sair("pdf");
