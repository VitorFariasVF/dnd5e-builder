# Auditoria: Tormenta20 (Jambô, Edição Jogo do Ano)

> **Atualização 2026-11-17:** este documento descreve a primeira entrega, feita sem o livro. Os dados foram depois refeitos a partir do Livro Básico (PDF do usuário); veja `docs/TRABALHO_T20_*.md`. Uma amostra independente de 60 itens contra as páginas do livro teve 59 certos e 1 erro (espaço da Peçonha comum, limitação do formato).

Primeira entrega: criação de ficha do nível 1 ao 5, em `tormenta20/`.

## 1. Fontes consultadas

O livro básico **não foi consultado diretamente** (não há acesso à versão oficial). Todas as regras vêm de fontes públicas de terceiros, identificadas abaixo com as siglas usadas em `tormenta20/rules.js`.

| Sigla | Fonte | Tipo | Observação |
|---|---|---|---|
| [R] | Rotina de Mestre (artigos "Como criar sua ficha" e guias de classe) | Blog | Cita a "Edição Jogo do Ano (Jambô)" |
| [E] | exegetadearton.com.br (guia por classe, perícias, origens, raças) | Guia de fãs | Uma página por classe |
| [T] | tsrd.fandom.com (construção de personagem, trechos lidos por busca) | Wiki de fãs | Algumas páginas não puderam ser abertas |
| [I] | Issue #57 de DMBerlin/t20-community-patches (GitHub) | Issue | Cita páginas do livro (p. 20, 22, 25, 28) |
| — | tormenta-collab.fandom.com | Wiki de fãs | Não abriu (erro do site); não usada |

Não foi usado o texto de nenhum livro. Só mecânica (números, fórmulas, nomes) e descrições curtas escritas no app. Um PDF completo do livro apareceu nas buscas (anyflip) e **não foi usado**: parece cópia não autorizada.

Licença: a política da Jambô para Tormenta20 não foi confirmada. Por isso nada de texto do livro foi copiado.

## 2. Itens validados (duas fontes concordam)

- **Lista das 14 classes do livro básico**: Arcanista, Bárbaro, Bardo, Bucaneiro, Caçador, Cavaleiro, Clérigo, Druida, Guerreiro, Inventor, Ladino, Lutador, Nobre, Paladino. Fontes: [E] e a contagem de 14 classes em outro site de análise.
- **PV e PM confirmados em duas fontes**: Arcanista (8 + CON, +2/nível; PM 6), Cavaleiro (20 + CON, +5/nível; PM 3), Clérigo (16 + CON, +4/nível; PM 5), Druida (16 + CON, +4/nível; PM 4), Guerreiro (20 + CON, +5/nível; PM 3). Fontes [R] e [E].
- **Fixas de perícia** do Arcanista (Misticismo, Vontade), Cavaleiro (Fortitude, Luta), Clérigo (Religião, Vontade), Bardo (Atuação, Reflexos), Guerreiro (Fortitude e Luta ou Pontaria). Fontes [R] e [E] para os primeiros; Bardo e Guerreiro também batem.
- **Círculos de magia**: 2º no nível 6, 3º no nível 10, 4º no nível 14. Fonte: dois artigos da Rotina (Bardo e Druida).
- **Clérigo começa com 3 magias de 1º círculo**: [T] e [E].
- **31 perícias e seus atributos**, com as marcações "só treinado" e "penalidade de armadura". Fonte [E].
- **35 origens** (nomes). Fonte [E]; o número 35 bate com a contagem da página do livro em analog.games (ficha de 2020, "35 origins").
- **Atributos**: 6 atributos; modificador = valor do atributo (fonte [R] e [T]).
- **PV total**: PV inicial + CON no 1º nível; a cada nível soma PV por nível + CON (fonte [R]).
- **Defesa** = 10 + DES + armadura + escudo + outros (fonte [T]).
- **Teste de perícia**: 1d20 + metade do nível + atributo (+ metade do nível se treinada) (fontes [E] e [T]).
- **Versátil (Humano)**: treinado em 2 perícias à escolha (fonte [E]).
- **Minotauro**: Força +2, Constituição +1, Sabedoria −1 (livro p. 25, citado em [I]).
- **Hynne**: Pequeno, deslocamento 6 m (livro p. 28, citado em [I]).
- **Anão** tem visão no escuro (livro p. 20, [I]); **Elfo** tem visão na penumbra (livro p. 22, [I]).

