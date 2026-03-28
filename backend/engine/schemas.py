from ninja import Schema
from typing import List, Optional
from datetime import datetime

class ProjectIn(Schema):
    """Esquema de ENTRADA (O que o React envia)"""
    title: str
    category: str
    technologies: List[str]
    problem_statement: str
    solution_architecture: str
    impact_metrics: str
    github_link: Optional[str] = None
    live_demo: Optional[str] = None
    # Slug é opcional: se o React não enviar, o Model.save() gera
    slug: Optional[str] = None

class ProjectOut(Schema):
    """Esquema de SAÍDA (O que o Dashboard e Cards exibem)"""
    id: int
    title: str
    slug: str
    category: str
    technologies: List[str]
    problem_statement: str
    solution_architecture: str
    impact_metrics: str
    image: Optional[str] = None # Retorna a URL da imagem
    github_link: Optional[str] = None
    live_demo: Optional[str] = None
    created_at: datetime