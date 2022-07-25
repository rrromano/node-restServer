const bcryptjs = require('bcryptjs')

const { generarJWT } = require('../helpers/generar-JWT')
const Usuario = require('../models/usuario')

const login = async (req, res) => {
    const { correo, password } = req.body

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //Si el usuario esta activo
        if (!usuario.estado) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //Verificar la contrasena
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}
