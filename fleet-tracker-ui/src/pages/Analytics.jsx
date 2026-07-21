import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import PageHeader from "../components/common/PageHeader";
import PrimaryButton from "../components/common/PrimaryButton";
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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                gap: 1.5
            }}
        >
            <PageHeader
                title="Fleet Analytics"
                subtitle="High-level insights into fleet performance, vehicles, and drivers."
                breadcrumbs={[
                    { label: "Dashboard", href: "/" },
                    { label: "Analytics" }
                ]}
                action={
                    <PrimaryButton
                        startIcon={<RefreshIcon />}
                        onClick={loadDashboard}
                    >
                        Refresh
                    </PrimaryButton>
                }
            />

            <DashboardCards dashboard={dashboard} />

            <Grid container spacing={2} sx={{ mb: 0.5 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <VehicleStatusChart dashboard={dashboard} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <DriverStatusChart dashboard={dashboard} />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <RecentVehicles vehicles={dashboard?.recentVehicles || []} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <RecentDrivers drivers={dashboard?.recentDrivers || []} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Analytics;