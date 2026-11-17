/* Teste de subclasses do PHB (2014): níveis e nomes por subclasse, tabelas de conjuração
   de Cavaleiro Místico e Trapaceiro Arcano, magias extras de domínio/patrono/juramento e
   estrutura dos dados em dnd5e/rules-subclasses.js.
   Esperados conferidos nas fontes listadas em docs/TRABALHO_DND5E_SUBCLASSES.md.
   Sai com código != 0 se algo falhar. Rodar: cd dnd5e && node tests/test_subclasses.js */
const fs = require('fs');
const vm = require('vm');
const base = require('path').join(__dirname, '..');

/* Mesma ordem de carga do index.html: rules.js, rules-subclasses.js, state.js, validator.js, rules-engine.js */
let code = '';
for (const f of ['rules.js', 'rules-subclasses.js', 'state.js', 'validator.js', 'rules-engine.js']) {
  code += '\n// FILE ' + f + '\n' + fs.readFileSync(base + '/' + f, 'utf8') + '\n';
}
const ctx = { console, process, require };
vm.createContext(ctx);
vm.runInContext(code, ctx);

const get = expr => vm.runInContext(expr, ctx);
const SUBCLASS_OPTIONS = JSON.parse(JSON.stringify(get('SUBCLASS_OPTIONS')));
const SUBCLASS_UNLOCK_LEVEL = JSON.parse(JSON.stringify(get('SUBCLASS_UNLOCK_LEVEL')));
const RULE_SUBCLASS_SPELLCASTING = JSON.parse(JSON.stringify(get('RULE_SUBCLASS_SPELLCASTING')));
const RULE_SPELL_SLOTS = JSON.parse(JSON.stringify(get('RULE_SPELL_SLOTS')));
const XANATHAR = JSON.parse(JSON.stringify(get('XANATHAR_SUBCLASS_BONUS_SPELLS')));
const fGetSubclassBonusSpells = get('getSubclassBonusSpells');
const fGetSubclassOptions = get('getSubclassOptions');
const fGetSubclassByKey = get('getSubclassByKey');

