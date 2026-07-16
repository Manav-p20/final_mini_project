import axios from "axios";

const APi = axios.create({
    baseURL : "http://localhost:5000/",
})

export const getstates = () => APi.get("/states");

export const getsales = () => APi.get("/sales");


