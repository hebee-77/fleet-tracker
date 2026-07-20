import api from "../api/axiosConfig";

const API = "http://localhost:8080/api/dashboard";

export const getDashboardData = () => {
    return api.get(API);
};