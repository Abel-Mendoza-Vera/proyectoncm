import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerArchivos = async () => {
    const result = await api.get("/archivo")
    return result.data;
}

const obtenerArchivoPorLeccion = async (idLeccion) => {
    const result = await api.get(`/archivo_leccion/${idLeccion}`)
    return result.data;
}

export const crearArchivo = async ({ token, archivo }) => {
    return await api.post("/archivo", {
        nombre: archivo.nombre,
        extencion: archivo.extencion,
        url: archivo.url
    },
        {
            headers: { "x-access-token": token }
        })
}

export const modificarArchivo = async ({ token, id, archivo }) => {
    return await api.patch(`/archivo/${id}`, {
        nombre: archivo.nombre,
        extencion: archivo.extencion,
        url: archivo.url
    },
        {
            headers: { "x-access-token": token }
        })
}

export const crearArchivoLeccion = async ({ token, idArchivo, idLeccion }) => {
    return await api.post(`/archivo_leccion`, {
        idArchivo: idArchivo,
        idLeccion: idLeccion
    },
        {
            headers: { "x-access-token": token }
        })
}

export const eliminarArchivo = async ({ token, id }) => {
    return await api.delete(`/archivo/${id}`, { headers: { "x-access-token": token } })
}
export const eliminarArchivoLeccion = async ({ token, id }) => {
    return await api.delete(`/archivo_leccion/${id}`, { headers: { "x-access-token": token } })
}

export const useObtenerArchivos = () => {
    return useQuery(["getArchivos"], () => obtenerArchivos())
}

export const useObtenerArchivoPorLeccion = (idLeccion) => {
    return useQuery(["getArchivoLeccion", idLeccion], () => obtenerArchivoPorLeccion(idLeccion))
}
 