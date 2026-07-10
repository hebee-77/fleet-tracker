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

            <DialogTitle>

                Vehicle Details

            </DialogTitle>

            <DialogContent dividers>

                <Stack spacing={2}>

                    <Typography><b>Vehicle Number:</b> {vehicle.vehicleNumber}</Typography>

                    <Typography><b>Driver:</b> {vehicle.driverName}</Typography>

                    <Typography><b>Type:</b> {vehicle.vehicleType}</Typography>

                    <Typography><b>Status:</b> {vehicle.status}</Typography>

                    <Typography><b>Fuel:</b> {vehicle.fuelType}</Typography>

                    <Typography><b>Capacity:</b> {vehicle.capacity} kg</Typography>

                    <Typography><b>Speed:</b> {vehicle.speed.toFixed(1)} km/h</Typography>

                    <Typography><b>Latitude:</b> {vehicle.currentLatitude.toFixed(6)}</Typography>

                    <Typography><b>Longitude:</b> {vehicle.currentLongitude.toFixed(6)}</Typography>

                    <Typography><b>Created:</b> {vehicle.createdAt}</Typography>

                    <Typography><b>Updated:</b> {vehicle.updatedAt}</Typography>

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