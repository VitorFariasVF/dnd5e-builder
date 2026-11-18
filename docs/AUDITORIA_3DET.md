# Auditoria: 3DeT Victory (criador de ficha)

Pasta: `3det/`. Data-tool: `3det-builder`. Regras: `3det/rules.js` (`window.TDT_RULES`), que não foi alterado por esta etapa.

## Fontes

Conforme o cabeçalho de `3det/rules.js`:

- **[PT]** Manual 3DeT Victory (Playtest), 2023, Jambô Editora: `jamboeditora.com.br/wp-content/uploads/2023/08/Manual-3DeT-Victory-Playtest.pdf`
- **[KI]** 3DeT Victory, Kit Introdutório (demo), Jambô Editora: `blog.jamboeditora.com.br/wp-content/uploads/2023/08/3DeT-DEMO-Kit-Introdutorio.pdf`

Atributos, PA/PM/PV e o orçamento de pontos aparecem nas duas fontes. Esta ferramenta não usa o livro final, que pode ter valores diferentes. O aviso de fontes está na página e na Revisão, e o PDF traz o mesmo aviso no rodapé.

Os textos de efeito das vantagens e desvantagens só aparecem quando o Kit Introdutório os descreve (campo `desc` em `rules.js`). Quando não há `desc`, a tela mostra "Efeito não incluído; consulte o manual." Nenhuma descrição foi escrita de memória.

## O que foi feito

| Arquivo | Conteúdo |
|---|---|
| `3det/index.html` | Estrutura do tormenta-rpg, título "Criador de ficha 3DeT Victory", aviso `#aviso-fontes` (role="note") |
| `3det/3det.css` | Ajustes de layout (contador fixo, grades, alvos de 40px, 360px) com tokens `var(--...)` |
| `3det/state.js` | Estado (`nome`, `jogador`, `conceito`, `nivelPoder`, `pontosTotal`, `atributos{P,H,R}`, `arquetipo`, `pericias[]`, `vantagens[{id,qtd,custo,nota}]`, `desvantagens[{id,valor,nota}]`, `historia`, `anotacoes`) e `ensureStateShape()` |
| `3det/engine.js` | Funções puras: recursos, custos, pontos disponíveis e gastos, saldo, incompatibilidades |
| `3det/validator.js` | Validação por etapa nos modos estrito e livre |
| `3det/storage.js` | Histórico e estado via `VFTool` (chaves `estado` e `historico`) |
| `3det/export.js` | Backup JSON `{sistema:"3DeT Victory", versaoEsquema:1, estado:{modo, personagem}}`, com importação que valida o sistema |
| `3det/export-pdf.js` | Ficha A4 em duas páginas por `window.print`, paleta própria (tinta escura, acento vermelho-laranja) |
| `3det/ui.js` | Sete etapas, stepper, contador de pontos fixo, avisos e catálogo com busca |
| `3det/main.js` | Inicialização |
| `3det/tests/` | Testes em Node (vm) e e2e com Playwright |
| `docs/AUDITORIA_3DET.md` | Este documento |

### Etapas

1. Conceito: nome, jogador, conceito, nível de poder (Iniciante 10, Herói 20, Veterano 35, ou Pontos livres) e modo de validação.
2. Arquétipo: uma escolha. Mostra custo, poderes e desvantagens do arquétipo, com a fonte.
3. Atributos: P, H, R de 0 a 5, com PA, PM e PV ao vivo.
4. Perícias: 12 perícias de 1 ponto cada. "Saber" aparece com a nota "no Kit: Conhecimento".
5. Vantagens: busca, custo fixo, faixa ou opções, quantidade para as "multiplo", e a perícia escolhida nas Maestrias.
6. Desvantagens: valor fixo ou faixa. Dependência fica fora da lista porque é só para NPCs.
7. Revisão: resumo, pendências de todas as etapas, lacunas, aviso de fonte, histórico, backup e PDF.

### Regras de cálculo (conferidas no `rules.js`)

- PA = P × 1, PM = H × 5, PV = R × 5. Atributo 0 vale 1 ponto de recurso.
- Custo dos atributos: 1 por ponto. Perícias: 1 cada.
- Vantagem: custo fixo, ou o custo escolhido na faixa ou nas opções. Multiplica por `qtd` quando a vantagem é "multiplo".
- Desvantagens dão pontos pelo total negativo, limitado a 2. O orçamento é `pontosTotal + min(2, −soma)`.
- Arquétipo: custo do `rules.js`. Sem arquétipo, o custo é 0. Custo `null` deixa gastos e saldo como "a definir" e gera aviso.

