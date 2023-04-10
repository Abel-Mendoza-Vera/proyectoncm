import axios from "axios";

export const api = axios.create({
    baseURL: "https://novatecbackend-production.up.railway.app/api"
})