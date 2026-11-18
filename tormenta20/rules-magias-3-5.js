/* tormenta20/rules-magias-3-5.js: magias de 3º, 4º e 5º círculo (arcanas, divinas e universais) do livro do usuário,
   Tormenta20 Jogo do Ano, páginas 185 a 217 (descrições) e p176 (Tabela 4-1: custo em PM por círculo).

   substitui/complementa: nenhum id de T20_MAGIAS (que só tem 1º círculo). Complementa T20_MAGIAS_PENDENTES de
   rules-magias.js com os ids banimento, voo, videncia, campo-antimagia, terremoto, desejo, semiplano, toque-da-morte
   (mesmos nomes; o pendente não tinha id). "Sopro de Dragão", listado como pendente de 4º círculo, NÃO aparece no livro
   nas páginas de magias; ver relatório.

   FORMATO: mesmos campos de rules-magias.js (id, nome, circulo, escola, tipo, execucao, alcance, alvo, duracao,
   resistencia, efeito, fonte, verificado), mais:
     custoPM: custo base em PM (Tabela 4-1: 3º = 6, 4º = 10, 5º = 15).
     aprimoramentos: [{ custoPM, resumo }] quando o livro traz "+N PM".
   Diferenças em relação ao cabeçalho de rules-magias.js:
     - tipo: "universal" para as magias que o livro marca como Universal (podem ser usadas por arcanos e divinos).
       rules-magias.js só prevê "arcana" | "divina": a decisão de representar "universal" fica para a integração.
     - verificado: true aqui significa que os campos vieram legíveis deste livro (regra pedida para esta frente).
       O cabeçalho de rules-magias.js diz "true só com duas fontes". As duas regras precisam ser unificadas.
       Ficam verificado: false: Controlar Água, Lendas e Histórias, Libertação, Muralha Elemental e Relâmpago Flamejante
       de Reynard (aprimoramentos ambíguos ou com a coluna do livro mesclada).
   Nenhum texto do livro foi copiado: efeito é uma frase curta em palavras próprias. */


