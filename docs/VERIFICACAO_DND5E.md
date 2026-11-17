# Verificação independente de regras: D&D 5e (2014 + Xanathar)

Data: 2026-11-17. Revisor independente da auditoria `docs/AUDITORIA_DND5E_CLASSES.md`, sem confiar nela.
Arquivos alterados: `dnd5e/rules.js`, `dnd5e/rules-engine.js`, `dnd5e/tests/test_stage23_classes.js` (um teste ajustado), `dnd5e/tests/test_verificacao_dnd5e.js` (novo), este documento.

## Legenda de resultado

- **ok**: valor do app confere com a SRD 5.1 ou com duas fontes.
- **corrigido**: valor errado, alterado neste ciclo, com teste.
- **divergente (não corrigido)**: confirmado em fonte, mas o conserto exige mudança fora de `rules*.js` (tela, `ui.js`) ou acrescentar dados de características que não foram pesquisadas por completo.
- **não verificado**: não foi possível conferir por fonte nesta rodada. Valor do app mantido.

Fontes consultadas (somente mecânica, sem texto de livro):
- SRD 5.1 (espelho): `https://5e.d20srd.org/srd/classes/barbarian.htm`, `cleric.htm`, `druid.htm`, `paladin.htm`, `fighter.htm`, `monk.htm`, `rogue.htm`, `sorcerer.htm`, `warlock.htm`; raças: `https://5e.d20srd.org/srd/races.htm`.
- dnd-wiki (SRD 5.1): `https://dnd-wiki.org/wiki/SRD5:Thief`, `https://dnd-wiki.org/wiki/SRD5:Wizard`, `https://dnd-wiki.org/wiki/SRD5:Bard`.
- Roll20 (compêndio dnd5e): `https://roll20.net/compendium/dnd5e/Wizard`, `/Ranger`, `/Druid`, `/Classes:Sorcerer?expansion=34047`, `/Subclasses:Eldritch%20Knight?expansion=32231`.
- Wikidot dnd5e: `https://dnd5e.wikidot.com/wizard`, `/cleric` (só nomes de domínios), `/paladin` (só nomes de juramentos), `/warlock:great-old-one`, `/monk:four-elements`, `/sorcerer:wild-magic`, `/rogue:thief`, `/rogue:arcane-trickster`, `/fighter:eldritch-knight`, `/ranger`. A página geral `/warlock` não abriu (fora da lista permitida), então não foi usada.
- Antecedentes (PHB 2014, dois sites): `https://arcaneeye.com/players/dnd-backgrounds/`, `https://dungeonmister.com/guides/backgrounds-dnd-5e-2014/`.
- Grande Antigo (dois sites): `https://dnd5e.wikidot.com/warlock:great-old-one`, `https://arcaneeye.com/class-guides/Warlock/great-old-one-Warlock-5e/`.

Observação sobre fontes: o resumo automático de `ranger.htm` na SRD trouxe a lista de perícias do Guerreiro. A lista correta do Patrulheiro veio de Roll20 e Wikidot. A página `dnd-wiki SRD5:Wizard` leu o truque do nível 3 de forma ambígua e trouxe "Escolha 1" para perícias do Mago, contrariando as outras fontes. Esses casos foram decididos pela maioria das fontes.

## 1. Perícias de classe (item 2)