## 3. Não verificado (listado para revisão no livro)

Itens marcados com `NÃO VERIFICADO` ou com `verificado: false` no código. O app mostra avisos sobre eles.

### 3.1 Conflito entre fontes (não calculado)
- **Bardo**: PV inicial e por nível. [R] dá 12 + CON e +3/nível; [E] dá 16 e +4/nível. O app não calcula PV de Bardo (mostra "não calculado"). PM 4/nível e as 8 perícias (2 fixas + 6 livres) estão concordes.

### 3.2 Uma fonte só (calculado, mas marcado como não confirmado)
- PV e PM de Bárbaro (24, +6; PM 3), Bucaneiro (16, +4; PM 3), Caçador (16, +4; PM 4), Inventor (12, +3; PM 4), Ladino (12, +3; PM 4), Lutador (20, +5; PM 3), Nobre (12, +3; PM 4), Paladino (20, +5; PM 4). Todas vêm só de [E].
- Perícias por nível das classes de uma fonte: Bárbaro 4, Bucaneiro 4, Caçador 6, Inventor 4, Ladino 8, Lutador 4, Nobre 4, Paladino 2. Todas de [E].
- Perícias fixas de Bárbaro, Bucaneiro, Caçador, Druida, Inventor, Ladino, Lutador, Nobre e Paladino: NÃO VERIFICADO (o app assume lista vazia).
- Magias conhecidas no 1º nível do Arcanista (3) e do Druida (2): uma fonte cada. Bardo (2): só [R].
- Paladino: [E] diz que ganha magia pelo poder Orar no 2º nível. A condição de conjurador do Paladino não foi confirmada.
- Resistência forte: Clérigo e Paladino NÃO VERIFICADO.

### 3.3 Regras sem fonte confirmada
- **Bônus de perícia não treinada**: o app mostra só o atributo. A regra exata não foi achada.
- **Bônus de treino**: o app usa metade do nível (fontes [E] e [T]). Se o livre disser que treinada soma um valor fixo (ex.: +2), o cálculo muda. Não confirmado.
- **Perícias por nível**: o app usa "X por nível × nível" + INT positiva uma vez. Se a INT positiva valer também em todos os níveis, o app dá poucas perícias. NÃO VERIFICADO.
- **Compra de atributos**: custos 0→0, 1→1, 2→2, 3→4, 4→7, −1 devolve 1; 10 pontos. Fonte única [R]. Não confirmada.
- **PM do conjurador**: o app soma o atributo de magia uma vez ao total (verificado só no nível 1 pela fonte [R], com Clérigo). Nos níveis 2 a 5 é uma suposição.
- **Ajustes de atributo** de Humano, Anão, Elfo e Hynne: NÃO VERIFICADO. O app deixa o ajuste em 0 e o jogador lança manualmente.
- **Tamanho e deslocamento** de Anão e Elfo: NÃO VERIFICADO. O app assume Médio e 9 m (o deslocamento padrão aparece em [I]).
- **Habilidades raciais** do Minotauro: NÃO VERIFICADO.
- **Benefícios específicos de cada origem**: NÃO VERIFICADO. O app deixa o jogador escolher 2 perícias ou 2 poderes (fonte [R]).
- **Dinheiro inicial (T$)**: NÃO VERIFICADO. O app não sugere valor.
- **Quantidade de poderes** por nível: NÃO VERIFICADO. O app não conta poderes.
- **Magias conhecidas e círculo acima do 1º nível**: NÃO VERIFICADO. A generalização do círculo para todos os conjuradores também não foi confirmada (só Bardo e Druida).
- **Atributo de magia do Arcanista**: o app oferece Inteligência (Mago/Bruxo) e Carisma (Feiticeiro); a escolha é do jogador.
- **Aumentos de atributo por nível**: não implementados (NÃO VERIFICADO). O app não tem campo próprio; usar o ajuste manual.

