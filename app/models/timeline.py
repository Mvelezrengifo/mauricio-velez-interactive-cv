from pydantic import BaseModel
from typing import List, Optional

class ProjectItem(BaseModel):
    name: str
    tech: List[str]

class Phase(BaseModel):
    id: int
    title: str
    message: str
    projects: List[ProjectItem]