import { create } from "zustand";
import axios from "axios";
import { urlArchivos } from '../api/rutas.api';

export const useArchivoStore = create((set) => ({

    archivos : [],

    getArchivos: async () => {

        const response = await axios.get(urlArchivos)

        if ( response.status == 200 ){
            set({ archivos : response.data })
        }
        else{
            set({ archivos : [] })
        }

    },

    saveArchivo : async (nombre, extencion, url) => {
        
        const response = await axios.post(urlArchivos, {
            nombre: nombre,
            extencion: extencion,
            url: url
        })

        if ( response.status != 500 ){
            set({ archivos: [ ...state, response.data ] })
        }
    }


}))