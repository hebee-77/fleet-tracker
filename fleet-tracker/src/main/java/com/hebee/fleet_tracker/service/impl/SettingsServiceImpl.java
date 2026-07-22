package com.hebee.fleet_tracker.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hebee.fleet_tracker.dto.settings.ChangePasswordRequest;
import com.hebee.fleet_tracker.dto.settings.PreferenceRequest;
import com.hebee.fleet_tracker.dto.settings.PreferenceResponse;
import com.hebee.fleet_tracker.dto.settings.ProfileResponse;
import com.hebee.fleet_tracker.dto.settings.ProfileUpdateRequest;
import com.hebee.fleet_tracker.dto.settings.SystemInfoResponse;
import com.hebee.fleet_tracker.entity.User;
import com.hebee.fleet_tracker.entity.UserPreference;
import com.hebee.fleet_tracker.exception.ResourceNotFoundException;
import com.hebee.fleet_tracker.repository.UserPreferenceRepository;
import com.hebee.fleet_tracker.repository.UserRepository;
import com.hebee.fleet_tracker.service.SettingsService;

@Service
public class SettingsServiceImpl implements SettingsService {

    private final UserRepository userRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    private final PasswordEncoder passwordEncoder;

    public SettingsServiceImpl(UserRepository userRepository,
                               UserPreferenceRepository userPreferenceRepository,
                               PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.userPreferenceRepository = userPreferenceRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    @Override
    public ProfileResponse getProfile() {

        User user = getCurrentUser();

        return ProfileResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .active(user.getActive())
                .build();
    }

    @Override
    public ProfileResponse updateProfile(ProfileUpdateRequest request) {

        User user = getCurrentUser();

        user.setFullName(request.getFullName());

        userRepository.save(user);

        return ProfileResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .active(user.getActive())
                .build();
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {

        User user = getCurrentUser();

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new RuntimeException("Current password is incorrect.");
        }

        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new RuntimeException(
                    "New password and confirm password do not match.");
        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

    @Override
    public PreferenceResponse getPreferences() {

        User user = getCurrentUser();

        UserPreference preference =
                userPreferenceRepository.findByUserId(user.getId())
                        .orElseGet(() -> {

                            UserPreference pref = new UserPreference();

                            pref.setUser(user);

                            return userPreferenceRepository.save(pref);
                        });

        return PreferenceResponse.builder()
                .theme(preference.getTheme())
                .compactMode(preference.getCompactMode())
                .emailNotifications(preference.getEmailNotifications())
                .vehicleAlerts(preference.getVehicleAlerts())
                .driverAlerts(preference.getDriverAlerts())
                .dashboardRefreshInterval(
                        preference.getDashboardRefreshInterval())
                .defaultPageSize(
                        preference.getDefaultPageSize())
                .defaultLandingPage(
                        preference.getDefaultLandingPage())
                .build();
    }

    @Override
    public PreferenceResponse updatePreferences(
            PreferenceRequest request) {

        User user = getCurrentUser();

        UserPreference preference =
                userPreferenceRepository.findByUserId(user.getId())
                        .orElseGet(() -> {

                            UserPreference pref = new UserPreference();

                            pref.setUser(user);

                            return userPreferenceRepository.save(pref);
                        });

        preference.setTheme(request.getTheme());
        preference.setCompactMode(request.getCompactMode());
        preference.setEmailNotifications(
                request.getEmailNotifications());
        preference.setVehicleAlerts(
                request.getVehicleAlerts());
        preference.setDriverAlerts(
                request.getDriverAlerts());
        preference.setDashboardRefreshInterval(
                request.getDashboardRefreshInterval());
        preference.setDefaultPageSize(
                request.getDefaultPageSize());
        preference.setDefaultLandingPage(
                request.getDefaultLandingPage());

        userPreferenceRepository.save(preference);

        return PreferenceResponse.builder()
                .theme(preference.getTheme())
                .compactMode(preference.getCompactMode())
                .emailNotifications(preference.getEmailNotifications())
                .vehicleAlerts(preference.getVehicleAlerts())
                .driverAlerts(preference.getDriverAlerts())
                .dashboardRefreshInterval(
                        preference.getDashboardRefreshInterval())
                .defaultPageSize(
                        preference.getDefaultPageSize())
                .defaultLandingPage(
                        preference.getDefaultLandingPage())
                .build();
    }

    @Override
    public SystemInfoResponse getSystemInfo() {

        return SystemInfoResponse.builder()
                .application("Fleet Tracker")
                .version("1.0.0")
                .backend("Spring Boot 3.5.16")
                .frontend("React")
                .database("PostgreSQL")
                .authentication("JWT")
                .websocket("Enabled")
                .build();
    }
}