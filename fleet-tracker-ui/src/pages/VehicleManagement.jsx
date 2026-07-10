import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Chip,
    IconButton,
    Tooltip
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllVehicles } from "../services/vehicleService";
import VehicleDetailsDialog from "../components/VehicleDetailsDialog";

function VehicleManagement() {

    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

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

    const handleView = (vehicle) => {

        setSelectedVehicle(vehicle);
        setDialogOpen(true);

    };

    const handleClose = () => {

        setDialogOpen(false);
        setSelectedVehicle(null);

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

            valueGetter: (value) => value?.toFixed(1)
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

                        <IconButton color="warning">

                            <EditIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Delete">

                        <IconButton color="error">

                            <DeleteIcon />

                        </IconButton>

                    </Tooltip>

                </>

            )

        }

    ];

    return (

        <Box>

            <Typography
                variant="h3"
                fontWeight="bold"
                mb={4}
                align="center"
            >

                Vehicle Management

            </Typography>

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

        </Box>

    );

}

export default VehicleManagement;