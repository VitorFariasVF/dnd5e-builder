/* Testes de T20_NIVEIS (níveis 6 a 20) e T20_PODERES (catálogo de poderes).
   Confere: estrutura completa por classe e nível, PV e PM por nível contra rules.js (crescentes),
   bônus de treino, pré-requisitos que referenciam poderes existentes, consistência entre o nível do
   poder e a linha da classe, e marcas de fonte e verificação. Node, sem dependências. */
const fs = require("fs");
const path = require("path");
const { carregar, criarTeste, SCRIPTS, RAIZ } = require("./_ambiente");
const t = criarTeste("Tormenta20 níveis e poderes");

const ctx = carregar(SCRIPTS);
const N = ctx.T20_NIVEIS;
const P = ctx.T20_PODERES;
const CHAVES_LINHA = ["nivel", "pv", "pm", "treino", "circulo", "magiaNova", "poderDeClasse", "habilidades", "poderes", "verificado"];
const TIPOS = [null, "classe", "geral", "concedido"];
const SUBTIPOS = [null, "combate", "destino", "magia", "tormenta"];

/* ---- Estrutura por classe e nível ---- */
t.igual("níveis: faixa 6 a 20", [N.nivelMin, N.nivelMax], [6, 20]);
t.igual("níveis: mesmas 14 classes de rules.js", Object.keys(N.classes).sort(), [...ctx.T20_CLASSE_IDS].sort());
for(const id of ctx.T20_CLASSE_IDS){
  const c = N.classes[id];
  const nomes = c.niveis.map(l => l.nivel);
  t.igual(`${id}: uma linha por nível, de 6 a 20`, nomes, Array.from({ length: 15 }, (_, i) => i + 6));
  t.check(`${id}: fonte da classe`, typeof c.fonte === "string" && c.fonte.length > 10, c.fonte);
  const faltam = c.niveis.filter(l => CHAVES_LINHA.some(k => !(k in l))).map(l => l.nivel);
  t.igual(`${id}: todas as chaves em cada nível`, faltam, []);
}

/* ---- PV e PM por nível: conferem com rules.js e são crescentes ---- */
for(const id of ctx.T20_CLASSE_IDS){
  const base = ctx.T20_CLASSES[id];
  const c = N.classes[id];
  t.igual(`${id}: PM por nível igual a rules.js (pmNivel)`, c.niveis.map(l => l.pm), c.niveis.map(() => base.pmNivel));
  t.igual(`${id}: PV por nível igual a rules.js (pvNivel; null = conflito)`, c.niveis.map(l => l.pv), c.niveis.map(() => base.pvNivel));
  const pmCresce = c.niveis.every(l => Number.isInteger(l.pm) && l.pm > 0);
  t.check(`${id}: PM ganho positivo em todo nível (total cresce)`, pmCresce);
  if(base.pvInicial !== null && base.pvNivel !== null){
    let total = base.pvInicial, cresce = true;
    for(const l of c.niveis){ const antes = total; total += l.pv; if(!(total > antes)) cresce = false; }
    t.check(`${id}: PV total cresce do nível 1 ao 20 (${base.pvInicial} + ${base.pvNivel} por nível)`, cresce);
  }
}
t.check("Bardo: PV por nível fica null com CONFLITO descrito nas notas", N.classes.bardo.niveis.every(l => l.pv === null) && /CONFLITO de PV/.test(N.classes.bardo.notas));

/* ---- Treino: metade do nível, arredondada para baixo ---- */
for(const id of ctx.T20_CLASSE_IDS){
  const errados = N.classes[id].niveis.filter(l => l.treino !== Math.floor(l.nivel / 2)).map(l => l.nivel);
  t.igual(`${id}: treino = nível dividido por 2 (arredondado para baixo)`, errados, []);
}

/* ---- Tipos e valores das linhas ---- */
for(const id of ctx.T20_CLASSE_IDS){
  const c = N.classes[id];
  const ruins = c.niveis.filter(l => !Array.isArray(l.habilidades) || !Array.isArray(l.poderes) || typeof l.verificado !== "object")
    .map(l => l.nivel);
  t.igual(`${id}: habilidades, poderes e verificado com formato certo`, ruins, []);
  const frasesRuins = c.niveis.flatMap(l => l.habilidades).filter(h => typeof h.nome !== "string" || !(h.frase === null || typeof h.frase === "string"));
  t.igual(`${id}: habilidades com nome e frase (ou null)`, frasesRuins, []);
}

/* ---- Referências: poderes de cada nível existem no catálogo ---- */
const referenciasSemPoder = [];
for(const id of ctx.T20_CLASSE_IDS){
  for(const l of N.classes[id].niveis) for(const pid of l.poderes) if(!P[pid]) referenciasSemPoder.push(`${id}@${l.nivel}:${pid}`);
}
t.igual("poderes listados por nível existem no catálogo", referenciasSemPoder, []);

