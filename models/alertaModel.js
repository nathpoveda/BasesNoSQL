const mongoose = require('mongoose');

const AlertaSchema = new mongoose.Schema(
  {
    nombre: String,
    tipo: String,
    detalles: String,
    cultivo: String,
    accionTomada:String,
    fechaDeRespuesta: String,
    estado: String
  }
);

module.exports = mongoose.model('Alerta', AlertaSchema);