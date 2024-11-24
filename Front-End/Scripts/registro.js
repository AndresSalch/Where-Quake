document
  .getElementById("registroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const lname = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const phone = document.getElementById("numero").value;
    const birth = document.getElementById("fecha").value;
    const role = false;
    const photo = "Styles\\Src\\user.png";

    const err = document.getElementById("errorR");
    const success = document.getElementById("success");
    const insert = document.getElementById("insert");

    if (password == password2) {
      console.log(
        JSON.stringify({
          name,
          lname,
          email,
          password,
          phone,
          birth,
          role,
          photo,
        })
      );
      err.classList.add("hide");
      fetch(`http://localhost:5000/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lname,
          email,
          password,
          phone,
          birth,
          role,
          photo,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error fetching data:", data.error);
            return;
          } else {
            this.classList.add("hide");
            success.classList.remove("hide");
            let timer = 3;
            var myInterval = setInterval(time, 1000);
            function time() {
              insert.textContent = `Redirigiendo en ${timer}`;
              if (timer == 0) {
                window.location.href = "index.html";
              }
              timer--;
            }
          }
        })
        .catch((error) => console.error("Error:", error));
    } else if (password != password2) {
      event.preventDefault();
      err.classList.remove("hide");
    } else {
      err.classList.add("hide");
    }
  });

document.getElementById("password").addEventListener("input", function (event) {
  const box = document.getElementById("errorBar");
  const rojo = document.getElementById("rojo");
  const naranja = document.getElementById("naranja");
  const amarillo = document.getElementById("amarillo");
  const verde = document.getElementById("verde");
  const text = document.getElementById("errorS");

  let value = this.value;

  box.classList.remove("hide");

  if (value == "") {
    box.classList.add("hide");
  }

  fetch(`http://localhost:3000/pwd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching data:", data.error);
        return;
      } else {
        switch (data) {
          case "Too weak":
            naranja.style.backgroundColor = "#202020";
            amarillo.style.backgroundColor = "#202020";
            verde.style.backgroundColor = "#202020";

            rojo.style.backgroundColor = "red";
            text.style.color = "red";
            text.innerText = "Muy Baja";

            event.preventDefault();

            break;
          case "Weak":
            amarillo.style.backgroundColor = "#202020";
            verde.style.backgroundColor = "#202020";

            rojo.style.backgroundColor = "red";
            naranja.style.backgroundColor = "orange";
            text.style.color = "orange";
            text.innerText = "Baja";
            break;
          case "Medium":
            verde.style.backgroundColor = "#202020";

            rojo.style.backgroundColor = "red";
            naranja.style.backgroundColor = "orange";
            amarillo.style.backgroundColor = "#b6fc03";
            text.style.color = "#b6fc03";
            text.innerText = "Media";
            break;
          case "Strong":
            rojo.style.backgroundColor = "red";
            naranja.style.backgroundColor = "orange";
            amarillo.style.backgroundColor = "#b6fc03";
            verde.style.backgroundColor = "green";
            text.style.color = "green";
            text.innerText = "Alta";
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => console.error("Error:", error));
});
