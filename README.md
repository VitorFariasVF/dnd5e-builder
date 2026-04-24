<div align="center">

# ⚔️ D&D 5e Builder

**Criador de fichas de D&D 5e em HTML, CSS e JavaScript puro, com salvamento local, histórico de personagens, PDF A4 e exportação para Foundry VTT.**

[![Demo Online](https://img.shields.io/badge/🚀%20Demo-GitHub%20Pages-2ea44f?style=for-the-badge)](https://vitorfariasvf.github.io/dnd5e-builder/)
[![Repositório](https://img.shields.io/badge/📦%20Código-GitHub-111827?style=for-the-badge)](https://github.com/VitorFariasVF/dnd5e-builder)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-2563eb?style=for-the-badge)](https://github.com/VitorFariasVF/dnd5e-builder)
[![Frontend Only](https://img.shields.io/badge/frontend-only-f59e0b?style=for-the-badge)](https://github.com/VitorFariasVF/dnd5e-builder)

## **👉 [ABRIR AGORA NO GITHUB PAGES](https://vitorfariasvf.github.io/dnd5e-builder/)**

**Repositório:** [github.com/VitorFariasVF/dnd5e-builder](https://github.com/VitorFariasVF/dnd5e-builder)

</div>

---

## ✨ Visão geral

Este projeto é um **construtor offline de personagens de D&D 5e** pensado para funcionar **direto no navegador**, sem backend e sem etapa de build obrigatória.

Ele foi criado para servir como um **mini builder de ficha** com foco em:

- criação guiada por etapas
- validação paralela com **Rule Engine** segura
- persistência local com **LocalStorage**
- histórico de personagens
- edição posterior da ficha
- exportação para **Foundry VTT**
- exportação em **PDF A4**
- base extensível para livros e módulos futuros

---

## 🚀 Como usar

### Opção 1 — usar online

Abra a versão publicada:

## **👉 [Clique aqui para abrir a demo no GitHub Pages](https://vitorfariasvf.github.io/dnd5e-builder/)**

### Opção 2 — usar localmente

Este projeto **não precisa iniciar servidor** para o uso normal.

Basta:

1. baixar ou clonar o repositório
2. abrir o arquivo **`index.html`**
3. usar a aplicação normalmente

```text
/index.html
```

> O projeto foi organizado para rodar **diretamente do `index.html`**.

### Fluxo rápido

1. escolha o modo de criação
2. selecione origem, raça, classe e nível
3. distribua atributos
4. escolha perícias, equipamentos e magias
5. preencha traços, ideais, vínculos e defeitos
6. revise a ficha
7. exporte para **Foundry JSON**, **backup JSON** ou **PDF**

---

## 🧩 Principais recursos

- criação de personagem por etapas
- modo **A** com validação guiada por regras
- modo **B** com maior liberdade de customização
- atributos com **Standard Array**, **Point Buy**, ASI e talentos
- cálculo de modificadores, saves e perícias
- proficiências separadas por raça, origem, classe, subclasse e talento
- combate com armas, armaduras, escudo e peso de inventário
- magias com slots, truques, preparação, grimório do mago e descanso
- validação de listas de magias por classe, círculo e fonte
- personalidade com:
  - traços
  - ideais
  - vínculos
  - defeitos
  - descrição geral
  - aparência
  - história
- progressão por nível de **1 a 20**
- subclasses e recursos rastreáveis
- suporte em expansão para **Xanathar's Guide to Everything**
- exportação para:
  - **Foundry VTT JSON**
  - **backup interno do projeto**
  - **PDF A4**
- histórico de personagens para editar depois
- importação de JSON do projeto para continuar edição

---

## 🛠️ Tecnologias

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **LocalStorage**

Sem framework. Sem backend. Sem build obrigatório.

---

## 📁 Estrutura do projeto

```text
.
├── index.html
├── style.css
├── main.js
├── ui.js
├── state.js
├── rules.js
├── rules-engine.js
├── validator.js
├── export.js
├── storage.js
└── README.md
```

### Função dos arquivos

- `rules.js` → catálogos, tabelas e regras do jogo
- `rules-engine.js` → camada paralela de resolução/auditoria de regras
- `state.js` → estrutura base do estado do personagem
- `validator.js` → validações e selo final da ficha
- `ui.js` → renderização, etapas e interação da interface
- `export.js` → exportação para Foundry JSON, backup e PDF
- `storage.js` → persistência com LocalStorage
- `main.js` → inicialização da aplicação

---

## 📚 Como a ficha funciona

### Criação

A aplicação organiza a montagem da ficha em etapas para facilitar o fluxo de criação.

### Salvamento local

Os dados ficam no navegador e podem ser reabertos depois sem backend.

### Histórico

Você pode:

- salvar personagem no histórico
- abrir personagem salvo para editar
- duplicar ficha
- excluir ficha
- voltar para a tela inicial
- limpar todo o banco local do navegador

### Importação para edição

A aplicação consegue reabrir JSONs do próprio projeto para continuar a edição.

---

## 🧠 Arquitetura da Rule Engine

A Rule Engine fica em `rules-engine.js` e funciona como uma camada segura acima das regras antigas. Ela recebe `state.personagem`, calcula uma versão resolvida da ficha e gera um `legacyPatch` compatível com os campos antigos.

Fluxo simplificado:

```text
state.personagem
    ↓
resolveCharacterRules(personagem)
    ↓
resolved + warnings + errors
    ↓
legacyPatch compatível com a estrutura antiga
```

A exportação continua lendo os campos tradicionais da ficha. Por isso, a engine pode corrigir regras sem exigir mudança imediata no `export.js`.

Principais funções:

- `resolveCharacterRules(personagem)`
- `resolveAbilityScores(context)`
- `resolveProficiencies(context)`
- `resolveSpellcasting(context)`
- `resolveCantrips(context, profile)`
- `resolveSpellSlots(context, profile)`
- `resolvePreparedSpellLimit(context, profile, abilityScores)`
- `resolveWizardSpellbook(context)`
- `auditCharacterRules(context, resolved)`
- `buildLegacyPatch(resolved)`

### O que a engine não faz nesta fase

- não altera a exportação
- não substitui o `export.js`
- não depende de backend
- não exige build
- não usa compêndio externo em tempo de execução

## 📤 Exportação

### 1. Foundry VTT JSON

A exportação principal gera um **Actor JSON** voltado ao fluxo de importação do Foundry VTT.

Fluxo recomendado no Foundry:

1. criar um ator vazio do tipo personagem
2. clicar com o botão direito no ator
3. escolher **Import Data**
4. selecionar o JSON exportado pelo projeto

### 2. Backup JSON

Exporta o estado interno do projeto para reabrir a ficha depois.

### 3. PDF

Gera uma ficha visual pensada para **A4**, usando a impressão do navegador.

---

## 🎲 Conteúdo já implementado

### Base da ficha

- criação por etapas
- atributos
- perícias e saves
- combate
- armaduras e armas
- inventário
- magias
- personalidade
- validação
- progressão
- subclasses
- exportações

### Regras e validação atual

A versão atual inclui uma camada paralela chamada **Rule Engine**, criada para validar e resolver regras sem alterar o formato da exportação. Ela trata:

- Point Buy e Standard Array
- ASI / aumento de atributo por nível
- talentos e pré-requisitos
- proficiências por categoria
- truques por classe e por fonte
- slots de magia por tipo de conjurador
- magias conhecidas e preparadas
- grimório do mago
- magias bônus de subclasse
- validação de magia por classe/círculo

### Xanathar

Já existe suporte em expansão para conteúdo de **Xanathar**, com foco em:

- subclasses
- magias
- proficiências adicionais de subclasses
- habilidades de subclasse que impactam a ficha
- talentos raciais e pré-requisitos
- magias bônus de subclasses como Domínio da Forja, Lâmina Maldita e Patrulheiros de Xanathar

---

## ✅ Relatórios internos de auditoria

O pacote inclui relatórios gerados durante a revisão da engine:

- `SPELL_AUDIT_REPORT.md`
- `SPELL_SELECTION_VALIDATION_REPORT.md`
- `FEAT_ASI_VALIDATION_REPORT.md`
- `FEAT_DETAIL_CHOICES_REPORT.md`
- `FULL_FLOW_AUDIT_REPORT.md`
- `VISUAL_FLOW_AUDIT_REPORT.md`

Eles servem como histórico técnico do que foi validado e dos pontos que ainda merecem teste manual.

## 🔗 Referências

### Projeto

- **Demo online:** [https://vitorfariasvf.github.io/dnd5e-builder/](https://vitorfariasvf.github.io/dnd5e-builder/)
- **Código-fonte:** [https://github.com/VitorFariasVF/dnd5e-builder](https://github.com/VitorFariasVF/dnd5e-builder)

### Base técnica usada no projeto

- estrutura de **Actor JSON** para importação no Foundry VTT
- organização de ficha voltada ao sistema **D&D 5e**
- comparação com um **actor funcional de referência** para alinhar ordem, shape e blocos principais

### Referências internas de arquitetura

- `rules.js` como base das regras
- `state.js` como fonte do estado da ficha
- `export.js` como ponte entre ficha interna e formatos externos

---

## ⚠️ Compatibilidade atual

O foco do projeto está em:

- rodar direto no navegador
- permitir edição sem backend
- manter histórico local
- exportar a ficha em formato útil para Foundry VTT

Ainda assim, por ser um projeto offline e independente do compêndio do mundo do usuário, alguns itens podem entrar como documentos próprios gerados pelo app.

---

## 🧱 Limites atuais

- nem todos os recursos de D&D 5e estão automatizados no nível de um VTT completo
- descrições completas de magias e recursos ainda podem exigir revisão editorial
- conteúdos de livros adicionais além do PHB/Xanathar ainda não são foco principal
- a integração com Foundry continua preservada e sem mudanças nesta fase
- a exportação não foi reestruturada durante a implantação da Rule Engine

---

## 🗺️ Roadmap

- testar importação/exportação com personagens reais no Foundry VTT
- melhorar descrições de magias e recursos
- revisar mais subclasses e recursos
- enriquecer o PDF A4
- melhorar a UI do histórico de personagens
- ampliar a importação para edição
- documentar casos especiais de multiclasse em etapa futura

---

## 🤝 Como contribuir

Sugestões de contribuição:

- revisar conteúdo de classes, subclasses e magias
- testar exportação/importação no Foundry VTT
- reportar bugs de fluxo da ficha
- melhorar o visual e a experiência de uso
- refinar textos e documentação

Fluxo sugerido:

1. faça um fork do projeto
2. crie uma branch para sua alteração
3. faça as mudanças
4. teste localmente abrindo o `index.html`
5. envie um pull request

---

## 🧾 Histórico técnico recente

### Etapa 18

- README revisado para refletir a Rule Engine
- documentação de uso e arquitetura atualizada
- exportação preservada

### Etapas 03 a 17

- criada camada paralela `rules-engine.js`
- auditoria conectada à validação
- atributos, ASI e talentos conectados
- proficiências conectadas por categoria
- truques, slots e limites de magia corrigidos
- grimório do mago separado da preparação
- magias bônus de subclasse separadas por tipo
- listas PHB/Xanathar auditadas
- validação de seleção de magia por classe/círculo adicionada
- fluxo visual revisado
- `export.js` preservado durante as etapas

## 📄 Licença

Defina aqui a licença que deseja usar no repositório.

Sugestão comum para projetos open source:

- MIT

Enquanto não houver um arquivo `LICENSE`, considere isso como pendente de definição.

---

<div align="center">

### **🚀 [Abrir a demo no GitHub Pages](https://vitorfariasvf.github.io/dnd5e-builder/)**
### **📦 [Ver o código no GitHub](https://github.com/VitorFariasVF/dnd5e-builder)**

</div>
