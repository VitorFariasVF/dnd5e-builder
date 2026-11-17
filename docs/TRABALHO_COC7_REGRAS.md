# Trabalho COC7: decisão de método e fechamento de regras (2026-11-17)

Registro de decisão e de fechamento de itens. A conferência original está em `VERIFICACAO_COC7.md`; esta página registra o que mudou depois dela.

## 1. Decisão de método

O app segue a **regra completa** (Keeper Rulebook) como processo principal:

- interesse pessoal = INT × 2;
- fórmulas de pontos de ocupação;
- ajustes de idade e testes de melhoria de EDU;
- movimento condicional (7, 8 ou 9 conforme FOR e DES em relação a TAM).

O **Quick-Start** oficial só entra como fonte onde coincide com a regra completa (características, distribuição 40 a 80, dano FOR+TAM até 204, perícias de base e MOV 8 no caso geral). A decisão aparece na tela de modo (`coc7/ui.js`, etapa 1) e no PDF.

Os modos estrito e livre continuam com a mesma regra. O modo só decide se o erro bloqueia o avanço ou vira aviso.

## 2. Teto de 90% por perícia

Não há fonte que confirme o teto. Por isso ele virou **aviso** (não bloqueia, em nenhum modo), com o texto "regra não confirmada". Vale para perícias de ocupação e de interesse pessoal.

## 3. Itens fechados (duas fontes ou mais)

| Item | Resultado | Fontes |
|---|---|---|
| Idade 15 a 19: EDU −5 | Confirmado | WorldAnvil (Cascadia, com a regra citada); The Role Players Guild |
| Idade 15 a 19: 5 pontos divididos entre FOR e TAM | Aplicado como divisão, escolhida pelo jogador (0 a 5 para FOR) | WorldAnvil; The Role Players Guild (lista FOR, TAM e EDU). Conflito: Renegade dá −5 em cada |
| Testes de EDU de 40 em diante: 1 por faixa aos 40, 50 e 60; nenhum aos 70 e 80 | Corrigido (antes havia 1 aos 70 e aos 80) | trpgline (Keeper Rulebook, p. 98); WorldAnvil. Conflito: Renegade dá 1 por década |
| FOR, CON e DES, totais por faixa: 5, 10, 20, 40, 80 | Confirmado (valor por faixa 5, 5, 10, 20, 40) | trpgline; WorldAnvil. Conflito: Renegade dá 5, 10, 15, 20, 25 |
| APA, totais por faixa: 5, 10, 15, 20, 25 | Confirmado | trpgline; WorldAnvil; Renegade |
| MOV −1 por faixa a partir de 40 (acumulado) | Confirmado | trpgline; Renegade |
| Mecânica do teste de EDU (d100 acima da EDU soma 1d10) | Confirmado | trpgline (chama de "improvement check"); Renegade; mecanismo de perícia no Chaosium |
| MOV condicional: 7 se FOR e DES ambas menores que TAM; 9 se ambas maiores; 8 nos demais | Aplicado (regra completa) | Roll20 Step Two, tabela de movimento; Renegade (7 e 9). O 8 também é o valor do Quick-Start. Conflito: Renegade dá 6 no caso do meio |
| Arte e Ofício 5; Arqueologia 1 | Confirmado | Roll20 Step Five; WorldAnvil (Cascadia) |
| Psicanálise 1; Idioma (outro) 1 | Confirmado | Roll20 Step Five; Quick-Start japonês (K1, conferido na VERIFICACAO) |
| Armas básicas da ficha (soco-inglês, facas, revólver e automática .32, espingarda calibre 12) | Incluídas na ficha de combate | Chaosium Wiki (Equipment); Roll20 Compendium (Ammunition & Weapons) |

## 4. Itens que continuam NÃO VERIFICADO

- **+5 pontos entre FOR e TAM aos 20 anos:** só trpgline. WorldAnvil não lista nenhum ajuste nessa faixa. Não aplicado.
- **Sanidade máxima = 99 − Mitos:** só posts de fórum (um cita a p. 155 do livro, edição não identificada; outros dois concordam). Nenhum guia ou wiki confirmou. Mantido.
- **Dano e Corpo acima de FOR+TAM 204:** nenhuma tabela estendida encontrada (Chaosium Wiki e Roll20 param em 204). Mantido sem valor.
- **Ordem do MOV (antes ou depois dos ajustes de idade):** não verificada. O app usa os valores depois dos ajustes.
- **Ocupações, exceto Jornalista:** fórmula, crédito e perícias de 1 fonte. Sem alteração.
- **Teto de 90% por perícia:** não confirmado. Aviso.

## 5. Simplificações do app (não são regra)

- Aos 40 anos em diante, a redução de FOR, CON ou DES vai para um só alvo por faixa. O livro pode permitir dividir; não foi confirmado.

## 6. Itens que não entraram

- Rifle .22 (Chaosium Wiki) e rifle .30 (Roll20): armas diferentes, cada uma em uma fonte só. Ficaram fora. O soco-inglês aparece nas duas fontes e entrou.
- Espingarda calibre 12: as fontes divergem no número de tiros. Tiros aparecem como "—".
