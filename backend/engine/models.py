from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100) # IoT, Backend, Vision, Automation
    stack = models.JSONField() # Ex: ["Django", "OpenCV", "Raspberry Pi"]
    challenge = models.TextField() # O problema real
    solution = models.TextField() # Sua decisão técnica
    architecture_diagram = models.URLField(blank=True) # Link para o C4 Model
    impact_metric = models.CharField(max_length=100) # Ex: "Redução de 40% no tempo de resposta"
    github_url = models.URLField()