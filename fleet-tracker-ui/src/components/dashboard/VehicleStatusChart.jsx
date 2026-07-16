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
    "#ed6c02",
    "#d32f2f"
];

function VehicleStatusChart({ dashboard }) {

    const data = [

        {
            name: "Active",
            value: dashboard?.activeVehicles ?? 0
        },

        {
            name: "Maintenance",
            value: dashboard?.maintenanceVehicles ?? 0
        },

        {
            name: "Inactive",
            value: dashboard?.inactiveVehicles ?? 0
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
                Vehicle Status Distribution
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

export default VehicleStatusChart;