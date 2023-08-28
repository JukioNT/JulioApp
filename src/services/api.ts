import axios from "axios";

export const api = axios.create({
    baseURL: "https://adonis-1p0p.onrender.com",
    headers:{
        Accept: 'application/json'
    }
})