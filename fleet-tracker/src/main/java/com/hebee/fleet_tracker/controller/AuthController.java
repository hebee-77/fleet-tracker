package com.hebee.fleet_tracker.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.annotation.Validated;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hebee.fleet_tracker.dto.auth.LoginRequest;
import com.hebee.fleet_tracker.dto.auth.LoginResponse;
import com.hebee.fleet_tracker.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {

        this.authService = authService;

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(

            @Valid
            @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity

                .status(HttpStatus.OK)

                .body(response);

    }

}