const results = [];
function check(name, fn) {
  try {
    const ok = !!fn();
    results.push({ name, ok });
    if (!ok) console.log('FAIL', name);
  } catch (e) {
    results.push({ name, ok: false, error: String(e) });
    console.log('ERROR', name, e.message);
  }
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const porNivel = feats => feats.map(f => [f.level, f.nome]);

/* 1. Níveis e nomes por subclasse (features ordenadas por nível, depois pela ordem do arquivo). */
const ESPERADO = {
  /* Novas: PHB 2014 */
  guerreiro: { eldritch_knight: ['Cavaleiro Místico', [[3,'Conjuração'],[3,'Vínculo com a Arma'],[7,'Magia de Guerra'],[10,'Golpe Arcano'],[15,'Carga Arcana'],[18,'Magia de Guerra Aprimorada']]] },
  ladino: { arcane_trickster: ['Trapaceiro Arcano', [[3,'Conjuração'],[3,'Mão Mágica Trapaceira'],[9,'Emboscada Mágica'],[13,'Trapaceiro Versátil'],[17,'Ladrão de Magias']]] },
  bruxo: { great_old_one: ['Grande Antigo', [[1,'Mente Desperta'],[1,'Magias Expandidas'],[6,'Defesa Entrópica'],[10,'Escudo do Pensamento'],[14,'Criar Escravo']]] },
  monge: { four_elements: ['Caminho dos Quatro Elementos', [[3,'Disciplinas Elementais'],[6,'Nova Disciplina Elemental'],[11,'Nova Disciplina Elemental'],[17,'Nova Disciplina Elemental']]] },
  paladino: { ancients: ['Juramento dos Anciões', [[3,'Magias do Juramento'],[3,'Ira da Natureza'],[3,'Afastar o Infiel'],[7,'Aura de Proteção'],[15,'Sentinela Imorredoura'],[20,'Campeão Ancião']]] },
  clerigo: {
    knowledge: ['Domínio do Conhecimento', [[1,'Bênçãos do Conhecimento'],[2,'Conhecimento dos Séculos'],[6,'Ler Pensamentos'],[8,'Magia Potente'],[17,'Visões do Passado']]],
    light: ['Domínio da Luz', [[1,'Truque Bônus'],[1,'Chama Protetora'],[2,'Radiância do Amanhecer'],[6,'Chama Aprimorada'],[8,'Magia Potente'],[17,'Coroa de Luz']]],
    nature: ['Domínio da Natureza', [[1,'Acólito da Natureza'],[1,'Proficiência Adicional'],[2,'Encantar Animais e Plantas'],[6,'Atenuar Elementos'],[8,'Golpe Divino'],[17,'Mestre da Natureza']]],
    tempest: ['Domínio da Tempestade', [[1,'Proficiências Adicionais'],[1,'Ira da Tempestade'],[2,'Ira Destrutiva'],[6,'Golpe de Trovão'],[8,'Golpe Divino'],[17,'Nascido da Tempestade']]],
    trickery: ['Domínio da Trapaça', [[1,'Bênção do Trapaceiro'],[2,'Invocar Duplicidade'],[6,'Capa das Sombras'],[8,'Golpe Divino'],[17,'Duplicidade Aprimorada']]]
  },
  mago: { illusion: ['Escola de Ilusão', [[2,'Sábio da Ilusão'],[2,'Ilusão Menor Aprimorada'],[6,'Ilusões Moldáveis'],[10,'Eu Ilusório'],[14,'Realidade Ilusória']]] },
  /* Já existentes: conferidos contra as faixas de nível da SRD 5.1 e a ordem dos nomes */
  barbaro: { berserker: ['Caminho do Berserker', [[3,'Frenesi'],[6,'Fúria Mental'],[10,'Presença Intimidadora'],[14,'Retaliação']]], totem_urso: ['Caminho do Totem (Urso)', [[3,'Buscador de Espíritos'],[3,'Espírito Totêmico: Urso'],[6,'Aspecto da Besta'],[10,'Caminhante Espiritual'],[14,'Sintonia Totêmica']]] },
  feiticeiro: { selvagem: ['Magia Selvagem', [[1,'Surto de Magia Selvagem'],[1,'Maré do Caos'],[6,'Dobrar a Sorte'],[14,'Caos Controlado'],[18,'Bombardeio de Magias']]] },
  patrulheiro: { cacador: ['Caçador', [[3,'Presa do Caçador'],[7,'Tática Defensiva'],[11,'Multiataque'],[15,'Defesa Superior']]], mestre_feras: ['Mestre das Feras', [[3,'Companheiro do Patrulheiro'],[7,'Treinamento Excepcional'],[11,'Fúria Bestial'],[15,'Compartilhar Magias']]] }
};
/* Campeão e Mestre da Batalha, já existentes, ficam em guerreiro */
ESPERADO.guerreiro.campeao = ['Campeão', [[3,'Crítico Aprimorado'],[7,'Atleta Extraordinário'],[10,'Estilo de Luta Adicional'],[15,'Crítico Superior'],[18,'Sobrevivente']]];
ESPERADO.guerreiro.mestre_batalha = ['Mestre de Batalha', [[3,'Aluno da Guerra'],[3,'Superioridade em Combate'],[7,'Conheça Seu Inimigo'],[10,'Superioridade Aprimorada'],[15,'Retomar Fôlego'],[18,'Superioridade Suprema']]];

for (const [classe, subs] of Object.entries(ESPERADO)) {
  for (const [key, [nomeEsperado, feats]] of Object.entries(subs)) {
    check(`${classe}:${key} existe com nome "${nomeEsperado}"`, () => {
      const sub = (SUBCLASS_OPTIONS[classe] || []).find(s => s.key === key);
      return !!sub && sub.nome === nomeEsperado;
    });
    check(`${classe}:${key} tem níveis e nomes esperados`, () => {
      const sub = (SUBCLASS_OPTIONS[classe] || []).find(s => s.key === key);
      if (!sub) return false;
      const obtido = porNivel(sub.features).slice().sort((a, b) => a[0] - b[0]);
      const esperado = feats.slice().sort((a, b) => a[0] - b[0]);
      return same(obtido, esperado);
    });
  }
}

/* 2. Subclasses sem duplicidade e desbloqueio por classe */
check('nenhuma chave de subclasse repetida em cada classe', () =>
  Object.values(SUBCLASS_OPTIONS).every(lista => new Set(lista.map(s => s.key)).size === lista.length));
check('desbloqueio de subclasse: guerreiro 3, ladino 3, bruxo 1, monge 3, paladino 3, clérigo 1, mago 2', () =>
  SUBCLASS_UNLOCK_LEVEL.guerreiro === 3 && SUBCLASS_UNLOCK_LEVEL.ladino === 3 && SUBCLASS_UNLOCK_LEVEL.bruxo === 1 &&
  SUBCLASS_UNLOCK_LEVEL.monge === 3 && SUBCLASS_UNLOCK_LEVEL.paladino === 3 && SUBCLASS_UNLOCK_LEVEL.clerigo === 1 && SUBCLASS_UNLOCK_LEVEL.mago === 2);
check('subclasses novas aparecem em getSubclassOptions (edição 2014)', () =>
  ['eldritch_knight'].every(k => fGetSubclassOptions('guerreiro').some(s => s.key === k)) &&
  fGetSubclassByKey('ladino', 'arcane_trickster') !== null && fGetSubclassByKey('monge', 'four_elements') !== null);

/* 3. Cada característica nova traz fonte; sem rótulo só com duas fontes */
const NOVAS = [['guerreiro','eldritch_knight'],['ladino','arcane_trickster'],['bruxo','great_old_one'],['monge','four_elements'],['paladino','ancients'],['clerigo','knowledge'],['clerigo','light'],['clerigo','nature'],['clerigo','tempest'],['clerigo','trickery'],['mago','illusion']];
for (const [classe, key] of NOVAS) {
  check(`${classe}:${key} tem fonte em cada característica`, () => {
    const sub = (SUBCLASS_OPTIONS[classe] || []).find(s => s.key === key);
    return !!sub && !!sub.fonte && sub.features.every(f => typeof f.fonte === 'string' && f.fonte.length > 0);
  });
}
check('características com uma fonte só levam NÃO VERIFICADO', () => {
  const dupla = ['eldritch_knight','arcane_trickster','great_old_one','four_elements','ancients'];
  return Object.values(SUBCLASS_OPTIONS).every(lista => lista.every(s => s.features.every(f => {
    if (!f.fonte) return true;
    if (dupla.includes(s.key)) return !/NÃO VERIFICADO/.test(f.fonte);
    return /NÃO VERIFICADO/.test(f.fonte) || /\+/.test(f.fonte);
  })));
});

/* 4. Tabelas de conjuração (motor) dos subconjuradores contra o esperado */
const EK_CONHECIDAS = {3:3,4:4,5:4,6:4,7:5,8:6,9:6,10:7,11:8,12:8,13:9,14:10,15:10,16:11,17:11,18:11,19:12,20:13};
const AT_CONHECIDAS = {3:3,4:4,5:4,6:4,7:5,8:6,9:6,10:7,11:8,12:8,13:9,14:10,15:10,16:11,17:11,18:11,19:12,20:13};
check('Cavaleiro Místico: magias conhecidas por nível (3 a 20)', () => {
  const p = RULE_SUBCLASS_SPELLCASTING['guerreiro:eldritch_knight'];
  return p && p.model === 'known' && p.casterType === 'third' && p.startsAtLevel === 3 &&
    Object.entries(EK_CONHECIDAS).every(([n, v]) => p.knownSpellProgression[Number(n) - 1] === v);
});
check('Cavaleiro Místico: truques (2 no 3º, 3 no 10º)', () => {
  const p = RULE_SUBCLASS_SPELLCASTING['guerreiro:eldritch_knight'];
  return p.cantripProgression[2] === 2 && p.cantripProgression[9] === 3 && p.cantripProgression[8] === 2 && p.cantripProgression[1] === 0;
});
check('Trapaceiro Arcano: magias conhecidas por nível (3 a 20)', () => {
  const p = RULE_SUBCLASS_SPELLCASTING['ladino:arcane_trickster'];
  return p && p.model === 'known' && p.casterType === 'third' && p.startsAtLevel === 3 &&
    Object.entries(AT_CONHECIDAS).every(([n, v]) => p.knownSpellProgression[Number(n) - 1] === v);
});
check('Trapaceiro Arcano: truques (3 no 3º, 4 no 10º)', () => {
  const p = RULE_SUBCLASS_SPELLCASTING['ladino:arcane_trickster'];
  return p.cantripProgression[2] === 3 && p.cantripProgression[9] === 4 && p.cantripProgression[8] === 3;
});
check('espaços de conjurador de terço (3º ao 20º)', () => {
  const t = RULE_SPELL_SLOTS.third;
  const esperado = {
    3:[2,0,0,0,0,0,0,0,0], 4:[3,0,0,0,0,0,0,0,0], 6:[3,0,0,0,0,0,0,0,0],
    7:[4,2,0,0,0,0,0,0,0], 9:[4,2,0,0,0,0,0,0,0], 10:[4,3,0,0,0,0,0,0,0], 12:[4,3,0,0,0,0,0,0,0],
    13:[4,3,2,0,0,0,0,0,0], 15:[4,3,2,0,0,0,0,0,0], 16:[4,3,3,0,0,0,0,0,0], 18:[4,3,3,0,0,0,0,0,0],
    19:[4,3,3,1,0,0,0,0,0], 20:[4,3,3,1,0,0,0,0,0]
  };
  return Object.entries(esperado).every(([n, v]) => same(t[n], v));
});

/* 5. Magias extras por subclasse (funções de rules.js), no nível indicado */
check('Domínio do Conhecimento no 9º nível: cinco círculos, dez magias', () => {
  const extra = fGetSubclassBonusSpells('clerigo', 'knowledge', 9);
  return Object.keys(extra).length === 5 && Object.values(extra).every(l => l.length === 2);
});
check('Domínio do Conhecimento no 1º nível: só o 1º círculo', () => {
  const extra = fGetSubclassBonusSpells('clerigo', 'knowledge', 1);
  return Object.keys(extra).length === 1 && same(extra['1'], ['Comando','Identificar']);
});
for (const dom of ['light','nature','tempest','trickery']) {
  check(`Domínio ${dom}: cinco círculos (1º a 9º)`, () => Object.keys(XANATHAR[`clerigo:${dom}`] || {}).sort().join(',') === '1,3,5,7,9');
}
check('Juramento dos Anciões: magias nos níveis 3, 5, 9, 13, 17', () =>
  Object.keys(XANATHAR['paladino:ancients'] || {}).sort((a,b)=>a-b).join(',') === '3,5,9,13,17');
check('Grande Antigo: magias expandidas nos níveis 1, 3, 5, 7, 9 (duas por nível)', () =>
  Object.keys(XANATHAR['bruxo:great_old_one'] || {}).sort((a,b)=>a-b).join(',') === '1,3,5,7,9' &&
  Object.values(XANATHAR['bruxo:great_old_one']).every(l => l.length === 2));

/* 6. Correção em subclasses existentes */
check('Magia Selvagem tem Surto de Magia Selvagem no 1º nível', () => {
  const s = SUBCLASS_OPTIONS.feiticeiro.find(x => x.key === 'selvagem');
  return !!s && s.features.some(f => f.level === 1 && f.nome === 'Surto de Magia Selvagem');
});
check('Totem (Urso) tem Buscador de Espíritos no 3º nível', () => {
  const s = SUBCLASS_OPTIONS.barbaro.find(x => x.key === 'totem_urso');
  return !!s && s.features.some(f => f.level === 3 && f.nome === 'Buscador de Espíritos');
});

const falhas = results.filter(r => !r.ok);
console.log(`test_subclasses: ${results.length - falhas.length}/${results.length} OK`);
if (falhas.length) {
  falhas.forEach(f => console.log(' -', f.name, f.error || ''));
  process.exit(1);
}
