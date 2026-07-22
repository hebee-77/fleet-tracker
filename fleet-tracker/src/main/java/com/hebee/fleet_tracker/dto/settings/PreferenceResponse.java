package com.hebee.fleet_tracker.dto.settings;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PreferenceResponse {

    private String theme;

    private Boolean compactMode;

    private Boolean emailNotifications;

    private Boolean vehicleAlerts;

    private Boolean driverAlerts;

    private Integer dashboardRefreshInterval;

    private Integer defaultPageSize;

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

	private String defaultLandingPage;
}