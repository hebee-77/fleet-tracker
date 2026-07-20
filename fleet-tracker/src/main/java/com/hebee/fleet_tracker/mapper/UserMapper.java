package com.hebee.fleet_tracker.mapper;

import org.springframework.stereotype.Component;

import com.hebee.fleet_tracker.dto.user.UserRequest;
import com.hebee.fleet_tracker.dto.user.UserResponse;
import com.hebee.fleet_tracker.dto.user.UpdateUserRequest;
import com.hebee.fleet_tracker.entity.User;

@Component
public class UserMapper {

    public User toEntity(UserRequest request) {

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return user;
    }

    public UserResponse toResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setActive(user.getActive());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());

        return response;
    }

    public void updateEntity(User user, UpdateUserRequest request) {

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
    }
}