import {
    Grid,
    Card,
    CardContent,
    Typography
} from "@mui/material";

function VehicleStats({ vehicles }) {

    const total = vehicles.length;

    const active =
        vehicles.filter(v => v.status === "ACTIVE").length;

    const maintenance =
        vehicles.filter(v => v.status === "MAINTENANCE").length;

    const inactive =
        vehicles.filter(v => v.status === "INACTIVE").length;

    const cards = [

        {
            title: "Total Vehicles",
            value: total,
            color: "#1976d2"
        },

        {
            title: "Active",
            value: active,
            color: "#2e7d32"
        },

        {
            title: "Maintenance",
            value: maintenance,
            color: "#ed6c02"
        },

        {
            title: "Inactive",
            value: inactive,
            color: "#d32f2f"
        }

    ];

    return (

        <Grid
            container
            spacing={1.5}
            sx={{ mb: 2 }}
        >

            {cards.map((card) => (

                <Grid
                    key={card.title}
                    size={{ xs: 12, sm: 6, md: 3 }}
                >

                    <Card
                        elevation={2}
                        sx={{
                            borderLeft: `5px solid ${card.color}`,
                            borderRadius: 2,
                            height: 90,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: 4
                            }
                        }}
                    >

                        <CardContent
                            sx={{
                                py: 1,
                                "&:last-child": {
                                    pb: 1
                                },
                                textAlign: "center"
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    fontWeight: 600,
                                    mb: 0.5
                                }}
                            >
                                {card.title}
                            </Typography>

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    color: card.color,
                                    lineHeight: 1
                                }}
                            >
                                {card.value}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>

    );

}

export default VehicleStats;