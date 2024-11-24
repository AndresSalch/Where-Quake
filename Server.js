const express = require("express");
const session = require("express-session");
const passwd = require("check-password-strength");
const path = require("path");
const multer = require("multer");
const app = express();

app.use(express.static(path.join(__dirname, "Front-End")));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "Front-End", "Pfps"),
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.use(
  session({
    secret: "salchokey1",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false },
  })
);

app.post("/pwd", (req, res) => {
  const data = req.body.value;
  res.send(JSON.stringify(passwd.passwordStrength(data).value));
});

app.post("/store", (req, res) => {
  const data = req.body;
  req.session.customData = data;
  res.send(data);
});

app.get("/retrieve", (req, res) => {
  if (req.session.customData) {
    res.send(req.session.customData);
  } else {
    res.send("new");
  }
});

app.post("/update", (req, res) => {
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
  } = req.body;

  req.session.customData = {
    id_usuario,
    nombre,
    apellidos,
    email,
    phone,
    birth,
    rol,
    lastLog,
    photo,
  };

  res.send(req.session.customData);
});

app.get("/end", (req, res) => {
  req.session.customData = null;
  res.send("end");
});

app.post("/pfp", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Archivo invalido");
  }
  const relativePath = path.join("Pfps", req.file.filename);
  res.send(`${relativePath}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Front-End", "index.html"));
});

var port = 3000;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
