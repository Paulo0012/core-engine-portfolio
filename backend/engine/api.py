from ninja import Router, File, Form
from ninja.files import UploadedFile
from typing import List, Optional
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Project, ProjectImage
from .schemas import ProjectOut, ProjectIn
from core.auth import auth_bearer
import json

router = Router(tags=["Engine - Cases de Engenharia"])

# --- ROTAS PÚBLICAS ---

@router.get("/", response=List[ProjectOut])
def list_projects(request):
    """Retorna todos os cases com galeria e vídeo inclusos."""
    return Project.objects.all().prefetch_related('gallery').order_by('-created_at')

@router.get("/{project_id}", response=ProjectOut)
def get_project(request, project_id: int):
    """Busca um nó específico com todos os ativos de mídia."""
    return get_object_or_404(Project, id=project_id)

# --- ROTAS PROTEGIDAS (REQUEREM LOGIN) ---

@router.post("/", response={201: ProjectOut}, auth=auth_bearer)
def create_project(
    request, 
    data: Form[ProjectIn], # Garante que ele leia o FormData
    cover: File[UploadedFile] = None, 
    video: File[UploadedFile] = None,
    gallery_images: List[File[UploadedFile]] = None
):
    with transaction.atomic():
        # O React envia tudo como string no FormData. Precisamos tratar:
        project_dict = data.dict()
        
        # Correção para o campo technologies (que o banco espera ser uma lista/JSON)
        if isinstance(project_dict.get('technologies'), str):
            # Transforma "Python, Django" em ["Python", "Django"]
            project_dict['technologies'] = [t.strip() for t in project_dict['technologies'].split(',') if t.strip()]
        
        # Garante que campos vazios não quebrem o banco
        if not project_dict.get('problem_statement'):
            project_dict['problem_statement'] = project_dict.get('solution_architecture', 'N/A')

        project = Project.objects.create(**project_dict)

        if cover:
            project.cover_image = cover
        if video:
            project.video_demo = video
        project.save()

        if gallery_images:
            for img in gallery_images:
                ProjectImage.objects.create(project=project, image=img)

    return 201, project

@router.delete("/{project_id}", response={204: None}, auth=auth_bearer)
def delete_project(request, project_id: int):
    """Remove o projeto e limpa os arquivos de mídia associados."""
    project = get_object_or_404(Project, id=project_id)
    project.delete()
    return 204, None