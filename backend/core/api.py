from ninja import NinjaAPI
from engine.api import router as engine_router
from telemetry.api import router as telemetry_router
from ninja import Schema
from django.contrib.auth import authenticate
from .auth import create_token, JWTAuth

# Instanciamos o protetor de rotas
auth_bearer = JWTAuth()

class LoginSchema(Schema):
    username: str
    password: str

class TokenSchema(Schema):
    token: str

# Adicione ao seu NinjaAPI existente no core/api.py
@api.post("/login", response={200: TokenSchema, 401: dict})
def login(request, data: LoginSchema):
    user = authenticate(username=data.username, password=data.password)
    if user:
        return 200, {"token": create_token(user)}
    return 401, {"message": "Credenciais de engenheiro inválidas."}

api = NinjaAPI(
    title="Soares Gomes OS - API",
    version="1.0.0",
    description="Engine de controle do portfólio técnico de Paulo Gabriel"
)

# Acoplamento dos módulos
api.add_router("/cases", engine_router)
api.add_router("/telemetry", telemetry_router)