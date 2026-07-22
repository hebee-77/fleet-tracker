package com.hebee.fleet_tracker.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hebee.fleet_tracker.dto.settings.ChangePasswordRequest;
import com.hebee.fleet_tracker.dto.settings.PreferenceRequest;
import com.hebee.fleet_tracker.dto.settings.PreferenceResponse;
import com.hebee.fleet_tracker.dto.settings.ProfileResponse;
import com.hebee.fleet_tracker.dto.settings.ProfileUpdateRequest;
import com.hebee.fleet_tracker.dto.settings.SystemInfoResponse;
import com.hebee.fleet_tracker.service.SettingsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/settings")
@Validated
public class SettingsController {

    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    /**
     * Get Logged-in User Profile
     */
    @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfile() {

        ProfileResponse response = settingsService.getProfile();

        return ResponseEntity.ok(response);
    }

    /**
     * Update Logged-in User Profile
     */
    @PutMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(
            @Valid @RequestBody ProfileUpdateRequest request) {

        ProfileResponse response =
                settingsService.updateProfile(request);

        return ResponseEntity.ok(response);
    }

    /**
     * Change Password
     */
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        settingsService.changePassword(request);

        return ResponseEntity.ok("Password changed successfully.");
    }

    /**
     * Get User Preferences
     */
    @GetMapping("/preferences")
    public ResponseEntity<PreferenceResponse> getPreferences() {

        PreferenceResponse response =
                settingsService.getPreferences();

        return ResponseEntity.ok(response);
    }

    /**
     * Update User Preferences
     */
    @PutMapping("/preferences")
    public ResponseEntity<PreferenceResponse> updatePreferences(
            @Valid @RequestBody PreferenceRequest request) {

        PreferenceResponse response =
                settingsService.updatePreferences(request);

        return ResponseEntity.ok(response);
    }

    /**
     * Get System Information
     */
    @GetMapping("/system-info")
    public ResponseEntity<SystemInfoResponse> getSystemInfo() {

        SystemInfoResponse response =
                settingsService.getSystemInfo();

        return ResponseEntity.ok(response);
    }
}