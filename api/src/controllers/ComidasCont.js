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
};

const putComidas = async (req, res) => {
  try{
    let comida = await Comidas.findOne({where: {id: req.body.id}});

    if (!comida) return res.status(404).send('No se encontro la comida');

    await comida.update({...req.body});
    return (!comida)
    ? res.status(404).send('No se encontro la comida')
    : res.send(await comida.reload());

}
catch(error) {
  console.log(error);
  return res.status(500).send(error);
}
};

const createComida = async (req, res) => {
  try {
    if (!req.body?.Nombre || !req.body?.Efectivo || !req.body?.Imagen || !req.body?.Categoria) 
    throw "No body params";

    const { Nombre, Efectivo, Categoria, Imagen, MercadoPago } = req.body;

    const generateNewId = async () => {
      const maxId = await Comidas.max("id");
      const newId = maxId ? maxId + 1 : 1;
      return newId;
    };

    let id = await generateNewId();

    let createdComida = await Comidas.create({ id, ...req.body });

    return res.status(201).send(createdComida);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

module.exports = {
    getComidas, putComidas, createComida
}