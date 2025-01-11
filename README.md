[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/AndresSalch/Where-Quake-/blob/master/README.en.md)

# Where Quake
Where Quake es una aplicación web de pila completa diseñada para el monitoreo en tiempo real de terremotos y la participación de los usuarios. Esta aplicación utiliza datos del Servicio Geológico de los Estados Unidos (USGS) para proporcionar información en vivo sobre terremotos, incluyendo ubicación, magnitud y profundidad, permitiendo a los usuarios mantenerse informados sobre la actividad sísmica en todo el mundo.


La plataforma también permite la interacción del usuario a través de una función de noticias, donde los usuarios pueden leer y publicar actualizaciones relevantes a la información y preparación para terremotos. Los usuarios registrados tienen perfiles personales, autenticación segura y la capacidad de rastrear eventos sísmicos pasados y sus detalles. Con una interfaz moderna e intuitiva, Where Quake busca hacer que los datos en tiempo real sean accesibles y útiles tanto para usuarios casuales como para profesionales interesados en la actividad sísmica.


# Créditos

**Datos de Terremotos:**
Los datos de terremotos utilizados en esta aplicación provienen del Servicio Geológico de los Estados Unidos (USGS). Puedes consultar su API para más información sobre los datos sísmicos en tiempo real [aquí](https://earthquake.usgs.gov/).

**Mapa 3D:**
El mapa 3D utilizado en la aplicación es proporcionado por la librería WebGL Earth. Esta librería permite visualizar datos geoespaciales en un entorno interactivo en 3D. El proyecto fue creado por [WebGL Earth](https://github.com/webglearth/webglearth2), y puedes encontrar su código fuente en su repositorio oficial de GitHub.

# Características Clave
Datos de Terremotos en Tiempo Real: Datos en vivo obtenidos del USGS para monitorear terremotos a nivel global.
Gestión de Usuarios: Registro seguro de usuarios, inicio de sesión y personalización de perfiles.
Publicación de Noticias: Un espacio para que los usuarios lean y publiquen artículos de noticias sobre temas relacionados con terremotos.
Mapa Interactivo y Visualización de Datos: Representación visual de los datos de terremotos con información detallada de cada evento.
Este proyecto demuestra la integración de varias tecnologías, incluyendo diseño de API RESTful, obtención de datos, autenticación segura de usuarios y una experiencia de usuario fluida en el front-end y back-end.

---

# Estructura de la Base de Datos
### Tabla `Users`

Almacena información sobre los usuarios del sistema.

| Columna      | Tipo          | Descripción                                      |
|--------------|---------------|--------------------------------------------------|
| `id_usuario` | `INT`         | ID único del usuario (clave primaria, auto-incremental). |
| `nombre`     | `VARCHAR(100)`| Nombre del usuario.                              |
| `apellidos`  | `VARCHAR(100)`| Apellidos del usuario.                           |
| `email`      | `VARCHAR(100)`| Correo electrónico único del usuario.           |
| `passwd`     | `VARCHAR(255)`| Contraseña del usuario (hash).                  |
| `salt`       | `VARCHAR(255)`| Sal para la contraseña.                         |
| `phone`      | `VARCHAR(20)` | Número de teléfono.                             |
| `birth`      | `DATE`        | Fecha de nacimiento.                            |
| `rol`        | `VARCHAR(50)` | Rol del usuario (e.g., admin, user).            |
| `lastLog`    | `DATETIME`    | Fecha y hora del último inicio de sesión.       |
| `photo`      | `VARCHAR(255)`| URL o ruta de la foto del usuario.              |

### Tabla `News`

Almacena las noticias creadas por los usuarios.

| Columna  | Tipo          | Descripción                                             |
|----------|---------------|---------------------------------------------------------|
| `id`     | `INT`         | ID único de la noticia (clave primaria, auto-incremental). |
| `title`  | `VARCHAR(255)`| Título de la noticia.                                   |
| `content`| `TEXT`        | Contenido de la noticia.                                |
| `nDate`  | `DATETIME`    | Fecha de creación de la noticia.                       |
| `userId` | `INT`         | ID del usuario que creó la noticia (clave foránea referenciando a `Users`). |

## Procedimientos Almacenados

### Gestión de Usuarios

- **`sp_CreateUser`**  
  Crea un nuevo usuario.  
  **Parámetros:**  
  - `@nombre`
  - `@apellidos`
  - `@email`
  - `@passwd`
  - `@salt`
  - `@phone`
  - `@birth`
  - `@rol`
  - `@photo`

- **`sp_SelectUser`**  
  Obtiene los datos de un usuario por su correo electrónico.  
  **Parámetros:**  
  - `@email`

- **`sp_SelectAllUser`**  
  Obtiene los datos de todos los usuarios.

- **`sp_SelectUseriD`**  
  Obtiene los datos de un usuario por su ID.  
  **Parámetros:**  
  - `@id`

- **`sp_UpdateUserName`**  
  Actualiza el nombre de un usuario.  
  **Parámetros:**  
  - `@email`
  - `@nombre`

- **`sp_UpdateUserBirth`**  
  Actualiza la fecha de nacimiento de un usuario.  
  **Parámetros:**  
  - `@email`
  - `@birth`

- **`sp_UpdateUserPassword`**  
  Actualiza la contraseña y la sal de un usuario.  
  **Parámetros:**  
  - `@email`
  - `@passwd`
  - `@salt`

- **`sp_UpdateUserPhoto`**  
  Actualiza la foto de un usuario.  
  **Parámetros:**  
  - `@email`
  - `@photo`

- **`sp_UpdateLastLog`**  
  Actualiza la fecha del último inicio de sesión.  
  **Parámetros:**  
  - `@email`
  - `@lastLog`

- **`sp_DeleteUser`**  
  Elimina un usuario por su correo electrónico.  
  **Parámetros:**  
  - `@email`

### Gestión de Noticias

- **`sp_CreateNews`**  
  Crea una nueva noticia.  
  **Parámetros:**  
  - `@title`
  - `@content`
  - `@nDate`
  - `@userId`

- **`sp_SelectAllNews`**  
  Obtiene todos los registros de noticias.

- **`sp_UpdateNews`**  
  Actualiza una noticia por su ID.  
  **Parámetros:**  
  - `@id`
  - `@title`
  - `@content`
  - `@nDate`

- **`sp_DeleteNews`**  
  Elimina una noticia por su ID.  
  **Parámetros:**  
  - `@id`

## Uso

1. Crear las tablas `Users` y `News` ejecutando las sentencias SQL proporcionadas.
2. Crear los procedimientos almacenados ejecutando las sentencias correspondientes.
3. Invocar los procedimientos según sea necesario para realizar operaciones CRUD.

## Notas

- Las contraseñas deben ser almacenadas de forma segura utilizando hashing y sal.
- Se deben validar los datos de entrada para evitar problemas de seguridad como inyecciones SQL.

---
# API de Gestión de Usuarios y Noticias

Esta API permite realizar operaciones CRUD sobre usuarios y noticias.

---

## Endpoints de Usuarios

| **Método** | **Endpoint**              | **Descripción**                           |**JSON**|
|------------|-------------------|-----------------------------------|--------|
| `POST`     | `/api/user/create`              | Crea un nuevo usuario.                    | {"name": "Nombre","lname": "Apellido","email": "Correo electrónico","password": "Contraseña","phone": "Teléfono","birth": "Fecha de nacimiento","role": "Rol del usuario","photo": "Foto del usuario"}
| `POST`      | `/api/user/select` | Comprueba el email y la contraseña de un usuario y revisa que se encuentre registrado.| {"email": "Correo electrónico","password": "Contraseña"}
| `GET`      | `/api/user/select/all`              | Obtiene todos los usuarios registrados.   | 
| `POST`      | `/api/user/id`          | Obtiene un usuario por su ID.             | {"id_usuario": "ID del usuario"}
| `POST`      | `/api/user/name`         | Actualiza el nombre de un usuario.        |{"email": "Correo electrónico","name": "Nuevo nombre"}
| `POST`      | `/api/user/birth`        | Actualiza la fecha de nacimiento de un usuario. |{"email": "Correo electrónico","birth": "Nueva fecha de nacimiento"}
| `POST`      | `/api/user/password`     | Actualiza la contraseña de un usuario.    |{"email": "Correo electrónico","password": "Nueva contraseña"}
| `POST`      | `/api/user/photo`        | Actualiza la foto de un usuario.          |{"email": "Correo electrónico","photo": "Nueva foto"}
| `POST`      | `/api/user/lastlog`      | Actualiza la última fecha de inicio de sesión. |{"email": "Correo electrónico","lastLog": "Último acceso"}
| `POST`   | `/api/user/delete`       | Elimina un usuario por su email.             |{"email": "Correo electrónico"}

## Endpoints de Noticias

| **Método** | **Endpoint**      | **Descripción**                   |**JSON**|
|------------|-------------------|-----------------------------------|--------|
| `POST`     | `/api/news/create`       | Crea una nueva noticia.           |{"title": "Título de la noticia","content": "Contenido de la noticia","date": "Fecha de la noticia","userId": "ID del usuario"}
| `GET`      | `/api/news/select`       | Obtiene todas las noticias.       |
| `POST`      | `/api/news/update`   | Actualiza los datos de una noticia por ID. |{"ide": "ID de la noticia","title": "Nuevo título","content": "Nuevo contenido","date": "Nueva fecha"}
| `POST`   | `/api/news/delete`   | Elimina una noticia por ID.       |{"ide": "ID de la noticia"}

## Endpoints de Terremotos

| **Método** | **Endpoint**      | **Descripción**                   |**JSON**|
|------------|-------------------|-----------------------------------|--------|
| `GET`     | `/api/quake/new`       | Crea una nueva lista de Terremotos.           |
| `POST`      | `/api/quake/update`       | Busca nuevos Terremotos a ser agregados a la lista a partir de la hora del terremoto más reciente de la lista anterior.       | {  starttime: [utc timestamp] }

---
