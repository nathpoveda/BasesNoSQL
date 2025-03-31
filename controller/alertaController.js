const Alerta = require('../models/alertaModel');

// POST
const crearAlerta = async (req, res) => {
  try {
    const alerta = new Alerta(req.body);
    await alerta.save();
    res.status(201).json(alerta);
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear la alerta'
    });
  }
};

//GET
const obtenerAlertas = async (req, res) => {
  try {
    const alertas = await Alerta.find();
    res.status(200).json(alertas);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener las alertas'
    });
  }
};

// PUT
const actualizarAlerta = async (req, res) => {
  try {
    const alerta = await Alerta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alerta) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }
    res.status(200).json(alerta);
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar la alerta'
    });
  }
};

// DELETE
const eliminarAlerta = async (req, res) => {
  try {
    const alerta = await Alerta.findByIdAndDelete(req.params.id);
    if (!alerta) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }
    res.status(200).json({ mensaje: 'Alerta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar la alerta'
    });
  }
};

module.exports = {
  crearAlerta,
  obtenerAlertas,
  actualizarAlerta,
  eliminarAlerta
};