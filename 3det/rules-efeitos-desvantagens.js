/* Efeitos das desvantagens do 3DeT Victory (manual, PDF pNN). Resumos curtos em palavras próprias. */
var TDT_EFEITOS_DESVANTAGENS = {
  ambiente: { desc: "No início de cada cena, role 1d: se sair 1, nada do seu ambiente existe ali e todos os seus testes têm Perda.", pagina: 65, fonte: "3DeT Victory, PDF p65-66 (livro do usuário)" },
  amnesia: { desc: "Você não sabe quem é. O mestre guarda suas capacidades em segredo e pode rolar seus testes às escondidas, com Ganho ou Perda sem explicação.", pagina: 66, fonte: "3DeT Victory, PDF p66 (livro do usuário)" },
  antipatico: { desc: "Em testes de Poder de interação social você tem Perda e nunca tem acertos críticos. Incompatível com Carismático.", pagina: 67, fonte: "3DeT Victory, PDF p67 (livro do usuário)" },
  assombrado: { desc: "Ao entrar em cena perigosa, role 1d: se sair 1, Perda em todos os testes até o fim. Versão -2: aparece em resultado ímpar.", pagina: 67, fonte: "3DeT Victory, PDF p67 (livro do usuário)", nota: "Versão -1 e -2 (valorMin -2, valorMax -1)." },
  atrapalhado: { desc: "Em testes de Habilidade de coordenação e agilidade você tem Perda e nunca tem acertos críticos. Incompatível com Ágil.", pagina: 67, fonte: "3DeT Victory, PDF p67 (livro do usuário)" },
  aura: { desc: "Causa Perda em testes sociais seus. Versão -1: testes de outros Perto de você têm Perda. Versão -2: vale até para testes Longe.", pagina: 67, fonte: "3DeT Victory, PDF p67 (livro do usuário)", nota: "Versão -1 e -2 (valorMin -2, valorMax -1)." },
  bateria: { desc: "Ao chegar a 0 PM você fica inconsciente e indefeso. Com PM abaixo de sua H, todos os seus testes têm Perda.", pagina: 67, fonte: "3DeT Victory, PDF p67 (livro do usuário)" },
  codigo: { desc: "Você segue um código de conduta. Violá-lo dá Perda em todos os testes até você se redimir ou cumprir o código na próxima chance.", pagina: 68, fonte: "3DeT Victory, PDF p68 (livro do usuário)", nota: "Multiplo: cada código vale -1; o livro lista vários códigos (Asimov, Caçador, Combate, Derrota, Gratidão, Heróis, Honestidade, Redenção)." },
  dependencia: { desc: "Precisa de algo raro ou desumano todo dia; se não satisfazer, Perda em todos os testes até satisfazer. Só para vilões NPCs.", pagina: 68, fonte: "3DeT Victory, PDF p68-69 (livro do usuário)" },
  diferente: { desc: "Seu corpo não é padrão: só usa equipamentos feitos para você e tem Perda com itens de outros. Às vezes pode ter Ganho.", pagina: 69, fonte: "3DeT Victory, PDF p69 (livro do usuário)" },
  elo_vital: { desc: "Dano em PV é repassado ao aliado vinculado na mesma quantia (ajustado por escala); curas não são repassadas.", pagina: 69, fonte: "3DeT Victory, PDF p69 (livro do usuário)" },
  fracote: { desc: "Em testes de Poder de esforço físico você tem Perda e nunca tem acertos críticos. Incompatível com Forte.", pagina: 69, fonte: "3DeT Victory, PDF p69 (livro do usuário)" },
  fragil: { desc: "Em testes de Resistência contra doenças, venenos e morte você tem Perda e sem acertos críticos. Incompatível com Vigoroso.", pagina: 69, fonte: "3DeT Victory, PDF p69 (livro do usuário)" },
  fraqueza: { desc: "Perto do objeto ou condição da fraqueza, todos os seus testes têm Perda. Versão -1 para fonte rara; -2 para fonte comum.", pagina: 69, fonte: "3DeT Victory, PDF p69-70 (livro do usuário)", nota: "Versão -1 e -2 (valorMin -2, valorMax -1)." },
  furia: { desc: "Ao sofrer dano ou se irritar, teste Resistência; se falhar, entra em fúria: Perda em não-ataques e vantagens custam o dobro de PM.", pagina: 70, fonte: "3DeT Victory, PDF p70 (livro do usuário)" },
  inapto: { desc: "Escolha uma perícia que você não possui: testes dela têm Perda e toda falha conta como falha crítica.", pagina: 70, fonte: "3DeT Victory, PDF p70 (livro do usuário)" },
  inculto: { desc: "Sem familiaridade com a cultura e a língua locais: testes sociais com quem não te entende têm Perda.", pagina: 71, fonte: "3DeT Victory, PDF p71 (livro do usuário)" },
  indeciso: { desc: "Em testes de Resistência de força de vontade você tem Perda e nunca tem acertos críticos. Incompatível com Resoluto.", pagina: 71, fonte: "3DeT Victory, PDF p71 (livro do usuário)" },
  infame: { desc: "Em testes sociais contra NPCs que te reconhecem (geralmente 1-4 em 1d), você sempre tem Perda. Incompatível com Famoso.", pagina: 71, fonte: "3DeT Victory, PDF p71 (livro do usuário)" },
  insano: { desc: null, pagina: 74, fonte: "3DeT Victory, PDF p74-75 (livro do usuário)", nota: "Não existe 'Insano' no livro: a desvantagem é Transtorno (-1 cada, escolha de um dos oito em naoNoApp.transtornos). Sem efeito único." },
  lento: { desc: "Em testes de iniciativa você tem Perda e gasta um movimento extra para cruzar cada distância. Incompatível com Aceleração.", pagina: 71, fonte: "3DeT Victory, PDF p71 (livro do usuário)", nota: "No app a fonte cita PDF p57; no livro o texto está na p71." },
  maldicao: { desc: "Maldição constante. -1: efeito suave, quase só incômodo. -2: grave; dano que você causa volta a você e falhas em um atributo viram críticas.", pagina: 71, fonte: "3DeT Victory, PDF p71 (livro do usuário)", nota: "Versão -1 e -2 (valorMin -2, valorMax -1)." },
  monstruoso: { desc: "Aparência grotesca: em iniciativa você tem Perda (salvo surpresa) e em testes sociais de aparência também. Incompatível com Inofensivo.", pagina: 71, fonte: "3DeT Victory, PDF p71-72 (livro do usuário)" },
  municao: { desc: "Cada ataque exige um movimento de recarga antes; se atacar sem recarregar, não soma o Poder ao teste nem aos críticos.", pagina: 72, fonte: "3DeT Victory, PDF p72 (livro do usuário)" },
  pacifista: { desc: "-1: não faz ataques, mas pode se defender e vencer por outros meios. -2: nada que cause dano, nem ferir com palavras.", pagina: 73, fonte: "3DeT Victory, PDF p73 (livro do usuário)", nota: "Versão -1 e -2 (valorMin -2, valorMax -1)." },
  pobreza: { desc: "Todos os testes de compra têm Perda e você tende a não acumular recursos. Incompatível com Riqueza.", pagina: 73, fonte: "3DeT Victory, PDF p73 (livro do usuário)" },
  ponto_fraco: { desc: "Adversários que conhecem seu ponto fraco podem gastar 1 PM para ter Ganho contra você em testes que o exploram.", pagina: 73, fonte: "3DeT Victory, PDF p73 (livro do usuário)" },
  protegido: { desc: "Com o protegido desaparecido, indefeso ou ferido, todos os seus testes têm Perda. Se ele morrer ou sumir, Assombrado -2.", pagina: 73, fonte: "3DeT Victory, PDF p73 (livro do usuário)" },
  restricao: { desc: "Sob certa condição, suas vantagens que gastam PM custam o dobro. Versão -1: condição rara; -2: condição frequente.", pagina: 73, fonte: "3DeT Victory, PDF p73-74 (livro do usuário)", nota: "Versão -1 e -2 (valorMin -2, valorMax -1). Não pode ser escolhida sem vantagem que gasta PM." },
  sem_vida: { desc: "Não pode morrer, mas não recupera PV por descanso, itens ou Cura; conserto com Máquinas ou Mística (teste 9, 1 hora).", pagina: 74, fonte: "3DeT Victory, PDF p74 (livro do usuário)" },
  tapado: { desc: "Em testes de Habilidade de inteligência e raciocínio você tem Perda e nunca tem acertos críticos. Incompatível com Gênio.", pagina: 74, fonte: "3DeT Victory, PDF p74 (livro do usuário)" },
  utensilio: { desc: "Precisa de um item para usar bem uma perícia; sem ele, nada de acertos críticos nela. Versão -2: sem o item, sem vantagens com PM.", pagina: 75, fonte: "3DeT Victory, PDF p75 (livro do usuário)", custoLivro: "-1 ou -2 (app só tem -1; a versão -2 não está no app)", nota: "Custo do app mantido em -1; registrado apenas a divergência." },

  // Não está no app como desvantagem única: bloco de referência para Insano/Transtorno (PDF p74-75).
  naoNoApp: {
    transtornos: {
      custo: "-1 cada (escolha de uma opção)",
      pagina: "74-75",
      fonte: "3DeT Victory, PDF p74-75 (livro do usuário)",
      nota: "Superar o transtorno pede teste de Resistência (9).",
      opcoes: {
        cleptomania: { desc: "Sempre que surgir chance de roubar algo interessante, faça um teste para evitar; nunca devolve o que roubou." },
        compulsao: { desc: "Precisa repetir uma ação várias vezes ao dia; a cada cena, Perda em todos os testes até gastar uma rodada nela." },
        distracao: { desc: "Não se concentra em nada que não o interesse (fora de Devoto ou Código); sem acertos críticos nessas situações." },
        fantasia: { desc: "Acredita ser algo que não é e se anuncia o tempo todo; Perda em todos os testes sociais." },
        fobia: { desc: "Diante do objeto do medo, só faz movimentos; para fazer uma ação, precisa passar antes em um teste." },
        megalomania: { desc: "Nunca se rende e segue lutando mesmo depois de derrotado." },
        mitomania: { desc: "Não diz a verdade; para dizer algo verdadeiro precisa passar em um teste, inclusive para aliados." },
        paranoia: { desc: "Não confia em ninguém: precisa de teste para aceitar ajuda, inclusive cura; descanso recupera só metade." }
      }
    }
  }
};

/* Liga os efeitos ao catálogo: só preenche desc que ainda está null. */
(function(){
  var R = window.TDT_RULES;
  if(!R || !Array.isArray(R.desvantagens)) return;
  R.desvantagens.forEach(function(d){
    var e = TDT_EFEITOS_DESVANTAGENS[d.id];
    if(d.desc === null && d.desc !== undefined && e && e.desc) d.desc = e.desc;
  });
})();
