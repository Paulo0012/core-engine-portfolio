import os
import django
from django.utils.text import slugify

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from engine.models import Project

projects = [
    {
        "title": "AutoFlow SaaS",
        "category": "BE",
        "technologies": ["Django", "React", "PostgreSQL"],
        "problem_statement": "Gestão ineficiente de frotas e alunos em autoescolas.",
        "solution_architecture": "Arquitetura multi-tenant escalável com isolamento de dados.",
        "impact_metrics": "98% de automação no fluxo de agendamento."
    },
    {
        "title": "Libras Tour",
        "category": "CV",
        "technologies": ["Python", "MediaPipe", "OpenCV"],
        "problem_statement": "Barreiras de comunicação para turistas surdos.",
        "solution_architecture": "Pipeline de visão computacional para tradução de sinais em tempo real.",
        "impact_metrics": "92% de precisão em reconhecimento de gestos."
    },
    {
        "title": "Ecossistema SEAP-MA",
        "category": "AT",
        "technologies": ["Django", "Python", "ETL"],
        "problem_statement": "Processos manuais de consolidação de documentos no SEI.",
        "solution_architecture": "Automação tática de extração de dados e geração de relatórios.",
        "impact_metrics": "Redução de 70% no tempo de processamento administrativo."
    }
]

print("🚀 Iniciando injeção de dados no motor...")

for p in projects:
    # Geramos o slug a partir do título para evitar o erro de UNIQUE
    p['slug'] = slugify(p['title'])
    
    obj, created = Project.objects.update_or_create(
        slug=p['slug'], # Usamos o slug como chave de busca
        defaults=p
    )
    status = "Criado" if created else "Atualizado"
    print(f"[{status}] Node: {obj.title}")

print("✅ Operação concluída. Banco de dados sincronizado.")