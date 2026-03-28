import os
from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

# --- SEGURANÇA BÁSICA ---
SECRET_KEY = 'django-insecure-sua-chave-secreta-aqui' # Em produção, use Variável de Ambiente
DEBUG = True
ALLOWED_HOSTS = ['*'] # Permite acesso de qualquer IP na sua rede local

# --- APLICAÇÕES DO SISTEMA ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Bibliotecas de Terceiros
    'corsheaders',
    'ninja_jwt',
    
    # Seus Módulos de Engenharia
    'engine',
    'telemetry',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Deve ser o primeiro!
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# --- BANCO DE DADOS (SQLITE PARA DESENVOLVIMENTO) ---
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# --- VALIDAÇÃO DE SENHA ---
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# --- INTERNACIONALIZAÇÃO ---
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Fortaleza' # Ajustado para o fuso do Maranhão
USE_I18N = True
USE_TZ = True

# --- ARQUIVOS ESTÁTICOS (CSS, JS) ---
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# --- CONFIGURAÇÃO DE MÍDIA (FOTOS DOS ISOLADORES/POSTES) ---
# Essencial para que o Django salve e sirva as imagens do projeto Equatorial
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- CONFIGURAÇÃO DE CORS (LIBERA O REACT) ---
# Permite que o frontend na porta 5173 acesse o backend na 8000
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# --- CONFIGURAÇÃO JWT (NINJA-JWT / AUTH CUSTOM) ---
NINJA_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1), # Expira em 1 dia para facilitar o dev
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
}