| Item | Valor no app | Valor na fonte | Fontes | Resultado |
|---|---|---|---|---|
| Bárbaro: perícias | 2 de Adestrar Animais, Atletismo, Intimidação, Natureza, Percepção, Sobrevivência | 2 da mesma lista | SRD (barbarian) | ok |
| Bardo: perícias | 3 de qualquer perícia | 3 de qualquer perícia | SRD 5.1 (dnd-wiki Bard) | ok |
| Bruxo: perícias | 2 de 7 | 2 de Arcanismo, Enganação, História, Intimidação, Investigação, Natureza, Religião | SRD (warlock) | ok |
| Clérigo: perícias | 2 de 5 | 2 de História, Intuição, Medicina, Persuasão, Religião | SRD (cleric) | ok |
| Druida: perícias | 2 de 8 | 2 de Arcanismo, Adestrar Animais, Intuição, Medicina, Natureza, Percepção, Religião, Sobrevivência | SRD (druid) | ok |
| Feiticeiro: perícias | 2 de 6 | 2 de Arcanismo, Enganação, Intuição, Intimidação, Persuasão, Religião | SRD (sorcerer) | ok |
| Guerreiro: perícias | 2 de 8 | 2 de Acrobacia, Adestrar Animais, Atletismo, História, Intuição, Intimidação, Percepção, Sobrevivência | SRD (fighter) | ok |
| Ladino: perícias | 4 de 11 | 4 de 11 (mesma lista) | SRD (rogue) | ok |
| Mago: perícias | 2 de 6 | 2 de Arcanismo, História, Intuição, Investigação, Medicina, Religião | Roll20 Wizard; Wikidot wizard | ok |
| Monge: perícias | 2 de 6 | 2 de Acrobacia, Atletismo, História, Intuição, Religião, Furtividade | SRD (monk) | ok |
| Paladino: perícias | 2 de 6 | 2 de Atletismo, Intuição, Intimidação, Medicina, Persuasão, Religião | SRD (paladin) | ok |
| Patrulheiro: perícias | 3 de 8 | 3 de Adestrar Animais, Atletismo, Intuição, Investigação, Natureza, Percepção, Furtividade, Sobrevivência | Roll20 Ranger; Wikidot ranger | ok |
| Armaduras, armas e ferramentas das 12 classes (texto em `CLASSES`) | conferido por classe | mesmo conteúdo da SRD (bardo: três instrumentos; ladino: ferramentas de ladrão; monge: uma ferramenta de artesão ou instrumento; druida: kit de herbalismo; mago e feiticeiro: sem armadura) | SRD (cada classe) | ok |
| Druida: restrição de armadura | texto "Armaduras leves, médias, Escudos", sem a restrição | Druidas usam armadura leve e média e escudo, mas não de metal | SRD (druid); Roll20 Druid | divergente (não corrigido: o texto é usado para casar categorias no motor; a restrição precisa de campo próprio) |
| Mago: ferramentas e armadura | sem ferramenta, sem armadura | sem ferramenta, sem armadura | SRD (dnd-wiki Wizard) | ok |

## 2. Truques e fórmula de magias preparadas (item 3)

| Item | Valor no app | Valor na fonte | Fontes | Resultado |
|---|---|---|---|---|
| Mago: truques por nível | 3 (níveis 1 a 3), 4 (4 a 9), 5 (10 a 20) | 3, 3, 3, 4 ... 4, 5 ... 5 | Roll20 Wizard; Wikidot wizard. dnd-wiki SRD5:Wizard ambígua no nível 3 | ok |
| Mago: magias preparadas | nível + mod. Int, mínimo 1 | Int + nível do mago, mínimo 1 | SRD (dnd-wiki Wizard); Roll20 Wizard | ok |
| Clérigo: preparadas | nível + mod. Sab, mínimo 1 | Sab + nível do clérigo, mínimo 1 | SRD (cleric) | ok |
| Druida: preparadas | nível + mod. Sab, mínimo 1 | Sab + nível do druida, mínimo 1 | SRD (druid) | ok |
| Paladino: preparadas | metade do nível (para baixo) + mod. Car, mínimo 1 | metade do nível, para baixo, + mod. Car, mínimo 1 | SRD (paladin) | ok |
| Truques do Clérigo e do Druida | Clérigo 3/4/5; Druida 2/3/4 | iguais aos valores do teste de classes da auditoria anterior; não reconferidos nesta rodada | — | não verificado |
| Sentido Divino: usos | 1 + mod. Car, descanso longo | 1 + mod. Car | não verificado nesta rodada (página SRD não trouxe a característica) | não verificado |
| Segundo Fôlego: uso e recarga | 1 uso; recarga "Descanso curto" | 1 uso; recarga em descanso curto ou longo | SRD (fighter) | corrigido (texto da recarga em `rules.js`, linhas 836 e 859; teste ajustado; a tela já recarrega com "curto" e "longo", então o comportamento de jogo não muda) |

## 3. Restauração Feiticeira (item 4)

| Item | Valor no app | Valor na fonte | Fontes | Resultado |
|---|---|---|---|---|
| Feiticeiro nível 20: Restauração Feiticeira | característica listada; recurso recarrega só em descanso longo | ao terminar descanso curto, recupera 4 pontos de feitiçaria gastos, no nível 20 | SRD (sorcerer, d20srd); Roll20 Sorcerer | corrigido no motor: nova função `getSorceryPointsShortRestRecovery` em `rules-engine.js` (4 no nível 20, 0 antes), com teste. Pendência: a tela (`ui.js`, função `restaurarRecursosClasse`) ainda não aplica os 4 pontos no descanso curto. Fora da área permitida a este revisor |

