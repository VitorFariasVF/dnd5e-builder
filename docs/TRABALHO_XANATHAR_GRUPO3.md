# Trabalho Xanathar, grupo 3: Monge, Paladino, Patrulheiro e talentos raciais

Fonte do relatório: `/tmp/xgte/relatorio_3.md`. Fontes de conferência: imagens das páginas do PDF (`pdftoppm`, 100 dpi) e fontes em inglês (dnd5e.wikidot.com, dnd-wiki.org, World Anvil). Numeração de páginas: "PDF p." é o número da página do arquivo, que é o mesmo do `pNNN` do relatório. Nesta edição, a página impressa é PDF + 1.

Legenda da ação: **Aplicado** (corrigido no app), **Não aplicado** (motivo indicado), **OK** (já conferia), **Removido** (opção sem base no livro).

## Resumo

Contagem por linha de tabela deste documento (o relatório agrupava alguns itens em uma linha, por isso os totais não batem com os 78 itens do relatório):

| Grupo | Linhas | Aplicado | Removido | Não aplicado | OK |
|---|---|---|---|---|---|
| Monge (3 caminhos) | 17 | 15 | 0 | 1 | 1 |
| Paladino (2 juramentos) | 16 | 11 | 2 | 2 | 1 |
| Patrulheiro (3 arquétipos) | 24 | 17 | 3 | 0 | 4 |
| Talentos raciais | 15 | 13 | 0 | 0 | 2 |
| **Total** | **72** | **56** | **5** | **3** | **8** |

Os "Não aplicado" de cada grupo estão listados na seção "Não aplicados (resumo)". Os outros dois itens não aplicados, a regra de "1 corpo a corpo + 1 à distância" do Kensei e o efeito de rolagem de Precisão Élfica, aparecem nas linhas correspondentes. Os itens de talento que pedem efeito de jogo (rolagem, ação, descanso) entram no catálogo com o nome, o pré-requisito, o bônus de atributo e as características, mas o motor não executa o efeito. É o mesmo padrão dos talentos já existentes (`elven_accuracy`, `expertise_choice`).

## Monge

### Caminho do Mestre Bêbado (`rules.js`, linha do `drunken_master`)

| Item | App antes | Livro (PDF p. 50) | Ação |
|---|---|---|---|
| Técnica Bêbada (3) | "Rajada concede Esquiva e movimento" | Rajada de Golpes concede Desengajar e +3 m de deslocamento até o fim do turno | Aplicado |
| Balanço Bêbado (6) | "Bêbado da Sorte", sem custo de ki nem alcance | Levantar-se com 3 m; Redirecionar Ataque com 1 ki, reação, alvo a 1,5 m | Aplicado (nome e mecânica) |
| Sorte do Bêbado (11) | "Passos do Bêbado" no 11 | 2 ki para cancelar desvantagem | Aplicado |
| Frenesi do Bêbado (17) | Ausente; o 17 do app era "Sorte do Bêbado" | Até 3 ataques extras de Rajada, cada um contra alvo diferente | Aplicado |

### Caminho do Kensei

| Item | App antes | Livro (PDF p. 50-51) | Ação |
|---|---|---|---|
| Armas Kensei (3), 2 armas | Lista fixa de 10 armas | Qualquer arma simples ou marcial sem propriedades pesada e especial; arco longo válido | Aplicado: lista ampliada para 26 armas (todas as elegíveis). Regra "1 corpo a corpo + 1 à distância" não aplicada: exige validação no motor |
| Armas extras (6, 11, 17) | Só o 6 (count 1) | +1 arma Kensei em 6, 11 e 17 (totais 3, 4 e 5) | Aplicado (opções 11 e 17 criadas) |
| Esquiva Rápida (3) | Ausente | Ataque desarmado com arma Kensei corpo a corpo: +2 de CA até o próximo turno | Aplicado |
| Tiro do Kensei (3) | Ausente | Ação bônus: acertos à distância com arma Kensei causam +1d4 do tipo da arma, até o fim do turno | Aplicado |
| Caminho do Pincel (3) | Só Suprimentos de Caligrafia | Caligrafia OU Ferramentas de Pintor, à escolha | Não aplicado: a proficiência é fixa em `RULE_SUBCLASS_PROFICIENCY_GRANTS`; exige escolha no motor. O texto da característica já cita as duas opções |
| Uno com a Lâmina (6) | "Um com a Lâmina" | "Uno com a Lâmina": armas Kensei contam como mágicas | Aplicado (nome) |
| Golpe Habilidoso (6) | Ausente | 1 ki ao acertar com arma Kensei: dano extra igual ao dado de Artes Marciais, 1 vez por turno | Aplicado |
| Aguçar a Lâmina (11) | "Afiar a Lâmina", sem números | Ação bônus, até 3 ki; bônus igual ao ki gasto em ataque e dano, por 1 min | Aplicado |
| Precisão Infalível (17) | "Repete uma falha de ataque" | Repete um ataque errado com arma de monge, 1 vez por turno | OK (texto ajustado) |

