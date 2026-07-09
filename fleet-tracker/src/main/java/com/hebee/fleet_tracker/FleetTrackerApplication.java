package com.hebee.fleet_tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class FleetTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FleetTrackerApplication.class, args);
    }

}