from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/analytics", tags=["Analytics"])

class TrackEvent(BaseModel):
    event: str
    phase_id: Optional[int] = None
    project_slug: Optional[str] = None
    metadata: Optional[dict] = None

@router.post("/track")
async def track_event(payload: TrackEvent):
    # Fase 1: Log ligero. Fase 2: Pipeline a DB/Stream
    print(f"[TRACK] {payload.event} | slug={payload.project_slug} | meta={payload.metadata}")
    return {"status": "ok", "message": "Evento registrado"}