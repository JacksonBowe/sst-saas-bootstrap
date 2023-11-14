import os
import boto3
from typing import List

import core.tables.Layers.entities as entities
import core.utils.dynamo as dynamo_utils

ddb = boto3.resource('dynamodb')

class Model:
    def __init__(self) -> None:
        self.table = ddb.Table(os.environ['LAYERS_TABLE_NAME'])
        
    def put_layer(self, layer: entities.Layer) -> None:
        print(layer)
        self.table.put_item(Item=layer.to_ddb())
        pass
    
    def get_layers(self, filters: None) -> List[entities.Layer]:
        scan_params = {} 
        if filters:
            expr, names, values = dynamo_utils.build_filter_expression(filters)
            scan_params['FilterExpression'] = expr
            scan_params['ExpressionAttributeNames'] = names
            scan_params['ExpressionAttributeValues'] = values
            
        layers = self.table.scan(**scan_params).get('Items', [])
        return [entities.Layer.from_primary(**layer) for layer in layers]