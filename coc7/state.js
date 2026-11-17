/* Estado do investigador. Versão do esquema e nome do sistema vão no backup (ver export.js). */
const COC_SISTEMA = "coc7";
const COC_VERSAO_ESQUEMA = 1;
const COC_ETAPAS = [
  "Modo e identidade", "Características", "Idade", "Ocupação", "Perícias de ocupação",
  "Interesse pessoal", "Antecedentes", "Equipamento", "Derivados", "Resumo"
];

function criarInvestigadorInicial(){
  return {
    nome: "",
    jogador: "",
    ocupacaoId: "",
    ocupacaoAlt: null,
    idade: null,
    metodo: null,
    caracteristicas: Object.fromEntries(COC_CARACTERISTICAS.map(c => [c.id, null])),
    escolhasIdade: [],
    melhoriasEdu: [],
    sorteRolagens: [],
    sorte: null,
    pontosOcupacao: {},
    pontosInteresse: {},
    escolhasGrupo: [],
    livresOcupacao: [],
    especializacoes: {},
    antecedentes: { descricao: "", aparencia: "", personalidade: "", ferimentos: "", fobias: "", historia: "" },
    equipamento: ""
  };
}

function criarEstadoInicial(){
  return {
    versaoEsquema: COC_VERSAO_ESQUEMA,
    sistema: COC_SISTEMA,
    modo: "estrito",
    epoca: "classica",
    etapa: 1,
    investigador: criarInvestigadorInicial(),
    currentHistoryId: null
  };
}

/* Preenche chaves que faltam (estado antigo ou importado) sem apagar o que já existe. */
function garantirEstado(estado){
  const base = criarEstadoInicial();
  const out = Object.assign(base, estado || {});
  out.investigador = Object.assign(criarInvestigadorInicial(), out.investigador || {});
  out.investigador.caracteristicas = Object.assign(criarInvestigadorInicial().caracteristicas, out.investigador.caracteristicas || {});
  out.investigador.antecedentes = Object.assign(criarInvestigadorInicial().antecedentes, out.investigador.antecedentes || {});
  out.sistema = COC_SISTEMA;
  out.versaoEsquema = COC_VERSAO_ESQUEMA;
  if(!["estrito", "livre"].includes(out.modo)) out.modo = "estrito";
  if(!["classica", "moderna"].includes(out.epoca)) out.epoca = "classica";
  out.etapa = Math.min(Math.max(1, Number(out.etapa) || 1), COC_ETAPAS.length);
  return out;
}
