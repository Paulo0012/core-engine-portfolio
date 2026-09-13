import os
import sys
import django

# Setup Django environment
sys.path.append(r'c:\Users\Paulo\Desktop\PROJETOS\core-engine-portfolio\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from engine.models import Certification
from django.core.files import File

print("Deleting old certificates...")
Certification.objects.all().delete()

certs = [
    {
        'name': 'Curso de Python Completo',
        'issuer': 'Danki Code',
        'date_info': '26 horas - 21/01/2025',
        'file_path': r'C:\Users\Paulo\.gemini\antigravity-ide\brain\9ef50d71-f44e-4d4d-8a9d-9b39cc9a66ef\.user_uploaded\media_1789306565994.pdf',
        'link': 'https://validate-certificate.dankicode.com'
    },
    {
        'name': 'Curso Banco de Dados',
        'issuer': 'Danki Code',
        'date_info': '5 horas - 19/01/2025',
        'file_path': r'C:\Users\Paulo\.gemini\antigravity-ide\brain\9ef50d71-f44e-4d4d-8a9d-9b39cc9a66ef\.user_uploaded\media_1789306584771.pdf',
        'link': 'https://cursos.dankicode.com/validate-certificate'
    },
    {
        'name': 'Curso PHP Jedai',
        'issuer': 'Danki Code',
        'date_info': '27 horas - 02/04/2024',
        'file_path': r'C:\Users\Paulo\.gemini\antigravity-ide\brain\9ef50d71-f44e-4d4d-8a9d-9b39cc9a66ef\.user_uploaded\media_1789306584776.pdf',
        'link': 'https://cursos.dankicode.com/validate-certificate'
    }
]

print("Adding new certificates...")
for idx, cert_data in enumerate(certs):
    c = Certification(
        name=cert_data['name'],
        issuer=cert_data['issuer'],
        date_info=cert_data['date_info'],
        link=cert_data['link'],
        order=idx
    )
    with open(cert_data['file_path'], 'rb') as f:
        # Save file to the model
        file_name = f"{cert_data['name'].replace(' ', '_').lower()}.pdf"
        c.certificate_file.save(file_name, File(f))
    c.save()
    print(f"Added {cert_data['name']}")

print("All certificates updated successfully!")
