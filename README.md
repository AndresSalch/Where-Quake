# Where Quake
Where Quake es una aplicación web de pila completa diseñada para el monitoreo en tiempo real de terremotos y la participación de los usuarios. Esta aplicación utiliza datos del Servicio Geológico de los Estados Unidos (USGS) para proporcionar información en vivo sobre terremotos, incluyendo ubicación, magnitud y profundidad, permitiendo a los usuarios mantenerse informados sobre la actividad sísmica en todo el mundo.

![IMG1](https://i.imgur.com/6Pf3b3N.png)

La plataforma también permite la interacción del usuario a través de una función de noticias, donde los usuarios pueden leer y publicar actualizaciones relevantes a la información y preparación para terremotos. Los usuarios registrados tienen perfiles personales, autenticación segura y la capacidad de rastrear eventos sísmicos pasados y sus detalles. Con una interfaz moderna e intuitiva, Where Quake busca hacer que los datos en tiempo real sean accesibles y útiles tanto para usuarios casuales como para profesionales interesados en la actividad sísmica.

# Características Clave
Datos de Terremotos en Tiempo Real: Datos en vivo obtenidos del USGS para monitorear terremotos a nivel global.
Gestión de Usuarios: Registro seguro de usuarios, inicio de sesión y personalización de perfiles.
Publicación de Noticias: Un espacio para que los usuarios lean y publiquen artículos de noticias sobre temas relacionados con terremotos.
Mapa Interactivo y Visualización de Datos: Representación visual de los datos de terremotos con información detallada de cada evento.
Este proyecto demuestra la integración de varias tecnologías, incluyendo diseño de API RESTful, obtención de datos, autenticación segura de usuarios y una experiencia de usuario fluida en el front-end y back-end.

# Estructura de la Base de Datos
La base de datos de Where Quake está diseñada para soportar una aplicación de monitoreo en tiempo real de terremotos, con funcionalidades para gestionar usuarios, artículos de noticias y datos de eventos sísmicos. Consta de tres tablas principales:

Tablas
User

Almacena la información de los usuarios registrados, como nombre, correo electrónico, teléfono, rol y foto de perfil.
Incluye campos para id (Clave Primaria), name, lname, email (Único), hashed_password, salt (para el almacenamiento seguro de la contraseña), phone, birth (fecha de nacimiento), role, photo y lastLog (marca de tiempo de la última sesión).
News

Se utiliza para almacenar artículos o actualizaciones que puedan ser de interés para los usuarios.
Incluye campos para id (Clave Primaria), title, content, date (fecha en la que se creó el artículo) y userId (Clave Foránea que hace referencia a la tabla User).
QuakeData

Almacena datos de eventos sísmicos, capturando detalles esenciales de cada terremoto, como magnitud, ubicación, profundidad, fecha y hora.
Incluye campos como id (Clave Primaria), magnitude, place, depth, date, time, country, longitude, latitude y timestamp (para el seguimiento preciso del evento).
Procedimientos Almacenados (SP)
Para interactuar con la base de datos, la aplicación utiliza varios procedimientos almacenados:

Procedimientos para Usuarios
sp_CreateUser: Crea un nuevo usuario, cifrando y almacenando su contraseña de forma segura.
sp_SelectUser: Recupera un usuario específico por correo electrónico, generalmente utilizado para autenticación.
sp_SelectAllUser: Recupera todos los usuarios registrados.
sp_UpdateUserName, sp_UpdateUserBirth, sp_UpdateUserPassword, sp_UpdateUserPhoto: Actualizan detalles específicos del usuario, asegurando que solo se realicen cambios autorizados.
sp_UpdateLastLog: Registra el último inicio de sesión de los usuarios.
sp_DeleteUser: Elimina un usuario por su correo electrónico.
Procedimientos para Noticias
sp_CreateNews: Agrega un nuevo artículo a la tabla News.
sp_SelectAllNews: Recupera todos los artículos de noticias.
sp_UpdateNews: Actualiza los detalles de un artículo específico.
sp_DeleteNews: Elimina un artículo específico.
Procedimientos para QuakeData (si se agrega almacenamiento en la base de datos)
sp_InsertQuakeData: Inserta nuevos datos de terremotos, con detalles como magnitud, ubicación y tiempo.
sp_SelectAllQuakeData: Recupera todos los registros de terremotos.
sp_DeleteQuakeData: Elimina un registro específico de un evento sísmico.
Configuración y Conexión de la Base de Datos
Para configurar la base de datos, crea las tablas y procedimientos almacenados necesarios según se describe anteriormente. La aplicación utiliza dbService.py en el directorio Back-End/Service para manejar las conexiones a la base de datos y ejecutar consultas SQL.
