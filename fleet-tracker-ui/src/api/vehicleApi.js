import axios from "axios";

const api = axios.create({
    baseURL: "https://fleet-tracker-api-7u7a.onrender.com/api"
});

export default api;