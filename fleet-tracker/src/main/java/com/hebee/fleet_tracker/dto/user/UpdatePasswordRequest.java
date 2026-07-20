package com.hebee.fleet_tracker.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdatePasswordRequest {

    @NotBlank(message = "New password is required")
    @Size(min = 6, message = "Password must contain at least 6 characters")
    private String newPassword;

    public UpdatePasswordRequest() {
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}