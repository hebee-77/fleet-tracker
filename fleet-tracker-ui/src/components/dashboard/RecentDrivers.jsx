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

function RecentDrivers({ drivers = [] }) {

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
                Recent Drivers
            </Typography>

            <Table size="small">

                <TableHead>

                    <TableRow>

                        <TableCell><b>Driver</b></TableCell>

                        <TableCell><b>Vehicle</b></TableCell>

                        <TableCell><b>Status</b></TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {drivers.map(driver => (

                        <TableRow key={driver.id}>

                            <TableCell>

                                {driver.driverName}

                            </TableCell>

                            <TableCell>

                                {driver.assignedVehicle || "-"}

                            </TableCell>

                            <TableCell>

                                <Chip
                                    label={driver.status}
                                    size="small"
                                    color={
                                        driver.status === "AVAILABLE"
                                            ? "success"
                                            : driver.status === "ON_TRIP"
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

export default RecentDrivers;