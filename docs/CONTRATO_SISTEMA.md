# Contrato de um sistema

Cada sistema é uma pasta autocontida na raiz do repositório (`tormenta20/`, `coc7/`…). **Só mexa na sua pasta** (mais o seu `docs/AUDITORIA_<sistema>.md`).

## Arquivos
```
<sistema>/index.html     copie dnd5e/index.html: troque data-tool, título, descrição, h1 e scripts
<sistema>/rules.js       dados de regra (cada item com `fonte`)
<sistema>/state.js       estado + ensureStateShape()
<sistema>/validator.js   validações por etapa (modo A estrito, modo B livre)
<sistema>/engine.js      cálculos (derivados, perícias, pontos)
<sistema>/storage.js     salvar/carregar/histórico via VFTool (chaves "estado" e "historico")
<sistema>/ui.js          etapas, stepper, avisos
<sistema>/export.js      backup JSON {sistema, versaoEsquema, ...} + VTT (se existir)
<sistema>/export-pdf.js  PDF de 2 páginas A4 por window.print, tema próprio do sistema
<sistema>/main.js        inicialização
<sistema>/tests/         testes em Node (vm), um arquivo por tema; saem com código ≠ 0 se algo falhar
docs/AUDITORIA_<sistema>.md
```

## Regras de código
- Sem build, sem dependências. Scripts clássicos carregados por `<script>` em ordem.
- Estilo: reutilize `../vf/*.css` e `../core/style.css`. Cores só por `var(--...)` na página. No PDF vale paleta própria de pergaminho.
- Armazenamento só por `VFTool` (`data-tool` único: `tormenta20-builder`, `tormenta-rpg-builder`, `coc7-builder`).
- Avisos de validação: use o padrão do D&D (faixa no topo da etapa com `role="alert"`, rolar e focar o campo), nunca `alert()` bloqueante.
- Movimento só funcional, com `prefers-reduced-motion`.
- Para ver como o D&D fez stepper, escudos de atributo, toasts e PDF, leia `dnd5e/ui-theme.js` e `dnd5e/export-pdf.js` (copie e adapte; a extração para `core/` é a fase 4).

## Regras de conteúdo
- Guarde mecânica (números, fórmulas, nomes, pré-requisitos), não texto do livro. Descrição de característica: uma frase curta em palavras próprias.
- Todo dado de regra tem `fonte: "Livro, capítulo/página (edição)"`. Se não achou fonte, marque `fonte: "NÃO VERIFICADO"` e liste na auditoria.
- Pesquise na web as regras antes de escrever e confira contra mais de uma fonte quando possível. Não preencha de memória o que você não tem certeza.
- Não invente: se não sabe, declare a lacuna na auditoria em vez de preencher com um palpite.

## Testes mínimos
- Fórmulas derivadas contra casos conhecidos (ao menos 3 personagens completos conferidos à mão).
- Validações: caso aceito e caso recusado para cada regra de criação.
- Round-trip: exporta o backup JSON, importa de volta e compara.
- Teste de release: todo `<script>` e `<link>` do `index.html` existe; sem função duplicada.

## Entrega
Commits na sua branch com mensagens claras. Relatório final curto: o que foi feito, o que ficou de fora, o que não foi verificado, como rodar os testes.
