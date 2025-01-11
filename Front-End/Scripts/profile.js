const news = document.getElementById("news");
const content = document.getElementById("content");
const main = document.getElementById("main");
const pwd = document.getElementById("hiddenCPW");
const profile = document.getElementById("hiddenPROF");
const passwd = document.getElementById("password");
const passwd2 = document.getElementById("password2");
const namE = document.getElementById("name2");
const datE = document.getElementById("fecha");

let strength = false;
let user = null;

function store() {
  const {
    id_usuario,
    nombre,
    apellidos,
    email,
    phone,
    birth,
    rol,
    lastLog,
    photo,
  } = user;

  fetch(`http://localhost:3000/store`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_usuario,
      nombre,
      apellidos,
      email,
      phone,
      birth,
      rol,
      lastLog,
      photo,
    }),
  }).catch((error) => console.error("Error storing user data:", error));
}

news.addEventListener("click", () => content.classList.remove("hide"));

window.onload = function () {
  tryfetch();
  getnews();
};

function tryfetch() {
  fetch(`http://localhost:3000/retrieve`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error retrieving user data:", data.error);
        window.location.href = "error2.html";
      } else {
        user = data;
        if (!user) {
          window.location.href = "error2.html";
        } else {
          userValidated();
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      window.location.href = "error2.html";
    });
}


document.getElementById("signOut").addEventListener("click", () => {
  fetch(`http://localhost:3000/end`)
    .then(() => (window.location.href = "index.html"))
    .catch((error) => console.error("Error during sign out:", error));
});

document.getElementById("profile").addEventListener("click", () => {
  profile.classList.remove("hide");
  main.classList.add("hide");
});

document.getElementById("passwd").addEventListener("click", () => {
  pwd.classList.remove("hide");
  main.classList.add("hide");
});

document.getElementById("salirA").addEventListener("click", () => {
  profile.classList.add("hide");
  main.classList.remove("hide");
});

document.getElementById("salirB").addEventListener("click", () => {
  pwd.classList.add("hide");
  main.classList.remove("hide");
});

document.getElementById("photo").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    fetch(`http://localhost:3000/pfp`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((photo) => {
        const email = user.email;

        return fetch(`http://localhost:5000/user/update/photo`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, photo }),
        });
      })
      .then(() => {
        user.photo = photo;
        store();
        location.reload();
      })
      .catch((error) => console.error("Error updating photo:", error));
  } else {
    console.log("No file selected.");
  }
});

document.getElementById("editPass").addEventListener("click", () => {
  passwd.disabled = false;
  passwd2.disabled = false;
});

document.getElementById("editName").addEventListener("click", () => {
  namE.disabled = false;
});

document.getElementById("editDate").addEventListener("click", () => {
  datE.disabled = false;
});

document.getElementById("saveA").addEventListener("click", async () => {
  const email = user.email;
  const name = namE.value || user.nombre;
  const birth = datE.value || user.birth;

  if (!datE.disabled && datE.value === "") {
    alert("Por favor llene la fecha");
    return;
  } else if (!namE.disabled && namE.value === "") {
    alert("Por favor llene el nombre");
    return;
  }

  try {
    if (!datE.disabled) {
      const birthResponse = await fetch(
        `http://localhost:5000/user/update/birth`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, birth }),
        }
      );
      if (!birthResponse.ok) {
        throw new Error("Error updating birth date");
      }
    }

    if (!namE.disabled) {
      const nameResponse = await fetch(
        `http://localhost:5000/user/update/name`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name }),
        }
      );
      if (!nameResponse.ok) {
        throw new Error("Error updating name");
      }
    }

    user.nombre = name;
    user.birth = birth;
    await store();
    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
});

document.getElementById("saveB").addEventListener("click", () => {
  const rx = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");

  if (!strength || passwd.value !== passwd2.value || !rx.test(passwd.value)) {
    alert(
      "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número."
    );
  } else {
    const email = user.email;
    const password = passwd.value;

    fetch(`http://localhost:5000/user/update/pwd`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.text())
      .then(() => {
        return fetch(`http://localhost:3000/end`);
      })
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => console.error("Error updating password:", error));
  }
});

