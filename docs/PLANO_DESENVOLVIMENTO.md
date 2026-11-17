# Plano de desenvolvimento e auditoria de crescimento

Objetivo: transformar o criador de fichas de D&D 5e em uma plataforma de fichas com vários sistemas: **D&D 5e** (já existe), **Tormenta20**, **Tormenta RPG** (edição d20 original) e **Call of Cthulhu 7ª edição**. Offline, sem build, no padrão visual VF Tools.

## 1. Auditoria de crescimento (o que impede de escalar hoje)

| # | Limite atual | Risco ao adicionar sistemas | Decisão |
|---|---|---|---|
| G1 | Tudo na raiz, com nomes e globais de D&D (`state`, `render`, `CLASSES`). | Colisão de nomes se dois sistemas carregarem juntos. | **Uma página por sistema** (`dnd5e/`, `tormenta20/`…). Nunca carregam juntos, então os globais não colidem. |
| G2 | `ui.js` redefine funções por reatribuição (a última definição vence). | Frágil e difícil de revisar em sistemas novos. | Sistemas novos usam módulos simples, sem reatribuição. O D&D fica como está até a fase 4. |
| G3 | `ui-theme.js` mistura stepper genérico com escudos de atributo de D&D. | Duplicação do stepper em cada sistema. | Fase 4: extrair o stepper, o menu e os toasts para `core/`, com ganchos por sistema. Antes disso cada sistema copia e adapta. |
| G4 | Regras sem fonte registrada (o 2014 vs 2024 já exigiu auditoria manual). | Erro de regra passa sem ninguém ver. | Todo dado de regra leva `fonte` (livro e capítulo) e todo sistema tem teste de regras. |
| G5 | Backups JSON sem versão de esquema. | Migrar dados quando o formato mudar. | Todo backup leva `{sistema, versaoEsquema}`. |
| G6 | Testes rodam só à mão. | Regressão silenciosa em 4 sistemas. | Fase 4: workflow de GitHub Actions rodando `node` nos testes de cada sistema. |
| G7 | Sem convenção de dados de VTT. | Exportação ad hoc por sistema. | Contrato de exportação em `CONTRATO_SISTEMA.md`; cada sistema documenta o que foi testado em VTT real e o que só foi simulado. |

## 2. Estrutura de pastas (feita nesta fase)

```
index.html            hub: escolhe o sistema
core/                 estilo compartilhado (style.css, theme.css, hub.css)
vf/                   identidade VF Tools (tokens, componentes, motion, tool.js)
dnd5e/                sistema pronto (index.html, rules, ui, export, tests/)
tormenta20/           novo
tormenta-rpg/         novo
coc7/                 novo
docs/                 planos, contrato e auditorias
```

Cada sistema tem o seu `index.html` com um `data-tool` próprio (`dnd5e-builder` continua igual, então os dados já salvos não se perdem). O contrato completo está em `CONTRATO_SISTEMA.md`.

## 3. Fases

| Fase | O que | Quem | Pronto quando |
|---|---|---|---|
| 0 | Plano, contrato, reestruturação de pastas, hub | Coordenação | Testes do D&D passam na estrutura nova |
| 1 | Cinco frentes em paralelo (abaixo), cada uma em branch e worktree próprios | Sessões temporárias em Haiku 5.5 | Cada frente entrega o seu relatório e os seus testes |
| 2 | Verificação cruzada: um revisor independente por sistema confere regras contra fonte pública | Sessões temporárias novas | Relatório `AUDITORIA_<sistema>.md` sem item crítico aberto |
| 3 | Integração: merge das branches, hub atualizado, e2e em 1100px e 360px | Coordenação | Todos os testes passam, sem erro de console |
| 4 | Crescimento: extrair o stepper/menu/toasts para `core/`, CI, esquema versionado | Coordenação | CI verde |

### Frentes da fase 1
1. **dnd5e-revisao**: varredura nível a nível das 12 classes contra o PHB 2014 (características, aumentos de atributo, recursos, espaços de magia, subclasses, proficiências). Já se sabe: Bardo sem d10/d12 de Inspiração, sem Segredos Mágicos no 14, sem os aumentos de atributo 8/12/16/19 na lista.
2. **tormenta20**: criação de ficha completa.
3. **tormenta-rpg**: criação de ficha da edição d20 original.
4. **coc7**: criação de investigador (a mais "fórmula pura": características, idade, ocupação, perícias, PV/Sanidade/Sorte/PM).

## 4. Critérios de aceite (valem para todo sistema)
- Fluxo guiado em etapas, com validação e mensagens claras; modo estrito e modo livre.
- Dados de regra com `fonte`; teste automatizado que confere cada fórmula contra casos conhecidos.
- Exportações: backup JSON (importável de volta), PDF de 2 páginas no tema do sistema e, onde o VTT existir, JSON para Foundry e/ou Roll20 (dizendo o que foi testado de verdade).
- Padrão VF Tools: tokens, tema claro/escuro, foco visível, `prefers-reduced-motion`, 360px sem rolagem lateral, alvos de toque de 40px.
- `AUDITORIA_<sistema>.md` com o que foi validado, contra qual fonte e o que ficou de fora.

## 5. Riscos
- **Precisão das regras.** Quem escreve os dados pode errar de memória. Mitigação: pesquisa na web obrigatória, `fonte` em cada dado, teste de regras e revisão independente (fase 2).
- **Direitos autorais.** Os livros são protegidos. Os sistemas guardam **mecânica** (números, fórmulas, nomes de regras) e descrições curtas **reescritas**, nunca texto do livro, tabelas inteiras copiadas nem arte. Onde houver licença aberta (SRD do d20/OGL, Tormenta RPG sob OGL, T20 conforme a política da Jambô, CoC conforme a política de conteúdo da Chaosium), a fonte e a licença ficam registradas na auditoria.
- **Cobertura.** Primeira entrega por sistema = criação de ficha do nível inicial e níveis baixos, completa e correta, antes de ampliar (itens e magias grandes ficam como catálogo parcial declarado).

## 6. Estado em 2026-11-17 (fases 0, 1 e 3 feitas; fase 2 aberta)

| Sistema | Fluxo | Testes | Regras verificadas | Pendência principal |
|---|---|---|---|---|
| D&D 5e | Completo | 6 arquivos passam | 12 classes conferidas nível a nível (SRD) | Subclasses, perícias/proficiências e truques do Mago a conferir |
| Tormenta20 | Níveis 1 a 5, 12 etapas | 5 arquivos + e2e | Parcial: PV/PM de 5 classes em duas fontes | Sem o livro: ver `AUDITORIA_TORMENTA20.md` |
| Tormenta RPG (d20) | Estrutura pronta | 7 a 14 testes por arquivo | Quase nada: tabelas vazias | Sem fonte das regras |
| Call of Cthulhu 7ª | 10 etapas | 115 + 50 no navegador | Parcial: idade e bases de perícia de memória | Conferir no Keeper Rulebook |

**Fase 2 (verificação cruzada) fica aberta de propósito:** os agentes só acharam guias de fãs e resumos, e um revisor novo teria as mesmas fontes. Ela só avança com o livro (ou PDF) ou com fonte oficial acessível. A fase 4 (extrair stepper/menu/toasts para `core/`, CI, esquema versionado) segue pendente.
