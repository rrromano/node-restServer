const { Categoria } = require('../models')

const obtenerCategorias = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .limit(limite)
            .skip(desde)
            .populate('usuario', 'nombre')
    ])

    res.json({
        total,
        categorias
    })
}

//obtenerCategoria - populate
const obtenerCategoria = async (req, res) => {
    const { id } = req.params
    const categoria = await (
        await Categoria.findById(id)
    ).populate('usuario', 'nombre')
    res.json(categoria)
}

const crearCategoria = async (req, res) => {
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({ nombre })

    if (categoriaDB) {
        return res
            .status(400)
            .json({ msg: `La categoría ${categoriaDB.nombre}, ya existe` })
    }

    //Generar la data a guardar
    const usuario = req.usuario._id
    const categoria = new Categoria({ nombre, usuario })
    await categoria.save()

    res.status(201).json({ categoria })
}

const actualizarCategoria = async (req, res) => {
    const { id } = req.params
    const nombre = req.body.nombre.toUpperCase()
    const usuario = req.usuario._id
    const newCategoria = {
        nombre,
        usuario
    }

    const categoria = await Categoria.findByIdAndUpdate(id, newCategoria, {
        new: true
    })
    res.json(categoria)
}

const borrarCategoria = async (req, res) => {
    const { id } = req.params
    const categoria = await Categoria.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
    )
    res.json(categoria)
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}
