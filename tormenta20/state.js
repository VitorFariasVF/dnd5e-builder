/* Estado da ficha Tormenta20. Um objeto único `state`, salvo pelo storage.js.
   ensureStateShape() completa campos ausentes em dados antigos (sem perder o que já existe).
   Esquema 2: PV, PM e treino podem ser digitados à mão (pvManual, pmManual, treinoManual; null = calculado);
   poderes e magias vêm do catálogo (id e `livre` para o que foi digitado). */
function t20EstadoInicial(){
  const zerarAtributos = () => Object.fromEntries(T20_ATRIBUTO_IDS.map(id => [id, 0]));
  return {
    modo: null,            // "estrito" | "livre"
    etapa: 1,
    currentHistoryId: null,
    personagem: {
      nome: "",
      jogador: "",
      nivel: 1,            // 1 a T20_NIVEL_MAX
      raca: null,          // id em T20_RACAS_COMPLETAS
      origem: null,        // nome em T20_ORIGENS
      origemBeneficios: [  // dois benefícios à escolha
        { tipo: "pericia", valor: "" },
        { tipo: "pericia", valor: "" }
      ],
      classe: null,        // id em T20_CLASSES
      atributoMagia: null, // para Arcanista: "inteligencia" ou "carisma"
      atributosBase: zerarAtributos(),
      ajusteManual: zerarAtributos(),
      periciasEscolhidas: [],   // perícias livres (classe, raça e nível)
      grupoFixoEscolha: "",     // escolha da opção do grupo fixo (ex.: Guerreiro: Luta ou Pontaria)
      pvManual: null,      // PV digitado à mão (null = calculado pela tabela)
      pmManual: null,      // PM digitado à mão
      treinoManual: null,  // bônus de treino digitado à mão
      poderes: [],         // { id (T20_PODERES ou null), nome, tipo, nivel, nota, livre }
      magias: [],          // { nome, circulo, livre } (nome do catálogo ou digitado)
      equipamento: [],     // { nome, quantidade, peso }
      dinheiro: 0,         // T$ (valor inicial NÃO VERIFICADO: é entrada livre)
      defesa: { armadura: 0, escudo: 0, outros: 0, nomeArmadura: "", nomeEscudo: "" },
      personalidade: { aparencia: "", historia: "", tracos: "" }
    }
  };
}

const state = t20EstadoInicial();

/* Entradas antigas (esquema 1) ganham id null e livre; entradas do catálogo têm o nome e o tipo do catálogo. */
function t20NormalizarPoder(x){
  const o = x || {};
  const id = typeof o.id === "string" && T20_PODERES[o.id] ? o.id : null;
  const cat = id ? T20_PODERES[id] : null;
  const nome = cat ? cat.nome : String(o.nome == null ? "" : o.nome);
  return {
    id,
    nome,
    tipo: cat ? cat.tipo : (o.tipo === undefined ? "classe" : o.tipo),
    nivel: Math.trunc(Number(o.nivel)) || 1,
    nota: String(o.nota == null ? "" : o.nota),
    livre: cat ? false : (typeof o.livre === "boolean" ? o.livre : nome.trim() !== "")
  };
}
function t20NormalizarMagia(x){
  const o = x || {};
  const nome = String(o.nome == null ? "" : o.nome);
  const cat = t20MagiaCatalogo(nome);
  const livre = cat ? false : (typeof o.livre === "boolean" ? o.livre : nome.trim() !== "");
  return { nome, circulo: Math.trunc(Number(o.circulo)) || 1, livre };
}

function ensureStateShape(){
  const fresh = t20EstadoInicial();
  state.modo = (state.modo === "estrito" || state.modo === "livre") ? state.modo : null;
  state.etapa = Math.min(12, Math.max(1, Number(state.etapa) || 1));
  state.currentHistoryId ??= null;
  const p = Object.assign({}, fresh.personagem, state.personagem || {});
  p.atributosBase = Object.assign(zerarTodos(fresh.personagem.atributosBase), p.atributosBase || {});
  p.ajusteManual = Object.assign(zerarTodos(fresh.personagem.ajusteManual), p.ajusteManual || {});
  p.defesa = Object.assign({}, fresh.personagem.defesa, p.defesa || {});
  p.personalidade = Object.assign({}, fresh.personagem.personalidade, p.personalidade || {});
  p.nivel = Math.min(T20_NIVEL_MAX, Math.max(T20_NIVEL_MIN, Math.trunc(Number(p.nivel) || 1)));
  if(!Array.isArray(p.origemBeneficios) || p.origemBeneficios.length !== 2)
    p.origemBeneficios = fresh.personagem.origemBeneficios.map((b, i) => Object.assign({}, b, (p.origemBeneficios || [])[i] || {}));
  if(!Array.isArray(p.periciasEscolhidas)) p.periciasEscolhidas = [];
  p.poderes = Array.isArray(p.poderes) ? p.poderes.map(t20NormalizarPoder) : [];
  p.magias = Array.isArray(p.magias) ? p.magias.map(t20NormalizarMagia) : [];
  if(!Array.isArray(p.equipamento)) p.equipamento = [];
  p.pvManual = t20NumeroOuNulo(p.pvManual);
  p.pmManual = t20NumeroOuNulo(p.pmManual);
  p.treinoManual = t20NumeroOuNulo(p.treinoManual);
  p.dinheiro = Number(p.dinheiro) || 0;
  state.personagem = p;
  function zerarTodos(base){ return Object.fromEntries(Object.keys(base).map(k => [k, 0])); }
}

function resetStateToInitial(){
  const fresh = t20EstadoInicial();
  Object.keys(state).forEach(key => delete state[key]);
  Object.assign(state, fresh);
  ensureStateShape();
}
