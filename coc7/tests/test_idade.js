'use strict';
/* Ajustes de idade em todas as faixas. Os números esperados vêm da tabela de faixas em rules.js,
   que está NÃO VERIFICADA em duas fontes públicas: estes testes provam que o motor aplica a tabela,
   não que a tabela é a do livro (isso fica na auditoria).
   Conta à mão para idade 15: EDU -5 e FOR ou TAM -5 (escolha), MOV -1, sem teste de EDU, sorte em duas rolagens.
   Idade 40: APA -5, uma de FOR/CON/DES -5, MOV -1, testes de EDU: 20-39 (1) + 40-49 (1) = 2.
   Idade 50: APA -10 no total (40 e 50 acumulam), duas escolhas, MOV -2, testes de EDU: 1 + 1 + 1 = 3.
   Idade 90: faixas 40, 50, 60, 70 e 80 acumulam: APA -25, cinco escolhas, MOV -5 (8 - 5 = 3), testes de EDU 1 + 5 = 6. */
const { criarAmbiente, criarRunner } = require('./ambiente');
const { chamar } = criarAmbiente();
const { teste, fim } = criarRunner('test_idade.js');

const base = { for: 60, con: 65, tam: 70, des: 55, apa: 50, int: 75, pod: 60, edu: 65 };

teste('Idade 15: EDU -5 e a escolha FOR ou TAM -5', () => {
  const r = chamar('aplicarIdade', base, 15, ['tam'], []).valores;
  if(r.edu !== 60 || r.tam !== 65 || r.for !== 60 || r.apa !== 50) throw new Error(JSON.stringify(r));
});
teste('Idade 15: escolha FOR ou TAM aceita FOR', () => {
  const r = chamar('aplicarIdade', base, 15, ['for'], []).valores;
  if(r.for !== 55 || r.tam !== 70) throw new Error(JSON.stringify(r));
});
teste('Idade 19 usa a mesma faixa de 15', () => {
  const r = chamar('aplicarIdade', base, 19, ['for'], []).valores;
  if(r.edu !== 60 || r.for !== 55) throw new Error(JSON.stringify(r));
});
teste('Idade 20 e 39: sem redução e com 1 teste de EDU', () => {
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
teste('Idade 50: APA cai -10 no total (40 e 50 acumulam) e 2 escolhas', () => {
  const r = chamar('aplicarIdade', base, 50, ['des', 'for'], []).valores;
  if(r.apa !== 40 || r.des !== 50 || r.for !== 55) throw new Error(JSON.stringify(r));
  if(chamar('melhoriasEduEsperadas', 50) !== 3) throw new Error("testes");
});
teste('Idade 90: 5 escolhas, APA -25, MOV 3, 6 testes de EDU', () => {
  const esc = ['for', 'con', 'des', 'for', 'con'];
  const r = chamar('aplicarIdade', base, 90, esc, []).valores;
  if(r.apa !== 25) throw new Error("apa " + r.apa);
  if(chamar('movPorIdade', 90) !== -5 || chamar('calcDerivados', { nome: "x", idade: 90, caracteristicas: base, escolhasIdade: esc, melhoriasEdu: [], sorte: 50, pontosOcupacao: {}, pontosInteresse: {}, ocupacaoId: "", escolhasGrupo: [], livresOcupacao: [], especializacoes: {} }).mov !== 3)
    throw new Error("mov");
  if(chamar('melhoriasEduEsperadas', 90) !== 6) throw new Error("testes");
});
teste('MOV: 8 base, -1 nas faixas 15-19 e 40 em diante, 8 em 20-39', () => {
  if(chamar('movPorIdade', 15) !== -1 || chamar('movPorIdade', 25) !== 0 || chamar('movPorIdade', 45) !== -1 || chamar('movPorIdade', 60) !== -3)
    throw new Error("mov por idade");
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
teste('Varredura 15 a 90: testes de EDU = soma das faixas atingidas', () => {
  for(let i = 15; i <= 90; i++){
    const esperado = (i >= 20 ? 1 : 0) + [40, 50, 60, 70, 80].filter(m => i >= m).length;
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
teste('Escolha inválida (fora das opções) é ignorada, não aplica redução', () => {
  const r = chamar('aplicarIdade', base, 15, ['apa'], []).valores;
  if(r.apa !== 50 || r.for !== 60 || r.tam !== 70) throw new Error(JSON.stringify(r));
});
teste('Redução não deixa a característica abaixo de 1', () => {
  const r = chamar('aplicarIdade', Object.assign({}, base, { edu: 3, tam: 4 }), 15, ['tam'], []).valores;
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
