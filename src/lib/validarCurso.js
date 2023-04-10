
export const validarCurso = (datos) => {

    let pasaValidacion = true
    let mensaje = "Todo bien."

    if(!validarTexto(datos.nombre, 100)){
        pasaValidacion = false
        mensaje = "El nombre del curso puede tener un maximo de 100 caracteres."
    }

    if(!validarTexto(datos.objetivos, 150)){
        pasaValidacion = false
        mensaje = "El objetivo del curso puede tener un maximo de 150 caracteres."
    }

    if(!validarTexto(datos.descripcion, 750)){
        pasaValidacion = false
        mensaje = "La descripción del curso puede tener un maximo de 750 caracteres."
    }

    if(!validarDuracion(datos.duracion)) {
        pasaValidacion = false
        mensaje = "La duración del curso debe ser indicada en números enteros positivos."
    }

    if(!validarPrecio(datos.precio)) {
        pasaValidacion = false
        mensaje = "La precio del curso debe ser indicado en números positivos y mayor a 1 peso MXN."
    }

    return { pasaValidacion, mensaje }
}

export const validarLeccion = (datos) => {

    let pasaValidacion = true
    let mensaje = "Todo bien."

    if(!validarTexto(datos.nombre, 100)){
        pasaValidacion = false
        mensaje = "El nombre de la lección puede tener un maximo de 100 caracteres."
    }

    if(!validarTexto(datos.informacion, 1500)){
        pasaValidacion = false
        mensaje = "La información de la lección puede tener un maximo de 1500 caracteres."
    }

    return { pasaValidacion, mensaje }

}

const validarTexto = (texto, maxCaracteres) => {
    
    let strTexto = new String(texto)
    let numCaracteres = strTexto.length

    if(numCaracteres == 0 || numCaracteres > maxCaracteres) return false

    for (let i = 0; i < numCaracteres; i++) {
        const codigoAscii = strTexto.charCodeAt(i)
        
        if( (codigoAscii >= 32 && codigoAscii <= 57) || (codigoAscii >= 65 && codigoAscii <= 90) || (codigoAscii >= 97 && codigoAscii <= 122) || (codigoAscii >= 192  && codigoAscii <= 246) || (codigoAscii >= 248 && codigoAscii <= 255)){
            continue
        }
        else{
            return false
        }
    }

    return true
}

const validarDuracion = (duracion) => {

    let strDuracion = new String(duracion)

    if( strDuracion.includes(".") || strDuracion.includes(",") || strDuracion.includes("-") || strDuracion.includes("e") ) return false

    let numDuracion = new Number(duracion)
    
    if(numDuracion == 0) return false

    return true

}

const validarPrecio = (precio) => {
    let strPrecio = new String(precio)

    if( strPrecio.includes(",") || strPrecio.includes("-") || strPrecio.includes("e") ) return false

    let numPrecio = new Number(precio)

    if(numPrecio == 0) return false

    return true
}
