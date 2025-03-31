const mongoose = require('mongoose');

const RecomendacionSchema = new mongoose.Schema({
    fuente: String,
    cultivo: String,
    tipoCultivo: String,
    descripcion: String,
    nivelDePrioridad: String,
    fechaDeRegistro: Date 
});

module.exports = mongoose.model('Recomendacion', RecomendacionSchema);
