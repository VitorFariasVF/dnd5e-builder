# Trabalho Xanathar, grupo 2 (Feiticeiro, Guerreiro, Ladino, Mago)

Fonte de verdade: páginas do PDF em PT-BR (renderizadas e lidas como imagem, PDF p033 a p047; a numeração impressa é uma página acima). Checagem web para nomes em inglês, níveis, magias de afinidade e opções de flecha: dnd5e.wikidot.com (`sorcerer:divine-soul`, `sorcerer:shadow-magic`, `fighter:arcane-archer`).

Arquivos alterados: `dnd5e/rules.js`, `dnd5e/rules-engine.js`. Testes sem alteração de asserção (nenhum citava os nomes antigos do grupo). Nada foi commitado.

## Legenda

- **OK**: sem mudança de regra (pode ter ajuste de texto).
- **Aplicado**: corrigido no código.
- **Parcial**: aplicado o que o app consegue representar; o restante está descrito na coluna de ação.
- **Não aplicado**: motivo informado.

## Subclasses renomeadas (nome do livro, id interno mantido)

| Subclasse | App antes | Livro | Ação |
|---|---|---|---|
| Feiticeiro (Alma) | Alma Divina | Alma Favorecida | Aplicado |
| Feiticeiro (Sombra) | Magia Sombria | Adepto das Sombras | Aplicado |
| Feiticeiro (Tempestade) | Magia da Tempestade | Feiticeiro da Tempestade | Aplicado |
| Ladino (Inquiridor) | Inquisitivo | Inquiridor | Aplicado |
| Ladino (Mentor) | Mentor do Crime | Mentor | Aplicado |
| Mago (Guerra) | Magia de Guerra | Mago de Guerra | Aplicado |

## Feiticeiro

### Alma Favorecida (`divine_soul`)

| # | Nível | Item do relatório | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 1 | 1 | Magia Divina | "Magia Divina" | Magia Divina | OK. Descrição ampliada com a afinidade |
| 2 | 1 | Magia de afinidade | Lista com Comando e "Lei"; a opção "Magia favorecida" (Comando) era código morto, sobrescrita por entrada duplicada | Bem: curar ferimentos; Mal: infligir ferimentos; Ordem: benção; Caos: perdição; Neutralidade: proteção contra o bem e o mal. Não conta nas conhecidas | Aplicado. Opções Bem, Mal, Ordem, Caos, Neutralidade; removida a entrada morta; a afinidade concede a magia (`resolveDivineSoulAffinitySpell`, em `rules-engine.js`). "Lei" é aceito como alias de "Ordem" para personagens salvos. Web confirma Lei = Bless e Caos = Bane |
| 3 | 1 | Favorecido pelos Deuses | Nome certo; sem números | 2d4 após falha em salvaguarda ou ataque errado; 1 uso por descanso curto ou longo | Aplicado (texto e recarga) |
| 4 | 6 | Cura Fortalecida | "Cura Empoderada" | Cura Fortalecida: 1 PF para rolar de novo dados de cura, 1 vez por turno | Aplicado (nome e texto) |
| 5 | 14 | Asas Transcendentais | "Asas Sobrenaturais" | Ação bônus, voo de 9 m; cor pela afinidade | Aplicado (nome e texto) |
| 6 | 18 | Recuperação Sublime | "Recuperação Desigual" | Ação bônus abaixo da metade dos PV; recupera metade do máximo; 1 vez por descanso longo | Aplicado (nome e texto) |

