const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        correo: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            default: 'usuario'
        },
        numero: {
            type: String,
            default: ''
        },
        estado: {
            type: Boolean,
            default: true
        },
        fechaRegistro: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'usuarios'
    }
);

// Eliminar la colección existente si hay problemas
mongoose.connection.on('connected', async () => {
    try {
        await mongoose.connection.db.collection('usuarios').drop();
        console.log('Colección de usuarios eliminada para reiniciar');
    } catch (error) {
        console.log('No se pudo eliminar la colección o no existe');
    }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);