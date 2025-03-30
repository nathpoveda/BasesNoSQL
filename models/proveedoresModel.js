const mongoose = require('mongoose');

const proveedoresSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    fabricante: {
        type: String,
        required: true
    },
    tipoProducto: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    fechaSuministro: {
        type: Date,
        required: true
    },
    calificacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    cantidadSuministrada: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Proveedores', proveedoresSchema); 