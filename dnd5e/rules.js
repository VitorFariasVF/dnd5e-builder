const BACKGROUNDS = {
  acolito:{nome:"Acólito",pericias:["Intuição","Religião"],idiomas:2,ferramentas:[],caracteristica:"Abrigo dos Fiéis"},
  artesao_guilda:{nome:"Artesão de Guilda",pericias:["Intuição","Persuasão"],idiomas:1,ferramentas:["Ferramentas de artesão"],caracteristica:"Membro de Guilda"},
  artista:{nome:"Artista",pericias:["Acrobacia","Atuação"],idiomas:0,ferramentas:["Kit de disfarce","Um instrumento musical"],caracteristica:"Popularidade"},
  charlatao:{nome:"Charlatão",pericias:["Enganação","Prestidigitação"],idiomas:0,ferramentas:["Kit de disfarce","Kit de falsificação"],caracteristica:"Identidade Falsa"},
  criminoso:{nome:"Criminoso",pericias:["Enganação","Furtividade"],idiomas:0,ferramentas:["Ferramentas de ladrão","Jogo"],caracteristica:"Contato Criminoso"},
  eremita:{nome:"Eremita",pericias:["Medicina","Religião"],idiomas:1,ferramentas:["Kit de herbalismo"],caracteristica:"Descoberta"},
  forasteiro:{nome:"Forasteiro",pericias:["Atletismo","Sobrevivência"],idiomas:1,ferramentas:["Um instrumento musical"],caracteristica:"Andarilho"},
  heroi_povo:{nome:"Herói do Povo",pericias:["Adestrar Animais","Sobrevivência"],idiomas:0,ferramentas:["Ferramentas de artesão","Veículos terrestres"],caracteristica:"Hospitalidade Rústica"},
  marinheiro:{nome:"Marinheiro",pericias:["Atletismo","Percepção"],idiomas:0,ferramentas:["Ferramentas de navegador","Veículos aquáticos"],caracteristica:"Passagem de Navio"},
  nobre:{nome:"Nobre",pericias:["História","Persuasão"],idiomas:1,ferramentas:["Jogo"],caracteristica:"Privilégio de Posição"},
  orfao:{nome:"Órfão",pericias:["Prestidigitação","Furtividade"],idiomas:0,ferramentas:["Kit de disfarce","Ferramentas de ladrão"],caracteristica:"Segredos da Cidade"},
  sabio:{nome:"Sábio",pericias:["Arcanismo","História"],idiomas:2,ferramentas:[],caracteristica:"Pesquisador"},
  soldado:{nome:"Soldado",pericias:["Atletismo","Intimidação"],idiomas:0,ferramentas:["Jogo","Veículos terrestres"],caracteristica:"Patente Militar"}
};

const RACES = {
  anao:{nome:"Anão",bonusAtributos:{constituicao:2},idiomas:["Comum","Anão"],traits:["Visão no Escuro","Resiliência Anã","Treinamento de Combate Anão"],deslocamento:25},
  elfo:{nome:"Elfo",bonusAtributos:{destreza:2},idiomas:["Comum","Élfico"],traits:["Visão no Escuro","Sentidos Aguçados","Ancestral Feérico","Transe"],deslocamento:30},
  halfling:{nome:"Halfling",bonusAtributos:{destreza:2},idiomas:["Comum","Halfling"],traits:["Sortudo","Bravo","Agilidade Halfling"],deslocamento:25},
  humano:{nome:"Humano",bonusAtributos:{forca:1,destreza:1,constituicao:1,inteligencia:1,sabedoria:1,carisma:1},idiomas:["Comum","Extra"],traits:["Versatilidade Humana"],deslocamento:30},
  draconato:{nome:"Draconato",bonusAtributos:{forca:2,carisma:1},idiomas:["Comum","Dracônico"],traits:["Ancestral Dracônico","Arma de Sopro","Resistência a Dano"],deslocamento:30},
  gnomo:{nome:"Gnomo",bonusAtributos:{inteligencia:2},idiomas:["Comum","Gnômico"],traits:["Visão no Escuro","Esperteza Gnômica"],deslocamento:25},
  meio_elfo:{nome:"Meio-Elfo",bonusAtributos:{carisma:2},idiomas:["Comum","Élfico","Extra"],traits:["Visão no Escuro","Ancestral Feérico","Versatilidade em Perícias"],deslocamento:30},
  meio_orc:{nome:"Meio-Orc",bonusAtributos:{forca:2,constituicao:1},idiomas:["Comum","Orc"],traits:["Visão no Escuro","Ameaçador","Resistência Implacável","Ataques Selvagens"],deslocamento:30},
  tiefling:{nome:"Tiefling",bonusAtributos:{inteligencia:1,carisma:2},idiomas:["Comum","Infernal"],traits:["Visão no Escuro","Resistência Infernal","Legado Infernal"],deslocamento:30}
};

const SKILLS = {
  "Acrobacia":"destreza","Adestrar Animais":"sabedoria","Arcanismo":"inteligencia","Atletismo":"forca","Atuação":"carisma","Enganação":"carisma","Furtividade":"destreza","História":"inteligencia","Intimidação":"carisma","Intuição":"sabedoria","Investigação":"inteligencia","Medicina":"sabedoria","Natureza":"inteligencia","Percepção":"sabedoria","Persuasão":"carisma","Prestidigitação":"destreza","Religião":"inteligencia","Sobrevivência":"sabedoria"
};

const SPELLCASTERS = {
  bardo:{habilidade:"carisma",tipo:"conhecidas",cantrips:[2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],magias:[4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22]},
  bruxo:{habilidade:"carisma",tipo:"conhecidas",cantrips:[2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],magias:[2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15]},
  clerigo:{habilidade:"sabedoria",tipo:"preparadas"},
  druida:{habilidade:"sabedoria",tipo:"preparadas"},
  feiticeiro:{habilidade:"carisma",tipo:"conhecidas",cantrips:[4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6],magias:[2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15]},
  mago:{habilidade:"inteligencia",tipo:"preparadas"},
  paladino:{habilidade:"carisma",tipo:"preparadas",meioConjurador:true},
  patrulheiro:{habilidade:"sabedoria",tipo:"conhecidas",meioConjurador:true,magias:[0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]}
};

const SPELL_SLOTS = {
  full:{1:[2,0,0,0,0,0,0,0,0],2:[3,0,0,0,0,0,0,0,0],3:[4,2,0,0,0,0,0,0,0],4:[4,3,0,0,0,0,0,0,0],5:[4,3,2,0,0,0,0,0,0],6:[4,3,3,0,0,0,0,0,0],7:[4,3,3,1,0,0,0,0,0],8:[4,3,3,2,0,0,0,0,0],9:[4,3,3,3,1,0,0,0,0],10:[4,3,3,3,2,0,0,0,0],11:[4,3,3,3,2,1,0,0,0],12:[4,3,3,3,2,1,0,0,0],13:[4,3,3,3,2,1,1,0,0],14:[4,3,3,3,2,1,1,0,0],15:[4,3,3,3,2,1,1,1,0],16:[4,3,3,3,2,1,1,1,0],17:[4,3,3,3,2,1,1,1,1],18:[4,3,3,3,3,1,1,1,1],19:[4,3,3,3,3,2,1,1,1],20:[4,3,3,3,3,2,2,1,1]},
  half:{1:[0,0,0,0,0,0,0,0,0],2:[2,0,0,0,0,0,0,0,0],3:[3,0,0,0,0,0,0,0,0],4:[3,0,0,0,0,0,0,0,0],5:[4,2,0,0,0,0,0,0,0],6:[4,2,0,0,0,0,0,0,0],7:[4,3,0,0,0,0,0,0,0],8:[4,3,0,0,0,0,0,0,0],9:[4,3,2,0,0,0,0,0,0],10:[4,3,2,0,0,0,0,0,0],11:[4,3,3,0,0,0,0,0,0],12:[4,3,3,0,0,0,0,0,0],13:[4,3,3,1,0,0,0,0,0],14:[4,3,3,1,0,0,0,0,0],15:[4,3,3,2,0,0,0,0,0],16:[4,3,3,2,0,0,0,0,0],17:[4,3,3,3,1,0,0,0,0],18:[4,3,3,3,1,0,0,0,0],19:[4,3,3,3,2,0,0,0,0],20:[4,3,3,3,2,0,0,0,0]},
  warlock:{1:[1],2:[2],3:[2],4:[2],5:[2],6:[2],7:[2],8:[2],9:[2],10:[2],11:[3],12:[3],13:[3],14:[3],15:[3],16:[3],17:[4],18:[4],19:[4],20:[4]},
  warlockCircle:{1:1,2:1,3:2,4:2,5:3,6:3,7:4,8:4,9:5,10:5,11:5,12:5,13:5,14:5,15:5,16:5,17:5,18:5,19:5,20:5}
};

const CLASSES = {
  barbaro:{nome:"Bárbaro",dadoVida:12,saves:["Força","Constituição"],proficiencias:["Armaduras leves","Armaduras médias","Escudos","Armas simples","Armas marciais"],equipamento:["Machado grande ou arma marcial","Machadinhas ou arma simples","Pacote de aventureiro","Quatro azagaias"],escolhaPericias:{quantidade:2,opcoes:["Adestrar Animais","Atletismo","Intimidação","Natureza","Percepção","Sobrevivência"]}},
  bardo:{nome:"Bardo",dadoVida:8,saves:["Destreza","Carisma"],proficiencias:["Armaduras leves","Armas simples","Bestas de mão","Espadas longas","Rapieiras","Espadas curtas","Três instrumentos musicais"],equipamento:["Rapieira ou espada longa ou arma simples","Instrumento musical","Armadura de couro"],escolhaPericias:{quantidade:3,opcoes:Object.keys(SKILLS)}},
  bruxo:{nome:"Bruxo",dadoVida:8,saves:["Sabedoria","Carisma"],proficiencias:["Armaduras leves","Armas simples"],equipamento:["Besta leve ou arma simples","Bolsa de componentes ou foco arcano","Armadura de couro","Duas adagas"],escolhaPericias:{quantidade:2,opcoes:["Arcanismo","Enganação","História","Intimidação","Investigação","Natureza","Religião"]}},
  clerigo:{nome:"Clérigo",dadoVida:8,saves:["Sabedoria","Carisma"],proficiencias:["Armaduras leves","Armaduras médias","Escudos","Armas simples"],equipamento:["Maça ou martelo de guerra","Armadura de escamas ou couro ou cota de malha","Escudo"],escolhaPericias:{quantidade:2,opcoes:["História","Intuição","Medicina","Persuasão","Religião"]}},
  druida:{nome:"Druida",dadoVida:8,saves:["Inteligência","Sabedoria"],proficiencias:["Armaduras leves","Armaduras médias","Escudos","Clavas","Adagas","Dardos","Azagaias","Maças","Bordões","Cimitarras","Foices curtas","Fundas","Lanças","Kit de herbalismo"],equipamento:["Escudo de madeira ou arma simples","Cimitarra ou arma corpo a corpo simples","Armadura de couro"],escolhaPericias:{quantidade:2,opcoes:["Arcanismo","Adestrar Animais","Intuição","Medicina","Natureza","Percepção","Religião","Sobrevivência"]}},
  feiticeiro:{nome:"Feiticeiro",dadoVida:6,saves:["Constituição","Carisma"],proficiencias:["Adagas","Dardos","Fundas","Bordões","Bestas leves"],equipamento:["Besta leve ou arma simples","Duas adagas"],escolhaPericias:{quantidade:2,opcoes:["Arcanismo","Enganação","Intuição","Intimidação","Persuasão","Religião"]}},
  guerreiro:{nome:"Guerreiro",dadoVida:10,saves:["Força","Constituição"],proficiencias:["Todas as armaduras","Escudos","Armas simples","Armas marciais"],equipamento:["Cota de malha ou couro","Arma marcial e escudo ou duas armas marciais","Besta leve ou machadinhas"],escolhaPericias:{quantidade:2,opcoes:["Acrobacia","Adestrar Animais","Atletismo","História","Intuição","Intimidação","Percepção","Sobrevivência"]}},
  ladino:{nome:"Ladino",dadoVida:8,saves:["Destreza","Inteligência"],proficiencias:["Armaduras leves","Armas simples","Bestas de mão","Espadas longas","Rapieiras","Espadas curtas","Ferramentas de ladrão"],equipamento:["Rapieira ou espada curta","Arco curto ou espada curta","Armadura de couro","Duas adagas"],escolhaPericias:{quantidade:4,opcoes:["Acrobacia","Atletismo","Atuação","Enganação","Furtividade","Intimidação","Investigação","Intuição","Percepção","Persuasão","Prestidigitação"]}},
  mago:{nome:"Mago",dadoVida:6,saves:["Inteligência","Sabedoria"],proficiencias:["Adagas","Dardos","Fundas","Bordões","Bestas leves"],equipamento:["Bordão ou adaga","Grimório"],escolhaPericias:{quantidade:2,opcoes:["Arcanismo","História","Intuição","Investigação","Medicina","Religião"]}},
  monge:{nome:"Monge",dadoVida:8,saves:["Força","Destreza"],proficiencias:["Armas simples","Espadas curtas","Uma ferramenta de artesão ou instrumento musical"],equipamento:["Espada curta ou arma simples","10 dardos"],escolhaPericias:{quantidade:2,opcoes:["Acrobacia","Atletismo","História","Intuição","Religião","Furtividade"]}},
  paladino:{nome:"Paladino",dadoVida:10,saves:["Sabedoria","Carisma"],proficiencias:["Todas as armaduras","Escudos","Armas simples","Armas marciais"],equipamento:["Arma marcial e escudo ou duas armas marciais","Cinco azagaias ou arma corpo a corpo simples","Cota de malha","Símbolo sagrado"],escolhaPericias:{quantidade:2,opcoes:["Atletismo","Intuição","Intimidação","Medicina","Persuasão","Religião"]}},
  patrulheiro:{nome:"Patrulheiro",dadoVida:10,saves:["Força","Destreza"],proficiencias:["Armaduras leves","Armaduras médias","Escudos","Armas simples","Armas marciais"],equipamento:["Armadura de escamas ou couro","Duas espadas curtas ou duas armas corpo a corpo simples","Arco longo e flechas"],escolhaPericias:{quantidade:3,opcoes:["Adestrar Animais","Atletismo","Intuição","Investigação","Natureza","Percepção","Furtividade","Sobrevivência"]}}
};

const ARMORS = {
  sem_armadura:{nome:"Sem armadura",tipo:"nenhuma",baseCA:10,dex:"full",peso:0,precoGp:0,tags:["sem armadura"]},
  acolchoada:{nome:"Armadura acolchoada",tipo:"leve",baseCA:11,dex:"full",peso:8,precoGp:5,desvantagemFurtividade:true,tags:["leve","tecido"]},
  couro:{nome:"Armadura de couro",tipo:"leve",baseCA:11,dex:"full",peso:10,precoGp:10,tags:["leve","couro"]},
  couro_batido:{nome:"Armadura de couro batido",tipo:"leve",baseCA:12,dex:"full",peso:13,precoGp:45,tags:["leve","couro"]},
  gibao_peles:{nome:"Gibão de peles",tipo:"media",baseCA:12,dex:"max2",peso:12,precoGp:10,tags:["média","pele"]},
  camisa_malha:{nome:"Camisa de malha",tipo:"media",baseCA:13,dex:"max2",peso:20,precoGp:50,tags:["média","metal"]},
  cota_escamas:{nome:"Cota de escamas",tipo:"media",baseCA:14,dex:"max2",peso:45,precoGp:50,desvantagemFurtividade:true,tags:["média","metal"]},
  peitoral:{nome:"Peitoral",tipo:"media",baseCA:14,dex:"max2",peso:20,precoGp:400,tags:["média","metal"]},
  meia_armadura:{nome:"Meia-armadura",tipo:"media",baseCA:15,dex:"max2",peso:40,precoGp:750,desvantagemFurtividade:true,tags:["média","metal"]},
  cota_aneis:{nome:"Cota de anéis",tipo:"pesada",baseCA:14,dex:"none",peso:40,precoGp:30,desvantagemFurtividade:true,tags:["pesada","metal"]},
  cota_malha:{nome:"Cota de malha",tipo:"pesada",baseCA:16,dex:"none",peso:55,precoGp:75,forcaMin:13,desvantagemFurtividade:true,tags:["pesada","metal"]},
  talas:{nome:"Talas",tipo:"pesada",baseCA:17,dex:"none",peso:60,precoGp:200,forcaMin:15,desvantagemFurtividade:true,tags:["pesada","metal"]},
  placas:{nome:"Placas",tipo:"pesada",baseCA:18,dex:"none",peso:65,precoGp:1500,forcaMin:15,desvantagemFurtividade:true,tags:["pesada","metal"]}
};

/* Armas do PHB (5e 2014). Crítico é sempre 20 natural com dados dobrados (x2): só o Campeão amplia a margem.
   alcancePes/alcanceLongoPes: valores em pés para a exportação (Foundry/Roll20); alcance: texto em metros para a tela. */
function _arma(nome,categoria,corpo,dano,tipoDano,peso,precoGp,props,extra){
  const e=extra||{};
  const ranged=!!e.ranged;
  const finesse=props.includes("acuidade");
  const tags=[categoria,ranged?"à distância":"corpo a corpo"].concat(props.filter(p=>!/^(munição|carga|arremesso)/.test(p)));
  return Object.assign({nome,categoria,tipo:ranged?"à distância":"corpo a corpo",dano,tipoDano,alcance:e.alcance||"adjacente",peso,precoGp,critico:"20/x2",propriedades:props,finesse,ranged,versatile:e.versatile||null,tags},e.alcancePes?{alcancePes:e.alcancePes,alcanceLongoPes:e.alcanceLongoPes}:{});
}
const WEAPONS = {
  clava:_arma("Clava","simples",true,"1d4","contundente",2,0.1,["leve"]),
  adaga:_arma("Adaga","simples",true,"1d4","perfurante",1,2,["acuidade","leve","arremesso 6/18"],{alcancePes:20,alcanceLongoPes:60}),
  tacape:_arma("Tacape","simples",true,"1d8","contundente",10,0.2,["duas mãos"]),
  machadinha:_arma("Machadinha","simples",true,"1d6","cortante",2,5,["leve","arremesso 6/18"],{alcancePes:20,alcanceLongoPes:60}),
  azagaia:_arma("Azagaia","simples",true,"1d6","perfurante",2,0.5,["arremesso 9/36"],{alcance:"adjacente (arremesso 9/36 m)",alcancePes:30,alcanceLongoPes:120}),
  martelo_leve:_arma("Martelo leve","simples",true,"1d4","contundente",2,2,["leve","arremesso 6/18"],{alcancePes:20,alcanceLongoPes:60}),
  maca:_arma("Maça","simples",true,"1d6","contundente",4,5,[]),
  bordao:_arma("Bordão","simples",true,"1d6","contundente",4,0.2,["versátil 1d8"],{versatile:"1d8"}),
  foice_curta:_arma("Foice curta","simples",true,"1d4","cortante",2,1,["leve"]),
  lanca:_arma("Lança","simples",true,"1d6","perfurante",3,1,["arremesso 6/18","versátil 1d8"],{versatile:"1d8",alcancePes:20,alcanceLongoPes:60}),
  besta_leve:_arma("Besta leve","simples",false,"1d8","perfurante",5,25,["munição","carga","duas mãos"],{ranged:true,alcance:"24/96 m",alcancePes:80,alcanceLongoPes:320}),
  dardo:_arma("Dardo","simples",false,"1d4","perfurante",0.25,0.05,["acuidade","arremesso 6/18"],{ranged:true,alcance:"6/18 m",alcancePes:20,alcanceLongoPes:60}),
  arco_curto:_arma("Arco curto","simples",false,"1d6","perfurante",2,25,["munição","duas mãos"],{ranged:true,alcance:"24/96 m",alcancePes:80,alcanceLongoPes:320}),
  funda:_arma("Funda","simples",false,"1d4","contundente",0,0.1,["munição"],{ranged:true,alcance:"9/36 m",alcancePes:30,alcanceLongoPes:120}),
  machado_batalha:_arma("Machado de batalha","marcial",true,"1d8","cortante",4,10,["versátil 1d10"],{versatile:"1d10"}),
  mangual:_arma("Mangual","marcial",true,"1d8","contundente",2,10,[]),
  glaive:_arma("Glaive","marcial",true,"1d10","cortante",6,20,["pesada","alcance estendido","duas mãos"],{alcance:"adjacente (3 m)"}),
  machado_grande:_arma("Machado grande","marcial",true,"1d12","cortante",7,30,["pesada","duas mãos"]),
  espada_grande:_arma("Espada grande","marcial",true,"2d6","cortante",6,50,["pesada","duas mãos"]),
  alabarda:_arma("Alabarda","marcial",true,"1d10","cortante",6,20,["pesada","alcance estendido","duas mãos"],{alcance:"adjacente (3 m)"}),
  lanca_montaria:_arma("Lança de montaria","marcial",true,"1d12","perfurante",6,10,["alcance estendido","especial"],{alcance:"adjacente (3 m)"}),
  espada_longa:_arma("Espada longa","marcial",true,"1d8","cortante",3,15,["versátil 1d10"],{versatile:"1d10"}),
  malho:_arma("Malho","marcial",true,"2d6","contundente",10,10,["pesada","duas mãos"]),
  maca_estrela:_arma("Maça estrela","marcial",true,"1d8","perfurante",4,15,[]),
  pique:_arma("Pique","marcial",true,"1d10","perfurante",18,5,["pesada","alcance estendido","duas mãos"],{alcance:"adjacente (3 m)"}),
  rapieira:_arma("Rapieira","marcial",true,"1d8","perfurante",2,25,["acuidade"]),
  cimitarra:_arma("Cimitarra","marcial",true,"1d6","cortante",3,25,["acuidade","leve"]),
  espada_curta:_arma("Espada curta","marcial",true,"1d6","perfurante",2,10,["acuidade","leve"]),
  tridente:_arma("Tridente","marcial",true,"1d6","perfurante",4,5,["arremesso 6/18","versátil 1d8"],{versatile:"1d8",alcancePes:20,alcanceLongoPes:60}),
  picareta_guerra:_arma("Picareta de guerra","marcial",true,"1d8","perfurante",2,5,[]),
  martelo_guerra:_arma("Martelo de guerra","marcial",true,"1d8","contundente",2,15,["versátil 1d10"],{versatile:"1d10"}),
  chicote:_arma("Chicote","marcial",true,"1d4","cortante",3,2,["acuidade","alcance estendido"],{alcance:"adjacente (3 m)"}),
  zarabatana:_arma("Zarabatana","marcial",false,"1","perfurante",1,10,["munição","carga"],{ranged:true,alcance:"7,5/30 m",alcancePes:25,alcanceLongoPes:100}),
  besta_mao:_arma("Besta de mão","marcial",false,"1d6","perfurante",3,75,["munição","leve","carga"],{ranged:true,alcance:"9/36 m",alcancePes:30,alcanceLongoPes:120}),
  rede:_arma("Rede","marcial",false,"0","—",3,1,["especial","arremesso 1,5/4,5"],{ranged:true,alcance:"1,5/4,5 m",alcancePes:5,alcanceLongoPes:15}),
  besta_pesada:_arma("Besta pesada","marcial",false,"1d10","perfurante",18,50,["munição","pesada","carga","duas mãos"],{ranged:true,alcance:"30/120 m",alcancePes:100,alcanceLongoPes:400}),
  arco_longo:_arma("Arco longo","marcial",false,"1d8","perfurante",2,50,["munição","pesada","duas mãos"],{ranged:true,alcance:"45/180 m",alcancePes:150,alcanceLongoPes:600})
};

const ITEM_CATALOG = {
  corda:{nome:"Corda de cânhamo (15 m)",peso:10,precoGp:1}, tocha:{nome:"Tocha",peso:1,precoGp:0.01}, racao:{nome:"Ração (1 dia)",peso:2,precoGp:0.5}, odre:{nome:"Odre",peso:5,precoGp:0.2}, mochila:{nome:"Mochila",peso:5,precoGp:2}, bedroll:{nome:"Saco de dormir",peso:7,precoGp:1}, kit_herbalismo:{nome:"Kit de herbalismo",peso:3,precoGp:5}, ferramentas_ladrao:{nome:"Ferramentas de ladrão",peso:1,precoGp:25},
  grimorio:{nome:"Grimório",peso:3,precoGp:50}, foco_arcano:{nome:"Foco arcano",peso:1,precoGp:10}, bolsa_componentes:{nome:"Bolsa de componentes",peso:2,precoGp:25}, instrumento_musical:{nome:"Instrumento musical",peso:3,precoGp:30}, simbolo_sagrado:{nome:"Símbolo sagrado",peso:1,precoGp:5}, flechas20:{nome:"Aljava com 20 flechas",peso:1,precoGp:1},
  pacote_aventureiro:{nome:"Pacote de aventureiro",peso:35,precoGp:12}, escudo_madeira:{nome:"Escudo de madeira",peso:6,precoGp:10}, machadinha:{nome:"Machadinha",peso:2,precoGp:5}, dardo:{nome:"Dardo",peso:0.25,precoGp:0.05}
};

const ATTRIBUTE_METHODS = {standard:{nome:"Standard Array",valores:[15,14,13,12,10,8]}, pointbuy:{nome:"Point Buy",pontos:27,custos:{8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9}}};
const ATTRIBUTE_LIST = ["forca","destreza","constituicao","inteligencia","sabedoria","carisma"];
const ATTRIBUTE_LABELS = {forca:"Força",destreza:"Destreza",constituicao:"Constituição",inteligencia:"Inteligência",sabedoria:"Sabedoria",carisma:"Carisma"};
const SAVE_TO_KEY = {"Força":"forca","Destreza":"destreza","Constituição":"constituicao","Inteligência":"inteligencia","Sabedoria":"sabedoria","Carisma":"carisma"};
const STEP_LABELS = {1:"Escolha do modo",2:"Origem",3:"Raça",4:"Classe",5:"Perícias",6:"Atributos",7:"Combate e armas",8:"Inventário",9:"Magia",10:"Personalidade",11:"Resumo"};

const SPELL_LISTS = {
  bardo:{truques:["Luzes Dançantes","Zombaria Viciosa","Prestidigitação","Ilusão Menor","Mensagem"],1:["Curar Ferimentos","Palavra Curativa","Sono","Sussurros Dissonantes","Fogo das Fadas","Despedaçar"],2:["Aprimorar Habilidade","Invisibilidade","Silêncio","Sugestão"]},
  bruxo:{truques:["Rajada Mística","Toque Arrepiante","Ilusão Menor","Prestidigitação","Mãos Mágicas"],1:["Armadura de Agathys","Hex","Braços de Hadar","Recuo Arcano","Compreender Idiomas"],2:["Escuridão","Raio Enfraquecedor","Imobilizar Pessoa","Passo Nebuloso"]},
  clerigo:{truques:["Luz","Chama Sagrada","Taumaturgia","Orientação","Resistência"],1:["Curar Ferimentos","Palavra Curativa","Bênção","Comando","Escudo da Fé","Detectar Magia"],2:["Arma Espiritual","Restauração Menor","Imobilizar Pessoa","Silêncio","Auxílio"]},
  druida:{truques:["Criar Chamas","Orientação","Bordão Místico","Resistência","Chicote de Espinhos"],1:["Curar Ferimentos","Fogo das Fadas","Enfeitiçar Pessoa","Falar com Animais","Nuvem de Névoa"],2:["Esfera Flamejante","Passo sem Pegadas","Pele de Árvore","Restauração Menor","Rajada de Vento"]},
  feiticeiro:{truques:["Raio de Gelo","Rajada de Fogo","Mãos Mágicas","Prestidigitação","Toque Chocante"],1:["Armadura Arcana","Mísseis Mágicos","Escudo","Sono","Orbe Cromática","Mãos Flamejantes"],2:["Passo Nebuloso","Invisibilidade","Raio Ardente","Segurar Pessoa","Teia"]},
  mago:{truques:["Raio de Gelo","Rajada de Fogo","Luz","Mãos Mágicas","Prestidigitação","Toque Chocante"],1:["Armadura Arcana","Mísseis Mágicos","Escudo","Sono","Disfarçar-se","Detectar Magia","Compreender Idiomas","Identificar"],2:["Passo Nebuloso","Imagem Espelhada","Invisibilidade","Raio Ardente","Teia","Segurar Pessoa"],3:["Bola de Fogo","Contramágica"]},
  paladino:{truques:[],1:["Bênção","Comando","Curar Ferimentos","Escudo da Fé","Destruição Colérica"],2:["Auxílio","Restauração Menor","Vínculo Protetor","Arma Mágica"]},
  patrulheiro:{truques:[],1:["Marca do Caçador","Falar com Animais","Curar Ferimentos","Nuvem de Névoa","Passo Ágil"],2:["Passo sem Pegadas","Restauração Menor","Pele de Casca","Cordão de Flechas"]}
};

