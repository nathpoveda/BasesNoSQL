const Ordenes = require('../models/ordenesModel');

// Obtener todas las órdenes
exports.getAllOrdenes = async (req, res) => {
    try {
        const ordenes = await Ordenes.find();
        res.status(200).json(ordenes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una orden específica por ID
exports.getOrdenById = async (req, res) => {
    try {
        const orden = await Ordenes.findById(req.params.id);
        if (!orden) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.status(200).json(orden);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva orden
exports.createOrden = async (req, res) => {
    try {
        const orden = new Ordenes(req.body);
        const nuevaOrden = await orden.save();
        res.status(201).json(nuevaOrden);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una orden existente
exports.updateOrden = async (req, res) => {
    try {
        const orden = await Ordenes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!orden) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.status(200).json(orden);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una orden
exports.deleteOrden = async (req, res) => {
    try {
        const orden = await Ordenes.findByIdAndDelete(req.params.id);
        if (!orden) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 