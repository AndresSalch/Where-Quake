document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
      fetch(`http://localhost:5000/user/select`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            console.error("Error fetching data:", data.error);
            return;
          } else {
            const lastLog = new Date().toISOString();
            const email = data.email;
            fetch(`http://localhost:5000/user/update/last`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, lastLog }),
            }).catch((error) =>
              console.error("Error deleting account:", error)
            );
            const id_usuario = data.id_usuario;
            const nombre = data.nombre;
            const apellidos = data.apellidos;
            const phone = data.phone;
            const birth = data.birth;
            const rol = data.rol;
            const photo = data.photo;

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
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.error) {
                  console.error("Error fetching", data.error);
                  return;
                } else {
                  window.location.href = "index.html";
                }
              });
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  });

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
