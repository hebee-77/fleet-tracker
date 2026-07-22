import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import PageHeader from "../components/common/PageHeader";
import ContentCard from "../components/common/ContentCard";
import LoadingScreen from "../components/common/LoadingScreen";
import PrimaryButton from "../components/common/PrimaryButton";

import VehicleStats from "../components/vehicles/VehicleStats";
import VehicleToolbar from "../components/vehicles/VehicleToolbar";
import VehicleTable from "../components/vehicles/VehicleTable";
import VehicleFormDialog from "../components/vehicles/VehicleFormDialog";
import VehicleDetailsDialog from "../components/vehicles/VehicleDetailsDialog";
import DeleteVehicleDialog from "../components/vehicles/DeleteVehicleDialog";

import useVehicles from "../hooks/useVehicles";

function VehicleManagement() {
    const {
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
    } = useVehicles();

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
                title="Vehicle Management"
                subtitle="Monitor and manage fleet vehicle records and assignments."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Vehicles" }
                ]}
                action={
                    <PrimaryButton
                        startIcon={<AddIcon />}
                        onClick={() => openFormDialog()}
                    >
                        Add Vehicle
                    </PrimaryButton>
                }
            />

            <VehicleStats vehicles={vehicles} />

            <ContentCard sx={{ p: 1.5 }}>
                <VehicleToolbar
                    search={search}
                    onSearchChange={(e) => setSearch(e.target.value)}
                    statusFilter={statusFilter}
                    onStatusChange={(e) => setStatusFilter(e.target.value)}
                    typeFilter={typeFilter}
                    onTypeChange={(e) => setTypeFilter(e.target.value)}
                    onClearFilters={() => {
                        setSearch("");
                        setStatusFilter("");
                        setTypeFilter("");
                    }}
                    onAddVehicle={() => openFormDialog()}
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
                    <LoadingScreen text="Loading vehicles..." />
                ) : (
                    <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0, height: "100%" }}>
                        <VehicleTable
                            vehicles={filteredVehicles}
                            onView={openDetailsDialog}
                            onEdit={openFormDialog}
                            onDelete={openDeleteDialog}
                        />
                    </Box>
                )}
            </ContentCard>

            <VehicleDetailsDialog
                open={dialogs.details}
                vehicle={selectedVehicle}
                onClose={closeDialogs}
            />

            <VehicleFormDialog
                open={dialogs.form}
                onClose={closeDialogs}
                onSave={handleCreateOrUpdate}
                vehicle={selectedVehicle}
            />

            <DeleteVehicleDialog
                open={dialogs.delete}
                vehicle={selectedVehicle}
                onClose={closeDialogs}
                onConfirm={handleDelete}
            />
        </Box>
    );
}

export default VehicleManagement;