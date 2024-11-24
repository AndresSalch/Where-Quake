from datetime import datetime
import pyodbc
from Factory.News import News

class NewsService:
    def __init__(self, authCon) -> None:
        self.con = authCon

    def create(self, title, content, date, userId):
        cursor = self.con.cursor()
        Dtime = datetime.fromisoformat(date[:-1])
        try:
            cursor.execute(
                "EXEC sp_CreateNews ?, ?, ?, ?",
                (title, content, Dtime, userId)
            )
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error creating news: {str(e)}"

    def select(self):
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_SelectAllNews")
            rows = cursor.fetchall()
            array = [
                News(row[0], row[1], row[2], row[3], row[4]).toJSON() for row in rows
            ]
            return array
        except pyodbc.Error as e:
            return f"Error fetching news: {str(e)}"

    def update(self, ide, title, content, date):
        cursor = self.con.cursor()
        try:
            cursor.execute(
                "EXEC sp_UpdateNews ?, ?, ?, ?",
                (ide, title, content, date)
            )
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error updating news: {str(e)}"

    def delete(self, ide):
        cursor = self.con.cursor()
        try:
            cursor.execute("EXEC sp_DeleteNews ?", (ide,))
            self.con.commit()
            return "Correcto"
        except pyodbc.Error as e:
            self.con.rollback()
            return f"Error deleting news: {str(e)}"
