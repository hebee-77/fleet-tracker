import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import PageHeader from "../components/common/PageHeader";
import ContentCard from "../components/common/ContentCard";
import LoadingScreen from "../components/common/LoadingScreen";
import PrimaryButton from "../components/common/PrimaryButton";

import DriverStats from "../components/drivers/DriverStats";
import DriverToolbar from "../components/drivers/DriverToolbar";
import DriverTable from "../components/drivers/DriverTable";
import DriverFormDialog from "../components/drivers/DriverFormDialog";
import DriverDetailsDialog from "../components/drivers/DriverDetailsDialog";
import DeleteDriverDialog from "../components/drivers/DeleteDriverDialog";

import useDrivers from "../hooks/useDrivers";

function DriverManagement() {
    const {
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
    } = useDrivers();

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
                title="Driver Management"
                subtitle="Manage driver profiles, licensing and vehicle assignments."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Drivers" }
                ]}
                action={
                    <PrimaryButton
                        startIcon={<AddIcon />}
                        onClick={() => openFormDialog()}
                    >
                        Add Driver
                    </PrimaryButton>
                }
            />

            <DriverStats drivers={drivers} />

            <ContentCard sx={{ p: 1.5 }}>
                <DriverToolbar
                    search={search}
                    onSearchChange={(e) => setSearch(e.target.value)}
                    statusFilter={statusFilter}
                    onStatusChange={(e) => setStatusFilter(e.target.value)}
                    experienceFilter={experienceFilter}
                    onExperienceChange={(e) => setExperienceFilter(e.target.value)}
                    onClearFilters={() => {
                        setSearch("");
                        setStatusFilter("");
                        setExperienceFilter("");
                    }}
                    onAddDriver={() => openFormDialog()}
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
                    <LoadingScreen text="Loading drivers..." />
                ) : (
                    <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0, height: "100%" }}>
                        <DriverTable
                            drivers={filteredDrivers}
                            onView={openDetailsDialog}
                            onEdit={openFormDialog}
                            onDelete={openDeleteDialog}
                        />
                    </Box>
                )}
            </ContentCard>

            <DriverDetailsDialog
                open={dialogs.details}
                driver={selectedDriver}
                onClose={closeDialogs}
            />

            <DriverFormDialog
                open={dialogs.form}
                onClose={closeDialogs}
                onSave={handleCreateOrUpdate}
                driver={selectedDriver}
            />

            <DeleteDriverDialog
                open={dialogs.delete}
                driver={selectedDriver}
                onClose={closeDialogs}
                onConfirm={handleDelete}
            />
        </Box>
    );
}

export default DriverManagement;