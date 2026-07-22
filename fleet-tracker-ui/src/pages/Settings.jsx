import { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import PaletteIcon from "@mui/icons-material/Palette";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DnsIcon from "@mui/icons-material/Dns";
import InfoIcon from "@mui/icons-material/Info";

import PageHeader from "../components/common/PageHeader";
import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import DashboardSettings from "../components/settings/DashboardSettings";
import SystemSettings from "../components/settings/SystemSettings";
import AboutSettings from "../components/settings/AboutSettings";

import useSettings from "../hooks/useSettings";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`settings-tabpanel-${index}`}
            aria-labelledby={`settings-tab-${index}`}
            {...other}
            style={{ width: "100%" }}
        >
            {value === index && <Box sx={{ pt: 2.5 }}>{children}</Box>}
        </div>
    );
}

function Settings() {
    const [activeTab, setActiveTab] = useState(0);

    const {
        profile,
        preferences,
        systemInfo,

        loadingProfile,
        loadingPreferences,
        loadingSystemInfo,

        savingProfile,
        savingPassword,
        savingPreferences,

        fetchSystemInfo,

        updateProfile,
        changePassword,
        updatePreferences
    } = useSettings();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const tabsConfig = [
        { label: "Profile", icon: <PersonIcon fontSize="small" /> },
        { label: "Security", icon: <SecurityIcon fontSize="small" /> },
        { label: "Appearance", icon: <PaletteIcon fontSize="small" /> },
        { label: "Notifications", icon: <NotificationsIcon fontSize="small" /> },
        { label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
        { label: "System", icon: <DnsIcon fontSize="small" /> },
        { label: "About", icon: <InfoIcon fontSize="small" /> }
    ];

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                gap: 1.5,
                minHeight: 0
            }}
        >
            <PageHeader
                title="Settings"
                subtitle="Manage your profile, security options, application preferences, and system information."
                breadcrumbs={[
                    {
                        label: "Dashboard",
                        href: "/"
                    },
                    {
                        label: "Settings"
                    }
                ]}
            />

            <Paper
                elevation={0}
                sx={{
                    borderRadius: "16px",
                    bgcolor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    px: 1,
                    py: 0.5
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#2563EB",
                            height: 3,
                            borderRadius: "3px 3px 0 0"
                        },
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            minHeight: 48,
                            color: "#64748B",
                            gap: 1,
                            "&.Mui-selected": {
                                color: "#2563EB",
                                fontWeight: 700
                            }
                        }
                    }}
                >
                    {tabsConfig.map((tab, index) => (
                        <Tab
                            key={index}
                            icon={tab.icon}
                            iconPosition="start"
                            label={tab.label}
                            id={`settings-tab-${index}`}
                            aria-controls={`settings-tabpanel-${index}`}
                        />
                    ))}
                </Tabs>
            </Paper>

            <Box sx={{ flex: 1, overflowY: "auto" }}>
                <TabPanel value={activeTab} index={0}>
                    <ProfileSettings
                        profile={profile}
                        loading={loadingProfile}
                        saving={savingProfile}
                        onSaveProfile={updateProfile}
                    />
                </TabPanel>

                <TabPanel value={activeTab} index={1}>
                    <SecuritySettings
                        saving={savingPassword}
                        onChangePassword={changePassword}
                    />
                </TabPanel>

                <TabPanel value={activeTab} index={2}>
                    <AppearanceSettings
                        preferences={preferences}
                        saving={savingPreferences}
                        onSavePreferences={updatePreferences}
                    />
                </TabPanel>

                <TabPanel value={activeTab} index={3}>
                    <NotificationSettings
                        preferences={preferences}
                        saving={savingPreferences}
                        onSavePreferences={updatePreferences}
                    />
                </TabPanel>

                <TabPanel value={activeTab} index={4}>
                    <DashboardSettings
                        preferences={preferences}
                        saving={savingPreferences}
                        onSavePreferences={updatePreferences}
                    />
                </TabPanel>

                <TabPanel value={activeTab} index={5}>
                    <SystemSettings
                        systemInfo={systemInfo}
                        loading={loadingSystemInfo}
                        onFetchSystemInfo={fetchSystemInfo}
                    />
                </TabPanel>

                <TabPanel value={activeTab} index={6}>
                    <AboutSettings />
                </TabPanel>
            </Box>
        </Box>
    );
}

export default Settings;