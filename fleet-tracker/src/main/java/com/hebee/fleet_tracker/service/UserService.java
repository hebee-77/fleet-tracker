package com.hebee.fleet_tracker.service;

import java.util.List;

import com.hebee.fleet_tracker.dto.user.UpdatePasswordRequest;
import com.hebee.fleet_tracker.dto.user.UpdateUserRequest;
import com.hebee.fleet_tracker.dto.user.UserRequest;
import com.hebee.fleet_tracker.dto.user.UserResponse;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse createUser(UserRequest request);

    UserResponse updateUser(Long id, UpdateUserRequest request);

    void updateUserStatus(Long id, Boolean active);

    void updatePassword(Long id, UpdatePasswordRequest request);
}