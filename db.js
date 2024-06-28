const { MongoClient } = require("mongodb");
const { MONGODB_USR, MONGODB_PWD } =  require("./config.js");

const uri =
  "mongodb+srv://" + MONGODB_USR + ":" + MONGODB_PWD + "@myapp.hyamuy0.mongodb.net/?retryWrites=true&w=majority&appName=MyApp";

const client = new MongoClient(uri);
const database = client.db("db");
const clubes = database.collection("clubes");

async function traerTodo() {
  return await clubes.find({}).toArray();
}

async function buscar(nombre) {
  return await clubes.findOne({ nombre: nombre });
}

async function crear(club) {
  await clubes.insertOne(club);
}

async function actualizar(nombreActual, nombreNuevo, titulos) {
  await clubes.updateOne({ nombre: nombreActual }, { $set: { nombre: nombreNuevo, titulos: titulos } });
}

async function borrar(nombre) {
  await clubes.deleteOne({ nombre: nombre });
}

module.exports = { traerTodo, buscar, crear, actualizar, borrar }