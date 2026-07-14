import {
    Grid,
    Card,
    CardContent,
    Typography
} from "@mui/material";

function DriverStats({ drivers }) {

    const total = drivers.length;

    const available =
        drivers.filter(driver => driver.status === "AVAILABLE").length;

    const onTrip =
        drivers.filter(driver => driver.status === "ON_TRIP").length;

    const offDuty =
        drivers.filter(driver => driver.status === "OFF_DUTY").length;

    const cards = [

        {
            title: "Total Drivers",
            value: total,
            color: "#1976d2"
        },

        {
            title: "Available",
            value: available,
            color: "#2e7d32"
        },

        {
            title: "On Trip",
            value: onTrip,
            color: "#ed6c02"
        },

        {
            title: "Off Duty",
            value: offDuty,
            color: "#d32f2f"
        }

    ];

    return (

        <Grid
            container
            spacing={1.5}
            sx={{ mb: 2 }}
        >

            {cards.map(card => (

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
                            justifyContent: "center"
                        }}
                    >

                        <CardContent
                            sx={{
                                textAlign: "center",
                                py: 1
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {card.title}
                            </Typography>

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    color: card.color
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

export default DriverStats;
