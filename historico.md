# Histórico do Projeto

Este arquivo documenta as principais implementações, ajustes e decisões tomadas durante as sessões de desenvolvimento recentes do portfólio.

## Últimas Implementações

### 1. Efeito Máquina de Escrever (Typewriter) na Biografia
- **Componente**: `TypewriterBio.tsx`
- **Descrição**: Foi criado um efeito de digitação realista e rápido para a seção "Sobre Mim".
- **Detalhes Técnicos**: 
  - Utilizou-se um texto invisível (`opacity-0`) por baixo para reservar o espaço e evitar *layout shift* (a tela pulando).
  - Cursor interativo piscando (utilizando `animate-pulse` do Tailwind) no final da digitação.
  - O bug do `useEffect` (dependência de estado que limpava o intervalo prematuramente) foi corrigido usando `useRef`.

### 2. Imagens 3D Personalizadas (Hobby Cards)
- **Avatares**: As ilustrações 3D padrão de hobbies (Música, Musculação, Fé, Ensinar) foram substituídas por modelos 3D criados por Inteligência Artificial tendo como referência a foto do usuário (`profile_edited.png`).
- **Ajustes de Layout**: 
  - A imagem foi expandida para preencher o topo do card (estilo *header*).
  - O efeito de fundo foi removido visualmente utilizando a propriedade `mix-blend-multiply` do CSS, mesclando o fundo bege da imagem com o fundo do card, fazendo o personagem parecer estar "solto" na tela.
  - Adição de `drop-shadow-2xl` nas imagens para maior noção de profundidade.

### 3. Animações Contínuas (Levitação)
- **Animações**: Em vez de ficarem estáticas aguardando o *hover*, as imagens 3D agora possuem uma animação contínua de "levitação" suave (flutuando para cima e para baixo usando Framer Motion), cada uma com tempos ligeiramente diferentes para quebrar a simetria.
- **Interatividade**: Ao passar o mouse (*hover*) sobre o card, o personagem flutuante dá um leve zoom na direção do usuário (`scale-110`).

### 4. Aprimoramento do Card de Informações Rápidas
- **Ícones**: Foram adicionados ícones do pacote `lucide-react` (`GraduationCap`, `Code2`, `MapPin`) na seção de Trajetória, Especialidade e Localização.
- **Layout**: Foram organizados em contêineres arredondados translúcidos ao lado do texto para preencher melhor o vazio do card menor, mantendo o equilíbrio visual com o card maior da biografia.

### 5. Resolução de Dúvidas
- Foi esclarecido o funcionamento do rastreamento de acessos vindos da *bio* do Instagram, apontando a necessidade de uso de UTM parameters e ferramentas de *Analytics* (Vercel, Google Analytics) em vez de captura direta da identidade do usuário por questões de LGPD e políticas do Instagram.

### 6. Refatoração do Módulo de Projetos e Grid em 3 Colunas
- **Categorização em 3 Pilares**:
  - Unificação de todo o sistema nos 3 pilares fundamentais: `FULLSTACK` ("Fullstack"), `MACHINE_LEARNING` ("Machine Learning") e `HARDWARE` ("Hardware").
  - Atualização do modelo `Project` no Django com `max_length=30` para o campo `category`, gerando e aplicando a migração `0008_alter_project_category.py`.
  - Implementação de data migration no banco SQLite atualizando os projetos legados (`BE`/`AT` -> `FULLSTACK`, `CV` -> `MACHINE_LEARNING`, `IOT` -> `HARDWARE`).
  - Normalização defensiva em `api.py` para aceitar chaves novas ou legadas sem quebrar payloads antigos.
  - Atualização dos testes de integração automatizados em `tests.py` (100% de sucesso).
- **Painel de Controle e CRUD (`ProjectForm.tsx` & `AdminDashboard.tsx`)**:
  - `ProjectForm.tsx`: Atualização do select para as 3 categorias e recuperação automática na rota de edição `/admin/edit/:id`.
  - `AdminDashboard.tsx`: Criação de barra de abas de filtro rápido (`Todos`, `Fullstack`, `Machine Learning`, `Hardware`) com contadores em tempo real e badges temáticas com estilos específicos por categoria.
  - Correção de import do ícone `Activity` de `lucide-react` para sanar ReferenceError no build da Vercel.
- **Frontend de Apresentação (`ProjectsSection.tsx`)**:
  - Transformação do layout vertical com timeline em um grid com 3 colunas dedicadas lado a lado (`grid-cols-1 lg:grid-cols-3 gap-8`).
  - Cabeçalhos de coluna padronizados (`min-h-[135px]`) com gradientes temáticos (Azul Safira para Fullstack, Verde Esmeralda para Machine Learning, Âmbar Cobre para Hardware).
  - Alinhamento horizontal milimétrico:
    - Centralização simétrica do cabeçalho da seção (`max-w-2xl mx-auto`).
    - Título do card com altura fixa de 2 linhas (`h-12`).
    - Descrição com altura fixa (`h-10`).
    - Métrica de impacto unificada (`h-8`).
    - Sanitização e truncamento inteligente de tags extensas (`formatTechTag`), limitadas a 3 itens na mesma linha + contador `+N` para evitar deformação dos cards.
    - Rodapé fixo com botão "Dossiê Técnico / Explorar".
    - Preservação integral do preview em vídeo (`autoplay`, `loop`, `mute`), imagem de capa e modal completo via `createPortal`.

### 7. Procedimentos de Sincronização em Produção
- **Backend (PythonAnywhere)**:
  - Documentado o fluxo de deploy via terminal Bash: uso de `git stash` caso haja edições locais, seguido de `git pull origin main`.
  - Ativação da virtualenv `venv` localizada em `~/.virtualenvs/venv/bin/activate`.
  - Execução de `python manage.py migrate` dentro de `~/backend/backend`.
  - Recarregamento da aplicação web pelo painel Web do PythonAnywhere ("Reload").
- **Frontend (Vercel)**:
  - Deploy contínuo via push na branch `main` do repositório GitHub.

### 8. Padronização Visual Gothic Noir nos 3 Pilares
- **Remoção de Cores Saturadas**: Eliminadas as cores saturadas (azul/sky, verde/emerald e âmbar) dos cabeçalhos e badges das 3 colunas de projetos (`ProjectsSection.tsx`) e do painel (`AdminDashboard.tsx`).
- **Harmonização com o Design System**: Unificação completa com os tokens nativos do tema (`--color-gn-*`): superfícies translúcidas em `bg-gn-surface/15` a `bg-gn-surface/25`, bordas em `border-gn-surface/40`, e tipografia em `text-gn-highlight` e `text-gn-accent`.
- **Eliminação de Fundos Claros Rígidos**: Removidos elementos com `bg-white` em favor de `bg-gn-bg/95` e `bg-gn-highlight`.
- **Atualização das Diretrizes**: Registrado no `contexto.md` o compromisso estrito com a sobriedade Gothic Noir para os pilares técnicos.
