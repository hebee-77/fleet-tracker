import api from "../api/axiosConfig";

const API = "https://fleet-tracker-api-7u7a.onrender.com";

export const getDashboardData = () => {
    return api.get(API);
};