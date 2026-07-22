import api from "./axios";

const BASE_URL = "/settings";

const settingsApi = {
    // Get user profile settings
    getProfile() {
        return api.get(`${BASE_URL}/profile`);
    },

    // Update user profile settings
    updateProfile(profileData) {
        return api.put(`${BASE_URL}/profile`, profileData);
    },

    // Change user password
    changePassword(passwordData) {
        return api.put(`${BASE_URL}/change-password`, passwordData);
    },

    // Get user preferences (appearance, notifications, dashboard settings)
    getPreferences() {
        return api.get(`${BASE_URL}/preferences`);
    },

    // Update user preferences
    updatePreferences(preferencesData) {
        return api.put(`${BASE_URL}/preferences`, preferencesData);
    },

    // Get system information
    getSystemInfo() {
        return api.get(`${BASE_URL}/system-info`);
    }
};

export default settingsApi;
