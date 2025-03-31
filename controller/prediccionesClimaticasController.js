const modeloPrediccionClimatica = require('../models/prediccionesClimaticas');

// post
const crearPrediccionClimatica = async (req, res) => {
    try {
        const _datos = new modeloPrediccionClimatica(req.body);
        await _datos.save();
        res.status(201).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al crear la predicción."
        });
    }
};

// ver get
const obtenerPrediccionesClimaticas = async (req, res) => {
    try {
        const _datos = await modeloPrediccionClimatica.find();
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al ver las predicciones."
        });
    }
};

// put
const actualizarPrediccionClimatica = async (req, res) => {
    try {
        const _datos = await modeloPrediccionClimatica.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar la predicción."
        });
    }
};

// delete
const eliminarPrediccionClimatica = async (req, res) => {
    try {
        await modeloPrediccionClimatica.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: "Predicción climática eliminada." });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar la predicción climática."
        });
    }
};

module.exports = {
    crearPrediccionClimatica,
    obtenerPrediccionesClimaticas,
    actualizarPrediccionClimatica,
    eliminarPrediccionClimatica
};
