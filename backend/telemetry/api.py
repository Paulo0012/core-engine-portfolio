from ninja import Router, Schema
from .models import DeviceStatus
import random

router = Router()

class TelemetryOut(Schema):
    device_name: str
    cpu_usage: float
    memory_usage: float
    is_online: bool

@router.get("/live", response=TelemetryOut)
def get_live_metrics(request):
    """Retorna dados reais ou simulados para o Dashboard do Front"""
    # No futuro, aqui você leria do banco ou de um Broker MQTT
    return {
        "device_name": "Core-Engine-UFMA",
        "cpu_usage": round(random.uniform(15.0, 65.0), 2),
        "memory_usage": round(random.uniform(200.0, 800.0), 2),
        "is_online": True
    }