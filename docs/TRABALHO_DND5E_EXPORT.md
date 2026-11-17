# Trabalho: exportações VTT do D&D 5e (Foundry e Roll20)

Data: 2026-11-17 · Branch: `multi-sistema` · Escopo editado: `dnd5e/export.js`, `dnd5e/export-roll20.js`, `dnd5e/tests/test_export_vtt.js` e este arquivo.

**Nada disto foi testado em um VTT real.** Não houve Foundry (dnd5e 5.3.x) nem campanha Roll20 para importar o resultado. Os testes em `dnd5e/tests/test_export_vtt.js` conferem a estrutura do JSON e do script contra as regras declaradas no código e contra as fontes abaixo. Quem for importar precisa confirmar cada item da seção "Sem teste real".

## O que mudou

| # | Item | Situação | Arquivo |
|---|---|---|---|
| 1 | Recarga "curto ou longo" (Segundo Fôlego) | **Feito.** `recargaPeriodos()` devolve `sr` e `lr` quando o texto cita os dois. Antes saía só `sr`. | `export.js` |
| 1b | Segundo Fôlego sem nenhum uso no JSON | **Feito.** O `dedupFoundryItems` descartava o recurso (mesmo nome da habilidade de classe) e mantinha o item sem `uses`. Agora o item único recebe `max` e `recovery` do recurso. | `export.js` |
| 1c | Recursos do ator (`resources.primary/secondary/tertiary`) | **Feito.** Usam o mesmo `recargaPeriodos()`. Texto sem descanso ("Por turno", "Especial", "Usa espaço de magia") agora sai sem período. Antes saía `lr`. | `export.js` |
| 2 | Estrutura de itens (`activities`, `uses`, `advancement`) | **Conferido.** Sem mudança de formato: `activities` por id, `advancement` como objeto e `uses.recovery` continuam como estavam. Ver a seção de fontes. | `export.js` |
| 2b | Metadados de versão | **Feito.** Alvo fixado em `FOUNDRY_SYSTEM_VERSION = '5.3.3'` (antes `5.3.2`). | `export.js` |
| 3 | Personalidade corrompida no import Foundry | **Feito no export.** A biografia recebe só o texto livre (descrição em `biography.value`, história em `biography.public`), sem HTML e sem repetir traços, ideais, vínculos e defeitos, que já têm campo próprio (`trait`, `ideal`, `bond`, `flaw`, `appearance`). O import (`ui.js`) lê esses campos de volta e a personalidade fecha. | `export.js` |
| 3b | Backup JSON | **Verificado, sem mudança.** `aplicarPayloadBackupNaFicha` copia `payload.personalidade` inteiro, então já era íntegro. | (ui.js, só leitura) |
| 3c | Antecedentes em português | **Feito.** Os 7 antecedentes de 2024 sem nome em inglês ganharam mapa: Artesão→Artisan, Fazendeiro→Farmer, Guarda→Guard, Guia→Guide, Mercador→Merchant, Escriba→Scribe, Viajante→Wayfarer. Os 13 de 2014 já tinham. | `export.js` |
| 4 | Roll20: CA | **Feito.** `custom_ac` e `custom_ac_flag` saíram. A CA vai para `ac`, o campo que a wiki lista. | `export-roll20.js` |
| 4b | Roll20: iniciativa | **Feito.** `initiative_bonus` não é mais gravado. O app gravava `0`, o que zeraria o modificador de Destreza que a ficha soma sozinha. | `export-roll20.js` |
| 4c | Roll20: comentário de origem dos nomes | **Feito.** O cabeçalho separa o que foi conferido do que não foi. | `export-roll20.js` |

## Fontes das decisões

**Foundry (dnd5e):**
- Release 4.0.0 (`newreleases.io/project/github/foundryvtt/dnd5e/release/release-4.0.0`): "Items may now contain multiple activities", com `ActivitiesTemplate` substituindo `ActionTemplate` e `ActivatedEffectTemplate`. Base para manter `system.activities` como objeto por id.
- Releases 5.3.0 a 5.3.3 (`github.com/foundryvtt/dnd5e/releases`): "Advancement data is now stored as an object instead of an array (breaking)" (5.3.0). Base para `system.advancement: {}`. Esta mesma página lista 5.3.3 como a versão mais nova consultada; é a origem do alvo `5.3.3`.
- Release 5.0.0 (`newreleases.io/.../release-5.0.0`): "this release is only available on v13 of the core software". Confirma o `coreVersion: '13.351'` mantido.
- Release 5.2.0 (`newreleases.io/.../release-5.2.0`): Cast activities deixaram de ser aceitas em itens de magia. Por isso as magias continuam com atividade `utility` (ver "Não feito").
- Release 4.1.0 (`newreleases.io/.../release-4.1.0`) cita "species" como item ("Fixed error thrown when adding or removing a species from a blank character sheet"). Ver "Sem teste real".
- Recarga do Segundo Fôlego: `rules.js` linha 836 (`recarga:'Descanso curto ou longo'`). Dado do próprio repositório; não foi conferido contra o livro nesta tarefa.

