/* dnd5e/rules-subclasses.js: subclasses do PHB (2014) que faltavam, carregado depois de rules.js.
   Segue o formato de SUBCLASS_OPTIONS e XANATHAR_SUBCLASS_BONUS_SPELLS (rules.js).
   Cada item leva `fonte`. Itens com duas fontes independentes trazem as duas;
   itens com uma só fonte trazem o rótulo NÃO VERIFICADO.
   Nomes em português são tradução própria, a conferir com o livro em português.
   Lista de pendências: docs/TRABALHO_DND5E_SUBCLASSES.md. */

const PHB_SUB_F_EK = 'dnd5e.wikidot.com/fighter:eldritch-knight + arcaneeye.com (guia Eldritch Knight)';
const PHB_SUB_F_AT = 'dnd5e.wikidot.com/rogue:arcane-trickster + nerdsandscoundrels.com/arcane-trickster-5e';
const PHB_SUB_F_GOO = 'dnd5e.wikidot.com/warlock:great-old-one + arcaneeye.com (guia Great Old One)';
const PHB_SUB_F_4E = 'nerdsandscoundrels.com/way-of-the-four-elements + seaofstarlight.com/block/688012 (trecho do Player\'s Handbook)';
const PHB_SUB_F_ANC = 'dnd5e.wikidot.com/paladin:ancients + nerdsandscoundrels.com/oath-of-the-ancients';
const PHB_SUB_NV_CLERIGO_KNOW = 'dnd5e.wikidot.com/cleric:knowledge (NÃO VERIFICADO: fonte única para níveis e magias)';
const PHB_SUB_NV_CLERIGO_LIGHT = 'dnd5e.wikidot.com/cleric:light (NÃO VERIFICADO: fonte única para níveis e magias)';
const PHB_SUB_NV_CLERIGO_NATURE = 'dnd5e.wikidot.com/cleric:nature (NÃO VERIFICADO: fonte única para níveis e magias)';
const PHB_SUB_NV_CLERIGO_TEMPEST = 'dnd5e.wikidot.com/cleric:tempest (NÃO VERIFICADO: fonte única para níveis e magias)';
const PHB_SUB_NV_CLERIGO_TRICK = 'dnd5e.wikidot.com/cleric:trickery (NÃO VERIFICADO: fonte única para níveis e magias)';
const PHB_SUB_NV_MAGO_ILUSAO = 'dnd5e.wikidot.com/wizard:illusion (NÃO VERIFICADO: fonte única para níveis e mecânica)';
const PHB_SUB_NV_FEITICEIRO = 'dnd5e.wikidot.com/sorcerer:wild-magic (NÃO VERIFICADO: fonte única)';
const PHB_SUB_NV_BARBARO = 'dnd5e.wikidot.com/barbarian:totem-warrior (NÃO VERIFICADO: fonte única)';

