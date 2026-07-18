package com.hebee.fleet_tracker.scheduler;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.hebee.fleet_tracker.dto.VehicleLocationDTO;
import com.hebee.fleet_tracker.entity.Vehicle;
import com.hebee.fleet_tracker.enums.VehicleStatus;
import com.hebee.fleet_tracker.repository.VehicleRepository;
import com.hebee.fleet_tracker.websocket.VehicleLocationPublisher;
import com.hebee.fleet_tracker.websocket.WebSocketPublisher;

@Component
public class VehicleMovementScheduler {

    private final VehicleRepository vehicleRepository;
    private final VehicleLocationPublisher publisher;

    public VehicleMovementScheduler(
            VehicleRepository vehicleRepository,
            VehicleLocationPublisher publisher) {

        this.vehicleRepository = vehicleRepository;
        this.publisher = publisher;
    }

    @Scheduled(fixedRate = 50000)
    public void moveVehicles() {

        List<Vehicle> vehicles =
                vehicleRepository.findByStatus(VehicleStatus.ACTIVE);

        for (Vehicle vehicle : vehicles) {

            double latitude =
                    vehicle.getCurrentLatitude()
                    + ThreadLocalRandom.current()
                    .nextDouble(0.0001, 0.0005);

            double longitude =
                    vehicle.getCurrentLongitude()
                    + ThreadLocalRandom.current()
                    .nextDouble(0.0001, 0.0005);

            double speed =
                    ThreadLocalRandom.current()
                    .nextDouble(40.0, 80.0);

            vehicle.setCurrentLatitude(latitude);
            vehicle.setCurrentLongitude(longitude);
            vehicle.setSpeed(speed);
            vehicle.setLastUpdated(LocalDateTime.now());

            Vehicle updatedVehicle = vehicleRepository.save(vehicle);

            publisher.publish(
                new VehicleLocationDTO(
                    updatedVehicle.getId(),
                    updatedVehicle.getVehicleNumber(),
                    updatedVehicle.getCurrentLatitude(),
                    updatedVehicle.getCurrentLongitude(),
                    updatedVehicle.getSpeed()
                )
            );
            
            System.out.println(
            	    "Vehicle "
            	    + vehicle.getVehicleNumber()
            	    + " moved to ("
            	    + latitude
            	    + ", "
            	    + longitude
            	    + ") Speed: "
            	    + speed
            	);
        }
    }
}