const XANATHAR_SPELLS = {
  bardo:{
    truques:["Criar Fogueira","Controlar Chamas","Dobre dos Mortos","Moldar Terra"],
    1:["Raio do Caos","Causar Medo","Absorver Elementos","Catapulta","Enfeitiçar Pessoa"],
    2:["Lâmina Sombria","Passo Trovejante","Inimigos em Todo Lugar","Soneca","Pirotecnia","Força Fantasmagórica"],
    3:["Vento Trovejante","Inimigos Abundantes","Padrão Hipnótico"],
    4:["Esfera Aquosa","Raio Enlouquecedor","Empoderar Habilidade"],
    5:["Estática Sináptica","Animar Objetos"],
    6:["Dança Macabra"],
    7:["Palavra de Poder Dor"]
  },
  bruxo:{
    truques:["Criar Fogueira","Dobre dos Mortos","Infestação","Moldar Terra"],
    1:["Causar Medo","Absorver Elementos","Catapulta"],
    2:["Lâmina Sombria","Espinho Mental","Passo Trovejante","Pirotecnia","Força Fantasmagórica"],
    3:["Vento Trovejante","Luz Enfermiça","Invocar Demônios Menores"],
    4:["Raio Enlouquecedor","Esfera Aquosa","Invocar Demônio Maior","Empoderar Habilidade"],
    5:["Estática Sináptica","Distante Passo"],
    6:["Carne para Pedra"],
    7:["Palavra de Poder Dor"]
  },
  clerigo:{
    truques:["Palavra de Radiância","Moldar Terra"],
    1:["Cerimônia","Causar Medo"],
    2:["Vínculo Protetor","Pirotecnia","Repouso Gentil"],
    3:["Guardiães Espirituais","Luz do Dia"],
    4:["Guardião da Fé"],
    5:["Estática Sináptica"]
  },
  druida:{
    truques:["Criar Fogueira","Controlar Chamas","Selvageria Primal","Pedra Mágica","Moldar Terra"],
    1:["Absorver Elementos","Tremor de Terra","Armadilha"],
    2:["Espírito Curativo","Prender à Terra","Sopro do Dragão","Rajada de Pó","Vento Protetor"],
    3:["Muralha de Água","Muralha de Areia","Vento Trovejante","Forma Gasosa","Flechas Flamejantes"],
    4:["Esfera Aquosa","Inseto Gigante","Tempestade de Gelo"],
    5:["Transmutar Rocha","Golpe do Vento Cortante"],
    6:["Dispersão","Osso da Terra"],
    7:["Miragem Arcana"]
  },
  feiticeiro:{
    truques:["Criar Fogueira","Mordida Gélida","Dobre dos Mortos","Controlar Chamas","Moldar Terra","Rajada Trovejante"],
    1:["Absorver Elementos","Catapulta","Causar Medo","Raio do Caos","Faca de Gelo","Tremor de Terra"],
    2:["Lâmina Sombria","Passo Trovejante","Espinho Mental","Sopro do Dragão","Pirotecnia","Rajada de Pó","Vento Protetor"],
    3:["Onda de Maré","Vento Trovejante","Nevasca de Snilloc","Chamuscar de Aganazzar","Flechas Flamejantes"],
    4:["Esfera Aquosa","Esfera Tempestuosa","Raio Enlouquecedor","Invocar Demônio Maior","Empoderar Habilidade"],
    5:["Golpe do Vento Cortante","Estática Sináptica","Luz Enfermiça","Esfera Vitríolica","Distante Passo"],
    6:["Dispersão","Osso da Terra"],
    7:["Palavra de Poder Dor","Tempestade de Fogo"],
    8:["Demiplano"],
    9:["Metamorfose Verdadeira"]
  },
  mago:{
    truques:["Criar Fogueira","Controlar Chamas","Mordida Gélida","Infestação","Pedra Mágica","Moldar Terra","Rajada Trovejante"],
    1:["Absorver Elementos","Catapulta","Causar Medo","Faca de Gelo","Tremor de Terra","Armadilha"],
    2:["Lâmina Sombria","Passo Trovejante","Espinho Mental","Sopro do Dragão","Prender à Terra","Pirotecnia","Rajada de Pó","Vento Protetor"],
    3:["Onda de Maré","Muralha de Areia","Muralha de Água","Vento Trovejante","Nevasca de Snilloc","Chamuscar de Aganazzar","Flechas Flamejantes","Invocar Demônios Menores"],
    4:["Esfera Aquosa","Esfera Tempestuosa","Raio Enlouquecedor","Invocar Demônio Maior","Empoderar Habilidade"],
    5:["Golpe do Vento Cortante","Estática Sináptica","Luz Enfermiça","Esfera Vitríolica","Transmutar Rocha","Distante Passo","Empoderar Perícia"],
    6:["Dispersão","Osso da Terra","Carne para Pedra"],
    7:["Palavra de Poder Dor","Miragem Arcana","Tempestade de Fogo"],
    8:["Demiplano"],
    9:["Metamorfose Verdadeira"]
  },
  paladino:{
    truques:[],
    1:["Cerimônia","Absorver Elementos"],
    2:["Vínculo Protetor","Montaria Fantasmagórica"],
    3:["Aura de Vitalidade"],
    4:["Banimento","Guardião da Fé"],
    5:["Círculo de Poder","Destruição Banidora"]
  },
  patrulheiro:{
    truques:[],
    1:["Ataque Zéfiro","Armadilha","Absorver Elementos"],
    2:["Espírito Curativo","Prender à Terra","Sopro do Dragão","Corda de Flechas"],
    3:["Flecha Relampejante","Conjurar Barragem","Vento Trovejante","Flechas Flamejantes"],
    4:["Liberdade de Movimento","Guardião da Natureza"],
    5:["Passo Arbóreo","Golpe do Vento Cortante"]
  }
};

const XANATHAR_SUBCLASS_BONUS_SPELLS = {
  'clerigo:forge': {1:["Identificar","Searing Smite"],3:["Arma Mágica","Calor do Metal"],5:["Proteção contra Energia","Arma Elemental"],7:["Fabricar","Muralha de Fogo"],9:["Animar Objetos","Criação"]},
  'clerigo:grave': {1:["Banimento da Vida","Falsa Vida"],3:["Repouso Gentil","Raio de Enfraquecimento"],5:["Revivificar","Toque Vampírico"],7:["Proteção contra a Morte","Olho Arcano"],9:["Antivida","Levantar os Mortos"]},
  'paladino:conquest': {3:["Armadura de Agathys","Comando"],5:["Segurar Pessoa","Arma Espiritual"],9:["Bestow Curse","Fear"],13:["Dominate Beast","Stoneskin"],17:["Cloudkill","Dominate Person"]},
  'paladino:redemption': {3:["Santuário","Sono"],5:["Calmar Emoções","Segurar Pessoa"],9:["Contramágica","Padrão Hipnótico"],13:["Otiluke's Resilient Sphere","Pedra da Pele"],17:["Hold Monster","Wall of Force"]},
  'patrulheiro:gloom_stalker': {3:["Disguise Self"],5:["Rope Trick"],9:["Fear"],13:["Greater Invisibility"],17:["Seeming"]},
  'patrulheiro:horizon_walker': {3:["Protection from Evil and Good"],5:["Misty Step"],9:["Haste"],13:["Banishment"],17:["Teleportation Circle"]},
  'patrulheiro:monster_slayer': {3:["Protection from Evil and Good"],5:["Zone of Truth"],9:["Magic Circle"],13:["Banishment"],17:["Hold Monster"]},
  'bruxo:celestial': {1:["Curar Ferimentos","Raio Guiador"],3:["Esfera Flamejante","Restauração Menor"],5:["Luz do Dia","Bola de Fogo"],7:["Guardião da Fé","Muralha de Fogo"],9:["Chama Sagrada Flamejante","Restauração Maior"]},
  'bruxo:hexblade': {1:["Escudo","Searing Smite"],3:["Blur","Branding Smite"],5:["Blink","Elemental Weapon"],7:["Phantasmal Killer","Staggering Smite"],9:["Banishing Smite","Cone of Cold"]}
};

function mergeSpellCollections(base, extra){
  const out = JSON.parse(JSON.stringify(base));
  Object.entries(extra||{}).forEach(([classe, data])=>{
    out[classe] = out[classe] || {};
    Object.entries(data||{}).forEach(([circle, spells])=>{
      const current = out[classe][circle] || [];
      out[classe][circle] = [...new Set([...current, ...(spells||[])])];
    });
  });
  return out;
}

Object.assign(SPELL_LISTS, mergeSpellCollections(SPELL_LISTS, XANATHAR_SPELLS));

function getSubclassBonusSpells(classe, subclasse, nivel){
  const key = `${classe}:${subclasse}`;
  const bucket = XANATHAR_SUBCLASS_BONUS_SPELLS[key] || {};
  const out = {};
  Object.entries(bucket).forEach(([circle, spells])=>{
    if((nivel||1) >= Number(circle)) out[circle] = [...new Set([...(out[circle]||[]), ...(spells||[])])];
  });
  return out;
}
function getCharacterSpellLists(classe, subclasse, nivel){
  const base = JSON.parse(JSON.stringify(SPELL_LISTS[classe] || {truques:[]}));
  const extra = getSubclassBonusSpells(classe, subclasse, nivel);
  return mergeSpellCollections({[classe]: base}, {[classe]: extra})[classe] || base;
}
function getCharacterBonusSpellSummary(personagem){
  const extra = getSubclassBonusSpells(personagem?.classe, personagem?.subclasse, personagem?.nivel||1);
  return Object.entries(extra).sort((a,b)=>Number(a[0])-Number(b[0])).map(([circle, spells])=>`${circle}º: ${(spells||[]).join(', ')}`);
}

function calcularPontosUsadosPointBuy(valores){ let total=0; for(const attr of ATTRIBUTE_LIST){ total += ATTRIBUTE_METHODS.pointbuy.custos[valores[attr]] ?? 999; } return total; }


