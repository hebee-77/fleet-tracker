package com.hebee.fleet_tracker.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.hebee.fleet_tracker.dto.auth.LoginRequest;
import com.hebee.fleet_tracker.dto.auth.LoginResponse;
import com.hebee.fleet_tracker.entity.User;
import com.hebee.fleet_tracker.repository.UserRepository;
import com.hebee.fleet_tracker.security.jwt.JwtService;
import com.hebee.fleet_tracker.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final JwtService jwtService;

    public AuthServiceImpl(

            AuthenticationManager authenticationManager,

            UserRepository userRepository,

            JwtService jwtService) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;

    }

    @Override
    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getEmail(),

                        request.getPassword()

                )

        );

        User user = userRepository.findByEmail(

                request.getEmail())

                .orElseThrow(() ->

                        new RuntimeException(

                                "Invalid email or password"));

        String token = jwtService.generateToken(

                user.getEmail());

        return new LoginResponse(

                token,

                user.getFullName(),

                user.getEmail(),

                user.getRole()

        );

    }

}