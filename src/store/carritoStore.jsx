import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useCarritoStore = create( persist(

    (set, get) => ({

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

            let store = get((state) => state)
            let usuario = store.carrito.find((item) => item.idUsuario == idUsuario)

            let newCarrito = store.carrito.map((item) => {
                if(item.idUsuario == usuario.idUsuario){
                    item.cursos = usuario.cursos.filter((c) => c != idCurso)
                }
                return item
            })

            set((state) => ({ carrito : newCarrito }))
        }

    }),
    {
        name: "carrito-store"
    }

) )