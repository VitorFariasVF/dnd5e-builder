'use strict';
/* Validações: caso aceito e caso recusado para cada regra de criação. No modo livre os erros viram avisos. */
const { criarAmbiente, estadoExemplo, criarRunner } = require('./ambiente');
const { chamar } = criarAmbiente();
const { teste, fim } = criarRunner('test_validacao.js');

const v = (estado, etapa) => chamar('validarEtapa', estado, etapa);
const comCampo = (lista, campo) => lista.some(i => i.campo === campo);
const comTexto = (lista, trecho) => lista.some(i => i.msg.includes(trecho));
const edita = (fn, modo) => { const e = estadoExemplo(); if(modo) e.modo = modo; fn(e.investigador, e); return e; };

/* Exemplo completo passa em todas as etapas (modo estrito). */
teste('Exemplo completo: nenhum erro ao concluir (etapa 10)', () => {
  const r = v(estadoExemplo(), 10);
  if(r.erros.length) throw new Error(JSON.stringify(r.erros));
});
teste('Exemplo completo: a regra de idade aparece como aviso NÃO VERIFICADO', () => {
  if(!comTexto(v(estadoExemplo(), 3).avisos, "NÃO VERIFICADAS")) throw new Error("sem aviso");
});

/* Etapa 1 */
teste('Etapa 1 recusa nome vazio no modo estrito', () => {
  const r = v(edita(i => i.nome = "  "), 1);
  if(!comCampo(r.erros, "nome")) throw new Error("não recusou");
});
teste('Etapa 1 aceita nome vazio no modo livre (vira aviso)', () => {
  const r = v(edita(i => i.nome = "", "livre"), 1);
  if(r.erros.length || !comCampo(r.avisos, "nome")) throw new Error(JSON.stringify(r));
});
teste('Etapa 1 recusa nome com mais de 60 caracteres', () => {
  if(!comCampo(v(edita(i => i.nome = "x".repeat(61)), 1).erros, "nome")) throw new Error("aceitou");
});

/* Etapa 2: características */
teste('Etapa 2 recusa método não escolhido', () => {
  if(!comCampo(v(edita(i => i.metodo = null), 2).erros, "metodo")) throw new Error("aceitou");
});
teste('Etapa 2 recusa característica rolada que não é múltiplo de 5', () => {
  if(!comCampo(v(edita(i => i.caracteristicas.con = 66), 2).erros, "car-con")) throw new Error("aceitou");
});
teste('Etapa 2 recusa rolagem de 3d6 × 5 acima de 90', () => {
  if(!comCampo(v(edita(i => i.caracteristicas.for = 95), 2).erros, "car-for")) throw new Error("aceitou");
});
teste('Etapa 2 recusa 2d6+6 × 5 abaixo de 40 (TAM, INT, EDU)', () => {
  if(!comCampo(v(edita(i => i.caracteristicas.tam = 35), 2).erros, "car-tam")) throw new Error("aceitou");
});
teste('Etapa 2 aceita distribuição exata 40, 50, 50, 50, 60, 60, 70, 80', () => {
  const e = edita(i => {
    i.metodo = "distribuir";
    const valores = [40, 50, 50, 50, 60, 60, 70, 80];
    ["for", "con", "tam", "des", "apa", "int", "pod", "edu"].forEach((k, n) => i.caracteristicas[k] = valores[n]);
  });
  const r = v(e, 2);
  if(r.erros.length) throw new Error(JSON.stringify(r.erros));
});
teste('Etapa 2 recusa distribuição com um valor trocado', () => {
  const e = edita(i => {
    i.metodo = "distribuir";
    const valores = [40, 50, 50, 50, 60, 60, 70, 90];
    ["for", "con", "tam", "des", "apa", "int", "pod", "edu"].forEach((k, n) => i.caracteristicas[k] = valores[n]);
  });
  if(!v(e, 2).erros.length) throw new Error("aceitou");
});
teste('Etapa 2 recusa método manual no modo estrito', () => {
  const e = edita(i => { i.metodo = "manual"; });
  if(!comTexto(v(e, 2).erros, "No modo estrito")) throw new Error("aceitou");
});
teste('Etapa 2 aceita valores digitados no modo livre', () => {
  const e = edita(i => { i.metodo = "manual"; i.caracteristicas.for = 33; i.caracteristicas.tam = 77; }, "livre");
  const r = v(e, 2);
  if(r.erros.length) throw new Error(JSON.stringify(r.erros));
});
teste('Etapa 2 recusa característica faltando', () => {
  if(!v(edita(i => i.caracteristicas.pod = null), 2).erros.length) throw new Error("aceitou");
});

