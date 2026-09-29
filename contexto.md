# Contexto do Projeto (core-engine-portfolio)

Este documento serve como um guia rápido para que novos agentes de inteligência artificial ou desenvolvedores compreendam o ecossistema, preferências e estado atual do projeto.

## 1. Visão Geral
- **Nome do Projeto**: core-engine-portfolio
- **Propósito**: Portfólio pessoal e interativo para um desenvolvedor de software/engenheiro focado em Fullstack & IoT.
- **Estilo Visual**: Design "Premium" e moderno, focado em causar um grande impacto visual ("WOW factor").

## 2. Tech Stack e Ferramentas
- **Frontend**: 
  - React (com Vite/Next.js conforme configurado).
  - Tailwind CSS v4 para estilização rápida.
  - Framer Motion para animações dinâmicas de transição, entrada e scroll.
  - Lucide React para iconografia.
- **Backend**:
  - Django Ninja (Python).

## 3. Diretrizes de Design e UX
- **Glassmorphism**: Forte uso de fundos translúcidos (`backdrop-blur`), bordas sutis e sombras expansivas.
- **Sistema de Cores**: Definido no `index.css` usando variáveis (ex: `--color-gn-bg`, `--color-gn-surface`, `--color-gn-highlight`). O fundo tende a ser em tons beges/neutros suaves com alto contraste nos destaques.
- **Micro-interações**: Botões e cards (*GlowCard*) reagem à posição do mouse, com efeitos de hover que envolvem escalonamento (`scale`), brilho e sombras interativas.
- **Animações (Framer Motion)**:
  - Componentes como `FadeUp` são utilizados massivamente para revelar seções conforme o *scroll* do usuário.
  - Elementos estáticos são evitados ao máximo. O portfólio prioriza elementos contínuos, como partículas ou avatares levitando constantemente.
- **Evitar**: Designs genéricos (botões azuis/vermelhos padrão), "MVP look" ou layouts rígidos sem micro-interações.

## 4. Componentes Principais (Frontend)
- **Sidebar**: Navegação lateral que muda dinamicamente de translúcida para sólida baseado no evento de scroll da página (`isScrolled`).
- **GlowCard**: Um componente de card base reutilizável que intercepta os movimentos do mouse para criar um halo/brilho no cursor sobre o card.
- **FadeUp**: Um wrapper de animação que gerencia o estado `whileInView` para carregar componentes de forma assíncrona enquanto o usuário rola a tela.
- **TypewriterBio**: Efeito customizado que "digita" os parágrafos de apresentação com um cursor piscante, projetado para prever o tamanho do contêiner e evitar layout shifts (pulos na interface).
- **Hobby Cards (AboutSection)**: Utiliza avatares 3D estilizados e personalizados (com o rosto do usuário), que flutuam contínuamente e cujo fundo se mistura (blend-mode) perfeitamente com a interface do cartão.

## 5. Convenções do Repositório
- Uso de `.gitignore` mantido e atualizado rigidamente para evitar o push de arquivos grandes de mídia local (`.mp4`, `.mov`, etc).
- As animações 3D customizadas devem residir na pasta `src/assets/`.
- Uso padrão da instrução `Faça o push` ou `/deploy` para sincronizar automaticamente com a branch principal no GitHub via interface de terminal local.
