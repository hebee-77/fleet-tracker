import {
    Avatar,
    Box,
    Chip,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import {
    DataGrid
} from "@mui/x-data-grid";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import EmptyState from "../common/EmptyState";

const UserTable = ({
    users = [],
    loading = false,
    onView,
    onEdit,
    onToggleStatus
}) => {

    const columns = [

        {
            field: "avatar",
            headerName: "User",
            flex: 1.6,
            sortable: false,

            renderCell: (params) => {

                const user = params.row;

                return (

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ height: "100%" }}
                    >

                        <Avatar
                            sx={{
                                bgcolor: "#2563EB",
                                width: 42,
                                height: 42,
                                fontWeight: 600
                            }}
                        >
                            {user.fullName
                                ?.split(" ")
                                .map(word => word[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                        </Avatar>

                        <Box>

                            <Typography
                                fontWeight={600}
                                color="#111827"
                            >
                                {user.fullName}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
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
            width: 160,

            renderCell: (params) => (

                <Chip
                    label={params.value}
                    color={
                        params.value === "ADMIN"
                            ? "secondary"
                            : "primary"
                    }
                    variant="filled"
                    size="small"
                />

            )

        },

        {
            field: "active",
            headerName: "Status",
            width: 150,

            renderCell: (params) => (

                <Chip
                    label={
                        params.value
                            ? "Active"
                            : "Inactive"
                    }
                    color={
                        params.value
                            ? "success"
                            : "default"
                    }
                    size="small"
                />

            )

        },

        {
            field: "createdAt",
            headerName: "Created",
            width: 180,

            valueFormatter: (value) => {

                if (!value) return "-";

                return new Date(value)
                    .toLocaleDateString();

            }

        },

        {
            field: "actions",
            headerName: "Actions",
            width: 170,
            sortable: false,

            renderCell: (params) => (

                <Stack
                    direction="row"
                    spacing={1}
                >

                    <Tooltip title="View">

                        <IconButton
                            color="primary"
                            onClick={() =>
                                onView(params.row)
                            }
                        >

                            <VisibilityOutlinedIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Edit">

                        <IconButton
                            color="warning"
                            onClick={() =>
                                onEdit(params.row)
                            }
                        >

                            <EditOutlinedIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip
                        title={
                            params.row.active
                                ? "Deactivate"
                                : "Activate"
                        }
                    >

                        <IconButton
                            color={
                                params.row.active
                                    ? "error"
                                    : "success"
                            }
                            onClick={() =>
                                onToggleStatus(params.row)
                            }
                        >

                            {
                                params.row.active
                                    ? <LockOutlinedIcon />
                                    : <LockOpenOutlinedIcon />
                            }

                        </IconButton>

                    </Tooltip>

                </Stack>

            )

        }

    ];

    return (

        <Box>

            {

                users.length === 0
                    ? (

                        <EmptyState
                            title="No Users Found"
                            subtitle="Create your first user to get started."
                        />

                    )

                    : (

                        <DataGrid

                            rows={users}

                            columns={columns}

                            getRowId={(row) => row.id}

                            loading={loading}

                            pageSizeOptions={[5, 10, 20]}

                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                        page: 0
                                    }
                                }
                            }}

                            disableRowSelectionOnClick

                            rowHeight={74}

                            sx={{

                                border: "none",

                                "& .MuiDataGrid-columnHeaders": {

                                    backgroundColor: "#F8FAFC",

                                    fontWeight: 700,

                                    borderBottom:
                                        "1px solid #E5E7EB"

                                },

                                "& .MuiDataGrid-cell": {

                                    borderBottom:
                                        "1px solid #F3F4F6"

                                },

                                "& .MuiDataGrid-row:hover": {

                                    backgroundColor:
                                        "#F9FAFB"

                                },

                                "& .MuiDataGrid-footerContainer": {

                                    borderTop:
                                        "1px solid #E5E7EB"

                                }

                            }}

                        />

                    )

            }

        </Box>

    );

};

export default UserTable;