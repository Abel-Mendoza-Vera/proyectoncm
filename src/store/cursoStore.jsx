import { create } from "zustand";
import { persist } from 'zustand/middleware'
import axios from "axios";
import { urlCursos } from '../api/rutas.api'

export const useCursoStore = create(persist(

    (set, get) => ({

        cursos: [],

        getCursos: async () => {
            const response = await axios.get(urlCursos)

            if (response.status == 200) {
                set({ cursos: response.data })
            }
            else {
                set({ cursos: [] })
            }
        },

        saveCurso: async (
            nombre, precio, descripcion, objetivos, duracion
        ) => {

            const response = await axios.post(urlCursos,
                {
                    nombre: nombre,
                    objetivos: objetivos,
                    descripcion: descripcion,
                    precio: precio,
                    duracion: duracion,
                    idVideo: 0,
                    idMiniatura: 0
                })

            if (response.status != 500) {
                set((state) => ({ cursos: [...state.cursos, response.data] }))
            }
            return response.status

        },

        modifyCurso: async (id, nombre, precio, descripcion, objetivos, duracion) => {
            const response = await axios.patch(`${urlCursos}/${id}`, {
                nombre: nombre,
                objetivos: objetivos,
                descripcion: descripcion,
                precio: precio,
                duracion: duracion
            })

            if (response.status == 200) {
                set((state) => ({
                    cursos: state.cursos.map((curso) => {

                        if (curso.idCurso == id) {

                            curso.nombre = nombre
                            curso.objetivos = objetivos
                            curso.descripcion = descripcion
                            curso.precio = precio
                            curso.duracion = duracion

                        }
                        return curso
                    })
                }))
            }

            return response.status
        },

        deleteCurso: async (id) => {

            const response = await axios.delete(`${urlCursos}/${id}/0`)

            if (response.status == 204) {
                set((state) => ({
                    cursos: state.cursos.map((curso) => {

                        if (curso.idCurso == id) {
                            curso.estatus = 0
                        }
                        return curso
                    })
                }))
            }

            return response.status;

        },

        activeCurso: async (id) => {
            const response = await axios.delete(`${urlCursos}/${id}/1`)

            if (response.status == 204) {
                set((state) => ({
                    cursos: state.cursos.map((curso) => {

                        if (curso.idCurso == id) {
                            curso.estatus = 1
                        }
                        return curso
                    })
                }))
            }

            return response.status;
        },

    }),

    {
        name: "curso-storage"
    }
))