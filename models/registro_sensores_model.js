const mongoose = require("mongoose");

const Registro_Sensores_Schema = new mongoose.Schema(
    {
        cultivo: {
            type: String,
            required: true // Asumiendo que son requeridos
        },
        detalles: {
            type: String,
            required: true
        },
        actividades: {
            type: String,
            required: true
        },
        ubicacion: {
            type: String,
            required: true
        },
        unidadDeSensor: {
            type: String,
            required: true
        },
        ultimaLectura: {
            type: Date,
            required: true
        }
    },
    {
        collection: 'registros_sensores', // Corregido al nombre real de la colección (plural)
        timestamps: true // Añadir timestamps si es útil
    }
);

module.exports = mongoose.model("Registro_Sensores", Registro_Sensores_Schema); 