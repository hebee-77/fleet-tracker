import { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Switch,
    FormControlLabel,
    Divider,
    Paper,
    Chip
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PaletteIcon from "@mui/icons-material/Palette";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import ContentCard from "../common/ContentCard";
import PrimaryButton from "../common/PrimaryButton";

const AppearanceSettings = ({ preferences, saving, onSavePreferences }) => {
    const [themeMode, setThemeMode] = useState("Light");
    const [compactMode, setCompactMode] = useState(false);

    useEffect(() => {
        if (preferences) {
            setThemeMode(preferences.theme || "Light");
            setCompactMode(!!preferences.compactMode);
        }
    }, [preferences]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSavePreferences({
            theme: themeMode,
            compactMode
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
                        <PaletteIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}
                        >
                            Appearance & Display
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
                            Customize the look and layout density of your workspace.
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "#F1F5F9" }} />

                <Grid container spacing={3}>
                    {/* Theme Option */}
                    <Grid size={12}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A", mb: 1.5 }}>
                            Color Theme
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Paper
                                    elevation={0}
                                    onClick={() => setThemeMode("Light")}
                                    sx={{
                                        p: 2,
                                        borderRadius: "14px",
                                        border: themeMode === "Light" ? "2px solid #2563EB" : "1px solid #E2E8F0",
                                        bgcolor: "#FFFFFF",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        "&:hover": { borderColor: "#2563EB" }
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <LightModeIcon sx={{ color: "#EAB308" }} />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                Light Theme
                                            </Typography>
                                        </Box>
                                        {themeMode === "Light" && (
                                            <Chip label="Active" size="small" color="primary" sx={{ height: 20, fontSize: "0.7rem" }} />
                                        )}
                                    </Box>
                                    <Typography variant="caption" sx={{ color: "#64748B" }}>
                                        Standard clean enterprise interface theme with crisp contrast.
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: "14px",
                                        border: "1px dashed #CBD5E1",
                                        bgcolor: "#F8FAFC",
                                        opacity: 0.7,
                                        cursor: "not-allowed",
                                        position: "relative"
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <DarkModeIcon sx={{ color: "#64748B" }} />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#64748B" }}>
                                                Dark Theme
                                            </Typography>
                                        </Box>
                                        <Chip label="Disabled for now" size="small" variant="outlined" sx={{ height: 20, fontSize: "0.7rem" }} />
                                    </Box>
                                    <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                                        Dark background theme for low-light environments. Coming soon.
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Compact Mode Switch */}
                    <Grid size={12}>
                        <Divider sx={{ my: 1, borderColor: "#F1F5F9" }} />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                py: 1.5
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                                    Compact Mode
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#64748B", mt: 0.25 }}>
                                    Reduce padding and spacing across table views and cards.
                                </Typography>
                            </Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={compactMode}
                                        onChange={(e) => setCompactMode(e.target.checked)}
                                        color="primary"
                                        disabled={saving}
                                    />
                                }
                                label={compactMode ? "Enabled" : "Disabled"}
                                sx={{ ml: 2 }}
                            />
                        </Box>
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

export default AppearanceSettings;