/* 1. Subclasses novas (SUBCLASS_OPTIONS). As chaves batem com RULE_SUBCLASS_SPELLCASTING e RULE_SUBCLASS_SPELL_RULES do motor. */
const PHB_SUB_ADICOES = {
  guerreiro: [
    {key:'eldritch_knight', nome:'Cavaleiro Místico', source:'PHB', fonte:PHB_SUB_F_EK,
      resumo:'Guerreiro que combina combate marcial com magias de Abjuração e Evocação.',
      features:[
        {level:3, nome:'Conjuração', resumo:'Conjura magias de Mago pelo terço de conjurador, usando Inteligência.', fonte:PHB_SUB_F_EK},
        {level:3, nome:'Vínculo com a Arma', resumo:'Vincula até duas armas em um ritual curto e pode invocar uma como ação bônus.', fonte:PHB_SUB_F_EK},
        {level:7, nome:'Magia de Guerra', resumo:'Ao conjurar um truque com ação, pode fazer um ataque com arma como ação bônus.', fonte:PHB_SUB_F_EK},
        {level:10, nome:'Golpe Arcano', resumo:'Ao acertar um ataque com arma, o alvo fica em desvantagem na próxima salvaguarda contra suas magias.', fonte:PHB_SUB_F_EK},
        {level:15, nome:'Carga Arcana', resumo:'Ao usar Surto de Ação, pode se teleportar até 30 pés para um espaço visível e desocupado.', fonte:PHB_SUB_F_EK},
        {level:18, nome:'Magia de Guerra Aprimorada', resumo:'Ao conjurar uma magia com ação, pode fazer um ataque com arma como ação bônus.', fonte:PHB_SUB_F_EK}
      ]}
  ],
  ladino: [
    {key:'arcane_trickster', nome:'Trapaceiro Arcano', source:'PHB', fonte:PHB_SUB_F_AT,
      resumo:'Ladino que usa magias de Mago de Encantamento e Ilusão para furtividade e trapaça.',
      features:[
        {level:3, nome:'Conjuração', resumo:'Conjura magias de Mago pelo terço de conjurador, usando Inteligência.', fonte:PHB_SUB_F_AT},
        {level:3, nome:'Mão Mágica Trapaceira', resumo:'Sua Mão Mágica fica invisível e pode guardar ou pegar itens, arrombar fechaduras e desarmar armadilhas a distância.', fonte:PHB_SUB_F_AT},
        {level:9, nome:'Emboscada Mágica', resumo:'Se estiver escondido do alvo ao conjurar uma magia nele, o alvo tem desvantagem na salvaguarda contra ela naquele turno.', fonte:PHB_SUB_F_AT},
        {level:13, nome:'Trapaceiro Versátil', resumo:'Com ação bônus, marca uma criatura a até 5 pés da Mão Mágica para ter vantagem nos seus ataques contra ela.', fonte:PHB_SUB_F_AT},
        {level:17, nome:'Ladrão de Magias', resumo:'Com reação, força a salvaguarda de quem o mira com magia; se ela falhar, anula o efeito e copia a magia por 8 horas (uma vez por descanso longo).', fonte:PHB_SUB_F_AT}
      ]}
  ],
  bruxo: [
    {key:'great_old_one', nome:'Grande Antigo', source:'PHB', fonte:PHB_SUB_F_GOO,
      resumo:'Patrono de entidades alienígenas, com telepatia e controle mental.',
      features:[
        {level:1, nome:'Mente Desperta', resumo:'Fala telepaticamente com criaturas visíveis a até 30 pés que entendam ao menos um idioma.', fonte:PHB_SUB_F_GOO},
        {level:1, nome:'Magias Expandidas', resumo:'Acrescenta magias à lista de Bruxo, liberadas à medida que você avança de nível (ver lista de magias do patrono).', fonte:PHB_SUB_F_GOO},
        {level:6, nome:'Defesa Entrópica', resumo:'Com reação, dá desvantagem a um atacante; se ele errar, seu próximo ataque contra ele tem vantagem. Uma vez por descanso.', fonte:PHB_SUB_F_GOO},
        {level:10, nome:'Escudo do Pensamento', resumo:'Bloqueia leitura telepática, tem resistência a dano psíquico e devolve o dano psíquico ao atacante.', fonte:PHB_SUB_F_GOO},
        {level:14, nome:'Criar Escravo', resumo:'Com ação, toca um humanoide incapacitado e o enfeitiça até ser libertado por Remover Maldição ou pelo fim do efeito.', fonte:PHB_SUB_F_GOO}
      ]}
  ],
  monge: [
    {key:'four_elements', nome:'Caminho dos Quatro Elementos', source:'PHB', fonte:PHB_SUB_F_4E,
      resumo:'Monge que molda os elementos com ki por meio de disciplinas elementais.',
      features:[
        {level:3, nome:'Disciplinas Elementais', resumo:'Conhece a Sintonia Elemental (efeito menor sem custo de ki) e uma disciplina elemental; as disciplinas gastam ki.', fonte:PHB_SUB_F_4E},
        {level:6, nome:'Nova Disciplina Elemental', resumo:'Aprende mais uma disciplina elemental e pode trocar uma que já conhece.', fonte:PHB_SUB_F_4E},
        {level:11, nome:'Nova Disciplina Elemental', resumo:'Aprende mais uma disciplina elemental e pode trocar uma que já conhece.', fonte:PHB_SUB_F_4E},
        {level:17, nome:'Nova Disciplina Elemental', resumo:'Aprende mais uma disciplina elemental e pode trocar uma que já conhece.', fonte:PHB_SUB_F_4E}
      ]}
  ],
  paladino: [
    {key:'ancients', nome:'Juramento dos Anciões', source:'PHB', fonte:PHB_SUB_F_ANC,
      resumo:'Protetor da natureza e do equilíbrio, com magias da natureza e defesa contra magias.',
      features:[
        {level:3, nome:'Magias do Juramento', resumo:'Magias do juramento sempre preparadas (lista por nível em magias extras do paladino).', fonte:PHB_SUB_F_ANC},
        {level:3, nome:'Ira da Natureza', resumo:'Canalizar Divindade: vinhas espectrais prendem uma criatura a até 10 pés, que repete a salvaguarda a cada turno.', fonte:PHB_SUB_F_ANC},
        {level:3, nome:'Afastar o Infiel', resumo:'Canalizar Divindade: fadas e infernais a até 30 pés que ouçam você fazem salvaguarda de Sabedoria ou fogem.', fonte:PHB_SUB_F_ANC},
        {level:7, nome:'Aura de Proteção', resumo:'Você e aliados a até 10 pés têm resistência a dano de magia (30 pés a partir do 18º nível).', fonte:PHB_SUB_F_ANC},
        {level:15, nome:'Sentinela Imorredoura', resumo:'Ao cair a 0 PV sem morrer de imediato, fica com 1 PV (uma vez por descanso longo); não sofre penalidades de envelhecimento.', fonte:PHB_SUB_F_ANC},
        {level:20, nome:'Campeão Ancião', resumo:'Por 1 minuto, recupera 10 PV por turno, conjura magias de paladino de ação como ação bônus e inimigos próximos têm desvantagem em salvaguardas contra você.', fonte:PHB_SUB_F_ANC}
      ]}
  ],
  clerigo: [
    {key:'knowledge', nome:'Domínio do Conhecimento', source:'PHB', fonte:PHB_SUB_NV_CLERIGO_KNOW,
      resumo:'Busca a verdade e o saber oculto, com magias de adivinhação.',
      features:[
        {level:1, nome:'Bênçãos do Conhecimento', resumo:'Aprende dois idiomas e ganha proficiência em duas perícias de Arcanismo, História, Natureza ou Religião, com bônus dobrado.', fonte:PHB_SUB_NV_CLERIGO_KNOW},
        {level:2, nome:'Conhecimento dos Séculos', resumo:'Canalizar Divindade: ganha proficiência em uma perícia ou ferramenta escolhida por 10 minutos.', fonte:PHB_SUB_NV_CLERIGO_KNOW},
        {level:6, nome:'Ler Pensamentos', resumo:'Canalizar Divindade: lê os pensamentos superficiais de uma criatura falha na salvaguarda de Sabedoria e pode usar Sugestão nela.', fonte:PHB_SUB_NV_CLERIGO_KNOW},
        {level:8, nome:'Magia Potente', resumo:'Soma seu modificador de Sabedoria ao dano de qualquer truque de Clérigo.', fonte:PHB_SUB_NV_CLERIGO_KNOW},
        {level:17, nome:'Visões do Passado', resumo:'Medita sobre um objeto ou área para ver lampejos de eventos recentes (uma vez por descanso).', fonte:PHB_SUB_NV_CLERIGO_KNOW}
      ]},
    {key:'light', nome:'Domínio da Luz', source:'PHB', fonte:PHB_SUB_NV_CLERIGO_LIGHT,
      resumo:'Empunha a luz divina contra a escuridão e o mal.',
      features:[
        {level:1, nome:'Truque Bônus', resumo:'Aprende o truque Luz sem que ele conte no seu limite de truques.', fonte:PHB_SUB_NV_CLERIGO_LIGHT},
        {level:1, nome:'Chama Protetora', resumo:'Com reação, dá desvantagem a um atacante a até 30 pés que você veja; usos iguais ao modificador de Sabedoria.', fonte:PHB_SUB_NV_CLERIGO_LIGHT},
        {level:2, nome:'Radiância do Amanhecer', resumo:'Canalizar Divindade: dissipa escuridão mágica a até 30 pés e causa dano radiante a inimigos que falhem na salvaguarda de Constituição.', fonte:PHB_SUB_NV_CLERIGO_LIGHT},
        {level:6, nome:'Chama Aprimorada', resumo:'Chama Protetora também funciona quando uma criatura visível a até 30 pés ataca outra pessoa.', fonte:PHB_SUB_NV_CLERIGO_LIGHT},
        {level:8, nome:'Magia Potente', resumo:'Soma seu modificador de Sabedoria ao dano de qualquer truque de Clérigo.', fonte:PHB_SUB_NV_CLERIGO_LIGHT},
        {level:17, nome:'Coroa de Luz', resumo:'Com ação, cria por 1 minuto uma aura de luz solar que inimigos têm dificuldade em suportar contra fogo e radiante.', fonte:PHB_SUB_NV_CLERIGO_LIGHT}
      ]},
    {key:'nature', nome:'Domínio da Natureza', source:'PHB', fonte:PHB_SUB_NV_CLERIGO_NATURE,
      resumo:'Serve à natureza, com magias de animais, plantas e elementos.',
      features:[
        {level:1, nome:'Acólito da Natureza', resumo:'Aprende um truque de Druida que conta como truque de Clérigo e ganha proficiência em Adestrar Animais, Natureza ou Sobrevivência.', fonte:PHB_SUB_NV_CLERIGO_NATURE},
        {level:1, nome:'Proficiência Adicional', resumo:'Ganha proficiência com armadura pesada.', fonte:PHB_SUB_NV_CLERIGO_NATURE},
        {level:2, nome:'Encantar Animais e Plantas', resumo:'Canalizar Divindade: encanta bestas e plantas próximas que possam ver você.', fonte:PHB_SUB_NV_CLERIGO_NATURE},
        {level:6, nome:'Atenuar Elementos', resumo:'Com reação, concede a você ou a um aliado próximo resistência a um dano de ácido, frio, fogo, relâmpago ou trovão.', fonte:PHB_SUB_NV_CLERIGO_NATURE},
        {level:8, nome:'Golpe Divino', resumo:'Uma vez por turno, ao acertar um ataque com arma, causa dano extra de frio, fogo ou relâmpago.', fonte:PHB_SUB_NV_CLERIGO_NATURE},
        {level:17, nome:'Mestre da Natureza', resumo:'Com ação bônus, comanda seus animais e plantas encantados no turno seguinte deles.', fonte:PHB_SUB_NV_CLERIGO_NATURE}
      ]},
    {key:'tempest', nome:'Domínio da Tempestade', source:'PHB', fonte:PHB_SUB_NV_CLERIGO_TEMPEST,
      resumo:'Canaliza o poder dos céus, com relâmpagos e trovões.',
      features:[
        {level:1, nome:'Proficiências Adicionais', resumo:'Ganha proficiência com armas marciais e armadura pesada.', fonte:PHB_SUB_NV_CLERIGO_TEMPEST},
        {level:1, nome:'Ira da Tempestade', resumo:'Com reação, quando um atacante a 5 pés acerta você, ele faz salvaguarda de Destreza ou sofre dano de relâmpago ou trovão.', fonte:PHB_SUB_NV_CLERIGO_TEMPEST},
        {level:2, nome:'Ira Destrutiva', resumo:'Canalizar Divindade: causa dano máximo com um dano de relâmpago ou trovão em vez de rolar.', fonte:PHB_SUB_NV_CLERIGO_TEMPEST},
        {level:6, nome:'Golpe de Trovão', resumo:'Acertos de relâmpago em criaturas Grandes ou menores podem empurrá-las até 10 pés.', fonte:PHB_SUB_NV_CLERIGO_TEMPEST},
        {level:8, nome:'Golpe Divino', resumo:'Uma vez por turno, ao acertar um ataque com arma, causa 1d8 de dano extra de trovão (2d8 no 14º nível).', fonte:PHB_SUB_NV_CLERIGO_TEMPEST},
        {level:17, nome:'Nascido da Tempestade', resumo:'Ganha deslocamento de voo igual ao seu deslocamento terrestre quando não está em ambiente fechado ou subterrâneo.', fonte:PHB_SUB_NV_CLERIGO_TEMPEST}
      ]},
    {key:'trickery', nome:'Domínio da Trapaça', source:'PHB', fonte:PHB_SUB_NV_CLERIGO_TRICK,
      resumo:'Usa ilusões e ardis para enganar e proteger.',
      features:[
        {level:1, nome:'Bênção do Trapaceiro', resumo:'Com ação, concede a um aliado disposto vantagem em Furtividade por 1 hora.', fonte:PHB_SUB_NV_CLERIGO_TRICK},
        {level:2, nome:'Invocar Duplicidade', resumo:'Canalizar Divindade: cria uma ilusão sua por 1 minuto; você tem vantagem em ataques contra criaturas próximas que a vejam.', fonte:PHB_SUB_NV_CLERIGO_TRICK},
        {level:6, nome:'Capa das Sombras', resumo:'Canalizar Divindade: fica invisível até o fim do seu próximo turno; atacar ou conjurar uma magia encerra o efeito.', fonte:PHB_SUB_NV_CLERIGO_TRICK},
        {level:8, nome:'Golpe Divino', resumo:'Uma vez por turno, ao acertar um ataque com arma, causa dano extra de veneno (1d8, 2d8 no 14º nível).', fonte:PHB_SUB_NV_CLERIGO_TRICK},
        {level:17, nome:'Duplicidade Aprimorada', resumo:'Invocar Duplicidade cria até quatro duplicatas, que você pode mover com ação bônus.', fonte:PHB_SUB_NV_CLERIGO_TRICK}
      ]}
  ],
  mago: [
    {key:'illusion', nome:'Escola de Ilusão', source:'PHB', fonte:PHB_SUB_NV_MAGO_ILUSAO,
      resumo:'Manipula os sentidos com ilusões e imagens.',
      features:[
        {level:2, nome:'Sábio da Ilusão', resumo:'Reduz à metade o custo em ouro e tempo para copiar magias de Ilusão no seu grimório.', fonte:PHB_SUB_NV_MAGO_ILUSAO},
        {level:2, nome:'Ilusão Menor Aprimorada', resumo:'Aprende Ilusão Menor de graça e pode criar som e imagem juntos ao conjurá-la.', fonte:PHB_SUB_NV_MAGO_ILUSAO},
        {level:6, nome:'Ilusões Moldáveis', resumo:'Com ação, remodela uma ilusão de duração de 1 minuto ou mais que você possa ver.', fonte:PHB_SUB_NV_MAGO_ILUSAO},
        {level:10, nome:'Eu Ilusório', resumo:'Com reação, posiciona um duplicado que faz um ataque contra você errar (uma vez por descanso).', fonte:PHB_SUB_NV_MAGO_ILUSAO},
        {level:14, nome:'Realidade Ilusória', resumo:'Ao conjurar uma Ilusão de 1º círculo ou superior, pode tornar um objeto inanimado não mágico real por 1 minuto.', fonte:PHB_SUB_NV_MAGO_ILUSAO}
      ]}
  ]
};

