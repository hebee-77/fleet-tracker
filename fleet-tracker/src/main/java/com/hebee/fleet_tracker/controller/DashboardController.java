package com.hebee.fleet_tracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hebee.fleet_tracker.dto.DashboardResponseDTO;
import com.hebee.fleet_tracker.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardResponseDTO> getDashboardData() {

        DashboardResponseDTO dashboard =
                dashboardService.getDashboardData();

        return ResponseEntity.ok(dashboard);
    }

}