# Trabalho D&D 5e: subclasses do PHB (2014)

Arquivos desta frente: `dnd5e/rules-subclasses.js`, `dnd5e/tests/test_subclasses.js`, este documento.
Teste: `cd dnd5e && node tests/test_subclasses.js` (66 verificações, código != 0 se falhar).

## Entrou
- **Cavaleiro Místico** (Guerreiro, chave `eldritch_knight`): 3, 3, 7, 10, 15, 18. Duas fontes.
- **Trapaceiro Arcano** (Ladino, chave `arcane_trickster`): 3, 3, 9, 13, 17. Duas fontes.
- **Grande Antigo** (Bruxo, chave `great_old_one`): 1, 1, 6, 10, 14, com magias expandidas. Duas fontes.
- **Caminho dos Quatro Elementos** (Monge, chave `four_elements`): 3, 6, 11, 17 (disciplinas por nível). Duas fontes.
- **Juramento dos Anciões** (Paladino, chave `ancients`): 3, 3, 3, 7, 15, 20, com magias do juramento. Duas fontes.
- **Domínios do Clérigo** (chaves `knowledge`, `light`, `nature`, `tempest`, `trickery`): características e magias de domínio. Fonte única, marcadas NÃO VERIFICADO.
- **Escola de Ilusão** (Mago, chave `illusion`): cinco características. Fonte única, NÃO VERIFICADO.
- **Magia Selvagem**: faltava o Surto de Magia Selvagem (1º nível). Adicionado, NÃO VERIFICADO.
- **Totem (Urso)**: faltava o Buscador de Espíritos (3º nível). Adicionado, NÃO VERIFICADO.

## Já estava no motor (rules-engine.js), conferido
- Cavaleiro Místico e Trapaceiro Arcano: magias conhecidas por nível (3 a 20), truques (2/3 e 3/4) e espaços de conjurador de terço conferem com a tabela da fonte. Os testes checam isso.
- Campeão, Mestre da Batalha, Berserker, Totem, Caçador e Mestre das Feras: faixas de nível (3, 7, 10, 15, 18 e 3, 7, 11, 15) e ordem dos nomes conferem com a SRD 5.1. Níveis item a item não tiveram segunda fonte.

## Ficou de fora
- **Escolas do Mago**: Adivinhação, Conjuração, Encantamento, Necromancia e Transmutação. Só achei os nomes e a estrutura (Savant e uma característica no 2º nível, depois 6º, 10º e 14º). Faltam as descrições e os níveis de cada uma. Não preenchi de memória.
- **Domínios de Vida e Guerra**: já existiam no código e não foram revisados nesta frente. Não há magias de domínio para eles em `XANATHAR_SUBCLASS_BONUS_SPELLS`.
- **Disciplinas do Caminho dos Quatro Elementos**: as 16 disciplinas com custo de ki e nomes em português não entraram. Só estão listadas as quantidades por nível.
- **Teto de ki do Caminho dos Quatro Elementos** (3 a 6 conforme o nível de monge): só achei numa fonte, não entrou.

## NÃO VERIFICADO (fonte única ou nome sem conferência)
- Domínios do Clérigo: todos os níveis e magias (fonte: dnd5e.wikidot.com). Os nomes em inglês batem com dnd-wiki.org, mas esse site não trouxe níveis nem magias.
- Escola de Ilusão: níveis e mecânica (fonte: dnd5e.wikidot.com).
- Surto de Magia Selvagem e Buscador de Espíritos: fonte única (dnd5e.wikidot.com).
- Nomes em português de todas as características novas são tradução própria; falta conferir com o livro em português.
- Nomes de magias que não aparecem no motor (por exemplo Nondetecção, Crescimento Vegetal, Onda de Trovão, Estilhaçar, Telecinesia): tradução própria. Os nomes usados nas listas precisam bater com SPELL_LISTS para que a magia seja escolhível.
- Patrono ínfero do Bruxo, chamado "O Corruptor" no arquivo: nome em português não conferido.

## Pendências fora deste escopo (precisam de rules-engine.js ou rules.js)
- O motor liga magias sempre preparadas só para Forja, Sepultura e os dois juramentos já existentes em `RULE_SUBCLASS_SPELL_RULES`. As magias de domínio novas e as do Juramento dos Anciões entram no resumo de magias extras (`XANATHAR_SUBCLASS_BONUS_SPELLS`), mas não viram preparadas automaticamente. As chaves `knowledge`, `light`, `nature`, `tempest`, `trickery` e `paladino:ancients` precisam de regra no motor.
- Magias expandidas do Grande Antigo: as chaves estão em `XANATHAR_SUBCLASS_BONUS_SPELLS` por nível de Bruxo (1, 3, 5, 7, 9). O motor de Bruxo não as usa ainda.
- `test_export_vtt.js` (outra frente) falha com `aplicarRacaNoPersonagem is not defined`: o teste não carrega `rules-racas.js`. Não tem relação com este trabalho.

## Fontes consultadas
- dnd5e.wikidot.com: fighter:eldritch-knight, rogue:arcane-trickster, warlock:great-old-one, paladin:ancients, cleric (knowledge, light, nature, tempest, trickery), sorcerer:wild-magic, barbarian:totem-warrior, wizard:illusion
- arcaneeye.com (guias Eldritch Knight e Great Old One), nerdsandscoundrels.com (Arcane Trickster, Oath of the Ancients, Way of the Four Elements), seaofstarlight.com/block/688012 (trecho do Player's Handbook)
- dnd-wiki.org/wiki/SRD5:Fighter, SRD5:Ranger, SRD5:Cleric, SRD5:Wizard (SRD 5.1, para nomes e faixas de nível)
- Não usei a página de disciplinas de dandwiki.com para Quatro Elementos: é uma variante caseira (o próprio texto diz isso).
