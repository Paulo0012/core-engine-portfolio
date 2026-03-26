from ninja.security import HttpBearer
from django.contrib.auth.models import User
import jwt # pip install pyjwt
from django.conf import settings
from datetime import datetime, timedelta

class JWTAuth(HttpBearer):
    def authenticate(self, request, token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects.get(username=payload["username"])
            return user
        except Exception:
            return None

def create_token(user):
    """Gera o token para o Frontend armazenar no localStorage"""
    payload = {
        "username": user.username,
        "exp": datetime.utcnow() + timedelta(days=7),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")