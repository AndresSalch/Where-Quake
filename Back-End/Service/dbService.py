import os, sys
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(CURRENT_DIR))
import pyodbc

from Service.userService import UserService
from Service.newsService import NewsService

class dbService:
    def __init__(self) -> None:

        server = '*'
        database = '*'
        driver = '{ODBC Driver 18 for SQL Server}'

        connection_string = (
            f'DRIVER={driver};'
            f'SERVER={server};'
            f'DATABASE={database};'
            f'Authentication=ActiveDirectoryInteractive;'
            f'Encrypt=yes;'
            f'TrustServerCertificate=no;'
            f'Connection Timeout=30;'
        )

        self.con = pyodbc.connect(connection_string)
        
    def conection(self):
        return (UserService(self.con), NewsService(self.con))
        
            