## 4. Espaços de magia e magias conhecidas (item 6)

| Item | Valor no app | Valor na fonte | Fontes | Resultado |
|---|---|---|---|---|
| Conjurador completo (amostra: níveis 1, 3, 5, 9, 11, 13, 15, 17, 20) | tabela de `SPELL_SLOTS.full` | igual à SRD | SRD (teste de classes e teste novo) | ok |
| Meio-conjurador (amostra: níveis 2, 3, 5, 9, 11, 13, 17, 19, 20) | tabela de `SPELL_SLOTS.half` | igual à SRD | SRD (paladin, ranger) | ok |
| Bruxo: espaços de pacto e círculo | 1/2/2/.../3 no 11/4 no 17; círculo 1º a 5º | igual à SRD | SRD (warlock) | ok |
| Bardo, Bruxo, Feiticeiro, Patrulheiro: magias conhecidas e truques | tabelas em `RULE_CLASS_SPELLCASTING` | iguais à SRD | SRD (bard, warlock, sorcerer, ranger) | ok |
| Cavaleiro Místico: truques (2 do 3 ao 9; 3 do 10) | `RULE_SUBCLASS_SPELLCASTING` | 2 do nível 3 ao 9; 3 do 10 ao 20 | Wikidot Eldritch Knight; Roll20 Eldritch Knight | ok |
| Cavaleiro Místico: magias conhecidas (3 no 3; 13 no 20) | igual | 3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13 | Wikidot; Roll20 | ok |
| Cavaleiro Místico: espaços de 1/3 conjurador | `RULE_SPELL_SLOTS.third` (2 no 3; 4-2 no 7; 4-3-2 no 13; 4-3-3-1 no 19) | iguais | Wikidot; Roll20 | ok |
| Trapaceiro Arcano: truques (3 do 3 ao 9; 4 do 10) | `RULE_SUBCLASS_SPELLCASTING` | iguais | Wikidot rogue:arcane-trickster | ok (fonte única; o Wikidot é fonte de comunidade, a confirmar no livro) |
| Trapaceiro Arcano: magias conhecidas | igual ao cavaleiro | 3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13 | Wikidot rogue:arcane-trickster | ok (fonte única, mesma ressalva) |
| Cavaleiro Místico e Trapaceiro Arcano: escolha de subclasse na lista | ausentes de `SUBCLASS_OPTIONS`; só existem na tabela de conjuração | os dois são subclasses do PHB | Wikidot; SRD | divergente (não corrigido: a tela não oferece as subclasses) |

## 5. Ladino, Ladrão (item 1)

| Item | Valor no app | Valor na fonte | Fontes | Resultado |
|---|---|---|---|---|
| Ladrão: nível 3 | Mãos Rápidas; Trabalho de Segundo Andar | iguais | SRD dnd-wiki Thief; Wikidot rogue:thief | ok |
| Ladrão: nível 9 | Uso de Dispositivos Mágicos | Furtividade Suprema | SRD dnd-wiki Thief; Wikidot rogue:thief | corrigido (`COMPLETE_SUBCLASS_FEATURE_PATCH`, `rules.js` linha 856) |
| Ladrão: nível 13 | Reflexos do Ladrão | Uso de Dispositivos Mágicos | SRD dnd-wiki Thief; Wikidot | corrigido (mesma linha) |
| Ladrão: nível 17 | Escalada Suprema | Reflexos do Ladrão; não existe "Escalada Suprema" no Ladrão | SRD dnd-wiki Thief; Wikidot | corrigido (mesma linha) |

## 6. Subclasses (item 1)

