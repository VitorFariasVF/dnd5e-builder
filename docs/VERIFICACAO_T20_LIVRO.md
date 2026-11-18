<!-- Relatório do verificador independente, 2026-11-17 -->
# Verificação independente dos dados do app (Tormenta20) contra o livro

Data: 2026-11-17. Verificador independente, somente leitura. Nenhum arquivo do app foi alterado.

## 1. Escopo e método

- Livro: `/mnt/user-data/uploads/T20_-_Livro_Básico_-_Jogo_do_Ano.pdf` (407 páginas do PDF). Página citada como pNNN = página do PDF; a impressa é NNN − 6.
- Dados do app lidos em `/home/claude/dnd5e-builder/tormenta20/` (rules.js, rules-niveis.js, rules-racas.js, rules-poderes.js, rules-equipamento.js, rules-magias.js, rules-magias-1-2.js, rules-magias-3-5.js). Os arquivos foram carregados num contexto isolado, sem gravar nada.
- Amostra: 60 itens sorteados com gerador congruencial de seed fixa, uma seed por categoria (não usei `shuf`/`random` do Python, como sugerido; o sorteio é reprodutível pelas seeds abaixo). Seeds: magias 7319/4421/9053; armas+armaduras 31337; itens 2024; poderes 555777; raças 8642; classes 60606; origens 77123.
- Conferência feita por leitura do texto da página e, quando a tabela vinha embaralhada, por renderização PNG (p24, p132, p134, p150, p151, p159, p162, p163) lida visualmente.
- Campos conferidos: magias (execução, alcance, alvo/área, duração, resistência, círculo, escola, tipo, custo base, custo e círculo de cada aprimoramento); armas (preço, dano, crítico, alcance, tipo, espaços); armaduras (preço, bônus na Defesa, penalidade, espaços); itens (preço, espaços); poderes (pré-requisitos); raças (ajustes, tamanho, deslocamento, nomes e efeitos das habilidades); classes (PV inicial, PV e PM por nível, perícias fixas e de escolha, magias de 1º círculo, círculos por nível); origens (perícias e poderes).
- Limite: os textos completos de todos os aprimoramentos de magia não foram comparados palavra por palavra; conferi os custos e a existência de cada aprimoramento.

## 2. Resultado por categoria

| Categoria | Itens | OK | ERRO | ILEGÍVEL |
|---|---|---|---|---|
| Magias | 12 | 12 | 0 | 0 |
| Armas e armaduras | 10 | 10 | 0 | 0 |
| Itens gerais | 6 | 5 | 1 | 0 |
| Poderes gerais | 10 | 10 | 0 | 0 |
| Raças | 8 | 8 | 0 | 0 |
| Classes | 8 | 8 | 0 | 0 |
| Origens | 6 | 6 | 0 | 0 |
| **Total** | **60** | **59** | **1** | **0** |

## 3. Lista completa de erros

1. **Peçonha comum** (itens gerais). Arquivo `rules-equipamento.js` (T20_ITENS). O app grava `espacos: null`; o livro indica 0,5 espaço (Tabela 3-6, p163). O preço (T$ 15) está correto. O próprio app documenta a escolha ("espaço 0,5 fracionário, campo fica null"), mas o campo inteiro perde o valor do livro. Gravidade baixa: é uma limitação do formato, não um valor trocado.

Nenhum outro erro na amostra.

## 4. Itens OK com ressalva (não contados como erro)

- **Humano** e **Lefou** (raças): o app grava ajuste "+1 em três atributos" como texto (`ajusteEscolha`), e a observação do próprio arquivo diz que a escolha não é aplicada pelo app. Os dados batem com o livro (p024, Tabela 1-2); a lacuna é funcional.
- **Ataque Preciso** (poder): o livro deixa a célula de pré-requisitos em branco na linha de sub-poder. Pela convenção da tabela (o mesmo ocorre em Piqueiro, que o texto da p134 diz exigir Estilo de Arma Longa), o pré-requisito é o poder-pai, Estilo de Uma Arma, que é o que o app grava. Conferido por inferência, não por texto explícito.
- **Alarme** aparece em `rules-magias.js` e em `rules-magias-1-2.js`. A deduplicação mantém a última ocorrência (1-2), que está correta.
- **Forma Etérea**: o aprimoramento de 5 PM está na p200, que continua o bloco iniciado na p199. Conferido.

## 5. Taxa de erro estimada por arquivo de dados

Estimativa simples de amostra (n pequeno). O intervalo de confiança de 95% é aproximado (Clopper-Pearson).

| Arquivo | Itens da amostra | Erros | Taxa estimada | IC 95% aprox. |
|---|---|---|---|---|
| rules-magias-1-2.js | 4 | 0 | 0% | 0–60% |
| rules-magias-3-5.js | 8 | 0 | 0% | 0–37% |
| rules-magias.js | 0 próprios (Alarme é sobrescrito por 1-2) | — | — | — |
| rules-equipamento.js | 16 (10 armas/armaduras, 6 itens) | 1 | 6% | 0,2–30% |
| rules-poderes.js | 10 | 0 | 0% | 0–31% |
| rules-racas.js | 8 | 0 | 0% | 0–37% |
| rules.js (classes e origens) | 14 | 0 | 0% | 0–23% |
| rules-niveis.js | não amostrado | — | — | — |
| rules-magias-fim.js | não amostrado (sem entradas) | — | — | — |

Total: 1 erro em 60 itens, cerca de 1,7% (IC 95% aproximado de 0,04% a 9%).

## 6. Leitura honesta do resultado

- Na amostra, quase tudo bate com o livro. Não encontrei erros de valor em magias, armas, armaduras, poderes, raças, classes ou origens; o único desvio é de representação (fração de espaço).
- A amostra é pequena: 60 de cerca de 800 entradas somadas (199 magias, 51 armas e armaduras, 125 itens, 351 poderes, 18 raças, 14 classes, 35 origens). Com 0 erros em 4 a 14 itens, o intervalo ainda admite taxas de até 20% a 60% por arquivo. Não é possível afirmar que todo o banco esteja correto.
- Não verifiquei `rules-niveis.js` nem os aprimoramentos de texto de forma exaustiva. Os itens que o app marca como `verificado: false` (por exemplo, Corrente de espinhos e Peçonha comum) não foram usados como argumento para OK; cada um foi conferido contra o livro do mesmo modo.

## 7. Arquivos gerados

- Este relatório: `/tmp/t20/verificacao_independente.md`.
- Renderizações PNG pedidas para conferência: `/tmp/t20/ver_24-024.png`, `/tmp/t20/ver_132-132.png`, `/tmp/t20/ver_134-134.png`, `/tmp/t20/ver_150-150.png`, `/tmp/t20/ver_151-151.png`, `/tmp/t20/ver_159-159.png`, `/tmp/t20/ver_162-162.png`, `/tmp/t20/ver_163-163.png`.
- Nenhum arquivo em `/home/claude/dnd5e-builder` foi alterado.

## 8. Memória

Não usei nenhuma informação da memória do usuário para esta verificação. Não há nada novo a registrar na memória a partir desta tarefa.
