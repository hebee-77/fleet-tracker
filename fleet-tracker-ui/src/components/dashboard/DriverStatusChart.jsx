import {
    Paper,
    Typography
} from "@mui/material";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#2e7d32",
    "#1976d2",
    "#9e9e9e"
];

function DriverStatusChart({ dashboard }) {

    const data = [

        {
            name: "Available",
            value: dashboard?.availableDrivers ?? 0
        },

        {
            name: "On Trip",
            value: dashboard?.onTripDrivers ?? 0
        },

        {
            name: "Off Duty",
            value: dashboard?.offDutyDrivers ?? 0
        }

    ];

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
                height: 360
            }}
        >

            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
            >
                Driver Status Distribution
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        label
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </Paper>

    );

}

export default DriverStatusChart;