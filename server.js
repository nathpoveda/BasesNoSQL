//Esto es el archivo de ajustes para el servidor 
require("dotenv").config();

//Invocando librerias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//aqui hay que colocar las rutas para cada coleccion. 
const usuarioRoutes = require("./routes/usuarioRoutes");
const cultivoRoutes = require("./routes/cultivoRoutes");
const historialAplicacionesRoutes = require("./routes/historialAplicacionesRoutes");
// 
const app = express();

//Middleware esto es para el req y respon
app.use(express.json());
app.use(cors());

//Obtener el string de conexion env
const mongoURi = process.env.MONGO_URI;

//Conectarnos a una base de datos, NOSQL
mongoose.connect(mongoURi)
.then( ()=> console.log("Conectado"))
.catch( err => console.error("Error al conectar:", err));

//igualmente, hacer esto con cada ruta.
app.use("/usuarios", usuarioRoutes);
app.use("/cultivos", cultivoRoutes);
app.use("/historial-aplicaciones", historialAplicacionesRoutes);

//Iniciar el servidor

const PORT = process.env.PORT || 6000; //este es el puerto del API no de la base de datos
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