// ===============================
// ETAPA 12 - AUDITORIA E CORREÇÃO DE LISTAS DE MAGIAS
// ===============================
// Corrige nomes, remove entradas de classe incorretas e amplia as listas por classe.
// Mantém apenas nomes e metadados mínimos; não adiciona descrições completas de livros.
const RULE_SPELL_ALIASES_STAGE12 = {
  "Dobre dos Mortos":"Dobrar os Mortos", "Corda de Flechas":"Cordão de Flechas", "Segurar Pessoa":"Imobilizar Pessoa",
  "Searing Smite":"Destruição Lancinante", "Bestow Curse":"Rogar Maldição", "Fear":"Medo", "Blur":"Nublar",
  "Branding Smite":"Marca da Punição", "Blink":"Piscar", "Elemental Weapon":"Arma Elemental",
  "Phantasmal Killer":"Assassino Fantasmagórico", "Staggering Smite":"Destruição Estonteante",
  "Banishing Smite":"Destruição Banidora", "Cone of Cold":"Cone de Frio", "Chama Sagrada Flamejante":"Coluna de Chamas",
  "Disguise Self":"Disfarçar-se", "Rope Trick":"Truque de Corda", "Greater Invisibility":"Invisibilidade Maior",
  "Seeming":"Similaridade", "Protection from Evil and Good":"Proteção contra o Bem e o Mal", "Misty Step":"Passo Nebuloso",
  "Haste":"Velocidade", "Banishment":"Banimento", "Teleportation Circle":"Círculo de Teletransporte",
  "Zone of Truth":"Zona da Verdade", "Magic Circle":"Círculo Mágico", "Hold Monster":"Imobilizar Monstro",
  "Otiluke's Resilient Sphere":"Esfera Resiliente de Otiluke", "Wall of Force":"Muralha de Força",
  "Dominate Beast":"Dominar Besta", "Stoneskin":"Pele de Pedra", "Cloudkill":"Névoa Mortal", "Dominate Person":"Dominar Pessoa",
  "Banimento da Vida":"Perdição", "Pedra da Pele":"Pele de Pedra"
};
function ruleSpellCanonicalStage12(nome){ return RULE_SPELL_ALIASES_STAGE12[nome] || nome; }
function ruleSpellKeyStage12(nome){ return String(ruleSpellCanonicalStage12(nome)||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim(); }
function ruleSpellUniqueStage12(lista){ const seen=new Set(); const out=[]; (lista||[]).forEach(n=>{ const v=ruleSpellCanonicalStage12(String(n||"").trim()); const k=ruleSpellKeyStage12(v); if(!v||seen.has(k)) return; seen.add(k); out.push(v); }); return out; }
function ruleSpellMergeStage12(target, patch){ Object.entries(patch||{}).forEach(([classe,data])=>{ target[classe]=target[classe]||{truques:[]}; Object.entries(data||{}).forEach(([circle,spells])=>{ target[classe][circle]=ruleSpellUniqueStage12([...(target[classe][circle]||[]), ...(spells||[])]); }); }); }
function ruleSpellRemoveStage12(target, deny){ Object.entries(deny||{}).forEach(([classe,data])=>{ Object.entries(data||{}).forEach(([circle,spells])=>{ const denied=new Set((spells||[]).map(ruleSpellKeyStage12)); target[classe][circle]=(target[classe][circle]||[]).filter(n=>!denied.has(ruleSpellKeyStage12(n))); }); }); }
function ruleSpellNormalizeAllStage12(target){ Object.entries(target||{}).forEach(([classe,data])=>{ Object.entries(data||{}).forEach(([circle,spells])=>{ target[classe][circle]=ruleSpellUniqueStage12(spells); }); }); }

const RULE_SPELL_DENYLIST_STAGE12 = {
  bardo:{1:["Absorver Elementos","Catapulta","Raio do Caos"], truques:["Controlar Chamas","Moldar Terra"]},
  bruxo:{1:["Absorver Elementos","Catapulta"], 4:["Esfera Aquosa"], truques:["Moldar Terra"]},
  clerigo:{1:["Causar Medo"],2:["Pirotecnia"],5:["Estática Sináptica"], truques:["Moldar Terra"]},
  druida:{2:["Sopro do Dragão"],3:["Forma Gasosa"],7:["Miragem Arcana"]},
  paladino:{1:["Absorver Elementos"],2:["Montaria Fantasmagórica"]},
  patrulheiro:{2:["Sopro do Dragão"]}
};

const RULE_SPELL_PATCH_STAGE12 = {
  bardo:{
    truques:["Amizade","Consertar","Ilusão Menor","Luz","Luzes Dançantes","Mãos Mágicas","Mensagem","Prestidigitação","Proteção contra Lâminas","Zombaria Viciosa","Rajada Trovejante"],
    1:["Compreender Idiomas","Detectar Magia","Disfarçar-se","Enfeitiçar Pessoa","Heroísmo","Identificar","Imagem Silenciosa","Onda Trovejante","Perdição","Queda Suave","Riso Histérico de Tasha","Servo Invisível","Tremor de Terra"],
    2:["Acalmar Emoções","Arrombar","Cegueira/Surdez","Detectar Pensamentos","Esquentar Metal","Força Fantasmagórica","Invisibilidade","Localizar Objeto","Nublar","Restauração Menor","Soneca","Ver o Invisível","Zona da Verdade"],
    3:["Dissipar Magia","Enviar Mensagem","Falar com os Mortos","Falar com Plantas","Glifo de Vigilância","Idiomas","Imagem Maior","Medo","Névoa Fétida","Padrão Hipnótico","Pequena Cabana de Leomund","Rogar Maldição","Vento Trovejante"],
    4:["Compulsão","Confusão","Invisibilidade Maior","Localizar Criatura","Movimentação Livre","Polimorfia","Porta Dimensional","Terreno Alucinatório"],
    5:["Animar Objetos","Círculo de Teletransporte","Conhecimento Lendário","Curar Ferimentos em Massa","Dominar Pessoa","Estática Sináptica","Modificar Memória","Restauração Maior","Similaridade","Sonho"]
  },
  clerigo:{
    truques:["Poupar os Mortos","Dobrar os Mortos","Palavra de Radiância"],
    1:["Criar ou Destruir Água","Detectar o Bem e o Mal","Detectar Veneno e Doença","Infligir Ferimentos","Proteção contra o Bem e o Mal","Purificar Alimentos","Raio Guiador","Santuário","Cerimônia"],
    2:["Acalmar Emoções","Augúrio","Cegueira/Surdez","Chama Contínua","Encontrar Armadilhas","Oração Curativa","Proteção contra Veneno","Repouso Gentil","Zona da Verdade"],
    3:["Animar Mortos","Clarividência","Criar Alimentos","Dissipar Magia","Enviar Mensagem","Espíritos Guardiões","Falar com os Mortos","Glifo de Vigilância","Idiomas","Luz do Dia","Mesclar-se às Rochas","Proteção contra Energia","Remover Maldição","Revivificar"],
    4:["Adivinhação","Banimento","Controlar Água","Guardião da Fé","Localizar Criatura","Moldar Rochas","Movimentação Livre","Proteção contra a Morte"],
    5:["Coluna de Chamas","Comunhão","Conhecimento Lendário","Consagrar","Contágio","Curar Ferimentos em Massa","Dissipar o Bem e o Mal","Praga de Insetos","Restauração Maior","Reviver os Mortos"]
  },
  druida:{
    truques:["Druidismo","Consertar","Criar Fogueira","Controlar Chamas","Moldar Terra","Moldar Água","Rajada Trovejante","Selvageria Primal"],
    1:["Absorver Elementos","Armadilha","Bom Fruto","Criar ou Destruir Água","Detectar Magia","Detectar Veneno e Doença","Névoa Obscurecente","Onda Trovejante","Passos Longos","Purificar Alimentos","Salto","Faca de Gelo","Tremor de Terra"],
    2:["Augúrio","Calor Metálico","Crescer Espinhos","Encontrar Armadilhas","Lâmina Flamejante","Localizar Animais ou Plantas","Localizar Objeto","Mensageiro Animal","Raio Lunar","Sentido Bestial","Visão no Escuro","Espírito Curativo","Prender à Terra","Rajada de Pó","Vento Protetor"],
    3:["Ampliar Plantas","Chamar Relâmpagos","Conjurar Animais","Dissipar Magia","Fundir-se às Rochas","Luz do Dia","Muralha de Vento","Nevasca","Proteção contra Energia","Respirar na Água","Onda de Maré","Muralha de Areia","Muralha de Água","Vento Trovejante"],
    4:["Confusão","Conjurar Seres da Floresta","Controlar Água","Dominar Besta","Inseto Gigante","Localizar Criatura","Movimentação Livre","Muralha de Fogo","Moldar Rochas","Polimorfia","Tempestade de Gelo","Esfera Aquosa","Guardião da Natureza"],
    5:["Concha Antivida","Comunhão com a Natureza","Conjurar Elemental","Contágio","Curar Ferimentos em Massa","Despertar","Muralha de Pedra","Praga de Insetos","Reencarnação","Restauração Maior","Transmutar Rocha"]
  },
  feiticeiro:{
    truques:["Borrifo Ácido","Luz","Luzes Dançantes","Mensagem","Proteção contra Lâminas","Raio de Fogo","Raio de Gelo","Toque Chocante","Criar Fogueira","Controlar Chamas","Moldar Terra","Moldar Água","Mordida Gélida","Rajada Trovejante"],
    1:["Absorver Elementos","Catapulta","Causar Medo","Disfarçar-se","Enfeitiçar Pessoa","Imagem Silenciosa","Névoa Obscurecente","Onda Trovejante","Orbe Cromática","Raio Adoecente","Raio do Caos","Recuo Acelerado","Salto","Vitalidade Falsa","Faca de Gelo","Tremor de Terra"],
    2:["Alterar-se","Aprimorar Habilidade","Arrombar","Cegueira/Surdez","Coroa da Loucura","Detectar Pensamentos","Escuridão","Levitação","Nublar","Passo Nebuloso","Patas de Aranha","Raio Ardente","Sugestão","Teia","Ver o Invisível","Lâmina Sombria","Espinho Mental","Sopro do Dragão","Passo Trovejante"],
    3:["Bola de Fogo","Clarividência","Contramágica","Dissipar Magia","Forma Gasosa","Idiomas","Imagem Maior","Lentidão","Medo","Nevasca","Padrão Hipnótico","Proteção contra Energia","Raio de Relâmpago","Respirar na Água","Voo","Onda de Maré","Vento Trovejante"],
    4:["Banimento","Confusão","Dominar Besta","Invisibilidade Maior","Muralha de Fogo","Pele de Pedra","Polimorfia","Porta Dimensional","Tempestade de Gelo","Esfera Aquosa","Esfera Tempestuosa"],
    5:["Animar Objetos","Cone de Frio","Criação","Dominar Pessoa","Névoa Mortal","Telecinese","Círculo de Teletransporte","Estática Sináptica","Distante Passo"]
  },
  mago:{
    truques:["Borrifo Ácido","Luzes Dançantes","Mensagem","Proteção contra Lâminas","Raio de Fogo","Raio de Gelo","Criar Fogueira","Controlar Chamas","Dobrar os Mortos","Infestação","Moldar Terra","Moldar Água","Pedra Mágica","Rajada Trovejante"],
    1:["Alarme","Absorver Elementos","Armadilha","Catapulta","Causar Medo","Faca de Gelo","Tremor de Terra","Onda Trovejante","Orbe Cromática","Queda Suave","Raio Adoecente","Recuo Acelerado","Riso Histérico de Tasha","Servo Invisível","Vitalidade Falsa"],
    2:["Alterar-se","Arrombar","Aumentar/Reduzir","Boca Encantada","Cegueira/Surdez","Coroa da Loucura","Detectar Pensamentos","Despedaçar","Escuridão","Esfera Flamejante","Força Fantasmagórica","Levitação","Localizar Objeto","Nublar","Patas de Aranha","Raio Ardente","Sugestão","Teia","Ver o Invisível","Lâmina Sombria","Espinho Mental","Prender à Terra","Sopro do Dragão","Passo Trovejante","Pirotecnia","Rajada de Pó","Vento Protetor"],
    3:["Animar Mortos","Clarividência","Contramágica","Dissipar Magia","Enviar Mensagem","Forma Gasosa","Glifo de Vigilância","Idiomas","Imagem Maior","Lentidão","Medo","Nevasca","Padrão Hipnótico","Pequena Cabana de Leomund","Proteção contra Energia","Raio de Relâmpago","Remover Maldição","Respirar na Água","Rogar Maldição","Toque Vampírico","Velocidade","Voo","Onda de Maré","Muralha de Areia","Muralha de Água","Vento Trovejante"],
    4:["Assassino Fantasmagórico","Banimento","Confusão","Controlar Água","Escudo de Fogo","Esfera Resiliente de Otiluke","Fabricar","Invisibilidade Maior","Localizar Criatura","Moldar Rochas","Muralha de Fogo","Olho Arcano","Pele de Pedra","Polimorfia","Porta Dimensional","Tempestade de Gelo","Terreno Alucinatório","Esfera Aquosa","Esfera Tempestuosa"],
    5:["Animar Objetos","Cone de Frio","Conjurar Elemental","Contato Extraplanar","Criação","Dominar Pessoa","Mão de Bigby","Muralha de Energia","Muralha de Pedra","Névoa Mortal","Similaridade","Sonho","Telecinese","Círculo de Teletransporte","Estática Sináptica","Transmutar Rocha","Distante Passo"]
  },
  bruxo:{
    truques:["Amizade","Proteção contra Lâminas","Criar Fogueira","Dobrar os Mortos","Infestação","Pedra Mágica","Rajada Trovejante"],
    1:["Armadura de Agathys","Braços de Hadar","Compreender Idiomas","Enfeitiçar Pessoa","Escrita Ilusória","Hex","Proteção contra o Bem e o Mal","Recuo Acelerado","Repreensão Infernal","Servo Invisível","Causar Medo"],
    2:["Coroa da Loucura","Despedaçar","Escuridão","Imobilizar Pessoa","Invisibilidade","Passo Nebuloso","Patas de Aranha","Raio do Enfraquecimento","Sugestão","Lâmina Sombria","Espinho Mental","Passo Trovejante"],
    3:["Contramágica","Dissipar Magia","Fome de Hadar","Forma Gasosa","Imagem Maior","Medo","Padrão Hipnótico","Remover Maldição","Toque Vampírico","Voo","Invocar Demônios Menores","Vento Trovejante"],
    4:["Banimento","Murchar","Porta Dimensional","Terreno Alucinatório","Raio Enlouquecedor","Invocar Demônio Maior"],
    5:["Contato Extraplanar","Imobilizar Monstro","Sonho","Vidência","Estática Sináptica","Distante Passo"]
  },
  paladino:{
    1:["Detectar Magia","Detectar o Bem e o Mal","Detectar Veneno e Doença","Destruição Lancinante","Destruição Trovejante","Proteção contra o Bem e o Mal","Purificar Alimentos","Cerimônia"],
    2:["Encontrar Montaria","Marca da Punição","Proteção contra Veneno","Zona da Verdade"],
    3:["Aura de Vitalidade","Círculo Mágico","Criar Alimentos","Destruição Cegante","Dissipar Magia","Luz do Dia","Remover Maldição","Revivificar"],
    4:["Aura de Pureza","Aura de Vida","Banimento","Localizar Criatura","Proteção contra a Morte","Destruição Estonteante"],
    5:["Círculo de Poder","Destruição Banidora","Dissipar o Bem e o Mal","Geas","Onda Destrutiva","Reviver os Mortos"]
  },
  patrulheiro:{
    1:["Alarme","Amizade Animal","Bom Fruto","Detectar Magia","Detectar Veneno e Doença","Marca do Caçador","Névoa Obscurecente","Passos Longos","Salto","Absorver Elementos","Ataque Zéfiro","Armadilha"],
    2:["Cordão de Flechas","Crescer Espinhos","Encontrar Armadilhas","Localizar Animais ou Plantas","Localizar Objeto","Mensageiro Animal","Sentido Bestial","Silêncio","Visão no Escuro","Espírito Curativo","Prender à Terra"],
    3:["Conjurar Animais","Conjurar Barragem","Falar com Plantas","Flecha Relampejante","Luz do Dia","Muralha de Vento","Proteção contra Energia","Respirar na Água","Flechas Flamejantes","Vento Trovejante"],
    4:["Conjurar Seres da Floresta","Localizar Criatura","Movimentação Livre","Pele de Pedra","Guardião da Natureza"],
    5:["Aljava Veloz","Comunhão com a Natureza","Conjurar Saraivada","Passo Arbóreo","Golpe do Vento Cortante"]
  }
};

const RULE_AUDITED_SUBCLASS_BONUS_SPELLS_STAGE12 = {
  'clerigo:forge': {1:["Identificar","Destruição Lancinante"],3:["Arma Mágica","Calor Metálico"],5:["Arma Elemental","Proteção contra Energia"],7:["Fabricar","Muralha de Fogo"],9:["Animar Objetos","Criação"]},
  'clerigo:grave': {1:["Perdição","Vitalidade Falsa"],3:["Repouso Gentil","Raio do Enfraquecimento"],5:["Revivificar","Toque Vampírico"],7:["Murchar","Proteção contra a Morte"],9:["Concha Antivida","Reviver os Mortos"]},
  'paladino:conquest': {3:["Armadura de Agathys","Comando"],5:["Imobilizar Pessoa","Arma Espiritual"],9:["Rogar Maldição","Medo"],13:["Dominar Besta","Pele de Pedra"],17:["Névoa Mortal","Dominar Pessoa"]},
  'paladino:redemption': {3:["Santuário","Sono"],5:["Acalmar Emoções","Imobilizar Pessoa"],9:["Contramágica","Padrão Hipnótico"],13:["Esfera Resiliente de Otiluke","Pele de Pedra"],17:["Imobilizar Monstro","Muralha de Força"]},
  'patrulheiro:gloom_stalker': {3:["Disfarçar-se"],5:["Truque de Corda"],9:["Medo"],13:["Invisibilidade Maior"],17:["Similaridade"]},
  'patrulheiro:horizon_walker': {3:["Proteção contra o Bem e o Mal"],5:["Passo Nebuloso"],9:["Velocidade"],13:["Banimento"],17:["Círculo de Teletransporte"]},
  'patrulheiro:monster_slayer': {3:["Proteção contra o Bem e o Mal"],5:["Zona da Verdade"],9:["Círculo Mágico"],13:["Banimento"],17:["Imobilizar Monstro"]},
  'bruxo:celestial': {1:["Curar Ferimentos","Raio Guiador"],3:["Esfera Flamejante","Restauração Menor"],5:["Luz do Dia","Revivificar"],7:["Guardião da Fé","Muralha de Fogo"],9:["Coluna de Chamas","Restauração Maior"]},
  'feiticeiro:shadow': {3:["Escuridão"]},
  'bruxo:hexblade': {1:["Escudo","Destruição Colérica"],3:["Nublar","Marca da Punição"],5:["Piscar","Arma Elemental"],7:["Assassino Fantasmagórico","Destruição Estonteante"],9:["Destruição Banidora","Cone de Frio"]}
};

ruleSpellNormalizeAllStage12(SPELL_LISTS);
ruleSpellRemoveStage12(SPELL_LISTS, RULE_SPELL_DENYLIST_STAGE12);
ruleSpellMergeStage12(SPELL_LISTS, RULE_SPELL_PATCH_STAGE12);
Object.keys(XANATHAR_SUBCLASS_BONUS_SPELLS).forEach(key=>delete XANATHAR_SUBCLASS_BONUS_SPELLS[key]);
Object.assign(XANATHAR_SUBCLASS_BONUS_SPELLS, RULE_AUDITED_SUBCLASS_BONUS_SPELLS_STAGE12);
function auditSpellListIntegrity(){ const errors=[]; const warnings=[]; ["bardo","bruxo","clerigo","druida","feiticeiro","mago","paladino","patrulheiro"].forEach(c=>{ if(!SPELL_LISTS[c]) errors.push(`Lista ausente: ${c}`); if(!Array.isArray(SPELL_LISTS[c]?.truques)) warnings.push(`Truques ausentes: ${c}`); }); ["paladino","patrulheiro"].forEach(c=>{ if((SPELL_LISTS[c]?.truques||[]).length) errors.push(`${c} não deveria ter truques de classe no PHB/Xanathar.`); }); return {errors,warnings}; }
const SPELL_LIST_AUDIT_SUMMARY = auditSpellListIntegrity();


const SPELL_DETAILS = Object.fromEntries(Object.entries(SPELL_LISTS).map(([classe,data])=>{
  const mapped={};
  Object.entries(data).forEach(([circulo,lista])=>{
    mapped[circulo]={};
    (lista||[]).forEach(nome=> mapped[circulo][nome] = {escola:"Variada", ritual:["Detectar Magia","Compreender Idiomas","Identificar","Falar com Animais"].includes(nome), concentracao:["Bênção","Hex","Invisibilidade","Marca do Caçador","Passo sem Pegadas","Escudo da Fé","Fogo das Fadas","Orientação"].includes(nome), duracao:"Conforme magia"});
  });
  return [classe,mapped];
}));

const PERSONALITY_SUGGESTIONS = {
  acolito:{tracos:["Cito ensinamentos sagrados no dia a dia.","Vejo sinais divinos em eventos comuns.","Escuto confissões sem julgar de imediato.","Minha fé me mantém calmo sob pressão."],ideais:["Tradição: os ritos antigos precisam ser preservados.","Caridade: devo aliviar o sofrimento alheio.","Aspiração: quero me tornar digno aos olhos do meu deus.","Ordem: uma comunidade fiel prospera com disciplina."],vinculos:["Meu templo ainda é meu verdadeiro lar.","Protegerei os fiéis que confiam em mim.","Carrego uma relíquia de enorme valor espiritual.","Preciso honrar o mentor que guiou minha devoção."],defeitos:["Julgo duramente quem desafia minha fé.","Sou crédulo diante de devoção aparente.","Tenho dificuldade em aceitar práticas diferentes das minhas.","O peso da culpa me torna manipulável."]},
  artesao_guilda:{tracos:["Sempre avalio a qualidade de um objeto à primeira vista.","Falo com orgulho do meu ofício.","Coleciono técnicas e segredos de fabricação.","Nada me irrita mais do que trabalho malfeito."],ideais:["Comunidade: guildas fortes sustentam cidades fortes.","Ganhos: talento merece pagamento justo.","Perfeição: toda obra pode ser refinada.","Legado: quero deixar uma criação memorável."],vinculos:["Minha guilda ainda espera grandes feitos de mim.","Devo minha carreira a um mestre artesão.","Guardo ferramentas herdadas da família.","Quero superar um rival famoso do mesmo ofício."],defeitos:["Sou competitivo a ponto de ser mesquinho.","Fico obcecado por detalhes irrelevantes.","Subestimo quem não domina um ofício.","Tenho dificuldade em recusar negócios lucrativos."]},
  artista:{tracos:["Transformo qualquer situação em performance.","Quero ser notado onde quer que eu vá.","Imito vozes e maneirismos por diversão.","Uso humor para quebrar tensão."],ideais:["Beleza: a arte revela verdades profundas.","Liberdade: expressão não deve ser acorrentada.","Fama: quero meu nome lembrado por gerações.","Alegria: meu talento deve levantar o espírito alheio."],vinculos:["Minha apresentação definitiva ainda está por vir.","Tenho devoção por um patrono ou público específico.","Carrego um instrumento ou figurino insubstituível.","Preciso provar meu valor a um antigo rival artístico."],defeitos:["Busco aplausos mesmo quando o momento é impróprio.","Meu ego fala alto demais.","Exagero histórias para parecer mais interessante.","Não lido bem com críticas ao meu trabalho."]},
  charlatao:{tracos:["Tenho uma mentira pronta para cada ocasião.","Leio rapidamente o que as pessoas querem ouvir.","Mudo de persona como quem troca de roupa.","Sorrio mesmo quando estou armando algo."],ideais:["Independência: ninguém deve me controlar.","Criatividade: o golpe perfeito é uma arte.","Ambição: mereço ascender custe o que custar.","Caos: regras existem para os tolos seguirem."],vinculos:["Alguém conhece minha verdadeira identidade.","Protejo a única pessoa que viu além da farsa.","Guardo registros comprometores de gente poderosa.","Tenho uma dívida antiga com quem me ensinou o ofício."],defeitos:["Minto mesmo quando não preciso.","Confio demais no meu próprio blefe.","A cobiça me faz correr riscos tolos.","Tenho dificuldade em criar vínculos sinceros."]},
  criminoso:{tracos:["Sempre observo saídas e rotas de fuga.","Falo pouco e presto atenção em tudo.","Prefiro agir nas sombras.","Avalio o valor de cada bolso e fechadura."],ideais:["Liberdade: ninguém manda em mim.","Sobrevivência: os espertos vivem mais.","Lealdade: o grupo vem antes do resto.","Ascensão: quero sair do submundo por cima."],vinculos:["Devo favores ao meu antigo contato.","Nunca abandonarei minha velha quadrilha.","Carrego a culpa por um trabalho que deu errado.","Um inocente pagou pelo meu crime, e isso me assombra."],defeitos:["Confio demais em soluções ilegais.","Ganância fala mais alto que prudência.","Tenho dificuldade em obedecer autoridades.","Guardo rancor por tempo demais."]},
  eremita:{tracos:["Prefiro silêncio a conversa vazia.","Penso antes de falar, e falo pouco.","Observo padrões onde outros veem caos.","A solidão me ensinou paciência."],ideais:["Autoconhecimento: toda resposta importante vem de dentro.","Natureza: a simplicidade purifica o espírito.","Disciplina: a mente deve dominar o desejo.","Verdade: minha descoberta precisa vir à luz."],vinculos:["Protegerei o local onde vivi isolado.","Carrego uma revelação perigosa.","Meu retiro tinha um propósito que ainda não terminou.","Preciso encontrar alguém capaz de entender minha descoberta."],defeitos:["Tenho dificuldade em lidar com multidões.","Posso parecer frio ou distante.","Subestimo problemas sociais por excesso de introspecção.","Às vezes guardo informação demais por paranoia."]},
  forasteiro:{tracos:["Prefiro a companhia da natureza.","Sou direto e objetivo.","Confio mais em rastros do que em palavras.","Minha atenção está sempre no ambiente ao redor."],ideais:["Mudança: a natureza recompensa adaptação.","Autossuficiência acima do conforto.","Proteção: terras selvagens precisam de guardiões.","Equilíbrio: civilização e natureza não devem se destruir."],vinculos:["Meu povo precisa de mim.","Conheço uma trilha que devo proteger.","Busco uma criatura ou território que marcou minha vida.","Carrego um troféu ligado à minha origem."],defeitos:["Desprezo costumes urbanos.","Tenho dificuldade em confiar em estranhos.","Posso ser brutalmente honesto.","Ajo antes de entender política e etiqueta."]},
  heroi_povo:{tracos:["Trato nobres e plebeus da mesma forma.","Sempre tento inspirar coragem nos outros.","Arregaço as mangas antes de pedir ajuda.","Nunca esqueço minhas raízes."],ideais:["Justiça: gente comum merece proteção.","Trabalho: esforço honesto constrói futuro.","Liberdade: ninguém deve viver oprimido.","Solidariedade: uma comunidade unida resiste a tudo."],vinculos:["Minha aldeia ainda conta comigo.","Um símbolo do meu passado me lembra quem eu sou.","Tenho dívida com quem me ajudou quando eu não era ninguém.","Quero derrubar quem explora os humildes."],defeitos:["Assumo riscos demais para provar meu valor.","Subestimo intrigas sofisticadas.","Posso ser teimoso quando acho que estou defendendo o certo.","Tenho dificuldade em recuar diante de uma injustiça."]},
  marinheiro:{tracos:["Falo como quem viveu tempestades demais.","Confio em cordas, nós e rotinas bem feitas.","Durmo melhor com o som do vento.","Lido bem com trabalho duro e humor rude."],ideais:["Liberdade: o horizonte não pertence a ninguém.","Camaradagem: tripulação é família.","Resiliência: sobreviver à tormenta é o que importa.","Reputação: meu nome deve inspirar respeito nos portos."],vinculos:["Meu antigo navio ainda tem um lugar no meu coração.","Salvei alguém no mar e nunca esqueci.","Tenho contas a acertar com um capitão rival.","Carrego um amuleto ligado a um naufrágio."],defeitos:["Bebo para esquecer o que vi no mar.","Provoco brigas com facilidade.","Tenho dificuldade em ficar muito tempo em terra.","A superstição afeta minhas decisões."]},
  nobre:{tracos:["Mantenho etiqueta mesmo sob pressão.","Estou acostumado a comandar.","Sei reconhecer brasões, costumes e hierarquias.","Minha postura denuncia criação privilegiada."],ideais:["Responsabilidade: poder exige dever.","Prestígio: meu nome precisa ser honrado.","Nobreza: devo dar exemplo aos demais.","Ambição: minha casa merece ainda mais influência."],vinculos:["Minha casa espera resultados de mim.","Defenderei a reputação da família.","Um casamento, tratado ou promessa molda meu destino.","Guardo carinho genuíno por um servo ou tutor antigo."],defeitos:["Arrogância me faz subestimar outros.","Tenho dificuldade em aceitar críticas.","Posso confundir privilégio com mérito.","Às vezes uso status em vez de diálogo."]},
  orfao:{tracos:["Noto portas destrancadas e bolsos fáceis sem pensar.","Escondo emoção por trás de sarcasmo.","Confio em mim antes de confiar nos outros.","Sempre sei onde conseguir comida e abrigo baratos."],ideais:["Sobrevivência: não devo nada a quem me abandonou.","Pertencimento: quero construir uma família verdadeira.","Independência: nunca mais serei impotente.","Proteção: crianças de rua merecem alguém por elas."],vinculos:["As ruas me ensinaram tudo que sei.","Devo minha vida a outro órfão.","Guardo um objeto da minha infância.","Nunca esquecerei quem destruiu meu antigo lar."],defeitos:["Roubo mesmo quando não preciso.","Tenho dificuldade em pedir ajuda.","Presumo o pior das pessoas.","Fugir parece mais seguro do que confiar."]},
  sabio:{tracos:["Faço perguntas sobre tudo.","Registro detalhes em notas constantes.","Fico absorto em teorias e referências.","Corrijo imprecisões por hábito."],ideais:["Conhecimento acima de ignorância.","Verdade deve ser descoberta.","Lógica: respostas corretas importam mais que conforto.","Legado: quero deixar uma obra duradoura."],vinculos:["Procuro uma resposta que mudará minha vida.","Minha biblioteca é meu tesouro.","Um professor desaparecido ainda guia minhas escolhas.","Preciso proteger um texto, mapa ou segredo raro."],defeitos:["Esqueço o mundo real em favor da teoria.","Posso ser imprudente por curiosidade.","Tenho pouca paciência com ignorância voluntária.","Subestimo perigos físicos quando uma descoberta me chama."]},
  soldado:{tracos:["Avalio riscos de forma tática.","Respeito hierarquia e disciplina.","Mantenho equipamento e rotina em ordem.","A pressão me torna mais focado."],ideais:["Dever acima do conforto.","Companheirismo mantém todos vivos.","Glória: quero ser lembrado por meus feitos.","Proteção: os fracos precisam de defensores preparados."],vinculos:["Jamais esquecerei quem lutou ao meu lado.","Minha unidade ainda precisa de mim.","Uma bandeira, medalha ou juramento define minha honra.","Busco justiça por uma derrota ou traição passada."],defeitos:["Reajo com agressividade sob provocação.","Obedeço ordens tarde demais para questionar.","Tenho dificuldade em abandonar uma missão.","Desprezo quem parece indisciplinado."]}
};

const CLASS_FEATURES = {
  barbaro:[
    {level:1,nome:"Fúria",resumo:"Entra em fúria para ganhar dano extra corpo a corpo, vantagem em testes de Força e resistência a dano físico comum."},
    {level:1,nome:"Defesa sem Armadura",resumo:"Sua CA pode usar Constituição quando estiver sem armadura."},
    {level:2,nome:"Ataque Descuidado",resumo:"Pode atacar com vantagem usando Força, mas ataques contra você também ganham vantagem até seu próximo turno."},
    {level:2,nome:"Sentido de Perigo",resumo:"Vantagem contra efeitos visíveis que exijam testes de Destreza."},
    {level:3,nome:"Caminho Primitivo",resumo:"Escolhe uma trilha de bárbaro."},
    {level:5,nome:"Ataque Extra",resumo:"Pode atacar duas vezes com a ação de Ataque."},
    {level:5,nome:"Movimento Rápido",resumo:"Seu deslocamento aumenta enquanto não usa armadura pesada."}
  ],
  bardo:[
    {level:1,nome:"Inspiração de Bardo",resumo:"Concede um dado de inspiração a aliados para melhorar testes, ataques ou salvaguardas."},
    {level:1,nome:"Conjuração",resumo:"Usa Carisma para lançar magias de bardo."},
    {level:2,nome:"Jack of All Trades",resumo:"Recebe metade do bônus de proficiência em testes sem proficiência."},
    {level:2,nome:"Canção de Descanso",resumo:"Aliados recuperam PV extras em descanso curto."},
    {level:3,nome:"Especialização",resumo:"Dobra o bônus de proficiência em perícias escolhidas."},
    {level:3,nome:"Colégio de Bardo",resumo:"Escolhe seu colégio."},
    {level:5,nome:"Fonte de Inspiração",resumo:"Recupera Inspiração de Bardo em descanso curto."}
  ],
  bruxo:[
    {level:1,nome:"Outro Patrono",resumo:"Seu patrono define parte importante dos poderes do bruxo."},
    {level:1,nome:"Magia de Pacto",resumo:"Usa espaços de pacto e Carisma para conjurar."},
    {level:2,nome:"Invocações Místicas",resumo:"Escolhe aprimoramentos arcanos permanentes."},
    {level:3,nome:"Benção do Pacto",resumo:"Escolhe Tomo, Corrente ou Lâmina."},
    {level:5,nome:"Mais Invocações",resumo:"Amplia o conjunto de invocações disponíveis."}
  ],
  clerigo:[
    {level:1,nome:"Conjuração",resumo:"Usa Sabedoria para lançar magias divinas de clérigo."},
    {level:1,nome:"Domínio Divino",resumo:"Escolhe um domínio que concede magias e recursos específicos."},
    {level:2,nome:"Canalizar Divindade",resumo:"Canaliza poder divino para efeitos do domínio."},
    {level:2,nome:"Expulsar Mortos-Vivos",resumo:"Afasta mortos-vivos com seu símbolo sagrado."},
    {level:5,nome:"Destruir Mortos-Vivos",resumo:"Mortos-vivos fracos podem ser destruídos ao serem expulsos."}
  ],
  druida:[
    {level:1,nome:"Druidismo",resumo:"Conhece a linguagem secreta druídica."},
    {level:1,nome:"Conjuração",resumo:"Usa Sabedoria para lançar magias de druida."},
    {level:2,nome:"Forma Selvagem",resumo:"Transforma-se em besta apropriada ao nível."},
    {level:2,nome:"Círculo Druídico",resumo:"Escolhe seu círculo."},
    {level:5,nome:"Aprimoramento de Conjuração",resumo:"Mais recursos e magias preparados com o avanço de nível."}
  ],
  feiticeiro:[
    {level:1,nome:"Conjuração",resumo:"Usa Carisma para lançar magias de feiticeiro."},
    {level:1,nome:"Origem Feiticeira",resumo:"Sua linhagem mágica define poderes iniciais."},
    {level:2,nome:"Fonte de Magia",resumo:"Ganha pontos de feitiçaria para converter recursos."},
    {level:3,nome:"Metamagia",resumo:"Pode alterar a forma como conjura certas magias."},
    {level:5,nome:"Mais Pontos de Feitiçaria",resumo:"Seu reservatório arcano cresce com o nível."}
  ],
  guerreiro:[
    {level:1,nome:"Estilo de Luta",resumo:"Escolhe um estilo marcial permanente."},
    {level:1,nome:"Segundo Fôlego",resumo:"Recupera PV com um impulso de resistência."},
    {level:2,nome:"Surto de Ação",resumo:"Recupera fôlego para agir além do normal em combate."},
    {level:3,nome:"Arquétipo Marcial",resumo:"Escolhe sua subclasse de guerreiro."},
    {level:5,nome:"Ataque Extra",resumo:"Pode atacar duas vezes com a ação de Ataque."}
  ],
  ladino:[
    {level:1,nome:"Especialização",resumo:"Dobra proficiência em perícias ou ferramentas escolhidas."},
    {level:1,nome:"Ataque Furtivo",resumo:"Causa dano extra quando acerta sob condições favoráveis."},
    {level:1,nome:"Gíria dos Ladrões",resumo:"Conhece o idioma secreto do submundo."},
    {level:2,nome:"Ação Ardilosa",resumo:"Desengaja, Dispara ou Esconde-se como ação bônus."},
    {level:3,nome:"Arquétipo Ladino",resumo:"Escolhe sua especialização."}
  ],
  mago:[
    {level:1,nome:"Conjuração",resumo:"Usa Inteligência para lançar magias de mago."},
    {level:1,nome:"Recuperação Arcana",resumo:"Recupera parte dos espaços de magia após descanso curto."},
    {level:2,nome:"Tradição Arcana",resumo:"Escolhe sua escola ou tradição."},
    {level:5,nome:"Magias mais poderosas",resumo:"Seu grimório e espaços avançam com o nível."}
  ],
  monge:[
    {level:1,nome:"Defesa sem Armadura",resumo:"Sua CA usa Sabedoria quando não está de armadura."},
    {level:1,nome:"Artes Marciais",resumo:"Melhora ataques desarmados e certas armas de monge."},
    {level:2,nome:"Ki",resumo:"Ganha pontos de ki para rajada de golpes, defesa paciente e passo do vento."},
    {level:2,nome:"Movimento sem Armadura",resumo:"Seu deslocamento aumenta sem armadura nem escudo."},
    {level:3,nome:"Tradição Monástica",resumo:"Escolhe sua tradição."},
    {level:5,nome:"Ataque Extra",resumo:"Pode atacar duas vezes com a ação de Ataque."},
    {level:5,nome:"Golpe Atordoante",resumo:"Pode tentar atordoar ao acertar um ataque corpo a corpo."}
  ],
  paladino:[
    {level:1,nome:"Sentido Divino",resumo:"Percebe presenças celestiais, infernais e profanas."},
    {level:1,nome:"Mãos Curativas",resumo:"Possui um reservatório de cura."},
    {level:2,nome:"Estilo de Luta",resumo:"Escolhe um estilo marcial."},
    {level:2,nome:"Conjuração",resumo:"Usa Carisma para lançar magias de paladino."},
    {level:2,nome:"Golpe Divino",resumo:"Gasta espaços para causar dano radiante ao acertar."},
    {level:3,nome:"Juramento Sagrado",resumo:"Escolhe seu juramento."},
    {level:5,nome:"Ataque Extra",resumo:"Pode atacar duas vezes com a ação de Ataque."}
  ],
  patrulheiro:[
    {level:1,nome:"Inimigo Favorito",resumo:"Escolhe alvos estudados e ganha vantagens narrativas e de rastreamento."},
    {level:1,nome:"Explorador Nato",resumo:"Seu terreno favorito melhora exploração."},
    {level:2,nome:"Estilo de Luta",resumo:"Escolhe um estilo marcial."},
    {level:2,nome:"Conjuração",resumo:"Usa Sabedoria para lançar magias de patrulheiro."},
    {level:3,nome:"Arquétipo de Patrulheiro",resumo:"Escolhe sua subclasse."},
    {level:5,nome:"Ataque Extra",resumo:"Pode atacar duas vezes com a ação de Ataque."}
  ]
};

const EXTRA_ATTACK_BY_CLASS = {
  barbaro:[{level:5,attacks:2}],
  guerreiro:[{level:5,attacks:2},{level:11,attacks:3},{level:20,attacks:4}],
  monge:[{level:5,attacks:2}],
  paladino:[{level:5,attacks:2}],
  patrulheiro:[{level:5,attacks:2}]
};

const CLASS_PROGRESSION_DETAILS = {
  barbaro:[
    {level:3,nome:'Fúrias por descanso',resumo:'O total de usos de Fúria cresce conforme o nível.'},
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Pode aumentar atributos ou escolher talento, conforme a mesa permitir.'},
    {level:7,nome:'Instinto Feral',resumo:'Vantagem em iniciativa e ação antecipada em combate.'},
    {level:9,nome:'Crítico Brutal',resumo:'Dados extras em acertos críticos com ataques corpo a corpo.'},
    {level:11,nome:'Fúria Implacável',resumo:'Chance de permanecer de pé quando deveria cair a 0 PV.'},
    {level:15,nome:'Fúria Persistente',resumo:'Sua fúria se mantém mais facilmente durante a luta.'},
    {level:18,nome:'Força Indomável',resumo:'Seu total mínimo em testes de Força cresce bastante.'},
    {level:20,nome:'Campeão Primitivo',resumo:'Força e Constituição aumentam além do limite comum.'}
  ],
  bardo:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:5,nome:'Dado de Inspiração d8',resumo:'Seu dado de Inspiração de Bardo aumenta.'},
    {level:6,nome:'Contracanto',resumo:'Oferece defesa musical contra medo e encantamento.'},
    {level:10,nome:'Especialização adicional',resumo:'Mais perícias podem receber o dobro da proficiência.'},
    {level:10,nome:'Segredos Mágicos',resumo:'Aprende magias de outras listas.'},
    {level:20,nome:'Inspiração Superior',resumo:'Recupera inspiração ao ficar sem usos.'}
  ],
  bruxo:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:5,nome:'Magias de pacto de 3º círculo',resumo:'Seus espaços de pacto ficam mais poderosos.'},
    {level:11,nome:'Arcanum Místico (6º)',resumo:'Ganha uma magia de alto círculo de uso especial.'},
    {level:13,nome:'Arcanum Místico (7º)',resumo:'Amplia o acesso a arcanos superiores.'},
    {level:15,nome:'Arcanum Místico (8º)',resumo:'Nova magia de grande poder.'},
    {level:17,nome:'Arcanum Místico (9º)',resumo:'Atinge o topo da magia de patrono.'},
    {level:20,nome:'Mestre Eldritch',resumo:'Recupera espaços de pacto com extrema eficiência.'}
  ],
  clerigo:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:6,nome:'Canalizar Divindade adicional',resumo:'Mais usos do poder divino entre descansos.'},
    {level:8,nome:'Poder divino ampliado',resumo:'Seu domínio reforça ataques ou magia divina.'},
    {level:10,nome:'Intervenção Divina',resumo:'Pode pedir ajuda direta à sua divindade.'},
    {level:17,nome:'Traço supremo de domínio',resumo:'O domínio concede seu recurso mais poderoso.'},
    {level:20,nome:'Intervenção Divina automática',resumo:'Sua divindade atende o chamado com mais certeza.'}
  ],
  druida:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:8,nome:'Forma Selvagem aprimorada',resumo:'Melhora deslocamento e opções de transformação.'},
    {level:10,nome:'Traço do círculo',resumo:'O círculo druídico libera recursos avançados.'},
    {level:18,nome:'Corpo Atemporal',resumo:'Você envelhece muito lentamente.'},
    {level:18,nome:'Conjuração Bestial',resumo:'Pode conjurar em Forma Selvagem.'},
    {level:20,nome:'Arquidruida',resumo:'Uso praticamente ilimitado de Forma Selvagem.'}
  ],
  feiticeiro:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:5,nome:'Pontos de Feitiçaria ampliados',resumo:'O reservatório de energia cresce com o nível.'},
    {level:10,nome:'Metamagia adicional',resumo:'Aprende mais uma forma de alterar magias.'},
    {level:18,nome:'Traço máximo da origem',resumo:'Sua linhagem revela o auge do poder.'},
    {level:20,nome:'Restauração Feiticeira',resumo:'Recupera pontos de feitiçaria ao descansar.'}
  ],
  guerreiro:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:5,nome:'Ataques por ação: 2',resumo:'Você pode fazer dois ataques com a ação de Ataque.'},
    {level:9,nome:'Indomável',resumo:'Pode repetir um teste de resistência falho.'},
    {level:11,nome:'Ataques por ação: 3',resumo:'O guerreiro atinge três ataques por ação de Ataque.'},
    {level:20,nome:'Ataques por ação: 4',resumo:'O auge marcial do guerreiro concede quatro ataques por ação.'}
  ],
  ladino:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:5,nome:'Esquiva Sobrenatural',resumo:'Reduz dano de um ataque que acerte você.'},
    {level:7,nome:'Evasão',resumo:'Evita parte ou todo dano de efeitos em área.'},
    {level:11,nome:'Talento Confiável',resumo:'Seus testes treinados ficam muito consistentes.'},
    {level:14,nome:'Sentido Cego',resumo:'Percebe inimigos ocultos próximos.'},
    {level:20,nome:'Golpe de Sorte',resumo:'Transforma uma falha crítica em sucesso decisivo.'}
  ],
  mago:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:6,nome:'Traço da tradição',resumo:'Sua escola arcana concede novo benefício.'},
    {level:10,nome:'Traço avançado da tradição',resumo:'A tradição aprofunda seu estilo de magia.'},
    {level:18,nome:'Maestria em Magia',resumo:'Conjura certas magias menores com eficiência superior.'},
    {level:20,nome:'Magias Assinatura',resumo:'Define magias que sempre tem prontas.'}
  ],
  monge:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:5,nome:'Ataques por ação: 2',resumo:'Dois ataques por ação de Ataque.'},
    {level:7,nome:'Evasão',resumo:'Reduz ou evita dano em efeitos que pedem Destreza.'},
    {level:10,nome:'Pureza Corporal',resumo:'Imunidade a doença e veneno.'},
    {level:14,nome:'Alma de Diamante',resumo:'Proficiência em todos os testes de resistência.'},
    {level:20,nome:'Eu Perfeito',resumo:'Recupera ki ao iniciar combate sem recursos.'}
  ],
  paladino:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:5,nome:'Ataques por ação: 2',resumo:'Dois ataques por ação de Ataque.'},
    {level:6,nome:'Aura de Proteção',resumo:'Aliados próximos recebem bônus nos testes de resistência.'},
    {level:10,nome:'Aura de Coragem',resumo:'Aliados próximos resistem ao medo.'},
    {level:14,nome:'Toque Purificador',resumo:'Pode encerrar magias hostis com o toque.'},
    {level:20,nome:'Traço supremo do juramento',resumo:'Seu juramento alcança a forma mais poderosa.'}
  ],
  patrulheiro:[
    {level:4,nome:'Aumento de Valor de Habilidade',resumo:'Aprimora atributos ou talento.'},
    {level:5,nome:'Ataques por ação: 2',resumo:'Dois ataques por ação de Ataque.'},
    {level:8,nome:'Passo pela Terra',resumo:'Move-se melhor em terrenos difíceis naturais.'},
    {level:10,nome:'Esconder-se à vista plena',resumo:'Mistura-se ao ambiente com eficiência.'},
    {level:14,nome:'Desaparecer',resumo:'Oculta-se rapidamente e evita rastreamento.'},
    {level:20,nome:'Matador de Inimigos',resumo:'Amplia o dano contra presas escolhidas.'}
  ]
};

Object.entries(CLASS_PROGRESSION_DETAILS).forEach(([classe, extras]) => {
  CLASS_FEATURES[classe] = [...(CLASS_FEATURES[classe] || []), ...extras]
    .sort((a,b)=>a.level-b.level || a.nome.localeCompare(b.nome, 'pt-BR'));
});

function getAttacksPerAction(classe, nivel){
  const track = EXTRA_ATTACK_BY_CLASS[classe] || [];
  return track.reduce((acc, entry)=> nivel >= entry.level ? entry.attacks : acc, 1);
}