### Caminho da Alma Solar

| Item | App antes | Livro (PDF p. 52) | Ação |
|---|---|---|---|
| Raio Solar Radiante (3) | "Rajada Solar Radiante", sem alcance nem custo | Ataque à distância de 9 m, radiante, Destreza, dado de Artes Marciais; 1 ki para segundo ataque | Aplicado (nome) |
| Golpe do Arco Abrasador (6) | "Golpe Solar Consumidor", efeito diferente | 2 ki para conjurar Mãos Flamejantes como ação bônus; cada ki extra +1 nível, até metade do nível de monge | Aplicado |
| Explosão Calcinante (11) | "Escudo Solar" no 11 | Ação; orbe a 45 m; esfera; salvaguarda de Constituição; 2d6 radiante; até +3 ki (+2d6 cada) | Aplicado (nome e nível). **Raio da esfera não incluído**: o livro diz 8 m e a fonte em inglês diz 20 pés (6 m). Divergência não resolvida |
| Escudo Solar (17) | "Explosão Solar" no 17 | Luz plena de 9 m mais 9 m de penumbra; reação: 5 + mod. de Sabedoria de dano radiante | Aplicado |

## Paladino

### Juramento da Conquista

| Item | App antes | Livro (PDF p. 54-55) | Ação |
|---|---|---|---|
| Magias de juramento, níveis 3/5/9/13/17 | 3/5/9/13/17 | Tabela impressa: 3/7/15/18/20 | **Não aplicado**: erro de impressão do livro. A fonte em inglês (Armor of Agathys, Hold Person, Bestow Curse, Dominate Beast, Cloudkill) confirma 3/5/9/13/17 |
| Presença Conquistadora (3) | "Assusta criaturas ao redor" | Canalizar Divindade, ação; 9 m; salvaguarda de Sabedoria; medo por 1 min, repetido ao fim de cada turno da criatura | Aplicado |
| Ataque Guiado (3) | Ausente | Canalizar Divindade: +10 em uma rolagem de ataque, após ver o resultado | Aplicado |
| Aura da Conquista (7) | Sem valor do dano | Aura de 3 m; amedrontado tem deslocamento 0 e sofre dano psíquico igual à metade do nível de paladino | Aplicado |
| Aura da Conquista (9 m) (18) | Ausente | Alcance sobe para 9 m | Aplicado |
| Repreensão Arrogante (15) | "Desprezo Ardente" | Dano psíquico igual ao mod. de Carisma (mínimo 1) a quem atinge você | Aplicado (nome e valor) |
| Conquistador Invencível (20) | Nome e nível OK; sem números | Ação, 1 min: resistência a todo dano, ataque extra, crítico em 19-20; 1 vez por descanso longo | Aplicado (números) |
| Manifestação da Conquista (escolha, 4 opções) | Escolha inexistente | Não existe. As opções do Canalizar Divindade são fixas | Removido (`conquest_presence_style`) |

### Juramento da Redenção

| Item | App antes | Livro (PDF p. 55-56) | Ação |
|---|---|---|---|
| Magias de juramento | 3/5/9/13/17 | Tabela impressa: 3/7/15/18/20 | **Não aplicado**: erro de impressão (fonte em inglês: Hold Monster e Wall of Force no 17) |
| Emissário da Paz (3) | "Amplia Persuasão e diplomacia" | Ação bônus: +5 em Persuasão por 10 min | Aplicado |
| Repreendendo a Violência (3) | "Repreender o Violento" | Reação, 9 m: salvaguarda de Sabedoria; falha: dano radiante igual ao causado; sucesso: metade | Aplicado |
| Aura do Guardião (3 m) (7) | Sem alcance | Reação: recebe no lugar da criatura o dano; o dano não pode ser reduzido | Aplicado |
| Aura do Guardião (9 m) (18) | Ausente | Alcance sobe para 9 m | Aplicado |
| Espírito Protetor (15) | "Regenera-se quando está ferido" | Fim do turno em combate com PV abaixo da metade: 1d6 + metade do nível de paladino | Aplicado |
| Emissário da Redenção (20) | OK | Resistência a dano e reflexo de radiante pela metade do dano recebido | OK (texto ajustado) |
| Tom do Emissário da Redenção (escolha, 4 opções) | Escolha inexistente | Não existe | Removido (`redemption_emissary_style`) |

