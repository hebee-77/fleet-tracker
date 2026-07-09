import { Grid, Paper, Typography } from "@mui/material";

function DashboardStats({ vehicles }) {

    const total = vehicles.length;
    const active = vehicles.filter(v => v.status === "ACTIVE").length;
    const idle = vehicles.filter(v => v.status === "IDLE").length;
    const offline = vehicles.filter(v => v.status === "OFFLINE").length;

    const stats = [
        { title: "Total Vehicles", value: total },
        { title: "Active", value: active },
        { title: "Idle", value: idle },
        { title: "Offline", value: offline }
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>

            {stats.map((item) => (

                <Grid item xs={12} sm={6} md={3} key={item.title}>

                    <Paper
                        elevation={4}
                        sx={{
                            p: 3,
                            textAlign: "center",
                            borderRadius: 3
                        }}
                    >

                        <Typography variant="h6">
                            {item.title}
                        </Typography>

                        <Typography
                            variant="h3"
                            color="primary"
                            fontWeight="bold"
                        >
                            {item.value}
                        </Typography>

                    </Paper>

                </Grid>

            ))}

        </Grid>
    );
}

export default DashboardStats;