import json
from pathlib import Path
from typing import Any, Dict, List

DATA_DIR = Path(__file__).parent / "static"

def load_json(filename: str) -> Any:
    file_path = DATA_DIR / filename
    if not file_path.exists():
        raise FileNotFoundError(f"Data file not found: {filename}")
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_timeline() -> List[Dict]:
    return load_json("timeline.json")

def get_projects_index() -> Dict[str, Any]:
    """Crea un índice rápido slug -> proyecto para búsquedas O(1)."""
    timeline = get_timeline()
    index = {}
    for phase in timeline:
        for proj in phase.get("projects", []):
            slug = proj["name"].lower().replace(" ", "-")
            index[slug] = {
                **proj,
                "phase_title": phase["title"],
                "phase_id": phase["id"],
                "phase_message": phase["message"]
            }
    return index