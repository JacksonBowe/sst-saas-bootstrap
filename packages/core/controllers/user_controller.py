import os
import boto3
from typing import List

from aws_lambda_powertools.event_handler.exceptions import (
    BadRequestError,
    InternalServerError,
    NotFoundError
)

import core.tables.Users as UsersTable
from core.utils.dynamo import UUID, timestamp

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
            self.resend_invite(email)
            
    def resend_invite(self, email: str) -> None:
        try:
            response = cognito.admin_create_user(
                UserPoolId=os.environ['USER_POOL_ID'],
                Username=email,
                UserAttributes=[
                    {
                        'Name': 'email',
                        'Value': email
                    },
                    {
                        'Name': 'email_verified',
                        'Value': 'true'
                    },
                ],
                DesiredDeliveryMediums=['EMAIL'],
                MessageAction='RESEND'
            )
        except cognito.exceptions.UnsupportedUserStateException as e:
            raise InternalServerError(str(e)) from e
        
    def invite_confirm(self, email: str, session: str, new_password: str) -> dict:
        try:
            confirm_response = cognito.admin_respond_to_auth_challenge(
                UserPoolId=os.environ['USER_POOL_ID'],
                ClientId=os.environ['USER_POOL_CLIENT_ID'],
                ChallengeName='NEW_PASSWORD_REQUIRED',
                ChallengeResponses={
                    'USERNAME': email,
                    'NEW_PASSWORD': new_password
                },
                Session=session
            )
            
        except cognito.exceptions.NotAuthorizedException as e:
            raise BadRequestError("Email is incorrect or session has expired")
        except cognito.exceptions.InvalidPasswordException as e:
            raise BadRequestError("Password does not conform to policy. Must be at least 8 characters long")
        
        try:
            tokens = confirm_response['AuthenticationResult']
        except KeyError as e:
            raise InternalServerError("Authentication Failed: Unable to extract AuthenticationResult from {}".format(confirm_response))
        
        user = self._cognito_admin_get_user_by_email(email)
        user_id = user['Username']
        self._create_user(user_id, email)
        
        return tokens
    
    def create_user(self, id: str, email: str) -> UsersTable.entities.User:
        UsersTable.Model().put_user(
            UsersTable.entities.User(name="Jackson")
        )
    
    def get_users(self) -> List[dict]:
        users = UsersTable.Model().get_all_users()