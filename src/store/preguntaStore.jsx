import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { urlPreguntas } from "../api/rutas.api";

export const usePreguntaStore = create(persist(
    (set, get) => ({

        preguntas: [],

        getPreguntas: async () => {

            const response = await axios.get(urlPreguntas)

            if (response.status == 200) {
                set({ preguntas: response.data })
            }
            else {
                set({ preguntas: [] })
            }

        },

        savePregunta: async (idCuestionario, enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4) => {

            const response = await axios.post(urlPreguntas, {
                idCuestionario: idCuestionario,
                enunciado: enunciado,
                respuesta_correcta: respuesta_correcta,
                respuesta1: respuesta1,
                respuesta2: respuesta2,
                respuesta3: respuesta3,
                respuesta4: respuesta4
            })

            if (response.status != 500) {
                set((state) => ({ preguntas: [...state.preguntas, response.data] }))
            }

            return response.status
        },

        modifyPregunta: async (idPregunta, enunciado, respuesta_correcta, respuesta1, respuesta2, respuesta3, respuesta4) => {

            const response = await axios.patch(`${urlPreguntas}/${idPregunta}`, {
                enunciado: enunciado,
                respuesta_correcta: respuesta_correcta,
                respuesta1: respuesta1,
                respuesta2: respuesta2,
                respuesta3: respuesta3,
                respuesta4: respuesta4
            })

            if (response.status == 200) {
                set((state) => ({
                    preguntas: state.preguntas.map((pregunta) => {
                        if (pregunta.idPregunta == idPregunta) {
                            pregunta.enunciado = enunciado
                            pregunta.respuesta_correcta = respuesta_correcta
                            pregunta.respuesta1 = respuesta1
                            pregunta.respuesta2 = respuesta2
                            pregunta.respuesta3 = respuesta3
                            pregunta.respuesta4 = respuesta4
                        }
                        return pregunta
                    })
                }))
            }

            return response.status

        },
        deletePregunta: async (idPregunta) => {

            const response = await axios.delete(`${urlPreguntas}/${idPregunta}`)

            if (response.status == 204) {
                /**set((state) => ({
                    preguntas: state.preguntas.map((pregunta) => {

                        if (pregunta.idPregunta != idPregunta) {
                            return pregunta
                        }
                    })
                }))*/
            }

            return response.status;

        },

    }),
    {
        name: "preguntas-storage"
    }
))