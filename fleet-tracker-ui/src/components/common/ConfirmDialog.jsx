import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button
} from "@mui/material";

import PrimaryButton from "./PrimaryButton";

const ConfirmDialog = ({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onClose,
    color = "#DC2626"
}) => {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    p: 1,
                    minWidth: 420
                }
            }}
        >

            <DialogTitle
                sx={{
                    fontWeight: 700
                }}
            >
                {title}
            </DialogTitle>

            <DialogContent>

                <Typography>

                    {message}

                </Typography>

            </DialogContent>

            <DialogActions
                sx={{
                    p: 3
                }}
            >

                <Button
                    onClick={onClose}
                >
                    {cancelText}
                </Button>

                <PrimaryButton
                    color={color}
                    onClick={onConfirm}
                >
                    {confirmText}
                </PrimaryButton>

            </DialogActions>

        </Dialog>

    );

};

export default ConfirmDialog;