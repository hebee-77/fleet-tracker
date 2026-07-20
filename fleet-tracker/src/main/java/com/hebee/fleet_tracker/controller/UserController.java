package com.hebee.fleet_tracker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hebee.fleet_tracker.dto.user.UpdatePasswordRequest;
import com.hebee.fleet_tracker.dto.user.UpdateUserRequest;
import com.hebee.fleet_tracker.dto.user.UserRequest;
import com.hebee.fleet_tracker.dto.user.UserResponse;
import com.hebee.fleet_tracker.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get all users
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * Get user by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Long id) {

        return ResponseEntity.ok(userService.getUserById(id));
    }

    /**
     * Create new user
     */
    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody UserRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.createUser(request));
    }

    /**
     * Update user
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {

        return ResponseEntity.ok(
                userService.updateUser(id, request));
    }

    /**
     * Activate / Deactivate user
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Long id,
            @RequestParam Boolean active) {

        userService.updateUserStatus(id, active);

        return ResponseEntity.ok("User status updated successfully");
    }

    /**
     * Change Password
     */
    @PutMapping("/{id}/password")
    public ResponseEntity<String> updatePassword(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePasswordRequest request) {

        userService.updatePassword(id, request);

        return ResponseEntity.ok("Password updated successfully");
    }
}