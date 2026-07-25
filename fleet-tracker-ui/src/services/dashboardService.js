import api from "../api/axiosConfig";

const API = "https://fleet-tracker-api-7u7a.onrender.com/api/dashboard";

export const getDashboardData = () => {
    return api.get(API);
};