/* PDF (HTML de 2 páginas A4 com tema e cor da classe) e JSON de ator para Foundry (rascunho). */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("PDF e Foundry Tormenta20");
const ctx = carregar(SCRIPTS);

montarPersonagem(ctx, {
  nome: "Druida <Teste> & Cia", nivel: 5, raca: "minotauro", classe: "druida", origem: "Mateiro", jogador: "",
  atributosBase: { forca: 1, destreza: 2, constituicao: 2, inteligencia: 2, sabedoria: 2, carisma: 1 },
  origemBeneficios: [{ tipo: "pericia", valor: "Sobrevivência" }, { tipo: "pericia", valor: "Percepção" }],
  periciasEscolhidas: ["Cura", "Atletismo"],
  magias: [{ nome: "Curar Ferimentos", circulo: 1 }],
  poderes: [{ nome: "Devoto Fiel", tipo: "classe", nivel: 1, nota: "" }],
  equipamento: [{ nome: "Cajado", quantidade: 1, peso: 2 }], dinheiro: 15,
  defesa: { armadura: 2, escudo: 0, outros: 0, nomeArmadura: "Couro", nomeEscudo: "" },
  personalidade: { aparencia: "Verde", historia: "Nasceu na mata.", tracos: "Calmo" }
});
ctx.state.modo = "estrito";
const html = ctx.t20GerarHtmlFicha(ctx.state);

t.igual("PDF tem exatamente 2 páginas (article.pagina)", (html.match(/<article class="pagina"/g) || []).length, 2);
t.check("PDF declara A4 no @page", /@page\{size:A4/.test(html));
t.check("PDF usa a cor da classe Druida (#2f6b2a)", html.includes("--cor:#2f6b2a"));
t.check("PDF escapa o nome (sem <Teste> cru)", html.includes("Druida &lt;Teste&gt; &amp; Cia") && !html.includes("<Teste>"));
t.check("PDF não tem 'undefined' nem 'NaN'", !/undefined|NaN/.test(html));
t.check("PDF tem o PV calculado (47)", html.includes(">47<"));
t.check("PDF mostra o aviso de não verificado", html.includes("NÃO VERIFICADO"));
t.check("PDF tem 29 linhas de perícia (p121)", (html.match(/<tr class="(nao|)"><td>/g) || []).length === 29);
t.check("PDF tem o rodapé nas duas páginas", (html.match(/página \d de 2/g) || []).length === 2);
t.check("PDF não carrega recurso externo (sem http)", !/https?:\/\//.test(html.replace(/https?:\/\/(www\.)?w3\.org[^"]*/g, "")));

/* Classe sem cor própria cai no dourado padrão */
montarPersonagem(ctx, { nome: "Sem classe", nivel: 1 });
const semClasse = ctx.t20GerarHtmlFicha(ctx.state);
t.igual("PDF sem classe ainda gera 2 páginas", (semClasse.match(/<article class="pagina"/g) || []).length, 2);
t.check("PDF sem classe usa a cor padrão", semClasse.includes("#8a5200"));

/* Foundry: rascunho de ator */
montarPersonagem(ctx, {
  nome: "Ator Teste", nivel: 2, raca: "humano", classe: "guerreiro", origem: "Soldado",
  atributosBase: { forca: 3, destreza: 1, constituicao: 2, inteligencia: 0, sabedoria: 0, carisma: 0 },
  grupoFixoEscolha: "Pontaria", periciasEscolhidas: ["Atletismo", "Cavalgar"],
  origemBeneficios: [{ tipo: "pericia", valor: "Percepção" }, { tipo: "poder", valor: "Ataque Poderoso" }],
  poderes: [{ nome: "Ataque Extra", tipo: "classe", nivel: 1, nota: "" }],
  magias: [], equipamento: [{ nome: "Espada", quantidade: 1, peso: 1 }], dinheiro: 0
});
const ator = ctx.t20FoundryAtor(ctx.state.personagem, ctx.t20Derivados(ctx.state.personagem));
t.igual("ator Foundry tem tipo character", ator.type, "character");
t.igual("ator Foundry tem nome", ator.name, "Ator Teste");
t.igual("ator Foundry: PV no nível 2 com CON 2 = 20 + 5×1 + 2×2 = 29", ator.system.pv.max, 29);
t.igual("ator Foundry: itens (1 poder + 1 equipamento)", ator.items.length, 2);
t.igual("ator Foundry: perícias treinadas (Fortitude, Pontaria, Atletismo, Cavalgar, Percepção) = 5", Object.keys(ator.system.pericias).length, 5);
t.check("ator Foundry marca o aviso de não testado", /NÃO TESTADO/.test(ator.flags["tormenta20-builder"].aviso));
t.check("ator Foundry é JSON válido", (() => { try { JSON.parse(JSON.stringify(ator)); return true; } catch(e){ return false; } })());

t.fim();
