from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from .models import Project
from .schemas import ProjectIn, ProjectOut
from core.auth import auth_bearer 

router = Router(tags=["Engine - Cases de Engenharia"])

# --- ROTAS PÚBLICAS ---

@router.get("/", response=List[ProjectOut])
def list_projects(request):
    """Lista todos os cases ordenados pelos mais recentes."""
    return Project.objects.all().order_by('-created_at')

@router.get("/{project_id}", response=ProjectOut)
def get_project(request, project_id: int):
    """Busca detalhes de um nó específico."""
    return get_object_or_404(Project, id=project_id)

@router.get("/logs/system", response=List[str])
def get_engineering_logs(request):
    """Logs estéticos para o SystemLogs do Frontend."""
    count = Project.objects.count()
    return [
        "[INFO] Core Engine: Alpha Build 2026.03 Stable.",
        f"[SUCCESS] Database linked: {count} technical nodes active.",
        "[INFO] Telemetry: Latency 12ms via Localhost.",
        "[WARN] Security: JWT Bearer protection active on POST/PUT/DELETE."
    ]

# --- ROTAS PROTEGIDAS (REQUEREM LOGIN) ---

@router.post("/", response={201: ProjectOut}, auth=auth_bearer)
def create_project(request, data: ProjectIn):
    """
    Cria um novo projeto. 
    Filtra campos nulos para permitir que o Model gere o Slug automaticamente.
    """
    # Filtra apenas campos que não são None para evitar conflito de Slugs
    clean_data = {k: v for k, v in data.dict().items() if v is not None}
    
    project = Project.objects.create(**clean_data)
    return 201, project

@router.put("/{project_id}", response=ProjectOut, auth=auth_bearer)
def update_project(request, project_id: int, data: ProjectIn):
    """Atualiza dados de um projeto existente."""
    project = get_object_or_404(Project, id=project_id)
    for attr, value in data.dict().items():
        if value is not None:
            setattr(project, attr, value)
    project.save()
    return project

@router.delete("/{project_id}", response={204: None}, auth=auth_bearer)
def delete_project(request, project_id: int):
    """Remove um nó do banco de dados."""
    project = get_object_or_404(Project, id=project_id)
    project.delete()
    return 204, None