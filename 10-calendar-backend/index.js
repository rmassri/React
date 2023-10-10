const express = require("express");
require("dotenv").config();
const { dbConection } = require("./database/config");
const cors = require("cors");

console.log(process.env.PORT);
//crear el servidor de express

const app = express();

dbConection();

app.use(cors());

//base de datos

//Rutas
// app.get("/", (req, resp) => {

//   resp.json({
//     ok: true,
//   });
// });

//Durectorio publico

app.use(express.static("public"));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

// Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto 4000");
});
