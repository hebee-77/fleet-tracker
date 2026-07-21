import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box
} from "@mui/material";

import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import PrimaryButton from "../common/PrimaryButton";

const UserStatusDialog = ({
    open,
    user,
    onClose,
    onConfirm
}) => {

    if (!user) return null;

    const isActive = user.active;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4
                }
            }}
        >

            <DialogTitle
                sx={{
                    textAlign: "center",
                    pt: 4
                }}
            >

                <Box
                    sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        backgroundColor: isActive
                            ? "#FEF2F2"
                            : "#ECFDF5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2
                    }}
                >

                    <WarningAmberRoundedIcon
                        sx={{
                            fontSize: 36,
                            color: isActive
                                ? "#DC2626"
                                : "#16A34A"
                        }}
                    />

                </Box>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >

                    {
                        isActive
                            ? "Deactivate User?"
                            : "Activate User?"
                    }

                </Typography>

            </DialogTitle>

            <DialogContent>

                <Typography
                    align="center"
                    color="text.secondary"
                >

                    {
                        isActive
                            ? `Are you sure you want to deactivate ${user.fullName}?`
                            : `Are you sure you want to activate ${user.fullName}?`
                    }

                </Typography>

            </DialogContent>

            <DialogActions
                sx={{
                    p: 3,
                    justifyContent: "center",
                    gap: 2
                }}
            >

                <PrimaryButton
                    color="#6B7280"
                    onClick={onClose}
                >
                    Cancel
                </PrimaryButton>

                <PrimaryButton
                    color={
                        isActive
                            ? "#DC2626"
                            : "#16A34A"
                    }
                    onClick={() => onConfirm(user)}
                >

                    {
                        isActive
                            ? "Deactivate"
                            : "Activate"
                    }

                </PrimaryButton>

            </DialogActions>

        </Dialog>

    );

};

export default UserStatusDialog;