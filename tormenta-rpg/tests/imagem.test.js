/* Imagem do personagem: guarda como data URL, salva e recarrega, entra no backup, aparece no PDF (page 1) e é validada na importação. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();
const JPEG = "data:image/jpeg;base64,/9j/4AAQSkZJRg==";
const PNG = "data:image/png;base64,iVBORw0KGgo=";

teste("salvar com imagem, recarregar: imagem preservada", () => {
  const r = avaliar(ctx, `(() => {
    substituirEstado(estadoPadrao());
    state.tela = "ficha"; state.personagem.nome = "Aléxia";
    state.personagem.imagem = ${JSON.stringify(JPEG)};
    salvarEstado();
    substituirEstado(estadoPadrao());
    carregarEstado();
    return { imagem: state.personagem.imagem, nome: state.personagem.nome };
  })()`);
  assert.strictEqual(r.imagem, JPEG);
  assert.strictEqual(r.nome, "Aléxia");
});

teste("ficha sem imagem (salva antes do recurso) abre sem erro e com imagem vazia", () => {
  const r = avaliar(ctx, `(() => {
    localStorage.setItem("tormenta-rpg:estado:v1", JSON.stringify({ etapa: 1, tela: "ficha", modo: "livre", currentHistoryId: null, personagem: { nome: "Antiga" } }));
    carregarEstado();
    return { imagem: state.personagem.imagem, nome: state.personagem.nome, html: trpgFichaHtml() };
  })()`);
  assert.strictEqual(r.imagem, "");
  assert.strictEqual(r.nome, "Antiga");
  assert.ok(!r.html.includes('class="retrato"'));
});

teste("backup antigo sem o campo importa com imagem vazia", () => {
  const r = avaliar(ctx, `lerBackup(JSON.stringify({ sistema: "tormenta-rpg", versaoEsquema: 1, personagem: { nome: "Velha", nivel: 2 } }))`);
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.estado.personagem.imagem, "");
});

teste("backup inclui a imagem e a devolve após importar", () => {
  const r = avaliar(ctx, `(() => {
    substituirEstado(estadoPadrao());
    state.personagem.imagem = ${JSON.stringify(PNG)};
    const b = montarBackup();
    const lido = lerBackup(JSON.stringify(b));
    return { noBackup: b.personagem.imagem, depois: lido.ok ? lido.estado.personagem.imagem : lido.erro };
  })()`);
  assert.strictEqual(r.noBackup, PNG);
  assert.strictEqual(r.depois, PNG);
});

const recusaImagem = (valor) => {
  const r = avaliar(ctx, `lerBackup(${JSON.stringify(JSON.stringify({ sistema: "tormenta-rpg", versaoEsquema: 1, personagem: { imagem: valor } }))})`);
  assert.strictEqual(r.ok, false, "esperava recusar: " + String(valor).slice(0, 40));
  assert.ok(r.erro.includes("Imagem"), "mensagem deveria citar a imagem, veio: " + r.erro);
};

teste("JSON inválido: recusa imagem com esquema javascript:", () => recusaImagem("javascript:alert(1)"));
teste("JSON inválido: recusa data URL de GIF", () => recusaImagem("data:image/gif;base64,R0lGODlhAQABAAAAACw="));
teste("JSON inválido: recusa aspas que tentariam sair do atributo src", () => recusaImagem('data:image/jpeg;base64,AAAA" onerror="x'));
teste("JSON inválido: recusa imagem acima do limite de tamanho", () => recusaImagem("data:image/jpeg;base64," + "A".repeat(400001)));
teste("JSON inválido: recusa campo que não é texto", () => recusaImagem(12345));

teste("dado salvo corrompido é zerado ao carregar (não vira src)", () => {
  const r = avaliar(ctx, `(() => {
    localStorage.setItem("tormenta-rpg:estado:v1", JSON.stringify({ tela: "ficha", personagem: { nome: "X", imagem: "javascript:1" } }));
    carregarEstado();
    return state.personagem.imagem;
  })()`);
  assert.strictEqual(r, "");
});

teste("PDF: com imagem, há uma única <img> na página 1 e a ficha continua com 2 páginas", () => {
  const r = avaliar(ctx, `(() => {
    substituirEstado(estadoPadrao());
    state.personagem.imagem = ${JSON.stringify(JPEG)};
    const html = trpgFichaHtml();
    return { imgs: (html.match(/<img class="retrato"/g) || []).length, paginas: (html.match(/class="pagina"/g) || []).length, trecho: html.includes('src="' + ${JSON.stringify(JPEG)} + '"') };
  })()`);
  assert.strictEqual(r.imgs, 1);
  assert.strictEqual(r.paginas, 2);
  assert.strictEqual(r.trecho, true);
});

teste("PDF: sem imagem, não há <img> na ficha", () => {
  const html = avaliar(ctx, `(() => { substituirEstado(estadoPadrao()); return trpgFichaHtml(); })()`);
  assert.ok(!html.includes("<img"));
});

teste("PDF: a imagem fica no bloco da página 1 (antes da segunda página)", () => {
  const pos = avaliar(ctx, `(() => {
    substituirEstado(estadoPadrao());
    state.personagem.imagem = ${JSON.stringify(JPEG)};
    const html = trpgFichaHtml();
    return { img: html.indexOf("<img"), p2: html.indexOf('class="pagina"', html.indexOf('class="pagina"') + 1) };
  })()`);
  assert.ok(pos.img > 0 && pos.img < pos.p2);
});

const PNG_ALFA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEElEQVR4nGP4zwAH/6HsBgAlcAN+++VAswAAAABJRU5ErkJggg==";
const PNG_GRANDE = "data:image/png;base64," + "A".repeat(400001);

teste("formato: PNG com transparência fica PNG (canal alfa, tipo de cor 6), sem aviso", () => {
  const r = avaliar(ctx, `(() => {
    const e = trpgEscolherFormatoImagem("image/png", () => ${JSON.stringify(PNG_ALFA)}, () => ${JSON.stringify(JPEG)});
    return e;
  })()`);
  assert.strictEqual(r.data, PNG_ALFA);
  assert.strictEqual(r.aviso, "");
  assert.strictEqual(Buffer.from(r.data.split(",")[1], "base64")[25], 6);
});

teste("formato: PNG que estoura o limite cai para JPEG com aviso", () => {
  const r = avaliar(ctx, `trpgEscolherFormatoImagem("image/png", () => ${JSON.stringify(PNG_GRANDE)}, () => ${JSON.stringify(JPEG)})`);
  assert.strictEqual(r.data, JPEG);
  assert.ok(r.aviso.includes("JPEG"), "aviso deveria citar JPEG");
});

teste("formato: JPEG continua JPEG, sem aviso e sem tentar PNG", () => {
  const r = avaliar(ctx, `(() => {
    let tentou = false;
    const e = trpgEscolherFormatoImagem("image/jpeg", () => { tentou = true; return ${JSON.stringify(PNG_ALFA)}; }, () => ${JSON.stringify(JPEG)});
    return { data: e.data, aviso: e.aviso, tentou };
  })()`);
  assert.strictEqual(r.data, JPEG);
  assert.strictEqual(r.aviso, "");
  assert.strictEqual(r.tentou, false);
});

teste("limite do redimensionamento: 300 px no maior lado e JPEG 0.8", () => {
  assert.strictEqual(avaliar(ctx, "TRPG_IMAGEM.ladoMaximo"), 300);
  assert.strictEqual(avaliar(ctx, "TRPG_IMAGEM.qualidade"), 0.8);
  assert.strictEqual(avaliar(ctx, "TRPG_IMAGEM.maxBytesOriginal"), 5 * 1024 * 1024);
});

teste("aviso da imagem fica na ficha: sobrevive a re-renderizações e some ao trocar ou remover a imagem", () => {
  const r = avaliar(ctx, `(() => {
    const AV = "A imagem PNG era grande demais para guardar com transparência; foi guardada como JPEG com fundo branco.";
    state.personagem.imagem = ${JSON.stringify(JPEG)};
    trpgAvisoImagem = { para: state.personagem.imagem, texto: AV };
    const a = trpgCorpoEtapa(1).includes(AV), b = trpgCorpoEtapa(1).includes(AV);
    state.personagem.imagem = ${JSON.stringify(PNG)}; const trocou = !trpgCorpoEtapa(1).includes(AV);
    state.personagem.imagem = ""; trpgAvisoImagem = { para: "", texto: "" };
    return { sobreviveu: a && b, trocou, removeu: !trpgCorpoEtapa(1).includes(AV) };
  })()`);
  assert.deepStrictEqual(r, { sobreviveu: true, trocou: true, removeu: true });
});

sair("imagem");