const EQUIPMENT_LOADOUTS = {
  barbaro:[
    {id:"barb1",label:"Arma principal",choices:[{label:"Machado grande",items:[{type:"weapon",key:"machado_grande",qty:1}]},{label:"Espada longa",items:[{type:"weapon",key:"espada_longa",qty:1}]},{label:"Bordão",items:[{type:"weapon",key:"bordao",qty:1}]}]},
    {id:"barb2",label:"Arma secundária",choices:[{label:"2 machadinhas",items:[{type:"item",key:"machadinha",qty:2}]},{label:"Azagaia",items:[{type:"weapon",key:"azagaia",qty:1}]}]},
    {id:"barb3",label:"Kit",choices:[{label:"Pacote de aventureiro",items:[{type:"item",key:"pacote_aventureiro",qty:1},{type:"item",key:"mochila",qty:1},{type:"item",key:"corda",qty:1},{type:"item",key:"racao",qty:5},{type:"item",key:"tocha",qty:10}]}]},
    {id:"barb4",label:"Arremesso",choices:[{label:"4 azagaias",items:[{type:"weapon",key:"azagaia",qty:4}]}]}
  ],
  bardo:[
    {id:"brd1",label:"Arma inicial",choices:[{label:"Rapieira",items:[{type:"weapon",key:"rapieira",qty:1}]},{label:"Espada longa",items:[{type:"weapon",key:"espada_longa",qty:1}]},{label:"Adaga",items:[{type:"weapon",key:"adaga",qty:1}]}]},
    {id:"brd2",label:"Ferramenta artística",choices:[{label:"Instrumento musical",items:[{type:"item",key:"instrumento_musical",qty:1}]}]},
    {id:"brd3",label:"Armadura",choices:[{label:"Armadura de couro",items:[{type:"armor",key:"couro",qty:1}]}]}
  ],
  bruxo:[
    {id:"wrk1",label:"Arma",choices:[{label:"Besta leve",items:[{type:"weapon",key:"besta_leve",qty:1}]},{label:"Adaga",items:[{type:"weapon",key:"adaga",qty:1}]}]},
    {id:"wrk2",label:"Conjuração",choices:[{label:"Bolsa de componentes",items:[{type:"item",key:"bolsa_componentes",qty:1}]},{label:"Foco arcano",items:[{type:"item",key:"foco_arcano",qty:1}]}]},
    {id:"wrk3",label:"Armadura",choices:[{label:"Armadura de couro",items:[{type:"armor",key:"couro",qty:1}]}]},
    {id:"wrk4",label:"Reserva",choices:[{label:"2 adagas",items:[{type:"weapon",key:"adaga",qty:2}]}]}
  ],
  clerigo:[
    {id:"clr1",label:"Arma",choices:[{label:"Maça",items:[{type:"weapon",key:"maca",qty:1}]},{label:"Martelo de guerra (espada longa representando arma marcial)",items:[{type:"weapon",key:"espada_longa",qty:1}]}]},
    {id:"clr2",label:"Armadura",choices:[{label:"Cota de escamas",items:[{type:"armor",key:"cota_escamas",qty:1}]},{label:"Armadura de couro",items:[{type:"armor",key:"couro",qty:1}]},{label:"Cota de malha",items:[{type:"armor",key:"cota_malha",qty:1}]}]},
    {id:"clr3",label:"Defesa",choices:[{label:"Escudo",items:[{type:"shield",qty:1}]}]},
    {id:"clr4",label:"Foco divino",choices:[{label:"Símbolo sagrado",items:[{type:"item",key:"simbolo_sagrado",qty:1}]}]}
  ],
  druida:[
    {id:"drd1",label:"Defesa",choices:[{label:"Escudo de madeira",items:[{type:"shield",qty:1},{type:"item",key:"escudo_madeira",qty:1}]},{label:"Bordão",items:[{type:"weapon",key:"bordao",qty:1}]}]},
    {id:"drd2",label:"Arma",choices:[{label:"Adaga (representa cimitarra simples na base atual)",items:[{type:"weapon",key:"adaga",qty:1}]},{label:"Bordão",items:[{type:"weapon",key:"bordao",qty:1}]}]},
    {id:"drd3",label:"Armadura",choices:[{label:"Armadura de couro",items:[{type:"armor",key:"couro",qty:1}]}]},
    {id:"drd4",label:"Ferramenta",choices:[{label:"Kit de herbalismo",items:[{type:"item",key:"kit_herbalismo",qty:1}]}]}
  ],
  feiticeiro:[
    {id:"src1",label:"Arma",choices:[{label:"Besta leve",items:[{type:"weapon",key:"besta_leve",qty:1}]},{label:"Adaga",items:[{type:"weapon",key:"adaga",qty:1}]}]},
    {id:"src2",label:"Reserva",choices:[{label:"2 adagas",items:[{type:"weapon",key:"adaga",qty:2}]}]}
  ],
  guerreiro:[
    {id:"ftr1",label:"Armadura",choices:[{label:"Cota de malha",items:[{type:"armor",key:"cota_malha",qty:1}]},{label:"Armadura de couro",items:[{type:"armor",key:"couro",qty:1}]}]},
    {id:"ftr2",label:"Armas",choices:[{label:"Espada longa e escudo",items:[{type:"weapon",key:"espada_longa",qty:1},{type:"shield",qty:1}]},{label:"Duas espadas longas",items:[{type:"weapon",key:"espada_longa",qty:2}]}]},
    {id:"ftr3",label:"Reserva",choices:[{label:"Besta leve",items:[{type:"weapon",key:"besta_leve",qty:1}]},{label:"2 machadinhas",items:[{type:"item",key:"machadinha",qty:2}]}]}
  ],
  ladino:[
    {id:"rog1",label:"Arma principal",choices:[{label:"Rapieira",items:[{type:"weapon",key:"rapieira",qty:1}]},{label:"Espada curta",items:[{type:"weapon",key:"espada_curta",qty:1}]}]},
    {id:"rog2",label:"Arma secundária",choices:[{label:"Arco curto",items:[{type:"weapon",key:"arco_curto",qty:1}]},{label:"Espada curta",items:[{type:"weapon",key:"espada_curta",qty:1}]}]},
    {id:"rog3",label:"Armadura",choices:[{label:"Armadura de couro",items:[{type:"armor",key:"couro",qty:1}]}]},
    {id:"rog4",label:"Reserva",choices:[{label:"2 adagas",items:[{type:"weapon",key:"adaga",qty:2}]},{label:"Ferramentas de ladrão",items:[{type:"item",key:"ferramentas_ladrao",qty:1}]}]}
  ],
  mago:[
    {id:"wiz1",label:"Arma",choices:[{label:"Bordão",items:[{type:"weapon",key:"bordao",qty:1}]},{label:"Adaga",items:[{type:"weapon",key:"adaga",qty:1}]}]},
    {id:"wiz2",label:"Estudo",choices:[{label:"Grimório",items:[{type:"item",key:"grimorio",qty:1}]}]}
  ],
  monge:[
    {id:"mnk1",label:"Arma",choices:[{label:"Espada curta",items:[{type:"weapon",key:"espada_curta",qty:1}]},{label:"Bordão",items:[{type:"weapon",key:"bordao",qty:1}]}]},
    {id:"mnk2",label:"Arremesso",choices:[{label:"10 dardos",items:[{type:"item",key:"dardo",qty:10}]}]}
  ],
  paladino:[
    {id:"pal1",label:"Armas",choices:[{label:"Espada longa e escudo",items:[{type:"weapon",key:"espada_longa",qty:1},{type:"shield",qty:1}]},{label:"Duas espadas longas",items:[{type:"weapon",key:"espada_longa",qty:2}]}]},
    {id:"pal2",label:"Arma extra",choices:[{label:"5 azagaias",items:[{type:"weapon",key:"azagaia",qty:5}]},{label:"Maça",items:[{type:"weapon",key:"maca",qty:1}]}]},
    {id:"pal3",label:"Armadura",choices:[{label:"Cota de malha",items:[{type:"armor",key:"cota_malha",qty:1}]}]},
    {id:"pal4",label:"Foco",choices:[{label:"Símbolo sagrado",items:[{type:"item",key:"simbolo_sagrado",qty:1}]}]}
  ],
  patrulheiro:[
    {id:"rng1",label:"Armadura",choices:[{label:"Cota de escamas",items:[{type:"armor",key:"cota_escamas",qty:1}]},{label:"Armadura de couro",items:[{type:"armor",key:"couro",qty:1}]}]},
    {id:"rng2",label:"Armas",choices:[{label:"Duas espadas curtas",items:[{type:"weapon",key:"espada_curta",qty:2}]},{label:"Bordão e adaga",items:[{type:"weapon",key:"bordao",qty:1},{type:"weapon",key:"adaga",qty:1}]}]},
    {id:"rng3",label:"Distância",choices:[{label:"Arco longo e flechas",items:[{type:"weapon",key:"arco_longo",qty:1},{type:"item",key:"flechas20",qty:1}]}]}
  ]
};


const SUBCLASS_UNLOCK_LEVEL = {
  barbaro:3,bardo:3,bruxo:1,clerigo:1,druida:2,feiticeiro:1,guerreiro:3,ladino:3,mago:2,monge:3,paladino:3,patrulheiro:3
};
const SUBCLASS_OPTIONS = {
  barbaro:[
    {key:'berserker',nome:'Caminho do Berserker',resumo:'Fúria agressiva e frenesi.',features:[{level:3,nome:'Frenesi',resumo:'Pode fazer um ataque corpo a corpo extra como ação bônus enquanto estiver em fúria.'},{level:6,nome:'Fúria Mental',resumo:'Imune a enfeitiçado e amedrontado durante a fúria.'}]},
    {key:'totem_urso',nome:'Caminho do Totem (Urso)',resumo:'Resistência ampliada e ligação espiritual.',features:[{level:3,nome:'Espírito Totêmico: Urso',resumo:'Ganha resistência a quase todo dano durante a fúria.'},{level:6,nome:'Aspecto da Besta',resumo:'Utilidade e força ligadas ao totem escolhido.'}]}
  ],
  bardo:[
    {key:'lore',nome:'Colégio do Conhecimento',resumo:'Versatilidade, perícias e segredos mágicos.',features:[{level:3,nome:'Proficiências Adicionais',resumo:'Ganha perícias extras do colégio.'},{level:3,nome:'Palavras Cortantes',resumo:'Usa a inspiração para enfraquecer inimigos.'}]},
    {key:'valor',nome:'Colégio do Valor',resumo:'Bardo marcial que apoia na linha de frente.',features:[{level:3,nome:'Proficiência Marcial',resumo:'Ganha armaduras médias, escudos e armas marciais.'},{level:3,nome:'Inspiração de Combate',resumo:'A inspiração pode reforçar dano e defesa.'}]}
  ],
  bruxo:[
    {key:'imundo',nome:'O Corruptor',resumo:'Poder destrutivo e resistência infernal.',features:[{level:1,nome:'Bênção do Imundo',resumo:'Recebe vigor temporário ao derrubar inimigos.'},{level:6,nome:'Sorte do Próprio Imundo',resumo:'Pode alterar um teste crucial a seu favor.'}]},
    {key:'arquifada',nome:'Arquifada',resumo:'Controle, charme e mobilidade feérica.',features:[{level:1,nome:'Presença Feérica',resumo:'Pode encantar ou assustar criaturas próximas.'},{level:6,nome:'Fuga Nebulosa',resumo:'Fica invisível e se teleporta após sofrer dano.'}]}
  ],
  clerigo:[
    {key:'vida',nome:'Domínio da Vida',resumo:'Cura superior e proteção sagrada.',features:[{level:1,nome:'Discípulo da Vida',resumo:'Suas curas restauram pontos adicionais.'},{level:2,nome:'Preservar a Vida',resumo:'Canalizar Divindade para restaurar PV a vários aliados.'}]},
    {key:'guerra',nome:'Domínio da Guerra',resumo:'Pressão ofensiva e liderança em batalha.',features:[{level:1,nome:'Sacerdote de Guerra',resumo:'Ataques extras limitados por dia.'},{level:2,nome:'Golpe Guiado',resumo:'Canalizar Divindade para melhorar um ataque.'}]}
  ],
  druida:[
    {key:'lua',nome:'Círculo da Lua',resumo:'Forma selvagem voltada ao combate.',features:[{level:2,nome:'Forma Selvagem de Combate',resumo:'Transformações mais fortes e rápidas.'},{level:6,nome:'Ataques Bestiais Mágicos',resumo:'Seus ataques em forma selvagem contam como mágicos.'}]},
    {key:'terra',nome:'Círculo da Terra',resumo:'Magia focada no terreno e recuperação arcana.',features:[{level:2,nome:'Recuperação Natural',resumo:'Recupera espaços de magia durante descanso curto.'},{level:3,nome:'Círculo da Terra',resumo:'Recebe magias adicionais do terreno escolhido.'}]}
  ],
  feiticeiro:[
    {key:'draconica',nome:'Linhagem Dracônica',resumo:'Resistência e poder elemental.',features:[{level:1,nome:'Resiliência Dracônica',resumo:'PV e defesa ampliados pela linhagem.'},{level:6,nome:'Afinidade Elemental',resumo:'Magias do elemento da linhagem ficam mais fortes.'}]},
    {key:'selvagem',nome:'Magia Selvagem',resumo:'Efeitos imprevisíveis e vantagem caótica.',features:[{level:1,nome:'Maré do Caos',resumo:'Ganha vantagem pontual com potencial para surtos mágicos.'},{level:6,nome:'Dobrar a Sorte',resumo:'Altera testes de criaturas próximas com pontos de feitiçaria.'}]}
  ],
  guerreiro:[
    {key:'campeao',nome:'Campeão',resumo:'Crita melhor e foca no básico marcial.',features:[{level:3,nome:'Crítico Aprimorado',resumo:'Acerta crítico com 19–20.'},{level:7,nome:'Atleta Extraordinário',resumo:'Melhora capacidades físicas gerais.'}]},
    {key:'mestre_batalha',nome:'Mestre de Batalha',resumo:'Manobras táticas e superioridade em combate.',features:[{level:3,nome:'Superioridade em Combate',resumo:'Recebe dados de superioridade e manobras.'},{level:3,nome:'Aluno da Guerra',resumo:'Ganha proficiência com ferramentas de artesão.'}]}
  ],
  ladino:[
    {key:'ladrao',nome:'Ladrão',resumo:'Agilidade, furtividade e uso de objetos.',features:[{level:3,nome:'Mãos Rápidas',resumo:'Usa ação bônus para tarefas típicas de ladrão.'},{level:3,nome:'Trabalho de Segundo Andar',resumo:'Melhora escalada e salto.'}]},
    {key:'assassino',nome:'Assassino',resumo:'Ataques fulminantes contra alvos desprevenidos.',features:[{level:3,nome:'Assassinar',resumo:'Vantagem contra alvos que ainda não agiram e críticos contra surpreendidos.'},{level:9,nome:'Especialista em Infiltração',resumo:'Cria identidades falsas com eficiência.'}]}
  ],
  mago:[
    {key:'evocacao',nome:'Escola de Evocação',resumo:'Controle de dano em área e magia ofensiva.',features:[{level:2,nome:'Moldar Magias',resumo:'Protege aliados de suas magias de evocação.'},{level:6,nome:'Truque Potente',resumo:'Mesmo em sucesso, seus truques ainda ferem.'}]},
    {key:'abjuracao',nome:'Escola de Abjuração',resumo:'Barreiras e proteção arcana.',features:[{level:2,nome:'Proteção Arcana',resumo:'Cria uma reserva protetora ao conjurar abjurações.'},{level:6,nome:'Proteção Projetada',resumo:'Pode proteger aliados com sua reserva arcana.'}]}
  ],
  monge:[
    {key:'mao_aberta',nome:'Caminho da Mão Aberta',resumo:'Controle corporal e pressão em combate desarmado.',features:[{level:3,nome:'Técnica da Mão Aberta',resumo:'Adiciona efeitos de controle à Rajada de Golpes.'},{level:6,nome:'Integridade Corporal',resumo:'Pode se curar usando ki.'}]},
    {key:'sombras',nome:'Caminho das Sombras',resumo:'Furtividade sobrenatural e mobilidade.',features:[{level:3,nome:'Artes das Sombras',resumo:'Conjura truques sombrios usando ki.'},{level:6,nome:'Passo das Sombras',resumo:'Teleporta-se entre sombras próximas.'}]}
  ],
  paladino:[
    {key:'devocao',nome:'Juramento da Devoção',resumo:'Pureza, luz e defesa do justo.',features:[{level:3,nome:'Arma Sagrada',resumo:'Canalizar Divindade para tornar a arma mais precisa.'},{level:3,nome:'Expulsar o Profano',resumo:'Canaliza poder contra criaturas impuras.'}]},
    {key:'vinganca',nome:'Juramento da Vingança',resumo:'Caça implacável aos culpados.',features:[{level:3,nome:'Abjurar Inimigo',resumo:'Assusta e trava um alvo perigoso.'},{level:3,nome:'Voto de Inimizade',resumo:'Foca um inimigo com vantagem ofensiva.'}]}
  ],
  patrulheiro:[
    {key:'cacador',nome:'Caçador',resumo:'Especialista em derrubar presas específicas.',features:[{level:3,nome:'Presa do Caçador',resumo:'Escolhe um estilo de dano adicional.'},{level:7,nome:'Tática Defensiva',resumo:'Ganha uma defesa reativa contra inimigos.'}]},
    {key:'mestre_feras',nome:'Mestre das Feras',resumo:'Companheiro animal em combate.',features:[{level:3,nome:'Companheiro do Patrulheiro',resumo:'Um animal luta ao seu lado.'},{level:7,nome:'Treinamento Excepcional',resumo:'Companheiro melhora ações e utilidade.'}]}
  ]

};

