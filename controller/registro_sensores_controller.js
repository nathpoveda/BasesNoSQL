const Registro_Sensores = require('../models/registro_sensores_model'); // Actualizar referencia

//POST
const crearRegistroSensor = async (req, res) => {
    try {
        const _datos = new Registro_Sensores(req.body);
        await _datos.save();
        res.status(201).json(_datos);
    } catch (error) {
        console.error("Error al crear registro de sensor:", error); // Mejorar log
        res.status(500).json({
            error: "Error al crear el registro de sensor",
            mensaje: error.message
        });
    }
};

//GET
const obtenerRegistrosSensores = async (req, res) => {
    try {
        const _datos = await Registro_Sensores.find();
        res.status(200).json(_datos);
    } catch (error) {
        console.error("Error al obtener registros de sensores:", error);
        res.status(500).json({
            error: "Error al obtener los registros de sensores",
            mensaje: error.message
        });
    }
};

//PUT
const actualizarRegistroSensor = async (req, res) => {
    try {
        const _datos = await Registro_Sensores.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!_datos) {
            return res.status(404).json({ error: "Registro de sensor no encontrado" });
        }
        res.status(200).json(_datos);
    } catch (error) {
        console.error("Error al actualizar registro de sensor:", error);
        res.status(500).json({
            error: "Error al actualizar el registro de sensor",
            mensaje: error.message
        });
    }
};

//DELETE
const eliminarRegistroSensor = async (req, res) => {
    try {
        const _datos = await Registro_Sensores.findByIdAndDelete(req.params.id);
        if (!_datos) {
            return res.status(404).json({ error: "Registro de sensor no encontrado" });
        }
        res.status(200).json({ message: "Registro de sensor eliminado" });
    } catch (error) {
        console.error("Error al eliminar registro de sensor:", error);
        res.status(500).json({
            error: "Error al eliminar el registro de sensor",
            mensaje: error.message
        });
    }
};

module.exports = {
    crearRegistroSensor,
    obtenerRegistrosSensores,
    actualizarRegistroSensor,
    eliminarRegistroSensor
}; 