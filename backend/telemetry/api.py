from ninja import Router
import datetime

router = Router()

@router.get("/status")
def get_system_status(request):
    return {
        "status": "online",
        "server_time": datetime.datetime.now(),
        "active_nodes": 1, # Aqui simularíamos seu hardware
        "load": "0.45"
    }