# Tormenta20: conferência de raças e poderes gerais

Fonte única: **Tormenta20 Jogo do Ano** (livro do usuário, `/mnt/user-data/uploads/T20_-_Livro_Básico_-_Jogo_do_Ano.pdf`).
Referências `pNNN` são as páginas do PDF (o mesmo número dos arquivos `/tmp/t20/pNNN.txt`). Printed = pNNN − 6 no capítulo 1 e nos poderes.

Arquivos alterados: `tormenta20/rules-racas.js`, `tormenta20/rules-poderes.js`, testes `test_01`, `test_02`, `test_06`, `test_07`, `test_08`, `test_09` (só as linhas listadas abaixo) e este documento.
Não alterados: `rules.js`, `rules-niveis.js`, `rules-equipamento.js`, `rules-magias*.js`, `engine.js`, `ui.js`.

## 1. Raças

Regra do livro: a raça soma ajustes ao valor do atributo (p024: "pode aumentá-los acima de 4 ou diminuí-los abaixo de –2"). Tamanho padrão Médio e deslocamento padrão 9 m, salvo quando a raça diz outra coisa (p112; exemplos na tabela 1-21, p113).

| Item | App antes | Livro | Ação |
|---|---|---|---|
| Humano | ajustes null; tamanho e deslocamento null (NÃO VERIFICADO) | +1 em três atributos à escolha (p024, p025); padrão Médio e 9 m (p112); Versátil (p025) | Tamanho Médio, deslocamento 9. Ajuste à escolha em `ajusteEscolha` (app não aplica; `verificado.ajustes` false) |
| Anão | ajustes null; deslocamento 6 com CONFLITO (rules.js dizia 9) | Con +2, Sab +1, Des –1 (p024); deslocamento 6 m, sem a penalidade de armadura (p026) | Ajustes aplicados; conflito resolvido pelo livro; 4 habilidades conferidas |
| Elfo | ajustes null; 9 m | Int +2, Des +1, Con –1 (p024); 9 m, Graça de Glórienn sobe para 12 m (p028) | Ajustes aplicados; Sangue Mágico = +1 PM por nível (p028) |
| Goblin | ajustes null; Pequeno, 9 m | Des +2, Int +1, Car –1 (p024); Pequeno, 9 m (p029) | Ajustes aplicados |
| **Golem** | **ausente** | Força +2, Con +1, Car –1 (p024, p033); 6 m (chassi); 4 habilidades (p033) | **Adicionado** |
| Hynne | ajustes null; Pequeno, 6 m | Des +2, Car +1, For –1 (p024, p034); Pequeno, 6 m | Ajustes aplicados |
| Kliren | ajustes null; Engenhosidade sem a redução de custo | Int +2, Car +1, For –1 (p024); 2ª aquisição de Engenhosidade custa –1 PM (p034) | Ajustes aplicados; redução corrigida |
| Lefou | ajustes null | Car –1; +1 em três atributos, exceto Car (p024, p030); Deformidade pode trocar bônus por poder da Tormenta (p030) | Car –1 aplicado; ajuste à escolha em `ajusteEscolha`; troca documentada |
| Medusa | ajustes null | Des +2, Car +1 (p024, p034) | Ajustes aplicados; Olhar Atordoante usa ação de movimento (p035) |
| Minotauro | ajustes FOR +2, CON +1, SAB –1 (1 fonte, issue externa); Chifres sem "uma vez por rodada"; deslocamento null | Mesmos ajustes (p024); Chifres: uma vez por rodada, ao agredir com outra arma (p031); padrão 9 m | Ajustes verificados; Chifres corrigido; deslocamento 9. Versão antiga com Des +1 não está no livro |
| Osteon | ajustes null; Memória Póstuma sem alternativa; Natureza Esquelética incompleta | Con –1; +1 em três, exceto Con (p024, p035); Memória Póstuma com alternativa de raça (p035); imunidades de trevas e veneno (p035) | Con –1 aplicado; alternativa e imunidades completadas; ajuste à escolha em `ajusteEscolha` |
| Qareen | ajustes null | Car +2, Int +1, Sab –1 (p024); habilidades (p032) | Ajustes aplicados |
| Dahllan | ajustes null; Empatia Selvagem sem o +2 em Adestramento | Sab +2, Des +1, Int –1 (p024); 2ª aquisição dá +2 em Adestramento (p027) | Ajustes aplicados; efeito completado |
| Sereia/Tritão | nada conferido (0 habilidades, deslocamento null) | +1 em três atributos à escolha (p036); 9 m em terra, natação 12 m (p036); 3 habilidades (p035-p036) | Habilidades, deslocamento e ajuste à escolha preenchidos |
| Sílfide | ajustes null; voo sem 12 m | Car +2, Des +1, For –2 (p024, p036); Minúsculo (p036, p113); voo 12 m por 1 PM (p036) | Ajustes aplicados (For –2 incluso) |
| Suraggel (Aggelus) | ajustes null; relação com Sulfure indefinida | Sab +2, Car +1 (p024, p036); "aggelus ou sulfure" (p036) | Ajustes aplicados; alternativas documentadas |
| Suraggel (Sulfure) | ajustes null | Des +2, Int +1 (p024, p036) | Ajustes aplicados |
| Trog | ajustes null; Mau Cheiro sem "criaturas exceto trogs" | Con +2, For +1, Int –1 (p024); Mau Cheiro (p037) | Ajustes aplicados; efeito completado |
| Tamanho e deslocamento padrão | null (NÃO VERIFICADO) em Humano, Osteon, Qareen, Trog, Kliren, Lefou, Medusa, Dahllan, Minotauro, Elfo | Médio e 9 m (p112) | Preenchidos com a fonte do padrão |

