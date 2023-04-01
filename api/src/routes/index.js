const { Router } = require('express');
const {getComidas, putComidas, createComida} = require ("../controllers/ComidasCont");

const router = Router();


router.get ("/comidas", getComidas);
router.put ("/comidas", putComidas);
router.post ("/comidas", createComida)
/*

router.post ("/createMedico", postMedico);
router.delete ("borrarMedico/:id", deleteMedico); */



module.exports = router;