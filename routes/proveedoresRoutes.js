const express = require('express');
const router = express.Router();
const proveedoresController = require('../controller/proveedoresController');

// Rutas para los proveedores
router.get('/', proveedoresController.getAllProveedores);
router.get('/:id', proveedoresController.getProveedorById);
router.post('/', proveedoresController.createProveedor);
router.put('/:id', proveedoresController.updateProveedor);
router.delete('/:id', proveedoresController.deleteProveedor);

module.exports = router; 