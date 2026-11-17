/* Testes das 12 classes do D&D 2024 (SRD 5.2) em dnd5e/rules-2024-classes.js.
   Os valores esperados vêm das tabelas de classe do SRD 5.2 (espelho mdbook), não do próprio arquivo de dados.
   Confere por classe: dado de vida, salvaguardas, níveis de subclasse e de Aumento de Atributo,
   contagem de características por nível, consistência entre marcadores de subclasse e SUBCLASSES_2024,
   espaços de magia, e campos obrigatórios (fonte, nome, resumo).
   Sai com código != 0 se algo falhar. Rodar: cd dnd5e && node tests/test_2024_classes.js */
const fs = require('fs');
const vm = require('vm');
const base = require('path').join(__dirname, '..');

let code = '';
for (const f of ['rules.js', 'rules-2024-classes.js']) {
  code += '\n// FILE ' + f + '\n' + fs.readFileSync(base + '/' + f, 'utf8') + '\n';
}
const ctx = { console, process, require };
vm.createContext(ctx);
vm.runInContext(code, ctx);

const get = expr => JSON.parse(JSON.stringify(vm.runInContext(expr, ctx)));
const CLASSES_2024 = get('CLASSES_2024');
const CLASS_FEATURES_2024 = get('CLASS_FEATURES_2024');
const SUBCLASSES_2024 = get('SUBCLASSES_2024');
const SKILLS = get('Object.keys(SKILLS)');

const results = [];
function check(name, fn) {
  try {
    const ok = !!fn();
    results.push({ name, ok });
    if (!ok) console.log('FAIL', name);
  } catch (e) {
    results.push({ name, ok: false });
    console.log('ERROR', name, e.message);
  }
}
const iguais = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Oráculos: tabelas de classe do SRD 5.2 (dado de vida, salvaguardas, ASI, contagem de características por nível 1 a 20)
const ESPERADO = {
  barbaro:   { dado: 12, saves: ['Força','Constituição'], asi: [4,8,12,16], contagem: [3,2,2,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1], subniveis: [3,6,10,14] },
  bardo:     { dado: 8,  saves: ['Destreza','Carisma'], asi: [4,8,12,16], contagem: [2,2,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1], subniveis: [3,6,14] },
  clerigo:   { dado: 8,  saves: ['Sabedoria','Carisma'], asi: [4,8,12,16], contagem: [2,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,0,1,1], subniveis: [3,6,17] },
  druida:    { dado: 8,  saves: ['Inteligência','Sabedoria'], asi: [4,8,12,16], contagem: [3,2,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1], subniveis: [3,6,10,14] },
  guerreiro: { dado: 10, saves: ['Força','Constituição'], asi: [4,6,8,12,14,16], contagem: [3,2,1,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1], subniveis: [3,7,10,15,18] },
  ladino:    { dado: 8,  saves: ['Destreza','Inteligência'], asi: [4,8,10,12,16], contagem: [4,1,2,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1], subniveis: [3,9,13,17] },
  mago:      { dado: 6,  saves: ['Inteligência','Sabedoria'], asi: [4,8,12,16], contagem: [3,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1], subniveis: [3,6,10,14] },
  monge:     { dado: 8,  saves: ['Força','Destreza'], asi: [4,8,12,16], contagem: [2,3,2,2,2,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1], subniveis: [3,6,11,17] },
  paladino:  { dado: 10, saves: ['Sabedoria','Carisma'], asi: [4,8,12,16], contagem: [3,2,2,1,2,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1], subniveis: [3,7,15,20] },
  patrulheiro:{ dado: 10, saves: ['Força','Destreza'], asi: [4,8,12,16], contagem: [3,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], subniveis: [3,7,11,15] },
  feiticeiro:{ dado: 6,  saves: ['Constituição','Carisma'], asi: [4,8,12,16], contagem: [2,2,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1], subniveis: [3,6,14,18] },
  bruxo:     { dado: 8,  saves: ['Sabedoria','Carisma'], asi: [4,8,12,16], contagem: [2,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1], subniveis: [3,6,10,14] }
};
const CHAVES = Object.keys(ESPERADO);

