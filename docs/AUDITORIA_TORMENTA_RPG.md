# Auditoria: Tormenta RPG (edição d20)

Data da pesquisa: 2026-11-17. Pasta: `tormenta-rpg/`. Data-tool: `tormenta-rpg-builder`.

## 1. Identificação do livro e da edição

- **Sistema:** Tormenta RPG, a edição d20 da Jambô, anterior ao Tormenta20.
- **Base de regras:** d20 System, versão D&D 3.5. Fonte: verbete "Tormenta" da Wikipédia em inglês (consultado em 2026-11-17). Nele, a versão "Tormenta d20 (2005)" aparece como uma edição publicada pela Jambô Editora e baseada no D&D 3.5.
- **Conflito de datas (não resolvido):** o mesmo verbete lista "Tormenta Third Edition (2001)" e "Tormenta d20 (2003)" antes da versão da Jambô de 2005. Um espelho IPFS do verbete dá 2003 para a edição d20; outro diz que a Jambô publica a Tormenta desde 2005. Não há confirmação pelo livro físico. Usei 2005 como edição de referência porque é a única ligada à Jambô e à base 3.5 em mais de uma fonte.
- **Autores citados** (espelho IPFS): Marcelo Cassaro, Rogério Saladino e J. M. Trevisan. Não confirmado no livro.
- **Relação com o Tormenta20:** o Tormenta20 é um sistema novo, financiado no Catarse em 2019 e baseado em d20 (fonte: espelho do verbete). O Tormenta20 não é usado aqui.
- **Licença:** **NÃO VERIFICADO.** Nenhuma fonte consultada informa a licença do livro da Tormenta d20. Um artigo da rpgista cita OGL e d20 System License como contexto geral das editoras d20 dos anos 2000, sem dizer o que vale para a Tormenta. A base d20 System/SRD 3.5 é publicada sob a Open Game License (OGL), mas o texto da licença não foi lido nesta pesquisa.

## 2. Fontes consultadas e resultado

| Fonte | Status | O que deu |
|---|---|---|
| Wikipédia em inglês, verbete "Tormenta" | Lida (via resultado de busca) | Edições d20 com datas, base D&D 3.5 para 2005, Tormenta20 em 2019/2020 |
| Espelhos IPFS do verbete "Tormenta" | Lidos | Um dá 2003 para a edição d20; outro diz que a Jambô publica a Tormenta desde 2005, cita os autores e a base "D20 System ou 3D&T"; nenhum dá licença |
| Tormenta20 (campanha de 2019, no espelho IPFS) | Lido | Confirma só o financiamento no Catarse; o ano de lançamento vem do infobox do verbete em inglês (2020) |
| rpgista.com.br (história do RPG brasileiro) | Lido | Diz que a d20 saiu nos anos 2000, época em que muitas editoras publicavam sob OGL/d20 System License; não diz qual edição usou nem a licença da Tormenta |
| cayzle.com/3Esrd (d20 SRD 3.5, páginas Basics e Combat) | Lido | Modificador de atributo (tabela), CA = 10 + armadura + escudo + Destreza + tamanho, pontos de perícia com mínimo de 1 |
| touchelivros.com.br, ludopedia.com.br, boardgamegeek.com, tormenta-collab.fandom.com, en.everybodywiki.com, pt.wikipedia.org | Erro de cliente, sem conteúdo | Nada |
| Páginas de loja (toysforfans.com.br) | 404 | Nada |
| PDFs de terceiros do livro (archive.org, movimentorpg.com.br) | Localizados na busca, **não usados** | Não são fonte oficial e não foram abertos |

**Lacuna central:** não foi possível ler o livro, nem um resumo confiável das regras da edição d20. Por isso classes, raças, métodos de atributo, perícias, talentos, magias e equipamento estão todos como NÃO VERIFICADO (seção 4).

## 3. Verificado (com fonte)

