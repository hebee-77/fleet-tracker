package com.hebee.fleet_tracker.dto;

import jakarta.validation.constraints.NotNull;

public class LocationUpdateRequestDTO {

    @NotNull(message = "Latitude is required")
    private Double currentLatitude;

    @NotNull(message = "Longitude is required")
    private Double currentLongitude;

    @NotNull(message = "Speed is required")
    private Double speed;

    public Double getCurrentLatitude() {
        return currentLatitude;
    }

    public void setCurrentLatitude(Double currentLatitude) {
        this.currentLatitude = currentLatitude;
    }

    public Double getCurrentLongitude() {
        return currentLongitude;
    }

    public void setCurrentLongitude(Double currentLongitude) {
        this.currentLongitude = currentLongitude;
    }

    public Double getSpeed() {
        return speed;
    }

    public void setSpeed(Double speed) {
        this.speed = speed;
    }
}