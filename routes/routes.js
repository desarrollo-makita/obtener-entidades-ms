const express = require('express');
const router = express.Router();
const { obtenerEntidades } = require('../controllers/obtenerEntidadesControllers');

router.get('/obtener-entidades', obtenerEntidades);

module.exports = router;
