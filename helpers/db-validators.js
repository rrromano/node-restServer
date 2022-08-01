const { Role, Usuario, Categoria, Producto } = require('../models')

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}
const emailExiste = async (correo = '') => {
    const existeMail = await Usuario.findOne({ correo })
    if (existeMail) {
        throw new Error(`El mail ${correo} ya existe en la BD`)
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`)
    }
}

const existeCategoriaPorId = async (id) => {
    if (id) {
        const existeCategoria = await Categoria.findById(id)
        if (!existeCategoria) {
            throw new Error(`El id no existe ${id}`)
        }
    }
}

const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id)
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}
