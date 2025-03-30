const express = require('express');
const router = express.Router();
const ordenesController = require('../controller/ordenesController');

// Rutas para las órdenes
router.get('/', ordenesController.getAllOrdenes);
router.get('/:id', ordenesController.getOrdenById);
router.post('/', ordenesController.createOrden);
router.put('/:id', ordenesController.updateOrden);
router.delete('/:id', ordenesController.deleteOrden);

module.exports = router; 