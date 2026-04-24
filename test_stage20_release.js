const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = __dirname;
const requiredFiles = [
  'index.html',
  'style.css',
  'rules.js',
  'state.js',
  'validator.js',
  'rules-engine.js',
  'storage.js',
  'export.js',
  'ui.js',
  'main.js',
  'README.md'
];

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
}

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

const scriptRefs = [...index.matchAll(/<script\s+src="([^"]+)"/g)].map(m => m[1]);
const cssRefs = [...index.matchAll(/<link\s+rel="stylesheet"\s+href="([^"]+)"/g)].map(m => m[1]);

const missingRequired = requiredFiles.filter(file => !fs.existsSync(path.join(root, file)));
const missingRefs = [...scriptRefs, ...cssRefs].filter(file => !fs.existsSync(path.join(root, file)));

const checks = [
  { name: 'arquivos obrigatórios presentes', ok: missingRequired.length === 0, detail: missingRequired },
  { name: 'referências do index existem', ok: missingRefs.length === 0, detail: missingRefs },
  { name: 'viewport responsivo configurado', ok: /<meta\s+name="viewport"/.test(index), detail: [] },
  { name: 'container principal presente', ok: /id="app"/.test(index), detail: [] },
  { name: 'CSS possui media query responsiva', ok: /@media/.test(css), detail: [] },
  { name: 'export.js preservado no hash esperado', ok: sha256('export.js') === '7da5fe287d5f56b42c75d7868d761845ee464db06c093be947c0ac6924d11f32', detail: [sha256('export.js')] }
];

const failed = checks.filter(c => !c.ok);
console.log(JSON.stringify({ total: checks.length, failed, checks }, null, 2));
if (failed.length) process.exit(1);
