import {
    Avatar,
    Box,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import PrimaryButton from "../common/PrimaryButton";

const UserDetailsDialog = ({
    open,
    user,
    onClose
}) => {

    if (!user) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        overflow: "hidden"
                    }
                }
            }}
        >
            <Box
                sx={{
                    background: "#2563EB",
                    color: "#FFFFFF",
                    p: 4,
                    textAlign: "center"
                }}
            >
                <Avatar
                    sx={{
                        width: 84,
                        height: 84,
                        mx: "auto",
                        mb: 2,
                        bgcolor: "#FFFFFF",
                        color: "#2563EB",
                        fontSize: 30,
                        fontWeight: 700
                    }}
                >
                    {user.fullName
                        ?.split(" ")
                        .map(name => name[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase() || "U"}
                </Avatar>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    {user.fullName}
                </Typography>

                <Typography sx={{ opacity: 0.9 }}>
                    {user.email}
                </Typography>
            </Box>

            <DialogTitle sx={{ fontWeight: 700 }}>
                User Information
            </DialogTitle>

            <Divider />

            <DialogContent>
                <Grid
                    container
                    spacing={3}
                    mt={0.5}
                >
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            User ID
                        </Typography>

                        <Typography fontWeight={600}>
                            {user.id}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Role
                        </Typography>

                        <Box mt={1}>
                            <Chip
                                label={user.role}
                                color={
                                    user.role === "ADMIN"
                                        ? "secondary"
                                        : "primary"
                                }
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Status
                        </Typography>

                        <Box mt={1}>
                            <Chip
                                label={user.active ? "Active" : "Inactive"}
                                color={user.active ? "success" : "default"}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Created On
                        </Typography>

                        <Typography fontWeight={600}>
                            {user.createdAt
                                ? new Date(user.createdAt).toLocaleString()
                                : "-"}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
                <PrimaryButton
                    startIcon={<PersonIcon />}
                    onClick={onClose}
                >
                    Close
                </PrimaryButton>
            </DialogActions>

        </Dialog>
    );
};

export default UserDetailsDialog;