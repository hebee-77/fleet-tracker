import { Grid } from "@mui/material";
import {
    Person,
    CheckCircle,
    LocalShipping,
    DoNotDisturbOn
} from "@mui/icons-material";
import StatCard from "../common/StatCard";

function DriverStats({ drivers = [] }) {
    const total = drivers.length;
    const available = drivers.filter(driver => driver.status === "AVAILABLE").length;
    const onTrip = drivers.filter(driver => driver.status === "ON_TRIP").length;
    const offDuty = drivers.filter(driver => driver.status === "OFF_DUTY").length;

    const cards = [
        {
            title: "Total Drivers",
            value: total,
            icon: <Person sx={{ fontSize: 26 }} />,
            color: "#2563EB",
            bgColor: "#EFF6FF"
        },
        {
            title: "Available",
            value: available,
            icon: <CheckCircle sx={{ fontSize: 26 }} />,
            color: "#16A34A",
            bgColor: "#DCFCE7"
        },
        {
            title: "On Trip",
            value: onTrip,
            icon: <LocalShipping sx={{ fontSize: 26 }} />,
            color: "#F59E0B",
            bgColor: "#FEF3C7"
        },
        {
            title: "Off Duty",
            value: offDuty,
            icon: <DoNotDisturbOn sx={{ fontSize: 26 }} />,
            color: "#DC2626",
            bgColor: "#FEE2E2"
        }
    ];

    return (
        <Grid container spacing={2} sx={{ mb: 1.5 }}>
            {cards.map(card => (
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

export default DriverStats;
