from ninja import NinjaAPI, Schema
from django.contrib.auth import authenticate
from engine.api import router as engine_router
from telemetry.api import router as telemetry_router
from .auth import create_token, auth_bearer # Certifique-se que auth.py está ok

# 1. PRIMEIRO: Definir os Schemas de dados
class LoginSchema(Schema):
    username: str
    password: str

class TokenSchema(Schema):
    token: str

# 2. SEGUNDO: Instanciar a API Principal
api = NinjaAPI(
    title="Soares Gomes OS API",
    version="1.0.0",
    description="Engine de controle do portfólio técnico de Paulo Gabriel"
)

# 3. TERCEIRO: Definir rotas da própria API (como Login)
@api.post("/login", response={200: TokenSchema, 401: dict})
def login(request, data: LoginSchema):
    user = authenticate(username=data.username, password=data.password)
    if user:
        return 200, {"token": create_token(user)}
    return 401, {"message": "Credenciais de engenheiro inválidas."}

# 4. QUARTO: Adicionar os roteadores dos Apps (Engine e Telemetry)
api.add_router("/cases", engine_router)
api.add_router("/telemetry", telemetry_router)