const XANATHAR_SUBCLASS_OPTIONS = {
  barbaro:[
    {key:'ancestral_guardian',nome:'Caminho do Guardião Ancestral',resumo:'Protetor espiritual que desvia ataques dos aliados.',source:'XGtE',features:[{level:3,nome:'Protetores Ancestrais',resumo:'Marca um inimigo para dificultar ataques contra seus aliados.'},{level:6,nome:'Escudo Espiritual',resumo:'Em fúria, com reação, reduz em 2d6 o dano que um aliado a até 9 m sofre. Sobe para 3d6 no 10º nível e 4d6 no 14º.'},{level:10,nome:'Consultar os Espíritos',resumo:'Conjura augúrio ou clarividência sem gastar espaço nem componentes, usando Sabedoria. Na clarividência, um espírito ancestral vai ao local no lugar do sensor. Depois, só usa de novo após um descanso curto ou longo.'},{level:14,nome:'Ancestrais Vingativos',resumo:'Ao usar o Escudo Espiritual para reduzir dano de um ataque, o atacante sofre dano de energia igual ao valor que o escudo reduziu.'}]},
    {key:'storm_herald',nome:'Caminho do Arauto da Tempestade',resumo:'A fúria manifesta desertos, mares ou tundras.',source:'XGtE',features:[{level:3,nome:'Aura de Tempestade',resumo:'Sua fúria gera uma aura elemental ativa.'},{level:6,nome:'Alma da Tempestade',resumo:'Ganha resistência e benefício temático do ambiente escolhido.'},{level:10,nome:'Escudo Tempestuoso',resumo:'Aliados próximos recebem defesa elemental.'},{level:14,nome:'Tempestade Furiosa',resumo:'Reação ligada ao ambiente da Aura da Tempestade. Deserto: com reação, logo depois que uma criatura na aura acerta um ataque contra você, a obriga a uma salvaguarda de Destreza; se falhar, ela sofre fogo igual à metade do seu nível de bárbaro. Mar: com reação, ao acertar uma criatura na aura, você a obriga a uma salvaguarda de Força; se falhar, ela fica derrubada. Tundra: a criatura escolhida na aura faz salvaguarda de Força; se falhar, seu deslocamento vai a 0 até o início do próximo turno dela.'}]},
    {key:'zealot',nome:'Caminho do Fanático',resumo:'Fúria devota, dano divino e persistência sobrenatural.',source:'XGtE',features:[{level:3,nome:'Fúria Divina',resumo:'Enquanto estiver em fúria, a primeira criatura que você atingir em cada turno com ataque de arma recebe 1d6 + metade do seu nível de bárbaro de dano extra, necrótico ou radiante (escolhido ao adquirir).'},{level:3,nome:'Guerreiro dos Deuses',resumo:'Ressuscitá-lo exige menos recursos.'},{level:6,nome:'Foco Fanático',resumo:'Repete uma salvaguarda falha enquanto estiver em fúria.'},{level:10,nome:'Presença Zelosa',resumo:'Concede vantagem e coragem a aliados.'},{level:14,nome:'Fúria Além da Morte',resumo:'Continua lutando mesmo à beira da morte.'}]}
  ],
  bardo:[
    {key:'glamour',nome:'Colégio do Glamour',resumo:'Carisma feérico, suporte móvel e autoridade mágica.',source:'XGtE',features:[{level:3,nome:'Manto da Inspiração',resumo:'Distribui PV temporários e movimento reativo.'},{level:3,nome:'Performance Cativante',resumo:'Encanta espectadores após uma apresentação.'},{level:6,nome:'Manto da Majestade',resumo:'Ação bônus para conjurar Comando sem gastar espaço e assumir aparência sobrenatural por 1 minuto (ou até perder a concentração). Enquanto dura, pode conjurar Comando como ação bônus sem espaço, e as criaturas que ele enfeitiça falham automaticamente na salvaguarda contra essa magia. Uso: 1 vez por descanso longo.'},{level:14,nome:'Majestade Inquebrável',resumo:'Inimigos hesitam em atacá-lo diretamente.'}]},
    {key:'swords',nome:'Colégio das Espadas',resumo:'Bardo duelista com floreios e presença marcial.',source:'XGtE',features:[{level:3,nome:'Proficiência Bônus',resumo:'Ganha proficiência com armadura média e cimitarra.'},{level:3,nome:'Estilo de Luta',resumo:'Escolhe Duelo ou Combate com Duas Armas, sem repetir um estilo que já tenha.'},{level:3,nome:'Floreio de Lâmina',resumo:'Usa inspiração para aumentar dano e mobilidade.'},{level:6,nome:'Ataque Extra',resumo:'Dois ataques com a ação de Ataque.'},{level:14,nome:'Floreio do Mestre',resumo:'Mantém floreios com menor custo.'}]},
    {key:'whispers',nome:'Colégio dos Sussurros',resumo:'Terror psíquico, infiltração e manipulação.',source:'XGtE',features:[{level:3,nome:'Lâminas Psíquicas',resumo:'Gasta inspiração para causar dano psíquico extra.'},{level:3,nome:'Palavras de Terror',resumo:'Instila medo em conversas prolongadas.'},{level:6,nome:'Manto dos Sussurros',resumo:'Rouba a identidade de um morto recente.'},{level:14,nome:'Conhecimento das Sombras',resumo:'Com uma ação, sussurra uma frase que só uma criatura a até 9 m ouve. Se ela falhar na salvaguarda de Sabedoria contra a CD da sua magia, fica encantada por você por 8 horas, até você ou seus aliados a atacarem, danificarem ou a obrigarem a outra salvaguarda. Criatura que não entende seu idioma passa automaticamente. Uso: 1 vez por descanso longo.'}]}
  ],
  clerigo:[
    {key:'forge',nome:'Domínio da Forja',resumo:'Metal, fogo sagrado e defesa pesada.',source:'XGtE',features:[{level:1,nome:'Proficiência Bônus',resumo:'Ganha proficiência com armadura pesada e ferramentas de ferreiro.'},{level:1,nome:'Benção da Forja',resumo:'Encanta uma arma ou armadura com bônus mágico.'},{level:2,nome:'Canalizar Divindade: Benção do Artesão',resumo:'Ritual de 1 hora que cria um item não mágico com metal (arma simples ou marcial, armadura, 10 munições, ferramentas ou outro objeto metálico), de valor até 100 po. O metal gasto no ritual vale o mesmo que a criação; o item surge ao fim do ritual em espaço desocupado a até 1,5 m de você.'},{level:6,nome:'Alma da Forja',resumo:'Resiste a fogo e recebe proteção adicional.'},{level:8,nome:'Impacto Divino',resumo:'Uma vez por turno, ao acertar um ataque com arma, pode causar 1d8 de dano de fogo extra ao alvo. Ao chegar ao 14º nível, o dano sobe para 2d8.'},{level:17,nome:'Santo da Forja e Fogo',resumo:'Imune a dano de fogo. Com armadura pesada, resiste a dano cortante, de concussão e perfurante de ataques não mágicos.'}]},
    {key:'grave',nome:'Domínio da Sepultura',resumo:'Guardião do limiar entre vida e morte.',source:'XGtE',features:[{level:1,nome:'Círculo da Mortalidade',resumo:'Ao restaurar PV com dados de magia em criatura a 0 PV, usa o valor máximo de cada dado. Também aprende o truque Estabilizar, que não conta no limite de truques, com alcance de 9 m e conjurado como ação bônus.'},{level:1,nome:'Olhos da Sepultura',resumo:'Percebe mortos-vivos nas proximidades.'},{level:2,nome:'Canalizar Divindade: Caminho da Sepultura',resumo:'Ação: amaldiçoa uma criatura visível a até 9 m até o fim da sua próxima rodada. Na próxima vez que você ou um aliado a atingir com ataque, ela fica vulnerável a todo o dano desse ataque, e a maldição termina.'},{level:6,nome:'Sentinela na Porta da Morte',resumo:'Reação quando você ou criatura visível a até 9 m sofre acerto crítico: o acerto vira normal e os efeitos do crítico são cancelados. Usos iguais ao mod. de Sabedoria (mínimo 1), recuperados em descanso longo.'},{level:8,nome:'Conjuração Potente',resumo:'Soma seu mod. de Sabedoria ao dano de qualquer truque.'},{level:17,nome:'Guarda das Almas',resumo:'Colhe vitalidade quando criaturas caem perto de você.'}]}
  ],
  druida:[
    {key:'dreams',nome:'Círculo dos Sonhos',resumo:'Cura feérica, abrigo seguro e teleporte.',source:'XGtE',features:[{level:2,nome:'Bálsamo da Corte de Verão',resumo:'Pool de cura feérica como ação bônus.'},{level:6,nome:'Lareira ao Luar e Sombra',resumo:'Torna descansos mais seguros.'},{level:10,nome:'Caminhos Ocultos',resumo:'Teleporta a si mesmo ou um aliado.'},{level:14,nome:'Caminhante dos Sonhos',resumo:'Após um descanso curto, conjura sonho (você atua como mensageiro), vidência ou círculo de teleporte sem gastar espaço nem componentes. O círculo de teleporte abre um portal para o último lugar onde você terminou um descanso longo neste plano. Uso: 1 vez por descanso longo.'}]},
    {key:'shepherd',nome:'Círculo do Pastor',resumo:'Espíritos guardiões e invocações reforçadas.',source:'XGtE',features:[{level:2,nome:'Espírito Totêmico',resumo:'Invoca espíritos que curam, detectam ou fortalecem.'},{level:6,nome:'Invocações Poderosas',resumo:'Criaturas convocadas chegam mais resistentes.'},{level:10,nome:'Espírito Guardião',resumo:'Seus espíritos protegem aliados caídos.'},{level:14,nome:'Fé da Natureza',resumo:'Conjurados curam e persistem melhor.'}]}
  ],
  guerreiro:[
    {key:'arcane_archer',nome:'Arqueiro Arcano',resumo:'Flechas mágicas com efeitos especiais.',source:'XGtE',features:[{level:3,nome:'Tradição do Arqueiro Arcano',resumo:'Ganha proficiência em Arcanismo ou Natureza e aprende o truque Prestidigitação ou Druidismo.'},{level:3,nome:'Disparo Arcano',resumo:'Aprende 2 opções de disparo arcano. Pode usar 2 vezes, uma por turno ao disparar com arco, recuperando tudo em descanso curto ou longo. CD = 8 + bônus de proficiência + mod. de Inteligência.'},{level:7,nome:'Tiro Curvado',resumo:'Se um disparo mágico errar, com ação bônus rola de novo o ataque contra outro alvo a até 18 m do original.'},{level:7,nome:'Flecha Mágica',resumo:'Faz uma flecha não mágica de arco curto ou longo virar mágica, para superar resistência e imunidade não mágicas. Some após acertar ou errar.'},{level:15,nome:'Disparo Sempre Pronto',resumo:'Ao rolar iniciativa sem usos de Disparo Arcano restantes, recupera uma utilização.'},{level:18,nome:'Disparo Arcano Aperfeiçoado',resumo:'As seis opções de disparo ficam mais fortes.'}]},
    {key:'cavalier',nome:'Cavaleiro',resumo:'Defensor montado e controlador da linha de frente.',source:'XGtE',features:[{level:3,nome:'Bônus de Proficiência',resumo:'Ganha proficiência em Lidar com Animais, História, Intuição, Atuação ou Persuasão (ou um idioma).'},{level:3,nome:'Nascido para a Sela',resumo:'Vantagem em salvaguardas para não cair da montaria e cai em pé até 3 m. Montar ou desmontar custa 1,5 m de deslocamento.'},{level:3,nome:'Marca Inabalável',resumo:'Ao acertar um ataque corpo a corpo, marca o alvo. Enquanto você estiver a 1,5 m, ele tem desvantagem em ataques contra outros. Se ele causar dano a outro, você ganha um ataque especial como ação bônus com dano extra igual à metade do seu nível. Usos iguais ao mod. de Força (mín. 1), recuperados em descanso longo.'},{level:7,nome:'Manobra de Proteção',resumo:'Com reação, rola 1d8 e soma à CA de você ou de um aliado a 1,5 m que seja atacado. Se mesmo assim for atingido, o alvo tem resistência a esse dano. Usos iguais ao mod. de Constituição (mín. 1), recuperados em descanso longo.'},{level:10,nome:'Mantenha a Formação',resumo:'Provoca ataque de oportunidade quando um inimigo se move 1,5 m ou mais dentro do seu alcance. Ao acertar, o deslocamento do alvo cai para 0 até o fim do turno.'},{level:15,nome:'Investida Feroz',resumo:'Após andar 3 m em linha reta e acertar um ataque, o alvo faz salvaguarda de Força (CD 8 + bônus de proficiência + mod. de Força) ou é derrubado. Uma vez por turno.'},{level:18,nome:'Defensor Vigilante',resumo:'Ganha uma reação especial por turno de cada criatura, exceto no seu turno, só para ataque de oportunidade.'}]},
    {key:'samurai',nome:'Samurai',resumo:'Disciplina, precisão e presença social.',source:'XGtE',features:[{level:3,nome:'Bônus de Proficiência',resumo:'Ganha proficiência em História, Intuição, Atuação ou Persuasão (ou um idioma).'},{level:3,nome:'Espírito Guerreiro',resumo:'Com ação bônus, ganha vantagem em ataques com armas até o fim do turno e 5 PV temporários (10 no 10º nível e 15 no 15º). Usa 3 vezes e recupera em descanso longo.'},{level:7,nome:'Cortesão Elegante',resumo:'Persuasão soma o mod. de Sabedoria. Ganha proficiência em salvaguarda de Sabedoria; se já a tiver, ganha Inteligência ou Carisma à sua escolha.'},{level:10,nome:'Espírito Incansável',resumo:'Ao rolar iniciativa sem usos de Espírito Guerreiro, recupera um uso.'},{level:15,nome:'Golpe Rápido',resumo:'Troca a vantagem de um ataque por um ataque armado extra no mesmo alvo. Uma vez por turno.'},{level:18,nome:'Força Diante da Morte',resumo:'Com reação, ao cair a 0 PV por dano, adia a queda inconsciente e ganha um turno extra. Uma vez por descanso longo.'}]}
  ],
  monge:[
    {key:'drunken_master',nome:'Caminho do Mestre Bêbado',resumo:'Mobilidade errática e defesa escorregadia.',source:'XGtE',features:[{level:3,nome:'Técnica Bêbada',resumo:'Ao usar Rajada de Golpes, ganha Desengajar e +3 m de deslocamento até o fim do turno.'},{level:6,nome:'Balanço Bêbado',resumo:'Levanta-se gastando 1,5 m de deslocamento (5 pés, padrão do 5e; o livro em português traz 3 m). Redirecionar Ataque: 1 ki, como reação, faz um ataque corpo a corpo errado contra você acertar outra criatura a 1,5 m.'},{level:11,nome:'Sorte do Bêbado',resumo:'Gasta 2 ki para cancelar desvantagem em um teste, ataque ou salvaguarda.'},{level:17,nome:'Frenesi do Bêbado',resumo:'Ao usar Rajada de Golpes, faz até 3 ataques extras, cada um contra um alvo diferente.'}]},
    {key:'kensei',nome:'Caminho do Kensei',resumo:'Mestre de armas escolhido como extensão do corpo.',source:'XGtE',features:[{level:3,nome:'Caminho do Kensei',resumo:'Escolhe 2 armas Kensei (1 corpo a corpo e 1 à distância). Proficiência em Suprimentos de Caligrafia ou Ferramentas de Pintor.'},{level:3,nome:'Esquiva Rápida',resumo:'Ataque desarmado com arma Kensei corpo a corpo na mão: +2 de CA até o seu próximo turno.'},{level:3,nome:'Tiro do Kensei',resumo:'Ação bônus: acertos à distância com arma Kensei causam +1d4 do tipo da arma até o fim do turno.'},{level:6,nome:'Uno com a Lâmina',resumo:'Armas Kensei contam como mágicas. Terceira arma Kensei.'},{level:6,nome:'Golpe Habilidoso',resumo:'Gasta 1 ki ao acertar com arma Kensei: dano extra igual ao dado de Artes Marciais, 1 vez por turno.'},{level:11,nome:'Aguçar a Lâmina',resumo:'Ação bônus: gasta até 3 ki para dar bônus igual ao ki gasto em ataque e dano com arma Kensei, por 1 minuto.'},{level:11,nome:'Quarta arma Kensei',resumo:'Escolhe mais uma arma Kensei (4 no total).'},{level:17,nome:'Precisão Infalível',resumo:'Repete um ataque errado com arma de monge, 1 vez por turno.'},{level:17,nome:'Quinta arma Kensei',resumo:'Escolhe mais uma arma Kensei (5 no total).'}]},
    {key:'sun_soul',nome:'Caminho da Alma Solar',resumo:'Rajadas radiantes e energia solar ofensiva.',source:'XGtE',features:[{level:3,nome:'Raio Solar Radiante',resumo:'Ataque à distância de 9 m, dano radiante, com Destreza e dado de Artes Marciais. Gasta 1 ki para um segundo ataque como ação bônus.'},{level:6,nome:'Golpe do Arco Abrasador',resumo:'Após a ação de Atacar, ação bônus: gasta 2 ki para conjurar Mãos Flamejantes; cada ki extra aumenta o nível em 1, até metade do nível de monge.'},{level:11,nome:'Explosão Calcinante',resumo:'Ação: orbe a 45 m que explode em esfera de luz radiante com raio de 6 m (20 pés; o livro em português traz 8 m); salvaguarda de Constituição; 2d6 radiante, +2d6 por ki gasto (até 3 ki).'},{level:17,nome:'Escudo Solar',resumo:'Luz plena em raio de 9 m e penumbra por mais 9 m. Reação, com a luz acesa, ao ser atingido: 5 + mod. de Sabedoria de dano radiante ao atacante.'}]}
  ],
  paladino:[
    {key:'conquest',nome:'Juramento da Conquista',resumo:'Medo, domínio e controle do campo de batalha.',source:'XGtE',features:[{level:3,nome:'Presença Conquistadora',resumo:'Canalizar Divindade, ação: criaturas a 9 m que falham em salvaguarda de Sabedoria ficam amedrontadas por 1 minuto; repetem a salvaguarda ao fim de cada um dos turnos delas.'},{level:3,nome:'Ataque Guiado',resumo:'Canalizar Divindade: +10 em uma rolagem de ataque, depois de ver o resultado.'},{level:7,nome:'Aura da Conquista',resumo:'Aura de 3 m. Criatura amedrontada na aura tem deslocamento 0 e sofre dano psíquico igual à metade do seu nível de paladino no início do turno dela.'},{level:15,nome:'Repreensão Arrogante',resumo:'Quem atinge você com um ataque sofre dano psíquico igual ao seu mod. de Carisma (mínimo 1), se você não estiver incapacitado.'},{level:18,nome:'Aura da Conquista (9 m)',resumo:'O alcance da aura aumenta para 9 m.'},{level:20,nome:'Conquistador Invencível',resumo:'Ação, 1 minuto: resistência a todo dano, um ataque extra na ação de Atacar e crítico em 19 ou 20. Uma vez por descanso longo.'}]},
    {key:'redemption',nome:'Juramento da Redenção',resumo:'Pacificador resistente que protege outros.',source:'XGtE',features:[{level:3,nome:'Emissário da Paz',resumo:'Canalizar Divindade, ação bônus: +5 em testes de Carisma (Persuasão) por 10 minutos.'},{level:3,nome:'Repreendendo a Violência',resumo:'Canalizar Divindade, reação, alcance de 9 m: o atacante faz salvaguarda de Sabedoria; se falhar, sofre dano radiante igual ao que causou; se passar, metade.'},{level:7,nome:'Aura do Guardião',resumo:'Aura de 3 m. Reação: recebe no seu lugar o dano que uma criatura na aura receberia, sem redução.'},{level:15,nome:'Espírito Protetor',resumo:'Ao terminar seu turno em combate com PV abaixo da metade, recupera 1d6 + metade do nível de paladino.'},{level:18,nome:'Aura do Guardião (9 m)',resumo:'O alcance da aura aumenta para 9 m.'},{level:20,nome:'Emissário da Redenção',resumo:'Resistência a dano causado por outras criaturas. Quem atinge você sofre dano radiante igual à metade do dano recebido.'}]}
  ],
  patrulheiro:[
    {key:'gloom_stalker',nome:'Perseguidor Obscuro',resumo:'Caçador da escuridão com início devastador.',source:'XGtE',features:[{level:3,nome:'Emboscador Terrível',resumo:'Iniciativa + mod. de Sabedoria. No 1º turno de combate: +3 m de deslocamento e um ataque com arma extra, com +1d8 de dano.'},{level:3,nome:'Visão Umbral',resumo:'Visão no escuro de 18 m (ou +9 m, se já tiver). Fica invisível para criaturas que dependem de visão no escuro.'},{level:7,nome:'Mente de Ferro',resumo:'Proficiência em salvaguarda de Sabedoria (se já tiver, usa Inteligência ou Carisma).'},{level:11,nome:'Agitação Perseguidora',resumo:'Uma vez por turno, ao errar um ataque com arma, faz outro ataque com arma na mesma ação.'},{level:15,nome:'Evasiva Sombria',resumo:'Reação: impõe desvantagem ao atacante que não tenha vantagem, antes de conhecer o resultado da jogada.'}]},
    {key:'horizon_walker',nome:'Andarilho do Horizonte',resumo:'Guardião planar com teleporte e dano de energia.',source:'XGtE',features:[{level:3,nome:'Detectar Portais',resumo:'Ação: detecta a distância e a direção do portal planar mais próximo, a até 1,5 km. Uma vez por descanso curto ou longo.'},{level:3,nome:'Guerreiro Planar (1d8)',resumo:'Ação bônus, criatura a 9 m: o próximo acerto com arma nesse turno causa dano de energia e +1d8.'},{level:7,nome:'Passo Etéreo',resumo:'Ação bônus: conjura Forma Etérea sem gastar espaço, até o fim do turno. Uma vez por descanso curto ou longo.'},{level:11,nome:'Ataque Distante',resumo:'Teleporta-se até 3 m antes de cada ataque. Ao atacar duas criaturas diferentes com a ação, ganha um ataque extra contra uma terceira.'},{level:11,nome:'Guerreiro Planar (2d8)',resumo:'O dado extra do Guerreiro Planar passa a 2d8.'},{level:15,nome:'Defesa Espectral',resumo:'Reação, ao sofrer dano de um ataque: resistência a todo dano desse ataque até o fim do turno.'}]},
    {key:'monster_slayer',nome:'Exterminador de Monstros',resumo:'Especialista em caçar criaturas perigosas.',source:'XGtE',features:[{level:3,nome:'Sentido do Caçador',resumo:'Ação, alcance de 18 m: revela imunidades, resistências e vulnerabilidades. Usos = mod. de Sabedoria (mínimo 1), recuperados em descanso longo.'},{level:3,nome:'Exterminador de Presas',resumo:'Ação bônus, criatura a 18 m: o primeiro acerto com arma por turno contra ela causa +1d6. Dura até descanso curto ou longo, ou até designar outra.'},{level:7,nome:'Defesa Sobrenatural',resumo:'+1d6 em salvaguardas contra a presa e em testes para escapar dela.'},{level:11,nome:'Nêmesis do Conjurador',resumo:'Reação: criatura a 18 m que conjura magia ou se teleporta faz salvaguarda de Sabedoria contra sua CD; se falhar, a magia ou o teleporte são desperdiçados. Uma vez por descanso curto ou longo.'},{level:15,nome:'Contra-Ataque do Exterminador',resumo:'Reação: ataca a presa com arma antes da salvaguarda dela; se acertar, a salvaguarda é bem-sucedida.'}]}
  ],
  ladino:[
    {key:'inquisitive',nome:'Inquiridor',resumo:'Detetive perceptivo e duelista analítico.',source:'XGtE',features:[{level:3,nome:'Ouvir do Enganador',resumo:'Em testes de Intuição para detectar mentira, um d20 de 7 ou menos conta como 8.'},{level:3,nome:'Olhar do Detalhe',resumo:'Com ação bônus, faz teste de Percepção para notar algo ou de Investigação para achar pistas.'},{level:3,nome:'Combatente Perspicaz',resumo:'Com ação bônus, faz Intuição contra a Enganação de um alvo que o veja. Se vencer, pode usar Ataque Furtivo nele sem vantagem, por 1 minuto ou até usar de novo.'},{level:9,nome:'Olhar Constante',resumo:'Tem vantagem em Percepção (Sabedoria) e Investigação (Inteligência) se não se moveu mais da metade do deslocamento no turno.'},{level:13,nome:'Olhar Inflexível',resumo:'Com ação, percebe ilusões, metamorfos e disfarces mágicos a 9 m, se não estiver cego ou caído. Não revela o que está escondido. Usos iguais ao mod. de Sabedoria (mín. 1), recuperados em descanso longo.'},{level:17,nome:'Olhar da Fraqueza',resumo:'Contra um alvo que você estudou, o Ataque Furtivo ganha +3d6.'}]},
    {key:'mastermind',nome:'Mentor',resumo:'Manipulador tático e social.',source:'XGtE',features:[{level:3,nome:'Mestre da Intriga',resumo:'Ganha proficiência com kit de disfarce, kit de falsificação e um jogo à escolha. Aprende 2 idiomas e imita sotaques e falas que tenha ouvido por 1 minuto.'},{level:3,nome:'Mestre de Tática',resumo:'Usa Ajudar como ação bônus. Ao ajudar um aliado sob ataque, o alvo pode estar a 9 m (em vez de 1,5 m), se puder ver e ouvir você.'},{level:9,nome:'Manipulador Perspicaz',resumo:'Após 1 minuto interagindo com uma criatura, compara Inteligência, Sabedoria, Carisma e nível de classe com ela. O Mestre diz se ela é igual, superior ou inferior, e conta um traço de sua história.'},{level:13,nome:'Redirecionar',resumo:'Com reação, quando um ataque o mira, transfere o ataque para uma criatura a 1,5 m que esteja dando cobertura contra ele.'},{level:17,nome:'Alma do Enganador',resumo:'Seus pensamentos não podem ser lidos por telepatia, a menos que você permita. Magia de verdade indica que você é sincero, mesmo quando mente.'}]},
    {key:'scout',nome:'Batedor',resumo:'Explorador móvel e reativo.',source:'XGtE',features:[{level:3,nome:'Escaramuça',resumo:'Com reação, quando um inimigo termina o turno a 1,5 m, move-se até metade do deslocamento sem provocar ataques de oportunidade.'},{level:3,nome:'Sobrevivente',resumo:'Ganha proficiência em Natureza e Sobrevivência, com bônus de proficiência dobrado nelas.'},{level:9,nome:'Mobilidade Superior',resumo:'Deslocamento de caminhada aumenta em 3 m (e também o de escalada ou natação, se tiver).'},{level:13,nome:'Mestre de Emboscada',resumo:'Vantagem em iniciativa. O primeiro alvo que você atingir na primeira rodada recebe ataques com vantagem até o início do seu próximo turno.'},{level:17,nome:'Golpe Súbito',resumo:'Ao usar Atacar, faz um ataque extra como ação bônus. Esse ataque pode usar Ataque Furtivo já usado no turno, se for o único contra o alvo.'}]},
    {key:'swashbuckler',nome:'Espadachim',resumo:'Duelista carismático, veloz e independente.',source:'XGtE',features:[{level:3,nome:'Passo Elegante',resumo:'Após atacar corpo a corpo um alvo no turno, este não pode fazer ataques de oportunidade contra você até o fim do seu turno.'},{level:3,nome:'Audácia Devassa',resumo:'Soma o mod. de Carisma à iniciativa. Ataque Furtivo sem vantagem se estiver a 1,5 m do alvo, sem outra criatura a 1,5 m dele e sem desvantagem.'},{level:9,nome:'Penachar',resumo:'Com ação bônus, Persuasão (Carisma) contra Intuição (Sabedoria) do alvo. Se vencer e o alvo for hostil, ele tem desvantagem em ataques contra criaturas que não sejam você e não faz ataques de oportunidade contra elas. Dura 1 minuto, ou até um aliado atacar o alvo, ele ser alvo de magia ou se afastar mais de 18 m.'},{level:13,nome:'Manobra Elegante',resumo:'Com ação bônus, ganha vantagem no próximo teste de Acrobacia ou Atletismo feito no turno.'},{level:17,nome:'Mestre Duelista',resumo:'Se errar um ataque, pode rolar de novo com vantagem. Uma vez por descanso curto ou longo.'}]}
  ],
  feiticeiro:[
    {key:'divine_soul',nome:'Alma Favorecida',resumo:'Feiticeiro de origem divina, com magia de afinidade e cura ampliada.',source:'XGtE',features:[{level:1,nome:'Magia Divina',resumo:'Ganha uma magia extra de feiticeiro conforme a afinidade: Bem (curar ferimentos), Mal (infligir ferimentos), Ordem (benção), Caos (perdição) ou Neutralidade (proteção contra o bem e o mal). Não conta nas magias conhecidas.'},{level:1,nome:'Favorecido pelos Deuses',resumo:'Ao falhar numa salvaguarda ou errar um ataque, rola 2d4 e soma ao total. Uma vez por descanso curto ou longo.'},{level:6,nome:'Cura Fortalecida',resumo:'Gasta 1 PF para rolar de novo dados de cura de uma magia que cure você ou um aliado a 1,5 m. Uma vez por turno.'},{level:14,nome:'Asas Transcendentais',resumo:'Com ação bônus, ganha voo de 9 m. As asas duram até você ficar incapacitado, morrer ou desfazê-las com ação bônus. A cor segue a afinidade.'},{level:18,nome:'Recuperação Sublime',resumo:'Com ação bônus, abaixo da metade dos PV, recupera PV igual à metade do máximo. Uma vez por descanso longo.'}]},
    {key:'shadow',nome:'Adepto das Sombras',resumo:'Feiticeiro ligado à escuridão, com visão no escuro e resistência à morte.',source:'XGtE',features:[{level:1,nome:'Olhos da Escuridão',resumo:'Visão no escuro de 36 m. No 3º nível, aprende Escuridão, que não conta nas magias conhecidas e pode ser lançada com 2 PF ou com espaço de magia.'},{level:1,nome:'Força do Túmulo',resumo:'Ao cair a 0 PV por dano que não seja radiante nem crítico, faz salvaguarda de Carisma (CD 5 + dano recebido). Se passar, cai com 1 PV. Uma vez por descanso longo.'},{level:6,nome:'Cão do Mal Presságio',resumo:'Com ação bônus, gasta 3 PF para invocar um cão sombrio (use o lobo atroz) que ataca uma criatura visível a 36 m. O cão aparece a 9 m dela, com PV temporários iguais à metade do seu nível de feiticeiro. Some ao chegar a 0 PV ou após 5 minutos.'},{level:14,nome:'Caminhar nas Sombras',resumo:'Em luz fraca ou escuridão, com ação bônus, teleporta-se até 36 m para espaço desocupado visível que também esteja em luz fraca ou escuridão.'},{level:18,nome:'Forma Umbral',resumo:'Com ação bônus, gasta 6 PF e vira sombra por 1 minuto: resistência a todo dano exceto energia e radiante, e atravessa criaturas e objetos como terreno difícil.'}]},
    {key:'storm',nome:'Feiticeiro da Tempestade',resumo:'Feiticeiro ligado ao ar, com voo curto e poder elétrico.',source:'XGtE',features:[{level:1,nome:'Orador do Vento',resumo:'Fala, lê e escreve Primordial, o idioma do elemento ar.'},{level:1,nome:'Magia Tempestuosa',resumo:'Com ação bônus, voa até 3 m sem provocar ataques de oportunidade, logo antes ou depois de conjurar magia de 1º círculo ou superior.'},{level:6,nome:'Coração da Tempestade',resumo:'Resistência a dano elétrico e trovejante. Ao conjurar magia de dano elétrico ou trovejante, criaturas a 3 m recebem dano igual à metade do seu nível de feiticeiro.'},{level:6,nome:'Guia da Tempestade',resumo:'Com ação, faz a chuva parar numa esfera de 6 m. Com ação bônus, escolhe a direção do vento numa esfera de 30 m.'},{level:14,nome:'Fúria da Tempestade',resumo:'Com reação ao ser atingido por ataque corpo a corpo, causa dano elétrico igual ao seu nível. O atacante faz salvaguarda de Força contra a CD das suas magias ou é empurrado 6 m.'},{level:18,nome:'Alma do Vento',resumo:'Imune a dano elétrico e trovejante, com voo de 18 m. Com ação, reduz o voo a 9 m por 1 hora e dá voo de 9 m a 3 + mod. de Carisma criaturas próximas. Uma vez por descanso curto ou longo.'}]}
  ],
  bruxo:[
    {key:'celestial',nome:'O Celestial',resumo:'Bruxo de cura, luz e proteção radiante.',source:'XGtE',features:[{level:1,nome:'Truques Adicionais',resumo:'Aprende os truques luz e chama sagrada, que não contam no limite de truques conhecidos. O app os concede automaticamente, fora da sua lista de truques escolhidos.'},{level:1,nome:'Iluminação Curativa',resumo:'Pool de d6 para cura como ação bônus.'},{level:6,nome:'Alma Radiante',resumo:'Resistência a dano radiante. Ao conjurar magia que cause dano radiante ou de fogo, soma seu mod. de Carisma ao dano de um dos alvos.'},{level:10,nome:'Resiliência Celestial',resumo:'Gera PV temporários após descanso.'},{level:14,nome:'Vingança Ardente',resumo:'No início do seu turno, com 0 PV e no lugar do teste contra a morte, você se levanta com metade dos PV máximos, causa 2d8 + mod. de Carisma de dano radiante a criaturas a 9 m e as deixa cegas até o fim do turno atual. Uma vez por descanso longo.'}]},
    {key:'hexblade',nome:'A Lâmina Maldita',resumo:'Bruxo marcial com arma amaldiçoada e armadura.',source:'XGtE',features:[{level:1,nome:'Maldição da Lâmina Maldita',resumo:'Marca um alvo para dano, críticos e cura.'},{level:1,nome:'Guerreiro Maldito',resumo:'Ganha armadura média, escudos e armas marciais. Ao fim de cada descanso longo, escolhe uma arma em que é proficiente e que não tenha a propriedade duas mãos; com ela, usa Carisma em vez de Força ou Destreza nos ataques e no dano.'},{level:6,nome:'Espectro Amaldiçoado',resumo:'Ergue espírito do alvo derrotado.'},{level:10,nome:'Armadura de Maldições',resumo:'O alvo amaldiçoado erra você com mais frequência.'},{level:14,nome:'Mestre das Maldições',resumo:'Move a maldição para outro inimigo.'}]}
  ],
  mago:[
    {key:'war_magic',nome:'Mago de Guerra',resumo:'Defesa arcana rápida e agressão controlada.',source:'XGtE',features:[{level:2,nome:'Deflexão Arcana',resumo:'Com reação, ao ser atingido por ataque ou falhar em salvaguarda, ganha +2 na CA contra o ataque ou +4 na salvaguarda. Depois, só pode conjurar truques até o fim do seu próximo turno.'},{level:2,nome:'Astúcia Tática',resumo:'Soma o mod. de Inteligência à iniciativa.'},{level:6,nome:'Surto de Poder',resumo:'Armazena energia mágica em você. Máximo de surtos igual ao mod. de Inteligência (mín. 1). Ao terminar descanso longo, fica com 1; ao dissipar magia ou contramágica com sucesso, ganha 1. Uma vez por turno, ao causar dano com magia de mago, gasta 1 surto para causar dano de energia extra igual à metade do seu nível.'},{level:10,nome:'Magia Duradoura',resumo:'Enquanto mantém concentração, ganha +2 na CA e em testes de resistência.'},{level:14,nome:'Blindagem Defletora',resumo:'Ao usar Deflexão Arcana, até três criaturas visíveis a 18 m recebem dano de energia igual à metade do seu nível.'}]}
  ]
};

Object.entries(XANATHAR_SUBCLASS_OPTIONS).forEach(([classe, extras])=>{
  const existentes = SUBCLASS_OPTIONS[classe] || [];
  const merged = [...existentes];
  extras.forEach(extra=>{ if(!merged.some(sub=>sub.key===extra.key)) merged.push(extra); });
  SUBCLASS_OPTIONS[classe] = merged;
});

const CLASS_RESOURCE_RULES = {

  barbaro:[{id:'furia',nome:'Fúria',recarga:'Descanso longo',formula:n=> n<3?2:n<6?3:n<12?4:n<17?5:6}],
  bardo:[{id:'inspiracao_bardo',nome:'Inspiração de Bardo',recarga:n=> n>=5?'Descanso curto':'Descanso longo',formula:(n,p)=> Math.max(1, p.modCarisma||0)}],
  clerigo:[{id:'canalizar_divindade',nome:'Canalizar Divindade',recarga:'Descanso curto',formula:n=> n>=18?3:n>=6?2:1}],
  druida:[{id:'forma_selvagem',nome:'Forma Selvagem',recarga:'Descanso curto',formula:n=> n>=2?2:0}],
  feiticeiro:[{id:'pontos_feiticaria',nome:'Pontos de Feitiçaria',recarga:'Descanso longo',formula:n=> n>=2?n:0}],
  guerreiro:[{id:'segundo_folego',nome:'Segundo Fôlego',recarga:'Descanso curto ou longo',formula:n=>1},{id:'surto_acao',nome:'Surto de Ação',recarga:'Descanso curto',formula:n=> n>=17?2:n>=2?1:0},{id:'indomavel',nome:'Indomável',recarga:'Descanso longo',formula:n=> n>=17?3:n>=13?2:n>=9?1:0}],
  ladino:[{id:'ataque_furtivo',nome:'Ataque Furtivo',recarga:'Por turno',formula:n=> n>=1?1:0}],
  monge:[{id:'ki',nome:'Pontos de Ki',recarga:'Descanso curto',formula:n=> n>=2?n:0}],
  paladino:[{id:'canalizar_divindade',nome:'Canalizar Divindade',recarga:'Descanso curto',formula:n=> n>=3?1:0}],
  patrulheiro:[{id:'sentido_primevo',nome:'Sentido Primevo',recarga:'Usa espaço de magia',formula:n=> n>=3?1:0}]
};
function getSubclassUnlockLevel(classe){ if(getRulesEdition()==='2024' && CLASSES[classe]) return 3; return SUBCLASS_UNLOCK_LEVEL[classe] || 99; }
function getSubclassOptions(classe){ const todas=SUBCLASS_OPTIONS[classe] || []; return getRulesEdition()==='2024' ? todas.filter(s=>s.source!=='XGtE') : todas; }
function getSubclassByKey(classe, key){ return getSubclassOptions(classe).find(s=>s.key===key) || null; }
function getSubclassFeaturesForLevel(classe, key, nivel){ const sub=getSubclassByKey(classe,key); return sub ? (sub.features||[]).filter(f=>f.level <= (nivel||1)) : []; }
function getClassResources(classe, nivel, personagem){
  const regras = CLASS_RESOURCE_RULES[classe] || [];
  const p = personagem || {};
  const mods = {modCarisma: calcularMod((p.atributos||{}).carisma || 10), modSabedoria: calcularMod((p.atributos||{}).sabedoria || 10), modInteligencia: calcularMod((p.atributos||{}).inteligencia || 10)};
  return regras.map(regra=>{ const max=Math.max(0, typeof regra.formula==='function' ? Number(regra.formula(nivel||1, mods)) : Number(regra.formula||0)); const recarga=typeof regra.recarga==='function' ? regra.recarga(nivel||1, mods) : regra.recarga; return {id:regra.id,nome:regra.nome,max,atual:max,recarga}; }).filter(r=>r.max>0);
}


