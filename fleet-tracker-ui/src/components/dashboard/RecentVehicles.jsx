import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip
} from "@mui/material";

function RecentVehicles({ vehicles = [] }) {

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
                height: 360
            }}
        >

            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
            >
                Recent Vehicles
            </Typography>

            <Table size="small">

                <TableHead>

                    <TableRow>

                        <TableCell><b>Vehicle</b></TableCell>

                        <TableCell><b>Driver</b></TableCell>

                        <TableCell><b>Status</b></TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {vehicles.map(vehicle => (

                        <TableRow key={vehicle.id}>

                            <TableCell>

                                {vehicle.vehicleNumber}

                            </TableCell>

                            <TableCell>

                                {vehicle.driverName}

                            </TableCell>

                            <TableCell>

                                <Chip
                                    label={vehicle.status}
                                    size="small"
                                    color={
                                        vehicle.status === "ACTIVE"
                                            ? "success"
                                            : vehicle.status === "MAINTENANCE"
                                            ? "warning"
                                            : "default"
                                    }
                                />

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </Paper>

    );

}

export default RecentVehicles;