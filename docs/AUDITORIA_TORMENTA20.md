# Auditoria: Tormenta20 (Jambô, Edição Jogo do Ano)

> **Atualização 2026-11-17:** este documento descreve a primeira entrega, feita sem o livro. Os dados foram depois refeitos a partir do Livro Básico (PDF do usuário); veja `docs/TRABALHO_T20_*.md`. Uma amostra independente de 60 itens contra as páginas do livro teve 59 certos e 1 erro (espaço da Peçonha comum, limitação do formato).

Primeira entrega: criação de ficha do nível 1 ao 5, em `tormenta20/`.

## 1. Fontes consultadas

O livro básico **não foi consultado diretamente** (não há acesso à versão oficial). Todas as regras vêm de fontes públicas de terceiros, identificadas abaixo com as siglas usadas em `tormenta20/rules.js`.

| Sigla | Fonte | Tipo | Observação |
|---|---|---|---|
| [R] | Rotina de Mestre (artigos "Como criar sua ficha" e guias de classe) | Blog | Cita a "Edição Jogo do Ano (Jambô)" |
| [E] | exegetadearton.com.br (guia por classe, perícias, origens, raças) | Guia de fãs | Uma página por classe |
| [T] | tsrd.fandom.com (construção de personagem, trechos lidos por busca) | Wiki de fãs | Algumas páginas não puderam ser abertas |
| [I] | Issue #57 de DMBerlin/t20-community-patches (GitHub) | Issue | Cita páginas do livro (p. 20, 22, 25, 28) |
| — | tormenta-collab.fandom.com | Wiki de fãs | Não abriu (erro do site); não usada |

Não foi usado o texto de nenhum livro. Só mecânica (números, fórmulas, nomes) e descrições curtas escritas no app. Um PDF completo do livro apareceu nas buscas (anyflip) e **não foi usado**: parece cópia não autorizada.

Licença: a política da Jambô para Tormenta20 não foi confirmada. Por isso nada de texto do livro foi copiado.

## 2. Itens validados (duas fontes concordam)

- **Lista das 14 classes do livro básico**: Arcanista, Bárbaro, Bardo, Bucaneiro, Caçador, Cavaleiro, Clérigo, Druida, Guerreiro, Inventor, Ladino, Lutador, Nobre, Paladino. Fontes: [E] e a contagem de 14 classes em outro site de análise.
- **PV e PM confirmados em duas fontes**: Arcanista (8 + CON, +2/nível; PM 6), Cavaleiro (20 + CON, +5/nível; PM 3), Clérigo (16 + CON, +4/nível; PM 5), Druida (16 + CON, +4/nível; PM 4), Guerreiro (20 + CON, +5/nível; PM 3). Fontes [R] e [E].
- **Fixas de perícia** do Arcanista (Misticismo, Vontade), Cavaleiro (Fortitude, Luta), Clérigo (Religião, Vontade), Bardo (Atuação, Reflexos), Guerreiro (Fortitude e Luta ou Pontaria). Fontes [R] e [E] para os primeiros; Bardo e Guerreiro também batem.
- **Círculos de magia**: 2º no nível 6, 3º no nível 10, 4º no nível 14. Fonte: dois artigos da Rotina (Bardo e Druida).
- **Clérigo começa com 3 magias de 1º círculo**: [T] e [E].
- **31 perícias e seus atributos**, com as marcações "só treinado" e "penalidade de armadura". Fonte [E].
- **35 origens** (nomes). Fonte [E]; o número 35 bate com a contagem da página do livro em analog.games (ficha de 2020, "35 origins").
- **Atributos**: 6 atributos; modificador = valor do atributo (fonte [R] e [T]).
- **PV total**: PV inicial + CON no 1º nível; a cada nível soma PV por nível + CON (fonte [R]).
- **Defesa** = 10 + DES + armadura + escudo + outros (fonte [T]).
- **Teste de perícia**: 1d20 + metade do nível + atributo (+ metade do nível se treinada) (fontes [E] e [T]).
- **Versátil (Humano)**: treinado em 2 perícias à escolha (fonte [E]).
- **Minotauro**: Força +2, Constituição +1, Sabedoria −1 (livro p. 25, citado em [I]).
- **Hynne**: Pequeno, deslocamento 6 m (livro p. 28, citado em [I]).
- **Anão** tem visão no escuro (livro p. 20, [I]); **Elfo** tem visão na penumbra (livro p. 22, [I]).

