import os
import django
import sys

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from engine.models import (
    Project, ProfessionalExperience, AcademicJourney, 
    Certification, Skill, ContactInfo
)
import json

def seed_data():
    print("Seeding Projects...")
    # Clear existing to avoid duplicates if re-running
    Project.objects.all().delete()
    
    projects = [
        {
            "title": "Automação e Controle de Nível de Reservatórios via FPGA / FSM",
            "category": "IOT",
            "technologies": ["Verilog", "FPGA", "FSM", "Eletrônica"],
            "problem_statement": "Projeto no EmbarcaTech / IFMA (2025). Atuação Prática e Montagem física do protótipo em bancada, confecção do chicote de cabos, soldagem eletrônica.",
            "solution_architecture": "Controle de nível utilizando FPGA e FSM.",
            "impact_metrics": "Concluído",
        },
        {
            "title": "Análise de Enlace e Telemetria Sem Fio via RF 433 MHz",
            "category": "IOT",
            "technologies": ["RF 433 MHz", "Telemetria", "Embarcados"],
            "problem_statement": "Residência em Embarcados / IFMA 2025. Desenvolvimento de sistema de telemetria sem fio utilizando rádio frequência.",
            "solution_architecture": "Comunicação RF 433 MHz.",
            "impact_metrics": "Concluído",
        },
        {
            "title": "Estação Ambiental Conectada (IoT e Decisão na Borda)",
            "category": "IOT",
            "technologies": ["IoT", "Edge Computing", "Sensores"],
            "problem_statement": "Sistemas Distribuídos / UFMA 2025. Estação para monitoramento ambiental com processamento local na borda.",
            "solution_architecture": "Edge Computing para decisão e envio de dados via IoT.",
            "impact_metrics": "Concluído",
        },
        {
            "title": "NeoControlLab: Biometria por Gestos e Monitoramento Distribuído",
            "category": "CV",
            "technologies": ["Visão Computacional", "Biometria", "Sistemas Distribuídos"],
            "problem_statement": "Embarcados 2025. Sistema de monitoramento distribuído que utiliza biometria por gestos.",
            "solution_architecture": "Visão Computacional para detecção de gestos.",
            "impact_metrics": "Concluído",
        },
        {
            "title": "Automação Web de Mini Bomba D'água via Wi-Fi",
            "category": "IOT",
            "technologies": ["Wi-Fi", "IoT", "Web"],
            "problem_statement": "EmbarcaTech / IFMA 2025. Sistema de automação de bomba d'água acionado remotamente via web.",
            "solution_architecture": "ESP/Módulo Wi-Fi para interface web e acionamento de relé/bomba.",
            "impact_metrics": "Concluído",
        }
    ]
    
    for p in projects:
        Project.objects.create(
            title=p['title'],
            category=p['category'],
            technologies=p['technologies'],
            problem_statement=p['problem_statement'],
            solution_architecture=p['solution_architecture'],
            impact_metrics=p['impact_metrics']
        )

    print("Seeding Experiences...")
    ProfessionalExperience.objects.all().delete()
    experiences = [
        {
            "role": "Deep Tech Catalyst – Bolsista ATI III",
            "company": "FAPEMA",
            "period": "Recente",
            "description": "Atuação como Bolsista ATI III na FAPEMA no programa Deep Tech Catalyst.",
            "order": 1
        },
        {
            "role": "Desenvolvedor de Software e Visão Computacional (Projeto P&D)",
            "company": "EQUATORIAL / IFMA",
            "period": "11/2025 – 03/2026",
            "description": "Desenvolvimento de software e soluções de visão computacional em projeto de P&D.",
            "order": 2
        },
        {
            "role": "Monitor do Laboratório de Circuitos Digitais e Eletrônica",
            "company": "UFMA",
            "period": "10/2025 – 01/2026",
            "description": "Monitoria para alunos, auxílio em experimentos práticos e manutenção do laboratório.",
            "order": 3
        },
        {
            "role": "Análise de Dados e Desenvolvimento (GTE)",
            "company": "SEAP-MA",
            "period": "2024 – Atual",
            "description": "Atuação estratégica em análise de dados operacionais e desenvolvimento de automações.",
            "order": 4
        },
        {
            "role": "Suporte Técnico e Manutenção de Hardware",
            "company": "Infogames",
            "period": "2021 – 2023",
            "description": "Manutenção avançada e suporte técnico de nível II.",
            "order": 5
        }
    ]
    for e in experiences:
        ProfessionalExperience.objects.create(**e)

    print("Seeding Academic Journey...")
    AcademicJourney.objects.all().delete()
    acad = [
        {
            "course": "Engenharia da Computação",
            "institution": "UFMA",
            "period": "Término previsto 07/08/2026",
            "status": "Cursando",
            "order": 1
        },
        {
            "course": "Residência Tecnológica em Sistemas Embarcados e FPGA",
            "institution": "IFMA",
            "period": "Concluído em 2025",
            "status": "Concluído",
            "order": 2
        },
        {
            "course": "Bacharelado em Ciência e Tecnologia",
            "institution": "UFMA",
            "period": "Concluído em 2024",
            "status": "Concluído",
            "order": 3
        }
    ]
    for a in acad:
        AcademicJourney.objects.create(**a)

    print("Seeding Certifications...")
    Certification.objects.all().delete()
    certs = [
        {
            "name": "Sistema de Automação de Mini Bomba D’água Remotamente",
            "issuer": "EmbarcaTech / IFMA",
            "date_info": "11/11/2025",
            "order": 1
        },
        {
            "name": "COLORVIZ: Sistema Embarcado de Percepção de Cores e Simulação de Daltonismo",
            "issuer": "IFMA / UFMA",
            "date_info": "11/11/2025 a 13/11/2025",
            "order": 2
        },
        {
            "name": "Sistema de Controle Inteligente de Janela Usando a BitDogLab",
            "issuer": "IFMA",
            "date_info": "11/11/2025",
            "order": 3
        }
    ]
    for c in certs:
        Certification.objects.create(**c)

    print("Seeding Contact Info...")
    ContactInfo.objects.all().delete()
    ContactInfo.objects.create(
        email="paulo.gabriel1019@gmail.com",
        phone="(98) 98713-1757",
        linkedin="https://linkedin.com/in/paulo-gabriel-soares-gomes"
    )

    print("Done!")

if __name__ == "__main__":
    seed_data()
