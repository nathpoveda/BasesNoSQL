const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
    {
        nombre: String,
        correo: String,
        rol: String,
        numero: String,
        estado: Boolean,
        fechaRegistro: Date
    }
)

module.exports = mongoose.model("Usuario", UsuarioSchema);