## 3. Não verificado (listado para revisão no livro)

Itens marcados com `NÃO VERIFICADO` ou com `verificado: false` no código. O app mostra avisos sobre eles.

### 3.1 Conflito entre fontes (não calculado)
- **Bardo**: PV inicial e por nível. [R] dá 12 + CON e +3/nível; [E] dá 16 e +4/nível. O app não calcula PV de Bardo (mostra "não calculado"). PM 4/nível e as 8 perícias (2 fixas + 6 livres) estão concordes.

### 3.2 Uma fonte só (calculado, mas marcado como não confirmado)
- PV e PM de Bárbaro (24, +6; PM 3), Bucaneiro (16, +4; PM 3), Caçador (16, +4; PM 4), Inventor (12, +3; PM 4), Ladino (12, +3; PM 4), Lutador (20, +5; PM 3), Nobre (12, +3; PM 4), Paladino (20, +5; PM 4). Todas vêm só de [E].
- Perícias por nível das classes de uma fonte: Bárbaro 4, Bucaneiro 4, Caçador 6, Inventor 4, Ladino 8, Lutador 4, Nobre 4, Paladino 2. Todas de [E].
- Perícias fixas de Bárbaro, Bucaneiro, Caçador, Druida, Inventor, Ladino, Lutador, Nobre e Paladino: NÃO VERIFICADO (o app assume lista vazia).
- Magias conhecidas no 1º nível do Arcanista (3) e do Druida (2): uma fonte cada. Bardo (2): só [R].
- Paladino: [E] diz que ganha magia pelo poder Orar no 2º nível. A condição de conjurador do Paladino não foi confirmada.
- Resistência forte: Clérigo e Paladino NÃO VERIFICADO.

### 3.3 Regras sem fonte confirmada
- **Bônus de perícia não treinada**: o app mostra só o atributo. A regra exata não foi achada.
- **Bônus de treino**: o app usa metade do nível (fontes [E] e [T]). Se o livre disser que treinada soma um valor fixo (ex.: +2), o cálculo muda. Não confirmado.
- **Perícias por nível**: o app usa "X por nível × nível" + INT positiva uma vez. Se a INT positiva valer também em todos os níveis, o app dá poucas perícias. NÃO VERIFICADO.
- **Compra de atributos**: custos 0→0, 1→1, 2→2, 3→4, 4→7, −1 devolve 1; 10 pontos. Fonte única [R]. Não confirmada.
- **PM do conjurador**: o app soma o atributo de magia uma vez ao total (verificado só no nível 1 pela fonte [R], com Clérigo). Nos níveis 2 a 5 é uma suposição.
- **Ajustes de atributo** de Humano, Anão, Elfo e Hynne: NÃO VERIFICADO. O app deixa o ajuste em 0 e o jogador lança manualmente.
- **Tamanho e deslocamento** de Anão e Elfo: NÃO VERIFICADO. O app assume Médio e 9 m (o deslocamento padrão aparece em [I]).
- **Habilidades raciais** do Minotauro: NÃO VERIFICADO.
- **Benefícios específicos de cada origem**: NÃO VERIFICADO. O app deixa o jogador escolher 2 perícias ou 2 poderes (fonte [R]).
- **Dinheiro inicial (T$)**: NÃO VERIFICADO. O app não sugere valor.
- **Quantidade de poderes** por nível: NÃO VERIFICADO. O app não conta poderes.
- **Magias conhecidas e círculo acima do 1º nível**: NÃO VERIFICADO. A generalização do círculo para todos os conjuradores também não foi confirmada (só Bardo e Druida).
- **Atributo de magia do Arcanista**: o app oferece Inteligência (Mago/Bruxo) e Carisma (Feiticeiro); a escolha é do jogador.
- **Aumentos de atributo por nível**: não implementados (NÃO VERIFICADO). O app não tem campo próprio; usar o ajuste manual.