## Patrulheiro

### Perseguidor Obscuro (`gloom_stalker`)

| Item | App antes | Livro (PDF p. 58-59) | Ação |
|---|---|---|---|
| Nome da subclasse | "Andarilho das Sombras" | "Perseguidor Obscuro" | Aplicado |
| Magias 3/5/9/13/17 | Disfarçar-se, Truque de Corda, Medo, Invisibilidade Maior, Similaridade | Igual | OK |
| Emboscador Terrível (3) | "Emboscador Assombroso" sem iniciativa nem 1d8 | Iniciativa + mod. de Sabedoria; no 1º turno, +3 m e um ataque extra com +1d8 | Aplicado |
| Visão Umbral (3) | Sem alcance | Visão no escuro de 18 m (ou +9 m se já tiver) | Aplicado |
| Mente de Ferro (7) | OK | Salvaguarda de Sabedoria | OK (regra de "já tem" incluída no texto) |
| Agitação Perseguidora (11) | "Rajada do Perseguidor" | 1 vez por turno, erro com arma vira outro ataque com arma | Aplicado (nome) |
| Evasiva Sombria (15) | "Esquiva Sombria", efeito vago | Reação: desvantagem para o atacante sem vantagem | Aplicado |
| Estilo do Emboscador Assombroso (escolha) | Escolha de 4 opções | Não existe | Removido (`gloom_ambush_style`) |

### Andarilho do Horizonte (`horizon_walker`)

| Item | App antes | Livro (PDF p. 58-59) | Ação |
|---|---|---|---|
| Magias 3/5/9/13/17 | Igual ao livro | Igual | OK |
| Detectar Portais (3) | "Detectar Portal", sem alcance nem uso | Ação; portal a até 1,5 km; 1 vez por descanso curto ou longo | Aplicado |
| Guerreiro Planar 1d8 (3) | "Converte dano em força", sem alcance nem ação | Ação bônus; criatura a 9 m; próximo acerto com arma vira dano de energia com +1d8 | Aplicado |
| Passo Etéreo (7) | OK, sem números | Ação bônus; Forma Etérea sem espaço; 1 vez por descanso | Aplicado (números) |
| Ataque Distante (11) | "Golpe Distante", sem ataque extra | Teleporte de 3 m antes de cada ataque; ataque extra se atingir duas criaturas | Aplicado |
| Guerreiro Planar 2d8 (11) | Ausente | O dado passa a 2d8 | Aplicado |
| Defesa Espectral (15) | "Reduz dano por deslocamento planar" | Reação: resistência a todo dano daquele ataque | Aplicado |
| Foco planar (escolha) | Escolha de 4 opções | Não existe | Removido (`horizon_planar_focus`) |

### Exterminador de Monstros (`monster_slayer`)

| Item | App antes | Livro (PDF p. 59-60) | Ação |
|---|---|---|---|
| Nome da subclasse | "Matador de Monstros" | "Exterminador de Monstros" | Aplicado |
| Magias 3/5/9/13/17 | 3 Proteção, 5 Zona da Verdade, 9 Círculo Mágico, 13 Banimento, 17 Imobilizar Monstro | Imagem: 3, 5, 9 e 13 iguais. A linha do 17 aparece como "11º" | Não alterado: o 17 do app está certo. O "11º" é erro de impressão. A linha do 5, que o relatório marcou como ILEGÍVEL, está legível na imagem e confere |
| Sentido do Caçador (3) | Sem alcance nem usos | Ação, 18 m; usos = mod. de Sabedoria (mínimo 1); recupera em descanso longo | Aplicado |
| Exterminador de Presas (3) | "Nêmesis do Matador" | Ação bônus, 18 m; +1d6 no primeiro acerto por turno | Aplicado (nome e mecânica) |
| Defesa Sobrenatural (7) | Sem valor | +1d6 em salvaguardas contra a presa e em testes de escape | Aplicado |
| Nêmesis do Conjurador (11) | "Contra-Magia do Nêmesis" | Reação, 18 m; salvaguarda de Sabedoria contra a CD; 1 vez por descanso curto ou longo | Aplicado |
| Contra-Ataque do Exterminador (15) | "Matança do Matador" | Reação: ataque com arma contra a presa antes da salvaguarda | Aplicado |
| Presa prioritária (escolha de 5 tipos) | Lista de 5 tipos | Qualquer criatura visível a 18 m, escolhida a cada uso | Removido (`monster_slayer_prey`) |

