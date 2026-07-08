package com.hebee.fleet_tracker.dto;

import com.hebee.fleet_tracker.enums.VehicleStatus;

import jakarta.validation.constraints.NotNull;

public class StatusUpdateRequestDTO {

    @NotNull(message = "Vehicle status is required")
    private VehicleStatus status;

    public VehicleStatus getStatus() {
        return status;
    }

    public void setStatus(VehicleStatus status) {
        this.status = status;
    }

}