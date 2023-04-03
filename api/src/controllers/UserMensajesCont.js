const {Mensajes} = require ("../db.js")

const postMensaje = async (req, res, next) => {
    
const {  email, Nombre, Mensaje} = req.body;
      
try {
    const nuevoMensaje = await Mensajes.create({ email, Nombre, Mensaje });
    res.status(201).json({ mensaje: 'Mensaje creado exitosamente', data: nuevoMensaje });
  } catch (error) {
    next(error);
  }
};

const obtenerMensajes = async (req, res) => {
    try {
      const mensajes = await Mensajes.findAll();
      res.status(200).json(mensajes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los mensajes' });
    }
  }
  
  
  
  module.exports = {postMensaje, obtenerMensajes}


