import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import PageHeader from "../components/common/PageHeader";
import ContentCard from "../components/common/ContentCard";
import LoadingScreen from "../components/common/LoadingScreen";
import PrimaryButton from "../components/common/PrimaryButton";

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
        users,
        filteredUsers,
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
        updateStatus
    } = useUsers();

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
                action={
                    <PrimaryButton
                        startIcon={<AddIcon />}
                        onClick={() => openFormDialog()}
                    >
                        Add User
                    </PrimaryButton>
                }
            />

            <UserStats users={users} />

            <ContentCard sx={{ p: 1.5 }}>
                <UserToolbar
                    search={search}
                    onSearchChange={(e) => setSearch(e.target.value)}
                    roleFilter={roleFilter}
                    onRoleChange={(e) => setRoleFilter(e.target.value)}
                    statusFilter={statusFilter}
                    onStatusChange={(e) => setStatusFilter(e.target.value)}
                    onAddUser={() => openFormDialog()}
                />
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
                {loading ? (
                    <LoadingScreen text="Loading users..." />
                ) : (
                    <Box
                        sx={{
                            flex: 1,
                            overflow: "hidden",
                            minHeight: 0,
                            height: "100%"
                        }}
                    >
                        <UserTable
                            users={filteredUsers}
                            onView={openDetailsDialog}
                            onEdit={openFormDialog}
                            onStatus={openStatusDialog}
                        />
                    </Box>
                )}
            </ContentCard>

           <UserFormDialog
    open={dialogs.form}
    mode={selectedUser ? "edit" : "add"}
    user={selectedUser}
    onClose={closeDialogs}
    onSave={async (userData) => {
        if (selectedUser) {
            await updateUser(selectedUser.id, userData);
        } else {
            await createUser(userData);
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
        </Box>
    );
};

export default UserManagement;