import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import DashboardStats from "../components/DashboardStats";
import MapView from "../components/MapView";
import PageHeader from "../components/common/PageHeader";
import ContentCard from "../components/common/ContentCard";

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
            const updatedRoute = [
                ...existingRoute,
                [updatedVehicle.latitude, updatedVehicle.longitude]
            ].slice(-40);

            return {
                ...previousRoutes,
                [updatedVehicle.id]: updatedRoute
            };
        });

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
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                gap: 1.5,
                height: "100%",
                minHeight: 0
            }}
        >
            <PageHeader
                title="Live Fleet Tracking"
                subtitle="Real-time vehicle location and route analytics."
                breadcrumbs={[
                    { label: "Fleet Tracker", href: "/" },
                    { label: "Dashboard" }
                ]}
            />

            <DashboardStats vehicles={vehicles} />

            <ContentCard
                sx={{
                    flex: 1,
                    p: 0,
                    overflow: "hidden",
                    borderRadius: "14px",
                    minHeight: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <MapView
                    vehicles={vehicles}
                    selectedVehicle={selectedVehicle}
                    setSelectedVehicle={setSelectedVehicle}
                    vehicleRoutes={vehicleRoutes}
                />
            </ContentCard>
        </Box>
    );
}

export default Dashboard;