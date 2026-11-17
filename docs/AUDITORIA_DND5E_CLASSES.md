# Auditoria nível a nível: classes do PHB (D&D 5e 2014)

Data: 2026-11-17. Escopo: as 12 classes do Livro do Jogador 2014 (Bárbaro, Bardo, Bruxo, Clérigo, Druida, Feiticeiro, Guerreiro, Ladino, Mago, Monge, Paladino, Patrulheiro), níveis 1 a 20. Arquivos auditados: `dnd5e/rules.js`, `dnd5e/rules-engine.js`. Teste: `dnd5e/tests/test_stage23_classes.js`.

## Fontes e limites

- Referência principal: **SRD 5.1** (licença OGL 1.0a), lida pelos espelhos de tabela de classe: `5e.d20srd.org/srd/classes/` (monk, ranger, fighter, rogue, paladin, barbarian, cleric, sorcerer, warlock, druid) e `dnd-wiki.org/wiki/SRD5:Bard` e `SRD5:Wizard`.
- As tabelas foram lidas por um resumo automático das páginas (WebFetch). Os valores foram cruzados entre si e com o motor, mas **uma amostragem manual nas páginas originais é recomendada** antes de fechar a fase 2.
- Não se copiou texto de livro. As descrições novas são frases curtas em palavras próprias.
- Nomes em português seguem a tela atual do D&D; onde a SRD só tem nome em inglês, o nome em português é do próprio projeto.

## O que foi conferido por classe

Legenda: OK = conferido contra a SRD e coerente com o código depois das correções. PARCIAL = conferido em parte; ver a seção de pendências. Dado de vida e salvaguardas foram conferidos para todas as classes.

| Classe | Dado de vida e salvaguardas | Aumentos de atributo | Características por nível | Recursos (usos e recarga) | Espaços e magias | Nível de subclasse | Estado |
|---|---|---|---|---|---|---|---|
| Bárbaro | d12; For, Con (OK) | 4/8/12/16/19 (OK no motor e na lista) | OK após correção | Fúria 2/3/4/5/6 nos níveis 1/3/6/12/17 (OK) | n/a | 3 (OK) | OK |
| Bardo | d8; Des, Car (OK) | 4/8/12/16/19 (OK) | Corrigido (ver abaixo) | Inspiração: mod. Car, descanso curto a partir do 5 (OK) | Conhecidas 4 a 22 e truques 2/3/4 (OK) | 3 (OK) | OK |
| Bruxo | d8; Sab, Car (OK) | 4/8/12/16/19 (OK) | Corrigido (ver abaixo) | Espaços de pacto 1/2/3/4 nos níveis 1/2/11/17, círculo 1º a 5º (OK); Arcanum 6º a 9º nos níveis 11/13/15/17 (OK) | Conhecidas 2 a 15 e truques 2/3/4 (OK) | 1 (OK) | OK |
| Clérigo | d8; Sab, Car (OK) | 4/8/12/16/19 (OK) | Corrigido (3º uso de Canalizar Divindade) | Canalizar Divindade 1/2/3 nos níveis 2/6/18, descanso curto (OK) | Truques 3/4/5 (OK); fórmula de preparadas do motor, não reconferida | 1 (OK) | PARCIAL (fórmula de preparadas) |
| Druida | d8; Int, Sab (OK) | 4/8/12/16/19 (OK) | Corrigido | Forma Selvagem 2 usos no 2, ilimitada no 20 (OK) | Truques 2/3/4 (OK); fórmula de preparadas do motor, não reconferida | 2 (OK) | PARCIAL (fórmula de preparadas) |
| Feiticeiro | d6; Con, Car (OK) | 4/8/12/16/19 (OK) | Corrigido | Pontos = nível a partir do 2, descanso longo (OK) | Conhecidas 2 a 15 e truques 4/5/6 (OK) | 1 (OK) | PARCIAL (Restauração, ver pendências) |
| Guerreiro | d10; For, Con (OK) | 4/6/8/12/14/16/19 (OK) | Corrigido | Segundo Fôlego 1 uso, não reconferido; Surto 1/2 nos níveis 2/17; Indomável 1/2/3 nos níveis 9/13/17 (OK) | n/a | 3 (OK) | PARCIAL (Segundo Fôlego) |
| Ladino | d8; Des, Int (OK) + Sab no 15 (corrigido) | 4/8/10/12/16/19 (OK) | Corrigido | Ataque Furtivo por turno (sem contagem) | n/a | 3 (OK) | PARCIAL (dados de Ataque Furtivo não conferidos no motor) |
| Mago | d6; Int, Sab (OK) | 4/8/12/16/19 (OK) | Corrigido | Recuperação Arcana 1 uso, descanso longo (OK) | Preparadas (6 + 2 por nível, OK); truques: ver pendências | 2 (OK) | PARCIAL (truques) |
| Monge | d8; For, Des (OK) | 4/8/12/16/19 (OK) | Corrigido | Ki = nível a partir do 2, descanso curto (OK) | n/a | 3 (OK) | OK |
| Paladino | d10; Sab, Car (OK) | 4/8/12/16/19 (OK) | Corrigido | Cura pelas Mãos 5 x nível (OK); Canalizar 1 no nível 3 (OK); Sentido Divino 1 + mod. Car, não reconferido | Espaços de meio-conjurador: corrigidos no nível 2 e 3 (ver abaixo) | 3 (OK) | PARCIAL (Sentido Divino) |
| Patrulheiro | d10; For, Des (OK) | 4/8/12/16/19 (OK) | Corrigido | Sentido Primevo a partir do 3 (OK) | Magias conhecidas: corrigidas nos níveis 2 e 3 (ver abaixo) | 3 (OK) | OK |

