const { Usuario, Categoria, Producto } = require('../models')

const { ObjectId } = require('mongoose').Types
const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles']

const buscarUsuarios = async (termino = '', res) => {
    const esMongoID = ObjectId.isValid(termino)
    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        return res.json({ results: usuario ? [usuario] : [] })
    }

    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    })
    res.json({ results: usuarios })
}

const buscarCategorias = async (termino = '', res) => {
    const esMongoID = ObjectId.isValid(termino)
    if (esMongoID) {
        const categoria = await Categoria.findById(termino)
        return res.json({ results: categoria ? [categoria] : [] })
    }

    const regex = new RegExp(termino, 'i')
    const categorias = await Categoria.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    })
    res.json({ results: categorias })
}

const buscarProductos = async (termino = '', res) => {
    const esMongoID = ObjectId.isValid(termino)
    if (esMongoID) {
        const producto = await Producto.findById(termino).populate(
            'categoria',
            'nombre'
        )
        return res.json({ results: producto ? [producto] : [] })
    }

    const regex = new RegExp(termino, 'i')
    const productos = await Producto.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    }).populate('categoria', 'nombre')
    res.json({ results: productos })
}

const buscar = async (req, res) => {
    const { coleccion, termino } = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {
        res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            await buscarUsuarios(termino, res)
            break
        case 'categorias':
            await buscarCategorias(termino, res)
            break
        case 'productos':
            await buscarProductos(termino, res)
            break
        default:
            res.status(500).json({ msg: 'No se permite esta busqueda' })
    }
}

module.exports = {
    buscar
}
