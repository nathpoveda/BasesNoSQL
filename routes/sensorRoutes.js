
const express = require("express");
const router = express.Router();

const sensorController = require('../controller/sensorController');
router.post("/", sensorController.crearSensor);
router.get("/", sensorController.obtenerSensores);
router.put("/:id", sensorController.actualizarSensor);
router.delete("/:id", sensorController.eliminarSensor);

module.exports = router;