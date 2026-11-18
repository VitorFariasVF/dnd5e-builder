/* tormenta20/rules-magias.js: catálogo de magias. A etapa de magias da ficha escolhe por círculo a partir daqui.

   FORMATO:
   T20_MAGIAS: array de magias com dados completos. Cada item:
     id, nome, circulo (1 a 5), escola, tipo ("arcana" | "divina"),
     execucao, alcance, alvo (texto), duracao (texto, ou null quando a fonte não informa),
     resistencia (texto ou null), efeito (frase curta em palavras próprias), fonte, verificado (true só com duas fontes).
   T20_MAGIAS_PENDENTES: magias que apareceram só no índice de uma fonte. Têm nome, circulo, escola, tipo (null se não informado) e fonte.
     Execução, alcance e duração NÃO VERIFICADOS: não entram em T20_MAGIAS até a página individual ser conferida.
   T20_MAGIAS_PROGRESSAO: custo em PM por círculo (Tabela 4-1, p176). Verificado no livro.
   T20_LINHAGENS e T20_LINHAGEM_DANOS: linhagens do Feiticeiro (p044-p045).

   Fontes:
     [X] exegetadearton.com.br, páginas individuais de magia (1 fonte). O próprio site declara que o conteúdo vem da
         Tormenta Collab Wiki e que o livro oficial prevalece. Não cita livro nem página.
     Não houve segunda fonte independente para nenhuma magia nesta frente, então todas estão com verificado: false.
   Nenhum texto do livro foi copiado: campos de mecânica e frases curtas próprias. */

const T20_MAGIAS = [
  {
    id: "alarme", nome: "Alarme", circulo: 1, escola: "Abjuração", tipo: "arcana",
    execucao: "Padrão", alcance: "Curto", alvo: "Esfera de 9 m de raio", duracao: "1 dia", resistencia: null,
    efeito: "Cria uma barreira invisível que avisa quando uma criatura a toca ou entra nela, podendo ignorar criaturas escolhidas.",
    fonte: "[X] exegetadearton, página Alarme (1 fonte). Livro e página: NÃO VERIFICADO",
    verificado: false
  },
  {
    id: "armadura-arcana", nome: "Armadura Arcana", circulo: 1, escola: "Abjuração", tipo: "arcana",
    execucao: "Padrão", alcance: "Pessoal", alvo: "Você", duracao: null, resistencia: null,
    efeito: "Cria uma proteção invisível de +5 de Defesa, que se soma a outras magias e não ao bônus de armadura.",
    fonte: "[X] exegetadearton, página Armadura Arcana (1 fonte). Duração não informada na página: NÃO VERIFICADO",
    verificado: false
  },
  {
    id: "bencao", nome: "Bênção", circulo: 1, escola: "Encantamento", tipo: "divina",
    execucao: "Padrão", alcance: "Curto", alvo: "Alvos (quantidade não informada pela página)", duracao: "Cena", resistencia: null,
    efeito: "Dá +1 em ataques e danos aos alvos e anula Perdição; com PM extra, também os deixa abençoados.",
    fonte: "[X] exegetadearton, página Bênção (1 fonte). Quantidade de alvos: NÃO VERIFICADO",
    verificado: false
  },
  {
    id: "bofetada-de-nimb", nome: "Bofetada de Nimb", circulo: 1, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Curto", alvo: "1 humanoide", duracao: "Instantânea", resistencia: "Vontade (desprevenido)",
    efeito: "Uma mão mágica dá um tapa sem dano que deixa o alvo vulnerável; se ele falhar em Vontade, também fica desprevenido por uma rodada.",
    fonte: "[X] exegetadearton, página Bofetada de Nimb (1 fonte). Variante de devotos de Nimb não incluída",
    verificado: false
  },
  {
    id: "comando", nome: "Comando", circulo: 1, escola: "Encantamento", tipo: "divina",
    execucao: "Padrão", alcance: "Curto", alvo: "1 humanoide", duracao: "1 rodada", resistencia: "Vontade anula",
    efeito: "Quem falha deve cumprir uma de cinco ordens simples no próprio turno, como fugir ou sentar-se.",
    fonte: "[X] exegetadearton, página Comando (1 fonte)",
    verificado: false
  },
  {
    id: "curar-ferimentos", nome: "Curar Ferimentos", circulo: 1, escola: "Evocação", tipo: "divina",
    execucao: "Padrão", alcance: "Toque", alvo: "1 criatura", duracao: "Instantânea", resistencia: null,
    efeito: "Restaura PV de uma criatura tocada e cancela Infligir Ferimentos; contra mortos-vivos causa dano de luz, que Vontade pode reduzir.",
    fonte: "[X] exegetadearton, página Curar Ferimentos (1 fonte)",
    verificado: false
  },
  {
    id: "escudo-da-fe", nome: "Escudo da Fé", circulo: 1, escola: "Abjuração", tipo: "divina",
    execucao: "Reação", alcance: "Curto", alvo: "1 criatura", duracao: "1 turno", resistencia: null,
    efeito: "Dá +2 de Defesa ao alvo para aparar um golpe.",
    fonte: "[X] exegetadearton, página Escudo da Fé (1 fonte)",
    verificado: false
  }
];

