import { Card, CardContent, Typography, Chip } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CircleIcon from "@mui/icons-material/Circle";
function VehicleCard({ vehicle, onClick }) {

    return (

        <Card
    onClick={onClick}
    sx={{
        cursor: "pointer",
        transition: "0.3s"
    }}
>

            <CardContent>

                <Typography
    variant="h5"
    sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        fontWeight: "bold"
    }}
>
    <LocalShippingIcon color="primary" />

    {vehicle.vehicleNumber}
</Typography>

                <Typography
    sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mt: 2
    }}
>
    <PersonIcon color="action" />

    <strong>Driver :</strong>

    {vehicle.driverName}
</Typography>

                <Typography
    sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mt: 1
    }}
>
    <SpeedIcon color="success" />

    <strong>Speed :</strong>

    {vehicle.speed.toFixed(1)} km/h
</Typography>

                <Typography
    sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mt: 1
    }}
>
    <LocationOnIcon color="error" />

    <strong>Latitude :</strong>

    {vehicle.currentLatitude.toFixed(5)}
</Typography>

                <Typography
    sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mt: 1
    }}
>
    <LocationOnIcon color="error" />

    <strong>Longitude :</strong>

    {vehicle.currentLongitude.toFixed(5)}
</Typography>

                <Chip
    icon={<CircleIcon />}
    label={vehicle.status}
    color={
        vehicle.status === "ACTIVE"
            ? "success"
            : vehicle.status === "IDLE"
            ? "warning"
            : "error"
    }
    sx={{
        mt: 2,
        fontWeight: "bold"
    }}
/>

            </CardContent>

        </Card>

    );
}

export default VehicleCard;