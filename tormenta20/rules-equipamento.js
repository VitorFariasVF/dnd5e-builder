/* tormenta20/rules-equipamento.js: dados adicionais, carregado depois de rules.js.

   FORMATO (só dados; a interface não usa este arquivo ainda):
   T20_ARMAS: { id, nome, categoria ("simples" | "marcial" | "exotica" | "fogo"), dano ("1d8"), tipoDano ("corte" | "perfuracao" | "esmagamento"),
                critico ("19-20/x2" ou equivalente), alcance (texto ou null), proficiencia (texto), espacos (inteiro), preco (T$, inteiro), fonte, verificado }
   T20_ARMADURAS: { id, nome, categoria ("leve" | "media" | "pesada" | "escudo"), defesa (inteiro, bônus), limiteDes (inteiro ou null),
                    penalidade (texto ou null), forcaMinima (inteiro ou null), espacos (inteiro), preco (T$, inteiro), fonte, verificado }
   T20_ITENS: { id, nome, categoria, espacos (inteiro ou null), preco (T$, inteiro ou null), fonte, verificado }
   T20_EQUIPAMENTO_STATUS: situação da frente com a lista de lacunas.

   Convenções desta entrega (todas conferidas nas imagens das páginas do livro do usuário):
   - Página citada como pNNN (arquivo/PDF). Página impressa = pNNN - 6.
   - "Impacto" do livro é gravado como "esmagamento" (valor do formato).
   - Crítico "19" é gravado como "19-20/x2"; "18" como "18-20/x2"; "x3" como "20/x3"; "19/x3" como "19-20/x3".
   - Preço "—" de arma (clava, bordão, tacape, funda) é gravado como 0.
   - Espaço ou preço "—" de item é gravado como null.
   - Valores fracionários (T$ 0,1 a T$ 0,5; espaço 0,5) não cabem no campo inteiro: ficam null e o item fica verificado:false.
   - Rede (arma exótica sem dano) não entrou: o formato exige dano NdN.
   - Dano de armas de duas mãos com dois valores (bordão, espada bastarda, katana, corrente de espinhos) fica com o primeiro valor e verificado:false.
   - Alabarda (corte ou perfuração) fica com "corte" e verificado:false.
   - O livro não tem categoria "média" de armadura; ela fica sem itens.
   - Limite de Destreza 0 nas armaduras pesadas vem do texto (p158); armaduras leves e escudos ficam null. */

