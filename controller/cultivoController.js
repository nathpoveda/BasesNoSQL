const modeloCultivo = require('../models/cultivoModel');



//rutas del crud
const crearCultivo = async (req, res)=>{
    try {
        const _datos = new modeloCultivo ( req.body );
        await _datos.save();
        res.status(201).json(_datos);
    } catch (error) {
        res.status(500).json( {
            error: "Error al crear el cultivo."
        });
    }
};


//get obtener los datos
const obtenerCultivos = async (req, res)=>{
try {
    const _datos = await modeloCultivo.find();
    res.status(201).json(_datos);
} catch (error) {
    res.status(500).json( {
        error: "Error al obtener los cultivos."
    });
}
};



//Put
const actualizarCultivos = async (req, res)=>{
try {
 
    const _datos = await modeloCultivo.findByIdAndUpdate(req.params.id, req.body, {new: true} );
    res.status(200).json(_datos);
} catch (error) {
    res.status(500).json( {
        error: "Error al actualizar los datos del cultivo."
    });
}
};

//Delete
const eliminarCultivos = async (req, res)=>{
try {
 
    const _datos = await modeloCultivo.findByIdAndDelete(req.params.id);
    res.status(200).json("Datos de cultivo eliminados.");
} catch (error) {
    res.status(500).json( {
        error: "Error al eliminar los datos del cultivo."
    });
}
};
//get, post, delete put


module.exports = {
    actualizarCultivos,
    crearCultivo,
    eliminarCultivos,
    obtenerCultivos
};