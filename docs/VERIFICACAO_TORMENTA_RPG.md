# Verificação independente: Tormenta RPG (edição d20)

Data: 2026-11-17. Pasta: `tormenta-rpg/`. Revisor: sessão independente da fase 2. Não usa a pesquisa da primeira entrega como fonte, só como ponto de partida (`docs/AUDITORIA_TORMENTA_RPG.md`).

## Conclusão

**A maior parte continua sem fonte.** Não encontrei nenhuma fonte aberta e acessível com os números de classe, raça, atributos, perícias, talentos, magias ou equipamento da edição d20. Nada disso foi preenchido. Só entrou o que foi confirmado com a fonte citada.

- Confirmado: a editora (Jambô) e a base de regras d20; a fórmula de modificador e de CA, na base SRD 3.5.
- Conflito: o ano da edição d20 (2003 ou 2005), e a existência de uma edição revisada de 2015 com o mesmo nome e outros números.
- Não verificado: licença, classes, raças, método de atributos, PV, BBA, resistências, perícias de classe, talentos, magias, equipamento e dinheiro.

## Fontes lidas nesta rodada

| Sigla | Fonte | Uso |
|---|---|---|
| W | https://en.wikipedia.org/wiki/Tormenta (lido 2026-11-17) | Editora, base D&D 3.5, anos |
| EB | https://ebooksdepository.com/en/publications/tormenta-rpg-edicao-revisada | Edição revisada de 2015 (Jambô) |
| R | https://reddit.birdcat.cafe/r/rpg/comments/yaafyl/the_iconic_brazilian_fantasy_ttrpg_tormenta_by (espelho do r/rpg) | Nomes de classes e raças, "sistema de resolução d20"; sem números |
| RP | https://rpgista.com.br/2019/03/17/a-history-of-the-brazilian-rpg-scene | Contexto histórico: edição d20 logo após o cenário, sem ano |
| FVTT | https://foundryvtt.com/packages/trpg | Pacote de VTT "Tormenta RPG e Império de Jade" com compêndio de classes; sem licença e sem dados lidos |
| SRD1 | https://cayzle.com/3Esrd/basics.html | Tabela de modificadores; mínimo de 1 ponto de perícia |
| SRD2 | https://cayzle.com/3Esrd/combat.html | Fórmula da CA |

Não abertos (cópias não autorizadas, ignoradas): PDFs de archive.org, movimentorpg.com.br, scribd, spawningpool.net e um PDF de "Tormenta RPG (d20) [PT]" em uma pasta de arquivos. Não foram baixados nem lidos. Também não foram usadas páginas de wiki que deram erro de cliente (tormenta-collab.fandom, everybodywiki, touchelivros) ou páginas de T20 (tsrd.fandom), que são de outra edição.

## Tabela de verificação

