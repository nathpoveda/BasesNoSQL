const modeloRecomendacion = require('../models/recomendacion');

// post
const crearRecomendacion = async (req, res) => {
    try {
        const _datos = new modeloRecomendacion(req.body);
        await _datos.save();
        res.status(201).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al crear la recomendación."
        });
    }
};
// get
const obtenerRecomendaciones = async (req, res) => {
    try {
        const _datos = await modeloRecomendacion.find();
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al ver las recomendaciones."
        });
    }
};

// put
const actualizarRecomendacion = async (req, res) => {
    try {
        const _datos = await modeloRecomendacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar la recomendación."
        });
    }
};

// Eliminar u
const eliminarRecomendacion = async (req, res) => {
    try {
        await modeloRecomendacion.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: "Recomendación eliminada." });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar la recomendación."
        });
    }
};

module.exports = {
    crearRecomendacion,
    obtenerRecomendaciones,
    actualizarRecomendacion,
    eliminarRecomendacion
};