## 4. Lacunas do escopo (não implementado nesta entrega)

- Níveis 6 a 20 (círculos 3 e 4 de magia, aumentos de atributo, poderes por nível).
- Tabelas de armas, armaduras, escudos e equipamentos. O app pede os bônus de armadura e de escudo como números.
- Lista de magias e de poderes do livro.
- Opção de Humano de trocar uma perícia por um poder geral.
- Arcanista (Feiticeiro) e outras subclasses: o app não tem subclasses.
- Descrição completa de habilidades de classe.

## 5. Foundry VTT

Pesquisa na web (foundryvtt.com):

- Existe sistema de Tormenta20 para Foundry: "Tormenta20", de Vizael. A página diz que é **não oficial** e que suporta Foundry 0.7.8 a 14, com as edições "Jogo do Ano" e "Legado". Não traz o formato do ator nem o ID do sistema.
- Existe também o módulo "Tormenta20: Ficha Heroica", de Neutropac, não oficial, para Foundry 13 a 14. Também não traz o formato do ator.
- O repositório DMBerlin/t20-community-patches (issue #57) cita o "Tormenta20 1.6.5" do compêndio do sistema, o que sugere que o sistema usa tipos de item e raça em compêndio. Não foi possível ler o código-fonte do sistema para confirmar os nomes de tipo de ator e os campos.

**Resultado**: `foundry-tormenta20-*.json` é um **rascunho de documento genérico de ator** (tipo `character`), com nomes de campo deste app. **NÃO foi testado em VTT real** e os nomes de campo não foram conferidos com o sistema Tormenta20 do Foundry. O próprio JSON traz o aviso em `flags["tormenta20-builder"].aviso`.

## 6. Como rodar os testes

Na raiz do repositório:

```
node tormenta20/tests/run_all.js
```

Os cinco arquivos `test_*.js` (Node, `vm`, sem dependências) cobrem:

- `test_01_calculos.js`: PV, PM, Defesa, perícias e compra de atributos, com 3 personagens conferidos à mão e casos de borda.
- `test_02_validacao.js`: caso aceito e caso recusado para cada etapa, nos modos estrito e livre.
- `test_03_backup.js`: round trip do backup JSON e recusas (outro sistema, versão 2, JSON inválido).
- `test_04_pdf_foundry.js`: PDF com 2 páginas A4, cor da classe, escape do nome; rascunho de ator Foundry.
- `test_05_release.js`: referências do `index.html`, padrão VF Tools, sem função duplicada, fonte em cada dado, sem `alert()` nem emoji.

Teste de navegador (precisa de Playwright e `/usr/bin/google-chrome`, fora do `run_all.js`):

```
node tormenta20/tests/e2e_chrome.js
```

Percorre a criação de um Clérigo nível 1 em 1100 px e 360 px: confere erros de console, rolagem lateral em cada etapa, recusa no modo estrito, valores derivados, exportação do PDF (2 páginas geradas pelo Chrome) e round trip do backup pela tela. Capturas em `/tmp/t20-capturas`.

Resultado da última execução: todos os testes de Node passam (36 + 42 + 14 + 19 + 19 checagens), e o teste de navegador passa nos dois tamanhos, sem erro de console.

## 7. Não verificado nesta entrega

- Regras contra o livro oficial (não consultado diretamente).
- Foundry VTT real (não testado).
- Impressão física do PDF (só geração pelo Chrome e contagem de páginas).
- Acessibilidade com leitor de tela (só checagens de `role`, `label` e foco).

> **Atualização:** o sistema agora cobre os níveis 1 a 20 e as 17 raças (`TRABALHO_T20_INTEGRACAO.md`). Esta auditoria descreve a primeira entrega (níveis 1 a 5).
