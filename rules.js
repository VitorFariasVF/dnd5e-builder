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
  patrulheiro:{habilidade:"sabedoria",tipo:"conhecidas",meioConjurador:true,magias:[0,0,0,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]}
};

const SPELL_SLOTS = {
  full:{1:[2,0,0,0,0,0,0,0,0],2:[3,0,0,0,0,0,0,0,0],3:[4,2,0,0,0,0,0,0,0],4:[4,3,0,0,0,0,0,0,0],5:[4,3,2,0,0,0,0,0,0],6:[4,3,3,0,0,0,0,0,0],7:[4,3,3,1,0,0,0,0,0],8:[4,3,3,2,0,0,0,0,0],9:[4,3,3,3,1,0,0,0,0],10:[4,3,3,3,2,0,0,0,0],11:[4,3,3,3,2,1,0,0,0],12:[4,3,3,3,2,1,0,0,0],13:[4,3,3,3,2,1,1,0,0],14:[4,3,3,3,2,1,1,0,0],15:[4,3,3,3,2,1,1,1,0],16:[4,3,3,3,2,1,1,1,0],17:[4,3,3,3,2,1,1,1,1],18:[4,3,3,3,3,1,1,1,1],19:[4,3,3,3,3,2,1,1,1],20:[4,3,3,3,3,2,2,1,1]},
  half:{1:[0,0,0,0,0,0,0,0,0],2:[0,0,0,0,0,0,0,0,0],3:[0,0,0,0,0,0,0,0,0],4:[3,0,0,0,0,0,0,0,0],5:[4,2,0,0,0,0,0,0,0],6:[4,2,0,0,0,0,0,0,0],7:[4,3,0,0,0,0,0,0,0],8:[4,3,0,0,0,0,0,0,0],9:[4,3,2,0,0,0,0,0,0],10:[4,3,2,0,0,0,0,0,0],11:[4,3,3,0,0,0,0,0,0],12:[4,3,3,0,0,0,0,0,0],13:[4,3,3,1,0,0,0,0,0],14:[4,3,3,1,0,0,0,0,0],15:[4,3,3,2,0,0,0,0,0],16:[4,3,3,2,0,0,0,0,0],17:[4,3,3,3,1,0,0,0,0],18:[4,3,3,3,1,0,0,0,0],19:[4,3,3,3,2,0,0,0,0],20:[4,3,3,3,2,0,0,0,0]},
  warlock:{1:[1],2:[2],3:[2],4:[2],5:[2],6:[2],7:[2],8:[2],9:[2],10:[2],11:[3],12:[3],13:[3],14:[3],15:[3],16:[3],17:[4],18:[4],19:[4],20:[4]},
  warlockCircle:{1:1,2:1,3:2,4:2,5:3,6:3,7:4,8:4,9:5,10:5,11:5,12:5,13:5,14:5,15:5,16:5,17:5,18:5,19:5,20:5}
};

const CLASSES = {
  barbaro:{nome:"Bárbaro",dadoVida:12,saves:["Força","Constituição"],proficiencias:["Armaduras leves","Armaduras médias","Escudos","Armas simples","Armas marciais"],equipamento:["Machado grande ou arma marcial","Machadinhas ou arma simples","Pacote de aventureiro","Quatro azagaias"],escolhaPericias:{quantidade:2,opcoes:["Adestrar Animais","Atletismo","Intimidação","Natureza","Percepção","Sobrevivência"]}},
  bardo:{nome:"Bardo",dadoVida:8,saves:["Destreza","Carisma"],proficiencias:["Armaduras leves","Armas simples","Bestas de mão","Espadas longas","Rapieiras","Espadas curtas","Três instrumentos musicais"],equipamento:["Rapieira ou espada longa ou arma simples","Instrumento musical","Armadura de couro"],escolhaPericias:{quantidade:3,opcoes:Object.keys(SKILLS)}},
  bruxo:{nome:"Bruxo",dadoVida:8,saves:["Sabedoria","Carisma"],proficiencias:["Armaduras leves","Armas simples"],equipamento:["Besta leve ou arma simples","Bolsa de componentes ou foco arcano","Armadura de couro","Duas adagas"],escolhaPericias:{quantidade:2,opcoes:["Arcanismo","Enganação","História","Intimidação","Investigação","Natureza","Religião"]}},
  clerigo:{nome:"Clérigo",dadoVida:8,saves:["Sabedoria","Carisma"],proficiencias:["Armaduras leves","Armaduras médias","Escudos","Armas simples"],equipamento:["Maça ou martelo de guerra","Armadura de escamas ou couro ou cota de malha","Escudo"],escolhaPericias:{quantidade:2,opcoes:["História","Intuição","Medicina","Persuasão","Religião"]}},
  druida:{nome:"Druida",dadoVida:8,saves:["Inteligência","Sabedoria"],proficiencias:["Armaduras leves","Armaduras médias","Escudos","Clavas","Adagas","Dardos","Azagaias","Maças","Bordões","Cimitarras","Foices","Fundas","Kit de herbalismo"],equipamento:["Escudo de madeira ou arma simples","Cimitarra ou arma corpo a corpo simples","Armadura de couro"],escolhaPericias:{quantidade:2,opcoes:["Arcanismo","Adestrar Animais","Intuição","Medicina","Natureza","Percepção","Religião","Sobrevivência"]}},
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
  couro:{nome:"Armadura de couro",tipo:"leve",baseCA:11,dex:"full",peso:10,precoGp:10,tags:["leve","couro"]},
  couro_batido:{nome:"Armadura de couro batido",tipo:"leve",baseCA:12,dex:"full",peso:13,precoGp:45,tags:["leve","couro"]},
  gibao_peles:{nome:"Gibão de peles",tipo:"media",baseCA:12,dex:"max2",peso:12,precoGp:10,tags:["média","pele"]},
  cota_escamas:{nome:"Cota de escamas",tipo:"media",baseCA:14,dex:"max2",peso:45,precoGp:50,tags:["média","metal"]},
  cota_malha:{nome:"Cota de malha",tipo:"pesada",baseCA:16,dex:"none",peso:55,precoGp:75,tags:["pesada","metal"]}
};

