const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios')
const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
} = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')

router.get(
    '/',
    check('limite', 'El queryParam limite debe ser numérico').isNumeric(),
    check('desde', 'El queryParam desde debe ser numérico').isNumeric(),
    validarCampos,
    usuariosGet
)

router.post(
    '/',
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de al menos 6 letras').isLength({
        min: 6
    }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos,
    usuariosPost
)

router.put(
    '/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos,
    usuariosPut
)

router.patch('/', usuariosPatch)

router.delete(
    '/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
    usuariosDelete
)

module.exports = router
