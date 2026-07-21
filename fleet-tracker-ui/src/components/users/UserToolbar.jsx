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
                gap: 2,
                mb: 3
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center"
                }}
            >

                <SearchInput
                    value={search}
                    onChange={onSearchChange}
                    placeholder="Search users..."
                    width={320}
                />

                <FormControl
                    size="small"
                    sx={{
                        minWidth: 160
                    }}
                >

                    <InputLabel>
                        Role
                    </InputLabel>

                    <Select
                        value={roleFilter}
                        label="Role"
                        onChange={onRoleChange}
                        sx={{
                            borderRadius: "12px"
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
                        minWidth: 160
                    }}
                >

                    <InputLabel>
                        Status
                    </InputLabel>

                    <Select
                        value={statusFilter}
                        label="Status"
                        onChange={onStatusChange}
                        sx={{
                            borderRadius: "12px"
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