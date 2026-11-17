'use strict';
/* Ambiente dos testes: carrega os arquivos de cálculo, regras e backup numa vm (sem DOM), e um investigador de exemplo
   cujos números foram conferidos à mão (ver comentários em cada teste). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = path.resolve(__dirname, '..');
const NUCLEO = ['rules.js', 'rules-ocupacoes.js', 'engine.js', 'state.js', 'validator.js', 'storage.js', 'export.js', 'export-pdf.js'];

function criarAmbiente(){
  const ctx = vm.createContext({ console, Math, JSON, Date });
  for(const f of NUCLEO) vm.runInContext(fs.readFileSync(path.join(DIR, f), 'utf8'), ctx, { filename: f });
  const val = expr => {
    const r = vm.runInContext(expr, ctx);
    return r === undefined ? undefined : JSON.parse(JSON.stringify(r));
  };
  const chamar = (nome, ...args) => {
    ctx.__args = JSON.parse(JSON.stringify(args));
    return val(`${nome}(...__args)`);
  };
  return { ctx, val, chamar };
}

/* Investigador de exemplo válido (modo estrito, época clássica, idade 30, Professor).
   Características (valor final, sem ajuste de idade, pois 20-39 não reduz nada):
   FOR 60, CON 65, TAM 70, DES 55, APA 50, INT 75, POD 60, EDU 65.
   Pontos de ocupação (Professor, fórmula EDU × 4 = 260): crédito 45, Biblioteca 60, Idioma (outro) 30,
   Psicologia 40, História 30, Ocultismo 25, Natureza 30 = 260. Livres: História, Ocultismo, Natureza, Arqueologia.
   Pontos de interesse (INT × 2 = 150): Escalar 40, Furtividade 30, Briga 40, Esquivar 40 = 150.
   Sorte 50 (uma rolagem). Melhoria de EDU: d100 40, abaixo da EDU 65, sem ganho. */
function estadoExemplo(){
  return {
    versaoEsquema: 1, sistema: "coc7", modo: "estrito", epoca: "classica", etapa: 10, currentHistoryId: null,
    investigador: {
      nome: "Ellen Vance", jogador: "Teste", ocupacaoId: "professor", ocupacaoAlt: null, idade: 30, metodo: "rolar",
      caracteristicas: { for: 60, con: 65, tam: 70, des: 55, apa: 50, int: 75, pod: 60, edu: 65 },
      escolhasIdade: [], melhoriasEdu: [{ d100: 40, d10: null }], sorteRolagens: [], sorte: 50,
      pontosOcupacao: { credito: 45, biblioteca: 60, idioma_outro: 30, psicologia: 40, historia: 30, ocultismo: 25, natureza: 30 },
      pontosInteresse: { escalar: 40, furtividade: 30, briga: 40, esquivar: 40 },
      escolhasGrupo: [], livresOcupacao: ["historia", "ocultismo", "natureza", "arqueologia"],
      especializacoes: {},
      antecedentes: { descricao: "Professora de história antiga.", aparencia: "Óculos finos.", personalidade: "Metódica.", ferimentos: "", fobias: "Água parada", historia: "Pesquisou um manuscrito." },
      equipamento: "Lanterna\nCaderno de notas\nRevólver calibre .32"
    }
  };
}

/* Conta testes; imprime cada resultado e sai com código ≠ 0 se algum falhar. */
function criarRunner(nomeArquivo){
  const resultados = [];
  const teste = (nome, fn) => {
    try { fn(); resultados.push({ nome, ok: true }); }
    catch(err){ resultados.push({ nome, ok: false, erro: err && err.message ? err.message : String(err) }); }
  };
  const fim = () => {
    const falhas = resultados.filter(r => !r.ok);
    console.log(`${nomeArquivo}: ${resultados.length - falhas.length}/${resultados.length} ok`);
    falhas.forEach(f => console.log("  FALHA:", f.nome, "->", f.erro));
    if(falhas.length) process.exitCode = 1;
  };
  return { teste, fim };
}

module.exports = { criarAmbiente, estadoExemplo, criarRunner, DIR };