| Item | Fonte | Onde está no código |
|---|---|---|
| Identidade da edição (Jambô, d20 3.5) | Wikipédia (EN), verbete Tormenta | `rules.js`, `TRPG_META.fonteEdicao` |
| Modificador = (valor - 10) / 2 arredondado para baixo | d20 SRD 3.5, Basics (tabela de exemplos) | `engine.js`, `trpgModificador`. Aplicação à Tormenta: a confirmar |
| CA = 10 + armadura + escudo + Destreza + tamanho | d20 SRD 3.5, Combat | `engine.js`, `trpgClasseArmadura`. Aplicação à Tormenta: a confirmar |
| Pontos de perícia = base da classe + Inteligência, mínimo 1 | d20 SRD 3.5, Basics | `engine.js`, `trpgPontosPorNivel`. A base da classe é NÃO VERIFICADO |

Os valores de teste foram conferidos à mão: três personagens com Destreza, armadura, escudo e tamanho diferentes, em `tests/regras.test.js`. Essa conferência prova que o código faz a conta da fórmula. Não prova que a fórmula é a da Tormenta.

## 4. NÃO VERIFICADO (não foi preenchido de memória)

- **Raças:** lista, ajustes de atributo, tamanho, deslocamento e traços. `TRPG_RACAS` está vazio.
- **Classes:** lista do livro básico, PV por nível, bônus base de ataque, testes de resistência, perícias de classe. `TRPG_CLASSES` está vazio.
- **Método de atributos:** rolagem, compra de pontos ou matriz, e ajustes raciais. O builder só aceita digitação manual (inteiro de 1 a 30; o limite é do software, não da regra).
- **Iniciativa:** a fórmula usada é a hipótese d20 (modificador de Destreza). O texto de iniciativa não foi obtido.
- **Perícias:** lista, graduações máximas e pontos por nível de cada classe. Os pontos disponíveis são digitados à mão.
- **Talentos e pré-requisitos, magias por dia e listas de magias, equipamento, preços e moeda.** (Os textos dos talentos da seção abaixo foram conferidos no livro; o restante desta linha continua NÃO VERIFICADO.)
- **Tabela de tamanho:** o modificador de tamanho é digitado; a tabela não foi confirmada.
- **Licença** do livro (seção 1).
- **Cores das classes no PDF:** `TRPG_ACENTOS` está vazio, então todas as classes usam o destaque padrão.

## 5. Exportações e VTT

- **Backup JSON:** feito. `{sistema:"tormenta-rpg", versaoEsquema:1, exportadoEm, personagem, modo}`. Importação recusa outro sistema, esquema ausente ou mais novo, personagem ausente e valores fora da faixa.
- **PDF:** feito. Duas páginas A4 em tema de pergaminho, pela paleta do D&D. Verificado no Chrome: o PDF gerado tem 2 páginas.
- **VTT:** **não há VTT verificado para a Tormenta RPG.** Nenhum formato Foundry, Roll20 ou outro foi criado. O aviso está na etapa de resumo e na ficha impressa.

## 6. Lacunas de escopo (em relação ao pedido original)

- Classe e raça são texto livre no modo livre. No modo estrito, as etapas bloqueiam, porque as tabelas estão vazias.
- Não há PV, bônus base de ataque nem testes de resistência calculados. Os PV são digitados à mão.
- Não há cor de classe no PDF (ver seção 4).
- Não há catálogo de talentos, magias ou equipamento. As etapas aceitam texto livre, uma linha por item.

## 7. Como rodar os testes

```
node tormenta-rpg/tests/run-all.js
```

Roda regras (fórmulas e três personagens conferidos), validações (aceito e recusado), backup e histórico (round-trip), PDF (duas páginas, escape, aviso de VTT) e release (referências do `index.html`, duplicatas, `alert()`, sintaxe). Código de saída diferente de zero se algo falhar.

Verificação de navegador (não entra no `run-all`, precisa de Chrome e Playwright):

```
node tormenta-rpg/tests/e2e.js
```

Fluxo completo em 1100px e 360px, erros de console, rolagem lateral, alvos de 40px (com a área de toque das bolinhas do stepper), backup e PDF. Última execução: sem erro de console, sem rolagem lateral, PDF de 2 páginas nas duas larguras.

## 8. Próximos passos para fechar a edição

