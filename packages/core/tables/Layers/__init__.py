import os
import boto3

import core.tables.Layers.entities as entities

ddb = boto3.resource('dynamodb')

class Model:
    def __init__(self) -> None:
        self.table = ddb.Table(os.environ['LAYERS_TABLE_NAME'])