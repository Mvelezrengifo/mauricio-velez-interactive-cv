from fastapi import APIRouter
from typing import List  # <--- Agregamos esta línea fina aquí
from app.models.timeline import Phase
import json
from pathlib import Path

router = APIRouter(prefix="/timeline", tags=["Narrativa"])

# Ruta al archivo JSON
DATA_FILE = Path(__file__).parents[2] / "data" / "static" / "timeline.json"

@router.get("/", response_model=List[Phase])
def get_timeline():
    """Retorna la historia tecnológica completa."""
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)