/* Imagem do personagem: validação, salvamento local, backup JSON (importação recusa imagem inválida) e PDF. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const JPEG_OK = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAEAAQDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAHCf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ADoDFU3/2Q==";
const PNG_OK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAEAQMAAACT";
const comImagem = src => `(() => { substituirEstado(estadoPadrao()); state.personagem.nome = "Aléxia Sá"; state.personagem.imagem = ${JSON.stringify(src)}; return true; })()`;

teste("validação: aceita JPEG e PNG em base64; rejeita svg, html, gif, javascript, aspas, vazio e não-texto", () => {
  assert.strictEqual(avaliar(ctx, `tdtImagemValida(${JSON.stringify(JPEG_OK)})`), true);
  assert.strictEqual(avaliar(ctx, `tdtImagemValida(${JSON.stringify(PNG_OK)})`), true);
  const ruins = ["data:image/svg+xml;base64,PHN2Zz4=", "data:text/html;base64,PGI+", "data:image/gif;base64,R0lGODlhAQABAAAA",
    "javascript:alert(1)", "data:image/jpeg;base64,", 'data:image/jpeg;base64,AAAA"onerror="x', "", null, 7];
  ruins.forEach(r => assert.strictEqual(avaliar(ctx, `tdtImagemValida(${JSON.stringify(r)})`), false, String(r)));
  assert.strictEqual(avaliar(ctx, `tdtImagemValida(${JSON.stringify("data:image/jpeg;base64," + "A".repeat(400001))})`), false);
});

teste("ficha antiga, sem o campo imagem, abre com imagem vazia", () => {
  const v = avaliar(ctx, "(() => { const s = estadoPadrao(); delete s.personagem.imagem; substituirEstado(s); return state.personagem.imagem; })()");
  assert.strictEqual(v, "");
});

teste("imagem inválida guardada no estado é descartada ao abrir", () => {
  const v = avaliar(ctx, `(() => { substituirEstado(estadoPadrao()); state.personagem.imagem = "data:text/html;base64,PGI+"; ensureStateShape(); return state.personagem.imagem; })()`);
  assert.strictEqual(v, "");
});

teste("salvar com imagem, recarregar: imagem preservada", () => {
  const v = avaliar(ctx, `(() => { ${comImagem(JPEG_OK)}; salvarEstado(); substituirEstado(estadoPadrao()); carregarEstado(); return [state.personagem.imagem, state.personagem.nome]; })()`);
  assert.deepStrictEqual(v, [JPEG_OK, "Aléxia Sá"]);
});

teste("salvar sem imagem e recarregar: imagem vazia", () => {
  const v = avaliar(ctx, `(() => { ${comImagem("")}; salvarEstado(); substituirEstado(estadoPadrao()); carregarEstado(); return state.personagem.imagem; })()`);
  assert.strictEqual(v, "");
});

teste("backup JSON leva a imagem e a importação a devolve", () => {
  const b = avaliar(ctx, `(() => { ${comImagem(JPEG_OK)}; return montarBackup(); })()`);
  assert.strictEqual(b.estado.personagem.imagem, JPEG_OK);
  const r = avaliar(ctx, `lerBackup(${JSON.stringify(JSON.stringify(b))})`);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.estado.personagem.imagem, JPEG_OK);
});

teste("backup com PNG válido é aceito na importação", () => {
  const b = avaliar(ctx, `(() => { ${comImagem(PNG_OK)}; return montarBackup(); })()`);
  const r = avaliar(ctx, `lerBackup(${JSON.stringify(JSON.stringify(b))})`);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.estado.personagem.imagem, PNG_OK);
});

teste("backup antigo, sem campo imagem, importa com imagem vazia", () => {
  const b = avaliar(ctx, `(() => { substituirEstado(estadoPadrao()); return montarBackup(); })()`);
  delete b.estado.personagem.imagem;
  const r = avaliar(ctx, `lerBackup(${JSON.stringify(JSON.stringify(b))})`);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.estado.personagem.imagem, "");
});

teste("backup com imagem inválida é recusado com mensagem, sem alterar a ficha atual", () => {
  const b = avaliar(ctx, `(() => { ${comImagem(JPEG_OK)}; return montarBackup(); })()`);
  b.estado.personagem.imagem = "data:image/svg+xml;base64,PHN2Zz4=";
  const r = avaliar(ctx, `lerBackup(${JSON.stringify(JSON.stringify(b))})`);
  assert.strictEqual(r.ok, false);
  assert.match(r.erro, /Imagem/);
  const atual = avaliar(ctx, `(() => { ${comImagem(JPEG_OK)}; lerBackup(${JSON.stringify(JSON.stringify(b))}); return [state.personagem.nome, state.personagem.imagem]; })()`);
  assert.deepStrictEqual(atual, ["Aléxia Sá", JPEG_OK]);
});

const PNG_ALFA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEElEQVR4nGP4zwAH/6HsBgAlcAN+++VAswAAAABJRU5ErkJggg==";
const PNG_GRANDE = "data:image/png;base64," + "A".repeat(400001);

teste("formato: PNG com transparência fica PNG (canal alfa, tipo de cor 6), sem aviso", () => {
  const r = avaliar(ctx, `tdtEscolherFormatoImagem("image/png", () => ${JSON.stringify(PNG_ALFA)}, () => ${JSON.stringify(JPEG_OK)})`);
  assert.strictEqual(r.dados, PNG_ALFA);
  assert.strictEqual(r.aviso, "");
  assert.strictEqual(Buffer.from(r.dados.split(",")[1], "base64")[25], 6);
});

teste("formato: PNG grande que estoura o limite cai para JPEG com aviso", () => {
  const r = avaliar(ctx, `tdtEscolherFormatoImagem("image/png", () => ${JSON.stringify(PNG_GRANDE)}, () => ${JSON.stringify(JPEG_OK)})`);
  assert.strictEqual(r.dados, JPEG_OK);
  assert.match(r.aviso, /JPEG/);
});

teste("formato: JPEG continua JPEG, sem aviso e sem tentar PNG", () => {
  const r = avaliar(ctx, `(() => {
    let tentou = false;
    const e = tdtEscolherFormatoImagem("image/jpeg", () => { tentou = true; return ${JSON.stringify(PNG_ALFA)}; }, () => ${JSON.stringify(JPEG_OK)});
    return { dados: e.dados, aviso: e.aviso, tentou };
  })()`);
  assert.strictEqual(r.dados, JPEG_OK);
  assert.strictEqual(r.aviso, "");
  assert.strictEqual(r.tentou, false);
});

teste("PDF com imagem: retrato no cabeçalho da primeira página", () => {
  const html = avaliar(ctx, `(() => { ${comImagem(JPEG_OK)}; return tdtFichaHtml(); })()`);
  assert.ok(html.includes('<img class="retrato" src="' + JPEG_OK + '"'));
  assert.ok(html.includes('<header class="topo comRetrato">'));
  assert.strictEqual(html.split('class="retrato"').length - 1, 1, "retrato só na primeira página");
});

teste("PDF sem imagem: sem retrato", () => {
  const html = avaliar(ctx, `(() => { substituirEstado(estadoPadrao()); return tdtFichaHtml(); })()`);
  assert.ok(!html.includes('class="retrato"'));
  assert.ok(!html.includes('<header class="topo comRetrato">'));
});

sair("imagem do personagem");
