import { useState, useEffect } from "react";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Chip,
    Avatar,
    Divider
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ContentCard from "../common/ContentCard";
import PrimaryButton from "../common/PrimaryButton";
import LoadingScreen from "../common/LoadingScreen";

const ProfileSettings = ({
    profile,
    loading,
    saving,
    onSaveProfile
}) => {
    const [fullName, setFullName] = useState("");
    const [nameError, setNameError] = useState("");

    useEffect(() => {
        if (profile) {
            setFullName(profile.fullName || "");
        }
    }, [profile]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName.trim()) {
            setNameError("Full name is required.");
            return;
        }
        setNameError("");

        await onSaveProfile({ fullName: fullName.trim() });
    };

    if (loading) {
        return (
            <ContentCard>
                <LoadingScreen text="Loading profile settings..." />
            </ContentCard>
        );
    }

    return (
        <ContentCard>
            <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            bgcolor: "#2563EB",
                            fontSize: "1.75rem",
                            fontWeight: 700,
                            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)"
                        }}
                    >
                        {fullName ? fullName.charAt(0).toUpperCase() : "U"}
                    </Avatar>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}
                        >
                            {fullName || "User Profile"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
                            Manage your account information and display name.
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "#F1F5F9" }} />

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ mb: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, color: "#475569", uppercase: true }}
                            >
                                Full Name
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter full name"
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                                if (e.target.value.trim()) setNameError("");
                            }}
                            error={!!nameError}
                            helperText={nameError}
                            disabled={saving}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <PersonIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 20 }} />
                                    )
                                }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ mb: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, color: "#475569", uppercase: true }}
                            >
                                Email Address (Read Only)
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            size="small"
                            value={profile?.email || ""}
                            disabled
                            slotProps={{
                                input: {
                                    readOnly: true,
                                    startAdornment: (
                                        <EmailIcon sx={{ color: "#94A3B8", mr: 1, fontSize: 20 }} />
                                    )
                                }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ mb: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, color: "#475569", uppercase: true }}
                            >
                                System Role (Read Only)
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                p: 1.25,
                                borderRadius: "12px",
                                bgcolor: "#F8FAFC",
                                border: "1px solid #E2E8F0"
                            }}
                        >
                            <BadgeIcon sx={{ color: "#2563EB", fontSize: 20 }} />
                            <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#0F172A" }}>
                                {profile?.role || "ADMIN"}
                            </Typography>
                            <Chip
                                label="Assigned"
                                size="small"
                                sx={{
                                    ml: "auto",
                                    bgcolor: "#EFF6FF",
                                    color: "#2563EB",
                                    fontWeight: 700
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ mb: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, color: "#475569", uppercase: true }}
                            >
                                Account Status (Read Only)
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                p: 1.25,
                                borderRadius: "12px",
                                bgcolor: "#F8FAFC",
                                border: "1px solid #E2E8F0"
                            }}
                        >
                            <CheckCircleIcon sx={{ color: "#22C55E", fontSize: 20 }} />
                            <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#0F172A" }}>
                                {profile?.status || "ACTIVE"}
                            </Typography>
                            <Chip
                                label="Active"
                                size="small"
                                sx={{
                                    ml: "auto",
                                    bgcolor: "#DCFCE7",
                                    color: "#166534",
                                    fontWeight: 700
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                    <PrimaryButton
                        type="submit"
                        disabled={saving || loading}
                        startIcon={<SaveIcon />}
                    >
                        {saving ? "Saving Profile..." : "Save Profile"}
                    </PrimaryButton>
                </Box>
            </Box>
        </ContentCard>
    );
};

export default ProfileSettings;
