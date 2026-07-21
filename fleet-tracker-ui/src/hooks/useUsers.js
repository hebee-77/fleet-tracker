import { useCallback, useEffect, useMemo, useState } from "react";
import userApi from "../api/userApi";
import { useSnackbar } from "../providers/SnackbarProvider";

const initialDialogs = {
    form: false,
    details: false,
    status: false,
};

const useUsers = () => {
    const {
        showSuccess,
        showError
    } = useSnackbar();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);

    const [dialogs, setDialogs] = useState(initialDialogs);

    const loadUsers = useCallback(async () => {
        try {
            setLoading(true);

            const response = await userApi.getAll();

            setUsers(response.data);
            setError(null);
        } catch (err) {
            console.error(err);

            setError("Failed to load users.");
            showError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    }, [showError]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase());

            const matchesRole =
                !roleFilter || user.role === roleFilter;

            const matchesStatus =
                statusFilter === ""
                    ? true
                    : user.active === (statusFilter === "ACTIVE");

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });
    }, [users, search, roleFilter, statusFilter]);

    const openFormDialog = (user = null) => {
        setSelectedUser(user);

        setDialogs((prev) => ({
            ...prev,
            form: true,
        }));
    };

    const openDetailsDialog = (user) => {
        setSelectedUser(user);

        setDialogs((prev) => ({
            ...prev,
            details: true,
        }));
    };

    const openStatusDialog = (user) => {
        setSelectedUser(user);

        setDialogs((prev) => ({
            ...prev,
            status: true,
        }));
    };

    const closeDialogs = () => {
        setDialogs(initialDialogs);
        setSelectedUser(null);
    };

    const createUser = async (user) => {
        try {
            await userApi.create(user);

            showSuccess("User created successfully.");

            await loadUsers();

            closeDialogs();
        } catch (err) {
            console.error(err);

            showError("Failed to create user.");
        }
    };

    const updateUser = async (id, user) => {
        try {
            await userApi.update(id, user);

            showSuccess("User updated successfully.");

            await loadUsers();

            closeDialogs();
        } catch (err) {
            console.error(err);

            showError("Failed to update user.");
        }
    };

    const updateStatus = async () => {
        if (!selectedUser) return;

        try {
            await userApi.updateStatus(
                selectedUser.id,
                !selectedUser.active
            );

            showSuccess("User status updated.");

            await loadUsers();

            closeDialogs();
        } catch (err) {
            console.error(err);

            showError("Failed to update status.");
        }
    };

    return {
        users,
        filteredUsers,

        loading,
        error,

        search,
        setSearch,

        roleFilter,
        setRoleFilter,

        statusFilter,
        setStatusFilter,

        dialogs,

        selectedUser,

        openFormDialog,
        openDetailsDialog,
        openStatusDialog,

        closeDialogs,

        createUser,
        updateUser,
        updateStatus,

        refreshUsers: loadUsers,
    };
};

export default useUsers;