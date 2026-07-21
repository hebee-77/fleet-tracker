import { Box, MenuItem, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FilterAltOff as FilterAltOffIcon } from "@mui/icons-material";

import SearchInput from "../common/SearchInput";
import PrimaryButton from "../common/PrimaryButton";

const vehicleTypes = ["TRUCK", "VAN", "MINI_TRUCK", "BIKE"];
const vehicleStatuses = ["ACTIVE", "MAINTENANCE", "INACTIVE"];

const VehicleToolbar = ({
    search,
    onSearchChange,
    statusFilter,
    onStatusChange,
    typeFilter,
    onTypeChange,
    onClearFilters,
    onAddVehicle
}) => {
    const hasFilters = search || statusFilter || typeFilter;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1.5
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    flexWrap: "wrap",
                    flex: 1
                }}
            >
                <Box sx={{ flex: 1, minWidth: 240, maxWidth: 380 }}>
                    <SearchInput
                        placeholder="Search Vehicle or Driver..."
                        value={search}
                        onChange={onSearchChange}
                        width="100%"
                    />
                </Box>

                <TextField
                    select
                    label="Status"
                    size="small"
                    value={statusFilter}
                    onChange={onStatusChange}
                    sx={{
                        width: 130,
                        bgcolor: "#FFFFFF",
                        "& .MuiOutlinedInput-root": { height: 38, borderRadius: "10px", fontSize: "0.85rem" }
                    }}
                >
                    <MenuItem value="">All Status</MenuItem>
                    {vehicleStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Vehicle Type"
                    size="small"
                    value={typeFilter}
                    onChange={onTypeChange}
                    sx={{
                        width: 140,
                        bgcolor: "#FFFFFF",
                        "& .MuiOutlinedInput-root": { height: 38, borderRadius: "10px", fontSize: "0.85rem" }
                    }}
                >
                    <MenuItem value="">All Types</MenuItem>
                    {vehicleTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>

                {hasFilters && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<FilterAltOffIcon sx={{ fontSize: 18 }} />}
                        sx={{
                            height: 38,
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.8rem"
                        }}
                        onClick={onClearFilters}
                    >
                        Clear Filters
                    </Button>
                )}
            </Box>

            <PrimaryButton
                startIcon={<AddIcon />}
                onClick={onAddVehicle}
            >
                Add Vehicle
            </PrimaryButton>
        </Box>
    );
};

export default VehicleToolbar;
