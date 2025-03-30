
//Modelo de datos conectado al mongodb(conexion al schema de Usuarios)
const modeloUsuario = require('../models/usuarioModel');



//rutas del crud
const crearUsuario = async (req, res)=>{
    try {
        const _datos = new modeloUsuario ( req.body );
        await _datos.save();
        res.status(201).json(_datos);
    } catch (error) {
        res.status(500).json( {
            error: "Error al crear el usuario."
        });
    }
};


//get obtener los datos

const obtenerUsuarios = async (req, res)=>{
try {
    const _datos = await modeloUsuario.find();
    res.status(201).json(_datos);
} catch (error) {
    res.status(500).json( {
        error: "Error al obtener los usuarios."
    });
}
};



//Put
const actualizarUsuarios = async (req, res)=>{
try {
 
    const _datos = await modeloUsuario.findByIdAndUpdate(req.params.id, req.body, {new: true} );
    res.status(200).json(_datos);
} catch (error) {
    res.status(500).json( {
        error: "Error al actualizar los datos."
    });
}
};

//Delete
const eliminarUsuarios = async (req, res)=>{
try {
 
    const _datos = await modeloUsuario.findByIdAndDelete(req.params.id);
    res.status(200).json("Datos eliminados.");
} catch (error) {
    res.status(500).json( {
        error: "Error al eliminar los datos."
    });
}
};
//get, post, delete put


module.exports = {
    actualizarUsuarios,
    crearUsuario,
    eliminarUsuarios,
    obtenerUsuarios
};