package com.hebee.fleet_tracker.dto;

public class VehicleLocationDTO {

    private Long id;

    private String vehicleNumber;

    private double latitude;

    private double longitude;

    private double speed;

    public VehicleLocationDTO() {
    }

    public VehicleLocationDTO(Long id,
                              String vehicleNumber,
                              double latitude,
                              double longitude,
                              double speed) {

        this.id = id;
        this.vehicleNumber = vehicleNumber;
        this.latitude = latitude;
        this.longitude = longitude;
        this.speed = speed;
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

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

}