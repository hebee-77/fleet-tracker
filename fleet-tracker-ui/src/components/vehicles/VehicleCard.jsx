import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function VehicleCard({ vehicle, onClick }) {
    return (
        <Card
            onClick={onClick}
            sx={{
                cursor: "pointer",
                borderRadius: "14px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                transition: "all 0.2s ease",
                "&:hover": {
                    boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
                    transform: "translateY(-2px)"
                }
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            fontWeight: 800,
                            color: "#0F172A",
                            fontSize: "1rem"
                        }}
                    >
                        <LocalShippingIcon sx={{ color: "#2563EB" }} />
                        {vehicle.vehicleNumber}
                    </Typography>
                    <Chip
                        label={vehicle.status}
                        size="small"
                        sx={{
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            height: 22,
                            bgcolor:
                                vehicle.status === "ACTIVE"
                                    ? "#16A34A"
                                    : vehicle.status === "MAINTENANCE"
                                    ? "#F59E0B"
                                    : "#DC2626",
                            color: "#FFFFFF"
                        }}
                    />
                </Box>

                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748B", mb: 0.5 }}>
                    <PersonIcon fontSize="small" sx={{ color: "#94A3B8" }} />
                    <strong>Driver:</strong> {vehicle.driverName || "Unassigned"}
                </Typography>

                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748B", mb: 0.5 }}>
                    <SpeedIcon fontSize="small" sx={{ color: "#16A34A" }} />
                    <strong>Speed:</strong> {vehicle.speed != null ? `${vehicle.speed.toFixed(1)} km/h` : "0.0 km/h"}
                </Typography>

                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748B" }}>
                    <LocationOnIcon fontSize="small" sx={{ color: "#DC2626" }} />
                    <strong>Location:</strong> {vehicle.currentLatitude?.toFixed(4)}, {vehicle.currentLongitude?.toFixed(4)}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default VehicleCard;
