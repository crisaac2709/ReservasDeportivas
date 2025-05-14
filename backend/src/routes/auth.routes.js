const express = require('express')
const router = express.Router()

const {registrarUsuario, loginUsuario, obtenerUsuarios} = require('../controllers/auth.controller')

router.post('/auth/registro', registrarUsuario)
router.post('/auth/login', loginUsuario)
router.get('/auth/usuarios', obtenerUsuarios)

module.exports = router