const T20_ARMAS = [
  /* Armas simples (p150) */
  { id: "adaga", nome: "Adaga", categoria: "simples", dano: "1d4", tipoDano: "perfuracao", critico: "19-20/x2", alcance: "Curto", proficiencia: "Simples", espacos: 1, preco: 2, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },
  { id: "espada-curta", nome: "Espada curta", categoria: "simples", dano: "1d6", tipoDano: "perfuracao", critico: "19-20/x2", alcance: null, proficiencia: "Simples", espacos: 1, preco: 10, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },
  { id: "foice", nome: "Foice", categoria: "simples", dano: "1d6", tipoDano: "corte", critico: "20/x3", alcance: null, proficiencia: "Simples", espacos: 1, preco: 4, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },
  { id: "clava", nome: "Clava", categoria: "simples", dano: "1d6", tipoDano: "esmagamento", critico: "20/x2", alcance: null, proficiencia: "Simples", espacos: 1, preco: 0, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário); preço \"—\" gravado como 0", verificado: true },
  { id: "lanca", nome: "Lança", categoria: "simples", dano: "1d6", tipoDano: "perfuracao", critico: "20/x2", alcance: "Curto", proficiencia: "Simples", espacos: 1, preco: 2, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },
  { id: "maca", nome: "Maça", categoria: "simples", dano: "1d8", tipoDano: "esmagamento", critico: "20/x2", alcance: null, proficiencia: "Simples", espacos: 1, preco: 12, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },
  { id: "bordao", nome: "Bordão", categoria: "simples", dano: "1d6", tipoDano: "esmagamento", critico: "20/x2", alcance: null, proficiencia: "Simples", espacos: 2, preco: 0, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário); dano 1d6/1d6 (arma dupla), guardado o primeiro valor; preço \"—\" gravado como 0", verificado: false },
  { id: "pique", nome: "Pique", categoria: "simples", dano: "1d8", tipoDano: "perfuracao", critico: "20/x2", alcance: null, proficiencia: "Simples", espacos: 2, preco: 2, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },
  { id: "tacape", nome: "Tacape", categoria: "simples", dano: "1d10", tipoDano: "esmagamento", critico: "20/x2", alcance: null, proficiencia: "Simples", espacos: 2, preco: 0, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário); preço \"—\" gravado como 0", verificado: true },
  { id: "azagaia", nome: "Azagaia", categoria: "simples", dano: "1d6", tipoDano: "perfuracao", critico: "20/x2", alcance: "Médio", proficiencia: "Simples", espacos: 1, preco: 1, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },
  { id: "besta-leve", nome: "Besta leve", categoria: "simples", dano: "1d8", tipoDano: "perfuracao", critico: "19-20/x2", alcance: "Médio", proficiencia: "Simples", espacos: 1, preco: 35, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },
  { id: "funda", nome: "Funda", categoria: "simples", dano: "1d4", tipoDano: "esmagamento", critico: "20/x2", alcance: "Médio", proficiencia: "Simples", espacos: 1, preco: 0, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário); preço \"—\" gravado como 0", verificado: true },
  { id: "arco-curto", nome: "Arco curto", categoria: "simples", dano: "1d6", tipoDano: "perfuracao", critico: "20/x3", alcance: "Médio", proficiencia: "Simples", espacos: 2, preco: 30, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },

  /* Armas marciais (p150 para a machadinha; p151 para as demais) */
  { id: "machadinha", nome: "Machadinha", categoria: "marcial", dano: "1d6", tipoDano: "corte", critico: "20/x3", alcance: "Curto", proficiencia: "Marcial", espacos: 1, preco: 6, fonte: "Tormenta20 Jogo do Ano, p150 (pág. impressa 144) (livro do usuário)", verificado: true },
  { id: "cimitarra", nome: "Cimitarra", categoria: "marcial", dano: "1d6", tipoDano: "corte", critico: "18-20/x2", alcance: null, proficiencia: "Marcial", espacos: 1, preco: 15, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "espada-longa", nome: "Espada longa", categoria: "marcial", dano: "1d8", tipoDano: "corte", critico: "19-20/x2", alcance: null, proficiencia: "Marcial", espacos: 1, preco: 15, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "florete", nome: "Florete", categoria: "marcial", dano: "1d6", tipoDano: "perfuracao", critico: "18-20/x2", alcance: null, proficiencia: "Marcial", espacos: 1, preco: 20, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "machado-de-batalha", nome: "Machado de batalha", categoria: "marcial", dano: "1d8", tipoDano: "corte", critico: "20/x3", alcance: null, proficiencia: "Marcial", espacos: 1, preco: 10, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "mangual", nome: "Mangual", categoria: "marcial", dano: "1d8", tipoDano: "esmagamento", critico: "20/x2", alcance: null, proficiencia: "Marcial", espacos: 1, preco: 8, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "martelo-de-guerra", nome: "Martelo de guerra", categoria: "marcial", dano: "1d8", tipoDano: "esmagamento", critico: "20/x3", alcance: null, proficiencia: "Marcial", espacos: 1, preco: 12, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "picareta", nome: "Picareta", categoria: "marcial", dano: "1d6", tipoDano: "perfuracao", critico: "20/x4", alcance: null, proficiencia: "Marcial", espacos: 1, preco: 8, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "tridente", nome: "Tridente", categoria: "marcial", dano: "1d8", tipoDano: "perfuracao", critico: "20/x2", alcance: "Curto", proficiencia: "Marcial", espacos: 1, preco: 15, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "alabarda", nome: "Alabarda", categoria: "marcial", dano: "1d10", tipoDano: "corte", critico: "20/x3", alcance: null, proficiencia: "Marcial", espacos: 2, preco: 10, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário); tipo \"corte/perfuração\" no livro, guardado \"corte\"", verificado: false },
  { id: "alfange", nome: "Alfange", categoria: "marcial", dano: "2d4", tipoDano: "corte", critico: "18-20/x2", alcance: null, proficiencia: "Marcial", espacos: 2, preco: 75, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "gadanho", nome: "Gadanho", categoria: "marcial", dano: "2d4", tipoDano: "corte", critico: "20/x4", alcance: null, proficiencia: "Marcial", espacos: 2, preco: 18, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "lanca-montada", nome: "Lança montada", categoria: "marcial", dano: "1d8", tipoDano: "perfuracao", critico: "20/x3", alcance: null, proficiencia: "Marcial", espacos: 2, preco: 10, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "machado-de-guerra", nome: "Machado de guerra", categoria: "marcial", dano: "1d12", tipoDano: "corte", critico: "20/x3", alcance: null, proficiencia: "Marcial", espacos: 2, preco: 20, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "marreta", nome: "Marreta", categoria: "marcial", dano: "3d4", tipoDano: "esmagamento", critico: "20/x2", alcance: null, proficiencia: "Marcial", espacos: 2, preco: 20, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "montante", nome: "Montante", categoria: "marcial", dano: "2d6", tipoDano: "corte", critico: "19-20/x2", alcance: null, proficiencia: "Marcial", espacos: 2, preco: 50, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "arco-longo", nome: "Arco longo", categoria: "marcial", dano: "1d8", tipoDano: "perfuracao", critico: "20/x3", alcance: "Médio", proficiencia: "Marcial", espacos: 2, preco: 100, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "besta-pesada", nome: "Besta pesada", categoria: "marcial", dano: "1d12", tipoDano: "perfuracao", critico: "19-20/x2", alcance: "Médio", proficiencia: "Marcial", espacos: 2, preco: 50, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },

  /* Armas exóticas (p151); a rede não entrou (sem dano) */
  { id: "chicote", nome: "Chicote", categoria: "exotica", dano: "1d3", tipoDano: "corte", critico: "20/x2", alcance: null, proficiencia: "Exótica", espacos: 1, preco: 2, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "espada-bastarda", nome: "Espada bastarda", categoria: "exotica", dano: "1d10", tipoDano: "corte", critico: "19-20/x2", alcance: null, proficiencia: "Exótica", espacos: 1, preco: 35, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário); dano 1d10/1d12 (uma mão/duas mãos), guardado 1d10", verificado: false },
  { id: "katana", nome: "Katana", categoria: "exotica", dano: "1d8", tipoDano: "corte", critico: "19-20/x2", alcance: null, proficiencia: "Exótica", espacos: 1, preco: 100, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário); dano 1d8/1d10 (uma mão/duas mãos), guardado 1d8", verificado: false },
  { id: "machado-anao", nome: "Machado anão", categoria: "exotica", dano: "1d10", tipoDano: "corte", critico: "20/x3", alcance: null, proficiencia: "Exótica", espacos: 1, preco: 30, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "corrente-de-espinhos", nome: "Corrente de espinhos", categoria: "exotica", dano: "2d4", tipoDano: "corte", critico: "19-20/x2", alcance: null, proficiencia: "Exótica", espacos: 2, preco: 25, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário); dano 2d4/2d4 (arma dupla), guardado o primeiro valor", verificado: false },
  { id: "machado-taurico", nome: "Machado táurico", categoria: "exotica", dano: "2d8", tipoDano: "corte", critico: "20/x3", alcance: null, proficiencia: "Exótica", espacos: 2, preco: 50, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },

  /* Armas de fogo (p151) */
  { id: "pistola", nome: "Pistola", categoria: "fogo", dano: "2d6", tipoDano: "perfuracao", critico: "19-20/x3", alcance: "Curto", proficiencia: "Fogo", espacos: 1, preco: 250, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true },
  { id: "mosquete", nome: "Mosquete", categoria: "fogo", dano: "2d8", tipoDano: "perfuracao", critico: "19-20/x3", alcance: "Médio", proficiencia: "Fogo", espacos: 2, preco: 500, fonte: "Tormenta20 Jogo do Ano, p151 (pág. impressa 145) (livro do usuário)", verificado: true }
];

