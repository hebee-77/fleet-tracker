package com.hebee.fleet_tracker.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hebee.fleet_tracker.dto.user.UpdatePasswordRequest;
import com.hebee.fleet_tracker.dto.user.UpdateUserRequest;
import com.hebee.fleet_tracker.dto.user.UserRequest;
import com.hebee.fleet_tracker.dto.user.UserResponse;
import com.hebee.fleet_tracker.entity.User;
import com.hebee.fleet_tracker.mapper.UserMapper;
import com.hebee.fleet_tracker.repository.UserRepository;
import com.hebee.fleet_tracker.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           UserMapper userMapper,
                           PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id : " + id));

        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse createUser(UserRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = userMapper.toEntity(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(true);

        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public UserResponse updateUser(Long id, UpdateUserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        userMapper.updateEntity(user, request);

        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public void updateUserStatus(Long id, Boolean active) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setActive(active);

        userRepository.save(user);
    }

    @Override
    public void updatePassword(Long id,
                               UpdatePasswordRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }
}