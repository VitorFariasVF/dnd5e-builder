/* Mini-runner sem dependências. Cada arquivo de teste chama sair() no fim; código de saída ≠ 0 se algo falhou. */
const assert = require("assert");

let total = 0, falhas = 0;

function teste(nome, fn){
  total++;
  try { fn(); console.log("ok    " + nome); }
  catch(err){ falhas++; console.log("FALHA " + nome + "\n      " + err.message.split("\n")[0]); }
}

function sair(titulo){
  console.log("\n" + (titulo || "testes") + ": " + (total - falhas) + "/" + total + " passaram");
  process.exitCode = falhas ? 1 : 0;
}

module.exports = { teste, sair, assert };
