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

// Middleware para logging detallado
app.use((req, res, next) => {
    console.log("====================================");
    console.log(`${new Date().toISOString()}`);
    console.log(`Método: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Headers:`, req.headers);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log(`Body:`, req.body);
    }
    console.log("====================================");
    next();
});

// Configuración de archivos estáticos
const publicPath = path.join(__dirname, 'public');
console.log('Ruta de archivos estáticos:', publicPath);
app.use(express.static(publicPath));

// Conexión a MongoDB
const mongoURi = process.env.MONGO_URI;
console.log('Intentando conectar a MongoDB con URI:', mongoURi);

mongoose.set('debug', true); // Habilitar el modo debug de Mongoose

mongoose.connect(mongoURi, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("====================================");
        console.log("Conectado exitosamente a MongoDB");
        console.log("Base de datos:", mongoURi.split('/').pop());
        console.log("====================================");
    })
    .catch(err => {
        console.error("====================================");
        console.error("Error al conectar a MongoDB:");
        console.error("Detalles del error:", err);
        console.error("URI de conexión:", mongoURi);
        console.error("====================================");
        process.exit(1);
    });

// Importar rutas
const cultivoRoutes = require("./routes/cultivoRoutes");
const proveedoresRoutes = require("./routes/proveedoresRoutes");
const recomendacionRoutes = require("./routes/recomendacionRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

// Rutas API
app.use("/api/cultivos", cultivoRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/recomendaciones", recomendacionRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Ruta principal y otras rutas HTML
app.get('/', (req, res) => {
    console.log('Solicitud recibida en /');
    res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/index.html', (req, res) => {
    console.log('Solicitud recibida en /index.html');
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/login.html', (req, res) => {
    console.log('Solicitud recibida en /login.html');
    res.sendFile(path.join(publicPath, 'login.html'));
});

// Ruta de prueba
app.get('/test', (req, res) => {
    console.log('Solicitud recibida en /test');
    res.send('¡El servidor está funcionando!');
});

// Manejo de errores mejorado
app.use((err, req, res, next) => {
    console.error("====================================");
    console.error("Error en el servidor:");
    console.error("Mensaje:", err.message);
    console.error("Stack:", err.stack);
    console.error("====================================");
    
    res.status(500).json({
        error: "Error interno del servidor",
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

//Iniciar el servidor
const PORT = process.env.PORT || 6000;
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

