/* Efeitos das vantagens do 3DeT Victory (manual, PDF p45-p65). Resumos curtos em palavras próprias. */
var TDT_EFEITOS_VANTAGENS = {
  aceleracao: { desc: "Gasta 1 PM para ganhar um movimento extra no turno, ou um bônus de iniciativa ou de Habilidade para correr, fugir ou perseguir.", pagina: 45, fonte: "3DeT Victory, PDF p45 (livro do usuário)" },
  mais_acao: { desc: "Cada compra soma +2 PA ao total de Pontos de Ação, e pode ser comprada várias vezes.", pagina: 45, fonte: "3DeT Victory, PDF p45 (livro do usuário)" },
  acumulador: { desc: "Ao causar dano, gasta 2 PM para ganhar +1 Poder no ataque seguinte, até P+5. Errar ou desistir de atacar zera o bônus.", pagina: 45, nota: "Texto continua na p46, após o quadro lateral 'Mais ágil que uma tartaruga'.", fonte: "3DeT Victory, PDF p45-p46 (livro do usuário)" },
  ajudante: { desc: "Uma vez por rodada, gasta 2 PM para invocar um ajudante (curandeiro, especialista, familiar, lutador ou montaria). Só uma ajuda por rodada.", pagina: 46, nota: "Familiar e montaria custam 1 PM; familiar reduz pela metade o custo de outra vantagem na rodada. Cada compra adiciona um ajudante ou função.", fonte: "3DeT Victory, PDF p46-p47 (livro do usuário)" },
  arena: { desc: "Em um tipo de terreno escolhido com aprovação do mestre, gasta 2 PM para obter Ganho em um teste.", pagina: 48, fonte: "3DeT Victory, PDF p48 (livro do usuário)" },
  base: { desc: "Ponto de descanso para onde se pode teleportar fora de combate, levando aliados até Poder + Habilidade. Testes ali têm Ganho.", pagina: 49, nota: "Viagem só de ida; risco ou perigo, como estar preso, pode impedir o acesso. Texto continua na p50.", fonte: "3DeT Victory, PDF p49-p50 (livro do usuário)" },
  confusao: { desc: "Com 2 PM, um ataque bem-sucedido confunde o alvo, que passa a escolher alvos ao acaso. Até o fim da cena ou dano.", pagina: 51, fonte: "3DeT Victory, PDF p51 (livro do usuário)" },
  cura: { desc: "Gasta 2 PM para curar 1D PV por vez, até dados iguais à Habilidade. Também permite refazer um teste de R contra efeito duradouro.", pagina: 51, fonte: "3DeT Victory, PDF p51 (livro do usuário)" },
  desgaste: { desc: "Com 2 PM, o alvo que sofre dano repete esse dano na rodada seguinte, a menos que gaste sua próxima ação para evitar.", pagina: 52, fonte: "3DeT Victory, PDF p52 (livro do usuário)" },
  devoto: { desc: "Em testes enquanto segue ou defende sua devoção, gasta 2 PM para ter Ganho. Pode usar isso até duas vezes por cena.", pagina: 53, fonte: "3DeT Victory, PDF p53 (livro do usuário)" },
  elo_mental: { desc: "Ligação com outro personagem que também tem a vantagem: percebem pensamentos quando se veem, compartilham PM e podem passar Ganho.", pagina: 53, fonte: "3DeT Victory, PDF p53 (livro do usuário)" },
  estender: { desc: "Gasta 1 PM por turno para que uma vantagem pessoal também afete um aliado Perto. Não vale para vantagens que atacam ou prejudicam outros.", pagina: 53, fonte: "3DeT Victory, PDF p53 (livro do usuário)" },
  famoso: { desc: "Se NPCs o reconhecem (normalmente 1-4 em 1D), gasta 3 PM para ter Ganho em teste social.", pagina: 53, fonte: "3DeT Victory, PDF p53 (livro do usuário)" },
  foco: { desc: "Gasta 2 PM e um turno de concentração; se não sofrer dano, o teste do turno seguinte recebe um crítico automático.", pagina: 54, nota: "Enquanto se concentra, tem Perda na defesa; dano quebra a concentração e os PM são perdidos.", fonte: "3DeT Victory, PDF p54 (livro do usuário)" },
  golpe_final: { desc: "Gasta 3 PM para atacar um alvo quase derrotado, com o ataque em escala mais alta.", pagina: 54, fonte: "3DeT Victory, PDF p54 (livro do usuário)" },
  imitar: { desc: "Ao ver uma vantagem usada perto (Longe ou menos), faz Percepção (9); se passar, gasta 3 PM para copiá-la até o fim da cena.", pagina: 55, fonte: "3DeT Victory, PDF p55 (livro do usuário)" },
  imortal: { desc: "Mesmo derrotado, o personagem não morre: testes de morte param no nível inconsciente.", pagina: 56, fonte: "3DeT Victory, PDF p56 (livro do usuário)" },
  imune: { desc: "Ignora uma necessidade ou efeito comum, como respirar, pressão, cansaço, doenças ou efeitos mentais. Cada tipo custa separado.", pagina: 56, nota: "Tipos citados no livro: Abiótico, Anfíbio, Doenças, Resiliente e Sem Mente. Texto continua na p57.", fonte: "3DeT Victory, PDF p56-p57 (livro do usuário)" },
  improviso: { desc: "Gasta 3 PM para aprender na hora uma perícia que não tem, válida até o fim da cena. Só uma por vez.", pagina: 56, fonte: "3DeT Victory, PDF p56 (livro do usuário)" },
  ilusao: { desc: "Cria imagem sem toque nem dano que engana os sentidos; custa 1 a 8 PM conforme o tamanho. Percepção (9 + PM) detecta.", pagina: 55, nota: "Custos do livro: 1 PM (tamanho de livro), 3 PM (pessoa), 5 PM (caminhão), 8 PM (prédio).", fonte: "3DeT Victory, PDF p55 (livro do usuário)" },
  incorporeo: { desc: "Ação e 5 PM tornam intangível: atravessa barreiras e ignora dano físico de combate, exceto magia; dura até fim da cena.", pagina: 57, fonte: "3DeT Victory, PDF p57 (livro do usuário)" },
  inimigo: { desc: "Contra o grupo escolhido, seus testes têm crítico com 5 ou 6. Um arquétipo ou personagem específico dá Ganho.", pagina: 57, custoLivro: "1 pt por grupo; 2 pt se o grupo existir em grande abundância na campanha (p57)", fonte: "3DeT Victory, PDF p57-p58 (livro do usuário)" },
  inofensivo: { desc: "Quando surpreende, há uma ação extra antes do primeiro turno; não se repete com a mesma pessoa. Com 3 PM, Ganho para enganar.", pagina: 57, fonte: "3DeT Victory, PDF p57-p58 (livro do usuário)" },
  instrutor: { desc: "Com ação e 2 PM, um aliado testa como se tivesse uma sua perícia, ou usa uma das suas vantagens, até o próximo turno dele.", pagina: 58, fonte: "3DeT Victory, PDF p58 (livro do usuário)" },
  invisivel: { desc: "Com 3 PM e ação, fica invisível: Ganho em se esconder, Perda contra ataques. Quebra ao atacar ou ao sofrer dano.", pagina: 59, custoLivro: "1 pt (quebra ao atacar ou ao sofrer dano) ou 2 pt (quebra só ao sofrer dano) (p59)", fonte: "3DeT Victory, PDF p59 (livro do usuário)" },
  irresistivel: { desc: "Antes do teste do alvo, gasta 2 PM ou mais; cada 2 PM sobe a meta de resistência em +3.", pagina: 59, fonte: "3DeT Victory, PDF p59 (livro do usuário)" },
  mais_membros: { desc: "Gasta 3 PM para uma segunda ação no turno, de combate ou não. Compra única, vale para qualquer número de membros.", pagina: 59, fonte: "3DeT Victory, PDF p59-p60 (livro do usuário)" },
  mais_mana: { desc: "Cada compra soma +10 PM ao total de Pontos de Mana, podendo ser comprada várias vezes.", pagina: 60, fonte: "3DeT Victory, PDF p60 (livro do usuário)" },
  magia: { desc: "Gasta 1 PM para +1 em qualquer teste, até um bônus máximo igual à Habilidade. Em ataque ou defesa, pode usar Mística.", pagina: 60, fonte: "3DeT Victory, PDF p60 (livro do usuário)" },
  mentor: { desc: "Para uma perícia escolhida, Ganho uma vez por cena em teste dela. Técnicas que pedem essa perícia custam 1 PM a menos (mínimo 1).", pagina: 61, fonte: "3DeT Victory, PDF p61 (livro do usuário)" },
  obstinado: { desc: "Usa 1 ponto de P, H ou R como se fosse 1 Ponto de Ação. Recupera pontos de atributo só com descanso (8 horas).", pagina: 61, custoLivro: "1 pt (p61)", fonte: "3DeT Victory, PDF p61 (livro do usuário)" },
  paralisia: { desc: "Com 2 PM, um ataque bem-sucedido deixa o alvo indefeso e imobilizado. Dura até o fim da cena ou dano; R (6 + Poder) cancela.", pagina: 61, fonte: "3DeT Victory, PDF p61 (livro do usuário)" },
  patrono: { desc: "Gasta 1 PM em compras que ajudam a missão do Patrono para ter Ganho. Também recebe um consumível extra de cada raridade.", pagina: 61, fonte: "3DeT Victory, PDF p61 (livro do usuário)" },
  sentido: { desc: "Permite tentar Percepção onde outros não conseguem, como no escuro. Cada compra escolhe um sentido: aguçado, radar, raio X etc.", pagina: 61, nota: "Sentidos listados no livro: Aguçado, Infravisão, Intuição, Radar e Raio X; também pode ser um sentido especial inventado com aprovação do mestre.", fonte: "3DeT Victory, PDF p61-p63 (livro do usuário)" },
  punicao: { desc: "Com ataque e 2 PM, o alvo sofre uma desvantagem escolhida na compra, de mesmo valor, até o fim da cena ou dano.", pagina: 61, nota: "Texto continua na p62. Só uma punição por vez em cada adversário.", fonte: "3DeT Victory, PDF p61-p62 (livro do usuário)" },
  regeneracao: { desc: "Início do turno: recupera 1 PV (1 pt) ou 3 PV (2 pt). Em testes de morte, volta no fim da cena.", pagina: 62, custoLivro: "1 pt (1 PV por turno) ou 2 pt (3 PV por turno) (p62)", nota: "Anulação do oponente impede esta regeneração.", fonte: "3DeT Victory, PDF p62 (livro do usuário)" },
  riqueza: { desc: "Em testes de compra, gasta PM para subir a escala de riqueza em 1 a 3 níveis, conforme o nível comprado.", pagina: 62, custoLivro: "2, 4 ou 6 pt (6 pt = Kami, até 3 níveis por 6 PM) (p62)", nota: "2 pt: 1 nível por 2 PM; 4 pt: até 2 níveis por 4 PM; 6 pt: até 3 níveis por 6 PM. PM gastos não voltam até o fim da cena.", fonte: "3DeT Victory, PDF p62 (livro do usuário)" },
  telepata: { desc: "Gasta 1 PM e um movimento para: Ganho em teste social, descobrir atributo ou vantagem com Habilidade (9), ou Ganho na defesa.", pagina: 63, nota: "Só funciona em criaturas vivas que o personagem consiga ver. Texto continua na p64.", fonte: "3DeT Victory, PDF p63-p64 (livro do usuário)" },
  teleporte: { desc: "Usa um movimento e 1 PM por movimento substituído para ir a qualquer lugar visível. Terreno difícil não afeta. 3 PM dão Ganho na defesa.", pagina: 64, fonte: "3DeT Victory, PDF p64 (livro do usuário)" },
  torcida: { desc: "Com torcida presente, Ganho uma vez por rodada em qualquer teste. Rola-se 1D no início da cena; resultado 1 indica torcida.", pagina: 64, nota: "Sem torcida, um aliado pode motivar com uma ação; o benefício vale no próximo turno.", fonte: "3DeT Victory, PDF p64 (livro do usuário)" },
  transformacao: { desc: "Cria outra forma com os mesmos pontos, que também tem esta vantagem. Com 1 pt, as desvantagens se somam; com 2 pt, ficam separadas.", pagina: 63, nota: "Mudar de forma exige ação; uma transformação por sessão, ou 1 PA por transformação extra.", fonte: "3DeT Victory, PDF p63 (livro do usuário)" },
  mais_vida: { desc: "Cada compra soma +10 PV ao total de Pontos de Vida, podendo ser comprada várias vezes.", pagina: 65, fonte: "3DeT Victory, PDF p65 (livro do usuário)" },
  voo: { desc: "Levantar voo do chão custa um movimento e 2 PM; manter o voo não custa PM. Só quem também voa consegue acompanhar.", pagina: 65, fonte: "3DeT Victory, PDF p65 (livro do usuário)" },

  // Bloco separado: vantagens que estão no livro mas ainda não no app (brutal). Clone está no bloco principal.
  brutal: { desc: "Em combate, recupera PV ou PM por dano causado (1 por 3) e, ao derrotar, 3 PV e 1 PM. Cada versão custa 1 pt.", pagina: 50, naoNoApp: true, custoLivro: "1 pt cada versão (Vida, Mana, Derrota); versões se acumulam (p50)", fonte: "3DeT Victory, PDF p50 (livro do usuário)" },
  clone: { desc: "Cada clone criado custa 2 PM e um movimento; um ataque que acerte o criador é absorvido por um clone, que desaparece.", pagina: 51, nota: "Nome do livro na regra (p51). As fichas de NPC escrevem Cópia (p216, p220, p275, p277): é a mesma vantagem.", fonte: "3DeT Victory, PDF p51 (livro do usuário)" }
};

/* Liga os efeitos ao catálogo: só preenche desc que ainda está null. */
(function(){
  var R = window.TDT_RULES;
  if(!R || !Array.isArray(R.vantagens)) return;
  R.vantagens.forEach(function(v){
    var e = TDT_EFEITOS_VANTAGENS[v.id];
    if(v.desc === null && e && e.desc && !e.naoNoApp) v.desc = e.desc;
  });
})();
