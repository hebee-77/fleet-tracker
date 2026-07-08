package com.hebee.fleet_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hebee.fleet_tracker.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

}