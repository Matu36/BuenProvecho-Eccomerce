const {Comidas} = require ("../db.js");

const getComidas = async (req, res) => {
    try{
      let com = await Comidas.findAll();
      
      return (!com)
        ? res.status(404).send('No hay Comidas')
        : res.send(com.map(({id, Nombre, Efectivo, Categoria, Imagen, MercadoPago}) => 
        ({id, Nombre, Efectivo, Categoria, Imagen, MercadoPago })));
  
    }
    catch(error) {
      console.log(error);
      return res.status(404).send('Error 404');
    }
}

module.exports = {
    getComidas
}