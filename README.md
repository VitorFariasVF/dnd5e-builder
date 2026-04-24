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

## 🖼️ Prévia do projeto

> Espaço recomendado para imagens do projeto no repositório.

Você pode adicionar depois arquivos como:

```text
/docs/images/home.png
/docs/images/builder.png
/docs/images/magic.png
/docs/images/pdf.png
```

Exemplo de seção pronta:

```md
![Tela inicial](docs/images/home.png)
![Criação da ficha](docs/images/builder.png)
![Tela de magias](docs/images/magic.png)
![Exportação PDF](docs/images/pdf.png)
```

---

## 🧩 Principais recursos

- criação de personagem por etapas
- modo **A** com validação guiada por regras
- modo **B** com maior liberdade de customização
- atributos com **Standard Array** e **Point Buy**
- cálculo de modificadores, saves e perícias
- combate com armas, armaduras, escudo e peso de inventário
- magias com slots, truques, preparação e descanso
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
├── validator.js
├── export.js
├── storage.js
└── README.md
```

### Função dos arquivos

- `rules.js` → catálogos, tabelas e regras do jogo
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

### Xanathar

Já existe suporte em expansão para conteúdo de **Xanathar**, com foco em:

- subclasses
- magias
- proficiências adicionais de subclasses
- habilidades de subclasse que impactam a ficha

---

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
- alguns conteúdos ainda estão em expansão e revisão
- a integração com Foundry continua sendo refinada para ficar cada vez mais fiel ao modelo real

---

## 🗺️ Roadmap

- ampliar conteúdos de Xanathar
- melhorar descrições de magias
- revisar mais subclasses e recursos
- enriquecer o PDF A4
- melhorar a UI do histórico de personagens
- ampliar a importação para edição

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