| Item | Valor no app | Valor na fonte | Fontes | Resultado |
|---|---|---|---|---|
| Clérigo: domínios do PHB | Vida, Guerra (mais Forja e Sepultura, do Xanathar) | PHB traz Conhecimento, Vida, Luz, Natureza, Tempestade, Trapaça e Guerra | Wikidot cleric (cada domínio marcado como PHB); SRD mostra só Vida | divergente (não corrigido: faltam cinco domínios e suas características; não pesquisados por completo nesta rodada) |
| Clérigo: Vida e Guerra (níveis e nomes) | 1, 2, 6, 8, 17 | não reconferido nos níveis e nomes de cada característica | Wikidot cleric trouxe só os nomes dos domínios | não verificado |
| Paladino: juramentos do PHB | Devoção, Vingança | PHB traz Anciões, Devoção e Vingança | Wikidot paladin | divergente (não corrigido: falta Juramento dos Anciões e suas características) |
| Bruxo: patronos do PHB | Arquifada, Imundo (Demônio), e Xanathar: Celestial, Lâmina Maldita | PHB traz Arquifada, Demônio e Grande Antigo | SRD (warlock: The Fiend); Wikidot warlock:great-old-one | divergente (não corrigido: falta Grande Antigo). Arquifada não foi conferida por fonte nesta rodada |
| Bruxo: Grande Antigo (níveis e nomes) | ausente | 1 Mente Desperta; 6 Guarda Entrópica; 10 Escudo do Pensamento; 14 Criar Escravo | Wikidot warlock:great-old-one; arcaneeye (duas fontes) | divergente (não corrigido: a característica não existe no app) |
| Monge: tradições do PHB | Mão Aberta, Sombras (mais Mestre Bêbado, Kensei, Alma Solar, do Xanathar) | PHB traz Mão Aberta, Sombras e Quatro Elementos | SRD (monk: Open Hand); Wikidot monk:four-elements (Quatro Elementos). Sombras conferida só de memória | divergente (não corrigido: falta Quatro Elementos) |
| Monge: Quatro Elementos (níveis) | ausente | 3 Discípulo dos Elementos; 3 Sintonia Elemental (disciplina inicial); novas disciplinas nos níveis 6, 11 e 17 | Wikidot monk:four-elements | divergente (não corrigido: ausente; fonte única) |
| Feiticeiro: Magia Selvagem (nível 1) | Maré do Caos | Surto de Magia Selvagem e Maré do Caos, ambas no nível 1 | Wikidot sorcerer:wild-magic | divergente (não corrigido: falta "Surto de Magia Selvagem"; fonte única) |
| Feiticeiro: Magia Selvagem (níveis 6, 14, 18) | Dobrar a Sorte (6); Caos Controlado (14); Bombardeio de Magias (18) | Bend Luck 6; Controlled Chaos 14; Spell Bombardment 18 | Wikidot sorcerer:wild-magic | ok (em nome; a mecânica não foi conferida) |
| Mago: escolas do PHB | Evocação, Abjuração (mais Magia de Guerra, do Xanathar) | PHB traz oito escolas: Abjuração, Conjuração, Adivinhação, Encantamento, Evocação, Ilusão, Necromancia e Transmutação | dnd-wiki SRD5:Wizard (lista de escolas) | divergente (não corrigido: seis escolas faltam; fonte única) |
| Guerreiro: Campeão e Mestre de Batalha (níveis) | campeão 3, 7, 10, 15, 18; mestre de batalha 3, 7, 10, 15, 18 | não conferido por fonte nesta rodada (a página SRD do guerreiro, consultada, não trouxe as subclasses) | SRD (fighter) | não verificado |
| Demais subclasses (Bárbaro, Bardo, Druida, Ladino Assassino, Monge Sombras e Mão Aberta, Paladino, Patrulheiro, Feiticeiro Dracônico) | níveis e nomes como no app | não conferidos por fonte nesta rodada | — | não verificado |
| Guerreiro: Cavaleiro Místico na lista | ausente de `SUBCLASS_OPTIONS` | PHB traz Cavaleiro Místico | Wikidot fighter:eldritch-knight | divergente (ver seção 4) |

## 7. Raças (item 5)

