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

    # --- IDENTIFICADORES ---
    title = models.CharField(max_length=200)
    # unique=True é vital, mas blank=True permite que o Django gere sozinho
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    
    # --- METADADOS TÉCNICOS ---
    category = models.CharField(max_length=3, choices=CATEGORIES)
    # JSONField é ideal para armazenar listas de tecnologias sem tabelas extras
    technologies = models.JSONField(default=list) 
    
    # --- DOSSIÊ DE ENGENHARIA ---
    problem_statement = models.TextField()
    solution_architecture = models.TextField()
    impact_metrics = models.CharField(max_length=255) 
    
    # --- ATIVOS E REPOSITÓRIOS ---
    # null=True e blank=True garantem que o banco não trave se o campo estiver vazio
    image = models.ImageField(upload_to='projects/', null=True, blank=True)
    github_link = models.URLField(blank=True, null=True)
    live_demo = models.URLField(blank=True, null=True)
    
    # --- TIMESTAMPS ---
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """
        Gatilho de Automação: 
        1. Gera o slug a partir do título se estiver vazio.
        2. Resolve colisões de nomes (ex: 'projeto-v1', 'projeto-v1-1').
        """
        if not self.slug:
            base_slug = slugify(self.title)
            
            # Fallback caso o título seja apenas caracteres especiais
            if not base_slug:
                base_slug = uuid.uuid4().hex[:8]
            
            self.slug = base_slug
            
            # Loop de Verificação de Unicidade (Anti-Colisão)
            counter = 1
            while Project.objects.filter(slug=self.slug).exists():
                self.slug = f"{base_slug}-{counter}"
                counter += 1
                
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.category}] {self.title}"

    class Meta:
        verbose_name = "Projeto de Engenharia"
        verbose_name_plural = "Projetos de Engenharia"
        ordering = ['-created_at']