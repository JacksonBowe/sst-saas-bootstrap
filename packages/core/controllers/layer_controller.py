from typing import List

from core.tables import LayersTable

class LayerController:
    def __init__(self) -> None:
        pass
    
    def index_layer(self, layer_data: dict) -> None:
        pass
    
    def remove_index(self, layer_id: str) -> None:
        pass
    
    def get_layer(self, layer_id: str) -> dict:
        pass
    
    def get_layers(self) -> List[dict]:
        pass
    
    def admin_get_layers(self) -> List[dict]:
        pass