package com.hebee.fleet_tracker.mapper;

import java.time.LocalDateTime;

import com.hebee.fleet_tracker.dto.VehicleRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleResponseDTO;
import com.hebee.fleet_tracker.entity.Vehicle;

public class VehicleMapper {

    public static Vehicle toEntity(VehicleRequestDTO dto) {

        Vehicle vehicle = new Vehicle();

        vehicle.setVehicleNumber(dto.getVehicleNumber());
        vehicle.setDriverName(dto.getDriverName());
        vehicle.setVehicleType(dto.getVehicleType());
        vehicle.setCapacity(dto.getCapacity());
        vehicle.setFuelType(dto.getFuelType());
        vehicle.setStatus(dto.getStatus());

        // Default values for a newly registered vehicle
        vehicle.setCurrentLatitude(0.0);
        vehicle.setCurrentLongitude(0.0);
        vehicle.setSpeed(0.0);
        vehicle.setLastUpdated(LocalDateTime.now());

        return vehicle;
    }

    public static VehicleResponseDTO toResponseDTO(Vehicle vehicle) {

        VehicleResponseDTO dto = new VehicleResponseDTO();

        dto.setId(vehicle.getId());
        dto.setVehicleNumber(vehicle.getVehicleNumber());
        dto.setDriverName(vehicle.getDriverName());
        dto.setVehicleType(vehicle.getVehicleType());
        dto.setCapacity(vehicle.getCapacity());
        dto.setFuelType(vehicle.getFuelType());
        dto.setStatus(vehicle.getStatus());
        dto.setCurrentLatitude(vehicle.getCurrentLatitude());
        dto.setCurrentLongitude(vehicle.getCurrentLongitude());
        dto.setSpeed(vehicle.getSpeed());
        dto.setLastUpdated(vehicle.getLastUpdated());

        return dto;
    }

}