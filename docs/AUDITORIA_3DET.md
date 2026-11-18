# Auditoria: 3DeT Victory (criador de ficha)

Pasta: `3det/`. Data-tool: `3det-builder`. Regras: `3det/rules.js` (`window.TDT_RULES`), que não foi alterado por esta etapa.

## Fontes

Conforme o cabeçalho de `3det/rules.js`:

- **[PT]** Manual 3DeT Victory (Playtest), 2023, Jambô Editora: `jamboeditora.com.br/wp-content/uploads/2023/08/Manual-3DeT-Victory-Playtest.pdf`
- **[KI]** 3DeT Victory, Kit Introdutório (demo), Jambô Editora: `blog.jamboeditora.com.br/wp-content/uploads/2023/08/3DeT-DEMO-Kit-Introdutorio.pdf`

Atributos, PA/PM/PV e o orçamento de pontos aparecem nas duas fontes. Esta ferramenta não usa o livro final, que pode ter valores diferentes. O aviso de fontes está na página e na Revisão, e o PDF traz o mesmo aviso no rodapé.

- **[VIC]** 3DeT Victory, livro do usuário (`3det_victory.pdf`, 289 pp.). Usado para as decisões da seção "Decisões pelo livro 3DeT Victory". Páginas citadas são do PDF.

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
- **Regra de jogo, erro no estrito e aviso no livre**: saldo negativo, incompatibilidade vantagem×desvantagem ou vantagem×vantagem, Maestria sem perícia do personagem.
- **Sempre aviso**: desvantagens somando menos de −2 (o livro permite; só não geram pontos extras, PDF p65).
- **Erro no estrito e aviso no livre, sem ser regra de jogo**: nome vazio.
- **Sempre aviso**: arquétipo com custo não verificado (Anão), atributo 0 (recomenda-se pelo menos 1), arquétipo não escolhido.

## Decisões pelo livro 3DeT Victory

Conferidas no PDF `3det_victory.pdf` (289 pp.) em 2026-11-18. Página = número do PDF (índice de páginas + 1). Motivo de cada decisão na coluna da direita.

| Item | Decisão no app | Página | Motivo |
|---|---|---|---|
| Cópia / Clone | Nome **Clone**, id `clone`, custo 1. `copia` removido. | p51 (regra); p216, p220, p275, p277 (fichas de NPC) | O livro define a regra como Clone. As fichas de NPC escrevem Cópia com o mesmo efeito. Um só item. |
| Insano / Transtorno | `insano` trocado por **Transtorno**, −1 cada, pode repetir. Escolha de uma das oito opções (cleptomania, compulsão, distração, fantasia, fobia, megalomania, mitomania, paranoia). | p74-75 | O livro não tem Insano. Tem "Transtorno –1pt cada" com oito opções. |
| Código | **Nove** itens: 1ª e 2ª Lei de Asimov, Caçador, Combate, Derrota, Gratidão, Heróis, Honestidade, Redenção. Lista em `TDT_EFEITOS_DESVANTAGENS.codigo.lista`. | p68 | O livro lista nove itens. As duas Leis de Asimov contam como dois. |
| Artefato e Grimório | Custo **1 pt ou mais, sem máximo**. O validador aceita acima de 9 (`custoAberto`). Não acumulam (vantagem única). | p48 (Artefato), p54-55 (Grimório) | O livro não dá teto de custo. "Um item especial, único". O limite de 1 arma, 1 armadura e 2 acessórios (p139) não é aplicado: a vantagem não guarda o tipo do item. |
| Kemono | Fonte trocada de PT para **PDF p95**. Cacoete agora lista as seis opções: Antipático, Atrapalhado, Fracote, Frágil, Indeciso ou Tapado. | p95 | Texto do livro. |
| Vampiro | Fonte trocada de PT para **PDF p102**. Dependência não entra para o jogador. | p102 | O livro diz que Dependência "está aqui apenas para vilões NPCs". |
| "Pequeno" (Inventário) | Níveis com nomes do livro: 0 Seminventário, 1 Pequeno, 2 Grande, 3 Supremo, com os itens de cada nível. | p58 | "Pequeno" é o nível 1 pt do Inventário, não vantagem à parte. |
| Abissal, Alien, Aberrante, Ciborgue, Minotauro | Desvantagens confirmadas ou atualizadas: Abissal Infame; Alien Inculto; Aberrante Monstruoso; Ciborgue "Código ou Transtorno"; Minotauro "Transtorno (Fobia)". | p79, p80, p81, p86, p97 | Estão no livro. O "confirmar" saiu das fontes. |

