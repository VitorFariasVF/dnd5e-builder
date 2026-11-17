# Trabalho D&D 5e: raças, sub-raças, variantes, tamanho e Druida (2014)

Data: 2026-11-17. Branch `multi-sistema`. Arquivos tocados: `dnd5e/rules-racas.js` (dados e resolvedor), `dnd5e/rules-engine.js`, `dnd5e/validator.js`, `dnd5e/state.js`, `dnd5e/ui.js`, `dnd5e/tests/test_racas.js` (novo), este documento. Nenhum commit foi feito.

## Feito

- **Meio-Elfo:** Carisma +2 mais dois +1 em atributos diferentes, sem Carisma. A tela só oferece os atributos permitidos, e o validador recusa repetido ou Carisma (escolha inválida não entra no bônus).
- **Sub-raças de 2014:** Anão da Colina e da Montanha; Elfo Alto, da Floresta e Drow; Halfling Pés-Leves e Robusto; Gnomo da Floresta e das Rochas. Cada uma com bônus, deslocamento (Elfo da Floresta 35 pés), traços em texto e idioma extra (Elfo Alto). O PV +1 por nível do Anão da Colina entra no motor de PV.
- **Tiefling:** sem sub-raça. O Livro do Jogador 2014 não tem sub-raças para o Tiefling, então nenhuma foi inventada.
- **Humano Variante** (regra opcional, à escolha na etapa de raça): +1 em dois atributos diferentes, uma perícia e um talento. A perícia não pode repetir a da origem nem a da classe. O talento não pode ser um que peça escolha de atributo.
- **Draconato:** ancestral dracônico (dez opções). Cada uma define o dano da resistência, a forma (linha de 5 x 30 pés ou cone de 15 pés) e a salvaguarda da arma de sopro (Destreza ou Constituição). Os traços da ficha mostram esses valores.
- **Tamanho:** campo `tamanho` nas espécies de 2014 (Halfling e Gnomo Pequenos, as demais Médias). Aparece na prévia da etapa de raça e na linha de raça do resumo.
- **Druida (2014):** não usa armadura de metal. É uma restrição por cima da proficiência: a categoria "Armaduras médias" continua na lista da classe. Vale só no modo A e na edição 2014.
- **Etapa de raça:** erros de escolha aparecem em faixa `role="alert"` no topo do passo, com foco no campo, sem `alert()`.
- **Estado:** `subraca`, `subracaNome`, `escolhasRaciais`, `periciasRaciais`, `talentosRaciais` e `tamanho`, normalizados em `ensureStateShape`. Backup nativo antigo continua abrindo.

## Fora (não feito)

- **Backup `mini-foundry-offline-1` e exportações:** gravam a raça só pelo nome. Sub-raça e escolhas não entram nesse arquivo. Exige mexer em `export.js`, que não está na lista desta frente.
- **Tamanho no PDF e no Foundry:** `export-pdf.js` e `export.js` (Foundry usa `size: 'med'` fixo) não foram alterados.
- **Magias raciais:** truque do Elfo Alto, Magia Drow e Legado Infernal do Tiefling aparecem só como texto.
- **Traços com efeito de proficiência:** Versatilidade em Perícias do Meio-Elfo (duas perícias à escolha), Treino com Armas Élficas e Treinamento de Armadura Anã não entram nas proficiências.
- **Talentos com escolha de atributo** (por exemplo, Atleta) não são oferecidos ao Humano Variante.
- **Material do escudo:** o app não tem essa informação, então a restrição do Druida não recusa escudo de metal.
- **Edição 2024:** não alterada. Espécies de 2024 não têm tamanho nem fonte preenchidos; a ficha mostra "não modelado para esta edição".
- **Lacunas pré-existentes em `ui.js`:** `renderResumo` e `confirmarClasse` estão definidas duas vezes. Não mexi, mas o teste de release não pega isso.

## Fontes e status

Regra do contrato: item sem duas fontes conferidas tem `fonte` com "NÃO VERIFICADO" e aparece assim na prévia.

| Item | Fontes | Status |
|---|---|---|
| Anão da Colina (Sabedoria +1, PV +1 por nível) | 5e.d20srd.org (races), dnd-wiki SRD5:Dwarf, roll20 Races:Dwarf | verificado |
| Anão da Montanha (Força +2) | dnd-wiki SRD5:Dwarf | NÃO VERIFICADO (armadura só texto) |
| Elfo Alto | 5e.d20srd.org (races) | NÃO VERIFICADO |
| Elfo da Floresta (Sabedoria +1, deslocamento 35) | dnd5e.wikidot lineage:elf | NÃO VERIFICADO |
| Drow (Carisma +1, visão 120 pés) | dnd5e.wikidot lineage:elf; visão e sensibilidade também em roll20 Drow (bestiário) | NÃO VERIFICADO |
| Halfling Pés-Leves (Carisma +1) | 5e.d20srd.org (races) | NÃO VERIFICADO |
| Halfling Robusto (Constituição +1) | dnd5e.wikidot lineage:halfling | NÃO VERIFICADO |
| Gnomo da Floresta (Destreza +1) | dungeonmister.com (guia) | NÃO VERIFICADO |
| Gnomo das Rochas (Constituição +1) | 5e.d20srd.org (races) | NÃO VERIFICADO |
| Humano Variante | dnd5e.wikidot lineage:human | NÃO VERIFICADO (regra opcional do PHB cap. 5) |
| Draconato: tabela de ancestrais (dano, forma, salvaguarda) | dnd5e.wikidot lineage:dragonborn, roll20 Dragonborn Draconic Ancestry | verificado |
| Draconato: progressão da arma de sopro (2d6 a 5d6) e CD | dnd5e.wikidot lineage:dragonborn | NÃO VERIFICADO (uma fonte) |
| Meio-Elfo (Carisma +2 e dois +1) | docs/VERIFICACAO_DND5E.md (SRD 5.1), roll20 Races:Half-Elf | verificado |
| Bases das espécies de 2014 e tamanho | docs/VERIFICACAO_DND5E.md | verificado (tamanho não modelado antes desta frente) |
| Druida: sem metal | SRD 5.1 (druida), Roll20 Druid (conferido em docs/VERIFICACAO_DND5E.md) | verificado |

Não consegui abrir as páginas Roll20 de Elfo e Halfling nem a dnd-wiki de Elfo e Gnomo nesta sessão (bloqueio de allowlist). Por isso há itens com uma fonte só.

## Como rodar

```
cd dnd5e && node tests/test_racas.js
cd dnd5e && for f in tests/*.js; do node $f; done
```

`test_racas.js`: 98 verificações. Inclui três personagens completos conferidos à mão (Elfo da Floresta, Meio-Elfo com Força e Destreza, Draconato Preto) e um Humano Variante, com os atributos finais calculados no motor de regras.

Verificação no navegador (fora do repositório, em `/tmp`): Chrome headless em 1100 px e 360 px, fluxo de Meio-Elfo, Elfo, Draconato e Humano Variante, com erro de console e de página contados. Resultado: sem erro. Um fluxo de 2024 também passou: lista de espécies de 2024, sem sub-raça, bônus do antecedente preservado.

## Testes que falham fora desta frente

`tests/test_export_vtt.js` tem 2 falhas em personalidade no backup (`Foundry: personalidade...` e `Backup: personalidade...`). Não tocam raças e vêm do trabalho de exportação em andamento.
