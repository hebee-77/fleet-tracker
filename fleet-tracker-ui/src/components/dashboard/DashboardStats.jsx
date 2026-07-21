import { Grid } from "@mui/material";
import {
    LocalShipping,
    CheckCircle,
    PauseCircle,
    HighlightOff
} from "@mui/icons-material";
import StatCard from "../common/StatCard";

function DashboardStats({ vehicles = [] }) {
    const total = vehicles.length;
    const active = vehicles.filter(v => v.status === "ACTIVE").length;
    const idle = vehicles.filter(v => v.status === "IDLE").length;
    const offline = vehicles.filter(v => v.status === "OFFLINE").length;

    const stats = [
        { title: "Total Vehicles", value: total, icon: <LocalShipping sx={{ fontSize: 26 }} />, color: "#2563EB", bgColor: "#EFF6FF" },
        { title: "Active Vehicles", value: active, icon: <CheckCircle sx={{ fontSize: 26 }} />, color: "#16A34A", bgColor: "#DCFCE7" },
        { title: "Idle Vehicles", value: idle, icon: <PauseCircle sx={{ fontSize: 26 }} />, color: "#F59E0B", bgColor: "#FEF3C7" },
        { title: "Offline Vehicles", value: offline, icon: <HighlightOff sx={{ fontSize: 26 }} />, color: "#DC2626", bgColor: "#FEE2E2" }
    ];

    return (
        <Grid container spacing={2} sx={{ mb: 1.5 }}>
            {stats.map((item) => (
                <Grid
                    key={item.title}
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3
                    }}
                >
                    <StatCard
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                        color={item.color}
                        bgColor={item.bgColor}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default DashboardStats;
