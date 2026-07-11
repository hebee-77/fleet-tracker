import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

function DeleteVehicleDialog({

    open,
    vehicle,
    onClose,
    onConfirm

}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >

            <DialogTitle>

                Delete Vehicle

            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    Are you sure you want to delete

                    <strong>
                        {" "}
                        {vehicle?.vehicleNumber}
                    </strong>

                    ?

                    <br />
                    <br />

                    This action cannot be undone.

                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

                    Cancel

                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                >

                    Delete

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default DeleteVehicleDialog;