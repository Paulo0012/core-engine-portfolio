from ninja import Schema
from typing import List, Optional
from datetime import datetime

# Esquema auxiliar para a galeria no ProjectOut
class ProjectGalleryOut(Schema):
    id: int
    image: str # URL da imagem
    caption: Optional[str] = None

class ProjectIn(Schema):
    """Esquema de ENTRADA (O que o React envia no POST/PUT)"""
    title: str
    category: str
    technologies: List[str]
    problem_statement: str
    solution_architecture: str
    impact_metrics: str
    # Mídia Única (Capa e Vídeo)
    # Nota: No upload via FormData, cover_image e video_demo são tratados separadamente
    # github_link: Optional[str] = None
    # live_demo: Optional[str] = None
    slug: Optional[str] = None

class ProjectOut(Schema):
    """Esquema de SAÍDA (O que o Frontend exibe)"""
    id: int
    title: str
    slug: str
    category: str
    technologies: List[str]
    problem_statement: str
    solution_architecture: str
    impact_metrics: str
    # Mídia (Django Ninja resolve as URLs se MEDIA_URL estiver configurado)
    cover_image: Optional[str] = None
    video_demo: Optional[str] = None
    # A Mágica: Lista de imagens da galeria
    gallery: List[ProjectGalleryOut]
    
    github_link: Optional[str] = None
    live_demo: Optional[str] = None
    created_at: datetime