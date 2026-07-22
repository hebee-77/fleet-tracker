import { useState } from "react";
import {
    Box,
    Grid,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Divider
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SecurityIcon from "@mui/icons-material/Security";
import KeyIcon from "@mui/icons-material/Key";

import ContentCard from "../common/ContentCard";
import PrimaryButton from "../common/PrimaryButton";

const SecuritySettings = ({ saving, onChangePassword }) => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [errors, setErrors] = useState({});

    const handleToggleVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleChange = (field) => (e) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        });
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = "Current password is required.";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "New password is required.";
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = "New password must be at least 8 characters.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your new password.";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password must match new password.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const success = await onChangePassword({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword
        });

        if (success) {
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
            setErrors({});
        }
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
                        <SecurityIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}
                        >
                            Security & Authentication
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5 }}>
                            Update your password and maintain account security.
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3, borderColor: "#F1F5F9" }} />

                <Grid container spacing={3} sx={{ maxWidth: 640 }}>
                    <Grid size={12}>
                        <Box sx={{ mb: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, color: "#475569" }}
                            >
                                Current Password
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            size="small"
                            type={showPassword.current ? "text" : "password"}
                            placeholder="Enter current password"
                            value={formData.currentPassword}
                            onChange={handleChange("currentPassword")}
                            error={!!errors.currentPassword}
                            helperText={errors.currentPassword}
                            disabled={saving}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleToggleVisibility("current")}
                                                edge="end"
                                            >
                                                {showPassword.current ? (
                                                    <VisibilityOff fontSize="small" />
                                                ) : (
                                                    <Visibility fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Box sx={{ mb: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, color: "#475569" }}
                            >
                                New Password
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            size="small"
                            type={showPassword.new ? "text" : "password"}
                            placeholder="Minimum 8 characters"
                            value={formData.newPassword}
                            onChange={handleChange("newPassword")}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword || "Must be at least 8 characters long."}
                            disabled={saving}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleToggleVisibility("new")}
                                                edge="end"
                                            >
                                                {showPassword.new ? (
                                                    <VisibilityOff fontSize="small" />
                                                ) : (
                                                    <Visibility fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Box sx={{ mb: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, color: "#475569" }}
                            >
                                Confirm New Password
                            </Typography>
                        </Box>
                        <TextField
                            fullWidth
                            size="small"
                            type={showPassword.confirm ? "text" : "password"}
                            placeholder="Re-enter new password"
                            value={formData.confirmPassword}
                            onChange={handleChange("confirmPassword")}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            disabled={saving}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleToggleVisibility("confirm")}
                                                edge="end"
                                            >
                                                {showPassword.confirm ? (
                                                    <VisibilityOff fontSize="small" />
                                                ) : (
                                                    <Visibility fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 4 }}>
                    <PrimaryButton
                        type="submit"
                        disabled={saving}
                        startIcon={<KeyIcon />}
                    >
                        {saving ? "Updating Password..." : "Change Password"}
                    </PrimaryButton>
                </Box>
            </Box>
        </ContentCard>
    );
};

export default SecuritySettings;
