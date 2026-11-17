/* Roda todos os test_*.js desta pasta (Node, sem dependências). Sai com código ≠ 0 se algum falhar.
   Uso: node tormenta20/tests/run_all.js   (na raiz do repositório) */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const pasta = __dirname;
const arquivos = fs.readdirSync(pasta).filter(f => /^test_.*\.js$/.test(f)).sort();
let ruins = 0;
for(const arq of arquivos){
  const r = spawnSync(process.execPath, [path.join(pasta, arq)], { encoding: "utf8" });
  process.stdout.write(r.stdout || "");
  if(r.stderr) process.stderr.write(r.stderr);
  if(r.status !== 0){ ruins++; console.log(`>> ${arq} falhou (código ${r.status})`); }
}
console.log(ruins ? `\n${ruins} arquivo(s) com falha.` : `\nTodos os ${arquivos.length} arquivos de teste passaram.`);
process.exitCode = ruins ? 1 : 0;
