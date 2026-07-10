import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 250;

const menuItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/"
    },
    {
        text: "Vehicles",
        icon: <LocalShippingIcon />,
        path: "/vehicles"
    },
    {
        text: "Drivers",
        icon: <PersonIcon />,
        path: "/drivers"
    },
    {
        text: "Analytics",
        icon: <AnalyticsIcon />,
        path: "/analytics"
    },
    {
        text: "Settings",
        icon: <SettingsIcon />,
        path: "/settings"
    }
];

function Sidebar() {

    const location = useLocation();

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box"
                }
            }}
        >

            <Toolbar>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >

                    Fleet Tracker

                </Typography>

            </Toolbar>

            <Box sx={{ overflow: "auto" }}>

                <List>

                    {menuItems.map(item => (

                        <ListItemButton
                            key={item.text}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                        >

                            <ListItemIcon>

                                {item.icon}

                            </ListItemIcon>

                            <ListItemText primary={item.text} />

                        </ListItemButton>

                    ))}

                </List>

            </Box>

        </Drawer>

    );

}

export default Sidebar;