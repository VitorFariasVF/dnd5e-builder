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
- Artefato: custo base em pontos (1 pt = 10 XP) mais as qualidades em XP (`tdtCustoArtefato`). Mínimo de 10 XP, mesmo com desvantagens (PDF p139). Qualidade sem escolha de faixa deixa o custo "a definir".
- Veículo: custo ao personagem em XP = pontuação × 2 × 2^(escala−1), em pontos divide-se por 10 (`tdtCustoVeiculo`). 10 pontos a 1 escala = 20 XP, 2 escalas = 40 XP, 3 = 80 XP (PDF p142). Gratuito (campanha de veículos, p142) custa 0. Entra em "Gastos". Ficha do veículo (atributos + vantagens − desvantagens) só confere com a pontuação (`tdtCustoFichaVeiculo`).
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
| Artefato | Custo **1 pt ou mais, sem teto** (`custoAberto`, sem `custoMax`). Cada entrada é **um item** (`itens: true`): pode repetir, tem campo `tipo` (arma, armadura ou acessório) e não usa quantidade. Limite por personagem: **1 arma, 1 armadura e 2 acessórios**. | p48 (vantagem), p139 (limite e tipos) | O livro não dá teto de custo. O p139 diz "Um personagem pode usar no máximo uma arma, uma armadura e dois acessórios". Para o limite ter efeito, o app precisa de mais de uma entrada, por isso não é vantagem única. |
| Qualidades de Artefato | 18 qualidades em `TDT_RULES.qualidadesArtefato`, cada uma com custo em XP, página e tipos de artefato. O usuário escolhe quais o artefato tem (campo `qualidades` em cada Artefato). O custo entra na conta: base + XP, mínimo 10 XP. Mostra na ficha e no PDF. Faixas (Aprimorado 1-5, Encantado 1-5, Amaldiçoado suave/grave) e perícias (Inteligente, Obra-Prima) são escolhidas no item. Auspicioso não é calculada (ver decisão 9). | p139-141 | O livro diz que a qualidade "afeta seu custo" e dá o custo de cada uma em XP. Os custos foram conferidos no texto. |
| Grimório | Custo **1 pt ou mais, sem teto**. Sem limite de itens nem de tipo. | p54-55 | Conferido: o texto não traz limite. |
| Veículo | Ficha própria em `personagem.veiculos`: nome, tipo (texto livre), escala acima do piloto (1 a 3 na tela), pontuação (10 ou mais, de 5 em 5), gratuito, atributos P/H/R, vantagens e desvantagens com o mesmo catálogo do personagem. Custo em pontos entra no total gasto. Validado na etapa 5 (Vantagens) e na Revisão. Mostra na ficha impressa. | p140-142 (regra de ficha p141; Habilidade nula, escala de custo e gratuito p142) | Regra de custo e ficha conferidas no texto. Exemplos de custo: Sugoi 20 XP, Kiodai 40, Kami 80 (p142). |
| Ataque Especial e Defesa Especial | Lista completa das variações, com custo em PM. Antes listava só 4 ou 5. | p49 (Ataque), p51-52 (Defesa) | O livro tem 12 variações de ataque e 9 de defesa. Os custos foram conferidos no texto. |
| Transtorno (escolha) | A escolha das oito opções fica em `subtipo` (campo novo na desvantagem). Sem escolha, erro nos dois modos. A ficha mostra o efeito da opção escolhida, com a página. | p74-75 | O livro diz "Escolha um entre os seguintes". Os efeitos das oito opções já estavam no catálogo (`rules-efeitos-desvantagens.js`) e foram conferidos. |
| Kemono | Fonte trocada de PT para **PDF p95**. Cacoete agora lista as seis opções: Antipático, Atrapalhado, Fracote, Frágil, Indeciso ou Tapado. | p95 | Texto do livro. |
| Vampiro | Fonte trocada de PT para **PDF p102**. Dependência não entra para o jogador. | p102 | O livro diz que Dependência "está aqui apenas para vilões NPCs". |
| "Pequeno" (Inventário) | Níveis com nomes do livro: 0 Seminventário, 1 Pequeno, 2 Grande, 3 Supremo, com os itens de cada nível. | p58 | "Pequeno" é o nível 1 pt do Inventário, não vantagem à parte. |
| Abissal, Alien, Aberrante, Ciborgue, Minotauro | Desvantagens confirmadas ou atualizadas: Abissal Infame; Alien Inculto; Aberrante Monstruoso; Ciborgue "Código ou Transtorno"; Minotauro "Transtorno (Fobia)". | p79, p80, p81, p86, p97 | Estão no livro. O "confirmar" saiu das fontes. |

