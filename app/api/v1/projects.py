from fastapi import APIRouter, HTTPException
from app.data.loader import get_projects_index

router = APIRouter(prefix="/projects", tags=["Proyectos"])

PROJECTS_DB = get_projects_index()

@router.get("/{slug}")
def get_project(slug: str):
    project = PROJECTS_DB.get(slug.lower())
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return project