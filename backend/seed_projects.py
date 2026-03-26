import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from engine.models import Project

projects = [
    {
        "title": "AutoFlow SaaS",
        "category": "BE",
        "technologies": ["Django", "React", "PostgreSQL"],
        "problem_statement": "Gestão ineficiente de frotas e alunos em autoescolas.",
        "solution_architecture": "Arquitetura escalável com isolamento de dados por tenant.",
        "impact_metrics": "Automação completa do fluxo de agendamento."
    },
    {
        "title": "Libras Tour",
        "category": "CV",
        "technologies": ["Python", "MediaPipe", "OpenCV"],
        "problem_statement": "Barreiras de comunicação para turistas surdos.",
        "solution_architecture": "Pipeline de visão computacional para tradução de sinais em tempo real.",
        "impact_metrics": "90%+ de precisão em gestos estáticos."
    },
    {
        "title": "Ecossistema SEAP-MA",
        "category": "AT",
        "technologies": ["Django", "Python", "ETL"],
        "problem_statement": "Processos manuais de consolidação de documentos no SEI.",
        "solution_architecture": "Automação tática de extração de dados e geração de relatórios.",
        "impact_metrics": "Redução drástica no tempo de resposta administrativo."
    }
]

for p in projects:
    Project.objects.update_or_create(title=p['title'], defaults=p)

print("✅ Cases de engenharia injetados com sucesso!")