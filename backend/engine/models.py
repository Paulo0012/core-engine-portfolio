from django.db import models

class Project(models.Model):
    CATEGORIES = [
        ('IOT', 'Internet of Things'),
        ('BE', 'Backend & Scalability'),
        ('CV', 'Computer Vision'),
        ('AT', 'Automation & Data'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=3, choices=CATEGORIES)
    technologies = models.JSONField(default=list) # Armazena ["Python", "C++", "MQTT"]
    problem_statement = models.TextField()
    solution_architecture = models.TextField()
    impact_metrics = models.CharField(max_length=255) # Ex: "98% de precisão no ColorViz"
    github_link = models.URLField(blank=True)
    live_demo = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title