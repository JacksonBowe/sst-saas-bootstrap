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
from core.controllers import UserController


app = APIGatewayHttpResolver()
# tracer = Tracer(service='AppUsers')

@app.post('/users/invite')
def invite():
    try:
        payload = app.current_event.json_body
        email = payload['email']
    except KeyError as e:
        raise BadRequestError(f"Missing {e} in payload")
    
    return UserController().invite_user(email)

@app.get('/users')
def get_users():
    return UserController().get_users()

@app.get('/users/<user_id>')
def get_user(user_id):
    return UserController().get_user(user_id)


# @tracer.capture_lambda_handler
def handler(event, context):
    return app.resolve(SSTEvent(event), context)