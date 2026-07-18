package com.hebee.fleet_tracker.service;

import com.hebee.fleet_tracker.dto.auth.LoginRequest;
import com.hebee.fleet_tracker.dto.auth.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}