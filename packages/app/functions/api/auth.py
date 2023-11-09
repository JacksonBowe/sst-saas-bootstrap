import os
import sys
if os.getenv('IS_LOCAL'): # In local dev add packages/ to path
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))

# from aws_lambda_powertools import Tracer
from aws_lambda_powertools.event_handler import (APIGatewayHttpResolver, )
from aws_lambda_powertools.event_handler.exceptions import (
    BadRequestError
)

from core.utils.api import SSTEvent


app = APIGatewayHttpResolver()
# tracer = Tracer(service='AppAuth')

@app.post('/noauth/auth')
def auth():
    try:
        payload = app.current_event.json_body
        email, password = payload['email'], payload['password']
    except KeyError as e:
        raise BadRequestError(f"Missing {e} in payload")
    
    print('Hello')
    return 'Hello'


def handler(event, context):
    return app.resolve(SSTEvent(event), context)
    
    
        