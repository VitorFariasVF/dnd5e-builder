'use strict';
/* Criação orientada: sugestão de distribuição dos pontos de ocupação (sugerirDistribuicaoOcupacao, engine.js).
   Contas à mão, com EDU 70, DES 50, APA 60, FOR 40, INT 65 (sem ajuste de idade), como em test_pericias.js:
   Professor: EDU × 4 = 280. Explorador (alt APA = 260, DES = 240, FOR = 220). Soldado: DES × 2 = 240 (ou FOR × 2 = 220).
   Os testes também passam a sugestão pela validação do próprio app (validarEtapa, etapa 5): se ela sair errada, o app acusa. */
const { criarAmbiente, estadoExemplo, criarRunner } = require('./ambiente');
const { ctx, val, chamar } = criarAmbiente();
const { teste, fim } = criarRunner('test_sugestao.js');

const car = { for: 40, con: 60, tam: 60, des: 50, apa: 60, int: 65, pod: 55, edu: 70 };
const invDe = (ocupacaoId, extra) => Object.assign(estadoExemplo().investigador, {
  ocupacaoId, ocupacaoAlt: null, idade: null, caracteristicas: car, pontosOcupacao: {}, pontosInteresse: {},
  escolhasGrupo: [], livresOcupacao: [] }, extra || {});
const pool = inv => chamar('poolOcupacao', inv, chamar('caracteristicasFinais', inv));
const soma = mapa => Object.values(mapa || {}).reduce((s, v) => s + v, 0);
/* Sugere para o investigador e aplica no próprio objeto (como a ficha faria). */
function sugerir(inv, escolhas){
  const o = chamar('cocOcupacao', inv.ocupacaoId);
  const r = chamar('sugerirDistribuicaoOcupacao', o, pool(inv), chamar('caracteristicasFinais', inv),
    escolhas || { grupos: inv.escolhasGrupo, livres: inv.livresOcupacao });
  if(r.ok){ inv.pontosOcupacao = r.distribuicao; inv.escolhasGrupo = r.escolhasGrupo; inv.livresOcupacao = r.livresOcupacao; }
  return r;
}
const validaPericias = inv => chamar('validarEtapa', { modo: 'estrito', investigador: inv, etapa: 5 }, 5);

teste('Professor: distribui todo o pool (280), crédito dentro da faixa 20 a 70, validação sem erro', () => {
  const inv = invDe('professor');
  const r = sugerir(inv);
  if(!r.ok) throw new Error(r.motivo);
  if(soma(r.distribuicao) !== 280) throw new Error('soma ' + soma(r.distribuicao));
  if(r.distribuicao.credito < 20 || r.distribuicao.credito > 70) throw new Error('crédito ' + r.distribuicao.credito);
  const v = validaPericias(inv);
  if(v.erros.length || v.avisos.length) throw new Error(JSON.stringify(v));
});

teste('Professor sem grupo: livres vêm das primeiras opções do app e voltam marcadas como sugestão', () => {
  const inv = invDe('professor');
  const r = sugerir(inv);
  if(r.livresOcupacao.join() !== 'arma_pistola,arma_rifle,arqueologia,arte') throw new Error(r.livresOcupacao.join());
  if(r.escolhaSugerida.livres !== true) throw new Error('livres não marcadas como sugestão');
});

teste('Soldado (escolha entre perícias): grupos recebem as primeiras opções, marcadas como sugestão', () => {
  const inv = invDe('soldado', { ocupacaoAlt: 0 });
  const r = sugerir(inv);
  if(!r.ok) throw new Error(r.motivo);
  const esperado = 'arma_pistola|escalar|primeiros,mecanico';
  const obtido = r.escolhasGrupo.map(g => g.join(',')).join('|');
  if(obtido !== esperado) throw new Error(obtido);
  if(r.escolhaSugerida.grupos.some(x => x !== true)) throw new Error('grupo sem marca de sugestão');
  if(soma(r.distribuicao) !== 240) throw new Error('soma ' + soma(r.distribuicao));
  const v = validaPericias(inv);
  if(v.erros.length) throw new Error(JSON.stringify(v.erros));
});

