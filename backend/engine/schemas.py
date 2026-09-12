from ninja import Schema
from typing import List, Optional
from datetime import datetime

class ProjectGalleryOut(Schema):
    """Estrutura de cada foto na galeria."""
    id: int
    image: str # URL pública da imagem
    caption: Optional[str] = None

class ProjectIn(Schema):
    """
    Esquema de ENTRADA.
    No POST com arquivos, os campos de arquivo (cover, video) 
    são passados fora do JSON.
    """
    title: str
    category: str
    technologies: str # Recebe JSON string do frontend via FormData
    problem_statement: str
    solution_architecture: str
    impact_metrics: str
    github_link: Optional[str] = None
    live_demo: Optional[str] = None

class ProjectOut(Schema):
    """Esquema de SAÍDA (O que o seu Portfólio exibe)."""
    id: int
    title: str
    slug: str
    category: str
    technologies: List[str]
    problem_statement: str
    solution_architecture: str
    impact_metrics: str
    
    # URLs de Mídia
    cover_image: Optional[str] = None
    video_demo: Optional[str] = None
    
    # Lista de fotos extras (Ex: Fotos dos Isoladores da Equatorial)
    gallery: List[ProjectGalleryOut]
    
    github_link: Optional[str] = None
    live_demo: Optional[str] = None
    created_at: datetime