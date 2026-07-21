import { useEffect, useMemo, useState } from "react";
import { Alert, Box } from "@mui/material";

import PageHeader from "../components/common/PageHeader";
import ContentCard from "../components/common/ContentCard";
import LoadingScreen from "../components/common/LoadingScreen";

import UserStats from "../components/users/UserStats";
import UserToolbar from "../components/users/UserToolbar";
import UserTable from "../components/users/UserTable";

import userService from "../services/userService";

const UserManagement = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            setLoading(true);

            const response = await userService.getAllUsers();

            setUsers(response.data);

            setError("");

        } catch (error) {

            console.error(error);

            setError("Failed to load users.");

        } finally {

            setLoading(false);

        }

    };

    const filteredUsers = useMemo(() => {

        return users.filter(user => {

            const searchMatch =
                user.fullName
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||

                user.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const roleMatch =
                roleFilter === "" ||
                user.role === roleFilter;

            const statusMatch =
                statusFilter === "" ||
                (statusFilter === "ACTIVE"
                    ? user.active
                    : !user.active);

            return (
                searchMatch &&
                roleMatch &&
                statusMatch
            );

        });

    }, [
        users,
        search,
        roleFilter,
        statusFilter
    ]);

    const handleView = (user) => {

        console.log("View User", user);

    };

    const handleEdit = (user) => {

        console.log("Edit User", user);

    };

    const handleToggleStatus = (user) => {

        console.log("Toggle Status", user);

    };

    const handleAddUser = () => {

        console.log("Add User");

    };

    if (loading) {

        return (
            <LoadingScreen
                text="Loading users..."
            />
        );

    }

    return (

        <Box
            sx={{
                background: "#F5F7FB",
                minHeight: "100vh",
                p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                }
            }}
        >

            <PageHeader

                title="User Management"

                subtitle="Manage system users, roles and account status."

                breadcrumbs={[
                    {
                        label: "Dashboard",
                        href: "/"
                    },
                    {
                        label: "Users"
                    }
                ]}

            />

            {

                error && (

                    <Alert
                        severity="error"
                        sx={{
                            mb: 3,
                            borderRadius: 2
                        }}
                    >

                        {error}

                    </Alert>

                )

            }

            <UserStats
                users={users}
            />

            <UserToolbar

                search={search}

                onSearchChange={(e) =>
                    setSearch(e.target.value)
                }

                roleFilter={roleFilter}

                onRoleChange={(e) =>
                    setRoleFilter(e.target.value)
                }

                statusFilter={statusFilter}

                onStatusChange={(e) =>
                    setStatusFilter(e.target.value)
                }

                onAddUser={handleAddUser}

            />

            <ContentCard>

                <UserTable

                    users={filteredUsers}

                    loading={loading}

                    onView={handleView}

                    onEdit={handleEdit}

                    onToggleStatus={
                        handleToggleStatus
                    }

                />

            </ContentCard>

        </Box>

    );

};

export default UserManagement;