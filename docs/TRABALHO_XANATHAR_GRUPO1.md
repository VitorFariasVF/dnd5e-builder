# Trabalho Xanathar, grupo 1 (Bárbaro, Bardo, Bruxo, Clérigo, Druida)

Base: relatório `/tmp/xgte/relatorio_1.md`, conferido contra a imagem das páginas do PDF do Guia de Xanathar (numeração p0NN = página do PDF). Regra aplicada: só alterar com confirmação na imagem, coerência com a progressão padrão do 5e e, para listas de magias, confirmação em fonte oficial em inglês.

Texto das características escrito de novo, sem cópia do livro.

## Contagens

| Status no relatório | Itens | Resultado |
|---|---|---|
| DIVERGE | 19 | 19 aplicados |
| AUSENTE NO APP | 17 | 17 aplicados (Truques Adicionais só na descrição, ver ressalva) |
| ILEGÍVEL | 2 | 1 resolvido sem alteração (recarga), 1 não aplicado (dado do Escudo Espiritual) |
| OK | 53 | sem alteração |

Confirmação de fonte para lista de magias: Celestial, expanded spell list (Xanathar's Guide), em dnd5e.wikidot.com/warlock:celestial: 1º Cure Wounds, Guiding Bolt; 2º Flaming Sphere, Lesser Restoration; 3º Daylight, Revivify; 4º Guardian of Faith, Wall of Fire; 5º Flame Strike, Greater Restoration.

## Tabela de itens

| Item | App antes | Livro (p.) | Ação |
|---|---|---|---|
| Guardião Ancestral 10, Consultar os Espíritos | "orientação espiritual e magia ritual temática" | Augúrio ou clarividência sem espaço nem componentes, usando Sabedoria; depois, 1 uso por descanso curto ou longo (p009) | Aplicado (texto) |
| Guardião Ancestral 14, Ancestrais Vingativos | "reflete parte do dano de um inimigo marcado" | Atacante sofre dano de energia igual ao valor que o Escudo Espiritual reduziu (p009) | Aplicado (texto) |
| Arauto da Tempestade 14, Fúria Tempestuosa | "aura passa a punir inimigos" | Tempestade Furiosa: reação por ambiente. Deserto: salvaguarda de Destreza, fogo igual à metade do nível de bárbaro. Mar: salvaguarda de Força, derrubada. Tundra: salvaguarda de Força, deslocamento 0 (p010) | Aplicado (nome e texto) |
| Caminho do Zelote (id `zealot`) | "Caminho do Zelote" | Caminho do Fanático (p010) | Aplicado (nome; id mantido) |
| Caminho do Fanático 3, Fúria Divina | "dano extra sagrado" | 1d6 + metade do nível de bárbaro, necrótico ou radiante (escolha ao adquirir), no primeiro acerto de arma por turno em fúria (p010) | Aplicado (texto) |
| Colégio do Glamour 6, Manto da Majestade | "comanda inimigos com presença dominante" | Ação bônus para conjurar Comando sem espaço, aparência por 1 min; Comando como ação bônus sem espaço; 1 uso por descanso longo (p014) | Aplicado (texto) |
| Colégio das Espadas 3, Proficiências | "proficiências marciais e estilo" | Armadura média e cimitarra (p015). O motor já concede o correto (RULE_SUBCLASS_PROFICIENCY_GRANTS, bardo:swords) | Aplicado (texto; nome Proficiência Bônus) |
| Colégio das Espadas 3, Estilo de Luta | ausente na descrição (a escolha Duelo ou Combate com Duas Armas já existia em SUBCLASS_OPTION_RULES) | Duelo ou Combate com Duas Armas; não repetir estilo (p015) | Aplicado (nova característica) |
| Colégio dos Sussurros 14, Trapaça Sombria | "redireciona a agressão de um inimigo" | Conhecimento das Sombras: sussurro a até 9 m, salvaguarda de Sabedoria, encanto por 8 h; 1 uso por descanso longo (p015) | Aplicado (nome e texto) |
| Celestial 1, Truques Adicionais | ausente | Luz e chama sagrada, sem contar no limite de truques conhecidos (p018) | Aplicado só na descrição. O motor aceita um único tipo de regra por subclasse e não tem balde de truques para o Celestial: não concede os truques |
| Celestial 6, Alma Radiante | "soma Carisma a curas e certos danos" | Resistência a dano radiante; Carisma soma ao dano radiante ou de fogo de magia (p018) | Aplicado (texto e título derivado em rules.js) |
| Celestial, magias de 3º círculo (nível de bruxo 5) | Luz do Dia, Bola de Fogo | Luz do Dia, Revivificar (p017 e fonte em inglês) | Aplicado no bloco efetivo (RULE_AUDITED_SUBCLASS_BONUS_SPELLS_STAGE12) |
| Lâmina Maldita 1, Guerreiro Hex | "usa Carisma com certas armas e ganha armaduras" | Guerreiro Maldito: armadura média, escudos e armas marciais; Carisma em arma sem duas mãos até o fim do descanso longo (p018) | Aplicado (nome e texto; título derivado em rules.js) |
| Lâmina Maldita 1, frequência da Maldição (ILEGÍVEL no relatório) | Descanso curto, 1 uso | "não pode usar essa característica novamente até terminar um descanso curto ou longo" (p018, recorte ampliado) | Sem alteração: o app já está correto |
| Bruxo, Invocações Místicas (14 novas) | nenhuma das 14 | Aperto de Hadar, Arma de Pacto Aprimorada, Aspecto da Lua, Dádiva das Profundezas, Destruição Mística, Fuga do Escapista, Lança da Letargia, Maldição Enlouquecedora, Maldição Incansável, Manto de Moscas, Olhar Fantasmagórico, Presente dos Sempre Vivos, Sudário das Sombras, Túmulo de Levisto (p020 e p021) | Aplicado em CLASS_OPTION_RULES: 14 opções com pré-requisito no rótulo e efeito curto no campo `efeito`. O campo `efeito` não é exibido pela interface |
| Forja 1, Proficiência Bônus | motor: só armadura pesada | Armadura pesada e ferramentas de ferreiro (p023) | Aplicado: ferramenta de ferreiro em RULE_SUBCLASS_PROFICIENCY_GRANTS (rules-engine.js) e característica nova |
| Forja 2, Canalizar Divindade: Artesanato | "forja itens simples de metal rapidamente" | Canalizar Divindade: Benção do Artesão. Ritual de 1 hora, item com metal, até 100 po (p024) | Aplicado (nome e texto) |
| Forja 8, Golpe Divino | "dano ígneo extra" | Impacto Divino: 1 vez por turno, 1d8 de fogo extra no acerto; 2d8 no 14º (p024) | Aplicado (nome e texto) |
| Forja 17, Santo da Forja e do Fogo | "resistente a fogo e aço" | Santo da Forja e Fogo: imunidade a fogo; resistência a dano cortante, de concussão e perfurante de ataques não mágicos com armadura pesada (p024) | Aplicado (nome e texto) |
| Sepultura 1, Círculo da Mortalidade | "curas em alvos caídos ficam muito mais fortes" | Dados de cura no valor máximo ao restaurar PV de criatura a 0 PV; truque Estabilizar (9 m, ação bônus, não conta no limite) (p025) | Aplicado (texto). O truque Estabilizar não está na lista de magias do app: não foi concedido |
| Sepultura 2, Caminho para a Sepultura | "marca um alvo para sofrer dano aumentado" | Canalizar Divindade: Caminho da Sepultura. Maldição a 9 m; próximo ataque deixa o alvo vulnerável ao dano desse ataque (p025) | Aplicado (nome e texto) |
| Sepultura 6, Sentinela na Porta da Morte | "anula acertos críticos de inimigos" | Reação para você e criatura visível a 9 m; crítico vira normal; usos = mod. de Sabedoria (p025) | Aplicado (texto). Os usos não são controlados pelo app (ver observações) |
| Sepultura 8, Golpe Potente | "truques ofensivos recebem dano extra" | Conjuração Potente: mod. de Sabedoria ao dano de qualquer truque (p025) | Aplicado (nome e texto) |
| Círculo dos Sonhos 14, Passeador Onírico | "escapa de golpes com magia feérica" | Caminhante dos Sonhos: após descanso curto, sonho, vidência ou círculo de teleporte sem espaço nem componentes; 1 uso por descanso longo (p027) | Aplicado (nome e texto) |

## Não aplicado

- **Guardião Ancestral 6, dado do Escudo Espiritual (ILEGÍVEL).** A tabela (p008) diz 2d8 no 6º nível e o texto (p009) diz 2d6. O livro se contradiz e o app não tem o dado. Não alterado.

## Observações (fora do escopo deste relatório)

- Controle de usos: o ADVANCED_RESOURCE_RULES não tem entradas para barbaro:*, bardo:*, clerigo:forge e clerigo:grave. Olhos da Sepultura e Sentinela na Porta da Morte (usos = Sabedoria) não são controlados. Não alterado.
- Bloco antigo de XANATHAR_SUBCLASS_BONUS_SPELLS (rules.js, primeira definição, ~linha 243) ainda tem Bola de Fogo para o Celestial e nomes em inglês. É sobrescrito pelo bloco RULE_AUDITED_*. Não alterado.
- Grafia "Floresio" no app (o livro diz "Floreio"). Não alterado.
- docs/TRABALHO_DND5E_2024.md (linha 27) cita "Caminho do Zelote" em contexto de 2024. Não alterado.
- Círculo do Pastor (Druida) não está no relatório; não foi conferido.

## Testes

Rodados sem falhas: `tests/test_subclasses.js` (66/66), `tests/test_verificacao_dnd5e.js` (124/124), `tests/test_2024_integracao.js` (46/46), `tests/test_stage20_release.js`. Nenhuma asserção precisou ser atualizada: nenhum teste citava os valores ou nomes alterados.
