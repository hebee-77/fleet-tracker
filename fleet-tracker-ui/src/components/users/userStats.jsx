import { Grid } from "@mui/material";
import {
    Group,
    Security,
    Badge,
    CheckCircle
} from "@mui/icons-material";

import StatCard from "../common/StatCard";

const UserStats = ({ users = [] }) => {
    const totalUsers = users.length;

    const admins = users.filter(
        (user) => user.role === "ADMIN"
    ).length;

    const managers = users.filter(
        (user) => user.role === "MANAGER"
    ).length;

    const activeUsers = users.filter(
        (user) => user.active
    ).length;

    const stats = [
        {
            title: "Total Users",
            value: totalUsers,
            icon: <Group sx={{ fontSize: 26 }} />,
            color: "#2563EB",
            bgColor: "#EFF6FF"
        },
        {
            title: "Administrators",
            value: admins,
            icon: <Security sx={{ fontSize: 26 }} />,
            color: "#8B5CF6",
            bgColor: "#F3E8FF"
        },
        {
            title: "Managers",
            value: managers,
            icon: <Badge sx={{ fontSize: 26 }} />,
            color: "#F59E0B",
            bgColor: "#FEF3C7"
        },
        {
            title: "Active Users",
            value: activeUsers,
            icon: <CheckCircle sx={{ fontSize: 26 }} />,
            color: "#16A34A",
            bgColor: "#DCFCE7"
        }
    ];

    return (
        <Grid
            container
            spacing={2}
            sx={{
                mb: 1.5
            }}
        >
            {stats.map((stat) => (
                <Grid
                    key={stat.title}
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 3
                    }}
                >
                    <StatCard
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                        bgColor={stat.bgColor}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default UserStats;