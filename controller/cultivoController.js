const modeloCultivo = require('../models/cultivoModel');
const mongoose = require('mongoose');

//rutas del crud
const crearCultivo = async (req, res)=>{
    try {
        console.log('Estado de la conexión a MongoDB:', mongoose.connection.readyState);
        console.log('Datos recibidos:', req.body);
        
        // Verificar si los datos están llegando correctamente
        if (!req.body) {
            throw new Error('No se recibieron datos en el cuerpo de la solicitud');
        }

        // Procesar las fechas
        const datosProcesados = {
            ...req.body,
            fechaDeCultivo: req.body.fechaDeCultivo ? new Date(req.body.fechaDeCultivo) : null,
            fechaDeCosecha: req.body.fechaDeCosecha ? new Date(req.body.fechaDeCosecha) : null
        };

        console.log('Datos procesados:', datosProcesados);

        // Crear y guardar el documento
        const cultivo = new modeloCultivo(datosProcesados);
        console.log('Modelo creado:', cultivo);

        // Guardar sin validación
        await cultivo.save({ validateBeforeSave: false });
        console.log('Cultivo guardado exitosamente');
        
        res.status(201).json(cultivo);
    } catch (error) {
        console.error('Error al crear cultivo:', error);
        console.error('Detalles del error:', error.errInfo);
        console.error('Stack trace:', error.stack);
        res.status(500).json({
            error: "Error al crear el cultivo.",
            detalles: error.message,
            info: error.errInfo
        });
    }
};

//get obtener los datos
const obtenerCultivos = async (req, res)=>{
    try {
        console.log('Estado de la conexión a MongoDB:', mongoose.connection.readyState);
        const cultivos = await modeloCultivo.find();
        res.status(200).json(cultivos);
    } catch (error) {
        console.error('Error al obtener cultivos:', error);
        res.status(500).json({
            error: "Error al obtener los cultivos.",
            detalles: error.message
        });
    }
};

// Obtener un cultivo específico
const obtenerCultivo = async (req, res) => {
    try {
        console.log('Obteniendo cultivo con ID:', req.params.id);
        const cultivo = await modeloCultivo.findById(req.params.id);
        
        if (!cultivo) {
            return res.status(404).json({
                error: "Cultivo no encontrado"
            });
        }
        
        res.status(200).json(cultivo);
    } catch (error) {
        console.error('Error al obtener cultivo:', error);
        res.status(500).json({
            error: "Error al obtener el cultivo.",
            detalles: error.message
        });
    }
};

//Put
const actualizarCultivos = async (req, res)=>{
    try {
        console.log('Estado de la conexión a MongoDB:', mongoose.connection.readyState);
        console.log('Actualizando cultivo:', req.params.id, req.body);
        
        // Procesar las fechas
        const datosProcesados = {
            ...req.body,
            fechaDeCultivo: req.body.fechaDeCultivo ? new Date(req.body.fechaDeCultivo) : null,
            fechaDeCosecha: req.body.fechaDeCosecha ? new Date(req.body.fechaDeCosecha) : null
        };

        const cultivo = await modeloCultivo.findByIdAndUpdate(req.params.id, datosProcesados, {new: true, validateBeforeSave: false});
        if (!cultivo) {
            return res.status(404).json({
                error: "Cultivo no encontrado"
            });
        }
        res.status(200).json(cultivo);
    } catch (error) {
        console.error('Error al actualizar cultivo:', error);
        res.status(500).json({
            error: "Error al actualizar los datos del cultivo.",
            detalles: error.message
        });
    }
};

//Delete
const eliminarCultivos = async (req, res)=>{
    try {
        console.log('Estado de la conexión a MongoDB:', mongoose.connection.readyState);
        const cultivo = await modeloCultivo.findByIdAndDelete(req.params.id);
        if (!cultivo) {
            return res.status(404).json({
                error: "Cultivo no encontrado"
            });
        }
        res.status(200).json({mensaje: "Cultivo eliminado correctamente"});
    } catch (error) {
        console.error('Error al eliminar cultivo:', error);
        res.status(500).json({
            error: "Error al eliminar el cultivo.",
            detalles: error.message
        });
    }
};

module.exports = {
    crearCultivo,
    obtenerCultivos,
    obtenerCultivo,
    actualizarCultivos,
    eliminarCultivos
};