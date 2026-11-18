/* tormenta20/rules-magias-1-2.js: magias de 1º e 2º círculo (arcanas, divinas e universais) lidas do livro do usuário.
   SUBSTITUI/COMPLEMENTA rules-magias.js:
     - substitui por id (com dados do livro, verificado: true): alarme, armadura-arcana, bencao, comando,
       curar-ferimentos, escudo-da-fe (já existiam lá, como 1º círculo, com fonte de site);
     - complementa T20_MAGIAS_PENDENTES de 2º círculo: bola-de-fogo, invisibilidade, relampago (hoje só no índice);
     - bofetada-de-nimb (rules-magias.js) NÃO aparece nas listas de magias do livro: não é redefinida aqui.
   Nada é removido de rules-magias.js: a deduplicação ao final mantém a última ocorrência de cada id (esta).
   Custo base em PM (custoPM) segue a Tabela 4-1 do livro, p176: 1º círculo = 1 PM; 2º círculo = 3 PM.
   tipo "universal" = magia marcada como Universal no livro (p188 em diante); tipo "arcana" ou "divina" nos demais.
   Nenhum texto do livro foi copiado: "efeito" e "aprimoramentos[].resumo" são frases próprias.
   Carregue depois de rules-magias.js. Ainda NÃO ligado ao index.html. */


