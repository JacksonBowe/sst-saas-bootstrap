from __future__ import annotations
import uuid
from datetime import datetime
from dataclasses import dataclass, asdict, field

@dataclass
class Entity:
    id: str = field(init=False)
    createdAt: int = field(init=False)

    def __post_init__(self):
        self.id = str(uuid.uuid4())
        self.createdAt = round(int(datetime.utcnow().timestamp() * 1000))
        
    def json(self, exclude_none=True) -> dict:
        if exclude_none: return {k: v for k, v in asdict(self).items() if v is not None}
        else: return asdict(self)
        
@dataclass
class User(Entity):
    company_id: str
    name: str
    type: str = field(init=False, default='USER')