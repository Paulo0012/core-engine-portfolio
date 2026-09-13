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

# --- CMS SCHEMAS ---

class AcademicJourneySchema(Schema):
    id: Optional[int] = None
    course: str
    institution: str
    period: str
    status: str
    order: Optional[int] = 0

class CertificationSchema(Schema):
    id: Optional[int] = None
    name: str
    issuer: str
    date_info: Optional[str] = None
    certificate_file: Optional[str] = None
    link: Optional[str] = None
    order: Optional[int] = 0

class ProfessionalExperienceSchema(Schema):
    id: Optional[int] = None
    role: str
    company: str
    period: str
    description: Optional[str] = None
    order: Optional[int] = 0

class SkillSchema(Schema):
    id: Optional[int] = None
    category: str
    name: str
    level: Optional[str] = None
    order: Optional[int] = 0

class ContactInfoSchema(Schema):
    id: Optional[int] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    lattes: Optional[str] = None