check('são 12 classes em CLASSES_2024', () => iguais(Object.keys(CLASSES_2024).sort(), CHAVES.slice().sort()));
check('CLASS_FEATURES_2024 tem as mesmas 12 chaves', () => iguais(Object.keys(CLASS_FEATURES_2024).sort(), CHAVES.slice().sort()));
check('SUBCLASSES_2024 tem as mesmas 12 chaves', () => iguais(Object.keys(SUBCLASSES_2024).sort(), CHAVES.slice().sort()));

for (const c of CHAVES) {
  const e = ESPERADO[c];
  const cl = CLASSES_2024[c] || {};
  const feats = CLASS_FEATURES_2024[c] || [];
  const subs = SUBCLASSES_2024[c] || [];

  check(c + ': dado de vida = d' + e.dado, () => cl.dadoVida === e.dado);
  check(c + ': salvaguardas', () => iguais(cl.saves, e.saves));
  check(c + ': níveis de Aumento de Atributo', () => iguais(cl.aumentoAtributoNiveis, e.asi));
  check(c + ': Dom Épico no nível 19', () => cl.talentoEpicoNivel === 19);
  check(c + ': subclasse no nível 3', () => cl.subclasseNivel === 3);
  check(c + ': contagem de características por nível (1 a 20)', () => {
    const cont = Array.from({ length: 20 }, (_, i) => feats.filter(f => f.level === i + 1).length);
    return iguais(cont, e.contagem);
  });
  check(c + ': nível de cada característica é inteiro entre 1 e 20', () =>
    feats.every(f => Number.isInteger(f.level) && f.level >= 1 && f.level <= 20));
  check(c + ': cada característica tem nome e resumo curto (até 160 caracteres)', () =>
    feats.every(f => f.nome && f.resumo && f.resumo.length <= 160));
  check(c + ': marcadores de subclasse na tabela = níveis de subclasse esperados', () => {
    const marcas = feats.filter(f => f.nome === 'Subclasse' || f.nome === 'Característica de subclasse').map(f => f.level);
    return iguais(marcas, e.subniveis);
  });
  check(c + ': uma subclasse no SRD 5.2', () => subs.length === 1);
  check(c + ': níveis das características da subclasse = níveis esperados', () => {
    if (!subs.length) return false;
    const niveis = [...new Set(subs[0].caracteristicas.map(f => f.level))].sort((a, b) => a - b);
    return iguais(niveis, e.subniveis);
  });
  check(c + ': subclasse tem nome, chave e fonte', () => subs.length && subs[0].nome && subs[0].key && subs[0].fonte);
  check(c + ': fonte da classe informada', () => typeof cl.fonte === 'string' && cl.fonte.startsWith('SRD 5.2'));
  check(c + ': perícias escolhidas existem em SKILLS', () =>
    (cl.escolhaPericias.opcoes || []).every(p => SKILLS.includes(p)));
  check(c + ': quantidade de perícias entre 2 e 4', () => {
    const q = cl.escolhaPericias.quantidade;
    return q >= 2 && q <= 4;
  });
  check(c + ': mudancas2014 presente', () => Array.isArray(cl.mudancas2014) && cl.mudancas2014.length >= 2);
}

// Conjuração: conferido por tabelas do SRD 5.2
check('Mago: espaços no 5º nível = [4,3,2]', () => iguais(CLASSES_2024.mago.conjuracao.espacos[4], [4,3,2]));
check('Mago: espaços no 20º nível = [4,3,3,3,3,2,2,1,1]', () => iguais(CLASSES_2024.mago.conjuracao.espacos[19], [4,3,3,3,3,2,2,1,1]));
check('Mago: magias preparadas no 20º nível = 25', () => CLASSES_2024.mago.conjuracao.preparadas[19] === 25);
check('Bardo, Clérigo, Druida, Feiticeiro: conjuração completa', () =>
  ['bardo','clerigo','druida','feiticeiro'].every(c => CLASSES_2024[c].conjuracao.tipo === 'completa'));
