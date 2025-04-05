const mongoose = require("mongoose");

// Crear un nuevo esquema con un nombre diferente
const CultivoNuevoSchema = new mongoose.Schema(
    {
        nombreAgricultor: String,
        nombre: String,
        tipoCultivo: String,
        ubicacion: String,
        estado: String,
        productoAplicado: String,
        fechaDeCultivo: Date,
        fechaDeCosecha: Date
    },
    {
        timestamps: true,
        collection: 'cultivos_nuevos' // Usar una colección diferente
    }
);

// Crear el modelo con un nombre diferente
const CultivoNuevo = mongoose.model("CultivoNuevo", CultivoNuevoSchema);

module.exports = CultivoNuevo;