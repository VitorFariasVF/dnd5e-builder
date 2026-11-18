function createInitialState(){
  return {
    modo:null,
    regras:"2014",
    etapa:1,
    currentHistoryId:null,
    personagem:{
      nome:"",
      jogador:"",
      imagem:"",
      origem:null,
      raca:null,
      subraca:null,
      subracaNome:"",
      escolhasRaciais:{atributos:[],pericia:"",talento:"",ancestral:""},
      periciasRaciais:[],
      talentosRaciais:[],
      tamanho:null,
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
      talentoOrigem:"",
      bonusOrigem2024:{formato:"2_1",mais2:"",mais1:"",tres:[]},
      bonusPericias:{},
      atributosBase:{forca:15,destreza:14,constituicao:13,inteligencia:12,sabedoria:10,carisma:8},
      atributos:{forca:15,destreza:14,constituicao:13,inteligencia:12,sabedoria:10,carisma:8},
      metodoAtributos:"standard",
      combate:{armadura:"sem_armadura",escudo:false,armaPrincipal:"adaga",armaSecundaria:"besta_leve",classeArmadura:10,iniciativa:0,ataques:[]},
      inventario:{itens:[],moedas:{pp:0,gp:0,ep:0,sp:0,cp:0},pesoTotal:0,capacidadeCarga:150},
      magia:{ehConjurador:false,habilidade:null,tipo:null,cdMagia:null,ataqueMagia:null,espacos:[],espacosAtuais:[],nivelEspacosBruxo:null,cantripsConhecidos:0,magiasConhecidas:0,magiasPreparadas:0,listaTruques:[],listaMagias:[],grimorio:[],magiasSubclasseSemprePreparadas:[],magiasSubclasseListaExpandida:[],magiasSubclasseConhecidasBonus:[],truquesSubclasseBonus:[],concentracaoAtiva:"",rituaisDisponiveis:[]},
      personalidade:{tracos:[],ideais:[],vinculos:[],defeitos:[],descricaoGeral:"",aparencia:"",historia:""},
      progressao:{nivelAtual:1,proximoNivel:2,melhoriasPendentes:[],historico:[]},
      habilidadesClasseAtivas:[],
      subclasse:null,
      habilidadesSubclasseAtivas:[],
      recursosClasse:{},
      opcoesClasse:{asi:[]},
      customizado:false,
      valido:false,
      validacaoResumo:{status:"pendente",erros:[],avisos:[]}
    }
  };
}

const state = createInitialState();

/* Imagem do personagem: data URL JPEG ou PNG em base64 (vazio = sem imagem). Limite de tamanho do texto para o JSON e o localStorage. */
const IMAGEM_PERSONAGEM_MAX_CHARS = 400000;
function imagemPersonagemValida(valor){
  return typeof valor === "string" && valor.length <= IMAGEM_PERSONAGEM_MAX_CHARS && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/]+=*$/.test(valor);
}

function ensureStateShape(){
  const fresh = createInitialState();
  state.modo ??= fresh.modo;
  state.regras = (state.regras === "2024") ? "2024" : "2014";
  state.etapa ??= fresh.etapa;
  state.currentHistoryId ??= fresh.currentHistoryId;
  state.personagem = Object.assign({}, fresh.personagem, state.personagem || {});
  state.personagem.combate = Object.assign({}, fresh.personagem.combate, state.personagem.combate || {});
  state.personagem.inventario = Object.assign({}, fresh.personagem.inventario, state.personagem.inventario || {});
  state.personagem.inventario.moedas = Object.assign({}, fresh.personagem.inventario.moedas, state.personagem.inventario.moedas || {});
  state.personagem.magia = Object.assign({}, fresh.personagem.magia, state.personagem.magia || {});
  state.personagem.personalidade = Object.assign({}, fresh.personagem.personalidade, state.personagem.personalidade || {}, state.personagem.caracteristicas || {});
  state.personagem.progressao = Object.assign({}, fresh.personagem.progressao, state.personagem.progressao || {});
  state.personagem.opcoesClasse = Object.assign({}, fresh.personagem.opcoesClasse, state.personagem.opcoesClasse || {});
  if(!Array.isArray(state.personagem.opcoesClasse.asi)) state.personagem.opcoesClasse.asi = [];
  state.personagem.bonusOrigem2024 = Object.assign({}, fresh.personagem.bonusOrigem2024, state.personagem.bonusOrigem2024 || {});
  state.personagem.escolhasRaciais = Object.assign({}, fresh.personagem.escolhasRaciais, state.personagem.escolhasRaciais || {});
  if(!Array.isArray(state.personagem.escolhasRaciais.atributos)) state.personagem.escolhasRaciais.atributos = [];
  if(!Array.isArray(state.personagem.periciasRaciais)) state.personagem.periciasRaciais = [];
  if(!Array.isArray(state.personagem.talentosRaciais)) state.personagem.talentosRaciais = [];
  delete state.personagem.caracteristicas;
  if(!imagemPersonagemValida(state.personagem.imagem)) state.personagem.imagem = "";
  if(typeof aplicarCatalogoRegras === "function") aplicarCatalogoRegras(state.regras);
}


function resetStateToInitial(){
  const fresh = createInitialState();
  Object.keys(state).forEach(key => delete state[key]);
  Object.assign(state, fresh);
  ensureStateShape();
}
