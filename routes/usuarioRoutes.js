//Invocando librerias
const express = require("express");
const router = express.Router();

const usuarioController = require('../controller/usuarioController');

router.post("/",usuarioController.crearUsuario);
router.get("/", usuarioController.obtenerUsuarios);
router.put("/:id", usuarioController.actualizarUsuarios);
router.delete("/:id", usuarioController.eliminarUsuarios);

module.exports = router;
