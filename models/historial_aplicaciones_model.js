const mongoose = require('mongoose');

const Historial_Aplicaciones_Schema = new mongoose.Schema({
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
    collection: 'historial_aplicaciones', // Especificar nombre de colección
    timestamps: true
});

module.exports = mongoose.model('Historial_Aplicaciones', Historial_Aplicaciones_Schema); 