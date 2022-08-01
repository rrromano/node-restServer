const precioIsNumeric = async (precio) => {
    if (precio !== undefined && isNaN(precio)) {
        throw new Error(`El precio ${precio} no es numérico`)
    }
}

const disponibleIsBoolean = async (disponible) => {
    if (disponible !== undefined && typeof disponible !== 'boolean') {
        throw new Error(`El parametro disponible ${disponible} no es booleano`)
    }
}

module.exports = { precioIsNumeric, disponibleIsBoolean }
