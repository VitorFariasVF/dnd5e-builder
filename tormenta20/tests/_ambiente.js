/* Ambiente de testes (Node, vm). Carrega os scripts do sistema na mesma ordem da página
   e conta as falhas. Não precisa de navegador nem de dependências. */
const vm = require("vm");
const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..", "..");       // raiz do repositório
const PASTA = path.join(__dirname, "..");            // tormenta20/
const SCRIPTS = ["tormenta20/rules.js", "tormenta20/rules-niveis.js", "tormenta20/rules-poderes.js", "tormenta20/rules-magias.js", "tormenta20/rules-magias-1-2.js", "tormenta20/rules-magias-3-5.js", "tormenta20/rules-magias-fim.js", "tormenta20/rules-racas.js", "tormenta20/rules-equipamento.js",
  "tormenta20/state.js", "tormenta20/validator.js", "tormenta20/engine.js",
  "tormenta20/storage.js", "tormenta20/export.js", "tormenta20/export-pdf.js"];

/* Nomes declarados com `const` nos scripts: não viram propriedade do contexto, então
   expomos cada um por getter (ctx.state, ctx.T20_RACAS etc.). */
const NOMES_CONST = ["state", "T20_MAGIAS", "T20_MAGIAS_PENDENTES", "T20_MAGIAS_PROGRESSAO", "T20_RACAS_COMPLETAS",
  "T20_ARMAS", "T20_ARMADURAS", "T20_ITENS", "T20_EQUIPAMENTO_STATUS", "T20_SISTEMA", "T20_VERSAO_ESQUEMA", "T20_EDICAO", "T20_ATRIBUTOS", "T20_ATRIBUTO_IDS",
  "T20_ATRIBUTO_NOME", "T20_PONTOS_COMPRA", "T20_MODIFICADOR_FONTE", "T20_PERICIAS", "T20_PERICIA_NOMES",
  "T20_PERICIA_FONTE", "T20_TREINO_FONTE", "T20_ORIGENS", "T20_ORIGEM_FONTE", "T20_CLASSES",
  "T20_CLASSE_IDS", "T20_CIRCULOS", "T20_CIRCULOS_FONTE", "T20_NIVEL_MIN", "T20_NIVEL_MAX", "T20_NIVEL_BASE", "T20_VERSAO_ESQUEMA_ANTERIOR", "T20_DINHEIRO_FONTE",
  "T20_DEFESA_FONTE", "T20_PV_FONTE", "T20_PM_FONTE", "T20_PDF_PALETA", "T20_PDF_COR_PADRAO", "T20_PDF_CSS",
  "T20_NIVEIS", "T20_PODERES", "T20_ORIGENS_BENEFICIOS", "T20_BONUS_TREINAMENTO", "T20_BONUS_TREINAMENTO_FONTE"];

function carregar(arquivos){
  const ctx = { console, Math, Date, JSON, Number, String, Object, Array, Set, Map, Symbol, Promise, setTimeout, clearTimeout };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  for(const f of arquivos){
    const codigo = fs.readFileSync(path.join(RAIZ, f), "utf8");
    vm.runInContext(codigo, ctx, { filename: f });
  }
  for(const nome of NOMES_CONST){
    Object.defineProperty(ctx, nome, { get: () => vm.runInContext(nome, ctx), configurable: true });
  }
  return ctx;
}

/* Contador de checagens: check(nome, condicao, detalhe) */
function criarTeste(titulo){
  let falhas = 0, total = 0;
  const linhas = [];
  return {
    check(nome, cond, detalhe){
      total++;
      if(!cond){ falhas++; linhas.push(`  FALHOU: ${nome}${detalhe !== undefined ? " -> " + JSON.stringify(detalhe) : ""}`); }
      else linhas.push(`  ok: ${nome}`);
    },
    igual(nome, obtido, esperado){
      const ok = JSON.stringify(obtido) === JSON.stringify(esperado);
      this.check(nome, ok, ok ? undefined : { obtido, esperado });
    },
    fim(){
      console.log(`== ${titulo}: ${total - falhas}/${total} ok`);
      linhas.forEach(l => console.log(l));
      if(falhas) { console.log(`   ${falhas} falha(s)`); process.exitCode = 1; }
      return falhas === 0;
    }
  };
}

/* Monta um personagem completo num contexto: usa os valores de `dados` sobre o estado inicial. */
function montarPersonagem(ctx, dados){
  ctx.resetStateToInitial();
  const p = ctx.state.personagem;
  Object.assign(p, JSON.parse(JSON.stringify(dados)));
  ctx.ensureStateShape();
  return ctx.state;
}

module.exports = { carregar, criarTeste, montarPersonagem, SCRIPTS, RAIZ, PASTA };
