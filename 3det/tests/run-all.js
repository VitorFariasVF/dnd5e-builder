/* Roda os testes da 3DeT Victory: node 3det/tests/run-all.js (código ≠ 0 se algo falhar).
   O e2e.js precisa de Chrome e Playwright, então roda à parte: node 3det/tests/e2e.js */
const { execFileSync } = require("child_process");
const path = require("path");

const arquivos = ["engine.test.js", "validacoes.test.js", "backup.test.js", "release.test.js", "sugestao.test.js"];
let falhou = false;
arquivos.forEach(f => {
  try {
    const saida = execFileSync(process.execPath, [path.join(__dirname, f)], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    process.stdout.write(saida);
  } catch(err){
    falhou = true;
    process.stdout.write(err.stdout || "");
    process.stdout.write(err.stderr || "");
  }
});
console.log(falhou ? "\nHá testes com falha." : "\nTodos os testes passaram.");
process.exitCode = falhou ? 1 : 0;
