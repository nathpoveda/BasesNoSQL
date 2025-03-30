const HistorialAplicaciones = require('../models/historialAplicacionesModel');

// Obtener todos los registros de historial
exports.getAllHistorial = async (req, res) => {
    try {
        const historiales = await HistorialAplicaciones.find();
        res.status(200).json(historiales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un registro específico por ID
exports.getHistorialById = async (req, res) => {
    try {
        const historial = await HistorialAplicaciones.findById(req.params.id);
        if (!historial) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo registro
exports.createHistorial = async (req, res) => {
    try {
        const historial = new HistorialAplicaciones(req.body);
        const nuevoHistorial = await historial.save();
        res.status(201).json(nuevoHistorial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un registro existente
exports.updateHistorial = async (req, res) => {
    try {
        const historial = await HistorialAplicaciones.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!historial) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.status(200).json(historial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un registro
exports.deleteHistorial = async (req, res) => {
    try {
        const historial = await HistorialAplicaciones.findByIdAndDelete(req.params.id);
        if (!historial) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }
        res.status(200).json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 