### Modos de validação

- **Erro que bloqueia nos dois modos**: formato (atributo fora de 0 a 5 ou vazio, id desconhecido, quantidade inválida em vantagem que não é "multiplo", custo fora da faixa ou das opções, valor de desvantagem fora da faixa, mais de um arquétipo, Dependência, nível de poder que não bate com os pontos).
- **Regra de jogo, erro no estrito e aviso no livre**: saldo negativo, desvantagens somando menos de −2, incompatibilidade vantagem×desvantagem ou vantagem×vantagem, Maestria sem perícia do personagem.
- **Erro no estrito e aviso no livre, sem ser regra de jogo**: nome vazio.
- **Sempre aviso**: arquétipo com custo não verificado (Anão), atributo 0 (recomenda-se pelo menos 1), arquétipo não escolhido.

## Decisões de interpretação (conferir)

1. **Limite de −2 pelo valor, não pela contagem.** A regra diz "até −2 em desvantagens, que rendem +2 pontos". Usei a soma dos valores negativos (Ambiente −1 + Inapto −1 + Bateria −1 = −3, que vale 2 pontos). Se a intenção for contar itens, a função `tdtPontosDeDesvantagens` em `engine.js` muda.
2. **Perícia da Maestria na `nota`.** O formato de estado tem só `{id, qtd, custo, nota}`, então a perícia escolhida para cada Maestria fica em `nota`. Nas outras vantagens, `nota` é texto livre. Isso impede uma nota livre em Maestria, e a tela mostra essa restrição.
3. **Stepper e toasts.** O `dnd5e/ui-theme.js` depende de globais do ui.js do D&D, então não foi carregado. O stepper segue as mesmas classes (`stepper`, `stepper-dots`, `stepper-track`) do `core/theme.css`. Confirmações usam `VFTool.toast`.
4. **Nível de poder "Pontos livres".** Os pontos totais são editáveis apenas nesse caso. Nos outros, o campo fica somente leitura com o valor do nível.
5. **Backup inclui o modo.** O campo `estado` guarda `modo` e `personagem`. A etapa não entra no backup, e a importação abre a ficha na etapa 1.

## Lacunas

Lista de `TDT_RULES.lacunas`, mais um item sobre exportação:

- Efeito da maioria das vantagens e desvantagens. Só as do Kit Introdutório estão descritas.
- Arquétipos Abissal e Alien: efeitos não lidos. Aberrante custa 1 pt (PDF p64); Anão custa 1 pt (PDF p67), conferido no livro 3DeT Victory em 2026-11-18.
- Kits e regras completas de veículos e artefatos.
- 3D&T Alpha (5 características) não implementado. Só o Victory, com 3 atributos.
- Sem exportação para VTT. Nenhum VTT foi verificado para este sistema.

## O que não foi verificado

- Os números de `rules.js` não foram conferidos com o livro final. Foram conferidos apenas contra a leitura do Playtest e do Kit Introdutório, nas fontes citadas acima.
- Os cálculos de teste foram feitos à mão e estão comentados em `tests/engine.test.js`. Não há comparação com um VTT ou com outra ferramenta.
- O PDF foi verificado pela contagem de páginas no HTML gerado e pelo fluxo e2e (janela aberta, duas páginas, aviso presente). Não foi impresso nem conferido visualmente. Fichas com muitas vantagens com descrição podem passar de duas páginas, porque cada página tem altura mínima de 297 mm e não corta conteúdo.
- O layout foi verificado por medição (rolagem lateral e alvos menores que 40px) em 1100 px e 360 px. A aparência visual não foi revisada em capturas.
- Foi testado só com o Chrome instalado em `/usr/bin/google-chrome`.

## Como rodar os testes

```
node 3det/tests/run-all.js     # engine (15), validações (32), backup (13), release (10): 70 testes
node 3det/tests/e2e.js         # navegador: precisa de Chrome e de Playwright (global ou local)
```

O `run-all.js` sai com código diferente de zero se algum teste falhar. O `e2e.js` percorre as sete etapas, baixa o backup, reimporta, abre o PDF e confere a ausência de rolagem lateral e de erros de console em 1100 px e 360 px.

Resultado desta etapa: `run-all.js` passa nos 70 testes; `e2e.js` passa no fluxo completo nos dois tamanhos.
