package com.hebee.fleet_tracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hebee.fleet_tracker.dto.LocationUpdateRequestDTO;
import com.hebee.fleet_tracker.dto.PagedResponseDTO;
import com.hebee.fleet_tracker.dto.StatusUpdateRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleRequestDTO;
import com.hebee.fleet_tracker.dto.VehicleResponseDTO;
import com.hebee.fleet_tracker.enums.VehicleStatus;
import com.hebee.fleet_tracker.service.VehicleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

	private final VehicleService vehicleService;

	public VehicleController(VehicleService vehicleService) {
	    this.vehicleService = vehicleService;
	}

    @PostMapping
    public VehicleResponseDTO saveVehicle(
            @Valid @RequestBody VehicleRequestDTO vehicleRequestDTO) {

        return vehicleService.saveVehicle(vehicleRequestDTO);
    }

    @GetMapping
    public List<VehicleResponseDTO> getAllVehicles() {

        return vehicleService.getAllVehicles();
    }
    
    @GetMapping("/{id}")
    public VehicleResponseDTO getVehicleById(
            @PathVariable Long id) {

        return vehicleService.getVehicleById(id);
    }
    
    @PutMapping("/{id}")
    public VehicleResponseDTO updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequestDTO vehicleRequestDTO) {

        return vehicleService.updateVehicle(id, vehicleRequestDTO);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {

        vehicleService.deleteVehicle(id);

        return ResponseEntity.noContent().build();
    }
    
    @PatchMapping("/{id}/location")
    public VehicleResponseDTO updateLocation(
            @PathVariable Long id,
            @Valid @RequestBody LocationUpdateRequestDTO requestDTO) {

        return vehicleService.updateVehicleLocation(id, requestDTO);
    }
    
    @PatchMapping("/{id}/status")
    public VehicleResponseDTO updateVehicleStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequestDTO requestDTO) {

        return vehicleService.updateVehicleStatus(id, requestDTO);
    }
    
    @GetMapping("/search")
    public VehicleResponseDTO getVehicleByVehicleNumber(
            @RequestParam String vehicleNumber) {

        return vehicleService.getVehicleByVehicleNumber(vehicleNumber);
    }
    
    @GetMapping("/status/{status}")
    public List<VehicleResponseDTO> getVehiclesByStatus(
            @PathVariable VehicleStatus status) {

        return vehicleService.getVehiclesByStatus(status);
    }
    
    @GetMapping("/type/{vehicleType}")
    public List<VehicleResponseDTO> getVehiclesByVehicleType(
            @PathVariable String vehicleType) {

        return vehicleService.getVehiclesByVehicleType(vehicleType);
    }
    
    @GetMapping("/page")
    public PagedResponseDTO<VehicleResponseDTO> getAllVehicles(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        return vehicleService.getAllVehicles(
                page,
                size,
                sortBy,
                direction);
    }

}