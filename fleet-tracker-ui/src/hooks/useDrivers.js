import { useState, useEffect, useMemo, useCallback } from "react";
import {
    getAllDrivers,
    addDriver,
    updateDriver,
    deleteDriver
} from "../services/driverService";
import { useSnackbar } from "../providers/SnackbarProvider";

const useDrivers = () => {
    const { showSuccess, showError } = useSnackbar();

    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [experienceFilter, setExperienceFilter] = useState("");

    const [dialogs, setDialogs] = useState({
        form: false,
        details: false,
        delete: false
    });

    const [selectedDriver, setSelectedDriver] = useState(null);

    const loadDrivers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllDrivers();
            setDrivers(response.data || []);
        } catch (error) {
            console.error("Error loading drivers:", error);
            showError("Failed to load drivers.");
        } finally {
            setLoading(false);
        }
    }, [showError]);

    useEffect(() => {
        loadDrivers();
    }, [loadDrivers]);

    const filteredDrivers = useMemo(() => {
        return drivers.filter((driver) => {
            const matchesSearch =
                (driver.driverName || "").toLowerCase().includes(search.toLowerCase()) ||
                (driver.licenseNumber || "").toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "" || driver.status === statusFilter;
            const matchesExperience =
                experienceFilter === "" || driver.experience >= Number(experienceFilter);
            return matchesSearch && matchesStatus && matchesExperience;
        });
    }, [drivers, search, statusFilter, experienceFilter]);

    const openFormDialog = (driver = null) => {
        setSelectedDriver(driver);
        setDialogs((prev) => ({ ...prev, form: true }));
    };

    const openDetailsDialog = (driver) => {
        setSelectedDriver(driver);
        setDialogs((prev) => ({ ...prev, details: true }));
    };

    const openDeleteDialog = (driver) => {
        setSelectedDriver(driver);
        setDialogs((prev) => ({ ...prev, delete: true }));
    };

    const closeDialogs = () => {
        setDialogs({ form: false, details: false, delete: false });
        setSelectedDriver(null);
    };

    const handleCreateOrUpdate = async (driverData) => {
        try {
            if (selectedDriver) {
                await updateDriver(selectedDriver.id, driverData);
                showSuccess("Driver updated successfully.");
            } else {
                await addDriver(driverData);
                showSuccess("Driver added successfully.");
            }
            closeDialogs();
            loadDrivers();
        } catch (error) {
            console.error("Operation failed:", error);
            showError("Operation failed. Please try again.");
        }
    };

    const handleDelete = async () => {
        if (!selectedDriver) return;
        try {
            await deleteDriver(selectedDriver.id);
            showSuccess("Driver deleted successfully.");
            closeDialogs();
            loadDrivers();
        } catch (error) {
            console.error("Delete failed:", error);
            showError("Unable to delete driver.");
        }
    };

    return {
        drivers,
        filteredDrivers,
        loading,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        experienceFilter,
        setExperienceFilter,
        dialogs,
        selectedDriver,
        openFormDialog,
        openDetailsDialog,
        openDeleteDialog,
        closeDialogs,
        handleCreateOrUpdate,
        handleDelete
    };
};

export default useDrivers;
