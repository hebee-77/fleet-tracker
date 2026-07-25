import api from "../api/axiosConfig";

const API = "https://fleet-tracker-api-7u7a.onrender.com/api/vehicles";

export const getAllVehicles = () => {
    return api.get(API);
};

export const getVehicleById = (id) => {
    return api.get(`${API}/${id}`);
};

export const addVehicle = (vehicle) => {
    return api.post(API, vehicle);
};

export const updateVehicle = (id, vehicle) => {
    return api.put(`${API}/${id}`, vehicle);
};

export const deleteVehicle = (id) => {
    return api.delete(`${API}/${id}`);
};