Observação de cálculo: o dano de Fúria (+2, +3, +4 nos níveis 1, 9 e 16) e o dado de Inspiração de Bardo (d6, d8, d10, d12 nos níveis 1, 5, 10 e 15) já estavam certos no motor, e o teste confere os dois.

## Correções feitas

**Tabelas de espaços e magias**
- `rules.js`, `SPELL_SLOTS.half`: nos níveis 2 e 3 os espaços de 1º círculo estavam 0. Corrigido para 2 e 3, que é o valor da SRD. O motor (`RULE_SPELL_SLOTS.half`) já estava certo, então a divergência só aparecia na tela.
- `rules.js`, `SPELLCASTERS.patrulheiro.magias`: nos níveis 2 e 3 estava 0. Corrigido para 2 e 3 magias conhecidas. O motor (`knownSpellProgression`) já tinha 2 e 3.

**Características que não existem no PHB (removidas)**
- Mago nível 5, "Magias mais poderosas". No PHB o nível 5 do mago só libera o 3º círculo, sem característica nomeada.
- Druida nível 5, "Aprimoramento de Conjuração". Não existe no PHB.
- Feiticeiro nível 5, "Mais Pontos de Feitiçaria" e "Pontos de Feitiçaria ampliados". O aumento de pontos é o valor da tabela, já coberto pela fórmula do recurso.

**Características que faltavam na lista (incluídas)**
- Bardo: Dado de Inspiração d10 (nível 10) e d12 (nível 15); Segredos Mágicos nos níveis 14 e 18; Canção de Descanso d8 (9), d10 (13) e d12 (17). O nome "Segredos Mágicos Superiores" do nível 18 foi trocado pelo nome da SRD.
- Guerreiro: Indomável com 2 usos (13) e 3 usos (17); Surto de Ação com 2 usos (17).
- Monge: Movimento sem Armadura aprimorado (9).
- Mago: Traço da tradição no nível 14.
- Feiticeiro: Metamagia adicional no nível 17.
- Clérigo: terceiro uso de Canalizar Divindade no nível 18.
- Druida: Traço do círculo nos níveis 6 e 14.
- Paladino: Auras aprimoradas (18).
- Patrulheiro: melhoria de Inimigo Favorito e Explorador Nato (6), de Explorador Nato (10) e de Inimigo Favorito (14).