/* Etapa 3: idade */
teste('Etapa 3 recusa idade 14 e 91', () => {
  if(!comCampo(v(edita(i => i.idade = 14), 3).erros, "idade")) throw new Error("14");
  if(!comCampo(v(edita(i => i.idade = 91), 3).erros, "idade")) throw new Error("91");
});
teste('Etapa 3 aceita idade 15 com a divisão de 5 pontos entre FOR e TAM (x = 2)', () => {
  const e = edita(i => { i.idade = 15; i.escolhasIdade = [2]; i.melhoriasEdu = []; });
  const r = v(e, 3);
  if(r.erros.length) throw new Error(JSON.stringify(r.erros));
});
teste('Etapa 3 recusa divisão de 15 anos com valor fora de 0 a 5', () => {
  if(!comCampo(v(edita(i => { i.idade = 15; i.escolhasIdade = [7]; i.melhoriasEdu = []; }), 3).erros, "idade-esc-0")) throw new Error("aceitou 7");
});
teste('Etapa 3 recusa idade 15 sem a escolha de redução', () => {
  if(!comCampo(v(edita(i => { i.idade = 15; i.escolhasIdade = []; }), 3).erros, "idade-esc-0")) throw new Error("aceitou");
});
teste('Etapa 3 recusa escolha de redução fora das opções', () => {
  if(!comCampo(v(edita(i => { i.idade = 15; i.escolhasIdade = ["apa"]; }), 3).erros, "idade-esc-0")) throw new Error("aceitou");
});
teste('Etapa 3 recusa idade 25 sem o teste de EDU', () => {
  if(!comCampo(v(edita(i => { i.idade = 25; i.melhoriasEdu = []; }), 3).erros, "idade-melhoria-0")) throw new Error("aceitou");
});
teste('Etapa 3 recusa d100 acima da EDU sem o d10 do ganho', () => {
  if(!comCampo(v(edita(i => { i.idade = 25; i.melhoriasEdu = [{ d100: 70, d10: null }]; }), 3).erros, "idade-melhoria-0")) throw new Error("aceitou");
});
teste('Etapa 3 aceita d100 acima da EDU com d10 válido', () => {
  const r = v(edita(i => { i.idade = 25; i.melhoriasEdu = [{ d100: 70, d10: 6 }]; }), 3);
  if(r.erros.length) throw new Error(JSON.stringify(r.erros));
});
teste('Etapa 3 recusa d100 fora de 1 a 100', () => {
  if(!v(edita(i => { i.idade = 25; i.melhoriasEdu = [{ d100: 101, d10: null }]; }), 3).erros.length) throw new Error("aceitou");
});
teste('Etapa 3 idade 45 pede 2 testes de EDU e 1 escolha', () => {
  const sem = edita(i => { i.idade = 45; i.escolhasIdade = ["con"]; i.melhoriasEdu = [{ d100: 30, d10: null }]; });
  if(!comCampo(v(sem, 3).erros, "idade-melhoria-1") && !v(sem, 3).erros.some(e => e.msg.includes("2 teste"))) throw new Error("aceitou dois testes com um");
  const ok = edita(i => { i.idade = 45; i.escolhasIdade = ["con"]; i.melhoriasEdu = [{ d100: 30, d10: null }, { d100: 50, d10: null }]; });
  const r = v(ok, 3);
  if(r.erros.length) throw new Error(JSON.stringify(r.erros));
});

