import axios from "axios";

const API = "http://localhost:8080/api/vehicles";

export const getAllVehicles = () => {
    return axios.get(API);
};

export const getVehicleById = (id) => {
    return axios.get(`${API}/${id}`);
};

export const addVehicle = (vehicle) => {
    return axios.post(API, vehicle);
};

export const updateVehicle = (id, vehicle) => {
    return axios.put(`${API}/${id}`, vehicle);
};

export const deleteVehicle = (id) => {
    return axios.delete(`${API}/${id}`);
};