## Decisões de interpretação (conferir)

1. **Limite de −2 pelo valor, não pela contagem. Resolvido pelo livro:** "até –2 pontos em desvantagens" (p36) e "pode acumular até –2 pontos em desvantagens... além desse limite..., mas sem receber mais pontos" (p65). A soma é pelo valor, e o app já dá no máximo 2 pontos (`tdtPontosDeDesvantagens`). Mudança junto: somar mais de −2 deixou de ser erro e virou aviso, porque o livro permite a desvantagem extra. Desvantagens de arquétipo não entram no limite (p36).
2. **Perícia da Maestria na `nota`.** O formato de estado tem só `{id, qtd, custo, nota}`, então a perícia escolhida para cada Maestria fica em `nota`. Nas outras vantagens, `nota` é texto livre. Isso impede uma nota livre em Maestria, e a tela mostra essa restrição.
3. **Stepper e toasts.** O `dnd5e/ui-theme.js` depende de globais do ui.js do D&D, então não foi carregado. O stepper segue as mesmas classes (`stepper`, `stepper-dots`, `stepper-track`) do `core/theme.css`. Confirmações usam `VFTool.toast`.
4. **Nível de poder "Pontos livres".** Os pontos totais são editáveis apenas nesse caso. Nos outros, o campo fica somente leitura com o valor do nível.
5. **Backup inclui o modo.** O campo `estado` guarda `modo` e `personagem`. A etapa não entra no backup, e a importação abre a ficha na etapa 1.

## Lacunas

Lista de `TDT_RULES.lacunas`, mais um item sobre exportação:

- Efeito da maioria das vantagens e desvantagens. Só as do Kit Introdutório estão descritas.
- Arquétipos Abissal e Alien: efeitos não lidos. Aberrante custa 1 pt (PDF p79); Anão custa 1 pt (PDF p82), conferido no livro 3DeT Victory em 2026-11-18.
- Kits e regras completas de veículos e artefatos.
- 3D&T Alpha (5 características) não implementado. Só o Victory, com 3 atributos.
- Sem exportação para VTT. Nenhum VTT foi verificado para este sistema.
- Pendências para `ui.js` (fora do escopo desta etapa): (a) os selects de Artefato e Grimório usam `custoMax` 9 e mostram "custo 1 a 9"; o livro não tem teto, então o texto e a lista precisam mudar (linhas 146 e 179); (b) Transtorno precisa de um campo para escolher uma das oito opções; hoje a escolha fica em nota livre; (c) Artefato sem campo de tipo (arma, armadura, acessório), então o limite de 1/1/2 do livro (p139) não é checado.
- Nas outras entradas, as fontes ainda citam PT e KI. Só as entradas listadas em "Decisões pelo livro" foram trocadas.

## O que não foi verificado

- Os números de `rules.js` não foram conferidos com o livro final. Foram conferidos apenas contra a leitura do Playtest e do Kit Introdutório, nas fontes citadas acima.
- Os cálculos de teste foram feitos à mão e estão comentados em `tests/engine.test.js`. Não há comparação com um VTT ou com outra ferramenta.
- O PDF foi verificado pela contagem de páginas no HTML gerado e pelo fluxo e2e (janela aberta, duas páginas, aviso presente). Não foi impresso nem conferido visualmente. Fichas com muitas vantagens com descrição podem passar de duas páginas, porque cada página tem altura mínima de 297 mm e não corta conteúdo.
- O layout foi verificado por medição (rolagem lateral e alvos menores que 40px) em 1100 px e 360 px. A aparência visual não foi revisada em capturas.
- Foi testado só com o Chrome instalado em `/usr/bin/google-chrome`.

## Como rodar os testes

```
node 3det/tests/run-all.js     # engine (15), validações (38), backup (13), release (10), sugestão (10): 86 testes
node 3det/tests/e2e.js         # navegador: precisa de Chrome e de Playwright (global ou local)
```

O `run-all.js` sai com código diferente de zero se algum teste falhar. O `e2e.js` percorre as sete etapas, baixa o backup, reimporta, abre o PDF e confere a ausência de rolagem lateral e de erros de console em 1100 px e 360 px.

Resultado da última rodada das decisões pelo livro (2026-11-18): `run-all.js` passa nos 86 testes. O `e2e.js` não foi rodado nesta rodada (precisa de Chrome e Playwright), e não está confirmado que ele ainda passa com a troca de Insano por Transtorno e de Cópia por Clone.
