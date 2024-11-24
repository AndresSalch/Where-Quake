class User:
    def __init__(self,id,name,lname,email,password,salt,phone,birth,role,lastlog,photo) -> None:
        self.id_usuario = id
        self.nombre = name
        self.apellidos = lname
        self.email = email
        self.passwd = password
        self.salt = salt
        self.phone = phone
        self.birth = birth
        self.rol = role
        self.lastLog = lastlog
        self.photo = photo
    
    def toJSON(self):
        return {
            'id_usuario': self.id_usuario,
            'nombre': self.nombre,
            'apellidos': self.apellidos,
            'email': self.email,
            'passwd': self.passwd,
            'salt': self.salt,
            'phone': self.phone,
            'birth': self.birth,
            'rol': self.rol,
            'lastLog': self.lastLog,
            'photo': self.photo
        }