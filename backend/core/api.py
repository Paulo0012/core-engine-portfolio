from ninja import NinjaAPI, Schema
from engine.models import Project
from typing import List

api = NinjaAPI(title="Soares Gomes OS API", version="1.0.0")

class ProjectSchema(Schema):
    title: str
    category: str
    technologies: List[str]
    problem_statement: str
    impact_metrics: str

@api.get("/projects", response=List[ProjectSchema])
def list_projects(request):
    return Project.objects.all()

@api.get("/system/health")
def health_check(request):
    return {"status": "operational", "engine": "Python 3.11", "uptime": "stable"}