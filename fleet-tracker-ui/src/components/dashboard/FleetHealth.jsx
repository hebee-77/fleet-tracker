import {
    Paper,
    Typography,
    Stack,
    Divider
} from "@mui/material";

function FleetHealth({ vehicles = [] }) {

    const totalVehicles = vehicles.length;

    const activeVehicles = vehicles.filter(
        vehicle => vehicle.status === "ACTIVE"
    ).length;

    const inactiveVehicles = vehicles.filter(
        vehicle => vehicle.status === "INACTIVE"
    ).length;

    const maintenanceVehicles = vehicles.filter(
        vehicle => vehicle.status === "MAINTENANCE"
    ).length;

    const averageSpeed =
        totalVehicles > 0
            ? (
                  vehicles.reduce(
                      (sum, vehicle) => sum + (vehicle.speed || 0),
                      0
                  ) / totalVehicles
              ).toFixed(1)
            : 0;

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
                height: "100%"
            }}
        >

            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
            >
                Fleet Health
            </Typography>

            <Stack spacing={2}>

                <Typography>
                    🚚 Total Vehicles : <b>{totalVehicles}</b>
                </Typography>

                <Divider />

                <Typography>
                    🟢 Active : <b>{activeVehicles}</b>
                </Typography>

                <Typography>
                    🔴 Inactive : <b>{inactiveVehicles}</b>
                </Typography>

                <Typography>
                    🟠 Maintenance : <b>{maintenanceVehicles}</b>
                </Typography>

                <Divider />

                <Typography>
                    ⚡ Average Speed : <b>{averageSpeed} km/h</b>
                </Typography>

            </Stack>

        </Paper>

    );

}

export default FleetHealth;