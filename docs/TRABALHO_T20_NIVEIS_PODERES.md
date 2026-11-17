# Tormenta20: níveis 6 a 20 e catálogo de poderes (2026-11-17)

Frente só de dados. A interface ainda não usa T20_NIVEIS nem T20_PODERES.

## Arquivos
- `tormenta20/rules-niveis.js`: `T20_NIVEIS`, uma linha por nível (6 a 20) das 14 classes.
- `tormenta20/rules-poderes.js`: `T20_PODERES`, objeto por id, 194 entradas.
- `tormenta20/tests/test_07_niveis_poderes.js`: 160 checagens.
- `tormenta20/tests/_ambiente.js` e `test_05_release.js`: incluídos os dois arquivos novos e as contagens.

## Fontes
- [E] exegetadearton.com.br: páginas de classe (progressão e poderes com nível). Declara vir da Tormenta Collab Wiki, então não é independente de wiki.
- [R] Rotina de Mestre: guia do Ladino e guia do Bardo. Usado como segunda fonte.
- Não abertos: tsrd.fandom (fora da lista permitida), tormenta-collab (erro do site), repositório do sistema Foundry (fora da lista), pergaminhosdomestre (robots). Nenhum PDF foi aberto; um resultado de Scribd com título de livro foi ignorado.
- Livro básico e ficha oficial da Jambô: não acessados.

## Cobertura por classe (6 a 20)
Todas as 14 classes têm 15 linhas. PV e PM por nível conferem com `rules.js`. Bônus de treino é metade do nível (uma fonte, ver abaixo).

| Classe | Habilidades listadas | Poderes com nível | Círculos |
|---|---|---|---|
| Arcanista | 1 | 6 níveis | sim (conflito) |
| Bárbaro | 5 | 7 níveis | não |
| Bardo | 1 | 4 níveis | sim (2 fontes) |
| Bucaneiro | 2 | 6 níveis | não |
| Caçador | 1 | 6 níveis | não |
| Cavaleiro | 2 | 6 níveis | não |
| Clérigo | 1 | 6 níveis | sim (conflito) |
| Druida | 1 | 7 níveis | sim (1 fonte) |
| Guerreiro | 2 (sem efeito lido) | 6 níveis | não |
| Inventor | 8 | 5 níveis | sim (só 6º) |
| Ladino | 10 | 7 níveis | não |
| Lutador | 6 | 7 níveis | não |
| Nobre | 1 | 5 níveis | não |
| Paladino | 2 | 8 níveis | não |

Habilidades sem efeito lido na fonte ficam com `frase: null`. Ataque Extra e Campeão do Guerreiro são exemplos.

## Confirmado por duas fontes
- Ladino: PV +3 e PM +4 por nível; Oportunismo no 6º; Ataque Furtivo 5d6 no 9º e 8d6 no 15º.
- Bardo: PM +4 por nível; magia nova nos níveis pares; círculos de 2º, 3º e 4º em 6, 10 e 14; Manipular em Massa no 10º; Artista Completo no 20º.

Todo o resto está como 1 fonte e `verificado: false`.

## Conflitos entre fontes (não resolvidos)
- PV do Bardo: [E] 16 inicial e +4 por nível; [R] 12 mais CON e +3 mais CON. Fica `pv: null`.
- Poderes de classe do Bardo: [E] em todo nível a partir do 2º; [R] só em níveis ímpares. Aparece nas notas.
- Círculos: [E] dá Arcanista e Clérigo com 2º no 5º e 3º no 9º; [E] dá Bardo e Druida com 6, 10 e 14. A progressão do `rules.js` (T20_CIRCULOS, NÃO VERIFICADO) segue a segunda versão.
- Bônus de treino: [R] diz metade do nível; [E] fala em "bônus de treinamento" sem fórmula.

## O que ficou de fora
- Poderes gerais de combate, destino, magia e tormenta: só 3 gerais (Acuidade com Arma, Esquiva, Mobilidade) e 2 concedidos (Dom da Verdade, Aura Bélica), todos só com nome. A lista geral da [E] veio sem pré-requisitos, e as páginas individuais não abriram.
- Poderes de raça, Companheiros, Familiares, Magias e Equipamento: fora do escopo.
- Níveis de acesso não informados: Paródia e Assassino em Série (o 20º é citado mas o 11º tem nota), Mestre Assassino e Mestre Envenenador (requisitos não lidos), Força da Natureza (DB), Aura de Arrependimento (exige golem).
- Degraus do dano desarmado do Lutador, Baluarte e Duelo do Cavaleiro, Esquiva Sagaz do Bucaneiro, Explorador e Marca da Presa do Caçador, Palavras Afiadas do Nobre: subidas a cada N níveis sem os níveis fixados na fonte.
- Totais acumulados de PV e PM: dependem de CON e SAB, que não entram nas linhas.
- 5º círculo de magia (sem fonte).
- Efeitos de Golpe Divino, Cura pelas Mãos e Inspiração de Bardo em níveis não citados.

## NÃO VERIFICADO (resumo)
- Tudo o que não está marcado com duas fontes nas linhas e no catálogo.
- Tipo e subtipo de 26 poderes ficam `tipo: null`. São 25 que só aparecem como pré-requisito de outro poder (nome citado em [E], página própria não lida) e Especialização em Armadura, listada como poder de classe do Guerreiro e do Cavaleiro na mesma fonte.
- Subtipo (combate, destino, magia, tormenta) não foi verificado em nenhum poder: todos ficam `subtipo: null`.

## Testes
- `node tormenta20/tests/test_07_niveis_poderes.js`: 160 de 160.
- `node tormenta20/tests/run_all.js`: 8 arquivos, todos passam.
