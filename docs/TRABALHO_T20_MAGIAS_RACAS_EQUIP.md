# Tormenta20: magias, raças completas e equipamento (2026-11-17)

Frente de dados. A interface ainda não usa estes arquivos (ligação a cargo de outra frente).

## O que entrou

| Arquivo | Conteúdo | Situação |
|---|---|---|
| `tormenta20/rules-magias.js` | 7 magias de 1º círculo com círculo, escola, tipo, execução, alcance, alvo, duração e frase curta | 1 fonte cada (verificado: false) |
| `tormenta20/rules-magias.js` | 12 magias de 2º a 5º círculo só com nome, círculo e escola (`T20_MAGIAS_PENDENTES`) | 1 fonte (índice), sem execução, alcance nem duração |
| `tormenta20/rules-racas.js` | As 17 raças do livro básico (`T20_RACAS_COMPLETAS`): habilidades, deslocamento e tamanho onde a fonte informa | 1 fonte, exceto Hynne (tamanho, deslocamento e uma habilidade) e Anão/Elfo (uma habilidade cada), com 2 fontes |
| `tormenta20/rules-equipamento.js` | Formato de armas, armaduras e itens; listas vazias | Nenhum dado de T20 acessível |
| `tormenta20/tests/test_08_magias_racas_equip.js` | 44 checagens: estrutura, círculos, tipos, valores plausíveis, fonte, lacunas | passa |

`rules.js` não foi alterado. `T20_RACAS` continua como estava; as raças completas estão em outra constante.

## O que ficou de fora

- **Magias de 2º a 5º círculo completas**: as páginas individuais não abriram nesta sessão (fora da lista permitida). Ficaram só como pendentes.
- **Progressão de magias conhecidas e PM por círculo**: nenhuma tabela acessível (`T20_MAGIAS_PROGRESSAO`, NÃO VERIFICADO).
- **Armas, armaduras e itens de aventura**: nenhuma tabela de Tormenta20 acessível. As listas estão vazias.
- **Ajustes de atributo das raças**: a fonte usada não traz ajustes para nenhuma raça, exceto o Minotauro (1 fonte, `[I]`).
- **Sereia/Tritão**: a página não abriu. Só há o nome, marcado NÃO VERIFICADO.
- **Compra de atributos, perícia não treinada, PV do Bardo, dinheiro inicial**: nada novo foi fechado. A busca não trouxe tabela de custo nem regra de dinheiro inicial. O PV do Bardo continua em conflito: Rotina de Mestre dá 12 + CON e +3 por nível; exegetadearton dá 16 e +4.

## Conflitos registrados

- **Deslocamento do Anão**: exegetadearton diz 6 m; `rules.js` diz 9 m (NÃO VERIFICADO). Não resolvido.
- **Ajuste do Minotauro**: a issue `[I]` cita um dado anterior com Destreza +1, sem explicar.

## Fontes e o que não serviu

- **Usadas**: exegetadearton.com.br (páginas de magia, raça, classe e índice; o próprio site declara vir da Tormenta Collab Wiki e manda conferir o livro); Rotina de Mestre (guia do Bardo); issue `[I]`.
- **Não usada**: wiki.runarcana.org. As páginas de armas e de armaduras usam preços em GP/PO, CA e categorias de D&D 5e, e nomes de outro universo. Não é fonte de T20.
- **Fora da lista permitida nesta sessão**: tsrd.fandom, tormenta-collab, a maior parte das páginas de magia e de equipamento do exegetadearton, gitlab do sistema Foundry.
- **Não abertos por regra**: PDFs de livro.

Nenhum texto de livro foi copiado. Os efeitos são frases curtas em palavras próprias.

## Como rodar

```
node tormenta20/tests/test_08_magias_racas_equip.js
node tormenta20/tests/run_all.js
```

Em `tormenta20/tests/_ambiente.js` os três arquivos entraram em `SCRIPTS` (depois de `rules.js`) e os nomes novos em `NOMES_CONST`. O `test_05_release.js` pega a lista de `SCRIPTS` automaticamente.

## Pendências

1. Abrir as páginas de magia de 2º a 5º círculo e conferir execução, alcance e duração.
2. Achar uma tabela de armas, armaduras e itens de T20 (com T$, espaços e defesa).
3. Achar a tabela de magias conhecidas e PM por círculo.
4. Conferir os ajustes de atributo das raças e o deslocamento do Anão.
5. Conferir os dados de Sereia/Tritão e das duas variantes de Suraggel.
6. Segunda fonte independente para as magias (hoje todas têm uma só).
