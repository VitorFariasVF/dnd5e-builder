# Problemas conhecidos

Lista do que ficou em aberto nos sistemas, com o motivo e o que falta para resolver. Atualizado em 2026-11-18. Cada item aponta o documento de auditoria do sistema, onde estão as páginas do livro.

## Gerais

- **Imagem do personagem:** o aviso de arquivo inválido ou grande fica até a próxima troca da imagem, nos quatro sistemas. Se preferir que o erro seja transitório, é uma mudança pequena.
- **Imagem do personagem fora das exportações:** só o backup JSON leva a imagem. As exportações Foundry e Roll20 não levam, porque não foram pedidas.
- **Testes de navegador:** o D&D 5e não tem teste de navegador. Nos outros, a ficha de teste é montada forçando a etapa no estado, então o caminho de exportação é conferido, mas não o fluxo completo de preenchimento.
- **PDF:** a conferência visual foi feita só na primeira página, em resolução baixa.

## D&D 5e (Xanathar)

- **Surto de Magia Selvagem, Buscador de Espíritos, domínios do Clérigo (exceto Forja e Sepultura), Escola de Ilusão, Patrono ínfero "O Corruptor", Quatro Elementos, Juramento dos Anciões:** não estão no Guia de Xanathar. Continuam marcados como NÃO VERIFICADO. Falta o Manual do Jogador ou o livro certo.
- **Mentor:** o conjunto de jogo não tem seleção, porque a lista não está no material disponível.
- **Cortesão:** não existe como subclasse no Guia. O Cortesão Elegante é característica do Samurai.
- **Idioma "Extra" do Elfo Alto:** sem escolha no app (pré-existente).
- **Idiomas repetidos** entre antecedente, raça e subclasse não são verificados.
- **Nomes em português** de características novas são tradução própria.

## Tormenta20

- **Poderes fora do Livro Básico:** cerca de 90 poderes estão marcados como "fora do livro (não é regra)". Continuam selecionáveis para não quebrar fichas antigas. Decisão pendente: remover ou manter.
- **Poderes sem nível de acesso no livro:** 36 poderes têm nome e pré-requisito conferidos, mas o livro não dá o nível. Ficam com `verificado: false`.
- **Efeitos de combate ou de teste:** RD e atordoamento do Foco do Bruxo, CD de Misticismo, CD das magias da linhagem, Foco Vital. Dependem de rolagem ou combate, que o app não faz.
- **Herança Rubra:** depende do poder da Tormenta, que não está no catálogo.
- **Escola da magia da Feérica:** não conferida.
- **Arredondamento do Foco do Bruxo:** a metade dos PV é arredondada para baixo, porque o livro não diz.
- **PM por círculo:** o custo é mostrado, mas não entra no total de PM. O app só o mostra, porque é gasto a cada lançamento.

## Tormenta RPG

- **Ao Sabor do Destino:** os bônus valem a faixa mais alta atingida. O livro só marca a habilidade como cumulativa. Decisão pendente.
- **Ataque e dano de Ao Sabor:** não são somados a nenhum ataque, porque a ficha não tem seção de ataques.
- **Talentos de combate sem efeito no app:** Aparar, Investida Implacável, Investida Montada, Ataque em Movimento, Ataque Giratório, Tiro em Movimento, Mestre em Arma (rolagem extra e bônus), Perito em Arma (troca de perícia por ataque), Domínio da Morte (toque da morte e dano), Ataque Atordoante (teste de Fortitude). São ações de combate. Ficam com nota na ficha.
- **Liderança:** falta a escolha entre parceiro e seguidores e a distribuição dos níveis.
- **Gnomo, magias "livremente":** custo e frequência não definidos no livro.
- **Devoto:** o pré-requisito de devoto e de domínios fica como texto, não verificado.
- **Minotauro, Medo de altura:** entra como texto, porque a penalidade depende de situação.
- **Meio-elfo:** a segunda habilidade exclui Destreza, porque Destreza já recebe +2 fixo. Leitura minha, a confirmar.
- **Usar Arma Exótica:** o nome segue o livro (p.104).

## 3D&T Victory

- **3D&T Alpha:** não implementado. É outro sistema, fora do escopo.
- **Artefato, limite por tipo:** o limite de uma arma, uma armadura e dois acessórios virou regra de jogo. Cada artefato tem o campo de tipo. Decisão a confirmar.
- **Transtorno:** a escolha de uma das oito opções é obrigatória, nos dois modos. Decisão a confirmar.
- **Auspicioso (Qualidade de Artefato):** fora, porque o custo depende da vantagem concedida, que o app não consegue calcular com segurança.
- **Qualidades de Artefato:** o app calcula o custo, mas não aplica os efeitos em combate (crítico do Acurado, morte do Vorpal, por exemplo).
- **Veículos:** perícias de piloto, Habilidade 1 ou mais para veículos autônomos, o efeito de Ganho no tempo de viagem e o uso de Esporte ou Máquinas para pilotar não estão implementados.
- **Vantagens e desvantagens:** o catálogo tem resumos curtos, com página. Não são o texto completo do livro. Os textos que vieram do Kit Introdutório não foram relidos palavra por palavra.
- **Poderes de arquétipo:** o texto confere com o livro, mas o app não aplica o efeito nas contas.
- **Dados salvos antigos:** `copia` virou `clone` e `insano` virou `transtorno`. Há migração ao carregar, mas backups de outras fontes com esses ids não foram testados.

## CoC7

- **Método de pontos do Keeper Rulebook:** não implementado, porque o livro não foi enviado.
- **Ocupações fora das 19 do app:** faltam as que dependem de Contabilidade e Operar Maquinário Pesado, e nove sem fórmula na fonte. Dependem do Keeper.
- **Sanidade máxima:** só confirmada em fórum, não no livro.
- **Foco ao sugerir distribuição:** a sugestão reconhece o teto de 90%, mas o usuário pode ultrapassar com um aviso.

## Agente pessoal (Ceguituz)

Projeto separado, em `/home/claude/ceguituz`, ainda sem repositório no GitHub. Ver o README do projeto para o plano por fase e os itens pendentes.
