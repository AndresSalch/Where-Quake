var user = null;

document.addEventListener("DOMContentLoaded", async function () {
  try {
    await tryfetch();
    if (!user || user.rol == 0) {
      window.location.href = "error.html";
    } else {
      await fetchUsers();
      await delay(500);
      await fetchNews();

      document
        .getElementById("publishForm")
        .addEventListener("submit", async function (event) {
          event.preventDefault();

          const title = document.getElementById("newsTitle").value;
          const content = document.getElementById("newsContent").value;

          if (title && content) {
            try {
              const response = await fetch(`http://localhost:5000/news/create`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title,
                  content,
                  date: new Date().toISOString(),
                  userId: user.id_usuario,
                }),
              });

              const data = await response.json();

              if (data.error) {
                console.error("Error publishing news:", data.error);
              } else {
                await fetchNews();
                document.getElementById("newsTitle").value = "";
                document.getElementById("newsContent").value = "";
              }
            } catch (error) {
              console.error("Error publishing news:", error);
            }
          }
        });
    }
  } catch (error) {
    console.error("Error loading page:", error);
  }
});

// Helper function to fetch user
function tryfetch() {
  return fetch(`http://localhost:3000/retrieve`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching user:", data.error);
      } else {
        user = data;
        userValidated();
      }
    })
    .catch((error) => console.log("-" + error));
}

// Function to validate the user
function userValidated() {
  const admin = document.getElementById("admin");
  const add = document.getElementById("add");
  const userPanel = document.getElementById("user");
  const i = document.createElement("i");

  if (user.rol) {
    admin.classList.remove("hide");
  }

  add.classList.remove("hide");

  i.classList.add("fa-solid");
  i.classList.add("fa-user");

  userPanel.innerText = user.nombre + " ";
  userPanel.appendChild(i);
}

// Fetch users
function fetchUsers() {
  return fetch(`http://localhost:5000/user/select/all`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching users:", data.error);
        return;
      }
      const userList = document.getElementById("userList");
      userList.innerHTML = "";

      data.forEach((usuario) => {
        const listItem = document.createElement("li");
        listItem.className =
          "list-group-item d-flex justify-content-between align-items-center";
        listItem.textContent = `${usuario.nombre} ${usuario.apellidos} (${usuario.email}) Last login: ${usuario.lastLog}`;

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
          if (confirm("¿Seguro que desea eliminar este usuario?")) {
            fetch(`http://localhost:5000/user/delete`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: usuario.email }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.error) {
                  console.error("Error deleting user:", data.error);
                } else {
                  fetchUsers();
                }
              })
              .catch((error) => console.error("Error deleting user:", error));
          }
        });
        listItem.appendChild(deleteButton);

        userList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching users:", error));
}

// Fetch news
function fetchNews(retries = 5, delay = 1000) {
  return fetch(`http://localhost:5000/news/select`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("News data:", data);

      if (Array.isArray(data)) {
        const newsList = document.getElementById("newsList");
        newsList.innerHTML = "";

        data.forEach((post) => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";

          const title = document.createElement("h5");
          title.textContent = post.title;
          listItem.appendChild(title);

          const content = document.createElement("p");
          content.textContent = post.content;
          listItem.appendChild(content);

          const date = document.createElement("small");
          date.textContent = `Publicado: ${post.nDate}       `;
          listItem.appendChild(date);

          const deleteButton = document.createElement("button");
          deleteButton.className = "btn btn-danger btn-sm";
          deleteButton.textContent = "Eliminar";
          deleteButton.addEventListener("click", () => {
            if (confirm("¿Seguro que desea eliminar esta noticia?")) {
              fetch(`http://localhost:5000/news/delete`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ide: post.id }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.error) {
                    console.error("Error deleting news:", data.error);
                  } else {
                    fetchNews(); // Fetch news again after deletion
                  }
                })
                .catch((error) => console.error("Error deleting news:", error));
            }
          });
          listItem.appendChild(deleteButton);

          newsList.appendChild(listItem);
        });
      } else {
        console.error("Expected an array for news but received:", data);
        const newsList = document.getElementById("newsList");
        newsList.innerHTML = "<p>No news available</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
      if (retries > 0) {
        console.log(`Retrying fetchNews... ${retries} attempts left`);
        setTimeout(() => fetchNews(retries - 1, delay), delay);
      } else {
        const newsList = document.getElementById("newsList");
        newsList.innerHTML =
          "<p>Failed to load news after multiple attempts. Please try again later.</p>";
      }
    });
}

// Delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
