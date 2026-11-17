/* Ambiente de teste: carrega os scripts da Tormenta RPG num contexto vm (sem DOM).
   Os testes usam só funções puras e o armazenamento com localStorage simulado. */
const vm = require("vm");
const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const ARQUIVOS_JS = ["rules.js", "rules-classes.js", "rules-racas.js", "rules-geral.js", "state.js", "validator.js", "engine.js", "storage.js", "export.js", "export-pdf.js", "ui.js", "main.js"];

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
  vm.createContext(ctx);
  ARQUIVOS_JS.filter(f => f !== "main.js").forEach(f => {
    vm.runInContext(fs.readFileSync(path.join(RAIZ, f), "utf8"), ctx, { filename: f });
  });
  return ctx;
}

/* Avalia uma expressão no contexto e devolve um valor limpo (sem prototipos do vm). NaN vira null. */
function avaliar(ctx, expressao){
  const r = vm.runInContext(expressao, ctx);
  if(r === undefined) return null;
  return JSON.parse(JSON.stringify(r, (k, v) => (typeof v === "number" && !Number.isFinite(v) ? null : v)));
}

module.exports = { criarAmbiente, avaliar, RAIZ, ARQUIVOS_JS };