/* === EXPANSÃO DE RECURSOS, SUBCLASSES E ESCOLHAS === */
const COMPLETE_CLASS_FEATURE_PATCH = {"barbaro": [{"level": 1, "nome": "Defesa sem Armadura", "resumo": "CA baseada em Destreza e Constituição quando não usa armadura."}, {"level": 1, "nome": "Fúria", "resumo": "Entra em fúria por usos limitados, ganhando bônus e resistências."}, {"level": 2, "nome": "Ataque Descuidado", "resumo": "Pode ganhar vantagem em ataques corpo a corpo usando Força."}, {"level": 2, "nome": "Sentido de Perigo", "resumo": "Vantagem em testes de Destreza contra efeitos visíveis."}, {"level": 3, "nome": "Caminho Primitivo", "resumo": "Escolhe sua subclasse bárbara."}, {"level": 5, "nome": "Movimento Rápido", "resumo": "Aumenta deslocamento quando não usa armadura pesada."}, {"level": 7, "nome": "Instinto Feral", "resumo": "Vantagem em iniciativa e ação mesmo surpreendido ao entrar em fúria."}, {"level": 9, "nome": "Crítico Brutal (1 dado)", "resumo": "Acrescenta um dado de dano em acertos críticos corpo a corpo."}, {"level": 11, "nome": "Fúria Implacável", "resumo": "Pode evitar cair a 0 PV enquanto está em fúria."}, {"level": 13, "nome": "Crítico Brutal (2 dados)", "resumo": "Aumenta o dano adicional do crítico brutal."}, {"level": 15, "nome": "Fúria Persistente", "resumo": "Sua fúria só termina cedo se você quiser ou cair inconsciente."}, {"level": 17, "nome": "Crítico Brutal (3 dados)", "resumo": "Aumenta novamente o dano adicional do crítico brutal."}, {"level": 18, "nome": "Força Indomável", "resumo": "Seu valor de Força em testes pode igualar sua Força bruta."}], "bardo": [{"level": 1, "nome": "Inspiração de Bardo", "resumo": "Concede dado de inspiração a aliados."}, {"level": 1, "nome": "Conjuração", "resumo": "Usa Carisma para lançar magias de bardo."}, {"level": 2, "nome": "Jack of All Trades", "resumo": "Metade do bônus de proficiência em testes sem proficiência."}, {"level": 2, "nome": "Canção de Descanso", "resumo": "Aliados recuperam PV extras em descanso curto."}, {"level": 3, "nome": "Especialização", "resumo": "Escolhe perícias para dobrar o bônus de proficiência."}, {"level": 3, "nome": "Colégio de Bardo", "resumo": "Escolhe a subclasse do colégio."}, {"level": 5, "nome": "Fonte de Inspiração", "resumo": "Recupera Inspiração de Bardo em descanso curto."}, {"level": 6, "nome": "Contracanto", "resumo": "Protege contra medo e encantamento com música."}, {"level": 10, "nome": "Especialização Adicional", "resumo": "Escolhe mais perícias para especialização."}, {"level": 10, "nome": "Segredos Mágicos", "resumo": "Aprende magias fora da lista de bardo."}, {"level": 18, "nome": "Segredos Mágicos Superiores", "resumo": "Aprende mais magias fora da lista de bardo."}, {"level": 20, "nome": "Inspiração Superior", "resumo": "Recupera uma inspiração ao rolar iniciativa sem usos."}], "bruxo": [{"level": 1, "nome": "Magia de Pacto", "resumo": "Conjuração baseada em pacto e espaços curtos."}, {"level": 1, "nome": "Patrono Sobrenatural", "resumo": "Recebe benefícios do patrono escolhido."}, {"level": 2, "nome": "Invocações Místicas", "resumo": "Escolhe invocações permanentes ou situacionais."}, {"level": 3, "nome": "Dádiva do Pacto", "resumo": "Escolhe um presente central do pacto."}, {"level": 11, "nome": "Arcanum Místico (6º)", "resumo": "Conjura uma magia de 6º círculo 1 vez por descanso longo."}, {"level": 13, "nome": "Arcanum Místico (7º)", "resumo": "Conjura uma magia de 7º círculo 1 vez por descanso longo."}, {"level": 15, "nome": "Arcanum Místico (8º)", "resumo": "Conjura uma magia de 8º círculo 1 vez por descanso longo."}, {"level": 17, "nome": "Arcanum Místico (9º)", "resumo": "Conjura uma magia de 9º círculo 1 vez por descanso longo."}], "clerigo": [{"level": 1, "nome": "Conjuração Divina", "resumo": "Prepara magias usando Sabedoria."}, {"level": 1, "nome": "Domínio Divino", "resumo": "Escolhe domínio com magias e benefícios adicionais."}, {"level": 2, "nome": "Canalizar Divindade", "resumo": "Usa poder divino para efeitos especiais de classe e domínio."}, {"level": 5, "nome": "Destruir Mortos-Vivos (ND 1/2)", "resumo": "Aprimora Expulsar Mortos-Vivos."}, {"level": 8, "nome": "Destruir Mortos-Vivos (ND 1)", "resumo": "Aprimora Expulsar Mortos-Vivos."}, {"level": 11, "nome": "Destruir Mortos-Vivos (ND 2)", "resumo": "Aprimora Expulsar Mortos-Vivos."}, {"level": 14, "nome": "Destruir Mortos-Vivos (ND 3)", "resumo": "Aprimora Expulsar Mortos-Vivos."}, {"level": 17, "nome": "Destruir Mortos-Vivos (ND 4)", "resumo": "Aprimora Expulsar Mortos-Vivos."}], "druida": [{"level": 1, "nome": "Idioma Druídico", "resumo": "Conhece o idioma secreto dos druidas."}, {"level": 1, "nome": "Conjuração Druídica", "resumo": "Prepara magias usando Sabedoria."}, {"level": 2, "nome": "Forma Selvagem", "resumo": "Transforma-se em besta por usos limitados."}, {"level": 2, "nome": "Círculo Druídico", "resumo": "Escolhe sua subclasse druídica."}, {"level": 4, "nome": "Forma Selvagem Aprimorada", "resumo": "Acessa formas com nado."}, {"level": 8, "nome": "Forma Selvagem Aprimorada", "resumo": "Acessa formas com voo."}], "feiticeiro": [{"level": 1, "nome": "Conjuração Inata", "resumo": "Conjuração espontânea baseada em Carisma."}, {"level": 1, "nome": "Origem Feiticeira", "resumo": "Sua linhagem ou fenômeno mágico molda poderes extras."}, {"level": 2, "nome": "Fonte da Magia", "resumo": "Ganha pontos de feitiçaria."}, {"level": 3, "nome": "Metamagia", "resumo": "Escolhe opções para alterar magias."}, {"level": 20, "nome": "Restauração Feiticeira", "resumo": "Recupera pontos de feitiçaria após descanso curto."}], "guerreiro": [{"level": 1, "nome": "Estilo de Luta", "resumo": "Escolhe uma especialização marcial."}, {"level": 1, "nome": "Segundo Fôlego", "resumo": "Recupera PV com uma ação bônus por descanso curto."}, {"level": 2, "nome": "Surto de Ação", "resumo": "Ganha uma ação adicional por descanso curto."}, {"level": 3, "nome": "Arquétipo Marcial", "resumo": "Escolhe sua subclasse de guerreiro."}, {"level": 5, "nome": "Ataque Extra", "resumo": "Dois ataques com a ação de Ataque."}, {"level": 11, "nome": "Ataque Extra (2)", "resumo": "Três ataques com a ação de Ataque."}, {"level": 20, "nome": "Ataque Extra (3)", "resumo": "Quatro ataques com a ação de Ataque."}], "ladino": [{"level": 1, "nome": "Especialização", "resumo": "Escolhe perícias para dobrar proficiência."}, {"level": 1, "nome": "Ataque Furtivo", "resumo": "Dano adicional 1 vez por turno sob condições apropriadas."}, {"level": 1, "nome": "Gíria dos Ladrões", "resumo": "Conhece o código secreto dos ladrões."}, {"level": 2, "nome": "Ação Ardilosa", "resumo": "Desengajar, Disparar ou Esconder como ação bônus."}, {"level": 3, "nome": "Arquétipo Ladino", "resumo": "Escolhe sua subclasse de ladino."}, {"level": 6, "nome": "Especialização Adicional", "resumo": "Escolhe mais perícias para especialização."}, {"level": 18, "nome": "Elusivo", "resumo": "Ninguém ganha vantagem em ataques contra você enquanto não estiver incapacitado."}], "mago": [{"level": 1, "nome": "Conjuração Arcana", "resumo": "Prepara magias do grimório usando Inteligência."}, {"level": 1, "nome": "Recuperação Arcana", "resumo": "Recupera espaços de magia 1 vez por dia em descanso curto."}, {"level": 2, "nome": "Tradição Arcana", "resumo": "Escolhe sua escola de magia."}, {"level": 18, "nome": "Maestria em Magia", "resumo": "Escolhe magias menores para conjuração eficiente."}, {"level": 20, "nome": "Magias Assinatura", "resumo": "Escolhe magias assinaturas sempre preparadas."}], "monge": [{"level": 1, "nome": "Defesa sem Armadura", "resumo": "CA baseada em Destreza e Sabedoria quando sem armadura/escudo."}, {"level": 1, "nome": "Artes Marciais", "resumo": "Combate desarmado com dado de artes marciais e ação bônus."}, {"level": 2, "nome": "Ki", "resumo": "Ganha pontos de ki e técnicas básicas."}, {"level": 2, "nome": "Movimento sem Armadura", "resumo": "Seu deslocamento aumenta sem armadura."}, {"level": 3, "nome": "Tradição Monástica", "resumo": "Escolhe sua subclasse monástica."}, {"level": 4, "nome": "Queda Lenta", "resumo": "Reduz dano de queda com reação."}, {"level": 5, "nome": "Ataque Extra", "resumo": "Dois ataques com a ação de Ataque."}, {"level": 5, "nome": "Golpe Atordoante", "resumo": "Pode gastar ki para tentar atordoar."}, {"level": 6, "nome": "Golpes Ki-Empoderados", "resumo": "Ataques desarmados contam como mágicos."}, {"level": 18, "nome": "Corpo Vazio", "resumo": "Fica invisível e resiste a dano usando ki."}], "paladino": [{"level": 1, "nome": "Sentido Divino", "resumo": "Detecta bem e mal por usos limitados."}, {"level": 1, "nome": "Cura pelas Mãos", "resumo": "Reservatório de cura igual a 5 x nível."}, {"level": 2, "nome": "Estilo de Luta", "resumo": "Escolhe um estilo marcial."}, {"level": 2, "nome": "Conjuração Sagrada", "resumo": "Prepara magias paladinas."}, {"level": 2, "nome": "Golpe Divino", "resumo": "Gasta espaços para ampliar dano corpo a corpo."}, {"level": 3, "nome": "Saúde Divina", "resumo": "Imune a doenças."}, {"level": 3, "nome": "Juramento Sagrado", "resumo": "Escolhe sua subclasse de juramento."}, {"level": 5, "nome": "Ataque Extra", "resumo": "Dois ataques com a ação de Ataque."}, {"level": 11, "nome": "Golpe Divino Aprimorado", "resumo": "Todo ataque corpo a corpo causa dano radiante extra."}], "patrulheiro": [{"level": 1, "nome": "Inimigo Favorito", "resumo": "Escolhe criaturas nas quais é especialista."}, {"level": 1, "nome": "Explorador Nato", "resumo": "Escolhe terrenos preferidos com benefícios de viagem."}, {"level": 2, "nome": "Estilo de Luta", "resumo": "Escolhe um estilo de combate."}, {"level": 2, "nome": "Conjuração do Patrulheiro", "resumo": "Aprende magias de patrulheiro."}, {"level": 3, "nome": "Arquétipo de Patrulheiro", "resumo": "Escolhe sua subclasse de patrulheiro."}, {"level": 3, "nome": "Sentido Primevo", "resumo": "Percebe certos tipos de criatura usando espaço de magia."}, {"level": 5, "nome": "Ataque Extra", "resumo": "Dois ataques com a ação de Ataque."}, {"level": 8, "nome": "Passo pela Terra", "resumo": "Ignora parte das dificuldades naturais do terreno."}]};
const COMPLETE_SUBCLASS_FEATURE_PATCH = {"barbaro": {"berserker": [{"level": 10, "nome": "Presença Intimidadora", "resumo": "Pode amedrontar uma criatura com sua presença."}, {"level": 14, "nome": "Retaliação", "resumo": "Revida como reação quando sofre dano de um inimigo adjacente."}], "totem_urso": [{"level": 10, "nome": "Caminhante Espiritual", "resumo": "Conjura comunhão com a natureza como ritual."}, {"level": 14, "nome": "Sintonia Totêmica", "resumo": "Proteções superiores do espírito totêmico."}]}, "bardo": {"lore": [{"level": 6, "nome": "Segredos Mágicos Adicionais", "resumo": "Aprende magias fora da lista antes do normal."}, {"level": 14, "nome": "Perícia Incomparável", "resumo": "Usa inspiração em seus próprios testes de habilidade."}], "valor": [{"level": 6, "nome": "Ataque Extra", "resumo": "Dois ataques ao usar a ação de Ataque."}, {"level": 14, "nome": "Magia de Batalha", "resumo": "Após conjurar, pode atacar como ação bônus."}]}, "bruxo": {"imundo": [{"level": 10, "nome": "Resiliência Ígnea", "resumo": "Escolhe um tipo de dano para resistência após descanso."}, {"level": 14, "nome": "Lançar pelo Inferno", "resumo": "Bane temporariamente um inimigo ao inferno."}], "arquifada": [{"level": 10, "nome": "Defesas Enfeitiçantes", "resumo": "Reflete charme e evita ser enfeitiçado."}, {"level": 14, "nome": "Delírio Sombrio", "resumo": "Aprisiona a mente do alvo em ilusões feéricas."}]}, "clerigo": {"vida": [{"level": 6, "nome": "Curador Abençoado", "resumo": "Ao curar outros, também recupera PV."}, {"level": 8, "nome": "Golpe Divino", "resumo": "Ataques com arma causam dano radiante extra."}, {"level": 17, "nome": "Cura Suprema", "resumo": "Usa o máximo ao curar com magias apropriadas."}], "guerra": [{"level": 6, "nome": "Bênção do Deus da Guerra", "resumo": "Concede bônus de ataque a aliados próximos."}, {"level": 8, "nome": "Golpe Divino", "resumo": "Ataques com arma causam dano extra."}, {"level": 17, "nome": "Avatar da Batalha", "resumo": "Resistência a dano não mágico comum em combate."}]}, "druida": {"lua": [{"level": 10, "nome": "Forma Elemental", "resumo": "Gasta usos de forma selvagem para virar elemental."}, {"level": 14, "nome": "Mil Formas", "resumo": "Pode lançar alterar-se à vontade."}], "terra": [{"level": 6, "nome": "Passo da Terra", "resumo": "Move-se por terreno não mágico sem custo extra."}, {"level": 10, "nome": "Proteção da Natureza", "resumo": "Não pode ser enfeitiçado ou amedrontado por elementais e fadas."}, {"level": 14, "nome": "Santuário da Natureza", "resumo": "Criaturas naturais hesitam em atacá-lo."}]}, "feiticeiro": {"draconica": [{"level": 14, "nome": "Asas de Dragão", "resumo": "Ganha voo permanente ao invocar asas."}, {"level": 18, "nome": "Presença Dracônica", "resumo": "Aterroriza ou encanta criaturas próximas."}], "selvagem": [{"level": 14, "nome": "Caos Controlado", "resumo": "Rola novamente na tabela de surto selvagem quando apropriado."}, {"level": 18, "nome": "Bombardeio de Magias", "resumo": "Maximiza parte do dano de surtos adequados."}]}, "guerreiro": {"campeao": [{"level": 10, "nome": "Estilo de Luta Adicional", "resumo": "Escolhe outro estilo de luta."}, {"level": 15, "nome": "Crítico Superior", "resumo": "Crita com 18–20."}, {"level": 18, "nome": "Sobrevivente", "resumo": "Recupera PV no início do turno quando ferido."}], "mestre_batalha": [{"level": 7, "nome": "Conheça Seu Inimigo", "resumo": "Analisa capacidades de um alvo."}, {"level": 10, "nome": "Superioridade Aprimorada", "resumo": "Dados de superioridade se tornam d10."}, {"level": 15, "nome": "Retomar Fôlego", "resumo": "Recupera um dado de superioridade ao rolar iniciativa sem dados."}, {"level": 18, "nome": "Superioridade Suprema", "resumo": "Dados de superioridade se tornam d12."}]}, "ladino": {"ladrao": [{"level": 9, "nome": "Furtividade Suprema", "resumo": "Ganha vantagem em Furtividade ao se mover com cautela."}, {"level": 13, "nome": "Uso de Dispositivos Mágicos", "resumo": "Ignora restrições em itens mágicos."}, {"level": 17, "nome": "Reflexos do Ladrão", "resumo": "Pode usar dois turnos no primeiro round em certas situações."}], "assassino": [{"level": 13, "nome": "Impostor", "resumo": "Imita voz e aparência com eficiência."}, {"level": 17, "nome": "Golpe da Morte", "resumo": "Alvos surpreendidos sofrem testes severos contra dano massivo."}]}, "mago": {"evocacao": [{"level": 10, "nome": "Evocação Potencializada", "resumo": "Adiciona Inteligência ao dano de evocações adequadas."}, {"level": 14, "nome": "Supercanalização", "resumo": "Maximiza dano de evocações poderosas com risco."}], "abjuracao": [{"level": 10, "nome": "Abjuração Aprimorada", "resumo": "Adiciona proficiência a testes de dissipar/neutralizar."}, {"level": 14, "nome": "Resistência à Magia", "resumo": "Vantagem em salvaguardas contra magia e resistência a dano mágico."}]}, "monge": {"mao_aberta": [{"level": 11, "nome": "Tranquilidade", "resumo": "Age como se sob santuário após descanso longo."}, {"level": 17, "nome": "Palma Vibrante", "resumo": "Implanta vibrações letais em um alvo."}], "sombras": [{"level": 11, "nome": "Manto das Sombras", "resumo": "Fica invisível em luz fraca ou escuridão."}, {"level": 17, "nome": "Oportunista", "resumo": "Ataca como reação quando inimigos se distraem."}]}, "paladino": {"devocao": [{"level": 7, "nome": "Aura de Devoção", "resumo": "Aliados próximos não podem ser enfeitiçados."}, {"level": 15, "nome": "Pureza de Espírito", "resumo": "Sempre sob proteção contra bem e mal."}, {"level": 20, "nome": "Nimbus Sagrado", "resumo": "Irradia luz e dano radiante, protegendo aliados."}], "vinganca": [{"level": 7, "nome": "Vingador Implacável", "resumo": "Move-se após ataques de oportunidade bem-sucedidos."}, {"level": 15, "nome": "Alma da Vingança", "resumo": "Revida contra o alvo do voto."}, {"level": 20, "nome": "Anjo Vingador", "resumo": "Assume forma alada aterrorizante."}]}, "patrulheiro": {"cacador": [{"level": 11, "nome": "Multiataque", "resumo": "Escolhe uma técnica ofensiva avançada do caçador."}, {"level": 15, "nome": "Defesa Superior", "resumo": "Escolhe uma proteção final do caçador."}], "mestre_feras": [{"level": 11, "nome": "Fúria Bestial", "resumo": "O companheiro faz mais ataques."}, {"level": 15, "nome": "Compartilhar Magias", "resumo": "Magias lançadas em você também afetam o companheiro."}]}};
const CLASS_OPTION_RULES = {"bardo": [{"id": "bardo_expertise_3", "label": "Especialização (nível 3)", "minLevel": 3, "count": 2, "multiple": true, "options": ["Acrobacia", "Adestrar Animais", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"]}, {"id": "bardo_expertise_10", "label": "Especialização adicional (nível 10)", "minLevel": 10, "count": 2, "multiple": true, "options": ["Acrobacia", "Adestrar Animais", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"]}], "bruxo": [{"id": "bruxo_pacto", "label": "Dádiva do Pacto", "minLevel": 3, "count": 1, "multiple": false, "options": ["Lâmina do Pacto", "Livro das Sombras", "Cadeia do Pacto"]}, {"id": "bruxo_invocacoes", "label": "Invocações Místicas", "minLevel": 2, "countByLevel": [[2, 2], [5, 3], [7, 4], [9, 5], [12, 6], [15, 7], [18, 8]], "multiple": true, "options": ["Armadura das Sombras", "Rajada Agonizante", "Visão Diabólica", "Máscara de Muitas Faces", "Salto Sobrenatural", "Passos Ascendentes", "Fala da Besta", "Olhar Hipnótico", "Vigor Infernal", "Lâmina Sedenta", {"value": "Aperto de Hadar", "label": "Aperto de Hadar (pré-requisito: truque Rajada Mística)", "efeito": "Uma vez por turno, ao acertar uma criatura com Rajada Mística, puxa-a 3 m em linha reta na sua direção."}, {"value": "Arma de Pacto Aprimorada", "label": "Arma de Pacto Aprimorada (pré-requisito: Pacto da Lâmina)", "efeito": "A arma de pacto pode ser foco de magia. Ganha +1 em ataque e dano, salvo se já for arma mágica com bônus. Pode ser arco curto, arco longo, besta leve ou besta pesada."}, {"value": "Aspecto da Lua", "label": "Aspecto da Lua (pré-requisito: Pacto do Tomo)", "efeito": "Não precisa dormir. Para o descanso longo, basta passar 8 horas em atividades leves."}, {"value": "Dádiva das Profundezas", "label": "Dádiva das Profundezas (pré-requisito: 5º nível)", "efeito": "Respira debaixo d'água e ganha natação igual ao deslocamento. Conjura respirar na água uma vez sem gastar espaço, recuperável em descanso longo."}, {"value": "Destruição Mística", "label": "Destruição Mística (pré-requisito: 5º nível e Pacto da Lâmina)", "efeito": "Uma vez por turno, ao acertar com a arma de pacto, gasta espaço de magia para causar 1d8 de dano de energia extra, mais 1d8 por nível do espaço. Pode derrubar alvo Enorme ou menor."}, {"value": "Fuga do Escapista", "label": "Fuga do Escapista (pré-requisito: 7º nível)", "efeito": "Conjura movimentação livre em si mesmo uma vez sem gastar espaço. Recupera a capacidade em descanso longo."}, {"value": "Lança da Letargia", "label": "Lança da Letargia (pré-requisito: truque Rajada Mística)", "efeito": "Uma vez por turno, ao acertar com Rajada Mística, reduz o deslocamento do alvo em 3 m até o fim do seu próximo turno."}, {"value": "Maldição Enlouquecedora", "label": "Maldição Enlouquecedora (pré-requisito: 5º nível e magia ou característica de bruxo que amaldiçoe)", "efeito": "Ação bônus: causa dano psíquico ao alvo amaldiçoado (a até 9 m) e a criaturas escolhidas a até 1,5 m dele. Dano igual ao mod. de Carisma (mínimo 1)."}, {"value": "Maldição Incansável", "label": "Maldição Incansável (pré-requisito: 7º nível e magia ou característica de bruxo que amaldiçoe)", "efeito": "Ação bônus: teleporta-se até 9 m para espaço desocupado a até 1,5 m do alvo amaldiçoado, desde que consiga vê-lo."}, {"value": "Manto de Moscas", "label": "Manto de Moscas (pré-requisito: 5º nível)", "efeito": "Ação bônus: aura de 1,5 m com vantagem em Carisma (Intimidação) e desvantagem nos demais testes de Carisma. Criaturas que começam o turno na aura sofrem dano de veneno igual ao mod. de Carisma (mínimo 0). Uso: 1 vez por descanso curto ou longo."}, {"value": "Túmulo de Levisto", "label": "Túmulo de Levisto (pré-requisito: 5º nível)", "efeito": "Reação ao sofrer dano: ganha 10 PV temporários por nível de bruxo, que reduzem o dano. Até o gelo derreter no fim do próximo turno, fica vulnerável a fogo, com deslocamento 0 e incapacitado. Uso: 1 vez por descanso curto ou longo."}, {"value": "Olhar Fantasmagórico", "label": "Olhar Fantasmagórico (pré-requisito: 7º nível)", "efeito": "Ação: vê através de objetos sólidos a até 9 m por 1 minuto ou até perder a concentração. Uso: 1 vez por descanso curto ou longo."}, {"value": "Presente dos Sempre Vivos", "label": "Presente dos Sempre Vivos (pré-requisito: Pacto das Correntes)", "efeito": "Sempre que recuperar PV com o familiar a até 30 m, os dados rolados para isso valem o máximo."}, {"value": "Sudário das Sombras", "label": "Sudário das Sombras (pré-requisito: 15º nível)", "efeito": "Conjura invisibilidade à vontade, sem gastar espaço de magia."}]}], "feiticeiro": [{"id": "feiticeiro_metamagia", "label": "Metamagias", "minLevel": 3, "countByLevel": [[3, 2], [10, 3], [17, 4]], "multiple": true, "options": ["Acelerada", "Distante", "Estendida", "Sutil", "Cuidadosa", "Duplicada", "Potencializada", "Transmutada"]}], "guerreiro": [{"id": "guerreiro_estilo", "label": "Estilo de Luta", "minLevel": 1, "count": 1, "multiple": false, "options": ["Arquearia", "Defesa", "Duelo", "Luta com Arma Grande", "Proteção", "Combate com Duas Armas"]}], "ladino": [{"id": "ladino_expertise_1", "label": "Especialização inicial", "minLevel": 1, "count": 2, "multiple": true, "options": ["Acrobacia", "Adestrar Animais", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"]}, {"id": "ladino_expertise_6", "label": "Especialização adicional", "minLevel": 6, "count": 2, "multiple": true, "options": ["Acrobacia", "Adestrar Animais", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"]}], "mago": [{"id": "mago_truques_assinatura", "label": "Magias assinatura (registro livre)", "minLevel": 20, "count": 1, "multiple": false, "options": ["Definir manualmente no grimório/exportação"]}], "monge": [], "paladino": [{"id": "paladino_estilo", "label": "Estilo de Luta", "minLevel": 2, "count": 1, "multiple": false, "options": ["Defesa", "Duelo", "Luta com Arma Grande", "Proteção"]}], "patrulheiro": [{"id": "patrulheiro_inimigo_1", "label": "Inimigo Favorito inicial", "minLevel": 1, "count": 1, "multiple": false, "options": ["Aberrações", "Bestas", "Celestiais", "Constructos", "Dragões", "Elementais", "Feéricos", "Ínferos", "Gigantes", "Monstruosidades", "Limos", "Plantas", "Mortos-vivos", "Humanóides"]}, {"id": "patrulheiro_inimigo_6", "label": "Inimigo Favorito adicional", "minLevel": 6, "count": 1, "multiple": false, "options": ["Aberrações", "Bestas", "Celestiais", "Constructos", "Dragões", "Elementais", "Feéricos", "Ínferos", "Gigantes", "Monstruosidades", "Limos", "Plantas", "Mortos-vivos", "Humanóides"]}, {"id": "patrulheiro_inimigo_14", "label": "Inimigo Favorito adicional", "minLevel": 14, "count": 1, "multiple": false, "options": ["Aberrações", "Bestas", "Celestiais", "Constructos", "Dragões", "Elementais", "Feéricos", "Ínferos", "Gigantes", "Monstruosidades", "Limos", "Plantas", "Mortos-vivos", "Humanóides"]}, {"id": "patrulheiro_terreno_1", "label": "Explorador Nato inicial", "minLevel": 1, "count": 1, "multiple": false, "options": ["Ártico", "Costa", "Deserto", "Floresta", "Gramado", "Montanha", "Pântano", "Subterrâneo"]}, {"id": "patrulheiro_terreno_6", "label": "Explorador Nato adicional", "minLevel": 6, "count": 1, "multiple": false, "options": ["Ártico", "Costa", "Deserto", "Floresta", "Gramado", "Montanha", "Pântano", "Subterrâneo"]}, {"id": "patrulheiro_terreno_10", "label": "Explorador Nato adicional", "minLevel": 10, "count": 1, "multiple": false, "options": ["Ártico", "Costa", "Deserto", "Floresta", "Gramado", "Montanha", "Pântano", "Subterrâneo"]}, {"id": "patrulheiro_estilo", "label": "Estilo de Luta", "minLevel": 2, "count": 1, "multiple": false, "options": ["Arquearia", "Defesa", "Duelo", "Combate com Duas Armas"]}]};
const SUBCLASS_OPTION_RULES = {"barbaro:totem_urso": [{"id": "barbaro_totem_6", "label": "Aspecto da Besta", "minLevel": 6, "count": 1, "multiple": false, "options": ["Urso", "Águia", "Lobo"]}, {"id": "barbaro_totem_14", "label": "Sintonia Totêmica", "minLevel": 14, "count": 1, "multiple": false, "options": ["Urso", "Águia", "Lobo"]}], "barbaro:storm_herald": [{"id": "storm_herald_aura", "label": "Ambiente da Tempestade", "minLevel": 3, "count": 1, "multiple": false, "options": ["Deserto", "Mar", "Tundra"]}], "clerigo:vida": [], "clerigo:guerra": [], "druida:terra": [{"id": "druida_circulo_terra", "label": "Terreno do Círculo da Terra", "minLevel": 2, "count": 1, "multiple": false, "options": ["Ártico", "Costa", "Deserto", "Floresta", "Gramado", "Montanha", "Pântano", "Subterrâneo"]}], "druida:shepherd": [{"id": "shepherd_totem", "label": "Espírito Totêmico", "minLevel": 2, "count": 1, "multiple": false, "options": ["Urso", "Falcão", "Unicórnio"]}], "guerreiro:mestre_batalha": [{"id": "mestre_batalha_manobras_3", "label": "Manobras (nível 3)", "minLevel": 3, "countByLevel": [[3, 3], [7, 5], [10, 7], [15, 9]], "multiple": true, "options": ["Ataque de Precisão", "Ataque Desarmante", "Ataque de Comando", "Ataque de Empurrão", "Ataque de Varredura", "Manobra Evasiva", "Finta", "Golpe Amedrontador", "Reposte", "Aparar"]}], "guerreiro:arcane_archer": [{"id": "arcane_archer_shots", "label": "Opções de Flecha Arcana", "minLevel": 3, "countByLevel": [[3, 2], [7, 3], [10, 4], [15, 5], [18, 6]], "multiple": true, "options": ["Flecha do Banimento", "Flecha da Explosão", "Flecha do Agarrar", "Flecha do Enfraquecimento", "Flecha Perfurante", "Flecha Sombria", "Flecha da Sedução", "Flecha Perseguidora"]}, {"id": "arcane_archer_scholar", "label": "Conhecimento do Arqueiro Arcano", "minLevel": 3, "count": 1, "multiple": false, "options": ["Arcanismo", "Natureza"]}, {"id": "arcane_archer_cantrip", "label": "Truque da Tradição do Arqueiro Arcano", "minLevel": 3, "count": 1, "multiple": false, "options": ["Prestidigitação", "Druidismo"]}], "guerreiro:samurai": [{"id": "samurai_bonus_skill", "label": "Bônus de Proficiência", "minLevel": 3, "count": 1, "multiple": false, "options": ["História", "Intuição", "Atuação", "Persuasão"]}], "guerreiro:cavalier": [{"id": "cavalier_bonus_skill", "label": "Bônus de Proficiência", "minLevel": 3, "count": 1, "multiple": false, "options": ["Lidar com Animais", "História", "Intuição", "Atuação", "Persuasão"]}], "bardo:glamour": [{"id": "glamour_stage_style", "label": "Estilo de Performance Cativante", "minLevel": 3, "count": 1, "multiple": false, "options": ["Dança feérica", "Oratória encantadora", "Canção hipnótica", "Teatro ilusório"]}], "bardo:swords": [{"id": "swords_fighting_style", "label": "Estilo de Luta do Colégio das Espadas", "minLevel": 3, "count": 1, "multiple": false, "options": ["Duelo", "Combate com Duas Armas"]}, {"id": "swords_flourish_focus", "label": "Floreio favorito", "minLevel": 3, "count": 1, "multiple": false, "options": ["Defensivo", "Móvel", "Cortante"]}], "clerigo:forge": [{"id": "forge_blessing_target", "label": "Alvo da Benção da Forja", "minLevel": 1, "count": 1, "multiple": false, "options": ["Arma marcial", "Arma simples", "Armadura", "Escudo"]}], "clerigo:grave": [], "druida:dreams": [{"id": "dreams_hearth_theme", "label": "Tema da Lareira Onírica", "minLevel": 6, "count": 1, "multiple": false, "options": ["Refúgio feérico", "Sonhos proféticos", "Névoa protetora", "Trilha lunar"]}], "monge:kensei": [{"id": "kensei_brush_tool", "label": "Caminho do Pincel: ferramenta", "minLevel": 3, "count": 1, "multiple": false, "options": ["Suprimentos de caligrafia", "Ferramentas de pintor"]}, {"id": "kensei_weapons_3", "label": "Caminho do Kensei: armas Kensei (nível 3)", "minLevel": 3, "count": 2, "multiple": true, "options": ["Adaga", "Azagaia", "Arco Curto", "Arco Longo", "Besta de Mão", "Besta Leve", "Bordão", "Chicote", "Cimitarra", "Clava", "Dardo", "Espada Curta", "Espada Longa", "Florete", "Foice", "Funda", "Lança", "Machadinha", "Machado de Batalha", "Mangual", "Maça", "Maça Estrela", "Martelo de Guerra", "Martelo Leve", "Picareta de Guerra", "Tridente"]}, {"id": "kensei_weapons_6", "label": "Arma extra do Kensei (nível 6)", "minLevel": 6, "count": 1, "multiple": false, "options": ["Adaga", "Azagaia", "Arco Curto", "Arco Longo", "Besta de Mão", "Besta Leve", "Bordão", "Chicote", "Cimitarra", "Clava", "Dardo", "Espada Curta", "Espada Longa", "Florete", "Foice", "Funda", "Lança", "Machadinha", "Machado de Batalha", "Mangual", "Maça", "Maça Estrela", "Martelo de Guerra", "Martelo Leve", "Picareta de Guerra", "Tridente"]}, {"id": "kensei_weapons_11", "label": "Arma extra do Kensei (nível 11)", "minLevel": 11, "count": 1, "multiple": false, "options": ["Adaga", "Azagaia", "Arco Curto", "Arco Longo", "Besta de Mão", "Besta Leve", "Bordão", "Chicote", "Cimitarra", "Clava", "Dardo", "Espada Curta", "Espada Longa", "Florete", "Foice", "Funda", "Lança", "Machadinha", "Machado de Batalha", "Mangual", "Maça", "Maça Estrela", "Martelo de Guerra", "Martelo Leve", "Picareta de Guerra", "Tridente"]}, {"id": "kensei_weapons_17", "label": "Arma extra do Kensei (nível 17)", "minLevel": 17, "count": 1, "multiple": false, "options": ["Adaga", "Azagaia", "Arco Curto", "Arco Longo", "Besta de Mão", "Besta Leve", "Bordão", "Chicote", "Cimitarra", "Clava", "Dardo", "Espada Curta", "Espada Longa", "Florete", "Foice", "Funda", "Lança", "Machadinha", "Machado de Batalha", "Mangual", "Maça", "Maça Estrela", "Martelo de Guerra", "Martelo Leve", "Picareta de Guerra", "Tridente"]}], "paladino:conquest": [], "paladino:redemption": [], "patrulheiro:gloom_stalker": [], "patrulheiro:horizon_walker": [], "patrulheiro:monster_slayer": [], "patrulheiro:cacador": [{"id": "cacador_presa", "label": "Presa do Caçador", "minLevel": 3, "count": 1, "multiple": false, "options": ["Matador de Colossos", "Mata-gigantes", "Destruidor de Hordas"]}, {"id": "cacador_defesa", "label": "Tática Defensiva", "minLevel": 7, "count": 1, "multiple": false, "options": ["Escapar da Horda", "Defesa Contra Multiataque", "Pé de Aço"]}, {"id": "cacador_multiataque", "label": "Multiataque", "minLevel": 11, "count": 1, "multiple": false, "options": ["Ataque Giratório", "Voleio"]}, {"id": "cacador_defesa_suprema", "label": "Defesa Superior", "minLevel": 15, "count": 1, "multiple": false, "options": ["Esquiva Sobrenatural", "Evasão", "Resistir à Maré"]}], "feiticeiro:draconica": [{"id": "feiticeiro_linhagem_elemento", "label": "Ancestral dracônico", "minLevel": 1, "count": 1, "multiple": false, "options": ["Ácido", "Frio", "Fogo", "Relâmpago", "Veneno"]}], "feiticeiro:storm": [], "feiticeiro:divine_soul": [{"id": "divine_soul_affinity", "label": "Afinidade divina", "minLevel": 1, "count": 1, "multiple": false, "options": ["Bem", "Mal", "Ordem", "Caos", "Neutralidade"]}], "bruxo:celestial": [], "bruxo:hexblade": [{"id": "hexblade_cursed_weapon", "label": "Arma favorecida da Lâmina Maldita", "minLevel": 1, "count": 1, "multiple": false, "options": []}]};
const ADVANCED_RESOURCE_RULES = {"base": {"barbaro": [{"id": "furia", "nome": "Fúria", "recarga": "Descanso longo", "formula": "n<3?2:n<6?3:n<12?4:n<17?5:6"}], "bardo": [{"id": "inspiracao_bardo", "nome": "Inspiração de Bardo", "recarga": "n>=5?\"Descanso curto\":\"Descanso longo\"", "formula": "Math.max(1, mods.modCarisma)"}], "bruxo": [{"id": "espacos_pacto", "nome": "Espaços de Pacto", "recarga": "Descanso curto", "formula": "(SPELL_SLOTS.warlock[n]||[0])[0]||0"}, {"id": "arcanum_6", "nome": "Arcanum Místico 6º", "recarga": "Descanso longo", "formula": "n>=11?1:0"}, {"id": "arcanum_7", "nome": "Arcanum Místico 7º", "recarga": "Descanso longo", "formula": "n>=13?1:0"}, {"id": "arcanum_8", "nome": "Arcanum Místico 8º", "recarga": "Descanso longo", "formula": "n>=15?1:0"}, {"id": "arcanum_9", "nome": "Arcanum Místico 9º", "recarga": "Descanso longo", "formula": "n>=17?1:0"}], "clerigo": [{"id": "canalizar_divindade", "nome": "Canalizar Divindade", "recarga": "Descanso curto", "formula": "n>=18?3:n>=6?2:n>=2?1:0"}], "druida": [{"id": "forma_selvagem", "nome": "Forma Selvagem", "recarga": "Descanso curto", "formula": "n>=20?999:(n>=2?2:0)"}], "feiticeiro": [{"id": "pontos_feiticaria", "nome": "Pontos de Feitiçaria", "recarga": "Descanso longo", "formula": "n>=2?n:0"}], "guerreiro": [{"id": "segundo_folego", "nome": "Segundo Fôlego", "recarga": "Descanso curto ou longo", "formula": "1"}, {"id": "surto_acao", "nome": "Surto de Ação", "recarga": "Descanso curto", "formula": "n>=17?2:n>=2?1:0"}, {"id": "indomavel", "nome": "Indomável", "recarga": "Descanso longo", "formula": "n>=17?3:n>=13?2:n>=9?1:0"}], "ladino": [{"id": "ataque_furtivo", "nome": "Ataque Furtivo", "recarga": "Por turno", "formula": "n>=1?1:0"}], "mago": [{"id": "recuperacao_arcana", "nome": "Recuperação Arcana", "recarga": "Descanso longo", "formula": "1"}], "monge": [{"id": "ki", "nome": "Pontos de Ki", "recarga": "Descanso curto", "formula": "n>=2?n:0"}], "paladino": [{"id": "sentido_divino", "nome": "Sentido Divino", "recarga": "Descanso longo", "formula": "1 + mods.modCarisma"}, {"id": "cura_pelas_maos", "nome": "Cura pelas Mãos", "recarga": "Descanso longo", "formula": "5*n"}, {"id": "canalizar_divindade", "nome": "Canalizar Divindade", "recarga": "Descanso curto", "formula": "n>=3?1:0"}], "patrulheiro": [{"id": "sentido_primevo", "nome": "Sentido Primevo", "recarga": "Gasta espaço de magia", "formula": "n>=3?1:0"}]}, "sub": {"bruxo:arquifada": [{"id": "presenca_feerica", "nome": "Presença Feérica", "recarga": "Descanso curto", "formula": "n>=1?1:0"}, {"id": "fuga_nebulosa", "nome": "Fuga Nebulosa", "recarga": "Descanso curto", "formula": "n>=6?1:0"}], "clerigo:guerra": [{"id": "sacerdote_guerra", "nome": "Sacerdote de Guerra", "recarga": "Descanso longo", "formula": "Math.max(1, mods.modSabedoria)"}], "druida:terra": [{"id": "recuperacao_natural", "nome": "Recuperação Natural", "recarga": "Descanso longo", "formula": "n>=2?1:0"}], "feiticeiro:selvagem": [{"id": "mare_do_caos", "nome": "Maré do Caos", "recarga": "Especial", "formula": "n>=1?1:0"}], "guerreiro:mestre_batalha": [{"id": "dados_superioridade", "nome": "Dados de Superioridade", "recarga": "Descanso curto", "formula": "n>=15?6:n>=7?5:n>=3?4:0"}], "mago:abjuracao": [{"id": "protecao_arcana", "nome": "Proteção Arcana", "recarga": "Especial", "formula": "n>=2?(2*n + mods.modInteligencia):0"}], "paladino:devocao": [{"id": "arma_sagrada", "nome": "Arma Sagrada", "recarga": "Compartilha Canalizar Divindade", "formula": "n>=3?1:0"}], "paladino:vinganca": [{"id": "voto_inimizade", "nome": "Voto de Inimizade", "recarga": "Compartilha Canalizar Divindade", "formula": "n>=3?1:0"}], "druida:dreams": [{"id": "balm_summer_court", "nome": "Bálsamo da Corte de Verão", "recarga": "Descanso longo", "formula": "n>=2?n:0"}], "druida:shepherd": [{"id": "spirit_totem", "nome": "Espírito Totêmico", "recarga": "Descanso curto", "formula": "n>=2?1:0"}], "guerreiro:arcane_archer": [{"id": "arcane_shot", "nome": "Disparo Arcano", "recarga": "Descanso curto ou longo", "formula": "n>=3?2:0"}], "guerreiro:samurai": [{"id": "fighting_spirit", "nome": "Espírito Guerreiro", "recarga": "Descanso longo", "formula": "n>=3?3:0"}], "feiticeiro:divine_soul": [{"id": "favored_by_gods", "nome": "Favorecido pelos Deuses", "recarga": "Descanso curto ou longo", "formula": "n>=1?1:0"}], "feiticeiro:shadow": [{"id": "strength_of_grave", "nome": "Força do Túmulo", "recarga": "Descanso longo", "formula": "n>=1?1:0"}], "bruxo:celestial": [{"id": "healing_light", "nome": "Iluminação Curativa", "recarga": "Descanso longo", "formula": "n>=1?(1+n):0"}], "bruxo:hexblade": [{"id": "hexblades_curse", "nome": "Maldição da Lâmina Maldita", "recarga": "Descanso curto", "formula": "n>=1?1:0"}]}};

