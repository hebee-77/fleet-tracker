package com.hebee.fleet_tracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hebee.fleet_tracker.entity.Driver;
import com.hebee.fleet_tracker.enums.DriverStatus;

public interface DriverRepository extends JpaRepository<Driver, Long> {

    Optional<Driver> findByLicenseNumber(String licenseNumber);

    List<Driver> findByStatus(DriverStatus status);

    List<Driver> findByDriverNameContainingIgnoreCase(String driverName);

}