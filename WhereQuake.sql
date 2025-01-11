
CREATE TABLE Users (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),              -- The 'id_usuario' of the user (primary key)
    nombre VARCHAR(100),                     -- The user's first name
    apellidos VARCHAR(100),                  -- The user's last name
    email VARCHAR(100) UNIQUE,               -- The user's email (unique)
    passwd VARCHAR(255),                     -- The hashed password of the user
    salt VARCHAR(255),                       -- The salt used for hashing the password
    phone VARCHAR(20),                       -- The user's phone number
    birth DATE,                              -- The user's birth date
    rol VARCHAR(50),                         -- The role of the user (e.g., admin, user)
    lastLog DATETIME,                        -- The date and time of the last login
    photo VARCHAR(255)                       -- The URL or file path to the user's photo
);
GO

CREATE TABLE News (
    id INT PRIMARY KEY IDENTITY(1,1),               -- The 'id' of the news article (primary key)
    title VARCHAR(255),                -- The title of the news
    content TEXT,                      -- The content of the news
    nDate DATETIME,                    -- The date when the news was created
    userId INT,                        -- The ID of the user who created the news (foreign key)
    
    FOREIGN KEY (userId) REFERENCES Users(id_usuario)
);
GO

CREATE PROCEDURE sp_CreateUser
    @nombre VARCHAR(100), 
    @apellidos VARCHAR(100), 
    @email VARCHAR(100), 
    @passwd VARCHAR(255), 
    @salt VARCHAR(255), 
    @phone VARCHAR(20), 
    @birth DATE, 
    @rol VARCHAR(50), 
    @photo VARCHAR(255)
AS
BEGIN
    INSERT INTO Users (nombre, apellidos, email, passwd, salt, phone, birth, rol, lastLog, photo)
    VALUES (@nombre, @apellidos, @email, @passwd, @salt, @phone, @birth, @rol, NULL, @photo);
END;
GO

CREATE PROCEDURE sp_SelectUser
    @email VARCHAR(100)
AS
BEGIN
    SELECT id_usuario, nombre, apellidos, email, passwd, salt, phone, birth, rol, lastLog, photo
    FROM Users
    WHERE email = @email;
END;
GO

CREATE PROCEDURE sp_SelectAllUser
AS
BEGIN
    SELECT id_usuario, nombre, apellidos, email, passwd, salt, phone, birth, rol, lastLog, photo
    FROM Users;
END;
GO

CREATE PROCEDURE sp_SelectUseriD
    @id INT
AS
BEGIN
    SELECT id_usuario, nombre, apellidos, email, passwd, salt, phone, birth, rol, lastLog, photo
    FROM Users
    WHERE id_usuario = @id;
END;
GO

CREATE PROCEDURE sp_UpdateUserName
    @email VARCHAR(100), 
    @nombre VARCHAR(100)
AS
BEGIN
    UPDATE Users
    SET nombre = @nombre
    WHERE email = @email;
END;
GO

CREATE PROCEDURE sp_UpdateUserBirth
    @email VARCHAR(100), 
    @birth DATE
AS
BEGIN
    UPDATE Users
    SET birth = @birth
    WHERE email = @email;
END;
GO

CREATE PROCEDURE sp_UpdateUserPassword
    @email VARCHAR(100), 
    @passwd VARCHAR(255), 
    @salt VARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET passwd = @passwd, salt = @salt
    WHERE email = @email;
END;
GO

CREATE PROCEDURE sp_UpdateUserPhoto
    @email VARCHAR(100), 
    @photo VARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET photo = @photo
    WHERE email = @email;
END;
GO

CREATE PROCEDURE sp_UpdateLastLog
    @email VARCHAR(100), 
    @lastLog DATETIME
AS
BEGIN
    UPDATE Users
    SET lastLog = @lastLog
    WHERE email = @email;
END;
GO

CREATE PROCEDURE sp_DeleteUser
    @email VARCHAR(100)
AS
BEGIN
    DELETE FROM Users
    WHERE email = @email;
END;
GO

CREATE PROCEDURE sp_CreateNews 
    @title VARCHAR(255), 
    @content TEXT, 
    @nDate DATETIME, 
    @userId INT
AS
BEGIN
    INSERT INTO News (title, content, nDate, userId)
    VALUES (@title, @content, @nDate, @userId);
END;
GO

CREATE PROCEDURE sp_SelectAllNews
AS
BEGIN
    SELECT id, title, content, nDate, userId FROM News;
END;
GO

CREATE PROCEDURE sp_UpdateNews
    @id INT, 
    @title VARCHAR(255), 
    @content TEXT, 
    @nDate DATETIME
AS
BEGIN
    UPDATE News
    SET title = @title, content = @content, nDate = @nDate
    WHERE id = @id;
END;
GO

CREATE PROCEDURE sp_DeleteNews
    @id INT
AS
BEGIN
    DELETE FROM News WHERE id = @id;
END;
GO