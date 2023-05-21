const {Ofertas} = require ("../db.js");

const getOfertas = async (req, res) => {
try {
    let ofertas = await Ofertas.findAll();

    return (!ofertas)? res.status(404).send("No hay Ofertas"):
    res.send (ofertas.map(({id, Nombre, Efectivo, Imagen}) => ({
id, Nombre, Efectivo, Imagen})))
    }

catch(error) {
    console.log(error);
    return res.status(404).send("error")
}
};

const postOfertas = async (req, res, next) => {
    
    const {Imagen, Nombre, Efectivo} = req.body;
          
    try {
        const nuevaOferta = await Mensajes.create({ Imagen, Nombre, Efectivo });
        res.status(201).json({ mensaje: 'Oferta creada exitosamente', data: nuevaOferta });
      } catch (error) {
        next(error);
      }
    };

    module.exports = {
        getOfertas, postOfertas
    }
