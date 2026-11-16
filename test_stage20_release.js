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
  'export-pdf.js',
  'export-roll20.js',
  'vf/tokens.css',
  'vf/components.css',
  'vf/motion.css',
  'vf/motion.js',
  'vf/tool.js',
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

const dupFns = [];
for (const f of ['export.js','export-pdf.js','export-roll20.js']) {
  const nomes = [...fs.readFileSync(path.join(root, f), 'utf8').matchAll(/^function ([A-Za-z0-9_]+)\(/gm)].map(m => m[1]);
  nomes.forEach((n, i) => { if (nomes.indexOf(n) !== i) dupFns.push(f + ':' + n); });
}
const allNames = {};
for (const f of ['export.js','export-pdf.js','export-roll20.js']) {
  for (const m of fs.readFileSync(path.join(root, f), 'utf8').matchAll(/^function ([A-Za-z0-9_]+)\(/gm)) { if (allNames[m[1]] && allNames[m[1]] !== f) dupFns.push(allNames[m[1]] + '/' + f + ':' + m[1]); allNames[m[1]] = f; }
}

const checks = [
  { name: 'arquivos obrigatórios presentes', ok: missingRequired.length === 0, detail: missingRequired },
  { name: 'referências do index existem', ok: missingRefs.length === 0, detail: missingRefs },
  { name: 'viewport responsivo configurado', ok: /<meta\s+name="viewport"/.test(index), detail: [] },
  { name: 'container principal presente', ok: /id="app"/.test(index), detail: [] },
  { name: 'CSS possui media query responsiva', ok: /@media/.test(css), detail: [] },
  { name: 'export*.js sem funções definidas mais de uma vez', ok: dupFns.length === 0, detail: dupFns },
  { name: 'index.html usa o padrão VF Tools (tokens, components, motion, tema)', ok: /vf\/tokens\.css/.test(index) && /vf\/components\.css/.test(index) && /vf\/motion\.css/.test(index) && /id="theme"/.test(index) && /data-theme="dark"/.test(index), detail: [] },
];

const failed = checks.filter(c => !c.ok);
console.log(JSON.stringify({ total: checks.length, failed, checks }, null, 2));
if (failed.length) process.exit(1);
