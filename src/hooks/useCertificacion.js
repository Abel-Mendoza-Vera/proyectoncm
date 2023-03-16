import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerCertificacionesCliente = async (token, idCliente) => {
    const result = await api.get(`/certificacion/${idCliente}`, { headers: { "x-access-token": token} })
    return result.data
}

export const useObtenerCertificacionesCliente = (token, idCliente) => {
    return useQuery(["getCertificaciones", token, idCliente], () => obtenerCertificacionesCliente(token, idCliente))
}

export const generarCertificado = async (token, idCertificacion) => {
    const result = await api.get(`/certificacion_gem/${idCertificacion}`, { headers: { "x-access-token": token} })
    return result.data
}

export const registrarCertificado = async ({token, datos}) => {
    const result = await api.post("/certificacion", {
        idCurso: datos.idCurso,
        idCliente: datos.idCliente
        }, {headers:{"x-access-token":token}})
    return result
}