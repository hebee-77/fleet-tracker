import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import SearchInput from "../common/SearchInput";
import PrimaryButton from "../common/PrimaryButton";

const UserToolbar = ({
    search,
    onSearchChange,

    roleFilter,
    onRoleChange,

    statusFilter,
    onStatusChange,

    onAddUser
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                    flex: 1
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 260,
                        maxWidth: 400
                    }}
                >
                    <SearchInput
                        value={search}
                        onChange={onSearchChange}
                        placeholder="Search users..."
                        width="100%"
                    />
                </Box>

                <FormControl
                    size="small"
                    sx={{
                        minWidth: 140
                    }}
                >
                    <InputLabel id="role-select-label" sx={{ fontSize: "0.875rem" }}>
                        Role
                    </InputLabel>

                    <Select
                        labelId="role-select-label"
                        value={roleFilter}
                        label="Role"
                        onChange={onRoleChange}
                        sx={{
                            borderRadius: "12px",
                            bgcolor: "#FFFFFF",
                            fontSize: "0.875rem"
                        }}
                    >
                        <MenuItem value="">
                            All Roles
                        </MenuItem>
                        <MenuItem value="ADMIN">
                            Administrator
                        </MenuItem>
                        <MenuItem value="MANAGER">
                            Manager
                        </MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    size="small"
                    sx={{
                        minWidth: 140
                    }}
                >
                    <InputLabel id="status-select-label" sx={{ fontSize: "0.875rem" }}>
                        Status
                    </InputLabel>

                    <Select
                        labelId="status-select-label"
                        value={statusFilter}
                        label="Status"
                        onChange={onStatusChange}
                        sx={{
                            borderRadius: "12px",
                            bgcolor: "#FFFFFF",
                            fontSize: "0.875rem"
                        }}
                    >
                        <MenuItem value="">
                            All Status
                        </MenuItem>
                        <MenuItem value="ACTIVE">
                            Active
                        </MenuItem>
                        <MenuItem value="INACTIVE">
                            Inactive
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <PrimaryButton
                startIcon={<AddIcon />}
                onClick={onAddUser}
            >
                Add User
            </PrimaryButton>
        </Box>
    );
};

export default UserToolbar;