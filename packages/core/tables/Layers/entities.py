from __future__ import annotations
import uuid
from dataclasses import asdict
from pydantic.dataclasses import dataclass

@dataclass
class Entity:
    id: str
    
    def to_dict(self, exclude_none=True) -> dict:
        if exclude_none: return {k: v for k, v in asdict(self).items() if v is not None}
        else: return asdict(self)
        
@dataclass
class Layer(Entity):
    name: str
    
    @property
    def SK(self):
        return f"A" # Or whatever you want
    
    @classmethod
    def from_s3(cls, name, **kwargs) -> Layer:
        return cls(str(uuid.uuid4()), name)
    
    @classmethod
    def from_primary(cls, PK, name, **kwargs):
        return cls(PK, name)
    
    def to_ddb(self):
        item = self.to_dict()
        item['PK'] = item.pop('id')
        item['SK'] = self.SK
        
        return item