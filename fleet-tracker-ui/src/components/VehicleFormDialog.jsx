import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Alert,
    Box
} from "@mui/material";

import MyLocationIcon from "@mui/icons-material/MyLocation";

const vehicleTypes = [
    "TRUCK",
    "VAN",
    "MINI_TRUCK",
    "BIKE"
];

const fuelTypes = [
    "PETROL",
    "DIESEL",
    "ELECTRIC",
    "CNG"
];

const vehicleStatuses = [
    "ACTIVE",
    "INACTIVE",
    "MAINTENANCE"
];

const initialState = {
    vehicleNumber: "",
    driverName: "",
    vehicleType: "",
    fuelType: "",
    capacity: "",
    status: "ACTIVE",
    currentLatitude: "",
    currentLongitude: ""
};

function VehicleFormDialog({

    open,
    onClose,
    onSave,
    vehicle

}) {

    const [formData, setFormData] = useState(initialState);

    const [locationCaptured, setLocationCaptured] = useState(false);

    useEffect(() => {

        if (vehicle) {

            setFormData(vehicle);
            setLocationCaptured(true);

        } else {

            setFormData(initialState);
            setLocationCaptured(false);

        }

    }, [vehicle]);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData(previous => ({

            ...previous,

            [name]: value

        }));

    };

    const handleCurrentLocation = () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported by your browser.");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setFormData(previous => ({

                    ...previous,

                    currentLatitude: position.coords.latitude,

                    currentLongitude: position.coords.longitude

                }));

                setLocationCaptured(true);

            },

            (error) => {

                console.error(error);

                alert("Unable to fetch your current location.");

            }

        );

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
        <DialogTitle sx={{ fontWeight: "bold" }}>

            {vehicle ? "Edit Vehicle" : "Add Vehicle"}

        </DialogTitle>

            <DialogContent>

                <Box
                     sx={{
        display: "flex",
        flexDirection: "column",
        mt: 2,
        "& .MuiTextField-root": {
            mb: 2
        },
        "& .MuiButton-root": {
            mt: 1
        },
        "& .MuiAlert-root": {
            mt: 1
        }
    }}
                >

                    <TextField
                        fullWidth
                        label="Vehicle Number"
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Driver Name"
                        name="driverName"
                        value={formData.driverName}
                        onChange={handleChange}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Vehicle Type"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                    >

                        {vehicleTypes.map(type => (

                            <MenuItem
                                key={type}
                                value={type}
                            >
                                {type}
                            </MenuItem>

                        ))}

                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label="Fuel Type"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                    >

                        {fuelTypes.map(type => (

                            <MenuItem
                                key={type}
                                value={type}
                            >
                                {type}
                            </MenuItem>

                        ))}

                    </TextField>

                    <TextField
                        fullWidth
                        type="number"
                        label="Capacity (kg)"
                        name="capacity"
                        value={formData.capacity}
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

                        {vehicleStatuses.map(status => (

                            <MenuItem
                                key={status}
                                value={status}
                            >
                                {status}
                            </MenuItem>

                        ))}

                    </TextField>

                    <Button
                        variant="outlined"
                        startIcon={<MyLocationIcon />}
                        onClick={handleCurrentLocation}
                    >
                        Use Current Location
                    </Button>

                    {locationCaptured && (

                        <Alert severity="success">

                            Current location captured successfully.

                        </Alert>

                    )}

                </Box>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancel

                </Button>

         <Button
    variant="contained"
    onClick={handleSubmit}
>

    {vehicle ? "Update Vehicle" : "Save Vehicle"}

</Button>

            </DialogActions>

        </Dialog>

    );

}

export default VehicleFormDialog;