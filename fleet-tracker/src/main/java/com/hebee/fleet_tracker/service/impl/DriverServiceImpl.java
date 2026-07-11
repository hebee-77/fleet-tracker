package com.hebee.fleet_tracker.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hebee.fleet_tracker.dto.DriverRequestDTO;
import com.hebee.fleet_tracker.dto.DriverResponseDTO;
import com.hebee.fleet_tracker.entity.Driver;
import com.hebee.fleet_tracker.enums.DriverStatus;
import com.hebee.fleet_tracker.exception.DriverNotFoundException;
import com.hebee.fleet_tracker.mapper.DriverMapper;
import com.hebee.fleet_tracker.repository.DriverRepository;
import com.hebee.fleet_tracker.service.DriverService;

@Service
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;

    public DriverServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @Override
    public DriverResponseDTO saveDriver(DriverRequestDTO requestDTO) {

        Driver driver = DriverMapper.toEntity(requestDTO);

        Driver savedDriver = driverRepository.save(driver);

        return DriverMapper.toResponseDTO(savedDriver);
    }

    @Override
    public List<DriverResponseDTO> getAllDrivers() {

        return driverRepository.findAll()
                .stream()
                .map(DriverMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DriverResponseDTO getDriverById(Long id) {

        Driver driver = driverRepository.findById(id)
                .orElseThrow(() ->
                        new DriverNotFoundException("Driver not found with id : " + id));

        return DriverMapper.toResponseDTO(driver);
    }

    @Override
    public DriverResponseDTO updateDriver(Long id, DriverRequestDTO requestDTO) {

        Driver driver = driverRepository.findById(id)
                .orElseThrow(() ->
                        new DriverNotFoundException("Driver not found with id : " + id));

        driver.setDriverName(requestDTO.getDriverName());
        driver.setLicenseNumber(requestDTO.getLicenseNumber());
        driver.setPhoneNumber(requestDTO.getPhoneNumber());
        driver.setExperience(requestDTO.getExperience());
        driver.setStatus(requestDTO.getStatus());
        driver.setAssignedVehicle(requestDTO.getAssignedVehicle());

        Driver updatedDriver = driverRepository.save(driver);

        return DriverMapper.toResponseDTO(updatedDriver);
    }

    @Override
    public void deleteDriver(Long id) {

        Driver driver = driverRepository.findById(id)
                .orElseThrow(() ->
                        new DriverNotFoundException("Driver not found with id : " + id));

        driverRepository.delete(driver);
    }

    @Override
    public List<DriverResponseDTO> getDriversByStatus(DriverStatus status) {

        return driverRepository.findByStatus(status)
                .stream()
                .map(DriverMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DriverResponseDTO getDriverByLicenseNumber(String licenseNumber) {

        Driver driver = driverRepository.findByLicenseNumber(licenseNumber)
                .orElseThrow(() ->
                        new DriverNotFoundException(
                                "Driver not found with license number : " + licenseNumber));

        return DriverMapper.toResponseDTO(driver);
    }

}