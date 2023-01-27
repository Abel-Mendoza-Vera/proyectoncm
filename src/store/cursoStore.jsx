import { create } from "zustand";
import axios from "axios";
import { urlCursos } from '../api/rutas.api'

export const useCursoStore = create((set) => ({

    cursos: [],

    getCursos: async () => {
        const response = await axios.get(urlCursos)

        if ( response.status == 200 ) {
            set({ cursos : response.data })
        }
        else{
            set({ cursos : [] })
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
            
            if ( response.status != 500 ){
                set((state) => ({ cursos: [ ...state.cursos, response.data ] }))
            }
            return response.status

        },

    deleteCurso: async (id) => {

        const response = await axios.delete(`${urlCursos}/${id}/0`)

        if(response.status == 204){
            set((state) => ({
                cursos: state.cursos.map((curso) => {
                    
                    if(curso.idCurso == id){
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

        if(response.status == 204){
            set((state) => ({
                cursos: state.cursos.map((curso) => {
                    
                    if(curso.idCurso == id){
                        curso.estatus = 1
                    }
                    return curso
                })
            }))
        }

        return response.status;
    },

}))