const T20_ARMADURAS = [
  /* Armaduras leves (p159; livro não define limite de Destreza para leves) */
  { id: "armadura-acolchoada", nome: "Armadura acolchoada", categoria: "leve", defesa: 1, limiteDes: null, penalidade: "0", forcaMinima: null, espacos: 2, preco: 5, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário)", verificado: true },
  { id: "armadura-de-couro", nome: "Armadura de couro", categoria: "leve", defesa: 2, limiteDes: null, penalidade: "0", forcaMinima: null, espacos: 2, preco: 20, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário)", verificado: true },
  { id: "couro-batido", nome: "Couro batido", categoria: "leve", defesa: 3, limiteDes: null, penalidade: "-1", forcaMinima: null, espacos: 2, preco: 35, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário)", verificado: true },
  { id: "gibao-de-peles", nome: "Gibão de peles", categoria: "leve", defesa: 4, limiteDes: null, penalidade: "-3", forcaMinima: null, espacos: 2, preco: 25, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário)", verificado: true },
  { id: "couraca", nome: "Couraça", categoria: "leve", defesa: 5, limiteDes: null, penalidade: "-4", forcaMinima: null, espacos: 2, preco: 500, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário)", verificado: true },

  /* Armaduras pesadas (p159; sem Destreza na Defesa, limite 0, vem de p158 pág. impressa 152) */
  { id: "brunea", nome: "Brunea", categoria: "pesada", defesa: 5, limiteDes: 0, penalidade: "-2", forcaMinima: null, espacos: 5, preco: 50, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário); limite de Destreza de p158 (pág. impressa 152)", verificado: true },
  { id: "cota-de-malha", nome: "Cota de malha", categoria: "pesada", defesa: 6, limiteDes: 0, penalidade: "-2", forcaMinima: null, espacos: 5, preco: 150, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário); limite de Destreza de p158 (pág. impressa 152)", verificado: true },
  { id: "loriga-segmentada", nome: "Loriga segmentada", categoria: "pesada", defesa: 7, limiteDes: 0, penalidade: "-3", forcaMinima: null, espacos: 5, preco: 250, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário); limite de Destreza de p158 (pág. impressa 152)", verificado: true },
  { id: "meia-armadura", nome: "Meia armadura", categoria: "pesada", defesa: 8, limiteDes: 0, penalidade: "-4", forcaMinima: null, espacos: 5, preco: 600, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário); limite de Destreza de p158 (pág. impressa 152)", verificado: true },
  { id: "armadura-completa", nome: "Armadura completa", categoria: "pesada", defesa: 10, limiteDes: 0, penalidade: "-5", forcaMinima: null, espacos: 5, preco: 3000, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário); limite de Destreza de p158 (pág. impressa 152)", verificado: true },

  /* Escudos (p159; sem limite de Destreza no livro) */
  { id: "escudo-leve", nome: "Escudo leve", categoria: "escudo", defesa: 1, limiteDes: null, penalidade: "-1", forcaMinima: null, espacos: 1, preco: 5, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário)", verificado: true },
  { id: "escudo-pesado", nome: "Escudo pesado", categoria: "escudo", defesa: 2, limiteDes: null, penalidade: "-2", forcaMinima: null, espacos: 2, preco: 15, fonte: "Tormenta20 Jogo do Ano, p159 (pág. impressa 153) (livro do usuário)", verificado: true }
];

