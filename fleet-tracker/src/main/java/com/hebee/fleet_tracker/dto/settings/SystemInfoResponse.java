package com.hebee.fleet_tracker.dto.settings;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SystemInfoResponse {

    private String application;

    private String version;

    private String backend;

    private String frontend;

    private String database;

    private String authentication;

    private String websocket;

	public String getApplication() {
		return application;
	}

	public void setApplication(String application) {
		this.application = application;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getBackend() {
		return backend;
	}

	public void setBackend(String backend) {
		this.backend = backend;
	}

	public String getFrontend() {
		return frontend;
	}

	public void setFrontend(String frontend) {
		this.frontend = frontend;
	}

	public String getDatabase() {
		return database;
	}

	public void setDatabase(String database) {
		this.database = database;
	}

	public String getAuthentication() {
		return authentication;
	}

	public void setAuthentication(String authentication) {
		this.authentication = authentication;
	}

	public String getWebsocket() {
		return websocket;
	}

	public void setWebsocket(String websocket) {
		this.websocket = websocket;
	}
}