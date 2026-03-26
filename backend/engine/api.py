from ninja import Router
from .models import Project
from typing import List

router = Router()

@router.get("/", response=List[dict]) # Depois trocaremos 'dict' pelo Schema real
def list_projects(request):
    return list(Project.objects.all().values())