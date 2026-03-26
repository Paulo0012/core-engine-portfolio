from ninja import NinjaAPI
from engine.api import router as engine_router
from telemetry.api import router as telemetry_router # Se já criou o arquivo lá

api = NinjaAPI(title="Soares Gomes OS API")

# Aqui você "monta" as peças do sistema
api.add_router("/projects", engine_router)
api.add_router("/telemetry", telemetry_router)