const WEAPONS = {
  adaga:{nome:"Adaga",categoria:"simples",tipo:"corpo a corpo",dano:"1d4",alcance:"adjacente",peso:1,precoGp:2,critico:"20/x2",propriedades:["acuidade","leve","arremesso 6/18"],finesse:true,ranged:false,versatile:null,tags:["simples","corpo a corpo","acuidade"]},
  bordao:{nome:"Bordão",categoria:"simples",tipo:"corpo a corpo",dano:"1d6",alcance:"adjacente",peso:4,precoGp:0.2,critico:"20/x2",propriedades:["versátil 1d8"],finesse:false,ranged:false,versatile:"1d8",tags:["simples","corpo a corpo","versátil"]},
  maca:{nome:"Maça",categoria:"simples",tipo:"corpo a corpo",dano:"1d6",alcance:"adjacente",peso:4,precoGp:5,critico:"20/x2",propriedades:[],finesse:false,ranged:false,versatile:null,tags:["simples","corpo a corpo"]},
  espada_curta:{nome:"Espada curta",categoria:"marcial",tipo:"corpo a corpo",dano:"1d6",alcance:"adjacente",peso:2,precoGp:10,critico:"19-20/x2",propriedades:["acuidade","leve"],finesse:true,ranged:false,versatile:null,tags:["marcial","corpo a corpo","acuidade"]},
  rapieira:{nome:"Rapieira",categoria:"marcial",tipo:"corpo a corpo",dano:"1d8",alcance:"adjacente",peso:2,precoGp:25,critico:"18-20/x2",propriedades:["acuidade"],finesse:true,ranged:false,versatile:null,tags:["marcial","corpo a corpo","acuidade"]},
  espada_longa:{nome:"Espada longa",categoria:"marcial",tipo:"corpo a corpo",dano:"1d8",alcance:"adjacente",peso:3,precoGp:15,critico:"19-20/x2",propriedades:["versátil 1d10"],finesse:false,ranged:false,versatile:"1d10",tags:["marcial","corpo a corpo","versátil"]},
  machado_grande:{nome:"Machado grande",categoria:"marcial",tipo:"corpo a corpo",dano:"1d12",alcance:"adjacente",peso:7,precoGp:30,critico:"20/x3",propriedades:["pesada","duas mãos"],finesse:false,ranged:false,versatile:null,tags:["marcial","corpo a corpo","pesada","duas mãos"]},
  azagaia:{nome:"Azagaia",categoria:"simples",tipo:"corpo a corpo/à distância",dano:"1d6",alcance:"9/36 m",peso:2,precoGp:0.5,critico:"20/x2",propriedades:["arremesso"],finesse:false,ranged:true,versatile:null,tags:["simples","arremesso","à distância"]},
  arco_curto:{nome:"Arco curto",categoria:"simples",tipo:"à distância",dano:"1d6",alcance:"24/96 m",peso:2,precoGp:25,critico:"20/x3",propriedades:["duas mãos","munição"],finesse:false,ranged:true,versatile:null,tags:["simples","à distância","duas mãos"]},
  arco_longo:{nome:"Arco longo",categoria:"marcial",tipo:"à distância",dano:"1d8",alcance:"45/180 m",peso:2,precoGp:50,critico:"20/x3",propriedades:["pesada","duas mãos","munição"],finesse:false,ranged:true,versatile:null,tags:["marcial","à distância","duas mãos"]},
  besta_leve:{nome:"Besta leve",categoria:"simples",tipo:"à distância",dano:"1d8",alcance:"24/96 m",peso:5,precoGp:25,critico:"19-20/x2",propriedades:["munição","duas mãos"],finesse:false,ranged:true,versatile:null,tags:["simples","à distância","duas mãos"]}
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
    {level:1,nome:"Surto de Ação",resumo:"Recupera fôlego para agir além do normal em combate."},
    {level:2,nome:"Segundo Fôlego",resumo:"Recupera PV com um impulso de resistência."},
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
    {key:'ancestral_guardian',nome:'Caminho do Guardião Ancestral',resumo:'Protetor espiritual que desvia ataques dos aliados.',source:'XGtE',features:[{level:3,nome:'Protetores Ancestrais',resumo:'Marca um inimigo para dificultar ataques contra seus aliados.'},{level:6,nome:'Escudo Espiritual',resumo:'Espíritos reduzem dano causado a um aliado.'},{level:10,nome:'Consultar os Espíritos',resumo:'Recebe orientação espiritual e magia ritual temática.'},{level:14,nome:'Ancestrais Vingativos',resumo:'Reflete parte do dano de um inimigo marcado.'}]},
    {key:'storm_herald',nome:'Caminho do Arauto da Tempestade',resumo:'A fúria manifesta desertos, mares ou tundras.',source:'XGtE',features:[{level:3,nome:'Aura de Tempestade',resumo:'Sua fúria gera uma aura elemental ativa.'},{level:6,nome:'Alma da Tempestade',resumo:'Ganha resistência e benefício temático do ambiente escolhido.'},{level:10,nome:'Escudo Tempestuoso',resumo:'Aliados próximos recebem defesa elemental.'},{level:14,nome:'Fúria Tempestuosa',resumo:'Sua aura passa a punir inimigos de forma mais forte.'}]},
    {key:'zealot',nome:'Caminho do Zelote',resumo:'Fúria devota, dano divino e persistência sobrenatural.',source:'XGtE',features:[{level:3,nome:'Fúria Divina',resumo:'Seu primeiro golpe em fúria causa dano extra sagrado.'},{level:3,nome:'Guerreiro dos Deuses',resumo:'Ressuscitá-lo exige menos recursos.'},{level:6,nome:'Foco Fanático',resumo:'Repete uma salvaguarda falha enquanto estiver em fúria.'},{level:10,nome:'Presença Zelosa',resumo:'Concede vantagem e coragem a aliados.'},{level:14,nome:'Fúria Além da Morte',resumo:'Continua lutando mesmo à beira da morte.'}]}
  ],
  bardo:[
    {key:'glamour',nome:'Colégio do Glamour',resumo:'Carisma feérico, suporte móvel e autoridade mágica.',source:'XGtE',features:[{level:3,nome:'Manto da Inspiração',resumo:'Distribui PV temporários e movimento reativo.'},{level:3,nome:'Performance Cativante',resumo:'Encanta espectadores após uma apresentação.'},{level:6,nome:'Manto da Majestade',resumo:'Comanda inimigos com presença dominante.'},{level:14,nome:'Majestade Inquebrável',resumo:'Inimigos hesitam em atacá-lo diretamente.'}]},
    {key:'swords',nome:'Colégio das Espadas',resumo:'Bardo duelista com floresios e presença marcial.',source:'XGtE',features:[{level:3,nome:'Proficiências Adicionais',resumo:'Recebe proficiências marciais e estilo.'},{level:3,nome:'Floresio de Lâmina',resumo:'Usa inspiração para aumentar dano e mobilidade.'},{level:6,nome:'Ataque Extra',resumo:'Dois ataques com a ação de Ataque.'},{level:14,nome:'Floresio do Mestre',resumo:'Mantém floresios com menor custo.'}]},
    {key:'whispers',nome:'Colégio dos Sussurros',resumo:'Terror psíquico, infiltração e manipulação.',source:'XGtE',features:[{level:3,nome:'Lâminas Psíquicas',resumo:'Gasta inspiração para causar dano psíquico extra.'},{level:3,nome:'Palavras de Terror',resumo:'Instila medo em conversas prolongadas.'},{level:6,nome:'Manto dos Sussurros',resumo:'Rouba a identidade de um morto recente.'},{level:14,nome:'Trapaça Sombria',resumo:'Redireciona a agressão de um inimigo.'}]}
  ],
  clerigo:[
    {key:'forge',nome:'Domínio da Forja',resumo:'Metal, fogo sagrado e defesa pesada.',source:'XGtE',features:[{level:1,nome:'Benção da Forja',resumo:'Encanta uma arma ou armadura com bônus mágico.'},{level:2,nome:'Canalizar Divindade: Artesanato',resumo:'Forja itens simples de metal rapidamente.'},{level:6,nome:'Alma da Forja',resumo:'Resiste a fogo e recebe proteção adicional.'},{level:8,nome:'Golpe Divino',resumo:'Ataques com arma causam dano ígneo extra.'},{level:17,nome:'Santo da Forja e do Fogo',resumo:'Torna-se extremamente resistente a fogo e aço.'}]},
    {key:'grave',nome:'Domínio da Sepultura',resumo:'Guardião do limiar entre vida e morte.',source:'XGtE',features:[{level:1,nome:'Círculo da Mortalidade',resumo:'Curas em alvos caídos ficam muito mais fortes.'},{level:1,nome:'Olhos da Sepultura',resumo:'Percebe mortos-vivos nas proximidades.'},{level:2,nome:'Caminho para a Sepultura',resumo:'Marca um alvo para sofrer dano aumentado.'},{level:6,nome:'Sentinela na Porta da Morte',resumo:'Anula acertos críticos de inimigos.'},{level:8,nome:'Golpe Potente',resumo:'Truques ofensivos recebem dano extra.'},{level:17,nome:'Guarda das Almas',resumo:'Colhe vitalidade quando criaturas caem perto de você.'}]}
  ],
  druida:[
    {key:'dreams',nome:'Círculo dos Sonhos',resumo:'Cura feérica, abrigo seguro e teleporte.',source:'XGtE',features:[{level:2,nome:'Bálsamo da Corte de Verão',resumo:'Pool de cura feérica como ação bônus.'},{level:6,nome:'Lareira ao Luar e Sombra',resumo:'Torna descansos mais seguros.'},{level:10,nome:'Caminhos Ocultos',resumo:'Teleporta a si mesmo ou um aliado.'},{level:14,nome:'Passeador Onírico',resumo:'Escapa de golpes com magia feérica.'}]},
    {key:'shepherd',nome:'Círculo do Pastor',resumo:'Espíritos guardiões e invocações reforçadas.',source:'XGtE',features:[{level:2,nome:'Espírito Totêmico',resumo:'Invoca espíritos que curam, detectam ou fortalecem.'},{level:6,nome:'Invocações Poderosas',resumo:'Criaturas convocadas chegam mais resistentes.'},{level:10,nome:'Espírito Guardião',resumo:'Seus espíritos protegem aliados caídos.'},{level:14,nome:'Fé da Natureza',resumo:'Conjurados curam e persistem melhor.'}]}
  ],
  guerreiro:[
    {key:'arcane_archer',nome:'Arqueiro Arcano',resumo:'Flechas mágicas com efeitos especiais.',source:'XGtE',features:[{level:3,nome:'Disparo Arcano',resumo:'Aplica efeitos mágicos a flechas especiais.'},{level:7,nome:'Flecha Curva',resumo:'Redireciona um tiro que errou.'},{level:15,nome:'Disparo Sempre Pronto',resumo:'Recupera uso especial ao rolar iniciativa.'},{level:18,nome:'Disparo Arcano Aprimorado',resumo:'Os efeitos das flechas ficam mais fortes.'}]},
    {key:'cavalier',nome:'Cavaleiro',resumo:'Defensor montado e controlador da linha de frente.',source:'XGtE',features:[{level:3,nome:'Nascido para a Sela',resumo:'Excelente em montaria.'},{level:3,nome:'Marca Inabalável',resumo:'Pressiona inimigos a focarem você.'},{level:7,nome:'Manobra de Proteção',resumo:'Defende aliados com reação.'},{level:10,nome:'Ataque Feroz',resumo:'Impede inimigos de atravessar sua guarda.'},{level:18,nome:'Defensor Inquebrável',resumo:'Sua marca se torna extremamente punitiva.'}]},
    {key:'samurai',nome:'Samurai',resumo:'Disciplina, precisão e presença social.',source:'XGtE',features:[{level:3,nome:'Espírito de Combate',resumo:'Vantagem ofensiva e PV temporários.'},{level:3,nome:'Elegância Cortesã',resumo:'Proficiência social adicional.'},{level:10,nome:'Tire Força da Morte',resumo:'Recupera uso do espírito ao rolar iniciativa.'},{level:15,nome:'Golpe Rápido',resumo:'Troca vantagem por ataque extra.'},{level:18,nome:'Força antes da Morte',resumo:'Recebe um turno extra ao cair.'}]}
  ],
  monge:[
    {key:'drunken_master',nome:'Caminho do Mestre Bêbado',resumo:'Mobilidade errática e defesa escorregadia.',source:'XGtE',features:[{level:3,nome:'Técnica Bêbada',resumo:'Rajada concede Esquiva e movimento.'},{level:6,nome:'Bêbado da Sorte',resumo:'Redireciona ataques errados.'},{level:11,nome:'Passos do Bêbado',resumo:'Move-se com mais liberdade em combate.'},{level:17,nome:'Sorte do Bêbado',resumo:'Converte ataques errados em vantagem tática.'}]},
    {key:'kensei',nome:'Caminho do Kensei',resumo:'Mestre de armas escolhido como extensão do corpo.',source:'XGtE',features:[{level:3,nome:'Armas do Kensei',resumo:'Escolhe armas especiais para dominar.'},{level:6,nome:'Um com a Lâmina',resumo:'Armas do kensei contam como mágicas.'},{level:11,nome:'Afiar a Lâmina',resumo:'Gasta ki para melhorar a arma.'},{level:17,nome:'Precisão Infalível',resumo:'Repete uma falha de ataque.'}]},
    {key:'sun_soul',nome:'Caminho da Alma Solar',resumo:'Rajadas radiantes e energia solar ofensiva.',source:'XGtE',features:[{level:3,nome:'Rajada Solar Radiante',resumo:'Ataca à distância com energia radiante.'},{level:6,nome:'Golpe Solar Consumidor',resumo:'Explode energia radiante em área.'},{level:11,nome:'Escudo Solar',resumo:'Reage com clarão punitivo.'},{level:17,nome:'Explosão Solar',resumo:'Dispara grande esfera radiante.'}]}
  ],
  paladino:[
    {key:'conquest',nome:'Juramento da Conquista',resumo:'Medo, domínio e controle do campo de batalha.',source:'XGtE',features:[{level:3,nome:'Presença Conquistadora',resumo:'Assusta criaturas ao redor.'},{level:7,nome:'Aura da Conquista',resumo:'Inimigos amedrontados ficam presos perto de você.'},{level:15,nome:'Desprezo Ardente',resumo:'Rebate dano psíquico.'},{level:20,nome:'Conquistador Invencível',resumo:'Assume forma terrível e resistente.'}]},
    {key:'redemption',nome:'Juramento da Redenção',resumo:'Pacificador resistente que protege outros.',source:'XGtE',features:[{level:3,nome:'Emissário da Paz',resumo:'Amplia Persuasão e diplomacia.'},{level:3,nome:'Repreender o Violento',resumo:'Reflete dano contra agressores.'},{level:7,nome:'Aura do Guardião',resumo:'Desvia dano de aliados para si.'},{level:15,nome:'Espírito Protetor',resumo:'Regenera-se quando está ferido.'},{level:20,nome:'Emissário da Redenção',resumo:'Reflete dano e ganha resistência superior.'}]}
  ],
  patrulheiro:[
    {key:'gloom_stalker',nome:'Andarilho das Sombras',resumo:'Caçador da escuridão com início devastador.',source:'XGtE',features:[{level:3,nome:'Emboscador Assombroso',resumo:'Turno inicial mais veloz e letal.'},{level:3,nome:'Visão Umbral',resumo:'Enxerga no escuro e some de sentidos especiais.'},{level:7,nome:'Mente de Ferro',resumo:'Recebe defesa mental adicional.'},{level:11,nome:'Rajada do Perseguidor',resumo:'Erros podem gerar ataques extras.'},{level:15,nome:'Esquiva Sombria',resumo:'Fica mais difícil de atingir nas sombras.'}]},
    {key:'horizon_walker',nome:'Andarilho do Horizonte',resumo:'Guardião planar com teleporte e dano de força.',source:'XGtE',features:[{level:3,nome:'Detectar Portal',resumo:'Percebe passagens planares próximas.'},{level:3,nome:'Guerreiro Planar',resumo:'Converte dano em força e o amplia.'},{level:7,nome:'Passo Etéreo',resumo:'Atravessa o Éter brevemente.'},{level:11,nome:'Golpe Distante',resumo:'Teleporta-se antes de cada ataque.'},{level:15,nome:'Defesa Espectral',resumo:'Reduz dano por deslocamento planar.'}]},
    {key:'monster_slayer',nome:'Matador de Monstros',resumo:'Especialista em caçar criaturas perigosas.',source:'XGtE',features:[{level:3,nome:'Sentido do Caçador',resumo:'Lê capacidades defensivas do alvo.'},{level:3,nome:'Nêmesis do Matador',resumo:'Marca um alvo para dano adicional.'},{level:7,nome:'Defesa Sobrenatural',resumo:'Protege-se melhor contra a presa.'},{level:11,nome:'Contra-Magia do Nêmesis',resumo:'Resiste e atrapalha conjuração da presa.'},{level:15,nome:'Matança do Matador',resumo:'Reage contra falhas ofensivas da presa.'}]}
  ],
  ladino:[
    {key:'inquisitive',nome:'Inquisitivo',resumo:'Detetive perceptivo e duelista analítico.',source:'XGtE',features:[{level:3,nome:'Ouvido para Enganos',resumo:'Lê mentiras e intenções com precisão.'},{level:3,nome:'Olho para Detalhes',resumo:'Percepção e Investigação como ação bônus.'},{level:3,nome:'Luta Perspicaz',resumo:'Libera Ataque Furtivo após estudar o alvo.'},{level:9,nome:'Olho Firme',resumo:'Percebe melhor quando se mantém atento.'},{level:17,nome:'Sentido para a Fraqueza',resumo:'Dano extra contra um alvo analisado.'}]},
    {key:'mastermind',nome:'Mentor do Crime',resumo:'Manipulador tático e social.',source:'XGtE',features:[{level:3,nome:'Mestre da Intriga',resumo:'Idiomas, disfarces e leitura social.'},{level:3,nome:'Mestre das Táticas',resumo:'Usa Ajudar como ação bônus a distância.'},{level:9,nome:'Manipulador Perspicaz',resumo:'Descobre capacidades de um alvo.'},{level:13,nome:'Desvaneio',resumo:'Redireciona suspeitas.'},{level:17,nome:'Alma do Complot',resumo:'Aliados aproveitam melhor sua liderança.'}]},
    {key:'scout',nome:'Batedor',resumo:'Explorador móvel e reativo.',source:'XGtE',features:[{level:3,nome:'Escaramuçador',resumo:'Move-se como reação quando ameaçado.'},{level:3,nome:'Sobrevivencialista',resumo:'Recebe perícias de exploração.'},{level:9,nome:'Mobilidade Superior',resumo:'Desloca-se mais rápido.'},{level:13,nome:'Emboscador',resumo:'Ganha pressão no início do combate.'},{level:17,nome:'Ataque Súbito',resumo:'Abre combate com sequência furtiva.'}]},
    {key:'swashbuckler',nome:'Espadachim',resumo:'Duelista carismático, veloz e independente.',source:'XGtE',features:[{level:3,nome:'Pés Ligeiros',resumo:'Evita ataques de oportunidade do alvo atingido.'},{level:3,nome:'Audácia',resumo:'Carisma na iniciativa e Ataque Furtivo em duelo.'},{level:9,nome:'Panache',resumo:'Provoca ou encanta com presença confiante.'},{level:13,nome:'Manobra Elegante',resumo:'Ação bônus melhora mobilidade.'},{level:17,nome:'Mestre Duelista',resumo:'Repete uma falha de ataque decisiva.'}]}
  ],
  feiticeiro:[
    {key:'divine_soul',nome:'Alma Divina',resumo:'Feiticeiro tocado pelo divino com cura ampliada.',source:'XGtE',features:[{level:1,nome:'Magia Divina',resumo:'Acessa magia adicional de viés divino.'},{level:1,nome:'Favorecido pelos Deuses',resumo:'Soma 2d4 a uma falha importante.'},{level:6,nome:'Cura Empoderada',resumo:'Relança dados de cura próximos.'},{level:14,nome:'Asas Sobrenaturais',resumo:'Ganha voo.'},{level:18,nome:'Recuperação Desigual',resumo:'Recupera muitos PV em estado crítico.'}]},
    {key:'shadow',nome:'Magia Sombria',resumo:'Escuridão viva, resistência e presença espectral.',source:'XGtE',features:[{level:1,nome:'Olhos da Escuridão',resumo:'Enxerga melhor no escuro e domina escuridão.'},{level:1,nome:'Força do Túmulo',resumo:'Pode evitar cair a 0 PV.'},{level:6,nome:'Cão do Mau Agouro',resumo:'Invoca perseguidor sombrio.'},{level:14,nome:'Caminhada Sombria',resumo:'Teleporta-se entre sombras.'},{level:18,nome:'Forma Umbrosa',resumo:'Torna-se quase incorpóreo.'}]},
    {key:'storm',nome:'Magia da Tempestade',resumo:'Mobilidade aérea e fúria elemental.',source:'XGtE',features:[{level:1,nome:'Magia Tempestuosa',resumo:'Voa brevemente após conjurar.'},{level:6,nome:'Coração da Tempestade',resumo:'Resiste a trovão/relâmpago e emite dano ambiental.'},{level:6,nome:'Guia da Tempestade',resumo:'Controla chuva e ventos próximos.'},{level:14,nome:'Fúria da Tempestade',resumo:'Rebate dano com reação.'},{level:18,nome:'Alma do Vento',resumo:'Recebe voo permanente e o compartilha.'}]}
  ],
  bruxo:[
    {key:'celestial',nome:'O Celestial',resumo:'Bruxo de cura, luz e proteção radiante.',source:'XGtE',features:[{level:1,nome:'Luz Curativa',resumo:'Pool de d6 para cura como ação bônus.'},{level:6,nome:'Alma Radiante',resumo:'Soma Carisma a curas e certos danos.'},{level:10,nome:'Resiliência Celestial',resumo:'Gera PV temporários após descanso.'},{level:14,nome:'Vingança Flamejante',resumo:'Explode em luz ao cair e volta a lutar.'}]},
    {key:'hexblade',nome:'A Lâmina Maldita',resumo:'Bruxo marcial com arma amaldiçoada e armadura.',source:'XGtE',features:[{level:1,nome:'Maldição da Lâmina Maldita',resumo:'Marca um alvo para dano, críticos e cura.'},{level:1,nome:'Guerreiro Hex',resumo:'Usa Carisma com certas armas e ganha armaduras.'},{level:6,nome:'Espectro Amaldiçoado',resumo:'Ergue espírito do alvo derrotado.'},{level:10,nome:'Armadura de Hexes',resumo:'O alvo amaldiçoado erra você com mais frequência.'},{level:14,nome:'Mestre das Hexes',resumo:'Move a maldição para outro inimigo.'}]}
  ],
  mago:[
    {key:'war_magic',nome:'Magia de Guerra',resumo:'Defesa arcana rápida e agressão controlada.',source:'XGtE',features:[{level:2,nome:'Desvio Arcano',resumo:'Melhora CA ou salvaguarda com reação.'},{level:2,nome:'Inteligência Tática',resumo:'Adiciona Inteligência à iniciativa.'},{level:6,nome:'Surto de Poder',resumo:'Armazena energia para ampliar magia.'},{level:10,nome:'Manto de Defesa',resumo:'Fica mais resistente enquanto concentra.'},{level:14,nome:'Desvio Duradouro',resumo:'Converte energia acumulada em dano estável.'}]}
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
  guerreiro:[{id:'segundo_folego',nome:'Segundo Fôlego',recarga:'Descanso curto',formula:n=>1},{id:'surto_acao',nome:'Surto de Ação',recarga:'Descanso curto',formula:n=> n>=17?2:n>=2?1:0},{id:'indomavel',nome:'Indomável',recarga:'Descanso longo',formula:n=> n>=17?3:n>=13?2:n>=9?1:0}],
  ladino:[{id:'ataque_furtivo',nome:'Ataque Furtivo',recarga:'Por turno',formula:n=> n>=1?1:0}],
  monge:[{id:'ki',nome:'Pontos de Ki',recarga:'Descanso curto',formula:n=> n>=2?n:0}],
  paladino:[{id:'canalizar_divindade',nome:'Canalizar Divindade',recarga:'Descanso curto',formula:n=> n>=3?1:0}],
  patrulheiro:[{id:'sentido_primevo',nome:'Sentido Primevo',recarga:'Usa espaço de magia',formula:n=> n>=3?1:0}]
};
function getSubclassUnlockLevel(classe){ return SUBCLASS_UNLOCK_LEVEL[classe] || 99; }
function getSubclassOptions(classe){ return SUBCLASS_OPTIONS[classe] || []; }
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
const COMPLETE_SUBCLASS_FEATURE_PATCH = {"barbaro": {"berserker": [{"level": 10, "nome": "Presença Intimidadora", "resumo": "Pode amedrontar uma criatura com sua presença."}, {"level": 14, "nome": "Retaliação", "resumo": "Revida como reação quando sofre dano de um inimigo adjacente."}], "totem_urso": [{"level": 10, "nome": "Caminhante Espiritual", "resumo": "Conjura comunhão com a natureza como ritual."}, {"level": 14, "nome": "Sintonia Totêmica", "resumo": "Proteções superiores do espírito totêmico."}]}, "bardo": {"lore": [{"level": 6, "nome": "Segredos Mágicos Adicionais", "resumo": "Aprende magias fora da lista antes do normal."}, {"level": 14, "nome": "Perícia Incomparável", "resumo": "Usa inspiração em seus próprios testes de habilidade."}], "valor": [{"level": 6, "nome": "Ataque Extra", "resumo": "Dois ataques ao usar a ação de Ataque."}, {"level": 14, "nome": "Magia de Batalha", "resumo": "Após conjurar, pode atacar como ação bônus."}]}, "bruxo": {"imundo": [{"level": 10, "nome": "Resiliência Ígnea", "resumo": "Escolhe um tipo de dano para resistência após descanso."}, {"level": 14, "nome": "Lançar pelo Inferno", "resumo": "Bane temporariamente um inimigo ao inferno."}], "arquifada": [{"level": 10, "nome": "Defesas Enfeitiçantes", "resumo": "Reflete charme e evita ser enfeitiçado."}, {"level": 14, "nome": "Delírio Sombrio", "resumo": "Aprisiona a mente do alvo em ilusões feéricas."}]}, "clerigo": {"vida": [{"level": 6, "nome": "Curador Abençoado", "resumo": "Ao curar outros, também recupera PV."}, {"level": 8, "nome": "Golpe Divino", "resumo": "Ataques com arma causam dano radiante extra."}, {"level": 17, "nome": "Cura Suprema", "resumo": "Usa o máximo ao curar com magias apropriadas."}], "guerra": [{"level": 6, "nome": "Bênção do Deus da Guerra", "resumo": "Concede bônus de ataque a aliados próximos."}, {"level": 8, "nome": "Golpe Divino", "resumo": "Ataques com arma causam dano extra."}, {"level": 17, "nome": "Avatar da Batalha", "resumo": "Resistência a dano não mágico comum em combate."}]}, "druida": {"lua": [{"level": 10, "nome": "Forma Elemental", "resumo": "Gasta usos de forma selvagem para virar elemental."}, {"level": 14, "nome": "Mil Formas", "resumo": "Pode lançar alterar-se à vontade."}], "terra": [{"level": 6, "nome": "Passo da Terra", "resumo": "Move-se por terreno não mágico sem custo extra."}, {"level": 10, "nome": "Proteção da Natureza", "resumo": "Não pode ser enfeitiçado ou amedrontado por elementais e fadas."}, {"level": 14, "nome": "Santuário da Natureza", "resumo": "Criaturas naturais hesitam em atacá-lo."}]}, "feiticeiro": {"draconica": [{"level": 14, "nome": "Asas de Dragão", "resumo": "Ganha voo permanente ao invocar asas."}, {"level": 18, "nome": "Presença Dracônica", "resumo": "Aterroriza ou encanta criaturas próximas."}], "selvagem": [{"level": 14, "nome": "Caos Controlado", "resumo": "Rola novamente na tabela de surto selvagem quando apropriado."}, {"level": 18, "nome": "Bombardeio de Magias", "resumo": "Maximiza parte do dano de surtos adequados."}]}, "guerreiro": {"campeao": [{"level": 10, "nome": "Estilo de Luta Adicional", "resumo": "Escolhe outro estilo de luta."}, {"level": 15, "nome": "Crítico Superior", "resumo": "Crita com 18–20."}, {"level": 18, "nome": "Sobrevivente", "resumo": "Recupera PV no início do turno quando ferido."}], "mestre_batalha": [{"level": 7, "nome": "Conheça Seu Inimigo", "resumo": "Analisa capacidades de um alvo."}, {"level": 10, "nome": "Superioridade Aprimorada", "resumo": "Dados de superioridade se tornam d10."}, {"level": 15, "nome": "Retomar Fôlego", "resumo": "Recupera um dado de superioridade ao rolar iniciativa sem dados."}, {"level": 18, "nome": "Superioridade Suprema", "resumo": "Dados de superioridade se tornam d12."}]}, "ladino": {"ladrao": [{"level": 9, "nome": "Uso de Dispositivos Mágicos", "resumo": "Ignora restrições em itens mágicos."}, {"level": 13, "nome": "Reflexos do Ladrão", "resumo": "Pode usar dois turnos no primeiro round em certas situações."}, {"level": 17, "nome": "Escalada Suprema", "resumo": "Movimenta-se e age como mestre do terreno urbano."}], "assassino": [{"level": 13, "nome": "Impostor", "resumo": "Imita voz e aparência com eficiência."}, {"level": 17, "nome": "Golpe da Morte", "resumo": "Alvos surpreendidos sofrem testes severos contra dano massivo."}]}, "mago": {"evocacao": [{"level": 10, "nome": "Evocação Potencializada", "resumo": "Adiciona Inteligência ao dano de evocações adequadas."}, {"level": 14, "nome": "Supercanalização", "resumo": "Maximiza dano de evocações poderosas com risco."}], "abjuracao": [{"level": 10, "nome": "Abjuração Aprimorada", "resumo": "Adiciona proficiência a testes de dissipar/neutralizar."}, {"level": 14, "nome": "Resistência à Magia", "resumo": "Vantagem em salvaguardas contra magia e resistência a dano mágico."}]}, "monge": {"mao_aberta": [{"level": 11, "nome": "Tranquilidade", "resumo": "Age como se sob santuário após descanso longo."}, {"level": 17, "nome": "Palma Vibrante", "resumo": "Implanta vibrações letais em um alvo."}], "sombras": [{"level": 11, "nome": "Manto das Sombras", "resumo": "Fica invisível em luz fraca ou escuridão."}, {"level": 17, "nome": "Oportunista", "resumo": "Ataca como reação quando inimigos se distraem."}]}, "paladino": {"devocao": [{"level": 7, "nome": "Aura de Devoção", "resumo": "Aliados próximos não podem ser enfeitiçados."}, {"level": 15, "nome": "Pureza de Espírito", "resumo": "Sempre sob proteção contra bem e mal."}, {"level": 20, "nome": "Nimbus Sagrado", "resumo": "Irradia luz e dano radiante, protegendo aliados."}], "vinganca": [{"level": 7, "nome": "Vingador Implacável", "resumo": "Move-se após ataques de oportunidade bem-sucedidos."}, {"level": 15, "nome": "Alma da Vingança", "resumo": "Revida contra o alvo do voto."}, {"level": 20, "nome": "Anjo Vingador", "resumo": "Assume forma alada aterrorizante."}]}, "patrulheiro": {"cacador": [{"level": 11, "nome": "Multiataque", "resumo": "Escolhe uma técnica ofensiva avançada do caçador."}, {"level": 15, "nome": "Defesa Superior", "resumo": "Escolhe uma proteção final do caçador."}], "mestre_feras": [{"level": 11, "nome": "Fúria Bestial", "resumo": "O companheiro faz mais ataques."}, {"level": 15, "nome": "Compartilhar Magias", "resumo": "Magias lançadas em você também afetam o companheiro."}]}};
const CLASS_OPTION_RULES = {"bardo": [{"id": "bardo_expertise_3", "label": "Especialização (nível 3)", "minLevel": 3, "count": 2, "multiple": true, "options": ["Acrobacia", "Adestrar Animais", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"]}, {"id": "bardo_expertise_10", "label": "Especialização adicional (nível 10)", "minLevel": 10, "count": 2, "multiple": true, "options": ["Acrobacia", "Adestrar Animais", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"]}], "bruxo": [{"id": "bruxo_pacto", "label": "Dádiva do Pacto", "minLevel": 3, "count": 1, "multiple": false, "options": ["Lâmina do Pacto", "Livro das Sombras", "Cadeia do Pacto"]}, {"id": "bruxo_invocacoes", "label": "Invocações Místicas", "minLevel": 2, "countByLevel": [[2, 2], [5, 3], [7, 4], [9, 5], [12, 6], [15, 7], [18, 8]], "multiple": true, "options": ["Armadura das Sombras", "Rajada Agonizante", "Visão Diabólica", "Máscara de Muitas Faces", "Salto Sobrenatural", "Passos Ascendentes", "Fala da Besta", "Olhar Hipnótico", "Vigor Infernal", "Lâmina Sedenta"]}], "feiticeiro": [{"id": "feiticeiro_metamagia", "label": "Metamagias", "minLevel": 3, "countByLevel": [[3, 2], [10, 3], [17, 4]], "multiple": true, "options": ["Acelerada", "Distante", "Estendida", "Sutil", "Cuidadosa", "Duplicada", "Potencializada", "Transmutada"]}], "guerreiro": [{"id": "guerreiro_estilo", "label": "Estilo de Luta", "minLevel": 1, "count": 1, "multiple": false, "options": ["Arquearia", "Defesa", "Duelo", "Luta com Arma Grande", "Proteção", "Combate com Duas Armas"]}], "ladino": [{"id": "ladino_expertise_1", "label": "Especialização inicial", "minLevel": 1, "count": 2, "multiple": true, "options": ["Acrobacia", "Adestrar Animais", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"]}, {"id": "ladino_expertise_6", "label": "Especialização adicional", "minLevel": 6, "count": 2, "multiple": true, "options": ["Acrobacia", "Adestrar Animais", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência"]}], "mago": [{"id": "mago_truques_assinatura", "label": "Magias assinatura (registro livre)", "minLevel": 20, "count": 1, "multiple": false, "options": ["Definir manualmente no grimório/exportação"]}], "monge": [], "paladino": [{"id": "paladino_estilo", "label": "Estilo de Luta", "minLevel": 2, "count": 1, "multiple": false, "options": ["Defesa", "Duelo", "Luta com Arma Grande", "Proteção"]}], "patrulheiro": [{"id": "patrulheiro_inimigo_1", "label": "Inimigo Favorito inicial", "minLevel": 1, "count": 1, "multiple": false, "options": ["Aberrações", "Bestas", "Celestiais", "Constructos", "Dragões", "Elementais", "Feéricos", "Ínferos", "Gigantes", "Monstruosidades", "Limos", "Plantas", "Mortos-vivos", "Humanóides"]}, {"id": "patrulheiro_inimigo_6", "label": "Inimigo Favorito adicional", "minLevel": 6, "count": 1, "multiple": false, "options": ["Aberrações", "Bestas", "Celestiais", "Constructos", "Dragões", "Elementais", "Feéricos", "Ínferos", "Gigantes", "Monstruosidades", "Limos", "Plantas", "Mortos-vivos", "Humanóides"]}, {"id": "patrulheiro_inimigo_14", "label": "Inimigo Favorito adicional", "minLevel": 14, "count": 1, "multiple": false, "options": ["Aberrações", "Bestas", "Celestiais", "Constructos", "Dragões", "Elementais", "Feéricos", "Ínferos", "Gigantes", "Monstruosidades", "Limos", "Plantas", "Mortos-vivos", "Humanóides"]}, {"id": "patrulheiro_terreno_1", "label": "Explorador Nato inicial", "minLevel": 1, "count": 1, "multiple": false, "options": ["Ártico", "Costa", "Deserto", "Floresta", "Gramado", "Montanha", "Pântano", "Subterrâneo"]}, {"id": "patrulheiro_terreno_6", "label": "Explorador Nato adicional", "minLevel": 6, "count": 1, "multiple": false, "options": ["Ártico", "Costa", "Deserto", "Floresta", "Gramado", "Montanha", "Pântano", "Subterrâneo"]}, {"id": "patrulheiro_terreno_10", "label": "Explorador Nato adicional", "minLevel": 10, "count": 1, "multiple": false, "options": ["Ártico", "Costa", "Deserto", "Floresta", "Gramado", "Montanha", "Pântano", "Subterrâneo"]}, {"id": "patrulheiro_estilo", "label": "Estilo de Luta", "minLevel": 2, "count": 1, "multiple": false, "options": ["Arquearia", "Defesa", "Duelo", "Combate com Duas Armas"]}]};
const SUBCLASS_OPTION_RULES = {"barbaro:totem_urso": [{"id": "barbaro_totem_6", "label": "Aspecto da Besta", "minLevel": 6, "count": 1, "multiple": false, "options": ["Urso", "Águia", "Lobo"]}, {"id": "barbaro_totem_14", "label": "Sintonia Totêmica", "minLevel": 14, "count": 1, "multiple": false, "options": ["Urso", "Águia", "Lobo"]}], "barbaro:storm_herald": [{"id": "storm_herald_aura", "label": "Ambiente da Tempestade", "minLevel": 3, "count": 1, "multiple": false, "options": ["Deserto", "Mar", "Tundra"]}], "clerigo:vida": [], "clerigo:guerra": [], "druida:terra": [{"id": "druida_circulo_terra", "label": "Terreno do Círculo da Terra", "minLevel": 2, "count": 1, "multiple": false, "options": ["Ártico", "Costa", "Deserto", "Floresta", "Gramado", "Montanha", "Pântano", "Subterrâneo"]}], "druida:shepherd": [{"id": "shepherd_totem", "label": "Espírito Totêmico", "minLevel": 2, "count": 1, "multiple": false, "options": ["Urso", "Falcão", "Unicórnio"]}], "guerreiro:mestre_batalha": [{"id": "mestre_batalha_manobras_3", "label": "Manobras (nível 3)", "minLevel": 3, "countByLevel": [[3, 3], [7, 5], [10, 7], [15, 9]], "multiple": true, "options": ["Ataque de Precisão", "Ataque Desarmante", "Ataque de Comando", "Ataque de Empurrão", "Ataque de Varredura", "Manobra Evasiva", "Finta", "Golpe Amedrontador", "Reposte", "Aparar"]}], "guerreiro:arcane_archer": [{"id": "arcane_archer_shots", "label": "Opções de Flecha Arcana", "minLevel": 3, "countByLevel": [[3, 2], [7, 3], [10, 4], [15, 5], [18, 6]], "multiple": true, "options": ["Flecha Banidora", "Flecha Explosiva", "Flecha Agarradora", "Flecha Enfraquecedora", "Flecha Perfurante", "Flecha Sombria", "Flecha Desorientadora", "Flecha Procuradora"]}], "guerreiro:samurai": [{"id": "samurai_bonus_skill", "label": "Perícia de Elegância Cortesã", "minLevel": 3, "count": 1, "multiple": false, "options": ["História", "Intuição", "Atuação", "Persuasão"]}], "bardo:glamour": [{"id": "glamour_stage_style", "label": "Estilo de Performance Cativante", "minLevel": 3, "count": 1, "multiple": false, "options": ["Dança feérica", "Oratória encantadora", "Canção hipnótica", "Teatro ilusório"]}], "bardo:swords": [{"id": "swords_fighting_style", "label": "Estilo de Luta do Colégio das Espadas", "minLevel": 3, "count": 1, "multiple": false, "options": ["Duelo", "Combate com Duas Armas"]}, {"id": "swords_flourish_focus", "label": "Floresio favorito", "minLevel": 3, "count": 1, "multiple": false, "options": ["Defensivo", "Móvel", "Cortante"]}], "clerigo:forge": [{"id": "forge_blessing_target", "label": "Alvo da Benção da Forja", "minLevel": 1, "count": 1, "multiple": false, "options": ["Arma marcial", "Arma simples", "Armadura", "Escudo"]}], "clerigo:grave": [{"id": "grave_watch_focus", "label": "Ênfase da Sepultura", "minLevel": 1, "count": 1, "multiple": false, "options": ["Vigilância contra mortos-vivos", "Auxílio aos caídos", "Ritos funerários", "Leitura de presságios"]}], "druida:dreams": [{"id": "dreams_hearth_theme", "label": "Tema da Lareira Onírica", "minLevel": 6, "count": 1, "multiple": false, "options": ["Refúgio feérico", "Sonhos proféticos", "Névoa protetora", "Trilha lunar"]}], "monge:kensei": [{"id": "kensei_weapons_3", "label": "Armas do Kensei (nível 3)", "minLevel": 3, "count": 2, "multiple": true, "options": ["Adaga", "Azagaia", "Bordão", "Clava", "Espada Curta", "Espada Longa", "Florete", "Lança", "Arco Curto", "Arco Longo"]}, {"id": "kensei_weapons_6", "label": "Arma extra do Kensei", "minLevel": 6, "count": 1, "multiple": false, "options": ["Adaga", "Azagaia", "Bordão", "Clava", "Espada Curta", "Espada Longa", "Florete", "Lança", "Arco Curto", "Arco Longo"]}], "paladino:conquest": [{"id": "conquest_presence_style", "label": "Manifestação da Conquista", "minLevel": 3, "count": 1, "multiple": false, "options": ["Intimidação marcial", "Tirania sagrada", "Disciplina de ferro", "Terror calculado"]}], "paladino:redemption": [{"id": "redemption_emissary_style", "label": "Tom do Emissário da Redenção", "minLevel": 3, "count": 1, "multiple": false, "options": ["Diplomata compassivo", "Mediador firme", "Pacifista resoluto", "Confessor itinerante"]}], "patrulheiro:gloom_stalker": [{"id": "gloom_ambush_style", "label": "Estilo do Emboscador Assombroso", "minLevel": 3, "count": 1, "multiple": false, "options": ["Atacante sombrio", "Batedor silencioso", "Caçador urbano", "Vigia subterrâneo"]}], "patrulheiro:horizon_walker": [{"id": "horizon_planar_focus", "label": "Foco planar", "minLevel": 3, "count": 1, "multiple": false, "options": ["Éter", "Feérico", "Ínfero", "Celestial"]}], "patrulheiro:monster_slayer": [{"id": "monster_slayer_prey", "label": "Presa prioritária do Matador", "minLevel": 3, "count": 1, "multiple": false, "options": ["Conjuradores", "Aberrações", "Ínferos", "Mortos-vivos", "Dragões"]}], "patrulheiro:cacador": [{"id": "cacador_presa", "label": "Presa do Caçador", "minLevel": 3, "count": 1, "multiple": false, "options": ["Matador de Colossos", "Mata-gigantes", "Destruidor de Hordas"]}, {"id": "cacador_defesa", "label": "Tática Defensiva", "minLevel": 7, "count": 1, "multiple": false, "options": ["Escapar da Horda", "Defesa Contra Multiataque", "Pé de Aço"]}, {"id": "cacador_multiataque", "label": "Multiataque", "minLevel": 11, "count": 1, "multiple": false, "options": ["Ataque Giratório", "Voleio"]}, {"id": "cacador_defesa_suprema", "label": "Defesa Superior", "minLevel": 15, "count": 1, "multiple": false, "options": ["Esquiva Sobrenatural", "Evasão", "Resistir à Maré"]}], "feiticeiro:draconica": [{"id": "feiticeiro_linhagem_elemento", "label": "Ancestral dracônico", "minLevel": 1, "count": 1, "multiple": false, "options": ["Ácido", "Frio", "Fogo", "Relâmpago", "Veneno"]}], "feiticeiro:divine_soul": [{"id": "divine_soul_affinity", "label": "Afinidade divina", "minLevel": 1, "count": 1, "multiple": false, "options": ["Bem", "Lei", "Caos", "Mal", "Neutralidade"]}, {"id": "divine_soul_bonus_spell", "label": "Magia favorecida da Alma Divina", "minLevel": 1, "count": 1, "multiple": false, "options": ["Curar Ferimentos", "Bênção", "Comando", "Proteção contra o Bem e Mal"]}], "feiticeiro:shadow": [{"id": "shadow_hound_flavor", "label": "Aspecto do Cão do Mau Agouro", "minLevel": 6, "count": 1, "multiple": false, "options": ["Lupino sombrio", "Ave noturna", "Predador etéreo", "Sombra rastejante"]}], "feiticeiro:storm": [{"id": "storm_origin_sign", "label": "Sinal da magia da tempestade", "minLevel": 1, "count": 1, "multiple": false, "options": ["Cicatrizes de raio", "Olhos de tempestade", "Brisa constante", "Trovão distante"]}], "feiticeiro:divine_soul": [{"id": "divine_soul_affinity", "label": "Afinidade divina", "minLevel": 1, "count": 1, "multiple": false, "options": ["Bem", "Lei", "Caos", "Mal", "Neutralidade"]}], "bruxo:celestial": [{"id": "celestial_light_theme", "label": "Tom da Luz Curativa", "minLevel": 1, "count": 1, "multiple": false, "options": ["Luz solar", "Chama sagrada", "Estrelas curativas", "Aurora"]}], "bruxo:hexblade": [{"id": "hexblade_cursed_weapon", "label": "Arma favorecida da Lâmina Maldita", "minLevel": 1, "count": 1, "multiple": false, "options": ["Adaga", "Espada Curta", "Espada Longa", "Florete", "Lança", "Machado de Batalha", "Martelo de Guerra"]}]};
const ADVANCED_RESOURCE_RULES = {"base": {"barbaro": [{"id": "furia", "nome": "Fúria", "recarga": "Descanso longo", "formula": "n<3?2:n<6?3:n<12?4:n<17?5:6"}], "bardo": [{"id": "inspiracao_bardo", "nome": "Inspiração de Bardo", "recarga": "n>=5?\"Descanso curto\":\"Descanso longo\"", "formula": "Math.max(1, mods.modCarisma)"}], "bruxo": [{"id": "espacos_pacto", "nome": "Espaços de Pacto", "recarga": "Descanso curto", "formula": "(SPELL_SLOTS.warlock[n]||[0])[0]||0"}, {"id": "arcanum_6", "nome": "Arcanum Místico 6º", "recarga": "Descanso longo", "formula": "n>=11?1:0"}, {"id": "arcanum_7", "nome": "Arcanum Místico 7º", "recarga": "Descanso longo", "formula": "n>=13?1:0"}, {"id": "arcanum_8", "nome": "Arcanum Místico 8º", "recarga": "Descanso longo", "formula": "n>=15?1:0"}, {"id": "arcanum_9", "nome": "Arcanum Místico 9º", "recarga": "Descanso longo", "formula": "n>=17?1:0"}], "clerigo": [{"id": "canalizar_divindade", "nome": "Canalizar Divindade", "recarga": "Descanso curto", "formula": "n>=18?3:n>=6?2:n>=2?1:0"}], "druida": [{"id": "forma_selvagem", "nome": "Forma Selvagem", "recarga": "Descanso curto", "formula": "n>=20?999:(n>=2?2:0)"}], "feiticeiro": [{"id": "pontos_feiticaria", "nome": "Pontos de Feitiçaria", "recarga": "Descanso longo", "formula": "n>=2?n:0"}], "guerreiro": [{"id": "segundo_folego", "nome": "Segundo Fôlego", "recarga": "Descanso curto", "formula": "1"}, {"id": "surto_acao", "nome": "Surto de Ação", "recarga": "Descanso curto", "formula": "n>=17?2:n>=2?1:0"}, {"id": "indomavel", "nome": "Indomável", "recarga": "Descanso longo", "formula": "n>=17?3:n>=13?2:n>=9?1:0"}], "ladino": [{"id": "ataque_furtivo", "nome": "Ataque Furtivo", "recarga": "Por turno", "formula": "n>=1?1:0"}], "mago": [{"id": "recuperacao_arcana", "nome": "Recuperação Arcana", "recarga": "Descanso longo", "formula": "1"}], "monge": [{"id": "ki", "nome": "Pontos de Ki", "recarga": "Descanso curto", "formula": "n>=2?n:0"}], "paladino": [{"id": "sentido_divino", "nome": "Sentido Divino", "recarga": "Descanso longo", "formula": "1 + mods.modCarisma"}, {"id": "cura_pelas_maos", "nome": "Cura pelas Mãos", "recarga": "Descanso longo", "formula": "5*n"}, {"id": "canalizar_divindade", "nome": "Canalizar Divindade", "recarga": "Descanso curto", "formula": "n>=3?1:0"}], "patrulheiro": [{"id": "sentido_primevo", "nome": "Sentido Primevo", "recarga": "Gasta espaço de magia", "formula": "n>=3?1:0"}]}, "sub": {"bruxo:arquifada": [{"id": "presenca_feerica", "nome": "Presença Feérica", "recarga": "Descanso curto", "formula": "n>=1?1:0"}, {"id": "fuga_nebulosa", "nome": "Fuga Nebulosa", "recarga": "Descanso curto", "formula": "n>=6?1:0"}], "clerigo:guerra": [{"id": "sacerdote_guerra", "nome": "Sacerdote de Guerra", "recarga": "Descanso longo", "formula": "Math.max(1, mods.modSabedoria)"}], "druida:terra": [{"id": "recuperacao_natural", "nome": "Recuperação Natural", "recarga": "Descanso longo", "formula": "n>=2?1:0"}], "feiticeiro:selvagem": [{"id": "mare_do_caos", "nome": "Maré do Caos", "recarga": "Especial", "formula": "n>=1?1:0"}], "guerreiro:mestre_batalha": [{"id": "dados_superioridade", "nome": "Dados de Superioridade", "recarga": "Descanso curto", "formula": "n>=15?6:n>=7?5:n>=3?4:0"}], "mago:abjuracao": [{"id": "protecao_arcana", "nome": "Proteção Arcana", "recarga": "Especial", "formula": "n>=2?(2*n + mods.modInteligencia):0"}], "paladino:devocao": [{"id": "arma_sagrada", "nome": "Arma Sagrada", "recarga": "Compartilha Canalizar Divindade", "formula": "n>=3?1:0"}], "paladino:vinganca": [{"id": "voto_inimizade", "nome": "Voto de Inimizade", "recarga": "Compartilha Canalizar Divindade", "formula": "n>=3?1:0"}], "druida:dreams": [{"id": "balm_summer_court", "nome": "Bálsamo da Corte de Verão", "recarga": "Descanso longo", "formula": "n>=2?n:0"}], "druida:shepherd": [{"id": "spirit_totem", "nome": "Espírito Totêmico", "recarga": "Descanso curto", "formula": "n>=2?1:0"}], "guerreiro:arcane_archer": [{"id": "arcane_shot", "nome": "Disparo Arcano", "recarga": "Descanso curto", "formula": "n>=3?2:0"}], "guerreiro:samurai": [{"id": "fighting_spirit", "nome": "Espírito de Combate", "recarga": "Descanso longo", "formula": "n>=3?3:0"}], "feiticeiro:divine_soul": [{"id": "favored_by_gods", "nome": "Favorecido pelos Deuses", "recarga": "Descanso curto", "formula": "n>=1?1:0"}], "feiticeiro:shadow": [{"id": "strength_of_grave", "nome": "Força do Túmulo", "recarga": "Descanso longo", "formula": "n>=1?1:0"}], "bruxo:celestial": [{"id": "healing_light", "nome": "Luz Curativa", "recarga": "Descanso longo", "formula": "n>=1?(1+n):0"}], "bruxo:hexblade": [{"id": "hexblades_curse", "nome": "Maldição da Lâmina Maldita", "recarga": "Descanso curto", "formula": "n>=1?1:0"}]}};

