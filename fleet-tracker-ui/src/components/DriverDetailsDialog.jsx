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

    if (!driver) {

        return null;

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                Driver Details

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    mt={1}
                >

                    <Grid item xs={6}>
                        <Typography color="text.secondary">
                            Driver Name
                        </Typography>

                        <Typography fontWeight="bold">
                            {driver.driverName}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography color="text.secondary">
                            License Number
                        </Typography>

                        <Typography fontWeight="bold">
                            {driver.licenseNumber}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography color="text.secondary">
                            Phone Number
                        </Typography>

                        <Typography fontWeight="bold">
                            {driver.phoneNumber}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography color="text.secondary">
                            Experience
                        </Typography>

                        <Typography fontWeight="bold">
                            {driver.experience} Years
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography color="text.secondary">
                            Assigned Vehicle
                        </Typography>

                        <Typography fontWeight="bold">
                            {driver.assignedVehicle || "-"}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography color="text.secondary">
                            Status
                        </Typography>

                        <Typography fontWeight="bold">
                            {driver.status}
                        </Typography>
                    </Grid>

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="body2"
                    color="text.secondary"
                >

                    Driver ID : {driver.id}

                </Typography>

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

export default DriverDetailsDialog;