teste('Escolha que o jogador já fez é mantida; só o que falta vem das primeiras opções', () => {
  const r = chamar('sugerirDistribuicaoOcupacao', chamar('cocOcupacao', 'soldado'), 240, car,
    { grupos: [['arma_rifle'], ['nadar']], livres: [] });
  if(r.escolhasGrupo[0].join() !== 'arma_rifle') throw new Error('perdeu a escolha do jogador: ' + r.escolhasGrupo[0]);
  if(r.escolhasGrupo[1].join() !== 'nadar') throw new Error('perdeu a escolha do jogador: ' + r.escolhasGrupo[1]);
  if(r.escolhaSugerida.grupos[0] !== false || r.escolhaSugerida.grupos[1] !== false) throw new Error('marcou escolha do jogador como sugestão');
  if(r.escolhasGrupo[2].length !== 2) throw new Error('grupo de 2 incompleto');
});

teste('Explorador com alternativa DES (pool 240): soma exata e validação sem erro', () => {
  const inv = invDe('explorador', { ocupacaoAlt: 1 });
  const r = sugerir(inv);
  if(!r.ok) throw new Error(r.motivo);
  if(soma(r.distribuicao) !== 240) throw new Error('soma ' + soma(r.distribuicao));
  const v = validaPericias(inv);
  if(v.erros.length) throw new Error(JSON.stringify(v.erros));
});

teste('Teto de 90% (base + pontos): com EDU 99 a perícia EDU (base 99) não recebe pontos e ninguém passa de 90', () => {
  const alto = { for: 40, con: 60, tam: 60, des: 50, apa: 99, int: 65, pod: 55, edu: 99 };
  const inv = invDe('professor', { caracteristicas: alto });
  const r = chamar('sugerirDistribuicaoOcupacao', chamar('cocOcupacao', 'professor'), pool(inv), chamar('caracteristicasFinais', inv), { grupos: [], livres: [] });
  if(!r.ok) throw new Error(r.motivo);
  if(soma(r.distribuicao) !== 396) throw new Error('soma ' + soma(r.distribuicao));
  if(r.distribuicao.idioma_proprio) throw new Error('idioma próprio (base 99) recebeu pontos');
  const finais = chamar('caracteristicasFinais', inv);
  Object.entries(r.distribuicao).forEach(([id, pts]) => {
    const p = val('COC_PERICIAS').find(x => x.id === id);
    const b = id === 'credito' ? 0 : chamar('baseDaPericia', p, finais);
    if(b + pts > 90) throw new Error(id + ' passou de 90 (' + (b + pts) + ')');
  });
  const v = validaPericias(Object.assign(inv, { pontosOcupacao: r.distribuicao, escolhasGrupo: r.escolhasGrupo, livresOcupacao: r.livresOcupacao }));
  if(v.erros.length) throw new Error(JSON.stringify(v.erros));
});

teste('Pontos acima da capacidade do teto: não aplica (ok falso, motivo teto)', () => {
  const r = chamar('sugerirDistribuicaoOcupacao', chamar('cocOcupacao', 'professor'), 5000, car, { grupos: [], livres: [] });
  if(r.ok !== false || r.motivo !== 'teto') throw new Error(JSON.stringify(r));
});

teste('Crédito mínimo da faixa não cabe nos pontos: não aplica (pontos_insuficientes)', () => {
  const r = chamar('sugerirDistribuicaoOcupacao', chamar('cocOcupacao', 'explorador'), 40, car, { grupos: [], livres: [] });
  if(r.ok !== false || r.motivo !== 'pontos_insuficientes') throw new Error(JSON.stringify(r));
});

teste('Sem ocupação: devolve sem_ocupacao, sem erro', () => {
  const r = chamar('sugerirDistribuicaoOcupacao', null, 100, car, {});
  if(r.ok !== false || r.motivo !== 'sem_ocupacao') throw new Error(JSON.stringify(r));
});

teste('Função pura: não altera a ocupação nem as escolhas passadas', () => {
  const antes = val('JSON.stringify(cocOcupacao("soldado"))');
  const esc = { grupos: [['arma_rifle']], livres: [] };
  const escAntes = JSON.stringify(esc);
  chamar('sugerirDistribuicaoOcupacao', chamar('cocOcupacao', 'soldado'), 240, car, esc);
  if(val('JSON.stringify(cocOcupacao("soldado"))') !== antes) throw new Error('ocupação mudou');
  if(JSON.stringify(esc) !== escAntes) throw new Error('escolhas mudaram');
});

teste('Regra de interesse pessoal intacta: sugestão não mexe em pontos de interesse', () => {
  const r = chamar('resumoCriacao', invDe('professor', { pontosInteresse: { escalar: 40 } }));
  if(r.poolInteresse !== 130 || r.gastoInteresse !== 40) throw new Error(JSON.stringify(r));
});

fim();
