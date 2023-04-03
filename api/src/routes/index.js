const { Router } = require('express');
const {getComidas, putComidas, createComida, deleteComida} = require ("../controllers/ComidasCont");
const { getUsers } = require('../controllers/UsersCont');
const {postMensaje, obtenerMensajes} = require ("../controllers/UserMensajesCont")

const router = Router();


router.get ("/comidas", getComidas);
router.put ("/comidas", putComidas);
router.post ("/comidas", createComida)
router.delete("/comidas", deleteComida);
router.get("/users", getUsers)
router.post ("/mensajes", postMensaje)
router.get ("/mensajes", obtenerMensajes)
/*

router.post ("/createMedico", postMedico);
router.delete ("borrarMedico/:id", deleteMedico); */



module.exports = router;