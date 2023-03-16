import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";


const obtenerCalificacionesClientePorCurso = async (token, idCliente, idCurso) => {
    const result = await api.get(`/calificacion/${idCliente}/${idCurso}`, { headers: { "x-access-token": token } })
    console.log(result.data.length);
    return result.data
}

export const useObtenerCalificacionesClientePorCurso = (token, idCliente, idCurso) => {
    return useQuery(["getCalifClienteCurso", token, idCliente, idCurso], () => obtenerCalificacionesClientePorCurso(token, idCliente, idCurso))
}

export const registrarCalificacion = async ({token, datos}) => {
    const result = await api.post("/calificacion", {
        idCuestionario: datos.idCuestionario,
        idCurso: datos.idCurso,
        idLeccion: datos.idLeccion,
        idCliente: datos.idCliente,
        calificacion: datos.calificacion
    }, { headers: { "x-access-token": token } })

    return result
}

export const modificarCalificacion = async ({token, idCalificacion, calificacion}) => {
    const result = await api.patch(`/calificacion/${idCalificacion}`, {
        calificacion
    }, { headers: { "x-access-token": token } })

    return result
}