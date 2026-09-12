from django.test import TestCase, Client
from django.contrib.auth.models import User
from core.auth import create_token
import json

class ProjectIntegrationTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='admin_test', password='password123')
        self.token = create_token(self.user)
        self.auth_headers = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}

    def test_create_project_with_new_fields(self):
        """
        Testa o endpoint /api/v1/cases/ simulando o envio de dados do novo
        ProjectForm.tsx (que inclui problem_statement, github_link, etc).
        """
        url = '/api/v1/cases/'
        
        # O React converte as tecnologias num array JSON
        technologies_json = json.dumps(["Python", "Django", "React"])
        
        data = {
            'title': 'Sistema Integrado de Automação',
            'category': 'IOT',
            'technologies': technologies_json,
            'problem_statement': 'Falta de monitoramento em tempo real nos equipamentos.',
            'solution_architecture': 'Sensores IoT via MQTT integrados a um backend Django.',
            'impact_metrics': 'Redução de 40% em tempo de inatividade.',
            'github_link': 'https://github.com/paulo/iot-project',
            'live_demo': 'https://iot.demo.com',
        }
        
        # O NinjaAPI com Form[] espera dados como multipart/form-data ou x-www-form-urlencoded
        response = self.client.post(url, data, **self.auth_headers)
        
        self.assertEqual(response.status_code, 201, f"Erro ao criar projeto: {response.content}")
        
        # Validar payload de resposta
        project_data = response.json()
        self.assertEqual(project_data['title'], data['title'])
        self.assertEqual(project_data['category'], data['category'])
        self.assertEqual(project_data['problem_statement'], data['problem_statement'])
        self.assertEqual(project_data['solution_architecture'], data['solution_architecture'])
        self.assertEqual(project_data['github_link'], data['github_link'])
        self.assertEqual(project_data['live_demo'], data['live_demo'])
        
        # O backend converte o JSON de technologies devolta para lista
        self.assertIn("Django", project_data['technologies'])

    def test_list_projects(self):
        """
        Testa se os projetos criados são listados corretamente no formato exigido
        pelo Dashboard.tsx
        """
        # Cria um projeto primeiro
        self.test_create_project_with_new_fields()
        
        # Lista projetos (rota pública)
        url = '/api/v1/cases/'
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, 200)
        
        projects = response.json()
        self.assertGreater(len(projects), 0)
        
        # Valida se os campos novos estão na resposta
        first_project = projects[0]
        self.assertIn('problem_statement', first_project)
        self.assertIn('github_link', first_project)
        self.assertIn('category', first_project)
