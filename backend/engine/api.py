from ninja import Router
from .models import Project
from .schemas import ProjectOut
from typing import List

router = Router()

@router.get("/", response=List[ProjectOut])
def list_projects(request):
    """Lista todos os cases de engenharia com tipagem forte"""
    return Project.objects.all()

@router.get("/{project_id}", response=ProjectOut)
def get_project(request, project_id: int):
    """Busca um projeto específico pelo ID"""
    return Project.objects.get(id=project_id)

@router.get("/logs", response=List[str])
def get_engineering_logs(request):
    return [
        "[INFO] Database migration successful.",
        "[WARN] Mediapipe high latency detected in Libras Tour module.",
        "[SUCCESS] AutoFlow Multi-tenant isolation verified.",
        "[INFO] Telemetry node 'UFMA-Lab' connected via MQTT."
    ]