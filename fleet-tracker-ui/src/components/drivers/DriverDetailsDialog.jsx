import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Divider
} from "@mui/material";

function DriverDetailsDialog({
    open,
    onClose,
    driver
}) {
    if (!driver) return null;

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
                        p: 1
                    }
                }
            }}
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                Driver Details
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Driver Name</Typography>
                        <Typography fontWeight="bold" variant="body2">{driver.driverName}</Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">License Number</Typography>
                        <Typography fontWeight="bold" variant="body2">{driver.licenseNumber}</Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                        <Typography fontWeight="bold" variant="body2">{driver.phoneNumber}</Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Experience</Typography>
                        <Typography fontWeight="bold" variant="body2">{driver.experience} Years</Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Assigned Vehicle</Typography>
                        <Typography fontWeight="bold" variant="body2">{driver.assignedVehicle || "Unassigned"}</Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Status</Typography>
                        <Typography fontWeight="bold" variant="body2">{driver.status}</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="caption" color="text.secondary">
                    Driver ID: {driver.id}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DriverDetailsDialog;
