<div align="center">

# ⚔️ Criador de fichas RPG

**Fichas de RPG em HTML, CSS e JavaScript puro: offline, sem cadastro e sem backend.**
D&D 5e (pronto), Tormenta20, Tormenta RPG e Call of Cthulhu 7ª edição (em andamento).

[![Demo Online](https://img.shields.io/badge/🚀%20Demo-GitHub%20Pages-2ea44f?style=for-the-badge)](https://vitorfariasvf.github.io/dnd5e-builder/)
[![Código](https://img.shields.io/badge/📦%20Código-GitHub-111827?style=for-the-badge)](https://github.com/VitorFariasVF/dnd5e-builder)
[![Frontend Only](https://img.shields.io/badge/frontend-only-f59e0b?style=for-the-badge)](https://github.com/VitorFariasVF/dnd5e-builder)

</div>

---

## ✨ Visão geral

O `index.html` da raiz é um **hub** que leva a cada sistema. Cada sistema é uma página independente, com o seu próprio fluxo guiado, as suas regras, as suas exportações e os seus testes. Visual no padrão [VF Tools](https://github.com/VitorFariasVF/VF-Tools), com tema escuro e claro.

| Sistema | Pasta | Estado | Escopo pronto* | Regras conferidas* |
|---|---|---|---|---|
| **D&D 5e** (2014 + Xanathar, ou 2024) | [`dnd5e/`](dnd5e/) | Pronto | ≈ 92% (2014) · ≈ 55% (2024) | ≈ 65% |
| **Call of Cthulhu 7ª edição** | [`coc7/`](coc7/) | Trabalho em andamento | ≈ 80% | ≈ 55% |
| **Tormenta20** | [`tormenta20/`](tormenta20/) | Trabalho em andamento | ≈ 55% | ≈ 15% |
| **Tormenta RPG** (d20 original) | [`tormenta-rpg/`](tormenta-rpg/) | Trabalho em andamento | ≈ 35% | ≈ 30% |

\* Valores aproximados. O método e o que falta em cada sistema estão em [`docs/COBERTURA.md`](docs/COBERTURA.md).

> **Sobre as regras.** Tormenta20, Tormenta RPG e Call of Cthulhu foram montados a partir de **guias de fãs, wikis e material gratuito**, não do livro oficial. Cada dado leva a sua fonte e o que não foi confirmado em duas fontes aparece como **NÃO VERIFICADO** na tela. Cada página desses três sistemas e o rodapé do PDF avisam isso. Confira no seu exemplar do livro antes de usar em mesa. Os sistemas guardam só mecânica (números, fórmulas, nomes) e descrições curtas em palavras próprias, nunca texto de livro nem arte.

---

## 🚀 Como usar

**Online:** abra a [demo no GitHub Pages](https://vitorfariasvf.github.io/dnd5e-builder/) e escolha o sistema.

**Local:** não precisa de servidor nem de build. Baixe ou clone o repositório e abra o `index.html`.

```text
/index.html            hub
/dnd5e/index.html      D&D 5e
/tormenta20/index.html Tormenta20
/tormenta-rpg/index.html Tormenta RPG
/coc7/index.html       Call of Cthulhu 7ª edição
```

Fluxo em todos os sistemas: escolher o modo (estrito, com validação das regras, ou livre) → montar a ficha por etapas → revisar o resumo → exportar. Os dados ficam só no navegador, com histórico, duplicação e importação do backup.

---

## 🎲 D&D 5e

- **Tipo de ficha:** 2014 (PHB + Xanathar) ou 2024 (SRD 5.2). A edição vale para raças, antecedentes, classes e exportação.
- **Criação:** raças e sub-raças do PHB (Meio-Elfo com dois +1, Humano Variante, ancestral do Draconato), antecedentes, 12 classes do nível 1 ao 20, subclasses do PHB e de Xanathar, atributos (Standard Array, Point Buy, ASI e talentos), perícias, equipamento, magias (espaços, truques, preparação, grimório), recursos rastreáveis e personalidade.
- **Regras:** revisão das 12 classes nível a nível contra a SRD. A ficha 2024 usa as classes do SRD 5.2 (uma subclasse por classe, sem listas de magia e talentos 2024 ainda).
- **Exportação:** PDF A4 de 2 páginas com moldura, escudos de atributo e brasão de classe; **Foundry VTT** (ator JSON, sistema dnd5e 5.3); **Roll20** (script de API para a ficha OGL e lista de campos); backup JSON.
- **Limite:** Foundry e Roll20 **não foram testados em VTT real**. Veja [`docs/AUDITORIA_FICHAS_VTT.md`](docs/AUDITORIA_FICHAS_VTT.md) e [`docs/TRABALHO_DND5E_EXPORT.md`](docs/TRABALHO_DND5E_EXPORT.md).

## 🐙 Call of Cthulhu 7ª edição

Investigador completo: características (rolar ou distribuir), ajustes de idade, 19 ocupações, perícias de ocupação e de interesse pessoal, antecedentes, equipamento, derivados (PV, Sanidade, Sorte, PM, Movimento, Dano e Corpo) e ficha de combate. Segue a **regra completa** (Keeper Rulebook) como método. Exporta backup JSON e um dossiê em PDF de 2 páginas.

## 🛡️ Tormenta20

Fluxo em 12 etapas do nível 1 ao 20, com 14 classes, 17 raças, 194 poderes e magias por círculo. Onde o dado é incerto, a ficha mostra "não verificado" e aceita o valor digitado à mão. Equipamento e magias de 2º a 5º círculo ainda estão incompletos. Exporta backup JSON (esquema 2), PDF e um rascunho de ator para Foundry (não testado).

## 📜 Tormenta RPG (d20)

Fluxo de 10 etapas com 13 classes (PV, bônus base de ataque, círculos), 19 perícias e 13 talentos. Resistências por classe, magias por dia, equipamento e traços das raças ainda estão vazios. Não há VTT verificado, então não exporta para VTT. Exporta backup JSON e PDF.

---

## 📁 Estrutura

```text
.
├── index.html            hub: escolhe o sistema
├── core/                 estilo compartilhado (style.css, theme.css, hub.css)
├── vf/                   identidade VF Tools (tokens, componentes, motion, tool.js)
├── dnd5e/                rules*.js, rules-engine.js, state.js, validator.js, ui.js,
│                         ui-theme.js, export*.js, storage.js, main.js, tests/
├── tormenta20/           rules*.js, engine.js, state.js, validator.js, ui.js,
│                         export*.js, storage.js, main.js, tests/
├── tormenta-rpg/         (mesmo formato)
├── coc7/                 (mesmo formato)
└── docs/                 plano, contrato, cobertura, auditorias e verificações
```

Cada sistema é autocontido e as páginas não carregam umas às outras, então os nomes globais não colidem. Os dados salvos usam uma chave por sistema (`vf-tools:<sistema>-builder:v1`); a do D&D continua `vf-tools:dnd5e-builder:v1`, então as fichas antigas não se perdem.

### Documentos

- [`docs/PLANO_DESENVOLVIMENTO.md`](docs/PLANO_DESENVOLVIMENTO.md): auditoria de crescimento, fases e riscos
- [`docs/CONTRATO_SISTEMA.md`](docs/CONTRATO_SISTEMA.md): o que cada sistema precisa ter
- [`docs/COBERTURA.md`](docs/COBERTURA.md): percentuais e o que falta
- `docs/AUDITORIA_*.md` e `docs/VERIFICACAO_*.md`: o que foi conferido, contra qual fonte e o que ficou de fora
- `docs/TRABALHO_*.md`: registro de cada frente de trabalho
- [`docs/AUDITORIA_UX.md`](docs/AUDITORIA_UX.md): auditoria visual, animações e tema

---

## 🧪 Testes

Testes em Node, sem dependências, que saem com código diferente de 0 se algo falhar.

```bash
cd dnd5e && for f in tests/*.js; do node "$f" || echo "FALHOU $f"; done
node tormenta20/tests/run_all.js
node tormenta-rpg/tests/run-all.js
node coc7/tests/run_all.js
```

Cada sistema também tem um teste de navegador (`e2e_*.js`) que usa Playwright e o Chrome headless; fica fora do `run_all` porque precisa dessas ferramentas.

---

## 🧠 Rule Engine do D&D

`dnd5e/rules-engine.js` é uma camada segura acima das regras: recebe `state.personagem`, calcula a ficha resolvida (atributos, proficiências, conjuração, espaços, recursos) e gera um `legacyPatch` compatível com a estrutura antiga, que a exportação continua lendo. O modo estrito valida pelas regras; o modo livre só avisa.

---

## 🛠️ Tecnologias

HTML5, CSS3, JavaScript Vanilla e LocalStorage. Sem framework, sem backend e sem build.

## 🗺️ Roadmap

- conferir as regras dos três sistemas novos com os livros ou com as wikis (tsrd, tormenta-collab)
- completar equipamento e magias do Tormenta20, e resistências e equipamento do Tormenta RPG
- mais ocupações no Call of Cthulhu
- 2024 no D&D: equipamento, listas de magia e talentos; conferir o SRD 5.2 contra o PDF oficial
- testar as exportações em Foundry VTT e Roll20 reais
- extrair o stepper, o menu e os toasts para `core/`, e rodar os testes em CI

## 🤝 Como contribuir

Revisar regras contra o livro, testar exportações em um VTT real, reportar bugs e melhorar a interface. Fluxo: faça um fork, crie uma branch, mude só a pasta do sistema (veja o contrato), rode os testes do sistema, abra o `index.html` do sistema para conferir e envie um pull request.

## 📄 Licença

Ainda sem arquivo `LICENSE`: a licença está pendente de definição. As regras dos sistemas pertencem aos seus respectivos autores e editoras; este projeto guarda só mecânica e descrições curtas próprias.

---

<div align="center">

### **🚀 [Abrir a demo no GitHub Pages](https://vitorfariasvf.github.io/dnd5e-builder/)**
### **📦 [Ver o código no GitHub](https://github.com/VitorFariasVF/dnd5e-builder)**

</div>
