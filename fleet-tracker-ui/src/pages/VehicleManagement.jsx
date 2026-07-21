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
    MenuItem,
    TextField,
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

import VehicleDetailsDialog from "../components/VehicleDetailsDialog";
import VehicleFormDialog from "../components/VehicleFormDialog";
import DeleteVehicleDialog from "../components/DeleteVehicleDialog";
import VehicleStats from "../components/VehicleStats";

import {
    getAllVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle
} from "../services/vehicleService";

const vehicleTypes = ["TRUCK", "VAN", "MINI_TRUCK", "BIKE"];
const vehicleStatuses = ["ACTIVE", "MAINTENANCE", "INACTIVE"];

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

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

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

    const getStatusChipColor = (status) => {
        switch (status) {
            case "ACTIVE":
                return { bg: "#16A34A", color: "#FFFFFF" };
            case "MAINTENANCE":
                return { bg: "#F59E0B", color: "#FFFFFF" };
            default:
                return { bg: "#DC2626", color: "#FFFFFF" };
        }
    };

    const columns = [
        {
            field: "vehicleNumber",
            headerName: "Vehicle Number",
            flex: 1.2,
            minWidth: 140
        },
        {
            field: "driverName",
            headerName: "Driver",
            flex: 1.2,
            minWidth: 140,
            valueGetter: (value) => value || "Unassigned"
        },
        {
            field: "vehicleType",
            headerName: "Type",
            flex: 1,
            minWidth: 110
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
            field: "speed",
            headerName: "Speed (km/h)",
            flex: 1,
            minWidth: 110,
            valueGetter: (value) => (value ? value.toFixed(1) : "0.0")
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 130,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={0.25} alignItems="center" sx={{ height: "100%" }}>
                    <Tooltip title="View Vehicle">
                        <IconButton
                            size="small"
                            sx={{ color: "#2563EB", p: 0.5, "&:hover": { bgcolor: "#EFF6FF" } }}
                            onClick={() => handleView(params.row)}
                        >
                            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Vehicle">
                        <IconButton
                            size="small"
                            sx={{ color: "#F59E0B", p: 0.5, "&:hover": { bgcolor: "#FEF3C7" } }}
                            onClick={() => handleEditVehicle(params.row)}
                        >
                            <EditOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Vehicle">
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

    const filteredVehicles = vehicles.filter((vehicle) => {
        const matchesSearch =
            (vehicle.vehicleNumber || "").toLowerCase().includes(searchText.toLowerCase()) ||
            (vehicle.driverName || "").toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === "" || vehicle.status === statusFilter;
        const matchesType = typeFilter === "" || vehicle.vehicleType === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
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
                title="Vehicle Management"
                subtitle="Monitor and manage fleet vehicle records and assignments."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Vehicles" }
                ]}
                action={
                    <PrimaryButton
                        startIcon={<AddIcon />}
                        onClick={handleAddVehicle}
                    >
                        Add Vehicle
                    </PrimaryButton>
                }
            />

            <VehicleStats vehicles={vehicles} />

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
                            placeholder="Search Vehicle or Driver..."
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
                        {vehicleStatuses.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Vehicle Type"
                        size="small"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        sx={{
                            width: 140,
                            bgcolor: "#FFFFFF",
                            "& .MuiOutlinedInput-root": { height: 38, borderRadius: "10px", fontSize: "0.85rem" }
                        }}
                    >
                        <MenuItem value="">All Types</MenuItem>
                        {vehicleTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </TextField>

                    {(searchText || statusFilter || typeFilter) && (
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
                                setTypeFilter("");
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
                        rows={filteredVehicles}
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

            <DeleteVehicleDialog
                open={deleteOpen}
                vehicle={vehicleToDelete}
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

export default VehicleManagement;