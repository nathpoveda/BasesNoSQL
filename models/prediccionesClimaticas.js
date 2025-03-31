const mongoose = require('mongoose');

const PrediccionClimaticaSchema = new mongoose.Schema({
    fechaPrediccion: Date,
    clima: String,
    ubicacion: String,
    tiempo: String,
    temperatura: String,
    detalles: String,
    humedad: String
});

module.exports = mongoose.model('PrediccionClimatica', PrediccionClimaticaSchema);
