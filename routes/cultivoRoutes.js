//Invocando librerias
const express = require("express");
const router = express.Router();

const cultivoController = require('../controller/cultivoController');

router.post("/", cultivoController.crearCultivo);
router.get("/", cultivoController.obtenerCultivos);
router.get("/:id", cultivoController.obtenerCultivo);
router.put("/:id", cultivoController.actualizarCultivos);
router.delete("/:id", cultivoController.eliminarCultivos);

module.exports = router;
