package com.hebee.fleet_tracker.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hebee.fleet_tracker.entity.Vehicle;
import com.hebee.fleet_tracker.enums.VehicleStatus;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);

    List<Vehicle> findByStatus(VehicleStatus status);

    List<Vehicle> findByVehicleTypeIgnoreCase(String vehicleType);

}