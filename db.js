const { MongoClient } = require("mongodb");
const { MONGODB_USR, MONGODB_PWD } =  require("./config.js");

const uri = `mongodb+srv://${MONGODB_USR}:${MONGODB_PWD}@myapp.hyamuy0.mongodb.net/?retryWrites=true&w=majority&appName=MyApp`;

let client;
let clubes;

async function connectToDatabase() {
  if (!client || !client.topology || !client.topology.isConnected()) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db("db");
    clubes = database.collection("clubes");
  }
}

async function traerTodo() {
  await connectToDatabase();
  return await clubes.find({}).toArray();
}

async function buscar(nombre) {
  await connectToDatabase();
  return await clubes.findOne({ nombre: nombre });
}

async function crear(club) {
  await connectToDatabase();
  await clubes.insertOne(club);
}

async function actualizar(nombreActual, nombreNuevo, titulos) {
  await connectToDatabase();
  await clubes.updateOne({ nombre: nombreActual }, { $set: { nombre: nombreNuevo, titulos: titulos } });
}

async function borrar(nombre) {
  await connectToDatabase();
  await clubes.deleteOne({ nombre: nombre });
}

// Optional: Close the client connection gracefully
async function closeDatabaseConnection() {
  if (client && client.isConnected()) {
    await client.close();
  }
}

process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  console.log('MongoDB connection closed');
  process.exit(0);
});

module.exports = { traerTodo, buscar, crear, actualizar, borrar, closeDatabaseConnection };
