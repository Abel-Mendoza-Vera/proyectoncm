import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerUsuarios = async (token) => {
    const result = await api.get("/usuario", {
        headers: { "x-access-token": token }
    })

    return result.data;
}

const obtenerUsuarioPorId = async (token, id) => {
    const result = await api.get(`/usuario/${id}`, {
        headers: { "x-access-token": token }
    })
    return result.data;
}

const crearUsuario = async (token, usuario) => {
    const result = await api.post("/usuario", {
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
        roles: usuario.roles
    }, {
        headers: { "x-access-token": token }
    });

    return result.data;
}

const modificarUsuario = async (token, id, usuario) => {
    const result = await api.patch(`/usuario/${id}`, {
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
        roles: usuario.roles
    }, {
        headers: { "x-access-token": token }
    });

    return result.data;
}

const cambiarEstatusUsuario = async (token, id) => {
    const result = await api.delete(`/usuario/${id}`, {
        headers: { "x-access-token": token }
    })
}

export const useObtenerUsuarios = (token) => {
    return useQuery(['getUsuarios', token], () => obtenerUsuarios(token))
}

export const useObtenerUsuarioPorId = (token, id) => {
    return useQuery(['getUsuarioId', token, id], () => obtenerUsuarioPorId(token, id))
}

export const useCrearUsuario = (token, usuario) => {
    return useQuery(['createUsuario', token, usuario], () => crearUsuario(token, usuario))
}

export const useModificarUsuario = (token, id, usuario) => {
    return useQuery(['updateUsuario', token, id, usuario], () => modificarUsuario(token, id, usuario))
}

export const useCambiarEstatusUsuario = (token, id) => {
    return useQuery(['deleteUsuario', token, id], () => cambiarEstatusUsuario(token, id))
}