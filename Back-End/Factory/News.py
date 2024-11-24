class News:
    def __init__(self,ide,title,content,date,userId) -> None:
        self.id = ide
        self.title = title
        self.content = content
        self.nDate = date
        self.userId = userId
    
    def toJSON(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'nDate': self.nDate,
            'userId': self.userId
        }