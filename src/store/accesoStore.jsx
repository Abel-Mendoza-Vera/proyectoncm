import { create } from "zustand";
import { persist } from 'zustand/middleware'

import { api } from '../api/novatec'

export const useAccesoStore = create( persist(

    (set) => ({
        token: null,
        acceso: false,
        usuario: {},

        login: async (correo, contrasenia) => {
            const result = await api.post("/acceso", {
                correo, contrasenia
            })

            if(result.status != 200){
                return result.data;
            }

            set( (state) => ({ token: result.data.token, acceso: result.data.acceso }) )

            return result.data;

        },

        logout: () => {
            set( (state) => ({ token: null, acceso: false, usuario: {} }) )
        },

        saveUser : (data) => {
            set( (state) => ({ ...state, usuario: data }) )
        }

    }),
    {
        name: "acceso-store"
    }

) )