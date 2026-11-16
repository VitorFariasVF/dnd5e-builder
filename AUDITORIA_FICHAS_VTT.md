# Auditoria — criação de fichas, regras (5e 2014 + Xanathar / 5.5 2024) e exportação Foundry/Roll20

Data: 2026-11-16 · Escopo: `state.js`, `rules.js`, `rules-engine.js`, `validator.js`, `ui.js`, `export.js`, PDF.
Método: leitura do código + execução do app em VM (Node) com personagens de teste, inspecionando o JSON gerado.
**Limite:** o JSON Foundry foi conferido contra o esquema do sistema dnd5e 5.x por revisão estática. Não foi importado em um Foundry real, nem em um Roll20 real. Os itens marcados *(a testar no VTT)* precisam desse teste.

## Resumo

| Área | Situação |
|---|---|
| Regras D&D 5e (2014) PHB | Núcleo correto (PV, slots, bônus de proficiência, ASI por nível, Point Buy, Standard Array). Lacunas em raças, subclasses PHB, armas e armaduras. |
| Xanathar's | **Todas** as 29 subclasses de Xanathar estão presentes. |
| D&D 5.5 (2024) | **Não existe.** Todo o catálogo é 2014. Não há seleção do tipo de ficha. |
| Foundry VTT | Gera Actor JSON, mas com problemas de PV, fontes de regra misturadas, itens duplicados, magias sem atividade e importação que corrompe a personalidade. |
| Roll20 | **Não existe** exportação nem importação. |
| PDF | Funciona, mas: unidade errada (metros no lugar de pés), campos de personalidade sem escape de HTML, visual sem arte. |
| Código | Funções definidas várias vezes (a última vence), testes quebrados. |

## A. Regras de criação

### A1. Crítico — não existe seleção do tipo de ficha (2014 × 2024)
- `state.js` não guarda a edição das regras. Nada na UI pergunta isso.
- Raças trazem bônus de atributo fixo (modelo 2014). No 5.5 o bônus vem do antecedente, e a espécie não dá bônus.
- Os 13 antecedentes são os de 2014 (sem talento de origem, sem bônus de atributo). O 5.5 tem 16 antecedentes, cada um com 3 atributos, 1 talento de origem, 2 perícias e 1 ferramenta.
- Classes e subclasses são 2014 (subclasse no nível 1/2/3 conforme a classe; o 5.5 usa nível 3 para todas, além de Maestria em Arma e outros recursos novos).
- `export.js` marca `source.rules` como `"2014"` e `"2024"` no **mesmo ator** (armas e armaduras saem como 2024, o resto como 2014).

### A2. Alto — raças 2014 incompletas
- Elfo, Anão, Halfling e Gnomo não têm **sub-raça**. Faltam Alto/Floresta/Drow, Colina/Montanha, Pés Leves/Robusto, Floresta/Rocha, com os bônus e traços de cada uma.
- Meio-Elfo recebe só +2 Carisma. A regra dá +2 Carisma e **+1 em dois outros atributos à escolha**.
- Humano Variante (2 atributos +1, 1 perícia, 1 talento) não existe.
- Draconato não pergunta a ancestralidade (cor/tipo de dano do sopro e da resistência).

### A3. Alto — subclasses PHB faltando
- Clérigo: faltam Conhecimento, Luz, Natureza, Tempestade e Trapaça (só há Vida e Guerra, mais Forja e Sepultura de Xanathar).
- Mago: faltam Conjuração, Adivinhação, Encantamento, Ilusão, Necromancia e Transmutação (só há Evocação e Abjuração, mais Magia de Guerra de Xanathar).
- Bárbaro: só o Totem do Urso (Águia e Lobo ficam de fora).

### A4. Alto — catálogo de armas e armaduras muito pequeno
- 11 armas e 6 armaduras (o PHB tem 37 armas e 12 armaduras mais escudo).
- Sem armaduras médias/pesadas além de Escamas e Cota de Malha; sem Placas, Brunea, Meia-Armadura etc. Sem Machado de Mão, Martelo de Guerra, Alabarda e outras.

### A5. Alto — a tabela de crítico das armas não é de D&D 5e
- Espada Curta, Espada Longa e Besta Leve estão com `19-20/x2`, a Rapieira com `18-20/x2`, o Machado Grande com `20/x3` e os arcos com `20/x3`. Na 5e todo crítico é em 20 natural com dados de dano dobrados. A ficha mostra um crítico que a regra não dá.

