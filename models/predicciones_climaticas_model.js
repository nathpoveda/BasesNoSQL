const mongoose = require('mongoose');

const Predicciones_Climaticas_Schema = new mongoose.Schema({
    fechaPrediccion: {
        type: Date,
        required: true
    },
    clima: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    tiempo: {
        type: String,
        required: true
    },
    temperatura: {
        type: String,
        required: true
    },
    detalles: {
        type: String,
        required: true
    },
    "humedad:": {
        type: String,
        required: true
    }
}, {
    collection: 'predicciones_climaticas' // Especificar nombre de colección
});

module.exports = mongoose.model('Predicciones_Climaticas', Predicciones_Climaticas_Schema); 