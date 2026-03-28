from django.contrib import admin
from django.urls import path
from .api import api # Importa a instância unificada da API
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # O erro estava aqui. O correto é admin.site.urls
    path('admin/', admin.site.urls), 
    
    # Nossa API Ninja
    path("api/v1/", api.urls), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)