Contagens de raças (final):
- 17 raças do livro (Suraggel conta uma vez, com duas variantes); 18 entradas em `T20_RACAS_COMPLETAS`.
- Ajustes verificados: 14 entradas. Ajustes parciais ou à escolha (`verificado.ajustes` false): Humano, Lefou, Osteon, Sereia/Tritão. O app não aplica o ajuste à escolha.
- Tamanho e deslocamento verificados: 18 de 18.
- Habilidades: todas conferidas no livro.

## 2. Poderes gerais e concedidos

O livro agrupa os poderes gerais em combate, destino, magia, tormenta e concedidos (p130). Os pré-requisitos vêm das tabelas (p132, p133, p134) e são conferidos com os efeitos nas páginas de texto.

| Item | App antes | Livro | Ação |
|---|---|---|---|
| Acuidade com Arma | geral, sem pré-requisito, sem efeito | Des 1; usa Des em vez de For com arma leve ou de arremesso (p130, p132) | Completado |
| Esquiva | geral, sem pré-requisito, sem efeito | Des 1; +2 na Defesa e Reflexos (p131, p132) | Completado |
| Mobilidade | geral, "pré-requisitos não lidos" | **Não aparece no livro** | **Removido** |
| Dom da Verdade | concedido (Khalmyr), sem pré-requisito | Devoto de Khalmyr; +5 em Intuição e Percepção contra Enganação e Furtividade por 2 PM (p133, p139) | Completado |
| Aura Bélica | concedido (Keenn), sem efeito | **Não aparece em nenhuma página do livro** (busca no texto de todas as páginas) | **Removido** |
| Poderes de combate | não existiam | 40 poderes (p132 tabela; p130-p131, p134-p135 efeitos) | **Adicionados** |
| Poderes de destino | não existiam | 20 poderes (p132 tabela; p135-p137 efeitos) | **Adicionados** |
| Poderes de magia | não existiam | 8 poderes (p132 tabela; p137 efeitos). Aprimoramentos: Acelerada, Ampliada, Discreta (p137) | **Adicionados** |
| Poderes da Tormenta | não existiam | 22 poderes (p134 tabela; p142-p143 efeitos). Ao escolher, perde 1 de Car; mais 1 a cada dois outros (p142) | **Adicionados** |
| Poderes concedidos | 2 (dom-da-verdade, aura-belica) | 72 (p133 tabela; p138-p142 efeitos). Pré-requisito: devoção; atributo-chave Sab (p138) | **Adicionados** (71 novos + dom-da-verdade atualizado) |

