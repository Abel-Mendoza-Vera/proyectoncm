import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerCursosCliente = async (token, idCliente) => {
    const result = await api.get(`/curso_cliente/${idCliente}`, { headers: { "x-access-token" : token } })
    return result.data
}

const obtenerCursoCliente = async (token, idCliente, idCurso) => {
    const result = await api.get(`/curso_cliente/${idCliente}/${idCurso}`, { headers: { "x-access-token" : token } })
    return result.data;
}

export const useObtenerCursosCliente = (token, idCliente) => {
    return useQuery(["getCursosCliente", token, idCliente], () => obtenerCursosCliente(token, idCliente))
}

export const useObtenerCursoCliente = (token, idCliente, idCurso) => {
    return useQuery(["getCursoCliente", token, idCliente, idCurso], () => obtenerCursoCliente(token, idCliente, idCurso))
}

export const modificarCursoCliente = async ({token, idRelacion, curso}) => {

    return await api.patch(`/curso_cliente/${idRelacion}`, {
        fechaFinalizacionCurso: curso.fechaFinalizacionCurso,
        finalizado: curso.finalizado,
        ultimaConexion: curso.ultimaConexion
    }, { headers: { "x-access-token" : token } })

}

export const activarCursoCliente = async ({token, idRelacion, codigoAutorizacion}) => {

    return await api.put(`/curso_cliente/${idRelacion}`, {
        codigoAutorizacion: codigoAutorizacion
    }, { headers: { "x-access-token" : token } })

}