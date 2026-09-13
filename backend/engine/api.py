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
    title: str = Form(...),
    category: str = Form(...),
    status: str = Form(...),
    technologies: str = Form(...),
    problem_statement: str = Form(...),
    solution_architecture: str = Form(...),
    impact_metrics: str = Form(...),
    github_link: str = Form(None),
    live_demo: str = Form(None),
    cover_image: UploadedFile = File(None), 
    demo_video: UploadedFile = File(None),
    gallery_images: List[UploadedFile] = File(None) 
):
    with transaction.atomic():
        project_data = {
            'title': title,
            'category': category,
            'status': status,
            'problem_statement': problem_statement,
            'solution_architecture': solution_architecture,
            'impact_metrics': impact_metrics,
            'github_link': github_link if github_link != "" else None,
            'live_demo': live_demo if live_demo != "" else None,
        }
        
        techs = technologies
        if isinstance(techs, str):
            try:
                project_data['technologies'] = json.loads(techs)
            except:
                project_data['technologies'] = [t.strip() for t in techs.split(',') if t]

        project = Project.objects.create(**project_data)

        if cover_image:
            project.cover_image = cover_image
        if demo_video:
            project.demo_video = demo_video
        
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

@router.post("/{project_id}", response=ProjectOut, auth=auth_bearer)
def update_project(
    request, 
    project_id: int,
    title: str = Form(...),
    category: str = Form(...),
    status: str = Form(...),
    technologies: str = Form(...),
    problem_statement: str = Form(...),
    solution_architecture: str = Form(...),
    impact_metrics: str = Form(...),
    github_link: str = Form(None),
    live_demo: str = Form(None),
    cover_image: UploadedFile = File(None), 
    demo_video: UploadedFile = File(None),
    gallery_images: List[UploadedFile] = File(None) 
):
    
    with transaction.atomic():
        project_data = {
            'title': title,
            'category': category,
            'status': status,
            'problem_statement': problem_statement,
            'solution_architecture': solution_architecture,
            'impact_metrics': impact_metrics,
            'github_link': github_link if github_link != "" else None,
            'live_demo': live_demo if live_demo != "" else None,
        }
        
        techs = technologies
        if isinstance(techs, str):
            try:
                project_data['technologies'] = json.loads(techs)
            except:
                project_data['technologies'] = [t.strip() for t in techs.split(',') if t]

        for key, value in project_data.items():
            setattr(project, key, value)
            
        if cover_image:
            project.cover_image = cover_image
        if demo_video:
            project.demo_video = demo_video
            
        project.save()

        if gallery_images:
            for img in gallery_images:
                ProjectImage.objects.create(project=project, image=img)
                
    return project