const Nube1 = document.getElementById("Nube");
const Nube2 = document.getElementById("Nube2");
const Buttons = document.getElementById("Botones");
const Background = document.getElementById("block");
const Texto = document.getElementById("separator");
const maxScroll = document.body.scrollHeight - window.innerHeight;

document.addEventListener("scroll", function () {
  let scroll = window.scrollY;
  let scrollPos = Math.round((scroll / maxScroll) * 100);
  let scrollInv = Math.round(100 - (scroll / 1823) * 100) / 100;
  let scrollInv2 = Math.round(100 - (scroll / 2900) * 100) / 100;
  let scrollNeg = 1 - Math.round((scroll / maxScroll) * 100);

  Nube1.style.right = scroll * 0.6 + "px";
  Nube2.style.left = scroll * 0.6 + "px";
  Background.style.background = `linear-gradient(180deg, rgba(55, 112, 235, 1) ${
    (34 + scrollNeg) * 2
  }%, rgba(2, 0, 36, 1) 100%)`;

  if (scroll > 1823) {
    Buttons.style.display = "none";
  } else {
    Buttons.style.display = "block";
  }

  if (scroll > 2900) {
    Texto.style.opacity = scrollInv2;
  } else {
    Texto.style.opacity = 100;
  }

  if (scrollPos > 38) {
    Background.style.opacity = scrollInv;
  } else {
    Background.style.opacity = 100;
  }
});

const news = document.getElementById("news");
const content = document.getElementById("content");
var user = null;
var newslist = null;

news.addEventListener("click", function () {
  content.classList.remove("hide");
});

window.onload = function () {
  tryfetch();
  getnews();
};

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
    .catch((error) => console.log("Error in tryfetch:", error));
}

function getnews() {
  fetch(`http://localhost:5000/news/select`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        const content = document.getElementById("content");
        content.innerHTML = "";

        const i = document.createElement("i");
        i.classList.add("fa-solid");
        i.classList.add("fa-circle-xmark");
        i.id = "exit";

        i.addEventListener("click", function () {
          content.classList.add("hide");
        });

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
    .catch((error) => console.log("-" + error));
}

function userValidated() {
  const admin = document.getElementById("admin");
  const btn0 = document.getElementById("btn0");
  const panel = document.getElementById("panel");
  const add = document.getElementById("add");
  const userPanel = document.getElementById("user");
  const i = document.createElement("i");

  if (user.rol = 0) {
    admin.classList.remove("hide");
  }

  add.classList.remove("hide");

  i.classList.add("fa-solid");
  i.classList.add("fa-user");

  userPanel.innerText = user.nombre + " ";
  userPanel.appendChild(i);

  btn0.classList.remove("hide");
  panel.classList.add("hide");
  btn0.innerText = `Hola ${user.nombre}!`;
}

async function onGetNews() {
  let users = [];

  try {
    const response = await fetch(`http://localhost:5000/user/select/all`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (data.error) {
      console.error("Error fetching users:", data.error);
      return;
    } else {
      users = data;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return;
  }

  const content = document.getElementById("content");
  content.innerHTML = "";

  const i = document.createElement("i");
  i.classList.add("fa-solid");
  i.classList.add("fa-circle-xmark");
  i.id = "exit";

  i.addEventListener("click", function () {
    content.classList.add("hide");
  });

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
            headers: {
              "Content-Type": "application/json",
            },
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
            headers: {
              "Content-Type": "application/json",
            },
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
}