/* Índice de 2º a 5º círculo (nome, círculo e escola) segundo o índice de uma fonte. Página individual não acessível
   nesta frente: execução, alcance, alvo e duração NÃO VERIFICADOS. Tipo arcana/divina não informado no índice. */
const T20_MAGIAS_PENDENTES = [
  { nome: "Bola de Fogo", circulo: 2, escola: "Evocação", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Invisibilidade", circulo: 2, escola: "Ilusão", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Relâmpago", circulo: 2, escola: "Evocação", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Banimento", circulo: 3, escola: "Abjuração", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Voo", circulo: 3, escola: "Transmutação", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Vidência", circulo: 3, escola: "Adivinhação", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Campo Antimagia", circulo: 4, escola: "Abjuração", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Sopro de Dragão", circulo: 4, escola: "Evocação", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Terremoto", circulo: 4, escola: "Evocação", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Desejo", circulo: 5, escola: "Transmutação", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Semiplano", circulo: 5, escola: "Convocação", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" },
  { nome: "Toque da Morte", circulo: 5, escola: "Necromancia", tipo: null, fonte: "[X] índice de magias (1 fonte); página individual não conferida" }
];

/* Progressão de magias.
   custoPorCirculo: Tabela 4-1 (Custo de Magias), livro p176. Verificado no livro.
   circulosPorNivel: a tabela de cada conjurador traz o círculo disponível por nível. Ficam em rules-niveis.js
   (T20_NIVEIS), com página: Arcanista p043, Bardo p050, Clérigo p063, Druida p067.
   Contagem de magias conhecidas: regra por classe e caminho, em engine.js (t20MagiasConhecidasLimite). */
const T20_MAGIAS_PROGRESSAO = {
  verificado: true,
  custoPorCirculo: { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 },
  paginaCusto: "p176, Tabela 4-1: Custo de Magias",
  circulosPorNivel: "rules-niveis.js (T20_NIVEIS): Arcanista p043, Bardo p050, Clérigo p063, Druida p067",
  regraMagiasConhecidas: "Tormenta20 Jogo do Ano, p043 (Arcanista e caminhos), p050 (Bardo), p063 (Clérigo), p067 (Druida): contagem por classe, aplicada em engine.js (t20MagiasConhecidasLimite).",
  fonte: "Tormenta20 Jogo do Ano, p176 (Tabela 4-1) para o custo em PM por círculo; p043, p050, p063 e p067 para círculos e magias conhecidas."
};

/* Feiticeiro (Arcanista, caminho do Feiticeiro): linhagem sobrenatural, livro p044-p045.
   Só a herança básica vem com o caminho; a aprimorada e a superior são os poderes Herança Aprimorada (6º nível)
   e Herança Superior (11º nível), em rules-poderes.js. O app aplica os números; efeitos de combate ficam de fora. */
const T20_LINHAGENS = {
  draconica: {
    nome: "Dracônica", pagina: "p045",
    basica: "Soma o Carisma nos PV iniciais; redução de dano 5 ao tipo escolhido.",
    superior: "Soma o dobro do Carisma nos PV iniciais (no lugar do básico); imune ao tipo escolhido.",
    precisaTipo: true
  },
  feerica: {
    nome: "Feérica", pagina: "p045",
    basica: "Treinado em Enganação e uma magia de 1º círculo de encantamento ou ilusão (magia extra conhecida).",
    superior: "+2 em Carisma (aplicado ao valor final do atributo).",
    precisaTipo: false
  },
  rubra: {
    nome: "Rubra", pagina: "p045",
    basica: "Um poder da Tormenta (não escolhido neste app).",
    superior: "+4 PM por poder da Tormenta (não aplicado neste app).",
    precisaTipo: false
  }
};
const T20_LINHAGEM_DANOS = { acido: "Ácido", eletricidade: "Eletricidade", fogo: "Fogo", frio: "Frio" };
