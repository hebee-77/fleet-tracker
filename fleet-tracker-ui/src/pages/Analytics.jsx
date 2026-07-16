import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Grid,
    Button
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import DashboardCards from "../components/dashboard/DashboardCards";
import VehicleStatusChart from "../components/dashboard/VehicleStatusChart";
import DriverStatusChart from "../components/dashboard/DriverStatusChart";
import RecentVehicles from "../components/dashboard/RecentVehicles";
import RecentDrivers from "../components/dashboard/RecentDrivers";

import { getDashboardData } from "../services/dashboardService";

function Analytics() {

    const [dashboard, setDashboard] = useState(null);

    const loadDashboard = async () => {

        try {

            const response = await getDashboardData();

            setDashboard(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    return (

        <Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >

                    Fleet Analytics

                </Typography>

                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={loadDashboard}
                >

                    Refresh

                </Button>

            </Box>

            <DashboardCards
                dashboard={dashboard}
            />

            <Grid
                container
                spacing={3}
                sx={{
                    mb: 3
                }}
            >

                <Grid size={{ xs: 12, md: 6 }}>

                    <VehicleStatusChart
                        dashboard={dashboard}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <DriverStatusChart
                        dashboard={dashboard}
                    />

                </Grid>

            </Grid>

            <Grid
                container
                spacing={3}
            >

                <Grid size={{ xs: 12, md: 6 }}>

                    <RecentVehicles
                        vehicles={dashboard?.recentVehicles || []}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <RecentDrivers
                        drivers={dashboard?.recentDrivers || []}
                    />

                </Grid>

            </Grid>

        </Box>

    );

}

export default Analytics;