Pendências de texto do livro:
- **Estilo de Arma e Escudo**: a tabela (p132) diz "Escudos"; o texto (p131) diz "treinado em Luta, proficiência com escudos". Usado o texto; `verificado` false.
- **Arma Secundária Grande**: o texto (p131) é curto e ambíguo. `verificado` false.
- **Êxtase da Loucura**: a tabela (p133) grafa "Êstase"; o texto (p139) diz "Êxtase", adotado.

Contagens de poderes gerais e concedidos (final, catálogo com 351 entradas, das quais 189 de classe ou tipo não verificado, sem alteração):

| Categoria | Antes | Depois | Verificados (depois) |
|---|---|---|---|
| Combate | 0 | 40 | 38 |
| Destino | 0 | 20 | 20 |
| Magia | 0 | 8 | 8 |
| Tormenta | 0 | 22 | 22 |
| Concedidos | 2 | 72 | 72 |
| Gerais sem categoria (Mobilidade, removido) | 3 | 0 | — |
| **Total gerais e concedidos** | **5** | **162** | **160** |

Todos os poderes gerais usam `nivel: 1` (o livro não dá nível mínimo; o requisito de nível fica em `pre.nivel`). Isso evita o aviso "nível NÃO VERIFICADO" do app, que não se aplica a eles.

## 3. Testes alterados

Só as afirmações que contradiziam o livro. Os testes 01, 07 e 09 também tiveram edições de outro agente em paralelo, e essas não foram mexidas.

- `test_01`: Humano e Minotauro com deslocamento 9 (padrão, p112). Personagem B (Anão): PV 33, PM 19, Defesa 11 (ajustes do livro).
- `test_02`: aviso de ajuste não verificado usa Humano (o Anão agora tem ajustes verificados).
- `test_06`: ajustes de Anão e Elfo (p024); Humano sem valor fixo.
- `test_07`: contador de ids conta também `t20PoderGeral` e `t20PoderConcedido`; verificado aceita a fonte do livro.
- `test_08`: 18 entradas (17 raças), Golem incluído; ajuste verificado só sem ajuste à escolha; Sereia, Anão e Minotauro conferidos no livro.
- `test_09`: 18 entradas; Minotauro 9 m; Anão 6 m (p026); Sílfide Força –2; Sereia 9 m e 3 habilidades; Humano 9 m e aviso do ajuste à escolha.

## 4. Falhas que não são deste trabalho

Três testes ainda falham, por causa de mudanças em andamento nos arquivos de outros agentes (`rules-niveis.js`, `engine.js`), não de raças ou poderes:
- `test_06`: "Paladino nível 2, CAR +2: PM 9" (função `t20PMTotal`, sem raça).
- `test_09`: "PDF Bardo nível 20 sem PV" e "derivados do Bardo 20" (PV do Bardo em conflito de fontes).

## 5. Pendências fora dos meus arquivos

- `ui.js` e `export-pdf.js` mostram "NÃO VERIFICADO" quando `ajustes` é null. Para Humano, Lefou, Osteon e Sereia, deveriam mostrar `ajusteEscolha`.
- O engine não aplica a perda de Carisma dos poderes da Tormenta (p142). Hoje isso fica só no comentário do arquivo.
- Pré-requisitos com "ou" (Disparo Preciso: Estilo de Disparo ou de Arremesso; devoções de mais de um deus nos concedidos) ficam em texto. O engine só confere `pre.poderes` como "todos".