### Adepto das Sombras (`shadow`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 7 | 1 | Olhos da Escuridão | Sem alcance | Visão no escuro de 36 m | Aplicado (texto) |
| 8 | 3 | Magia Escuridão | Ausente | Escuridão, não conta nas conhecidas; 2 PF ou espaço de magia | Aplicado. `XANATHAR_SUBCLASS_BONUS_SPELLS` (bloco RULE_AUDITED, que vale no fim da carga), `RULE_SUBCLASS_SPELL_RULES` com tipo `BONUS_KNOWN`. Web confirma Darkness no 3º nível |
| 9 | 1 | Força do Túmulo | Só o nome | Salvaguarda de Carisma CD 5 + dano; não vale para dano radiante nem crítico; 1 vez por descanso longo | Aplicado (texto) |
| 10 | 6 | Cão do Mal Presságio | "Cão do Mau Agouro" | 3 PF, ação bônus, alvo visível a 36 m, cão a 9 m dele, lobo atroz, PV temporários = metade do nível, some a 0 PV ou após 5 min | Aplicado (nome e texto) |
| 11 | 6 | Aspecto do Cão (escolha) | Escolha de 4 aspectos | Não existe no livro; o cão usa estatísticas fixas | Aplicado. Removida a escolha |
| 12 | 14 | Caminhar nas Sombras | "Caminhada Sombria" | Ação bônus, teleporte de 36 m entre luz fraca ou escuridão | Aplicado (nome e texto) |
| 13 | 18 | Forma Umbral | "Forma Umbrosa" | 6 PF, ação bônus, 1 min, resistência a tudo exceto energia e radiante | Aplicado (nome e texto) |

### Feiticeiro da Tempestade (`storm`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 14 | 1 | Orador do Vento | Ausente | Primordial; nível 1 | Aplicado (novo recurso de nível 1) |
| 15 | 1 | Magia Tempestuosa | "Voa brevemente" | Ação bônus, voo de 3 m sem ataque de oportunidade, antes ou depois de magia de 1º círculo ou superior | Aplicado (texto) |
| 16 | 6 | Coração da Tempestade | Descrição vaga | Resistência a elétrico e trovejante; criaturas a 3 m recebem dano igual à metade do nível | Aplicado (texto) |
| 17 | 6 | Guia da Tempestade | Descrição vaga | Ação para parar a chuva numa esfera de 6 m; ação bônus para a direção do vento em 30 m | Aplicado (texto) |
| 18 | 14 | Fúria da Tempestade | Descrição vaga | Reação ao ser atingido em corpo a corpo; dano elétrico igual ao nível; salvaguarda de Força; empurrão de 6 m | Aplicado (texto) |
| 19 | 18 | Alma do Vento | "Voo permanente e o compartilha" | Voo de 18 m; reduz a 9 m por 1 h para 3 + Carisma criaturas; 1 vez por descanso curto ou longo | Aplicado (corrigido o "permanente") |
| 20 | 1 | Sinal da magia da tempestade (escolha) | Escolha de 4 sinais | A tabela de Sinais de Feitiçaria é de interpretação, não característica | Não aplicado: não é regra mecânica; mantido como escolha de interpretação |

## Guerreiro

### Arqueiro Arcano (`arcane_archer`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 21 | 3 | Tradição: proficiência Arcanismo ou Natureza | Escolha existente | Mesma regra | OK |
| 22 | 3 | Tradição: um truque (Prestidigitação ou Druidismo) | Ausente | Truque à escolha | Aplicado. Opção `arcane_archer_cantrip` com `bonusCantrips`, concedida no nível 3 |
| 23 | 3 | Disparo Arcano: 2 opções, 2 usos | Recarga "descanso curto" | 2 usos, recuperados em descanso curto ou longo | Aplicado (recarga corrigida, nos dois lugares) |
| 24 | 3/7/10/15/18 | Número de opções | 2/3/4/5/6 | Mesmos níveis | OK |
| 25 | varia | Lista de 8 opções | Nomes errados e "Flecha Desorientadora" (não existe) | Flecha do Banimento, da Explosão, do Agarrar, do Enfraquecimento, Perfurante, Sombria, da Sedução, Perseguidora | Aplicado. Web confirma os nomes em inglês. Valores salvos com o nome antigo deixam de casar |
| 26 | varia | Efeitos, dados e CD das opções | Ausente | Cada opção tem dados (2d6, 4d6 no 18), salvaguardas e condições | Não aplicado: o app não guarda efeitos por opção. A CD (8 + prof. + Int) entrou na descrição do Disparo Arcano |
| 27 | 7 | Tiro Curvado (redirecionar disparo errado) | "Flecha Curva" | Tiro Curvado: ação bônus, rola de novo contra alvo a 18 m do original | Aplicado. O relatório marcou ILEGÍVEL; a imagem da página confirma o nome e o texto |
| 28 | 7 | Flecha Mágica | Ausente | Faz flecha não mágica virar mágica para superar resistência; some após acertar ou errar | Aplicado (novo recurso de nível 7) |
| 29 | 15 | Disparo Sempre Pronto | Nome certo | Ao rolar iniciativa sem usos, recupera uma utilização | OK (texto ajustado) |
| 30 | 18 | Disparo Arcano aperfeiçoado | "Disparo Arcano Aprimorado" | Seis opções aperfeiçoadas | Aplicado (nome) |