T20_MAGIAS.push(
  {
    id: "abencoar-alimentos", nome: "Abençoar Alimentos", circulo: 1, escola: "Transmutação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Alimento ou bebida para 1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Purifica uma porção de comida ou bebida e, se for consumida durante a magia, dá PV ou PM temporários.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 1, resumo: "Torna a duração permanente e transforma um frasco de água em água benta, com pó de prata." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p184 (livro do usuário)", verificado: true
  },
  {
    id: "acalmar-animal", nome: "Acalmar Animal", circulo: 1, escola: "Encantamento", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 animal", duracao: "Cena", resistencia: "Vontade anula",
    efeito: "Deixa um animal prestativo em relação a você, com bônus em Adestramento e Diplomacia contra ele; hostilidades encerram a magia.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o alcance para médio." },
      { custoPM: 1, resumo: "Muda o alvo para 1 monstro ou espírito com Inteligência –5 ou –4." },
      { custoPM: 2, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 5, resumo: "Muda o alvo para 1 monstro ou espírito (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p184 (livro do usuário)", verificado: true
  },
  {
    id: "adaga-mental", nome: "Adaga Mental", circulo: 1, escola: "Encantamento", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Vontade parcial",
    efeito: "Dispara uma lâmina imaterial que causa 2d6 de dano psíquico e pode atordoar o alvo por uma rodada.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Lança sem gestos nem palavras, deixando a adaga invisível." },
      { custoPM: 2, resumo: "Duração de um dia e você sabe a direção do alvo enquanto ele estiver no mesmo mundo." },
      { custoPM: 2, resumo: "Aumenta o dano em +1d6." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p184 (livro do usuário)", verificado: true
  },
  {
    id: "alarme", nome: "Alarme", circulo: 1, escola: "Abjuração", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Esfera de 9 m de raio", duracao: "1 dia", resistencia: null,
    efeito: "Cria uma barreira invisível que avisa, por telepatia ou som, quando uma criatura entra na área protegida.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Muda o alcance para pessoal; a área passa a ser emanada de você." },
      { custoPM: 5, resumo: "Percebe adivinhações usadas na área e pode tentar localizar quem as usou." },
      { custoPM: 9, resumo: "Duração até ser descarregada; com Vontade anula, paralisa o intruso por 1d4 rodadas." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p184 (livro do usuário)", verificado: true
  },
  {
    id: "aliado-animal", nome: "Aliado Animal", circulo: 2, escola: "Encantamento", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "1 animal prestativo", duracao: "1 dia", resistencia: null,
    efeito: "Cria um vínculo com um animal prestativo, que atua como parceiro veterano do tipo que você escolher.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Muda o alvo para um animal Minúsculo por 1 semana, que leva itens até um local designado." },
      { custoPM: 7, resumo: "O parceiro passa a ser mestre (requer 3º círculo)." },
      { custoPM: 12, resumo: "Invoca 2 animais prestativos, cada um com um tipo de parceiro diferente (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p184 (livro do usuário)", verificado: true
  },
  {
    id: "alterar-tamanho", nome: "Alterar Tamanho", circulo: 2, escola: "Transmutação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "1 objeto", duracao: "1 dia", resistencia: "Vontade anula (só para objeto de criatura involuntária)",
    efeito: "Aumenta ou diminui um objeto mundano em até três categorias de tamanho e pode deixá-lo rígido ou flexível.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 2, resumo: "Alcance toque e alvo criatura: ela cresce uma categoria e ganha Força +2 (Fortitude nega, se involuntária)." },
      { custoPM: 3, resumo: "Alcance toque e alvo criatura: ela diminui uma categoria e ganha Destreza +2 (requer 3º círculo)." },
      { custoPM: 7, resumo: "Duração permanente e Fortitude anula: reduz a criatura a Minúsculo (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p185 (livro do usuário)", verificado: true
  },
  {
    id: "amarras-etereas", nome: "Amarras Etéreas", circulo: 2, escola: "Convocação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura", duracao: "Cena", resistencia: "Reflexos anula",
    efeito: "Laços de energia prendem o alvo e o deixam agarrado até que ele rompa os laços ou que sejam destruídos.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 2, resumo: "Acrescenta um laço ao alvo escolhido." },
      { custoPM: 3, resumo: "Cada laço é destruído por um único ataque e libera dano de essência (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p185 (livro do usuário)", verificado: true
  },
  {
    id: "amedrontar", nome: "Amedrontar", circulo: 1, escola: "Necromancia", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 animal ou humanoide", duracao: "Cena", resistencia: "Vontade parcial",
    efeito: "Envolve o alvo em energia sombria que o apavora ou o deixa abalado.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Quem falhar fica apavorado por 1d4+1 rodadas, em vez de uma." },
      { custoPM: 2, resumo: "Muda o alvo para 1 criatura." },
      { custoPM: 5, resumo: "Afeta todos os alvos válidos que você escolher dentro do alcance." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p185 (livro do usuário)", verificado: true
  },
  {
    id: "aparencia-perfeita", nome: "Aparência Perfeita", circulo: 2, escola: "Ilusão", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Eleva seu Carisma e dá +5 em Diplomacia e Enganação, mas observadores notam a mudança quando a magia acaba.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Muda o alcance para toque e o alvo para 1 humanoide." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p186 (livro do usuário)", verificado: true
  },
  {
    id: "area-escorregadia", nome: "Área Escorregadia", circulo: 1, escola: "Convocação", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Quadrado de 3 m ou 1 objeto", duracao: "Cena", resistencia: "Reflexos (veja texto)",
    efeito: "Cobre uma superfície com substância escorregadia, derrubando quem falha e exigindo Acrobacia para se mover.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta a área em um quadrado de 1,5 m." },
      { custoPM: 2, resumo: "A CD dos testes de Acrobacia passa a ser 15." },
      { custoPM: 5, resumo: "A CD dos testes de Acrobacia passa a ser 20." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p186 (livro do usuário)", verificado: true
  },
  {
    id: "arma-espiritual", nome: "Arma Espiritual", circulo: 1, escola: "Convocação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Invoca a arma de sua divindade, que contra-ataca com 2d6 de dano quem o atinge corpo a corpo.",
    aprimoramentos: [
      { custoPM: 1, resumo: "A arma também concede +1 na Defesa." },
      { custoPM: 2, resumo: "Aumenta o bônus na Defesa em +1." },
      { custoPM: 2, resumo: "Duração sustentada; ataca um alvo adjacente com ação livre (requer 2º círculo)." },
      { custoPM: 2, resumo: "Muda o tipo do dano para essência (requer 2º círculo)." },
      { custoPM: 2, resumo: "Aumenta o dano da arma em +1d6." },
      { custoPM: 5, resumo: "Invoca duas armas, permitindo dois contra-ataques por rodada (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p186 (livro do usuário)", verificado: true
  },
  {
    id: "arma-magica", nome: "Arma Mágica", circulo: 1, escola: "Transmutação", tipo: "universal", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 arma empunhada", duracao: "Cena", resistencia: null,
    efeito: "Torna uma arma mágica, com +1 em ataques e dano, e permite usar seu atributo-chave de magia nos ataques.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o bônus em +1, limitado pelo círculo máximo que você pode lançar." },
      { custoPM: 2, resumo: "Causa +1d6 de dano de ácido, eletricidade, fogo ou frio, escolhido ao lançar (uso único)." },
      { custoPM: 3, resumo: "Muda o dano extra do aprimoramento anterior para +2d6." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p187 (livro do usuário)", verificado: true
  },
  {
    id: "armadura-arcana", nome: "Armadura Arcana", circulo: 1, escola: "Abjuração", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Cria uma película invisível que dá +5 na Defesa, somando-se a outras magias, mas não à armadura.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Execução reação: cria um escudo de +5 na Defesa contra um ataque específico." },
      { custoPM: 2, resumo: "Aumenta o bônus na Defesa em +1." },
      { custoPM: 2, resumo: "Muda a duração para um dia." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p187 (livro do usuário)", verificado: true
  },
  {
    id: "armamento-da-natureza", nome: "Armamento da Natureza", circulo: 1, escola: "Transmutação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 arma (veja texto)", duracao: "Cena", resistencia: null,
    efeito: "Torna uma arma primitiva, natural ou desarmada mais forte, com dano um passo maior e status de mágica.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Concede +1 nos testes de ataque com a arma." },
      { custoPM: 2, resumo: "Muda a execução para ação de movimento." },
      { custoPM: 3, resumo: "Aumenta o bônus nos testes de ataque em +1." },
      { custoPM: 5, resumo: "Aumenta o dano da arma em mais um passo." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p187 (livro do usuário)", verificado: true
  },
  {
    id: "augurio", nome: "Augúrio", circulo: 2, escola: "Adivinhação", tipo: "divina", custoPM: 3,
    execucao: "Completa", alcance: "Pessoal", alvo: "Você", duracao: "Instantânea", resistencia: null,
    efeito: "Revela se uma ação próxima trará resultados bons, ruins, ambos ou nenhum, sujeito a chance de falha.",
    aprimoramentos: [
      { custoPM: 3, resumo: "Execução de 1 minuto: consulta uma divindade sobre um evento de até um dia (requer 3º círculo)." },
      { custoPM: 7, resumo: "Consulta divina por 1 minuto, com perguntas de sim ou não (requer 4º círculo)." },
      { custoPM: 7, resumo: "O mestre rola 1d12 e a magia só falha no resultado 1." },
      { custoPM: 12, resumo: "O mestre rola 1d20 e a magia só falha no resultado 1." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p187 (livro do usuário)", verificado: true
  },
  {
    id: "aviso", nome: "Aviso", circulo: 1, escola: "Adivinhação", tipo: "universal", custoPM: 1,
    execucao: "Movimento", alcance: "Longo", alvo: "1 criatura", duracao: "Instantânea", resistencia: null,
    efeito: "Envia um aviso telepático a uma criatura, que recebe um alerta, uma mensagem curta ou sua localização.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Multiplica o alcance por 10." },
      { custoPM: 1, resumo: "Com mensagem, permite que o alvo responda com até 25 palavras." },
      { custoPM: 2, resumo: "Com localização, a duração vira cena e o alvo acompanha seus deslocamentos." },
      { custoPM: 3, resumo: "Aumenta o número de alvos em +1." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p188 (livro do usuário)", verificado: true
  },
  {
    id: "bencao", nome: "Bênção", circulo: 1, escola: "Encantamento", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Aliados", duracao: "Cena", resistencia: null,
    efeito: "Dá +1 em testes de ataque e rolagens de dano aos aliados e anula Perdição.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Muda o alvo para 1 cadáver, com duração de 1 semana, que não apodrece nem vira morto-vivo." },
      { custoPM: 2, resumo: "Aumenta os bônus em +1, limitado pelo círculo máximo que você pode lançar." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p188 (livro do usuário)", verificado: true
  },
  {
    id: "bola-de-fogo", nome: "Bola de Fogo", circulo: 2, escola: "Evocação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "Esfera de 6 m de raio", duracao: "Instantânea", resistencia: "Reflexos reduz à metade",
    efeito: "Explode em área causando 6d6 de dano de fogo a todas as criaturas e objetos livres dentro dela.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +2d6." },
      { custoPM: 2, resumo: "Cria uma esfera flamejante menor, que você pode mover e que causa 3d6 por rodada, por cena." },
      { custoPM: 3, resumo: "Cria uma pedra flamejante por um dia que detona como reação e funciona como arma de arremesso." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p188 (livro do usuário)", verificado: true
  },
  {
    id: "caminhos-da-natureza", nome: "Caminhos da Natureza", circulo: 1, escola: "Convocação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Criaturas escolhidas", duracao: "1 dia", resistencia: null,
    efeito: "Espíritos da natureza dão deslocamento extra às criaturas escolhidas e as livram do terreno difícil natural.",
    aprimoramentos: [
      { custoPM: 1, resumo: "A CD para rastrear os alvos em terreno natural aumenta em +10." },
      { custoPM: 2, resumo: "Aumenta o bônus de deslocamento em +3 m." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p189 (livro do usuário)", verificado: true
  },
  {
    id: "campo-de-forca", nome: "Campo de Força", circulo: 2, escola: "Abjuração", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Envolve você em uma película que concede 30 PV temporários.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Vira reação e instantânea: concede RD 30 contra o próximo dano sofrido." },
      { custoPM: 3, resumo: "Eleva os PV temporários ou a RD para 50 (requer 3º círculo)." },
      { custoPM: 7, resumo: "Eleva os PV temporários ou a RD para 70 (requer 4º círculo)." },
      { custoPM: 7, resumo: "Cria uma esfera imóvel ao redor de um alvo, que bloqueia tudo menos o ar (requer 4º círculo)." },
      { custoPM: 9, resumo: "Como a esfera anterior, mas o conteúdo fica quase sem peso e a esfera pode flutuar (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p189 (livro do usuário)", verificado: true
  },
  {
    id: "camuflagem-ilusoria", nome: "Camuflagem Ilusória", circulo: 2, escola: "Ilusão", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Deixa a imagem do alvo nublada, concedendo camuflagem leve.",
    aprimoramentos: [
      { custoPM: 3, resumo: "Duração sustentada e chance de falha da camuflagem sobe para 50%." },
      { custoPM: 7, resumo: "Alcance curto e alvo criaturas escolhidas (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p189 (livro do usuário)", verificado: true
  },
  {
    id: "circulo-da-justica", nome: "Círculo da Justiça", circulo: 2, escola: "Abjuração", tipo: "divina", custoPM: 3,
    execucao: "Completa", alcance: "Curto", alvo: "Esfera de 9 m de raio", duracao: "1 dia", resistencia: "Vontade parcial",
    efeito: "Impõe penalidades a quem está na área e impede mentiras deliberadas, com redução para quem passa na resistência.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Vira ação padrão, pessoal, com duração de cena e sem resistência; revela criaturas e objetos invisíveis por perto." },
      { custoPM: 3, resumo: "Penalidade nas perícias passa a –10 ou –20 (requer 4º círculo)." },
      { custoPM: 7, resumo: "Duração permanente, com balança de prata como componente material." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p189 (livro do usuário)", verificado: true
  },
  {
    id: "comando", nome: "Comando", circulo: 1, escola: "Encantamento", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 humanoide", duracao: "1 rodada", resistencia: "Vontade anula",
    efeito: "Dá uma ordem que o alvo cumpre no próprio turno, escolhida entre fugir, largar itens, parar, sentar ou se aproximar.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Muda o alvo para 1 criatura." },
      { custoPM: 2, resumo: "Aumenta o número de alvos em +1." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p190 (livro do usuário)", verificado: true
  },
  {
    id: "compreensao", nome: "Compreensão", circulo: 1, escola: "Adivinhação", tipo: "universal", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura ou texto", duracao: "Cena", resistencia: "Vontade anula (veja descrição)",
    efeito: "Permite entender textos e se comunicar com criaturas tocadas, além de ouvir os pensamentos de uma delas.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Muda o alcance para curto." },
      { custoPM: 2, resumo: "Alcance curto e alvos de criaturas escolhidas, que você entende; ouve só o pensamento de uma por vez." },
      { custoPM: 2, resumo: "Com 1 criatura, vasculha os pensamentos para extrair informações (requer 2º círculo)." },
      { custoPM: 5, resumo: "Você passa a falar, entender e escrever qualquer idioma (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p190 (livro do usuário)", verificado: true
  },
  {
    id: "concentracao-de-combate", nome: "Concentração de Combate", circulo: 1, escola: "Adivinhação", tipo: "arcana", custoPM: 1,
    execucao: "Livre", alcance: "Pessoal", alvo: "Você", duracao: "1 rodada", resistencia: null,
    efeito: "Ao fazer um teste de ataque, você rola dois dados e usa o melhor resultado.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Execução padrão e duração de cena (requer 2º círculo)." },
      { custoPM: 5, resumo: "Ao atacar, o inimigo rola dois dados e usa o pior resultado (requer 3º círculo)." },
      { custoPM: 9, resumo: "Afeta criaturas escolhidas em alcance curto por cena (requer 4º círculo)." },
      { custoPM: 14, resumo: "Duração de um dia e sentido de perigo que deixa você imune a surpreendido e desprevenido (requer 5º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p191 (livro do usuário)", verificado: true
  },
  {
    id: "condicao", nome: "Condição", circulo: 2, escola: "Adivinhação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "Até 5 criaturas", duracao: "Cena", resistencia: null,
    efeito: "Revela a posição e o estado de criaturas escolhidas, sem limite de distância, enquanto a magia durar.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 1, resumo: "Muda a duração para um dia." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p191 (livro do usuário)", verificado: true
  },
  {
    id: "conjurar-monstro", nome: "Conjurar Monstro", circulo: 1, escola: "Convocação", tipo: "arcana", custoPM: 1,
    execucao: "Completa", alcance: "Curto", alvo: "1 criatura conjurada (construto de energia)", duracao: "Sustentada", resistencia: null,
    efeito: "Cria um monstro Pequeno de energia que ataca, se move ou serve de origem para suas magias sob suas ordens.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Dá ao monstro deslocamento de escalada ou natação igual ao terrestre." },
      { custoPM: 1, resumo: "Aumenta o deslocamento do monstro em +3 m." },
      { custoPM: 1, resumo: "Muda o dano do ataque para ácido, fogo, frio ou eletricidade." },
      { custoPM: 2, resumo: "Aumenta os PV do monstro em +10 por categoria de tamanho a partir de Pequeno." },
      { custoPM: 2, resumo: "Aumenta o tamanho do monstro para Médio, com ataque de 2d6+6." },
      { custoPM: 2, resumo: "Concede ao monstro resistência 5 contra dois tipos de dano." },
      { custoPM: 4, resumo: "Nova ordem, Arma de Sopro: cone de 6 m com o dobro do dano de ataque e Reflexos reduz à metade." },
      { custoPM: 5, resumo: "Aumenta o tamanho do monstro para Grande, com ataque de 4d6+10 (requer 2º círculo)." },
      { custoPM: 9, resumo: "Concede deslocamento de voo igual ao dobro do deslocamento." },
      { custoPM: 9, resumo: "Concede imunidade a dois tipos de dano." },
      { custoPM: 9, resumo: "Aumenta o tamanho do monstro para Enorme (requer 4º círculo)." },
      { custoPM: 14, resumo: "Aumenta o tamanho do monstro para Colossal (requer 5º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p191 (livro do usuário)", verificado: true
  },
  {
    id: "conjurar-mortos-vivos", nome: "Conjurar Mortos-Vivos", circulo: 2, escola: "Necromancia", tipo: "universal", custoPM: 3,
    execucao: "Completa", alcance: "Curto", alvo: "6 mortos-vivos (esqueletos)", duracao: "Sustentada", resistencia: null,
    efeito: "Conjura seis esqueletos de energia negativa que andam ou atacam criaturas adjacentes sob suas ordens.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o número de mortos-vivos conjurados em +1." },
      { custoPM: 3, resumo: "Conjura carniçais no lugar dos esqueletos, com paralisia por 1 rodada (requer 3º círculo)." },
      { custoPM: 7, resumo: "Conjura sombras no lugar dos esqueletos, que drenam PM (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p192 (livro do usuário)", verificado: true
  },
  {
    id: "consagrar", nome: "Consagrar", circulo: 1, escola: "Evocação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Longo", alvo: "Esfera de 9 m de raio", duracao: "1 dia", resistencia: null,
    efeito: "Maximiza os PV curados por luz na área e enfraquece mortos-vivos que estiverem nela.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Mortos-vivos na área sofrem –2 em testes e na Defesa." },
      { custoPM: 2, resumo: "Aumenta a penalidade dos mortos-vivos em –1, limitada pelo círculo máximo que você pode lançar." },
      { custoPM: 9, resumo: "Execução de 1 hora e duração permanente, com incenso e óleos (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p192 (livro do usuário)", verificado: true
  },
  {
    id: "controlar-fogo", nome: "Controlar Fogo", circulo: 2, escola: "Evocação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "Veja o efeito escolhido", duracao: "Cena", resistencia: null,
    efeito: "Cria, molda, move ou apaga chamas, ou esquenta um objeto, conforme o efeito escolhido ao lançar.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Muda a duração para sustentada e a resistência para Reflexos reduz à metade; adiciona o efeito labaredas." },
      { custoPM: 2, resumo: "Aumenta o dano em +1d6, exceto no efeito chamejar." },
      { custoPM: 3, resumo: "Transforma o alvo em 1 criatura feita de fogo, que cai a 0 PV se falhar em Fortitude parcial." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p193 (livro do usuário)", verificado: true
  },
  {
    id: "controlar-madeira", nome: "Controlar Madeira", circulo: 2, escola: "Transmutação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "1 objeto de madeira Grande ou menor", duracao: "Cena", resistencia: "Vontade anula (só para objeto de criatura involuntária)",
    efeito: "Molda, fortalece, repele ou estraga um objeto de madeira, conforme o efeito escolhido ao lançar.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Você vira uma árvore Grande por um dia, sem falar, mas percebendo os arredores." },
      { custoPM: 3, resumo: "Vegetação em quadrado de 9 m fica rígida e afiada, causando dano de corte a quem anda nela." },
      { custoPM: 7, resumo: "Muda o tamanho do alvo para Enorme ou menor (requer 3º círculo)." },
      { custoPM: 12, resumo: "Muda o tamanho do alvo para Colossal ou menor (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p193 (livro do usuário)", verificado: true
  },
  {
    id: "controlar-plantas", nome: "Controlar Plantas", circulo: 1, escola: "Transmutação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Quadrado de 9 m de lado", duracao: "Cena", resistencia: "Reflexos anula",
    efeito: "Faz a vegetação da área enredar as criaturas que falharem, deixando o terreno difícil.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Duração instantânea: as plantas são podadas e o terreno volta ao normal." },
      { custoPM: 1, resumo: "Criaturas que falharem também ficam imóveis." },
      { custoPM: 2, resumo: "Você se comunica com plantas, que ficam prestativas, e pode usar Diplomacia com elas." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p194 (livro do usuário)", verificado: true
  },
  {
    id: "cranio-voador-de-vladislav", nome: "Crânio Voador de Vladislav", circulo: 2, escola: "Necromancia", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Fortitude parcial",
    efeito: "Lança um crânio de energia negativa que causa 4d8+4 de dano de trevas e abala o alvo e quem está perto dele.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +1d8+1." },
      { custoPM: 2, resumo: "Aumenta o número de alvos em +1." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p194 (livro do usuário)", verificado: true
  },
  {
    id: "criar-elementos", nome: "Criar Elementos", circulo: 1, escola: "Convocação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Elemento escolhido (água, ar, fogo ou terra)", duracao: "Instantânea", resistencia: null,
    efeito: "Cria uma pequena porção real de água, ar, fogo ou terra, conforme o elemento escolhido.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta a quantidade do elemento em um passo." },
      { custoPM: 1, resumo: "Muda o efeito para atingir uma criatura ou objeto com dano de impacto (Reflexos reduz à metade)." },
      { custoPM: 1, resumo: "Com fogo, aumenta o dano inicial de cada chama em +1d6." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p194 (livro do usuário)", verificado: true
  },
  {
    id: "criar-ilusao", nome: "Criar Ilusão", circulo: 1, escola: "Ilusão", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Médio", alvo: "Ilusão que se estende a até 4 cubos de 1,5 m", duracao: "Cena", resistencia: "Vontade desacredita",
    efeito: "Cria uma imagem ou um som simples, que criaturas atravessam sem dano, podendo esconder um inimigo ou armadilha.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Duração sustentada e você move a imagem ou altera o som a cada rodada." },
      { custoPM: 1, resumo: "Aumenta o efeito em mais 1 cubo de 1,5 m." },
      { custoPM: 1, resumo: "Combina imagem e som, e permite sons complexos com volume de cinco pessoas por cubo." },
      { custoPM: 2, resumo: "Acrescenta odores e sensações térmicas." },
      { custoPM: 2, resumo: "Alcance longo e esfera de 30 m com som de multidão, que atrapalha magias (requer 2º círculo)." },
      { custoPM: 2, resumo: "Acrescenta sensações táteis que enganam quem não sabe que é ilusão (requer 2º círculo)." },
      { custoPM: 5, resumo: "Duração sustentada e você pode modificar a ilusão livremente (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p195 (livro do usuário)", verificado: true
  },
  {
    id: "curar-ferimentos", nome: "Curar Ferimentos", circulo: 1, escola: "Evocação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Instantânea", resistencia: null,
    efeito: "Recupera 2d8+2 PV de uma criatura tocada; contra um morto-vivo, causa dano de luz.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta a cura em +1d8+1." },
      { custoPM: 2, resumo: "Também remove uma condição de fadiga do alvo." },
      { custoPM: 2, resumo: "Muda o alcance para curto." },
      { custoPM: 5, resumo: "Alcance curto e alvos de criaturas escolhidas." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p195 (livro do usuário)", verificado: true
  },
  {
    id: "desespero-esmagador", nome: "Desespero Esmagador", circulo: 2, escola: "Encantamento", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Humanoides em cone de 6 m", duracao: "Instantânea", resistencia: "Vontade parcial",
    efeito: "Mergulha humanoides em tristeza, deixando-os fracos e frustrados até o fim da cena, ou por uma rodada se resistirem.",
    aprimoramentos: [
      { custoPM: 2, resumo: "As condições passam a ser debilitado e esmorecido." },
      { custoPM: 3, resumo: "Afeta qualquer tipo de criatura." },
      { custoPM: 3, resumo: "Quem falha fica pasmo por 1 rodada, uma vez por cena (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p196 (livro do usuário)", verificado: true
  },
  {
    id: "despedacar", nome: "Despedaçar", circulo: 1, escola: "Evocação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura ou objeto mundano Pequeno", duracao: "Instantânea", resistencia: "Fortitude parcial",
    efeito: "Um som agudo causa dano de impacto e pode atordoar o alvo; construtos e objetos sofrem o dobro e ignoram RD.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +1d8+2." },
      { custoPM: 2, resumo: "Muda o alvo para objeto mundano Médio (requer 2º círculo)." },
      { custoPM: 5, resumo: "Muda o alvo para objeto mundano Grande (requer 3º círculo)." },
      { custoPM: 5, resumo: "Alcance pessoal e esfera de 6 m: afeta todas as criaturas e objetos mundanos na área." },
      { custoPM: 9, resumo: "Muda o alvo para objeto mundano Enorme (requer 4º círculo)." },
      { custoPM: 14, resumo: "Muda o alvo para objeto mundano Colossal (requer 5º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p196 (livro do usuário)", verificado: true
  },
  {
    id: "detectar-ameacas", nome: "Detectar Ameaças", circulo: 1, escola: "Adivinhação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Esfera de 18 m de raio", duracao: "Cena (até ser descarregada)", resistencia: null,
    efeito: "Percebe criaturas hostis ou armadilhas que entram na área ao seu redor e, com sucesso, sabe sua origem e direção.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Revela a raça ou espécie e o poder da criatura, pela intensidade da aura." },
      { custoPM: 2, resumo: "Você não fica surpreendido contra perigos detectados e ganha +5 em resistência contra armadilhas (requer 2º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p196 (livro do usuário)", verificado: true
  },
  {
    id: "disfarce-ilusorio", nome: "Disfarce Ilusório", circulo: 1, escola: "Ilusão", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: "Vontade desacredita",
    efeito: "Muda a aparência de uma criatura, inclusive equipamento, sem lhe conceder habilidades novas.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Alcance curto e alvo um objeto, que pode parecer outro, como ferro virando moedas de ouro." },
      { custoPM: 2, resumo: "Alcance curto e alvo 1 criatura, que pode anular com Vontade se não quiser." },
      { custoPM: 2, resumo: "A ilusão inclui odores e sensações, e o bônus de disfarce sobe para +20." },
      { custoPM: 3, resumo: "Alcance curto e alvos de criaturas escolhidas, cada uma com aparência própria (requer 2º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p197 (livro do usuário)", verificado: true
  },
  {
    id: "dissipar-magia", nome: "Dissipar Magia", circulo: 2, escola: "Abjuração", tipo: "universal", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura, 1 objeto mágico ou esfera de 3 m de raio", duracao: "Instantânea", resistencia: "Vontade anula (item mágico)",
    efeito: "Encerra magias ativas em um alvo ou área, conforme o resultado de um teste de Misticismo.",
    aprimoramentos: [
      { custoPM: 12, resumo: "Esfera de 9 m que dissipa tudo automaticamente e torna itens mágicos mundanos por uma cena (requer 5º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p197 (livro do usuário)", verificado: true
  },
  {
    id: "enfeiticar", nome: "Enfeitiçar", circulo: 1, escola: "Encantamento", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 humanoide", duracao: "Cena", resistencia: "Vontade anula",
    efeito: "Deixa um humanoide prestativo em relação a você, e a magia cai se você ou aliados o atacarem.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Você sugere uma ação aceitável ao alvo, que a executa e encerra a magia." },
      { custoPM: 5, resumo: "Muda o alvo para 1 espírito ou monstro (requer 3º círculo)." },
      { custoPM: 5, resumo: "Afeta todos os alvos dentro do alcance." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p197 (livro do usuário)", verificado: true
  },
  {
    id: "enxame-de-pestes", nome: "Enxame de Pestes", circulo: 2, escola: "Convocação", tipo: "divina", custoPM: 3,
    execucao: "Completa", alcance: "Médio", alvo: "1 enxame Médio (quadrado de 1,5 m)", duracao: "Sustentada", resistencia: "Fortitude reduz à metade",
    efeito: "Convoca um enxame que causa dano de corte a quem estiver em seu espaço no fim de cada um dos seus turnos.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +1d12." },
      { custoPM: 3, resumo: "Reflexos reduz à metade e enxame de criaturas maiores, com 3d12 de dano de corte, impacto ou perfuração." },
      { custoPM: 5, resumo: "Aumenta o número de enxames em +1 (requer 3º círculo)." },
      { custoPM: 7, resumo: "Reflexos reduz à metade e enxame de criaturas elementais, com 5d12 de dano de ácido, eletricidade, fogo ou frio (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p198 (livro do usuário)", verificado: true
  },
  {
    id: "escudo-da-fe", nome: "Escudo da Fé", circulo: 1, escola: "Abjuração", tipo: "divina", custoPM: 1,
    execucao: "Reação", alcance: "Curto", alvo: "1 criatura", duracao: "1 turno", resistencia: null,
    efeito: "Cria um escudo místico momentâneo que dá +2 na Defesa do alvo para bloquear um golpe.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Execução padrão, alcance toque e duração de cena." },
      { custoPM: 1, resumo: "Concede camuflagem leve contra ataques à distância." },
      { custoPM: 2, resumo: "Aumenta o bônus na Defesa em +1." },
      { custoPM: 2, resumo: "Cria um vínculo em que o alvo sofre metade do dano e você recebe a outra metade (requer 2º círculo)." },
      { custoPM: 3, resumo: "Duração de um dia (requer 2º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p198 (livro do usuário)", verificado: true
  },
  {
    id: "escuridao", nome: "Escuridão", circulo: 1, escola: "Necromancia", tipo: "universal", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 objeto", duracao: "Cena", resistencia: "Vontade anula (veja texto)",
    efeito: "Faz um objeto emanar sombras numa área de 6 m, dando camuflagem leve a quem estiver dentro dela.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta a área em 1,5 m de raio." },
      { custoPM: 2, resumo: "Camuflagem total por escuridão total, bloqueando a visão na área." },
      { custoPM: 2, resumo: "Muda o alvo para 1 criatura, que fica cega pela cena com Fortitude parcial (requer 2º círculo)." },
      { custoPM: 3, resumo: "Duração de um dia." },
      { custoPM: 5, resumo: "Alcance pessoal: você recebe +10 em Furtividade e camuflagem leve (requer 2º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p199 (livro do usuário)", verificado: true
  },
  {
    id: "esculpir-sons", nome: "Esculpir Sons", circulo: 2, escola: "Ilusão", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura ou objeto", duracao: "Cena", resistencia: "Vontade anula",
    efeito: "Omite ou transforma os sons emitidos por um alvo, sem criar sons que você não conheça.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o número de alvos em +1, todos afetados da mesma forma." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p198 (livro do usuário)", verificado: true
  },
  {
    id: "explosao-de-chamas", nome: "Explosão de Chamas", circulo: 1, escola: "Evocação", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Cone de 6 m", duracao: "Instantânea", resistencia: "Reflexos reduz à metade",
    efeito: "Lança um leque de chamas das mãos que causa 2d6 de dano de fogo às criaturas no cone.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o dano em +1d6." },
      { custoPM: 1, resumo: "Com Reflexos parcial, quem falha fica em chamas." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p199 (livro do usuário)", verificado: true
  },
  {
    id: "fisico-divino", nome: "Físico Divino", circulo: 2, escola: "Transmutação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Concede +2 em um atributo físico escolhido (Força, Destreza ou Constituição), sem PV ou PM extras.",
    aprimoramentos: [
      { custoPM: 3, resumo: "Alcance curto e alvos de criaturas escolhidas." },
      { custoPM: 3, resumo: "Concede +2 nos três atributos físicos (requer 3º círculo)." },
      { custoPM: 7, resumo: "Concede +4 no atributo escolhido (requer 4º círculo)." },
      { custoPM: 12, resumo: "Concede +4 nos três atributos físicos (requer 5º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p199 (livro do usuário)", verificado: true
  },
  {
    id: "flecha-acida", nome: "Flecha Ácida", circulo: 2, escola: "Evocação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura ou objeto", duracao: "Instantânea", resistencia: "Reflexos parcial",
    efeito: "Dispara um projétil ácido de 4d6 que deixa um muco corrosivo, causando dano extra nos dois turnos seguintes.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Corrói a armadura ou escudo do alvo, reduzindo permanentemente o bônus na Defesa em 1." },
      { custoPM: 2, resumo: "Aumenta a redução na Defesa do item corroído em +1." },
      { custoPM: 2, resumo: "Aumenta o dano inicial e o dano por rodada em +1d6." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p199 (livro do usuário)", verificado: true
  },
  {
    id: "globo-da-verdade-de-gwen", nome: "Globo da Verdade de Gwen", circulo: 2, escola: "Adivinhação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "1 globo", duracao: "Cena", resistencia: "Vontade anula (criatura tocada)",
    efeito: "Cria um globo que mostra uma cena vista por você ou por uma criatura tocada na última semana.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Mostra cenas de até um mês atrás." },
      { custoPM: 2, resumo: "Mostra cenas de até um ano atrás." },
      { custoPM: 2, resumo: "Ao tocar um cadáver, mostra a última cena vista por ele." },
      { custoPM: 4, resumo: "Alcance longo e 10 globos, todos com a mesma cena." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p200 (livro do usuário)", verificado: true
  },
  {
    id: "hipnotismo", nome: "Hipnotismo", circulo: 1, escola: "Encantamento", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 animal ou humanoide", duracao: "1d4 rodadas", resistencia: "Vontade anula",
    efeito: "Fascina criaturas que percebem você com palavras e movimentos ritmados, enquanto a magia durar.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Alvos que passarem na resistência não percebem que foram enfeitiçados." },
      { custoPM: 2, resumo: "Muda o alvo para animais ou humanoides escolhidos." },
      { custoPM: 2, resumo: "Duração sustentada." },
      { custoPM: 2, resumo: "Também afeta espíritos e monstros na área (requer 2º círculo)." },
      { custoPM: 5, resumo: "Também afeta construtos, espíritos, monstros e mortos-vivos na área (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p200 (livro do usuário)", verificado: true
  },
  {
    id: "imagem-espelhada", nome: "Imagem Espelhada", circulo: 1, escola: "Ilusão", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Cria três cópias ilusórias suas que dão +6 na Defesa, perdendo uma a cada ataque que erra.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Mais uma cópia, com +2 de bônus na Defesa." },
      { custoPM: 2, resumo: "Cada cópia destruída deixa ofuscado por uma rodada quem a destruiu (requer 2º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p201 (livro do usuário)", verificado: true
  },
  {
    id: "infligir-ferimentos", nome: "Infligir Ferimentos", circulo: 1, escola: "Necromancia", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Fortitude reduz à metade",
    efeito: "Causa 2d8+2 de dano de trevas com o toque ou, num morto-vivo, cura esse mesmo valor.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Quem falhar fica fraco pela cena." },
      { custoPM: 2, resumo: "Aumenta o dano em +1d8+1." },
      { custoPM: 2, resumo: "Sem resistência; você faz um ataque corpo a corpo que, se acertar, aplica o efeito." },
      { custoPM: 5, resumo: "Alcance curto e alvos de criaturas escolhidas." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p201 (livro do usuário)", verificado: true
  },
  {
    id: "invisibilidade", nome: "Invisibilidade", circulo: 2, escola: "Ilusão", tipo: "arcana", custoPM: 3,
    execucao: "Livre", alcance: "Pessoal", alvo: "Você", duracao: "1 rodada", resistencia: null,
    efeito: "Torna você e seu equipamento invisíveis, até que você faça uma ação hostil contra uma criatura.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Execução padrão, alcance toque e alvo 1 criatura ou objeto Grande ou menor." },
      { custoPM: 3, resumo: "Duração de cena (requer 3º círculo)." },
      { custoPM: 3, resumo: "Duração sustentada e uma esfera de invisibilidade de 3 m que acompanha o alvo (requer 3º círculo)." },
      { custoPM: 7, resumo: "Execução padrão, alcance toque e alvo 1 criatura, que não perde a invisibilidade por ação hostil (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p201 (livro do usuário)", verificado: true
  },
  {
    id: "leque-cromatico", nome: "Leque Cromático", circulo: 1, escola: "Ilusão", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Cone de 4,5 m", duracao: "Instantânea", resistencia: "Vontade parcial",
    efeito: "Um cone de luzes atordoa animais e humanoides por uma rodada e os deixa ofuscados pela cena.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Os afetados ficam vulneráveis pela cena." },
      { custoPM: 2, resumo: "Também afeta espíritos e monstros na área (requer 2º círculo)." },
      { custoPM: 5, resumo: "Também afeta construtos, espíritos, monstros e mortos-vivos na área (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p202 (livro do usuário)", verificado: true
  },
  {
    id: "luz", nome: "Luz", circulo: 1, escola: "Evocação", tipo: "universal", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 objeto", duracao: "Cena", resistencia: "Vontade anula (veja texto)",
    efeito: "Faz um objeto iluminar uma área de 6 m sem produzir calor, podendo ser escondido para interromper a luz.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o raio iluminado em 3 m." },
      { custoPM: 2, resumo: "Duração de um dia." },
      { custoPM: 2, resumo: "Duração permanente com pó de rubi; não combina com outros aprimoramentos (requer 2º círculo)." },
      { custoPM: 0, resumo: "Apenas arcanos: muda o alvo para 1 criatura, que fica ofuscada pela cena." },
      { custoPM: 2, resumo: "Apenas arcanos: alcance longo e quatro globos de luz móveis (requer 2º círculo)." },
      { custoPM: 2, resumo: "Apenas divinos: luz cálida como a do sol, que estabiliza aliados e ofusca inimigos (requer 2º círculo)." },
      { custoPM: 5, resumo: "Apenas divinos: alvo de toque com halo que concede +10 em Diplomacia e redução de trevas 10 (requer 2º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p203 (livro do usuário)", verificado: true
  },
  {
    id: "ligacao-telepatica", nome: "Ligação Telepática", circulo: 2, escola: "Adivinhação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Toque", alvo: "2 criaturas voluntárias", duracao: "1 dia", resistencia: null,
    efeito: "Cria um elo mental entre criaturas com Inteligência –4 ou maior, que conversam sem idioma nem distância.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 3, resumo: "Muda o alvo para 1 criatura, que você pode ver e ouvir pelos sentidos dela (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p203 (livro do usuário)", verificado: true
  },
  {
    id: "localizacao", nome: "Localização", circulo: 2, escola: "Adivinhação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Esfera de 90 m de raio", duracao: "Cena", resistencia: null,
    efeito: "Indica a direção e a distância da criatura ou objeto mais próximo do tipo que você escolher.",
    aprimoramentos: [
      { custoPM: 5, resumo: "Multiplica a área por 10." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p203 (livro do usuário)", verificado: true
  },
  {
    id: "mapear", nome: "Mapear", circulo: 2, escola: "Adivinhação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Toque", alvo: "Superfície ou objeto plano", duracao: "Cena", resistencia: null,
    efeito: "Queima um mapa da região onde você está na superfície tocada, completo se você já conhecer o lugar.",
    aprimoramentos: [
      { custoPM: 3, resumo: "Muda o alvo para 1 criatura, que descobre o caminho mais direto para entrar ou sair de um lugar por 1 hora." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p204 (livro do usuário)", verificado: true
  },
  {
    id: "marca-da-obediencia", nome: "Marca da Obediência", circulo: 2, escola: "Encantamento", tipo: "universal", custoPM: 3,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: "Vontade anula",
    efeito: "Grava uma marca que obriga a criatura a seguir uma ordem, podendo quebrá-la com um teste de Vontade a cada rodada.",
    aprimoramentos: [
      { custoPM: 3, resumo: "Duração de um dia; fora de combate, o teste de Vontade só é feito a cada hora (requer 3º círculo)." },
      { custoPM: 3, resumo: "Cada falha no teste de Vontade causa 3d6 de dano psíquico (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p204 (livro do usuário)", verificado: true
  },
  {
    id: "mente-divina", nome: "Mente Divina", circulo: 2, escola: "Adivinhação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Concede +2 em Inteligência, Sabedoria ou Carisma, à sua escolha, sem PV, PM ou perícias extras.",
    aprimoramentos: [
      { custoPM: 3, resumo: "Alcance curto e alvos de criaturas escolhidas." },
      { custoPM: 3, resumo: "Concede +2 nos três atributos mentais (requer 3º círculo)." },
      { custoPM: 7, resumo: "Concede +4 no atributo escolhido (requer 4º círculo)." },
      { custoPM: 12, resumo: "Concede +4 nos três atributos mentais (requer 5º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p204 (livro do usuário)", verificado: true
  },
  {
    id: "metamorfose", nome: "Metamorfose", circulo: 2, escola: "Transmutação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Muda sua aparência e forma, inclusive equipamento, para outra criatura real ou imaginada, com +20 em Enganação para disfarce.",
    aprimoramentos: [
      { custoPM: 1, resumo: "A nova forma ganha faro, visão na penumbra ou visão no escuro." },
      { custoPM: 3, resumo: "A nova forma ganha percepção às cegas (requer 3º círculo)." },
      { custoPM: 3, resumo: "Alcance toque e alvo 1 criatura, que pode ser transformada com Vontade anula." },
      { custoPM: 3, resumo: "Alcance médio: transforma 1 criatura em algo inofensivo, que retorna se passar em Vontade a cada turno (requer 3º círculo)." },
      { custoPM: 5, resumo: "Pode escolher uma Forma Selvagem Aprimorada (requer 3º círculo)." },
      { custoPM: 9, resumo: "Pode escolher uma Forma Selvagem Superior (requer 4º círculo)." },
      { custoPM: 12, resumo: "Pode mudar de forma de novo no início de cada turno do alvo (requer 5º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p204 (livro do usuário)", verificado: true
  },
  {
    id: "miasma-mefitico", nome: "Miasma Mefítico", circulo: 2, escola: "Necromancia", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "Nuvem de 6 m de raio", duracao: "Instantânea", resistencia: "Fortitude reduz à metade",
    efeito: "Uma nuvem letal causa 5d6 de dano de ácido e enjoo a quem está nela, com metade do dano se resistir.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +1d6." },
      { custoPM: 3, resumo: "Muda o tipo do dano para trevas." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p205 (livro do usuário)", verificado: true
  },
  {
    id: "montaria-arcana", nome: "Montaria Arcana", circulo: 2, escola: "Convocação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "Criatura conjurada (cavalo ou pônei de guerra)", duracao: "1 dia", resistencia: null,
    efeito: "Convoca um cavalo de guerra veterano que atravessa terreno difícil sem perder deslocamento.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Animais em alcance curto podem ficar abalados ou apavorados por causa da montaria, com Vontade." },
      { custoPM: 3, resumo: "Duração permanente, com penalidade de –3 PM." },
      { custoPM: 3, resumo: "Aumenta o tamanho da montaria em uma categoria, o que também aumenta a carga que ela aguenta." },
      { custoPM: 3, resumo: "Muda o nível do parceiro para mestre (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p205 (livro do usuário)", verificado: true
  },
  {
    id: "nevoa", nome: "Névoa", circulo: 1, escola: "Convocação", tipo: "universal", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Nuvem de 6 m de raio e 6 m de altura", duracao: "Cena", resistencia: null,
    efeito: "Ergue uma névoa que dá camuflagem leve ou total a quem está dentro ou além dela, dispersada pelo vento.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Também funciona debaixo d'água, como nuvem de tinta." },
      { custoPM: 2, resumo: "Criaturas escolhidas enxergam através da névoa (requer 2º círculo)." },
      { custoPM: 2, resumo: "Cheiro horrível que enjoa quem falhar em Fortitude a cada turno." },
      { custoPM: 2, resumo: "Névoa cáustica que causa 2d4 de dano de ácido por turno." },
      { custoPM: 3, resumo: "Aumenta o dano de ácido em +2d4." },
      { custoPM: 5, resumo: "Névoa espessa que reduz o deslocamento para 3 m e impõe –2 em ataques e dano." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p206 (livro do usuário)", verificado: true
  },
  {
    id: "oracao", nome: "Oração", circulo: 2, escola: "Encantamento", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "Todas as criaturas (veja texto)", duracao: "Sustentada", resistencia: null,
    efeito: "Aliados recebem bônus e inimigos sofrem penalidades em testes e rolagens, enquanto a magia durar.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta os bônus em +1, limitado pelo círculo máximo que você pode lançar." },
      { custoPM: 2, resumo: "Aumenta as penalidades em –1, limitado pelo círculo máximo que você pode lançar." },
      { custoPM: 7, resumo: "Alcance médio (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p206 (livro do usuário); descrição do efeito base pelo índice da p182, pois o texto do livro não traz o corpo da magia nesta página", verificado: false
  },
  {
    id: "orientacao", nome: "Orientação", circulo: 1, escola: "Adivinhação", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "1 rodada", resistencia: null,
    efeito: "No próximo teste de perícia do alvo, ele rola dois dados e fica com o melhor resultado.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Duração de cena e, por atributo escolhido, o alvo rola dois dados em testes de perícia ligados a ele (requer 2º círculo)." },
      { custoPM: 5, resumo: "Escolhe entre atributos físicos ou mentais, em vez de um só (requer 3º círculo)." },
      { custoPM: 5, resumo: "Muda o alvo para criaturas escolhidas (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p206 (livro do usuário)", verificado: true
  },
  {
    id: "perdicao", nome: "Perdição", circulo: 1, escola: "Necromancia", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Criaturas escolhidas", duracao: "Cena", resistencia: null,
    efeito: "Amaldiçoa os alvos com –1 em testes de ataque e rolagens de dano, anulando Bênção.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta as penalidades em –1, limitado pelo círculo máximo que você pode lançar." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p207 (livro do usuário)", verificado: true
  },
  {
    id: "primor-atletico", nome: "Primor Atlético", circulo: 1, escola: "Transmutação", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Dá +9 m de deslocamento e +10 em Atletismo ao alvo tocado.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Bônus de +20 em Atletismo para saltar." },
      { custoPM: 1, resumo: "Escala paredes e tetos sem teste de Atletismo." },
      { custoPM: 1, resumo: "Execução de movimento: você salta sobre um alvo a curta distância e ganha um dado extra de dano na investida." },
      { custoPM: 3, resumo: "Testes de perícia baseados em Força, Destreza ou Constituição com dois dados e o melhor resultado (requer 2º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p207 (livro do usuário)", verificado: true
  },
  {
    id: "profanar", nome: "Profanar", circulo: 1, escola: "Necromancia", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Longo", alvo: "Esfera de 9 m de raio", duracao: "1 dia", resistencia: null,
    efeito: "Maximiza o dano de trevas dentro da área, inclusive a cura que mortos-vivos recebem, e anula Consagrar.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Mortos-vivos na área ganham +2 na Defesa e em todos os testes." },
      { custoPM: 2, resumo: "Aumenta os bônus para mortos-vivos em +1, limitado pelo círculo máximo que você pode lançar." },
      { custoPM: 9, resumo: "Execução de 1 hora e duração permanente, com incenso e óleos (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p208 (livro do usuário)", verificado: true
  },
  {
    id: "protecao-divina", nome: "Proteção Divina", circulo: 1, escola: "Abjuração", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Cria uma barreira mística que dá +2 em testes de resistência ao alvo tocado.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o bônus concedido em +1." },
      { custoPM: 2, resumo: "Vira reação, com alcance curto e duração de uma rodada; dá +5 no próximo teste de resistência." },
      { custoPM: 2, resumo: "Esfera de 3 m: todos os aliados dentro dela recebem o bônus (requer 2º círculo)." },
      { custoPM: 5, resumo: "Torna o alvo imune a efeitos mentais e de medo (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p208 (livro do usuário)", verificado: true
  },
  {
    id: "purificacao", nome: "Purificação", circulo: 2, escola: "Evocação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Instantânea", resistencia: null,
    efeito: "Remove de uma criatura tocada uma das condições prejudiciais listadas nas regras.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Remove todas as condições listadas, em vez de uma (leitura do texto fora de ordem; ver relatório)." },
      { custoPM: 7, resumo: "Também dissipa magias e efeitos prejudiciais de encantamento, necromancia e transmutação no alvo (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p208 (livro do usuário)", verificado: true
  },
  {
    id: "queda-suave", nome: "Queda Suave", circulo: 1, escola: "Transmutação", tipo: "arcana", custoPM: 1,
    execucao: "Reação", alcance: "Curto", alvo: "1 criatura ou objeto Grande ou menor", duracao: "Até chegar ao solo ou cena, o que vier primeiro", resistencia: null,
    efeito: "Desacelera a queda do alvo até um ritmo que não causa dano; em projéteis, reduz o dano pela metade.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Muda o alvo para até 10 criaturas ou objetos adequados." },
      { custoPM: 2, resumo: "Aumenta a categoria de tamanho do alvo em uma." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p208 (livro do usuário)", verificado: true
  },
  {
    id: "raio-do-enfraquecimento", nome: "Raio do Enfraquecimento", circulo: 1, escola: "Necromancia", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "Cena", resistencia: "Fortitude parcial",
    efeito: "Um raio que deixa o alvo fatigado, ou apenas vulnerável se ele resistir.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Também recupera todos os PV perdidos por veneno." },
      { custoPM: 2, resumo: "Falhar deixa o alvo exausto, e passar, fatigado (requer 2º círculo)." },
      { custoPM: 3, resumo: "Também permite que o alvo solte um item amaldiçoado que esteja segurando." },
      { custoPM: 5, resumo: "Muda o alvo para criaturas escolhidas (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p208 (livro do usuário)", verificado: true
  },
  {
    id: "raio-solar", nome: "Raio Solar", circulo: 2, escola: "Evocação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Linha de 30 m", duracao: "Instantânea", resistencia: "Reflexos reduz à metade",
    efeito: "Uma rajada de luz em linha causa 4d8 de dano de luz (4d12 em mortos-vivos) e ofusca quem falha.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano ou a cura em +1d8 (+1d12 em mortos-vivos)." },
      { custoPM: 3, resumo: "Criaturas vivas escolhidas na área curam 4d8 PV, em vez de sofrer dano." },
      { custoPM: 3, resumo: "Quem falhar na resistência também fica cego por 1d4 rodadas." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p209 (livro do usuário)", verificado: true
  },
  {
    id: "refugio", nome: "Refúgio", circulo: 2, escola: "Abjuração", tipo: "arcana", custoPM: 3,
    execucao: "Completa", alcance: "Curto", alvo: "Domo de 6 m de raio", duracao: "1 dia", resistencia: null,
    efeito: "Ergue um domo imóvel que protege de calor, frio e forças pequenas, dando camuflagem total a quem está dentro.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Fumaça escura que impede quem está fora de ver ou ouvir, e bloqueia adivinhação." },
      { custoPM: 3, resumo: "Cria uma cabana para até 10 criaturas Médias, com recuperação confortável ao descansar." },
      { custoPM: 3, resumo: "Cria um espaço extradimensional de caverna para até 10 criaturas Médias (requer 3º círculo)." },
      { custoPM: 9, resumo: "Cria uma mansão extradimensional para até 100 criaturas Médias, com servos fantasmagóricos (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p209 (livro do usuário)", verificado: true
  },
  {
    id: "relampago", nome: "Relâmpago", circulo: 2, escola: "Evocação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Linha de 30 m", duracao: "Instantânea", resistencia: "Reflexos reduz à metade",
    efeito: "Dispara um raio em linha que causa 6d6 de dano de eletricidade a quem está na linha.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano em +2d6." },
      { custoPM: 3, resumo: "Um relâmpago separado para cada alvo escolhido (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p209 (livro do usuário)", verificado: true
  },
  {
    id: "resistencia-a-energia", nome: "Resistência a Energia", circulo: 1, escola: "Abjuração", tipo: "universal", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: null,
    efeito: "Dá redução de dano 10 contra um tipo de energia escolhido entre ácido, eletricidade, fogo, frio, luz ou trevas.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta a redução de dano em +5." },
      { custoPM: 2, resumo: "Duração de um dia (requer 2º círculo)." },
      { custoPM: 5, resumo: "Alcance curto e alvos de criaturas escolhidas (requer 3º círculo)." },
      { custoPM: 5, resumo: "Redução de dano contra todos os tipos listados (requer 3º círculo)." },
      { custoPM: 9, resumo: "Imunidade a um dos tipos listados (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p210 (livro do usuário)", verificado: true
  },
  {
    id: "rogar-maldicao", nome: "Rogar Maldição", circulo: 2, escola: "Necromancia", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "Sustentada", resistencia: "Fortitude anula",
    efeito: "Amaldiçoa a vítima com doença, fraqueza ou isolamento de um sentido, à sua escolha ao lançar.",
    aprimoramentos: [
      { custoPM: 3, resumo: "Aumenta em +1 o número de efeitos que você pode escolher (requer 3º círculo)." },
      { custoPM: 7, resumo: "Duração permanente e Fortitude parcial, em que quem resiste sofre a maldição por só uma rodada (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p210 (livro do usuário)", verificado: true
  },
  {
    id: "runa-de-protecao", nome: "Runa de Proteção", circulo: 2, escola: "Abjuração", tipo: "universal", custoPM: 3,
    execucao: "1 hora", alcance: "Toque", alvo: "Área de 6 m de raio", duracao: "Permanente até ser descarregada", resistencia: "Reflexos reduz à metade (outras criaturas)",
    efeito: "Escreve uma runa numa superfície que explode em 6d6 de dano do tipo escolhido quando uma criatura entra na área.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o dano em +2d6." },
      { custoPM: 1, resumo: "Muda o alvo para você: a runa fica no seu corpo e ativa uma magia de 1º círculo como reação." },
      { custoPM: 3, resumo: "Como o aprimoramento anterior, mas com magias de 2º círculo (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p210 (livro do usuário)", verificado: true
  },
  {
    id: "salto-dimensional", nome: "Salto Dimensional", circulo: 2, escola: "Convocação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "Você", duracao: "Instantânea", resistencia: null,
    efeito: "Teletransporta você para outro ponto dentro do alcance, mesmo que não o perceba, sem surgir dentro de sólidos.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Muda o alcance para médio." },
      { custoPM: 1, resumo: "Também leva uma criatura voluntária que você esteja tocando; cada aprimoramento aumenta em +1 os alvos extras." },
      { custoPM: 2, resumo: "Vira reação: você recebe +5 na Defesa e em Reflexos contra o efeito, e depois salta para um espaço adjacente." },
      { custoPM: 3, resumo: "Muda o alcance para longo." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p211 (livro do usuário)", verificado: true
  },
  {
    id: "santuario", nome: "Santuário", circulo: 1, escola: "Abjuração", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Cena", resistencia: "Vontade anula",
    efeito: "Quem tenta agir contra o alvo precisa passar em Vontade ou perde a ação; o alvo também não pode agir de forma hostil.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Você não é percebido por criaturas não inteligentes de um tipo escolhido (animal, construto ou morto-vivo)." },
      { custoPM: 9, resumo: "Também protege o alvo de efeitos de área: quem atacar uma área que inclua o alvo precisa passar em Vontade." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p211 (livro do usuário)", verificado: true
  },
  {
    id: "servos-invisiveis", nome: "Servos Invisíveis", circulo: 2, escola: "Convocação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Longo", alvo: "Até 3 criaturas conjuradas (servos invisíveis)", duracao: "Cena", resistencia: null,
    efeito: "Cria até três servos invisíveis e silenciosos para tarefas simples, ou para dar bônus em um teste de perícia.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta em 1 o número de servos conjurados." },
      { custoPM: 3, resumo: "Os servos realizam uma tarefa sua por completo, com teste automático de perícia (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p212 (livro do usuário)", verificado: true
  },
  {
    id: "seta-infalivel-de-talude", nome: "Seta Infalível de Talude", circulo: 1, escola: "Evocação", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Médio", alvo: "Criaturas escolhidas", duracao: "Instantânea", resistencia: null,
    efeito: "Lança duas setas de energia que causam 1d4+1 de dano de essência cada, em alvos iguais ou diferentes.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Troca as setas por lanças de energia que caem do céu, com 1d8+1 de dano cada (requer 2º círculo)." },
      { custoPM: 2, resumo: "Aumenta o número de setas ou lanças para três." },
      { custoPM: 4, resumo: "Aumenta o número de setas ou lanças para cinco (requer 2º círculo)." },
      { custoPM: 9, resumo: "Aumenta o número de setas ou lanças para dez (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p212 (livro do usuário)", verificado: true
  },
  {
    id: "silencio", nome: "Silêncio", circulo: 2, escola: "Ilusão", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "Esfera de 6 m de raio", duracao: "Sustentada", resistencia: null,
    efeito: "Cria uma área sem som em que criaturas ficam surdas e não se pode lançar magias com palavras.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Muda o alvo para 1 objeto, que emana silêncio em raio de 3 m." },
      { custoPM: 2, resumo: "Duração de cena; nenhum som sai da área, mas quem está dentro pode falar e lançar magias." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p212 (livro do usuário)", verificado: true
  },
  {
    id: "soco-de-arsenal", nome: "Soco de Arsenal", circulo: 2, escola: "Convocação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Médio", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Fortitude parcial",
    efeito: "Golpeia o alvo à distância com dano de impacto de 4d6 mais sua Força, empurrando-o 3 m para trás.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Alcance pessoal por cena: seus ataques corpo a corpo atingem inimigos até 3 m além do alcance normal." },
      { custoPM: 1, resumo: "Aumenta o número de alvos em +1, que compartilham um mesmo sonho com você." },
      { custoPM: 4, resumo: "Aumenta o empurrão em +3 m." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p212 (livro do usuário)", verificado: true
  },
  {
    id: "sopro-das-uivantes", nome: "Sopro das Uivantes", circulo: 2, escola: "Evocação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Cone de 9 m", duracao: "Instantânea", resistencia: "Fortitude parcial",
    efeito: "Sopra ar gélido que causa 4d6 de dano de frio e derruba e empurra as criaturas menores que falham.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o dano de frio em +2d6." },
      { custoPM: 3, resumo: "Aumenta o tamanho máximo das criaturas afetadas em uma categoria (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p213 (livro do usuário)", verificado: true
  },
  {
    id: "suporte-ambiental", nome: "Suporte Ambiental", circulo: 1, escola: "Abjuração", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "1 dia", resistencia: null,
    efeito: "Protege o alvo de calor e frio extremos, permite respirar na água ou no ar e evita sufocar em fumaça.",
    aprimoramentos: [
      { custoPM: 5, resumo: "Alcance curto e alvos de criaturas escolhidas." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p213 (livro do usuário)", verificado: true
  },
  {
    id: "sussurros-insanos", nome: "Sussurros Insanos", circulo: 2, escola: "Encantamento", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "1 humanoide", duracao: "Cena", resistencia: "Vontade anula",
    efeito: "Murmura palavras desconexas que deixam o humanoide confuso pela cena.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 3, resumo: "Muda o alvo para 1 criatura." },
      { custoPM: 12, resumo: "Muda o alvo para criaturas escolhidas (requer 5º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p213 (livro do usuário)", verificado: true
  },
  {
    id: "sono", nome: "Sono", circulo: 1, escola: "Encantamento", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 humanoide", duracao: "Cena", resistencia: "Vontade parcial",
    efeito: "Um cansaço místico deixa o alvo inconsciente ou exausto e, se ele resistir, apenas fatigado por um tempo.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Alvos que falham ficam exaustos por 1d4+1 rodadas, em vez de uma." },
      { custoPM: 2, resumo: "Muda o alvo para criatura." },
      { custoPM: 5, resumo: "Afeta todos os alvos válidos escolhidos dentro do alcance." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p213 (livro do usuário; cabeçalho conferido na imagem da página)", verificado: true
  },
  {
    id: "teia", nome: "Teia", circulo: 1, escola: "Convocação", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "Cubo de 6 m de lado", duracao: "Cena", resistencia: "Reflexos anula",
    efeito: "Cria fibras pegajosas que prendem quem falhar na área, que vira terreno difícil e queima se houver dano de fogo.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Quem falhar também fica imóvel." },
      { custoPM: 2, resumo: "A magia afeta de novo, no início de cada turno seu, quem estiver na área (requer 2º círculo)." },
      { custoPM: 2, resumo: "Aumenta a área em um cubo de 1,5 m." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p214 (livro do usuário)", verificado: true
  },
  {
    id: "toque-chocante", nome: "Toque Chocante", circulo: 1, escola: "Evocação", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Fortitude reduz à metade",
    efeito: "Arcos elétricos causam 2d8+2 de dano de eletricidade no toque, com penalidade de resistência contra armadura metálica.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Aumenta o dano em +1d8+1." },
      { custoPM: 2, resumo: "Sem resistência; você faz um ataque corpo a corpo que, se acertar, aplica dano da magia e do ataque." },
      { custoPM: 2, resumo: "Alcance pessoal e esfera de 6 m: raios das pontas dos dedos atingem todas as criaturas na área." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p214 (livro do usuário)", verificado: true
  },
  {
    id: "tempestade-divina", nome: "Tempestade Divina", circulo: 2, escola: "Evocação", tipo: "divina", custoPM: 3,
    execucao: "Completa", alcance: "Longo", alvo: "Cilindro de 15 m de raio e 15 m de altura", duracao: "Sustentada", resistencia: null,
    efeito: "Ergue um vendaval em ambiente aberto que dificulta ataques à distância e pode gerar chuva, neve ou granizo.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Uma vez por rodada, faz um raio cair sobre um alvo, com 3d8 de dano de eletricidade (Reflexos reduz à metade)." },
      { custoPM: 2, resumo: "Aumenta o dano dos raios em +1d8." },
      { custoPM: 3, resumo: "Chuva revela criaturas invisíveis e deixa criaturas Médias ou menores lentas." },
      { custoPM: 3, resumo: "Granizo passa a causar 2d6 de dano por rodada." },
      { custoPM: 3, resumo: "Neve causa 2d6 de dano de frio por turno a quem estiver na área." },
      { custoPM: 3, resumo: "Muda a área para cilindro de 90 m de raio e 90 m de altura." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p214 (livro do usuário)", verificado: true
  },
  {
    id: "toque-vampirico", nome: "Toque Vampírico", circulo: 2, escola: "Necromancia", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Instantânea", resistencia: "Fortitude reduz à metade",
    efeito: "Causa 6d6 de dano de trevas ao toque e você recupera PV iguais à metade do dano causado.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Sem resistência; você faz um ataque corpo a corpo que, se acertar, aplica o dano e a cura." },
      { custoPM: 2, resumo: "Aumenta o dano em +2d6." },
      { custoPM: 2, resumo: "Alcance pessoal por cena: a cada rodada você toca uma criatura para 3d6 de dano e se cura (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p215 (livro do usuário)", verificado: true
  },
  {
    id: "tranca-arcana", nome: "Tranca Arcana", circulo: 1, escola: "Abjuração", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "1 objeto Grande ou menor", duracao: "Permanente", resistencia: null,
    efeito: "Tranca um objeto que pode ser aberto ou fechado, somando +10 à CD para abri-lo à força ou com Ladinagem.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Alcance curto e duração instantânea: abre ou fecha portas, baús e janelas trancadas, dissipando a tranca, e afrouxa grilhões." },
      { custoPM: 5, resumo: "Aumenta a CD para abrir o alvo em +5." },
      { custoPM: 5, resumo: "Muda o alvo para objeto de qualquer tamanho, como portões de castelo (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p215 (livro do usuário) e p216 (final dos aprimoramentos)", verificado: true
  },
  {
    id: "tranquilidade", nome: "Tranquilidade", circulo: 1, escola: "Encantamento", tipo: "divina", custoPM: 1,
    execucao: "Padrão", alcance: "Curto", alvo: "1 animal ou humanoide", duracao: "Cena", resistencia: "Vontade parcial",
    efeito: "Deixa o alvo indiferente e incapaz de agir com agressividade; se resistir, sofre só –2 em ataques.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Muda o alvo para 1 criatura." },
      { custoPM: 1, resumo: "Aumenta o número de alvos em +1." },
      { custoPM: 5, resumo: "Alcance médio e alvos de criaturas escolhidas (requer 3º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p216 (livro do usuário)", verificado: true
  },
  {
    id: "transmutar-objetos", nome: "Transmutar Objetos", circulo: 1, escola: "Transmutação", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Toque", alvo: "Matéria-prima (madeira, rocha, osso etc.)", duracao: "Cena", resistencia: null,
    efeito: "Molda matéria-prima num objeto simples de até Pequeno e T$ 25, que volta ao estado bruto no fim da cena.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Alcance toque e alvo construto: cura 2d8 PV, com +1d8 por 2 PM extras." },
      { custoPM: 2, resumo: "Aumenta o limite de tamanho do objeto em uma categoria." },
      { custoPM: 3, resumo: "Aumenta o preço máximo do objeto em fator de 10 (+3 PM por T$ 250, +6 PM por T$ 2.500 e assim por diante)." },
      { custoPM: 5, resumo: "Restaura totalmente um objeto mundano danificado (requer 3º círculo)." },
      { custoPM: 9, resumo: "Como o anterior, mas também afeta itens mágicos." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p216 (livro do usuário)", verificado: true
  },
  {
    id: "velocidade", nome: "Velocidade", circulo: 2, escola: "Transmutação", tipo: "arcana", custoPM: 3,
    execucao: "Padrão", alcance: "Curto", alvo: "1 criatura", duracao: "Sustentada", resistencia: null,
    efeito: "Dá ao alvo uma ação padrão ou de movimento extra por turno, sem poder usá-la para lançar magias.",
    aprimoramentos: [
      { custoPM: 0, resumo: "Muda a duração para cena; a ação extra passa a ser só de movimento." },
      { custoPM: 7, resumo: "Muda o alvo para criaturas escolhidas no alcance (requer 4º círculo)." },
      { custoPM: 7, resumo: "Alcance pessoal: a ação extra pode ser usada para lançar magias e ativar engenhocas (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p216 (livro do usuário)", verificado: true
  },
  {
    id: "vestimenta-da-fe", nome: "Vestimenta da Fé", circulo: 2, escola: "Abjuração", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Toque", alvo: "1 armadura, escudo ou vestuário", duracao: "1 dia", resistencia: null,
    efeito: "Dá +2 na Defesa de uma armadura, escudo ou vestuário, como bônus de encanto.",
    aprimoramentos: [
      { custoPM: 3, resumo: "O item também dá o mesmo bônus em testes de resistência (requer 3º círculo)." },
      { custoPM: 4, resumo: "Aumenta o bônus de Defesa em +1." },
      { custoPM: 7, resumo: "O item também oferece redução de dano 5 (requer 4º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p216 (livro do usuário)", verificado: true
  },
  {
    id: "visao-mistica", nome: "Visão Mística", circulo: 1, escola: "Adivinhação", tipo: "universal", custoPM: 1,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Seus olhos enxergam auras mágicas em alcance médio, sem gastar ações, e revelam quem pode lançar magias.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Concede visão no escuro." },
      { custoPM: 2, resumo: "Duração de um dia." },
      { custoPM: 2, resumo: "Permite ver objetos e criaturas invisíveis, que aparecem como formas translúcidas." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p217 (livro do usuário)", verificado: true
  },
  {
    id: "vitalidade-fantasma", nome: "Vitalidade Fantasma", circulo: 1, escola: "Necromancia", tipo: "arcana", custoPM: 1,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Instantânea", resistencia: null,
    efeito: "Suga energia vital da terra e recebe 2d10 PV temporários, que somem ao fim da cena.",
    aprimoramentos: [
      { custoPM: 2, resumo: "Aumenta os PV temporários em +1d10, ou o dano causado pela magia em +1d10." },
      { custoPM: 5, resumo: "Esfera de 6 m centrada em você: suga PV de criaturas vivas com 1d10 de dano de trevas e recebe PV temporários iguais (requer 2º círculo)." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p217 (livro do usuário)", verificado: true
  },
  {
    id: "voz-divina", nome: "Voz Divina", circulo: 2, escola: "Adivinhação", tipo: "divina", custoPM: 3,
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: "Cena", resistencia: null,
    efeito: "Permite conversar com criaturas de qualquer tipo e entender suas respostas, respeitando a Inteligência delas.",
    aprimoramentos: [
      { custoPM: 1, resumo: "Concede vida breve a um cadáver, que responde a perguntas de forma curta e enigmática." },
      { custoPM: 1, resumo: "Permite falar com plantas e rochas, com respostas simples." }
    ],
    fonte: "Tormenta20 Jogo do Ano, p217 (livro do usuário)", verificado: true
  }
);

/* Deduplicação por id: se rules-magias.js já trouxe a mesma magia, fica a última (esta). */
(function () {
  const vistos = new Set();
  for (let i = T20_MAGIAS.length - 1; i >= 0; i--) {
    const id = T20_MAGIAS[i].id;
    if (vistos.has(id)) T20_MAGIAS.splice(i, 1);
    else vistos.add(id);
  }
})();
