import api from "../api/axiosConfig";

const API_URL = "http://localhost:8080/api/drivers";

export const getAllDrivers = () =>
    api.get(API_URL);

export const getDriverById = (id) =>
    api.get(`${API_URL}/${id}`);

export const addDriver = (driver) =>
    api.post(API_URL, driver);

export const updateDriver = (id, driver) =>
    api.put(`${API_URL}/${id}`, driver);

export const deleteDriver = (id) =>
    api.delete(`${API_URL}/${id}`);

export const getDriversByStatus = (status) =>
    api.get(`${API_URL}/status/${status}`);

export const getDriverByLicense = (license) =>
    api.get(`${API_URL}/license/${license}`);