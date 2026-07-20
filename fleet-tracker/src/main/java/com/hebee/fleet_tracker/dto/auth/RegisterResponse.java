package com.hebee.fleet_tracker.dto.auth;

public class RegisterResponse {

    private String message;

    private String email;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public RegisterResponse(String message, String email) {
		super();
		this.message = message;
		this.email = email;
	}
    
    
    
}