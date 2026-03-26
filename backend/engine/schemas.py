from ninja import Schema
from typing import List, Optional
from datetime import datetime

class ProjectIn(Schema):
    """
    Schema de Entrada: O que o seu Dashboard (ou um script de automação) 
    enviará para o servidor para cadastrar um novo case.
    """
    title: str
    category: str  # Sugestão: IOT, BE (Backend), CV (Vision), AT (Automation)
    technologies: List[str]  # Ex: ["Django", "React", "OpenCV"]
    problem_statement: str   # O "Desafio"
    solution_architecture: str # A "Decisão Técnica"
    impact_metrics: str      # O "Resultado Real" (Ex: +40% de eficiência)
    github_link: Optional[str] = None
    live_demo: Optional[str] = None

class ProjectOut(Schema):
    """
    Schema de Saída: O que o Frontend (React) receberá da API.
    Inclui campos gerados automaticamente pelo Banco de Dados (ID e Data).
    """
    id: int
    title: str
    category: str
    technologies: List[str]
    problem_statement: str
    solution_architecture: str
    impact_metrics: str
    github_link: Optional[str] = None
    live_demo: Optional[str] = None
    created_at: datetime  # Importante para ordenar no Frontend por 'Mais Recente'

class ErrorMessage(Schema):
    """Schema auxiliar para mensagens de erro padronizadas"""
    message: str