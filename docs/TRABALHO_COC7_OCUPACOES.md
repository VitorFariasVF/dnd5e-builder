# Ocupações da 7ª edição (coc7/rules-ocupacoes.js)

Data: 2026-11-17. Escopo: `coc7/rules-ocupacoes.js`, `coc7/tests/test_ocupacoes.js`, `coc7/tests/ambiente.js` (não incluído, ver pendências), `coc7/tests/test_release.js` (já listava o arquivo), este documento.

## Resultado

- O app passa de 10 para 19 ocupações: 9 novas (push) e 10 originais que ganharam `fonte` e `nv` por Object.assign. Fórmula, crédito e perícias das originais não mudaram (coberto pelo teste).
- Confirmadas (duas fontes que concordam): **6** (Antiquário, Médico, Autor, Jornalista, Professor, Soldado).
- NÃO VERIFICADAS: **13** (uma fonte ou fontes em conflito).
- Testes: `node coc7/tests/test_ocupacoes.js` (8 testes). Suíte `run_all.js` (119 testes) e `e2e_navegador.js` passam.

## Fontes usadas

| Fonte | Tipo | Ocupações usadas |
|---|---|---|
| Roll20 Compendium, Step Four (Determine Occupation) | Comunidade, texto de regras | Dez ocupações: fórmula, crédito e perícias |
| Roll20, páginas próprias (Antiquarian, Doctor of Medicine, Police Detective, Cat Burglar, Journalist, Sample Occupations) | Comunidade (mesmo site que o Step Four) | Antiquário, Médico, Detetive policial, Criminoso |
| Zardoz (blog, 2016) | Blog de comunidade | Antiquário |
| GamersDecide, citando Investigator's Handbook (pp. 72, 73, 78, 80, 81, 83, 86, 90) | Guia de fãs | Médico, Autor, Espião, Agente federal, Chefe de gangue, Fotógrafo, Caçador |
| WorldAnvil (páginas de professor, soldado/fuzileiro, oficial militar, pesquisador) | Guia de fãs (um autor) | Professor, Soldado (2ª fonte); Pesquisador (1 fonte) |
| The Role Players Guild, criação de investigador | Artigo de comunidade | Jornalista (2ª fonte de fórmula e crédito) |

Fora da pesquisa: não consegui ler a página de passo 4 da wiki oficial da Chaosium (fora da lista de URLs permitidas nesta sessão). O Investigator's Handbook e o Keeper Rulebook não estavam acessíveis. A ficha gratuita da Chaosium (sell sheet) não traz regras de ocupação. Uma cópia não autorizada não foi aberta.

Roll20 conta como um site só, mesmo com várias páginas. Por isso Antiquário, por exemplo, só ficou confirmado com o Zardoz como segunda fonte.

## Status por ocupação

| id | Nome | Fórmula | Crédito | Status | Fontes |
|---|---|---|---|---|---|
| antiquario | Antiquário | EDU × 4 | 30–70 | Confirmada | Roll20 + Zardoz |
| medico | Médico | EDU × 4 | 30–80 | Confirmada | Roll20 + GamersDecide (IH p. 78) |
| autor | Autor (original) | EDU × 4 | 9–30 | Confirmada | Roll20 + GamersDecide (IH p. 72) |
| jornalista | Jornalista investigativo (original) | EDU × 4 | 9–30 | Confirmada | Roll20 + TRG (perícias só do Roll20) |
| professor | Professor (original) | EDU × 4 | 20–70 | Confirmada | Roll20 + WorldAnvil |
| soldado | Soldado (original) | EDU × 2 + (DES ou FOR) × 2 | 9–30 | Confirmada | Roll20 + WorldAnvil |
| arqueologo | Arqueólogo (original) | EDU × 4 | 10–40 | NV | Roll20 |
| ladrao | Ladrão = Criminoso (original) | EDU × 2 + DES × 2 | 5–40 | NV | Roll20 (Step Four e página Cat Burglar) |
| diletante | Diletante (original) | EDU × 2 + APA × 2 | 50–99 | NV | Roll20 |
| explorador | Explorador (original) | EDU × 2 + (APA, DES ou FOR) × 2 | 55–80 | NV | Roll20 |
| enfermeiro | Enfermeiro (original) | EDU × 4 | 9–30 | NV | Roll20 |
| detetive | Detetive particular (original) | EDU × 2 + (DES ou FOR) × 2 | 9–30 | NV | Roll20 |
| detetive_policial | Detetive policial | EDU × 2 + (DES ou FOR) × 2 | 20–50 | NV | Roll20 (página própria) |
| espiao | Espião | EDU × 2 + (APA ou DES) × 2 | 20–60 | NV | GamersDecide (IH p. 90) |
| agente_federal | Agente federal | EDU × 4 | 20–40 | NV | GamersDecide (IH p. 80) |
| chefe_gangue | Chefe de gangue | EDU × 2 + APA × 2 | 60–95 | NV | GamersDecide (IH p. 81) |
| fotografo | Fotógrafo | EDU × 4 | 9–30 | NV | GamersDecide (IH p. 86) |
| cacador | Caçador de grande porte | EDU × 2 + (DES ou FOR) × 2 | 20–50 | NV | GamersDecide (IH p. 73) |
| pesquisador | Pesquisador | EDU × 4 | 9–30 | NV | WorldAnvil (1 fonte) |

Divergências registradas:
- Soldado: as duas fontes dão Firearms como perícia fixa; o app a mantém como escolha entre pistola e rifle (como estava).
- Médico: a Ciência aparece uma vez (Biologia). A Farmácia, a 2ª especialização, fica como especialização do jogador. O app não tem um campo para duas Ciências.
- Antiquário: a lista do Roll20 de ocupação diz "Own Language" como opção; usei a lista que Roll20 (amostras) e Zardoz dão (Idioma (outro)).

## Ocupações fora (e por quê)

- **Advogado, Militar, Líder de culto**: pedem Contabilidade, que não está em COC_PERICIAS. Não entraram. Precisam de perícia nova no app (base a confirmar).
- **Engenheiro**: pede Operar Maquinário Pesado, que não está em COC_PERICIAS. Não entrou.
- **Artista, Atleta, Clérigo, Bibliotecário, Policial (patrulha), Missionário, Parapsicólogo, Piloto, Marinheiro**: não achei fórmula e crédito em nenhuma fonte pesquisada. Só nomes em listas de personagem, sem números. Não entraram.

## Pendências para a coordenação (fora da minha lista de arquivos)

1. **`coc7/tests/test_pericias.js`, linha 70**: `COC_OCUPACOES.length !== 10`. Incluir `rules-ocupacoes.js` na lista `NUCLEO` de `ambiente.js` quebra essa linha. Por isso **não incluí** o arquivo na lista (a suíte continua verde). Para ligar: trocar o 10 por 19 em `test_pericias.js` e acrescentar `'rules-ocupacoes.js'` depois de `'rules.js'` em `NUCLEO`.
2. **`coc7/tests/run_all.js`**: acrescentar `'test_ocupacoes.js'` à lista `arquivos`. Não rodei o arquivo por ele; rodei direto e também a suíte inteira, que passa.
3. **Perícias**: Contabilidade e Operar Maquinário Pesado, se o projeto quiser as ocupações acima. Precisam de base com fonte.
4. **`docs/VERIFICACAO_COC7.md`**: a seção 2.5 ainda fala de 10 ocupações. Vale atualizar com estas conclusões.
