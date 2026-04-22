function calcularMod(valor){ return Math.floor((valor-10)/2); }
function validarOrigem(){ return state.personagem.origem ? null : "Selecione uma origem."; }
function validarRaca(){ return state.personagem.raca ? null : "Selecione uma raça."; }
function validarClasse(){ if(!state.personagem.classe) return "Selecione uma classe."; if((state.personagem.nivel||1) < 1 || (state.personagem.nivel||1) > 20) return "O nível precisa ficar entre 1 e 20."; const nivel=state.personagem.nivel||1; const unlock=getSubclassUnlockLevel(state.personagem.classe); if(state.modo === "A" && nivel >= unlock && getSubclassOptions(state.personagem.classe).length && !state.personagem.subclasse) return "Selecione uma subclasse para esse nível."; return null; }

function validarPericias(){
  const classeKey = state.personagem.classe;
  if(!classeKey || !CLASSES[classeKey]) return "Selecione uma classe antes das perícias.";
  const regra = CLASSES[classeKey].escolhaPericias;
  const escolhidas = state.personagem.periciasClasseSelecionadas || [];
  if(state.modo === "A"){
    if(escolhidas.length !== regra.quantidade) return `Escolha exatamente ${regra.quantidade} perícias da classe.`;
    if(escolhidas.some(p => state.personagem.periciasOrigem.includes(p))) return "Não repita perícias já recebidas pela origem.";
    if(escolhidas.some(p => !regra.opcoes.includes(p))) return "Há perícias inválidas para a classe.";
  }
  return null;
}

function validarStandardArray(valores){
  const esperado = [...ATTRIBUTE_METHODS.standard.valores].sort((a,b)=>a-b).join(",");
  const recebido = Object.values(valores).sort((a,b)=>a-b).join(",");
  return esperado === recebido;
}
function validarPointBuy(valores){
  let total = 0;
  for(const attr in valores){
    const custo = ATTRIBUTE_METHODS.pointbuy.custos[valores[attr]];
    if(custo === undefined) return false;
    total += custo;
  }
  return total <= ATTRIBUTE_METHODS.pointbuy.pontos;
}

function personagemEhProficienteComArmadura(armor){
  const profs = state.personagem.proficienciasClasse || [];
  if(!armor) return false;
  if(armor.tipo === "nenhuma") return true;
  if(profs.includes("Todas as armaduras")) return true;
  if(armor.tipo === "leve" && profs.includes("Armaduras leves")) return true;
  if(armor.tipo === "media" && profs.includes("Armaduras médias")) return true;
  if(armor.tipo === "pesada" && (profs.includes("Armaduras pesadas") || profs.includes("Todas as armaduras"))) return true;
  return false;
}
function personagemEhProficienteComArma(weapon){
  const profs = state.personagem.proficienciasClasse || [];
  if(!weapon) return false;
  if(profs.includes("Armas simples") && weapon.categoria === "simples") return true;
  if(profs.includes("Armas marciais") && weapon.categoria === "marcial") return true;
  return profs.some(p => weapon.nome.toLowerCase().includes(p.toLowerCase().replace(/[ãs]/g,"a")) || p.toLowerCase().includes(weapon.nome.toLowerCase()));
}

function validarCombate(){
  const c = state.personagem.combate;
  if(!ARMORS[c.armadura]) return "Selecione uma armadura válida.";
  if(!WEAPONS[c.armaPrincipal]) return "Selecione uma arma principal válida.";
  if(!WEAPONS[c.armaSecundaria]) return "Selecione uma arma secundária válida.";
  if(state.modo === "A"){
    if(!personagemEhProficienteComArmadura(ARMORS[c.armadura])) return "A classe não é proficiente com a armadura escolhida.";
    if(!personagemEhProficienteComArma(WEAPONS[c.armaPrincipal])) return "A classe não é proficiente com a arma principal escolhida.";
    if(!personagemEhProficienteComArma(WEAPONS[c.armaSecundaria])) return "A classe não é proficiente com a arma secundária escolhida.";
    if(c.escudo && !(state.personagem.proficienciasClasse || []).includes("Escudos")) return "A classe não é proficiente com escudos.";
  }
  return null;
}

function validarMagia(){
  if(!state.personagem.magia.ehConjurador) return null;
  if(state.modo === "A" && !state.personagem.magia.habilidade) return "Classe conjuradora sem habilidade de magia definida.";
  return null;
}

function validarMagiasSelecionadas(){
  const magia = state.personagem.magia;
  if(!magia.ehConjurador || state.modo !== "A") return null;
  if((magia.listaTruques || []).length > (magia.cantripsConhecidos || 0)) return "Você selecionou mais truques do que o permitido.";
  if(magia.tipo === "conhecidas" && (magia.listaMagias || []).length > (magia.magiasConhecidas || 0)) return "Você selecionou mais magias conhecidas do que o permitido.";
  if(magia.tipo === "preparadas" && (magia.listaMagias || []).length > (magia.magiasPreparadas || 0)) return "Você preparou mais magias do que o permitido.";
  return null;
}

