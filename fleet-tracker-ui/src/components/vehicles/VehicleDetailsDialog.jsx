import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack
} from "@mui/material";

function VehicleDetailsDialog({
    open,
    vehicle,
    onClose
}) {
    if (!vehicle) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 700 }}>
                Vehicle Details
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={1.5}>
                    <Typography variant="body2"><b>Vehicle Number:</b> {vehicle.vehicleNumber}</Typography>
                    <Typography variant="body2"><b>Driver:</b> {vehicle.driverName || "Unassigned"}</Typography>
                    <Typography variant="body2"><b>Type:</b> {vehicle.vehicleType}</Typography>
                    <Typography variant="body2"><b>Status:</b> {vehicle.status}</Typography>
                    <Typography variant="body2"><b>Fuel:</b> {vehicle.fuelType || "N/A"}</Typography>
                    <Typography variant="body2"><b>Capacity:</b> {vehicle.capacity ? `${vehicle.capacity} kg` : "N/A"}</Typography>
                    <Typography variant="body2"><b>Speed:</b> {vehicle.speed != null ? `${vehicle.speed.toFixed(1)} km/h` : "0.0 km/h"}</Typography>
                    <Typography variant="body2"><b>Latitude:</b> {vehicle.currentLatitude != null ? vehicle.currentLatitude.toFixed(6) : "N/A"}</Typography>
                    <Typography variant="body2"><b>Longitude:</b> {vehicle.currentLongitude != null ? vehicle.currentLongitude.toFixed(6) : "N/A"}</Typography>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default VehicleDetailsDialog;
