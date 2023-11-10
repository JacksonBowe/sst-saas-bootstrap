import os
import sys
if os.getenv('IS_LOCAL'): # In local dev add packages/ to path
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))

from core.tables import LayersTable

def main(event, context):
    print('Hello')
    print(LayersTable.table)
    return