const mongoose = require("mongoose");

const CultivoSchema = new mongoose.Schema(
    {
        nombreAgricultor: String,
        nombre: String,
        tipoCultivo: String,
        ubicacion: String,
        estado: String,
        productoAplicado: String,
        fechaDeCultivo: Date,
        fechaDeCosecha: Date
    }
)

module.exports = mongoose.model("Cultivo", CultivoSchema);