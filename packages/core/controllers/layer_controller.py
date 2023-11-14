from typing import List
import core.tables.Layers as LayersTable

class LayerController:
    def __init__(self) -> None:
        pass
    
    def index_layer(self, layer_data: dict) -> None:
        layer = LayersTable.entities.Layer.from_s3('Test Layer')
        layersTable = LayersTable.Model().put_layer(layer)
        pass
    
    def remove_index(self, layer_id: str) -> None:
        pass
    
    def get_layer(self, layer_id: str) -> dict:
        pass
    
    def get_layers(self, filters: dict={}) -> List[dict]:
        layersTable = LayersTable.Model().get_layers(filters)
        pass
    
    def admin_get_layers(self) -> List[dict]:
        pass