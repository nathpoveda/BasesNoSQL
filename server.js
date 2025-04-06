//Esto es el archivo de ajustes para el servidor 
require("dotenv").config();

//Invocando librerias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Configuración básica
app.use(cors());
app.use(express.json());

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Configuración de archivos estáticos
const publicPath = path.join(__dirname, 'public');
console.log('Ruta de archivos estáticos:', publicPath);
app.use(express.static(publicPath));

// Conexión a MongoDB
const mongoURi = process.env.MONGO_URI;
mongoose.connect(mongoURi)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

// Importar rutas
const cultivoRoutes = require("./routes/cultivoRoutes");
const proveedoresRoutes = require("./routes/proveedoresRoutes");
const recomendacionRoutes = require("./routes/recomendacionRoutes");

// Rutas API
app.use("/api/cultivos", cultivoRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/recomendaciones", recomendacionRoutes);

// Ruta principal
app.get('/', (req, res) => {
    console.log('Solicitud recibida en /');
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Ruta de prueba
app.get('/test', (req, res) => {
    console.log('Solicitud recibida en /test');
    res.send('¡El servidor está funcionando!');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err);
    res.status(500).send('Error interno del servidor');
});

//Iniciar el servidor
const PORT = 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('====================================');
    console.log('Servidor iniciado correctamente');
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`Directorio público: ${publicPath}`);
    console.log('====================================');
});

// Manejo de errores del servidor
server.on('error', (error) => {
    console.error('Error en el servidor:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} ya está en uso`);
    }
});

