from django.contrib import admin
from django.urls import path
from .api import api

urlpatterns = [
    path('admin/', admin.site.core),
    path("api/v1/", api.urls),
]