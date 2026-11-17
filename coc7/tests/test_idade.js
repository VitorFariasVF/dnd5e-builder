'use strict';
/* Ajustes de idade (regra completa). Os números esperados vêm da tabela de faixas em rules.js.
   Confirmado em 2 ou mais fontes (ver comentários em rules.js): EDU -5 e 5 pontos divididos entre FOR e TAM aos 15-19;
   1 teste de EDU de 20 a 39; testes de EDU até 60 (nenhum de 70 em diante); APA e FOR/CON/DES por faixa de 40 em diante;
   MOV -1 por faixa de 40 em diante. Não aplicado (1 fonte): +5 pontos aos 20.
   Contas à mão, base FOR 60, CON 65, TAM 70, DES 55, APA 50, INT 75, POD 60, EDU 65:
   Idade 15: EDU 60. Divisão de 5 entre FOR e TAM: x para FOR, 5 − x para TAM. x = 5 dá FOR 55, TAM 70; x = 0 dá FOR 60, TAM 65.
   Idade 19 com x = 2: FOR 58, TAM 67.
   Idade 40: APA 45; FOR, CON ou DES −5 (CON 60); 2 testes de EDU; MOV −1.
   Idade 50: APA 40; DES −5 (40 anos) e FOR −5 (50 anos) dão DES 50 e FOR 55; 3 testes; MOV −2.
   Idade 60: DES −5, FOR −5 e CON −10 (escolhas em 40, 50 e 60) dão DES 50, FOR 55, CON 55; APA 35; 4 testes; MOV −3.
   Idade 90: escolhas FOR, CON, DES, FOR, CON (40 a 80). FOR 35, CON 20, DES 45, APA 25; MOV: FOR e DES abaixo de TAM 70 dá 7, menos 5 = 2; 4 testes. */
const { criarAmbiente, criarRunner } = require('./ambiente');
const { chamar } = criarAmbiente();
const { teste, fim } = criarRunner('test_idade.js');

const base = { for: 60, con: 65, tam: 70, des: 55, apa: 50, int: 75, pod: 60, edu: 65 };
const derivIdade = (idade, esc) => ({ nome: "x", idade, caracteristicas: base, escolhasIdade: esc, melhoriasEdu: [], sorte: 50,
  pontosOcupacao: {}, pontosInteresse: {}, ocupacaoId: "", escolhasGrupo: [], livresOcupacao: [], especializacoes: {} });

teste('Idade 15: EDU -5 e divisão de 5 pontos (x = 5 vai para FOR): FOR 55, TAM 70', () => {
  const r = chamar('aplicarIdade', base, 15, [5], []).valores;
  if(r.edu !== 60 || r.for !== 55 || r.tam !== 70 || r.apa !== 50) throw new Error(JSON.stringify(r));
});
teste('Idade 15: divisão com x = 0 tira os 5 pontos de TAM: FOR 60, TAM 65', () => {
  const r = chamar('aplicarIdade', base, 15, [0], []).valores;
  if(r.for !== 60 || r.tam !== 65 || r.edu !== 60) throw new Error(JSON.stringify(r));
});
teste('Idade 19 usa a mesma faixa de 15 (x = 2: FOR 58, TAM 67)', () => {
  const r = chamar('aplicarIdade', base, 19, [2], []).valores;
  if(r.for !== 58 || r.tam !== 67 || r.edu !== 60) throw new Error(JSON.stringify(r));
});
teste('Divisão inválida (texto, ou fora de 0 a 5) não aplica redução de FOR nem de TAM', () => {
  [["apa"], [6], [-1], [null]].forEach(esc => {
    const r = chamar('aplicarIdade', base, 15, esc, []).valores;
    if(r.for !== 60 || r.tam !== 70 || r.edu !== 60) throw new Error(JSON.stringify(esc) + " " + JSON.stringify(r));
  });
});
teste('Idade 20 e 39: sem redução (inclui o +5 aos 20, que não é aplicado) e 1 teste de EDU', () => {
  [20, 39].forEach(idade => {
    if(chamar('melhoriasEduEsperadas', idade) !== 1) throw new Error("testes em " + idade);
    const r = chamar('aplicarIdade', base, idade, [], []).valores;
    if(JSON.stringify(r) !== JSON.stringify(base)) throw new Error("mudou em " + idade);
  });
});
teste('Idade 40: APA -5 e a escolha de FOR, CON ou DES -5; 2 testes de EDU', () => {
  const r = chamar('aplicarIdade', base, 40, ['con'], []).valores;
  if(r.apa !== 45 || r.con !== 60 || r.for !== 60 || r.des !== 55) throw new Error(JSON.stringify(r));
  if(chamar('melhoriasEduEsperadas', 40) !== 2) throw new Error("testes");
});
teste('Idade 50: APA cai -10 no total e 3 testes de EDU', () => {
  const r = chamar('aplicarIdade', base, 50, ['des', 'for'], []).valores;
  if(r.apa !== 40 || r.des !== 50 || r.for !== 55) throw new Error(JSON.stringify(r));
  if(chamar('melhoriasEduEsperadas', 50) !== 3) throw new Error("testes");
});
teste('Idade 60: escolhas de -5, -5 e -10; APA 35; 4 testes de EDU; MOV -3', () => {
  const r = chamar('aplicarIdade', base, 60, ['des', 'for', 'con'], []).valores;
  if(r.des !== 50 || r.for !== 55 || r.con !== 55 || r.apa !== 35) throw new Error(JSON.stringify(r));
  if(chamar('melhoriasEduEsperadas', 60) !== 4) throw new Error("testes");
  if(chamar('movPorIdade', 60) !== -3) throw new Error("mov");
});
teste('Idade 70 e 90: nenhum teste de EDU além do 4º (regra de 2 fontes)', () => {
  [70, 80, 90].forEach(i => { if(chamar('melhoriasEduEsperadas', i) !== 4) throw new Error("testes em " + i); });
});
teste('Idade 90: 5 escolhas, APA -25, FOR 35, CON 20, DES 45, MOV 2 (7 - 5), 4 testes', () => {
  const esc = ['for', 'con', 'des', 'for', 'con'];
  const r = chamar('aplicarIdade', base, 90, esc, []).valores;
  if(r.apa !== 25 || r.for !== 35 || r.con !== 20 || r.des !== 45) throw new Error(JSON.stringify(r));
  const d = chamar('calcDerivados', derivIdade(90, esc));
  if(d.mov !== 2) throw new Error("mov " + d.mov);
  if(chamar('melhoriasEduEsperadas', 90) !== 4) throw new Error("testes");
});
teste('MOV: sem redução aos 15-39; -1 por faixa a partir de 40 (acumulado até -5 aos 80)', () => {
  if(chamar('movPorIdade', 15) !== 0 || chamar('movPorIdade', 19) !== 0 || chamar('movPorIdade', 25) !== 0 || chamar('movPorIdade', 39) !== 0)
    throw new Error("mov antes de 40");
  if(chamar('movPorIdade', 45) !== -1 || chamar('movPorIdade', 50) !== -2 || chamar('movPorIdade', 60) !== -3 ||
     chamar('movPorIdade', 70) !== -4 || chamar('movPorIdade', 80) !== -5)
    throw new Error("mov a partir de 40");
});
teste('MOV base (regra completa): 7 se FOR e DES são ambas menores que TAM; 9 se ambas maiores; 8 nos demais', () => {
  if(chamar('movBase', { for: 60, des: 55, tam: 70 }) !== 7) throw new Error("7");
  if(chamar('movBase', { for: 80, des: 75, tam: 70 }) !== 9) throw new Error("9");
  if(chamar('movBase', { for: 80, des: 50, tam: 70 }) !== 8) throw new Error("8 misto");
  if(chamar('movBase', { for: 70, des: 50, tam: 70 }) !== 8) throw new Error("8 igual");
});
teste('MOV de um investigador de 17 anos com divisão x = 0 (TAM 65): base 7, sem redução por idade', () => {
  const d = chamar('calcDerivados', derivIdade(17, [0]));
  if(d.mov !== 7) throw new Error("mov " + d.mov);
});

