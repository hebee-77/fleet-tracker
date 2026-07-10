import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

import { getAllVehicles } from "../services/vehicleService";

import DashboardStats from "./DashboardStats";
import VehicleCard from "./VehicleCard";
import MapView from "./MapView";
import { connectWebSocket,disconnectWebSocket} from "../websocket/websocketClient";


function Dashboard() {

    const [vehicles, setVehicles] = useState([]);
    const [vehicleRoutes, setVehicleRoutes] = useState({});
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
    loadVehicles();
    connectWebSocket(updateVehicleLocation);
    return () => {
        disconnectWebSocket();
    };
}, []);

    const loadVehicles = async () => {

        try {

            const response = await getAllVehicles();

            setVehicles(response.data);

        } catch (error) {

            console.error(error);

        }
    };

const updateVehicleLocation = (updatedVehicle) => {

    setVehicles(previousVehicles =>
        previousVehicles.map(vehicle =>
            vehicle.id === updatedVehicle.id
                ? {
                    ...vehicle,
                    currentLatitude: updatedVehicle.latitude,
                    currentLongitude: updatedVehicle.longitude,
                    speed: updatedVehicle.speed
                }
                : vehicle
        )
    );

    setVehicleRoutes(previousRoutes => {

        const existingRoute = previousRoutes[updatedVehicle.id] || [];

        return {

            ...previousRoutes,

            [updatedVehicle.id]: [

                ...existingRoute,

                [
                    updatedVehicle.latitude,
                    updatedVehicle.longitude
                ]

            ]

        };

    });

};

    return (

        <Container maxWidth="xl" sx={{ mt: 4 }}>

            <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
            >
                Fleet Tracker Dashboard
            </Typography>

            <DashboardStats vehicles={vehicles} />

<MapView
    vehicles={vehicles}
    selectedVehicle={selectedVehicle}
    setSelectedVehicle={setSelectedVehicle}
    vehicleRoutes={vehicleRoutes}
/>

            {vehicles.map(vehicle => (

                <VehicleCard
    key={vehicle.id}
    vehicle={vehicle}
    onClick={() => setSelectedVehicle(vehicle)}
/>

            ))}

        </Container>

    );
}

export default Dashboard;