## Decisões de interpretação (conferir)

1. **Limite de −2 pelo valor, não pela contagem. Resolvido pelo livro:** "até –2 pontos em desvantagens" (p36) e "pode acumular até –2 pontos em desvantagens... além desse limite..., mas sem receber mais pontos" (p65). A soma é pelo valor, e o app já dá no máximo 2 pontos (`tdtPontosDeDesvantagens`). Mudança junto: somar mais de −2 deixou de ser erro e virou aviso, porque o livro permite a desvantagem extra. Desvantagens de arquétipo não entram no limite (p36).
2. **Limite de Artefato é regra de jogo.** O p139 diz "Um personagem pode usar no máximo...", sem mencionar o mestre. Por isso o validador trata como regra de jogo: erro no modo estrito e aviso no livre (mesmo nível da Maestria e das incompatibilidades). O app conta os itens da ficha, não os equipados, porque não guarda o que está em uso. Tipo ausente vira pendência de regra; tipo fora da lista é erro de formato.
3. **Fonte das vantagens e desvantagens.** Todas as entradas com fonte PT ou KI agora citam página do Victory (`3DeT Victory, PDF pNN`), obtida por busca no texto do livro. A página foi aceita quando o cabeçalho da entrada no livro (nome e custo) batia com o `rules.js`. Nenhuma entrada ficou sem página. Os textos de efeito do KI (campo `desc`) não foram reescritos: só a fonte mudou.
4. **Perícia da Maestria na `nota`.** O formato de estado tem só `{id, qtd, custo, nota}`, então a perícia escolhida para cada Maestria fica em `nota`. Nas outras vantagens, `nota` é texto livre. Isso impede uma nota livre em Maestria, e a tela mostra essa restrição.
5. **Stepper e toasts.** O `dnd5e/ui-theme.js` depende de globais do ui.js do D&D, então não foi carregado. O stepper segue as mesmas classes (`stepper`, `stepper-dots`, `stepper-track`) do `core/theme.css`. Confirmações usam `VFTool.toast`.
6. **Nível de poder "Pontos livres".** Os pontos totais são editáveis apenas nesse caso. Nos outros, o campo fica somente leitura com o valor do nível.
7. **Backup inclui o modo.** O campo `estado` guarda `modo` e `personagem`. A etapa não entra no backup, e a importação abre a ficha na etapa 1.
8. **Qualidades de Artefato: custo e restrições.** Cada qualidade soma seu custo em XP ao custo base do artefato (1 pt = 10 XP). O total nunca fica abaixo de 10 XP (p139). Restrições do livro aplicadas: tipo (Acurado: arma ou acessório; Fortificada e Leve: armadura; Maciço, Espiritual, Venenoso, Flagelo: arma; Obra-Prima e Aprimorado: acessório; Abençoado: armadura ou acessório; Honrado e Inteligente: arma ou armadura; Encantado, Condutor, Auspicioso e Amaldiçoado não restringem); incompatíveis (Acurado com Maciço; Fortificada com Leve, p140-141). Interpretação do app, não do livro: uma mesma qualidade não se repete no mesmo artefato. Violação é erro no estrito e aviso no livre, como o limite por tipo. Vorpal e Sagrado não trazem restrição de tipo no texto, então não são restringidos. "Artefatos com qualidades iguais não se acumulam" (p139) é regra de efeito, não de custo, e o app não calcula efeitos: fica fora.
9. **Auspicioso: dúvida, não aplicada.** O livro diz que o custo em XP "é igual ao custo para comprar a vantagem" concedida (p140). O app não sabe qual vantagem o artefato concede nem como somar mais de uma. Por isso a qualidade está no catálogo com `aplicavel: false`: não aparece no seletor, e se vier de um backup, a validação dá erro. Dúvida em aberto: quem define a vantagem concedida e o custo para o usuário (campo livre ou seleção de vantagens).
10. **Escolha de faixa e perícia.** Aprimorado e Encantado usam a faixa do livro (1 a 5, com o custo da tabela). Amaldiçoado usa suave (–10 XP) ou grave (–20 XP). Inteligente e Obra-Prima pedem uma perícia (qualquer da lista, não só as do personagem, p141). Flagelo pede o tipo de alvo em texto. Nenhuma escolha é preenchida automaticamente: sem ela, o custo fica "a definir" e a validação pede.
11. **Veículo: ficha e escala (interpretação do app).** O livro mede o veículo em pontos (p142: "um veículo de 10 pontos"). O app assume que essa pontuação é o total gasto na ficha do veículo, como no personagem, e então erra se a ficha gastar mais que a pontuação (regra de jogo: erro no estrito, aviso no livre) e avisa se sobrar pontos. O livro não diz se sobra é permitida; o aviso é a escolha do app. A escala do piloto não é guardada na ficha: o usuário escolhe quantas escalas o veículo está acima (1, 2 ou 3 na tela, com os custos do livro). Pontuação abaixo de 10 ou fora de múltiplos de 5 não tem custo verificado no livro, então é erro de formato. Desvantagens do veículo seguem o limite de −2 do personagem (p65), por ser a mesma regra de ficha. Vantagem de Artefato, Maestria e Transtorno não entram no veículo (Maestria precisa de perícia, que o veículo não tem; Transtorno precisa de escolha à parte). Os outros itens do catálogo entram sem mudança.

