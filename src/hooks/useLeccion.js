import { useQuery } from "@tanstack/react-query";

import { api } from "../api/novatec";

const obtenerLecciones = async () => {
    const result = await api.get("/leccion")
    return result.data
}

const obtenerLeccionesPorCurso = async (idCurso) => {
    const result = await api.get(`/leccion_curso/${idCurso}`)
    return result.data
}

const obtenerLeccion = async (idLeccion) => {
    const result = await api.get(`/leccion/${idLeccion}`)
    return result.data
}

// Exportaciones

export const useObtenerLecciones = () => {
    return useQuery(["getLecciones"], () => obtenerLecciones())
}

export const useObtenerLeccionesPorCurso = (idCurso) => {
    return useQuery(["getLeccionesCurso", idCurso], () => obtenerLeccionesPorCurso(idCurso))
}

export const useObtenerLeccion = (idLeccion) => {
    return useQuery(["getLeccion", idLeccion], () => obtenerLeccion(idLeccion))
}


export const crearLeccion = async({ token, leccion }) => {
    const result = await api.post("/leccion", {
        idCurso: leccion.idCurso,
        nombre: leccion.nombre,
        informacion: leccion.informacion
    },
    {
        headers: { "x-access-token": token }
    })

    return result
}

export const modificarLeccion = async({ token, idLeccion, leccion }) => {
    const result = await api.patch(`/leccion/${idLeccion}`, {
        nombre: leccion.nombre,
        informacion: leccion.informacion
    },
    {
        headers: { "x-access-token": token }
    })

    return result
}

export const modificarLeccionVideo = async({ token, idLeccion, idVideo }) => {
    const result = await api.patch(`/leccion/${idLeccion}`, {
        idVideo: idVideo
    },
    {
        headers: { "x-access-token": token }
    })

    return result
}

export const cambiarEstadoLeccion = async({ token, idLeccion, operacion }) => {
    const result = await api.delete(`/leccion/${idLeccion}/${operacion}`,
    {
        headers: { "x-access-token": token }
    })

    return result
}