### Cavaleiro (`cavalier`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 31 | 3 | Proficiência em perícia ou idioma | Ausente | Lidar com Animais, História, Intuição, Atuação ou Persuasão, ou idioma | Parcial. Perícia por escolha (`cavalier_bonus_skill`, lida pelo motor). Não aplicado: a opção de idioma, pois o app não tem escolha de idioma nessa concessão |
| 32 | 3 | Nascido para a Sela | "Excelente em montaria" | Vantagem em salvaguardas para não cair; cai em pé até 3 m; montar/desmontar custa 1,5 m | Aplicado (texto) |
| 33 | 3 | Marca Inabalável | Sem números | Marca; desvantagem para outros ataques; ataque extra com dano = metade do nível; usos = mod. de Força (mín. 1), descanso longo | Aplicado (texto). Recurso de uso não entrou no contador da ficha |
| 34 | 7 | Manobra de Proteção | Descrição vaga | Reação; 1d8 na CA; usos = mod. de Constituição (mín. 1), descanso longo | Aplicado (texto). Sem contador |
| 35 | 10 | Mantenha a Formação | "Ataque Feroz" | Ataque de oportunidade ao inimigo que se move 1,5 m; deslocamento do alvo cai a 0 | Aplicado (nome e texto) |
| 36 | 15 | Investida Feroz | Ausente | Andar 3 m, acertar, salvaguarda de Força CD 8 + prof. + Força ou derrubado; 1 vez por turno | Aplicado (novo recurso de nível 15) |
| 37 | 18 | Defensor Vigilante | "Defensor Inquebrável" | Reação extra por turno de cada criatura, só para ataque de oportunidade | Aplicado (nome e texto) |

### Samurai (`samurai`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 38 | 3 | Proficiência em perícia (História, Intuição, Atuação, Persuasão) ou idioma | Rótulo "Perícia de Elegância Cortesã" | Bônus de Proficiência | Parcial. Rótulo corrigido. Idioma não aplicado (sem escolha de idioma no app) |
| 39 | 3 | Espírito Guerreiro | "Espírito de Combate" | Ação bônus; vantagem em ataques com armas no turno; PV temporários 5 / 10 (nível 10) / 15 (nível 15); 3 usos por descanso longo | Aplicado (nome, recurso e texto). PV temporários por nível ficaram na descrição |
| 40 | 7 | Cortesão Elegante | "Elegância Cortesã" no nível 3 (errado) | Nível 7: Persuasão + mod. de Sabedoria; proficiência em salvaguarda de Sabedoria (se já tiver, Inteligência ou Carisma) | Parcial. Nível corrigido (7). Salvaguarda de Sabedoria concedida no nível 7. Não aplicado: a alternativa de Inteligência ou Carisma, por falta de escolha de salvaguarda |
| 41 | 10 | Espírito Incansável | "Tire Força da Morte" | Ao rolar iniciativa sem usos, recupera 1 | Aplicado (nome) |
| 42 | 15 | Golpe Rápido | Nome certo | Troca vantagem por ataque extra; 1 vez por turno | OK |
| 43 | 18 | Força Diante da Morte | "Força antes da Morte" | Reação; adia a queda inconsciente e ganha turno extra; 1 vez por descanso longo | Aplicado (nome, reação e uso) |

## Ladino

