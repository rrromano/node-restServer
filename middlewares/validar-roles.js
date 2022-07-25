const esAdminRole = (req, res, next) => {
    if (!req.usuario) {
        res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario

    if (rol !== 'ADMIN_ROLE') {
        res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer esto`
        })
    }
    next()
}

const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            res.status(500).json({
                msg: 'Se requiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}

module.exports = { esAdminRole, tieneRole }
