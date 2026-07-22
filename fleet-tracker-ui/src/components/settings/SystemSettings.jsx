import { useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Divider,
    Paper,
    Chip
} from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";
import StorageIcon from "@mui/icons-material/Storage";
import CodeIcon from "@mui/icons-material/Code";
import SecurityIcon from "@mui/icons-material/Security";
import SyncIcon from "@mui/icons-material/Sync";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import VerifiedIcon from "@mui/icons-material/Verified";

import ContentCard from "../common/ContentCard";
import LoadingScreen from "../common/LoadingScreen";

const SystemSettings = ({
    systemInfo,
    loading,
    onFetchSystemInfo
}) => {
    useEffect(() => {
        if (onFetchSystemInfo) {
            onFetchSystemInfo();
        }
    }, [onFetchSystemInfo]);

    if (loading) {
        return (
            <ContentCard>
                <LoadingScreen text="Fetching system diagnostic information..." />
            </ContentCard>
        );
    }

    const infoCards = [
        {
            title: "Application Name",
            value: systemInfo?.application || "Fleet Tracker Enterprise",
            icon: <AppSettingsAltIcon sx={{ color: "#2563EB" }} />,
            bg: "#EFF6FF"
        },
        {
            title: "Application Version",
            value: systemInfo?.version || "1.0.0",
            icon: <VerifiedIcon sx={{ color: "#059669" }} />,
            bg: "#ECFDF5"
        },
        {
            title: "Backend Framework",
            value: systemInfo?.backend || "Spring Boot 3.2.0",
            icon: <DnsIcon sx={{ color: "#7C3AED" }} />,
            bg: "#F5F3FF"
        },
        {
            title: "Frontend Stack",
            value: systemInfo?.frontend || "React 19 / Material UI 7",
            icon: <CodeIcon sx={{ color: "#D97706" }} />,
            bg: "#FFFBEB"
        },
        {
            title: "Database Engine",
            value: systemInfo?.database || "PostgreSQL 16",
            icon: <StorageIcon sx={{ color: "#0284C7" }} />,
            bg: "#F0F9FF"
        },
        {
            title: "Authentication Protocol",
            value: systemInfo?.authentication || "JWT (JSON Web Token)",
            icon: <SecurityIcon sx={{ color: "#DC2626" }} />,
            bg: "#FEF2F2"
        },
        {
            title: "Real-Time Telemetry",
            value: systemInfo?.websocket || "WebSocket / STOMP / SockJS",
            icon: <SyncIcon sx={{ color: "#0891B2" }} />,
            bg: "#ECFEFF"
        }
    ];

    return (
        <ContentCard>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                        <DnsIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}
                        >
                            System Status & Architecture
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
                            Technical diagnostic environment specs and connected stack modules.
                        </Typography>
                    </Box>
                </Box>
                <Chip
                    label="Read Only"
                    size="small"
                    sx={{
                        bgcolor: "#F1F5F9",
                        color: "#475569",
                        fontWeight: 700
                    }}
                />
            </Box>

            <Divider sx={{ mb: 3, borderColor: "#F1F5F9" }} />

            <Grid container spacing={2.5}>
                {infoCards.map((card, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,
                                borderRadius: "14px",
                                border: "1px solid #E2E8F0",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "10px",
                                        bgcolor: card.bg,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {card.icon}
                                </Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 700,
                                        color: "#64748B",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em"
                                    }}
                                >
                                    {card.title}
                                </Typography>
                            </Box>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 800,
                                    color: "#0F172A",
                                    fontSize: "1rem"
                                }}
                            >
                                {card.value}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </ContentCard>
    );
};

export default SystemSettings;
