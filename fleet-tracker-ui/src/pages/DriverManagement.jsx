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
    Button,
    TextField,
    MenuItem,
    Stack,
    InputAdornment
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

import DriverStats from "../components/DriverStats";
import DriverDetailsDialog from "../components/DriverDetailsDialog";
import DriverFormDialog from "../components/DriverFormDialog";
import DeleteDriverDialog from "../components/DeleteDriverDialog";

import {
    getAllDrivers,
    addDriver,
    updateDriver,
    deleteDriver
} from "../services/driverService";

const driverStatuses = [
    "AVAILABLE",
    "ON_TRIP",
    "OFF_DUTY"
];

const experienceOptions = [
    { label: "All", value: "" },
    { label: "1+ Years", value: 1 },
    { label: "3+ Years", value: 3 },
    { label: "5+ Years", value: 5 },
    { label: "10+ Years", value: 10 }
];

function DriverManagement() {

    const [drivers, setDrivers] = useState([]);

    const [selectedDriver, setSelectedDriver] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [editingDriver, setEditingDriver] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [experienceFilter, setExperienceFilter] = useState("");

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [driverToDelete, setDriverToDelete] = useState(null);

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = async () => {

        try {

            const response = await getAllDrivers();

            setDrivers(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    // ---------------- VIEW ----------------

    const handleView = (driver) => {

        setSelectedDriver(driver);

        setDialogOpen(true);

    };

    const handleClose = () => {

        setDialogOpen(false);

        setSelectedDriver(null);

    };

    // ---------------- ADD ----------------

    const handleAddDriver = () => {

        setEditingDriver(null);

        setFormOpen(true);

    };

    // ---------------- EDIT ----------------

    const handleEditDriver = (driver) => {

        setEditingDriver(driver);

        setFormOpen(true);

    };

    const handleFormClose = () => {

        setFormOpen(false);

        setEditingDriver(null);

    };

    const handleSaveDriver = async (driverData) => {

        try {

            if (editingDriver) {

                await updateDriver(editingDriver.id, driverData);

                setSnackbarMessage("Driver updated successfully.");

            }

            else {

                await addDriver(driverData);

                setSnackbarMessage("Driver added successfully.");

            }

            setSnackbarOpen(true);

            setFormOpen(false);

            setEditingDriver(null);

            loadDrivers();

        }

        catch (error) {

            console.error(error);

            setSnackbarMessage("Operation failed.");

            setSnackbarOpen(true);

        }

    };

    const filteredDrivers = drivers.filter((driver) => {

        const matchesSearch =

            (driver.driverName || "")
                .toLowerCase()
                .includes(searchText.toLowerCase())

            ||

            (driver.licenseNumber || "")
                .toLowerCase()
                .includes(searchText.toLowerCase());

        const matchesStatus =

            statusFilter === ""

            ||

            driver.status === statusFilter;

        const matchesExperience =

            experienceFilter === ""

            ||

            driver.experience >= Number(experienceFilter);

        return (

            matchesSearch &&

            matchesStatus &&

            matchesExperience

        );
    });
            // ---------------- DELETE ----------------

const handleDeleteClick = (driver) => {

    setDriverToDelete(driver);

    setDeleteOpen(true);

};

const handleDeleteClose = () => {

    setDeleteOpen(false);

    setDriverToDelete(null);

};

const handleDeleteConfirm = async () => {

    try {

        await deleteDriver(driverToDelete.id);

        setSnackbarMessage("Driver deleted successfully.");

        setSnackbarOpen(true);

        setDeleteOpen(false);

        setDriverToDelete(null);

        loadDrivers();

    }

    catch (error) {

        console.error(error);

        setSnackbarMessage("Unable to delete driver.");

        setSnackbarOpen(true);

    }

};
    const columns = [

        {
            field: "driverName",
            headerName: "Driver",
            flex: 1.4
        },

        {
            field: "licenseNumber",
            headerName: "License Number",
            flex: 1.3
        },

        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1.2
        },

        {
            field: "experience",
            headerName: "Experience",
            flex: 0.8,
            valueGetter: (value) => `${value} yrs`
        },

        {
            field: "assignedVehicle",
            headerName: "Assigned Vehicle",
            flex: 1.2
        },

        {
            field: "status",
            headerName: "Status",
            flex: 1,

            renderCell: (params) => (

                <Chip
                    label={params.value}
                    color={
                        params.value === "AVAILABLE"
                            ? "success"
                            : params.value === "ON_TRIP"
                            ? "warning"
                            : "default"
                    }
                    size="small"
                    sx={{
                        fontWeight: "bold"
                    }}
                />

            )

        },

        {
            field: "actions",
            headerName: "Actions",
            width: 160,
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
                            onClick={() => handleEditDriver(params.row)}
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>
                    <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(params.row)}
                        >
                            <DeleteIcon />
                        </IconButton>

                </>

            )

        }

    ];
        return (

        <Box sx={{ width: "100%" }}>

            {/* Header */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    Driver Management
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddDriver}
                    sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: "bold"
                    }}
                >
                    + Add Driver
                </Button>

            </Box>

            {/* Statistics */}

            <DriverStats drivers={drivers} />

            {/* Search & Filters */}

            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    mb: 2
                }}
            >

                <TextField
                    placeholder="Search Driver..."
                    size="small"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{
                        width: 280
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    select
                    label="Status"
                    size="small"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{
                        width: 150
                    }}
                >

                    <MenuItem value="">
                        All
                    </MenuItem>

                    {driverStatuses.map(status => (

                        <MenuItem
                            key={status}
                            value={status}
                        >

                            {status}

                        </MenuItem>

                    ))}

                </TextField>

                <TextField
                    select
                    label="Experience"
                    size="small"
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    sx={{
                        width: 150
                    }}
                >

                    {experienceOptions.map(option => (

                        <MenuItem
                            key={option.label}
                            value={option.value}
                        >

                            {option.label}

                        </MenuItem>

                    ))}

                </TextField>

                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<FilterAltOffIcon />}
                    sx={{
                        height: 40,
                        minWidth: 160
                    }}
                    onClick={() => {

                        setSearchText("");
                        setStatusFilter("");
                        setExperienceFilter("");

                    }}
                >

                    Clear Filters

                </Button>

            </Stack>

            {/* Data Grid */}

            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    height: 500,
                    borderRadius: 3
                }}
            >

                <DataGrid
                    rows={filteredDrivers}
                    columns={columns}
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10
                            }
                        }
                    }}
                    sx={{
                        border: 0
                    }}
                />

            </Paper>

            {/* View Driver */}

            <DriverDetailsDialog
                open={dialogOpen}
                driver={selectedDriver}
                onClose={handleClose}
            />

            {/* Add / Edit Driver */}

            <DriverFormDialog
                open={formOpen}
                onClose={handleFormClose}
                onSave={handleSaveDriver}
                driver={editingDriver}
            />

            {/* Snackbar */}

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
                    sx={{
                        width: "100%"
                    }}
                >

                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <DeleteDriverDialog
                open={deleteOpen}
                driver={driverToDelete}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
            />

        </Box>

    );

}

export default DriverManagement;