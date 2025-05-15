const express = require('express')
const router = express.Router()

const {ObtenerDeportes} = require('../controllers/deporte.controller')

router.get('/deportes', ObtenerDeportes)

module.exports = router