T20_MAGIAS.push(
  { id: "alterar-destino", nome: "Alterar Destino", circulo: 5, escola: "Adivinhação", tipo: "arcana",
    execucao: "Reação", alcance: "Pessoal", alvo: "Você", duracao: "Instantânea", resistencia: null,
    efeito: "Permite refazer um teste de resistência com bônus ou fazer um inimigo repetir um ataque com penalidade.",
    custoPM: 15, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p185 (livro do usuário)", verificado: true },

  { id: "alterar-memoria", nome: "Alterar Memória", circulo: 4, escola: "Encantamento", tipo: "arcana",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Vontade anula",
    efeito: "Apaga ou modifica as memórias recentes de uma criatura.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "Muda o alcance para pessoal e o alvo para um cone de 4,5 m." },
      { custoPM: 5, resumo: "Permite alterar ou apagar as memórias das últimas 24 horas." }],
    fonte: "Tormenta20 Jogo do Ano, p185 (livro do usuário)", verificado: true },

  { id: "ancora-dimensional", nome: "Âncora Dimensional", circulo: 3, escola: "Abjuração", tipo: "arcana",
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura ou objeto", duracao: "Cena", resistencia: null,
    efeito: "Envolve o alvo em um campo que bloqueia qualquer forma de movimento planar, inclusive teletransporte.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Alcance médio, esfera de 3 m e alvos escolhidos." },
      { custoPM: 2, resumo: "Cria um fio de energia que prende o alvo a um ponto fixo." },
      { custoPM: 4, resumo: "Como o fio, mas com uma corrente de 20 PV e RD 40." },
      { custoPM: 4, resumo: "Cubo de 9 m, duração permanente e chave de esmeralda que bloqueia entrada e saída planar." },
      { custoPM: 9, resumo: "Prende todos os alvos escolhidos ao centro de uma área com fios de energia." }],
    fonte: "Tormenta20 Jogo do Ano, p185 (livro do usuário)", verificado: true },

  { id: "animar-objetos", nome: "Animar Objetos", circulo: 4, escola: "Transmutação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Até 8 objetos Mínimos ou Pequenos, 4 Médios, 2 Grandes ou 1 Enorme", duracao: "Cena", resistencia: null,
    efeito: "Dá vida a objetos inanimados, que passam a servir como parceiros construtos sob seu comando.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 5, resumo: "Duração permanente, componente de prataria (T$ 1.000); limite de objetos igual à metade do nível." }],
    fonte: "Tormenta20 Jogo do Ano, p185 (livro do usuário)", verificado: true },

  { id: "anular-a-luz", nome: "Anular a Luz", circulo: 3, escola: "Necromancia", tipo: "divina",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Esfera de 6 m de raio", duracao: "Ver texto", resistencia: null,
    efeito: "Cria escuridão que dissipa magias de até 3º círculo na área, protege aliados e enjoa inimigos.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta em +1 o bônus de Defesa dos aliados." },
      { custoPM: 4, resumo: "Dissipa magias de até 4º círculo (exige 4º círculo)." },
      { custoPM: 9, resumo: "Dissipa magias de até 5º círculo (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p186 (livro do usuário)", verificado: true },

  { id: "aprisionamento", nome: "Aprisionamento", circulo: 5, escola: "Abjuração", tipo: "arcana",
    execucao: "Completa", alcance: "Curto", alvo: "1 criatura", duracao: "Permanente", resistencia: "Vontade anula",
    efeito: "Aprisiona a criatura numa prisão mágica escolhida pelo conjurador, até que uma condição definida a liberte.",
    custoPM: 15, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p186 (livro do usuário)", verificado: true },

  { id: "assassino-fantasmagorico", nome: "Assassino Fantasmagórico", circulo: 4, escola: "Necromancia", tipo: "arcana",
    execucao: "Padrão", alcance: "Longo", alvo: "1 criatura", duracao: "Cena, até ser descarregada", resistencia: "Vontade anula, Fortitude parcial",
    efeito: "Cria um espectro baseado no maior medo da vítima, que a persegue e pode causar dano de trevas ou colapso.",
    custoPM: 10, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p187 (livro do usuário)", verificado: true },

  { id: "aura-divina", nome: "Aura Divina", circulo: 5, escola: "Abjuração", tipo: "divina",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Esfera de 9 m de raio", duracao: "Cena", resistencia: "Vontade parcial",
    efeito: "Concede bônus de Defesa e resistência a aliados e enfraquece com condições os inimigos que entram na área.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta os bônus de Defesa e de resistência em +1." }],
    fonte: "Tormenta20 Jogo do Ano, p188 (livro do usuário)", verificado: true },

  { id: "banimento", nome: "Banimento", circulo: 3, escola: "Abjuração", tipo: "divina",
    execucao: "1d3+1 rodadas", alcance: "Curto", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Vontade parcial",
    efeito: "Expulsa uma criatura não nativa de Arton, devolvendo-a ao seu mundo ou destruindo mortos-vivos.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 0, resumo: "Sem teste de resistência; devolve automaticamente uma criatura conjurada ao plano de origem." }],
    fonte: "Tormenta20 Jogo do Ano, p188 (livro do usuário)", verificado: true },

  { id: "barragem-elemental-de-vectorius", nome: "Barragem Elemental de Vectorius", circulo: 5, escola: "Evocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Longo", alvo: "4 esferas elementais", duracao: "Instantânea", resistencia: "Reflexos parcial",
    efeito: "Quatro esferas de ácido, eletricidade, fogo e frio explodem em pontos escolhidos, causando dano e efeitos extras.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 5, resumo: "Aumenta o dano de cada esfera em +2d6." },
      { custoPM: 5, resumo: "Troca o tipo de dano de todas as esferas para essência." }],
    fonte: "Tormenta20 Jogo do Ano, p188 (livro do usuário)", verificado: true },

  { id: "buraco-negro", nome: "Buraco Negro", circulo: 5, escola: "Convocação", tipo: "universal",
    execucao: "Completa", alcance: "Longo", alvo: "Efeito: buraco negro", duracao: "3 rodadas", resistencia: "Fortitude parcial",
    efeito: "Cria um vácuo que puxa e depois suga criaturas e objetos próximos, sem que se saiba o destino deles.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 5, resumo: "O buraco negro não afeta o conjurador." }],
    fonte: "Tormenta20 Jogo do Ano, p188-p189 (livro do usuário)", verificado: true },

  { id: "campo-antimagia", nome: "Campo Antimagia", circulo: 4, escola: "Abjuração", tipo: "arcana",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Sustentada", resistencia: null,
    efeito: "Uma barreira de 3 m ao seu redor suprime magias e itens mágicos que entrarem nela.",
    custoPM: 10, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p189 (livro do usuário)", verificado: true },

  { id: "chuva-de-meteoros", nome: "Chuva de Meteoros", circulo: 5, escola: "Convocação", tipo: "arcana",
    execucao: "Completa", alcance: "Longo", alvo: "Quadrado de 18 m de lado", duracao: "Instantânea", resistencia: "Reflexos parcial",
    efeito: "Meteoros caem sobre a área causando dano de impacto e fogo, e prendem criaturas sob os escombros. Só a céu aberto.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 2, resumo: "Mais meteoros: +2d6 de impacto e +2d6 de fogo." }],
    fonte: "Tormenta20 Jogo do Ano, p189 (livro do usuário)", verificado: true },

  { id: "circulo-da-restauracao", nome: "Círculo da Restauração", circulo: 4, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Curto", alvo: "Esfera de 3 m de raio", duracao: "5 rodadas", resistencia: null,
    efeito: "Um círculo de luz restaura PV e PM de criaturas vivas que terminam o turno nele e fere mortos-vivos.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta a regeneração de PV em 1d8+1." }],
    fonte: "Tormenta20 Jogo do Ano, p190 (livro do usuário)", verificado: true },

  { id: "colera-de-azgher", nome: "Cólera de Azgher", circulo: 4, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Médio", alvo: "Esfera de 6 m de raio", duracao: "Instantânea", resistencia: "Reflexos parcial",
    efeito: "Uma explosão solar cega criaturas, causa dano de fogo e as deixa em chamas.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +2d6 (+2d8 contra mortos-vivos)." },
      { custoPM: 2, resumo: "Aumenta a área em +6 m de raio." },
      { custoPM: 5, resumo: "Dissipa magias de necromancia ativas na área (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p190 (livro do usuário)", verificado: true },

  { id: "coluna-de-chamas", nome: "Coluna de Chamas", circulo: 3, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Longo", alvo: "Cilindro de 3 m de raio e 30 m de altura", duracao: "Instantânea", resistencia: "Reflexos reduz à metade",
    efeito: "Um pilar de fogo sagrado desce do céu e causa dano de fogo e de luz às criaturas e objetos livres.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o dano de fogo em +1d6." },
      { custoPM: 1, resumo: "Aumenta o dano de luz em +1d6." }],
    fonte: "Tormenta20 Jogo do Ano, p190 (livro do usuário)", verificado: true },

  { id: "comunhao-com-a-natureza", nome: "Comunhão com a Natureza", circulo: 3, escola: "Adivinhação", tipo: "divina",
    execucao: "Completa", alcance: "Pessoal", alvo: "Você", duracao: "1 dia", resistencia: null,
    efeito: "Após se unir à natureza local, recebe dados de auxílio para perícias feitas em áreas naturais.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 1, resumo: "Execução de 1 minuto e efeito instantâneo, com 1d4+1 informações sobre a região." },
      { custoPM: 3, resumo: "Aumenta em +2 o número de dados de auxílio." },
      { custoPM: 4, resumo: "Muda o tipo dos dados de auxílio para d6." },
      { custoPM: 8, resumo: "Muda o tipo dos dados de auxílio para d8." }],
    fonte: "Tormenta20 Jogo do Ano, p190 (livro do usuário)", verificado: true },

  { id: "conceder-milagre", nome: "Conceder Milagre", circulo: 4, escola: "Encantamento", tipo: "divina",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Permanente até ser descarregada", resistencia: null,
    efeito: "Permite que o alvo lance uma magia de até 2º círculo que você conhece, sem pagar o custo em PM.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 4, resumo: "Muda a magia concedida para o 3º círculo e a penalidade de PM para –6." }],
    fonte: "Tormenta20 Jogo do Ano, p190 (livro do usuário)", verificado: true },

  { id: "conjurar-elemental", nome: "Conjurar Elemental", circulo: 4, escola: "Convocação", tipo: "arcana",
    execucao: "Completa", alcance: "Médio", alvo: "Parceiro elemental", duracao: "Sustentada", resistencia: null,
    efeito: "Transforma uma porção de elemento inerte em um elemental Grande que age como seu parceiro.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 5, resumo: "Elemental passa a Enorme e recebe dois tipos de parceiro do seu elemento." },
      { custoPM: 5, resumo: "Convoca um elemental de cada tipo (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p191 (livro do usuário)", verificado: true },

  { id: "contato-extraplanar", nome: "Contato Extraplanar", circulo: 3, escola: "Adivinhação", tipo: "arcana",
    execucao: "Completa", alcance: "Pessoal", alvo: "Você", duracao: "1 dia", resistencia: null,
    efeito: "Firma contrato com uma entidade de outro plano que concede dados de auxílio em troca do seu mana.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta em +1 o número de dados de auxílio." },
      { custoPM: 8, resumo: "Dados passam a ser d12, com perda de 2 PM ao rolar 12 (exige 4º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p192 (livro do usuário)", verificado: true },

  { id: "controlar-a-gravidade", nome: "Controlar a Gravidade", circulo: 4, escola: "Transmutação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Cubo de 12 m de lado", duracao: "Sustentada", resistencia: null,
    efeito: "Altera a gravidade de uma área, aumentando o peso das criaturas ou invertendo a queda delas.",
    custoPM: 10, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p192 (livro do usuário)", verificado: true },

  { id: "controlar-agua", nome: "Controlar Água", circulo: 3, escola: "Transmutação", tipo: "divina",
    execucao: "Padrão", alcance: "Longo", alvo: "Esfera de 30 m de raio", duracao: "Cena", resistencia: "Veja texto",
    efeito: "Congela, derrete, eleva, evapora ou abre caminho na água mundana da área, conforme o efeito escolhido.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano do efeito em +2d8 (a coluna do livro não deixa claro a qual efeito se aplica)." }],
    fonte: "Tormenta20 Jogo do Ano, p192-p193 (livro do usuário)", verificado: false },

  { id: "controlar-o-clima", nome: "Controlar o Clima", circulo: 4, escola: "Transmutação", tipo: "divina",
    execucao: "Completa", alcance: "2 km", alvo: "Esfera de 2 km de raio", duracao: "4d12 horas", resistencia: null,
    efeito: "Muda o clima da área para qualquer condição, como chuva, neve, ventos ou névoa.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 1, resumo: "Só para druidas: raio de 3 km e duração de 1d4 dias." }],
    fonte: "Tormenta20 Jogo do Ano, p193 (livro do usuário)", verificado: true },

  { id: "controlar-o-tempo", nome: "Controlar o Tempo", circulo: 5, escola: "Transmutação", tipo: "arcana",
    execucao: "Padrão", alcance: "Curto", alvo: "Veja texto", duracao: "Veja texto", resistencia: null,
    efeito: "Escolhe entre congelar o tempo ao redor por três rodadas, saltar no tempo ou voltar a rodada anterior.",
    custoPM: 15, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p193-p194 (livro do usuário)", verificado: true },

  { id: "controlar-terra", nome: "Controlar Terra", circulo: 3, escola: "Transmutação", tipo: "divina",
    execucao: "Padrão", alcance: "Longo", alvo: "9 cubos de 1,5 m de lado", duracao: "Instantânea", resistencia: "Veja texto",
    efeito: "Amolece ou molda terra e pedra da área, podendo derrubar um teto ou criar objetos simples.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o número de cubos em +2." },
      { custoPM: 1, resumo: "Você se funde a uma superfície de pedra ou terra adjacente por um dia." }],
    fonte: "Tormenta20 Jogo do Ano, p194 (livro do usuário)", verificado: true },

  { id: "convocacao-instantanea", nome: "Convocação Instantânea", circulo: 3, escola: "Convocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Ilimitado", alvo: "1 objeto de até 2 espaços", duracao: "Instantânea", resistencia: null,
    efeito: "Traz para a sua mão um objeto marcado com sua runa, de qualquer lugar, desde que ninguém o esteja carregando.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 1, resumo: "Até 1 hora depois, pode devolver o objeto ao local anterior com uma ação de movimento." },
      { custoPM: 1, resumo: "Esconde um baú médio no Éter Entre Mundos, com sacrifício de 1 PM." },
      { custoPM: 2, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 2, resumo: "Afeta objeto de até 10 espaços." }],
    fonte: "Tormenta20 Jogo do Ano, p194 (livro do usuário)", verificado: true },

  { id: "cupula-de-repulsao", nome: "Cúpula de Repulsão", circulo: 4, escola: "Abjuração", tipo: "divina",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Sustentada", resistencia: "Vontade anula",
    efeito: "Cria uma cúpula que impede criaturas de um tipo escolhido de se aproximarem do conjurador.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "A cúpula impede a aproximação a menos de 4,5 m." },
      { custoPM: 5, resumo: "Também barra ataques e efeitos à distância (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p195 (livro do usuário)", verificado: true },

  { id: "deflagracao-de-mana", nome: "Deflagração de Mana", circulo: 5, escola: "Evocação", tipo: "arcana",
    execucao: "Completa", alcance: "Pessoal", alvo: "Esfera de 15 m de raio", duracao: "Instantânea", resistencia: "Fortitude parcial",
    efeito: "Libera energia que causa 150 de dano de essência e torna mundanos os itens mágicos da área, poupando o conjurador.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o dano em +10." },
      { custoPM: 5, resumo: "Afeta apenas as criaturas escolhidas pelo conjurador." }],
    fonte: "Tormenta20 Jogo do Ano, p195-p196 (livro do usuário)", verificado: true },

  { id: "desejo", nome: "Desejo", circulo: 5, escola: "Transmutação", tipo: "arcana",
    execucao: "Completa", alcance: "Veja texto", alvo: "Veja texto", duracao: "Veja texto", resistencia: "Veja texto",
    efeito: "Altera a realidade: dissipa magias de até 4º círculo, transporta criaturas ou refaz um teste recente.",
    custoPM: 15, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p196 (livro do usuário)", verificado: true },

  { id: "desintegrar", nome: "Desintegrar", circulo: 4, escola: "Transmutação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura ou objeto", duracao: "Instantânea", resistencia: "Fortitude parcial",
    efeito: "Um raio causa dano de essência e reduz a pó o alvo que chegar a 0 PV, mesmo se passar na resistência.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 4, resumo: "Aumenta o dano total em +2d12 e o dano mínimo em +1d12." }],
    fonte: "Tormenta20 Jogo do Ano, p196 (livro do usuário)", verificado: true },

  { id: "despertar-consciencia", nome: "Despertar Consciência", circulo: 3, escola: "Encantamento", tipo: "divina",
    execucao: "Completa", alcance: "Toque", alvo: "1 animal ou planta", duracao: "1 dia", resistencia: null,
    efeito: "Torna um animal ou planta um parceiro racional que pode falar.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 4, resumo: "Alvo passa a ser uma escultura inanimada com características de construto." },
      { custoPM: 4, resumo: "Duração permanente, com penalidade de –3 PM." }],
    fonte: "Tormenta20 Jogo do Ano, p196 (livro do usuário)", verificado: true },

  { id: "dificultar-deteccao", nome: "Dificultar Detecção", circulo: 3, escola: "Abjuração", tipo: "arcana",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura ou objeto", duracao: "1 dia", resistencia: null,
    efeito: "Oculta o alvo de magias de detecção e adivinhação, inclusive detectar magia.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 4, resumo: "Muda o alvo para uma área cúbica de 9 m; quem entra recebe o efeito." },
      { custoPM: 4, resumo: "Muda a duração para 1 semana." }],
    fonte: "Tormenta20 Jogo do Ano, p196-p197 (livro do usuário)", verificado: true },

  { id: "dispersar-as-trevas", nome: "Dispersar as Trevas", circulo: 3, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Esfera de 6 m de raio", duracao: "Ver texto", resistencia: null,
    efeito: "Dissipa magias de até 3º círculo na área, protege aliados e cega inimigos com um brilho.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta em +1 o bônus de resistência dos aliados." },
      { custoPM: 4, resumo: "Alcance curto, alvo único e imunidade a efeitos de trevas para o alvo." },
      { custoPM: 4, resumo: "Dissipa magias de até 4º círculo (exige 4º círculo)." },
      { custoPM: 9, resumo: "Dissipa magias de até 5º círculo (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p197 (livro do usuário)", verificado: true },

  { id: "duplicata-ilusoria", nome: "Duplicata Ilusória", circulo: 4, escola: "Ilusão", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Cópia ilusória", duracao: "Cena", resistencia: null,
    efeito: "Cria uma cópia intangível de você que repete suas ações e pode originar magias.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 3, resumo: "Cria uma cópia adicional." }],
    fonte: "Tormenta20 Jogo do Ano, p197 (livro do usuário)", verificado: true },

  { id: "engenho-de-mana", nome: "Engenho de Mana", circulo: 5, escola: "Abjuração", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Disco de energia de 1,5 m de diâmetro", duracao: "Sustentada", resistencia: null,
    efeito: "Um disco anula magias lançadas perto dele e converte os PM gastos em PM temporários para o conjurador.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 1, resumo: "O disco flutua sempre adjacente a você, e não no ponto de conjuração." },
      { custoPM: 4, resumo: "Duração de um dia." }],
    fonte: "Tormenta20 Jogo do Ano, p198 (livro do usuário)", verificado: true },

  { id: "enxame-rubro-de-ichabod", nome: "Enxame Rubro de Ichabod", circulo: 3, escola: "Convocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Enxame Grande (quadrado de 3 m)", duracao: "Sustentada", resistencia: "Reflexos reduz à metade",
    efeito: "Invoca um enxame da Tormenta que causa dano de ácido a quem estiver em seu espaço no fim do seu turno.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 1, resumo: "Criatura que falhar fica agarrada pelo enxame." },
      { custoPM: 2, resumo: "Aumenta o dano em +1d12." },
      { custoPM: 2, resumo: "Muda o dano para trevas." },
      { custoPM: 3, resumo: "O enxame passa a ser Enorme (quadrado de 6 m)." },
      { custoPM: 3, resumo: "Ganha voo de 18 m e passa a ocupar um cubo." },
      { custoPM: 4, resumo: "Parasitas criam novos enxames no início de cada turno, com chance de 1d6." }],
    fonte: "Tormenta20 Jogo do Ano, p198 (livro do usuário)", verificado: true },

  { id: "erupcao-glacial", nome: "Erupção Glacial", circulo: 3, escola: "Evocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Quadrado de 6 m de lado", duracao: "Instantânea", resistencia: "Reflexos parcial",
    efeito: "Estacas de gelo surgem do chão, causando dano de corte e frio, derrubando criaturas e formando terreno difícil.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 3, resumo: "Aumenta o dano de frio e de corte em +2d6 cada." },
      { custoPM: 4, resumo: "Vira cilindro de 6 m de raio e altura, sustentado, com tempestade de granizo." }],
    fonte: "Tormenta20 Jogo do Ano, p198-p199 (livro do usuário)", verificado: true },

  { id: "explosao-caleidoscopica", nome: "Explosão Caleidoscópica", circulo: 4, escola: "Ilusão", tipo: "arcana",
    execucao: "Padrão", alcance: "Curto", alvo: "Esfera de 6 m de raio", duracao: "Instantânea", resistencia: "Fortitude parcial",
    efeito: "Luzes e sons desorientam as criaturas, com efeito que depende do nível ou ND de cada uma.",
    custoPM: 10, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p199 (livro do usuário)", verificado: true },

  { id: "ferver-sangue", nome: "Ferver Sangue", circulo: 3, escola: "Necromancia", tipo: "arcana",
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "Sustentada", resistencia: "Fortitude parcial",
    efeito: "Aquece o sangue do alvo, causando dano de fogo a cada turno dele, e pode fazer o corpo explodir ao chegar a 0 PV.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +1d8." },
      { custoPM: 9, resumo: "Muda o alvo para criaturas escolhidas (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p199 (livro do usuário)", verificado: true },

  { id: "forma-etherea", nome: "Forma Etérea", circulo: 4, escola: "Transmutação", tipo: "arcana",
    execucao: "Completa", alcance: "Pessoal", alvo: "Você", duracao: "Sustentada", resistencia: null,
    efeito: "Leva você e seu equipamento ao plano etéreo, onde pode atravessar objetos sólidos e voar.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 5, resumo: "Alcance de toque e até 5 criaturas de mãos dadas (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p199-p200 (livro do usuário)", verificado: true },

  { id: "furia-do-panteao", nome: "Fúria do Panteão", circulo: 5, escola: "Evocação", tipo: "divina",
    execucao: "Completa", alcance: "Longo", alvo: "Cubo de 90 m", duracao: "Sustentada", resistencia: "Veja texto",
    efeito: "Cria uma tempestade que impede ataques à distância e, a cada turno, gera nevasca, raios ou trovões.",
    custoPM: 15, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p200 (livro do usuário)", verificado: true },

  { id: "globo-de-invulnerabilidade", nome: "Globo de Invulnerabilidade", circulo: 3, escola: "Abjuração", tipo: "arcana",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Sustentada", resistencia: null,
    efeito: "Envolve você em uma esfera que detém magias de até 2º círculo, sem impedir que você lance magias para fora.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 4, resumo: "Passa a deter magias de até 3º círculo (exige 4º círculo)." },
      { custoPM: 9, resumo: "Passa a deter magias de até 4º círculo (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p200 (livro do usuário)", verificado: true },

  { id: "guardiao-divino", nome: "Guardião Divino", circulo: 4, escola: "Convocação", tipo: "divina",
    execucao: "Padrão", alcance: "Curto", alvo: "Elemental de luz invocado", duracao: "Cena ou até ser descarregado", resistencia: null,
    efeito: "Invoca um orbe de luz que voa e gasta seus pontos de luz para curar PV e remover condições de aliados.",
    custoPM: 10, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p200 (livro do usuário)", verificado: true },

  { id: "heroismo", nome: "Heroísmo", circulo: 3, escola: "Encantamento", tipo: "divina",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Torna o alvo imune a medo, com PV temporários e bônus de ataque e dano contra o inimigo mais poderoso.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o bônus contra o inimigo mais poderoso para +6." }],
    fonte: "Tormenta20 Jogo do Ano, p200 (livro do usuário)", verificado: true },

  { id: "ilusao-lacerante", nome: "Ilusão Lacerante", circulo: 3, escola: "Ilusão", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Cubo de 9 m", duracao: "Sustentada", resistencia: "Vontade anula",
    efeito: "Cria uma ilusão mortal que causa dano psíquico não letal a quem acredita nela, a cada turno que permanece na área.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 3, resumo: "Aumenta o dano em +2d6." },
      { custoPM: 4, resumo: "Muda a área para um cubo de 90 m (exige 4º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p201 (livro do usuário)", verificado: true },

  { id: "imobilizar", nome: "Imobilizar", circulo: 3, escola: "Encantamento", tipo: "universal",
    execucao: "Padrão", alcance: "Curto", alvo: "1 humanoide ou animal", duracao: "Cena", resistencia: "Vontade parcial",
    efeito: "Paralisa o alvo, ou o deixa lento se ele passar na resistência, e pode ser tentada uma saída a cada rodada.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 1, resumo: "Muda o alvo para um espírito." },
      { custoPM: 2, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 3, resumo: "Muda o alvo para uma criatura qualquer (exige 4º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p201 (livro do usuário)", verificado: true },

  { id: "intervencao-divina", nome: "Intervenção Divina", circulo: 5, escola: "Convocação", tipo: "divina",
    execucao: "Completa", alcance: "Veja texto", alvo: "Veja texto", duracao: "Veja texto", resistencia: "Veja texto",
    efeito: "Pede um milagre à divindade: cura 10 criaturas, dissipa magias de até 4º círculo ou realiza um feito maior.",
    custoPM: 15, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p201 (livro do usuário)", verificado: true },

  { id: "invulnerabilidade", nome: "Invulnerabilidade", circulo: 5, escola: "Abjuração", tipo: "universal",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Cria uma barreira que protege você contra efeitos mentais ou físicos, a sua escolha.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 5, resumo: "Alcance curto e alvo de uma criatura." }],
    fonte: "Tormenta20 Jogo do Ano, p201-p202 (livro do usuário)", verificado: true },

  { id: "lagrimas-de-wynna", nome: "Lágrimas de Wynna", circulo: 5, escola: "Abjuração", tipo: "divina",
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Vontade parcial",
    efeito: "Faz o alvo perder a capacidade de lançar magias arcanas até o fim da cena, ou por uma rodada se passar.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 2, resumo: "Muda a área para uma esfera de 6 m e o alvo para criaturas escolhidas." },
      { custoPM: 5, resumo: "Execução de um dia, com sacrifício de 1 PM e alvo mantido a curta distância." }],
    fonte: "Tormenta20 Jogo do Ano, p202 (livro do usuário)", verificado: true },

  { id: "lanca-ignea-de-aleph", nome: "Lança Ígnea de Aleph", circulo: 3, escola: "Evocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Reflexos parcial",
    efeito: "Um projétil de magma causa dano de fogo e perfuração, deixa o alvo em chamas e respinga em criaturas vizinhas.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 3, resumo: "Aumenta o dano inicial em +2d6 e o dano em chamas em +1d6." },
      { custoPM: 4, resumo: "Cria quatro dardos de lava que flutuam e podem ser disparados em rodadas seguintes." }],
    fonte: "Tormenta20 Jogo do Ano, p202 (livro do usuário)", verificado: true },

  { id: "legiao", nome: "Legião", circulo: 5, escola: "Encantamento", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Até 10 criaturas na área", duracao: "Sustentada", resistencia: "Vontade parcial",
    efeito: "Domina a mente de várias criaturas, que obedecem aos comandos até conseguirem se livrar do efeito.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o número de alvos em +1." }],
    fonte: "Tormenta20 Jogo do Ano, p202 (livro do usuário)", verificado: true },

  { id: "lendas-e-historias", nome: "Lendas e Histórias", circulo: 3, escola: "Adivinhação", tipo: "universal",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura, objeto ou local", duracao: "Sustentada", resistencia: null,
    efeito: "Revela informações sobre algo tocado, como se o conjurador tivesse passado em todos os testes de Conhecimento.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 4, resumo: "Execução de um dia e alcance ilimitado, com componente de cuba de ouro (T$ 1.000)." }],
    fonte: "Tormenta20 Jogo do Ano, p202 (livro do usuário)", verificado: false },

  { id: "libertacao", nome: "Libertação", circulo: 4, escola: "Abjuração", tipo: "universal",
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Torna o alvo imune a efeitos que impeçam ou restrinjam seu movimento, mesmo usando armadura ou escudo.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "Caminha sobre água e outros líquidos com seu deslocamento normal." },
      { custoPM: 2, resumo: "Pode escolher 20 em testes de Atletismo." },
      { custoPM: 2, resumo: "Pode escolher 20 em testes de Acrobacia e fazer manobras sem treinamento." }],
    fonte: "Tormenta20 Jogo do Ano, p202 (livro do usuário)", verificado: false },

  { id: "ligacao-sombria", nome: "Ligação Sombria", circulo: 4, escola: "Necromancia", tipo: "divina",
    execucao: "Padrão", alcance: "Longo", alvo: "1 criatura", duracao: "1 dia", resistencia: "Fortitude anula",
    efeito: "Liga o alvo a você, de modo que ele sofre todo dano e efeitos negativos que você sofrer.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 5, resumo: "A magia não termina se o alvo chegar a 0 PV." }],
    fonte: "Tormenta20 Jogo do Ano, p202-p203 (livro do usuário)", verificado: true },

  { id: "manto-de-sombras", nome: "Manto de Sombras", circulo: 3, escola: "Ilusão", tipo: "universal",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Sustentada", resistencia: null,
    efeito: "Torna você incorpóreo e permite se deslocar entre sombras, mas fica vulnerável à luz direta.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 4, resumo: "Alcance de toque e um alvo criatura (exige 4º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p203 (livro do usuário)", verificado: true },

  { id: "manto-do-cruzado", nome: "Manto do Cruzado", circulo: 4, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Sustentada", resistencia: null,
    efeito: "Reveste você com energia divina em uma de duas versões, luminosa ou sombria, que cura ou fere a cada turno.",
    custoPM: 10, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p203 (livro do usuário)", verificado: true },

  { id: "mao-poderosa-de-talude", nome: "Mão Poderosa de Talude", circulo: 4, escola: "Convocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Mão gigante de energia", duracao: "Sustentada", resistencia: null,
    efeito: "Cria uma mão que se posiciona entre você e um oponente, protegendo-o, agarrando ou empurrando o inimigo.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +1d6+5." },
      { custoPM: 5, resumo: "Bônus de Misticismo para +20 (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p203-p204 (livro do usuário)", verificado: true },

  { id: "marionete", nome: "Marionete", circulo: 4, escola: "Encantamento", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura", duracao: "Sustentada", resistencia: "Fortitude anula",
    efeito: "Controla as ações físicas do alvo a cada turno dele, enquanto a vítima mantém consciência de tudo.",
    custoPM: 10, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p204 (livro do usuário)", verificado: true },

  { id: "mata-dragao", nome: "Mata-Dragão", circulo: 5, escola: "Evocação", tipo: "arcana",
    execucao: "Duas rodadas", alcance: "Pessoal", alvo: "Cone de 30 m", duracao: "Instantânea", resistencia: "Reflexos reduz à metade",
    efeito: "Dispara uma carga de energia destrutiva num cone à frente, causando dano de essência em tudo que atinge.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o dano em +1d12." }],
    fonte: "Tormenta20 Jogo do Ano, p204 (livro do usuário)", verificado: true },

  { id: "miragem", nome: "Miragem", circulo: 3, escola: "Ilusão", tipo: "arcana",
    execucao: "Padrão", alcance: "Longo", alvo: "Cubo de até 90 m de lado", duracao: "1 dia", resistencia: "Vontade desacredita",
    efeito: "Faz um terreno parecer outro, incluindo sons e cheiros, podendo esconder estruturas e criar armadilhas.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 4, resumo: "Altera a aparência de criaturas escolhidas, como em Disfarce Ilusório." },
      { custoPM: 9, resumo: "Duração permanente, com pó de diamante (T$ 1.000) (exige 4º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p205 (livro do usuário)", verificado: true },

  { id: "missao-divina", nome: "Missão Divina", circulo: 3, escola: "Encantamento", tipo: "divina",
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "1 semana ou até ser descarregada", resistencia: "Vontade anula (veja texto)",
    efeito: "Obriga o alvo a cumprir uma tarefa, sob penalidade crescente em testes enquanto se recusar.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Alcance de toque e duração permanente, marcando a pele do alvo com um gatilho (penalidade de –1 PM)." },
      { custoPM: 4, resumo: "Duração de 1 ano ou até ser descarregada." }],
    fonte: "Tormenta20 Jogo do Ano, p205 (livro do usuário)", verificado: true },

  { id: "muralha-de-ossos", nome: "Muralha de Ossos", circulo: 4, escola: "Necromancia", tipo: "universal",
    execucao: "Padrão", alcance: "Médio", alvo: "Muro de ossos", duracao: "Cena", resistencia: null,
    efeito: "Um muro de ossos afiados causa dano de corte e prende criaturas no emaranhado, barrando o avanço inimigo.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 3, resumo: "Aumenta o comprimento em +15 m e a altura em +3 m." },
      { custoPM: 5, resumo: "O muro é feito de esqueletos animados que agarram quem começa o turno perto dele." }],
    fonte: "Tormenta20 Jogo do Ano, p205-p206 (livro do usuário)", verificado: true },

  { id: "muralha-elemental", nome: "Muralha Elemental", circulo: 3, escola: "Evocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Muralha de energia", duracao: "Cena", resistencia: "Veja texto",
    efeito: "Ergue uma muralha de um elemento escolhido, com efeitos variados conforme o elemento.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano de atravessar a muralha em +2d6." },
      { custoPM: 2, resumo: "Aumenta a muralha para até 60 m de comprimento e 9 m de altura." },
      { custoPM: 4, resumo: "Muralha invisível e indestrutível, sustentada, com o elemento Essência." },
      { custoPM: 12, resumo: "Duração de cena (exige 4º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p206 (livro do usuário)", verificado: false },

  { id: "palavra-primordial", nome: "Palavra Primordial", circulo: 5, escola: "Encantamento", tipo: "universal",
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura com menos níveis que você", duracao: "Instantânea ou veja texto", resistencia: "Vontade parcial",
    efeito: "Pronuncia uma palavra primordial que atordoa, cega, causa dano ou mata a criatura, conforme a escolha.",
    custoPM: 15, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p206-p207 (livro do usuário)", verificado: true },

  { id: "pele-de-pedra", nome: "Pele de Pedra", circulo: 3, escola: "Transmutação", tipo: "universal",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Dá ao corpo aspecto e dureza de rocha, com redução de dano.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 1, resumo: "Alcance de toque e um alvo criatura." },
      { custoPM: 4, resumo: "Duração de um dia." },
      { custoPM: 4, resumo: "Pele de aço, com RD 10 (exige 4º círculo)." },
      { custoPM: 4, resumo: "Transforma o alvo numa estátua inerte por 1d4 rodadas, com Fortitude anula." },
      { custoPM: 9, resumo: "Como o anterior, com duração permanente (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p207 (livro do usuário)", verificado: true },

  { id: "poeira-da-podridao", nome: "Poeira da Podridão", circulo: 3, escola: "Necromancia", tipo: "divina",
    execucao: "Padrão", alcance: "Médio", alvo: "Nuvem com 6 m de raio", duracao: "Cena", resistencia: "Fortitude (veja texto)",
    efeito: "Uma nuvem de energia negativa causa dano de trevas e impede a recuperação de PV de quem falha.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +1d8+4." }],
    fonte: "Tormenta20 Jogo do Ano, p207 (livro do usuário)", verificado: true },

  { id: "possessao", nome: "Possessão", circulo: 5, escola: "Encantamento", tipo: "arcana",
    execucao: "Padrão", alcance: "Longo", alvo: "1 criatura", duracao: "1 dia", resistencia: "Vontade anula",
    efeito: "Projeta sua consciência no corpo do alvo, que você controla por completo enquanto durar a magia.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 5, resumo: "Ganha acesso às habilidades de raça e classe da criatura." },
      { custoPM: 5, resumo: "Permite saltar de uma criatura possuída para outra." },
      { custoPM: 5, resumo: "Duração permanente, destruindo o próprio corpo no processo." }],
    fonte: "Tormenta20 Jogo do Ano, p207 (livro do usuário)", verificado: true },

  { id: "potencia-divina", nome: "Potência Divina", circulo: 3, escola: "Transmutação", tipo: "divina",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Sustentada", resistencia: null,
    efeito: "Aumenta seu tamanho e concede Força e redução de dano, mas impede que você lance magias.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o bônus de Força em +1." },
      { custoPM: 5, resumo: "Aumenta a redução de dano em +5." },
      { custoPM: 2, resumo: "Alcance de toque e um alvo criatura, que falha se não for devoto da mesma divindade." }],
    fonte: "Tormenta20 Jogo do Ano, p207 (livro do usuário)", verificado: true },

  { id: "premonicao", nome: "Premonição", circulo: 4, escola: "Adivinhação", tipo: "divina",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Permite que você repita um teste recém-feito, aceitando o novo resultado, uma vez por rodada.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 3, resumo: "Reação, alcance curto, alvo criatura e efeito instantâneo, forçando nova rolagem de outra criatura." },
      { custoPM: 10, resumo: "Duração de um dia." }],
    fonte: "Tormenta20 Jogo do Ano, p207 (livro do usuário)", verificado: true },

  { id: "protecao-contra-magia", nome: "Proteção contra Magia", circulo: 3, escola: "Abjuração", tipo: "divina",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Protege o alvo contra efeitos mágicos nocivos, dando bônus em testes de resistência contra magias.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 4, resumo: "Bônus de +10 (exige 4º círculo)." },
      { custoPM: 4, resumo: "Imunidade a uma escola de magia escolhida (exige 4º círculo)." },
      { custoPM: 9, resumo: "Imunidade a duas escolas de magia escolhidas (exige 5º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p208 (livro do usuário)", verificado: true },

  { id: "projetar-consciencia", nome: "Projetar Consciência", circulo: 5, escola: "Adivinhação", tipo: "universal",
    execucao: "Padrão", alcance: "Ilimitado (veja texto)", alvo: "Local ou criatura conhecidos", duracao: "Sustentada", resistencia: null,
    efeito: "Separa sua consciência do corpo para observar um local conhecido ou uma criatura em qualquer lugar do plano.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 10, resumo: "A projeção pode lançar magias sem componentes materiais e com duração diferente de sustentada." }],
    fonte: "Tormenta20 Jogo do Ano, p208 (livro do usuário)", verificado: true },

  { id: "raio-polar", nome: "Raio Polar", circulo: 4, escola: "Evocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Fortitude parcial",
    efeito: "Dispara um raio de gelo que causa dano de frio e prende o alvo num bloco de gelo.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 3, resumo: "Aumenta o dano em +2d8." },
      { custoPM: 5, resumo: "Muda o alvo para uma esfera de 6 m, lançando uma bola de gelo que explode." }],
    fonte: "Tormenta20 Jogo do Ano, p209 (livro do usuário)", verificado: true },

  { id: "reanimacao-impura", nome: "Reanimação Impura", circulo: 5, escola: "Necromancia", tipo: "divina",
    execucao: "Completa", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Reanima uma criatura morta recentemente como morto-vivo obediente, que mantém suas memórias e habilidades.",
    custoPM: 15, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p209 (livro do usuário)", verificado: true },

  { id: "relampago-flamejante-de-reynard", nome: "Relâmpago Flamejante de Reynard", circulo: 4, escola: "Evocação", tipo: "arcana",
    execucao: "Duas rodadas", alcance: "Médio", alvo: "Efeito: bolas de fogo e relâmpagos", duracao: "Sustentada", resistencia: "Reflexos reduz à metade",
    efeito: "Invoca fogo e relâmpago nas mãos, que podem ser lançados em esferas ou linhas ou combinados num ataque misto.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano das rajadas em +1d6 e o da rajada mista em +2d12." }],
    fonte: "Tormenta20 Jogo do Ano, p209-p210 (livro do usuário)", verificado: false },

  { id: "requiem", nome: "Réquiem", circulo: 5, escola: "Ilusão", tipo: "arcana",
    execucao: "Completa", alcance: "Curto", alvo: "Criaturas escolhidas", duracao: "Sustentada", resistencia: "Vontade anula",
    efeito: "Cria uma ilusão própria para cada alvo, que repete as mesmas ações do turno anterior com penalidade crescente.",
    custoPM: 15, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p210 (livro do usuário)", verificado: true },

  { id: "roubar-a-alma", nome: "Roubar a Alma", circulo: 5, escola: "Necromancia", tipo: "universal",
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "Permanente", resistencia: "Vontade parcial",
    efeito: "Arranca a alma do alvo e a prende num objeto, deixando o corpo em estase.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 5, resumo: "O objeto guarda os PM do alvo, que o conjurador pode usar enquanto segura o objeto." },
      { custoPM: 10, resumo: "Possui o corpo sem alma do alvo, como em Possessão." }],
    fonte: "Tormenta20 Jogo do Ano, p210 (livro do usuário)", verificado: true },

  { id: "segunda-chance", nome: "Segunda Chance", circulo: 5, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Instantânea", resistencia: null,
    efeito: "Restaura PV do alvo, que é curado de diversas condições em um brilho de asas de fênix.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta a cura em +20 PV." },
      { custoPM: 2, resumo: "Alcance curto e até 5 criaturas." },
      { custoPM: 5, resumo: "Pode curar uma criatura que tenha morrido há até uma rodada." }],
    fonte: "Tormenta20 Jogo do Ano, p211 (livro do usuário)", verificado: true },

  { id: "selo-de-mana", nome: "Selo de Mana", circulo: 3, escola: "Encantamento", tipo: "universal",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: "Vontade parcial",
    efeito: "Marca o alvo com um selo que faz suas ações com PM falharem, embora os PM sejam gastos mesmo assim.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 4, resumo: "Alcance curto e alvo de criaturas escolhidas (exige 4º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p211 (livro do usuário)", verificado: true },

  { id: "semiplano", nome: "Semiplano", circulo: 5, escola: "Convocação", tipo: "arcana",
    execucao: "Completa", alcance: "Curto", alvo: "Semiplano com 30 m de lado", duracao: "1 dia", resistencia: null,
    efeito: "Cria uma dimensão particular em que você e outros podem se esconder, e de onde pode voltar ao mesmo local.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 2, resumo: "Adiciona um alvo que é expulso para um semiplano labiríntico." },
      { custoPM: 5, resumo: "Duração permanente, com maquete de materiais preciosos (T$ 5.000)." }],
    fonte: "Tormenta20 Jogo do Ano, p211 (livro do usuário)", verificado: true },

  { id: "servo-divino", nome: "Servo Divino", circulo: 3, escola: "Convocação", tipo: "divina",
    execucao: "Padrão", alcance: "Curto", alvo: "Criatura conjurada", duracao: "Cena ou até ser descarregada", resistencia: null,
    efeito: "Invoca um espírito que cumpre uma tarefa de até uma hora, em troca de um pagamento.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 4, resumo: "Tarefa de até um dia, com pagamento de T$ 500." },
      { custoPM: 9, resumo: "Tarefa de até uma semana, com pagamento de T$ 1.000." }],
    fonte: "Tormenta20 Jogo do Ano, p211-p212 (livro do usuário)", verificado: true },

  { id: "servo-morto-vivo", nome: "Servo Morto-Vivo", circulo: 3, escola: "Necromancia", tipo: "universal",
    execucao: "Completa", alcance: "Toque", alvo: "1 cadáver", duracao: "Instantânea", resistencia: null,
    efeito: "Transforma um cadáver em esqueleto ou zumbi obediente, que pode absorver um dano por vez.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 3, resumo: "Cria um carniçal como parceiro veterano, com componente de pó de ônix negro (T$ 500)." },
      { custoPM: 3, resumo: "Cria uma sombra como parceiro veterano, com componente de pó de ônix negro (T$ 500)." },
      { custoPM: 7, resumo: "Cria uma múmia como parceiro mestre, com ferramentas de embalsamar (T$ 1.000)." }],
    fonte: "Tormenta20 Jogo do Ano, p212 (livro do usuário)", verificado: true },

  { id: "sombra-assassina", nome: "Sombra Assassina", circulo: 5, escola: "Ilusão", tipo: "arcana",
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "Cena", resistencia: "Vontade parcial",
    efeito: "Cria uma sombra ilusória que copia as ações hostis do alvo contra ele mesmo, com as mesmas estatísticas.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 10, resumo: "Muda o alvo para criaturas escolhidas na área." }],
    fonte: "Tormenta20 Jogo do Ano, p213 (livro do usuário)", verificado: true },

  { id: "sonho", nome: "Sonho", circulo: 4, escola: "Adivinhação", tipo: "arcana",
    execucao: "10 minutos", alcance: "Ilimitado", alvo: "1 criatura viva", duracao: "Veja texto", resistencia: null,
    efeito: "Entra nos sonhos de uma criatura viva para conversar com ela, deixando o conjurador indefeso enquanto isso.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "Transforma o sonho em pesadelo, com teste de Vontade e dano de trevas." }],
    fonte: "Tormenta20 Jogo do Ano, p213 (livro do usuário)", verificado: true },

  { id: "sopro-da-salvacao", nome: "Sopro da Salvação", circulo: 3, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Cone de 9 m", duracao: "Instantânea", resistencia: null,
    efeito: "Sopra luz em um cone que cura aliados e remove uma condição negativa de cada um deles.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta a cura em +1d8+2." },
      { custoPM: 4, resumo: "Leva PV negativos de aliados a 0 antes de curar." },
      { custoPM: 4, resumo: "Remove todas as condições listadas, e não apenas uma." }],
    fonte: "Tormenta20 Jogo do Ano, p213 (livro do usuário)", verificado: true },

  { id: "talho-invisivel-de-edauros", nome: "Talho Invisível de Edauros", circulo: 4, escola: "Evocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Cone de 9 m", duracao: "Instantânea", resistencia: "Fortitude parcial",
    efeito: "Dispara uma lâmina de ar que causa dano de corte e sangramento a quem está no cone.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +2d8." },
      { custoPM: 2, resumo: "Muda para um efeito sustentado que dispara lâminas de ar contra um alvo a distância médio." }],
    fonte: "Tormenta20 Jogo do Ano, p213 (livro do usuário)", verificado: true },

  { id: "telecinesia", nome: "Telecinesia", circulo: 3, escola: "Transmutação", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Veja texto", duracao: "Sustentada ou instantânea (veja texto)", resistencia: null,
    efeito: "Move criaturas ou objetos com a mente, seja de modo contínuo ou arremessando-os de uma vez.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 3, resumo: "Aumenta o tamanho máximo da criatura em uma categoria ou dobra os espaços do objeto." }],
    fonte: "Tormenta20 Jogo do Ano, p214 (livro do usuário)", verificado: true },

  { id: "teletransporte", nome: "Teletransporte", circulo: 3, escola: "Convocação", tipo: "arcana",
    execucao: "Padrão", alcance: "Toque", alvo: "Até 5 criaturas voluntárias", duracao: "Instantânea", resistencia: null,
    efeito: "Transporta os alvos a um lugar de até 1.000 km, cuja precisão depende do seu conhecimento sobre o destino.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o número de alvos em +5." },
      { custoPM: 2, resumo: "Leva os alvos a um santuário preparado, sem limite de distância no mesmo plano." },
      { custoPM: 9, resumo: "Cria um círculo de 1,5 m que transporta quem pisar nele, com sacrifício de 1 PM." }],
    fonte: "Tormenta20 Jogo do Ano, p214 (livro do usuário)", verificado: true },

  { id: "tentaculos-de-trevas", nome: "Tentáculos de Trevas", circulo: 3, escola: "Necromancia", tipo: "arcana",
    execucao: "Padrão", alcance: "Médio", alvo: "Esfera de 6 m de raio", duracao: "Cena", resistencia: null,
    efeito: "Tentáculos de treva agarram as criaturas da área e esmagam as que já estão presas.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o raio da área em +3 m." },
      { custoPM: 2, resumo: "Aumenta o dano dos tentáculos em +2d6." }],
    fonte: "Tormenta20 Jogo do Ano, p215 (livro do usuário)", verificado: true },

  { id: "terremoto", nome: "Terremoto", circulo: 4, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Longo", alvo: "Esfera de 30 m de raio", duracao: "1 rodada", resistencia: "Veja texto",
    efeito: "Um tremor de terra atordoa criaturas e causa efeitos diferentes conforme o terreno: teto, construções, fendas ou penhasco.",
    custoPM: 10, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p215 (livro do usuário)", verificado: true },

  { id: "toque-da-morte", nome: "Toque da Morte", circulo: 5, escola: "Necromancia", tipo: "universal",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Veja texto",
    efeito: "Causa dano de trevas e, se o alvo estiver com menos da metade dos PV, pode matá-lo com Fortitude.",
    custoPM: 15, aprimoramentos: [
      { custoPM: 2, resumo: "Alcance curto, disparando um raio púrpura do dedo." },
      { custoPM: 10, resumo: "Alcance curto e alvos de todos os inimigos no alcance, com raios de cada dedo." }],
    fonte: "Tormenta20 Jogo do Ano, p215 (livro do usuário)", verificado: true },

  { id: "transformacao-de-guerra", nome: "Transformação de Guerra", circulo: 3, escola: "Transmutação", tipo: "arcana",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Sustentada", resistencia: null,
    efeito: "Transforma você em máquina de combate, com bônus de Defesa e ataque, PV temporários e proficiência em armas, sem poder lançar magias.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta bônus em +1 e os PV temporários em +10." },
      { custoPM: 2, resumo: "Aspecto metálico com RD 10 e imunidade a atordoamento e cansaço." }],
    fonte: "Tormenta20 Jogo do Ano, p216 (livro do usuário)", verificado: true },

  { id: "viagem-arborea", nome: "Viagem Arbórea", circulo: 3, escola: "Convocação", tipo: "divina",
    execucao: "Completa", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Entra numa árvore grande e pode sair em outra árvore próxima, percebendo os arredores de dentro dela.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 2, resumo: "Alcance de toque e até 5 criaturas, viajando entre plantas de mesmo tamanho a até 100 km." }],
    fonte: "Tormenta20 Jogo do Ano, p216-p217 (livro do usuário)", verificado: true },

  { id: "viagem-planar", nome: "Viagem Planar", circulo: 4, escola: "Convocação", tipo: "universal",
    execucao: "Completa", alcance: "Toque", alvo: "Pessoal", duracao: "Instantânea", resistencia: null,
    efeito: "Viaja instantaneamente a outro plano da Criação, com destino definido pelo metal do bastão usado.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 2, resumo: "Muda o alvo para até cinco criaturas voluntárias que você esteja tocando." }],
    fonte: "Tormenta20 Jogo do Ano, p217 (livro do usuário)", verificado: true },

  { id: "videncia", nome: "Vidência", circulo: 3, escola: "Adivinhação", tipo: "universal",
    execucao: "Completa", alcance: "Ilimitado", alvo: "1 criatura", duracao: "Sustentada", resistencia: "Vontade anula",
    efeito: "Por uma superfície reflexiva, observa e ouve uma criatura e seus arredores, mesmo que ela se mova.",
    custoPM: 6, aprimoramentos: [],
    fonte: "Tormenta20 Jogo do Ano, p217 (livro do usuário)", verificado: true },

  { id: "visao-da-verdade", nome: "Visão da Verdade", circulo: 4, escola: "Adivinhação", tipo: "universal",
    execucao: "Movimento", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Permite ver através de camuflagem, escuridão e ilusões, enxergando a forma real das coisas.",
    custoPM: 10, aprimoramentos: [
      { custoPM: 1, resumo: "Alcance de toque e um alvo criatura." },
      { custoPM: 1, resumo: "O alvo recebe +10 em testes de Percepção." },
      { custoPM: 2, resumo: "O alvo recebe +10 em testes de Intuição." },
      { custoPM: 4, resumo: "O alvo enxerga através de paredes finas." }],
    fonte: "Tormenta20 Jogo do Ano, p217 (livro do usuário)", verificado: true },

  { id: "voo", nome: "Voo", circulo: 3, escola: "Transmutação", tipo: "arcana",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Concede deslocamento de voo, permitindo atacar e lançar magias durante o voo.",
    custoPM: 6, aprimoramentos: [
      { custoPM: 1, resumo: "Alcance de toque e um alvo criatura." },
      { custoPM: 4, resumo: "Duração de um dia (exige 4º círculo)." },
      { custoPM: 4, resumo: "Alcance curto e até 10 criaturas (exige 4º círculo)." }],
    fonte: "Tormenta20 Jogo do Ano, p217 (livro do usuário)", verificado: true }
);
