from ninja import NinjaAPI
from engine.api import router as engine_router
from telemetry.api import router as telemetry_router

api = NinjaAPI(
    title="Soares Gomes OS - API",
    version="1.0.0",
    description="Engine de controle do portfólio técnico de Paulo Gabriel"
)

# Acoplamento dos módulos
api.add_router("/cases", engine_router)
api.add_router("/telemetry", telemetry_router)