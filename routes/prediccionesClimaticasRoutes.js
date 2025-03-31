const express = require('express');
const router = express.Router();
const prediccionesClimaticas = require('../controller/prediccionesClimaticasController');

router.post('/', prediccionesClimaticas.crearPrediccionClimatica);
router.get('/', prediccionesClimaticas.obtenerPrediccionesClimaticas);
router.put('/:id', prediccionesClimaticas.actualizarPrediccionClimatica);
router.delete('/:id', prediccionesClimaticas.eliminarPrediccionClimatica);

module.exports = router;