### A6. Médio — a proficiência com arma é calculada por texto e falha
- `personagemEhProficienteComArma` compara o nome da arma com o texto da proficiência usando um `replace(/[ãs]/g,"a")` que não faz sentido.
- Resultado: **Mago não é proficiente em Besta Leve nem em Bordão**, e **Druida não é proficiente em Bordão**, embora a classe tenha essas proficiências. Como a arma secundária padrão é a Besta Leve, o Mago recebe o erro "A classe não é proficiente com a arma secundária escolhida" na criação.

### A7. Médio — talentos de Xanathar
- O README cita talentos raciais de Xanathar, mas o Humano Variante (que dá o talento no nível 1) não existe. Só entram talentos por ASI a partir do nível 4.

### A8. Verificado e correto
Bônus de proficiência 1–20; ASI nos níveis 4/8/12/16/19 (Guerreiro 6 e 14, Ladino 10); slots de Mago (1, 5 e 20), Paladino 5, Patrulheiro 9, Clérigo 9, Bruxo (pacto) 5 e 11; truques e magias conhecidas/preparadas; Point Buy (27 pontos) e Standard Array; saves por classe; PV (dado cheio no nível 1, média depois, mínimo 1 por nível); atributos raciais PHB (exceto A2).

## B. Exportação Foundry VTT (sistema dnd5e 5.x)

1. **Alto — PV do ator.** `attributes.hp.max` sai `null` e a classe sai com `advancement: {}`. Sem avanço de PV, o Foundry calcula o máximo sem o dado de vida da classe, e o `value` exportado fica acima do máximo. O PV máximo calculado pelo app precisa ir em `hp.max`. *(a testar no VTT)*
2. **Alto — magias sem atividade útil.** Todas as magias saem com uma única atividade `utility`, sem ataque, dano, salvaguarda ou cura. Mísseis Mágicos, Raio de Fogo e Bola de Fogo não rolam nada na ficha. O código tem `buildSpellActivity`, mas as magias não carregam esses dados.
3. **Alto — fontes de regra misturadas** (A1): `rules: "2014"` e `"2024"` no mesmo ator.
4. **Médio — itens duplicados.** Habilidades de classe e recursos geram o mesmo item duas vezes (ex.: "Recuperação Arcana", "Segundo Fôlego"). Há também um item "Aumento de Valor de Habilidade" do tipo talento, que é só ruído.
5. **Médio — importação corrompe a personalidade.** `aplicarActorFoundryNaFicha` lê `biography.value` e `biography.public` (o mesmo HTML) como descrição e história. Depois de exportar e reimportar, descrição e história ficam iguais, com HTML (`<p>…</p>`).
6. **Médio — backgrounds em português.** A raça e a classe saem com nome em inglês e hint de compêndio; o antecedente sai com nome em português. O compêndio não reconhece.
7. **Baixo — código morto.** `export.js` define 14 funções mais de uma vez (`buildFoundrySpellItem` três vezes; `montarFoundryActor`, `montarFoundryItems` e os `buildFoundry*Item` duas vezes). Vale a última definição; as primeiras só confundem.
8. **Baixo — `export.js` não é testado.** `test_stage20_release.js` falha no hash esperado do `export.js`. `test_stage16.js` aponta para `/mnt/data/work16`, que não existe.

## C. Roll20
- **Não existe exportação.** O Roll20 não importa JSON de ficha por conta própria. Os caminhos reais são: script de API (campanha Pro) criando o personagem na ficha **D&D 5E by Roll20**, ou importadores de terceiros. Falta também o formato de dados: nomes de atributos da ficha OGL (`strength_base`, `acrobatics_prof`, `repeating_attack_…`, `repeating_spell-1_…`, `repeating_inventory_…`).
- A API de scripts exige conta **Pro**. Sem Pro, o app só pode entregar a ficha em texto para consulta.

## D. PDF
1. **Médio — unidade errada.** O deslocamento é guardado em pés (30) e impresso como `30m`. 30 pés = 9 m.
2. **Médio — HTML sem escape** em traços, ideais, vínculos e defeitos (os campos de texto livre `nome`, `descrição`, `aparência` e `história` são escapados; as listas não).
3. **Baixo — sem arte.** Folha em Arial, sem molduras, sem identidade visual. Os estilos estão inline no `export.js`.
4. **Baixo — `window.onload=()=>window.print()`** abre a impressão antes das fontes/imagens carregarem.

## E. Interface
- O visual (`style.css`) não segue o padrão VF Tools: sem `tokens.css`/`components.css`, fundo claro fixo, cores soltas, botões pretos, sem tema escuro, sem foco visível, sem `skip link`, sem `<footer>` com "Limpar meus dados", sem `motion.css`. `localStorage` usa as chaves `criacao_dnd_5e` e `criacao_dnd_5e_history_v1`, fora do padrão `vf-tools:<id>:v1`.
- `ui.js` repete funções (`renderResumo` ×2, `renderMagia` ×3, `mostrarPreviewClasse`, `confirmarClasse`, `atualizarProgressao`): vale a última.

