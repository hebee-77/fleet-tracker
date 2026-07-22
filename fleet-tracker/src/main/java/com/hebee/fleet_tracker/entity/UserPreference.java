package com.hebee.fleet_tracker.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_preferences")
@NoArgsConstructor
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String theme = "LIGHT";

    @Column(name = "compact_mode", nullable = false)
    private Boolean compactMode = false;

    @Column(name = "email_notifications", nullable = false)
    private Boolean emailNotifications = true;

    @Column(name = "vehicle_alerts", nullable = false)
    private Boolean vehicleAlerts = true;

    @Column(name = "driver_alerts", nullable = false)
    private Boolean driverAlerts = true;

    @Column(name = "dashboard_refresh_interval", nullable = false)
    private Integer dashboardRefreshInterval = 30;

    @Column(name = "default_page_size", nullable = false)
    private Integer defaultPageSize = 10;

    @Column(name = "default_landing_page", nullable = false)
    private String defaultLandingPage = "dashboard";

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	@PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}