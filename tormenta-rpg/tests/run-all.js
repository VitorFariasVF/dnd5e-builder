/* Roda todos os testes da Tormenta RPG: node tormenta-rpg/tests/run-all.js (código ≠ 0 se algo falhar). */
const { execFileSync } = require("child_process");
const path = require("path");

const arquivos = ["regras.test.js", "criacao.test.js", "talentos.test.js", "validacoes.test.js", "backup.test.js", "pdf.test.js", "release.test.js", "talentos_extra.test.js", "racas_tamanho.test.js"];
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