## 4. Lacunas do escopo (não implementado nesta entrega)

- Níveis 6 a 20 (círculos 3 e 4 de magia, aumentos de atributo, poderes por nível).
- Tabelas de armas, armaduras, escudos e equipamentos. O app pede os bônus de armadura e de escudo como números.
- Lista de magias e de poderes do livro.
- Opção de Humano de trocar uma perícia por um poder geral.
- Arcanista (Feiticeiro) e outras subclasses: o app não tem subclasses.
- Descrição completa de habilidades de classe.

## 5. Foundry VTT

Pesquisa na web (foundryvtt.com):

- Existe sistema de Tormenta20 para Foundry: "Tormenta20", de Vizael. A página diz que é **não oficial** e que suporta Foundry 0.7.8 a 14, com as edições "Jogo do Ano" e "Legado". Não traz o formato do ator nem o ID do sistema.
- Existe também o módulo "Tormenta20: Ficha Heroica", de Neutropac, não oficial, para Foundry 13 a 14. Também não traz o formato do ator.
- O repositório DMBerlin/t20-community-patches (issue #57) cita o "Tormenta20 1.6.5" do compêndio do sistema, o que sugere que o sistema usa tipos de item e raça em compêndio. Não foi possível ler o código-fonte do sistema para confirmar os nomes de tipo de ator e os campos.

**Resultado**: `foundry-tormenta20-*.json` é um **rascunho de documento genérico de ator** (tipo `character`), com nomes de campo deste app. **NÃO foi testado em VTT real** e os nomes de campo não foram conferidos com o sistema Tormenta20 do Foundry. O próprio JSON traz o aviso em `flags["tormenta20-builder"].aviso`.

## 6. Como rodar os testes

Na raiz do repositório:

```
node tormenta20/tests/run_all.js
```

Os cinco arquivos `test_*.js` (Node, `vm`, sem dependências) cobrem:

- `test_01_calculos.js`: PV, PM, Defesa, perícias e compra de atributos, com 3 personagens conferidos à mão e casos de borda.
- `test_02_validacao.js`: caso aceito e caso recusado para cada etapa, nos modos estrito e livre.
- `test_03_backup.js`: round trip do backup JSON e recusas (outro sistema, versão 2, JSON inválido).
- `test_04_pdf_foundry.js`: PDF com 2 páginas A4, cor da classe, escape do nome; rascunho de ator Foundry.
- `test_05_release.js`: referências do `index.html`, padrão VF Tools, sem função duplicada, fonte em cada dado, sem `alert()` nem emoji.

Teste de navegador (precisa de Playwright e `/usr/bin/google-chrome`, fora do `run_all.js`):

```
node tormenta20/tests/e2e_chrome.js
```

Percorre a criação de um Clérigo nível 1 em 1100 px e 360 px: confere erros de console, rolagem lateral em cada etapa, recusa no modo estrito, valores derivados, exportação do PDF (2 páginas geradas pelo Chrome) e round trip do backup pela tela. Capturas em `/tmp/t20-capturas`.

Resultado da última execução: todos os testes de Node passam (36 + 42 + 14 + 19 + 19 checagens), e o teste de navegador passa nos dois tamanhos, sem erro de console.

## 7. Não verificado nesta entrega

- Regras contra o livro oficial (não consultado diretamente).
- Foundry VTT real (não testado).
- Impressão física do PDF (só geração pelo Chrome e contagem de páginas).
- Acessibilidade com leitor de tela (só checagens de `role`, `label` e foco).

> **Atualização:** o sistema agora cobre os níveis 1 a 20 e as 17 raças (`TRABALHO_T20_INTEGRACAO.md`). Esta auditoria descreve a primeira entrega (níveis 1 a 5).

## 8. Estado final (rodada de 2026-11-18, com o Livro Básico)

Esta seção vale sobre as seções 3 e 4 acima, que descrevem a primeira entrega.

### 8.1 Aumentos de atributo (item 1 da pendência)
- O livro não tem aumento fixo nos níveis 4, 8, 12, 16 e 20. O Aumento de Atributo é uma opção do Poder de cada classe (p044 no Arcanista; p047-p088 nas demais), a partir do 2º nível, escolhida no nível em que o jogador quiser.
- Regra do livro (p044 e demais classes): +1 em um atributo; pode ser escolhido várias vezes, mas só uma vez por patamar para um mesmo atributo. Patamares (p041): Iniciante 1º-4º, Veterano 5º-10º, Campeão 11º-16º, Lenda 17º-20º. Logo, no máximo +4 por atributo por este poder.
- O livro não traz o limite de 5 citado no pedido: o limite é de um por patamar.
- Implementado: poder "Aumento de Atributo" em `rules-poderes.js` (14 classes, nível 2); campo "Atributo que recebe +1" na etapa Poderes; soma no valor final (`engine.js`: `t20AumentosAplicados`, `t20BonusEscolhas`); validação no validador (etapa 8): atributo obrigatório, nível mínimo 2, uma vez por patamar. Constituição altera os PV retroativamente.
- Testes: `tests/test_14_aumentos.js`.

### 8.2 Escolha de três atributos da raça (pendência NÃO VERIFICADO de ajuste)
- Humano (p025), Sereia/Tritão (p036), Lefou (p030, exceto Carisma) e Osteon (p035, exceto Constituição): +1 em três atributos diferentes à escolha. Agora o app aplica: campo "Atributo 1, 2 e 3" na etapa Atributos, com validação (três distintos, permitidos).
- As bases fixas (Lefou Car -1; Osteon Con -1) já estavam no app.

### 8.3 Itens NÃO VERIFICADO que o Livro Básico resolve (corrigidos)
- Compra de atributos: custos, mínimo -1 e máximo 4 (Tabela 1-1, p023): confirmados (já estavam).
- Bônus de perícia: metade do nível + atributo, +2/+4/+6 se treinada (p120); não treinada não soma bônus de treino. Texto do PDF corrigido.
- Dinheiro inicial: T$ 4d6 (p146). Valor continua digitado; o app não rola. Texto corrigido em `rules.js`, `state.js` e no PDF.
- Raças (ajustes, tamanho, deslocamento, habilidades): já conferidas contra p024-p036 e p112-p113 na rodada anterior.

### 8.4 Poderes de classe: nível e pré-requisito conferidos no livro (rodada de 2026-11-18, tarefa 1)
- Conferência feita contra as listas de cada classe (p044 Arcanista; p048-p050 Bárbaro e Bardo; p053-p057 Bucaneiro e Caçador; p060-p061 Cavaleiro; p063-p064 Clérigo; p068 Druida; p072 Guerreiro; p074-p075 Inventor; p079-p083 Ladino e Lutador; p085-p086 Nobre; p088-p090 Paladino) e contra os poderes gerais e de destino (p132) e concedidos (p133).
- Catálogo (`tormenta20/rules-poderes.js`): 353 poderes. Por tipo: 187 de classe, 90 gerais, 72 concedidos, 4 sem tipo verificado (todos fora do livro).
- Poderes de classe que aparecem no Livro Básico: 101. Verificados (livro confirma nome, nível e pré-requisito): 65. Os outros 36 têm nome e pré-requisito conferidos, mas o livro não dá nível de acesso (marcados com `nota`, `verificado: false`); em 5 deles (Golpe Mágico, Balada Fascinante, Golpe Pessoal, Alquimista Iniciado e Orar) o nível vem só de [E] ou [R], e a nota diz isso.
- Correções de nível e pré-requisito aplicadas: pré-requisitos que faltavam (ex.: Totem Espiritual, Bote, Escaramuça, Escaramuça Superior, Trocação Tumultuosa, Chave, Mestre Alquimista, Heranca Superior, Forma Selvagem Superior); pré-requisitos que estavam errados (Manipular em Massa, Golpe Elemental, Manipular, Danca das Lâminas; Ímpeto estava como poder geral e é de Bárbaro, Caçador e Guerreiro, p048, p057, p072); níveis confirmados no livro (Aura de Cura, Aura Ardente, Trocação, Mestre em Arma etc.).
- Novo poder no catálogo: Esgrima Mágica (Bardo, p050), pré-requisito de Golpe Mágico (p051) e de Dança das Lâminas.
- Poderes fora do Livro Básico: 90 (86 de classe e 4 sem tipo: Camaleão, Truque de Palco, Chefe de Gangue, Dança Marcial). Não aparecem no livro, então não foram inventados: ficam com `foraDoLivro: true`. O app mostra "fora do Livro Básico (não é regra)" na lista e no aviso, e não confere nível nem pré-requisito. Continuam selecionáveis para não quebrar fichas antigas. Lista completa (busca no nome e na lista de classe do livro, p044-p090, e no texto do livro): Agrilhoar os Mortos, Familiar Aprimorado, Ingrediente Especial, Raio Dividido, Familiar Elemental, Contramágica Superior, Trama Célere, Apoteose, Sifão de Mana, Magia Suspensa, Espiritualista, Manifestar Totem, Instinto Indomável, Fúria Elemental, Invocar os Ancestrais, Revide, Instinto Furioso, Enigma do Aço, Regeneração Sobrenatural, Sede Sanguinária, Cicatrizes Ritualísticas, Música: Marcha Vitoriosa, Performance: Crescendo, Artista Versátil, Inspiração Espirituosa, Celebridade Artoniana, Ressoar, Pegou no Chapéu, Remise, Lorotas da Terra e do Mar, Amigo do Passado, Lobo do Mar, Sequência do Predador, Avanço do Predador, Sequência Dilaceradora, Sede de Sangue, Tempestade de Lâminas, Mestre Armadilheiro, Mestre das Posturas, Grão-Mestre, Resiliência Marcial, Inércia do Aço, Investida Ricochete, Mente Disciplinada, Determinação Inabalável, Ordens de Engajamento, Operações Combinadas, Velho de Guerra, Força da Devoção, Arma Divina, Canalizar Poderoso, Presente dos Deuses, Canalizar Abençoado, Canalizar Concentrado, Canalizar Profanado, Missa: Compartilhar Milagre, Representante Divino, Poder Tumular, Arma Tradicional, Companheiro Aberrante, Confluência Elemental, Metamorfose Instantânea, Oráculo da Natureza, Força da Natureza (poder de DB), Golpe de Gênio, Traje de Batalha, Gênio Inovador, Camaleão, Mestre Impostor, Mestre Assassino, Mestre Envenenador, Truque de Palco, Truque Mágico Aprimorado, Assassino em Série, Chefe de Gangue, Rei do Crime, Senhor do Submundo, Ameaça Brutal, Onda de Choque, Dança Marcial, Gingado Elusivo, Invencível, Manto de Batalha, Aura de Arrependimento, Escudo Sagrado, Aura Vingadora, Investida Sagrada, Convicção Heroica, Arma Sacramentada, Hoste Celestial.
- Pendências de nível e tipo que o livro não resolve: Raio Arcano, Pele de Ferro, Força Indomável, Frenesi, Esgrimista, Aparar, En Garde, Ambidestria, Armadilheiro, Bater e Correr, Golpe Pessoal, Missa: Escudo Divino, Abençoar Arma, Canalizar Amplo, Sarado, Inspirar Confiança, Língua de Prata, Montaria Sagrada, Orar e os poderes de Bardo sem nível (Golpe Mágico, Balada Fascinante, Inspiração Marcial, Aumentar Repertório, Paródia). Nível null: o app avisa "nível de acesso NÃO VERIFICADO".
- Tipo de 26 poderes (seção 3.3): o livro descreve a maioria; a conferência de tipo não foi refeita nesta rodada.

### 8.5 Magias conhecidas acima do 1º nível (tarefa 2)
- Regra do livro, por classe: Bardo (p050) e Druida (p067): 2 magias no 1º nível e +1 nos níveis pares. Clérigo (p063): 3 no 1º e +1 a cada nível. Arcanista (p043): 3 no 1º e +1 a cada nível para Bruxo; Feiticeiro +1 só nos níveis ímpares (3º, 5º...); Mago começa com 4 e ganha +1 por nível e +1 a cada novo círculo (5º, 9º, 13º, 17º).
- Implementado: `t20MagiasConhecidasLimite(classe, nivel, caminho)` em `engine.js`; validação na etapa 9 em todos os níveis (`validator.js`); texto da tela e do PDF com o número do nível. Testes: `tests/test_15_livro_poderes_magias.js` (fórmula de 1º a 20º para cada classe e caminho) e `tests/test_01_calculos.js`.
- Mago (p043, resolvido na rodada de PM e linhagem): o livro diz que ele "aprende uma magia adicional daquele círculo" ao ganhar um novo círculo. "Adicional" soma à magia do nível (a regra geral do p043 é "a cada nível, aprende uma magia"). A fórmula do app está correta e não foi alterada.
- Não coberto: magias do Paladino (só pelo poder Orar, p089) não são contadas como magia de classe. (PM por círculo e círculo por nível foram conferidos depois, ver 8.9.)

### 8.6 Humano: troca de perícia por poder geral (tarefa 3, p025)
- Regra do livro: Versátil, treinado em duas perícias à escolha; "você pode trocar uma dessas perícias por um poder geral a sua escolha".
- Implementado: campo `racaTrocaPericia` (state.js). Na etapa Poderes, caixa "Humano: trocar uma das duas perícias..." (`ui.js`). Com a caixa marcada, a etapa Perícias tem uma perícia livre a menos (`engine.js`, `t20PericiasDisponiveis`). O validador exige um poder geral na etapa 8 e recusa a troca para outra raça (etapa 7). O poder geral passa pelos mesmos pré-requisitos dos demais poderes.
- Testes: `tests/test_15_livro_poderes_magias.js`.

### 8.7 Caminhos do Arcanista (tarefa 4, p043)
- Implementado: escolha do caminho (Bruxo, Feiticeiro ou Mago) na etapa 5, campo `caminho` (state.js). O caminho define o atributo de magia (Feiticeiro: Carisma; Bruxo e Mago: Inteligência; p043) e a quantidade de magias conhecidas (8.5). O validador exige o caminho e acusa atributo de magia que não bate com ele.
- Pendências (mecânica nova, não implementada), todas em p043 e p044-p045:
  - Pendências desta parte que continuam fora (ver 8.9): efeitos de combate e de teste (RD do foco, atordoamento, CD de Misticismo, CD das magias da linhagem Feérica e Dracônica), herança Rubra (poder da Tormenta) e a troca de magias do grimório. Custo de aprender magia por escrita (Escriba Arcano, p044) não modelado.

### 8.8 Resultado dos testes (rodada de 2026-11-18)
- `node tormenta20/tests/run_all.js`: 15 arquivos, todos passaram (14 anteriores, com 5 expectativas em 3 arquivos atualizadas para a regra do livro, e 1 arquivo novo).
- `node tormenta20/tests/e2e_chrome.js`: todas as checagens de navegador passaram.
- Fontes: as páginas citadas são do PDF `T20_-_Livro_Básico_-_Jogo_do_Ano.pdf`; o índice do livro bate com `t.split('\f')` + 1.

### 8.9 Caminhos do Arcanista, PM por círculo e linhagens (rodada de 2026-11-18, tarefa 2)
Fontes: p043 (tabela do Arcanista, caminhos Bruxo, Feiticeiro e Mago), p044-p045 (poderes de Arcanista e linhagens sobrenaturais), p176 (Tabela 4-1).

- **PM por círculo (Tabela 4-1, p176)**: 1º = 1 PM; 2º = 3; 3º = 6; 4º = 10; 5º = 15. Verificado no livro. Em `rules-magias.js`, `T20_MAGIAS_PROGRESSAO.custoPorCirculo` (era NÃO VERIFICADO). Engine: `t20CustoPMCirculo`. A etapa 9 mostra o custo base de cada magia escolhida. Teste: todas as magias do catálogo com custo base batem com a tabela.
- **Tabela de magias por nível**: os círculos disponíveis por nível já estavam em `rules-niveis.js` com página (Arcanista p043, Bardo p050, Clérigo p063, Druida p067); o selo passou a apontar para esses dados. Teste: círculo máximo do Arcanista no 4º, 5º, 9º, 13º e 17º nível, e do Clérigo no 4º, 5º e 9º.
- **Cálculo de PM**: o PM total continua vindo do PM por nível de cada classe (verificado em p043 e p063, `rules-niveis.js`). O custo por círculo não entra no PM total: é gasto a cada lançamento. Por isso o app usa a tabela só para mostrar o custo, não para somar PM na ficha.
- **Magia extra do Mago (p043)**: "aprende uma magia adicional daquele círculo" ao ganhar um novo círculo. A fórmula do app (4 no 1º nível; +1 por nível; +1 em cada novo círculo, nos níveis 5, 9, 13 e 17) está correta. Teste: no 5º nível o Mago ganha 2 magias a mais que no 4º; no 6º, ganha 1.
- **Feiticeiro, linhagem (p044-p045)**: escolha da linhagem na etapa 5 (Dracônica, Feérica ou Rubra). A Dracônica pede o tipo de dano (ácido, eletricidade, fogo ou frio). Efeitos aplicados:
  - Dracônica básica: +CAR nos PV iniciais. Superior (poder Herança Superior, 11º nível): +2 x CAR, no lugar do básico. Teste: com CAR 2, a superior soma 4 PV além do PV base (2 x CAR) e a básica soma 2 (CAR).
  - Feérica básica: +1 magia conhecida (a magia de 1º círculo de encantamento ou ilusão). A escola não é conferida pelo app (aviso).
  - Feérica superior: +2 em Carisma no valor final.
  - Rubra: sem efeito numérico no app (depende do poder da Tormenta, que não está no catálogo). Aviso.
  - Fora do caminho de Feiticeiro, a linhagem não é aplicada e gera aviso.
  - Testes: `tests/test_16_feiticeiro_bruxo_mago.js`.
- **Bruxo, foco (p043)**: RD 10 e PV = metade dos PV do personagem. O livro não diz o arredondamento; o app arredonda para baixo (exemplo: 9 PV, foco 4). Mostrado na etapa 9. Fora do app: atordoamento quando o foco é destruído, teste de Misticismo (CD 20 + custo) e recuperação do foco.
- **Mago, grimório (p043)**: memoriza metade das magias conhecidas por dia. O livro dá o exemplo "7 conhecidas, escolhe 3"; o app arredonda para baixo, pelo mesmo exemplo. Mostrado na etapa 9. Fora do app: a troca exige uma hora de estudo e não é controlada.
- **Pendências que o livro não permite fechar no app**: efeitos de combate e de teste (CD das magias das linhagens, Raio Arcano, Foco Vital), herança Rubra (poder da Tormenta), Escriba Arcano (custo de T$ por PM, p044).

Arquivos: `tormenta20/rules-magias.js` (T20_MAGIAS_PROGRESSAO, T20_LINHAGENS), `tormenta20/engine.js` (linhagem, foco, grimório, t20MagiasConhecidasTotal, t20CustoPMCirculo), `tormenta20/validator.js` (etapa 5 e 9), `tormenta20/ui.js` (etapa 5 e 9), `tormenta20/state.js` (linhagem, linhagemDano), `tormenta20/tests/test_08_magias_racas_equip.js` (selo da progressão) e `tormenta20/tests/test_16_feiticeiro_bruxo_mago.js` (novo).

### 8.10 Resultado dos testes (rodada de 2026-11-18, tarefa 4)
- `node tormenta20/tests/run_all.js`: 16 arquivos, todos passaram (15 anteriores e `test_16`, com 33 checagens novas). A expectativa "progressão NÃO VERIFICADO" de `test_08` foi trocada pela verificação do custo por círculo.
- `node tormenta20/tests/e2e_chrome.js`: todas as checagens passaram (sem erro de console em 360 px).
- Renderização das etapas 5 e 9 com cada caminho do Arcanista: sem erro (teste manual via `vm`).
