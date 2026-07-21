import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Stack
} from "@mui/material";

import { getAllVehicles } from "../../services/vehicleService";

const driverStatuses = [
    "AVAILABLE",
    "ON_TRIP",
    "OFF_DUTY"
];

const initialState = {
    driverName: "",
    licenseNumber: "",
    phoneNumber: "",
    experience: "",
    status: "AVAILABLE",
    assignedVehicle: ""
};

function DriverFormDialog({
    open,
    onClose,
    onSave,
    driver
}) {
    const [formData, setFormData] = useState(initialState);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        loadVehicles();
    }, []);

    useEffect(() => {
        if (driver) {
            setFormData({
                driverName: driver.driverName || "",
                licenseNumber: driver.licenseNumber || "",
                phoneNumber: driver.phoneNumber || "",
                experience: driver.experience || "",
                status: driver.status || "AVAILABLE",
                assignedVehicle: driver.assignedVehicle || ""
            });
        } else {
            setFormData(initialState);
        }
    }, [driver]);

    const loadVehicles = async () => {
        try {
            const response = await getAllVehicles();
            setVehicles(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                {driver ? "Edit Driver" : "Add Driver"}
            </DialogTitle>

            <DialogContent>
                <Stack
                    spacing={2.5}
                    sx={{ mt: 2 }}
                >
                    <TextField
                        fullWidth
                        label="Driver Name"
                        name="driverName"
                        value={formData.driverName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="License Number"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Experience (Years)"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        {driverStatuses.map(status => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label="Assigned Vehicle"
                        name="assignedVehicle"
                        value={formData.assignedVehicle}
                        onChange={handleChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        {vehicles.map(vehicle => (
                            <MenuItem key={vehicle.id} value={vehicle.vehicleNumber}>
                                {vehicle.vehicleNumber}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {driver ? "Update" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DriverFormDialog;
