const { Router } = require('express')
const { check } = require('express-validator')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos')
const {
    existeCategoriaPorId,
    existeProductoPorId
} = require('../helpers/db-validators')
const {
    precioIsNumeric,
    disponibleIsBoolean
} = require('../helpers/validar-producto')

const router = Router()

//Obtener todos los productos - publico
router.get('/', obtenerProductos)

//Obtener un producto por id - publico
router.get(
    '/:id',
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
    obtenerProducto
)

//Crear producto - privado - cualquier persona con un token válido
router.post(
    '/',
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    check('precio').custom(precioIsNumeric),
    validarCampos,
    crearProducto
)

//Actualizar un producto por id - privado - cualquier persona con un token válido
router.put(
    '/:id',
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio').custom(precioIsNumeric),
    check('categoria').custom(existeCategoriaPorId),
    check('disponible').custom(disponibleIsBoolean),
    validarCampos,
    actualizarProducto
)

//Borrar un producto por id - publico - Admin
router.delete(
    '/:id',
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
    borrarProducto
)

module.exports = router