function dedupeFeatureList(lista){
  const mapa = new Map();
  (lista||[]).forEach(f=>{ if(f && f.nome) mapa.set(`${f.level}::${f.nome}`, f); });
  return [...mapa.values()].sort((a,b)=>(a.level-b.level) || a.nome.localeCompare(b.nome, 'pt-BR'));
}
Object.entries(COMPLETE_CLASS_FEATURE_PATCH).forEach(([classe, extras])=>{
  CLASS_FEATURES[classe] = dedupeFeatureList([...(CLASS_FEATURES[classe]||[]), ...extras]);
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

const XANATHAR_SUBCLASS_PROFICIENCY_RULES = {
  'bardo:swords': { proficiencias: ['Armaduras médias', 'Cimitarras'] },
  'clerigo:forge': { proficiencias: ['Armaduras pesadas'] },
  'guerreiro:arcane_archer': { periciaPorGrupo: ['arcane_archer_lore_skill'] },
  'guerreiro:samurai': { periciaPorGrupo: ['samurai_bonus_skill'] },
  'ladino:scout': { pericias: ['Natureza', 'Sobrevivência'] },
  'monge:drunken_master': { pericias: ['Atuação'], ferramentas: ['Suprimentos de cervejeiro'] },
  'monge:kensei': { ferramentas: ['Suprimentos de caligrafia'] },
  'patrulheiro:gloom_stalker': { saveProfByLevel: [{ level: 7, saves: ['Sabedoria'] }] },
  'bruxo:hexblade': { proficiencias: ['Armaduras médias', 'Escudos', 'Armas marciais'] }
};

function getSelectedLabelsFromGroup(personagem, groupId){
  const groups = getClassOptionGroups(personagem?.classe, personagem?.nivel||1, personagem?.subclasse);
  const group = groups.find(g => g.id === groupId);
  if(!group) return [];
  const raw = (personagem?.opcoesClasse || {})[groupId];
  if(group.multiple){
    return [].concat(raw || []).map(v => {
      const found = (group.options||[]).find(opt => getNormalizedOptionValue(opt) === v);
      return found ? getNormalizedOptionLabel(found) : null;
    }).filter(Boolean);
  }
  const found = (group.options||[]).find(opt => getNormalizedOptionValue(opt) === raw);
  return found ? [getNormalizedOptionLabel(found)] : [];
}

function getSubclassGrantedBenefits(personagem){
  const p = personagem || {};
  const key = `${p.classe || ''}:${p.subclasse || ''}`;
  const rule = XANATHAR_SUBCLASS_PROFICIENCY_RULES[key] || {};
  const nivel = Number(p.nivel || 1);
  const out = { proficiencias: [], pericias: [], ferramentas: [], saves: [] };
  (rule.proficiencias || []).forEach(v => out.proficiencias.push(v));
  (rule.pericias || []).forEach(v => out.pericias.push(v));
  (rule.ferramentas || []).forEach(v => out.ferramentas.push(v));
  (rule.periciaPorGrupo || []).forEach(groupId => getSelectedLabelsFromGroup(p, groupId).forEach(v => out.pericias.push(v)));
  (rule.ferramentaPorGrupo || []).forEach(groupId => getSelectedLabelsFromGroup(p, groupId).forEach(v => out.ferramentas.push(v)));
  (rule.saveProfByLevel || []).forEach(entry => { if(nivel >= Number(entry.level || 1)) (entry.saves || []).forEach(v => out.saves.push(v)); });
  out.proficiencias = [...new Set(out.proficiencias)];
  out.pericias = [...new Set(out.pericias)];
  out.ferramentas = [...new Set(out.ferramentas)];
  out.saves = [...new Set(out.saves)];
  return out;
}

function getAllCharacterProficiencies(personagem){
  const base = [].concat(personagem?.proficienciasClasse || []);
  const extra = getSubclassGrantedBenefits(personagem).proficiencias;
  return [...new Set([...base, ...extra])];
}
function getAllCharacterSkills(personagem){
  const base = [].concat(personagem?.periciasOrigem || [], personagem?.periciasClasseSelecionadas || []);
  const extra = getSubclassGrantedBenefits(personagem).pericias;
  return [...new Set([...base, ...extra])];
}
function getAllCharacterTools(personagem){
  const base = [].concat(personagem?.ferramentas || []);
  const extra = getSubclassGrantedBenefits(personagem).ferramentas;
  return [...new Set([...base, ...extra])];
}
function getAllCharacterSaveProficiencies(personagem){
  const base = [].concat(personagem?.savesClasse || []);
  const extra = getSubclassGrantedBenefits(personagem).saves;
  return [...new Set([...base, ...extra])];
}
function getSubclassProficiencyNotes(personagem){
  const extra = getSubclassGrantedBenefits(personagem);
  const linhas = [];
  if(extra.proficiencias.length) linhas.push(`Proficiências bônus: ${extra.proficiencias.join(', ')}`);
  if(extra.pericias.length) linhas.push(`Perícias bônus: ${extra.pericias.join(', ')}`);
  if(extra.ferramentas.length) linhas.push(`Ferramentas bônus: ${extra.ferramentas.join(', ')}`);
  if(extra.saves.length) linhas.push(`Salvaguardas bônus: ${extra.saves.join(', ')}`);
  return linhas;
}

function patchSubclassFeature(classe, key, feature){
  const list = SUBCLASS_OPTIONS[classe] || [];
  const sub = list.find(s => s.key === key);
  if(!sub) return;
  sub.features = sub.features || [];
  if(!sub.features.some(f => f.level === feature.level && f.nome === feature.nome)) sub.features.unshift(feature);
}

patchSubclassFeature('clerigo', 'forge', { level: 1, nome: 'Proficiência Bônus', resumo: 'Recebe proficiência com armaduras pesadas.' });
patchSubclassFeature('guerreiro', 'arcane_archer', { level: 3, nome: 'Conhecimento do Arqueiro Arcano', resumo: 'Recebe proficiência em Arcanismo ou Natureza e aprende um truque temático.' });
patchSubclassFeature('monge', 'drunken_master', { level: 3, nome: 'Proficiência Bônus', resumo: 'Recebe proficiência em Atuação e suprimentos de cervejeiro.' });
patchSubclassFeature('monge', 'kensei', { level: 3, nome: 'Caminho do Pincel', resumo: 'Recebe proficiência com suprimentos de caligrafia.' });
patchSubclassFeature('patrulheiro', 'gloom_stalker', { level: 7, nome: 'Mente de Ferro', resumo: 'Recebe proficiência em testes de resistência de Sabedoria.' });
patchSubclassFeature('ladino', 'scout', { level: 3, nome: 'Sobrevivencialista', resumo: 'Recebe proficiência em Natureza e Sobrevivência.' });

if(Array.isArray(SUBCLASS_OPTION_RULES['guerreiro:arcane_archer']) && !SUBCLASS_OPTION_RULES['guerreiro:arcane_archer'].some(g => g.id === 'arcane_archer_lore_skill')){
  SUBCLASS_OPTION_RULES['guerreiro:arcane_archer'].push({ id: 'arcane_archer_lore_skill', label: 'Perícia do Conhecimento Arcano', minLevel: 3, count: 1, multiple: false, options: ['Arcanismo', 'Natureza'] });
}
function compileResourceRule(rule, n, mods){
  const formula = typeof rule.formula === 'number' ? String(rule.formula) : String(rule.formula || '0');
  const recarga = typeof rule.recarga === 'function' ? rule.recarga(n, mods) : (String(rule.recarga||''));
  let max = 0;
  try { max = Number(Function('n','mods','SPELL_SLOTS', `return (${formula});`)(n, mods, SPELL_SLOTS)); } catch(e) { max = 0; }
  return {id:rule.id,nome:rule.nome,max:Math.max(0, Math.floor(max)),atual:Math.max(0, Math.floor(max)),recarga,detalhe: rule.detalhe || ''};
}
function getClassResources(classe, nivel, personagem){
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
  if(p.classe === 'mago' && p.subclasse === 'war_magic' && n >= 2) out.push({id:'war_magic_init', titulo:'Inteligência Tática', valor:valorFormatadoBonus(calcularMod((p.atributos||{}).inteligencia||10)), detalhe:'Bônus adicional de Inteligência na iniciativa.'});
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
  if(p.classe === 'guerreiro' && p.subclasse === 'arcane_archer' && n >= 3) out.push({id:'arcane_archer_shots', titulo:'Disparo Arcano', valor:'2 usos por descanso curto', detalhe:(describeSelectedClassOptions(p).find(v=>v.startsWith('Opções de Flecha Arcana')) || 'Escolha as flechas arcanas disponíveis.')});
  if(p.classe === 'guerreiro' && p.subclasse === 'samurai' && n >= 3) out.push({id:'samurai_spirit', titulo:'Espírito de Combate', valor:'3 usos por descanso longo', detalhe:'Vantagem em ataques do turno e PV temporários.'});
  if(p.classe === 'monge' && p.subclasse === 'kensei' && n >= 3) out.push({id:'kensei_weapons', titulo:'Armas do Kensei', valor:(describeSelectedClassOptions(p).filter(v=>v.startsWith('Armas do Kensei') || v.startsWith('Arma extra do Kensei')).join(' • ') || 'Escolhas de arma pendentes.'), detalhe:'Essas armas viram a base do estilo do kensei.'});
  if(p.classe === 'feiticeiro' && p.subclasse === 'divine_soul' && n >= 1) out.push({id:'divine_soul_affinity', titulo:'Afinidade Divina', valor:(describeSelectedClassOptions(p).find(v=>v.startsWith('Afinidade divina')) || 'Afinidade pendente'), detalhe:(describeSelectedClassOptions(p).find(v=>v.startsWith('Magia favorecida da Alma Divina')) || 'Ajuda a determinar o viés da magia adicional da Alma Divina.')} );
  if(p.classe === 'bruxo' && p.subclasse === 'celestial' && n >= 1) out.push({id:'celestial_pool', titulo:'Luz Curativa', valor:`pool ${1+n}d6`, detalhe:(describeSelectedClassOptions(p).find(v=>v.startsWith('Tom da Luz Curativa')) || 'Cura à distância com ação bônus.')} );
  if(p.classe === 'bruxo' && p.subclasse === 'hexblade' && n >= 1) out.push({id:'hex_weapon', titulo:'Arma favorecida', valor:(describeSelectedClassOptions(p).find(v=>v.startsWith('Arma favorecida da Lâmina Maldita')) || 'Escolha pendente'), detalhe:'Referência rápida da arma ligada ao pacto marcial.'});
  if(p.classe === 'bardo' && p.subclasse === 'glamour' && n >= 3) out.push({id:'glamour_mantle', titulo:'Manto da Inspiração', valor:`${Math.max(1, modsSafeCha(p))} alvo(s) sugerido(s)`, detalhe:`${describeSelectedClassOptions(p).find(v=>v.startsWith('Estilo de Performance Cativante')) || 'Performance especial pendente.'}`});
  if(p.classe === 'bardo' && p.subclasse === 'whispers' && n >= 3) out.push({id:'whispers_words', titulo:'Palavras de Terror', valor:'pressão social e medo', detalhe:'Excelente para infiltração, interrogatório e manipulação fora de combate.'});
  if(p.classe === 'bardo' && p.subclasse === 'swords' && n >= 3) out.push({id:'swords_flourish', titulo:'Floresio de Lâmina', valor:(describeSelectedClassOptions(p).find(v=>v.startsWith('Estilo de Luta do Colégio das Espadas')) || 'Estilo de luta pendente'), detalhe:'Os floresios gastam Inspiração de Bardo para melhorar dano, defesa ou mobilidade.'});
  if(p.classe === 'clerigo' && p.subclasse === 'forge' && n >= 1) out.push({id:'forge_blessing', titulo:'Benção da Forja', valor:'+1 em arma ou armadura não mágica', detalhe:(describeSelectedClassOptions(p).find(v=>v.startsWith('Alvo da Benção da Forja')) || 'Escolha renovada a cada descanso longo.')} );
  if(p.classe === 'clerigo' && p.subclasse === 'grave' && n >= 1) out.push({id:'grave_mortality', titulo:'Círculo da Mortalidade', valor:'cura máxima em alvos caídos', detalhe:'Magias de cura em criaturas com 0 PV recuperam o máximo possível.'});
  if(p.classe === 'druida' && p.subclasse === 'shepherd' && n >= 6) out.push({id:'mighty_summoner', titulo:'Invocações Poderosas', valor:'+2 PV por dado de vida do convocado', detalhe:'Fortalece criaturas invocadas por suas magias.'});
  if(p.classe === 'guerreiro' && p.subclasse === 'cavalier' && n >= 3) out.push({id:'unwavering_mark', titulo:'Marca Inabalável', valor:'pressiona inimigos marcados', detalhe:'Punem alvos que ignorem sua presença defensiva na linha de frente.'});
  if(p.classe === 'monge' && p.subclasse === 'sun_soul' && n >= 3) out.push({id:'radiant_sun_bolt', titulo:'Rajada Solar Radiante', valor:getMartialArtsDie(n), detalhe:'Ataque radiante à distância que escala com o dado marcial do monge.'});
  if(p.classe === 'feiticeiro' && p.subclasse === 'storm' && n >= 1) out.push({id:'tempestuous_magic', titulo:'Magia Tempestuosa', valor:'voo curto após conjurar', detalhe:(describeSelectedClassOptions(p).find(v=>v.startsWith('Sinal da magia da tempestade')) || 'Permite reposicionamento aéreo seguro depois de lançar magia de 1º círculo ou maior.')} );
  if(p.classe === 'bruxo' && p.subclasse === 'celestial' && n >= 6) out.push({id:'radiant_soul', titulo:'Alma Radiante', valor:valorFormatadoBonus(calcularMod((p.atributos||{}).carisma||10)), detalhe:'Soma Carisma a um dano de fogo/radiante e a uma cura por magia relevante.'});
  if(p.classe === 'bruxo' && p.subclasse === 'hexblade' && n >= 1) out.push({id:'hex_warrior', titulo:'Guerreiro Hex', valor:'Carisma com a arma favorecida', detalhe:'A arma escolhida pode usar Carisma em ataque e dano, além das proficiências marciais adicionais.'});
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
