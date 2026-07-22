package com.hebee.fleet_tracker.service;

import com.hebee.fleet_tracker.dto.settings.ChangePasswordRequest;
import com.hebee.fleet_tracker.dto.settings.PreferenceRequest;
import com.hebee.fleet_tracker.dto.settings.PreferenceResponse;
import com.hebee.fleet_tracker.dto.settings.ProfileResponse;
import com.hebee.fleet_tracker.dto.settings.ProfileUpdateRequest;
import com.hebee.fleet_tracker.dto.settings.SystemInfoResponse;

public interface SettingsService {

    /**
     * Returns the profile of the currently logged-in user.
     */
    ProfileResponse getProfile();

    /**
     * Updates the profile of the currently logged-in user.
     */
    ProfileResponse updateProfile(ProfileUpdateRequest request);

    /**
     * Changes the password of the currently logged-in user.
     */
    void changePassword(ChangePasswordRequest request);

    /**
     * Returns the preferences of the currently logged-in user.
     */
    PreferenceResponse getPreferences();

    /**
     * Updates the preferences of the currently logged-in user.
     */
    PreferenceResponse updatePreferences(PreferenceRequest request);

    /**
     * Returns application/system information.
     */
    SystemInfoResponse getSystemInfo();
}