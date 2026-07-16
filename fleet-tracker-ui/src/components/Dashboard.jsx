import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Box
} from "@mui/material";

import DashboardStats from "../components/DashboardStats";
import MapView from "../components/MapView";

import { getAllVehicles } from "../services/vehicleService";

import {
    connectWebSocket,
    disconnectWebSocket
} from "../websocket/websocketClient";

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

            if (response.data.length > 0) {

                setSelectedVehicle(response.data[0]);

            }

        }

        catch (error) {

            console.error(error);

        }

    };

    const updateVehicleLocation = (updatedVehicle) => {

        // Update vehicle position
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

        // Keep only the latest 40 route points
        setVehicleRoutes(previousRoutes => {

            const existingRoute = previousRoutes[updatedVehicle.id] || [];

            const updatedRoute = [

                ...existingRoute,

                [

                    updatedVehicle.latitude,

                    updatedVehicle.longitude

                ]

            ].slice(-40);

            return {

                ...previousRoutes,

                [updatedVehicle.id]: updatedRoute

            };

        });

        // Update selected vehicle details if it's the same vehicle
        setSelectedVehicle(previous =>

            previous?.id === updatedVehicle.id

                ? {

                    ...previous,

                    currentLatitude: updatedVehicle.latitude,

                    currentLongitude: updatedVehicle.longitude,

                    speed: updatedVehicle.speed

                }

                : previous

        );

    };

    return (

        <Container
            maxWidth="xl"
            sx={{
                mt: 3,
                mb: 3
            }}
        >

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >

                Live Fleet Tracking

            </Typography>

            <DashboardStats
                vehicles={vehicles}
            />

            <Box
                sx={{
                    mt: 3
                }}
            >

                <MapView
                    vehicles={vehicles}
                    selectedVehicle={selectedVehicle}
                    setSelectedVehicle={setSelectedVehicle}
                    vehicleRoutes={vehicleRoutes}
                />

            </Box>

        </Container>

    );

}

export default Dashboard;