import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerCompras = async (token) => {
    const result = await api.get(`/compra`, { headers: { "x-access-token" : token } })
    return result.data
}

const obtenerCompra = async (idCompra, token) => {
    const result = await api.get(`/compra/${idCompra}`, { headers: { "x-access-token" : token } })
    return result.data
}

const obtenerCodigosAutorizacion = async (idCliente, idCompra, token) => {
    const result = await api.get(`/compra/${idCliente}/${idCompra}`, { headers: { "x-access-token" : token } })
    return result.data
}

export const cambiarEstatusCompra = async ({ token, datos }) => {
    return await api.patch(`/compra/${datos.idCompra}/${datos.estatus}`, {}, { headers: { "x-access-token" : token } })
}

export const useObtenerCompras = (token) => {
    return useQuery(["getComprasC", token], () => obtenerCompras(token))
}

export const useObtenerCompra = (idCompra, token) => {
    return useQuery(["getCompraC", idCompra, token], () => obtenerCompra(idCompra, token))
}
export const useObtenerCodigosAutorizacion = (idCliente, idCompra, token) => {
    return useQuery(["getCodigosAuth", idCliente, idCompra, token], () => obtenerCodigosAutorizacion(idCliente, idCompra, token))
}