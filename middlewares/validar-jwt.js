const jwt = require('jsonwebtoken')
const { Usuario } = require('../models')

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token')
    if (!token) {
        res.status(401).json({ msg: 'No hay token en la petición' })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        //Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid)

        //Verificar si el usuario existe
        if (!usuario) {
            res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }

        //Verificar si el usuario tiene estado true
        if (!usuario.estado) {
            res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            })
        }

        req.usuario = usuario
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'Token no valido' })
    }
}

module.exports = { validarJWT }
