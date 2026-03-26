from django.contrib import admin
from django.urls import path
from .api import api # Importa a instância unificada da API

urlpatterns = [
    # O erro estava aqui. O correto é admin.site.urls
    path('admin/', admin.site.urls), 
    
    # Nossa API Ninja
    path("api/v1/", api.urls), 
]