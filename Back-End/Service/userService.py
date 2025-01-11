import pyodbc
import bcrypt
from Factory.User import User
from datetime import datetime

class UserService:
    def __init__(self, authCon) -> None:
        self.con = authCon

    def create(self, name, lname, email, password, phone, birth, role, photo):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8') 
        cursor = self.con.cursor()
        try:
            cursor.execute(
                "EXEC sp_CreateUser ?, ?, ?, ?, ?, ?, ?, ?, ?",
                (name, lname, email, hashed_password, salt.decode('utf-8'), phone, birth, role, photo)
            )
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error creating user: {str(e)}"

    def select(self, email, password):
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_SelectUser ?", (email))
            var = cursor.fetchone()
            if var and bcrypt.checkpw(password.encode('utf-8'), var[4].encode('utf-8')):
                return User(var[0], var[1], var[2], var[3], var[4], var[5], var[6], var[7], var[8], var[9], var[10]).toJSON()
            return False
        except pyodbc.Error as e:
            return f"Error fetching user: {str(e)}"
        
    def selectALL(self):
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_SelectAllUser")
            rows = cursor.fetchall()
            array = [
                User(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10]).toJSON() for row in rows
            ]
            return array
        except pyodbc.Error as e:
            return f"Error fetching user: {str(e)}"
        
    def selectId(self, ide):
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_SelectUseriD ?", (ide))
            var = cursor.fetchone()
            if var :
                return User(var[0], var[1], var[2], var[3], var[4], var[5], var[6], var[7], var[8], var[9], var[10]).toJSON()
            return False
        except pyodbc.Error as e:
            return f"Error fetching user: {str(e)}"
        

    def update_name(self, email, name):
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_UpdateUserName ?, ?", (email, name))
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error updating user name: {str(e)}"

    def update_birth(self, email, birth):
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_UpdateUserBirth ?, ?", (email, birth))
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error updating birthdate: {str(e)}"

    def update_password(self, email, password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_UpdateUserPassword ?, ?, ?", (email, hashed_password, salt.decode('utf-8')))
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error updating password: {str(e)}"

    def update_photo(self, email, photo):
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_UpdateUserPhoto ?, ?", (email, photo))
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error updating photo: {str(e)}"
    
    def update_lastLog(self, email, ll):
        cursor = self.con.cursor()
        Lastlog = datetime.fromisoformat(ll[:-1])
        try:
            cursor.execute("EXEC sp_UpdateLastLog ?, ?", (email, Lastlog))
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error updating LastLog: {str(e)}"

    def delete(self, email):
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_DeleteUser ?", (email,))
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error deleting user: {str(e)}"

