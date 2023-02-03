import { create } from "zustand";
import { persist } from 'zustand/middleware'
import axios from "axios";
import { urlLecciones } from '../api/rutas.api';

export const useLeccionStore = create(persist(
    (set, get) => ({
        lecciones: [],

        getLecciones: async () => {
            const response = await axios.get(urlLecciones)

            if (response.status == 200) {
                set({ lecciones: response.data })
            }
            else {
                set({ lecciones: [] })
            }

        },

        saveLeccion: async (
            idCurso, nombre, informacion
        ) => {

            const response  = await axios.post(urlLecciones, {
                idCurso: idCurso,
                nombre: nombre,
                informacion: informacion
            })

            if (response.status != 500){
                set((state) => ({ lecciones: [ ...state.lecciones, response.data ] }))
            }

        },

        modifyLeccion: async ( idLeccion, nombre, informacion ) => {

            const response = await axios.patch(`${urlLecciones}/${idLeccion}`,{
                nombre: nombre,
                informacion: informacion
            })

            if (response.status == 200){
                set((state) => ({
                    lecciones: state.lecciones.map((leccion) => {
                        if (leccion.idLeccion == idLeccion){
                            leccion.nombre = nombre
                            leccion.informacion = informacion
                        }
                        return leccion
                    })
                }))
            }

            return response.status

        },

        modifyLeccionVideo: async ( idLeccion, idVideo ) => {

            const response = await axios.patch(`${urlLecciones}/${idLeccion}`,{
                idVideo: idVideo
            })

            if (response.status == 200){
                set((state) => ({
                    lecciones: state.lecciones.map((leccion) => {
                        if (leccion.idLeccion == idLeccion){
                            leccion.idVideo = idVideo
                        }
                        return leccion
                    })
                }))
            }

            return response.status

        },

        deleteLeccion: async (idLeccion) => {

            const response = await axios.delete(`${urlLecciones}/${idLeccion}/0`)

            if (response.status == 204) {
                set((state) => ({
                    lecciones: state.lecciones.map((leccion) => {

                        if (leccion.idLeccion == idLeccion) {
                            leccion.estatus = 0
                        }
                        return leccion
                    })
                }))
            }

            return response.status;

        },

        activeLeccion: async (idLeccion) => {

            const response = await axios.delete(`${urlLecciones}/${idLeccion}/1`)

            if (response.status == 204) {
                set((state) => ({
                    lecciones: state.lecciones.map((leccion) => {

                        if (leccion.idLeccion == idLeccion) {
                            leccion.estatus = 1
                        }
                        return leccion
                    })
                }))
            }

            return response.status;

        },

    }),
    {
        name: "leccion-storage"
    }
))