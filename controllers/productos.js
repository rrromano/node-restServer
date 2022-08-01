const { Producto } = require('../models')

const obtenerProductos = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .limit(limite)
            .skip(desde)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ])

    res.json({
        total,
        productos
    })
}

const obtenerProducto = async (req, res) => {
    const { id } = req.params
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
    res.json(producto)
}

const crearProducto = async (req, res) => {
    const { nombre, precio, categoria, descripcion = '' } = req.body
    const nombreDB = nombre.toUpperCase()
    const productoDB = await Producto.findOne({ nombre: nombreDB })

    if (productoDB) {
        return res
            .status(400)
            .json({ msg: `El producto ${productoDB.nombre}, ya existe` })
    }

    //Generar la data a guardar
    const data = {
        nombre: nombreDB,
        usuario: req.usuario._id,
        precio,
        categoria,
        descripcion
    }
    const producto = new Producto(data)
    await producto.save()

    res.status(201).json({ producto })
}

const actualizarProducto = async (req, res) => {
    const { id } = req.params
    const { nombre, precio, categoria, descripcion, disponible } = req.body
    const usuario = req.usuario._id
    const newProducto = {
        usuario
    }

    if (nombre) newProducto.nombre = nombre.toUpperCase()
    if (precio) newProducto.precio = precio
    if (categoria) newProducto.categoria = categoria
    if (descripcion) newProducto.descripcion = descripcion
    if (disponible !== undefined) newProducto.disponible = disponible

    const producto = await Producto.findByIdAndUpdate(id, newProducto, {
        new: true
    })
    res.json(producto)
}

const borrarProducto = async (req, res) => {
    const { id } = req.params
    const producto = await Producto.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
    )
    res.json(producto)
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}