function validarUsoEspaco(circulo){
  const magia = state.personagem.magia;
  if(!magia.ehConjurador) return "Classe sem magia.";
  const idx = Number(circulo)-1;
  if((magia.espacosAtuais[idx] || 0) <= 0) return "Não há espaços disponíveis nesse círculo.";
  return null;
}

function validarPersonalidade(){
  const p = state.personagem.personalidade;
  if(state.modo !== "A") return null;
  if((p.tracos || []).length < 1) return "Selecione ao menos um traço de personalidade.";
  if((p.ideais || []).length < 1) return "Selecione ao menos um ideal.";
  if((p.vinculos || []).length < 1) return "Selecione ao menos um vínculo.";
  if((p.defeitos || []).length < 1) return "Selecione ao menos um defeito.";
  return null;
}

function validarEquipamentoInicial(){
  if(state.modo !== "A") return null;
  const loadout = EQUIPMENT_LOADOUTS[state.personagem.classe] || [];
  for(const group of loadout){
    if(!state.personagem.equipamentoInicialEscolhas[group.id]) return `Escolha o equipamento inicial em "${group.label}".`;
  }
  return null;
}

function validarInventarioPeso(){
  return state.personagem.inventario.pesoTotal <= state.personagem.inventario.capacidadeCarga ? null : "O personagem excedeu a capacidade de carga.";
}

function validarOpcoesClasse(){
  if(typeof getClassOptionGroups !== "function") return null;
  const personagem = state.personagem;
  const groups = getClassOptionGroups(personagem.classe, personagem.nivel||1, personagem.subclasse);
  const escolhas = personagem.opcoesClasse || {};
  for(const group of groups){
    const valor = escolhas[group.id];
    if(group.multiple){
      const arr = Array.isArray(valor) ? valor.filter(Boolean) : [];
      if(state.modo === "A" && arr.length !== group.count) return `Selecione ${group.count} opção(ões) em "${group.label}".`;
    } else {
      if(state.modo === "A" && !valor) return `Selecione uma opção em "${group.label}".`;
    }
  }
  return null;
}

function validarPersonagemCompleto(){
  const erros = [];
  const avisos = [];

  [validarOrigem(),validarRaca(),validarClasse(),validarPericias(),validarCombate(),validarMagia(),validarMagiasSelecionadas(),validarPersonalidade(),validarEquipamentoInicial(),validarInventarioPeso(),validarOpcoesClasse()].forEach(erro=>{ if(erro) erros.push(erro); });

  const attrsBase = state.personagem.atributosBase || {};
  if(state.personagem.metodoAtributos === "standard" && !validarStandardArray(attrsBase)) erros.push("Os atributos base não correspondem ao Standard Array.");
  if(state.personagem.metodoAtributos === "pointbuy" && !validarPointBuy(attrsBase)) erros.push("Os atributos base excedem as regras de Point Buy.");

  const classe = CLASSES[state.personagem.classe];
  if(classe && (state.personagem.periciasClasseSelecionadas || []).some(skill => !classe.escolhaPericias.opcoes.includes(skill))) erros.push("Há perícias escolhidas fora da lista da classe.");

  const magia = state.personagem.magia;
  if(magia.ehConjurador){
    if(!SPELLCASTERS[state.personagem.classe]) erros.push("A estrutura de magia não corresponde à classe selecionada.");
    if((magia.espacosAtuais || []).some((atual, idx) => atual > (magia.espacos[idx] || 0))) erros.push("Há espaços de magia acima do limite permitido.");
  }

  if((state.personagem.personalidade.historia || "").length < 20) avisos.push("A história está muito curta para referência narrativa em mesa.");
  if(state.personagem.classe && (state.personagem.habilidadesClasseAtivas || []).length === 0) avisos.push("As habilidades de classe ainda não foram carregadas para a classe/nível atual.");
  if(state.personagem.subclasse && (state.personagem.habilidadesSubclasseAtivas || []).length === 0) avisos.push("A subclasse escolhida ainda não carregou traços ativos para o nível atual.");
  if(!state.personagem.subclasse && (state.personagem.nivel||1) >= getSubclassUnlockLevel(state.personagem.classe) && getSubclassOptions(state.personagem.classe).length) avisos.push("Há uma subclasse disponível para o nível atual e ela ainda não foi escolhida.");
  if(state.personagem.progressao.ataquesPorAcao !== getAttacksPerAction(state.personagem.classe, state.personagem.nivel||1)) avisos.push("Os ataques por ação não foram sincronizados com a progressão da classe.");

  const oficial = erros.length === 0 && !state.personagem.customizado;
  const status = oficial ? "oficial" : (erros.length === 0 ? "customizado" : "invalido");
  return {status, erros, avisos};
}
