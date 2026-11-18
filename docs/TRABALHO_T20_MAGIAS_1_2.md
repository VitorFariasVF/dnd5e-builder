# Tormenta20: magias de 1º e 2º círculo (livro do usuário)

Data: 2026-11-17. Fonte: Tormenta20 Jogo do Ano (livro do usuário), índices p180 a p183 e descrições p184 a p217 (texto extraído em /tmp/t20).

## Arquivos

- `tormenta20/rules-magias-1-2.js` (novo): 102 magias, `window.T20_MAGIAS = window.T20_MAGIAS || []` e `T20_MAGIAS.push(...)`. Não está ligado ao `index.html`.
- `tormenta20/tests/test_11_magias_1_2.js` (novo): carrega rules.js, rules-magias.js e o arquivo novo por vm, nesta ordem, e valida campos, ids, custos, tipos, páginas e contagens. 21/21 ok.
- `docs/TRABALHO_T20_MAGIAS_1_2.md`: este documento.

Não foram alterados `rules-magias.js` nem o `index.html`.

## Contagens

| Círculo | Arcana | Divina | Universal | Total |
|---|---|---|---|---|
| 1º | 24 | 22 | 8 | 54 |
| 2º | 24 | 20 | 4 | 48 |
| Total | 48 | 42 | 12 | 102 |

Conferido contra os índices p180 a p183: cada magia aparece uma vez no arquivo, inclusive as que estão nas duas colunas (arcana e divina) do índice.

## Decisões

- **Tipo universal.** O livro marca 12 magias como "Universal" (ex.: Aviso, Luz, Névoa, Conjurar Mortos-Vivos). O schema de `rules-magias.js` só prevê arcana ou divina. Usei `tipo: "universal"` para não inventar uma escolha. Precisa de decisão sua: ou o schema ganha o valor, ou essas magias são divididas.
- **Custo base em PM (`custoPM`).** Pela Tabela 4-1 (p176): 1º círculo = 1 PM; 2º círculo = 3 PM. Os aprimoramentos ficam em `aprimoramentos`, com `custoPM` e `resumo`.
- **Efeito e resumos** são frases próprias, sem cópia do livro.
- **Redefinição por id.** Seis ids já existiam em `rules-magias.js` (alarme, armadura-arcana, bencao, comando, curar-ferimentos, escudo-da-fe). Ao final do arquivo, uma deduplicação mantém a última ocorrência (a do livro). Nada é removido de `rules-magias.js`.
- **Pendentes.** Bola de Fogo, Invisibilidade e Relâmpago estavam em `T20_MAGIAS_PENDENTES`. Agora têm entrada completa (ids bola-de-fogo, invisibilidade, relampago). A lista de pendentes continua no `rules-magias.js` e deve ser esvaziada quando o arquivo novo for ligado.
- **bofetada-de-nimb** (rules-magias.js) não aparece nas listas nem nas descrições do livro. Não foi redefinida e continua como está.
- **verificado: true** só quando execução, alcance, alvo e duração saíram legíveis do livro. Duas magias ficam `false`: Oração e Sono.

## Dúvidas de leitura

1. **Oração (p207).** O texto extraído não traz o corpo da magia (efeito base e alvos). O efeito veio do índice (p182): "Aliados recebem bônus e inimigos sofrem penalidades em testes e rolagens". Só os aprimoramentos vêm da descrição. Verificado: false.
2. **Sono (p213).** O cabeçalho não traz execução, alcance, alvo, duração nem resistência. Logo depois de Soco de Arsenal há um bloco de atributos (execução padrão, alcance curto, 1 humanoide, cena, Vontade parcial, "+1d6" e essência) sem nome. Pode ser de Sono ou de outra magia. Não atribuí; os campos de Sono ficaram `null`, verificado: false.
3. **Aprimoramento "+2 PM: remove todas as condições" (Purificação).** No texto aparece depois do Raio do Enfraquecimento. Atribuí à Purificação pela lógica (ela remove "uma condição"). Confirmar.
4. **Aprimoramento "+2 PM: falha deixa exausto; passa fatigado" (Raio do Enfraquecimento).** Também aparece deslocado, depois do Raio. Atribuí ao Raio. Confirmar.
5. **Tranca Arcana.** O último aprimoramento (+1 PM, alcance curto) quebra entre p215 e p216. A fonte cita as duas páginas.
6. **Nomes quebrados em duas linhas** (Armamento da Natureza, Conjurar Monstro, Conjurar Mortos-Vivos, Marca da Obediência, Névoa, Toque Chocante, Transmutar Objetos). As páginas foram conferidas à mão.
7. **Luz.** Três aprimoramentos são "+0 PM" ou valem só para arcanos ou só para divinos. Registrei assim, como no livro.

## Para ligar ao sistema (não feito)

- Adicionar `<script src="rules-magias-1-2.js"></script>` logo depois de `rules-magias.js` em `index.html`, e o nome do arquivo em `SCRIPTS` de `tests/_ambiente.js`.
- `tests/test_08_magias_racas_equip.js` vai falhar quando o arquivo entrar em `SCRIPTS`: ele afirma que "catálogo completo cobre só o 1º círculo" e que nenhuma magia está verificada. Esses dois testes precisam ser atualizados nessa hora.
- Esvaziar `T20_MAGIAS_PENDENTES` das três magias de 2º círculo que agora têm entrada.
- Decidir o tipo "universal" (ver acima) antes de usar a lista no seletor de magias.

## Testes

- `node --check tormenta20/rules-magias-1-2.js`: ok.
- `node tormenta20/tests/test_11_magias_1_2.js`: 21/21 ok.
- `node tormenta20/tests/run_all.js`: 5 arquivos falham (test_01, test_02, test_06, test_08, test_09). São falhas de cálculo, validação e raças, em arquivos que não carregam o arquivo novo. Não foram causadas por esta frente.