/* Varredura de todas as idades válidas: cada faixa tem o número de escolhas e de testes que a tabela promete. */
teste('Varredura 15 a 90: cada idade cai em uma faixa', () => {
  for(let i = 15; i <= 90; i++){
    if(chamar('cocFaixaIdade', i) === null) throw new Error("sem faixa para " + i);
  }
});
teste('Varredura 15 a 90: número de escolhas = 1 (15-19) + faixas de 40 em diante atingidas', () => {
  for(let i = 15; i <= 90; i++){
    const esperado = (i <= 19 ? 1 : 0) + [40, 50, 60, 70, 80].filter(m => i >= m).length;
    const n = chamar('efeitosIdade', i).escolhas;
    if(n !== esperado) throw new Error(`idade ${i}: ${n} escolhas, esperado ${esperado}`);
  }
});
teste('Varredura 15 a 90: testes de EDU = 1 (20 em diante) + faixas de 40, 50 e 60 atingidas (nenhum depois)', () => {
  for(let i = 15; i <= 90; i++){
    const esperado = (i >= 20 ? 1 : 0) + [40, 50, 60].filter(m => i >= m).length;
    const n = chamar('melhoriasEduEsperadas', i);
    if(n !== esperado) throw new Error(`idade ${i}: ${n} testes, esperado ${esperado}`);
  }
});
teste('Sorte em duas rolagens só entre 15 e 19', () => {
  for(let i = 15; i <= 90; i++){
    const esperado = i <= 19;
    if(chamar('sorteDuasRolagens', i) !== esperado) throw new Error("idade " + i);
  }
});
teste('Escolha de alvo inválida (fora das opções) é ignorada, não aplica redução', () => {
  const r = chamar('aplicarIdade', base, 40, ['apa'], []).valores;
  if(r.apa !== 45 || r.for !== 60 || r.con !== 65 || r.des !== 55) throw new Error(JSON.stringify(r));
});
teste('Redução não deixa a característica abaixo de 1', () => {
  const r = chamar('aplicarIdade', Object.assign({}, base, { edu: 3, tam: 4 }), 15, [0], []).valores;
  if(r.edu !== 1 || r.tam !== 1) throw new Error(JSON.stringify(r));
});
teste('Teste de EDU: d100 acima da EDU soma o d10', () => {
  const r = chamar('aplicarIdade', base, 25, [], [{ d100: 70, d10: 6 }]).valores;
  if(r.edu !== 71) throw new Error("edu " + r.edu);
});
teste('Teste de EDU: d100 igual ou abaixo da EDU não soma nada', () => {
  const igual = chamar('aplicarIdade', base, 25, [], [{ d100: 65, d10: 9 }]).valores;
  const abaixo = chamar('aplicarIdade', base, 25, [], [{ d100: 30, d10: null }]).valores;
  if(igual.edu !== 65 || abaixo.edu !== 65) throw new Error("edu mudou");
});
teste('Teste de EDU não passa de 99', () => {
  const r = chamar('aplicarIdade', Object.assign({}, base, { edu: 95 }), 25, [], [{ d100: 96, d10: 10 }]).valores;
  if(r.edu !== 99) throw new Error("edu " + r.edu);
});
fim();