/* Etapa 4 e 5: ocupação e perícias */
teste('Etapa 4 recusa ocupação não escolhida', () => {
  if(!comCampo(v(edita(i => i.ocupacaoId = ""), 4).erros, "ocupacao")) throw new Error("aceitou");
});
teste('Etapa 4 exige a característica da fórmula do Explorador', () => {
  if(!comCampo(v(edita(i => { i.ocupacaoId = "explorador"; i.ocupacaoAlt = null; }), 4).erros, "ocupacao-alt")) throw new Error("aceitou");
  if(v(edita(i => { i.ocupacaoId = "explorador"; i.ocupacaoAlt = 0; }), 4).erros.length) throw new Error("recusou alt 0");
});
teste('Etapa 5 recusa pontos que não somam o total (259 de 260)', () => {
  const r = v(edita(i => i.pontosOcupacao.historia = 29), 5);
  if(!comTexto(r.erros, "Distribuiu 259 de 260")) throw new Error(JSON.stringify(r.erros));
});
teste('Etapa 5 no modo livre o mesmo problema vira aviso', () => {
  const r = v(edita(i => i.pontosOcupacao.historia = 29, "livre"), 5);
  if(r.erros.length || !comTexto(r.avisos, "Distribuiu 259")) throw new Error(JSON.stringify(r));
});
teste('Etapa 5 recusa crédito fora da faixa do Professor (20 a 70)', () => {
  const r = v(edita(i => { i.pontosOcupacao.credito = 75; i.pontosOcupacao.biblioteca = 30; }), 5);
  if(!comTexto(r.erros, "Crédito 75% fora da faixa")) throw new Error(JSON.stringify(r.erros));
});
teste('Etapa 5: perícia acima de 90% é só aviso "regra não confirmada" (não bloqueia, modo estrito)', () => {
  const r = v(edita(i => { i.pontosOcupacao.biblioteca = 75; i.pontosOcupacao.historia = 0; i.pontosOcupacao.natureza = 30; i.pontosOcupacao.psicologia = 55; }), 5);
  if(r.erros.length) throw new Error(JSON.stringify(r.erros));
  if(!comTexto(r.avisos, "passou de 90") || !comTexto(r.avisos, "regra não confirmada")) throw new Error(JSON.stringify(r.avisos));
});
teste('Etapa 5: o mesmo aviso de 90% no modo livre fica nos avisos', () => {
  const r = v(edita(i => { i.pontosOcupacao.biblioteca = 75; i.pontosOcupacao.historia = 0; i.pontosOcupacao.natureza = 30; i.pontosOcupacao.psicologia = 55; }, "livre"), 5);
  if(r.erros.length || !comTexto(r.avisos, "regra não confirmada")) throw new Error(JSON.stringify(r));
});
teste('Etapa 6: perícia de interesse acima de 90% também é só aviso', () => {
  const r = v(edita(i => { i.pontosInteresse.escalar = 75; i.pontosInteresse.furtividade = 30; i.pontosInteresse.briga = 40; i.pontosInteresse.esquivar = 5; }), 6);
  if(r.erros.length || !comTexto(r.avisos, "regra não confirmada")) throw new Error(JSON.stringify(r));
});
teste('Etapa 5 recusa pontos em perícia que não é da ocupação (Briga)', () => {
  const r = v(edita(i => { i.pontosOcupacao.briga = 10; i.pontosOcupacao.historia = 20; }), 5);
  if(!comTexto(r.erros, "não é perícia desta ocupação")) throw new Error(JSON.stringify(r.erros));
});
teste('Etapa 5 recusa pontos em Mitos de Cthulhu', () => {
  const r = v(edita(i => { i.pontosOcupacao.mitos = 5; i.pontosOcupacao.historia = 25; }), 5);
  if(!r.erros.length) throw new Error("aceitou");
});
teste('Etapa 5 recusa número errado de perícias livres (3 em vez de 4)', () => {
  if(!comCampo(v(edita(i => i.livresOcupacao = ["historia", "ocultismo", "natureza"]), 5).erros, "livres")) throw new Error("aceitou");
});
teste('Etapa 5 recusa Explorador sem a escolha de Escalar ou Nadar', () => {
  const e = edita(i => { i.ocupacaoId = "explorador"; i.ocupacaoAlt = 0; i.pontosOcupacao = { credito: 0 }; i.livresOcupacao = []; i.escolhasGrupo = []; });
  if(!comCampo(v(e, 5).erros, "grupo-0")) throw new Error("aceitou");
});

/* Etapa 6: interesse pessoal */
teste('Etapa 6 recusa pontos de interesse que não somam (149 de 150)', () => {
  if(!comTexto(v(edita(i => i.pontosInteresse.escalar = 39), 6).erros, "Distribuiu 149 de 150")) throw new Error("aceitou");
});
teste('Etapa 6 recusa perícia de ocupação dentro do interesse pessoal', () => {
  const r = v(edita(i => { i.pontosInteresse.biblioteca = 10; i.pontosInteresse.escalar = 30; }), 6);
  if(!comTexto(r.erros, "já é perícia de ocupação")) throw new Error(JSON.stringify(r.erros));
});

/* Etapa 9: derivados */
teste('Etapa 9 recusa Sorte não rolada', () => {
  if(!comCampo(v(edita(i => i.sorte = null), 9).erros, "sorte")) throw new Error("aceitou");
});
teste('Etapa 9 recusa Sorte que não é múltiplo de 5', () => {
  if(!comCampo(v(edita(i => i.sorte = 52), 9).erros, "sorte")) throw new Error("aceitou");
});
teste('Etapa 9 entre 15 e 19 anos exige duas rolagens e a maior como Sorte', () => {
  if(!v(edita(i => { i.idade = 17; i.sorteRolagens = []; }), 9).erros.length) throw new Error("aceitou sem duas");
  if(!v(edita(i => { i.idade = 17; i.sorteRolagens = [30, 50]; i.sorte = 30; }), 9).erros.length) throw new Error("aceitou a menor");
  if(v(edita(i => { i.idade = 17; i.sorteRolagens = [30, 50]; i.sorte = 50; }), 9).erros.length) throw new Error("recusou a maior");
});

/* Aceita/recusa do conjunto: etapa 10 junta todas as anteriores. */
teste('Etapa 10 recusa ficha com nome e Sorte faltando (estrito)', () => {
  const r = v(edita(i => { i.nome = ""; i.sorte = null; }), 10);
  if(!comCampo(r.erros, "nome") || !comCampo(r.erros, "sorte")) throw new Error(JSON.stringify(r.erros));
});
teste('Etapa 10 no modo livre não tem erros, só avisos', () => {
  const r = v(edita(i => { i.nome = ""; i.sorte = null; }, "livre"), 10);
  if(r.erros.length || !r.avisos.length) throw new Error(JSON.stringify(r));
});
fim();
