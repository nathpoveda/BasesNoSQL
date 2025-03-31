const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema(
    {
        cultivo: String,
        detalles: String,
        actividades: String,
        ubicacion: String,
        unidadDeSensor: String,
        ultimaLectura: Date
    }
);

module.exports = mongoose.model("Sensor", SensorSchema);