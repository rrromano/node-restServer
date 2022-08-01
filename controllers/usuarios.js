const bcryptjs = require('bcryptjs')
const { Usuario } = require('../models')

const usuariosGet = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    // const usuarios = await Usuario.find(query).limit(limite).skip(desde)

    // const total = await Usuario.countDocuments(query)

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).limit(limite).skip(desde)
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res) => {
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en DB
    await usuario.save()

    return res.json({ usuario })
}

const usuariosPut = async (req, res) => {
    const id = req.params.id
    const { _id, password, google, ...resto } = req.body

    //Encriptar la contraseña
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - Controlador'
    })
}

const usuariosDelete = async (req, res) => {
    const { id } = req.params
    const usuarioAutenticado = req.usuario

    //Se borra fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id)

    //Se borra logicamente
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json({ usuario, usuarioAutenticado })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
