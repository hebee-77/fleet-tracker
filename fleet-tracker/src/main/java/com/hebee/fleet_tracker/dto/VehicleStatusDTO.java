package com.hebee.fleet_tracker.dto;

import com.hebee.fleet_tracker.enums.VehicleStatus;

public class VehicleStatusDTO {

    private VehicleStatus status;

    public VehicleStatus getStatus() {
        return status;
    }

    public void setStatus(VehicleStatus status) {
        this.status = status;
    }
}