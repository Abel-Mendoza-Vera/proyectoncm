import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerCuestionarios = async (token) => {
    const result = await api.get("/cuestionario", { headers: { "x-access-token": token } })
    return result.data
}

const obtenerCuestionarioPorLeccion = async (token, idLeccion) => {
    const result = await api.get(`/cuestionario_lec/${idLeccion}`, { headers: { "x-access-token": token } })
    return result.data
}

// Exportaciones

export const useObtenerCuestionarios = (token) => {
    return useQuery(["getCuestionarios", token], () => obtenerCuestionarios(token))
}

export const useObtenerCuestionarioPorLeccion = (token, idLeccion) => {
    return useQuery(["getCuestionariooPorLeccion", token, idLeccion], () => obtenerCuestionarioPorLeccion(token, idLeccion))
}

export const crearCuestionario = async ({ token, cuestionario }) => {
    return await api.post("/cuestionario", {
        idLeccion: cuestionario.idLeccion,
        nombre: cuestionario.nombre
    },
    {
        headers: { "x-access-token": token }
    })
}

export const modificarCuestionario = async ({ token, idCuestionario, cuestionario }) => {
    return await api.patch(`/cuestionario/${idCuestionario}`, {
        nombre: cuestionario.nombre
    },
    {
        headers: { 'x-access-token': token }
    })
}

export const cambiarEstadoCuestionario = async ({ token, idCuestionario, operacion }) => {
    return await api.delete(`/cuestionario/${idCuestionario}/${operacion}`, { headers: { 'x-access-token': token } })
}