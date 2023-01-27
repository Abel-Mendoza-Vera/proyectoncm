import { create } from "zustand";
import axios from "axios";
import { urlCuestionarios } from '../api/rutas.api';

export const useCuestionarioStore = create( (set) => ({

    cuestionarios : [],

    getCuestionarios : async () => {

        const response = await axios.get(urlCuestionarios)

        if (response.status == 200) {
            set({ cuestionarios : response.data })
        }
        else{
            set({ cuestionarios : [] })
        }
    }

}))