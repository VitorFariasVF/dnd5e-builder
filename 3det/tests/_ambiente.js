/* Ambiente de teste: carrega os scripts da 3DeT Victory num contexto vm (sem DOM).
   rules.js define window.TDT_RULES, então o contexto tem `window` apontando para si mesmo.
   Os testes usam só funções puras e o armazenamento com localStorage simulado. */
const vm = require("vm");
const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const ARQUIVOS_JS = ["rules.js", "rules-efeitos-vantagens.js", "rules-efeitos-desvantagens.js", "state.js", "validator.js", "engine.js", "storage.js", "export.js", "export-pdf.js", "ui.js", "main.js"];

function criarAmbiente(){
  const dados = new Map();
  const ctx = {
    console,
    localStorage: {
      getItem: k => (dados.has(k) ? dados.get(k) : null),
      setItem: (k, v) => dados.set(k, String(v)),
      removeItem: k => dados.delete(k)
    }
  };
  ctx.globalThis = ctx;
  ctx.window = ctx;
  vm.createContext(ctx);
  ARQUIVOS_JS.filter(f => f !== "main.js").forEach(f => {
    vm.runInContext(fs.readFileSync(path.join(RAIZ, f), "utf8"), ctx, { filename: f });
  });
  return ctx;
}

/* Avalia uma expressão no contexto e devolve um valor limpo (sem protótipos do vm). NaN e Infinity viram null. */
function avaliar(ctx, expressao){
  const r = vm.runInContext(expressao, ctx);
  if(r === undefined) return null;
  return JSON.parse(JSON.stringify(r, (k, v) => (typeof v === "number" && !Number.isFinite(v) ? null : v)));
}

module.exports = { criarAmbiente, avaliar, RAIZ, ARQUIVOS_JS };
