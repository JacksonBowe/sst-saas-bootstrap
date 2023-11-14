import os
import boto3
from typing import List

import core.tables.Users.entities as entities

ddb = boto3.resource('dynamodb')

class Model:
    def __init__(self) -> None:
        self.table = ddb.Table(os.environ['USERS_TABLE_NAME'])
        
    def get_user_by_id(self, user_id: str):
        pass
    
    def get_all_users(self):
        pass
    
    def get_users_by_company_id(self, company_id: str):
        pass
    
    def put_user(self, user: entities.User):
        self.table.put_item(
            Item={
                'PK': user.id,
                'SK': 'A',
                'name': user.name
            }
        )
        pass
    
    