import axios from "axios"
/*
const MAIN_URL = "http://127.0.0.1:8000/";
*/
const token = localStorage.getItem("token") || "";
const API = axios.create({
    baseURL: "/",
})
API.defaults.headers["content-type"] = "application/json";

if(token) {
    API.defaults.headers.common["Authorization"] = `Token ${token}`
}

export default API