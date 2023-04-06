import moment from "moment"

export const validarUsuario = ( datos ) => {
    
    let pasaValidacion = true
    let mensaje = "Todo bien."

    if(!validarNombre(datos.nombre)){
        pasaValidacion = false
        mensaje = "El nombre solo puede contener letras."
    }

    if(!validarApellido(datos.primerApellido, false)){
        pasaValidacion = false
        mensaje = "El primer apellido solo puede contener letras."
    }

    if(!validarApellido(datos.segundoApellido, true)){
        pasaValidacion = false
        mensaje = "El segundo apellido solo puede contener letras."
    }

    if(!validarFechaNacimiento(datos.fechaNac)){
        pasaValidacion = false
        mensaje = "El usuario debe ser mayor de 18 años de edad."
    }

    if(!validarCURP(datos.curp)){
        pasaValidacion = false
        mensaje = "El CURP debe contener 18 caracteres y tener la estructura correcta."
    }

    if(!validarCorreo(datos.correo)){
        pasaValidacion = false
        mensaje = "El correo no tiene una estructura correcta."
    }

    if(datos.contrasenia){
        if(!validarContrasenia(datos.contrasenia)) {
            pasaValidacion = false
            mensaje = "La contraseña debe contener de 8 a 20 caracteres. Se puede utilizar letras, números y los caracteres '$', '&', '-' y '_'."
        }
    }

    if(!validarTelefono(datos.telefono)) {
        pasaValidacion = false
        mensaje = "El telefono debe contener 10 digitos."
    }

    return { pasaValidacion, mensaje }

}

const validarNombre = (nombre) => {

    let strNombre = new String(nombre)
    strNombre = strNombre.replace(" ", "")

    let numCaracteres = strNombre.length

    if(numCaracteres == 0) return false
    if(numCaracteres >= 100) return false

    for (let i = 0; i < numCaracteres; i++) {
        const codigoAscii = strNombre.charCodeAt(i)
        
        if( (codigoAscii >= 65 && codigoAscii <= 90) || (codigoAscii >= 97 && codigoAscii <= 122) || (codigoAscii >= 192  && codigoAscii <= 246) || (codigoAscii >= 248 && codigoAscii <= 255)){
            continue
        }
        else{
            return false
        }
    }
    return true
}

const validarApellido = (apellido, segundo) => {
    
    if(segundo && apellido.length == 0) return true

    let strApellido = new String(apellido)
    strApellido = strApellido.replace(" ", "")

    let numCaracteres = strApellido.length

    if(numCaracteres == 0) return false
    if(numCaracteres >= 100) return false

    for (let i = 0; i < numCaracteres; i++) {
        const codigoAscii = strApellido.charCodeAt(i)
        
        if( (codigoAscii >= 65 && codigoAscii <= 90) || (codigoAscii >= 97 && codigoAscii <= 122) || (codigoAscii >= 192  && codigoAscii <= 246) || (codigoAscii >= 248 && codigoAscii <= 255)){
            continue
        }
        else{
            return false
        }
    }
    return true

}

const validarFechaNacimiento = (fechaNac) => {
    let fechaActual = moment()
    let fechaNacimineto = moment(fechaNac)

    const edad = fechaActual.diff(fechaNacimineto, "years")

    if(edad < 18) return false

    return true

}

const validarCURP = (curp) => {

    let strCURP = new String(curp.toUpperCase())

    let numCaracteres = strCURP.length

    if(numCaracteres == 0) return true

    if(numCaracteres != 18) return false

    let re = /[A-Z]{4}[0-9]{6}[A-Z]{6}[A-Z-0-9]{2}/g;
    const forma = strCURP.match(re)

    if(!forma) return false

    return true

}

const validarCorreo = (correo) => {

    let strCorreo = new String(correo)
    let numCaracteres = strCorreo.length

    if(numCaracteres == 0) return false

    let re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/g
    const forma = strCorreo.match(re)

    if(!forma) return false

    return true

}

const validarContrasenia = (contrasenia) => {

    let strContrasenia = new String(contrasenia)
    let numCaracteres = strContrasenia.length

    if(numCaracteres < 8 || numCaracteres > 20) return false

    for (let i = 0; i < numCaracteres; i++) {
        const codigoAscii = strContrasenia.charCodeAt(i)
        
        if( (codigoAscii >= 48 && codigoAscii <= 57) || (codigoAscii >= 65 && codigoAscii <= 90) || (codigoAscii >= 97 && codigoAscii <= 122) || (codigoAscii == 36) || (codigoAscii == 38) || (codigoAscii == 45) || (codigoAscii == 95) ){
            continue
        }
        else{
            return false
        }
    }

    return true

}

const validarTelefono = (telefono) => {
    let strTelefono = new String(telefono)
    let numCaracteres = strTelefono.length

    if(numCaracteres != 10) return false

    for (let i = 0; i < numCaracteres; i++) {
        const codigoAscii = strTelefono.charCodeAt(i)

        if(codigoAscii >= 48 && codigoAscii <= 57){
            continue
        }
        else{
            return false
        }
        
    }
    return true

}


