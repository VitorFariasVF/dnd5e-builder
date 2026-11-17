/* tormenta20/rules-equipamento.js: dados adicionais, carregado depois de rules.js. Preenchido pela frente de trabalho correspondente.

   FORMATO (só dados; a interface não usa este arquivo ainda):
   T20_ARMAS: { id, nome, categoria ("simples" | "marcial" | "exotica" | "fogo"), dano ("1d8"), tipoDano ("corte" | "perfuracao" | "esmagamento"),
                critico ("19-20/x2" ou equivalente), alcance (texto ou null), proficiencia (texto), espacos (inteiro), preco (T$, inteiro), fonte, verificado }
   T20_ARMADURAS: { id, nome, categoria ("leve" | "media" | "pesada" | "escudo"), defesa (inteiro, bônus), limiteDes (inteiro ou null),
                    penalidade (texto ou null), forcaMinima (inteiro ou null), espacos (inteiro), preco (T$, inteiro), fonte, verificado }
   T20_ITENS: { id, nome, categoria, espacos (inteiro ou null), preco (T$, inteiro ou null), fonte, verificado }
   T20_EQUIPAMENTO_STATUS: situação da frente com a lista de lacunas.

   Estado desta entrega: listas VAZIAS. Motivo: nenhuma tabela de armas, armaduras ou itens de Tormenta20 (com T$, espaços e
   defesa) foi acessível nesta sessão. A wiki runarcana (wiki.runarcana.org, páginas Armas e Armaduras e Escudos) foi aberta,
   mas NÃO foi usada: traz preços em GP/PO, CA e categorias no formato de D&D 5e e nomes de outro universo, então não é fonte de T20.
   Nenhum valor foi preenchido de memória. A defesa de armadura e escudo segue como NÃO VERIFICADO em rules.js (T20_DEFESA_FONTE). */

const T20_ARMAS = [];

const T20_ARMADURAS = [];

const T20_ITENS = [];

const T20_EQUIPAMENTO_STATUS = {
  verificado: false,
  armas: "NÃO VERIFICADO: sem tabela de T20 acessível",
  armaduras: "NÃO VERIFICADO: sem tabela de T20 acessível; penalidade de armadura e bônus de Defesa por armadura e escudo não conferidos",
  itens: "NÃO VERIFICADO: sem tabela de T20 acessível; dinheiro inicial (T$) também não conferido",
  fonte: "NÃO VERIFICADO: nenhuma fonte de Tormenta20 acessível nesta sessão. Ver docs/TRABALHO_T20_MAGIAS_RACAS_EQUIP.md"
};
