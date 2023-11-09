import os
import boto3

cognito = boto3.client('cognito-idp')

class UserController:
    def __init__(self) -> None:
        pass
    
    def invite_user(self, email: str, customer_id: str) -> None:
        try: 
            response = cognito.admin_create_user(
                UserPoolId=os.environ['APP_USER_POOL_ID'],
                Username=email,
                UserAttributes=[
                    {
                        'Name': 'email',
                        'Value': email
                    },
                    {
                        'Name': 'email_verified',
                        'Value': 'true'
                    }
                ]
            )
        except cognito.exceptions.UsernameExistsException as e:
            print(str(e))