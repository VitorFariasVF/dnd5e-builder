/* Estado da ficha (3DeT Victory). Um único objeto `state`, garantido por ensureStateShape().
   Os nomes de etapa e os limites vêm de rules.js; aqui só há forma de dados. */
const TDT_ETAPAS = [
  { n: 1, nome: "Conceito" },
  { n: 2, nome: "Arquétipo" },
  { n: 3, nome: "Atributos" },
  { n: 4, nome: "Perícias" },
  { n: 5, nome: "Vantagens" },
  { n: 6, nome: "Desvantagens" },
  { n: 7, nome: "Revisão" }
];

function estadoPadrao(){
  return {
    etapa: 1,
    tela: "inicio",
    modo: "livre",
    currentHistoryId: null,
    personagem: {
      nome: "",
      jogador: "",
      imagem: "",                // data URL JPEG ou PNG (só na importação) de até 300 px; "" = sem imagem
      conceito: "",
      nivelPoder: "iniciante",   // "iniciante" | "heroi" | "veterano" | "livre" (rules.niveisDePoder)
      pontosTotal: 10,           // preenchido pelo nível; editável só em "livre"
      atributos: { P: null, H: null, R: null },
      arquetipo: "",             // id de rules.arquetipos ou "" (vazio)
      pericias: [],              // ids de rules.pericias
      vantagens: [],             // [{ id, qtd, custo, nota, tipo, qualidades }]; tipo e qualidades só em Artefato (arma|armadura|acessorio; qualidades = [{ id, escolha }])
      desvantagens: [],          // [{ id, valor, nota, subtipo }]; subtipo só em Transtorno (id de rules.transtornosOpcoes)
      veiculos: [],              // [{ nome, tipo, escala, pontos, gratuito, atributos{P,H,R}, vantagens, desvantagens }] (PDF p140-142)
      historia: "",
      anotacoes: ""
    }
  };
}

const state = estadoPadrao();

/* Imagem do personagem: só data URL JPEG ou PNG em base64, com limite de tamanho do texto (salvamento e JSON). */
function tdtImagemValida(valor){
  return typeof valor === "string" && valor.length <= 400000 && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/]+=*$/.test(valor);
}

/* Completa campos ausentes (dados de versões antigas ou importados) sem apagar o que já existe. */
function ensureStateShape(){
  const base = estadoPadrao();
  if(!state.personagem || typeof state.personagem !== "object") state.personagem = base.personagem;
  const p = state.personagem;
  Object.keys(base.personagem).forEach(k => { if(p[k] === undefined) p[k] = base.personagem[k]; });
  p.atributos = Object.assign({}, base.personagem.atributos, p.atributos || {});
  if(!Array.isArray(p.pericias)) p.pericias = [];
  if(!Array.isArray(p.vantagens)) p.vantagens = [];
  if(!Array.isArray(p.desvantagens)) p.desvantagens = [];
  /* Veículos (PDF p140-142): cada um tem ficha própria. Dado antigo ou importado completa os campos. */
  if(!Array.isArray(p.veiculos)) p.veiculos = [];
  p.veiculos = p.veiculos.filter(v => v && typeof v === "object");
  p.veiculos.forEach(v => {
    v.atributos = Object.assign({ P: null, H: 0, R: null }, v.atributos || {});
    if(!Array.isArray(v.vantagens)) v.vantagens = [];
    if(!Array.isArray(v.desvantagens)) v.desvantagens = [];
  });
  /* Ids renomeados: Cópia virou Clone e Insano virou Transtorno (livro 3DeT Victory). */
  p.vantagens.forEach(v => { if(v && v.id === "copia") v.id = "clone"; });
  /* Artefato: lista de qualidades (PDF p139-141). Dado antigo não tinha o campo. */
  p.vantagens.forEach(v => { if(v && v.id === "artefato" && !Array.isArray(v.qualidades)) v.qualidades = []; });
  p.desvantagens.forEach(d => { if(d && d.id === "insano") d.id = "transtorno"; });
  /* Subtipo de Transtorno: versões antigas guardavam com acento ("compulsão"); o id é sem acento. */
  const semAcento = t => String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  p.desvantagens.forEach(d => { if(d && typeof d.subtipo === "string" && d.subtipo) d.subtipo = semAcento(d.subtipo); });
  p.imagem = tdtImagemValida(p.imagem) ? p.imagem : "";
  if(!["livre", "estrito"].includes(state.modo)) state.modo = "livre";
  if(!TDT_ETAPAS.some(e => e.n === state.etapa)) state.etapa = 1;
  if(state.tela !== "ficha" && state.tela !== "inicio") state.tela = "inicio";
  if(state.currentHistoryId === undefined) state.currentHistoryId = null;
  return state;
}

/* Substitui o conteúdo de `state` por outro objeto (usado ao carregar do histórico ou do backup). */
function substituirEstado(novo){
  Object.keys(state).forEach(k => delete state[k]);
  Object.assign(state, JSON.parse(JSON.stringify(novo)));
  return ensureStateShape();
}
