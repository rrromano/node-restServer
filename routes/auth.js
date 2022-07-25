const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { login } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')

router.post(
    '/login',
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
    login
)

module.exports = router
