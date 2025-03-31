
const modeloSensor = require('../models/sensorModel');

//POST
const crearSensor = async (req, res) => {
    try {
        const _datos = new modeloSensor(req.body);
        await _datos.save();
        res.status(201).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al crear el sensor"
        });
    }
};

//GET
const obtenerSensores = async (req, res) => {
    try {
        const _datos = await modeloSensor.find();
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los sensores"
        });
    }
};

//PUT
const actualizarSensor = async (req, res) => {
    try {
        const _datos = await modeloSensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!_datos) {
            return res.status(404).json({ error: "Sensor no encontrado" });
        }
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el sensor"
        });
    }
};

//DELETE
const eliminarSensor = async (req, res) => {
    try {
        const _datos = await modeloSensor.findByIdAndDelete(req.params.id);
        if (!_datos) {
            return res.status(404).json({ error: "Sensor no encontrado" });
        }
        res.status(200).json({ message: "Sensor eliminado" });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar el sensor"
        });
    }
};

module.exports = {
    crearSensor,
    obtenerSensores,
    actualizarSensor,
    eliminarSensor
};