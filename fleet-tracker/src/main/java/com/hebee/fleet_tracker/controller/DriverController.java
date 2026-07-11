package com.hebee.fleet_tracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hebee.fleet_tracker.dto.DriverRequestDTO;
import com.hebee.fleet_tracker.dto.DriverResponseDTO;
import com.hebee.fleet_tracker.enums.DriverStatus;
import com.hebee.fleet_tracker.service.DriverService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/drivers")
@Validated
@CrossOrigin(origins = "http://localhost:5173")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @PostMapping
    public ResponseEntity<DriverResponseDTO> saveDriver(
            @Valid @RequestBody DriverRequestDTO requestDTO) {

        return ResponseEntity.ok(driverService.saveDriver(requestDTO));
    }

    @GetMapping
    public ResponseEntity<List<DriverResponseDTO>> getAllDrivers() {

        return ResponseEntity.ok(driverService.getAllDrivers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DriverResponseDTO> getDriverById(
            @PathVariable Long id) {

        return ResponseEntity.ok(driverService.getDriverById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DriverResponseDTO> updateDriver(
            @PathVariable Long id,
            @Valid @RequestBody DriverRequestDTO requestDTO) {

        return ResponseEntity.ok(
                driverService.updateDriver(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDriver(
            @PathVariable Long id) {

        driverService.deleteDriver(id);

        return ResponseEntity.ok("Driver deleted successfully");
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<DriverResponseDTO>> getDriversByStatus(
            @PathVariable DriverStatus status) {

        return ResponseEntity.ok(
                driverService.getDriversByStatus(status));
    }

    @GetMapping("/license/{licenseNumber}")
    public ResponseEntity<DriverResponseDTO> getDriverByLicenseNumber(
            @PathVariable String licenseNumber) {

        return ResponseEntity.ok(
                driverService.getDriverByLicenseNumber(licenseNumber));
    }

}