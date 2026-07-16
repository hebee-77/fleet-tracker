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
    Box
} from "@mui/material";

import "leaflet/dist/leaflet.css";

import AnimatedMarker from "./AnimatedMarker";
import MapUpdater from "./MapUpdater";

function MapView({

    vehicles,

    selectedVehicle,

    vehicleRoutes,

    setSelectedVehicle

}) {

    return (

        <MapContainer

            center={[17.3850, 78.4867]}
            zoom={11}
            scrollWheelZoom={true}

            style={{
                height: "650px",
                width: "100%",
                borderRadius: "18px"
            }}

        >

            <TileLayer

                attribution="&copy; OpenStreetMap contributors"

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />

            <MapUpdater
                selectedVehicle={selectedVehicle}
            />

            {vehicles.map(vehicle => (

                <Fragment key={vehicle.id}>

                    <Polyline

                        positions={vehicleRoutes?.[vehicle.id] || []}

                        pathOptions={{

                            color:

                                selectedVehicle?.id === vehicle.id

                                    ? "#1976d2"

                                    : "#64b5f6",

                            weight:

                                selectedVehicle?.id === vehicle.id

                                    ? 5

                                    : 3,

                            opacity: 0.8,

                            lineCap: "round",

                            lineJoin: "round"

                        }}

                    />

                    <AnimatedMarker

                        vehicle={vehicle}

                        eventHandlers={{

                            click: () => {

                                setSelectedVehicle(vehicle);

                            }

                        }}

                    >

                        <Popup
                            autoPan={false}
                            closeButton={false}
                        >

                            <Box
                                sx={{
                                    minWidth: 170
                                }}
                            >

                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                >

                                    🚚 {vehicle.vehicleNumber}

                                </Typography>

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

                                    sx={{
                                        mt: 1,
                                        mb: 1
                                    }}

                                />

                                <Typography>

                                    👤 {vehicle.driverName}

                                </Typography>

                                <Typography>

                                    ⚡ {Number(vehicle.speed || 0).toFixed(1)} km/h

                                </Typography>

                            </Box>

                        </Popup>

                    </AnimatedMarker>

                </Fragment>

            ))}

        </MapContainer>

    );

}

export default MapView;