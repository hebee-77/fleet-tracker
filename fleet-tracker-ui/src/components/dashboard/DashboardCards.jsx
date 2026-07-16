import { Grid, Card, CardContent, Typography } from "@mui/material";

const cardConfig = [
    {
        title: "Total Vehicles",
        key: "totalVehicles",
        color: "#1976d2"
    },
    {
        title: "Active Vehicles",
        key: "activeVehicles",
        color: "#2e7d32"
    },
    {
        title: "Total Drivers",
        key: "totalDrivers",
        color: "#7b1fa2"
    },
    {
        title: "Drivers On Trip",
        key: "onTripDrivers",
        color: "#ed6c02"
    }
];

function DashboardCards({ dashboard }) {

    return (

        <Grid
            container
            spacing={2}
            sx={{ mb: 3 }}
        >

            {cardConfig.map((card) => (

                <Grid
                    key={card.key}
                    size={{ xs: 12, sm: 6, md: 3 }}
                >

                    <Card
                        elevation={2}
                        sx={{
                            borderLeft: `5px solid ${card.color}`,
                            borderRadius: 2,
                            transition: "0.3s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 6
                            }
                        }}
                    >

                        <CardContent
                            sx={{
                                textAlign: "center",
                                py: 2
                            }}
                        >

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    fontWeight: 600
                                }}
                            >

                                {card.title}

                            </Typography>

                            <Typography
                                variant="h3"
                                sx={{
                                    color: card.color,
                                    fontWeight: "bold"
                                }}
                            >

                                {dashboard?.[card.key] ?? 0}

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>

    );

}

export default DashboardCards;