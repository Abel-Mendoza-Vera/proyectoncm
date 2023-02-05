import { create } from "zustand";
import axios from "axios";
import { persist } from 'zustand/middleware'
import { urlArchivos } from '../api/rutas.api';

export const useArchivoStore = create(persist(

    (set, get) => ({

        archivos: [],
        archivosByLeccion: [],

        getArchivos: async () => {

            const response = await axios.get(urlArchivos)

            if (response.status == 200) {
                set({ archivos: response.data })
            }
            else {
                set({ archivos: [] })
            }

        },

        getArchivosByLeccion: async (idLeccion) => {

            const response = await axios.get(`${urlArchivos}_leccion/${idLeccion}`)

            if (response.status == 200) {
                set({ archivosByLeccion: response.data })
            }
            else {
                set({ archivosByLeccion: [] })
            }

        },

        saveArchivo: async (nombre, extencion, url) => {

            const response = await axios.post(urlArchivos, {
                nombre: nombre,
                extencion: extencion,
                url: url
            })

            if (response.status != 500) {
                set((state) => ({ archivos: [...state.archivos, response.data] }))
                return response.data.idArchivo
            }
            else {
                return 0;
            }

        },

        saveArchivoLeccion: async(idArchivo, idLeccion) => {
            const response = await axios.post(`${urlArchivos}_leccion`,{
                idArchivo: idArchivo,
                idLeccion: idLeccion
            })
            return response.status
        },

        modifyArchivo: async (id, nombre, extencion, url) => {

            const response = await axios.patch(`${urlArchivos}/${id}`, {
                nombre: nombre,
                extencion: extencion,
                url: url
            })

            if (response.status == 200) {
                set((state) => ({
                    archivos: state.archivos.map((archivo) => {

                        if (archivo.idArchivo == id) {

                            archivo.nombre = nombre
                            archivo.extencion = extencion,
                            archivo.url = url

                        }
                        return archivo
                    })
                }))
            }

            return response.status
        },

        deleteArchivo: async (idArchivo) => {

            const response = await axios.delete(`${urlArchivos}/${idArchivo}`)
            return response.status

        },

        deleteArchivoLeccion: async (idArchivo) => {

            const response = await axios.delete(`${urlArchivos}_leccion/${idArchivo}`)
            return response.status

        }


    }),

    {
        name: "archivo-store"
    }
))