function dedupeFeatureList(lista){
  const mapa = new Map();
  (lista||[]).forEach(f=>{ if(f && f.nome) mapa.set(`${f.level}::${f.nome}`, f); });
  return [...mapa.values()].sort((a,b)=>(a.level-b.level) || a.nome.localeCompare(b.nome, 'pt-BR'));
}
Object.entries(COMPLETE_CLASS_FEATURE_PATCH).forEach(([classe, extras])=>{
  CLASS_FEATURES[classe] = dedupeFeatureList([...(CLASS_FEATURES[classe]||[]), ...extras]);
});
/* Correções do catálogo de habilidades de classe (auditoria): remove duplicatas por nome alternativo,
   traduz nomes em inglês e inclui habilidades do PHB que faltavam. Nomes e níveis conferidos no PHB 2014. */
const CLASS_FEATURE_FIXES = {
  remover:{
    barbaro:["Fúrias por descanso","Crítico Brutal (1 dado)"],
    bardo:["Especialização adicional","Segredos Mágicos Superiores"],
    bruxo:["Outro Patrono","Benção do Pacto"],
    clerigo:["Conjuração Divina","Destruir Mortos-Vivos (ND 1/2)"],
    druida:["Conjuração Druídica","Idioma Druídico","Forma Selvagem aprimorada","Aprimoramento de Conjuração"],
    feiticeiro:["Conjuração Inata","Fonte da Magia","Mais Pontos de Feitiçaria","Pontos de Feitiçaria ampliados"],
    mago:["Conjuração Arcana","Magias mais poderosas"],
    paladino:["Conjuração Sagrada","Mãos Curativas"],
    patrulheiro:["Conjuração do Patrulheiro"]
  },
  renomear:{ bardo:{"Jack of All Trades":"Pau pra Toda Obra"} },
  incluir:{
    monge:[
      {level:3,nome:"Desviar Projéteis",resumo:"Usa a reação para reduzir o dano de ataques à distância."},
      {level:7,nome:"Mente Tranquila",resumo:"Encerra enfeitiçado ou amedrontado em si mesmo com uma ação."},
      {level:13,nome:"Língua do Sol e da Lua",resumo:"Entende todos os idiomas falados e é entendido por qualquer criatura."},
      {level:15,nome:"Corpo Atemporal",resumo:"Não envelhece de forma mágica e dispensa comida e água."}
    ],
    ladino:[{level:15,nome:"Mente Escorregadia",resumo:"Proficiência em salvaguardas de Sabedoria."}],
    patrulheiro:[{level:18,nome:"Sentidos Selvagens",resumo:"Percebe criaturas invisíveis próximas e ataca sem desvantagem contra elas."}]
  }
};
Object.keys(CLASS_FEATURES).forEach(classe=>{
  const rem = new Set((CLASS_FEATURE_FIXES.remover[classe]||[]));
  const ren = CLASS_FEATURE_FIXES.renomear[classe]||{};
  const base = (CLASS_FEATURES[classe]||[]).filter(f=>!rem.has(f.nome)).map(f=>ren[f.nome]?Object.assign({},f,{nome:ren[f.nome]}):f);
  const lista = dedupeFeatureList([...base, ...(CLASS_FEATURE_FIXES.incluir[classe]||[])]);
  CLASS_FEATURES[classe] = lista.map((f,i)=>({f,i})).sort((a,b)=>(a.f.level-b.f.level)||(a.i-b.i)).map(x=>x.f);
});
/* Auditoria nível a nível (docs/AUDITORIA_DND5E_CLASSES.md): características e marcos de nível que a lista ainda não tinha.
   Fonte: SRD 5.1 (tabelas de classe). Os Aumentos de Valor de Habilidade não entram aqui: vêm de RULE_ASI_LEVELS (rules-engine.js). */
const CLASS_FEATURE_AUDIT_ADDS = {
  bardo:[
    {level:9,nome:"Canção de Descanso (d8)",resumo:"O dado de Canção de Descanso aumenta para d8."},
    {level:10,nome:"Dado de Inspiração d10",resumo:"Seu dado de Inspiração de Bardo aumenta para d10."},
    {level:13,nome:"Canção de Descanso (d10)",resumo:"O dado de Canção de Descanso aumenta para d10."},
    {level:14,nome:"Segredos Mágicos",resumo:"Aprende mais magias de outras listas."},
    {level:18,nome:"Segredos Mágicos",resumo:"Aprende mais magias de outras listas."},
    {level:15,nome:"Dado de Inspiração d12",resumo:"Seu dado de Inspiração de Bardo aumenta para d12."},
    {level:17,nome:"Canção de Descanso (d12)",resumo:"O dado de Canção de Descanso aumenta para d12."}
  ],
  clerigo:[{level:18,nome:"Canalizar Divindade adicional (3º uso)",resumo:"Ganha um terceiro uso de Canalizar Divindade entre descansos."}],
  druida:[
    {level:6,nome:"Traço do círculo",resumo:"O círculo druídico concede um benefício."},
    {level:14,nome:"Traço do círculo",resumo:"O círculo druídico concede um benefício."}
  ],
  feiticeiro:[{level:17,nome:"Metamagia adicional",resumo:"Aprende mais uma forma de alterar magias."}],
  guerreiro:[
    {level:13,nome:"Indomável (2 usos)",resumo:"Pode usar Indomável duas vezes por descanso longo."},
    {level:17,nome:"Indomável (3 usos)",resumo:"Pode usar Indomável três vezes por descanso longo."},
    {level:17,nome:"Surto de Ação (2 usos)",resumo:"Pode usar Surto de Ação duas vezes por descanso curto."}
  ],
  mago:[{level:14,nome:"Traço da tradição (nível 14)",resumo:"A tradição arcana concede um novo benefício."}],
  monge:[{level:9,nome:"Movimento sem Armadura aprimorado",resumo:"Pode se mover em superfícies verticais e sobre líquidos sem cair."}],
  paladino:[{level:18,nome:"Auras aprimoradas",resumo:"O alcance das suas auras aumenta."}],
  patrulheiro:[
    {level:6,nome:"Inimigo Favorito e Explorador Nato aprimorados",resumo:"Aumenta as escolhas de inimigo favorito e de terreno natural."},
    {level:10,nome:"Explorador Nato aprimorado",resumo:"Escolhe mais um terreno favorito."},
    {level:14,nome:"Inimigo Favorito aprimorado",resumo:"Escolhe mais um tipo de inimigo favorito."}
  ]
};
Object.keys(CLASS_FEATURE_AUDIT_ADDS).forEach(classe=>{
  CLASS_FEATURES[classe] = dedupeFeatureList([...(CLASS_FEATURES[classe]||[]), ...CLASS_FEATURE_AUDIT_ADDS[classe]]);
});

Object.entries(COMPLETE_SUBCLASS_FEATURE_PATCH).forEach(([classe, patch])=>{
  const bucket = SUBCLASS_OPTIONS[classe] || [];
  bucket.forEach(sub=>{
    const extras = patch[sub.key] || [];
    sub.features = dedupeFeatureList([...(sub.features||[]), ...extras]);
  });
});

function getOptionCountForGroup(group, nivel){
  if(!group) return 0;
  if(group.countByLevel){
    return group.countByLevel.reduce((acc, pair)=> nivel >= pair[0] ? pair[1] : acc, 0);
  }
  return group.count || 0;
}
function getNormalizedOptionValue(opt){ return typeof opt === 'string' ? opt : opt.value; }
function getNormalizedOptionLabel(opt){ return typeof opt === 'string' ? opt : (opt.label || opt.value); }
function getClassOptionGroups(classe, nivel, subclasse){
  const base = [...(CLASS_OPTION_RULES[classe] || [])];
  const sub = [...(SUBCLASS_OPTION_RULES[`${classe}:${subclasse}`] || [])];
  return [...base, ...sub].filter(group => (nivel||1) >= (group.minLevel || 1)).map(group => ({...group, count: getOptionCountForGroup(group, nivel||1)})).filter(group => group.count > 0);
}
function sanitizeClassOptionState(personagem){
  const groups = getClassOptionGroups(personagem.classe, personagem.nivel||1, personagem.subclasse);
  const current = personagem.opcoesClasse || {};
  const next = {};
  groups.forEach(group => {
    if(group.multiple){
      const values = [...new Set([].concat(current[group.id] || []).map(String))]
        .filter(v => (group.options||[]).some(opt => getNormalizedOptionValue(opt) === v))
        .slice(0, group.count);
      next[group.id] = values;
    } else {
      const value = Array.isArray(current[group.id]) ? current[group.id][0] : current[group.id];
      next[group.id] = (group.options||[]).some(opt => getNormalizedOptionValue(opt) === value) ? value : '';
    }
  });
  return next;
}
function describeSelectedClassOptions(personagem){
  const groups = getClassOptionGroups(personagem.classe, personagem.nivel||1, personagem.subclasse);
  const current = personagem.opcoesClasse || {};
  const linhas = [];
  groups.forEach(group => {
    const raw = current[group.id];
    const labels = group.multiple ? ([].concat(raw||[]).map(v => (group.options||[]).find(opt => getNormalizedOptionValue(opt) === v)).filter(Boolean).map(getNormalizedOptionLabel)) : (()=>{ const found=(group.options||[]).find(opt => getNormalizedOptionValue(opt) === raw); return found ? [getNormalizedOptionLabel(found)] : []; })();
    if(labels.length) linhas.push(`${group.label}: ${labels.join(', ')}`);
  });
  return linhas;
}
function getAllWeaponOptionLabels(){
  return Object.values(WEAPONS||{}).map(w=>w.nome).filter(Boolean).sort((a,b)=>a.localeCompare(b,'pt-BR'));
}
(function hydrateDynamicSubclassOptionRules(){
  const hex = (SUBCLASS_OPTION_RULES['bruxo:hexblade']||[]).find(group=>group.id==='hexblade_cursed_weapon');
  if(hex) hex.options = getAllWeaponOptionLabels().filter(nome => !Object.values(WEAPONS||{}).some(w => w.nome === nome && (w.propriedades||[]).some(p => /duas m/i.test(p))));
})();
function getSelectedClassOptionValue(personagem, optionId){
  return (personagem?.opcoesClasse||{})[optionId];
}
function getSubclassGrantedBenefits(personagem){
  const p = personagem || {};
  const nivel = Number(p.nivel||1);
  const key = `${p.classe||''}:${p.subclasse||''}`;
  const out = { proficiencias: [], pericias: [], ferramentas: [], saves: [] };
  const add=(bucket, values)=>{ [].concat(values||[]).filter(Boolean).forEach(v=>{ if(!out[bucket].includes(v)) out[bucket].push(v); }); };
  switch(key){
    case 'bardo:swords':
      if(nivel >= 3) add('proficiencias',['Armaduras médias','Cimitarras']);
      break;
    case 'clerigo:forge':
      if(nivel >= 1) add('proficiencias',['Armaduras pesadas']);
      break;
    case 'guerreiro:arcane_archer':
      if(nivel >= 3) add('pericias',[getSelectedClassOptionValue(p,'arcane_archer_scholar')]);
      break;
    case 'guerreiro:cavalier':
      if(nivel >= 3) add('pericias',[getSelectedClassOptionValue(p,'cavalier_bonus_skill')]);
      break;
    case 'guerreiro:samurai':
      if(nivel >= 3) add('pericias',[getSelectedClassOptionValue(p,'samurai_bonus_skill')]);
      break;
    case 'ladino:scout':
      if(nivel >= 3) add('pericias',['Natureza','Sobrevivência']);
      break;
    case 'monge:drunken_master':
      if(nivel >= 3){ add('pericias',['Atuação']); add('ferramentas',['Suprimentos de cervejeiro']); }
      break;
    case 'monge:kensei':
      if(nivel >= 3) add('ferramentas',[getSelectedClassOptionValue(p,'kensei_brush_tool')]);
      break;
    case 'patrulheiro:gloom_stalker':
      if(nivel >= 7) add('saves',['Sabedoria']);
      break;
    case 'bruxo:hexblade':
      if(nivel >= 1) add('proficiencias',['Armaduras médias','Escudos','Armas marciais']);
      break;
  }
  return out;
}
function getEffectiveClassProficiencies(personagem){
  const p = personagem || {};
  return [...new Set([...(p.proficienciasClasseBase || p.proficienciasClasse || []), ...getSubclassGrantedBenefits(p).proficiencias])];
}
function getEffectiveSaveProficiencies(personagem){
  const p = personagem || {};
  return [...new Set([...(p.savesClasseBase || p.savesClasse || []), ...getSubclassGrantedBenefits(p).saves])];
}
function getEffectiveFinalSkills(personagem){
  const p = personagem || {};
  return [...new Set([...(p.periciasFinais || []), ...getSubclassGrantedBenefits(p).pericias])];
}
function getEffectiveTools(personagem){
  const p = personagem || {};
  return [...new Set([...(p.ferramentas || []), ...getSubclassGrantedBenefits(p).ferramentas])];
}
function getHexbladeFavoredWeaponLabel(personagem){
  if((personagem?.classe !== 'bruxo') || (personagem?.subclasse !== 'hexblade')) return '';
  return getSelectedClassOptionValue(personagem,'hexblade_cursed_weapon') || '';
}
function compileResourceRule(rule, n, mods){
  const formula = typeof rule.formula === 'number' ? String(rule.formula) : String(rule.formula || '0');
  let recarga = typeof rule.recarga === 'function' ? rule.recarga(n, mods) : (String(rule.recarga||''));
  if(typeof rule.recarga === 'string' && /[?<>=]/.test(rule.recarga)){
    try { recarga = String(Function('n','mods', `return (${rule.recarga});`)(n, mods)); } catch(e) { recarga = 'Descanso longo'; }
  }
  let max = 0;
  try { max = Number(Function('n','mods','SPELL_SLOTS', `return (${formula});`)(n, mods, SPELL_SLOTS)); } catch(e) { max = 0; }
  return {id:rule.id,nome:rule.nome,max:Math.max(0, Math.floor(max)),atual:Math.max(0, Math.floor(max)),recarga,detalhe: rule.detalhe || ''};
}
function getClassResources(classe, nivel, personagem){
  if(getRulesEdition()==="2024" && typeof getClassResources2024==="function") return getClassResources2024(classe, nivel, personagem);
  const n = nivel || 1;
  const p = personagem || {};
  const mods = {
    modCarisma: calcularMod(((p.atributos||{}).carisma || 10)),
    modSabedoria: calcularMod(((p.atributos||{}).sabedoria || 10)),
    modInteligencia: calcularMod(((p.atributos||{}).inteligencia || 10))
  };
  const baseRules = (ADVANCED_RESOURCE_RULES.base[classe] || []).map(rule => ({...compileResourceRule(rule, n, mods), detalhe: getResourceDetail(rule.id, p, n)}));
  const subKey = `${classe}:${p.subclasse || ''}`;
  const subRules = (ADVANCED_RESOURCE_RULES.sub[subKey] || []).map(rule => ({...compileResourceRule(rule, n, mods), detalhe: getResourceDetail(rule.id, p, n)}));
  return [...baseRules, ...subRules].filter(r => r.max > 0);
}


function getBardicInspirationDie(nivel){
  if((nivel||1) >= 15) return 'd12';
  if((nivel||1) >= 10) return 'd10';
  if((nivel||1) >= 5) return 'd8';
  return 'd6';
}
function getRageDamageBonus(nivel){
  if((nivel||1) >= 16) return 4;
  if((nivel||1) >= 9) return 3;
  if((nivel||1) >= 1) return 2;
  return 0;
}
function getSneakAttackDice(nivel){
  const n = Math.max(1, Number(nivel||1));
  return `${Math.ceil(n/2)}d6`;
}
function getMartialArtsDie(nivel){
  if((nivel||1) >= 17) return '1d10';
  if((nivel||1) >= 11) return '1d8';
  if((nivel||1) >= 5) return '1d6';
  return '1d4';
}
function getChampionCritRange(personagem){
  const classe = personagem?.classe;
  const sub = personagem?.subclasse;
  const nivel = Number(personagem?.nivel||1);
  if(classe === 'guerreiro' && sub === 'campeao'){
    if(nivel >= 15) return '18-20';
    if(nivel >= 3) return '19-20';
  }
  return null;
}
function getBattleMasterDie(nivel){
  if((nivel||1) >= 18) return 'd12';
  if((nivel||1) >= 10) return 'd10';
  if((nivel||1) >= 3) return 'd8';
  return null;
}
function getWildShapeLimitText(personagem){
  const nivel = Number(personagem?.nivel||1);
  const sub = personagem?.subclasse;
  if(nivel < 2) return null;
  let cr = '1/4';
  if(sub === 'lua'){
    if(nivel >= 10) cr = '3';
    else if(nivel >= 8) cr = '2';
    else if(nivel >= 6) cr = '2';
    else if(nivel >= 4) cr = '1';
    else cr = '1';
  } else {
    if(nivel >= 8) cr = '1';
    else if(nivel >= 4) cr = '1/2';
  }
  return sub === 'lua'
    ? `Forma Selvagem de combate até ND ${cr} (sem voo antes do nível 8).`
    : `Forma Selvagem até ND ${cr} (sem natação antes do nível 4 e sem voo antes do nível 8).`;
}
function getWeaponCritDisplay(personagem, weapon){
  const championRange = getChampionCritRange(personagem);
  const mult = String(weapon?.critico || '20/x2').split('/')[1] || 'x2';
  if(championRange) return `${championRange}/${mult}`;
  return weapon?.critico || '20/x2';
}
function getDivineSmiteOptions(personagem){
  const espacos = personagem?.magia?.espacosAtuais || personagem?.magia?.espacos || [];
  const maior = espacos.reduce((acc, v, i)=> (v>0 ? i+1 : acc), 0);
  if(!maior) return null;
  const linhas = [];
  for(let slot=1; slot<=maior; slot++){
    const base = Math.min(5, slot+1);
    linhas.push(`${slot}º: ${base}d8 radiante`);
  }
  return linhas;
}
function getResourceDetail(id, personagem, nivel){
  const p = personagem || {};
  const n = Number(nivel||1);
  const map = {
    furia: `Dano extra atual: +${getRageDamageBonus(n)} e resistência a dano físico comum durante a fúria.`,
    inspiracao_bardo: `Dado atual: ${getBardicInspirationDie(n)}.`,
    espacos_pacto: `Todos os espaços de pacto ficam no maior círculo disponível do bruxo.`,
    canalizar_divindade: 'Compartilha o mesmo pool para Expulsar Mortos-Vivos e efeitos do domínio/juramento.',
    forma_selvagem: getWildShapeLimitText(p) || 'Transformação druídica conforme o nível.',
    pontos_feiticaria: 'Pode converter pontos em espaços e alterar magias com Metamagia.',
    segundo_folego: `Cura 1d10 + ${n} PV ao usar.`,
    surto_acao: 'Concede uma ação adicional no turno.',
    indomavel: 'Permite repetir uma salvaguarda falha.',
    ataque_furtivo: `Dano atual: ${getSneakAttackDice(n)}.`,
    recuperacao_arcana: `Recupera até ${Math.ceil(n/2)} níveis de espaço por dia.`,
    ki: `CD de Ki: ${8 + (p.bonusProficiencia||2) + calcularMod((p.atributos||{}).sabedoria||10)}.`,
    sentido_divino: 'Detecta celestiais, ínferos e mortos-vivos próximos.',
    cura_pelas_maos: 'Pool total de cura do paladino.',
    sentido_primevo: 'Usa espaço de magia para sentir criaturas específicas na região.',
    presenca_feerica: 'Controle de multidão em área curta.',
    fuga_nebulosa: 'Teleporte e invisibilidade reativos.',
    sacerdote_guerra: 'Ataque adicional como ação bônus em usos limitados.',
    recuperacao_natural: 'Recupera espaços em descanso curto, semelhante à Recuperação Arcana.',
    mare_do_caos: 'Vantagem pontual com chance de ativar surto selvagem.',
    dados_superioridade: `Dado atual: ${getBattleMasterDie(n) || 'd8'}.`,
    protecao_arcana: 'Escudo temporário da Tradição da Abjuração.',
    arma_sagrada: 'Usa Canalizar Divindade para energizar a arma.',
    voto_inimizade: 'Usa Canalizar Divindade para ganhar vantagem contra um alvo.',
    balm_summer_court: 'Pool de d6 feéricos para cura e PV temporários do Círculo dos Sonhos.',
    spirit_totem: 'Invoca um totem espiritual com aura de suporte; escolha registrada em opções da subclasse.',
    arcane_shot: 'Cada uso consome uma flecha arcana especial; as opções escolhidas ficam listadas nas escolhas de classe.',
    mantle_inspiration: 'Usa Inspiração de Bardo para conceder PV temporários e deslocamento reativo a aliados.',
    words_of_terror: 'Conversa prolongada para impor medo em um alvo vulnerável.',
    preserve_life_dreams: 'Tema onírico ativo do refúgio feérico selecionado nas escolhas.',
    fighting_spirit: 'Concede vantagem ofensiva e PV temporários por um turno.',
    favored_by_gods: 'Soma 2d4 a uma falha importante de ataque ou salvaguarda.',
    strength_of_grave: 'Pode evitar cair a 0 PV uma vez por descanso longo.',
    healing_light: 'Pool de cura em d6 do patrono celestial usado como ação bônus.',
    hexblades_curse: 'Marca um alvo para dano extra, crítico ampliado e cura ao derrotá-lo.'
  };
  return map[id] || '';
}

function modsSafeCha(personagem){ return Math.max(1, calcularMod(((personagem?.atributos)||{}).carisma || 10)); }

