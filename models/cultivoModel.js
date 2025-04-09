const mongoose = require("mongoose");

const CultivoSchema = new mongoose.Schema(
    {
        nombreAgricultor: {
            type: String,
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
        ubicacion: {
            type: String,
            required: true
        },
        fechaDeCultivo: {
            type: Date
        },
        fechaDeCosecha: {
            type: Date
        },
        estado: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        productoAplicado: {
            type: String,
            required: true
        },
        descripcion: {
            type: String
        }
    },
    {
        collection: 'cultivos' // Especificamos el nombre exacto de la colección
    }
);

module.exports = mongoose.model("Cultivo", CultivoSchema);