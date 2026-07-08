package com.hebee.fleet_tracker.exception;

public class VehicleNotFoundException extends RuntimeException {

    public VehicleNotFoundException(String message) {
        super(message);
    }

}