| Item | Valor | Fontes | Resultado |
|---|---|---|---|
| Editora da edição d20 | Jambô Editora | W (publicada pela Jambô desde 2005); EB (edição de 2015 pela Jambô) | preenchido (duas fontes; a de 2015 é outra edição, então a ligação ao d20 de 2005 vem só de W) |
| Base do sistema | d20 (resolução d20) | R (resolução d20); W (d20 System); RP (época da d20) | preenchido (três fontes para "d20") |
| Base D&D 3.5 | D&D 3.5 | W (única fonte com "3.5") | não verificado: uma fonte só |
| Ano da edição d20 | 2003 (infobox) ou 2005 (versão Jambô) | W dá os dois anos; RP não dá ano | **conflito**. Usei 2005 só como referência, sem confirmação |
| Edição revisada | Tormenta RPG, Edição Revisada, Jambô, 2015 | EB (11 raças, 13 classes, mais de 150 talentos, mais de 600 magias) | **conflito de escopo**: outro livro com o mesmo nome. Não usado nos dados |
| Licença | não confirmada | W cita a OGL de 2001 da Wizards e diz que uma licença aberta da Jambô foi lançada em junho de 2026, sem texto e sem ligação com a edição d20. FVTT não informa licença | NÃO VERIFICADO |
| Lista de classes | nomes (R): guerreiro, paladino, druida, clérigo, mago, bruxo, ladino, patrulheiro, espadachim, artífice, bardo | R não diz a edição; EB diz 13 classes na revisada | NÃO VERIFICADO (lista de edição incerta) |
| Dado de vida, BBA, resistências, pontos de perícia e perícias por classe | nenhum número | nenhuma fonte com esses números | NÃO VERIFICADO |
| Lista de raças | nomes (R): 15 | R não diz a edição; EB diz 11 na revisada | NÃO VERIFICADO (conflito de lista) |
| Ajustes de atributo, tamanho e deslocamento das raças | nenhum | nenhuma | NÃO VERIFICADO |
| Método de atributos | sem valor | R diz que uma versão recente tirou os valores e deixou só o modificador; não é a d20 de 2005 | NÃO VERIFICADO |
| Modificador de atributo (valor - 10) / 2, arredondado para baixo | tabela: 1 = -5, 10-11 = 0, 12-13 = +1, 20-21 = +5 | SRD1 (regra e tabela lidas) | preenchido na base SRD 3.5; aplicação à Tormenta: não verificada (uma fonte) |
| CA = 10 + armadura + escudo + Destreza + tamanho | fórmula | SRD2 | preenchido na base SRD 3.5; aplicação à Tormenta: não verificada (uma fonte) |
| Iniciativa | modificador de Destreza (hipótese) | SRD2 não traz a regra; a página de iniciativa não foi lida | NÃO VERIFICADO |
| Pontos de perícia por nível | mínimo de 1 | SRD1 (mínimo de 1 confirmado); soma com Inteligência não aparece na página lida; base da classe NÃO VERIFICADO | parcial: mínimo confirmado, fórmula completa não |
| PV (dado de vida), BBA e testes de resistência por classe e nível | nenhum | nenhuma | NÃO VERIFICADO |
| Tamanho (tabela de modificadores) | digitado | nenhuma | NÃO VERIFICADO |
| Talentos, pré-requisitos, magias por dia, magias por classe | nenhum | EB cita a revisada (não é a edição d20); nada da d20 | NÃO VERIFICADO |
| Equipamento, preços e dinheiro inicial | nenhum | nenhuma | NÃO VERIFICADO |

## Alterações nesta rodada

- `tormenta-rpg/rules.js`: a nota `fonteEdicao` agora mostra o conflito de ano, em vez de dar 2005 como fato. A `fonte` da fórmula de pontos de perícia agora diz o que a página lida confirma (mínimo de 1) e o que não confirma (soma com Inteligência).
- `tormenta-rpg/tests/regras.test.js`: novo teste de guarda. Cada classe que um dia for preenchida precisa de `dadoDeVida`, `bba`, `resistencias` e `fonte`. Com as tabelas vazias, o teste passa sem dados. Os testes já existentes de PV, BBA e resistências (retornam null) foram mantidos, porque não há fonte para preencher esses valores.
- Nenhum dado de classe, raça, magia, talento ou equipamento foi preenchido. A tabela de classes e a de raças continuam vazias.

## Testes

`node tormenta-rpg/tests/run-all.js` (resultado após as mudanças): regras 12/12, validações 14/14, backup 12/12, pdf 4/4, release 7/7. Todos passam, código de saída 0.

## O que falta para fechar a edição

1. Obter o livro da edição d20 (Jambô) ou uma fonte oficial equivalente. Com o livro é possível preencher classes, raças, PV, BBA, resistências, perícias, talentos, magias e equipamento, cada item com a página.
2. Resolver o ano (2003 ou 2005) e confirmar qual edição o projeto deve seguir. A revisada de 2015 é outro livro e não deve ser misturada.
3. Confirmar a licença pelo texto do próprio livro.
4. Lead para uma próxima sessão: o pacote de VTT de Tormenta RPG (github.com/mclemente/fvtt-trpg, citado na página do Foundry) tem um compêndio de classes. Não foi possível ler: o repositório não está liberado nesta sessão, e a licença não é conhecida. Se for usado, primeiro é preciso confirmar a licença e comparar com o livro.