**Roll20 (D&D 5E by Roll20, OGL):**
- Wiki OGL (`wiki.roll20.net/OGL`): `strength_base`, `strength_mod`, `acrobatics_prof`, `acrobatics_type`, `hp|max`, `ac`, `speed`, `initiative_bonus` (total usado em rolagens) e `initmod` (modificador customizado), `lvlN_slots_total` e `lvlN_slots_expended` (o expended guarda os espaços restantes), `repeating_attack`, `repeating_spell-N`, `repeating_inventory`, `repeating_traits`.
- Fórum Roll20 (`app.roll20.net/forum/permalink/11665357`): `atkname`, `dmgbase` (exemplo `1d6`), `atkattr_base`, `atkprofflag`, e `dmg2flag` como checkbox de segundo bloco de dano.
- A wiki não lista `custom_ac`. Ela diz que a CA customizada é configurada em Settings > Armor Class Tracking, que é uma opção da ficha e não um atributo.

**2024 (antecedentes):**
- Reveal do Livro do Jogador 2024 no fórum EN World (`enworld.org/threads/2024-players-handbook-reveal-feats-backgrounds-species.704825/latest`): lista os 16 antecedentes em inglês. Fonte de comunidade, não oficial.

## Não feito (com motivo)

- **Magias sem atividade útil (audit B2).** Todas saem com uma atividade `utility`, então não rolam ataque, dano nem salvaguarda. Para corrigir, o app precisaria de dados estruturados de dano e salvaguarda por magia, que hoje estão só no texto `resumo`. Inventar esses dados violaria a regra do contrato ("não invente"). Fica para uma etapa com fonte por magia.
- **Tipo de item de espécie (`race` ou `species`).** As notas da 4.1.0 falam em item de espécie, mas não dizem o nome exato do tipo. Não encontrei a fonte do código. Mantive `race`. Se o Foundry 5.3 exigir `species`, o export precisa mudar, e o import (`ui.js`) também.
- **Import de personalidade no `ui.js`.** O import Foundry continua dividindo `ideal` e `bond` por `|`. Um texto de ideal com `|` quebra. Isso está em `ui.js`, fora da lista de arquivos desta tarefa.
- **Expertise no Roll20.** O app grava `(@{pb})` nas perícias; a wiki mostra `(@{pb}*@{acrobatics_type})`. Sem expertise no app, o resultado é o mesmo, mas o campo de tipo não é preenchido.
- **Valores de tipo de dano no Roll20.** `dmgtype` sai com o texto em português ("cortante"). A ficha aceita texto livre, mas não há fonte que diga o valor esperado.

## Sem teste real (o que precisa ser checado num VTT)

**Foundry (dnd5e 5.3.x, Foundry v13):**
1. Importar `personagem_foundry_actor.json` num mundo novo e conferir se o item Segundo Fôlego mostra "1/1" com recarga de descanso curto e longo.
2. Conferir se `system.uses.recovery` aceita `{period:'sr'|'lr', type:'recoverAll'}`. A forma foi mantida como estava, sem fonte direta no código do sistema.
3. Conferir se o item de espécie entra como `race` ou se a ficha pede `species`.
4. Conferir a biografia: descrição e história aparecem sem tags HTML.
5. Conferir se `attributes.hp.max` mantém o PV calculado depois de o ator ser recalculado.

**Roll20 (ficha D&D 5E by Roll20):**
1. Rodar o script de API numa campanha com assinatura Pro e conferir os campos criados (`!vf-importar-<nome>`).
2. Conferir `save_prof`, `spellcastingability`, `repeating_spell-*`, `repeating_inventory` e `repeating_traits`. Nenhuma dessas fontes confirmou os nomes.
3. Conferir se `ac` aparece como CA e se `initiative_bonus` continua calculado pela ficha.

## Como rodar os testes

```
cd /home/claude/dnd5e-builder/dnd5e/tests
node test_export_vtt.js
```

Todos os arquivos de `dnd5e/tests` saem com código 0 (`test_export_vtt.js`: 22 de 22; `test_stage23_classes.js`: 308 de 308; `test_verificacao_dnd5e.js`: 124 de 124; os demais sem linha de total, mas sem nenhum item reprovado).

## Para a auditoria (`docs/AUDITORIA_FICHAS_VTT.md`)

A auditoria não foi editada, porque está fora da lista de arquivos desta tarefa. Atualizar: B1 continua feito; B3 e B4 continuam feitos; B5 passa a "feito no export, validar no VTT"; B6 passa a "feito"; a seção B2 continua "não feito"; a seção C (Roll20) ganha esta lista de confirmados e não confirmados.
