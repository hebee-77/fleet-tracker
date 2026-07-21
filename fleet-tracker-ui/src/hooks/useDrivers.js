import { useState, useEffect, useMemo } from "react";
import {
    getAllDrivers,
    addDriver,
    updateDriver,
    deleteDriver
} from "../services/driverService";

const useDrivers = () => {
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
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    const loadDrivers = async () => {
        setLoading(true);
        try {
            const response = await getAllDrivers();
            setDrivers(response.data || []);
        } catch (error) {
            console.error("Error loading drivers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDrivers();
    }, []);

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
                setSnackbar({ open: true, message: "Driver updated successfully." });
            } else {
                await addDriver(driverData);
                setSnackbar({ open: true, message: "Driver added successfully." });
            }
            closeDialogs();
            loadDrivers();
        } catch (error) {
            console.error("Operation failed:", error);
            setSnackbar({ open: true, message: "Operation failed." });
        }
    };

    const handleDelete = async () => {
        if (!selectedDriver) return;
        try {
            await deleteDriver(selectedDriver.id);
            setSnackbar({ open: true, message: "Driver deleted successfully." });
            closeDialogs();
            loadDrivers();
        } catch (error) {
            console.error("Delete failed:", error);
            setSnackbar({ open: true, message: "Unable to delete driver." });
        }
    };

    const closeSnackbar = () => {
        setSnackbar({ open: false, message: "" });
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

export default useDrivers;
