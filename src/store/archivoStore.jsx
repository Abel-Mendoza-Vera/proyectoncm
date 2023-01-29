import { create } from "zustand";
import axios from "axios";
import { persist } from 'zustand/middleware'
import { urlArchivos } from '../api/rutas.api';

export const useArchivoStore = create(persist(

    (set, get) => ({

        archivos: [],

        getArchivos: async () => {

            const response = await axios.get(urlArchivos)

            if (response.status == 200) {
                set({ archivos: response.data })
            }
            else {
                set({ archivos: [] })
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


    }),

    {
        name: "archivo-store"
    }
))