import { useCallback, useEffect, useMemo, useState } from "react";

import userApi from "../api/userApi";

const initialDialogs = {
    form: false,
    details: false,
    status: false,
};

const initialSnackbar = {
    open: false,
    severity: "success",
    message: "",
};

const useUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);

    const [dialogs, setDialogs] = useState(initialDialogs);

    const [snackbar, setSnackbar] = useState(initialSnackbar);

    const showSnackbar = (message, severity = "success") => {

        setSnackbar({
            open: true,
            severity,
            message,
        });

    };

    const closeSnackbar = () => {

        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));

    };

    const loadUsers = useCallback(async () => {

        try {

            setLoading(true);

            const response = await userApi.getAll();

            setUsers(response.data);

            setError(null);

        } catch (err) {

            console.error(err);

            setError("Failed to load users.");

            showSnackbar("Failed to load users.", "error");

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadUsers();

    }, [loadUsers]);

    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const matchesSearch =
                user.fullName
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||

                user.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesRole =
                !roleFilter ||
                user.role === roleFilter;

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

            showSnackbar(
                "User created successfully."
            );

            await loadUsers();

            closeDialogs();

        } catch (err) {

            console.error(err);

            showSnackbar(
                "Failed to create user.",
                "error"
            );

        }

    };

    const updateUser = async (id, user) => {

        try {

            await userApi.update(id, user);

            showSnackbar(
                "User updated successfully."
            );

            await loadUsers();

            closeDialogs();

        } catch (err) {

            console.error(err);

            showSnackbar(
                "Failed to update user.",
                "error"
            );

        }

    };

    const updateStatus = async () => {

        if (!selectedUser) return;

        try {

            await userApi.updateStatus(
                selectedUser.id,
                !selectedUser.active
            );

            showSnackbar(
                "User status updated."
            );

            await loadUsers();

            closeDialogs();

        } catch (err) {

            console.error(err);

            showSnackbar(
                "Failed to update status.",
                "error"
            );

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

        snackbar,

        closeSnackbar,

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