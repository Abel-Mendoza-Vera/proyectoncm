import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerCursos = async () => {
    const result = await api.get("/curso")
    return result.data;
}

export const useObtenerCursos = () => {
    return useQuery(["getCursos"], () => obtenerCursos())
}

const obtenerCursoPorId = async (id) => {
    const result = await api.get(`/curso/${id}`)
    return result.data;
}

export const useObtenerCursoPorId = (id) => {
    return useQuery(["getCurso", id], () => obtenerCursoPorId(id))
}

export const crearCurso = async ({ token, curso }) => {
    return await api.post("/curso", {
        nombre: curso.nombre,
        objetivos: curso.objetivos,
        descripcion: curso.descripcion,
        precio: curso.precio,
        duracion: curso.duracion,
        idVideo: 0,
        idMiniatura: 0
    }, { headers: { "x-access-token": token } })
}

export const modificarCurso = async ({ token, id, curso }) => {
    return await api.patch(`/curso/${id}`, {
        nombre: curso.nombre,
        objetivos: curso.objetivos,
        descripcion: curso.descripcion,
        precio: curso.precio,
        duracion: curso.duracion
    }, { headers: { "x-access-token": token } })
}

export const modificarCursoImagen = async ({ token, idCurso, idImagen }) => {
    return await api.patch(`/curso/${idCurso}`, { idMiniatura : idImagen }, { headers: { "x-access-token": token } })
}

export const modificarCursoVideo = async ({ token, idCurso, idVideo }) => {
    return await api.patch(`/curso/${idCurso}`, { idVideo : idVideo }, { headers: { "x-access-token": token } })
}

export const cambiarEstadoCurso = async ({ token, id, operacion }) => {
    return await api.delete(`/curso/${id}/${operacion}`, { headers: { "x-access-token": token } })
}