check('Paladino: 1º nível tem 2 espaços de 1º círculo', () => iguais(CLASSES_2024.paladino.conjuracao.espacos[0], [2]));
check('Paladino: 20º nível = [4,3,3,3,2] (conjuração de metade)', () => iguais(CLASSES_2024.paladino.conjuracao.espacos[19], [4,3,3,3,2]));
check('Patrulheiro: 5º nível = [4,2]', () => iguais(CLASSES_2024.patrulheiro.conjuracao.espacos[4], [4,2]));
check('Bruxo: pacto com 1 espaço no nível 1 e 4 no nível 17', () =>
  CLASSES_2024.bruxo.conjuracao.pacto.espacos[0] === 1 && CLASSES_2024.bruxo.conjuracao.pacto.espacos[16] === 4);
check('Bruxo: 20 invocações no nível 20 é 10', () => CLASSES_2024.bruxo.recursos.invocacoes[19] === 10);
check('Bárbaro, Guerreiro, Monge, Ladino: sem conjuração', () =>
  ['barbaro','guerreiro','monge','ladino'].every(c => CLASSES_2024[c].conjuracao === null));
check('Espaços de todas as conjurações têm 20 níveis', () =>
  CHAVES.every(c => {
    const conj = CLASSES_2024[c].conjuracao;
    if (!conj) return true;
    if (conj.tipo === 'pacto') return conj.pacto.espacos.length === 20 && conj.pacto.circulo.length === 20;
    return conj.espacos.length === 20;
  }));

// Recursos por nível: 20 valores cada
check('Recursos por nível têm 20 valores', () =>
  CHAVES.every(c => Object.values(CLASSES_2024[c].recursos || {}).every(v => Array.isArray(v) ? v.length === 20 : true)));
check('Fúria: 2 usos no nível 1 e 6 no nível 17', () => CLASSES_2024.barbaro.recursos.furias[0] === 2 && CLASSES_2024.barbaro.recursos.furias[16] === 6);
check('Monge: dado de Artes Marciais d6 no nível 1 e d12 no nível 17', () =>
  CLASSES_2024.monge.recursos.dadoArtesMarciais[0] === 6 && CLASSES_2024.monge.recursos.dadoArtesMarciais[16] === 12);

// Entradas marcadas NÃO VERIFICADO: devem ser as conhecidas
const naoVerificados = [];
for (const c of CHAVES) {
  for (const f of CLASS_FEATURES_2024[c]) if (f.fonte && f.fonte.includes('NÃO VERIFICADO')) naoVerificados.push(c + ':' + f.nome);
  for (const s of SUBCLASSES_2024[c]) for (const f of s.caracteristicas) if (f.fonte && f.fonte.includes('NÃO VERIFICADO')) naoVerificados.push(c + ':' + f.nome);
}
check('itens NÃO VERIFICADO são os 3 conhecidos (Atleta Notável, Estilo de Luta Adicional, lista de magias do Juramento)', () =>
  iguais(naoVerificados.sort(), ['guerreiro:Atleta Notável','guerreiro:Estilo de Luta Adicional','paladino:Magias do Juramento da Devoção']));

const falhas = results.filter(r => !r.ok);
console.log(`\n${results.length - falhas.length}/${results.length} verificações passaram`);
console.log('NÃO VERIFICADO: ' + naoVerificados.join('; '));
if (falhas.length) { console.log('Falhas:', falhas.map(f => f.name).join(' | ')); process.exit(1); }
process.exit(0);
