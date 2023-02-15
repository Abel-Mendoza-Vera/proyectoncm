import { useQuery } from "@tanstack/react-query";
import { api } from "../api/novatec";

const obtenerCursos = async () => {
    const result = await api.get("/curso")
    return result.data;
}

export const useObtenerCursos = () => {
    return useQuery(["getCursos"], () => obtenerCursos())
}