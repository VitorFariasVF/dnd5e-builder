function createInitialState(){
  return {
    modo:null,
    etapa:1,
    currentHistoryId:null,
    personagem:{
      nome:"",
      jogador:"",
      origem:null,
      raca:null,
      classe:null,
      nivel:1,
      xp:0,
      bonusProficiencia:2,
      dadoVida:null,
      pvMax:null,
      savesClasse:[],
      savesClasseBase:[],
      savesClasseEfetivos:[],
      savesCalculados:{},
      proficienciasClasse:[],
      proficienciasClasseBase:[],
      proficienciasClasseEfetivas:[],
      equipamentoClasse:[],
      equipamentoInicialEscolhas:{},
      equipamentoInicialValores:{},
      bonusRaciais:{},
      traitsRaciais:[],
      idiomasRaciais:[],
      deslocamento:30,
      periciasOrigem:[],
      periciasClasseSelecionadas:[],
      periciasFinais:[],
      periciasFinaisEfetivas:[],
      ferramentas:[],
      ferramentasEfetivas:[],
      idiomas:0,
      caracteristicaOrigem:null,
      bonusPericias:{},
      atributosBase:{forca:15,destreza:14,constituicao:13,inteligencia:12,sabedoria:10,carisma:8},
      atributos:{forca:15,destreza:14,constituicao:13,inteligencia:12,sabedoria:10,carisma:8},
      metodoAtributos:"standard",
      combate:{armadura:"sem_armadura",escudo:false,armaPrincipal:"adaga",armaSecundaria:"besta_leve",classeArmadura:10,iniciativa:0,ataques:[]},
      inventario:{itens:[],moedas:{pp:0,gp:0,ep:0,sp:0,cp:0},pesoTotal:0,capacidadeCarga:150},
      magia:{ehConjurador:false,habilidade:null,tipo:null,cdMagia:null,ataqueMagia:null,espacos:[],espacosAtuais:[],nivelEspacosBruxo:null,cantripsConhecidos:0,magiasConhecidas:0,magiasPreparadas:0,listaTruques:[],listaMagias:[],grimorio:[],concentracaoAtiva:"",rituaisDisponiveis:[]},
      personalidade:{tracos:[],ideais:[],vinculos:[],defeitos:[],descricaoGeral:"",aparencia:"",historia:""},
      progressao:{nivelAtual:1,proximoNivel:2,melhoriasPendentes:[],historico:[]},
      habilidadesClasseAtivas:[],
      subclasse:null,
      habilidadesSubclasseAtivas:[],
      recursosClasse:{},
      opcoesClasse:{},
      customizado:false,
      valido:false,
      validacaoResumo:{status:"pendente",erros:[],avisos:[]}
    }
  };
}

const state = createInitialState();

function ensureStateShape(){
  const fresh = createInitialState();
  state.modo ??= fresh.modo;
  state.etapa ??= fresh.etapa;
  state.currentHistoryId ??= fresh.currentHistoryId;
  state.personagem = Object.assign({}, fresh.personagem, state.personagem || {});
  state.personagem.combate = Object.assign({}, fresh.personagem.combate, state.personagem.combate || {});
  state.personagem.inventario = Object.assign({}, fresh.personagem.inventario, state.personagem.inventario || {});
  state.personagem.inventario.moedas = Object.assign({}, fresh.personagem.inventario.moedas, state.personagem.inventario.moedas || {});
  state.personagem.magia = Object.assign({}, fresh.personagem.magia, state.personagem.magia || {});
  state.personagem.personalidade = Object.assign({}, fresh.personagem.personalidade, state.personagem.personalidade || {}, state.personagem.caracteristicas || {});
  state.personagem.progressao = Object.assign({}, fresh.personagem.progressao, state.personagem.progressao || {});
  delete state.personagem.caracteristicas;
}


function resetStateToInitial(){
  const fresh = createInitialState();
  Object.keys(state).forEach(key => delete state[key]);
  Object.assign(state, fresh);
  ensureStateShape();
}
