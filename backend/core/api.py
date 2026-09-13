from ninja import NinjaAPI, Schema
from django.contrib.auth import authenticate
from engine.api import router as engine_router
from telemetry.api import router as telemetry_router
from .auth import create_token, auth_bearer  # Seu sistema de segurança customizado

# --- SCHEMAS DE DADOS (CONTRATOS) ---
class LoginSchema(Schema):
    username: str
    password: str

class TokenSchema(Schema):
    token: str

class MessageSchema(Schema):
    message: str

# --- INSTÂNCIA DO MOTOR (NINJA) ---
api = NinjaAPI(
    title="Soares Gomes OS API",
    version="1.0.0",
    description="Interface de controle para ecossistema de Engenharia Fullstack",
    urls_namespace="v1" # Define o namespace para evitar conflitos de URL
)

# --- ROTAS DE ACESSO AO NÚCLEO (LOGIN) ---
@api.post("/login", response={200: TokenSchema, 401: MessageSchema}, tags=["Auth"])
def login(request, data: LoginSchema):
    """
    Executa o Handshake de autenticação para acesso ao Painel de Controle (Admin).
    Retorna um Token JWT customizado.
    """
    user = authenticate(username=data.username, password=data.password)
    if user:
        return 200, {"token": create_token(user)}
    
    return 401, {"message": "ACESSO_NEGADO: Credenciais de engenheiro inválidas ou inexistentes."}

# --- MAPEAMENTO DE MÓDULOS (ROUTERS) ---

# Módulo de Projetos/Cases (AutoFlow, SEAP, Equatorial)
api.add_router("/cases", engine_router, tags=["Engine"])

# Módulo do CMS (Experiências, Certificados, etc)
from engine.cms_api import router as cms_router
api.add_router("/cms", cms_router, tags=["Engine CMS"])

# Módulo de Telemetria (Monitoramento de CPU/Hardware)
api.add_router("/telemetry", telemetry_router, tags=["Telemetry"])