1. Conferir o livro (ou uma fonte de regras confiável) e preencher `TRPG_RACAS`, `TRPG_CLASSES` e as tabelas da seção 4, cada item com `fonte`.
2. Confirmar a licença do livro e registrar aqui.
3. Adicionar testes de PV, BBA e resistências por classe e nível, contra os casos conferidos à mão.
4. Só então decidir sobre cor de classe no PDF e sobre a exportação de VTT, se existir VTT verificado.

> **Atualização (verificação independente):** o ano da edição d20 é conflitante (2003 ou 2005) e a base D&D 3.5 tem uma fonte só. Veja `VERIFICACAO_TORMENTA_RPG.md`.

> **Atualização (frente de dados):** classes (13), perícias (19), talentos (13), círculos de magia e BBA foram preenchidos a partir do compêndio do VTT fvtt-trpg (GPL-3, licença dos dados não confirmada; só números, nomes e listas) e da wiki tsrd, cada item com `fonte`. Seguem vazios: bases de resistência, magias por dia, equipamento, raças (exceto o anão), custo de compra. Veja `COBERTURA.md`.

> **Atualização (talentos com nota, 2026-11-18):** os 12 talentos com nota foram conferidos no livro do usuário (PDF p.97 a p.113; página PDF = índice do texto + 1). Aplicado no motor (`engine.js`, `trpgEfeitosTalentos`) só o que é número verificável: bônus de CA, ataque e dano, resistências, níveis de seguidores e limites de uso por dia. Mostrado em `ui.js` (`trpgTextoEfeitosTalentos`). Efeito de combate (rolagem, ação, dano por dado, movimento) fica de fora e está escrito na nota de cada talento em `rules-talentos-extra.js`.
>
> | Talento | PDF | Aplicado | Fora, e por quê |
> |---|---|---|---|
> | Mestre em Arma | p.101 | 1 rolagem extra por dia | +1 em ataque e dano e margem +1: a ficha não tem ataques por arma. A própria rolagem extra é combate. |
> | Perito em Arma | p.102 | Usos por dia = bônus de Carisma (mínimo 0) | Trocar teste de perícia por jogada de ataque: o app não rola dados. |
> | Aparar | p.97 | Nada | Jogada para aparar, uma vez por rodada: combate. |
> | Investida Implacável | p.101 | Nada | Dano dobrado ou triplicado na investida: combate. |
> | Investida Montada | p.101 | Nada | Movimento depois do ataque, até o dobro do deslocamento da montaria: a ficha não tem deslocamento de montaria. |
> | Domínio da Morte | p.113 | 1 uso por dia | Toque da morte e 1d6 por nível contra os PV: combate. Pré-requisito de devoto não verificado. |
> | Ataque Atordoante | p.97 | Usos por dia = 1 + bônus de Sabedoria, mais 2 por escolha extra | Declaração antes do ataque, teste de Fortitude (CD 10 + metade do nível + Sab) e atordoamento: combate. |
> | Ataque Giratório | p.98 | Nada | Ataque contra cada adjacente e ação completa: combate. |
> | Tiro em Movimento | p.103 | Nada | Mover-se antes e depois do disparo, sem armadura pesada: combate. |
> | Ataque em Movimento | p.98 | Nada | Mover-se antes e depois do ataque corpo a corpo, sem armadura pesada: combate. |
> | Liderança | p.110 e p.111 | Total de níveis de seguidores (nível × bônus de Carisma, mínimo 1), cada um no máximo na metade do nível | Escolha entre parceiro e seguidores, distribuição dos níveis e o parceiro: escolha do jogador. |
> | Ao Sabor do Destino | p.109 e p.110 | CA, ataque e dano e resistências pela faixa mais alta atingida | **Decisão do usuário pendente:** confirmar a leitura de faixa mais alta (o livro só marca a habilidade como cumulativa). O código não foi mudado. +4 em perícia e +2 em habilidade: escolha do jogador. |
>
> Testes: `tormenta-rpg/tests/racas_tamanho.test.js`, 10 testes novos com os valores calculados à mão nos comentários. `node tormenta-rpg/tests/run-all.js`: todos passaram. `node tormenta-rpg/tests/e2e.js` (Chrome): sem erro de console e sem rolagem lateral em 1100px e 360px.
