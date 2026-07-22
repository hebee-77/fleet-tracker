import { useState, useEffect, useMemo, useCallback } from "react";
import {
    getAllVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle
} from "../services/vehicleService";
import { useSnackbar } from "../providers/SnackbarProvider";

const useVehicles = () => {
    const { showSuccess, showError } = useSnackbar();

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

    const loadVehicles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllVehicles();
            setVehicles(response.data || []);
        } catch (error) {
            console.error("Error loading vehicles:", error);
            showError("Failed to load vehicles.");
        } finally {
            setLoading(false);
        }
    }, [showError]);

    useEffect(() => {
        loadVehicles();
    }, [loadVehicles]);

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
                showSuccess("Vehicle updated successfully.");
            } else {
                await addVehicle(vehicleData);
                showSuccess("Vehicle added successfully.");
            }
            closeDialogs();
            loadVehicles();
        } catch (error) {
            console.error("Operation failed:", error);
            showError("Operation failed. Please try again.");
        }
    };

    const handleDelete = async () => {
        if (!selectedVehicle) return;
        try {
            await deleteVehicle(selectedVehicle.id);
            showSuccess("Vehicle deleted successfully.");
            closeDialogs();
            loadVehicles();
        } catch (error) {
            console.error("Delete failed:", error);
            showError("Unable to delete vehicle.");
        }
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
        openFormDialog,
        openDetailsDialog,
        openDeleteDialog,
        closeDialogs,
        handleCreateOrUpdate,
        handleDelete
    };
};

export default useVehicles;
