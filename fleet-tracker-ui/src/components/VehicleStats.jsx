import { Grid } from "@mui/material";
import {
    LocalShipping,
    CheckCircle,
    Build,
    HighlightOff
} from "@mui/icons-material";
import StatCard from "./common/StatCard";

function VehicleStats({ vehicles = [] }) {
    const total = vehicles.length;
    const active = vehicles.filter(v => v.status === "ACTIVE").length;
    const maintenance = vehicles.filter(v => v.status === "MAINTENANCE").length;
    const inactive = vehicles.filter(v => v.status === "INACTIVE").length;

    const cards = [
        {
            title: "Total Vehicles",
            value: total,
            icon: <LocalShipping sx={{ fontSize: 26 }} />,
            color: "#2563EB",
            bgColor: "#EFF6FF"
        },
        {
            title: "Active",
            value: active,
            icon: <CheckCircle sx={{ fontSize: 26 }} />,
            color: "#16A34A",
            bgColor: "#DCFCE7"
        },
        {
            title: "Maintenance",
            value: maintenance,
            icon: <Build sx={{ fontSize: 26 }} />,
            color: "#F59E0B",
            bgColor: "#FEF3C7"
        },
        {
            title: "Inactive",
            value: inactive,
            icon: <HighlightOff sx={{ fontSize: 26 }} />,
            color: "#DC2626",
            bgColor: "#FEE2E2"
        }
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            {cards.map((card) => (
                <Grid
                    key={card.title}
                    size={{ xs: 12, sm: 6, md: 3 }}
                >
                    <StatCard
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        color={card.color}
                        bgColor={card.bgColor}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default VehicleStats;