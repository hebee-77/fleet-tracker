import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import {
    Box,
    Typography,
    Paper,
    Chip,
    IconButton,
    Tooltip,
    Button
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


import VehicleDetailsDialog from "../components/VehicleDetailsDialog";
import VehicleFormDialog from "../components/VehicleFormDialog";

import {
    getAllVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle
} from "../services/vehicleService";

import DeleteVehicleDialog from "../components/DeleteVehicleDialog";

function VehicleManagement() {

    const [vehicles, setVehicles] = useState([]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(""); 

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState(null);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {

        try {

            const response = await getAllVehicles();

            setVehicles(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    // ---------------- VIEW ----------------

    const handleView = (vehicle) => {

        setSelectedVehicle(vehicle);

        setDialogOpen(true);

    };

    const handleClose = () => {

        setDialogOpen(false);

        setSelectedVehicle(null);

    };

    // ---------------- ADD ----------------

    const handleAddVehicle = () => {

        setEditingVehicle(null);

        setFormOpen(true);

    };

    const handleEditVehicle = (vehicle) => {

    setEditingVehicle(vehicle);

    setFormOpen(true);

    };

    const handleDeleteClick = (vehicle) => {

    setVehicleToDelete(vehicle);

    setDeleteOpen(true);

    };

    const handleDeleteConfirm = async () => {

    try {

        await deleteVehicle(vehicleToDelete.id);

        setSnackbarMessage("Vehicle deleted successfully.");

        setSnackbarOpen(true);

        setDeleteOpen(false);

        setVehicleToDelete(null);

        loadVehicles();

    } catch (error) {

        console.error(error);

        setSnackbarMessage("Unable to delete vehicle.");

        setSnackbarOpen(true);

    }

    };

    const handleDeleteClose = () => {

    setDeleteOpen(false);

    setVehicleToDelete(null);

    };

    const handleFormClose = () => {

        setFormOpen(false);

        setEditingVehicle(null);

    };

    const handleSaveVehicle = async (vehicleData) => {

    try {

        if (editingVehicle) {

            await updateVehicle(editingVehicle.id, vehicleData);

            setSnackbarMessage("Vehicle updated successfully.");

        } else {

            await addVehicle(vehicleData);

            setSnackbarMessage("Vehicle added successfully.");

        }

        setSnackbarOpen(true);

        setFormOpen(false);
        setEditingVehicle(null);

        loadVehicles();

    } catch (error) {

        console.error(error);

        setSnackbarMessage("Operation failed.");

        setSnackbarOpen(true);

    }

};

    const columns = [

        {
            field: "vehicleNumber",
            headerName: "Vehicle Number",
            flex: 1
        },

        {
            field: "driverName",
            headerName: "Driver",
            flex: 1
        },

        {
            field: "vehicleType",
            headerName: "Type",
            flex: 1
        },

        {
            field: "status",
            headerName: "Status",
            flex: 1,

            renderCell: (params) => {

                const status = params.value;

                return (

                    <Chip
                        label={status}
                        color={
                            status === "ACTIVE"
                                ? "success"
                                : status === "MAINTENANCE"
                                ? "warning"
                                : "error"
                        }
                        size="small"
                        sx={{
                            fontWeight: "bold"
                        }}
                    />

                );

            }

        },

        {
            field: "speed",
            headerName: "Speed (km/h)",
            flex: 1,

            valueGetter: (value) =>
                value?.toFixed(1)
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 170,

            sortable: false,
            filterable: false,

            renderCell: (params) => (

                <>

                    <Tooltip title="View">

                        <IconButton
                            color="primary"
                            onClick={() => handleView(params.row)}
                        >

                            <VisibilityIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Edit">

    <IconButton
        color="warning"
        onClick={() => handleEditVehicle(params.row)}
    >

        <EditIcon />

    </IconButton>

</Tooltip>

                    <Tooltip title="Delete">

                            <IconButton
                                color="error"
                                onClick={() => handleDeleteClick(params.row)}
                            >

                                <DeleteIcon />

                            </IconButton>

                        </Tooltip>

                </>

            )

        }

    ];

    return (

    <Box>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                width: "100%"
            }}
        >

            <Typography
                variant="h4"
                fontWeight="bold"
            >
                Vehicle Management
            </Typography>

            <Button
                variant="contained"
                size="large"
                onClick={handleAddVehicle}
                sx={{
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: "bold",
                    textTransform: "none"
                }}
            >
                + Add Vehicle
            </Button>

        </Box>

        <Paper
            elevation={3}
            sx={{
                height: 600,
                width: "100%",
                borderRadius: 3
            }}
        >

            <DataGrid
                rows={vehicles}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10
                        }
                    }
                }}
                disableRowSelectionOnClick
            />

        </Paper>

        <VehicleDetailsDialog
            open={dialogOpen}
            vehicle={selectedVehicle}
            onClose={handleClose}
        />

            <VehicleFormDialog
            open={formOpen}
            onClose={handleFormClose}
            onSave={handleSaveVehicle}
            vehicle={editingVehicle}
        />

        <Snackbar
    open={snackbarOpen}
    autoHideDuration={3000}
    onClose={() => setSnackbarOpen(false)}
    anchorOrigin={{
        vertical: "top",
        horizontal: "right"
    }}
>

    <Alert
        severity="success"
        variant="filled"
        onClose={() => setSnackbarOpen(false)}
        sx={{ width: "100%" }}
    >
        {snackbarMessage}
    </Alert>

</Snackbar>

<DeleteVehicleDialog
    open={deleteOpen}
    vehicle={vehicleToDelete}
    onClose={handleDeleteClose}
    onConfirm={handleDeleteConfirm}
/>

    </Box>

);

}

export default VehicleManagement;