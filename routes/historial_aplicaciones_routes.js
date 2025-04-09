const express = require('express');
const router = express.Router();
const historialAplicacionesController = require('../controller/historial_aplicaciones_controller');

// Rutas para el historial de aplicaciones
router.get('/', historialAplicacionesController.getAllHistorial);
router.get('/:id', historialAplicacionesController.getHistorialById);
router.post('/', historialAplicacionesController.createHistorial);
router.put('/:id', historialAplicacionesController.updateHistorial);
router.delete('/:id', historialAplicacionesController.deleteHistorial);

module.exports = router; 