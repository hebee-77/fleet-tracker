import { Fragment } from "react";
import {
    MapContainer,
    TileLayer,
    Popup,
    Polyline
} from "react-leaflet";

import {
    Typography,
    Chip,
    Box,
    Paper
} from "@mui/material";

import "leaflet/dist/leaflet.css";

import AnimatedMarker from "./AnimatedMarker";
import MapUpdater from "./MapUpdater";

function MapView({
    vehicles = [],
    selectedVehicle,
    vehicleRoutes = {},
    setSelectedVehicle
}) {
    const center = selectedVehicle?.currentLatitude && selectedVehicle?.currentLongitude
        ? [selectedVehicle.currentLatitude, selectedVehicle.currentLongitude]
        : [17.3850, 78.4867];

    return (
        <Box sx={{ position: "relative", width: "100%", height: "100%", minHeight: 400 }}>
            <MapContainer
                center={center}
                zoom={12}
                scrollWheelZoom={true}
                style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "14px"
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater selectedVehicle={selectedVehicle} />

                {vehicles.map((vehicle) => (
                    <Fragment key={vehicle.id}>
                        <Polyline
                            positions={vehicleRoutes?.[vehicle.id] || []}
                            pathOptions={{
                                color: selectedVehicle?.id === vehicle.id ? "#2563EB" : "#60A5FA",
                                weight: selectedVehicle?.id === vehicle.id ? 5 : 3,
                                opacity: 0.85,
                                lineCap: "round",
                                lineJoin: "round"
                            }}
                        />

                        <AnimatedMarker
                            vehicle={vehicle}
                            eventHandlers={{
                                click: () => {
                                    if (setSelectedVehicle) setSelectedVehicle(vehicle);
                                }
                            }}
                        >
                            <Popup autoPan={false}>
                                <Box sx={{ p: 0.5, minWidth: 150 }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: "#0F172A",
                                            fontSize: "0.9rem"
                                        }}
                                    >
                                        🚚 {vehicle.vehicleNumber}
                                    </Typography>
                                    <Chip
                                        label={vehicle.status}
                                        size="small"
                                        sx={{
                                            mt: 0.5,
                                            mb: 0.5,
                                            fontWeight: 700,
                                            fontSize: "0.7rem",
                                            height: 20,
                                            bgcolor:
                                                vehicle.status === "ACTIVE"
                                                    ? "#16A34A"
                                                    : vehicle.status === "MAINTENANCE"
                                                    ? "#F59E0B"
                                                    : "#DC2626",
                                            color: "#FFFFFF"
                                        }}
                                    />
                                    <Typography sx={{ fontSize: "0.8rem", color: "#475569" }}>
                                        👤 Driver: {vehicle.driverName || "N/A"}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.8rem", color: "#475569" }}>
                                        ⚡ Speed: {Number(vehicle.speed || 0).toFixed(1)} km/h
                                    </Typography>
                                </Box>
                            </Popup>
                        </AnimatedMarker>
                    </Fragment>
                ))}
            </MapContainer>

            {/* Quick Vehicle Select Floating Card Overlay */}
            {selectedVehicle && (
                <Paper
                    elevation={0}
                    sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        zIndex: 1000,
                        p: 2,
                        borderRadius: "12px",
                        bgcolor: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                        minWidth: 240
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>
                            {selectedVehicle.vehicleNumber}
                        </Typography>
                        <Chip
                            label={selectedVehicle.status}
                            size="small"
                            sx={{
                                bgcolor:
                                    selectedVehicle.status === "ACTIVE"
                                        ? "#16A34A"
                                        : selectedVehicle.status === "MAINTENANCE"
                                        ? "#F59E0B"
                                        : "#DC2626",
                                color: "#FFFFFF",
                                fontWeight: 700,
                                fontSize: "0.7rem",
                                height: 20
                            }}
                        />
                    </Box>
                    <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.8rem", mb: 0.3 }}>
                        Driver: <strong>{selectedVehicle.driverName || "Unassigned"}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.8rem" }}>
                        Current Speed: <strong>{Number(selectedVehicle.speed || 0).toFixed(1)} km/h</strong>
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}

export default MapView;
