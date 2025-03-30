const mongoose = require('mongoose');

const ordenesSchema = new mongoose.Schema({
    fechaCompra: {
        type: Date,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    fabricante: {
        type: String,
        required: true
    },
    unidades: {
        type: Number,
        required: true
    },
    precioUnitario: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    cultivoAplicable: {
        type: String,
        required: true
    },
    fechaEntrega: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ordenes', ordenesSchema); 