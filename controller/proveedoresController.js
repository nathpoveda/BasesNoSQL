const Proveedores = require('../models/proveedoresModel');

// Obtener todos los proveedores
exports.getAllProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedores.find();
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un proveedor específico por ID
exports.getProveedorById = async (req, res) => {
    try {
        const proveedor = await Proveedores.findById(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json(proveedor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo proveedor
exports.createProveedor = async (req, res) => {
    try {
        const proveedor = new Proveedores(req.body);
        const nuevoProveedor = await proveedor.save();
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un proveedor existente
exports.updateProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedores.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json(proveedor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un proveedor
exports.deleteProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedores.findByIdAndDelete(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 