const express = require("express");
const router = express.Router();
const registroSensoresController = require('../controller/registro_sensores_controller');

router.post("/", registroSensoresController.crearRegistroSensor);
router.get("/", registroSensoresController.obtenerRegistrosSensores);
router.put("/:id", registroSensoresController.actualizarRegistroSensor);
router.delete("/:id", registroSensoresController.eliminarRegistroSensor);

module.exports = router; 