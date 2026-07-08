package com.hebee.fleet_tracker.entity;

import java.time.LocalDateTime;

import com.hebee.fleet_tracker.enums.VehicleStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vehicles")
public class Vehicle extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String vehicleNumber;

    @Column(nullable = false)
    private String driverName;

    @Column(nullable = false)
    private String vehicleType;

    @Column(nullable = false)
    private Double capacity;

    @Column(nullable = false)
    private String fuelType;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private VehicleStatus status;

    @Column(nullable = false)
    private Double currentLatitude;

    @Column(nullable = false)
    private Double currentLongitude;

    @Column(nullable = false)
    private Double speed;

    @Column(nullable = false)
    private LocalDateTime lastUpdated;

    public Vehicle() {
    }

    public Vehicle(Long id, String vehicleNumber, String driverName,
                   String vehicleType, Double capacity,
                   String fuelType, VehicleStatus status,
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
}