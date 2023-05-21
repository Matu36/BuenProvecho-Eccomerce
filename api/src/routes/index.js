const { Router } = require('express');
const {getComidas, putComidas, createComida, deleteComida} = require ("../controllers/ComidasCont");
const { getUsers, postUser, putUser } = require('../controllers/UsersCont');
const {postMensaje, obtenerMensajes} = require ("../controllers/UserMensajesCont")
const {checkOut} = require ("../controllers/Stripe");
const { Payment, postVentaMercadoPago, getMercadoPago } = require('../controllers/MercadoPago');
const {getOfertas, postOfertas} = require ("../controllers/OfertasCont");


const router = Router();


router.get ("/comidas", getComidas);
router.put ("/comidas", putComidas);
router.post ("/comidas", createComida)
router.delete("/comidas", deleteComida);
router.get("/users", getUsers);
router.post("/users", postUser);
router.put ("/users", putUser);
router.post ("/mensajes", postMensaje)
router.get ("/mensajes", obtenerMensajes)
router.post("/api/checkout", checkOut);
router.post("/payment", Payment)
router.post("/paymentDBLOCAL", postVentaMercadoPago)
router.get("/paymentDBLOCAL", getMercadoPago);
router.get("/ofertas", getOfertas)
router.post("ofertas", postOfertas)


module.exports = router;