document.getElementById("password").addEventListener("input", function () {
  const box = document.getElementById("errorBar");
  const rojo = document.getElementById("rojo");
  const naranja = document.getElementById("naranja");
  const amarillo = document.getElementById("amarillo");
  const verde = document.getElementById("verde");
  const text = document.getElementById("errorS");

  const value = this.value;

  if (value === "") {
    box.classList.add("hide");
    return;
  }

  box.classList.remove("hide");

  fetch(`http://localhost:3000/pwd`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  })
    .then((response) => response.json())
    .then((data) => {
      switch (data) {
        case "Too weak":
          rojo.style.backgroundColor = "red";
          naranja.style.backgroundColor = "#202020";
          amarillo.style.backgroundColor = "#202020";
          verde.style.backgroundColor = "#202020";
          text.style.color = "red";
          text.innerText = "Muy Baja";
          strength = false;
          break;

        case "Weak":
          rojo.style.backgroundColor = "red";
          naranja.style.backgroundColor = "orange";
          amarillo.style.backgroundColor = "#202020";
          verde.style.backgroundColor = "#202020";
          text.style.color = "orange";
          text.innerText = "Baja";
          strength = true;
          break;

        case "Medium":
          rojo.style.backgroundColor = "red";
          naranja.style.backgroundColor = "orange";
          amarillo.style.backgroundColor = "#b6fc03";
          verde.style.backgroundColor = "#202020";
          text.style.color = "#b6fc03";
          text.innerText = "Media";
          strength = true;
          break;

        case "Strong":
          rojo.style.backgroundColor = "red";
          naranja.style.backgroundColor = "orange";
          amarillo.style.backgroundColor = "#b6fc03";
          verde.style.backgroundColor = "green";
          text.style.color = "green";
          text.innerText = "Alta";
          strength = true;
          break;

        default:
          break;
      }
    })
    .catch((error) =>
      console.error("Error checking password strength:", error)
    );
});

document.getElementById("delete").addEventListener("click", () => {
  const email = user.email;

  fetch(`http://localhost:5000/user/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.text())
    .then(() => {
      return fetch(`http://localhost:3000/end`);
    })
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => console.error("Error deleting account:", error));
});

var newslist = null;

function getnews() {
  fetch(`http://localhost:5000/news/select`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        content.innerHTML = "";
        const i = document.createElement("i");
        i.classList.add("fa-solid", "fa-circle-xmark");
        i.id = "exit";
        i.addEventListener("click", () => content.classList.add("hide"));
        content.appendChild(i);
        const p1 = document.createElement("p");
        p1.classList.add("main");
        p1.textContent = "Noticias";
        content.appendChild(p1);
      } else {
        newslist = data;
        onGetNews();
      }
    })
    .catch((error) => console.error("Error fetching news:", error));
}

function onGetNews() {
  let users = [];

  fetch(`http://localhost:5000/user/select/all`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching users:", data.error);
        return;
      } else {
        users = data;
      }

      const content = document.getElementById("content");
      content.innerHTML = "";

      const i = document.createElement("i");
      i.classList.add("fa-solid", "fa-circle-xmark");
      i.id = "exit";
      i.addEventListener("click", () => content.classList.add("hide"));
      content.appendChild(i);

      const p1 = document.createElement("p");
      p1.classList.add("main");
      p1.textContent = "Noticias";
      content.appendChild(p1);

      newslist.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";

        let usuario = "Anónimo";
        users.forEach((userT) => {
          if (userT.id_usuario === post.userId) {
            usuario = `${userT.nombre} ${userT.apellidos}`;
          }
        });

        const userP = document.createElement("p");
        userP.className = "user";
        userP.textContent = usuario;
        postDiv.appendChild(userP);

        const titleP = document.createElement("p");
        titleP.className = "title";
        titleP.textContent = post.title;
        postDiv.appendChild(titleP);

        const messageP = document.createElement("p");
        messageP.className = "message";
        messageP.textContent = post.content;
        postDiv.appendChild(messageP);

        const dateP = document.createElement("p");
        dateP.className = "date";
        dateP.textContent = post.nDate;

        if (user && (user.rol || user.id_usuario === post.userId)) {
          const editButton = document.createElement("button");
          editButton.className = "edit";
          editButton.textContent = "Editar Post";
          editButton.addEventListener("click", () => {
            if (editButton.textContent === "Editar Post") {
              titleP.innerHTML = `<input id="textzone" type="text" value="${post.title}" />`;
              messageP.innerHTML = `<textarea id="textarea">${post.content}</textarea>`;
              editButton.textContent = "Guardar Cambios";
            } else {
              const newTitle = titleP.querySelector("input").value;
              const newMessage = messageP.querySelector("textarea").value;

              fetch(`http://localhost:5000/news/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ide: post.id,
                  title: newTitle,
                  content: newMessage,
                  date: new Date().toISOString(),
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.error) {
                    console.error("Error updating post:", data.error);
                  } else {
                    getnews();
                  }
                })
                .catch((error) => console.error("Error updating post:", error));
            }
          });
          postDiv.appendChild(editButton);

          const deleteButton = document.createElement("button");
          deleteButton.className = "delete";
          deleteButton.textContent = "Eliminar Post";
          deleteButton.addEventListener("click", () => {
            if (confirm("Seguro que desea Borrar?")) {
              fetch(`http://localhost:5000/news/delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ide: post.id }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.error) {
                    console.error("Error deleting post:", data.error);
                  } else {
                    getnews();
                  }
                })
                .catch((error) => console.error("Error deleting post:", error));
            }
          });
          postDiv.appendChild(deleteButton);
        }

        postDiv.appendChild(dateP);
        content.appendChild(postDiv);
      });
    })
    .catch((error) => console.error("Error fetching users:", error));
}
