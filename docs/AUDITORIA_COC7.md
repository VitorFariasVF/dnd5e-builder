# Auditoria: Call of Cthulhu 7ª edição (coc7/)

Sistema: criação de investigador (`coc7/`, `data-tool="coc7-builder"`). Escopo: modo estrito e livre, identidade e época, características, idade, ocupação, perícias de ocupação, interesse pessoal, antecedentes, equipamento, derivados, resumo, backup JSON e dossiê em PDF.

Este documento lista o que foi confirmado, contra qual fonte, o que ficou **NÃO VERIFICADO** e o que não foi testado. Mecânica e nomes estão reescritos em palavras próprias. Nenhum texto do livro, tabela copiada ou arte foi usado.

## 1. Fontes consultadas

| Fonte | Tipo | O que trouxe | Uso |
|---|---|---|---|
| [Chaosium, Investigadores (wiki oficial)](https://callofcthulhuwiki.chaosium.com/investigators/step-one-investigator-characteristics.html) | Oficial, gratuita | Processo **simplificado** do Quick-Start: distribuição 40/50/50/50/60/60/70/80, PV, Sanidade, PM, Sorte, MOV 8, Dano e Corpo até 204, Esquiva, Idioma próprio, Mitos | Fonte principal |
| [Chaosium, AutoCalc (instruções)](https://chaosium.com/autocalc-character-sheet-instructions) | Oficial, gratuita | Idade entre 15 e 90; cálculo automático a partir de CON/TAM, POD, DES/FOR | Confirmação |
| [Roll20 Compendium, Step Two](https://roll20.net/compendium/coc/Step%20Two%20(Generate%20Characteristics)) | Comunidade, texto de regras | Dados das características (3d6 e 2d6+6, ×5) | Confirmação; trechos de Pulp e MOV condicional **descartados** (ver §4) |
| [Roll20 Compendium, Step Four](https://roll20.net/compendium/coc/Rules:Step%20Four%20%28Determine%20Occupation%29) | Comunidade, texto de regras | Dez ocupações: fórmula de pontos, faixa de crédito, perícias de ocupação e escolhas | Fonte única das ocupações |
| [Roll20 Compendium, Part Two](https://roll20.net/compendium/coc/Rules:Part%20Two%20Secondary%20Attributes) | Comunidade | Tabela de Dano e Corpo (até 204) | Confirmação |
| [Questportal, criação de investigadores](https://www.questportal.com/blog/creating-call-of-cthulhu-characters) | Blog | Dados das características | Confirmação |
| [Chaosium, PDF Quick-Start (link oficial)](https://www.chaosium.com/call-of-cthulhu-7th-edition-quick-start-rules/) | Oficial | **Não acessível nesta sessão** (fora da lista permitida) | Não consultado |
| [Foundry VTT, pacote CoC7](https://foundryvtt.com/packages/CoC7) | Comunidade (não oficial) | Pacote existe, autor snap01, código no GitHub da Miskatonic-Investigative-Society | Só para a pesquisa de VTT |

Fontes **descartadas**: cópias não autorizadas do livro encontradas na busca (sites de download de PDF, Scribd, Internet Archive, dokumen.pub e similares). Não foram abertas nem usadas. O glossário da umich traz a tabela de Dano de 6ª edição (2–12 = -1d6) e foi descartado por ser de outra edição.

## 2. Confirmado

| Regra | Implementação | Fontes | Status |
|---|---|---|---|
| Características 3d6×5 (FOR, CON, DES, APA, POD) e (2d6+6)×5 (TAM, INT, EDU) | `rules.js`, `rolarCaracteristica` | Roll20 Step Two, Questportal | Confirmado em 2 fontes |
| Distribuição 40, 50, 50, 50, 60, 60, 70, 80 | método "distribuir" | Chaosium (Quick-Start, passo 1) | Confirmado (1 fonte oficial). É o processo simplificado, não o de pontos do livro |
| Idade entre 15 e 90 | validação da etapa 3 | Chaosium AutoCalc, Roll20 | Confirmado em 2 fontes |
| PV = (CON + TAM) ÷ 10, arredondado para baixo | `calcDerivados` | Chaosium (passo 2) | Confirmado em 1 fonte oficial |
| Sanidade inicial = POD | `calcDerivados` | Chaosium (passo 2), AutoCalc | Confirmado em 2 fontes |
| PM = POD ÷ 5 | `calcDerivados` | Chaosium (passo 2), AutoCalc | Confirmado em 2 fontes |
| Esquiva = DES ÷ 2 (arredondado para baixo) | base da perícia `esquivar` | Chaosium (passo 3) | Confirmado em 1 fonte oficial |
| Idioma próprio = EDU | base da perícia `idioma_proprio` | Chaosium (passo 3) | Confirmado em 1 fonte oficial |
| Mitos de Cthulhu sem pontos na criação, Sanidade máxima 99 − Mitos | validação e `calcDerivados` | Chaosium (passo 3) | Confirmado em 1 fonte oficial |
| Metade e quinto arredondados para baixo | `calcPericias` | Chaosium (metade e quinto) | Confirmado em 1 fonte oficial |
| Dano e Corpo pela soma FOR + TAM: 2–64, 65–84, 85–124, 125–164, 165–204 | `COC_DANO` | Chaosium (passo 2), Roll20 Part Two | Confirmado em 2 fontes |
| Ocupações: fórmula, faixa de crédito e perícias (10 ocupações) | `COC_OCUPACOES` | Roll20 Step Four | Confirmado em 1 fonte pública (ver §3, item 4) |

Testes de derivados foram conferidos à mão com três investigadores (`test_derivados.js`, casos A, B e C), incluindo arredondamentos e as faixas de Dano e Corpo nas bordas.

## 3. NÃO VERIFICADO

Estes itens estão no código com a marca `NÃO VERIFICADO` ou com aviso na tela. Conferir no Keeper Rulebook antes de usar em mesa.

1. **Faixas de idade e reduções** (`COC_FAIXAS_IDADE`). Nenhuma fonte acessível trouxe a tabela. Os valores usados seguem a estrutura que se conhece da 7ª edição: 15–19 (EDU −5, FOR ou TAM −5 à escolha, sorte pela maior de duas rolagens, MOV −1), 20–39 (1 teste de EDU), 40 e acima (APA −5 e FOR, CON ou DES −5 por faixa, MOV −1, 1 teste de EDU por faixa). **Os números são de memória e não foram confirmados.** Os testes de idade provam que o motor aplica a tabela, não que a tabela é a do livro.
2. **Teste de melhoria de EDU** (d100 acima da EDU soma 1d10). Não confirmado.
3. **Pontos de interesse pessoal = INT × 2.** A fonte consultada (Roll20) não traz a fórmula. O processo simplificado da Chaosium usa outro método (quatro perícias +20%). Não confirmado.
4. **Fórmulas de pontos de ocupação e faixas de crédito.** Vêm de uma só fonte (Roll20). Batem com a memória da 7ª edição, mas não foram confirmadas pela Chaosium. Quem usa a Chaosium como referência pode encontrar método diferente.
5. **Bases de perícia**, exceto Esquiva, Idioma próprio, Mitos e Crédito. Os valores (ex.: Procurar 25, Primeiros Socorros 30, Briga 25, Escutar 20) são de memória. **Nenhuma fonte acessível trouxe a tabela de bases.**
6. **Teto de 90% por perícia na criação.** Não confirmado. O app avisa acima disso.
7. **Crédito com base 0** e **pontos de ocupação calculados com as características já ajustadas pela idade.** Hipóteses. Não confirmadas.
8. **Dano e Corpo acima de FOR + TAM 204.** Nenhuma fonte acessível traz essas faixas. O app não calcula e mostra "não calc.".
9. **Movimento:** o app usa 8 como base, com o ajuste de idade do item 1. A Chaosium diz que todo humano tem MOV 8. O Roll20 traz MOV condicional (7, 8 ou 9 conforme FOR e DES em relação ao TAM). **Fontes conflitantes**, então a regra condicional não foi aplicada.
10. **Formato do ator no Foundry VTT.** O repositório do pacote não estava acessível, então não foi verificado o caminho dos dados (ex.: `system.characteristics`) nem o id do sistema.

## 4. Conflitos entre fontes (resolvidos)

| Ponto | Fonte A | Fonte B | Decisão |
|---|---|---|---|
| Sorte | Chaosium: 3d6×5 | Roll20 Step Two: 2d6+6×5 | Usado 3d6×5 (fonte oficial). Trecho do Roll20 vem de uma página com menção a Pulp Cthulhu, que não usa idade |
| MOV | Chaosium: 8 para todo humano | Roll20: 7, 8 ou 9 conforme FOR/DES vs TAM | Usado 8 base; condicional não aplicada (item 9) |
| Dano e Corpo | Chaosium e Roll20: tabela de 7ª edição | Umich (glossário): tabela de 6ª | Usada a de 7ª; a de 6ª descartada |
| Escolha de perícias de interesse | Chaosium (simplificado): quatro perícias +20% | Pool INT × 2 (memória, item 3) | Usado INT × 2 como **NÃO VERIFICADO**, com o aviso na tela |

## 5. O que não foi implementado

- **Método de pontos do Keeper Rulebook** (compra de pontos para as características). Não verificado, não implementado. O app oferece rolagem e distribuição de 40 a 80, do processo simplificado.
- **Épocas.** Clássica e moderna são só rótulos. Não há diferenças de regra entre elas.
- **Especializações.** Cada perícia aceita uma especialização em texto. Não há várias instâncias da mesma perícia (ex.: duas Artes e Ofícios).
- **Antecedentes e equipamento** são campos de texto livre, sem efeito nas contas.
- **Exportação para Foundry VTT e Roll20.** Não feita. O formato do ator no Foundry não foi verificado (item 10), e o JSON de VTT não deve ser gerado sem isso.
- **Modo Pulp**, aluguel de itens e demais regras fora da criação.

## 6. Dossiê em PDF

- A4, duas páginas, cor própria de pergaminho com tinta de vinho escuro (`export-pdf.js`).
- A arte é SVG próprio: olho estilizado, molduras e pautas. Nenhum recurso externo.
- Verificado com Chrome headless: `page.pdf` gera exatamente 2 páginas A4 para o investigador de exemplo, sem transbordo. A conferência visual das duas páginas foi feita.
- Os ajustes de idade no PDF trazem o aviso NÃO VERIFICADO.

## 7. Testes

Como rodar (sem dependências):

```
node coc7/tests/run_all.js
```

Testes em Node, na pasta `coc7/tests/`. Cada arquivo sai com código ≠ 0 se algo falhar:

| Arquivo | Cobre |
|---|---|
| `test_derivados.js` (23) | Três investigadores conferidos à mão; arredondamentos; faixas de Dano e Corpo nas bordas; dados com gerador controlado |
| `test_idade.js` (17) | Cada faixa (15, 19, 20, 39, 40, 50, 90); acúmulo das faixas de 40+; varredura de 15 a 90; teste de EDU; limite de 1 e de 99 |
| `test_pericias.js` (14) | Pontos de ocupação por fórmula, incluindo as alternativas; faixas de crédito; perícias de ocupação; pool de interesse |
| `test_validacao.js` (40) | Caso aceito e recusado para cada regra; modo livre transforma erro em aviso |
| `test_backup.js` (10) | Ida e volta; recusa de outro sistema, outra versão, JSON inválido e backup sem estado |
| `test_release.js` (11) | Referências do `index.html`; sintaxe; sem função duplicada; sem `alert()`; PDF com 2 páginas; escape de HTML no nome |

Verificação no navegador (Chrome headless, Playwright, `--no-sandbox`):

```
node coc7/tests/e2e_navegador.js
```

Usa `/usr/bin/google-chrome`. Se o Playwright não estiver no caminho padrão, defina `PLAYWRIGHT_PATH`. Cobre, em 1100px e 360px:

- percurso das 10 etapas do investigador de exemplo, sem erro de console e sem rolagem lateral (medido após a animação de troca de etapa);
- bloqueio no modo estrito com foco no campo nome;
- geração do PDF com 2 páginas e backup JSON com `sistema` "coc7";
- criação do zero por cliques (distribuição, idade, ocupação, pontos, interesse, sorte, histórico);
- escolhas de grupo, fórmula alternativa do Explorador e idade de 15 a 19;
- importação de backup válido e recusa de backup de outro sistema.

Resultado na última execução: 115 testes de Node e o percurso de navegador passaram, sem erro de console.

## 8. O que não foi testado

- **Em VTT real:** nada. Não houve exportação para Foundry nem Roll20, e nenhum VTT foi aberto com dados gerados por este app.
- **Contra o livro:** os itens da seção 3 não foram conferidos no Keeper Rulebook nem no Investigator Handbook, porque o acesso oficial não foi possível nesta sessão.
- **Modo livre no navegador:** coberto pelos testes de validação, mas o fluxo de digitação manual das características não foi percorrido no Chrome.
- **Acessibilidade com leitor de tela:** não testada. Foco, faixas de erro com `role` e rótulos estão presentes, mas não foi feita verificação com leitor de tela.
- **Dossiê impresso:** o PDF foi gerado pelo Chrome headless. Não foi impresso em papel.
