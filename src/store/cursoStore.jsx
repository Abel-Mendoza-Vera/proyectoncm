import { create } from "zustand";

export const useCursoStore = create((set) => ({
    cursos: [
        {
            idCurso: 1,
            nombre: "Curso 1",
            precio: 550,
            estatus: 1,
            descripcion: "En este curso aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            objetivos: "Crecer personalmente",
            duracion: 5,
            idVideo: 0,
            idMiniatura: 0
        },
        {
            idCurso: 2,
            nombre: "Curso 2",
            precio: 550,
            estatus: 0,
            descripcion: "En este curso aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            objetivos: "Crecer personalmente",
            duracion: 5,
            idVideo: 0,
            idMiniatura: 0
        },
        {
            idCurso: 3,
            nombre: "Curso 3",
            precio: 550,
            estatus: 1,
            descripcion: "En este curso aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            objetivos: "Crecer personalmente",
            duracion: 5,
            idVideo: 0,
            idMiniatura: 0
        },
        {
            idCurso: 4,
            nombre: "Curso 4",
            precio: 550,
            estatus: 1,
            descripcion: "En este curso aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            objetivos: "Crecer personalmente",
            duracion: 5,
            idVideo: 0,
            idMiniatura: 0
        },
        {
            idCurso: 5,
            nombre: "Curso 5",
            precio: 550,
            estatus: 1,
            descripcion: "En este curso aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            objetivos: "Crecer personalmente",
            duracion: 5,
            idVideo: 0,
            idMiniatura: 0
        },

    ],

    
    addCurso: (
        idCurso, nombre, precio, estatus, descripcion, objetivos, duracion, idVideo, idMiniatura
        ) => set((state) => ({
        cursos: [
            ...state.cursos,
            {
                idCurso: idCurso,
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