import { useEffect, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";

import {
    Box,
    Chip,
    IconButton,
    Tooltip,
    Button,
    TextField,
    MenuItem,
    Stack
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
    VisibilityOutlined as VisibilityOutlinedIcon,
    EditOutlined as EditOutlinedIcon,
    DeleteOutlined,
    FilterAltOff as FilterAltOffIcon
} from "@mui/icons-material";

import PageHeader from "../components/common/PageHeader";
import ContentCard from "../components/common/ContentCard";
import PrimaryButton from "../components/common/PrimaryButton";
import SearchInput from "../components/common/SearchInput";

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
    { label: "All Experience", value: "" },
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

    const handleView = (driver) => {
        setSelectedDriver(driver);
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedDriver(null);
    };

    const handleAddDriver = () => {
        setEditingDriver(null);
        setFormOpen(true);
    };

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
            } else {
                await addDriver(driverData);
                setSnackbarMessage("Driver added successfully.");
            }
            setSnackbarOpen(true);
            setFormOpen(false);
            setEditingDriver(null);
            loadDrivers();
        } catch (error) {
            console.error(error);
            setSnackbarMessage("Operation failed.");
            setSnackbarOpen(true);
        }
    };

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
        } catch (error) {
            console.error(error);
            setSnackbarMessage("Unable to delete driver.");
            setSnackbarOpen(true);
        }
    };

    const getStatusChipColor = (status) => {
        switch (status) {
            case "AVAILABLE":
                return { bg: "#16A34A", color: "#FFFFFF" };
            case "ON_TRIP":
                return { bg: "#F59E0B", color: "#FFFFFF" };
            default:
                return { bg: "#94A3B8", color: "#FFFFFF" };
        }
    };

    const columns = [
        {
            field: "driverName",
            headerName: "Driver",
            flex: 1.4,
            minWidth: 150
        },
        {
            field: "licenseNumber",
            headerName: "License Number",
            flex: 1.3,
            minWidth: 140
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1.2,
            minWidth: 130
        },
        {
            field: "experience",
            headerName: "Experience",
            flex: 0.9,
            minWidth: 100,
            valueGetter: (value) => `${value || 0} yrs`
        },
        {
            field: "assignedVehicle",
            headerName: "Assigned Vehicle",
            flex: 1.2,
            minWidth: 130,
            valueGetter: (value) => value || "Unassigned"
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                const style = getStatusChipColor(params.value);
                return (
                    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                        <Chip
                            label={params.value}
                            size="small"
                            sx={{
                                bgcolor: style.bg,
                                color: style.color,
                                fontWeight: 700,
                                fontSize: "0.7rem",
                                borderRadius: "16px",
                                px: 0.5,
                                height: 22
                            }}
                        />
                    </Box>
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 130,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={0.25} alignItems="center" sx={{ height: "100%" }}>
                    <Tooltip title="View Driver">
                        <IconButton
                            size="small"
                            sx={{ color: "#2563EB", p: 0.5, "&:hover": { bgcolor: "#EFF6FF" } }}
                            onClick={() => handleView(params.row)}
                        >
                            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Driver">
                        <IconButton
                            size="small"
                            sx={{ color: "#F59E0B", p: 0.5, "&:hover": { bgcolor: "#FEF3C7" } }}
                            onClick={() => handleEditDriver(params.row)}
                        >
                            <EditOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Driver">
                        <IconButton
                            size="small"
                            sx={{ color: "#DC2626", p: 0.5, "&:hover": { bgcolor: "#FEE2E2" } }}
                            onClick={() => handleDeleteClick(params.row)}
                        >
                            <DeleteOutlined sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        }
    ];

    const filteredDrivers = drivers.filter((driver) => {
        const matchesSearch =
            (driver.driverName || "").toLowerCase().includes(searchText.toLowerCase()) ||
            (driver.licenseNumber || "").toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === "" || driver.status === statusFilter;
        const matchesExperience = experienceFilter === "" || driver.experience >= Number(experienceFilter);

        return matchesSearch && matchesStatus && matchesExperience;
    });

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                gap: 1.5,
                minHeight: 0
            }}
        >
            <PageHeader
                title="Driver Management"
                subtitle="Manage driver profiles, licensing and vehicle assignments."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Drivers" }
                ]}
                action={
                    <PrimaryButton
                        startIcon={<AddIcon />}
                        onClick={handleAddDriver}
                    >
                        Add Driver
                    </PrimaryButton>
                }
            />

            <DriverStats drivers={drivers} />

            <ContentCard sx={{ p: 1.5 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexWrap: "wrap"
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 240, maxWidth: 380 }}>
                        <SearchInput
                            placeholder="Search Driver or License..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            width="100%"
                        />
                    </Box>

                    <TextField
                        select
                        label="Status"
                        size="small"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{
                            width: 130,
                            bgcolor: "#FFFFFF",
                            "& .MuiOutlinedInput-root": { height: 38, borderRadius: "10px", fontSize: "0.85rem" }
                        }}
                    >
                        <MenuItem value="">All Status</MenuItem>
                        {driverStatuses.map((status) => (
                            <MenuItem key={status} value={status}>
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
                            width: 150,
                            bgcolor: "#FFFFFF",
                            "& .MuiOutlinedInput-root": { height: 38, borderRadius: "10px", fontSize: "0.85rem" }
                        }}
                    >
                        {experienceOptions.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {(searchText || statusFilter || experienceFilter) && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            startIcon={<FilterAltOffIcon sx={{ fontSize: 18 }} />}
                            sx={{
                                height: 38,
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: "0.8rem"
                            }}
                            onClick={() => {
                                setSearchText("");
                                setStatusFilter("");
                                setExperienceFilter("");
                            }}
                        >
                            Clear Filters
                        </Button>
                    )}
                </Box>
            </ContentCard>

            <ContentCard
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    minHeight: 0,
                    p: 0,
                    borderRadius: "14px"
                }}
            >
                <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0, height: "100%" }}>
                    <DataGrid
                        rows={filteredDrivers}
                        columns={columns}
                        pageSizeOptions={[10, 15, 25, 50]}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 15 }
                            }
                        }}
                        disableRowSelectionOnClick
                        rowHeight={52}
                        columnHeaderHeight={44}
                        sx={{
                            border: "none",
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#FFFFFF",
                                borderBottom: "1px solid #E2E8F0",
                                color: "#0F172A",
                                fontWeight: 700,
                                fontSize: "0.825rem",
                                minHeight: "44px !important",
                                maxHeight: "44px !important"
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "1px solid #F1F5F9",
                                alignContent: "center",
                                fontSize: "0.825rem"
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "#F8FAFC"
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "1px solid #E2E8F0",
                                minHeight: "44px !important"
                            }
                        }}
                    />
                </Box>
            </ContentCard>

            <DriverDetailsDialog
                open={dialogOpen}
                driver={selectedDriver}
                onClose={handleClose}
            />

            <DriverFormDialog
                open={formOpen}
                onClose={handleFormClose}
                onSave={handleSaveDriver}
                driver={editingDriver}
            />

            <DeleteDriverDialog
                open={deleteOpen}
                driver={driverToDelete}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
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
        </Box>
    );
}

export default DriverManagement;