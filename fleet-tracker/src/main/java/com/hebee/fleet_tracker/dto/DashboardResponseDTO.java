package com.hebee.fleet_tracker.dto;

public class DashboardResponseDTO {

    private long totalVehicles;
    private long activeVehicles;
    private long maintenanceVehicles;
    private long inactiveVehicles;

    private long totalDrivers;
    private long availableDrivers;
    private long onTripDrivers;
    private long offDutyDrivers;

    public long getTotalVehicles() {
        return totalVehicles;
    }

    public void setTotalVehicles(long totalVehicles) {
        this.totalVehicles = totalVehicles;
    }

    public long getActiveVehicles() {
        return activeVehicles;
    }

    public void setActiveVehicles(long activeVehicles) {
        this.activeVehicles = activeVehicles;
    }

    public long getMaintenanceVehicles() {
        return maintenanceVehicles;
    }

    public void setMaintenanceVehicles(long maintenanceVehicles) {
        this.maintenanceVehicles = maintenanceVehicles;
    }

    public long getInactiveVehicles() {
        return inactiveVehicles;
    }

    public void setInactiveVehicles(long inactiveVehicles) {
        this.inactiveVehicles = inactiveVehicles;
    }

    public long getTotalDrivers() {
        return totalDrivers;
    }

    public void setTotalDrivers(long totalDrivers) {
        this.totalDrivers = totalDrivers;
    }

    public long getAvailableDrivers() {
        return availableDrivers;
    }

    public void setAvailableDrivers(long availableDrivers) {
        this.availableDrivers = availableDrivers;
    }

    public long getOnTripDrivers() {
        return onTripDrivers;
    }

    public void setOnTripDrivers(long onTripDrivers) {
        this.onTripDrivers = onTripDrivers;
    }

    public long getOffDutyDrivers() {
        return offDutyDrivers;
    }

    public void setOffDutyDrivers(long offDutyDrivers) {
        this.offDutyDrivers = offDutyDrivers;
    }
}