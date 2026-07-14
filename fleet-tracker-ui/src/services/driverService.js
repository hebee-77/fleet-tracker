import axios from "axios";

const API_URL = "http://localhost:8080/api/drivers";

export const getAllDrivers = () =>
    axios.get(API_URL);

export const getDriverById = (id) =>
    axios.get(`${API_URL}/${id}`);

export const addDriver = (driver) =>
    axios.post(API_URL, driver);

export const updateDriver = (id, driver) =>
    axios.put(`${API_URL}/${id}`, driver);

export const deleteDriver = (id) =>
    axios.delete(`${API_URL}/${id}`);

export const getDriversByStatus = (status) =>
    axios.get(`${API_URL}/status/${status}`);

export const getDriverByLicense = (license) =>
    axios.get(`${API_URL}/license/${license}`);