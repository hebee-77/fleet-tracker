import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box,
    Divider,
    Avatar,
    Button
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 250;

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

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

        ...(user?.role === "ADMIN"
            ? [
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
            ]
            : [])

    ];

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column"
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

            <Divider />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2
                }}
            >

                <Avatar>

                    {user?.fullName?.charAt(0)}

                </Avatar>

                <Box>

                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                    >

                        {user?.fullName}

                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >

                        {user?.role}

                    </Typography>

                </Box>

            </Box>

            <Divider />

            <Box
                sx={{
                    flexGrow: 1,
                    overflow: "auto"
                }}
            >

                <List>

                    {menuItems.map((item) => (

                        <ListItemButton
                            key={item.text}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                        >

                            <ListItemIcon>

                                {item.icon}

                            </ListItemIcon>

                            <ListItemText
                                primary={item.text}
                            />

                        </ListItemButton>

                    ))}

                </List>

            </Box>

            <Divider />

            <Box sx={{ p: 2 }}>

                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >

                    Logout

                </Button>

            </Box>

        </Drawer>

    );

}

export default Sidebar;