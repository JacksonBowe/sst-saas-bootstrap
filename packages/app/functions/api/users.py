import os
import sys
if os.getenv('IS_LOCAL'): # In local dev add packages/ to path
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))



def handler(event, context):
    
    print(TEST, TABLE)
    return {
        "statusCode": 200,
        "body": "Hello, World!!!! Your request was received at {} {} {}.".format(event['requestContext']['time'], TEST, TABLE)
    }
