# Trabalho Xanathar, rodada 2: correções da verificação independente

Fonte: `/mnt/user-data/uploads/D_D_5e_Guia_de_Xanathar_Para_Todas_As_Coisas.pdf`. "PDF pN" é a página do arquivo; a impressa é N-1. Cada item foi conferido na imagem renderizada (100 dpi) antes de qualquer alteração. Arquivos alterados: `dnd5e/rules.js`, `dnd5e/rules-engine.js`, `dnd5e/ui.js`. Nenhum commit foi feito.

Legenda: **Aplicado** (alterado no app), **Parcial** (parte alterada, parte mantida por divergência), **Não aplicado** (motivo indicado).

## Tabela

| # | Item (página) | Antes | Depois | Situação |
|---|---|---|---|---|
| 1 | Celestial, 14º nível (PDF p18) | Nome "Vingança Flamejante"; resumo "Explode em luz ao cair e volta a lutar." | Nome "Vingança Ardente"; resumo mantido | **Parcial.** Nome confirmado na imagem e aplicado. Efeito não alterado: a imagem põe o gatilho no início do turno, quando o teste contra morte seria feito, e não em "ao cair a 0 PV" como diz a lista. A lista também diz "sem gastar movimento", detalhe que não aparece na imagem. Dados da imagem para decisão: recupera PV iguais à metade do máximo; criaturas a 9 m recebem dano radiante de 2d8 + Carisma e ficam cegas até o fim do turno; uso único por descanso longo. |
| 2 | Celestial, 1º nível (PDF p17) | Característica "Luz Curativa"; escolha "Tom da Luz Curativa" (Luz solar, Chama sagrada, Estrelas curativas, Aurora) | "Iluminação Curativa"; escolha removida (`bruxo:celestial` vazio) | **Aplicado.** Nome trocado na característica, no painel e no recurso. Ids `healing_light` e `celestial_pool` mantidos. A leitura das escolhas percorre só os grupos atuais, então uma chave antiga salva fica sem efeito. Não testei com ficha real salva. |
| 3 | Lâmina Maldita, magia de 2º nível (PDF p18) | "Destruição Marcante" (Branding Smite) em três pontos: mapa EN-PT, lista do Paladino (nível 2) e lista expandida da Lâmina Maldita | "Marca da Punição" nos três pontos | **Aplicado.** Não há catálogo separado: o nome está em `rules.js`. Renomeei também a lista do Paladino porque é o mesmo feitiço. Não verifiquei se fichas salvas guardam o nome como texto. |
| 4 | Lâmina Maldita, 10º e 14º (PDF p18) | "Armadura de Hexes"; "Mestre das Hexes" | "Armadura de Maldições"; "Mestre das Maldições" | **Aplicado.** Nomes confirmados na tabela de características. |
| 5 | Guerreiro Maldito, 1º (PDF p18) | Lista de arma favorecida com todas as armas do catálogo, incluindo 11 de duas mãos. `calcularAtaque` usava Carisma para a arma favorecida sem checar a propriedade | Lista com 26 armas, sem as de duas mãos (Alabarda, Arco curto, Arco longo, Besta leve, Besta pesada, Espada grande, Glaive, Machado grande, Malho, Pique, Tacape). Carisma só se a arma não tiver "duas mãos" | **Aplicado.** Texto do livro confirmado: arma sem a propriedade de duas mãos. Conferido no sandbox. |
| 6 | Espadachim, Penachar, 9º (PDF p44) | "Se vencer, ele tem desvantagem contra seus aliados e não faz ataques de oportunidade contra você, por 1 minuto." | "Se vencer e o alvo for hostil, ele tem desvantagem em ataques contra criaturas que não sejam você e não faz ataques de oportunidade contra elas. Dura 1 minuto, ou até um aliado atacar o alvo, ele ser alvo de magia ou se afastar mais de 18 m." | **Aplicado.** O app inverteu a regra. O efeito para alvo não hostil não foi incluído (fora da lista). |
| 7 | Clérigo, Domínio da Sepultura, 1º (PDF p24; a lista indicava p25) | Escolha "Ênfase da Sepultura" com 4 opções | Escolha removida (`clerigo:grave` vazio) | **Aplicado.** A página indicada (p25) é do Druida. O nível 1 está na p24: Magias de Domínio, Círculo da Mortalidade e Olhos da Sepultura, sem escolha. |
| 8 | Colégio das Espadas, grafia (PDF p14-15) | "Floresio" em cinco pontos (dois nomes de característica, título do painel, rótulo da escolha) e "floresios" na descrição | "Floreio" e "floreios" em todos | **Aplicado.** O livro usa "Floreio". |
| 9 | Feiticeiro da Tempestade, Sinal de Feitiçaria (PDF p32) | Escolha entre "Cicatrizes de raio", "Olhos de tempestade", "Brisa constante" e "Trovão distante" | Escolha removida (`feiticeiro:storm` vazio); descrição de Magia Tempestuosa mantida | **Aplicado.** O livro traz uma tabela d6 de seis sinais descritivos, sem efeito mecânico, e sem essas quatro opções. A tabela d6 não foi implementada. |
| 10 | Guardião Ancestral, Escudo Espiritual (PDF p8-9) | "Espíritos reduzem dano causado a um aliado." | "Em fúria, com reação, reduz em 2d6 o dano que um aliado a até 9 m sofre. Sobe para 3d6 no 10º nível e 4d6 no 14º." | **Aplicado, com correção de nível.** A lista dizia 2d6 no 3º nível; o livro põe no 6º. A tabela do livro traz 3d8 e 4d8, mas o texto diz 3d6 e 4d6. Usei o texto. |
| 11 | Alma Solar, Explosão Calcinante, 11º (PDF p51) | "orbe a 45 m que explode em esfera de luz radiante;" | "...esfera de luz radiante com raio de 6 m (20 pés; o livro em português traz 8 m);" | **Aplicado.** A imagem confirma 8 m no livro em português. |
| 12 | Mestre Bêbado, Balanço Bêbado, 6º (PDF p50) | "Levanta-se gastando 3 m de deslocamento." | "Levanta-se gastando 1,5 m de deslocamento (5 pés, padrão do 5e; o livro em português traz 3 m)." | **Aplicado**, por decisão da lista. A imagem confirma 3 m no livro. |
| 13 | Samurai, Cortesão Elegante (PDF p40) e idioma alternativo (PDF p39-40) | Texto do Cortesão já igual ao livro; sem escolha de idioma | Sem alteração | **Não aplicado.** A salvaguarda por atributo está no fluxo de talentos (`choice.featOptions`) e não serve direto à classe. O idioma alternativo exige um tipo novo de escolha no motor. |
| 14 | Batedor, Sobrevivente (PDF p44) | Bônus de proficiência dobrado em Natureza e Sobrevivência | Sem alteração | **Não aplicado.** A lista pedia Atletismo e Acrobacia, mas a imagem confirma Natureza e Sobrevivência. O app já estava correto. |
| 15 | Kensei, Caminho do Pincel (PDF p50) | Proficiência fixa em Suprimentos de caligrafia (em `rules-engine.js` e `rules.js`) | Escolha "Caminho do Pincel: ferramenta" (nível 3) entre Suprimentos de caligrafia e Ferramentas de pintor; a proficiência só é concedida com a escolha. "Ferramentas de pintor" entra no mapa de ferramentas | **Aplicado.** Segue o padrão do Samurai (`selectedOptions`). Conferido no sandbox: sem escolha, nenhuma ferramenta; com pintor, a ferramenta é concedida. |
| - | Mentor (lista: "Mentor (50)", jogo ou idiomas) | - | - | **Não aplicado.** O Mentor fica na PDF p25, não na p50, e é texto narrativo, sem escolha de idioma ou jogo. |

## Testes

Rodados antes e depois das alterações, com os mesmos resultados:

- `test_subclasses.js`: 66/66
- `test_verificacao_dnd5e.js`: 124/124
- `test_2024_integracao.js`: 46/46
- `test_stage20_release.js`: 7 de 7 (lista de falhas vazia)
- `test_stage23_classes.js`: 308/308
- `test_racas.js`: 98/98
- Extras: `test_export_vtt.js` 22/22; `test_2024_classes`, `test_stage21_hp_slots`, `test_stage22_regras_export` e `test_stage16` sem erro.

Nenhuma asserção foi alterada, porque nenhuma falhou. Não há teste que cubra os nomes e valores alterados.

## Limites e observações

- `ui.js` (`calcularAtaque`) foi checado só quanto à sintaxe e pelo código; não há teste de interface para a regra de Carisma.
- Fora da lista, sem alteração: Penachar para alvo não hostil; Armadura de Maldições (o app diz "erra você com mais frequência", e o livro usa uma reação com d6, acerto em 4 ou mais, para falhar o ataque); Sinal de Feitiçaria (tabela d6 não implementada).
- Divergências de página na lista: item 7 (p25 é p24), item 10 (nível 3 é 6), item 13 (Mentor está na p25, não na p50).
