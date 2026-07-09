import api from "../api/vehicleApi";

export const getAllVehicles = () => {
    return api.get("/vehicles");
};