import { create } from "zustand";
import { persist } from 'zustand/middleware'
import axios from "axios";
import { urlCuestionarios } from '../api/rutas.api';

export const useCuestionarioStore = create(persist(
    (set, get) => ({
        cuestionarios: [],

        getCuestionarios: async () => {
            const response = await axios.get(urlCuestionarios)

            if (response.status == 200) {
                set({ cuestionarios: response.data })
            }
            else {
                set({ cuestionarios: [] })
            }

        },

        saveCuestionario: async (
            idCuestionario, nombre
        ) => {

            const response  = await axios.post(urlCuestionarios, {
                idCuestionario: idCuestionario,
                nombre: nombre
                        })

            if (response.status != 500){
                set((state) => ({ cuestionarios: [ ...state.cuestionarios, response.data ] }))
            }

        },

        modifyCuestionario: async ( idCuestionario, nombre ) => {

            const response = await axios.patch(`${urlCuestionarios}/${idCuestionario}`,{
                nombre: nombre,
            })

            if (response.status == 200){
                set((state) => ({
                    cuestionarios: state.cuestionarios.map((cuestionario) => {
                        if (cuestionario.idCuestionario == idLeccion){
                            cuestionario.nombre = nombre
                        }
                        return cuestionario
                    })
                }))
            }

            return response.status

        },

        deleteCuestioonario: async (idCuestionario) => {

            const response = await axios.delete(`${urlCuestionarios}/${idCuestionario}/0`)

            if (response.status == 204) {
                set((state) => ({
                    cuestionarios: state.cuestionarios.map((cuestionario) => {

                        if (cuestionario.idCuestionario == idCuestionario) {
                            cuestionario.estatus = 0
                        }
                        return cuestionario
                    })
                }))
            }

            return response.status;

        },

        activeCuestionario: async (idCuestionario) => {

            const response = await axios.delete(`${urlCuestionarios}/${idCuestionario}/1`)

            if (response.status == 204) {
                set((state) => ({
                    cuestionarios: state.cuestionarios.map((cuestionario) => {

                        if (cuestionario.idCuestionario == idCuestionario) {
                            cuestionario.estatus = 1
                        }
                        return cuestionario
                    })
                }))
            }

            return response.status;

        },

    }),
    {
        name: "cuestionario-storage"
    }
))