## Lacunas

Lista de `TDT_RULES.lacunas`, revista em 2026-11-18 contra o livro:

- **Efeitos das vantagens e desvantagens.** O app tem um resumo curto de cada uma (`rules-efeitos-*.js`), com página em `fonte`. Não é o texto completo do livro (p45-75).
- **Poderes de arquétipo** (Deformidade, Teratismo, Desfavor, Xenobiologia, Talento, Abascanto). O texto confere com o livro (p79-82), mas o app não aplica o efeito nas contas. Não há vantagem equivalente.
- **Artefatos.** O limite por tipo está aplicado (p139). As 18 Qualidades de Artefatos estão aplicadas (p139-141), exceto Auspicioso (decisão 9). Efeitos das qualidades (Acurado, Maciço, Vorpal etc.) não são calculados nas contas de combate: o app só calcula o custo. O Victory não traz kits.
- **Veículos (p140-142): parcial.** Implementado: ficha própria com atributos, vantagens e desvantagens; custo ao personagem por pontuação e escala; gratuito de campanha; validação; PDF. Fora desta rodada, por falta de regra verificável ou de dado no app: (a) perícias do veículo, que o livro permite "se também tiver perícias na ficha" (p142); (b) Habilidade 1 ou mais (pilotagem automática, p142) e a escolha do piloto entre sua Habilidade ou a do veículo; (c) pilotar com Esporte ou Máquinas, e a perícia alternativa autorizada pelo mestre (p142), que o app não modela; (d) Estar no veículo como Ganho para reduzir a viagem (p142): efeito de jogo, não calculado; (e) limite de quantos veículos o personagem pode ter (o livro não fixa); (f) escala do personagem (o app não tem a escala do piloto, só o número de escalas acima que o usuário escolhe); (g) Artefato dentro do veículo e qualidades de Artefato aplicadas ao veículo (p140-141 falam de armas e armaduras, não de veículos); (h) Ajudante (montaria) e o Patrono que oferece veículo, que são fora do escopo.
- **Fora do escopo: 3D&T Alpha** (5 características). É outro sistema e não é implementado. Este app cria fichas só do 3D&T Victory (3 atributos).
- Sem exportação para VTT. Nenhum VTT foi verificado para este sistema.

