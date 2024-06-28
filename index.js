const express = require("express");
const path = require("path");
const ejs = require("ejs");
const { traerTodo, crear, borrar,actualizar } = require("./db");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  res.render("index", {
    clubes: await traerTodo(),
  });
});

app.post("/club", async (req, res) => {
  await crear({ nombre: req.body.nombre, titulos: req.body.titulos });
  res.render("index", {
    clubes: await traerTodo(),
  });
});

app.delete("/club", async (req, res) => {
  const nombre = req.body.nombre;
  await borrar(nombre);
  res.json({ success: true });
});


app.put("/club", async (req, res) => {
  const { nombreActual, nombreNuevo, titulos } = req.body;
  await actualizar(nombreActual, nombreNuevo, titulos);
  res.json({ message: "Club actualizado con éxito" });
});


app.listen(3000);
console.log("Servidor no porto 3000");