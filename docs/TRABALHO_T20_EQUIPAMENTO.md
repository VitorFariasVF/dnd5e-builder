# Tormenta20: equipamento (armas, armaduras, itens)

Fonte: livro básico do usuário, `T20_-_Livro_Básico_-_Jogo_do_Ano.pdf`. Página citada como pNNN (página do PDF); página impressa = pNNN - 6. Cada tabela foi conferida na imagem da página, não só no texto extraído.

## Entregue

| Lista | Entradas | Páginas | Não verificadas |
|---|---|---|---|
| T20_ARMAS | 39 (13 simples, 18 marciais, 6 exóticas, 2 de fogo) | p150, p151 | 5 |
| T20_ARMADURAS | 12 (5 leves, 5 pesadas, 2 escudos) | p159 (limite de Destreza em p158) | 0 |
| T20_ITENS | 125 (munições 4, aventura 17, ferramentas 12, vestuário 21, esotéricos 10, alquímicos 30, alimentação 7, animais 8, veículos 5, serviços 11) | p157, p162, p163 | 48 |

Teste novo: `tormenta20/tests/test_10_equipamento.js` (23 checagens). O `run_all.js` descobre os testes sozinho, então não precisou de linha nova. `test_08` continua passando sem alteração.

## Convenções

- "Impacto" do livro vira `esmagamento`, o valor do formato.
- Crítico "19" vira `19-20/x2`; "18" vira `18-20/x2`; "x3" vira `20/x3`; "19/x3" (armas de fogo) vira `19-20/x3`.
- Preço "—" de arma (clava, bordão, tacape, funda) vira 0. O bordão tem o preço zero confirmado no texto da p153.
- Espaço ou preço "—" de item vira null.
- Valores fracionários (T$ 0,1 a T$ 0,5; espaço 0,5) não cabem no campo inteiro do formato. Ficam null e o item fica `verificado: false`. São 48 itens: quase todos os alquímicos, a alimentação e alguns serviços e itens de aventura.
- Armas com dois valores de dano (bordão, espada bastarda, katana, corrente de espinhos) guardam o primeiro e ficam `verificado: false`. A alabarda (corte ou perfuração) guarda "corte" e fica `verificado: false`.
- Pedras (20) custa T$ 0,5 e fica com preço null.
- Armaduras pesadas têm limite de Destreza 0 (texto da p158). Leves e escudos ficam null.
- O livro não tem categoria "média" de armadura. A categoria fica sem entradas.

## Lacunas e decisões em aberto

- **Rede** (arma exótica, p151) não entrou em T20_ARMAS: não tem dano, e o formato exige dano NdN.
- **Espaço e preço fracionários**: o formato aceita só inteiro ou null. Se o campo passar a aceitar decimais, os 48 itens podem ser preenchidos sem nova leitura do livro.
- **Força mínima** das armaduras: o livro não traz valor. Fica null.
- **Melhorias** (tabelas 3-7 e 3-8, p170-p171) estão fora deste trabalho.
- **Dinheiro inicial** (T$) não foi conferido aqui.
- **rules.js**: `T20_DEFESA_FONTE` ainda diz que o bônus de Defesa de armadura e escudo não foi verificado. Os valores agora conferidos estão em `rules-equipamento.js` (p159). Atualizar esse texto é trabalho de outro arquivo.

## Como reproduzir

```
node tormenta20/tests/test_10_equipamento.js
node tormenta20/tests/run_all.js
```
