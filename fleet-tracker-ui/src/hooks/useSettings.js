import { useState, useCallback, useEffect } from "react";
import settingsApi from "../api/settingsApi";
import { useSnackbar } from "../providers/SnackbarProvider";

export const useSettings = () => {
    const { showSuccess, showError } = useSnackbar();

    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        role: "",
        status: ""
    });

    const [preferences, setPreferences] = useState({
        theme: "Light",
        compactMode: false,
        emailNotifications: true,
        vehicleAlerts: true,
        driverAlerts: true,
        refreshInterval: 30,
        pageSize: 10,
        landingPage: "Dashboard"
    });

    const [systemInfo, setSystemInfo] = useState({
        application: "Fleet Tracker Enterprise",
        version: "1.0.0",
        backend: "Spring Boot 3.2.0",
        frontend: "React 19 / MUI 7",
        database: "PostgreSQL 16",
        authentication: "JWT (JSON Web Token)",
        websocket: "STOMP / SockJS"
    });

    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPreferences, setLoadingPreferences] = useState(false);
    const [loadingSystemInfo, setLoadingSystemInfo] = useState(false);

    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    const [savingPreferences, setSavingPreferences] = useState(false);

    const getErrorMessage = (err, defaultMsg) => {
        if (err.response?.data?.message) {
            return err.response.data.message;
        }
        if (typeof err.response?.data === "string" && err.response.data.trim()) {
            return err.response.data;
        }
        if (err.message) {
            return err.message;
        }
        return defaultMsg;
    };

    const fetchProfile = useCallback(async () => {
        setLoadingProfile(true);
        try {
            const response = await settingsApi.getProfile();
            if (response.data) {
                setProfile({
                    fullName: response.data.fullName || "",
                    email: response.data.email || "",
                    role: response.data.role || "",
                    status: response.data.status || response.data.active ? "ACTIVE" : "INACTIVE"
                });
            }
        } catch (err) {
            console.error("Error loading profile settings:", err);
            showError(getErrorMessage(err, "Failed to load profile."));
        } finally {
            setLoadingProfile(false);
        }
    }, [showError]);

    const fetchPreferences = useCallback(async () => {
        setLoadingPreferences(true);
        try {
            const response = await settingsApi.getPreferences();
            if (response.data) {
                setPreferences((prev) => ({
                    ...prev,
                    ...response.data
                }));
            }
        } catch (err) {
            console.error("Error loading preference settings:", err);
            showError(getErrorMessage(err, "Failed to load preferences."));
        } finally {
            setLoadingPreferences(false);
        }
    }, [showError]);

    const fetchSystemInfo = useCallback(async () => {
        setLoadingSystemInfo(true);
        try {
            const response = await settingsApi.getSystemInfo();
            if (response.data) {
                setSystemInfo((prev) => ({
                    ...prev,
                    ...response.data
                }));
            }
        } catch (err) {
            console.error("Error loading system info:", err);
            showError(getErrorMessage(err, "Failed to load system information."));
        } finally {
            setLoadingSystemInfo(false);
        }
    }, [showError]);

    const updateProfile = async (profileData) => {
        setSavingProfile(true);
        try {
            const response = await settingsApi.updateProfile(profileData);
            if (response.data) {
                setProfile((prev) => ({
                    ...prev,
                    ...response.data
                }));
            } else {
                setProfile((prev) => ({
                    ...prev,
                    ...profileData
                }));
            }
            showSuccess("Profile updated successfully.");
            return true;
        } catch (err) {
            console.error("Error updating profile:", err);
            showError(getErrorMessage(err, "Failed to update profile."));
            return false;
        } finally {
            setSavingProfile(false);
        }
    };

    const changePassword = async (passwordData) => {
        setSavingPassword(true);
        try {
            await settingsApi.changePassword(passwordData);
            showSuccess("Password changed successfully.");
            return true;
        } catch (err) {
            console.error("Error changing password:", err);
            showError(getErrorMessage(err, "Failed to change password."));
            return false;
        } finally {
            setSavingPassword(false);
        }
    };

    const updatePreferences = async (preferencesData) => {
        setSavingPreferences(true);
        try {
            const updated = {
                ...preferences,
                ...preferencesData
            };
            const response = await settingsApi.updatePreferences(updated);
            if (response.data) {
                setPreferences(response.data);
            } else {
                setPreferences(updated);
            }
            showSuccess("Preferences updated successfully.");
            return true;
        } catch (err) {
            console.error("Error updating preferences:", err);
            showError(getErrorMessage(err, "Failed to update preferences."));
            return false;
        } finally {
            setSavingPreferences(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchPreferences();
    }, [fetchProfile, fetchPreferences]);

    return {
        profile,
        preferences,
        systemInfo,

        loadingProfile,
        loadingPreferences,
        loadingSystemInfo,

        savingProfile,
        savingPassword,
        savingPreferences,

        fetchProfile,
        fetchPreferences,
        fetchSystemInfo,

        updateProfile,
        changePassword,
        updatePreferences
    };
};

export default useSettings;
