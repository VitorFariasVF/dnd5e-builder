# Trabalho D&D 5e: subclasses do PHB (2014)

Arquivos desta frente: `dnd5e/rules-subclasses.js`, `dnd5e/tests/test_subclasses.js`, este documento.
Teste: `cd dnd5e && node tests/test_subclasses.js` (72 verificações, código != 0 se falhar).
Escolhas do Guia de Xanathar: `cd dnd5e && node tests/test_xanathar_escolhas.js` (21 verificações).

## Atualização 2026-11-18: escolhas do Guia de Xanathar (Samurai e Mentor)
- **Samurai, Bônus de Proficiência (nível 3)**, PDF p40: perícia (História, Intuição, Atuação ou Persuasão) ou um idioma à escolha. A opção "Um idioma à escolha" abre um segundo campo com a lista de idiomas. A validação do modo A exige o idioma quando a opção está marcada.
- **Samurai, Cortesão Elegante (nível 7)**, PDF p40: a alternativa de salvaguarda (Inteligência ou Carisma, se já houver Sabedoria) não entrou. O app é de classe única e o Guerreiro não tem Sabedoria em salvaguarda, então a alternativa não ocorre. O motor concede Sabedoria, como antes.
- **Mentor, Mestre da Intriga (nível 3)**, PDF p43: dois idiomas à escolha (validação exige os dois; não há checagem de idioma repetido com o antecedente ou a raça) e proficiência com kit de disfarce, kit de falsificação e "Jogo". Não há seleção do conjunto de jogo: a lista de conjuntos não está no material disponível, então a proficiência entra como "Jogo", como nos antecedentes do app.
- **Mentor, Manipulador Perspicaz (nível 9)** (PDF p43): é um teste feito pelo Mestre durante a cena, não uma escolha de ficha. Não entrou.
- **Pendência de nome corrigida neste trabalho:** o documento de Xanathar anterior dizia que o Mentor está na PDF p25 e p50 e que não tinha escolha de idioma. O Mentor está nas PDF p42 (lista de arquétipos) e p43 (características), e tem a escolha de idiomas e de jogo.
- Item "Cortesão: Patrono ou pesquisa" da lista de pendências: não existe no Guia de Xanathar. O Cortesão Elegante é característica do Samurai (acima). Não há escolha de "Patrono" nem de "pesquisa" nesse trecho.

## NÃO VERIFICADO: conferência no Guia de Xanathar (2026-11-18)
O Guia de Xanathar traz só Samurai, Mentor, Cavaleiro, Arqueiro Arcano e outras subclasses próprias. As subclasses do Livro do Jogador não estão nele. Resultado dos itens desta lista:
- Surto de Magia Selvagem (Feiticeiro): não está no Guia. Continua NÃO VERIFICADO.
- Buscador de Espíritos (Totem do Urso): não está no Guia. Continua NÃO VERIFICADO.
- Domínios do Clérigo (Conhecimento, Luz, Natureza, Tempestade, Trapaça): não estão no Guia. O Guia só traz Forja e Sepultura (PDF p22-24). Continuam NÃO VERIFICADO.
- Escola de Ilusão: não está no Guia. "Ilusionista" aparece só como nome de um PNJ (PDF p45). Continua NÃO VERIFICADO.
- Nomes em português das características novas do Livro do Jogador: não estão no Guia, então não foram conferidos aqui.
- Patrono ínfero "O Corruptor": não está no Guia. O Guia traz o Patrono Transcendental (PDF p17-18).
- Caminho dos Quatro Elementos, Juramento dos Anciões, Cavaleiro Místico, Trapaceiro Arcano e Grande Antigo: não estão no Guia.

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
