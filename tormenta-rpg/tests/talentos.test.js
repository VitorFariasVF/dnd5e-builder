/* Talentos principais conferidos com o livro Tormenta RPG (Jambô): pré-requisitos, benefício-chave e página PDF.
   Valores esperados digitados à mão a partir do livro (PDF p97, p104, p106, p110, p111), não copiados do app. */
const { criarAmbiente, avaliar } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const ctx = criarAmbiente();

/* id -> [nome, pré-requisitos, página PDF] */
const livro = {
  "usar-armas-simples": ["Usar Armas Simples", [], 104],
  "usar-armas-marciais": ["Usar Armas Marciais", ["Usar Armas Simples"], 104],
  "usar-armas-exoticas": ["Usar Arma Exótica", ["Usar Armas Simples"], 104],
  "usar-armaduras-leves": ["Usar Armaduras Leves", [], 104],
  "usar-armaduras-medias": ["Usar Armaduras Médias", ["Usar Armaduras Leves"], 104],
  "usar-armaduras-pesadas": ["Usar Armaduras Pesadas", ["Usar Armaduras Leves", "Usar Armaduras Médias"], 104],
  "usar-escudos": ["Usar Escudos", [], 104],
  "senso-da-natureza": ["Senso da Natureza", [], 106],
  "rastrear": ["Rastrear", ["Treinado em Sobrevivência"], 106],
  "ataque-desarmado-aprimorado": ["Ataque Desarmado Aprimorado", [], 97],
  "fortitude-maior": ["Fortitude Maior", [], 110],
  "reflexos-rapidos": ["Reflexos Rápidos", [], 111],
  "vontade-de-ferro": ["Vontade de Ferro", [], 111]
};

const talentos = avaliar(ctx, "TRPG_TALENTOS");

teste("os 13 talentos principais do app são exatamente os conferidos com o livro", () => {
  assert.deepStrictEqual(Object.keys(talentos).sort(), Object.keys(livro).sort());
});

Object.entries(livro).forEach(([id, [nome, pre, pagina]]) => {
  teste(`${nome}: pré-requisitos e página conferidos com o livro (PDF p${pagina})`, () => {
    const t = talentos[id];
    assert.strictEqual(t.nome, nome);
    assert.deepStrictEqual(t.pre, pre);
    assert.ok(t.fonte.includes(`PDF p${pagina} `), "fonte deve citar PDF p" + pagina + ": " + t.fonte);
  });
});

teste("Fortitude Maior: +2 de Fortitude, repetível, sem deslocamento (o +3 m é do talento Corrida, PDF p110)", () => {
  const t = talentos["fortitude-maior"];
  assert.ok(t.beneficio.includes("+2 no bônus base de Fortitude"));
  assert.ok(t.beneficio.includes("várias vezes"));
  assert.ok(!/deslocamento|3\s?m/i.test(t.beneficio), "benefício não pode citar deslocamento");
});

teste("Reflexos Rápidos e Vontade de Ferro: +2 no bônus base respectivo, repetíveis", () => {
  assert.ok(talentos["reflexos-rapidos"].beneficio.includes("+2 no bônus base de Reflexos"));
  assert.ok(talentos["vontade-de-ferro"].beneficio.includes("+2 no bônus base de Vontade"));
  assert.ok(talentos["reflexos-rapidos"].beneficio.includes("várias vezes"));
  assert.ok(talentos["vontade-de-ferro"].beneficio.includes("várias vezes"));
});

teste("Usar Armaduras Pesadas exige Leves e Médias (PDF p104)", () => {
  assert.deepStrictEqual(talentos["usar-armaduras-pesadas"].pre, ["Usar Armaduras Leves", "Usar Armaduras Médias"]);
});

sair();
