const { Router } = require('express');
const {getComidas} = require ("../controllers/ComidasCont");

const router = Router();


router.get ("/comidas", getComidas);
/*
router.get ("/medicos/:id", getMedicosById);
router.post ("/createMedico", postMedico);
router.delete ("borrarMedico/:id", deleteMedico); */



module.exports = router;