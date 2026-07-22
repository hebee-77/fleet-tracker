package com.hebee.fleet_tracker.dto.settings;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class PreferenceRequest {

    private String theme;

    private Boolean compactMode;

    private Boolean emailNotifications;

    private Boolean vehicleAlerts;

    private Boolean driverAlerts;

    @Min(value = 5, message = "Refresh interval must be at least 5 seconds")
    @Max(value = 300, message = "Refresh interval cannot exceed 300 seconds")
    private Integer dashboardRefreshInterval;

    @Min(value = 5, message = "Page size must be at least 5")
    @Max(value = 100, message = "Page size cannot exceed 100")
    private Integer defaultPageSize;

    private String defaultLandingPage;

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	public Boolean getCompactMode() {
		return compactMode;
	}

	public void setCompactMode(Boolean compactMode) {
		this.compactMode = compactMode;
	}

	public Boolean getEmailNotifications() {
		return emailNotifications;
	}

	public void setEmailNotifications(Boolean emailNotifications) {
		this.emailNotifications = emailNotifications;
	}

	public Boolean getVehicleAlerts() {
		return vehicleAlerts;
	}

	public void setVehicleAlerts(Boolean vehicleAlerts) {
		this.vehicleAlerts = vehicleAlerts;
	}

	public Boolean getDriverAlerts() {
		return driverAlerts;
	}

	public void setDriverAlerts(Boolean driverAlerts) {
		this.driverAlerts = driverAlerts;
	}

	public Integer getDashboardRefreshInterval() {
		return dashboardRefreshInterval;
	}

	public void setDashboardRefreshInterval(Integer dashboardRefreshInterval) {
		this.dashboardRefreshInterval = dashboardRefreshInterval;
	}

	public Integer getDefaultPageSize() {
		return defaultPageSize;
	}

	public void setDefaultPageSize(Integer defaultPageSize) {
		this.defaultPageSize = defaultPageSize;
	}

	public String getDefaultLandingPage() {
		return defaultLandingPage;
	}

	public void setDefaultLandingPage(String defaultLandingPage) {
		this.defaultLandingPage = defaultLandingPage;
	}
}