Object.entries(PHB_SUB_ADICOES).forEach(([classe, lista])=>{
  SUBCLASS_OPTIONS[classe] = SUBCLASS_OPTIONS[classe] || [];
  lista.forEach(sub=>{
    if(!SUBCLASS_OPTIONS[classe].some(s=>s.key===sub.key)) SUBCLASS_OPTIONS[classe].push(sub);
  });
});

/* 2. Correções em subclasses já existentes (sem tocar em rules.js). */
(function(){
  const selvagem = (SUBCLASS_OPTIONS.feiticeiro || []).find(s=>s.key==='selvagem');
  if(selvagem && !selvagem.features.some(f=>f.nome==='Surto de Magia Selvagem')){
    selvagem.features.unshift({level:1, nome:'Surto de Magia Selvagem', resumo:'Após conjurar uma magia de 1º círculo ou superior, o mestre pode forçar um efeito aleatório de magia selvagem.', fonte:PHB_SUB_NV_FEITICEIRO});
  }
  const urso = (SUBCLASS_OPTIONS.barbaro || []).find(s=>s.key==='totem_urso');
  if(urso && !urso.features.some(f=>f.nome==='Buscador de Espíritos')){
    urso.features.splice(0, 0, {level:3, nome:'Buscador de Espíritos', resumo:'Ganha Sentido Animal e Falar com Animais, usáveis apenas como rituais.', fonte:PHB_SUB_NV_BARBARO});
  }
})();

