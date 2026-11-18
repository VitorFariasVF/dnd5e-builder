# Tormenta20: revisão de classes, perícias, origens e progressão contra o livro-base

Data: 2026-11-17. Fonte primária: livro-base do usuário, Tormenta20 Jogo do Ano, lido página a página
(texto em /tmp/t20/pNNN.txt). Citação: "Tormenta20 Jogo do Ano, pNNN (livro do usuário)", com pNNN a página do PDF
(não a página impressa). Todo o texto aqui é mecânica resumida em palavras próprias.

## Escopo e arquivos

| Arquivo | Situação |
|---|---|
| tormenta20/rules.js | revisado: perícias, atributos, origens (benefícios), classes, círculos, fontes |
| tormenta20/rules-niveis.js | revisado: níveis 6 a 20 das 14 classes, poderes com nível confirmado |
| tormenta20/engine.js | corrigido: valor de perícia, perícias livres, PV mínimo, PM do Paladino, círculos por classe |
| tormenta20/validator.js | sem mudança (a regra de perícias livres sai do engine) |
| tormenta20/tests/*.js e _ambiente.js | atualizados só onde o livro contradiz o teste (lista abaixo) |
| rules-racas.js, rules-poderes.js, rules-equipamento.js, rules-magias*.js, ui.js | NÃO editados (outro dono; ver lacunas) |

Mudança de sentido do selo "verificado": agora significa "confirmado no livro-base". Antes significava "duas fontes
públicas". A UI ainda escreve "2 fontes" nesse selo (ver lacunas).

## Tabela principal: item | app antes | livro | ação

### Mecânica geral

| Item | App antes | Livro | Ação |
|---|---|---|---|
| Compra de atributos (10 pontos, início 0, -1 dá 1 ponto, custos 0/1/2/4/7) | verificado false | p023, Tabela 1-1 | OK; verificado true |
| Modificador de atributo = valor | 2 fontes sem o livro | p023, p120 | OK; citado no livro |
| Valor de perícia = metade do nível + atributo + treinamento (se treinada) | só treinada somava a metade; não treinada 0 | p120 | corrigido no engine (pericias[].bonus) |
| Bônus de treinamento | conflito registrado | +2 do 1º ao 6º, +4 do 7º ao 14º, +6 do 15º em diante (p120) | implementado (T20_BONUS_TREINAMENTO, t20BonusTreinamento) |
| Metade do nível (bônus em todas as perícias) | OK | p041, p120 | OK |
| Perícias: quantidade e lista | 31 perícias, incluindo Artes e Medicina | 29 perícias (p121); Medicina é poder geral (p132, p136); Artes não existe | corrigido: 29 |
| Perícias só treinadas | Conhecimento, Guerra, Ladinagem, Medicina, Nobreza, Religião (6) | Adestramento, Atuação, Conhecimento, Guerra, Jogatina, Ladinagem, Misticismo, Nobreza, Ofício, Pilotagem, Religião (11), p121 e descrições | corrigido |
| Perícias com penalidade de armadura | Acrobacia, Atletismo, Furtividade | Acrobacia, Furtividade, Ladinagem (p121) | corrigido (Atletismo sai; Ladinagem entra) |
| Atributo-chave de cada perícia (29) | OK nas 29 comuns | p121 (índice) | OK |
| Perícias livres | perícias por nível × nível + INT | "mais N" da Tabela 1-3 só no 1º nível (p038, p041) + INT positiva (p023, p120); subir de nível não dá perícia | corrigido no engine: periciasPorNivel + INT + racial |
| Defesa = 10 + Destreza + armadura + escudo | OK | p112 | OK; citado |
| PV: inicial + CON; por nível + CON, mínimo de 1 PV ao subir | sem o mínimo de 1 | p041, p112 | corrigido (t20PVTotal) |
| PM: por nível; conjurador soma o atributo-chave uma vez | OK | p043, p050, p063, p067 | OK |
| Paladino: CAR soma ao PM no 1º nível | não modelado | p082 (Abençoado) | novo campo pmAtributoNivel1; somado uma vez |
| Iniciativa | perícia de Destreza | p121 (índice: Iniciativa, Des) | OK |
| Bônus de treino (metade) em nível 6+ | tabela de rules-niveis | p041 | OK |
| Círculos de magia | tabela única 1/6/10/14 para todos | por classe: Arcanista e Clérigo 2º no 5º, 3º no 9º, 4º no 13º, 5º no 17º (p043, p063); Bardo e Druida 2º no 6º, 3º no 10º, 4º no 14º (p050, p067) | corrigido (T20_CIRCULOS por classe; t20CirculoMaximo(nivel, classe)) |
| Resistência forte por classe | texto de fã por classe | características de classe não definem (p038-p088) | null (NÃO VERIFICADO) |
| Deslocamento padrão | "pela raça" | 9 m por padrão (p112) | lacuna: rules-racas.js (outro dono) |
| Deuses e devotos (p100-p103) | não modelados | Tabela 1-20 | lacuna (ver abaixo) |

### Origens (p091, Tabela 1-19 em p093)

| Item | App antes | Livro | Ação |
|---|---|---|---|
| 35 nomes | 35 nomes | 35 origens | OK (4 nomes com grafia diferente: ver lacunas) |
| Regra de escolha | conflito registrado | dois benefícios: duas perícias, dois poderes, ou uma perícia e um poder (p091) | registrado como regra |
| Benefícios por origem | NÃO VERIFICADO | perícias e poderes de cada origem (p093) | T20_ORIGENS_BENEFICIOS, 35 entradas |
| Efeito dos poderes de origem | NÃO VERIFICADO | p094-p102 | fora desta revisão (lacuna) |

### Classes: PV, PM, perícias, proficiências e progressão

Legenda: OK = confere; corrigido = dado do app era diferente do livro e foi trocado; novo = dado ou regra que faltava.

| Classe | Item | App antes | Livro | Ação |
|---|---|---|---|---|
| Arcanista | PV inicial / por nível | 8 / 2 | 8 / 2 (p043) | OK; verificado |
| | PM por nível | 6 | 6 (p043) | OK |
| | Perícias fixas / livres | Misticismo, Vontade / 2 | Misticismo, Vontade, mais 2 (p038, p043) | OK; livres só no 1º nível |
| | Proficiências | não havia | nenhuma (p043) | novo |
| | Círculos | 2º no 5º (conflito) sem valor no 5º-14º | 2º no 5º, 3º no 9º, 4º no 13º, 5º no 17º (p043) | corrigido |
| | Magias no 1º nível | 3 | 3 no Bruxo e Feiticeiro; Mago começa com 4 (p043) | 3 mantido; Mago fica como lacuna |
| | Habilidades 6-20 | só Alta Arcana (20) | Magias 3º (9), 4º (13), 5º (17), Alta Arcana (20) (p043) | novo |
| | Poderes com nível | 8 ids, 4 sem nível no livro | Herança Aprimorada 6, Mestre em Escola 8, Fluxo de Mana 10, Herança Superior 11 | removidos 4 sem nível (Contramágica Superior, Trama Célere, Apoteose, Sifão de Mana) |
| Bárbaro | PV / PM | 24 / +6; 3 | 24 / +6; 3 (p047) | OK |
| | Perícias fixas / livres | nenhuma fixa / 4 | Fortitude e Luta, mais 4 (p047) | corrigido |
| | Proficiências | não havia | armas marciais e escudos (p047) | novo |
| | Habilidades 6-20 | RD 4 (8), 6 (11), 8 (14), 10 (17), Fúria Titânica (20) | acima + Fúria +3 (6), +4 (11), +5 (16), Instinto Selvagem +2 (9), +3 (15) (p047, p048) | novo; frases da RD trocadas pelas do livro |
| | Poderes com nível | 10 ids, 8 sem nível no livro | Crítico Brutal 6, Pele de Aço 8 | removidos 8 |
| Bardo | PV | null (conflito) | 12 + CON; 3 + CON por nível (p050) | corrigido (resolvido pelo livro) |
| | PM / perícias fixas / livres | 4 / Atuação, Reflexos / 6 | 4 / Atuação, Reflexos / mais 6 (p050) | OK |
| | Círculos | 2º (6), 3º (10), 4º (14) | idem (p050) | OK; verificado |
| | Proficiências | não havia | armas marciais (p050) | novo |
| | Habilidades 6-20 | Artista Completo (20) | Inspiração +3 (9), +4 (13), +5 (17); Artista Completo (20); magias 2º (6), 3º (10), 4º (14) (p050) | novo |
| | Poderes com nível | 5 sem nível no livro | Estrelato 6, Prestidigitação 6, Dança das Lâminas 10, Manipular em Massa 10 | removidos 5 |
| Bucaneiro | PV / PM | 16 / +4; 3 | 16 / +4; 3 (p053) | OK |
| | Perícias fixas | nenhuma | Reflexos, e Luta ou Pontaria (p053) | corrigido |
| | Habilidades 6-20 | Evasão Aprimorada (10), Sorte de Nimb (20) | + Esquiva Sagaz +2 (7), +3 (11), +4 (15), +5 (19) (p053) | novo |
| | Poderes com nível | 8 ids | Amigos no Porto 6, Touché 10, Ripostar 12 | removidos 5 |
| | Proficiências | não havia | armas marciais (p053) | novo |
| Caçador | PV / PM | 16 / +4; 4 | 16 / +4; 4 (p056) | OK |
| | Perícias fixas | nenhuma | Sobrevivência, e Luta ou Pontaria (p056) | corrigido |
| | Perícias livres | 6 | CONFLITO no livro: p038 diz "mais 4" e p056 diz "mais 6" | 6 mantido; selo de perícias false |
| | Habilidades 6-20 | Mestre Caçador (20) | Marca da Presa +1d12 (9), +2d8 (13), +2d10 (17); Explorador (7, 11, 15, 19); Mestre Caçador (20) (p056, p057) | novo |
| | Poderes com nível | 11 ids | Bote 6, Camuflagem 6, Escaramuça 6, Chuva de Lâminas 12, Escaramuça Superior 12 | removidos 6 |
| | Proficiências | não havia | armas marciais e escudos (p056) | novo |
| Cavaleiro | PV / PM | 20 / +5; 3 | 20 / +5; 3 (p059) | OK |
| | Perícias fixas / livres | Fortitude, Luta / 2 | Fortitude e Luta, mais 2 (p059) | OK |
| | Habilidades 6-20 | Resoluto (11), Bravura Final (20) | Baluarte +6 (9), +8 (13), +10 (17); Baluarte em aliados (7 e 15); Duelo +3 (7), +4 (12), +5 (17) (p059) | novo |
| | Poderes com nível | 6 ids, 2 sem nível no livro | Autoridade Feudal 6, Título 10, Especialização em Armadura 12, Estandarte 14 | removidos 2 |
| | Proficiências | não havia | armas marciais, armaduras pesadas e escudos (p059) | novo |
| Clérigo | PV / PM | 16 / +4; 5 | 16 / +4; 5 + SAB (p063) | OK |
| | Perícias fixas / livres | Religião, Vontade / 2 | Religião e Vontade, mais 2 (p063) | OK |
| | Círculos | 1/6/10/14 (genérico, errado) | 2º no 5º, 3º no 9º, 4º no 13º, 5º no 17º (p063) | corrigido |
| | Habilidades 6-20 | Mão da Divindade (20) | Magias 3º (9), 4º (13), 5º (17); Mão da Divindade (20) (p063) | novo |
| | Poderes com nível | 10 ids | Mestre Celebrante 12 | removidos 9 |
| | Proficiências | não havia | armaduras pesadas e escudos (p063) | novo |
| Druida | PV / PM | 16 / +4; 4 | 16 / +4; 4 + SAB (p067) | OK |
| | Perícias fixas / livres | nenhuma / 4 | Sobrevivência e Vontade, mais 4 (p067) | corrigido |
| | Círculos | 2º (6), 3º (10), 4º (14) | idem (p067) | OK; verificado |
| | Habilidades 6-20 | Força da Natureza (20) | Magias 2º (6), 3º (10), 4º (14); Força da Natureza (20) (p067, p069) | novo |
| | Poderes com nível | 13 ids | Forma Selvagem Aprimorada 6, Companheiro Aprimorado 6, Companheiro Mágico 8, Espíritos 10, Forma Selvagem Superior 12, Companheiro Lendário 18, Forma Primal 18 | removidos 5 (inclui Força da Natureza, que é habilidade) |
| | Proficiências | não havia | escudos (p067) | novo |
| Guerreiro | PV / PM | 20 / +5; 3 (conflito antigo) | 20 / +5; 3 (p071) | OK; verificado |
| | Perícias fixas | Fortitude, Luta ou Pontaria | Fortitude; Luta ou Pontaria (p071) | OK |
| | Habilidades 6-20 | Ataque Extra e Campeão sem efeito (frase null) | Ataque Especial +12 (9), +16 (13), +20 (17); Ataque Extra (6) e Campeão (20) com efeito (p071, p072) | corrigido e novo |
| | Poderes com nível | 5 sem nível no livro | Tornado de Dor 6, Planejamento Marcial 10, Especialização em Armadura 12, Mestre em Arma 12 | removidos 5 |
| | Proficiências | não havia | armas marciais, armaduras pesadas e escudos (p071) | novo |
| Inventor | PV / PM | 12 / +3; 4 | 12 / +3; 4 (p074) | OK |
| | Perícias fixas / livres | nenhuma / 4 | Ofício e Vontade, mais 4 (p074) | corrigido |
| | Círculo 2º no 6º | circulo 2 | fórmulas e engenhocas, não magia de classe (p076) | removido dos círculos de magia (circulo null) |
| | Habilidades 6-20 | Encontrar Fraqueza... Obra-Prima | confere (p074, p075, p076) | OK |
| | Poderes com nível | 5 ids: Alquimista Iniciado 6 (sem nível no livro) e outros 3 sem nível no livro | Mestre Alquimista 10 | removidos 4 |
| | Proficiências | não havia | nenhuma (p074) | novo |
| Ladino | PV / PM | 12 / +3; 4 | 12 / +3; 4 (p079) | OK; verificado |
| | Perícias fixas / livres | nenhuma / 8 por nível | Ladinagem e Reflexos, mais 8 no 1º nível (p079) | corrigido (fixas e livres) |
| | Ataque Furtivo | 1d6 no 1º, +1d6 a cada dois níveis | confere (p079) | OK |
| | Habilidades 6-20 | Olhos nas Costas (8), Evasão Aprimorada (10), A Pessoa Certa (20) | confere (p079, p080) | OK |
| | Poderes com nível | 12 ids | Oportunismo 6, Roubo de Mana 7, Veneno Persistente 8, Ladrão Arcano 13 | removidos 8 |
| | Proficiências | não havia | nenhuma (p079) | novo |
| Lutador | PV / PM | 20 / +5; 3 | 20 / +5; 3 (p082) | OK |
| | Perícias fixas / livres | nenhuma / 4 | Fortitude e Luta, mais 4 (p082) | corrigido |
| | Briga (dano desarmado) | 1d6 no 1º; 2d10 no 20º | 1d6, 1d8 (5), 1d10 (9), 2d6 (13), 2d8 (17), 2d10 (20) (p082) | novo (passos nos níveis 6 a 20) |
| | Casca Grossa | "+1 de Defesa" nos níveis 7, 11, 15, 19 | CON na Defesa a partir do 3º; +1 no 7º e a cada quatro níveis (p083) | frases corrigidas |
| | Golpe Violento (9), Dono da Rua (20) | confere | p083 | OK; Dono da Rua com efeito do livro |
| | Poderes com nível | 3 sem nível no livro | Trocação 6, Trocação Tumultuosa 8, Punhos de Adamante 8, Confiança dos Ringues 8, Imobilização 8, Trincado 10, Nome na Arena 11, Sequência Destruidora 12 | removidos 3 |
| | Proficiências | não havia | nenhuma (p082) | novo |
| Nobre | PV / PM | 12 / +3; 4 (errado) | 16 / +4; 4 (p085) | corrigido |
| | Perícias fixas / livres | nenhuma / 4 | Vontade fixa, e Diplomacia ou Intimidação; mais 4 (p085) | corrigido |
| | Habilidades 6-20 | Realeza (20) | Palavras Afiadas 4d6 (6), 6d6 (10), 8d6 (14), 10d6 (18); Realeza (20) (p085) | novo |
| | Poderes com nível | todos conferem | Autoridade Feudal, Estrategista, Liderar pelo Exemplo 6; Armadura Brilhante, Grito Tirânico, Inspirar Glória, Língua de Ouro 8; Título 10; General 12; Presença Majestosa 16 | OK |
| | Proficiências | não havia | armas marciais, armaduras pesadas e escudos (p085) | novo |
| Paladino | PV / PM | 20 / +5; 4 (errado) | 20 / +5; 3 (p088) | corrigido (PM 3) |
| | Perícias fixas / livres | nenhuma / 2 | Luta e Vontade, mais 2 (p088) | corrigido |
| | Carisma no PM do 1º nível | não modelado | p082 | novo (pmAtributoNivel1) |
| | Habilidades 6-20 | Cura pelas Mãos (6), Golpe Divino... | Cura pelas Mãos 2d8+2 (6), 3d8+3 (10), 4d8+4 (14), 5d8+5 (18); Golpe Divino +3d8 (9), +4d8 (13), +5d8 (17); Vingador Sagrado (20) (p088, p090) | novo; efeito do Vingador corrigido (o app inventava "Golpe Divino mais barato") |
| | Poderes com nível | 7 sem nível no livro | Aura de Cura 6, Aura Poderosa 6, Aura Ardente 10, Aura Antimagia 14, Aura de Invencibilidade 18 (p089) | removidos 7 |
| | Proficiências | não havia | armas marciais, armaduras pesadas e escudos (p088) | novo |

## Testes alterados (só onde o livro contradiz o teste)

| Arquivo | O que mudou | Motivo |
|---|---|---|
| test_01_calculos.js | Luta 5, Fortitude 4, Percepção 2 (eram 3, 2, 0); Religião = SAB + 1 + 2; livres do Clérigo 4 (eram 8); Sobrevivência 5 (era 3); círculo com classe; PV do Bardo 14 (era null) | p120 (treinamento); p038 (livres só no 1º nível); p050 |
| test_04_pdf_foundry.js | 29 linhas de perícia (eram 31) | p121 |
| test_05_release.js | 29 perícias; 35 origens com benefícios cadastrados | p121; p093 |
| test_06_fontes_cruzadas.js | reescrito com as expectativas do livro (perícias, selos, círculos, Paladino, Nobre, Bardo) | ver tabela principal |
| test_07_niveis_poderes.js | Bardo PV 3; fontes citam o livro; lista documentada de 71 poderes do catálogo sem nível no livro; Guerreiro com efeito; Druida 20 com Força da Natureza como habilidade | p050, p071, p072, p069 |
| test_09_integracao.js | Bardo PV 89 (CON +1 do Minotauro) e 69 (CON 0); círculos de Arcanista 4 e Druida 4 confirmados; treino manual 7 + 2 = 9; Guerreiro sem habilidade sem efeito; PDF e tela do Bardo com PV calculado | p050, p043, p067, p120 |
| _ambiente.js | expõe T20_ORIGENS_BENEFICIOS, T20_BONUS_TREINAMENTO e T20_BONUS_TREINAMENTO_FONTE | suporte aos testes |

Observação: test_09_integracao.js foi alterado no disco por outro agente durante esta revisão. As minhas edições
aplicaram sem conflito; conferir o diff antes de commitar.

Resultado: `node tormenta20/tests/run_all.js` passa nos 12 arquivos (exit 0).
`e2e_chrome.js` tem 48 verificações ok e 2 falhas, ambas de derivados do Clérigo nível 1 com Anão. A causa não é
desta revisão: o Anão agora tem CON +2, SAB +1, DES -1 em rules-racas.js (alterado por outro agente). Com esses valores,
o engine dá PV 20, PM 9 e Defesa 13, que batem com a fórmula. A asserção do e2e espera os valores antigos da raça.

## Lacunas (o que não foi resolvido nesta revisão)

1. Habilidades de classe de 1º a 5º nível: o livro traz (p043 a p088), mas T20_NIVEIS só cobre do 6º ao 20º e o
   engine lê 6 a 20. Cabe em estrutura nova, não na atual. Exemplos do livro: Arcanista 1 (Caminho do arcanista; magias de 1º),
   5 (magias de 2º); Bárbaro 1 (Fúria +2), 3 (Instinto selvagem +1), 5 (Redução de dano 2); Bardo 1 (Inspiração +1, magias de 1º), 5 (Inspiração +2);
   Caçador 1 (Marca da presa +1d4, Rastreador), 5 (Marca da presa +1d8); Guerreiro 1 (Ataque especial +4), 3 (Durão), 5 (Ataque especial +8);
   Lutador 1 (Briga 1d6, Golpe relâmpago), 3 (Casca grossa), 5 (Briga 1d8, Golpe cruel); Paladino 1 (Golpe divino +1d8), 3 (Aura sagrada), 5 (Golpe divino +2d8, Bênção da justiça).
2. Caminhos do Arcanista (Bruxo, Feiticeiro, Mago): atributo-chave, foco, memorização e número de magias iniciais (Mago: 4) não são modelados.
3. Poderes do catálogo (rules-poderes.js): 71 ids têm nível que o livro não confirma (lista no test_07). Quem mantém esse arquivo
   deve remover ou confirmar. Poderes sem nível no livro também não podem ser atribuídos a um nível.
4. Efeito dos poderes de origem (p094-p102) e poderes gerais: fora desta revisão.
5. Caçador: conflito interno do livro (perícias livres 4 em p038, 6 em p056). Mantido 6; selo de perícias false.
6. Resistência forte: o livro não define por classe; o app mostra NÃO VERIFICADO.
7. Deuses (p100-p103) e devoção: o app não modela os deuses nem os poderes concedidos.
8. Dinheiro inicial (T$) e equipamento de origem: não conferidos aqui (p091 e capítulo 3).
9. ui.js (outro dono) precisa de correções de texto:
   - linha 223: "Perícias livres por nível" deve dizer "no 1º nível";
   - linha 288: "por nível × nível" deve ser "no 1º nível" (a conta hoje mostra algo errado);
   - texto "2 fontes" do selo (t20Selo) deve passar a "livro" onde o dado vem do livro-base.
10. export-pdf.js (outro dono), linha 76: "metade do nível (1 fonte)" deve passar a citar o livro.
11. rules-racas.js (outro dono): ajustes do Anão (CON +2, SAB +1, DES -1) mudaram durante esta revisão e quebram 2 asserções do e2e;
    deslocamento padrão de 9 m (p112) deve ser usado quando a raça não informa.
12. Grafia das origens: "Amigo dos animais", "Assistente de laboratório", "Herói camponês" e "Membro de guilda" usam minúscula no app
    (o livro usa maiúsculas). Mantido para não quebrar fichas salvas.
13. Validação de perícias livres (validator.js, etapa 7): fichas de nível acima do 1º que tinham perícias "por nível" vão ter mais
    perícias escolhidas do que o novo total. O validator mostra erro de contagem; é o comportamento correto pelo livro.
14. Atributos 1 a 5 e aumento de atributo ao subir de nível (poderes): não revisados aqui.
