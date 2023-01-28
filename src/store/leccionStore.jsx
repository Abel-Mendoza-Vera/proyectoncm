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

        addLeccion: (
            idLeccion, nombre, estatus, descripcion, idVideo,
        ) => set((state) => ({
            lecciones: [
                ...state.lecciones,
                {
                    idLeccion: idLeccion,
                    nombre: nombre,
                    estatus: estatus,
                    descripcion: descripcion,
                    idVideo: idVideo,
                }
            ]
        })),

        deleteLeccion: (id) => set((state) => ({
            lecciones: state.lecciones.map((leccion) => {

                if (leccion.idLeccion == id) {
                    leccion.estatus = 0
                }

                return leccion
            })
        })),

        activeLeccion: (id) => set((state) => ({
            lecciones: state.lecciones.map((leccion) => {

                if (leccion.idLeccion == id) {
                    leccion.estatus = 1
                }

                return leccion
            })
        })),
    }),
    {
        name: "leccion-store"
    }
))