import { create } from "zustand";
import axios from "axios";

export const useCursoStore = create((set) => ({

    cursos: [],

    getCursos: async () => {
        const response = await axios.get("http://localhost:3000/api/curso")

        if ( response.status == 200 ) {
            set({ cursos : response.data })
        }
        else{
            set({ cursos : [] })
        }
    },
    
    addCurso: (
        nombre, precio, estatus, descripcion, objetivos, duracion, idVideo, idMiniatura
        ) => set((state) => ({
        cursos: [
            ...state.cursos,
            {
                nombre: nombre,
                precio: precio,
                estatus: estatus,
                descripcion: descripcion,
                objetivos: objetivos,
                duracion: duracion,
                idVideo: idVideo,
                idMiniatura: idMiniatura
            }
        ]
    })),

    deleteCurso: (id) => set((state) => ({
        cursos: state.cursos.map((curso) => {
            
            if(curso.idCurso == id){
                curso.estatus = 0
            }

            return curso
        })
    })),

    activeCurso: (id) => set((state) => ({
        cursos: state.cursos.map((curso) => {
            
            if(curso.idCurso == id){
                curso.estatus = 1
            }

            return curso
        })
    })),

}))