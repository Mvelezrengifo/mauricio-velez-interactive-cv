from fastapi import APIRouter
# Importamos directamente desde cada archivo para que Python no se confunda
from app.api.v1.timeline import router as timeline_router
from app.api.v1.projects import router as projects_router
from app.api.v1.analytics import router as analytics_router

api_router = APIRouter()

# Registramos los routers con sus nuevos nombres explícitos
api_router.include_router(timeline_router)
api_router.include_router(projects_router)
api_router.include_router(analytics_router)