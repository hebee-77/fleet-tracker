import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    Avatar,
    Button
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 260;

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
            icon: <DashboardIcon fontSize="small" />,
            path: "/"
        },
        {
            text: "Vehicles",
            icon: <LocalShippingIcon fontSize="small" />,
            path: "/vehicles"
        },
        {
            text: "Drivers",
            icon: <PersonIcon fontSize="small" />,
            path: "/drivers"
        },
        ...(user?.role === "ADMIN"
            ? [
                {
                    text: "Analytics",
                    icon: <AnalyticsIcon fontSize="small" />,
                    path: "/analytics"
                },
                {
                    text: "Users",
                    icon: <PeopleIcon fontSize="small" />,
                    path: "/users",
                    roles: ["ADMIN"]
                },
                {
                    text: "Settings",
                    icon: <SettingsIcon fontSize="small" />,
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
                    flexDirection: "column",
                    bgcolor: "#FFFFFF",
                    borderRight: "1px solid #E2E8F0",
                    p: 2.5
                }
            }}
        >
            {/* Logo Section */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1,
                    py: 1,
                    mb: 2.5
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        bgcolor: "#2563EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)"
                    }}
                >
                    <LocalShippingIcon sx={{ fontSize: 24 }} />
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 800,
                        color: "#0F172A",
                        fontSize: "1.25rem",
                        letterSpacing: "-0.01em"
                    }}
                >
                    Fleet Tracker
                </Typography>
            </Box>

            {/* User Profile Info Card */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    mb: 3,
                    borderRadius: "14px",
                    bgcolor: "#F8FAFC",
                    border: "1px solid #F1F5F9"
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: "#2563EB",
                        width: 40,
                        height: 40,
                        fontWeight: 700,
                        fontSize: "0.95rem"
                    }}
                >
                    {user?.fullName?.charAt(0) || "A"}
                </Avatar>
                <Box sx={{ overflow: "hidden" }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 700,
                            color: "#0F172A",
                            fontSize: "0.9rem",
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {user?.fullName || "Admin User"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.3 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 700,
                                color: "#64748B",
                                fontSize: "0.72rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em"
                            }}
                        >
                            {user?.role || "ADMIN"}
                        </Typography>
                        <Box
                            component="span"
                            sx={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                bgcolor: "#22C55E",
                                display: "inline-block"
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Navigation List */}
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                    {menuItems.map((item) => {
                        const isSelected = location.pathname === item.path;
                        return (
                            <ListItemButton
                                key={item.text}
                                component={Link}
                                to={item.path}
                                selected={isSelected}
                                sx={{
                                    borderRadius: "12px",
                                    py: 1.2,
                                    px: 2,
                                    bgcolor: isSelected ? "#EFF6FF !important" : "transparent",
                                    color: isSelected ? "#2563EB" : "#64748B",
                                    "&:hover": {
                                        bgcolor: isSelected ? "#EFF6FF" : "#F8FAFC",
                                        color: isSelected ? "#2563EB" : "#0F172A"
                                    },
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 36,
                                        color: isSelected ? "#2563EB" : "#64748B"
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: "0.925rem",
                                        fontWeight: isSelected ? 700 : 600
                                    }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Box>

            {/* Logout Button */}
            <Box sx={{ pt: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<LogoutIcon fontSize="small" />}
                    onClick={handleLogout}
                    sx={{
                        bgcolor: "#DC2626",
                        color: "#FFFFFF",
                        borderRadius: "12px",
                        py: 1.2,
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        boxShadow: "none",
                        "&:hover": {
                            bgcolor: "#B91C1C",
                            boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)"
                        }
                    }}
                >
                    Logout
                </Button>
            </Box>
        </Drawer>
    );
}

export default Sidebar;