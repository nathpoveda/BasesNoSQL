//Invocando librerias
const express = require("express");
const router = express.Router();

const usuarioController = require('../controller/usuarioController');

// Rutas de autenticación
router.post("/login", usuarioController.loginUsuario);

// Rutas CRUD
router.post("/", usuarioController.crearUsuario);
router.get("/", usuarioController.obtenerUsuarios);
router.put("/:id", usuarioController.actualizarUsuarios);
router.delete("/:id", usuarioController.eliminarUsuarios);

module.exports = router;
