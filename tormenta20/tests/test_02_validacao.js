/* Validações por etapa: para cada regra de criação, um caso aceito e um recusado.
   Modo estrito: problema = erro (bloqueia). Modo livre: o mesmo problema = aviso (não bloqueia). */
const { carregar, criarTeste, montarPersonagem, SCRIPTS } = require("./_ambiente");
const t = criarTeste("Validações Tormenta20");
const ctx = carregar(SCRIPTS);

const base = {
  nome: "Validado", nivel: 1, raca: "anao", classe: "clerigo", origem: "Acólito", atributoMagia: "sabedoria",
  atributosBase: { forca: 0, destreza: 2, constituicao: 2, inteligencia: 0, sabedoria: 3, carisma: 2 },
  origemBeneficios: [{ tipo: "pericia", valor: "Cura" }, { tipo: "poder", valor: "Devoto Fiel" }],
  periciasEscolhidas: ["Atuação", "Diplomacia"],
  magias: [{ nome: "Curar Ferimentos", circulo: 1 }, { nome: "Bênção", circulo: 1 }, { nome: "Escudo da Fé", circulo: 1 }],
  equipamento: [{ nome: "Maça", quantidade: 1 }], dinheiro: 0,
  defesa: { armadura: 0, escudo: 0, outros: 0 }
};

/* Aplica `extra` sem passar pelo ensureStateShape (que limita o nível): o validador precisa ver o valor errado. */
function erros(etapa, modo, extra){
  montarPersonagem(ctx, base);
  Object.assign(ctx.state.personagem, JSON.parse(JSON.stringify(extra || {})));
  return ctx.t20ValidarEtapa(etapa, ctx.state.personagem, modo);
}
const contaErros = (r) => r.erros.length;
const contaAvisos = (r) => r.avisos.length;

/* Etapa 1: o modo é escolhido na tela; o validador só aceita estrito ou livre */
t.igual("etapa 1 com modo estrito é aceita", contaErros(erros(1, "estrito")), 0);

/* Etapa 2: nome e nível */
t.igual("etapa 2: nome vazio recusado no estrito", contaErros(erros(2, "estrito", { nome: "  " })), 1);
t.igual("etapa 2: nome vazio vira aviso no livre", [contaErros(erros(2, "livre", { nome: "" })), contaAvisos(erros(2, "livre", { nome: "" })) > 0], [0, true]);
t.igual("etapa 2: nome preenchido aceito", contaErros(erros(2, "estrito")), 0);
t.igual("etapa 2: nível 6 aceito (escopo é 1 a 20)", contaErros(erros(2, "estrito", { nivel: 6 })), 0);
t.igual("etapa 2: nível 20 aceito", contaErros(erros(2, "estrito", { nivel: 20 })), 0);
t.igual("etapa 2: nível 21 recusado", contaErros(erros(2, "estrito", { nivel: 21 })), 1);

/* Etapa 3: raça */
t.igual("etapa 3: sem raça recusado", contaErros(erros(3, "estrito", { raca: null })), 1);
t.igual("etapa 3: raça com ajuste à escolha verificado (Humano): sem erro nem aviso na etapa da raça", [contaErros(erros(3, "estrito", { raca: "humano" })), contaAvisos(erros(3, "estrito", { raca: "humano" }))], [0, 0]);

/* Etapa 4: origem e benefícios */
t.igual("etapa 4: origem inexistente recusada", contaErros(erros(4, "estrito", { origem: "Pirata" })), 1);
t.igual("etapa 4: dois benefícios com a mesma perícia recusados", contaErros(erros(4, "estrito", { origemBeneficios: [{ tipo: "pericia", valor: "Cura" }, { tipo: "pericia", valor: "Cura" }] })), 1);
t.igual("etapa 4: benefício de poder sem nome recusado", contaErros(erros(4, "estrito", { origemBeneficios: [{ tipo: "pericia", valor: "Cura" }, { tipo: "poder", valor: "" }] })), 1);
t.igual("etapa 4: dois benefícios válidos aceitos", contaErros(erros(4, "estrito")), 0);

/* Etapa 5: classe */
t.igual("etapa 5: sem classe recusada", contaErros(erros(5, "estrito", { classe: null })), 1);
t.igual("etapa 5: classe válida aceita", contaErros(erros(5, "estrito")), 0);
t.igual("etapa 5: atributo de magia inválido recusado no Arcanista", contaErros(erros(5, "estrito", { classe: "arcanista", atributoMagia: "forca" })), 1);
t.igual("etapa 5: Arcanista com INT aceito", contaErros(erros(5, "estrito", { classe: "arcanista", atributoMagia: "inteligencia" })), 0);

