import os
import sys
if os.getenv('IS_LOCAL'):
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))


from core.controllers.controller import TEST, TABLE

def handler(event, context):
    
    print(TEST, TABLE)
    return {
        "statusCode": 200,
        "body": "Hello, World!!!! Your request was received at {} {} {}.".format(event['requestContext']['time'], TEST, TABLE)
    }
