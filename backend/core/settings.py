import os
from pathlib import Path
from datetime import timedelta
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent

# --- SEGURANÇA BÁSICA ---
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

# --- HEADERS DE SEGURANÇA OWASP ---
# Ajuda a proteger contra XSS e Content Sniffing
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# NOTA: Em produção com HTTPS, as variáveis abaixo devem ser ativadas
# SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', default=False, cast=bool)
# SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE', default=False, cast=bool)
# CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE', default=False, cast=bool)
# Se estiver usando HTTPS, também descomente SECURE_HSTS_SECONDS
# SECURE_HSTS_SECONDS = 31536000

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
    'ninja.compatibility.files.fix_request_files_middleware',
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
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv())

# --- CONFIGURAÇÃO JWT (NINJA-JWT / AUTH CUSTOM) ---
NINJA_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15), # Expira rápido (Segurança)
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1), # Expira em 1 dia

    'AUTH_HEADER_TYPES': ('Bearer',),
}

DATA_UPLOAD_MAX_MEMORY_SIZE = 52428800 
FILE_UPLOAD_MAX_MEMORY_SIZE = 52428800