import { useState, useEffect } from "react";
import {
    Box,
    Grid,
    TextField,
    Typography,
    MenuItem,
    Divider
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RefreshIcon from "@mui/icons-material/Refresh";
import TableRowsIcon from "@mui/icons-material/TableRows";
import HomeIcon from "@mui/icons-material/Home";

import ContentCard from "../common/ContentCard";
import PrimaryButton from "../common/PrimaryButton";

const DashboardSettings = ({ preferences, saving, onSavePreferences }) => {
    const [refreshInterval, setRefreshInterval] = useState(30);
    const [pageSize, setPageSize] = useState(10);
    const [landingPage, setLandingPage] = useState("Dashboard");

    useEffect(() => {
        if (preferences) {
            setRefreshInterval(preferences.refreshInterval || 30);
            setPageSize(preferences.pageSize || 10);
            setLandingPage(preferences.landingPage || "Dashboard");
        }
    }, [preferences]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSavePreferences({
            refreshInterval: Number(refreshInterval),
            pageSize: Number(pageSize),
            landingPage
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
                        <DashboardIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}
                        >
                            Dashboard & Table Defaults
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
                            Configure telemetry auto-refresh frequency, pagination sizes, and startup view.
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "#F1F5F9" }} />

                <Grid container spacing={3}>
                    {/* Refresh Interval Dropdown */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569" }}>
                                Refresh Interval (Seconds)
                            </Typography>
                        </Box>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            value={refreshInterval}
                            onChange={(e) => setRefreshInterval(e.target.value)}
                            disabled={saving}
                            InputProps={{
                                startAdornment: (
                                    <RefreshIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 20 }} />
                                )
                            }}
                        >
                            <MenuItem value={30}>30 Seconds</MenuItem>
                            <MenuItem value={60}>60 Seconds</MenuItem>
                            <MenuItem value={120}>120 Seconds</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Default Page Size Dropdown */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569" }}>
                                Default Page Size
                            </Typography>
                        </Box>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            value={pageSize}
                            onChange={(e) => setPageSize(e.target.value)}
                            disabled={saving}
                            InputProps={{
                                startAdornment: (
                                    <TableRowsIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 20 }} />
                                )
                            }}
                        >
                            <MenuItem value={10}>10 Items per page</MenuItem>
                            <MenuItem value={20}>20 Items per page</MenuItem>
                            <MenuItem value={50}>50 Items per page</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Landing Page Dropdown */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569" }}>
                                Default Landing Page
                            </Typography>
                        </Box>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            value={landingPage}
                            onChange={(e) => setLandingPage(e.target.value)}
                            disabled={saving}
                            InputProps={{
                                startAdornment: (
                                    <HomeIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 20 }} />
                                )
                            }}
                        >
                            <MenuItem value="Dashboard">Dashboard</MenuItem>
                            <MenuItem value="Vehicles">Vehicles</MenuItem>
                            <MenuItem value="Drivers">Drivers</MenuItem>
                        </TextField>
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

export default DashboardSettings;
