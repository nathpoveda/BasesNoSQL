const express = require('express');
const router = express.Router();
const alertaController = require('../controller/alertaController');


router.post('/', alertaController.crearAlerta);
router.get('/', alertaController.obtenerAlertas);
router.put('/:id', alertaController.actualizarAlerta);
router.delete('/:id', alertaController.eliminarAlerta);

module.exports = router;