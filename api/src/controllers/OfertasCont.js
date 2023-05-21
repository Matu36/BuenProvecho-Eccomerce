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

const postOfertas = async (req, res) => {
    try {
        if (!req.body?.Nombre || !req.body?.Efectivo || !req.body?.Imagen) 
        throw "No body params";
    
        const generateNewId = async () => {
          const maxId = await Comidas.max("id");
          const newId = maxId ? maxId + 1 : 1;
          return newId;
        };
    
        let id = await generateNewId();
    
        let postOfert = await Ofertas.create({ id, ...req.body });
    
        return res.status(201).send(postOfert);
      } catch (e) {
        console.log(e);
        return res.status(400).send(e);
      }
    };

    module.exports = {
        getOfertas, postOfertas
    }
