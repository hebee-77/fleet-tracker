import { useState, useEffect, useMemo } from "react";
import {
    getAllVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle
} from "../services/vehicleService";

const useVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const [dialogs, setDialogs] = useState({
        form: false,
        details: false,
        delete: false
    });

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    const loadVehicles = async () => {
        setLoading(true);
        try {
            const response = await getAllVehicles();
            setVehicles(response.data || []);
        } catch (error) {
            console.error("Error loading vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVehicles();
    }, []);

    const filteredVehicles = useMemo(() => {
        return vehicles.filter((vehicle) => {
            const matchesSearch =
                (vehicle.vehicleNumber || "").toLowerCase().includes(search.toLowerCase()) ||
                (vehicle.driverName || "").toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "" || vehicle.status === statusFilter;
            const matchesType = typeFilter === "" || vehicle.vehicleType === typeFilter;
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [vehicles, search, statusFilter, typeFilter]);

    const openFormDialog = (vehicle = null) => {
        setSelectedVehicle(vehicle);
        setDialogs((prev) => ({ ...prev, form: true }));
    };

    const openDetailsDialog = (vehicle) => {
        setSelectedVehicle(vehicle);
        setDialogs((prev) => ({ ...prev, details: true }));
    };

    const openDeleteDialog = (vehicle) => {
        setSelectedVehicle(vehicle);
        setDialogs((prev) => ({ ...prev, delete: true }));
    };

    const closeDialogs = () => {
        setDialogs({ form: false, details: false, delete: false });
        setSelectedVehicle(null);
    };

    const handleCreateOrUpdate = async (vehicleData) => {
        try {
            if (selectedVehicle) {
                await updateVehicle(selectedVehicle.id, vehicleData);
                setSnackbar({ open: true, message: "Vehicle updated successfully." });
            } else {
                await addVehicle(vehicleData);
                setSnackbar({ open: true, message: "Vehicle added successfully." });
            }
            closeDialogs();
            loadVehicles();
        } catch (error) {
            console.error("Operation failed:", error);
            setSnackbar({ open: true, message: "Operation failed." });
        }
    };

    const handleDelete = async () => {
        if (!selectedVehicle) return;
        try {
            await deleteVehicle(selectedVehicle.id);
            setSnackbar({ open: true, message: "Vehicle deleted successfully." });
            closeDialogs();
            loadVehicles();
        } catch (error) {
            console.error("Delete failed:", error);
            setSnackbar({ open: true, message: "Unable to delete vehicle." });
        }
    };

    const closeSnackbar = () => {
        setSnackbar({ open: false, message: "" });
    };

    return {
        vehicles,
        filteredVehicles,
        loading,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        typeFilter,
        setTypeFilter,
        dialogs,
        selectedVehicle,
        snackbar,
        openFormDialog,
        openDetailsDialog,
        openDeleteDialog,
        closeDialogs,
        closeSnackbar,
        handleCreateOrUpdate,
        handleDelete
    };
};

export default useVehicles;
