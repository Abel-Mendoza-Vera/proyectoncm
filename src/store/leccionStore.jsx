import { create } from "zustand";

export const useLeccionStore = create((set) => ({
    lecciones: [
        {
            idLeccion: 1,
            nombre: "Leccion 1",
            estatus: 1,
            descripcion: "En esta leccion aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            idVideo: 0,
        },
        {
            idLeccion: 2,
            nombre: "Leccion 2",
            estatus: 1,
            descripcion: "En esta leccion aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            idVideo: 0,
        },
        {
            idLeccion: 3,
            nombre: "Leccion 3",
            estatus: 1,
            descripcion: "En esta leccion aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            idVideo: 0,
        },
        {
            idLeccion: 4,
            nombre: "Leccion 4",
            estatus: 1,
            descripcion: "En esta leccion aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            idVideo: 0,
        },
        {
            idLeccion: 5,
            nombre: "Leccion 5",
            estatus: 1,
            descripcion: "En esta leccion aprenderas las bases para poder gobernarte a ti mismo, para que lleges a ser una persona mas decisiva en la vida",
            idVideo: 0,
        },

    ],

    
    addLeccion: (
        idLeccion, nombre,estatus, descripcion, idVideo, 
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
            
            if(leccion.idLeccion == id){
                leccion.estatus = 0
            }

            return leccion
        })
    })),

    activeLeccion: (id) => set((state) => ({
        lecciones: state.lecciones.map((leccion) => {
            
            if(leccion.idLeccion == id){
                leccion.estatus = 1
            }

            return leccion
        })
    })),




}))