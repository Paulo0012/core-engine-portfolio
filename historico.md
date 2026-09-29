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
