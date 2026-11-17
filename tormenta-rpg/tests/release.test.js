/* Teste de release: referências do index.html existem, cada script é ligado na página, sem função ou constante
   global duplicada, sem alert() bloqueante e sem erro de sintaxe. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { RAIZ, ARQUIVOS_JS } = require("./_ambiente");
const { teste, sair, assert } = require("./_teste");

const DIR = path.join(RAIZ);
const html = fs.readFileSync(path.join(DIR, "index.html"), "utf8");
const lerJs = f => fs.readFileSync(path.join(DIR, f), "utf8");

teste("index.html declara o data-tool do sistema", () => {
  assert.ok(/data-tool="tormenta-rpg-builder"/.test(html));
});

teste("todo script e link local do index.html existe", () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)].map(m => m[1]).filter(r => !/^(https?:|mailto:)/.test(r));
  const faltando = refs.filter(r => !fs.existsSync(path.resolve(DIR, r)));
  assert.deepStrictEqual(faltando, []);
});

teste("todo .js da pasta (exceto testes) está ligado no index.html", () => {
  const arquivos = fs.readdirSync(DIR).filter(f => f.endsWith(".js"));
  const naoLigados = arquivos.filter(f => !html.includes(`src="${f}"`));
  assert.deepStrictEqual(naoLigados, []);
});

teste("nenhuma função ou constante de topo é declarada duas vezes", () => {
  const vistos = new Map(), duplicados = [];
  ARQUIVOS_JS.forEach(f => {
    const codigo = lerJs(f);
    for(const m of codigo.matchAll(/^(?:function|const|let|var)\s+([A-Za-z_$][\w$]*)/gm)){
      const nome = m[1];
      if(vistos.has(nome)) duplicados.push(nome + " (" + vistos.get(nome) + " e " + f + ")");
      else vistos.set(nome, f);
    }
  });
  assert.deepStrictEqual(duplicados, []);
});

teste("ui.js não usa alert() (aviso fica na etapa ou em toast)", () => {
  assert.ok(!/(^|[^\w.])alert\(/m.test(lerJs("ui.js")));
});

teste("todos os arquivos de script têm sintaxe válida", () => {
  ARQUIVOS_JS.forEach(f => new vm.Script(lerJs(f), { filename: f }));
});

teste("o backup não tem nenhuma exportação para VTT (não há VTT verificado)", () => {
  const exp = lerJs("export.js");
  assert.ok(!/foundry|roll20/i.test(exp));
});

sair("release");
