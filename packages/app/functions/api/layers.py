import os
import sys
if os.getenv('IS_LOCAL'): # In local dev add packages/ to path
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))

from aws_lambda_powertools.event_handler import APIGatewayHttpResolver

from core.utils.api import SSTEvent
from core.controllers import LayerController

app = APIGatewayHttpResolver()

@app.get('/layers')
def get_layers():
    LayerController().get_layers
    
def handler(event, context):
    return app.resolve(SSTEvent(event), context)