import { Box, Chip, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import {
    VisibilityOutlined as VisibilityOutlinedIcon,
    EditOutlined as EditOutlinedIcon,
    DeleteOutlined
} from "@mui/icons-material";

import EmptyState from "../common/EmptyState";

const DriverTable = ({
    drivers = [],
    loading = false,
    onView,
    onEdit,
    onDelete
}) => {
    const getStatusChipColor = (status) => {
        switch (status) {
            case "AVAILABLE":
                return { bg: "#16A34A", color: "#FFFFFF" };
            case "ON_TRIP":
                return { bg: "#F59E0B", color: "#FFFFFF" };
            default:
                return { bg: "#94A3B8", color: "#FFFFFF" };
        }
    };

    const columns = [
        {
            field: "driverName",
            headerName: "Driver",
            flex: 1.4,
            minWidth: 150
        },
        {
            field: "licenseNumber",
            headerName: "License Number",
            flex: 1.3,
            minWidth: 140
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1.2,
            minWidth: 130
        },
        {
            field: "experience",
            headerName: "Experience",
            flex: 0.9,
            minWidth: 100,
            valueGetter: (value) => `${value || 0} yrs`
        },
        {
            field: "assignedVehicle",
            headerName: "Assigned Vehicle",
            flex: 1.2,
            minWidth: 130,
            valueGetter: (value) => value || "Unassigned"
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                const style = getStatusChipColor(params.value);
                return (
                    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                        <Chip
                            label={params.value}
                            size="small"
                            sx={{
                                bgcolor: style.bg,
                                color: style.color,
                                fontWeight: 700,
                                fontSize: "0.7rem",
                                borderRadius: "16px",
                                px: 0.5,
                                height: 22
                            }}
                        />
                    </Box>
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 130,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={0.25} alignItems="center" sx={{ height: "100%" }}>
                    <Tooltip title="View Driver">
                        <IconButton
                            size="small"
                            sx={{ color: "#2563EB", p: 0.5, "&:hover": { bgcolor: "#EFF6FF" } }}
                            onClick={() => onView(params.row)}
                        >
                            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Driver">
                        <IconButton
                            size="small"
                            sx={{ color: "#F59E0B", p: 0.5, "&:hover": { bgcolor: "#FEF3C7" } }}
                            onClick={() => onEdit(params.row)}
                        >
                            <EditOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Driver">
                        <IconButton
                            size="small"
                            sx={{ color: "#DC2626", p: 0.5, "&:hover": { bgcolor: "#FEE2E2" } }}
                            onClick={() => onDelete(params.row)}
                        >
                            <DeleteOutlined sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        }
    ];

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {drivers.length === 0 ? (
                <EmptyState
                    title="No Drivers Found"
                    subtitle="Register your first driver to get started."
                />
            ) : (
                <DataGrid
                    rows={drivers}
                    columns={columns}
                    getRowId={(row) => row.id}
                    loading={loading}
                    pageSizeOptions={[10, 15, 25, 50]}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 15 }
                        }
                    }}
                    disableRowSelectionOnClick
                    rowHeight={52}
                    columnHeaderHeight={44}
                    sx={{
                        border: "none",
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#FFFFFF",
                            borderBottom: "1px solid #E2E8F0",
                            color: "#0F172A",
                            fontWeight: 700,
                            fontSize: "0.825rem",
                            minHeight: "44px !important",
                            maxHeight: "44px !important"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "1px solid #F1F5F9",
                            alignContent: "center",
                            fontSize: "0.825rem"
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#F8FAFC"
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "1px solid #E2E8F0",
                            minHeight: "44px !important"
                        }
                    }}
                />
            )}
        </Box>
    );
};

export default DriverTable;
