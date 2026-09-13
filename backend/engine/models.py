from django.db import models
from django.utils.text import slugify
from django.core.validators import FileExtensionValidator
import uuid

class Project(models.Model):
    CATEGORIES = [
        ('IOT', 'Internet of Things'),
        ('BE', 'Backend & Scalability'),
        ('CV', 'Computer Vision'),
        ('AT', 'Automation & Data'),
    ]

    # --- IDENTIFICADORES E METADADOS ---
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    category = models.CharField(max_length=3, choices=CATEGORIES)
    technologies = models.JSONField(default=list) # Ex: ["YOLOv11", "Python", "MQTT"]
    
    # --- DOSSIÊ DE ENGENHARIA ---
    problem_statement = models.TextField()
    solution_architecture = models.TextField()
    impact_metrics = models.CharField(max_length=255) 
    
    # --- ATIVOS ÚNICOS ---
    # Imagem de Capa (Principal)
    cover_image = models.ImageField(upload_to='projects/covers/', null=True, blank=True)
    
    # Vídeo de Demonstração (Opcional - Aceita MP4/MOV)
    # FileExtensionValidator garante que o usuário não suba arquivos errados
    video_demo = models.FileField(
        upload_to='projects/videos/', 
        null=True, 
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=['mp4', 'mov', 'avi'])]
    )
    
    # Repositórios
    github_link = models.URLField(blank=True, null=True)
    live_demo = models.URLField(blank=True, null=True) # Link para app web/demo ao vivo
    
    # --- TIMESTAMPS ---
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """Automação de Slug Anti-Colisão."""
        if not self.slug:
            base_slug = slugify(self.title)
            if not base_slug:
                base_slug = uuid.uuid4().hex[:8]
            self.slug = base_slug
            
            counter = 1
            while Project.objects.filter(slug=self.slug).exists():
                self.slug = f"{base_slug}-{counter}"
                counter += 1
                
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.category}] {self.title}"

    class Meta:
        verbose_name = "Projeto de Engenharia"
        ordering = ['-created_at']


class ProjectImage(models.Model):
    """
    Tabela de Galeria (1-para-Muitos). 
    Um projeto pode ter várias fotos adicionais.
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True, null=True) # Legenda opcional (ex: "Defeito no Isolador 4")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.project.title}"

# --- CMS MODELS ---

class AcademicJourney(models.Model):
    STATUS_CHOICES = [
        ('Cursando', 'Cursando'),
        ('Concluído', 'Concluído'),
        ('Trancado', 'Trancado'),
    ]
    course = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    period = models.CharField(max_length=100) # Ex: 2020 - 2026
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Concluído')
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', '-id']
        verbose_name = "Jornada Acadêmica"
        
    def __str__(self):
        return f"{self.course} - {self.institution}"

class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    date_info = models.CharField(max_length=100, blank=True, null=True) # Ex: 30h, 2025
    certificate_file = models.FileField(upload_to='certifications/', null=True, blank=True)
    link = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']
        verbose_name = "Certificação"

    def __str__(self):
        return self.name

class ProfessionalExperience(models.Model):
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    period = models.CharField(max_length=100) # Ex: 2024 - Atual
    description = models.TextField(blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']
        verbose_name = "Experiência Profissional"

    def __str__(self):
        return f"{self.role} at {self.company}"

class Skill(models.Model):
    category = models.CharField(max_length=100) # Ex: Linguagens & Web
    name = models.CharField(max_length=100) # Ex: Python, C++
    level = models.CharField(max_length=50, blank=True, null=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']
        verbose_name = "Habilidade"

    def __str__(self):
        return f"{self.category}: {self.name}"

class ContactInfo(models.Model):
    email = models.EmailField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    lattes = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Informação de Contato"
        verbose_name_plural = "Informações de Contato"

    def __str__(self):
        return "Contact Details"