/* 3. Magias extras de subclasse (XANATHAR_SUBCLASS_BONUS_SPELLS, rules.js). Chave = nível de classe em que a magia fica disponível. */
Object.assign(XANATHAR_SUBCLASS_BONUS_SPELLS, {
  'clerigo:knowledge': {1:["Comando","Identificar"],3:["Augúrio","Sugestão"],5:["Nondetecção","Falar com os Mortos"],7:["Olho Arcano","Confusão"],9:["Lendas","Vidência"]},
  'clerigo:light': {1:["Mãos Flamejantes","Fogo das Fadas"],3:["Esfera Flamejante","Raio Ardente"],5:["Luz do Dia","Bola de Fogo"],7:["Guardião da Fé","Muralha de Fogo"],9:["Coluna de Chamas","Vidência"]},
  'clerigo:nature': {1:["Amizade Animal","Falar com Animais"],3:["Pele de Árvore","Crescimento de Espinhos"],5:["Crescimento Vegetal","Muralha de Vento"],7:["Dominar Besta","Vinha Agarrante"],9:["Praga de Insetos","Passo Arbóreo"]},
  'clerigo:tempest': {1:["Névoa","Onda de Trovão"],3:["Rajada de Vento","Estilhaçar"],5:["Chamar Relâmpago","Tempestade de Granizo"],7:["Controlar Água","Tempestade de Gelo"],9:["Onda Destrutiva","Praga de Insetos"]},
  'clerigo:trickery': {1:["Enfeitiçar Pessoa","Disfarçar-se"],3:["Imagem Espelhada","Passagem Sem Rastro"],5:["Piscar","Dissipar Magia"],7:["Porta Dimensional","Polimorfia"],9:["Dominar Pessoa","Modificar Memória"]},
  'paladino:ancients': {3:["Golpe Enredante","Falar com Animais"],5:["Raio de Luar","Passo Nebuloso"],9:["Crescimento Vegetal","Proteção contra Energia"],13:["Tempestade de Gelo","Pele de Pedra"],17:["Comunhão com a Natureza","Passo Arbóreo"]},
  'bruxo:great_old_one': {1:["Palavras Dissonantes","Risada Hedionda de Tasha"],3:["Detectar Pensamentos","Força Fantasmagórica"],5:["Clarividência","Mensagem"],7:["Dominar Besta","Tentáculos Negros de Evard"],9:["Dominar Pessoa","Telecinesia"]}
});