const T20_ITENS = [
  /* Munições (p157, pág. impressa 151) */
  { id: "balas-20", nome: "Balas (20)", categoria: "municao", espacos: 1, preco: 20, fonte: "Tormenta20 Jogo do Ano, p157 (pág. impressa 151) (livro do usuário)", verificado: true },
  { id: "flechas-20", nome: "Flechas (20)", categoria: "municao", espacos: 1, preco: 1, fonte: "Tormenta20 Jogo do Ano, p157 (pág. impressa 151) (livro do usuário)", verificado: true },
  { id: "pedras-20", nome: "Pedras (20)", categoria: "municao", espacos: 1, preco: null, fonte: "Tormenta20 Jogo do Ano, p157 (pág. impressa 151) (livro do usuário); preço T$ 0,5 fracionário, campo fica null", verificado: false },
  { id: "virotes-20", nome: "Virotes (20)", categoria: "municao", espacos: 1, preco: 2, fonte: "Tormenta20 Jogo do Ano, p157 (pág. impressa 151) (livro do usuário)", verificado: true },

  /* Equipamento de aventura (p162, pág. impressa 156) */
  { id: "agua-benta", nome: "Água benta", categoria: "aventura", espacos: null, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "algemas", nome: "Algemas", categoria: "aventura", espacos: 1, preco: 15, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "arpeu", nome: "Arpéu", categoria: "aventura", espacos: 1, preco: 5, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "bandoleira-de-pocoes", nome: "Bandoleira de poções", categoria: "aventura", espacos: 1, preco: 20, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "barraca", nome: "Barraca", categoria: "aventura", espacos: 1, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "corda", nome: "Corda", categoria: "aventura", espacos: 1, preco: 1, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "espelho", nome: "Espelho", categoria: "aventura", espacos: 1, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "lampiao", nome: "Lampião", categoria: "aventura", espacos: 1, preco: 7, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "mochila", nome: "Mochila", categoria: "aventura", espacos: null, preco: 2, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "mochila-de-aventureiro", nome: "Mochila de aventureiro", categoria: "aventura", espacos: null, preco: 50, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "oleo", nome: "Óleo", categoria: "aventura", espacos: null, preco: null, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); preço T$ 0,1 e espaço 0,5 fracionários, campos ficam null", verificado: false },
  { id: "organizador-de-pergaminhos", nome: "Organizador de pergaminhos", categoria: "aventura", espacos: 1, preco: 25, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "pe-de-cabra", nome: "Pé de cabra", categoria: "aventura", espacos: 1, preco: 2, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "saco-de-dormir", nome: "Saco de dormir", categoria: "aventura", espacos: 1, preco: 1, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "simbolo-sagrado", nome: "Símbolo sagrado", categoria: "aventura", espacos: 1, preco: 5, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "tocha", nome: "Tocha", categoria: "aventura", espacos: 1, preco: null, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); preço T$ 0,1 fracionário, campo fica null", verificado: false },
  { id: "vara-de-madeira-3m", nome: "Vara de madeira (3 m)", categoria: "aventura", espacos: 1, preco: null, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); preço T$ 0,2 fracionário, campo fica null", verificado: false },

  /* Ferramentas (p162, pág. impressa 156) */
  { id: "alaude-elfico", nome: "Alaúde élfico", categoria: "ferramenta", espacos: 1, preco: 300, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "colecao-de-livros", nome: "Coleção de livros", categoria: "ferramenta", espacos: 1, preco: 75, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "equipamento-de-viagem", nome: "Equipamento de viagem", categoria: "ferramenta", espacos: 1, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "estojo-de-disfarces", nome: "Estojo de disfarces", categoria: "ferramenta", espacos: 1, preco: 50, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "flauta-mistica", nome: "Flauta mística", categoria: "ferramenta", espacos: 1, preco: 150, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "gazua", nome: "Gazua", categoria: "ferramenta", espacos: 1, preco: 5, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "instrumentos-de-oficio", nome: "Instrumentos de ofício", categoria: "ferramenta", espacos: 1, preco: 30, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); o livro traz uma versão por perícia de Ofício", verificado: true },
  { id: "instrumento-musical", nome: "Instrumento musical", categoria: "ferramenta", espacos: 1, preco: 35, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "luneta", nome: "Luneta", categoria: "ferramenta", espacos: 1, preco: 100, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "maleta-de-medicamentos", nome: "Maleta de medicamentos", categoria: "ferramenta", espacos: 1, preco: 50, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "sela", nome: "Sela", categoria: "ferramenta", espacos: 1, preco: 20, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "tambor-das-profundezas", nome: "Tambor das profundezas", categoria: "ferramenta", espacos: 1, preco: 80, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },

  /* Vestuário (p162, pág. impressa 156) */
  { id: "andrajos-de-aldeao", nome: "Andrajos de aldeão", categoria: "vestuario", espacos: 1, preco: 1, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "bandana", nome: "Bandana", categoria: "vestuario", espacos: 1, preco: 5, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "botas-reforcadas", nome: "Botas reforçadas", categoria: "vestuario", espacos: 1, preco: 20, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "camisa-bufante", nome: "Camisa bufante", categoria: "vestuario", espacos: 1, preco: 25, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "capa-esvoacante", nome: "Capa esvoaçante", categoria: "vestuario", espacos: 1, preco: 25, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "capa-pesada", nome: "Capa pesada", categoria: "vestuario", espacos: 1, preco: 15, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "casaco-longo", nome: "Casaco longo", categoria: "vestuario", espacos: 1, preco: 20, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "chapeu-arcano", nome: "Chapéu arcano", categoria: "vestuario", espacos: 1, preco: 50, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "enfeite-de-elmo", nome: "Enfeite de elmo", categoria: "vestuario", espacos: 1, preco: 15, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "farrapos-de-ermitao", nome: "Farrapos de ermitão", categoria: "vestuario", espacos: 1, preco: 1, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "gorro-de-ervas", nome: "Gorro de ervas", categoria: "vestuario", espacos: 1, preco: 75, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "luva-de-pelica", nome: "Luva de pelica", categoria: "vestuario", espacos: 1, preco: 5, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "manopla", nome: "Manopla", categoria: "vestuario", espacos: 1, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "manto-camuflado", nome: "Manto camuflado", categoria: "vestuario", espacos: 1, preco: 12, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "manto-eclesiastico", nome: "Manto eclesiástico", categoria: "vestuario", espacos: 1, preco: 20, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "robe-mistico", nome: "Robe místico", categoria: "vestuario", espacos: 1, preco: 50, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "sapatos-de-camurca", nome: "Sapatos de camurça", categoria: "vestuario", espacos: 1, preco: 8, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "tabardo", nome: "Tabardo", categoria: "vestuario", espacos: 1, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "traje-da-corte", nome: "Traje da corte", categoria: "vestuario", espacos: 1, preco: 100, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "traje-de-viajante", nome: "Traje de viajante", categoria: "vestuario", espacos: null, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "veste-de-seda", nome: "Veste de seda", categoria: "vestuario", espacos: 1, preco: 25, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },

  /* Esotéricos (p162, pág. impressa 156) */
  { id: "bolsa-de-po", nome: "Bolsa de pó", categoria: "esoterico", espacos: 1, preco: 300, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "cajado-arcano", nome: "Cajado arcano", categoria: "esoterico", espacos: 2, preco: 1000, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "cetro-elemental", nome: "Cetro elemental", categoria: "esoterico", espacos: 1, preco: 750, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "costela-de-lich", nome: "Costela de lich", categoria: "esoterico", espacos: 1, preco: 300, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "dedo-de-ente", nome: "Dedo de ente", categoria: "esoterico", espacos: 1, preco: 200, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "luva-de-ferro", nome: "Luva de ferro", categoria: "esoterico", espacos: 1, preco: 150, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "medalhao-de-prata", nome: "Medalhão de prata", categoria: "esoterico", espacos: 1, preco: 750, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "orbe-cristalino", nome: "Orbe cristalino", categoria: "esoterico", espacos: 1, preco: 750, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "tomo-hermetico", nome: "Tomo hermético", categoria: "esoterico", espacos: 1, preco: 1500, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },
  { id: "varinha-arcana", nome: "Varinha arcana", categoria: "esoterico", espacos: 1, preco: 100, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário)", verificado: true },

  /* Alquímicos preparados (p162, pág. impressa 156): espaço 0,5 em todos */
  { id: "acido", nome: "Ácido", categoria: "alquimico-preparado", espacos: null, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "balsamo-restaurador", nome: "Bálsamo restaurador", categoria: "alquimico-preparado", espacos: null, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "bomba", nome: "Bomba", categoria: "alquimico-preparado", espacos: null, preco: 50, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "cosmetico", nome: "Cosmético", categoria: "alquimico-preparado", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "elixir-do-amor", nome: "Elixir do amor", categoria: "alquimico-preparado", espacos: null, preco: 100, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "essencia-de-mana", nome: "Essência de mana", categoria: "alquimico-preparado", espacos: null, preco: 50, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "fogo-alquimico", nome: "Fogo alquímico", categoria: "alquimico-preparado", espacos: null, preco: 10, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "po-do-desaparecimento", nome: "Pó do desaparecimento", categoria: "alquimico-preparado", espacos: null, preco: 100, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },

  /* Alquímicos catalisadores (p162 e p163, pág. impressa 156-157): espaço 0,5 em todos */
  { id: "baga-de-fogo", nome: "Baga-de-fogo", categoria: "alquimico-catalisador", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "dente-de-dragao", nome: "Dente-de-dragão", categoria: "alquimico-catalisador", espacos: null, preco: 45, fonte: "Tormenta20 Jogo do Ano, p162 (pág. impressa 156) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "essencia-abissal", nome: "Essência abissal", categoria: "alquimico-catalisador", espacos: null, preco: 150, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "liquen-lilas", nome: "Líquen lilás", categoria: "alquimico-catalisador", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "musgo-purpura", nome: "Musgo púrpura", categoria: "alquimico-catalisador", espacos: null, preco: 45, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "ossos-de-monstro", nome: "Ossos de monstro", categoria: "alquimico-catalisador", espacos: null, preco: 45, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "po-de-cristal", nome: "Pó de cristal", categoria: "alquimico-catalisador", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "po-de-giz", nome: "Pó de giz", categoria: "alquimico-catalisador", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "ramo-verdejante", nome: "Ramo verdejante", categoria: "alquimico-catalisador", espacos: null, preco: 45, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "saco-de-sal", nome: "Saco de sal", categoria: "alquimico-catalisador", espacos: null, preco: 45, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "seixo-de-ambar", nome: "Seixo de âmbar", categoria: "alquimico-catalisador", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "terra-de-cemiterio", nome: "Terra de cemitério", categoria: "alquimico-catalisador", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },

  /* Alquímicos venenos (p163, pág. impressa 157): espaço 0,5 em todos */
  { id: "beladona", nome: "Beladona", categoria: "alquimico-veneno", espacos: null, preco: 1500, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "bruma-sonolenta", nome: "Bruma sonolenta", categoria: "alquimico-veneno", espacos: null, preco: 150, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "cicuta", nome: "Cicuta", categoria: "alquimico-veneno", espacos: null, preco: 60, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "essencia-de-sombra", nome: "Essência de sombra", categoria: "alquimico-veneno", espacos: null, preco: 100, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "nevoa-toxica", nome: "Névoa tóxica", categoria: "alquimico-veneno", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "peconha-comum", nome: "Peçonha comum", categoria: "alquimico-veneno", espacos: null, preco: 15, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "peconha-concentrada", nome: "Peçonha concentrada", categoria: "alquimico-veneno", espacos: null, preco: 90, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "peconha-potente", nome: "Peçonha potente", categoria: "alquimico-veneno", espacos: null, preco: 600, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "po-de-lich", nome: "Pó de lich", categoria: "alquimico-veneno", espacos: null, preco: 3000, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "riso-de-nimb", nome: "Riso de Nimb", categoria: "alquimico-veneno", espacos: null, preco: 150, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },

  /* Alimentação (p163, pág. impressa 157): espaço 0,5 em todos */
  { id: "batata-valkariana", nome: "Batata valkariana", categoria: "alimentacao", espacos: null, preco: 2, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "gorad-quente", nome: "Gorad quente", categoria: "alimentacao", espacos: null, preco: 18, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "macarrao-de-yuvalin", nome: "Macarrão de Yuvalin", categoria: "alimentacao", espacos: null, preco: 6, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "prato-do-aventureiro", nome: "Prato do aventureiro", categoria: "alimentacao", espacos: null, preco: 1, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },
  { id: "racao-de-viagem-por-dia", nome: "Ração de viagem (por dia)", categoria: "alimentacao", espacos: null, preco: null, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); preço T$ 0,5 fracionário, campo fica null; espaço 0,5 fracionário", verificado: false },
  { id: "refeicao-comum", nome: "Refeição comum", categoria: "alimentacao", espacos: null, preco: null, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); preço T$ 0,3 fracionário, campo fica null; espaço 0,5 fracionário", verificado: false },
  { id: "sopa-de-peixe", nome: "Sopa de peixe", categoria: "alimentacao", espacos: null, preco: 1, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço 0,5 fracionário, campo fica null", verificado: false },

  /* Animais (p163, pág. impressa 157): espaço "—" em todos */
  { id: "alforje", nome: "Alforje", categoria: "animal", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "cao-de-caca", nome: "Cão de caça", categoria: "animal", espacos: null, preco: 150, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "cavalo", nome: "Cavalo", categoria: "animal", espacos: null, preco: 75, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "cavalo-de-guerra", nome: "Cavalo de guerra", categoria: "animal", espacos: null, preco: 400, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "estabulo-por-dia", nome: "Estábulo (por dia)", categoria: "animal", espacos: null, preco: null, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); preço T$ 0,1 fracionário, campo fica null", verificado: false },
  { id: "ponei", nome: "Pônei", categoria: "animal", espacos: null, preco: 5, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "ponei-de-guerra", nome: "Pônei de guerra", categoria: "animal", espacos: null, preco: 30, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "trobo", nome: "Trobo", categoria: "animal", espacos: null, preco: 60, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },

  /* Veículos (p163, pág. impressa 157) */
  { id: "balao-goblin", nome: "Balão goblin", categoria: "veiculo", espacos: null, preco: 200, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "carroca", nome: "Carroça", categoria: "veiculo", espacos: null, preco: 150, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "carruagem", nome: "Carruagem", categoria: "veiculo", espacos: null, preco: 500, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "canoa", nome: "Canoa", categoria: "veiculo", espacos: null, preco: 70, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },
  { id: "veleiro", nome: "Veleiro", categoria: "veiculo", espacos: null, preco: 10000, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); espaço \"—\" gravado como null", verificado: true },

  /* Serviços (p163, pág. impressa 157) */
  { id: "estadia-comum-por-noite", nome: "Estadia comum (por noite)", categoria: "servico", espacos: null, preco: null, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); preço T$ 0,5 fracionário, campo fica null", verificado: false },
  { id: "estadia-confortavel-por-noite", nome: "Estadia confortável (por noite)", categoria: "servico", espacos: null, preco: 4, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário)", verificado: true },
  { id: "estadia-luxuosa-por-noite", nome: "Estadia luxuosa (por noite)", categoria: "servico", espacos: null, preco: 20, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário)", verificado: true },
  { id: "conducao-terrestre-por-km", nome: "Condução terrestre (por km)", categoria: "servico", espacos: null, preco: null, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); preço T$ 0,5 por km, unidade não fixa, campo fica null", verificado: false },
  { id: "conducao-maritima-por-km", nome: "Condução marítima (por km)", categoria: "servico", espacos: null, preco: null, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); preço T$ 0,1 por km, unidade não fixa, campo fica null", verificado: false },
  { id: "conducao-aerea-por-km", nome: "Condução aérea (por km)", categoria: "servico", espacos: null, preco: null, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); preço T$ 10 por km, unidade não fixa, campo fica null", verificado: false },
  { id: "curandeiro", nome: "Curandeiro", categoria: "servico", espacos: null, preco: 5, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário)", verificado: true },
  { id: "magia-1-circulo", nome: "Magia de 1º círculo", categoria: "servico", espacos: null, preco: 10, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário)", verificado: true },
  { id: "magia-2-circulo", nome: "Magia de 2º círculo", categoria: "servico", espacos: null, preco: 90, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário)", verificado: true },
  { id: "magia-3-circulo", nome: "Magia de 3º círculo", categoria: "servico", espacos: null, preco: 360, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário)", verificado: true },
  { id: "mensageiro-por-km", nome: "Mensageiro (por km)", categoria: "servico", espacos: null, preco: null, fonte: "Tormenta20 Jogo do Ano, p163 (pág. impressa 157) (livro do usuário); preço T$ 0,5 por km, unidade não fixa, campo fica null", verificado: false }
];

const T20_EQUIPAMENTO_STATUS = {
  verificado: false,
  armas: "NÃO VERIFICADO em 5 de 39 armas: bordão, alabarda, espada bastarda, katana e corrente de espinhos (dano ou tipo com mais de um valor; o campo guarda só um). Rede (sem dano) fora do formato.",
  armaduras: "NÃO VERIFICADO: força mínima (livro não traz valor) e categoria média (livro não tem). Demais valores das 12 armaduras e escudos conferidos na tabela 3-5.",
  itens: "NÃO VERIFICADO em 48 de 125 itens: valores fracionários (T$ 0,1 a T$ 0,5 e espaço 0,5) não cabem no campo inteiro; preços por km, dia ou noite com unidade ficam null. Dinheiro inicial (T$) não conferido. Melhorias (tabelas 3-7 e 3-8) fora de escopo.",
  fonte: "Tormenta20 Jogo do Ano, livro do usuário: p150-p151 (armas), p157 (munições), p159 (armaduras e escudos), p162-p163 (itens). Página impressa = pNNN - 6."
};
