const express = require('express');
const router = express.Router();
const prediccionesClimaticasController = require('../controller/predicciones_climaticas_controller');

router.post('/', prediccionesClimaticasController.crearPrediccionClimatica);
router.get('/', prediccionesClimaticasController.obtenerPrediccionesClimaticas);
router.put('/:id', prediccionesClimaticasController.actualizarPrediccionClimatica);
router.delete('/:id', prediccionesClimaticasController.eliminarPrediccionClimatica);

module.exports = router; 