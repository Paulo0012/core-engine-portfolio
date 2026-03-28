from django.db import models
from django.utils.text import slugify
import uuid

class Project(models.Model):
    CATEGORIES = [
        ('IOT', 'Internet of Things'),
        ('BE', 'Backend & Scalability'),
        ('CV', 'Computer Vision'),
        ('AT', 'Automation & Data'),
    ]

    # Identificadores de Sistema
    title = models.CharField(max_length=200)
    # Slug opcional no formulário, mas obrigatório no banco (auto-gerado no save)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    
    # Metadados Técnicos
    category = models.CharField(max_length=3, choices=CATEGORIES)
    technologies = models.JSONField(default=list) # Ex: ["Python", "Django", "OpenCV"]
    
    # Dossiê de Engenharia
    problem_statement = models.TextField()
    solution_architecture = models.TextField()
    impact_metrics = models.CharField(max_length=255) # Ex: "98% Accuracy"
    
    # Ativos Visuais e Repositórios
    # Adicionei null=True/blank=True para evitar travamentos de integridade
    image = models.ImageField(upload_to='projects/', null=True, blank=True)
    github_link = models.URLField(blank=True, null=True)
    live_demo = models.URLField(blank=True, null=True)
    
    # Timestamps de Auditoria
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """
        Gatilho de Automação: Gera o slug automaticamente se estiver vazio
        e garante que seja único anexando um sufixo se houver colisão.
        """
        if not self.slug:
            base_slug = slugify(self.title)
            # Se o título for vazio ou caracteres especiais, usa um UUID curto
            if not base_slug:
                base_slug = uuid.uuid4().hex[:8]
            
            self.slug = base_slug
            
            # Checagem de colisão simples (evita o erro UNIQUE constraint failed)
            counter = 1
            while Project.objects.filter(slug=self.slug).exists():
                self.slug = f"{base_slug}-{counter}"
                counter += 1
                
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.category}] {self.title}"

    class Meta:
        ordering = ['-created_at'] # Projetos mais novos aparecem primeiro