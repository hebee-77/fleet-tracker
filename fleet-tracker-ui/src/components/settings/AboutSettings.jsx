import {
    Box,
    Grid,
    Typography,
    Divider,
    Chip,
    IconButton,
    Link as MuiLink
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GitHubIcon from "@mui/icons-material/GitHub";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CodeIcon from "@mui/icons-material/Code";

import ContentCard from "../common/ContentCard";

const techStack = [
    "Spring Boot",
    "React",
    "Material UI",
    "JWT",
    "PostgreSQL",
    "WebSocket"
];

const AboutSettings = () => {
    return (
        <ContentCard>
            <Box sx={{ textAlign: "center", py: 3, px: { xs: 2, md: 4 } }}>
                <Box
                    sx={{
                        width: 72,
                        height: 72,
                        borderRadius: "20px",
                        bgcolor: "#2563EB",
                        color: "#FFFFFF",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(37, 99, 235, 0.3)",
                        mb: 2
                    }}
                >
                    <LocalShippingIcon sx={{ fontSize: 42 }} />
                </Box>

                <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}
                >
                    Fleet Tracker
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1, mb: 2 }}>
                    <Chip
                        label="Version 1.0.0 Enterprise"
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: "10px" }}
                    />
                    <Chip
                        label="Production Ready"
                        size="small"
                        sx={{
                            bgcolor: "#DCFCE7",
                            color: "#166534",
                            fontWeight: 700,
                            borderRadius: "10px"
                        }}
                    />
                </Box>

                <Typography
                    variant="body1"
                    sx={{
                        color: "#64748B",
                        maxWidth: 600,
                        mx: "auto",
                        lineHeight: 1.6,
                        mb: 3
                    }}
                >
                    Enterprise-grade vehicle and driver logistics tracking application designed for real-time fleet operations, route analysis, driver management, and automated telemetry monitoring.
                </Typography>

                <Divider sx={{ my: 3, borderColor: "#F1F5F9" }} />

                <Grid container spacing={3} sx={{ textAlign: "left", maxWidth: 700, mx: "auto" }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ p: 2, borderRadius: "14px", bgcolor: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, color: "#64748B", uppercase: true, display: "block", mb: 0.5 }}
                            >
                                Developer / Maintainer
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A" }}>
                                Fleet Management Engineering Team
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ p: 2, borderRadius: "14px", bgcolor: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, color: "#64748B", uppercase: true, display: "block", mb: 0.5 }}
                            >
                                Platform Support
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A" }}>
                                Enterprise Tier Support
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: "left", maxWidth: 700, mx: "auto" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <CodeIcon sx={{ color: "#2563EB" }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A" }}>
                            Technology Stack
                        </Typography>
                    </Box>

                    <Grid container spacing={1.5}>
                        {techStack.map((tech, index) => (
                            <Grid size={{ xs: 6, sm: 4 }} key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        p: 1.5,
                                        borderRadius: "12px",
                                        bgcolor: "#FFFFFF",
                                        border: "1px solid #E2E8F0"
                                    }}
                                >
                                    <CheckCircleIcon sx={{ color: "#2563EB", fontSize: 18 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                                        {tech}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ my: 4, borderColor: "#F1F5F9" }} />

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
                    <MuiLink
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                    >
                        <IconButton
                            sx={{
                                bgcolor: "#0F172A",
                                color: "#FFFFFF",
                                "&:hover": { bgcolor: "#1E293B" }
                            }}
                        >
                            <GitHubIcon fontSize="medium" />
                        </IconButton>
                    </MuiLink>

                    <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 500 }}>
                        © 2026 Fleet Tracker Logistics Inc. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </ContentCard>
    );
};

export default AboutSettings;
