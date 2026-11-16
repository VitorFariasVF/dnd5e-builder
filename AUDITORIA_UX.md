# Auditoria de UX e visual — interface, animações e tema D&D (página e PDF)

Data: 2026-11-16 · Método: as 11 etapas abertas no Chrome em 1100×900 e 360×740 com uma ficha de Mago, medindo rolagem lateral, alvos de toque e altura de cada tela, mais leitura das capturas e do código.

## O que já está bom
- Sem rolagem lateral em nenhuma etapa, em desktop ou celular (360px).
- Nenhum botão ou campo com menos de 40px de altura.
- Tema escuro/claro, foco visível e rótulos em todos os campos (padrão VF Tools).

## Achados

| # | Sev. | Achado | Evidência |
|---|---|---|---|
| U1 | Alto | **Sem noção de progresso.** A etapa é só texto ("Etapa 4 de 11 — Classe"). Não há barra, não dá para ver o que falta nem voltar a uma etapa anterior com um toque. | Todas as etapas |
| U2 | Alto | **Topo poluído e arriscado.** Quatro botões (Tela inicial, Salvar, Importar, **Limpar banco**) aparecem no topo de todas as etapas. No celular viram 4 linhas inteiras antes do conteúdo. O botão destrutivo fica a um toque de distância em qualquer tela. | `ux_m_11` |
| U3 | Alto | **Resumo é um paredão de texto.** 2994px no desktop e 5209px no celular, sem hierarquia: atributos, PV e CA aparecem como linhas de lista. As pendências ficam no fim da página, longe do aviso "com pendências" do topo. | `ux_d_11`, `ux_m_11` |
| U4 | Médio | **Erros por `alert()`.** Bloqueia a tela, é visualmente fora do app e some o contexto. O padrão VF Tools prevê aviso em texto (toast com `role="status"`). | `ui.js` (dezenas de chamadas) |
| U5 | Médio | **Troca de etapa seca.** O conteúdo é substituído de uma vez, sem indicar direção (avançou/voltou). A cortina do VF Tools só roda ao abrir a página. | Todas as etapas |
| U6 | Médio | **Pouca identidade D&D.** Só o título tem personalidade. A escolha de classe é uma lista de texto, os atributos são uma pilha de 6 selects (nada de escudo, modificador ou d20) e nada lembra um personagem. | `ux_d_4`, `ux_d_6` |
| U7 | Médio | **Telas longas.** Classe 1747px, Personalidade 2109px, Resumo ~3000px no desktop. Sem seções recolhíveis. | medição |
| U8 | Baixo | Rótulo e campo muito juntos nas etapas de formulário; hierarquia entre "campos" e "informação" pouco clara. | `ux_d_6` |
| U9 | Baixo | Na prévia da classe, "Proficiências:" aparece vazio para o Mago (as proficiências efetivas ainda não carregaram nessa tela). | `ux_d_4` |
| U10 | Baixo | O PDF já tem moldura, mas toda classe usa o mesmo dourado, sem ícones nos blocos de vitais e seções, sem faixa de título e com fundo chapado. | `popup.pdf` |

## Decisões de design
- **Animação funcional, não decorativa.** O padrão VF Tools restringe movimento decorativo. Aqui o movimento serve a uma função: indicar progresso (barra), direção (entrada da etapa), contagem de valores (atributos) e feedback (toques, avisos). Há um único gesto de marca: o d20 do título gira uma vez ao abrir a página. Tudo fica desligado com `prefers-reduced-motion` e usa só `opacity`/`transform`, nas durações dos tokens (0,3 s por passo).
- **Tema D&D sem sair da identidade.** Mantém a paleta Editorial (âmbar sobre fundo quente) e acrescenta símbolos: d20, escudos de atributo, brasão por classe, divisor ornamental. Nada de cor solta: tudo por `var(--...)`.
- **No PDF** (arte impressa, paleta própria): cor de acento por classe, ícones, faixa de título, capitular e vinheta de pergaminho.

## Resultado (implementado)

| # | Status | O que mudou |
|---|---|---|
| U1 | Feito | Stepper com barra de progresso animada e 11 pontos; etapas já feitas ficam clicáveis para voltar (`theme.css`, `ui-theme.js`). |
| U2 | Feito | Os 4 botões do topo viraram um "Menu"; "Limpar banco" fica separado, em vermelho, dentro do menu. |
| U3 | Parcial | O Resumo agora abre com brasão de classe e os 6 escudos de atributo. O texto longo continua (não foi recolhido em seções). |
| U4 | Feito | `alert()` virou toast não bloqueante (`role="alert"`, fecha sozinho ou ao toque). |
| U5 | Feito | Etapa entra deslizando da direção certa (avançar/voltar); contagem animada dos modificadores. |
| U6 | Feito | Escudos de atributo, brasão por classe, d20 no título e nos subtítulos, divisor ornamental. |
| U7 | Aberto | Telas longas (Classe, Personalidade, Resumo) continuam longas. |
| U8 | Aberto | Espaçamento entre rótulo e campo não mudou. |
| U9 | Aberto | "Proficiências:" vazio na prévia da classe (Mago). |
| U10 | Feito | PDF com cor por classe (12), faixa de título em fita, ícones nos vitais e seções, capitular na história e vinheta de pergaminho com textura. |

**Verificação:** 5 suítes de teste passam, `check-identity` com 0 erros e 2 avisos (cores e px fixos em componentes novos e na paleta do PDF), e2e em 1100px e 360px sem erro de console, sem rolagem lateral e sem alvos de toque abaixo de 28px (os pontos do stepper têm área de toque ampliada). PDF conferido em Mago, Bárbaro e Monge, 2 páginas cada.

**Desvio do padrão VF Tools:** o padrão restringe animação decorativa. Aqui o movimento é funcional (progresso, direção da etapa, contagem, feedback), com um único gesto de marca (o d20 do título gira uma vez). Tudo é desligado com `prefers-reduced-motion`.
