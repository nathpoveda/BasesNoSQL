const express = require('express');
const router = express.Router();
const recomendacionController = require('../controller/RecomendacionController');

router.post('/', recomendacionController.crearRecomendacion);
router.get('/', recomendacionController.obtenerRecomendaciones);
router.put('/:id', recomendacionController.actualizarRecomendacion);
router.delete('/:id', recomendacionController.eliminarRecomendacion);

module.exports = router;
