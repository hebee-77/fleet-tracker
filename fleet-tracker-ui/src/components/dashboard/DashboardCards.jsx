import { Grid } from "@mui/material";
import {
    LocalShipping,
    CheckCircle,
    Person,
    DirectionsCar
} from "@mui/icons-material";
import StatCard from "../common/StatCard";

const cardConfig = [
    {
        title: "Total Vehicles",
        key: "totalVehicles",
        icon: <LocalShipping sx={{ fontSize: 26 }} />,
        color: "#2563EB",
        bgColor: "#EFF6FF"
    },
    {
        title: "Active Vehicles",
        key: "activeVehicles",
        icon: <CheckCircle sx={{ fontSize: 26 }} />,
        color: "#16A34A",
        bgColor: "#DCFCE7"
    },
    {
        title: "Total Drivers",
        key: "totalDrivers",
        icon: <Person sx={{ fontSize: 26 }} />,
        color: "#8B5CF6",
        bgColor: "#F3E8FF"
    },
    {
        title: "Drivers On Trip",
        key: "onTripDrivers",
        icon: <DirectionsCar sx={{ fontSize: 26 }} />,
        color: "#F59E0B",
        bgColor: "#FEF3C7"
    }
];

function DashboardCards({ dashboard }) {
    return (
        <Grid container spacing={3} sx={{ mb: 3 }}>
            {cardConfig.map((card) => (
                <Grid key={card.key} size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        title={card.title}
                        value={dashboard?.[card.key] ?? 0}
                        icon={card.icon}
                        color={card.color}
                        bgColor={card.bgColor}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default DashboardCards;