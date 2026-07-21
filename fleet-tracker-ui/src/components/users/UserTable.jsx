import {
    Avatar,
    Box,
    Chip,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import {
    VisibilityOutlined as VisibilityOutlinedIcon,
    EditOutlined as EditOutlinedIcon,
    DeleteOutlined,
    LockOutlined as LockOutlinedIcon,
    LockOpenOutlined as LockOpenOutlinedIcon
} from "@mui/icons-material";

import EmptyState from "../common/EmptyState";

const UserTable = ({
    users = [],
    loading = false,
    onView,
    onEdit,
    onStatus,
    onToggleStatus
}) => {
    const handleStatusClick = onStatus || onToggleStatus;

    const getRoleChipColor = (role) => {
        switch (role?.toUpperCase()) {
            case "ADMIN":
                return { bg: "#8B5CF6", color: "#FFFFFF" };
            case "MANAGER":
                return { bg: "#60A5FA", color: "#FFFFFF" };
            case "DRIVER":
                return { bg: "#F59E0B", color: "#FFFFFF" };
            default:
                return { bg: "#64748B", color: "#FFFFFF" };
        }
    };

    const columns = [
        {
            field: "avatar",
            headerName: "User",
            flex: 1.6,
            minWidth: 200,
            sortable: false,
            renderCell: (params) => {
                const user = params.row;
                const initials = user.fullName
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase() || "U";

                return (
                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{ height: "100%" }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: "#2563EB",
                                width: 32,
                                height: 32,
                                fontWeight: 700,
                                fontSize: "0.8rem"
                            }}
                        >
                            {initials}
                        </Avatar>

                        <Box sx={{ overflow: "hidden", lineHeight: 1.2 }}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    fontSize: "0.85rem",
                                    lineHeight: 1.2
                                }}
                            >
                                {user.fullName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#64748B",
                                    fontSize: "0.75rem",
                                    lineHeight: 1.1
                                }}
                            >
                                {user.email}
                            </Typography>
                        </Box>
                    </Stack>
                );
            }
        },
        {
            field: "role",
            headerName: "Role",
            width: 140,
            renderCell: (params) => {
                const style = getRoleChipColor(params.value);
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
            field: "active",
            headerName: "Status",
            width: 130,
            renderCell: (params) => (
                <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                    <Chip
                        label={params.value ? "Active" : "Inactive"}
                        size="small"
                        sx={{
                            bgcolor: params.value ? "#16A34A" : "#94A3B8",
                            color: "#FFFFFF",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            borderRadius: "16px",
                            px: 0.5,
                            height: 22
                        }}
                    />
                </Box>
            )
        },
        {
            field: "createdAt",
            headerName: "Created",
            width: 160,
            renderCell: (params) => {
                if (!params.value) return <Typography variant="body2" color="#64748B">-</Typography>;
                const dateObj = new Date(params.value);
                const dateStr = dateObj.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
                const timeStr = dateObj.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                });

                return (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, height: "100%" }}>
                        <Typography sx={{ fontSize: "0.8rem", color: "#0F172A", fontWeight: 600 }}>
                            {dateStr}
                        </Typography>
                        <Typography sx={{ fontSize: "0.725rem", color: "#64748B" }}>
                            {timeStr}
                        </Typography>
                    </Box>
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 140,
            sortable: false,
            renderCell: (params) => (
                <Stack
                    direction="row"
                    spacing={0.25}
                    alignItems="center"
                    sx={{ height: "100%" }}
                >
                    {onView && (
                        <Tooltip title="View Details">
                            <IconButton
                                size="small"
                                sx={{ color: "#2563EB", p: 0.5, "&:hover": { bgcolor: "#EFF6FF" } }}
                                onClick={() => onView(params.row)}
                            >
                                <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                    )}

                    {onEdit && (
                        <Tooltip title="Edit User">
                            <IconButton
                                size="small"
                                sx={{ color: "#F59E0B", p: 0.5, "&:hover": { bgcolor: "#FEF3C7" } }}
                                onClick={() => onEdit(params.row)}
                            >
                                <EditOutlinedIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Tooltip>
                    )}

                    {handleStatusClick && (
                        <Tooltip title={params.row.active ? "Deactivate User" : "Activate User"}>
                            <IconButton
                                size="small"
                                sx={{ color: "#DC2626", p: 0.5, "&:hover": { bgcolor: "#FEE2E2" } }}
                                onClick={() => handleStatusClick(params.row)}
                            >
                                {params.row.active ? (
                                    <DeleteOutlined sx={{ fontSize: 18 }} />
                                ) : (
                                    <LockOpenOutlinedIcon sx={{ fontSize: 18 }} />
                                )}
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            )
        }
    ];

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            {users.length === 0 ? (
                <EmptyState
                    title="No Users Found"
                    subtitle="Create your first user to get started."
                />
            ) : (
                <DataGrid
                    rows={users}
                    columns={columns}
                    getRowId={(row) => row.id}
                    loading={loading}
                    pageSizeOptions={[10, 15, 25, 50]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 15,
                                page: 0
                            }
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
                        "& .MuiDataGrid-columnHeaderTitle": {
                            fontWeight: 700
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
                            color: "#64748B",
                            minHeight: "44px !important"
                        }
                    }}
                />
            )}
        </Box>
    );
};

export default UserTable;