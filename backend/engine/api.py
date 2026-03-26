from ninja import Router
from typing import List
from django.shortcuts import get_object_or_404
from .models import Project
from .schemas import ProjectIn, ProjectOut
from core.auth import auth_bearer  # Nosso protetor JWT

router = Router(tags=["Engine - Cases de Engenharia"])

# ----------------------------------------------------------------
# ROTAS PÚBLICAS (Abertas para Recrutadores e Visitantes)
# ----------------------------------------------------------------

@router.get("/", response=List[ProjectOut])
def list_projects(request):
    """
    Lista todos os cases de engenharia cadastrados.
    Exibe impacto, tecnologias e arquitetura.
    """
    return Project.objects.all().order_by('-created_at')

@router.get("/{project_id}", response=ProjectOut)
def get_project(request, project_id: int):
    """
    Retorna os detalhes técnicos de um projeto específico.
    """
    return get_object_or_404(Project, id=project_id)

@router.get("/logs/system", response=List[str])
def get_engineering_logs(request):
    """
    Simula logs de sistema para a estética 'Mission Control' do Frontend.
    Demonstra familiaridade com monitoramento de sistemas.
    """
    return [
        "[INFO] Core Engine: System operational.",
        "[SUCCESS] Database integrity verified.",
        "[INFO] Telemetry Node 'UFMA-Lab' linked.",
        "[WARN] Mediapipe: Latency overhead detected in Vision module.",
        f"[INFO] Backend: running on Python 3.11 - {Project.objects.count()} cases loaded."
    ]

# ----------------------------------------------------------------
# ROTAS PROTEGIDAS (Apenas para o seu Dashboard Administrativo)
# ----------------------------------------------------------------

@router.post("/", response={201: ProjectOut}, auth=auth_bearer)
def create_project(request, data: ProjectIn):
    """
    Cria um novo case de engenharia. 
    Exige Token JWT no Header (Authorization: Bearer <token>).
    """
    project = Project.objects.create(**data.dict())
    return 201, project

@router.put("/{project_id}", response=ProjectOut, auth=auth_bearer)
def update_project(request, project_id: int, data: ProjectIn):
    """
    Atualiza um projeto existente.
    """
    project = get_object_or_404(Project, id=project_id)
    for attr, value in data.dict().items():
        setattr(project, attr, value)
    project.save()
    return project

@router.delete("/{project_id}", response={204: None}, auth=auth_bearer)
def delete_project(request, project_id: int):
    """
    Remove um case do portfólio.
    """
    project = get_object_or_404(Project, id=project_id)
    project.delete()
    return 204, None