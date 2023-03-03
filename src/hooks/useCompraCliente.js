import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerCompras = async (idCliente, token) => {
    const result = await api.get(`/compra_c/${idCliente}`, { headers: { "x-access-token" : token } })
    return result.data
}

const obtenerCompra = async (idCliente, idCompra, token) => {
    const result = await api.get(`/compra_c/${idCliente}/${idCompra}`, { headers: { "x-access-token" : token } })
    return result.data
}

export const registrarCompra = async ({ token, datos }) => {
    return await api.post("/compra_c", {
        idCliente : datos.idCliente,
        totalCompra : datos.totalCompra,
        cursos : datos.cursos
    }, { headers : { "x-access-token" : token } })
}

export const autorizarCurso = async ({ token, datos }) => {
    return await api.patch(`/compra_c_autorizar/${datos.idCurso}`, {
        idCliente: datos.idCliente,
        codigo: datos.codigo
    }, 
    { headers: { "x-access-token" : token } })
}

export const useObtenerCompras = (idCliente, token) => {
    return useQuery(["getComprasC", idCliente, token], () => obtenerCompras(idCliente, token))
}

export const useObtenerCompra = (idCliente, idCompra, token) => {
    return useQuery(["getCompraC", idCliente, idCompra, token], () => obtenerCompra(idCliente, idCompra, token))
}