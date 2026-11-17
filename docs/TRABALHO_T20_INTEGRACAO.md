# Tormenta20: integração dos dados à ficha (2026-11-17)

Frente de integração. Os dados de `rules-niveis.js`, `rules-poderes.js`, `rules-magias.js` e `rules-racas.js` entraram na ficha. `rules-equipamento.js` segue vazio: não há tabela de armas ou armaduras de Tormenta20.

## O que foi ligado

- **Níveis 1 a 20.** Até o 5º valem as tabelas de `rules.js`. Do 6º em diante, PV, PM, bônus de treino, círculo e habilidades vêm de `T20_NIVEIS`. Um quadro mostra o 6º ao nível do personagem, com as habilidades.
- **Digitação à mão.** PV, PM e treino têm campos "manual" (`pvManual`, `pmManual`, `treinoManual`). Em branco, o valor é calculado. Onde o dado é null, a ficha mostra "não verificado" e pede o valor. Não há valor inventado.
- **Selos.** "2 fontes" só quando o dado está marcado como verificado. Nos demais, "não verificado".
- **Poderes.** A etapa usa `T20_PODERES`: escolhe-se o poder da classe, os gerais e os concedidos disponíveis no nível. Pré-requisitos de atributo, perícia, outro poder e nível são checados: erro no modo estrito, aviso no livre. Pré-requisito em texto vira aviso. "Outro poder (digitar)" cobre o que não está no catálogo.
- **Magias.** A etapa escolhe o círculo e depois a magia, a partir de `T20_MAGIAS` e `T20_MAGIAS_PENDENTES`. As de 2º a 5º aparecem como "pendentes" (só o nome conferido). Magia do catálogo com círculo errado é erro no estrito.
- **Raças.** As 17 raças de `T20_RACAS_COMPLETAS` são a única tabela; `rules.js` perdeu o `T20_RACAS` antigo. O app aplica só o que a fonte informou: ajuste, tamanho e deslocamento vazios ficam "não verificado". Perícia extra do Humano (Versátil, 2) vem do campo `periciasExtras`.
- **Backup esquema 2.** O esquema 2 inclui os campos novos. O esquema 1 continua sendo importado: poderes e magias digitados viram "livres", e os campos novos ficam em branco.
- **PDF.** Mostra a progressão do 6º nível em diante, as habilidades, o tipo e a fonte dos poderes, as magias pendentes marcadas, a raça com o que não foi verificado e o aviso de guias de fãs.
- **Validação.** Etapa 11 pede PV, PM ou treino quando não há valor. PV à mão zero ou negativo é recusado no estrito.

## Decisões sobre fontes em conflito

- **Círculo de Arcanista e Clérigo acima do 5º: sem valor.** A nota de `rules-niveis.js` diz que as fontes conflitam. A linha de 14 a 20 dava 3º círculo, e o modo estrito bloquearia uma magia de 4º círculo. Troquei `circulos` para `null` nessas duas classes. Druida (uma fonte) continua com o valor e o selo; Bardo (duas fontes) fica verificado.
- **Anão: deslocamento 6 m.** Vem da fonte [X], e o 9 m antigo de `rules.js` não tinha fonte. O conflito segue marcado nas observações.
- **Humano, Minotauro e Sereia/Tritão: deslocamento não informado.** Antes o app assumia 9 m sem fonte. Agora aparece "não verificado".
- **Minotauro: ajuste aplicado** (FOR +2, CON +1, SAB -1), com selo de uma fonte.

## O que ficou de fora

- **Equipamento:** armas, armaduras e itens seguem sem tabela. A ficha mostra o aviso de "não verificado".
- **Aumentos de atributo ao longo dos níveis:** o dado não traz, e a ficha não os aplica.
- **Catálogo de poderes parcial:** faltam os poderes de nível 1 a 5 da maioria das classes, e só há 3 gerais e 2 concedidos. O campo "Outro poder" cobre o restante. Pré-requisitos em texto não são checados.
- **Magias de 2º a 5º círculo:** sem execução, alcance e duração.
- **Magias conhecidas além do 1º nível:** "NÃO VERIFICADO" (progressão não acessível).
- **Habilidades de classe dos níveis 2 a 5:** não cadastradas.
- **Quantidade de poderes por nível e dinheiro inicial:** continuam "NÃO VERIFICADO".
- **Foundry real:** não testado (igual antes).

## Testes

- `node tormenta20/tests/run_all.js`: 9 arquivos. `test_09_integracao.js` é novo e cobre níveis 6 a 20 (casos conferidos à mão só com dados de duas fontes: Ladino PV 89 e PM 80 no 20º, Ladino PM 40 e PV 39 no 10º, Bardo PM 80 e círculo 4º no 20º), digitação à mão, pré-requisitos, magias por círculo, raças, backup nos dois esquemas, PDF de nível alto e a geração de HTML de todas as etapas.
- `node tormenta20/tests/e2e_chrome.js`: Chrome headless em 1100 px e 360 px, sem erro de console, sem rolagem lateral, PDF de 2 páginas. Inclui uma ficha de Ladino nível 20 importada de um backup esquema 2.
- Ao `tormenta20/estilo.css` foi acrescentado `overflow-x:auto` em `.table-wrap`: a tabela de níveis rola dentro da própria caixa em 360 px, sem rolagem lateral da página.