## F. Plano de correção (o que foi feito está no fim, na seção G)
Ordem: (1) seleção do tipo de ficha e coerência das fontes; (2) bugs de regras (A5, A6); (3) PV/duplicados/importação do Foundry; (4) exportação Roll20; (5) PDF com arte; (6) padrão VF Tools na interface.

## G. Resultado das correções
Verificado por `test_stage16`, `17`, `20`, `21` e `22` (52 verificações, todas passando) e por uma rodada no Chrome (fluxo 2024 até a escolha de classe, tema claro/escuro, tela de Resumo, downloads Foundry/Roll20 e PDF). `node scripts/check-identity.js index.html` do VF-Tools: 0 erros.

| Item | Situação |
|---|---|
| A1 tipo de ficha | **Feito.** Seletor na tela inicial (2014 + Xanathar × 2024/5.5), guardado em `state.regras`, no histórico e no backup. 2024: 10 espécies sem bônus, 16 antecedentes com +2/+1 ou +1/+1/+1, talento de origem, subclasse no nível 3, sem subclasses de Xanathar. 2014: inalterado, com aviso para subclasses de Xanathar. |
| A1 limite | **Parcial.** No 2024, classes, subclasses e magias ainda vêm do catálogo 2014 (sem Maestria em Arma nem os recursos novos de classe). A ficha avisa isso. Falta também: subclasses 2024 (48), magias 2024 e talentos de origem com efeito mecânico. |
| A2 sub-raças, Humano Variante, ancestralidade do Draconato | **Não feito** (modo 2014). |
| A3 subclasses PHB faltando | **Não feito.** |
| A4 armas e armaduras | **Feito.** 37 armas e 12 armaduras do PHB, com tipo de dano e alcance em pés. |
| A5 crítico | **Feito.** Todas as armas com 20/x2. |
| A6 proficiência com arma | **Feito.** Mago e Druida reconhecem Besta Leve e Bordão. |
| Habilidades de classe (novo) | **Feito.** Surto de Ação estava no nível 1 e Segundo Fôlego no 2 (invertidos) e duplicados; removidos sinônimos duplicados em 9 classes; "Jack of All Trades" traduzido; incluídas 6 habilidades que faltavam no Monge, Ladino e Patrulheiro; removida a entrada inválida "Fúrias por descanso" (nível 3). |
| B1 PV do ator | **Feito.** `hp.max` recebe o PV calculado. *(a testar no VTT)* |
| B2 magias sem atividade | **Não feito.** |
| B3 fontes de regra misturadas | **Feito.** Um único `source.rules` por ator, vindo do tipo de ficha. |
| B4 itens duplicados | **Feito.** |
| B5 importação corrompe personalidade | **Não feito.** |
| B6 antecedente em português | **Não feito.** |
| B7 código morto | **Feito** em `export.js` (PDF e Roll20 em arquivos próprios, sem funções repetidas; verificado por teste). `ui.js` ainda repete funções. |
| B8 testes | **Feito.** `test_stage20` checa duplicatas em vez de hash; `test_stage16` usa o caminho do projeto; novo `test_stage22`. |
| C Roll20 | **Feito, sem teste no Roll20.** Script de API (exige campanha Pro) que cria o personagem na ficha OGL, e lista de campos em JSON. Rodado em uma API simulada, não em uma campanha real. Os nomes dos campos da ficha OGL vêm de conhecimento do código da ficha e podem precisar de ajuste. |
| D PDF | **Feito.** 2 páginas A4, moldura e cantos, escudos de atributo, brasão por classe, d20 de fundo, serifa de título, escape de HTML, pés e metros, sem pop-up automático antes de carregar. Com listas muito longas (ex.: 34 magias + 22 itens + história extensa) a página 2 continua numa 3ª folha, sem moldura. |
| E interface | **Feito.** `index.html`, `style.css`, armazenamento e rodapé no padrão VF Tools (tokens, components, motion, tema escuro/claro, `data-tool`, "Limpar meus dados", chave `vf-tools:dnd5e-builder:v1` com migração das chaves antigas). Doggy não foi incluído. Os arquivos do padrão estão copiados em `vf/` para o app seguir funcionando offline. |

Avisos restantes do verificador do VF Tools (2): cores fixas em `export-pdf.js` (paleta de impressão = tema claro do VF Tools) e `#ffffff` nos dados do Foundry. Não afetam a interface.
