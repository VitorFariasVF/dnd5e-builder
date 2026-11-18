# Tormenta20: magias de 3º, 4º e 5º círculo

Fonte: livro do usuário (Tormenta20 Jogo do Ano), descrições em p184 a p217 e Tabela 4-1 (custo por círculo) em p176.

## Arquivos

- `tormenta20/rules-magias-3-5.js` (novo): 96 magias, `T20_MAGIAS.push(...)`.
- `tormenta20/tests/test_12_magias_3_5.js` (novo): 19 checagens (carga via vm com `window`, campos, ids, custo, contagens, pendentes).
- Não alterados: `rules-magias.js`, `index.html`, `_ambiente.js`.

## Contagens

| Círculo | Arcanas | Divinas | Universais | Total |
|---|---|---|---|---|
| 3º | 17 | 16 | 7 | 40 |
| 4º | 16 | 10 | 4 | 30 |
| 5º | 14 | 6 | 6 | 26 |

Com as 7 magias de 1º círculo de `rules-magias.js`, o catálogo passa a ter 103 entradas, com ids únicos.

## Decisões

- Custo base em PM: 3º = 6, 4º = 10, 5º = 15, pela Tabela 4-1 (p176).
- `tipo: "universal"` para as magias que o livro marca como Universal. O formato de `rules-magias.js` só prevê arcana e divina: a integração precisa decidir como tratar isso.
- `verificado: true` significa aqui que os campos de mecânica vieram legíveis deste livro. O cabeçalho de `rules-magias.js` diz "true só com duas fontes". As duas regras precisam ser unificadas.
- `verificado: false` em 5 magias: Controlar Água, Lendas e Histórias, Libertação, Muralha Elemental e Relâmpago Flamejante de Reynard. Motivo: aprimoramentos ambíguos ou com a coluna do livro mesclada.
- Ids: slug do nome. As 8 magias pendentes de 3º a 5º círculo em `rules-magias.js` (banimento, voo, videncia, campo-antimagia, terremoto, desejo, semiplano, toque-da-morte) usam os mesmos nomes e círculos.

## Lacunas e atenção

- Sopro de Dragão (pendente de 4º círculo em `rules-magias.js`) não aparece no texto do livro: busca no texto inteiro sem resultado. Fica sem entrada.
- `index.html` precisa carregar `tormenta20/rules-magias-3-5.js` depois de `rules-magias.js` (hoje a linha 47). Se for carregado antes, `T20_MAGIAS.push` cai no array errado.
- `tormenta20/tests/_ambiente.js` não inclui o novo arquivo em `SCRIPTS`. O teste novo carrega os arquivos por conta própria.
- Universais e aprimoramentos ambíguos: Lendas e Histórias (dois aprimoramentos de +5 PM não atribuídos com segurança, omitidos) e Libertação (sem o texto de Lendas misturado).
- Relâmpago Flamejante de Reynard: a coluna do livro mistura um trecho "Debilidade" (não atribuído a esta magia; omitido).
- Controlar Água: "+2 PM, +2d8 de dano" não deixa claro a qual efeito se aplica.

## Leitura do livro

- Vários blocos atravessam o fim de página. Os aprimoramentos da página seguinte foram conferidos um a um (Buraco Negro, Ligação Sombria, Muralha de Ossos, Mão Poderosa, Forma Etérea, Deflagração de Mana, Relâmpago, Controlar Água, Dificultar Detecção, Invulnerabilidade, Viagem Arbórea).
- Números de 3 dígitos (150 PV e dano de essência em Deflagração, 200 em Segunda Chance e Terremoto, T$ 100/500/1.000 em Servo Divino e Servo Morto-Vivo) foram recuperados do texto bruto.
- O aprimoramento "globo mostra uma cena" fica em Globo da Verdade (Divina 2), fora do escopo.

## Testes

- `node tormenta20/tests/test_12_magias_3_5.js`: 19/19.
- `node tormenta20/tests/run_all.js`: 8 arquivos com falha (test_01, 02, 04, 05, 06, 07, 08, 09). Nenhuma falha é de magia de 3º a 5º círculo; são de raças, perícias, níveis e progressão, em arquivos que outras frentes estão alterando (há muitos arquivos modificados no `git status`).