function getSpellSlotsSummary(personagem){
  const magia = personagem?.magia || {};
  const espacos = magia.espacos || [];
  const atuais = magia.espacosAtuais || [];
  return espacos.map((v,i)=>v?`${i+1}º ${atuais[i] ?? v}/${v}`:'').filter(Boolean);
}
function getDerivedEffects(personagem){
  const p = personagem || {};
  const n = Number(p.nivel||1);
  const out = [];
  if(!p.classe) return out;

  if(p.classe === 'barbaro'){
    out.push({id:'rage_bonus', titulo:'Fúria', valor:`+${getRageDamageBonus(n)} dano corpo a corpo com Força`, detalhe:'Bônus base da Fúria enquanto ativa.'});
    if(p.subclasse === 'berserker' && n >= 3) out.push({id:'frenesi', titulo:'Frenesi', valor:'1 ataque corpo a corpo extra como ação bônus', detalhe:'Disponível enquanto estiver em Fúria.'});
  }
  if(p.classe === 'bardo'){
    out.push({id:'bardic_die', titulo:'Inspiração de Bardo', valor:getBardicInspirationDie(n), detalhe:'Tamanho atual do dado de inspiração.'});
  }
  if(p.classe === 'bruxo'){
    const circle = SPELL_SLOTS.warlockCircle?.[n];
    if(circle) out.push({id:'pact_magic', titulo:'Magia de Pacto', valor:`Espaços de ${circle}º círculo`, detalhe:(getSpellSlotsSummary(p).join(' • ') || 'Sem espaços ativos')});
  }
  if(p.classe === 'clerigo'){
    const destroy = n >= 17 ? 'ND 4 ou menor' : n >= 14 ? 'ND 3 ou menor' : n >= 11 ? 'ND 2 ou menor' : n >= 8 ? 'ND 1 ou menor' : n >= 5 ? 'ND 1/2 ou menor' : null;
    if(destroy) out.push({id:'destroy_undead', titulo:'Destruir Mortos-Vivos', valor:destroy, detalhe:'Aplica-se quando Expulsar Mortos-Vivos afeta criaturas fracas o bastante.'});
  }
  if(p.classe === 'druida'){
    const wild = getWildShapeLimitText(p);
    if(wild) out.push({id:'wild_shape_limit', titulo:'Forma Selvagem', valor:wild, detalhe:'Resumo do limite de ND e locomoção.'});
  }
  if(p.classe === 'feiticeiro'){
    if(n >= 2) out.push({id:'sorcery_points', titulo:'Conversão Arcana', valor:`Até ${n} pontos de feitiçaria`, detalhe:'Pode converter pontos em espaços ou espaços em pontos conforme as regras da classe.'});
  }
  if(p.classe === 'guerreiro'){
    const crit = getChampionCritRange(p);
    if(crit) out.push({id:'champion_crit', titulo:'Faixa de crítico', valor:crit, detalhe:'Aplica-se aos ataques de arma do Campeão.'});
    if(p.subclasse === 'mestre_batalha' && n >= 3){
      const die = getBattleMasterDie(n);
      const mans = describeSelectedClassOptions(p).find(v=>v.startsWith('Manobras')) || 'Manobras ainda não selecionadas.';
      out.push({id:'superiority', titulo:'Superioridade em Combate', valor:`Dados ${die}`, detalhe:mans});
    }
  }
  if(p.classe === 'ladino'){
    out.push({id:'sneak_attack', titulo:'Ataque Furtivo', valor:getSneakAttackDice(n), detalhe:'1 vez por turno quando cumprir as condições da classe.'});
    if(p.subclasse === 'assassino' && n >= 3) out.push({id:'assassinate', titulo:'Assassinar', valor:'vantagem contra alvos que ainda não agiram', detalhe:'Criaturas surpreendidas sofrem crítico automático ao serem atingidas.'});
  }
  if(p.classe === 'mago' && n >= 1) out.push({id:'arcane_recovery', titulo:'Recuperação Arcana', valor:`até ${Math.ceil(n/2)} níveis de espaço`, detalhe:'Uma vez por dia, após descanso curto.'});
  if(p.classe === 'mago' && p.subclasse === 'war_magic' && n >= 2) out.push({id:'war_magic_init', titulo:'Astúcia Tática', valor:valorFormatadoBonus(calcularMod((p.atributos||{}).inteligencia||10)), detalhe:'Bônus adicional de Inteligência na iniciativa.'});
  if(p.classe === 'monge'){
    out.push({id:'martial_arts', titulo:'Artes Marciais', valor:getMartialArtsDie(n), detalhe:'Dado atual para ataques desarmados/armas de monge e ação bônus desarmada.'});
    if(n >= 5) out.push({id:'stunning_strike', titulo:'Golpe Atordoante', valor:`CD ${8 + (p.bonusProficiencia||2) + calcularMod((p.atributos||{}).sabedoria||10)}`, detalhe:'Constituição nega o atordoamento.'});
  }
  if(p.classe === 'paladino'){
    if(p.subclasse === 'conquest' && n >= 7) out.push({id:'aura_conquest', titulo:'Aura da Conquista', valor:'0 deslocamento para amedrontados', detalhe:'Criaturas amedrontadas dentro da aura ficam presas e sofrem dano psíquico.'});
    if(p.subclasse === 'redemption' && n >= 7) out.push({id:'aura_guardian', titulo:'Aura do Guardião', valor:'Pode absorver dano de aliados', detalhe:'Reação defensiva contínua do Juramento da Redenção.'});
    const aura = calcularMod((p.atributos||{}).carisma || 10);
    if(n >= 6) out.push({id:'aura_protection', titulo:'Aura de Proteção', valor:valorFormatadoBonus(aura), detalhe:'Bônus em testes de resistência para você e aliados próximos.'});
    if(n >= 2){
      const smite = getDivineSmiteOptions(p);
      out.push({id:'divine_smite', titulo:'Golpe Divino', valor:(smite || ['Sem espaço de magia disponível']).join(' • '), detalhe:'Dano base contra alvos comuns; some +1d8 contra mortos-vivos e ínferos.'});
    }
  }
  if(p.classe === 'patrulheiro'){
    if(p.subclasse === 'gloom_stalker' && n >= 3) out.push({id:'dread_ambusher', titulo:'Emboscador Assombroso', valor:'+10 pés e 1 ataque extra no primeiro turno', detalhe:'Também adiciona dano extra ao primeiro impacto da rodada inicial.'});
    if(p.subclasse === 'horizon_walker' && n >= 3) out.push({id:'planar_warrior', titulo:'Guerreiro Planar', valor:'Converte dano em força', detalhe:'Amplia um ataque por turno e o torna mais confiável contra resistências.'});
    if(p.subclasse === 'monster_slayer' && n >= 3) out.push({id:'slayer_prey', titulo:'Nêmesis do Matador', valor:'d6 extra por turno', detalhe:'Foco especializado em uma presa importante.'});
    const opts = describeSelectedClassOptions(p).filter(v=>v.startsWith('Inimigo Favorito') || v.startsWith('Terreno Favorito') || v.startsWith('Presa do Caçador') || v.startsWith('Opções de Flecha Arcana') || v.startsWith('Armas do Kensei') || v.startsWith('Ambiente da Tempestade') || v.startsWith('Espírito Totêmico'));
    if(opts.length) out.push({id:'favored', titulo:'Especializações e escolhas', valor:opts.join(' • '), detalhe:'Resumo das escolhas que afetam exploração, combate e recursos.'});
  }
  if(p.classe === 'bardo' && p.subclasse === 'whispers' && n >= 3) out.push({id:'psychic_blades', titulo:'Lâminas Psíquicas', valor:`${Math.ceil((n+1)/2)}d6`, detalhe:'Gasta Inspiração de Bardo para causar dano psíquico adicional.'});
  if(p.classe === 'druida' && p.subclasse === 'dreams' && n >= 2) out.push({id:'dreams_balm', titulo:'Bálsamo da Corte de Verão', valor:`pool ${n}d6`, detalhe:'Cura e concede PV temporários como ação bônus.'});
  if(p.classe === 'druida' && p.subclasse === 'dreams' && n >= 6) out.push({id:'dreams_hearth', titulo:'Lareira ao Luar e Sombra', valor:(describeSelectedClassOptions(p).find(v=>v.startsWith('Tema da Lareira Onírica')) || 'Tema pendente'), detalhe:'Resume a atmosfera protetora escolhida para os descansos seguros do círculo.'});
  if(p.classe === 'guerreiro' && p.subclasse === 'arcane_archer' && n >= 3) out.push({id:'arcane_archer_shots', titulo:'Disparo Arcano', valor:'2 usos por descanso curto ou longo', detalhe:(describeSelectedClassOptions(p).find(v=>v.startsWith('Opções de Flecha Arcana')) || 'Escolha as flechas arcanas disponíveis.')});
  if(p.classe === 'guerreiro' && p.subclasse === 'samurai' && n >= 3) out.push({id:'samurai_spirit', titulo:'Espírito Guerreiro', valor:'3 usos por descanso longo', detalhe:'Vantagem em ataques do turno e 5 PV temporários (10 no 10º nível e 15 no 15º).'});
  if(p.classe === 'monge' && p.subclasse === 'kensei' && n >= 3) out.push({id:'kensei_weapons', titulo:'Armas do Kensei', valor:(describeSelectedClassOptions(p).filter(v=>v.startsWith('Armas do Kensei') || v.startsWith('Arma extra do Kensei')).join(' • ') || 'Escolhas de arma pendentes.'), detalhe:'Essas armas viram a base do estilo do kensei.'});
  if(p.classe === 'feiticeiro' && p.subclasse === 'divine_soul' && n >= 1) out.push({id:'divine_soul_affinity', titulo:'Afinidade Divina', valor:(describeSelectedClassOptions(p).find(v=>v.startsWith('Afinidade divina')) || 'Afinidade pendente'), detalhe:(describeSelectedClassOptions(p).find(v=>v.startsWith('Magia favorecida da Alma Divina')) || 'Ajuda a determinar o viés da magia adicional da Alma Divina.')} );
  if(p.classe === 'bruxo' && p.subclasse === 'celestial' && n >= 1) out.push({id:'celestial_pool', titulo:'Iluminação Curativa', valor:`pool ${1+n}d6`, detalhe:'Cura à distância com ação bônus.'} );
  if(p.classe === 'bruxo' && p.subclasse === 'hexblade' && n >= 1) out.push({id:'hex_weapon', titulo:'Arma favorecida', valor:(describeSelectedClassOptions(p).find(v=>v.startsWith('Arma favorecida da Lâmina Maldita')) || 'Escolha pendente'), detalhe:'Referência rápida da arma ligada ao pacto marcial.'});
  if(p.classe === 'bardo' && p.subclasse === 'glamour' && n >= 3) out.push({id:'glamour_mantle', titulo:'Manto da Inspiração', valor:`${Math.max(1, modsSafeCha(p))} alvo(s) sugerido(s)`, detalhe:`${describeSelectedClassOptions(p).find(v=>v.startsWith('Estilo de Performance Cativante')) || 'Performance especial pendente.'}`});
  if(p.classe === 'bardo' && p.subclasse === 'whispers' && n >= 3) out.push({id:'whispers_words', titulo:'Palavras de Terror', valor:'pressão social e medo', detalhe:'Excelente para infiltração, interrogatório e manipulação fora de combate.'});
  if(p.classe === 'bardo' && p.subclasse === 'swords' && n >= 3) out.push({id:'swords_flourish', titulo:'Floreio de Lâmina', valor:(describeSelectedClassOptions(p).find(v=>v.startsWith('Estilo de Luta do Colégio das Espadas')) || 'Estilo de luta pendente'), detalhe:'Os floreios gastam Inspiração de Bardo para melhorar dano, defesa ou mobilidade.'});
  if(p.classe === 'clerigo' && p.subclasse === 'forge' && n >= 1) out.push({id:'forge_blessing', titulo:'Benção da Forja', valor:'+1 em arma ou armadura não mágica', detalhe:(describeSelectedClassOptions(p).find(v=>v.startsWith('Alvo da Benção da Forja')) || 'Escolha renovada a cada descanso longo.')} );
  if(p.classe === 'clerigo' && p.subclasse === 'grave' && n >= 1) out.push({id:'grave_mortality', titulo:'Círculo da Mortalidade', valor:'cura máxima em alvos caídos', detalhe:'Magias de cura em criaturas com 0 PV recuperam o máximo possível.'});
  if(p.classe === 'druida' && p.subclasse === 'shepherd' && n >= 6) out.push({id:'mighty_summoner', titulo:'Invocações Poderosas', valor:'+2 PV por dado de vida do convocado', detalhe:'Fortalece criaturas invocadas por suas magias.'});
  if(p.classe === 'guerreiro' && p.subclasse === 'cavalier' && n >= 3) out.push({id:'unwavering_mark', titulo:'Marca Inabalável', valor:'pressiona inimigos marcados', detalhe:'Punem alvos que ignorem sua presença defensiva na linha de frente.'});
  if(p.classe === 'monge' && p.subclasse === 'sun_soul' && n >= 3) out.push({id:'radiant_sun_bolt', titulo:'Rajada Solar Radiante', valor:getMartialArtsDie(n), detalhe:'Ataque radiante à distância que escala com o dado marcial do monge.'});
  if(p.classe === 'feiticeiro' && p.subclasse === 'storm' && n >= 1) out.push({id:'tempestuous_magic', titulo:'Magia Tempestuosa', valor:'voo curto após conjurar', detalhe:(describeSelectedClassOptions(p).find(v=>v.startsWith('Sinal da magia da tempestade')) || 'Permite reposicionamento aéreo seguro depois de lançar magia de 1º círculo ou maior.')} );
  if(p.classe === 'bruxo' && p.subclasse === 'celestial' && n >= 6) out.push({id:'radiant_soul', titulo:'Alma Radiante', valor:valorFormatadoBonus(calcularMod((p.atributos||{}).carisma||10)), detalhe:'Resistência a dano radiante. Soma Carisma ao dano radiante ou de fogo de magias.'});
  if(p.classe === 'bruxo' && p.subclasse === 'hexblade' && n >= 1) out.push({id:'hex_warrior', titulo:'Guerreiro Maldito', valor:'Carisma com a arma favorecida', detalhe:'A arma escolhida (sem duas mãos) usa Carisma em ataque e dano. Também ganha armadura média, escudos e armas marciais.'});
  return out;
}


const SPELL_SHORT_DESCRIPTIONS = {
  "Absorver Elementos":"Reduz dano elemental recebido e fortalece seu próximo ataque corpo a corpo com o mesmo elemento.",
  "Catapulta":"Arremessa um objeto com força mágica para atingir uma criatura à distância.",
  "Causar Medo":"Projeta terror sobrenatural que força o alvo a fugir ou hesitar.",
  "Raio do Caos":"Disparo instável de energia que pode saltar entre tipos de dano aleatórios.",
  "Faca de Gelo":"Projétil congelante que fere um alvo e explode em estilhaços gelados.",
  "Lâmina Sombria":"Cria uma arma de sombras concentradas, forte em pouca luz ou escuridão.",
  "Passo Trovejante":"Teleporte curto acompanhado por uma explosão de trovão ao redor do ponto de partida.",
  "Espírito Curativo":"Invoca energia restauradora móvel que cura aliados por curtos períodos.",
  "Ataque Zéfiro":"Aumenta mobilidade e reforça um ataque com impulso de vento sobrenatural.",
  "Dobre dos Mortos":"Cantrip necrótico especialmente eficaz contra inimigos já feridos.",
  "Criar Fogueira":"Conjura uma chama controlada útil para dano leve e utilidade de cenário.",
  "Moldar Terra":"Move e remodela pequenas porções de solo e pedra para utilidade criativa.",
  "Controlar Chamas":"Altera forma, alcance ou brilho de fontes de fogo não mágicas.",
  "Rajada Trovejante":"Descarga sonora curta que empurra e pune alvos próximos.",
  "Mordida Gélida":"Ataque gélido que enfraquece o próximo golpe do inimigo.",
  "Esfera Aquosa":"Prende e desloca criaturas dentro de uma massa de água mágica.",
  "Esfera Tempestuosa":"Orbe de vento e relâmpago que danifica e controla espaço no campo de batalha.",
  "Estática Sináptica":"Explosão psíquica poderosa que enfraquece ofensiva e concentração dos inimigos.",
  "Distante Passo":"Teleporte repetido por vários turnos, excelente para reposicionamento.",
  "Transmutar Rocha":"Converte pedra em lama ou lama em pedra para controlar terreno.",
  "Golpe do Vento Cortante":"Rajada de vento afiado que causa dano em área e exige resistência física.",
  "Pirotecnia":"Transforma fogo existente em explosão ofuscante ou cortina de fumaça.",
  "Vento Protetor":"Muralha giratória de vento que desvia projéteis e protege o conjurador.",
  "Sopro do Dragão":"Concede a uma criatura um cone elemental repetível por alguns turnos.",
  "Espinho Mental":"Dor psíquica que reduz reações e pune escolhas do alvo.",
  "Onda de Maré":"Onda de água que derruba e desloca criaturas em linha.",
  "Nevasca de Snilloc":"Rajada congelante em área que dificulta avanço inimigo.",
  "Chamuscar de Aganazzar":"Linha de fogo concentrada útil para corredores e grupos alinhados.",
  "Palavra de Poder Dor":"Golpe verbal absoluto que sobrecarrega um alvo com sofrimento intenso.",
  "Metamorfose Verdadeira":"Transformação suprema e duradoura em criatura ou objeto poderoso.",
  "Curar Ferimentos":"Restaura pontos de vida com toque mágico direto.",
  "Palavra Curativa":"Cura rápida à distância, ideal para levantar aliados em perigo.",
  "Bênção":"Melhora ataques e testes de resistência de vários aliados por concentração.",
  "Escudo":"Reação defensiva que eleva a CA e nega Mísseis Mágicos.",
  "Mísseis Mágicos":"Projéteis certeiros de energia arcana que não exigem ataque.",
  "Passo Nebuloso":"Teleporte curto extremamente versátil para escapar ou reposicionar.",
  "Invisibilidade":"Oculta uma criatura até que ataque, conjure ou a magia termine.",
  "Bola de Fogo":"Explosão clássica em área com alto dano de fogo.",
  "Contramágica":"Interrompe ou dissipa magias no momento da conjuração.",
  "Arma Espiritual":"Invoca arma flutuante que ataca sem exigir concentração.",
  "Marca do Caçador":"Marca um alvo para causar dano extra repetido em ataques.",
  "Hex":"Amaldiçoa um alvo para dano extra e desvantagem em uma habilidade escolhida."
};

function inferSpellSourceBook(name, classe){
  return spellIsFromXanathar(name, classe) ? 'XGtE' : 'PHB';
}

function buildSpellAutoSummary(name, detail, classe){
  const tags = [];
  if(detail?.ritual) tags.push('ritual');
  if(detail?.concentracao) tags.push('concentração');
  if(detail?.duracao) tags.push(`duração ${String(detail.duracao).toLowerCase()}`);
  const source = inferSpellSourceBook(name, classe);
  const src = source === 'XGtE' ? 'Xanathar' : 'PHB';
  return `Magia da lista de ${classe || 'conjurador'}; ${tags.join(', ') || 'uso padrão'}; fonte ${src}.`;
}

function getSpellDetailForCharacter(classe, name, subclasse=null, nivel=1){
  const clean = String(name || '').replace(/\s*\((\d)º? círculo\)/i, '').trim();
  const byClass = (SPELL_DETAILS[classe] || {});
  let found = null;
  Object.values(byClass).some(bucket => {
    if(bucket && bucket[clean]){
      found = { ...bucket[clean] };
      return true;
    }
    return false;
  });
  if(!found){
    Object.values(SPELL_DETAILS).some(classBuckets => Object.values(classBuckets || {}).some(bucket => {
      if(bucket && bucket[clean]){
        found = { ...bucket[clean] };
        return true;
      }
      return false;
    }));
  }
  const source = inferSpellSourceBook(clean, classe);
  const circleMatch = String(name || '').match(/\((\d)º? círculo\)/i);
  const circle = circleMatch ? Number(circleMatch[1]) : (found?.circulo ?? null);
  const summary = SPELL_SHORT_DESCRIPTIONS[clean] || buildSpellAutoSummary(clean, found, classe);
  return {
    nome: clean,
    circulo: circle,
    escola: found?.escola || 'Variada',
    ritual: !!found?.ritual,
    concentracao: !!found?.concentracao,
    duracao: found?.duracao || 'Conforme magia',
    fonte: source,
    resumo: summary,
    classesRelacionadas: [classe].filter(Boolean)
  };
}


/* ===== Tipo de ficha: D&D 5e (2014, PHB + Xanathar) × D&D 2024 (5.5, Livro do Jogador 2024) =====
   Os catálogos BACKGROUNDS e RACES são trocados no lugar quando a edição muda (aplicarCatalogoRegras),
   assim toda a interface e a validação continuam lendo as mesmas variáveis. */
const RULESETS = {
  "2014":{label:"D&D 5e (2014) — PHB + Xanathar",livro:"PHB",curto:"5e 2014"},
  "2024":{label:"D&D 2024 (5.5) — Livro do Jogador 2024",livro:"PHB 2024",curto:"2024 (5.5)"}
};
function getRulesEdition(){ return (typeof state!=="undefined" && state && state.regras==="2024") ? "2024" : "2014"; }
/* Avisos da edição 2024 (usados por ui.js e validator.js). O 2024 tem classes do SRD 5.2 desde rules-2024-classes.js. */
const AVISO_CLASSES_2024 = "O 2024 usa só o SRD 5.2: uma subclasse por classe, sem listas de magia 2024 (as magias escolhíveis ainda são as do 2014) e sem talentos 2024 ainda. O equipamento inicial também segue o 2014.";
const AVISO_CONFERENCIA_2024 = "Dados das classes conferidos no espelho do SRD 5.2; a conferência com o PDF oficial está pendente. Itens marcados como NÃO VERIFICADO não foram confirmados em segunda fonte.";

const BACKGROUNDS_2014 = JSON.parse(JSON.stringify(BACKGROUNDS));
const RACES_2014 = JSON.parse(JSON.stringify(RACES));

/* 2024: o antecedente dá +2/+1 ou +1/+1/+1 entre 3 atributos, 1 talento de origem, 2 perícias e 1 ferramenta;
   a espécie não dá bônus de atributo. Todo personagem conhece Comum e mais 2 idiomas à escolha. */
function _bg24(nome,atributos,talento,pericias,ferramentas){ return {nome,pericias,idiomas:2,ferramentas,caracteristica:"Talento de origem: "+talento,atributosOpcoes:atributos,talentoOrigem:talento}; }
const BACKGROUNDS_2024 = {
  acolito:_bg24("Acólito",["inteligencia","sabedoria","carisma"],"Iniciado em Magia (Clérigo)",["Intuição","Religião"],["Suprimentos de calígrafo"]),
  artesao:_bg24("Artesão",["forca","destreza","inteligencia"],"Artífice",["Investigação","Persuasão"],["Ferramentas de artesão (uma à escolha)"]),
  artista:_bg24("Artista",["forca","destreza","carisma"],"Músico",["Acrobacia","Atuação"],["Instrumento musical (um à escolha)"]),
  charlatao:_bg24("Charlatão",["destreza","constituicao","carisma"],"Habilidoso",["Enganação","Prestidigitação"],["Kit de falsificação"]),
  criminoso:_bg24("Criminoso",["destreza","constituicao","inteligencia"],"Alerta",["Prestidigitação","Furtividade"],["Ferramentas de ladrão"]),
  eremita:_bg24("Eremita",["constituicao","sabedoria","carisma"],"Curandeiro",["Medicina","Religião"],["Kit de herbalismo"]),
  fazendeiro:_bg24("Fazendeiro",["forca","constituicao","sabedoria"],"Durão",["Adestrar Animais","Natureza"],["Ferramentas de carpinteiro"]),
  guarda:_bg24("Guarda",["forca","inteligencia","sabedoria"],"Alerta",["Atletismo","Percepção"],["Conjunto de jogo (um à escolha)"]),
  guia:_bg24("Guia",["destreza","constituicao","sabedoria"],"Iniciado em Magia (Druida)",["Furtividade","Sobrevivência"],["Ferramentas de cartógrafo"]),
  marinheiro:_bg24("Marinheiro",["forca","destreza","sabedoria"],"Brigão de Taverna",["Acrobacia","Percepção"],["Ferramentas de navegador"]),
  mercador:_bg24("Mercador",["constituicao","inteligencia","carisma"],"Sortudo",["Adestrar Animais","Persuasão"],["Ferramentas de navegador"]),
  nobre:_bg24("Nobre",["forca","inteligencia","carisma"],"Habilidoso",["História","Persuasão"],["Conjunto de jogo (um à escolha)"]),
  sabio:_bg24("Sábio",["constituicao","inteligencia","sabedoria"],"Iniciado em Magia (Mago)",["Arcanismo","História"],["Suprimentos de calígrafo"]),
  escriba:_bg24("Escriba",["destreza","inteligencia","sabedoria"],"Habilidoso",["Investigação","Percepção"],["Suprimentos de calígrafo"]),
  soldado:_bg24("Soldado",["forca","destreza","constituicao"],"Atacante Selvagem",["Atletismo","Intimidação"],["Conjunto de jogo (um à escolha)"]),
  viajante:_bg24("Viajante",["destreza","sabedoria","carisma"],"Sortudo",["Intuição","Furtividade"],["Ferramentas de ladrão"])
};
function _sp24(nome,desloc,traits){ return {nome,bonusAtributos:{},idiomas:["Comum"],traits,deslocamento:desloc}; }
const RACES_2024 = {
  aasimar:_sp24("Aasimar",30,["Resistência Celestial","Visão no Escuro","Mãos Curativas","Portador da Luz","Revelação Celestial"]),
  draconato:_sp24("Draconato",30,["Ancestral Dracônico","Arma de Sopro","Resistência a Dano","Visão no Escuro","Voo Dracônico"]),
  anao:_sp24("Anão",30,["Visão no Escuro","Resiliência Anã","Robustez Anã","Perícia com Pedras"]),
  elfo:_sp24("Elfo",30,["Visão no Escuro","Ancestral Feérico","Linhagem Élfica","Sentidos Aguçados","Transe"]),
  gnomo:_sp24("Gnomo",30,["Visão no Escuro","Astúcia Gnômica","Linhagem Gnômica"]),
  golias:_sp24("Golias",35,["Ancestral Gigante","Forma Grande","Compleição Poderosa"]),
  halfling:_sp24("Halfling",30,["Bravura","Agilidade Halfling","Sorte Halfling","Furtividade Natural"]),
  humano:_sp24("Humano",30,["Engenhoso","Habilidoso","Versátil"]),
  orc:_sp24("Orc",30,["Surto de Adrenalina","Visão no Escuro","Resistência Implacável"]),
  tiefling:_sp24("Tiefling",30,["Visão no Escuro","Legado Ínfero","Presença Sobrenatural"])
};

function _trocarCatalogo(alvo, origem){
  Object.keys(alvo).forEach(k => delete alvo[k]);
  Object.entries(JSON.parse(JSON.stringify(origem))).forEach(([k,v]) => alvo[k]=v);
}
/* Troca BACKGROUNDS/RACES de acordo com a edição escolhida. Idempotente. */
function aplicarCatalogoRegras(edicao){
  const ed = edicao==="2024" ? "2024" : "2014";
  if(aplicarCatalogoRegras._atual === ed) return ed;
  _trocarCatalogo(BACKGROUNDS, ed==="2024" ? BACKGROUNDS_2024 : BACKGROUNDS_2014);
  _trocarCatalogo(RACES, ed==="2024" ? RACES_2024 : RACES_2014);
  if(typeof aplicarDadosClasses2024 === "function") aplicarDadosClasses2024(ed); // classes, subclasses e conjuração (rules-2024-classes.js)
  aplicarCatalogoRegras._atual = ed;
  return ed;
}
/* Converte a escolha de bônus do antecedente (2024) em { atributo: bônus }. Retorna null se incompleta. */
function calcularBonusOrigem2024(origemKey, escolha){
  const bg = BACKGROUNDS_2024[origemKey]; if(!bg || !escolha) return null;
  const ok = a => bg.atributosOpcoes.includes(a);
  if(escolha.formato==="1_1_1"){
    const tres = (escolha.tres||[]);
    if(tres.length!==3 || new Set(tres).size!==3 || !tres.every(ok)) return null;
    return Object.fromEntries(tres.map(a=>[a,1]));
  }
  if(!escolha.mais2 || !escolha.mais1 || escolha.mais2===escolha.mais1 || !ok(escolha.mais2) || !ok(escolha.mais1)) return null;
  return {[escolha.mais2]:2,[escolha.mais1]:1};
}

/* Criação orientada: prioridade sugerida de atributos por classe (ordem do maior para o menor).
   Sugestão de jogo comum, não é regra oficial. Com Standard Array 15,14,13,12,10,8 o custo no Point Buy é exatamente 27. */
const SUGESTAO_PRIORIDADE_ATRIBUTOS = {
  barbaro:["forca","constituicao","destreza","sabedoria","carisma","inteligencia"],
  bardo:["carisma","destreza","constituicao","sabedoria","inteligencia","forca"],
  bruxo:["carisma","constituicao","destreza","sabedoria","inteligencia","forca"],
  clerigo:["sabedoria","constituicao","forca","destreza","inteligencia","carisma"],
  druida:["sabedoria","constituicao","destreza","inteligencia","carisma","forca"],
  feiticeiro:["carisma","constituicao","destreza","sabedoria","inteligencia","forca"],
  guerreiro:["forca","constituicao","destreza","sabedoria","inteligencia","carisma"],
  ladino:["destreza","constituicao","sabedoria","inteligencia","carisma","forca"],
  mago:["inteligencia","constituicao","destreza","sabedoria","carisma","forca"],
  monge:["destreza","sabedoria","constituicao","forca","inteligencia","carisma"],
  paladino:["forca","carisma","constituicao","sabedoria","destreza","inteligencia"],
  patrulheiro:["destreza","sabedoria","constituicao","forca","inteligencia","carisma"]
};