### Inquiridor (`inquisitive`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 44 | 3 | Ouvir do Enganador | "Ouvido para Enganos" | Intuição para detectar mentira; d20 de 7 ou menos conta como 8 | Aplicado (nome e regra do 8) |
| 45 | 3 | Olhar do Detalhe | "Olho para Detalhes" | Ação bônus: Percepção ou Investigação | Aplicado (nome) |
| 46 | 3 | Combatente Perspicaz | "Luta Perspicaz" | Ação bônus, Intuição contra Enganação; Ataque Furtivo sem vantagem por 1 min | Aplicado (nome, teste e duração) |
| 47 | 9 | Olhar Constante | "Olho Firme" | Vantagem em Percepção ou Investigação se não se moveu mais da metade do deslocamento | Aplicado (nome e regra) |
| 48 | 13 | Olhar Inflexível | Ausente | Ação; percebe ilusões e metamorfos a 9 m; usos = mod. de Sabedoria (mín. 1), descanso longo | Aplicado (novo recurso de nível 13; sem contador) |
| 49 | 17 | Olhar da Fraqueza | "Sentido para a Fraqueza" | +3d6 de Ataque Furtivo contra alvo estudado | Aplicado (nome e dano) |

### Mentor (`mastermind`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 50 | 3 | Mestre da Intriga | Sem proficiências | Kit de disfarce, kit de falsificação e um jogo à escolha; 2 idiomas; imitar sotaques | Parcial. Kit de disfarce e kit de falsificação concedidos (`RULE_SUBCLASS_PROFICIENCY_GRANTS`). Não aplicado: o jogo à escolha e os 2 idiomas, por falta de escolha nessa concessão |
| 51 | 3 | Mestre de Tática | "Mestre das Táticas" | Ajudar como ação bônus; alcance de 9 m ao ajudar | Aplicado (nome e alcance) |
| 52 | 9 | Manipulador Perspicaz | Nome certo | Compara atributos e nível; o Mestre diz se é igual, superior ou inferior | OK (texto ajustado) |
| 53 | 13 | Redirecionar | "Desvaneio" | Reação; transfere o ataque para criatura a 1,5 m que dá cobertura | Aplicado (nome e mecânica) |
| 54 | 17 | Alma do Enganador | "Alma do Complot" | Proteção contra leitura de mentes; magia de verdade indica sinceridade | Aplicado (nome e mecânica) |

### Batedor (`scout`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 55 | 3 | Escaramuça | "Escaramuçador" | Reação ao fim do turno de inimigo a 1,5 m; move até metade do deslocamento sem ataque de oportunidade | Aplicado (nome e texto) |
| 56 | 3 | Sobrevivente | "Sobrevivencialista"; proficiência concedida | Natureza e Sobrevivência com bônus dobrado | Parcial. Nome e proficiência aplicados. Não aplicado: o bônus dobrado. A especialização existe só para talentos, sem ligação com subclasses |
| 57 | 9 | Mobilidade Superior | Sem +3 m | +3 m de caminhada (e de escalada/natação, se houver) | Aplicado na descrição. Não verifiquei se o app recalcula o deslocamento por subclasse |
| 58 | 13 | Mestre de Emboscada | "Emboscador" | Vantagem em iniciativa; primeiro alvo da 1ª rodada recebe ataques com vantagem | Aplicado (nome e mecânica) |
| 59 | 17 | Golpe Súbito | "Ataque Súbito" | Ataque extra como ação bônus; Ataque Furtivo pode valer de novo se for o único ataque ao alvo | Aplicado (nome e mecânica) |

### Espadachim (`swashbuckler`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 60 | 3 | Passo Elegante | "Pés Ligeiros" | Após ataque corpo a corpo, o alvo não faz ataque de oportunidade contra você até o fim do turno | Aplicado (nome e texto) |
| 61 | 3 | Audácia Devassa | "Audácia" | Carisma na iniciativa; Ataque Furtivo sem vantagem se a condição de duelo valer | Aplicado (nome e texto) |
| 62 | 9 | Penachar | "Panache" | Persuasão contra Intuição; efeito de 1 min | Aplicado (nome e teste) |
| 63 | 13 | Manobra Elegante | Nome certo; mecânica resumida errada | Ação bônus; vantagem no próximo teste de Acrobacia ou Atletismo no turno | Aplicado (texto) |
| 64 | 17 | Mestre Duelista | Nome certo; sem a regra | Repete ataque errado com vantagem; 1 vez por descanso curto ou longo | Aplicado (texto) |

