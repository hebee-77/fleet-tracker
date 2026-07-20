package com.hebee.fleet_tracker.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hebee.fleet_tracker.dto.LocationUpdateRequestDTO;
import com.hebee.fleet_tracker.dto.PagedResponseDTO;
import com.hebee.fleet_tracker.dto.StatusUpdateRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleResponseDTO;
import com.hebee.fleet_tracker.entity.Vehicle;
import com.hebee.fleet_tracker.enums.VehicleStatus;
import com.hebee.fleet_tracker.exception.DuplicateVehicleException;
import com.hebee.fleet_tracker.exception.ResourceNotFoundException;
import com.hebee.fleet_tracker.mapper.VehicleMapper;
import com.hebee.fleet_tracker.repository.VehicleRepository;
import com.hebee.fleet_tracker.service.VehicleService;

@Service
public class VehicleServiceImpl implements VehicleService {

	private final VehicleRepository vehicleRepository;

	public VehicleServiceImpl(VehicleRepository vehicleRepository) {
	    this.vehicleRepository = vehicleRepository;
	}

    @Override
    public VehicleResponseDTO saveVehicle(VehicleRequestDTO vehicleRequestDTO) {
    	if (vehicleRepository.findByVehicleNumber(
    	        vehicleRequestDTO.getVehicleNumber()).isPresent()) {

    	    throw new DuplicateVehicleException(
    	            "Vehicle number already exists.");
    	}

    	Vehicle vehicle = VehicleMapper.toEntity(vehicleRequestDTO);

    	Vehicle savedVehicle = vehicleRepository.save(vehicle);

    	return VehicleMapper.toResponseDTO(savedVehicle);
    }

    @Override
    public List<VehicleResponseDTO> getAllVehicles() {

        return vehicleRepository.findAll()
                .stream()
                .map(VehicleMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
    @Override
    public VehicleResponseDTO getVehicleById(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id : " + id));

        return VehicleMapper.toResponseDTO(vehicle);
    }
    
    @Override
    public VehicleResponseDTO updateVehicle(Long id, VehicleRequestDTO vehicleRequestDTO) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id : " + id));

        vehicle.setVehicleNumber(vehicleRequestDTO.getVehicleNumber());
        vehicle.setDriverName(vehicleRequestDTO.getDriverName());
        vehicle.setVehicleType(vehicleRequestDTO.getVehicleType());
        vehicle.setCapacity(vehicleRequestDTO.getCapacity());
        vehicle.setFuelType(vehicleRequestDTO.getFuelType());
        vehicle.setStatus(vehicleRequestDTO.getStatus());
		vehicle.setCurrentLatitude(vehicleRequestDTO.getCurrentLatitude());
		vehicle.setCurrentLongitude(vehicleRequestDTO.getCurrentLongitude());


        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return VehicleMapper.toResponseDTO(updatedVehicle);
    }

    @Override
    public void deleteVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id : " + id));

        vehicleRepository.delete(vehicle);
    }
    
    @Override
    public VehicleResponseDTO updateVehicleLocation(
            Long id,
            LocationUpdateRequestDTO requestDTO) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id : " + id));

        vehicle.setCurrentLatitude(requestDTO.getCurrentLatitude());
        vehicle.setCurrentLongitude(requestDTO.getCurrentLongitude());
        vehicle.setSpeed(requestDTO.getSpeed());

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return VehicleMapper.toResponseDTO(updatedVehicle);
    }
    
    @Override
    public VehicleResponseDTO updateVehicleStatus(
            Long id,
            StatusUpdateRequestDTO requestDTO) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id : " + id));

        vehicle.setStatus(requestDTO.getStatus());
        

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return VehicleMapper.toResponseDTO(updatedVehicle);
    }
    
    @Override
    public VehicleResponseDTO getVehicleByVehicleNumber(String vehicleNumber) {

        Vehicle vehicle = vehicleRepository
                .findByVehicleNumber(vehicleNumber)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with number : " + vehicleNumber));

        return VehicleMapper.toResponseDTO(vehicle);
    }
    
    @Override
    public List<VehicleResponseDTO> getVehiclesByStatus(VehicleStatus status) {

        return vehicleRepository.findByStatus(status)
                .stream()
                .map(VehicleMapper::toResponseDTO)
                .toList();
    }
    
    @Override
    public List<VehicleResponseDTO> getVehiclesByVehicleType(String vehicleType) {

        return vehicleRepository.findByVehicleTypeIgnoreCase(vehicleType)
                .stream()
                .map(VehicleMapper::toResponseDTO)
                .toList();
    }
    
    @Override
    public PagedResponseDTO<VehicleResponseDTO> getAllVehicles(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Vehicle> vehiclePage = vehicleRepository.findAll(pageable);

        List<VehicleResponseDTO> vehicles = vehiclePage
                .getContent()
                .stream()
                .map(VehicleMapper::toResponseDTO)
                .toList();

        return new PagedResponseDTO<>(
                vehicles,
                vehiclePage.getNumber(),
                vehiclePage.getSize(),
                vehiclePage.getTotalElements(),
                vehiclePage.getTotalPages(),
                vehiclePage.isLast()
        );
    }
    
	@Override
	public Vehicle updateVehicleStatus(Long vehicleId, VehicleStatus status) {

		Vehicle vehicle = vehicleRepository.findById(vehicleId)
				.orElseThrow(() -> new ResourceNotFoundException("Vehicle with id " + vehicleId + " not found"));
		vehicle.setStatus(status);

		return vehicleRepository.save(vehicle);
	}
}