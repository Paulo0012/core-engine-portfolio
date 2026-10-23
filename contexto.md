# Contexto do Projeto (core-engine-portfolio)

Este documento serve como um guia rápido para que novos agentes de inteligência artificial ou desenvolvedores compreendam o ecossistema, preferências, arquitetura e estado atual do projeto.

## 1. Visão Geral
- **Nome do Projeto**: core-engine-portfolio
- **Propósito**: Portfólio pessoal e interativo para um engenheiro/desenvolvedor de software estruturado em 3 pilares de especialidade: **Fullstack**, **Machine Learning** e **Hardware**.
- **Estilo Visual**: Design "Premium", minimalista e técnico ("Gothic Noir"), focado em causar forte impacto visual ("WOW factor") sem poluição visual.

## 2. Tech Stack e Infraestrutura
- **Frontend**: 
  - React com Vite e TypeScript.
  - Tailwind CSS v4 para estilização com tokens temáticos no `index.css`.
  - Framer Motion para animações de levitação contínua, entrada e revelação de seções (`FadeUp`).
  - Lucide React para iconografia.
  - Hospedagem: **Vercel** (deploy contínuo automático a cada push na branch `main`).
- **Backend**:
  - Django Ninja (Python) com API REST documentada.
  - Banco de Dados: SQLite (`db.sqlite3`).
  - Hospedagem: **PythonAnywhere** (`paulogabriel00.pythonanywhere.com`).
  - Ambiente Virtual: Virtualenv `venv` localizada em `~/.virtualenvs/venv/`.

## 3. Diretrizes de Design e UX
- **Glassmorphism**: Fundos translúcidos (`backdrop-blur`), bordas sutis e sombras expansivas.
- **Sistema de Cores**: Definido no `index.css` usando variáveis (`--color-gn-bg: #D1D0D0`, `--color-gn-surface: #988686`, `--color-gn-accent: #5C4E4E`, `--color-gn-highlight: #000000`).
- **Pilares Técnicos (Identidade Visual)**:
  - **Sobriedade Gothic Noir**: Totalmente integrados de forma monocromática e técnica aos tokens do tema (`--color-gn-*`).
  - Cores saturadas (como azul, verde e âmbar puros) são **estritamente evitadas** nas colunas e cabeçalhos para manter a coerência estética e o minimalismo técnico do portfólio.
  - Cabeçalhos, ícones e badges utilizam acabamento translúcido (`bg-gn-surface/15` a `bg-gn-surface/25`), bordas em `border-gn-surface/40` e tipografia técnica em `text-gn-highlight` e `text-gn-accent`.
- **Alinhamento & Simetria**:
  - Grids balanceados com alturas padronizadas para títulos (`h-12`), descrições (`h-10`) e métricas (`h-8`).
  - Sanitização de tags longas (`formatTechTag`) para garantir que os cards mantenham a mesma linha horizontal.
- **Micro-interações**: Cards (`GlowCard`) reagem ao cursor do mouse, com micro-zoom (`scale-105`) e efeitos de hover refinados.

## 4. Componentes Principais (Frontend)
- **ProjectsSection (`src/components/dashboard/ProjectsSection.tsx`)**:
  - Seção de estudos de caso organizada em **grid de 3 colunas dedicadas lado a lado** no desktop (`grid-cols-1 lg:grid-cols-3 gap-8`).
  - Cada coluna possui cabeçalho temático padronizado com ícone, título, tagline e contador de cases.
  - Cards reativos com suporte a vídeo em loop (`video_demo`), imagem de capa (`cover_image`), tags de tecnologias e modal detalhado de dossiê técnico renderizado via `createPortal`.
- **AdminDashboard (`src/pages/AdminDashboard.tsx`)**:
  - Painel de administração para gestão de nós técnicos.
  - Barra de abas de filtro rápido por categoria (`Todos`, `Fullstack`, `Machine Learning`, `Hardware`) com contadores e badges estilizadas.
- **ProjectForm (`src/pages/ProjectForm.tsx`)**:
  - Formulário de cadastro e edição de projetos com as 3 opções de categoria, upload de mídias, tecnologias e métricas.
- **TypewriterBio (`src/components/TypewriterBio.tsx`)**:
  - Efeito de digitação com texto fantasma (`opacity-0`) para prevenir layout shift.
- **Hobby Cards (AboutSection)**:
  - Avatares 3D customizados com animação de levitação contínua e mesclagem `mix-blend-multiply`.

## 5. Convenções do Repositório & Produção
- **Categorias Oficiais da Engine**:
  - `FULLSTACK` ("Fullstack")
  - `MACHINE_LEARNING` ("Machine Learning")
  - `HARDWARE` ("Hardware")
- **Procedimento de Atualização no PythonAnywhere**:
  1. No console Bash: `cd ~/backend && git stash && git pull origin main`
  2. Ativar venv: `source ~/.virtualenvs/venv/bin/activate`
  3. Ir para a pasta do Django: `cd backend`
  4. Aplicar migrações: `python manage.py migrate`
  5. Na aba **Web** do PythonAnywhere: clicar no botão verde **Reload**.
