import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SpeedIcon from "@mui/icons-material/Speed";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function FleetActivity({ vehicles = [] }) {

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
                height: "100%"
            }}
        >

            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
            >
                Recent Fleet Activity
            </Typography>

            <List>

                {vehicles.slice(0, 5).map(vehicle => (

                    <ListItem
                        key={vehicle.id}
                        divider
                    >

                        <ListItemIcon>

                            <DirectionsCarIcon color="primary" />

                        </ListItemIcon>

                        <ListItemText

                            primary={vehicle.vehicleNumber}

                            secondary={

                                <>
                                    <SpeedIcon
                                        sx={{
                                            fontSize: 16,
                                            mr: 0.5
                                        }}
                                    />

                                    {vehicle.speed?.toFixed(1)} km/h

                                    {"   "}

                                    <LocationOnIcon
                                        sx={{
                                            fontSize: 16,
                                            ml: 2,
                                            mr: 0.5
                                        }}
                                    />

                                    {vehicle.currentLatitude?.toFixed(3)},
                                    {" "}
                                    {vehicle.currentLongitude?.toFixed(3)}

                                </>

                            }

                        />

                    </ListItem>

                ))}

            </List>

        </Paper>

    );

}

export default FleetActivity;