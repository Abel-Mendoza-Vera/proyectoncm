import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useCarritoStore = create( persist(

    (set) => ({

        carrito:[],
        
        agregarAlCarrito: (idCurso, idUsuario) => {
            set((state) => {

                let usuario = state.carrito.find((item) => item.idUsuario == idUsuario)
                
                if(!usuario){
                    state.carrito.push({ idUsuario: idUsuario, cursos: [idCurso] })
                    return state
                }

                usuario.cursos.push(idCurso)

                let newState = state.carrito.map((item) => {
                    if(item.idUsuario == usuario.idUsuario){
                        item = usuario
                    }
                    return item
                })

                state.carrito = newState

                return state;
            })
        },

        quitarDelCarrito: (idCurso, idUsuario) => {

            set( (state) => ({
                carrito: state.carrito.map((item) => {
                    if(item.idUsuario == idUsuario) {
                        let aux = item.cursos
                        item.cursos = aux.filter((cursoId) => cursoId != idCurso)
                    }
                    return item
                })
            }))
        }

    }),
    {
        name: "carrito-store"
    }

) )