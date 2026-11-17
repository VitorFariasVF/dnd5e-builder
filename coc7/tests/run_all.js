'use strict';
/* Roda todos os testes do Call of Cthulhu 7ª ed. (Node, sem dependências). Sai com código ≠ 0 se algum falhar.
   Uso: node coc7/tests/run_all.js */
const { execFileSync } = require('child_process');
const path = require('path');
const arquivos = ['test_derivados.js', 'test_idade.js', 'test_pericias.js', 'test_validacao.js', 'test_backup.js', 'test_release.js', 'test_ficha.js', 'test_ocupacoes.js'];
let falhou = false;
for(const a of arquivos){
  try {
    const saida = execFileSync(process.execPath, [path.join(__dirname, a)], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    process.stdout.write(saida);
  } catch(err){
    falhou = true;
    process.stdout.write((err.stdout || '') + (err.stderr || ''));
  }
}
console.log(falhou ? 'RESULTADO: FALHOU' : 'RESULTADO: todos os testes passaram');
process.exitCode = falhou ? 1 : 0;
