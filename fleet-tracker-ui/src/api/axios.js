import axios from "axios";

import { API } from "../constants/api";

const api = axios.create({

    baseURL: API.BASE_URL,

    timeout: 10000,

    headers: {

        "Content-Type": "application/json",

    },

});

// Attach JWT token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Global response handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Redirect to login page
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;