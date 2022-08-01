const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')

const router = Router()

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//Obtener una categoria por id - publico
router.get(
    '/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
    obtenerCategoria
)

//Crear categoria - privado - cualquier persona con un token válido
router.post(
    '/',
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    crearCategoria
)

//Actualizar una categoria por id - privado - cualquier persona con un token válido
router.put(
    '/:id',
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    actualizarCategoria
)

//Borrar una categoria por id - publico - Admin
router.delete(
    '/:id',
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
    borrarCategoria
)

module.exports = router