**Aumentos de Valor de Habilidade na lista**
- Faltavam nos níveis 8, 12, 16 e 19 (e nos demais níveis de Guerreiro e Ladino). O motor já aplicava os níveis certos, sem duplicar nada: `RULE_ASI_LEVELS` em `rules-engine.js`. A lista agora deriva desse mesmo quadro, então tela e regra não podem divergir. Não foi criado um segundo caminho de concessão.

**Motor**
- Ladino nível 15, Mente Escorregadia: ganha proficiência em salvaguarda de Sabedoria. Antes o motor só usava as salvaguardas de nível 1 (`resolveClassGrants` em `rules-engine.js`).

## Pendências (não corrigido, ou não verificado)

**Lacunas conhecidas no motor**
- Feiticeiro nível 20 (Restauração Feiticeira): a SRD permite recuperar pontos em descanso curto. O motor só recarrega pontos em descanso longo. Não corrigido; exige regra de recarga por tipo de descanso no recurso.
- Bardo, Canção de Descanso: o dado (d6 a d12) aparece na lista, mas o motor não o calcula para os PV recuperados. Não corrigido.
- Ladino, Ataque Furtivo: a SRD dá a progressão de dados (1d6 no 1, +1d6 nos níveis ímpares, até 10d6 no 19). A tabela foi conferida, mas o motor não foi verificado nesta rodada.
- Bruxo, contagem de invocações (2 no 2, 3 no 5, 4 no 7, 5 no 9, 6 no 12, 7 no 15, 8 no 18): a lista traz só o nível 2 e o nível 5. Não verificado no motor.

**Dados sem fonte confirmada nesta rodada**
- Sentido Divino (1 + mod. Car), Segundo Fôlego (1 uso por descanso curto) e a fórmula de magias preparadas de Clérigo, Druida e Mago (nível + mod. do atributo): o motor aplica, mas as páginas consultadas não trouxeram essas regras. Não reconferidos.
- Mago, truques: a fonte consultada (dnd-wiki SRD5:Wizard) trazia valores inconsistentes nos níveis 2 a 4. O motor usa 3 truques nos níveis 1 a 3, 4 nos níveis 4 a 9 e 5 nos níveis 10 a 20, sem confirmação de fonte. O teste não cobre esse trecho.
- Quantidade de perícias escolhidas e listas de perícias, proficiências de armadura, arma e ferramenta, e equipamento inicial: não foram reconferidos nesta rodada. Continuam como estão no `CLASSES`.
- Monge, dado de Artes Marciais (d4, d6, d8, d10 nos níveis 1, 5, 11 e 17): não há contagem no motor. Não verificado.
- Nível 3 do Patrulheiro (Sentido Primevo): o nível confere; a mecânica de gastar espaço de magia não foi conferida em texto.
- Subclasses: só os níveis de escolha foram conferidos. As características de subclasse (caminhos, domínios, círculos, juramentos, tradições, patronos) e as tabelas de conjuração de Cavaleiro Místico e Trapaceiro Arcano não foram conferidas.
- Dados de lista com nomes genéricos (ex.: "Traço do círculo", "Traço da tradição") são placeholders de nível. Os nomes específicos da subclasse ficam para a fase de subclasses.
- Duplicatas cosméticas: "Ataque Extra" e "Ataques por ação: 2" aparecem juntos nos níveis 5 do Guerreiro, Monge, Paladino e Patrulheiro. Não afetam cálculo, mas poluem a lista. Não mexido.

## Como rodar

```
cd dnd5e && node tests/test_stage23_classes.js
```

Todos os testes da pasta (saída com código 0 quando tudo passa):

```
cd dnd5e && for f in tests/*.js; do node "$f" || echo "FALHOU $f"; done
```

Resultado da última rodada: 6 arquivos de teste, todos com código 0. O arquivo novo tem 308 verificações.
