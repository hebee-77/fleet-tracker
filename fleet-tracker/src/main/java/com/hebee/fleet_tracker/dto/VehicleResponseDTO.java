package com.hebee.fleet_tracker.dto;

import java.time.LocalDateTime;

import com.hebee.fleet_tracker.enums.VehicleStatus;

public class VehicleResponseDTO {

    private Long id;

    private String vehicleNumber;

    private String driverName;

    private String vehicleType;

    private Double capacity;

    private String fuelType;

    private VehicleStatus status;

    private Double currentLatitude;

    private Double currentLongitude;

    private Double speed;

    private LocalDateTime lastUpdated;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;

    public VehicleResponseDTO() {
    }

    public VehicleResponseDTO(Long id,
                              String vehicleNumber,
                              String driverName,
                              String vehicleType,
                              Double capacity,
                              String fuelType,
                              VehicleStatus status,
                              Double currentLatitude,
                              Double currentLongitude,
                              Double speed,
                              LocalDateTime lastUpdated) {

        this.id = id;
        this.vehicleNumber = vehicleNumber;
        this.driverName = driverName;
        this.vehicleType = vehicleType;
        this.capacity = capacity;
        this.fuelType = fuelType;
        this.status = status;
        this.currentLatitude = currentLatitude;
        this.currentLongitude = currentLongitude;
        this.speed = speed;
        this.lastUpdated = lastUpdated;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVehicleNumber() {
		return vehicleNumber;
	}

	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}

	public String getDriverName() {
		return driverName;
	}

	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public Double getCapacity() {
		return capacity;
	}

	public void setCapacity(Double capacity) {
		this.capacity = capacity;
	}

	public String getFuelType() {
		return fuelType;
	}

	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}

	public VehicleStatus getStatus() {
		return status;
	}

	public void setStatus(VehicleStatus status) {
		this.status = status;
	}

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

	public LocalDateTime getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(LocalDateTime lastUpdated) {
		this.lastUpdated = lastUpdated;
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

    
}