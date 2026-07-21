import { Grid } from "@mui/material";
import {
    People,
    AdminPanelSettings,
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
            icon: <People fontSize="large" />,
            color: "#2563EB"
        },
        {
            title: "Administrators",
            value: admins,
            icon: <AdminPanelSettings fontSize="large" />,
            color: "#7C3AED"
        },
        {
            title: "Managers",
            value: managers,
            icon: <Badge fontSize="large" />,
            color: "#F59E0B"
        },
        {
            title: "Active Users",
            value: activeUsers,
            icon: <CheckCircle fontSize="large" />,
            color: "#16A34A"
        }
    ];

    return (

        <Grid
            container
            spacing={3}
            sx={{
                mb: 4
            }}
        >

            {

                stats.map((stat) => (

                    <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={3}
                        key={stat.title}
                    >

                        <StatCard
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                        />

                    </Grid>

                ))

            }

        </Grid>

    );

};

export default UserStats;