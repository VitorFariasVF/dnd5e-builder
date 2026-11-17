# D&D 5e 2024: dados das classes (SRD 5.2)

Frente só de dados. Nada ligado à interface ainda; a ficha 2024 continua usando classes, subclasses e magias de 2014 com aviso.

## O que entrou
- `dnd5e/rules-2024-classes.js`: globais novas `CLASSES_2024`, `CLASS_FEATURES_2024` e `SUBCLASSES_2024`, sem sobrescrever os de 2014 em `rules.js`.
  - As 12 classes, com dado de vida, salvaguardas, perícias, proficiências, níveis de Aumento de Atributo e de Dom Épico (19), subclasse no nível 3.
  - Características de 1 a 20, com nível, nome e frase curta reescrita. As entradas "Subclasse" e "Característica de subclasse" marcam os níveis da subclasse.
  - Uma subclasse por classe (o que o SRD 5.2 traz): Caminho do Berserker, Colégio do Saber, Domínio da Vida, Círculo da Terra, Campeão, Caminho da Mão Aberta, Juramento da Devoção, Caçador, Ladrão, Feitiçaria Dracônica, Patrono Ínfero e Escola de Evocação.
  - Conjuração: tipo, atributo, truques, magias preparadas e espaços por nível (conjuração completa, de metade e de pacto).
  - Recursos por nível (fúrias, inspiração, canalizar divindade, forma selvagem, pontos de foco, dado de Ataque Furtivo, pontos de feitiçaria, invocações e outros).
  - `mudancas2014` com o que mudou em relação a 2014.
- `dnd5e/tests/test_2024_classes.js`: 210 verificações. Os valores esperados vêm das tabelas do SRD, não do arquivo de dados. Confere dado de vida, salvaguardas, níveis de ASI, níveis de subclasse, contagem de características por nível, espaços de magia e campos obrigatórios. Sai com código 1 se algo falhar.

## Fonte e limites
- Licença: SRD 5.2, Creative Commons CC-BY 4.0, segundo a [página do SRD no D&D Beyond](https://dndbeyond.com/srd).
- O PDF oficial (`SRD_CC_v5.2.1.pdf`) não estava acessível pela ferramenta de busca. Os dados vieram do espelho em mdbook do SRD 5.2 (`mailbun.codeberg.page/dnd-srd5.2-mdbook`), que se declara conversão do SRD 5.2 a partir de um PDF. A conferência contra o PDF oficial fica pendente antes de ligar na interface.
- Sites de fãs e wikis que citam o Livro do Jogador 2024 (e não o SRD) não foram usados como fonte. Só serviram para checar nomes e níveis.
- Os nomes em português são traduções próprias, não a tradução oficial da WotC.
- A comparação com 2014 usa os nomes de `rules.js`, não o Livro do Jogador de 2014.

## NÃO VERIFICADO
- Guerreiro, Campeão, "Atleta Notável" e "Estilo de Luta Adicional": o espelho dá níveis diferentes no resumo (3 e 7) e na tabela (7 e 10). Os níveis ficaram em 7 e 10, marcados como NÃO VERIFICADO.
- Paladino, Juramento da Devoção: a lista completa de magias por nível (além de Proteção contra o Bem e o Mal e Escudo da Fé, no nível 3) não foi conferida.

## Fora desta frente
- Subclasses do Livro do Jogador 2024 que não estão no SRD (ex.: Caminho do Zelote, Colégio da Dança).
- Listas de magias por classe, equipamento inicial, antecedentes, talentos, origens e sub-raças.
- Texto completo de cada subclasse e de cada magia.
- Integração na interface e na ficha. `index.html` já carrega `rules-2024-classes.js`, mas nada lê os novos globais ainda.

## Pendências antes da integração
1. Conferir os 12 blocos de tabela contra o PDF oficial do SRD 5.2.1.
2. Resolver os níveis do Campeão e a lista de magias do Juramento da Devoção.
3. Decidir os nomes em português definitivos.
4. Ligar na interface e nas magias, com a ficha 2024 passando a usar `CLASSES_2024`.

## Como rodar
`cd dnd5e && node tests/test_2024_classes.js`

Falha que já existia e não vem desta frente: `tests/test_export_vtt.js` (2 de 22) chama `aplicarRacaNoPersonagem`, definida em `rules-racas.js`, que esse teste não carrega.

> **Atualização:** os dados 2024 já estão ligados à ficha 2024. Veja `TRABALHO_DND5E_INTEGRACAO.md`.
