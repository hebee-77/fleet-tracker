package com.hebee.fleet_tracker.service.impl;

import org.springframework.stereotype.Service;

import com.hebee.fleet_tracker.dto.DashboardResponseDTO;
import com.hebee.fleet_tracker.enums.DriverStatus;
import com.hebee.fleet_tracker.enums.VehicleStatus;
import com.hebee.fleet_tracker.repository.DriverRepository;
import com.hebee.fleet_tracker.repository.VehicleRepository;
import com.hebee.fleet_tracker.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final VehicleRepository vehicleRepository;

    private final DriverRepository driverRepository;

    public DashboardServiceImpl(
            VehicleRepository vehicleRepository,
            DriverRepository driverRepository) {

        this.vehicleRepository = vehicleRepository;
        this.driverRepository = driverRepository;

    }

    @Override
    public DashboardResponseDTO getDashboardData() {

        DashboardResponseDTO dashboard = new DashboardResponseDTO();

        // ---------------- Vehicle Statistics ----------------

        dashboard.setTotalVehicles(vehicleRepository.count());

        dashboard.setActiveVehicles(
                vehicleRepository.findByStatus(VehicleStatus.ACTIVE).size());

        dashboard.setMaintenanceVehicles(
                vehicleRepository.findByStatus(VehicleStatus.MAINTENANCE).size());

        dashboard.setInactiveVehicles(
                vehicleRepository.findByStatus(VehicleStatus.INACTIVE).size());

        // ---------------- Driver Statistics ----------------

        dashboard.setTotalDrivers(driverRepository.count());

        dashboard.setAvailableDrivers(
                driverRepository.findByStatus(DriverStatus.AVAILABLE).size());

        dashboard.setOnTripDrivers(
                driverRepository.findByStatus(DriverStatus.ON_TRIP).size());

        dashboard.setOffDutyDrivers(
                driverRepository.findByStatus(DriverStatus.OFF_DUTY).size());

        return dashboard;

    }

}