Pendências de `ui.js` da rodada anterior, resolvidas nesta: custo "1 ou mais" para Artefato e Grimório (sem "a 9"); escolha de Transtorno por campo próprio; campo de tipo em Artefato com limite validado.

Bug achado e corrigido: 21 desvantagens (ex.: Ambiente, Bateria, Amnésia) tinham resumo no catálogo, mas o carregador só preenchia `desc` quando o campo existia como `null`. Agora o resumo aparece em todas.

## O que não foi verificado

- Os números de `rules.js` não foram conferidos com o livro final. Foram conferidos apenas contra a leitura do Playtest e do Kit Introdutório, nas fontes citadas acima.
- Os cálculos de teste foram feitos à mão e estão comentados em `tests/engine.test.js`. Não há comparação com um VTT ou com outra ferramenta.
- O PDF foi verificado pela contagem de páginas no HTML gerado e pelo fluxo e2e (janela aberta, duas páginas, aviso presente). Não foi impresso nem conferido visualmente. Fichas com muitas vantagens com descrição podem passar de duas páginas, porque cada página tem altura mínima de 297 mm e não corta conteúdo.
- O layout foi verificado por medição (rolagem lateral e alvos menores que 40px) em 1100 px e 360 px. A aparência visual não foi revisada em capturas.
- Foi testado só com o Chrome instalado em `/usr/bin/google-chrome`.

## Como rodar os testes

```
node 3det/tests/run-all.js     # engine (15), validações (38), backup (13), release (10), sugestão (10), imagem (11), migração (3), livro 3DeT Victory (31), veículos (15)
node 3det/tests/e2e.js         # navegador: precisa de Chrome e de Playwright (global ou local)
```

O `run-all.js` sai com código diferente de zero se algum teste falhar. O `e2e.js` percorre as sete etapas, baixa o backup, reimporta, abre o PDF e confere a ausência de rolagem lateral e de erros de console em 1100 px e 360 px.

Resultado da rodada de 2026-11-18 (itens do livro: Artefato, Transtorno, fontes, lacunas): `run-all.js` passa em todos os testes, incluindo os 16 de `livro_3det.test.js`. O `e2e.js` (Chrome) também passou: fluxo completo, sem erro de console e sem rolagem lateral em 1100 px e 360 px.

Resultado da rodada de 2026-11-18 (Veículos, p140-142): `run-all.js` passa, com 15 testes novos em `veiculos.test.js` (custo pelos exemplos do p142, gratuito, gastos do personagem, ficha acima e abaixo da pontuação, formato, nome, atributos, vantagem e desvantagem do veículo, limite de −2, dado antigo, PDF e regras). O `e2e.js` (Chrome) passou. Roteiro extra fora do repositório (criar veículo, 15 pontos a escala 2, vantagem e desvantagem, pontuação 12, remover) confirmou custo 6 pt (60 XP), erro com foco no campo da pontuação e nenhum erro de console.

Resultado da rodada de 2026-11-18 (Qualidades de Artefato): `run-all.js` passou em todos os testes, com 31 no `livro_3det.test.js` (16 antes, 15 novos sobre catálogo, custo, restrições, incompatibilidades, ficha, PDF e dado antigo). O `e2e.js` (Chrome) também passou. Um roteiro extra fora do repositório (add artefato, adicionar Aprimorado +2 e Acurado, remover Acurado) confirmou custo 5 e depois 3 pontos, com a mesma linha no PDF e sem erro de console.
