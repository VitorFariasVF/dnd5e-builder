/* Imagem do personagem — validação, persistência local, backup JSON e PDF.
   Rodar: node test_imagem_personagem.js */
const fs = require('fs');
const vm = require('vm');
const root = require('path').join(__dirname,'..');
const join = require('path').join;

const el = () => ({ value:'', checked:false, innerHTML:'', style:{}, classList:{ add(){}, remove(){}, contains(){ return false; } }, addEventListener(){}, appendChild(){}, remove(){}, click(){}, insertAdjacentHTML(){}, querySelectorAll(){ return []; }, querySelector(){ return null; } });
const store = {};
const ctx = {
  console, process, require, Blob: class {}, URL: { createObjectURL(){ return ''; }, revokeObjectURL(){} },
  localStorage: { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
  document: { getElementById: () => el(), createElement: () => el(), body: el(), querySelectorAll: () => [], querySelector: () => null, addEventListener(){} },
  alert(){}, confirm: () => true, setTimeout, clearTimeout
};
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
let code = '';
for (const f of ['rules.js','rules-racas.js','state.js','validator.js','rules-engine.js','storage.js','export.js','export-pdf.js','export-roll20.js','ui.js']) {
  code += `\n//FILE ${f}\n` + fs.readFileSync(join(root, f), 'utf8') + '\n';
}
code += `
const JPEG_OK = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAEAAQDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAHCf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ADoDFU3/2Q==';
const PNG_OK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAEAQMAAACT';
const results = [];
function check(name, fn){ try { const ok = fn(); results.push({name, ok: !!ok}); if(!ok) console.log('FAIL', name); } catch(e){ results.push({name, ok:false, error:e.stack}); console.log('ERROR', name, e.stack); } }
function lancaErro(fn){ try { fn(); return false; } catch(e){ return true; } }
function novaFicha(){
  resetStateToInitial();
  state.regras = '2014'; aplicarCatalogoRegras('2014'); state.modo = 'A';
  Object.assign(state.personagem, { nome:'Tharion', jogador:'Vitor', origem:'soldado', raca:'humano', classe:'guerreiro', nivel:1, pvMax:12 });
  recalcularAtributosFinais(); recalcularTudo();
  return state.personagem;
}
const clone = o => JSON.parse(JSON.stringify(o));

check('Validação: aceita data:image/jpeg e data:image/png em base64', () => imagemPersonagemValida(JPEG_OK) && imagemPersonagemValida(PNG_OK));
check('Validação: rejeita gif, svg, html, javascript, texto puro, aspas e vazio', () => [
  'data:image/gif;base64,R0lGODlhAQABAAAA', 'data:image/svg+xml;base64,PHN2Zz4=', 'data:text/html;base64,PGI+',
  'javascript:alert(1)', 'data:image/jpeg;base64,', 'data:image/jpeg;base64,AAAA"onerror="x', 'data:image/jpeg;base64,AA AA', '', null, 42
].every(v => !imagemPersonagemValida(v)));
check('Validação: rejeita imagem acima do limite de 400 mil caracteres', () => !imagemPersonagemValida('data:image/jpeg;base64,' + 'A'.repeat(400001)));

const PNG_ALFA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEElEQVR4nGP4zwAH/6HsBgAlcAN+++VAswAAAABJRU5ErkJggg==';
const PNG_GRANDE = 'data:image/png;base64,' + 'A'.repeat(400001);
const JPEG_FALLBACK = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAMCAgICAgMC';
const geraPng = dados => () => dados;
const geraJpeg = () => JPEG_FALLBACK;
check('Formato: PNG com transparência é preservado como PNG (canal alfa, tipo de cor 6)', () => {
  const e = escolherFormatoImagemPersonagem('image/png', geraPng(PNG_ALFA), geraJpeg);
  const bytes = require('buffer').Buffer.from(e.dataUrl.split(',')[1], 'base64');
  return e.dataUrl === PNG_ALFA && e.aviso === '' && bytes[25] === 6;
});
check('Formato: PNG grande que estoura o limite cai para JPEG com aviso', () => {
  const e = escolherFormatoImagemPersonagem('image/png', geraPng(PNG_GRANDE), geraJpeg);
  return e.dataUrl === JPEG_FALLBACK && e.aviso === IMAGEM_PERSONAGEM_AVISO_JPEG && imagemPersonagemValida(e.dataUrl);
});
check('Formato: JPEG continua JPEG, sem aviso, sem tentar PNG', () => {
  let tentouPng = false;
  const e = escolherFormatoImagemPersonagem('image/jpeg', () => { tentouPng = true; return PNG_ALFA; }, geraJpeg);
  return e.dataUrl === JPEG_FALLBACK && e.aviso === '' && !tentouPng;
});

check('Ficha antiga sem campo imagem abre com imagem vazia', () => {
  resetStateToInitial(); delete state.personagem.imagem; ensureStateShape();
  return state.personagem.imagem === '';
});
check('Imagem inválida guardada no estado é descartada na leitura', () => {
  resetStateToInitial(); state.personagem.imagem = 'data:text/html;base64,PGI+'; ensureStateShape();
  return state.personagem.imagem === '';
});

check('Ciclo local: salvar com imagem, recarregar e a imagem é preservada', () => {
  novaFicha(); state.personagem.imagem = JPEG_OK; salvarEstado();
  resetStateToInitial(); carregarEstado();
  return state.personagem.imagem === JPEG_OK && state.personagem.nome === 'Tharion';
});
check('Ciclo local: ficha sem imagem salva e recarrega com imagem vazia', () => {
  novaFicha(); salvarEstado(); resetStateToInitial(); carregarEstado();
  return state.personagem.imagem === '' && state.personagem.nome === 'Tharion';
});

check('Backup JSON: exporta a imagem e a reimporta', () => {
  novaFicha(); state.personagem.imagem = JPEG_OK;
  const payload = clone(montarPayloadExportacao());
  if(payload.imagem !== JPEG_OK) return false;
  aplicarPayloadBackupNaFicha(payload);
  return state.personagem.imagem === JPEG_OK && state.personagem.nome === 'Tharion';
});
check('Backup JSON: aceita PNG válido na importação', () => {
  novaFicha(); const payload = clone(montarPayloadExportacao()); payload.imagem = PNG_OK;
  aplicarPayloadBackupNaFicha(payload);
  return state.personagem.imagem === PNG_OK;
});
check('Backup JSON antigo, sem campo imagem, importa com imagem vazia', () => {
  novaFicha(); state.personagem.imagem = JPEG_OK;
  const payload = clone(montarPayloadExportacao()); delete payload.imagem;
  aplicarPayloadBackupNaFicha(payload);
  return state.personagem.imagem === '' && state.personagem.nome === 'Tharion';
});
check('JSON com imagem inválida é rejeitado no backup e não altera a ficha atual', () => {
  novaFicha(); state.personagem.imagem = JPEG_OK;
  const payload = clone(montarPayloadExportacao()); payload.imagem = 'data:image/svg+xml;base64,PHN2Zz4='; payload.nome = 'Outro';
  const rejeitou = lancaErro(() => importarJsonParaEditar(payload));
  return rejeitou && state.personagem.nome === 'Tharion' && state.personagem.imagem === JPEG_OK;
});
check('JSON no formato de estado salvo com imagem inválida é rejeitado', () => {
  novaFicha();
  const obj = clone(state); obj.personagem.imagem = 'data:text/html;base64,PGI+'; obj.personagem.nome = 'Outro';
  const rejeitou = lancaErro(() => importarJsonParaEditar(obj));
  return rejeitou && state.personagem.nome === 'Tharion';
});
check('JSON no formato de estado salvo com imagem válida é importado', () => {
  novaFicha();
  const obj = clone(state); obj.personagem.imagem = JPEG_OK; obj.personagem.nome = 'Outro';
  importarJsonParaEditar(obj);
  return state.personagem.imagem === JPEG_OK && state.personagem.nome === 'Outro';
});

check('PDF: ficha com imagem traz o retrato no cabeçalho da primeira página', () => {
  novaFicha(); state.personagem.imagem = JPEG_OK;
  const html = gerarHtmlFicha();
  return html.includes('<img class="retrato" src="' + JPEG_OK + '"') && html.includes('<header class="topo comRetrato"');
});
check('PDF: ficha sem imagem não gera retrato', () => {
  novaFicha();
  const html = gerarHtmlFicha();
  return !html.includes('<img class="retrato"') && !html.includes('<header class="topo comRetrato"');
});

const falhas = results.filter(r => !r.ok);
console.log('test_imagem_personagem: ' + (results.length - falhas.length) + '/' + results.length + ' OK');
if (falhas.length) { console.log('Falhas:', falhas.map(f => f.name)); process.exitCode = 1; }
`;
vm.runInContext(code, ctx);
