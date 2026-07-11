package com.hebee.fleet_tracker.service;

import java.util.List;

import com.hebee.fleet_tracker.dto.DriverRequestDTO;
import com.hebee.fleet_tracker.dto.DriverResponseDTO;
import com.hebee.fleet_tracker.enums.DriverStatus;

public interface DriverService {

    DriverResponseDTO saveDriver(DriverRequestDTO requestDTO);

    List<DriverResponseDTO> getAllDrivers();

    DriverResponseDTO getDriverById(Long id);

    DriverResponseDTO updateDriver(Long id, DriverRequestDTO requestDTO);

    void deleteDriver(Long id);

    List<DriverResponseDTO> getDriversByStatus(DriverStatus status);

    DriverResponseDTO getDriverByLicenseNumber(String licenseNumber);

}