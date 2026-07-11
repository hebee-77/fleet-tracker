package com.hebee.fleet_tracker.mapper;

import com.hebee.fleet_tracker.dto.DriverRequestDTO;
import com.hebee.fleet_tracker.dto.DriverResponseDTO;
import com.hebee.fleet_tracker.entity.Driver;

public class DriverMapper {

    public static Driver toEntity(DriverRequestDTO dto) {

        Driver driver = new Driver();

        driver.setDriverName(dto.getDriverName());
        driver.setLicenseNumber(dto.getLicenseNumber());
        driver.setPhoneNumber(dto.getPhoneNumber());
        driver.setExperience(dto.getExperience());
        driver.setStatus(dto.getStatus());
        driver.setAssignedVehicle(dto.getAssignedVehicle());

        return driver;
    }

    public static DriverResponseDTO toResponseDTO(Driver driver) {

        DriverResponseDTO dto = new DriverResponseDTO();

        dto.setId(driver.getId());
        dto.setDriverName(driver.getDriverName());
        dto.setLicenseNumber(driver.getLicenseNumber());
        dto.setPhoneNumber(driver.getPhoneNumber());
        dto.setExperience(driver.getExperience());
        dto.setStatus(driver.getStatus());
        dto.setAssignedVehicle(driver.getAssignedVehicle());
        dto.setCreatedAt(driver.getCreatedAt());
        dto.setUpdatedAt(driver.getUpdatedAt());

        return dto;
    }

}