const Predicciones_Climaticas = require('../models/predicciones_climaticas_model'); // Actualizar referencia

// post
const crearPrediccionClimatica = async (req, res) => {
    try {
        console.log("Datos recibidos para crear predicción:", req.body); // Log de datos recibidos
        const _datos = new Predicciones_Climaticas(req.body);
        console.log("Documento Mongoose a guardar:", _datos);
        await _datos.save();
        console.log("Predicción guardada exitosamente:", _datos);
        res.status(201).json(_datos);
    } catch (error) {
        console.error("Error detallado al crear la predicción:");
        console.error("Mensaje:", error.message);
        if (error.code === 121 && error.errInfo && error.errInfo.details) {
            // Imprimir detalles específicos de la validación fallida
            console.error("Detalles de validación fallida:", JSON.stringify(error.errInfo.details, null, 2));
        } else {
            // Imprimir el error completo si no es un error de validación estándar o no tiene detalles
            console.error("Error completo:", error);
        }
        console.error("Stack:", error.stack);

        res.status(500).json({
            error: "Error al crear la predicción.",
            mensaje: error.message, // Incluir mensaje de error
            // Considera enviar detalles de validación solo en desarrollo
            validationDetails: process.env.NODE_ENV === 'development' && error.code === 121 ? error.errInfo.details : undefined
        });
    }
};

// ver get
const obtenerPrediccionesClimaticas = async (req, res) => {
    try {
        const _datos = await Predicciones_Climaticas.find();
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al ver las predicciones."
        });
    }
};

// put
const actualizarPrediccionClimatica = async (req, res) => {
    try {
        const _datos = await Predicciones_Climaticas.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(_datos);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar la predicción."
        });
    }
};

// delete
const eliminarPrediccionClimatica = async (req, res) => {
    try {
        await Predicciones_Climaticas.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: "Predicción climática eliminada." });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar la predicción climática."
        });
    }
};

module.exports = {
    crearPrediccionClimatica,
    obtenerPrediccionesClimaticas,
    actualizarPrediccionClimatica,
    eliminarPrediccionClimatica
}; 