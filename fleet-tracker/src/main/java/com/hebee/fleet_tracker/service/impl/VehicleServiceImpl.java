package com.hebee.fleet_tracker.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hebee.fleet_tracker.dto.VehicleRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleResponseDTO;
import com.hebee.fleet_tracker.entity.Vehicle;
import com.hebee.fleet_tracker.mapper.VehicleMapper;
import com.hebee.fleet_tracker.repository.VehicleRepository;
import com.hebee.fleet_tracker.service.VehicleService;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public VehicleResponseDTO saveVehicle(VehicleRequestDTO vehicleRequestDTO) {

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

}