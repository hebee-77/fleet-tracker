package com.hebee.fleet_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.hebee.fleet_tracker.dto.VehicleRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleResponseDTO;
import com.hebee.fleet_tracker.service.VehicleService;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public VehicleResponseDTO saveVehicle(
            @Valid @RequestBody VehicleRequestDTO vehicleRequestDTO) {

        return vehicleService.saveVehicle(vehicleRequestDTO);
    }

    @GetMapping
    public List<VehicleResponseDTO> getAllVehicles() {

        return vehicleService.getAllVehicles();
    }

}