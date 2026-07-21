import { Box, MenuItem, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FilterAltOff as FilterAltOffIcon } from "@mui/icons-material";

import SearchInput from "../common/SearchInput";
import PrimaryButton from "../common/PrimaryButton";

const driverStatuses = ["AVAILABLE", "ON_TRIP", "OFF_DUTY"];

const experienceOptions = [
    { label: "All Experience", value: "" },
    { label: "1+ Years", value: 1 },
    { label: "3+ Years", value: 3 },
    { label: "5+ Years", value: 5 },
    { label: "10+ Years", value: 10 }
];

const DriverToolbar = ({
    search,
    onSearchChange,
    statusFilter,
    onStatusChange,
    experienceFilter,
    onExperienceChange,
    onClearFilters,
    onAddDriver
}) => {
    const hasFilters = search || statusFilter || experienceFilter;

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
                        placeholder="Search Driver or License..."
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
                    {driverStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Experience"
                    size="small"
                    value={experienceFilter}
                    onChange={onExperienceChange}
                    sx={{
                        width: 150,
                        bgcolor: "#FFFFFF",
                        "& .MuiOutlinedInput-root": { height: 38, borderRadius: "10px", fontSize: "0.85rem" }
                    }}
                >
                    {experienceOptions.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                            {option.label}
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
                onClick={onAddDriver}
            >
                Add Driver
            </PrimaryButton>
        </Box>
    );
};

export default DriverToolbar;