| Raça | Bônus no app | Bônus na SRD | Deslocamento | Idiomas | Tamanho | Resultado |
|---|---|---|---|---|---|---|
| Anão | Constituição +2 | Constituição +2 | 25 (app) / 25 (SRD) | Comum, Anão | Médio na SRD | ok (tamanho não modelado) |
| Elfo | Destreza +2 | Destreza +2 | 30 / 30 | Comum, Élfico | Médio | ok (tamanho não modelado) |
| Halfling | Destreza +2 | Destreza +2 | 25 / 25 | Comum, Halfling | Pequeno | ok (tamanho não modelado) |
| Humano | +1 em todos | +1 em todos | 30 / 30 | Comum, + um à escolha | Médio | ok |
| Draconato | Força +2, Carisma +1 | Força +2, Carisma +1 | 30 / 30 | Comum, Dracônico | Médio | ok |
| Gnomo | Inteligência +2 | Inteligência +2 | 25 / 25 | Comum, Gnômico | Pequeno | ok (tamanho não modelado) |
| Meio-Elfo | Carisma +2 | Carisma +2, e +1 em dois outros atributos à escolha | 30 / 30 | Comum, Élfico, + um à escolha | Médio | divergente (não corrigido: os dois +1 de escolha não existem no motor nem na tela) |
| Meio-Orc | Força +2, Constituição +1 | Força +2, Constituição +1 | 30 / 30 | Comum, Orc | Médio | ok (tamanho não modelado) |
| Tiefling | Inteligência +1, Carisma +2 | Inteligência +1, Carisma +2 | 30 / 30 | Comum, Infernal | Médio | ok |

Tamanho: o app não tem campo de tamanho em `RACES`. Não é erro de valor, mas é uma lacuna de modelagem (não corrigida).

## 8. Antecedentes (item 5)

Todos os treze antecedentes foram conferidos contra as duas fontes (arcaneeye e dungeonmister): perícias, ferramentas e idiomas extras coincidem. Teste novo em `dnd5e/tests/test_verificacao_dnd5e.js`.

| Antecedente | Perícias | Ferramentas | Idiomas extras | Resultado |
|---|---|---|---|---|
| Acólito | Intuição, Religião | — | 2 | ok |
| Artista | Acrobacia, Atuação | Kit de disfarce, instrumento musical | 0 | ok |
| Charlatão | Enganação, Prestidigitação | Kit de disfarce, kit de falsificação | 0 | ok |
| Criminoso | Enganação, Furtividade | Ferramentas de ladrão, jogo | 0 | ok |
| Eremita | Medicina, Religião | Kit de herbalismo | 1 | ok |
| Forasteiro | Atletismo, Sobrevivência | instrumento musical | 1 | ok |
| Herói do Povo | Adestrar Animais, Sobrevivência | Ferramentas de artesão, veículos terrestres | 0 | ok |
| Artesão de Guilda | Intuição, Persuasão | Ferramentas de artesão | 1 | ok |
| Marinheiro | Atletismo, Percepção | Ferramentas de navegador, veículos aquáticos | 0 | ok |
| Nobre | História, Persuasão | jogo | 1 | ok |
| Órfão | Prestidigitação, Furtividade | Kit de disfarce, ferramentas de ladrão | 0 | ok |
| Sábio | Arcanismo, História | — | 2 | ok |
| Soldado | Atletismo, Intimidação | jogo, veículos terrestres | 0 | ok |

Os nomes das características dos antecedentes também conferem nas duas fontes (Abrigo dos Fiéis, Popularidade, Identidade Falsa, Contato Criminoso, Descoberta, Andarilho, Hospitalidade Rústica, Membro de Guilda, Privilégio de Posição, Segredos da Cidade, Pesquisador, Passagem de Navio, Patente Militar).

## 9. Lacunas que ficaram de fora desta rodada

- Subclasses: Clérigo (cinco domínios), Paladino (Anciões), Bruxo (Grande Antigo), Monge (Quatro Elementos), Mago (seis escolas), Feiticeiro (Surto de Magia Selvagem), Guerreiro (Cavaleiro Místico) e Ladino (Trapaceiro Arcano) faltam em `SUBCLASS_OPTIONS`. Os dados de conjuração do Cavaleiro e do Trapaceiro existem no motor, mas não são alcançáveis pela lista.
- Tela: Restauração Feiticeira precisa de chamada em `ui.js`; o Meio-Elfo precisa de escolha de dois +1 em `ui.js`.
- Sentido Divino, Cura pelas Mãos, Ataque Furtivo e dados de Artes Marciais do Monge: não verificados nesta rodada.
- Exportação VTT (`export.js`, linha 1371): usa só "curto" para decidir a recuperação. Com o novo texto "Descanso curto ou longo", o Segundo Fôlego continua saindo como `sr` apenas. Não alterado (fora da área deste revisor).

## Como rodar

```
cd dnd5e && for f in tests/*.js; do node "$f" || echo "FALHOU $f"; done
```

Resultado da última rodada: 7 arquivos de teste, todos com código 0. `test_stage23_classes.js` com 308 verificações; `test_verificacao_dnd5e.js` com 124.
