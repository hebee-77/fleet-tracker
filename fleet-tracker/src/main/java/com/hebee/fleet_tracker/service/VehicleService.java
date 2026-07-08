package com.hebee.fleet_tracker.service;

import java.util.List;

import com.hebee.fleet_tracker.dto.VehicleRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleResponseDTO;

public interface VehicleService {

    VehicleResponseDTO saveVehicle(VehicleRequestDTO vehicleRequestDTO);

    List<VehicleResponseDTO> getAllVehicles();

}