/* Etapa 6: compra de atributos (10 pontos, valores de −1 a 4) */
/* Compras: 10 pontos = FOR2+DES2+CON2+INT2+SAB2 (2+2+2+2+2); 11 = FOR3+DES2+CON2+INT1+SAB1+CAR1 (4+2+2+1+1+1); 9 = FOR2+DES2+CON2+INT2+SAB1 */
const dez = { forca: 2, destreza: 2, constituicao: 2, inteligencia: 2, sabedoria: 2, carisma: 0 };
const onze = { forca: 3, destreza: 2, constituicao: 2, inteligencia: 1, sabedoria: 1, carisma: 1 };
const nove = { forca: 2, destreza: 2, constituicao: 2, inteligencia: 2, sabedoria: 1, carisma: 0 };
t.igual("etapa 6: 10 pontos gastos aceito (modo estrito)", contaErros(erros(6, "estrito", { atributosBase: dez })), 0);
t.igual("etapa 6: 11 pontos recusados (estrito)", contaErros(erros(6, "estrito", { atributosBase: onze })), 1);
t.igual("etapa 6: 9 pontos recusados (faltam pontos, estrito)", contaErros(erros(6, "estrito", { atributosBase: nove })), 1);
t.igual("etapa 6: 11 pontos vira aviso no livre", [contaErros(erros(6, "livre", { atributosBase: onze })), contaAvisos(erros(6, "livre", { atributosBase: onze })) > 0], [0, true]);
t.igual("etapa 6: valor 5 antes da raça recusado", contaErros(erros(6, "estrito", { atributosBase: { forca: 5, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 } })), 1);
t.igual("etapa 6: ajuste manual 9 recusado", contaErros(erros(6, "estrito", { ajusteManual: { forca: 9, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 } })), 1);

/* Etapa 7: perícias livres (Clérigo nível 1, Anão: 2 livres + INT positiva 0 = 2; a origem dá Cura) */
t.igual("etapa 7: duas perícias livres aceitas", contaErros(erros(7, "estrito")), 0);
t.igual("etapa 7: Humano recebe 2 perícias extras (Versátil): 2 livres não bastam", contaErros(erros(7, "estrito", { raca: "humano" })), 1);
t.igual("etapa 7: Humano aceito com 4 livres", contaErros(erros(7, "estrito", { raca: "humano", periciasEscolhidas: ["Atuação", "Diplomacia", "Enganação", "Intimidação"] })), 0);
t.igual("etapa 7: uma perícia livre recusada (faltam)", contaErros(erros(7, "estrito", { periciasEscolhidas: ["Atuação"] })), 1);
t.igual("etapa 7: três perícias livres recusadas (sobram)", contaErros(erros(7, "estrito", { periciasEscolhidas: ["Atuação", "Diplomacia", "Enganação"] })), 1);
t.igual("etapa 7: perícia já treinada pela origem recusada", contaErros(erros(7, "estrito", { periciasEscolhidas: ["Cura", "Diplomacia"] })), 1);
t.igual("etapa 7: perícia repetida recusada", contaErros(erros(7, "estrito", { periciasEscolhidas: ["Atuação", "Atuação"] })), 1);
t.igual("etapa 7: duas perícias livres com livre vira aviso se faltarem", [contaErros(erros(7, "livre", { periciasEscolhidas: ["Atuação"] })), contaAvisos(erros(7, "livre", { periciasEscolhidas: ["Atuação"] })) > 0], [0, true]);
t.igual("etapa 7: Guerreiro sem a escolha do grupo (Luta/Pontaria) recusado", contaErros(erros(7, "estrito", { classe: "guerreiro", grupoFixoEscolha: "", periciasEscolhidas: ["Atuação", "Diplomacia"] })), 1);

/* Etapa 8: poderes */
t.igual("etapa 8: poder sem nome recusado", contaErros(erros(8, "estrito", { poderes: [{ nome: "", tipo: "classe", nivel: 1 }] })), 1);
t.igual("etapa 8: poder com nível acima do personagem recusado", contaErros(erros(8, "estrito", { poderes: [{ nome: "Golpe", tipo: "classe", nivel: 3 }] })), 1);
t.igual("etapa 8: poder válido aceito", contaErros(erros(8, "estrito", { poderes: [{ nome: "Golpe", tipo: "classe", nivel: 1 }] })), 0);

/* Etapa 9: magias (Clérigo: 3 magias de 1º círculo no nível 1) */
t.igual("etapa 9: três magias de 1º círculo aceitas", contaErros(erros(9, "estrito")), 0);
t.igual("etapa 9: duas magias recusadas (faltam 1)", contaErros(erros(9, "estrito", { magias: [{ nome: "A", circulo: 1 }, { nome: "B", circulo: 1 }] })), 1);
t.igual("etapa 9: magia de 2º círculo no nível 1 recusada", contaErros(erros(9, "estrito", { magias: [{ nome: "A", circulo: 1 }, { nome: "B", circulo: 1 }, { nome: "C", circulo: 2 }] })), 1);
t.igual("etapa 9: magias de classe sem conjuração viram aviso", [contaErros(erros(9, "estrito", { classe: "guerreiro", magias: [{ nome: "A", circulo: 1 }] })), contaAvisos(erros(9, "estrito", { classe: "guerreiro", magias: [{ nome: "A", circulo: 1 }] })) > 0], [0, true]);

/* Etapa 10: equipamento e dinheiro */
t.igual("etapa 10: quantidade zero recusada", contaErros(erros(10, "estrito", { equipamento: [{ nome: "Corda", quantidade: 0 }] })), 1);
t.igual("etapa 10: dinheiro negativo recusado", contaErros(erros(10, "estrito", { dinheiro: -5 })), 1);
t.igual("etapa 10: bônus de armadura fracionário recusado", contaErros(erros(10, "estrito", { defesa: { armadura: 1.5, escudo: 0, outros: 0 } })), 1);

/* Ficha inteira */
montarPersonagem(ctx, base);
ctx.state.modo = "estrito";
const tudo = ctx.t20ValidarTudo(ctx.state);
t.igual("ficha inteira válida no estrito", tudo.valido, true);
ctx.state.modo = null;
t.igual("ficha sem modo não é válida", ctx.t20ValidarTudo(ctx.state).valido, false);

t.fim();
