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
const mongoURi = process.env.MONGO_URI || 'mongodb://localhost:27017/Proyecto_Bioagrotech';
console.log('Intentando conectar a MongoDB con URI:', mongoURi);

mongoose.set('debug', true); // Habilitar el modo debug de Mongoose

mongoose.connect(mongoURi)
    .then(() => {
        console.log("====================================");
        console.log("Conectado exitosamente a MongoDB");
        console.log("Base de datos: Proyecto_Bioagrotech");
        console.log("====================================");
    })
    .catch((error) => {
        console.error("====================================");
        console.error("Error al conectar a MongoDB:");
        console.error(error);
        console.error("====================================");
    });

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const cultivoRoutes = require('./routes/cultivoRoutes');
const proveedorRoutes = require('./routes/proveedoresRoutes');
const recomendacionRoutes = require('./routes/recomendacionRoutes');
const prediccionesClimaticasRoutes = require('./routes/predicciones_climaticas_routes');
const alertaRoutes = require('./routes/alertaRoutes');
const historialAplicacionesRoutes = require('./routes/historial_aplicaciones_routes');
const registroSensoresRoutes = require('./routes/registro_sensores_routes');
const ordenesRoutes = require('./routes/ordenesRoutes');

// Montar rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cultivos', cultivoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/recomendaciones', recomendacionRoutes);
app.use('/api/predicciones_climaticas', prediccionesClimaticasRoutes);
app.use('/api/alertas', alertaRoutes);
app.use('/api/historial_aplicaciones', historialAplicacionesRoutes);
app.use('/api/registro_sensores', registroSensoresRoutes);
app.use('/api/ordenes', ordenesRoutes);

// Rutas para archivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'login.html'));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('====================================');
    console.error('Error del servidor:', err);
    console.error('Stack:', err.stack);
    console.error('====================================');
    res.status(500).json({
        error: "Error interno del servidor",
        detalles: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Función para iniciar el servidor
const startServer = (port) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port)
            .on('error', (error) => {
                if (error.code === 'EADDRINUSE') {
                    console.log(`Puerto ${port} en uso, intentando con puerto ${port + 1}`);
                    server.close();
                    startServer(port + 1).then(resolve).catch(reject);
                } else {
                    reject(error);
                }
            })
            .on('listening', () => {
                console.log("====================================");
                console.log(`Servidor corriendo en puerto ${port}`);
                console.log("====================================");
                resolve(server);
            });
    });
};

// Iniciar servidor
const PORT = process.env.PORT || 3000;
startServer(PORT).catch(error => {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
});


