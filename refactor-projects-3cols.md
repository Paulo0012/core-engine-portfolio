# Refatoração do Módulo de Projetos e Categorização em 3 Colunas

## Goal
Atualizar o backend (Django) e admin para os 3 pilares (`FULLSTACK`, `MACHINE_LEARNING`, `HARDWARE`), migrar dados existentes e refatorar a seção de projetos no frontend para um grid de 3 colunas temáticas lado a lado com cards reativos.

## Tasks
- [x] Task 1: Atualizar modelo `Project` em `backend/engine/models.py` com `CATEGORY_CHOICES` e `max_length=30`, gerar e aplicar migração → Verify: `python manage.py makemigrations && python manage.py migrate`
- [x] Task 2: Executar migração de dados dos projetos existentes (`BE`/`AT` -> `FULLSTACK`, `CV` -> `MACHINE_LEARNING`, `IOT` -> `HARDWARE`) → Verify: `python manage.py shell` confirma categorias
- [x] Task 3: Atualizar `backend/engine/schemas.py` e rotas do `backend/engine/api.py` para aceitar e retornar as 3 categorias → Verify: API `/api/v1/cases/` retorna os projetos com novas categorias
- [x] Task 4: Atualizar `frontend/src/pages/ProjectForm.tsx` e `hooks/useProjectSubmit.ts` com as novas opções de select e seleção correta na edição → Verify: Abrir formulário e testar opções
- [x] Task 5: Refatorar `frontend/src/pages/AdminDashboard.tsx` com badges coloridas por categoria e abas de filtro rápido [Todos, Fullstack, Machine Learning, Hardware] → Verify: Filtragem de linhas e contadores na tabela
- [x] Task 6: Refatorar `frontend/src/components/dashboard/ProjectsSection.tsx` para grid de 3 colunas (`grid-cols-1 lg:grid-cols-3 gap-8`) com cabeçalhos dedicados e cards verticais que preservam player de vídeo, preview de imagem, tags e modal de detalhes → Verify: Layout responsivo e interativo
- [x] Task 7: Executar build e validação do frontend → Verify: `npm run build` no diretório frontend

## Done When
- [x] Backend persiste e valida `FULLSTACK`, `MACHINE_LEARNING`, `HARDWARE`
- [x] Admin permite criar e editar projetos com essas 3 categorias e filtrá-los
- [x] Frontend exibe 3 colunas lado a lado no desktop com cabeçalhos fixos temáticos e cards verticais preservando vídeos e modal de detalhes
