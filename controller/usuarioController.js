//Modelo de datos conectado al mongodb(conexion al schema de Usuarios)
const modeloUsuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//rutas del crud
const crearUsuario = async (req, res)=>{
    try {
        console.log('====================================');
        console.log('Datos recibidos para registro:', req.body);
        
        // Validar datos requeridos
        if (!req.body.nombre || !req.body.correo || !req.body.password) {
            console.log('Error: Faltan campos requeridos');
            return res.status(400).json({
                error: "Todos los campos son requeridos (nombre, correo, password)"
            });
        }

        // Verificar si el correo ya existe
        const usuarioExistente = await modeloUsuario.findOne({ correo: req.body.correo });
        if (usuarioExistente) {
            console.log('Error: Correo ya registrado:', req.body.correo);
            return res.status(400).json({
                error: "El correo electrónico ya está registrado"
            });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        // Crear el usuario con datos mínimos
        const nuevoUsuario = new modeloUsuario({
            nombre: req.body.nombre,
            correo: req.body.correo,
            password: password
        });

        console.log('Usuario a guardar:', {
            nombre: nuevoUsuario.nombre,
            correo: nuevoUsuario.correo
        });

        // Guardar el usuario
        const usuarioGuardado = await nuevoUsuario.save();
        console.log('Usuario guardado exitosamente');
        console.log('====================================');

        res.status(201).json({
            mensaje: "Usuario creado exitosamente",
            usuario: {
                id: usuarioGuardado._id,
                nombre: usuarioGuardado.nombre,
                correo: usuarioGuardado.correo
            }
        });
    } catch (error) {
        console.error('====================================');
        console.error('Error completo al crear usuario:', error);
        console.error('Stack:', error.stack);
        console.error('====================================');
        
        res.status(500).json({
            error: "Error al crear el usuario",
            detalles: error.message
        });
    }
};

// Iniciar sesión
const loginUsuario = async (req, res) => {
    try {
        console.log('====================================');
        const { correo, password } = req.body;
        console.log('Intento de inicio de sesión para:', correo);

        // Validar datos requeridos
        if (!correo || !password) {
            console.log('Error: Faltan campos requeridos');
            console.log('====================================');
            return res.status(400).json({
                error: "El correo y la contraseña son requeridos"
            });
        }

        // Verificar si el usuario existe
        const usuario = await modeloUsuario.findOne({ correo });
        if (!usuario) {
            console.log('Error: Usuario no encontrado:', correo);
            console.log('====================================');
            return res.status(400).json({
                error: "Credenciales inválidas"
            });
        }

        // Verificar la contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            console.log('Error: Contraseña inválida para:', correo);
            console.log('====================================');
            return res.status(400).json({
                error: "Credenciales inválidas"
            });
        }

        // Crear y firmar el token JWT
        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET || 'tu_secreto_jwt',
            { expiresIn: '1h' }
        );

        console.log('Inicio de sesión exitoso para:', correo);
        console.log('====================================');

        res.json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error('====================================');
        console.error('Error en inicio de sesión:', error);
        console.error('Stack:', error.stack);
        console.error('====================================');
        res.status(500).json({
            error: "Error al iniciar sesión",
            detalles: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

//get obtener los datos
const obtenerUsuarios = async (req, res)=>{
    try {
        const _datos = await modeloUsuario.find().select('-password');
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los usuarios."
        });
    }
};

//Put
const actualizarUsuarios = async (req, res)=>{
    try {
        const _datos = await modeloUsuario.findByIdAndUpdate(req.params.id, req.body, {new: true} ).select('-password');
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar los datos."
        });
    }
};

//Delete
const eliminarUsuarios = async (req, res)=>{
    try {
        await modeloUsuario.findByIdAndDelete(req.params.id);
        res.status(200).json({
            mensaje: "Usuario eliminado correctamente."
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el usuario."
        });
    }
};
//get, post, delete put

module.exports = {
    crearUsuario,
    loginUsuario,
    obtenerUsuarios,
    actualizarUsuarios,
    eliminarUsuarios
};