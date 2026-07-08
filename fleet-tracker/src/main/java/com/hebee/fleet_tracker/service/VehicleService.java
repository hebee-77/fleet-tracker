package com.hebee.fleet_tracker.service;

import java.util.List;

import com.hebee.fleet_tracker.dto.LocationUpdateRequestDTO;
import com.hebee.fleet_tracker.dto.PagedResponseDTO;
import com.hebee.fleet_tracker.dto.StatusUpdateRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleResponseDTO;
import com.hebee.fleet_tracker.enums.VehicleStatus;

public interface VehicleService {

    VehicleResponseDTO saveVehicle(VehicleRequestDTO vehicleRequestDTO);

    List<VehicleResponseDTO> getAllVehicles();
    
    VehicleResponseDTO getVehicleById(Long id);
    
    VehicleResponseDTO updateVehicle(Long id, VehicleRequestDTO vehicleRequestDTO);

	void deleteVehicle(Long id);

	VehicleResponseDTO updateVehicleLocation(Long id, LocationUpdateRequestDTO requestDTO);
	
	VehicleResponseDTO updateVehicleStatus(Long id, StatusUpdateRequestDTO requestDTO);
	
	VehicleResponseDTO getVehicleByVehicleNumber(String vehicleNumber);

	List<VehicleResponseDTO> getVehiclesByStatus(VehicleStatus status);

	List<VehicleResponseDTO> getVehiclesByVehicleType(String vehicleType);
	
	PagedResponseDTO<VehicleResponseDTO> getAllVehicles(int page, int size, String sortBy, String direction);

}