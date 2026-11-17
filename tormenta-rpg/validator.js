/* Validações por etapa. Cada erro é { msg, campo } (campo = id do input, para rolar e focar).
   Modo livre: aceita texto livre em raça e classe. Modo estrito: raça e classe têm de vir das tabelas,
   e como as tabelas estão vazias (NÃO VERIFICADO), o modo estrito bloqueia essas etapas. */

const TRPG_ATRIBUTO_MIN = 1;
const TRPG_ATRIBUTO_MAX = 30;

function trpgInteiro(v){ return typeof v === "number" && Number.isInteger(v); }

function trpgValidarAtributo(valor){
  return trpgInteiro(valor) && valor >= TRPG_ATRIBUTO_MIN && valor <= TRPG_ATRIBUTO_MAX;
}

function trpgValidarNivel(valor){
  return trpgInteiro(valor) && valor >= 1 && valor <= TRPG_META.nivelMaximoEscopo;
}

function trpgValidarEtapa(n, personagem, modo){
  const erros = [];
  const p = personagem;
  const estrito = modo === "estrito";

  if(n === 1){
    if(estrito && !String(p.nome || "").trim()) erros.push({ msg: "Informe o nome do personagem para o modo estrito.", campo: "nome" });
    if(!trpgValidarNivel(p.nivel)) erros.push({ msg: "O nível deve ser um número inteiro de 1 a " + TRPG_META.nivelMaximoEscopo + " (escopo desta versão).", campo: "nivel" });
  }

  if(n === 2 || n === 3){
    const campo = n === 2 ? "raca" : "classe";
    const nome = n === 2 ? "raça" : "classe";
    const tabela = n === 2 ? TRPG_RACAS : TRPG_CLASSES;
    const valor = n === 2 ? p.raca : p.classe;
    if(estrito){
      if(Object.keys(tabela).length === 0){
        erros.push({ msg: "A tabela de " + nome + "s ainda não foi verificada (NÃO VERIFICADO). Use o modo livre para continuar.", campo });
      } else if(!tabela[valor]){
        erros.push({ msg: "Escolha uma " + nome + " da lista.", campo });
      }
    }
  }

  if(n === 4){
    TRPG_ATRIBUTOS.forEach(a => {
      const v = p.atributos[a.id];
      if(!trpgValidarAtributo(v)) erros.push({ msg: a.nome + " deve ser um número inteiro de " + TRPG_ATRIBUTO_MIN + " a " + TRPG_ATRIBUTO_MAX + ".", campo: "atr-" + a.id });
    });
  }

  if(n === 5){
    const g = p.pericias.graduacoesGastas;
    if(!trpgInteiro(g) || g < 0) erros.push({ msg: "Graduações gastas deve ser um inteiro igual ou maior que zero.", campo: "gastas" });
    const disp = p.pericias.pontosDisponiveis;
    if(disp !== null && (!trpgInteiro(disp) || disp < 0)) erros.push({ msg: "Pontos disponíveis deve ser um inteiro igual ou maior que zero.", campo: "disponiveis" });
    if(trpgInteiro(g) && trpgInteiro(disp) && g > disp) erros.push({ msg: "Você gastou mais graduações do que os pontos disponíveis.", campo: "gastas" });
  }

  if(n === 9){
    const d = p.derivados;
    if(!trpgInteiro(d.armadura)) erros.push({ msg: "Bônus de armadura deve ser um inteiro.", campo: "armadura" });
    if(!trpgInteiro(d.escudo)) erros.push({ msg: "Bônus de escudo deve ser um inteiro.", campo: "escudo" });
    if(!trpgInteiro(d.tamanho)) erros.push({ msg: "Modificador de tamanho deve ser um inteiro.", campo: "tamanho" });
    if(d.pvAtuais !== null && !trpgInteiro(d.pvAtuais)) erros.push({ msg: "PV atuais deve ser um inteiro.", campo: "pv-atual" });
    if(d.pvMaximo !== null && (!trpgInteiro(d.pvMaximo) || d.pvMaximo < 1)) erros.push({ msg: "PV máximo deve ser um inteiro de pelo menos 1.", campo: "pv-max" });
    if(trpgInteiro(d.pvAtuais) && trpgInteiro(d.pvMaximo) && d.pvAtuais > d.pvMaximo) erros.push({ msg: "PV atuais não pode passar do PV máximo.", campo: "pv-atual" });
  }

  return erros;
}
