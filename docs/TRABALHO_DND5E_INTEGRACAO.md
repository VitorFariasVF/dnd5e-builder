# D&D 5e: integração do 2024 (SRD 5.2) e magias de subclasse

Arquivos desta frente: `dnd5e/rules-2024-classes.js`, `dnd5e/rules.js` (aplicarCatalogoRegras, getClassResources, avisos), `dnd5e/rules-engine.js` (limite de preparadas e magias de subclasse), `dnd5e/ui.js`, `dnd5e/validator.js`, `dnd5e/tests/test_2024_integracao.js`.

## Ligado quando `state.regras === "2024"`
- **Classes**: dado de vida, salvaguardas, perícias e proficiências vêm de `CLASSES_2024`. Equipamento inicial fica vazio (ver "Fora").
- **Características por nível**: `CLASS_FEATURES_2024`.
- **Subclasse**: uma por classe, no nível 3 (`SUBCLASSES_2024`).
- **Conjuração**: tipo (completa, meia, pacto), atributo, truques e magias preparadas pela tabela da classe (não pela fórmula de 2014). Todas as classes 2024 preparam magias; o Mago usa grimório. Espaços de meio-conjurador começam no 1º nível.
- **ASI**: `aumentoAtributoNiveis` mais o nível 19 (Dom Épico), que entra como escolha de talento.
- **Recursos**: contadores com número na tabela (Fúria, Recuperação de Fôlego, Surto de Ação, Indomável, Canalizar Divindade, Forma Selvagem, Pontos de Feitiçaria, Pontos de Foco, Inimigo Favorito).
- **Avisos**: o texto de regras e a validação dizem que o 2024 usa só o SRD 5.2 (uma subclasse por classe, sem listas de magia 2024 e sem talentos 2024 ainda). Dado sem conferência aparece com a marca NÃO VERIFICADO na tela: Atleta Notável e Estilo de Luta Adicional (Campeão), a lista de magias do Juramento da Devoção, e as recargas de Pontos de Foco e Inimigo Favorito.

O 2014 é guardado na primeira troca e volta sem perda; o teste compara a ida e a volta.

## Magias de subclasse (motor)
- Sempre preparadas (sem contar no limite): Domínios Conhecimento, Luz, Natureza, Tempestade e Trapaça do Clérigo; Juramento dos Anciões do Paladino.
- Expandidas escolhíveis: Grande Antigo do Bruxo (em 1º a 5º círculo, conforme o nível de bruxo).
- Domínios Forja e Sepultura e os juramentos existentes continuam como estavam.

## Fora desta frente
- Equipamento inicial e grupos de escolha 2024 (a tela ainda mostra os grupos do 2014).
- Listas de magia 2024: as magias escolhíveis são as do 2014.
- Talentos 2024 (o Dom Épico e as ASI usam os talentos do 2014).
- Imposição de Mãos, Inspiração de Bardo, Ataque Furtivo e Invocações não aparecem como recurso rastreável.
- Grimório do Mago (6 + 2 por nível): igual ao 2014, não consta nos dados 2024.
- Conferência contra o PDF oficial do SRD 5.2.
- Cópia morta de `getClassResources` em `rules.js` (a segunda definição vale) e outras duplicatas em `ui.js` (`atualizarProgressao`, `mostrarPreviewClasse`, `renderMagia`).
- Transbordo horizontal de 15 a 16 px em `.resource-controls` no resumo 2014 a 360 px (já existe no HEAD).

## Verificação
- `node tests/test_2024_integracao.js`: 46 de 46.
- Demais testes de `dnd5e/tests/`: todos com código 0.
- E2E em Chrome headless (Playwright, `--no-sandbox`), 1100 px e 360 px, fichas 2014 e 2024, pela própria tela de modo, classe, subclasse, magia e resumo: 48 de 48, sem erro de console. Roteiro fora do repositório (`/tmp/e2e`).