## Mago

### Mago de Guerra (`war_magic`)

| # | Nível | Item | App antes | Livro | Ação |
|---|---|---|---|---|---|
| 65 | 2 | Tradição Arcana: opção Magia de Guerra | Desbloqueio no nível 2 | Mesmo | OK |
| 66 | 2 | Deflexão Arcana | "Desvio Arcano" | Reação: +2 CA ou +4 na salvaguarda; depois só truques até o fim do próximo turno | Aplicado (nome e números) |
| 67 | 2 | Astúcia Tática | "Inteligência Tática" | Soma Inteligência à iniciativa | Aplicado (nome). O dano extra com surto está em Surto de Poder |
| 68 | 6 | Surto de Poder | "Armazena energia" | Máximo = mod. de Int. (mín. 1); descanso longo volta a 1; ganha ao dissipar ou contramágica com sucesso; dano extra = metade do nível | Aplicado (texto). Não criei contador de surtos |
| 69 | 10 | Magia Duradoura | "Manto de Defesa" | +2 CA e em salvaguardas enquanto mantém concentração | Aplicado (nome e números) |
| 70 | 14 | Blindagem Defletora | "Desvio Duradouro" | Ao usar Deflexão, até 3 criaturas a 18 m recebem dano de energia = metade do nível | Aplicado (nome e mecânica) |

## Alterações de código

- `dnd5e/rules.js`: blocos XANATHAR das 11 subclasses do grupo; `SUBCLASS_OPTION_RULES` (Alma Favorecida, Arqueiro Arcano, Samurai, Cavaleiro, remoção do Aspecto do Cão); `ADVANCED_RESOURCE_RULES` (Disparo Arcano, Espírito Guerreiro, Favorecido pelos Deuses); resumo de recursos (Astúcia Tática, Disparo Arcano, Espírito Guerreiro); bloco RULE_AUDITED (Escuridão); caso `guerreiro:cavalier` no switch de perícias.
- `dnd5e/rules-engine.js`: `RULE_SUBCLASS_SPELL_RULES` (Adepto das Sombras, `BONUS_KNOWN`); `resolveDivineSoulAffinitySpell` e `resolveArcaneArcherCantrip`; perícia do Cavaleiro; `RULE_SUBCLASS_PROFICIENCY_GRANTS` (ferramentas do Mentor; salvaguarda de Sabedoria do Samurai no nível 7).

## Verificação

Testes rodados após as alterações:
- `test_subclasses.js`: 66/66 OK
- `test_verificacao_dnd5e.js`: 124/124 OK
- `test_2024_integracao.js`: 46/46 OK
- `test_stage20_release.js`: `failed: []`

Checagem direta das funções novas (carga isolada): afinidade Ordem concede Bênção; "Lei" antigo também; sem escolha não concede nada; Escuridão aparece só no nível 3; truque do Arqueiro concede o escolhido.

## Pendências e riscos

- Personagens salvos com "Lei" continuam funcionando (alias). Personagens salvos com os nomes antigos das flechas (Banidora, Explosiva etc.) perdem a escolha e precisam reescolher.
- Não aplicados por falta de mecanismo no app: efeitos por opção de flecha (26), idioma alternativo do Cavaleiro e do Samurai (31, 38), alternativa de salvaguarda do Cortesão (40), jogo e idiomas do Mentor (50), bônus dobrado do Batedor (56) e a escolha de Sinal (20, que é interpretação).
- Contadores de uso sem recurso próprio na ficha: Marca Inabalável, Manobra de Proteção, Olhar Inflexível e Surto de Poder. As regras estão no texto, mas o app não controla os usos.

## Contagem (70 itens do relatório)

- OK sem mudança de regra: 7 (itens 1, 21, 24, 29, 42, 52, 65)
- Não aplicado: 2 (itens 20 e 26)
- Aplicado: 61, dos quais 5 parciais (31, 38, 40, 50, 56)
- Renomeações de subclasse: 6
