from ninja import Schema
from typing import List, Optional

class ProjectIn(Schema):
    """Dados de entrada (para criar/editar via Admin ou API)"""
    title: str
    category: str  # IOT, BE, CV, AT
    technologies: List[str]
    problem_statement: str
    solution_architecture: str
    impact_metrics: str
    github_link: Optional[str] = None

class ProjectOut(Schema):
    """Dados de saída (o que o React vai receber)"""
    id: int
    title: str
    category: str
    technologies: List[str]
    problem_statement: str
    solution_architecture: str
    impact_metrics: str
    github_link: Optional[str] = None