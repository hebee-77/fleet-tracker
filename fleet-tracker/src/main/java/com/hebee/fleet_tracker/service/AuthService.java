package com.hebee.fleet_tracker.service;

import com.hebee.fleet_tracker.dto.auth.LoginRequest;
import com.hebee.fleet_tracker.dto.auth.LoginResponse;
import com.hebee.fleet_tracker.dto.auth.RegisterRequest;
import com.hebee.fleet_tracker.dto.auth.RegisterResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);
    
    RegisterResponse register(RegisterRequest request);

}