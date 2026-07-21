import { Alert, Box, Snackbar } from "@mui/material";

import PageHeader from "../components/common/PageHeader";
import ContentCard from "../components/common/ContentCard";
import LoadingScreen from "../components/common/LoadingScreen";

import UserStats from "../components/users/UserStats";
import UserToolbar from "../components/users/UserToolbar";
import UserTable from "../components/users/UserTable";
import UserFormDialog from "../components/users/UserFormDialog";
import UserDetailsDialog from "../components/users/UserDetailsDialog";
import UserStatusDialog from "../components/users/UserStatusDialog";

import useUsers from "../hooks/useUsers";

const UserManagement = () => {

    const {

        loading,

        filteredUsers,

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

        users

    } = useUsers();

    return (

        <Box>

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



            <UserStats
                users={users}
            />

            <ContentCard>

                <UserToolbar

                    search={search}

                    setSearch={setSearch}

                    roleFilter={roleFilter}

                    setRoleFilter={setRoleFilter}

                    statusFilter={statusFilter}

                    setStatusFilter={setStatusFilter}

                    onAdd={() => openFormDialog()}

                />

            </ContentCard>

            <ContentCard>

                {

                    loading

                        ?

                        (

                            <LoadingScreen
                                text="Loading users..."
                            />

                        )

                        :

                        (

                            <UserTable

                                users={filteredUsers}

                                onView={openDetailsDialog}

                                onEdit={openFormDialog}

                                onStatus={openStatusDialog}

                            />

                        )

                }

            </ContentCard>            <UserFormDialog
                open={dialogs.form}
                user={selectedUser}
                onClose={closeDialogs}
                onSubmit={(userData) => {

                    if (selectedUser) {

                        updateUser(
                            selectedUser.id,
                            userData
                        );

                    } else {

                        createUser(userData);

                    }

                }}
            />

            <UserDetailsDialog
                open={dialogs.details}
                user={selectedUser}
                onClose={closeDialogs}
            />

            <UserStatusDialog
                open={dialogs.status}
                user={selectedUser}
                onClose={closeDialogs}
                onConfirm={updateStatus}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >

                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={closeSnackbar}
                    sx={{
                        width: "100%"
                    }}
                >

                    {snackbar.message}

                </Alert>

            </Snackbar>

        </Box>

    );

};

export default UserManagement;