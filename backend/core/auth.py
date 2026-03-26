import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import User
from ninja.security import HttpBearer

class JWTAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            # Decodifica o token usando a SECRET_KEY do Django
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects.get(username=payload["username"])
            return user
        except Exception:
            return None

# ESTA LINHA É A QUE ESTÁ FALTANDO:
auth_bearer = JWTAuth()

def create_token(user):
    """Gera o token para o Frontend"""
    payload = {
        "username": user.username,
        "exp": datetime.utcnow() + timedelta(days=7),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")