## Talentos raciais (`rules-engine.js`, `RULE_XANATHAR_RACIAL_FEATS`)

Página de origem: PDF p. 72-75 (impressa 73-75). Os nomes em inglês foram conferidos pela lista de talentos raciais de World Anvil (Squat Nimbleness, Dwarven Fortitude, Dragon Hide, Dragon Fear, Drow High Magic, Wood Elf Magic, Fey Teleportation, Fade Away, Bountiful Luck, Flames of Phlegethos, Infernal Constitution, Orcish Fury).

| Talento | App antes | Livro | Ação |
|---|---|---|---|
| Agachamento Ágil | Ausente | Anão, Gnomo ou Halfling; +1 Força ou Destreza (máx. 20); +1,5 m; Acrobacia ou Atletismo | Aplicado (proficiência com opção Acrobacia/Atletismo) |
| Fortitude Anã | Ausente | Anão; +1 Constituição; Esquivar + Dado de Vida | Aplicado |
| Couro de Dragão | Ausente | Draconato; +1 Força, Constituição ou Carisma; CA 13 + Destreza; garras 1d4 | Aplicado |
| Temor Dracônico | Ausente | Draconato; +1 Força, Constituição ou Carisma; rugido CD 8 + prof. + Carisma | Aplicado |
| Alta Magia Drow | Ausente | Elfo drow; atributo Carisma; Detectar Magia à vontade; Levitação e Dissipar Magia 1 vez | Aplicado (sub-raça não verificada pelo motor) |
| Magia do Elfo da Floresta | Ausente | Elfo da floresta; atributo Sabedoria; truque de druida; Passos Largos e Passos sem Pegadas | Aplicado (sub-raça não verificada) |
| Precisão Élfica | Pré-requisito e bônus OK; efeito ausente | Vantagem com esses atributos: rola de novo um dado do ataque | OK no cadastro. Efeito de rolagem não implementado (fora do escopo de dados) |
| Teleporte das Fadas | Ausente (ILEGÍVEL no relatório) | Elfo alto; +1 Inteligência ou Carisma; Sylvan; Passo Nebuloso 1 vez por descanso longo | Aplicado. A imagem resolveu o trecho cortado |
| Desvanecer | Ausente | Gnomo; +1 Destreza ou Inteligência; reação: invisível após dano; 1 vez por descanso curto ou longo | Aplicado |
| Boa Sorte | Ausente | Halfling; reação: aliado a 9 m refaz um teste | Aplicado |
| Segunda Chance | Destreza, Constituição ou Carisma | Halfling; +1 Constituição ou Carisma | Aplicado (Destreza removida) |
| Prodígio | OK | Humano, meio-elfo ou meio-orc; perícia, ferramenta, idioma e especialização | OK |
| Chamas de Phlegethos | Ausente | Tiefling; +1 Inteligência ou Carisma; rerola 1 no dano de fogo; chamas 1d4 | Aplicado |
| Constituição Infernal | Ausente (ILEGÍVEL no relatório) | Tiefling; +1 Constituição; resistência a frio e veneno; vantagem contra envenenamento | Aplicado. A imagem resolveu o valor |
| Fúria Orc | Ausente | Meio-orc; +1 Força ou Constituição; rerola dado de dano 1 vez por descanso | Aplicado |

## Não aplicados (resumo)

1. Magias de juramento do paladino (Conquista e Redenção): erro de impressão do PDF. O app está certo em 3/5/9/13/17.
2. Monstros: "11º" na linha de Imobilizar Monstro do Exterminador. Erro de impressão. O app está certo em 17.
3. Explosão Calcinante: raio da esfera (livro 8 m; fonte em inglês 20 pés). Divergência não resolvida.
4. Caminho do Pincel: exige escolha de ferramenta no motor.
5. Kensei: regra de 1 arma corpo a corpo e 1 à distância não é validada pelo motor.

## Testes

- `node dnd5e/tests/test_subclasses.js`: 66/66 OK
- `node dnd5e/tests/test_verificacao_dnd5e.js`: 124/124 OK
- `node dnd5e/tests/test_2024_integracao.js`: 46/46 OK
- `node dnd5e/tests/test_stage20_release.js`: todas as verificações OK
- Extras: `test_stage16.js`, `test_racas.js` e `test_stage23_classes.js` também passaram (308/308 no último).

Nenhuma asserção foi alterada.
