import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@mui/material";

function DeleteDriverDialog({
    open,
    driver,
    onClose,
    onConfirm
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                Delete Driver
            </DialogTitle>

            <DialogContent>
                <Typography variant="body2">
                    Are you sure you want to delete <strong>{driver?.driverName}</strong>?
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDriverDialog;
