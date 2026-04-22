# Criador de Personagem D&D 5e Offline

Aplicação front-end em **HTML, CSS e JavaScript puro**, sem backend e com persistência local, para criação de personagens de **D&D 5e** com validação de regras, progressão, inventário, magias e exportação para **Foundry VTT**.

> Projeto pensado para funcionar como um **mini construtor de ficha offline**, com foco em organização modular, expansão futura e uso real em mesa presencial ou online.

## Demonstração

- **GitHub Pages:** `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`
- **Repositório:** `https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO`

> Substitua os links acima pelos links finais do seu repositório e da publicação no GitHub Pages.

## Principais recursos

- criação de personagem por etapas
- modo **A** com validação guiada pelas regras
- modo **B** com liberdade maior para customização
- atributos com **Standard Array** e **Point Buy**
- cálculo de modificadores, saves e perícias
- combate com armas, armaduras, escudo e inventário com peso
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
- exportação para:
  - **Foundry VTT**
  - **backup interno do projeto**
  - **PDF via impressão do navegador**

## Objetivo do projeto

Este projeto busca oferecer uma base sólida para uma ficha offline de D&D 5e que seja:

- fácil de usar
- modular
- extensível
- compatível com fluxos de VTT
- independente de backend

## Stack

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **LocalStorage** para persistência local

## Como rodar localmente

### Opção 1 — abrir direto no navegador
Abra o arquivo `index.html`.

### Opção 2 — servidor local
```bash
python -m http.server 8000
```

Depois abra no navegador:
```text
http://localhost:8000
```

## Publicação no GitHub Pages

Depois de subir o projeto para o GitHub, você pode publicar pelo GitHub Pages.

### Estrutura esperada
- branch principal com os arquivos do projeto na raiz
- `index.html` na raiz do repositório

### Link esperado
```text
[https://vitorfariasvf.github.io/dnd5e-builder/]
```

### Checklist rápido
- subir todos os arquivos do projeto para o repositório
- confirmar que `index.html` está na raiz
- ativar GitHub Pages nas configurações do repositório
- selecionar a branch principal como origem da publicação
- testar o link público

## Estrutura do projeto

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

## Arquitetura

- `rules.js` → catálogos, tabelas e regras do jogo
- `state.js` → estrutura base do estado do personagem
- `validator.js` → validações e selo final da ficha
- `ui.js` → renderização, etapas e interação da interface
- `export.js` → exportação para Foundry JSON, backup e PDF
- `storage.js` → persistência com LocalStorage
- `main.js` → bootstrap da aplicação

## Fluxo geral da aplicação

1. selecionar modo de criação
2. definir origem, raça, classe e nível
3. configurar atributos
4. escolher perícias, equipamentos e magias
5. preencher personalidade e interpretação
6. revisar resumo final
7. exportar a ficha

## O que já foi implementado

### Personalidade e interpretação
- sistema narrativo com:
  - traços de personalidade
  - ideais
  - vínculos
  - defeitos
- sugestões por origem
- edição manual
- múltiplas escolhas
- campos extras de interpretação
- validação mínima no modo A

### Equipamento inicial inteligente
- opções reais por classe
- auto-adição ao inventário
- sincronização com armas, armaduras e escudo
- peso recalculado automaticamente
- opção de converter equipamento em moedas quando aplicável

### Combate
- armas e armaduras com compatibilidade visual
- tags coloridas para indicar se podem ser equipadas
- exibição de:
  - dano
  - modificador usado
  - crítico
  - valor
  - categoria/tipo
- cálculo de CA atualizado ao trocar armadura e escudo

### Magias
- slots por nível
- magias preparadas, conhecidas e truques
- limites visuais na interface
- filtragem por círculos disponíveis
- descanso curto e longo refletindo recursos aplicáveis

### Progressão
- níveis de 1 a 20
- bônus de proficiência automático
- PV recalculado por progressão
- recursos de classe por nível
- subclasses e traços ativos por nível

### Recursos e subclasses
- recursos rastreáveis por classe
- escolhas de classe e subclasse
- efeitos derivados resumidos na ficha
- detalhes úteis para exportação e uso no VTT

## Exportação

### 1) Foundry VTT JSON
A exportação principal gera um **Actor JSON** voltado para o fluxo de **Import Data** do Foundry VTT.

Inclui:
- documento de ator do tipo personagem
- atributos e dados principais em `system`
- `items[]` para classe, subclasse, armas, armaduras, equipamentos, magias e features
- `flags` com backup do estado interno do projeto

### 2) Backup do projeto
Exporta o estado interno completo para reutilização futura no próprio projeto.

### 3) PDF
Gera uma ficha visual usando a janela de impressão do navegador para salvar em PDF.

## Fluxo de importação no Foundry VTT

1. criar um ator vazio do tipo personagem
2. clicar com o botão direito no ator
3. escolher **Import Data**
4. selecionar o JSON gerado em **Exportar Foundry JSON**

## Compatibilidade atual

A exportação foi organizada com foco em:
- **Foundry VTT V14**
- **sistema D&D 5e 5.3.x**

Ainda assim, como o projeto é **offline-first** e não depende do compêndio do mundo do usuário, alguns itens entram como documentos válidos gerados pelo app, e não como referências automáticas a UUIDs de compêndios instalados.

## Limites atuais

- nem todos os recursos do Livro do Jogador estão automatizados ao nível de um VTT completo
- a exportação para Foundry prioriza estrutura correta de importação, mas ainda pode exigir ajuste manual para casar com compêndios específicos do mundo
- a exportação PDF usa a impressão do navegador, não uma engine externa de layout

## Roadmap sugerido

- melhorar o casamento automático com compêndios SRD no Foundry
- ampliar subclasses e escolhas avançadas
- revisar a base de dados do Livro do Jogador com mais granularidade
- criar testes de consistência para exportação Foundry
- adicionar tela de revisão final ainda mais detalhada

## Créditos

Projeto original de referência:
- **VitorVFreire / rpg_sheet_ded_5e**

Versão adaptada e expandida para front-end offline modular.

## Licença

Defina aqui a licença do projeto antes de publicar no GitHub.

Sugestão:
- MIT
- Apache-2.0
- GPL-3.0
