import { useQuery } from '@tanstack/react-query';
import { api } from '../api/novatec';

export const registrarCliente = async ({usuario}) => {
    const result = await api.post("/registro", {
        nombre: usuario.nombre,
        primerApellido: usuario.primerApellido,
        segundoApellido: usuario.segundoApellido,
        ultimoGradoEstudio: usuario.ultimoGradoEstudio,
        fechaNac: usuario.fechaNac,
        genero: usuario.genero,
        curp: usuario.curp,
        telefono: usuario.telefono,
        imagen: usuario.imagen,
        correo: usuario.correo,
        contrasenia: usuario.contrasenia,
    }  );

    return result;
}

const iniciarSesion = async (usuario) => {

    const result = await api.post("/acceso", {
        correo : usuario.correo,
        contrasenia: usuario.contrasenia
    })

    return result.data

}

const perfil = async ( token ) => {

    const result = await api.get("/perfil", {
        headers:{ "x-access-token": token }
    })

    return result.data;

}



export const useIniciarSesion = (usuario) => {
    return useQuery(['signin', usuario], () => iniciarSesion(usuario))
}

export const usePerfil = (token) => {
    return useQuery(["perfil", token], () => perfil(token))
}