import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerPreguntas = async (token) => {
    const result = await api.get("/pregunta", { headers: { 'x-access-token': token } })
    return result.data
}

// Exportaciones

export const useObtenerPreguntas = (token) => {
    return useQuery(["getPreguntas", token], () => obtenerPreguntas(token))
}

export const crearPregunta = async ({ token, pregunta }) => {
    return await api.post("/pregunta", {
        idCuestionario: pregunta.idCuestionario,
        enunciado: pregunta.enunciado,
        respuesta_correcta: pregunta.respuesta_correcta,
        respuesta1: pregunta.respuesta1,
        respuesta2: pregunta.respuesta2,
        respuesta3: pregunta.respuesta3,
        respuesta4: pregunta.respuesta4
    },
    {
        headers: { 'x-access-token': token }
    })
}

export const modificarPregunta = async ({ token, idPregunta, pregunta }) => {
    return await api.patch(`/pregunta/${idPregunta}`, {
        enunciado: pregunta.enunciado,
        respuesta_correcta: pregunta.respuesta_correcta,
        respuesta1: pregunta.respuesta1,
        respuesta2: pregunta.respuesta2,
        respuesta3: pregunta.respuesta3,
        respuesta4: pregunta.respuesta4
    },{
        headers: { 'x-access-token': token }
    })
}

export const eliminarPregunta = async ({ token, idPregunta }) => {
    return await api.delete(`/pregunta/${idPregunta}`, { headers: { "x-access-token": token } })
}