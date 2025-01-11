[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/AndresSalch/Where-Quake-/blob/master/README.md)

# Where Quake
Where Quake is a full-stack web application designed for real-time earthquake monitoring and user engagement. This application uses data from the United States Geological Survey (USGS) to provide live information about earthquakes, including location, magnitude, and depth, allowing users to stay informed about seismic activity worldwide.

---
## Demos
[![Main Page](https://img.youtube.com/vi/hVd66mMjh0g/maxresdefault.jpg)](https://www.youtube.com/watch?v=hVd66mMjh0g)

[![Earth Quake Page](https://img.youtube.com/vi/aC3e9rajY8M/maxresdefault.jpg)](https://www.youtube.com/watch?v=aC3e9rajY8M)

---

The platform also allows user interaction through a news feature, where users can read and post updates related to earthquake information and preparedness. Registered users have personal profiles, secure authentication, and the ability to track past seismic events and their details. With a modern and intuitive interface, Where Quake aims to make real-time data accessible and useful to both casual users and professionals interested in seismic activity.

# Credits

**Earthquake Data:**
The earthquake data used in this application comes from the United States Geological Survey (USGS). You can consult their API for more information about real-time seismic data [here](https://earthquake.usgs.gov/).

**3D Map:**
The 3D map used in the application is provided by the WebGL Earth library. This library allows visualizing geospatial data in an interactive 3D environment. The project was created by [WebGL Earth](https://github.com/webglearth/webglearth2), and you can find its source code in its official GitHub repository.

# Key Features
Real-Time Earthquake Data: Live data obtained from USGS to monitor global earthquakes.
User Management: Secure user registration, login, and profile customization.
News Posting: A space for users to read and post articles about earthquake-related topics.
Interactive Map and Data Visualization: Visual representation of earthquake data with detailed information about each event.
This project demonstrates the integration of various technologies, including RESTful API design, data retrieval, secure user authentication, and a smooth user experience in both front-end and back-end.

---

# Usage

## Create the Database

I left a `.sql` file to create the tables and stored procedures.

**You need to add the connection parameters to the database in the following file:**
```
Back-End\Service\dbService.py
```
## Start the API

You need to install the requirements and then run `main.py`.

```python
pip install -r requirements.txt

# Run main.py
python Back-End\main.py
```

## Start the Web Page
Run the web page using npm.

```javascript
npm start
```
---

# Database Structure
### `Users` Table

Stores information about system users.

| Column      | Type          | Description                                      |
|--------------|---------------|--------------------------------------------------|
| `id_usuario` | `INT`         | Unique user ID (primary key, auto-incremental). |
| `nombre`     | `VARCHAR(100)`| User's first name.                              |
| `apellidos`  | `VARCHAR(100)`| User's last name.                               |
| `email`      | `VARCHAR(100)`| Unique user email.                              |
| `passwd`     | `VARCHAR(255)`| User's password (hashed).                       |
| `salt`       | `VARCHAR(255)`| Salt for the password.                          |
| `phone`      | `VARCHAR(20)` | User's phone number.                            |
| `birth`      | `DATE`        | User's birthdate.                               |
| `rol`        | `VARCHAR(50)` | User's role (e.g., admin, user).                |
| `lastLog`    | `DATETIME`    | Last login date and time.                       |
| `photo`      | `VARCHAR(255)`| URL or path to the user's photo.                |

### `News` Table

Stores news created by users.

| Column  | Type          | Description                                             |
|----------|---------------|---------------------------------------------------------|
| `id`     | `INT`         | Unique news ID (primary key, auto-incremental).         |
| `title`  | `VARCHAR(255)`| News title.                                             |
| `content`| `TEXT`        | News content.                                           |
| `nDate`  | `DATETIME`    | News creation date.                                     |
| `userId` | `INT`         | ID of the user who created the news (foreign key referencing `Users`). |

## Stored Procedures

### User Management

- **`sp_CreateUser`**  
  Creates a new user.  
  **Parameters:**  
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
  Retrieves user data by email.  
  **Parameters:**  
  - `@email`

- **`sp_SelectAllUser`**  
  Retrieves data of all users.

- **`sp_SelectUseriD`**  
  Retrieves user data by ID.  
  **Parameters:**  
  - `@id`

- **`sp_UpdateUserName`**  
  Updates a user's name.  
  **Parameters:**  
  - `@email`
  - `@nombre`

- **`sp_UpdateUserBirth`**  
  Updates a user's birthdate.  
  **Parameters:**  
  - `@email`
  - `@birth`

- **`sp_UpdateUserPassword`**  
  Updates a user's password and salt.  
  **Parameters:**  
  - `@email`
  - `@passwd`
  - `@salt`

- **`sp_UpdateUserPhoto`**  
  Updates a user's photo.  
  **Parameters:**  
  - `@email`
  - `@photo`

- **`sp_UpdateLastLog`**  
  Updates the last login date.  
  **Parameters:**  
  - `@email`
  - `@lastLog`

- **`sp_DeleteUser`**  
  Deletes a user by email.  
  **Parameters:**  
  - `@email`

### News Management

- **`sp_CreateNews`**  
  Creates a new news item.  
  **Parameters:**  
  - `@title`
  - `@content`
  - `@nDate`
  - `@userId`

- **`sp_SelectAllNews`**  
  Retrieves all news records.

- **`sp_UpdateNews`**  
  Updates a news item by ID.  
  **Parameters:**  
  - `@id`
  - `@title`
  - `@content`
  - `@nDate`

- **`sp_DeleteNews`**  
  Deletes a news item by ID.  
  **Parameters:**  
  - `@id`

## Usage

1. Create the `Users` and `News` tables by running the provided SQL statements.
2. Create the stored procedures by running the corresponding SQL statements.
3. Call the procedures as needed to perform CRUD operations.

## Notes

- Passwords must be securely stored using hashing and salting.
- Input data should be validated to prevent security issues such as SQL injections.

---
# User and News Management API

This API allows CRUD operations on users and news.

---

## User Endpoints

| **Method** | **Endpoint**              | **Description**                           |**JSON**|
|------------|---------------------------|-------------------------------------------|--------|
| `POST`     | `/api/user/create`         | Creates a new user.                       | {"name": "Name","lname": "LastName","email": "Email","password": "Password","phone": "Phone","birth": "BirthDate","role": "UserRole","photo": "UserPhoto"}
| `POST`     | `/api/user/select`         | Checks the email and password of a user and verifies if they are registered. | {"email": "Email","password": "Password"}
| `GET`      | `/api/user/select/all`     | Retrieves all registered users.           | 
| `POST`     | `/api/user/id`             | Retrieves a user by ID.                   | {"id_usuario": "UserID"}
| `POST`     | `/api/user/name`           | Updates a user's name.                    |{"email": "Email","name": "New Name"}
| `POST`     | `/api/user/birth`          | Updates a user's birthdate.              |{"email": "Email","birth": "New BirthDate"}
| `POST`     | `/api/user/password`       | Updates a user's password.                |{"email": "Email","password": "New Password"}
| `POST`     | `/api/user/photo`          | Updates a user's photo.                   |{"email": "Email","photo": "New Photo"}
| `POST`     | `/api/user/lastlog`        | Updates the last login date.              |{"email": "Email","lastLog": "Last Login Date"}
| `POST`     | `/api/user/delete`         | Deletes a user by email.                  |{"email": "Email"}

## News Endpoints

| **Method** | **Endpoint**              | **Description**                           |**JSON**|
|------------|---------------------------|-------------------------------------------|--------|
| `POST`     | `/api/news/create`         | Creates a new news item.                  |{"title": "News Title","content": "News Content","date": "News Date","userId": "User ID"}
| `GET`      | `/api/news/select`         | Retrieves all news items.                |
| `POST`     | `/api/news/update`         | Updates a news item by ID.               |{"ide": "News ID","title": "New Title","content": "New Content","date": "New Date"}
| `POST`     | `/api/news/delete`         | Deletes a news item by ID.               |{"ide": "News ID"}

## Earthquake Endpoints

| **Method** | **Endpoint**              | **Description**                           |**JSON**|
|------------|---------------------------|-------------------------------------------|--------|
| `GET`     | `/api/quake/new`           | Creates a new list of Earthquakes.        | 
| `POST`    | `/api/quake/update`        | Searches for new Earthquakes to be added to the list from the latest earthquake timestamp in the previous list. | { starttime: [utc timestamp] }
