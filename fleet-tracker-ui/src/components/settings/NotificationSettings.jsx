import { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Switch,
    FormControlLabel,
    Divider,
    Paper
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";

import ContentCard from "../common/ContentCard";
import PrimaryButton from "../common/PrimaryButton";

const NotificationSettings = ({ preferences, saving, onSavePreferences }) => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [vehicleAlerts, setVehicleAlerts] = useState(true);
    const [driverAlerts, setDriverAlerts] = useState(true);

    useEffect(() => {
        if (preferences) {
            setEmailNotifications(preferences.emailNotifications !== false);
            setVehicleAlerts(preferences.vehicleAlerts !== false);
            setDriverAlerts(preferences.driverAlerts !== false);
        }
    }, [preferences]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSavePreferences({
            emailNotifications,
            vehicleAlerts,
            driverAlerts
        });
    };

    return (
        <ContentCard>
            <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            borderRadius: "14px",
                            bgcolor: "#EFF6FF",
                            color: "#2563EB",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <NotificationsIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}
                        >
                            Notification & Alerts
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
                            Configure alert channels and operational notification preferences.
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "#F1F5F9" }} />

                <Grid container spacing={2.5}>
                    <Grid size={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,
                                borderRadius: "14px",
                                border: "1px solid #E2E8F0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "12px",
                                        bgcolor: "#F8FAFC",
                                        color: "#2563EB",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <MailIcon />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                                        Email Notifications
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#64748B", mt: 0.25 }}>
                                        Receive automated daily summaries and critical system alerts via email.
                                    </Typography>
                                </Box>
                            </Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={emailNotifications}
                                        onChange={(e) => setEmailNotifications(e.target.checked)}
                                        color="primary"
                                        disabled={saving}
                                    />
                                }
                                label={emailNotifications ? "Enabled" : "Disabled"}
                            />
                        </Paper>
                    </Grid>

                    <Grid size={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,
                                borderRadius: "14px",
                                border: "1px solid #E2E8F0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "12px",
                                        bgcolor: "#F8FAFC",
                                        color: "#059669",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <LocalShippingIcon />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                                        Vehicle Alerts
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#64748B", mt: 0.25 }}>
                                        Get real-time alerts for vehicle maintenance, status updates, and geofence events.
                                    </Typography>
                                </Box>
                            </Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={vehicleAlerts}
                                        onChange={(e) => setVehicleAlerts(e.target.checked)}
                                        color="primary"
                                        disabled={saving}
                                    />
                                }
                                label={vehicleAlerts ? "Enabled" : "Disabled"}
                            />
                        </Paper>
                    </Grid>

                    <Grid size={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,
                                borderRadius: "14px",
                                border: "1px solid #E2E8F0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "12px",
                                        bgcolor: "#F8FAFC",
                                        color: "#D97706",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <PersonIcon />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                                        Driver Alerts
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#64748B", mt: 0.25 }}>
                                        Receive alerts regarding driver license expirations, shift logs, and safety violations.
                                    </Typography>
                                </Box>
                            </Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={driverAlerts}
                                        onChange={(e) => setDriverAlerts(e.target.checked)}
                                        color="primary"
                                        disabled={saving}
                                    />
                                }
                                label={driverAlerts ? "Enabled" : "Disabled"}
                            />
                        </Paper>
                    </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                    <PrimaryButton
                        type="submit"
                        disabled={saving}
                        startIcon={<SaveIcon />}
                    >
                        {saving ? "Saving Preferences..." : "Save Preferences"}
                    </PrimaryButton>
                </Box>
            </Box>
        </ContentCard>
    );
};

export default NotificationSettings;
