const mongoose = require('mongoose');

const historialAplicacionesSchema = new mongoose.Schema({
    cultivo: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    usuarioResponsable: {
        type: String,
        required: true
    },
    tipoAplicacion: {
        type: String,
        required: true
    },
    detalles: {
        type: String,
        required: true
    },
    resultados: {
        type: String,
        required: true
    },
    productoUtilizado: {
        type: String,
        required: true
    },
    cantidadAplicada: {
        type: String,
        required: true
    },
    metodoAplicado: {
        type: String,
        required: true
    },
    efectividad: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('HistorialAplicaciones', historialAplicacionesSchema); 