/* ---- Catálogo: pré-requisitos, tipos e classes ---- */
const preSemPoder = [];
const preAtributoRuim = [];
const preSemPericia = [];
const classeRuim = [];
const tipoRuim = [];
for(const p of Object.values(P)){
  for(const pid of (p.pre.poderes || [])) if(!P[pid]) preSemPoder.push(`${p.id} -> ${pid}`);
  for(const a of Object.keys(p.pre.atributos || {})) if(!ctx.T20_ATRIBUTO_IDS.includes(a)) preAtributoRuim.push(`${p.id}: ${a}`);
  for(const pe of (p.pre.pericias || [])) if(!ctx.T20_PERICIA_NOMES.includes(pe)) preSemPericia.push(`${p.id}: ${pe}`);
  for(const cid of p.classes) if(!ctx.T20_CLASSE_IDS.includes(cid)) classeRuim.push(`${p.id}: ${cid}`);
  if(!TIPOS.includes(p.tipo) || !SUBTIPOS.includes(p.subtipo)) tipoRuim.push(p.id);
  if(p.classes.length > 0 && p.tipo !== null && p.tipo !== "classe") tipoRuim.push(`${p.id}: classe sem tipo classe`);
}
t.igual("pré-requisitos de poder referenciam poderes existentes", preSemPoder, []);
t.igual("pré-requisitos de atributo usam atributos de rules.js", preAtributoRuim, []);
t.igual("pré-requisitos de perícia usam perícias de rules.js", preSemPericia, []);
t.igual("poderes de classe apontam para classes de rules.js", classeRuim, []);
t.igual("tipo e subtipo dentro dos valores documentados", tipoRuim, []);

/* ---- Consistência: nível do poder = linha da classe em que aparece ---- */
const inconsistentes = [];
for(const p of Object.values(P)){
  if(p.nivel !== null && p.nivel >= 6 && p.nivel <= 20){
    for(const cid of p.classes){
      const linha = N.classes[cid].niveis.find(l => l.nivel === p.nivel);
      if(!linha.poderes.includes(p.id)) inconsistentes.push(`${p.id} no ${p.nivel}º de ${cid} ausente`);
    }
  }
}
for(const id of ctx.T20_CLASSE_IDS){
  for(const l of N.classes[id].niveis) for(const pid of l.poderes){
    const p = P[pid];
    if(p.nivel !== l.nivel) inconsistentes.push(`${pid} listado no ${l.nivel}º de ${id} mas nivel = ${p.nivel}`);
    if(!p.classes.includes(id)) inconsistentes.push(`${pid} listado em ${id} mas sem essa classe`);
  }
}
t.igual("nível de cada poder de classe bate com a linha da classe", inconsistentes, []);

/* ---- Catálogo sem id repetido (conta chamadas no código-fonte) ---- */
const fonte = fs.readFileSync(path.join(RAIZ, "tormenta20/rules-poderes.js"), "utf8");
const chamadas = (fonte.match(/t20PoderDe\("/g) || []).length;
t.igual("catálogo: sem id repetido", Object.keys(P).length, chamadas);

/* ---- Fontes e verificação ---- */
const semFonte = Object.values(P).filter(p => typeof p.fonte !== "string" || p.fonte.length < 5).map(p => p.id);
t.igual("todo poder tem fonte", semFonte, []);
const verificadoSemDuasFontes = Object.values(P).filter(p => p.verificado && !(/\[E\]/.test(p.fonte) && /\[R\]/.test(p.fonte))).map(p => p.id);
t.igual("poder verificado tem duas fontes ([E] e [R])", verificadoSemDuasFontes, []);
const linhaVerificadaSemFonte = ctx.T20_NIVEIS && Object.entries(N.classes).filter(([id, c]) => !/\[E\]/.test(c.fonte)).map(([id]) => id);
t.igual("toda classe de níveis cita [E]", linhaVerificadaSemFonte, []);
t.check("Manipular em Massa verificado (nível 10, duas fontes)", P["manipular-em-massa"].verificado && P["manipular-em-massa"].nivel === 10);
t.check("Oportunismo verificado (nível 6, duas fontes)", P.oportunismo.verificado && P.oportunismo.nivel === 6);
t.check("Ladino: PV e PM confirmados nas duas fontes", N.classes.ladino.verificado.pv && N.classes.ladino.verificado.pm);
t.check("Ataque Furtivo do Ladino: 5d6 no 9º e 8d6 no 15º",
  N.classes.ladino.niveis.find(l => l.nivel === 9).habilidades.some(h => h.nome === "Ataque Furtivo" && h.frase === "5d6 de dano extra.") &&
  N.classes.ladino.niveis.find(l => l.nivel === 15).habilidades.some(h => h.nome === "Ataque Furtivo" && h.frase === "8d6 de dano extra."));
t.check("Bardo: magias de 2º, 3º e 4º círculo em 6, 10 e 14 (duas fontes)",
  [6, 10, 14].every((n, i) => N.classes.bardo.niveis.find(l => l.nivel === n).circulo === [2, 3, 4][i] && N.classes.bardo.niveis.find(l => l.nivel === n).verificado.circulo));

/* ---- Lacunas declaradas: nada de palpite sem marca ---- */
t.check("sem frase inventada: habilidade sem efeito lido tem frase null", N.classes.guerreiro.niveis.find(l => l.nivel === 6).habilidades[0].frase === null);
t.check("sem poder de classe com nível inferido sem nota (Druida 17 e Caçador)", /Nível 17 inferido/.test(P["forca-da-natureza-db"].nota) && /início/.test(N.classes.cacador.notas));

t.fim();
